# Deployment

## Pipeline

[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) runs on every
push to `main` and on PRs.

### Jobs

1. **build** (always)
   - Verify required entry points exist (`index.html`, `assets/css/main.css`, `assets/js/main.js`,
     `CNAME`, `impressum.html`, `datenschutz.html`).
   - Guard against oversized assets — fail if any image/video in `assets/img/` or
     `projects/` exceeds **600 KB**.
   - Assemble `dist/` by copying root HTML, `assets/css/main.css`, `assets/js/main.js`, `CNAME`,
     `assets/img/`, `projects/`, plus `.nojekyll`.
   - Walk every HTML file in `dist/` and validate every internal `src=`/`href=`
     resolves to an existing file. Fail on broken references.
   - Emit a build size report to the GitHub Actions step summary.
   - Upload as Pages artifact (skipped on PRs).

2. **deploy** (only on push to `main`)
   - Calls `actions/deploy-pages@v4` with the artifact from `build`.
   - Posts the deployed URL to the step summary.

### What gets shipped

| Source | In `dist/`? |
|---|---|
| `*.html` at root | ✅ |
| `assets/css/main.css`, `assets/js/main.js` | ✅ |
| `CNAME` | ✅ |
| `assets/img/` | ✅ |
| `projects/` | ✅ |
| `tools/` | ❌ (local dev only) |
| `docs/` | ❌ |
| `.github/`, `.gitignore`, `README.md` | ❌ |

### Domain

`CNAME` resolves the GitHub Pages site to <https://maximilianhaak.de>.

## Asset budget

- **Per file:** 600 KB hard limit (CI fails).
- **Soft target:** 300 KB per image.
- **Total page weight:** keep under 2 MB on first load.

Use WebP for photos, optimize PNGs aggressively, and prefer SVG for icons
where possible.

## Rollback

GitHub Pages keeps previous deployments accessible via the Actions UI.
To roll back, redeploy a previous green commit:

```powershell
git revert <bad-commit>
git push origin main
```

Or trigger a fresh deploy from a known-good ref via
**Actions → Deploy Portfolio → Run workflow**.
