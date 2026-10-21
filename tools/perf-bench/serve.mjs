#!/usr/bin/env node
/**
 * Minimal static server that compresses like GitHub Pages does (gzip for
 * text types), so load measurements see realistic CSS/JS/HTML transfer
 * sizes. python -m http.server sends everything uncompressed, which makes
 * render-blocking CSS look about four times as heavy as it is in production.
 *
 *   node tools/perf-bench/serve.mjs <root-dir> <port>
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { gzipSync } from 'node:zlib';

const root = resolve(process.argv[2] || '.');
const port = Number(process.argv[3] || 8000);

const TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain; charset=utf-8',
    '.xml': 'application/xml',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
};
const COMPRESS = new Set(['.html', '.css', '.js', '.mjs', '.json', '.svg', '.txt', '.xml']);

createServer(async (req, res) => {
    try {
        let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
        if (path.endsWith('/')) path += 'index.html';
        const file = normalize(join(root, path));
        if (!file.startsWith(root)) throw new Error('outside root');
        const info = await stat(file);
        if (!info.isFile()) throw new Error('not a file');
        const ext = extname(file).toLowerCase();
        let body = await readFile(file);
        const headers = { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Cache-Control': 'max-age=600' };
        if (COMPRESS.has(ext) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
            body = gzipSync(body, { level: 6 });
            headers['Content-Encoding'] = 'gzip';
        }
        headers['Content-Length'] = body.length;
        res.writeHead(200, headers);
        res.end(req.method === 'HEAD' ? undefined : body);
    } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('not found');
    }
}).listen(port, '127.0.0.1', () => console.log(`serving ${root} on http://127.0.0.1:${port}/`));
