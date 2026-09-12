#!/usr/bin/env node
/**
 * reap-browsers.mjs
 *
 * Sammelt verwaiste headless-Browser ein, die Screenshot- und Audit-Skripte
 * hinterlassen haben, samt ihrer Wegwerf-Profile.
 *
 * Warum das noetig ist:
 *   Edge startet sich beim Hochfahren selbst unter einer neuen PID neu
 *   (--edge-skip-compat-layer-relaunch). Die von spawn() gelieferte PID ist
 *   Sekunden spaeter tot, ein child.kill() trifft damit nur den Starter und
 *   laesst den echten Browser samt Renderern stehen. Unter --headless=new sind
 *   das echte, nur unsichtbare Fenster: Windows listet sie im Alt+Tab, aber
 *   anklicken und schliessen tut nichts. Wird der Node zusaetzlich hart
 *   abgeschossen (Session-Ende, Tool-Timeout, Strg+C), laufen gar keine
 *   exit-Handler mehr und die Instanz bleibt bis zum Neustart liegen.
 *
 * Erkennung eines Waisen:
 *   Nicht ueber den Elternprozess, der ist wegen des Selbst-Neustarts auch bei
 *   einem laufenden Audit immer tot. Stattdessen:
 *     1. Das Profil muss unter einem Temp-Verzeichnis liegen. Damit kann das
 *        echte Browserprofil des Nutzers nie getroffen werden.
 *     2. Existiert <profil>.lock mit einer lebenden PID, laeuft der Job noch
 *        und bleibt unangetastet, unabhaengig vom Alter.
 *     3. Sonst gilt alles als verwaist, was aelter als --older-than ist.
 *
 * Aufruf:
 *   node tools/reap-browsers.mjs                  aufraeumen, Standard 30 Minuten
 *   node tools/reap-browsers.mjs --dry-run        nur zeigen, nichts anfassen
 *   node tools/reap-browsers.mjs --older-than 5   schaerfer
 *   node tools/reap-browsers.mjs --quiet          schweigt, wenn es nichts zu tun gab
 *   node tools/reap-browsers.mjs --root D:/scratch nur dort suchen statt in allen
 *                                                 Temp-Verzeichnissen
 *
 * Beendet immer mit 0, damit der Aufruf aus einem Hook nie eine Session kippt.
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { join, sep } from 'node:path';
import { tmpdir } from 'node:os';

const args = process.argv.slice(2);
const has = (name) => args.includes(`--${name}`);
const opt = (name, fallback) => {
    const i = args.indexOf(`--${name}`);
    return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const roots = args.reduce((acc, a, i) => (a === '--root' && args[i + 1] ? [...acc, args[i + 1]] : acc), []);

const DRY = has('dry-run');
const QUIET = has('quiet');
const MAX_AGE_MIN = Number(opt('older-than', 30));
const WALK_DEPTH = Number(opt('depth', 8));
const WALK_BUDGET_MS = 10_000;
const WALK_MAX_DIRS = 20_000;

const say = (...a) => { if (!QUIET) console.log(...a); };
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(0)} MB`;

/* ------------------------------------------------------------------ Wurzeln */

const norm = (p) => {
    let s = String(p).replace(/[/\\]+/g, sep);
    while (s.length > 3 && s.endsWith(sep)) s = s.slice(0, -1);
    return process.platform === 'win32' ? s.toLowerCase() : s;
};

// Mit --root wird gezielt nur dort gesucht. Ohne --root alle Temp-Verzeichnisse.
// Normalisiert wird nur zum Vergleichen; gelaufen und ausgegeben wird die
// Originalschreibweise, damit Pfade in der Ausgabe gegenlesbar bleiben.
const ROOT_BY_KEY = new Map();
for (const r of (roots.length ? roots : [process.env.TEMP, process.env.TMP, tmpdir()]).filter(Boolean)) {
    if (!ROOT_BY_KEY.has(norm(r))) ROOT_BY_KEY.set(norm(r), r);
}
const TEMP_ROOTS = [...ROOT_BY_KEY.keys()];
const TEMP_ROOTS_RAW = [...ROOT_BY_KEY.values()];

const isUnderTemp = (p) => TEMP_ROOTS.some((r) => p === r || p.startsWith(r + sep));

/* ------------------------------------------------------- laufende Prozesse */

/** true, solange die PID lebt. Signal 0 prueft nur, ohne etwas zu senden. */
function isAlive(pid) {
    if (!pid || pid <= 0) return false;
    try { process.kill(pid, 0); return true; } catch (err) { return err.code === 'EPERM'; }
}

/** Profilpfad aus einer Browser-Kommandozeile ziehen. */
function profileOf(cmdline) {
    const quoted = cmdline.match(/--user-data-dir="([^"]+)"/);
    if (quoted) return quoted[1];
    const bare = cmdline.match(/--user-data-dir=(\S+)/);
    return bare ? bare[1] : null;
}

/** [{ pid, ageMin, rss, profile }] aller Browser mit eigenem Profil. */
function listBrowsers() {
    if (process.platform === 'win32') {
        const ps = 'ConvertTo-Json -Compress -Depth 3 -InputObject @('
            + 'Get-CimInstance Win32_Process'
            + " -Filter \"Name='msedge.exe' OR Name='chrome.exe'\""
            + " | Where-Object { $_.CommandLine -like '*--user-data-dir=*' }"
            + ' | Select-Object ProcessId, WorkingSetSize, CommandLine,'
            + " @{n='AgeMin';e={[int]((Get-Date) - $_.CreationDate).TotalMinutes}})";
        let raw;
        try {
            raw = execFileSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', ps],
                { encoding: 'utf8', timeout: 30_000, maxBuffer: 32 * 1024 * 1024 });
        } catch { return []; }
        let rows;
        try { rows = JSON.parse(raw.trim() || '[]'); } catch { return []; }
        if (!Array.isArray(rows)) rows = [rows];
        return rows.flatMap((r) => {
            const profile = profileOf(r.CommandLine || '');
            return profile ? [{ pid: r.ProcessId, ageMin: r.AgeMin, rss: r.WorkingSetSize || 0, profile }] : [];
        });
    }

    let raw;
    try { raw = execFileSync('ps', ['-eo', 'pid=,etimes=,args='], { encoding: 'utf8', timeout: 30_000 }); }
    catch { return []; }
    return raw.split('\n').flatMap((line) => {
        const m = line.trim().match(/^(\d+)\s+(\d+)\s+(.*)$/);
        if (!m || !/chrome|chromium|msedge/i.test(m[3])) return [];
        const profile = profileOf(m[3]);
        return profile ? [{ pid: Number(m[1]), ageMin: Math.floor(Number(m[2]) / 60), rss: 0, profile }] : [];
    });
}

/** Haelt eine Lock-Datei neben dem Profil einen noch lebenden Job fest? */
function lockedByLiveJob(profile) {
    try { return isAlive(Number(readFileSync(`${profile}.lock`, 'utf8').trim())); }
    catch { return false; }
}

function killPids(pids) {
    if (process.platform !== 'win32') {
        for (const pid of pids) { try { process.kill(pid, 'SIGKILL'); } catch { /* schon weg */ } }
        return;
    }
    // In Haeppchen, damit die Kommandozeile nicht ueberlaeuft.
    for (let i = 0; i < pids.length; i += 40) {
        const chunk = pids.slice(i, i + 40).flatMap((pid) => ['/PID', String(pid)]);
        try { execFileSync('taskkill.exe', ['/F', '/T', ...chunk], { stdio: 'ignore', timeout: 30_000 }); }
        catch { /* teils schon beendet, das ist in Ordnung */ }
    }
}

/* ---------------------------------------------------- Profilreste auf Platte */

const PROFILE_MARKERS = ['Local State', 'DevToolsActivePort'];

function looksLikeProfile(names) {
    if (PROFILE_MARKERS.some((m) => names.has(m))) return true;
    return names.has('Default') && names.has('Crashpad');
}

function dirSize(dir) {
    let total = 0;
    const stack = [dir];
    while (stack.length) {
        const cur = stack.pop();
        let ents;
        try { ents = readdirSync(cur, { withFileTypes: true }); } catch { continue; }
        for (const e of ents) {
            const full = join(cur, e.name);
            if (e.isDirectory()) stack.push(full);
            else if (e.isFile()) { try { total += statSync(full).size; } catch { /* egal */ } }
        }
    }
    return total;
}

/** Profilverzeichnisse unter den Temp-Wurzeln finden, Tiefe und Zeit begrenzt. */
function findProfileDirs() {
    const deadline = Date.now() + WALK_BUDGET_MS;
    const found = [];
    const seen = new Set();
    const stack = TEMP_ROOTS_RAW.map((r) => ({ dir: r, depth: 0 }));
    let visited = 0;

    while (stack.length && visited < WALK_MAX_DIRS && Date.now() < deadline) {
        const { dir, depth } = stack.pop();
        const key = norm(dir);
        if (seen.has(key)) continue;
        seen.add(key);

        let ents;
        try { ents = readdirSync(dir, { withFileTypes: true }); } catch { continue; }
        visited++;

        if (looksLikeProfile(new Set(ents.map((e) => e.name)))) { found.push(dir); continue; }
        if (depth >= WALK_DEPTH) continue;
        for (const e of ents) {
            if (e.isDirectory() && !e.isSymbolicLink()) stack.push({ dir: join(dir, e.name), depth: depth + 1 });
        }
    }
    return found;
}

const ageMinOf = (p) => { try { return (Date.now() - statSync(p).mtimeMs) / 60_000; } catch { return 0; } };

/* -------------------------------------------------------------------- Lauf */

const browsers = listBrowsers().filter((b) => isUnderTemp(norm(b.profile)));

// Prozesse nach Profil buendeln. Alter des Jobs ist das Alter seines aeltesten Prozesses.
const jobs = new Map();
for (const b of browsers) {
    const key = norm(b.profile);
    const job = jobs.get(key) || { profile: b.profile, pids: [], rss: 0, ageMin: 0 };
    job.pids.push(b.pid);
    job.rss += b.rss;
    job.ageMin = Math.max(job.ageMin, b.ageMin);
    jobs.set(key, job);
}

const live = [];
const orphans = [];
for (const job of jobs.values()) {
    if (lockedByLiveJob(job.profile) || job.ageMin < MAX_AGE_MIN) live.push(job);
    else orphans.push(job);
}

// Profilreste ohne Prozess: alles, was kein laufender Job belegt.
const busy = new Set([...jobs.keys()]);
const staleDirs = findProfileDirs()
    .filter((d) => !busy.has(norm(d)) && !lockedByLiveJob(d) && ageMinOf(d) >= MAX_AGE_MIN)
    .map((d) => ({ dir: d, ageMin: Math.round(ageMinOf(d)), size: dirSize(d) }))
    .sort((a, b) => b.size - a.size);

if (!orphans.length && !staleDirs.length) {
    say(`Nichts aufzuraeumen.${live.length ? ` ${live.length} Job(s) laufen noch, unangetastet.` : ''}`);
    process.exit(0);
}

const procCount = orphans.reduce((n, j) => n + j.pids.length, 0);
const procRss = orphans.reduce((n, j) => n + j.rss, 0);
const staleBytes = staleDirs.reduce((n, s) => n + s.size, 0);

// Im Quiet-Modus nur die Summen, sonst die Einzelposten zum Gegenlesen.
if (orphans.length) {
    console.log(`Verwaiste Browser: ${orphans.length} Profil(e), ${procCount} Prozess(e), ${mb(procRss)} RAM`);
    for (const j of QUIET ? [] : [...orphans].sort((a, b) => b.ageMin - a.ageMin)) {
        console.log(`  ${String(j.ageMin).padStart(4)} min  ${String(j.pids.length).padStart(3)} Proz.  ${j.profile}`);
    }
}
if (staleDirs.length) {
    console.log(`Profilreste ohne Prozess: ${staleDirs.length} Verzeichnis(se), ${mb(staleBytes)}`);
    for (const s of QUIET ? [] : staleDirs.slice(0, 12)) {
        console.log(`  ${String(s.ageMin).padStart(5)} min  ${mb(s.size).padStart(8)}  ${s.dir}`);
    }
    if (!QUIET && staleDirs.length > 12) console.log(`  ... und ${staleDirs.length - 12} weitere`);
}
if (live.length) say(`Unangetastet, weil noch aktiv: ${live.length} Job(s)`);

if (DRY) {
    console.log(`--dry-run: nichts beendet, nichts geloescht. Freigeworden waeren ${mb(procRss)} RAM und ${mb(staleBytes)} Platte.`);
    process.exit(0);
}

killPids(orphans.flatMap((j) => j.pids));

let freed = 0;
let removed = 0;
const targets = [
    ...orphans.map((j) => ({ dir: j.profile, size: dirSize(j.profile) })),
    ...staleDirs,
];
for (const { dir, size } of targets) {
    try {
        rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
        rmSync(`${dir}.lock`, { force: true });
        freed += size;
        removed++;
    } catch { console.log(`  noch gesperrt, bleibt liegen: ${dir}`); }
}

// Ehrlich nachzaehlen statt Erfolg behaupten.
const leftover = listBrowsers()
    .filter((b) => isUnderTemp(norm(b.profile)))
    .filter((b) => orphans.some((j) => norm(j.profile) === norm(b.profile)));

console.log(`Beendet: ${procCount - leftover.length} von ${procCount} Prozess(en). `
    + `Geloescht: ${removed} Verzeichnis(se), ${mb(freed)}.`);
if (leftover.length) {
    console.log(`Nachzuegler, die noch laufen: ${leftover.length}. Ein erneuter Aufruf raeumt sie ab.`);
}
process.exit(0);
