#!/usr/bin/env node
/**
 * First-visit load benchmark for the portfolio start page.
 *
 * Opens the page in a fresh profile (empty cache), on a desktop and a phone profile, and
 * reports what a first-time visitor downloads and when things show up:
 *   bytes      transferred KB per type until the page is quiet (6 s after
 *              load, so on-demand loads triggered right after start count)
 *   requests   number of requests in the same window
 *   fcp / lcp  first and largest contentful paint
 *   font       when the web font finished downloading
 *
 * Each profile runs --runs times; the median per metric is reported.
 *
 *   npm i --no-save playwright-core
 *   node tools/perf-bench/load.mjs --url http://127.0.0.1:8702/
 *
 * Options:
 *   --url <url>       page to measure (required)
 *   --runs <n>        repetitions, default 3
 *   --channel <name>  browser channel, default msedge
 *
 * Serve the page with tools/perf-bench/serve.mjs: it gzips text like GitHub
 * Pages does. python's http.server does not, which inflates CSS/JS/HTML.
 */
import { chromium } from 'playwright-core';

const args = Object.fromEntries(process.argv.slice(2).reduce((acc, cur, i, all) => {
    if (cur.startsWith('--')) acc.push([cur.slice(2), all[i + 1]]);
    return acc;
}, []));
if (!args.url) {
    console.error('usage: load.mjs --url <url> [--runs 3]');
    process.exit(1);
}
const RUNS = Number(args.runs || 3);

// Network: desktop on a typical DSL line, phone on a slow 4G (the
// Lighthouse mobile preset: 1.6 Mbit/s down, 150 ms round trip).
const PROFILES = {
    desktop: { viewport: { width: 1920, height: 1080 }, dpr: 1, mobile: false,
        net: { latency: 40, downloadThroughput: (16 * 1024 * 1024) / 8, uploadThroughput: (4 * 1024 * 1024) / 8 } },
    phone: { viewport: { width: 390, height: 844 }, dpr: 3, mobile: true,
        net: { latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 } },
};

const browser = await chromium.launch({
    channel: args.channel || 'msedge',
    headless: false,
    args: [
        '--window-position=-3000,0',
        '--disable-background-timer-throttling',
        '--disable-renderer-backgrounding',
        '--disable-backgrounding-occluded-windows',
    ],
});

function kind(url) {
    if (/\.(webp|png|jpe?g|svg|gif|avif)(\?|$)/i.test(url)) return 'img';
    if (/\.woff2?(\?|$)/i.test(url)) return 'font';
    if (/\.(css)(\?|$)/i.test(url)) return 'css';
    if (/\.(m?js)(\?|$)/i.test(url)) return 'js';
    return 'other';
}

async function runOnce(profile) {
    const ctx = await browser.newContext({
        viewport: profile.viewport,
        deviceScaleFactor: profile.dpr,
        isMobile: profile.mobile,
        hasTouch: profile.mobile,
    });
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', { offline: false, ...profile.net });
    await page.addInitScript(() => {
        window.__lcp = 0;
        new PerformanceObserver(list => {
            for (const e of list.getEntries()) window.__lcp = e.startTime;
        }).observe({ type: 'largest-contentful-paint', buffered: true });
    });

    await page.goto(args.url, { waitUntil: 'load', timeout: 120000 });
    await page.waitForTimeout(6000);
    const data = await page.evaluate(() => {
        const res = performance.getEntriesByType('resource');
        const fcp = performance.getEntriesByName('first-contentful-paint')[0];
        const font = res.find(r => /\.woff2/.test(r.name));
        return {
            res: res.map(r => ({ name: r.name, size: r.transferSize || r.encodedBodySize })),
            fcp: fcp ? fcp.startTime : 0,
            lcp: window.__lcp,
            font: font ? font.responseEnd : 0,
            load: performance.getEntriesByType('navigation')[0].loadEventEnd,
        };
    });
    await ctx.close();

    // One entry per URL: a repeat request for the same file is a cache hit.
    const unique = new Map(data.res.map(r => [r.name, r.size]));
    const bytes = { img: 0, font: 0, css: 0, js: 0, other: 0 };
    for (const [name, size] of unique) bytes[kind(name)] += size;
    const kb = n => Math.round(n / 1024);
    return {
        totalKB: kb(Object.values(bytes).reduce((a, b) => a + b, 0)),
        imgKB: kb(bytes.img), fontKB: kb(bytes.font), cssKB: kb(bytes.css), jsKB: kb(bytes.js),
        requests: unique.size + 1,
        fcpMs: Math.round(data.fcp), lcpMs: Math.round(data.lcp),
        fontMs: Math.round(data.font), loadMs: Math.round(data.load),
    };
}

const median = xs => xs.slice().sort((a, b) => a - b)[Math.floor(xs.length / 2)];
const out = {};
for (const [name, profile] of Object.entries(PROFILES)) {
    const runs = [];
    for (let i = 0; i < RUNS; i++) runs.push(await runOnce(profile));
    out[name] = Object.fromEntries(Object.keys(runs[0]).map(k => [k, median(runs.map(r => r[k]))]));
}
await browser.close();
console.log(JSON.stringify({ url: args.url, runs: RUNS, result: out }, null, 2));
