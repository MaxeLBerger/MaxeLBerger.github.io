# Architecture

Static portfolio site. **No build step** for local work, no submodules, no frameworks.
Plain HTML + CSS + vanilla JavaScript (ES6+), deployed to GitHub Pages. The deploy
workflow only minifies the copied CSS/JS (see [deployment.md](deployment.md)).

## File Layout

```
.
├── index.html              Entry: hero slider + sections
├── impressum.html          Legal info
├── datenschutz.html        Privacy policy
├── CNAME                   maximilianhaak.de
├── projects/               Project detail pages (one HTML per project)
│   └── main.css            Detail-page-specific styles
├── assets/                    Static assets (images only)
│   ├── backgrounds/        Hero backgrounds (WebP)
│   ├── favicons/           Site favicon
│   ├── icons/              Tech-stack icons (PNG/WebP)
│   ├── profile/            Portrait photos
│   ├── projects/           Project hero images (WebP)
│   └── screenshots/        Project screenshots
├── assets/
│   ├── css/main.css        Main stylesheet (~3 k lines, all components)
│   ├── js/main.js          All JS (~1.5 k lines, single IIFE)
│   └── img/                Static assets (images only)
├── tools/                  Local dev tooling (NOT deployed)
│   └── mcp-portfolio-server/   MCP server for editing portfolio data
├── docs/                   This folder
└── .github/workflows/      CI: deploy.yml
```

## Key Concepts

### Hero project slider

`#projects` contains 8 `.hero-slide` elements. The `ProjectSlider` class in
[assets/js/main.js](../assets/js/main.js) handles:

- Web Animations API transitions (transform/opacity, run by the browser)
- Touch/swipe + keyboard navigation
- Per-slide theme switching via `data-theme` → `data-project-theme` on `<html>`
- Container height calculation (slides have varying heights)

### Theming

Two independent attributes on `<html>`:

| Attribute | Values | Controlled by |
|---|---|---|
| `data-color-scheme` | `dark` (default), `light` | `#themeToggle` button |
| `data-project-theme` | `maxhaak`, `imkerei`, `coha`, `aicaptain`, `e46`, `soundoflvke`, `shookroko` | Slider, scroll observer, color picker |

The `themeController` IIFE in `assets/js/main.js` is the **single writer** for
`data-project-theme`. All callers go through `setProjectTheme(theme, source)`.
Color-picker writes are persisted to `localStorage('themeColor')`; slider writes
are not.

### i18n

All user-visible text uses `data-i18n="key"` attributes. The dictionary lives in
`translations.de` and `translations.en` inside [assets/js/main.js](../assets/js/main.js).

**Critical:** When changing visible text, update **both** the inline HTML
default **and** the matching key in both language objects. Otherwise the JS
overwrites your HTML change on next page load.

Language is persisted in `localStorage('lang')`.

### Performance gates

- **Energy bands** behind `#projects` and `#skills` are static masked layers.
  Do not add keyframe animations to them or their children: measured with
  `tools/perf-bench/`, that kept the main thread 30 to 80 % busy at 4x CPU
  throttling. Their scroll parallax is a CSS scroll-driven animation.
- **Skills palette cycle** (`setInterval`) only runs while `#skills` is on
  screen (`IntersectionObserver`) and the tab is visible.
- **Hero photo crossfade** (`setInterval`) skips work when `document.hidden`.
- **Below-the-fold sections** use `content-visibility: auto`.
- **Slider screenshots** load on demand (`data-src`, see `loadSlideMedia()`),
  with `srcset` width variants; a first visit downloads only the visible slide.
- **Inter** ships as a Latin subset (`InterVariable-subset.woff2`, 114 KB
  instead of 344 KB). It is deliberately not preloaded: on slow connections a
  preload competed with the CSS and delayed the first paint.
- Measure scroll and idle cost before and after visual changes:
  `node tools/perf-bench/bench.mjs --url <local server> --throttle 4`.

### Contact form

Two modes detected from the form's `action` attribute:

- `mailto:` → builds a pre-filled email and opens the user's mail client
- HTTP URL → POSTs `FormData` to the endpoint (e.g. Formspree)

Status feedback uses `.is-success` / `.is-error` classes on `.btn-primary`.
