# Development Guide

## Local development

The site is plain static files. Run any HTTP server in the repo root.

```powershell
# Python (built-in)
python -m http.server 8000

# Node (if installed)
npx serve .

# PHP (if installed)
php -S localhost:8000
```

Open <http://localhost:8000>.

## Conventions

### CSS

- Use CSS custom properties from `:root` (design tokens).
- Theme overrides go under `[data-project-theme="..."]`.
- Light-mode overrides go under `html[data-color-scheme="light"]`.
- Mobile-first media queries.
- No inline `style="..."` for state changes — use CSS classes
  (`.is-success`, `.is-error`, `.active`, …).

### JavaScript

- ES6+ (const/let, arrow functions, template literals, optional chaining).
- All module-level code lives in the existing IIFE in `assets/js/main.js`.
- Cache DOM lookups; prefer event delegation.
- Use `IntersectionObserver` to gate scroll-driven work.
- Use `transitionend` / `animationend` instead of `setTimeout` magic numbers.
- No `console.log` in production code.

### Images

- WebP preferred. Target **< 300 KB per image**.
- CI rejects any image > 600 KB (see [deployment.md](deployment.md)).
- Optimize new tech-stack icons aggressively (target < 30 KB each).

### i18n

When adding or changing visible text:

1. Set `data-i18n="section.key"` and put the German text inline in HTML.
2. Add the same key to **both** `translations.de` and `translations.en` in
   `assets/js/main.js`.

## Common tasks

### Add a new project

1. Add a new `.hero-slide` to `#projects` in [index.html](../index.html) with
   a new `data-theme`.
2. Add a new `.project-nav-btn` to the slider tablist.
3. Add the project image to `assets/img/projects/` (WebP, < 300 KB).
4. Add a color theme block to [assets/css/main.css](../assets/css/main.css) under
   `[data-project-theme="..."]`.
5. Add `slide.<project>.t1/t2/t3/desc/cta1/cta2/badge/tag1/tag2/tag3` keys
   to both `translations.de` and `translations.en` in [assets/js/main.js](../assets/js/main.js).
6. Add the project slug to `COLOR_THEMES` in `assets/js/main.js` if it gets a picker
   swatch.
7. Create `projects/<slug>.html` for the detail page.
8. Test locally and push.

### Update an image

- Optimize first (WebP, < 300 KB).
- Update the `<img src>` reference in `index.html` and any project detail page.
- Delete the old image from `assets/img/`.

### Change a translation

Update **both** the inline HTML default **and** both language objects in
`assets/js/main.js`.

## What NOT to do

- ❌ Don't introduce a build tool (Webpack, Vite, etc.) — site is intentionally
  buildless.
- ❌ Don't add inline `style="..."` for hover/active/state styling.
- ❌ Don't commit images > 500 KB.
- ❌ Don't add new top-level documentation files — extend a file in `docs/`
  or `README.md` instead.
- ❌ Don't use `setTimeout` to wait for CSS transitions — use `transitionend`.
- ❌ Don't query the DOM inside animation frames or mousemove handlers —
  cache references.
- ❌ Don't add tracking, analytics, or third-party scripts without updating
  `datenschutz.html`.
