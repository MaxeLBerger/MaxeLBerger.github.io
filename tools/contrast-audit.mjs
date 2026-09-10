#!/usr/bin/env node
/**
 * Kontrastpruefung fuer die Portfolio-Seiten.
 *
 * Laedt jede Seite in einem headless Edge, schaltet nacheinander jedes
 * Farbschema und jedes Projekt-Theme durch und misst fuer JEDES sichtbare
 * Element den Kontrast seiner Textfarbe gegen den tatsaechlich dahinter
 * liegenden Untergrund (inklusive Alpha-Stapelung ueber alle Vorfahren).
 *
 * Warum das noetig ist: die Projektfarben werden ueber `data-project-theme`
 * live getauscht. Eine Farbe, die auf dunklem Grund traegt, kann auf hellem
 * Grund unter 2:1 fallen. Genau das war der Grund fuer den Umbau des
 * Light mode; dieses Skript haelt das Ergebnis fest.
 *
 *   node tools/contrast-audit.mjs [--base http://127.0.0.1:8817] [--json out.json]
 *
 * Exit 1, sobald eine Stelle die Schwelle reisst.
 */
import { spawn } from 'node:child_process';
import { writeFileSync, rmSync, existsSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';

const EDGE_CANDIDATES = [
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
];

const args = process.argv.slice(2);
const opt = (name, fallback) => {
    const i = args.indexOf(`--${name}`);
    return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const BASE = opt('base', 'http://127.0.0.1:8817');
const JSON_OUT = opt('json', null);
const PORT = Number(opt('port', 9500 + (process.pid % 400)));

const PAGES = (opt('pages', 'index.html,impressum.html,datenschutz.html')).split(',');
const THEMES = [
    'maxhaak', 'capitalcombo', 'haakly', 'dealhunter', 'shookroko', 'senihelp24',
    'detreview', 'memecointrader', 'ageofmax', 'albert', 'aicaptain', 'medieval',
    'danielbrecheis', 'e46',
];
const SCHEMES = ['light', 'dark'];

/* Schwellen nach WCAG 2.1 AA. Grosse Schrift ist >= 24px, oder >= 18.66px
   ab Schriftschnitt 700. Bedienelemente und Konturen brauchen 3:1 (1.4.11). */
const T_TEXT = 4.5;
const T_LARGE = 3.0;

const edgePath = EDGE_CANDIDATES.find(p => existsSync(p));
if (!edgePath) {
    console.error('Kein Chromium/Edge gefunden. Pfad in EDGE_CANDIDATES ergaenzen.');
    process.exit(2);
}

const PROFILE = `${process.env.TEMP || '/tmp'}/contrast-audit-${Date.now()}`;
const edge = spawn(edgePath, [
    '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`,
    '--no-first-run', '--no-default-browser-check', '--force-prefers-reduced-motion',
    '--hide-scrollbars', '--window-size=1440,900', 'about:blank',
], { stdio: 'ignore' });

const cleanup = () => {
    try { edge.kill(); } catch { /* schon beendet */ }
    try { rmSync(PROFILE, { recursive: true, force: true }); } catch { /* egal */ }
};
process.on('exit', cleanup);

async function cdpJson(path) {
    for (let i = 0; i < 60; i++) {
        try { return await (await fetch(`http://127.0.0.1:${PORT}${path}`)).json(); }
        catch { await sleep(250); }
    }
    throw new Error('Debugger nicht erreichbar');
}

const version = await cdpJson('/json/version');
let msgId = 0;
const pending = new Map();
const ws = new WebSocket(version.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r));
ws.addEventListener('message', e => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++msgId;
    pending.set(id, m => (m.error ? rej(new Error(`${method}: ${m.error.message}`)) : res(m.result)));
    ws.send(JSON.stringify({ id, method, params, sessionId }));
});

/* Laeuft IM Browser. Bewusst als eine Funktion, damit sie ohne Bundler in
   Runtime.evaluate passt. */
const AUDIT_FN = `(function audit(tText, tLarge) {
    const parse = c => {
        const m = String(c).match(/rgba?\\(([^)]+)\\)/);
        if (!m) return null;
        const p = m[1].split(',').map(s => parseFloat(s));
        return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
    };
    const over = (fg, bg) => ({
        r: fg.r * fg.a + bg.r * (1 - fg.a),
        g: fg.g * fg.a + bg.g * (1 - fg.a),
        b: fg.b * fg.a + bg.b * (1 - fg.a),
        a: 1,
    });
    const lin = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    const lum = c => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
    const ratio = (a, b) => {
        const la = lum(a), lb = lum(b);
        return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
    };

    /* Effektiver Untergrund: von unten nach oben stapeln, bis eine deckende
       Flaeche erreicht ist. Elemente mit background-image werden ausgelassen,
       weil ein Foto keine messbare Einzelfarbe hat. */
    const bgOf = el => {
        let stack = [], node = el, hitImage = false;
        while (node && node.nodeType === 1) {
            const cs = getComputedStyle(node);
            if (cs.backgroundImage && cs.backgroundImage !== 'none') { hitImage = true; break; }
            const c = parse(cs.backgroundColor);
            if (c && c.a > 0) { stack.push(c); if (c.a >= 0.999) break; }
            node = node.parentElement;
        }
        if (hitImage) return null;
        if (!stack.length) return { r: 255, g: 255, b: 255, a: 1 };
        let acc = stack[stack.length - 1];
        if (acc.a < 0.999) acc = over(acc, { r: 255, g: 255, b: 255, a: 1 });
        for (let i = stack.length - 2; i >= 0; i--) acc = over(stack[i], acc);
        return acc;
    };

    const hasOwnText = el => {
        for (const n of el.childNodes) {
            if (n.nodeType === 3 && n.textContent.trim().length) return true;
        }
        return false;
    };

    const out = [];
    for (const el of document.querySelectorAll('body *')) {
        if (!hasOwnText(el)) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === 'hidden' || cs.display === 'none') continue;
        if (parseFloat(cs.opacity) < 0.15) continue;
        const rect = el.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;

        const fill = cs.webkitTextFillColor && cs.webkitTextFillColor !== 'currentcolor'
            ? cs.webkitTextFillColor : cs.color;
        /* Verlaufstext: die Schrift ist transparent und wird vom
           background-clip gefuellt. Nicht messbar, wird uebersprungen. */
        const fg = parse(fill);
        if (!fg || fg.a < 0.05) continue;
        const bg = bgOf(el);
        if (!bg) continue;

        const eff = fg.a < 0.999 ? over(fg, bg) : fg;
        const r = ratio(eff, bg);
        const size = parseFloat(cs.fontSize);
        const weight = parseInt(cs.fontWeight, 10) || 400;
        const large = size >= 24 || (size >= 18.66 && weight >= 700);
        const need = large ? tLarge : tText;
        if (r + 0.005 < need) {
            out.push({
                sel: el.tagName.toLowerCase()
                    + (el.id ? '#' + el.id : '')
                    + (el.className && typeof el.className === 'string'
                        ? '.' + el.className.trim().split(/\\s+/).join('.') : ''),
                text: (el.textContent || '').trim().slice(0, 40),
                ratio: Math.round(r * 100) / 100,
                need,
                size: Math.round(size * 10) / 10,
                weight,
                fg: cs.color,
                bg: 'rgb(' + Math.round(bg.r) + ',' + Math.round(bg.g) + ',' + Math.round(bg.b) + ')',
            });
        }
    }
    return JSON.stringify(out);
})(${T_TEXT}, ${T_LARGE})`;

const findings = [];
for (const page of PAGES) {
    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId: S } = await send('Target.attachToTarget', { targetId, flatten: true });
    await send('Page.enable', {}, S);
    await send('Runtime.enable', {}, S);
    await send('Emulation.setDeviceMetricsOverride',
        { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false }, S);
    await send('Page.addScriptToEvaluateOnNewDocument', {
        source: `try{localStorage.setItem('cookieConsent','accepted');localStorage.setItem('lang','de');}catch(e){}`,
    }, S);
    await send('Page.navigate', { url: `${BASE}/${page}` }, S);
    await sleep(3200);

    const evaluate = async expr => {
        const r = await send('Runtime.evaluate',
            { expression: expr, awaitPromise: true, returnByValue: true }, S);
        if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
        return r.result?.value;
    };

    /* Alles sichtbar machen: die Scroll-Reveals und content-visibility
       verstecken sonst zwei Drittel der Seite vor der Messung. */
    await evaluate(`(() => {
        const st = document.createElement('style');
        st.textContent = 'section{content-visibility:visible!important}'
            + '.scroll-reveal{opacity:1!important;transform:none!important}'
            + '*,*::before,*::after{transition:none!important;animation:none!important}';
        document.head.appendChild(st);
        return 1;
    })()`);

    for (const scheme of SCHEMES) {
        for (const theme of THEMES) {
            await evaluate(`(() => {
                document.documentElement.setAttribute('data-color-scheme', ${JSON.stringify(scheme)});
                document.documentElement.setAttribute('data-project-theme', ${JSON.stringify(theme)});
                return 1;
            })()`);
            const raw = await evaluate(AUDIT_FN);
            for (const f of JSON.parse(raw)) findings.push({ page, scheme, theme, ...f });
        }
    }
    await send('Target.closeTarget', { targetId });
}

/* Zusammenfassen: dieselbe Stelle faellt oft in mehreren Themes auf. */
const grouped = new Map();
for (const f of findings) {
    const key = `${f.page}|${f.scheme}|${f.sel}|${f.text}`;
    const g = grouped.get(key) || { ...f, themes: [], worst: Infinity };
    g.themes.push(f.theme);
    if (f.ratio < g.worst) { g.worst = f.ratio; g.fg = f.fg; g.bg = f.bg; }
    grouped.set(key, g);
}
const rows = [...grouped.values()].sort((a, b) => a.worst - b.worst);

console.log(`Kontrastpruefung: ${PAGES.length} Seiten x ${SCHEMES.length} Schemata x ${THEMES.length} Themes`);
console.log(`Schwellen: ${T_TEXT}:1 normal, ${T_LARGE}:1 gross (>=24px oder >=18.66px/700)\n`);
if (!rows.length) {
    console.log('Keine Unterschreitung gefunden.');
} else {
    for (const r of rows) {
        console.log(`${String(r.worst).padStart(5)}:1  (noetig ${r.need})  [${r.scheme}] ${r.page}`);
        console.log(`         ${r.sel.slice(0, 96)}`);
        console.log(`         "${r.text}"  ${r.size}px/${r.weight}  ${r.fg} auf ${r.bg}`);
        console.log(`         Themes: ${r.themes.length === THEMES.length ? 'alle' : r.themes.join(', ')}\n`);
    }
}
console.log(`Stellen unter der Schwelle: ${rows.length}  (Einzelmessungen: ${findings.length})`);

if (JSON_OUT) writeFileSync(JSON_OUT, JSON.stringify(rows, null, 2));
ws.close();
cleanup();
process.exit(rows.length ? 1 : 0);
