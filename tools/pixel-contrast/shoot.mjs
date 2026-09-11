#!/usr/bin/env node
/**
 * Screenshot capture for the real-pixel contrast probe.
 *
 * Loads a page in headless Edge at a list of viewport sizes, records where the
 * text actually sits (glyph run rects, not element boxes) and writes one PNG
 * per viewport tile plus a JSON sidecar. `measure.py` turns those into
 * contrast numbers or pixel diffs.
 *
 *   node tools/pixel-contrast/shoot.mjs --base http://127.0.0.1:8817 \
 *        --out shots/head --sizes 375x667,390x844 --schemes dark,light \
 *        --langs de,en --mode hidden
 *
 * Modes:
 *   hidden   the measured text gets `visibility: hidden` (layout unchanged),
 *            so the photo behind it can be sampled. This is what the contrast
 *            probe needs.
 *   visible  the page as a visitor sees it, for pixel diffs and sheets.
 *
 * Options:
 *   --base <url>        server root, required
 *   --build <segment>   path segment between base and page, for comparing two
 *                       exports served from one server (default: none)
 *   --page <file>       default index.html
 *   --out <dir>         output directory, required
 *   --sizes  WxH,...    default 375x667
 *   --schemes dark,light        --langs de,en
 *   --mode hidden|visible       --dsf <n>   (default 2 up to 1024px wide, else 1)
 *   --targets "name=selector;name=selector"   what to measure
 *   --hide "selector,selector"                what to hide in hidden mode
 *   --workers <n>       parallel browsers (default 4)
 *   --profiles <dir>    absolute, existing browser profile root
 *   --port <n>          first debugging port (default 9710)
 */
import { spawn } from 'node:child_process';
import net from 'node:net';
import { mkdirSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const EDGE_CANDIDATES = [
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
];

const argv = process.argv.slice(2);
const opt = (n, d) => {
    const i = argv.indexOf(`--${n}`);
    return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : d;
};

if (argv.includes('--help') || !opt('base') || !opt('out')) {
    console.error('Usage: node tools/pixel-contrast/shoot.mjs --base <url> --out <dir> [options]');
    console.error('See the header of this file or tools/pixel-contrast/README.md.');
    process.exit(argv.includes('--help') ? 0 : 2);
}

const BASE = opt('base').replace(/\/+$/, '');
const BUILD = opt('build', '');
const PAGE = opt('page', 'index.html');
const OUT = resolve(opt('out'));
const MODE = opt('mode', 'hidden');
const WORKERS = Number(opt('workers', 4));
const PORT0 = Number(opt('port', 9710));
const TAG = opt('tag', 'pixcontrast');
const sizes = opt('sizes', '375x667').split(',').map(s => s.trim()).filter(Boolean);
const schemes = opt('schemes', 'dark').split(',');
const langs = opt('langs', 'de').split(',');
const URL_PREFIX = BUILD ? `${BASE}/${BUILD.replace(/^\/+|\/+$/g, '')}` : BASE;

/* Default target set: the homepage hero, the one place where copy sits on a
   photo. `name=selector`, separated by semicolons so selectors may use commas. */
const DEFAULT_TARGETS = [
    'eyebrow=#hero .hero-eyebrow',
    'title1=#hero .hero-title .title-line:first-child',
    'title2=#hero .hero-title [data-i18n="hero.title2"]',
    'accent=#hero .hero-title .title-accent',
    'desc=#hero .hero-description',
    'link=#hero .hero-link',
    'clients=#hero .hero-clients-label',
].join(';');
const targets = Object.fromEntries(opt('targets', DEFAULT_TARGETS).split(';')
    .map(s => s.trim()).filter(Boolean)
    .map(s => [s.slice(0, s.indexOf('=')).trim(), s.slice(s.indexOf('=') + 1).trim()]));

/* Hide the text itself, never an ancestor: on this site the veil that is being
   measured is a ::before of `.hero-content`, the parent of `.hero-text`, and
   hiding the parent would hide the veil along with the copy. */
const HIDE = opt('hide', '#hero .hero-text,#hero .hero-text *,#navbar');

const edgePath = EDGE_CANDIDATES.find(p => existsSync(p));
if (!edgePath) {
    console.error('No Chromium or Edge found. Add the path to EDGE_CANDIDATES.');
    process.exit(2);
}

/* A relative or missing --user-data-dir makes Edge silently fall back to the
   real default profile, so the root has to exist before anything launches. */
const PROFILES = resolve(opt('profiles', join(tmpdir(), 'pixel-contrast-profiles')));
mkdirSync(PROFILES, { recursive: true });
if (!existsSync(PROFILES) || !statSync(PROFILES).isDirectory()) {
    console.error(`--profiles is not a directory: ${PROFILES}`);
    process.exit(2);
}
mkdirSync(OUT, { recursive: true });

const jobs = [];
for (const scheme of schemes) for (const lang of langs) for (const s of sizes) {
    const [w, h] = s.split('x').map(Number);
    const dsf = Number(opt('dsf', 0)) || (w <= 1024 ? 2 : 1);
    jobs.push({ name: `${scheme}-${lang}-${w}x${h}-${MODE}`, w, h, dsf, scheme, lang });
}

function client(ws) {
    let seq = 0;
    const pending = new Map();
    const listeners = new Set();
    ws.addEventListener('message', e => {
        const m = JSON.parse(e.data);
        if (m.id !== undefined && pending.has(m.id)) {
            const p = pending.get(m.id);
            pending.delete(m.id);
            if (m.error) p.rej(new Error(`${p.method}: ${m.error.message}`)); else p.res(m.result);
        } else if (m.method) {
            for (const l of [...listeners]) l(m);
        }
    });
    const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
        const id = ++seq;
        pending.set(id, { res, rej, method });
        ws.send(JSON.stringify(sessionId ? { id, method, params, sessionId } : { id, method, params }));
    });
    const once = (method, sessionId, ms = 30000) => new Promise((res, rej) => {
        const fn = m => {
            if (m.method === method && m.sessionId === sessionId) {
                clearTimeout(t); listeners.delete(fn); res(m.params);
            }
        };
        const t = setTimeout(() => { listeners.delete(fn); rej(new Error(`timeout waiting for ${method}`)); }, ms);
        listeners.add(fn);
    });
    return { send, once };
}

const portBusy = port => new Promise(res => {
    const s = net.connect({ port, host: '127.0.0.1' });
    s.once('connect', () => { s.destroy(); res(true); });
    s.once('error', () => res(false));
});

async function startEdge(i) {
    const profile = join(PROFILES, `${TAG}-${MODE}-w${i}-${process.pid}`);
    mkdirSync(profile, { recursive: true });
    /* Never attach to a debugging port some other browser already holds. */
    let port = PORT0 + i * 3;
    while (await portBusy(port)) port++;
    const proc = spawn(edgePath, [
        '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
        '--no-first-run', '--no-default-browser-check', '--disable-extensions', '--disable-sync',
        '--disable-background-networking', '--disable-component-update', '--disable-default-apps',
        '--force-prefers-reduced-motion', '--hide-scrollbars', '--mute-audio',
        // Without these four, parallel runs differ by 1 to 7 levels on photos.
        '--disable-gpu', '--force-color-profile=srgb', '--disable-checker-imaging',
        '--disable-partial-raster', '--window-size=1920,1400', 'about:blank',
    ], { stdio: 'ignore', windowsHide: true });
    let version = null;
    for (let k = 0; k < 120 && !version; k++) {
        try { version = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); }
        catch { await sleep(250); }
    }
    if (!version) { try { proc.kill(); } catch { /* gone */ } throw new Error(`CDP on port ${port} never came up`); }
    const ws = new WebSocket(version.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
        ws.addEventListener('open', res, { once: true });
        ws.addEventListener('error', rej, { once: true });
    });
    return { proc, ws, c: client(ws), port, profile };
}

const STYLE_CSS = '*,*::before,*::after{transition:none!important;animation:none!important;caret-color:transparent!important}'
    + 'html{scroll-behavior:auto!important}#cookieConsent{display:none!important}'
    + (MODE === 'hidden' ? `${HIDE}{visibility:hidden!important}` : '');

const STYLE_FN = `(() => {
    const st = document.createElement('style');
    st.id = 'pixel-contrast-style';
    st.textContent = ${JSON.stringify(STYLE_CSS)};
    document.head.appendChild(st);
    return true;
})()`;

/* Wait for everything that moves text after load: the consent-gated webfont,
   the hero image, then two frames. `document.fonts.ready` alone resolves
   before a font that is still being fetched by a late stylesheet. */
const READY_FN = `(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const t0 = performance.now();
    let link = document.querySelector('link[data-google-fonts]');
    for (let k = 0; !link && k < 30; k++) { await wait(100); link = document.querySelector('link[data-google-fonts]'); }
    let sheet = false;
    if (link) {
        for (let k = 0; k < 100 && !sheet; k++) {
            if (link.sheet) sheet = true; else await wait(100);
        }
        await Promise.all(['400 16px Inter', '500 16px Inter', '600 16px Inter', '700 40px Inter']
            .map(f => document.fonts.load(f).catch(() => null)));
    }
    await document.fonts.ready;
    const inter = [...document.fonts].filter(f => /Inter/.test(f.family));
    /* Only images that are really loading: a lazy image far below the fold
       never fires load, so waiting on it would hang the whole run. Anything
       that scrolls into view during tiling is covered by the settle rule. */
    const imgs = [...document.images].filter(i => i.complete || i.loading !== 'lazy');
    await Promise.race([
        Promise.all(imgs.map(i => (i.complete ? Promise.resolve() : new Promise(r => {
            i.addEventListener('load', r, { once: true });
            i.addEventListener('error', r, { once: true });
        })).then(() => (i.decode ? i.decode().catch(() => null) : null)))),
        wait(8000),
    ]);
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    await wait(200);
    const css = [...document.styleSheets].map(s => s.href || '').find(h => h.includes('main.css'));
    return {
        ms: Math.round(performance.now() - t0), fontsLink: !!link, fontsSheet: sheet,
        interFaces: inter.length, interLoaded: inter.filter(f => f.status === 'loaded').length,
        broken: imgs.filter(i => !i.naturalWidth).map(i => i.currentSrc || i.src).slice(0, 8),
        theme: document.documentElement.getAttribute('data-project-theme'),
        scheme: document.documentElement.getAttribute('data-color-scheme'),
        lang: document.documentElement.lang, css,
    };
})()`;

/* Text boxes come from a Range over every text node, so a block element's
   empty right half never gets sampled as if the text were there. */
const MEASURE_FN = `(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const sx = window.scrollX, sy = window.scrollY;
    const T = ${JSON.stringify(targets)};
    const targets = {};
    for (const [k, sel] of Object.entries(T)) {
        const el = document.querySelector(sel);
        if (!el) continue;
        const cs = getComputedStyle(el);
        const rects = [];
        const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        let n;
        while ((n = tw.nextNode())) {
            if (!n.textContent.trim()) continue;
            const r = document.createRange();
            r.selectNodeContents(n);
            for (const b of r.getClientRects()) {
                if (b.width > 0.5 && b.height > 0.5) rects.push([b.left + sx, b.top + sy, b.right + sx, b.bottom + sy]);
            }
        }
        const bb = el.getBoundingClientRect();
        targets[k] = {
            color: cs.color, fontSize: parseFloat(cs.fontSize), fontWeight: parseInt(cs.fontWeight, 10) || 400,
            text: el.textContent.trim().slice(0, 60), rects,
            box: [bb.left + sx, bb.top + sy, bb.right + sx, bb.bottom + sy],
        };
    }
    /* How far down to capture: the element named by --region if there is one,
       otherwise just far enough to cover every measured text box. */
    const regionEl = ${JSON.stringify(opt('region', ''))} ? document.querySelector(${JSON.stringify(opt('region', ''))}) : null;
    const region = regionEl
        ? [regionEl.getBoundingClientRect().top + sy, regionEl.getBoundingClientRect().bottom + sy]
        : Object.values(targets).reduce((acc, t) => {
            for (const r of t.rects) { acc[0] = Math.min(acc[0], r[1]); acc[1] = Math.max(acc[1], r[3]); }
            return acc;
        }, [Infinity, 0]);
    return {
        targets, regionTop: region[0], regionBottom: region[1],
        docH: document.documentElement.scrollHeight, innerW: innerWidth, innerH: innerHeight,
    };
})()`;

async function shoot(c, job) {
    const { browserContextId } = await c.send('Target.createBrowserContext');
    const { targetId } = await c.send('Target.createTarget', { url: 'about:blank', browserContextId });
    const { sessionId: S } = await c.send('Target.attachToTarget', { targetId, flatten: true });
    try {
        await c.send('Page.enable', {}, S);
        await c.send('Runtime.enable', {}, S);
        const mobile = job.w <= 1024;
        await c.send('Emulation.setDeviceMetricsOverride', {
            width: job.w, height: job.h, deviceScaleFactor: job.dsf, mobile,
            screenWidth: job.w, screenHeight: job.h,
        }, S);
        if (mobile) await c.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 }, S);
        await c.send('Page.addScriptToEvaluateOnNewDocument', {
            source: `try{localStorage.setItem('color-scheme',${JSON.stringify(job.scheme)});`
                + `localStorage.setItem('lang',${JSON.stringify(job.lang)});`
                + `localStorage.setItem('cookieConsent','accepted');}catch(e){}`,
        }, S);
        const loaded = c.once('Page.loadEventFired', S, 45000);
        await c.send('Page.navigate', { url: `${URL_PREFIX}/${PAGE}` }, S);
        await loaded;
        const ev = async expr => {
            const r = await c.send('Runtime.evaluate',
                { expression: expr, awaitPromise: true, returnByValue: true }, S);
            if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
            return r.result.value;
        };
        await ev(STYLE_FN);
        const ready = await ev(READY_FN);
        const info = await ev(MEASURE_FN);

        /* Viewport tiles, never captureBeyondViewport: that resizes the
           viewport, and a 100dvh section with bottom-aligned copy moves. */
        const bottom = Math.ceil(Math.max(info.regionBottom, 1));
        const maxScroll = Math.max(0, info.docH - info.innerH);
        const tops = [0];
        while (tops.at(-1) + job.h < bottom && tops.at(-1) < maxScroll) {
            tops.push(Math.min(tops.at(-1) + job.h - 110, maxScroll));
        }
        const tiles = [];
        for (const [ti, top] of tops.entries()) {
            const y = await ev(`(async () => {
                window.scrollTo({ top: ${top}, left: 0, behavior: 'instant' });
                await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
                await new Promise(r => setTimeout(r, 150));
                return window.scrollY;
            })()`);
            /* Settle rule: keep shooting until two consecutive frames are
               byte-identical. Catches late fonts, decodes and transitions. */
            let prev = null, data = null, frames = 0, settled = false;
            while (frames < 12) {
                const r = await c.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }, S);
                frames++;
                if (prev !== null && r.data === prev) { settled = true; data = r.data; break; }
                prev = r.data;
                await sleep(200);
            }
            if (!data) data = prev;
            const file = `${job.name}.t${ti}.png`;
            writeFileSync(join(OUT, file), Buffer.from(data, 'base64'));
            tiles.push({ top: y, file, frames, settled });
        }
        writeFileSync(join(OUT, `${job.name}.json`),
            JSON.stringify({ job, build: BUILD, page: PAGE, mode: MODE, ready, info, tiles }, null, 1));
        const flags = [
            tiles.every(t => t.settled) ? '' : 'UNSETTLED',
            ready.interLoaded ? '' : 'NO-WEBFONT',
            ready.broken.length ? `BROKEN-IMG:${ready.broken.length}` : '',
        ].filter(Boolean).join(' ');
        return `${job.name.padEnd(34)} tiles=${tiles.length} frames=${tiles.map(t => t.frames).join('/')} `
            + `theme=${ready.theme} ${flags}`;
    } finally {
        await c.send('Target.closeTarget', { targetId }).catch(() => {});
        await c.send('Target.disposeBrowserContext', { browserContextId }).catch(() => {});
    }
}

const queue = [...jobs];
const failures = [];
const edges = [];

async function worker(i) {
    const e = await startEdge(i);
    edges.push(e);
    while (queue.length) {
        const job = queue.shift();
        try {
            console.log(await Promise.race([
                shoot(e.c, job),
                sleep(90000).then(() => { throw new Error('job timeout'); }),
            ]));
        } catch (err) {
            failures.push({ job: job.name, err: String(err) });
            console.log(`FAIL ${job.name}: ${err}`);
        }
    }
}

try {
    await Promise.all(Array.from({ length: Math.min(WORKERS, jobs.length) }, (_, i) => worker(i)));
} finally {
    /* child.kill() does not stop headless Edge on Windows: it leaks a browser
       that keeps its port and profile. Close it over CDP first. */
    for (const e of edges) {
        try { await Promise.race([e.c.send('Browser.close'), sleep(3000)]); } catch { /* closed */ }
        try { e.ws.close(); } catch { /* closed */ }
        try { e.proc.kill(); } catch { /* gone */ }
    }
}
console.log(`done: ${jobs.length - failures.length}/${jobs.length} ok (${MODE}${BUILD ? ', ' + BUILD : ''})`);
if (failures.length) { console.log(JSON.stringify(failures, null, 1)); process.exitCode = 1; }
