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
| `data-project-theme` | `maxhaak`, `imkerei`, `coha`, `aicaptain`, `e46`, `medieval`, `dogkennel`, `soundoflvke`, `shookroko`, `danielbrecheis`, `kayaseeds`, `jkentertainment` | `themeColor` (picker writes only) |

`themeController` is the **single writer** for `data-project-theme`; three writers (color picker, slider, scroll observer) all funnel through `setProjectTheme(theme, source)` with `source` of `'picker' | 'slider' | 'scroll'`. Only picker writes persist and it dispatches `project-theme:change`, which `ProjectSlider` consumes so choosing a swatch selects the matching slide. Identical-theme writes short-circuit to avoid retriggering 0.6s CSS transitions site-wide. Never call `setAttribute('data-project-theme', …)` directly.

`e46` and `maxhaak` are aliases: the `e46` slide reuses the `maxhaak` swatch, so `getSlideIndexForTheme()` maps `maxhaak → e46` and `syncSwatches()` maps `e46 → maxhaak`. Keep both directions in sync if you touch either.

### ProjectSlider

`#projects` holds exactly one `.hero-slides-container` with the five **own** projects (`e46`, `aicaptain`, `medieval`, `shookroko`, `dogkennel`). Pairing is index-based between `.project-nav-btn[data-project]` and `.hero-slide[data-theme]`; the constructor re-sorts slides into nav-button order, and only reorders when the counts match — a nav button without a matching slide silently disables the reorder. Buttons that are `disabled` or `aria-disabled="true"` are filtered out of `this.navBtns` so they can never become an active index.

The `.project-mode-selector` above the slider has a `Kundenprojekte` option that is **intentionally locked** (`disabled`, `aria-disabled`, `.is-locked`) until paid customer work exists. Do not wire it up or render customer slides on the homepage. The customer i18n keys (`slide.imkerei.*`, `slide.coha.*`, `slide.soundoflvke.*`, `slide.danielbrecheis.*`, `slide.kayaseeds.*`, `slide.jkentertainment.*`) and the corresponding pages under `projects/` are deliberately retained for later.

### Performance and privacy gates

These exist for measured reasons; don't remove them casually.

- Mouse parallax skips work when `#projects` is off-screen (`parallaxTargetsVisible`, fed by `IntersectionObserver`).
- `.project-orb` CSS animations are paused while `#projects` lacks `.in-view`.
- Interval-driven work skips when `document.hidden`.
- Google Fonts load **only after** cookie consent (`localStorage('cookieConsent')`). Any new third-party request needs a matching update to [datenschutz.html](datenschutz.html).
- The hero photo (`.hero-bg-squared` `<picture>`, responsive `hero-e46-*.webp`) is the LCP element — keep it `loading="eager"` + `fetchpriority="high"` and don't add competing preloads or a second background layer.

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

1. `.hero-slide` in `#projects` with a new `data-theme` + matching `.project-nav-btn[data-project]` (same order, `role="tab"` wiring intact).
2. Image in `assets/img/projects/` (WebP, <300 KB).
3. Theme block in `assets/css/main.css` under `[data-project-theme="..."]`.
4. `slide.<project>.t1/t2/t3/desc/cta1/cta2/badge/tag1/tag2/tag3` keys in **both** dictionaries.
5. Add the slug to `COLOR_THEMES` if it gets a picker swatch.
6. `projects/<slug>.html` detail page (copy an existing one).
7. Add the detail page to [sitemap.xml](sitemap.xml) — easy to forget, not covered by CI.

## Doc precedence

[.github/copilot-instructions.md](.github/copilot-instructions.md) is the most current and detailed design record (hero redesign rationale, about-section rules, deliberate exclusions) — read it before reworking a homepage section. [docs/architecture.md](docs/architecture.md) has drifted (it still describes 8 slider slides and an older asset layout); trust the code and the copilot instructions over it.
