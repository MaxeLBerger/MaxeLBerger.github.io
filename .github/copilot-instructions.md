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
an external source that contains one, replace it while copying. A pre-commit hook enforces this.

## Tech Stack

- **HTML5 / CSS3 / vanilla JavaScript (ES6+)**: no React, no Vue, no bundler
- **GSAP 3.12 + ScrollTrigger** via CDN for animations
- **Inter** (Google Fonts): loaded after cookie consent (GDPR)
- **i18n**: custom DE/EN dictionary in [assets/js/main.js](../assets/js/main.js) (DE is default)
- **Hosting**: GitHub Pages with custom domain (`CNAME` → `maximilianhaak.de`)

## Core Architectural Concepts

### Homepage hero

The top `#hero` uses the E46 photo as the single full-bleed background, wired through one `<picture>` with five
sources: `hero-e46-4k.webp` (3840x2560, from 2200 px), `hero-e46.webp` (1920x1280, from 1600 px),
`hero-e46-1440.webp`, `hero-e46-960.webp` and `hero-e46-640.webp` as the `<img>` fallback. The active image is the
LCP element, so keep it eager with `fetchpriority="high"` and do not add competing CSS-background preloads.

**The number plate is retouched blank in all five files.** If you ever replace the photo, retouch the plate in the
master first, regenerate every size from that master, and verify the plate in each one. The highest real resolution
of the current source is 1920x1280, so `hero-e46-4k.webp` is upscaled and adds no detail; it exists because a 4K
variant was requested explicitly.

The hero is intentionally **photo-first and editorial**: the photo is only lightly dimmed, contrast for the text
comes from a reduced directional veil plus layered text-shadows. Do not reintroduce heavy flat dim layers or
theme-colored radial tints over the photo. The text column is: `.hero-eyebrow` (uppercase name and role line), then
`h1.hero-title` with three `.title-line` spans (the third uses `.title-line--quiet`, single accent color, never a
gradient), then `.hero-description`, then `.hero-cta` with ONE white primary button linking to `#projects` and ONE
`.hero-link` text link linking to `#contact`.

Do NOT add gradient text, self-awarded credibility badges, a second pill button, or a scroll hint to the hero; these
were deliberately removed. i18n keys are `hero.eyebrow`, `hero.title1..3`, `hero.desc`, `hero.cta1/cta2`.

Over the hero the navbar is transparent with white text (`body.has-hero #navbar:not(.scrolled)`). In light mode the
scrim over the hero stays dark and the icon buttons stay transparent, otherwise the sun icon disappears. Keep both
rules when touching the navbar.

### About section

`#about` sits directly after `#projects` and before the tech stack. Keep it as a personal editorial section with an
E46 media frame, short biographical copy, and compact facts. The current media asset is the optimized
`assets/img/profile/uebermich_mysticblau.webp` (portrait, 1000×1334, keep under ~300 KB) in a `.about-image-frame`; preserve the
lower focus so the car/person stay visible. Keep this image large and cleanly cropped in a restrained 5:6 media frame
with subtle border/shadow and no visible caption. The copy column should stay intentionally narrow for comfortable
reading (about 54ch max), rather than stretching across the available grid width. Use
`Über mich` / `About me` as the real section heading, not as an eyebrow; section-note/hint callouts belong only to
`#projects`. If this later becomes video, use
`assets/video/e46-about.mp4` with a poster fallback. All visible copy still goes through `data-i18n` keys in
`assets/js/main.js`; translated image alt text uses `data-i18n-alt`.

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

Language-neutral technology, product, and tool names in `.skill-tag` / `.tech-badge` labels stay inline as brand
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
