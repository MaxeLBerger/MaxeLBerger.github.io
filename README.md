# Maximilian Haak: Portfolio

[![Deploy](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/deploy.yml)

**Live:** [maximilianhaak.de](https://maximilianhaak.de)

Static portfolio site for Maximilian Haak, fullstack developer and AI specialist from Bruckmühl near Rosenheim. Vanilla HTML, CSS and JavaScript, no build step. Deployed to GitHub Pages on every push to `main`.

---

## Homepage sections

| Section | What it is |
|---------|------------|
| `#hero` | Right-anchored portrait photo, text column on the left with a two-line headline, one primary button plus one text link, a five-tile tech strip and a vertical tagline at the right edge. Static, no slider. |
| `#projects` | Project slider with a mode switch between own work and client work. Height follows the content; arrows and pagination sit below the slide. |
| `#about` | Personal section with a portrait frame and compact facts. |
| `#skills` | Tech stack, three grouped boxes with icon tiles. |
| `#pricing` | Three website packages plus maintenance and hourly rate. |
| `#contact` | Contact links, location and a mailto form. |

---

## Projects

The slider on the homepage runs in two modes, filtered through `data-mode` on both slides and pagination buttons. Default is `own`.

### Own work (`data-mode="own"`)

| Project | Type | Detail page |
|---------|------|-------------|
| E46 Studio | Desktop app (Electron) | [e46-studio.html](projects/e46-studio.html) |
| AI Captain | VS Code extension (AI agent) | [aicaptain.html](projects/aicaptain.html) |
| Albert Royale | 3D game with a self-built neural net | [albert.html](projects/albert.html) |
| Medieval Tower Defense | Browser game | none |
| Shookroko | Browser game (Phaser 3) | [shookroko.html](projects/shookroko.html) |
| dog-kennel-online | Web app, in progress | none |

### Client work (`data-mode="customers"`)

| Project | Type | Detail page |
|---------|------|-------------|
| Imkerei Feuerstein | Online shop | [imkerei-feuerstein.html](projects/imkerei-feuerstein.html) |
| Co Ha | Restaurant site | [coha.html](projects/coha.html) |
| Daniel Brecheis | Consultant site (Human Bridges), in progress, live 1 October | none while unreleased |
| Kaya Seeds | Online shop | [kayaseeds.html](projects/kayaseeds.html) |
| JK Entertainment | Trading card shop | [jkentertainment.html](projects/jkentertainment.html) |
| Sound of Lvke | Artist site | [soundoflvke.html](projects/soundoflvke.html) |
| Senihelp24 | Care service site, in progress | none |

Slides without a detail page link to the live site or to `#contact` instead. `Senihelp24` and `Daniel Brecheis` have no
screenshot on the slide and use the shared `.project-mock` placeholder. The Daniel Brecheis detail page
([danielbrecheis.html](projects/danielbrecheis.html)) still exists but is unlinked, `noindex` and out of the sitemap
until the site goes live on 1 October; relink it, drop the `robots` meta and add the sitemap entry back on launch.

---

## Packages on the site

The pricing section offers website work only. Earlier packages for AI automation, web apps and code review were removed.

| Package | Lead time | Starting at |
|---------|-----------|-------------|
| Landingpage | 1 to 2 weeks | 2.500 € |
| Website (recommended) | 3 to 5 weeks | 5.500 € |
| Website Plus | 6 to 10 weeks | 9.500 € |
| Website maintenance | ongoing | 149 €/month |
| Anything beyond scope | hourly | 95 €/hour |

All figures are net. When you change a price, change it in `index.html` and in both `translations.de` and `translations.en` in [assets/js/main.js](assets/js/main.js).

---

## Tech Stack

- **Frontend:** HTML5, CSS3 with custom design tokens, vanilla JavaScript (ES6+)
- **Animations:** GSAP 3.12 and ScrollTrigger via CDN
- **Fonts:** Inter (Google Fonts, loaded after consent)
- **Hosting:** GitHub Pages, custom domain via `CNAME`
- **i18n:** custom DE/EN dictionary in [assets/js/main.js](assets/js/main.js), no framework

---

## Repository Structure

```
.
├── index.html              # Homepage (hero, project slider, sections)
├── impressum.html          # Legal info
├── datenschutz.html        # Privacy policy
├── assets/
│   ├── css/main.css        # Stylesheet (design tokens + theming)
│   ├── js/main.js          # Slider, mode filter, theme, i18n, animations
│   └── img/                # Backgrounds, icons, profile, project shots
├── projects/               # Project detail pages plus their own main.css
├── docs/                   # Architecture / development / deployment guides
├── tools/                  # Local dev tooling (NOT deployed)
└── .github/workflows/      # CI: deploy.yml
```

### Hero image

Two sizes of the same portrait (wooden wall; `assets/img/profile/maxlerseite.webp` is the master), both under the CI size cap:

| File | Size | Served from |
|------|------|-------------|
| `hero-portrait.webp` | 953x1600 | 1100 px viewport width |
| `hero-portrait-760.webp` | 760x1276 | below that, and as the `<img>` fallback |

The portrait is anchored to the right edge at its own aspect ratio and grows with the viewport height; a horizontal veil keeps the text column dark, and on phones the veil turns vertical and the copy moves below the face. The master is 953x1600, so very tall viewports upscale it slightly. If you ever replace the photo, regenerate both sizes from the same master.

---

## Local Development

```powershell
python -m http.server 8000
```

Open <http://localhost:8000>. No build step.

---

## CI / CD

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) is a two-job pipeline:

### Job `build`, runs on every push and PR

| Step | Fails the build when |
|------|----------------------|
| **Verify required entry points** | `index.html`, `assets/css/main.css`, `assets/js/main.js`, `CNAME`, `impressum.html` or `datenschutz.html` is missing |
| **Asset size guard** | any image or video under `assets/img/` or `projects/` exceeds `MAX_ASSET_KB` (600 KB); raise it only with a real reason |
| **Assemble dist/** | never (globs all top-level `*.html`, copies `assets/` and `projects/`, writes `.nojekyll`) |
| **Internal-link check** | any `src=` or `href=` in a shipped HTML file points at a local target that does not exist in `dist/` |
| **Build size report** | never (writes a per-folder and top-10-largest summary to the job page) |
| **Upload Pages artifact** | skipped on PRs |

### Job `deploy`, only on push to `main`

Gated behind `build`. Publishes to the `github-pages` environment via `actions/deploy-pages@v4`. PRs run the validators but never publish.

---

## Conventions

Full rules in [`.github/copilot-instructions.md`](.github/copilot-instructions.md):

- **No em dash and no en dash** anywhere in this repository, in any file type. Use a colon, comma, parentheses, semicolon or a separate sentence. Plain hyphens in compound words and ranges are fine.
- **Images:** convert to WebP first, keep each file at or below 600 KB, otherwise CI fails.
- **i18n:** every visible string uses `data-i18n="key"`; keep `translations.de` and `translations.en` in [assets/js/main.js](assets/js/main.js) at identical key sets.
- **Theming:** `data-color-scheme` (light/dark) and `data-project-theme` (per-project palette) on `<html>`. The only writer is `themeController` in [assets/js/main.js](assets/js/main.js); the project palette follows the active slide.
- **No inline `style="..."`** for state, use CSS classes (`.is-success`, `.is-error`, `.active` and so on).
- **No decorative layers:** no blur filters, no endless keyframe animations, no glow orbs or grid overlays. They were removed on purpose because they blocked rendering.
- **No build tools, no analytics, no third-party scripts** without updating [datenschutz.html](datenschutz.html).

---

## License

© Maximilian Haak. All rights reserved.
