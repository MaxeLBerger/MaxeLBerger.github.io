# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static personal portfolio for Maximilian Haak (live: maximilianhaak.de). Vanilla HTML/CSS/JS, **no build step, no bundler, no framework, no package.json at the root**. Pushing to `main` deploys to GitHub Pages. Primary content language is German; English is a runtime translation layer.

Do not introduce a build tool, framework, analytics, or third-party script. The buildless setup is deliberate.

## Commands

```bash
python -m http.server 8000
```

That is the whole dev loop — serve the repo root and open <http://localhost:8000>. `npx serve .` or `php -S localhost:8000` work equally well.

There is no test suite and no linter. The only automated checks are CI steps in [.github/workflows/deploy.yml](.github/workflows/deploy.yml); reproduce the important one locally before pushing images:

```powershell
Get-ChildItem -Recurse assets,projects -Include *.png,*.jpg,*.jpeg,*.webp,*.gif,*.svg,*.mp4,*.webm | Where-Object Length -gt 614400 | Select-Object Length,FullName
```

Any output there = CI failure (600 KB hard cap, soft target 300 KB/image). `.githooks/pre-commit` exists but is empty and `core.hooksPath` is unset — nothing runs on commit.

Optional local tooling in [tools/mcp-portfolio-server/](tools/mcp-portfolio-server/) (never deployed) has its own `package.json`: `npm run dev` / `npm run build` / `npm start`.

## CI gates (what breaks a push)

`build` runs on every push and PR; `deploy` only on push to `main`.

1. **Required entry points** must exist: `index.html`, `assets/css/main.css`, `assets/js/main.js`, `CNAME`, `impressum.html`, `datenschutz.html`.
2. **Asset size guard** — any image/video under `assets/` or `projects/` over `MAX_ASSET_KB` (600) fails the build.
3. **Internal-link check** — a Python step walks every HTML file in the assembled `dist/` and resolves every local `src=`/`href=`. A typo or a case mismatch fails the build. GitHub Pages is case-sensitive even though local Windows dev is not, so asset paths must match on-disk casing exactly.

`dist/` is assembled from root `*.html`, `CNAME`, `robots.txt`, `sitemap.xml`, `assets/`, `projects/`. `tools/`, `docs/`, and `.github/` are **not** shipped.

## Architecture

Three files carry essentially everything on the homepage:

- [index.html](index.html) (~71 KB) — sections in order: `#hero`, `#projects`, `#about`, `#skills`, `#pricing`, `#contact`.
- [assets/css/main.css](assets/css/main.css) (~116 KB) — design tokens in `:root`, theme overrides under `[data-project-theme="..."]`, light-mode under `html[data-color-scheme="light"]`, mobile-first media queries.
- [assets/js/main.js](assets/js/main.js) (~85 KB) — one IIFE, banner-comment sections: i18n translations → color scheme toggle → color theme picker/`themeController` → mobile menu → navbar scroll state → `ProjectSlider` → GSAP animations → contact form → cookie consent → init.

Project detail pages under [projects/](projects/) load `../assets/css/main.css` plus a local [projects/main.css](projects/main.css) and are otherwise standalone static pages.

GSAP 3.12 + ScrollTrigger come from a CDN with `defer`. Every GSAP-driven path has a `typeof gsap === 'undefined'` CSS fallback — preserve that when touching animation code.

### i18n — the biggest footgun

Visible text lives in **two places**: inline in the HTML (German default, carrying `data-i18n="key"`) and in `translations.de` / `translations.en` in `assets/js/main.js`. `applyTranslations(lang)` overwrites the DOM on init and on language toggle, so editing only the HTML produces text that reverts on load. Always update the inline default **and** both dictionaries. Translated `alt` text uses `data-i18n-alt`. Language persists in `localStorage('lang')`.

Brand/technology names in `.skill-tag` / `.tech-badge` stay inline without i18n keys — only surrounding copy is translated.

### Theming — two independent attributes on `<html>`

| Attribute | Values | localStorage |
|---|---|---|
| `data-color-scheme` | `dark` (default), `light` | `color-scheme` |
| `data-project-theme` | `maxhaak`, `imkerei`, `coha`, `aicaptain`, `e46`, `medieval`, `dogkennel`, `soundoflvke`, `shookroko`, `danielbrecheis`, `kayaseeds`, `jkentertainment`, `albert`, `senihelp24` | `themeColor` (picker writes only) |

`themeController` is the **single writer** for `data-project-theme`; three writers (color picker, slider, scroll observer) all funnel through `setProjectTheme(theme, source)` with `source` of `'picker' | 'slider' | 'scroll'`. Only picker writes persist and it dispatches `project-theme:change`, which `ProjectSlider` consumes so choosing a swatch selects the matching slide. Identical-theme writes short-circuit to avoid retriggering 0.6s CSS transitions site-wide. Never call `setAttribute('data-project-theme', …)` directly.

`e46` and `maxhaak` are aliases: the `e46` slide reuses the `maxhaak` swatch, so `getSlideIndexForTheme()` maps `maxhaak → e46` and `syncSwatches()` maps `e46 → maxhaak`. Keep both directions in sync if you touch either.

### ProjectSlider

`#projects` holds one `.hero-slides-container` with 13 highlighted projects. Every `.hero-slide` and matching `.project-nav-btn` carries `data-mode="customers"` or `data-mode="own"`; `collectMode()` pairs them by `data-project` ↔ `data-theme`. `this.allSlides` / `this.allNavBtns` retain the full set, while `this.slides` / `this.navBtns` contain only the active mode.

The enabled `.project-mode-selector` switches between seven customer highlights and six own highlights. `applyMode()` updates the active slide, tabs, theme, and the 30-card `.project-grid` below the slider (13 customer projects, 17 own projects). Keep both `.project-mode-count` badges synchronized with the grid totals. `locateTheme()` searches both modes so a picker selection can switch decks before selecting its slide.

### Performance and privacy gates

These exist for measured reasons; don't remove them casually.

- Mouse parallax skips work when `#projects` is off-screen (`parallaxTargetsVisible`, fed by `IntersectionObserver`).
- `.project-orb` CSS animations are paused while `#projects` lacks `.in-view`.
- Interval-driven work skips when `document.hidden`.
- Google Fonts load **only after** cookie consent (`localStorage('cookieConsent')`). Any new third-party request needs a matching update to [datenschutz.html](datenschutz.html).
- The hero photo (`.hero-bg-squared` `<picture>`, responsive `hero-e46-v2-*.webp`) is the LCP element — keep it `loading="eager"` + `fetchpriority="high"` and don't add competing preloads or a second background layer.

### Contact form

Mode is inferred from the form's `action`: `mailto:` builds a prefilled mail draft; an HTTP URL POSTs `FormData` (e.g. Formspree). Feedback uses `.is-success` / `.is-error` classes — never inline `style`.

## Conventions

- No inline `style="..."` for state — use classes (`.is-success`, `.is-error`, `.active`, `.in-view`).
- No `console.log` in shipped code.
- Use `transitionend` / `animationend` rather than `setTimeout` magic numbers; cache DOM lookups instead of querying inside `mousemove`/rAF handlers.
- All module-level JS goes inside the existing IIFE in `assets/js/main.js`.
- Images: WebP, under 300 KB.
- Conventional commits (`feat(scope): …`, `fix(scope): …`, …).
- Don't add new top-level docs — extend `README.md` or a file in [docs/](docs/).

## Adding a project

1. Add a `.project-card[data-mode]` to `.project-grid`, add `grid.<project>.desc` to both dictionaries, and update the matching mode count.
2. For a highlighted project, also add `.hero-slide[data-theme][data-mode]` plus a matching `.project-nav-btn[data-project][data-mode]` with intact `role="tab"` wiring.
3. Add the image to `assets/img/projects/` (WebP, <300 KB).
4. Add a theme block in `assets/css/main.css` under `[data-project-theme="..."]`.
5. For slider projects, add `slide.<project>.t1/t2/t3/desc/cta1/cta2/badge/tag1/tag2/tag3` keys to **both** dictionaries.
6. Add the slug to `COLOR_THEMES` only if it gets a picker swatch.
7. Create `projects/<slug>.html` when a detail page exists, then add it to [sitemap.xml](sitemap.xml).

## Doc precedence

[.github/copilot-instructions.md](.github/copilot-instructions.md) is the most current and detailed design record (hero redesign rationale, about-section rules, deliberate exclusions) — read it before reworking a homepage section. [docs/architecture.md](docs/architecture.md) has drifted (it still describes 8 slider slides and an older asset layout); trust the code and the copilot instructions over it.
