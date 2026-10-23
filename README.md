# Maximilian Haak: Portfolio

[![Deploy](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/deploy.yml)

**Live:** [maximilianhaak.de](https://maximilianhaak.de)

Static portfolio site for Maximilian Haak, fullstack developer and AI specialist from Bruckmühl near Rosenheim. Vanilla HTML, CSS and JavaScript, no build step. Deployed to GitHub Pages on every push to `main`.

---

## Homepage sections

| Section | What it is |
|---------|------------|
| `#hero` | Right-anchored portrait photo, text column on the left with a two-line headline, one primary button plus one text link, then a "Bereits vertraut von:" label with the client logos in a row beneath it. Static, no slider. |
| `#projects` | Project slider with a mode switch between client work (shown first) and own work. Height follows the content; the pagination strip sits below the slide, the arrows beside it (hidden below 1024 px, where swiping and the strip cover navigation). A plasma band in the active project's colours drifts behind the whole section. |
| `#about` | Personal section with a portrait frame and compact facts. |
| `#skills` | Tech stack: the main group as large tiles with the original logos in three rows (Web, 3D & Games; KI & Agents; Sprachen & Tools), every other tool below as small pills. |
| `#services` | Three offers (Website, Web-App, KI & Automatisierung) as cards without prices, then the inquiry buttons. An empty `#pricing` anchor inside keeps old links working. |
| `#contact` | Contact links, location and a mailto form. |

---

## Projects

The slider on the homepage runs in two modes, filtered through `data-mode` on both slides and pagination buttons. Default is
`customers`: the mode button marked `is-active` and the pagination button marked `active` decide what shows at load.
That slide is the only one whose screenshot uses a real `src`; every other slide carries `data-src` and loads on demand.

The section header carries a `.section-note` line (`projects.note`): self-employed since 1 October 2026. Client slides
that are not live yet say "in Arbeit" and carry no launch date, so the page never shows a date that has already passed.

Slide order: the pagination buttons in `index.html` are the single source of it. The slider pairs slides to buttons by
`data-project`, so moving a project means moving its button (the slide blocks follow the same order for readability).
`FIRST_PROJECT_THEME` in `assets/js/main.js` resolves the neutral `maxhaak` theme onto the leading project,
so it has to name the first client project.

Own projects without a public link use "Ähnliches Projekt besprechen" (to `#contact`), client slides without a live
site use "Ähnliche Website anfragen".

### Client work (`data-mode="customers"`)

| Project | Type | Detail page |
|---------|------|-------------|
| Imkerei Feuerstein | MVP: relaunch site with shop interface, demo on Vercel, launch with ordering system in preparation | [imkerei-feuerstein.html](projects/imkerei-feuerstein.html) |
| Daniel Brecheis | Consultant site (Human Bridges), in progress | none while unreleased |
| Senihelp24 | Care service site, in progress | none |
| Ihr Projekt | Invitation slide, no project | none |

Co Ha, Kaya Seeds, JK Entertainment and Sound of Lvke keep their detail pages under `projects/` but have no slide.

`Senihelp24` and `Daniel Brecheis` have no screenshot on the slide and use the shared `.project-mock` placeholder.
The Daniel Brecheis detail page ([danielbrecheis.html](projects/danielbrecheis.html)) still exists but is unlinked,
`noindex` and out of the sitemap until the site goes live; relink it, drop the `robots` meta and add the sitemap
entry back on launch.

### Own work (`data-mode="own"`)

Listed in slider order: projects people can open or play first, work without a public link after.

| Project | Type | Detail page |
|---------|------|-------------|
| Albert Royale | 3D game with a self-built neural net | [albert.html](projects/albert.html) |
| ChartCombo (key `capitalcombo`) | Trading research and execution platform | none |
| Aurevia | Game concept, playable prototype in progress | none |
| E46 Studio | Desktop app (Electron) | [e46-studio.html](projects/e46-studio.html) |
| Haakly | Self-hosted CMS | none |
| DealHunter | Autonomous marketplace scanner | none |
| Age of Max | Browser game | none |
| Deterministische Review | Git review pipeline (developer tool) | none |
| Kundenkalender | Local-first desktop calendar (Tauri); the screenshot uses invented demo data | none |
| reachlab | Short-video analysis pipeline; the slide image is a rendered summary of the numbers in its README | none |
| E46 in 3D | Blender reconstruction of a BMW E46 (repo E46CustomZ); Blender renders as slide images | none |
| Shookroko | Browser game (Phaser 3) | [shookroko.html](projects/shookroko.html) |
| Medieval Tower Defense | Browser game | none |
| AI Captain | VS Code extension (AI agent) | [aicaptain.html](projects/aicaptain.html) |

---

## Services on the site

`#services` shows three offers without public prices; every project gets its own quote after a first conversation.

| Offer | Meta line |
|-------|-----------|
| Website | Typisch 3 bis 5 Wochen |
| Web-App | Umfang nach Absprache |
| KI & Automatisierung | Start mit einem kleinen Pilotprojekt |

Below the cards sit the two inquiry buttons. All copy lives under `services.*` in both `translations.de` and `translations.en` in
[assets/js/main.js](assets/js/main.js); change the German HTML and both dictionaries together.

---

## Tech Stack

- **Frontend:** HTML5, CSS3 with custom design tokens, vanilla JavaScript (ES6+)
- **Animations:** Web Animations API and CSS (no animation library)
- **Fonts:** Inter, served locally as a Latin subset
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

The portrait is anchored to the right edge at its own aspect ratio and grows with the viewport height; a horizontal veil keeps the text column on the hero's own ground (night-dark, or the light canvas in light mode). On phones and on portrait tablets up to 1024 px the copy moves below the face instead, on a veil that starts just above its first line; on portrait tablets the photo keeps its size and right edge and is only lifted, so the chin clears the copy. Both colour schemes show the same photo: light mode swaps only the ground, the veil colour and the ink, and the photo feathers into the canvas. The photo carries no colour overlay: it keeps the warm skin, hair and wood tones of the master, so a replacement should already be graded the way it is meant to look. The master is 953x1600, so very tall viewports upscale it slightly. If you ever replace the photo, regenerate both sizes from the same master.

### Projects energy band

Behind the whole `#projects` section sits `.projects-energy`, a plasma band that takes its colour from the active project theme. The WebP files are only the shape: they are CSS masks (`mask-image`), and the two layers paint plain `background-color` from the theme tokens (`--theme-gradient-end` for the band, `--theme-gradient-start` for the highlight, which uses a luminance mask so it only shows through the bright cores). That is why the band recolours together with buttons and accents when the slide changes. The theme flips the moment a slide is chosen (not when it has landed), and the band uses its own, longer `--projects-energy-transition` (0.9 s ease-out, the highlight 120 ms behind) so the colour flows in while the slide is still moving.

| File | Size | Used from |
|------|------|-----------|
| `hero-energy.webp` | 1800x1012 | 1100 px viewport width |
| `hero-energy-900.webp` | 900x506 | 769 to 1099 px, one static layer |

The band is flipped vertically so the light source sits low right behind the mockup and the tab row and the faint tail rises to the upper left. The layers are **static on purpose**: keyframe animations on or inside these masked, blended layers (the former drift, breathe and travelling stripe) kept the main thread 30 to 80 % busy on a throttled CPU and made scrolling stutter, see `tools/perf-bench/`. The only motion is a 180 px scroll parallax on the inner wrapper, written as a CSS scroll-driven animation (`animation-timeline: view()`), so no script runs per scroll frame; browsers without support show the band in place. The parallax is off under `prefers-reduced-motion`. Phones get `display: none`, and the script skips the mask probe there, so the image is never requested. Strength is `--projects-energy-opacity` on `.projects-section` (0.9 dark, 0.5 light), and the mask on `.projects-energy` caps the band to 22 % under the slide copy on the left so the text keeps at least 5.9:1. The Tech Stack section uses the same band unflipped (`.skills-energy`); its colour cycle only runs while the section is on screen. Both files are generated, not drawn: `python tools/hero-energy/make_energy.py <out-dir>` renders them (needs numpy, scipy, Pillow), so regenerate rather than retouch.

### Client logos

`assets/img/clients/` holds the three customer marks shown in the hero. All are white silhouettes, so they read on the photo in one consistent style; in light mode `filter: brightness(0)` renders the same files as dark silhouettes on the canvas:

| File | Size | Built from |
|------|------|------------|
| `senihelp24.webp` | 420x79 | the official senihelp24 wordmark, recoloured to white |
| `human-bridges.webp` | 438x40 | the Human Bridges mark and wordmark, relaid out side by side in white |
| `imkerei-feuerstein.webp` | 699x96 | `images/logo.svg` from the Imkerei site (the bee mascot as an embedded 110x138 PNG plus "Imkerei" / "Feuerstein" in Georgia Bold on two lines): the mascot as a white silhouette with its black stripes, eyes and glasses knocked out, the wordmark re-set on one line in the same face, bee 2.3 cap heights tall and the caps centred on it, lossless WebP |

The Human Bridges original is a black wordmark on a blue patch with the bridge arcs knocked out of it, so it is unreadable on the hero as shipped; the mono version keeps the arcs and drops the patch. The Imkerei mascot is a low-resolution cartoon, so a colour version would not survive `brightness(0)` in light mode and would be the only coloured mark in the row; the silhouette keeps the row uniform.

The row is sized from one number, `--client-cap` on `.hero-clients` (12px on desktop, 10.5px up to 768px): every wordmark is rendered at that cap height, each logo's CSS height is the cap height times the ratio measured in its file, and a small `translateY` per logo puts the caps on one centre line. Replace these only with mono versions, and when a file's proportions change, re-measure its cap height for the ratio in `.hero-client-logo--*`.

---

## Local Development

```powershell
python -m http.server 8000
```

Open <http://localhost:8000>. No build step.

Once per clone, point Git at the repo's hooks so the writing rule is enforced
locally:

```powershell
git config core.hooksPath .githooks
```

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
- **Accent tokens:** never write `rgb(var(--theme-primary))` in a rule. Use `rgb(var(--accent))` for anything that carries meaning (text, border, filled surface) and `var(--on-accent)` for the text on a filled surface. `--accent` resolves to `--theme-primary` in dark mode and to `--accent-ink` in light mode, the darkened variant of the same hue that each `[data-project-theme]` block carries. The one exception is the transparent navbar over the hero on phones, where the ground is the dark photo in both schemes: there the logo and the icon buttons set `--accent` to `--accent-bright`, so "Haak" and the focus rings on the photo take the lightened step of the same hue that each theme block also carries (same OKLCH hue, lightness raised to a relative luminance of 0.46), because the theme colour itself sat between 1.0:1 and 2.8:1 on the wood. The menu panel keeps the accent of its scheme. That rule lives in the 768 px block of [assets/css/main.css](assets/css/main.css). Reason for the ramps: the project palettes are tuned for a dark ground, and 11 of 14 fell below 4.5:1 on the light page, 7 of them below 3:1 even as a button surface.
- **Contrast:** run `node tools/contrast-audit.mjs` against a local server before shipping colour work. It measures every visible element across all pages, both schemes and all 14 project themes, and exits non-zero on anything below 4.5:1 (3:1 for large text). It only stacks background colours, so it cannot see text over the hero photo: measure that against the real pixels in headless Edge (hide the text, screenshot, compare the text colour with every pixel of its box, and take the 3rd percentile as the worst case). [tools/pixel-contrast/](tools/pixel-contrast/) does that for you.
- **No inline `style="..."`** for state, use CSS classes (`.is-success`, `.is-error`, `.active` and so on).
- **No decorative layers:** no blur filters, no endless keyframe animations, no glow orbs or grid overlays. They were removed on purpose because they blocked rendering.
- **No build tools, no analytics, no third-party scripts** without updating [datenschutz.html](datenschutz.html).

---

## License

© Maximilian Haak. All rights reserved.
