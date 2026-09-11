# tools/

Local development tooling. **Nothing in this folder is shipped to production.**

The deploy workflow ([../.github/workflows/deploy.yml](../.github/workflows/deploy.yml))
only copies `*.html`, `CNAME`, `assets/`, and `projects/`
into `dist/`. Everything in `tools/` is excluded.

## Contents

| Folder | Purpose |
|---|---|
| [mcp-portfolio-server/](mcp-portfolio-server/) | MCP (Model Context Protocol) server that exposes portfolio data to Claude/Cline for AI-assisted edits. |
| [hero-energy/](hero-energy/) | `make_energy.py` renders the hero plasma band (`assets/img/backgrounds/hero-energy*.webp`) procedurally: numpy, scipy and Pillow, `python tools/hero-energy/make_energy.py <out-dir> [seed]`. |
| [contrast-audit.mjs](contrast-audit.mjs) | Measures the text contrast of every visible element on every page, in both colour schemes and all 14 project themes, and exits non-zero below WCAG AA. Needs a local server: `python -m http.server 8817 --bind 127.0.0.1`, then `node tools/contrast-audit.mjs`. |
| [pixel-contrast/](pixel-contrast/) | Measures text contrast against the real rendered pixels, for copy that sits on a photo (the hero), where `contrast-audit.mjs` can only stack background colours and gives up. Screenshots with the text hidden, reports the worst case per element and viewport, and diffs two builds pixel by pixel to prove a change leaves other viewports alone. See its [README](pixel-contrast/README.md). |
