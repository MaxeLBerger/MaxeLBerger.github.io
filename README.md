# Maximilian Haak — Portfolio

[![Deploy](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/deploy.yml)

**Live:** [maximilianhaak.de](https://maximilianhaak.de)

Static portfolio site for Maximilian Haak — fullstack developer & AI specialist from Bruckmühl/Rosenheim. Vanilla HTML / CSS / JavaScript, no build step. Deployed to GitHub Pages on every push to `main`.

---

## Featured Projects

All projects are showcased on the homepage and have detail pages under [projects/](projects/):

| Project | Type | Detail page |
|---------|------|-------------|
| AI Captain | VS Code extension (AI agent) | [aicaptain.html](projects/aicaptain.html) |
| Imkerei Feuerstein | Customer website | [imkerei-feuerstein.html](projects/imkerei-feuerstein.html) |
| CoHa | Startup MVP | [coha.html](projects/coha.html) |
| E46 Studio | Desktop app | [e46-studio.html](projects/e46-studio.html) |
| SoundOfLvke | Artist website | [soundoflvke.html](projects/soundoflvke.html) |
| Shookroko | Browser game | [shookroko.html](projects/shookroko.html) |

---

## Tech Stack

- **Frontend:** HTML5, CSS3 (custom design tokens), vanilla JavaScript (ES6+)
- **Animations:** GSAP 3.12 + ScrollTrigger (CDN)
- **Fonts:** Inter (Google Fonts, loaded after consent)
- **Hosting:** GitHub Pages, custom domain via `CNAME`
- **i18n:** Custom DE/EN dictionary in [script.js](script.js) — no framework

---

## Repository Structure

```
.
├── index.html              # Homepage (hero slider + sections)
├── style.css               # Main stylesheet (design tokens + theming)
├── script.js               # Slider, theme, i18n, animations
├── impressum.html          # Legal info
├── datenschutz.html        # Privacy policy
├── projects/               # Project detail pages
├── res/                    # Static assets (backgrounds, icons, profile, projects)
├── tools/mcp-portfolio-server/ # Local MCP dev tool — not deployed
└── .github/workflows/      # CI: deploy.yml
```

---

## Local Development

```powershell
python -m http.server 8000
# or
npx serve .
```

Open <http://localhost:8000>. No build step.

---

## CI / CD

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) is a two-job pipeline:

### Job `build` — runs on every push and PR

| Step | Fails the build when… |
|------|-----------------------|
| **Verify required entry points** | `index.html`, `style.css`, `script.js`, `CNAME`, `impressum.html`, or `datenschutz.html` is missing |
| **Asset size guard** | Any image/video under `res/` or `projects/` exceeds **`MAX_ASSET_KB` (600 KB)** — bump only with a real reason |
| **Assemble dist/** | — (globs all top-level `*.html`, copies `res/`, `projects/`, writes `.nojekyll`) |
| **Internal-link check** | Any `src=` / `href=` in a shipped HTML file points at a local target that doesn't exist in `dist/` |
| **Build size report** | — (writes a per-folder + top-10-largest summary to the job page) |
| **Upload Pages artifact** | (skipped on PRs) |

### Job `deploy` — only on push to `main`

Gated behind `build`. Publishes to the `github-pages` environment via `actions/deploy-pages@v4`.

PRs run the validators but never publish.

---

## Conventions

When adding/changing things, keep these in mind (full rules in [`.github/copilot-instructions.md`](.github/copilot-instructions.md)):

- **Images:** convert to WebP first, keep each file ≤ 600 KB (CI will fail otherwise).
- **i18n:** every visible string uses `data-i18n="key"`; update both `translations.de` and `translations.en` in [script.js](script.js).
- **Theming:** `data-color-scheme` (light/dark) and `data-project-theme` (per-project palette) on `<html>`. Single writer is `themeController` in [script.js](script.js).
- **No inline `style="..."`** for state — use CSS classes (`.is-success`, `.is-error`, `.active`, …).
- **No build tools, no analytics, no third-party scripts** without updating [datenschutz.html](datenschutz.html).

---

## License

© Maximilian Haak. All rights reserved.
