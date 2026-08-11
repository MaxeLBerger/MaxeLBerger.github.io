# GitHub Copilot Instructions for MaxeLBerger.github.io

## Overview

Personal portfolio site for Maximilian Haak — fullstack web developer & AI specialist from Bruckmühl/Rosenheim. Static site (HTML + CSS + vanilla JavaScript), deployed to GitHub Pages.

**Live:** [maximilianhaak.de](https://maximilianhaak.de)

## Architecture

Plain static site — **no build step**, no submodules, no frameworks.

```
.
├── index.html              # Homepage (hero slider + sections)
├── impressum.html          # Legal info
├── datenschutz.html        # Privacy policy
├── assets/
│   ├── css/
│   │   └── main.css        # Stylesheet (~2700 lines, design tokens + theming)
│   ├── js/
│   │   └── main.js         # Slider, theme, i18n, animations (~1340 lines)
│   └── img/                # Backgrounds, favicons, icons, profile, projects, screenshots
├── projects/               # Project detail pages
│   ├── main.css            # Project-page-specific styles
│   ├── aicaptain.html
│   ├── coha.html
│   ├── e46-studio.html
│   ├── imkerei-feuerstein.html
│   ├── shookroko.html
│   └── soundoflvke.html
├── docs/                   # architecture / development / deployment guides
├── tools/                  # Local dev tooling (NOT deployed)
│   └── mcp-portfolio-server/   # Local MCP dev tool
└── .github/workflows/
    └── deploy.yml          # Single-job deploy to GitHub Pages
```

## Tech Stack

- **HTML5 / CSS3 / vanilla JavaScript (ES6+)** — no React, no Vue, no bundler
- **GSAP 3.12 + ScrollTrigger** via CDN for animations
- **Inter** (Google Fonts) — loaded after cookie consent (GDPR)
- **i18n**: custom DE/EN dictionary in [assets/js/main.js](../assets/js/main.js) (DE is default)
- **Hosting**: GitHub Pages with custom domain (`CNAME` → `maximilianhaak.de`)

## Core Architectural Concepts

### Homepage hero

The top `#hero` uses the E46 photo as the single full-bleed background. Keep the responsive
`assets/img/backgrounds/hero-e46-640.webp`, `hero-e46-960.webp`, `hero-e46-1440.webp`, and full
`hero-e46.webp` variants wired through the `.hero-bg-squared` `<picture>` sources; the active image is the LCP element,
so keep it eager with `fetchpriority="high"` and do not add competing CSS-background preloads;
do not switch back to the older `herosquared` hero. Keep the dedicated `.hero-section--square` and
`.hero-bg-squared` crop/veil rules. Place the hero text in the right-side grid column (`.hero-section--single`) on
wide screens.

The hero is intentionally **photo-first and editorial** (redesigned July 2026): the photo is only lightly dimmed
(`brightness(0.82)`), contrast for the text comes from the reduced directional `--square::before` veil plus layered
text-shadows — do not reintroduce heavy flat dim layers or theme-colored radial tints over the photo. The text column
is: `.hero-eyebrow` (uppercase name + role line) → `h1.slide-title` with three `.title-line` spans carrying the value
proposition (third line uses `.title-line--quiet` for a muted typographic accent) → `.slide-description` →
`.slide-cta` with ONE white primary button (scoped `.hero-section--single .btn-primary` override) linking to
`#projects` and ONE `.hero-link` text link (arrow via `::after`) linking to `#contact`. Do NOT add gradient text,
self-awarded credibility badges, a second pill button, or a scroll hint to the hero — these were deliberately removed
as part of the de-templating redesign. i18n keys are `hero.eyebrow`, `hero.title1..3`, `hero.desc`, `hero.cta1/cta2`.
The GSAP entrance sequence in `playEntrance()` animates eyebrow → title lines → description → CTAs.

### About section

`#about` sits directly after `#projects` and before the tech stack. Keep it as a personal editorial section with an
E46 media frame, short biographical copy, and compact facts. The current media asset is the optimized
`assets/img/profile/uebermich.webp` (portrait, 1000×1334, keep under ~300 KB) in a `.about-image-frame`; preserve the
lower focus so the car/person stay visible. Keep this image large and cleanly cropped in a restrained 5:6 media frame
with subtle border/shadow and no visible caption. The copy column should stay intentionally narrow for comfortable
reading (about 54ch max), rather than stretching across the available grid width. Use
`Über mich` / `About me` as the real section heading, not as an eyebrow; section-note/hint callouts belong only to
`#projects`. If this later becomes video, use
`assets/video/e46-about.mp4` with a poster fallback. All visible copy still goes through `data-i18n` keys in
`assets/js/main.js`; translated image alt text uses `data-i18n-alt`.

### Hero project slider

`#projects` holds TWO project sets that share one slider chrome (arrows, transitions, theming). Above them sits the
two-option `.project-mode-selector` segmented pill with `Kundenprojekte` (left) and `Eigene Projekte` (right); each
button carries `data-mode`, `aria-pressed`, `aria-controls`, and a `.project-mode-count` badge with the number of
projects behind it.

| `data-mode` | Slides | Container / tablist |
|-------------|--------|---------------------|
| `own` (default active) | E46 Studio, AI Captain, Medieval TD, Shookroko, dog-kennel-online | `#projectSlides-own` + `.project-pagination[data-mode="own"]` |
| `customers` | Imkerei Feuerstein, JK Entertainment, Kaya Seeds, Daniel Brecheis, Co Ha, SoundOfLvke | `#projectSlides-customers` + `.project-pagination[data-mode="customers"]` |

Each set owns one `.hero-slides-container[data-mode]` plus its own `.project-pagination[data-mode]` tablist. The
inactive set carries the `hidden` attribute — both elements set an explicit `display`, so `.hero-slides-container[hidden]`
/ `.project-pagination[hidden]` rules in CSS are what actually hide them. **Invariant: exactly one
`.hero-slide.active` exists site-wide**, because the mouse-parallax target and the scroll theme sync both resolve
`document.querySelector('.hero-slide.active')`. `setMode()` enforces it by stripping `.active` from the outgoing set.

`own` stays the default so the landing view keeps the E46/blue continuity from the hero. Customer slides link to both
the live site (`.btn-primary`, `target="_blank"`) and the local detail page under `projects/` (`.btn-outline`).

The `ProjectSlider` class in [assets/js/main.js](../assets/js/main.js) handles:

- GSAP-powered transitions (with CSS fallback)
- Mode switching (`setMode()`) with a CSS crossfade driven by `.is-mode-out` / `.is-mode-in`
- Touch/swipe + keyboard navigation, delegated per set so an index always resolves against the right slide list
- Per-slide theme switching via `data-theme` → `data-project-theme` on `<html>`
- Container height calculation (slides have varying heights)
- `primeSlideImages()` — flips a revealed slide's `loading="lazy"` screenshot to `eager`. Chrome keeps a lazy image
    whose ancestor was `display: none` deferred *forever*, even after the slide is shown and the user scrolls, so
    without this every slide except the one active on load renders an empty browser frame. Keep the call in both
    `goToSlide()` (start of the transition) and `setActiveSlide()` (init + mode switch).
- `scrollActiveTabIntoView()` — centers the active tab in the pagination strip, which becomes a horizontal scroller
    below 768px. It writes `scrollLeft` instead of calling `scrollIntoView()` so page scroll is never disturbed.

`ProjectSlider` filters `.project-nav-btn` elements that are `disabled` or have `aria-disabled="true"` out of each
set's `navBtns`, so a locked nav option cannot become an active index.

When the colour picker selects a theme that belongs to the *other* set, `syncToTheme()` switches mode first and then
lands on that project — every picker swatch maps to a real slide.

### Theming

Two independent attributes on `<html>`:

| Attribute | Values | Controlled by |
|-----------|--------|---------------|
| `data-color-scheme` | `dark` (default), `light` | Theme toggle button (`#themeToggle`) |
| `data-project-theme` | `maxhaak`, `imkerei`, `coha`, `aicaptain`, `e46`, `medieval`, `dogkennel`, `soundoflvke`, `shookroko`, `danielbrecheis`, `kayaseeds`, `jkentertainment` | Slider, scroll observer, and color picker |

The `themeController` IIFE in `assets/js/main.js` is the **single writer** for `data-project-theme`. All callers go
through `setProjectTheme(theme, source)`. The color picker writes are persisted to `localStorage('themeColor')`; slider
writes are not. Picker writes also dispatch the internal theme-change event consumed by `ProjectSlider`, so selecting a
swatch before scrolling to `#projects` activates the matching project slide instead of falling back to the first slide.

`e46` slides reuse the `maxhaak` swatch (no dedicated picker option).

### i18n

All user-visible text uses `data-i18n="key"` attributes. The dictionary lives in `translations.de` and `translations.en` inside [script.js](../assets/js/main.js). On `init()` and on language toggle, `applyTranslations(lang)` overwrites the inline HTML text.

**Critical:** when changing visible text, update **both** the inline HTML default **and** the matching key in both language objects, or the JS will overwrite your HTML change on next load.

Language-neutral technology, product, and tool names in `.skill-tag` / `.tech-badge` labels stay inline as brand
labels. Keep i18n keys for surrounding headings, descriptions, and copy that changes between DE and EN.

Language is persisted in `localStorage('lang')`.

### Performance gates

- **Mouse parallax** in `assets/js/main.js` skips work when `#projects` is off-screen (`parallaxTargetsVisible` flag, fed by an `IntersectionObserver`).
- **Portfolio orb CSS animations** live in `#projects` as `.project-orb` elements and are paused while the section lacks `.in-view`.
- **Hero photo crossfade** (`setInterval`) skips work when `document.hidden`.
- **Google Fonts** are only loaded after the user accepts the cookie banner.
- **Contact location** uses a lightweight external Google Maps link card, not an embedded iframe. Do not reintroduce a
    map iframe on the homepage unless there is a strong product reason and it remains opt-in/lazy.

### Contact form

Two modes detected from the form's `action` attribute:

- `mailto:` → builds a pre-filled email and opens the user's mail client
- HTTP URL → POSTs `FormData` to the endpoint (e.g. Formspree)

Status feedback uses `.is-success` / `.is-error` classes on `.btn-primary` (defined in [style.css](../assets/css/main.css)).

## Deployment

[.github/workflows/deploy.yml](workflows/deploy.yml) — single job:

1. Checkout
2. Copy `index.html`, `*.html`, `CNAME`, `assets/`, `projects/` into `dist/`
3. Upload as Pages artifact
4. Deploy to `github-pages` environment

Push to `main` → live in ~1–2 minutes. There is **no build step** and **no matrix**.

## Coding Guidelines

### General

- Keep it simple — vanilla HTML/CSS/JS only
- Mobile-first responsive design
- Optimize images: WebP preferred, target <300 KB each
- Asset paths must match the exact on-disk filename casing; GitHub Pages is case-sensitive even if local Windows dev is not
- Use semantic HTML and ARIA where appropriate
- No `console.log` in production code
- No inline `style="..."` for state changes — use CSS classes (`.is-success`, `.is-error`, `.active`, etc.)

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

1. Pick the set: own work → `#projectSlides-own`, client work → `#projectSlides-customers`
2. Add a new `.hero-slide` to that container in [index.html](../index.html) with a new `data-theme`, `role="tabpanel"`,
     `aria-labelledby="tab-<slug>"` and the `hidden` attribute (only the active slide of the active set is unhidden)
3. Add a matching `.project-nav-btn.project-pag-btn` to the *same set's* `.project-pagination[data-mode="…"]`, renumber
     the `.project-pag-index` labels, and bump that mode button's `.project-mode-count`
4. Add the project image to `assets/img/projects/` (optimize to WebP, <300 KB) and set real `width`/`height` on the `<img>`
5. Add a color theme block to [main.css](../assets/css/main.css) under `[data-project-theme="..."]`
6. Add `slide.<project>.t1/t2/t3/desc/cta1/cta2/badge/tag1/tag2/tag3` keys to both `translations.de` and `translations.en` in [main.js](../assets/js/main.js)
7. Add the project slug to `COLOR_THEMES` in `assets/js/main.js` if it gets a picker swatch
8. Create `projects/<slug>.html` for the detail page
9. Test locally — click every tab in both modes and confirm the screenshot actually renders (see `primeSlideImages()`) — then push

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

- ❌ Don't introduce a build tool (Webpack, Vite, etc.) — site is intentionally buildless
- ❌ Don't add inline `style="..."` for hover/active/state styling
- ❌ Don't commit images >500 KB
- ❌ Don't add new top-level documentation files — extend this file or `README.md` instead
- ❌ Don't use `setTimeout` to wait for CSS transitions — use `transitionend`
- ❌ Don't query the DOM inside animation frames or mousemove handlers — cache references
- ❌ Don't add tracking, analytics, or third-party scripts without updating `datenschutz.html`

---

**Last updated:** May 2026
