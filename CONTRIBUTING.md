# Contributing

This repo is a personal portfolio site. PRs from outside contributors are unlikely, but the workflow below applies to anyone making changes.

## Quick Start

```bash
git clone https://github.com/MaxeLBerger/MaxeLBerger.github.io.git
cd MaxeLBerger.github.io
python -m http.server 8000   # or: npx serve .
```

Open http://localhost:8000 and edit `index.html`, files under `assets/`,, or files under `projects/`.

## Commit Convention

Use conventional commits:

- `feat(scope): ...` — new feature
- `fix(scope): ...` — bug fix
- `docs(scope): ...` — documentation only
- `style(scope): ...` — formatting / CSS tweaks
- `refactor(scope): ...` — internal restructure, no behavior change
- `chore(scope): ...` — tooling / config

## Pre-Commit Checklist

- [ ] Page loads with no console errors
- [ ] All `data-i18n` keys exist in **both** `translations.de` and `translations.en` in [assets/js/main.js](assets/js/main.js)
- [ ] Mobile (375px), tablet (768px), and desktop layouts look correct
- [ ] No new files committed under `node_modules/`, `dist/`, or `build/`
- [ ] No secrets in code
- [ ] Images optimized — target <300 KB each

## i18n Rules

When changing user-visible text:

1. Update the German default text inline in HTML (with `data-i18n="key"`)
2. Update the same `key` in **both** `translations.de` and `translations.en` in `assets/js/main.js`

The JS dictionary overrides the HTML on page load, so inconsistent updates show stale text.

## Adding a New Project

1. Add a new card to the portfolio grid in [index.html](index.html)
2. Create `projects/<slug>.html` (copy an existing one as a template)
3. Add the project image to `assets/img/projects/` (WebP preferred, <300 KB)
4. Add a new slide to the hero slider in `index.html`
5. Add slide translation keys to both language objects in `assets/js/main.js`
6. Add a color theme entry to `assets/css/main.css` under `[data-project-theme="..."]` if needed
7. Test locally before pushing

## Deployment

Pushes to `main` deploy automatically via [.github/workflows/deploy.yml](.github/workflows/deploy.yml). No manual steps.
