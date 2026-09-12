# GitHub Copilot Instructions for MaxeLBerger.github.io

## Overview

Personal portfolio site for Maximilian Haak, fullstack web developer and AI specialist from Bruckmühl/Rosenheim. Static site (HTML + CSS + vanilla JavaScript), deployed to GitHub Pages.

**Live:** [maximilianhaak.de](https://maximilianhaak.de)

## Architecture

Plain static site, **no build step**, no submodules, no frameworks.

```
.
├── index.html              # Homepage (static hero, project slider, sections)
├── impressum.html          # Legal info
├── datenschutz.html        # Privacy policy
├── assets/
│   ├── css/
│   │   └── main.css        # Stylesheet (~2800 lines, design tokens + theming)
│   ├── js/
│   │   └── main.js         # Slider, mode filter, theme, i18n, animations (~1500 lines)
│   └── img/                # Backgrounds, favicons, icons, profile, projects, screenshots
├── projects/               # Project detail pages (10 files)
│   ├── main.css            # Project-page-specific styles
│   ├── aicaptain.html      albert.html            coha.html
│   ├── danielbrecheis.html e46-studio.html        imkerei-feuerstein.html
│   ├── jkentertainment.html kayaseeds.html        shookroko.html
│   └── soundoflvke.html
├── docs/                   # architecture / development / deployment guides
├── tools/                  # Local dev tooling (NOT deployed)
│   └── mcp-portfolio-server/   # Local MCP dev tool
└── .github/workflows/
    └── deploy.yml          # Two-job validate and deploy to GitHub Pages
```

## Writing rule that applies to every file

**Never use an em dash (U+2014) or an en dash (U+2013)**, in any file type: HTML, CSS, JS, comments, i18n strings,
Markdown, commit messages. Use a colon, comma, parentheses, semicolon or a separate sentence instead. Plain hyphens
in compound words and numeric ranges (`2-4 Wochen`, `1-8 Seiten`) are fine. When you copy text from an old file or
an external source that contains one, replace it while copying. The `.githooks/pre-commit` hook
enforces this; a fresh clone enables it with `git config core.hooksPath .githooks` (see
[docs/development.md](../docs/development.md)).

## Tech Stack

- **HTML5 / CSS3 / vanilla JavaScript (ES6+)**: no React, no Vue, no bundler
- **GSAP 3.12 + ScrollTrigger** via CDN for animations
- **Inter** (Google Fonts): loaded after cookie consent (GDPR)
- **i18n**: custom DE/EN dictionary in [assets/js/main.js](../assets/js/main.js) (DE is default)
- **Hosting**: GitHub Pages with custom domain (`CNAME` → `maximilianhaak.de`)

## Core Architectural Concepts

### Homepage hero

The top `#hero` shows the wooden-wall portrait as a single right-anchored background. The markup is
`div.hero-bg-slides` (a wrapper left over from the old crossfading slideshow) holding one
`picture.hero-bg-slide.is-active`: a `<source>` for `hero-portrait.webp` (953x1600, from 1100 px) plus
`hero-portrait-760.webp` (760x1276) as the `img.hero-bg-image` fallback. `assets/img/profile/maxlerseite.webp` is the
master and is byte-identical to the large background copy. `.hero-bg-slide` starts at `opacity: 0` and only shows
with `.is-active`, so keep that class on the picture; `initHeroBgSlideshow()` in `assets/js/main.js` still exists but
returns immediately with fewer than two slides. The active image is the LCP element, so keep it eager with
`fetchpriority="high"` and do not add competing CSS-background preloads.

The portrait keeps its own aspect ratio (`height: 112%`, `width: auto`) instead of stretching across the width, and
sits at `right: max(0px, calc((100% - var(--container-max)) / 2))`, so on very wide screens it follows the content
container inward instead of drifting away from the copy; a mask feathers both side edges. `.hero-content` is a
two-column grid (`minmax(0, 580px) minmax(0, 1fr)`, 460 px from 1024 px down) whose second column stays empty:
`.hero-text` sits in column 1, so the copy never runs onto the face. `.hero-section` paints its own ground,
night-dark `#080a12` in dark mode and the light canvas (`--color-bg`) in light mode, and `.hero-section::before` is a
horizontal veil in that same colour, solid under the text column and clear over the photo. Its stops are anchored to
the centre in px (`calc(50% - 200px)` through `calc(50% + 250px)`) instead of viewport percentages, so the face is
never dimmed on wide screens and the copy keeps a solid ground when the portrait reaches into it on narrow, tall
windows; the light-mode block repaints section and veil in the canvas colour with the same stops.
`.hero-section::after` blends the bottom edge into `--color-bg`, late and short: from 84% in dark, and only from 95%
in light, where a longer gradient washed the lower third of the photo and a `border-top` hairline on
`.projects-section` carries the edge instead.

Below 768 px `.hero-content` drops to one column, the portrait fills the width and is pushed up so the face sits in
the top half, and the copy moves to the bottom of the hero (`justify-content: flex-end`). There the veil hangs off
the copy in both schemes (`.hero-content::before`, starting 130 px above the first line in dark and 100 px in light),
not off the section height: where the copy starts depends on screen height and language, and with fixed percentages
the dark eyebrow sat on the mouth on short phones (1.75:1 at 375x667). In dark mode only a soft top tint stays on
`.hero-section::before`, so the ground under the navbar is unchanged; a light veil over the face would read as
frosted glass.

Portrait tablets from 769 to 1024 px (`orientation: portrait`) stack the same way. There the portrait grows with
the height to almost the full width (787 px at 820x1180), and beside it the text column sat on the face. The photo
keeps its tablet size and right edge and is only lifted (`top: calc(var(--nav-height) - 22%)`), so the hair starts
under the navbar and the chin clears the copy; the text column widens to 560 px and the light veil fades in over
150 px. A shorter "laptop band" hero with the photo beside the copy was built as the alternative in September 2026
and not chosen. The master is 953x1600, so very tall viewports upscale it slightly; regenerate both sizes from the
master if you ever replace the photo.

The hero is intentionally **photo-first and editorial**: the photo is only lightly dimmed, contrast for the text
comes from the directional veil plus layered text-shadows. Do not reintroduce heavy flat dim layers, and do not lay a
colour wash over the photo: it shows the master's own warm skin, hair and wood tones. Light mode shows the same photo,
unchanged; there the text is ink without shadows and the veil alone carries the contrast. A cut-out portrait on the
plain canvas (`assets/img/profile/maxlerseite_no_bg.webp`) was built as an alternative in September 2026 and not
chosen, so do not swap the photo for it. The text column is: `.hero-eyebrow` (uppercase
name and role line), then `h1.hero-title` with two `.title-line` spans (the last word sits in `.title-accent`, single accent colour,
never a gradient), then `.hero-description`, then `.hero-cta` with ONE primary button (white on dark, ink on light) linking to `#projects`
and ONE `.hero-link` text link linking to `#contact`, then `div.hero-clients`: an uppercase
`hero.clients` label ("Vertraut von:" / "Trusted by:") on its own line and the two customer logos from
`assets/img/clients/` in a row beneath it; the block is a column at every width, so do not put the label back
beside the logos. Those logos ship as white silhouettes
and sit at `opacity: .62`, going to full white on hover; light mode renders the same files as dark silhouettes with
`filter: brightness(0)` at `opacity: .55`, so there is still one file per logo. Their heights are set per logo
(`.hero-client-logo--senihelp` / `--humanbridges`) because one is a compact wordmark and the other a wide
mark-plus-wordmark lockup, so do not give them a shared height. The GSAP entrance in `playEntrance()` adds the
client row to the end of the existing timeline.

Do NOT add gradient text, self-awarded credibility badges, a second pill button, a scroll hint, a tech-icon strip or a
tagline block to the hero; these were deliberately removed. i18n keys are `hero.eyebrow`, `hero.title1..3` (title2
and title3 are the two words of the second line), `hero.desc`, `hero.cta1/cta2` and `hero.clients`, all
present in both languages.

Over the hero the navbar is transparent (`body.has-hero #navbar:not(.scrolled)`). In dark mode, and in light mode
below 769 px where the photo fills the top of the hero, it carries white text, outline-only icon circles and the dark
scrim in `#navbar::before`. On phones the light-mode scrim is as dense as the dark one behind the nav row and holds
0.60 down to the logo baseline, with the old tail below the bar: on short and landscape phones the hero copy reaches up
to the navbar, and its light veil used to sit behind the logo as a mid-grey. There `.nav-logo` and `.nav-actions` set
`--accent` to `--accent-bright` in both schemes, so "Haak" and the focus rings on the photo take the lightened step of
the theme hue (same OKLCH hue, relative luminance 0.46) that each `[data-project-theme]` block carries next to
`--accent-ink`; the theme colour itself stayed below 3:1 on the wood. The menu panel keeps the accent of its scheme.
On phones the light-mode `.hero-eyebrow` takes `--color-text-secondary`, because on those short screens it starts
right under the navbar, in the tail of the scrim. From 769 px in light mode the navbar switches to ink text, filled
icon circles and a light scrim, because the canvas and the scrim-lightened top of the photo sit behind it. Keep the scrim in the softly fading
`::before`: as a background on the navbar itself the gradient repeated into the transparent 1 px bottom border and
drew a dark line across the photo.

Logo, five links and two icon circles only fit on one line from about 880 px, so from 769 to 1023 px every navbar
with a menu button folds into it as on phones (`.nav-container:has(.menu-toggle)`, its own block after the 1024 px
rules; in light mode the bars turn ink there). The legal pages have four links, no menu button and no main.js, and
keep their inline links at that width.

### Projects energy band

`div.projects-energy` is the first child of `#projects`: a plasma band behind the whole section, coloured by the
active project theme. `assets/img/backgrounds/hero-energy.webp` (and the 900 px version below 1100 px) are CSS
masks on two layers that paint `background-color: var(--theme-gradient-end)` (band, alpha mask) and
`var(--theme-gradient-start)` (highlight, luminance mask), so the colour follows `[data-project-theme]` through
`--projects-energy-transition` (0.9 s ease-out, highlight delayed 120 ms). `goToSlide()` sets the theme when the slide is
chosen, before the slide animation, so keep that order: the band must start recolouring on the click, not on settle. The section has `isolation: isolate` so the band's `z-index: -1` stays above its own
ground; `.projects-energy-move` is what GSAP moves for the scroll parallax (`initProjectsEnergy()`), the layers
carry the CSS drift and the highlight's `::after` the travelling stripe. `prefers-reduced-motion` switches all
motion off, phones get `display: none`. Do not put the band back into the hero and do not add a blend mode to the
band layer. Regenerate the files with `tools/hero-energy/make_energy.py` instead of retouching them.

### About section

`#about` sits directly after `#projects` and before the tech stack. Keep it as a personal editorial section with an
E46 media frame, short biographical copy, and compact facts. The current media asset is the optimized
`assets/img/profile/uebermich_neu.webp` (portrait, 1000×1334, keep under ~300 KB) in a `.about-image-frame`; preserve the
lower focus so the car/person stay visible. Keep this image large and cleanly cropped in a restrained 5:6 media frame
with subtle border/shadow and no visible caption. The copy column should stay intentionally narrow for comfortable
reading (about 54ch max), rather than stretching across the available grid width. Use
`Über mich` / `About me` as the real section heading, not as an eyebrow; section-note/hint callouts belong only to
`#projects`. If this later becomes video, use
`assets/video/e46-about.mp4` with a poster fallback. All visible copy still goes through `data-i18n` keys in
`assets/js/main.js`; translated image alt text uses `data-i18n-alt`.

### Tech stack

`#skills` has two groups. `.stack-core` is the main group: large tiles in three thematic rows, each with an
`h3.stack-row-title` ("Web, 3D & Games": Astro, Three.js, GSAP, Phaser; "KI & Agents": Claude Code, Codex, RAG,
AI Agents; "Sprachen & Tools": Python, Docker, SQL, Git, Delphi, Java). The user chose these entries and this order in
September 2026, so keep them. `.stack-more` lists every other tool below as small pills under a divider label
("Außerdem im Einsatz"). On desktop the row title sits left of its tiles and the tiles fill the row, so the rows of four
and of six end flush; below 1024 px the title moves above the tiles, and below 601 px the rows fold into two and three
columns. One card per row and an open logo wall without boxes were built as alternatives and not chosen.

Every logo is an `i.stack-logo.ti-<name>`, and its file comes from the `.ti-*` map in `main.css`. Multi-colour
originals are background images (`--ti-img`, plus `--ti-img-l` when a mark has dark parts: Astro shows
`astro-inverse.svg` in dark mode). Single-colour and black marks stay CSS masks coloured with `--ti-c` (dark) and
`--ti-cl` (light), so they read on both grounds. The files in `assets/img/tech/` are the brands' originals (devicon,
Simple Icons, LobeHub for Codex, vectorlogo.zone for Phaser); RAG, AI Agents, SQL, LLM APIs, Prompt Engineering and
GitHub Spark have no official logo and are drawn. Replace a logo only with a sanitized SVG that keeps a viewBox and has
no width, height, script or external reference. Main-group tiles light up in their brand colour on hover through
`--glow`, set per logo with `.stack-item:has(> .ti-*)`; there is no endless animation in the section.

### Project slider

`#projects` contains ONE `.hero-slides-container` holding all 13 slides. A two-option `.project-mode-selector`
segmented pill above it switches between two sets, filtered through `data-mode` on both the slides and the
`.project-nav-btn` pagination buttons:

| Mode | Slides |
|------|--------|
| `own` (default) | E46 Studio, AI Captain, Albert Royale, Medieval TD, Shookroko, dog-kennel-online |
| `customers` | Imkerei Feuerstein, Co Ha, Daniel Brecheis, Kaya Seeds, JK Entertainment, Sound of Lvke, Senihelp24 |

Both modes are open. The earlier locked state for `Kundenprojekte` (lock icon, `disabled`, `.is-locked`) is gone;
do not bring it back.

Layout rules that were fixed on purpose and should stay: slides sit on top of each other with `grid-area: 1/1` so
the container height follows the tallest slide instead of a fixed `min-height`; arrows and pagination live in one
`.project-controls` row directly below the slide; there is no browser chrome mockup with traffic-light dots and no
floating category badge on the screenshot. Slides hidden by the mode filter use `[hidden]`, so any rule setting
`display` on `.project-pag-btn` must not override it.

`Senihelp24` has no screenshot under `assets/img/projects/`. It renders the shared `.project-mock` placeholder,
which is also used by `dog-kennel-online`. Do not point an `<img>` at a file that does not exist; CI checks every
`src` and `href`.

`Daniel Brecheis` is deliberately in the same in-progress state until the site goes live on 1 October: the slide uses
the `.project-mock` placeholder instead of `assets/img/projects/danielbrecheis.webp`, links to `#contact` plus a
disabled `Live ab 1. Oktober` button instead of the Vercel URL, and [projects/danielbrecheis.html](../projects/danielbrecheis.html)
is unlinked, `noindex` and absent from `sitemap.xml`. Do not restore the screenshot or the live links before launch.

The `ProjectSlider` class in [assets/js/main.js](../assets/js/main.js) handles:

- GSAP-powered transitions (with CSS fallback)
- Touch/swipe and keyboard navigation
- Per-slide theme switching via `data-theme` to `data-project-theme` on `<html>`
- The mode filter, including scrolling the active pagination button into view

### Theming

Two independent attributes on `<html>`:

| Attribute | Values | Controlled by |
|-----------|--------|---------------|
| `data-color-scheme` | `dark` (default), `light` | Theme toggle button (`#themeToggle`) |
| `data-project-theme` | one per project slide: `e46`, `aicaptain`, `albert`, `medieval`, `shookroko`, `dogkennel`, `imkerei`, `coha`, `danielbrecheis`, `kayaseeds`, `jkentertainment`, `soundoflvke`, `senihelp24` | Slider and scroll observer |

The `themeController` IIFE in `assets/js/main.js` is the **single writer** for `data-project-theme`. All callers go
through `setProjectTheme(theme, source)`.

The manual color picker in the navbar was removed, along with its popover, its swatches and its
`localStorage('themeColor')` persistence. The project palette now follows the active slide only. Do not reintroduce
the picker; the mobile navbar was cramped because of it.

Elements that must not animate on the theme transition need to be excluded explicitly. The mode pill kept the old
project color for 0,6 s because it inherited the global theme transition.

### i18n

All user-visible text uses `data-i18n="key"` attributes. The dictionary lives in `translations.de` and `translations.en` inside [script.js](../assets/js/main.js). On `init()` and on language toggle, `applyTranslations(lang)` overwrites the inline HTML text.

**Critical:** when changing visible text, update **both** the inline HTML default **and** the matching key in both language objects, or the JS will overwrite your HTML change on next load.

Language-neutral technology, product, and tool names in `.stack-item` / `.stack-chip` / `.tech-badge` labels stay inline as brand
labels. Keep i18n keys for surrounding headings, descriptions, and copy that changes between DE and EN.

Language is persisted in `localStorage('lang')`.

### Performance gates

- **No decorative layers.** `.hero-grid`, `.glow-orb`, `.project-orb` and `.showcase-glow` were removed from HTML,
    CSS and JS, together with every `filter: blur()` and every endless keyframe animation (`float-slow`,
    `pulse-glow`, `skillPulse`, `projectsBlob`). They made rendering so expensive that headless Chromium could not
    rasterize anything below the hero. Do not bring any of them back. The only remaining `backdrop-filter` is on the
    scrolled navbar.
- **No JS-dependent `opacity: 0` start states** outside of `.scroll-reveal`. The skills section was invisible once
    its old animator was gone.
- **Google Fonts** are only loaded after the user accepts the cookie banner.
- **Contact location** uses a lightweight external Google Maps link card, not an embedded iframe. Do not reintroduce a
    map iframe on the homepage unless there is a strong product reason and it remains opt-in/lazy.

### Contact form

Two modes detected from the form's `action` attribute:

- `mailto:` → builds a pre-filled email and opens the user's mail client
- HTTP URL → POSTs `FormData` to the endpoint (e.g. Formspree)

Status feedback uses `.is-success` / `.is-error` classes on `.btn-primary` (defined in [style.css](../assets/css/main.css)).

## Deployment

[.github/workflows/deploy.yml](workflows/deploy.yml): two jobs, `build` ("Validate and assemble") and `deploy`
("Deploy to GitHub Pages"). The workflow also runs on pull requests, where `build` validates but nothing is
uploaded or deployed.

`build`:

1. Checkout
2. **Validation 1:** required entry points exist (`index.html`, `assets/css/main.css`, `assets/js/main.js`,
   `CNAME`, `impressum.html`, `datenschutz.html`)
3. **Validation 2:** no shipped image, video or SVG under `assets/` and `projects/` exceeds `MAX_ASSET_KB`
   (currently 600 KB)
4. Assemble `dist/`: `*.html`, `CNAME`, `robots.txt`, `sitemap.xml`, `assets/`, `projects/`, plus `.nojekyll`
5. **Validation 3:** every `src=` and `href=` in the assembled HTML resolves to a file that exists in `dist/`
   (external schemes and pure `#fragment` links are skipped)
6. Build size report into the job summary
7. Upload as Pages artifact (skipped on pull requests)

`deploy` (needs `build`, skipped on pull requests): deploys to the `github-pages` environment and appends a
deployment summary.

Any of the three validations failing blocks the deploy. Push to `main` goes live in about 1 to 2 minutes.
There is **no build step** for the site itself and **no matrix**.

## Coding Guidelines

### General

- Keep it simple, vanilla HTML/CSS/JS only
- Mobile-first responsive design
- Optimize images: WebP preferred, target <300 KB each
- Asset paths must match the exact on-disk filename casing; GitHub Pages is case-sensitive even if local Windows dev is not
- Use semantic HTML and ARIA where appropriate
- No `console.log` in production code
- No inline `style="..."` for state changes, use CSS classes (`.is-success`, `.is-error`, `.active`, etc.)

### CSS

- Use CSS custom properties from `:root` (design tokens)
- Theme overrides go under `[data-project-theme="..."]`
- Light-mode overrides go under `html[data-color-scheme="light"]`
- Mobile-first media queries

### JavaScript

- ES6+ (const/let, arrow functions, template literals, optional chaining)
- Wrap all module-level code in the existing IIFE in `assets/js/main.js`
- Cache DOM lookups; prefer event delegation
- Use `IntersectionObserver` to gate scroll-driven work
- Use `transitionend` / `animationend` instead of `setTimeout` magic numbers

### i18n

When adding or changing visible text:

1. Set `data-i18n="section.key"` and put the German text inline in HTML
2. Add the same key to both `translations.de` and `translations.en` in `assets/js/main.js`

## Files NOT Tracked in Git

See [.gitignore](../.gitignore). Important exclusions:

- `node_modules/`, `dist/`, `build/` (build output)
- `.env*` (secrets)
- `.vscode/`, `.idea/` (IDE)
- Internal planning markdowns (`ANIMATION_PLAN.md`, `LLM_REFACTORING_PLAN.md`, etc.)
- `diff.txt`, `git_log_output.txt` (debug dumps)
- `desktop.ini` (Windows folder metadata)
- `.github/agents/`, `.github/instructions/`, `.github/skills/` (local Copilot config)

## Common Tasks

### Add a new project

1. Add a new `.hero-slide` to `#projects` in [index.html](../index.html) with a new `data-theme` and the right
     `data-mode` (`own` or `customers`)
2. Add a matching `.project-nav-btn` to the pagination, with the same `data-mode`
3. Add the project image to `assets/img/projects/` (WebP, target under 300 KB, hard cap 600 KB). Without an image,
     reuse the `.project-mock` placeholder instead of pointing at a missing file
4. Add a color theme block to [main.css](../assets/css/main.css) under `[data-project-theme="..."]`
5. Add `slide.<project>.t1/t2/t3/desc/cta1/cta2/badge/tag1/tag2/tag3` keys to both `translations.de` and
     `translations.en` in [main.js](../assets/js/main.js)
6. Create `projects/<slug>.html` for the detail page and add it to `sitemap.xml`
7. Test both modes locally, in light and dark, then push

### Change a price or a package

The pricing section sells website work only: Landingpage (from 2.500 €), Website (from 5.500 €, marked as
recommended), Website Plus (from 9.500 €), plus maintenance from 149 € per month and 95 € per hour for anything
beyond scope. All figures are net; the disclaimer under the cards says so.

Change a number in `index.html` **and** in both `translations.de` and `translations.en`, otherwise the JS overwrites
the HTML on the next load. Do not reintroduce packages for AI automation, web apps or code review; they were removed
deliberately.

### Update an image

- Always optimize first (WebP, <300 KB target)
- Update the `<img src>` reference in `index.html` and any project detail page
- Delete the old image from `assets/img/projects/`

### Change a translation

- Update both the inline HTML default and both language objects in `assets/js/main.js`

## Local Development

```powershell
python -m http.server 8000
# or
npx serve .
```

Open http://localhost:8000.

## What NOT to Do

- ❌ Don't introduce a build tool (Webpack, Vite and so on); the site is intentionally buildless
- ❌ Don't add inline `style="..."` for hover/active/state styling
- ❌ Don't commit images >500 KB
- ❌ Don't add new top-level documentation files: extend this file or `README.md` instead
- ❌ Don't use `setTimeout` to wait for CSS transitions: use `transitionend`
- ❌ Don't query the DOM inside animation frames or mousemove handlers: cache references
- ❌ Don't add tracking, analytics, or third-party scripts without updating `datenschutz.html`
- ❌ Don't use an em dash or en dash anywhere, in any file
- ❌ Don't reintroduce decorative layers: glow orbs, grid overlays, blur filters, endless keyframe animations
- ❌ Don't bring back the navbar color picker or the locked customer-projects tab
- ❌ Don't give the project slider a fixed height again; it follows its tallest slide
- ❌ Don't publish a photo of the E46 without retouching the number plate in every image size

---

**Last updated:** September 2026
