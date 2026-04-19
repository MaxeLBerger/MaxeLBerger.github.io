# GitHub Copilot Instructions for MaxeLBerger.github.io

## Overview

Personal portfolio site for Maximilian Haak — fullstack web developer & AI specialist from Bruckmühl/Rosenheim. Static site (HTML + CSS + vanilla JavaScript), deployed to GitHub Pages.

**Live:** [maximilianhaak.de](https://maximilianhaak.de)

## Architecture

Plain static site — **no build step**, no submodules, no frameworks.

```
.
├── index.html              # Homepage (hero slider + sections)
├── style.css               # Main stylesheet (~2700 lines, design tokens + theming)
├── script.js               # Slider, theme, i18n, animations (~1340 lines)
├── impressum.html          # Legal info
├── datenschutz.html        # Privacy policy
├── projects/               # Project detail pages
│   ├── style.css
│   ├── aicaptain.html
│   ├── coha.html
│   ├── e46-studio.html
│   ├── imkerei-feuerstein.html
│   ├── shookroko.html
│   └── soundoflvke.html
├── res/                    # Static assets
│   ├── backgrounds/
│   ├── favicons/
│   ├── icons/
│   ├── profile/
│   ├── projects/
│   └── screenshots/
├── mcp-portfolio-server/   # Local MCP dev tool — not deployed, not required
└── .github/workflows/
    └── deploy.yml          # Single-job deploy to GitHub Pages
```

## Tech Stack

- **HTML5 / CSS3 / vanilla JavaScript (ES6+)** — no React, no Vue, no bundler
- **GSAP 3.12 + ScrollTrigger** via CDN for animations
- **Inter** (Google Fonts) — loaded after cookie consent (GDPR)
- **i18n**: custom DE/EN dictionary in `script.js` (DE is default)
- **Hosting**: GitHub Pages with custom domain (`CNAME` → `maximilianhaak.de`)

## Core Architectural Concepts

### Hero project slider

`#projects` contains 6 `.hero-slide` elements. The `ProjectSlider` class in [script.js](../script.js) handles:

- GSAP-powered transitions (with CSS fallback)
- Touch/swipe + keyboard navigation
- Per-slide theme switching via `data-theme` → `data-project-theme` on `<html>`
- Container height calculation (slides have varying heights)

### Theming

Two independent attributes on `<html>`:

| Attribute | Values | Controlled by |
|-----------|--------|---------------|
| `data-color-scheme` | `dark` (default), `light` | Theme toggle button (`#themeToggle`) |
| `data-project-theme` | `maxhaak`, `imkerei`, `coha`, `aicaptain`, `e46`, `soundoflvke`, `shookroko` | Slider, scroll observer, and color picker |

The `themeController` IIFE in `script.js` is the **single writer** for `data-project-theme`. All callers go through `setProjectTheme(theme, source)`. The color picker writes are persisted to `localStorage('themeColor')`; slider writes are not.

`e46` slides reuse the `maxhaak` swatch (no dedicated picker option).

### i18n

All user-visible text uses `data-i18n="key"` attributes. The dictionary lives in `translations.de` and `translations.en` inside [script.js](../script.js). On `init()` and on language toggle, `applyTranslations(lang)` overwrites the inline HTML text.

**Critical:** when changing visible text, update **both** the inline HTML default **and** the matching key in both language objects, or the JS will overwrite your HTML change on next load.

Language is persisted in `localStorage('lang')`.

### Performance gates

- **Mouse parallax** in `script.js` skips work when both `#hero` and `#projects` are off-screen (`parallaxTargetsVisible` flag, fed by two `IntersectionObserver`s).
- **Hero orb CSS animations** are paused via `animationPlayState` when `#hero` leaves the viewport.
- **Hero photo crossfade** (`setInterval`) skips work when `document.hidden`.
- **Google Fonts** are only loaded after the user accepts the cookie banner.

### Contact form

Two modes detected from the form's `action` attribute:

- `mailto:` → builds a pre-filled email and opens the user's mail client
- HTTP URL → POSTs `FormData` to the endpoint (e.g. Formspree)

Status feedback uses `.is-success` / `.is-error` classes on `.btn-primary` (defined in [style.css](../style.css)).

## Deployment

[.github/workflows/deploy.yml](workflows/deploy.yml) — single job:

1. Checkout
2. Copy `index.html`, `style.css`, `script.js`, `CNAME`, `impressum.html`, `datenschutz.html`, `projects/`, `res/` into `dist/`
3. Upload as Pages artifact
4. Deploy to `github-pages` environment

Push to `main` → live in ~1–2 minutes. There is **no build step** and **no matrix**.

## Coding Guidelines

### General

- Keep it simple — vanilla HTML/CSS/JS only
- Mobile-first responsive design
- Optimize images: WebP preferred, target <300 KB each
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
- Wrap all module-level code in the existing IIFE in `script.js`
- Cache DOM lookups; prefer event delegation
- Use `IntersectionObserver` to gate scroll-driven work
- Use `transitionend` / `animationend` instead of `setTimeout` magic numbers

### i18n

When adding or changing visible text:

1. Set `data-i18n="section.key"` and put the German text inline in HTML
2. Add the same key to both `translations.de` and `translations.en` in `script.js`

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

1. Add a new `.hero-slide` to `#projects` in [index.html](../index.html) with a new `data-theme`
2. Add a new `.project-nav-btn` to the slider tablist
3. Add the project image to `res/projects/` (optimize to WebP, <300 KB)
4. Add a color theme block to [style.css](../style.css) under `[data-project-theme="..."]`
5. Add `slide.<project>.t1/t2/t3/desc/cta1/cta2/badge/tag1/tag2/tag3` keys to both `translations.de` and `translations.en` in [script.js](../script.js)
6. Add the project slug to `COLOR_THEMES` in `script.js` if it gets a picker swatch
7. Create `projects/<slug>.html` for the detail page
8. Test locally and push

### Update an image

- Always optimize first (WebP, <300 KB target)
- Update the `<img src>` reference in `index.html` and any project detail page
- Delete the old image from `res/projects/`

### Change a translation

- Update both the inline HTML default and both language objects in `script.js`

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

**Last updated:** April 2026
