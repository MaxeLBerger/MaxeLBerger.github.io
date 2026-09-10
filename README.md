# Maximilian Haak: Portfolio

[![Deploy](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/deploy.yml)

**Live:** [maximilianhaak.de](https://maximilianhaak.de)

Static portfolio site for Maximilian Haak, fullstack developer and AI specialist from Bruckmühl near Rosenheim. Vanilla HTML, CSS and JavaScript, no build step. Deployed to GitHub Pages on every push to `main`.

---

## Homepage sections

| Section | What it is |
|---------|------------|
| `#hero` | Right-anchored portrait photo, text column on the left with a two-line headline, one primary button plus one text link and a client logo row. Static, no slider. |
| `#projects` | Project slider with a mode switch between own work and client work. Height follows the content; arrows and pagination sit below the slide. |
| `#about` | Personal section with a portrait frame and compact facts. |
| `#skills` | Tech stack, three grouped boxes with icon tiles. |
| `#pricing` | Three website packages plus maintenance and hourly rate. |
| `#contact` | Contact links, location and a mailto form. |

---

## Projects

The slider on the homepage runs in two modes, filtered through `data-mode` on both slides and pagination buttons. Default is `own`.

The section header carries a `.section-note` line (`projects.note`): self-employment starts on 1 October 2026, and the
client slides repeat that date rather than implying an older track record.

### Own work (`data-mode="own"`)

Listed in slider order. The pagination buttons in `index.html` are the single source of that order:
the slider pairs slides to buttons by `data-project`, so moving a project means moving its button.
`FIRST_PROJECT_THEME` in `assets/js/main.js` resolves the neutral `maxhaak` theme onto the leading project,
so it has to name whichever project sits first in this table.

| Project | Type | Detail page |
|---------|------|-------------|
| Haakly | Self-hosted CMS | none |
| CapitalCombo | Trading research and execution platform | none |
| DealHunter | Autonomous marketplace scanner | none |
| E46 Studio | Desktop app (Electron) | [e46-studio.html](projects/e46-studio.html) |
| Albert Royale | 3D game with a self-built neural net | [albert.html](projects/albert.html) |
| Age of Max | Browser game | none |
| Medieval Tower Defense | Browser game | none |
| Deterministische Review | Git review pipeline (developer tool) | none |
| AI Captain | VS Code extension (AI agent) | [aicaptain.html](projects/aicaptain.html) |
| Shookroko | Browser game (Phaser 3) | [shookroko.html](projects/shookroko.html) |
| MemeCoinTrader | Java desktop trading app, in progress | none |

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
│   └── img/                # Backgrounds, clients, icons, profile, project shots
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

The portrait is anchored to the right edge at its own aspect ratio and grows with the viewport height; a horizontal veil keeps the text column dark, and on phones the veil turns vertical and the copy moves below the face. The photo carries no colour overlay: it keeps the warm skin, hair and wood tones of the master, so a replacement should already be graded the way it is meant to look. The master is 953x1600, so very tall viewports upscale it slightly. If you ever replace the photo, regenerate both sizes from the same master.

### Client logos

`assets/img/clients/` holds the two customer marks shown in the hero. Both are white silhouettes, because neither brand publishes a dark-background variant and the hero sits on a dark photo:

| File | Size | Built from |
|------|------|------------|
| `senihelp24.webp` | 420x79 | the official senihelp24 wordmark, recoloured to white |
| `human-bridges.webp` | 438x40 | the Human Bridges mark and wordmark, relaid out side by side in white |

The Human Bridges original is a black wordmark on a blue patch with the bridge arcs knocked out of it, so it is unreadable on the hero as shipped; the mono version keeps the arcs and drops the patch. Replace these only with mono versions at the same aspect ratio, otherwise the per-logo heights in `.hero-client-logo--*` need retuning.

### Package images

The two `#pricing` panels are led by a device mockup each, both 16:9 and both carrying their price as baked-in typography:

| File | Size | Served from |
|------|------|-------------|
| `pay-packets/paket-website.webp` | 1200x675 | `srcset` above roughly 700 px of slot width, and as the `<img>` fallback |
| `pay-packets/paket-website-760.webp` | 760x428 | narrower slots |
| `pay-packets/paket-websiteplus.webp` | 1200x675 | as above, for package 02 |
| `pay-packets/paket-websiteplus-760.webp` | 760x428 | narrower slots |

Side by side with the copy column the panel is taller than a 16:9 frame, so the leftover strip above and below is filled by a blurred copy of the same picture (`.service-panel__art::before`) under a veil in the surface colour (`::after`). Nothing of the motif is cropped. Stacked below 900 px the picture fills the width on its own and both pseudo-elements switch off, so no extra file is fetched on phones. The blurred strip reuses the 1200 px file the `<img>` already loaded on desktop. Replacing a mockup means regenerating both widths from the same master and keeping the 16:9 ratio, otherwise the strip and the frame stop matching.

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
- **Accent tokens:** never write `rgb(var(--theme-primary))` in a rule. Use `rgb(var(--accent))` for anything that carries meaning (text, border, filled surface) and `var(--on-accent)` for the text on a filled surface. `--accent` resolves to `--theme-primary` in dark mode and to `--accent-ink` in light mode, the darkened variant of the same hue that each `[data-project-theme]` block carries. The raw `--theme-primary` is only correct inside `#hero` and the transparent navbar, where the ground is a dark photo in both schemes; that carve-out is one rule in [assets/css/main.css](assets/css/main.css). Reason: the project palettes are tuned for a dark ground, and 11 of 14 fell below 4.5:1 on the light page, 7 of them below 3:1 even as a button surface.
- **Contrast:** run `node tools/contrast-audit.mjs` against a local server before shipping colour work. It measures every visible element across all pages, both schemes and all 14 project themes, and exits non-zero on anything below 4.5:1 (3:1 for large text).
- **No inline `style="..."`** for state, use CSS classes (`.is-success`, `.is-error`, `.active` and so on).
- **No decorative layers:** no blur filters, no endless keyframe animations, no glow orbs or grid overlays. They were removed on purpose because they blocked rendering.
- **No build tools, no analytics, no third-party scripts** without updating [datenschutz.html](datenschutz.html).

---

## License

© Maximilian Haak. All rights reserved.
