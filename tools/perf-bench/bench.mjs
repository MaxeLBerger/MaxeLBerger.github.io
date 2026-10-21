#!/usr/bin/env node
/**
 * Frame and main-thread benchmark for the portfolio start page.
 *
 * Opens the page in a real (headed, GPU-backed) Edge window placed off-screen
 * and measures three things a visitor feels:
 *   idle_projects / idle_skills  standing still on a section: how busy the
 *                                main thread stays and whether frames drop
 *   wheelScroll                  mouse-wheel scroll from top to bottom
 *   slideChange                  three clicks on the "next project" arrow
 *
 * Each scenario runs --runs times; the median run per metric is reported.
 *
 *   npm i --no-save playwright-core
 *   node tools/perf-bench/bench.mjs --url http://127.0.0.1:8702/ --throttle 4
 *
 * Options:
 *   --url <url>         page to measure (required)
 *   --throttle <n>      CPU slowdown factor, 4 approximates an average office PC
 *   --runs <n>          repetitions, default 3
 *   --size WxH          viewport, default 1920x1080
 *   --channel <name>    browser channel, default msedge (chrome also works)
 *   --css <rules>       extra CSS injected after load, for A/B experiments
 */
import { chromium } from 'playwright-core';

const args = Object.fromEntries(process.argv.slice(2).reduce((acc, cur, i, all) => {
    if (cur.startsWith('--')) acc.push([cur.slice(2), all[i + 1]]);
    return acc;
}, []));
if (!args.url) {
    console.error('usage: bench.mjs --url <url> [--throttle 4] [--runs 3]');
    process.exit(1);
}
const THROTTLE = Number(args.throttle || 1);
const RUNS = Number(args.runs || 3);
const [W, H] = (args.size || '1920x1080').split('x').map(Number);

const browser = await chromium.launch({
    channel: args.channel || 'msedge',
    headless: false,
    args: [
        '--window-position=-3000,0',
        `--window-size=${W},${H + 80}`,
        '--disable-background-timer-throttling',
        '--disable-renderer-backgrounding',
        '--disable-backgrounding-occluded-windows',
    ],
});

function frames(d) {
    d = d.slice(3).sort((a, b) => a - b);
    if (!d.length) return { fps: 0, p95: 0, max: 0, janky: 0 };
    const avg = d.reduce((a, b) => a + b, 0) / d.length;
    const q = p => +d[Math.min(d.length - 1, Math.floor(d.length * p))].toFixed(1);
    return { fps: Math.round(1000 / avg), p95: q(0.95), max: q(1), janky: d.filter(x => x > 25).length };
}

async function runOnce() {
    const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto(args.url, { waitUntil: 'load' });
    await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' + (args.css || '') });
    await page.waitForTimeout(2500);
    await page.evaluate(() => {
        window.__d = [];
        let last = performance.now();
        const f = t => { window.__d.push(t - last); last = t; requestAnimationFrame(f); };
        requestAnimationFrame(f);
    });
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Performance.enable');
    if (THROTTLE > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: THROTTLE });
    const metric = async () => Object.fromEntries(
        (await cdp.send('Performance.getMetrics')).metrics.map(m => [m.name, m.value]));

    const measure = async (action) => {
        const m0 = await metric();
        await page.evaluate(() => { window.__d = []; });
        const t0 = Date.now();
        await action();
        const secs = (Date.now() - t0) / 1000;
        const d = await page.evaluate(() => window.__d);
        const m1 = await metric();
        return {
            ...frames(d),
            busy: Math.round(((m1.TaskDuration - m0.TaskDuration) / secs) * 100),
            styleMs: Math.round((m1.RecalcStyleDuration - m0.RecalcStyleDuration) * 1000),
        };
    };

    const r = {};
    for (const id of ['projects', 'skills']) {
        await page.evaluate(id => window.scrollTo(0, document.getElementById(id).offsetTop), id);
        await page.waitForTimeout(700);
        r['idle_' + id] = await measure(() => page.waitForTimeout(3000));
    }

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(700);
    await page.mouse.move(W / 2, H / 2);
    r.wheelScroll = await measure(async () => {
        for (let i = 0; i < 140; i++) {
            await page.mouse.wheel(0, 50);
            await page.waitForTimeout(16);
        }
    });

    await page.evaluate(() => window.scrollTo(0, document.getElementById('projects').offsetTop));
    await page.waitForTimeout(700);
    r.slideChange = await measure(async () => {
        for (let i = 0; i < 3; i++) {
            await page.click('.slider-arrow-right');
            await page.waitForTimeout(1300);
        }
    });

    await ctx.close();
    return r;
}

const runs = [];
for (let i = 0; i < RUNS; i++) runs.push(await runOnce());
await browser.close();

const median = xs => xs.slice().sort((a, b) => a - b)[Math.floor(xs.length / 2)];
const out = {};
for (const scen of Object.keys(runs[0])) {
    out[scen] = {};
    for (const key of Object.keys(runs[0][scen])) out[scen][key] = median(runs.map(r => r[scen][key]));
}
console.log(JSON.stringify({ url: args.url, throttle: THROTTLE, runs: RUNS, size: `${W}x${H}`, result: out }, null, 2));
