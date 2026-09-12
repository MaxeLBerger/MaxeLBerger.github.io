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
| [contrast-audit.mjs](contrast-audit.mjs) | Measures the text contrast of every visible element on every page, in both colour schemes and all 14 project themes, and exits non-zero below WCAG AA. Needs a local server: `python -m http.server 8817 --bind 127.0.0.1`, then `node tools/contrast-audit.mjs`. Cleans up its own headless browser by profile name and reaps orphans of earlier runs on start. |
| [reap-browsers.mjs](reap-browsers.mjs) | Kills orphaned headless browsers left behind by screenshot and audit scripts, and deletes their throwaway profiles. `node tools/reap-browsers.mjs --dry-run` to look first. Only touches profiles under a temp directory, and skips any run whose `<profile>.lock` still names a live PID. |
