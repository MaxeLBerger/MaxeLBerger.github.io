# Architecture

Static portfolio site. **No build step**, no submodules, no frameworks.
Plain HTML + CSS + vanilla JavaScript (ES6+), deployed to GitHub Pages.

## File Layout

```
.
├── index.html              Entry: hero slider + sections
├── impressum.html          Legal info
├── datenschutz.html        Privacy policy
├── CNAME                   maximilianhaak.de
├── projects/               Project detail pages (one HTML per project)
│   └── style.css           Detail-page-specific styles
├── assets/                    Static assets (images only)
│   ├── backgrounds/        Hero backgrounds (WebP)
│   ├── favicons/           Site favicon
│   ├── icons/              Tech-stack icons (PNG/WebP)
│   ├── profile/            Portrait photos
│   ├── projects/           Project hero images (WebP)
│   └── screenshots/        Project screenshots
├── style.css               Main stylesheet (~3 k lines, all components)
├── script.js               All JS (~1.5 k lines, single IIFE)
├── tools/                  Local dev tooling (NOT deployed)
│   └── mcp-portfolio-server/   MCP server for editing portfolio data
├── docs/                   This folder
└── .github/workflows/      CI: deploy.yml
```

## Key Concepts

### Hero project slider

`#projects` contains 8 `.hero-slide` elements. The `ProjectSlider` class in
[script.js](../assets/js/main.js) handles:

- GSAP-powered transitions (with CSS fallback)
- Touch/swipe + keyboard navigation
- Per-slide theme switching via `data-theme` → `data-project-theme` on `<html>`
- Container height calculation (slides have varying heights)

### Theming

Two independent attributes on `<html>`:

| Attribute | Values | Controlled by |
|---|---|---|
| `data-color-scheme` | `dark` (default), `light` | `#themeToggle` button |
| `data-project-theme` | `maxhaak`, `imkerei`, `coha`, `aicaptain`, `e46`, `soundoflvke`, `shookroko` | Slider, scroll observer, color picker |

The `themeController` IIFE in `script.js` is the **single writer** for
`data-project-theme`. All callers go through `setProjectTheme(theme, source)`.
Color-picker writes are persisted to `localStorage('themeColor')`; slider writes
are not.

### i18n

All user-visible text uses `data-i18n="key"` attributes. The dictionary lives in
`translations.de` and `translations.en` inside [script.js](../assets/js/main.js).

**Critical:** When changing visible text, update **both** the inline HTML
default **and** the matching key in both language objects. Otherwise the JS
overwrites your HTML change on next page load.

Language is persisted in `localStorage('lang')`.

### Performance gates

- **Mouse parallax** in `script.js` skips work when both `#hero` and
  `#projects` are off-screen (`parallaxTargetsVisible` flag, fed by two
  `IntersectionObserver`s).
- **Hero orb CSS animations** are paused via `animationPlayState` when
  `#hero` leaves the viewport.
- **Hero photo crossfade** (`setInterval`) skips work when `document.hidden`.
- **Google Fonts** load only after the user accepts the cookie banner.

### Contact form

Two modes detected from the form's `action` attribute:

- `mailto:` → builds a pre-filled email and opens the user's mail client
- HTTP URL → POSTs `FormData` to the endpoint (e.g. Formspree)

Status feedback uses `.is-success` / `.is-error` classes on `.btn-primary`.
