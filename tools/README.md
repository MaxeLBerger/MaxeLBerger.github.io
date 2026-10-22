# tools/

Local development tooling. **Nothing in this folder is shipped to production.**

The deploy workflow ([../.github/workflows/deploy.yml](../.github/workflows/deploy.yml))
only copies `*.html`, `CNAME`, `assets/`, and `projects/`
into `dist/`. Everything in `tools/` is excluded.

## Contents

| Folder | Purpose |
|---|---|
| [hero-energy/](hero-energy/) | `make_energy.py` renders the hero plasma band (`assets/img/backgrounds/hero-energy*.webp`) procedurally: numpy, scipy and Pillow, `python tools/hero-energy/make_energy.py <out-dir> [seed]`. |
| [contrast-audit.mjs](contrast-audit.mjs) | Measures the text contrast of every visible element on every page, in both colour schemes and all 14 project themes, and exits non-zero below WCAG AA. Needs a local server: `python -m http.server 8817 --bind 127.0.0.1`, then `node tools/contrast-audit.mjs`. Cleans up its own headless browser by profile name and reaps orphans of earlier runs on start. |
| [reap-browsers.mjs](reap-browsers.mjs) | Kills orphaned headless browsers left behind by screenshot and audit scripts, and deletes their throwaway profiles. `node tools/reap-browsers.mjs --dry-run` to look first. Only touches profiles under a temp directory, and skips any run whose `<profile>.lock` still names a live PID. |
| [pixel-contrast/](pixel-contrast/) | Measures text contrast against the real rendered pixels, for copy that sits on a photo (the hero), where `contrast-audit.mjs` can only stack background colours and gives up. Screenshots with the text hidden, reports the worst case per element and viewport, and diffs two builds pixel by pixel to prove a change leaves other viewports alone. See its [README](pixel-contrast/README.md). |
| [perf-bench/](perf-bench/) | `bench.mjs` measures main-thread load at rest, wheel-scroll frame times and slide-change cost; `load.mjs` measures what a first visit downloads and when it paints, on desktop and on a phone with slow 4G; `serve.mjs` is a static server that gzips like GitHub Pages. See its [README](perf-bench/README.md). |
| [responsive-images.py](responsive-images.py) | Writes `-800` / `-1200` width variants (or `--widths 600,800`) next to a WebP master and prints the `srcset` value. Re-run after replacing a slider screenshot or the about photo. Needs Pillow. |
