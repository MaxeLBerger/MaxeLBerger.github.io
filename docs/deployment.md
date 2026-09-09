# Deployment

The site is deployed to **Cloudflare Pages**. GitHub Actions does the
validation and the upload; Cloudflare only serves the result.

## Pipeline

[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) runs on every
push to `main` and on PRs.

### Jobs

1. **build** (always)
   - Verify required entry points exist (`index.html`, `assets/css/main.css`,
     `assets/js/main.js`, `CNAME`, `impressum.html`, `datenschutz.html`, `_headers`).
   - Guard against oversized assets: fail if any image or video in `assets/` or
     `projects/` exceeds **600 KB**.
   - Assemble `dist/` by copying root HTML, `robots.txt`, `sitemap.xml`,
     `assets/`, `projects/` and `_headers`.
   - Walk every HTML file in `dist/` and validate every internal `src=`/`href=`
     resolves to an existing file. Fail on broken references.
   - Emit a build size report to the GitHub Actions step summary.
   - Upload `dist/` as a workflow artifact (skipped on PRs).

2. **deploy** (only on push to `main`)
   - Downloads the `dist` artifact.
   - Runs `wrangler pages deploy dist --project-name=maximilianhaak-de --branch=main`
     via [`cloudflare/wrangler-action@v3`](https://github.com/cloudflare/wrangler-action).
   - Posts the deployed URL to the step summary.

PRs run every validator but never publish.

### Required GitHub secrets

| Secret | Where it comes from |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard, My Profile > API Tokens. Permission: **Account > Cloudflare Pages > Edit**. Scope it to this account only. |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard, right-hand sidebar of the account overview. |

Set them under **Settings > Secrets and variables > Actions**.

The Pages project name is the `CF_PAGES_PROJECT` env var at the top of the
workflow and must match the project in Cloudflare exactly.

### What gets shipped

| Source | In `dist/`? |
|---|---|
| `*.html` at root | yes |
| `assets/` (css, js, img, video) | yes |
| `projects/` | yes |
| `robots.txt`, `sitemap.xml` | yes |
| `_headers` | yes |
| `CNAME` | no (GitHub Pages only, kept in the repo for rollback) |
| `tools/` | no (local dev only) |
| `docs/` | no |
| `.github/`, `.gitignore`, `README.md` | no |

## Response headers

[`_headers`](../_headers) is read by Cloudflare Pages from the root of the
deployed directory. It sets the security headers GitHub Pages could not send
(`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
`Permissions-Policy`, HSTS) and a one-day browser cache for images and video.

HTML, CSS and JS deliberately keep the Cloudflare default (revalidate on every
request), because `main.css` and `main.js` are not content-hashed. Do not add
long `max-age` values for them without introducing cache busting first.

Format and limits: <https://developers.cloudflare.com/pages/configuration/headers/>

## Domain

`maximilianhaak.de` is registered at IONOS. DNS is served by Cloudflare, so the
apex domain can be attached to the Pages project via CNAME flattening.

- Apex `maximilianhaak.de`: custom domain on the Pages project, proxied.
- `www.maximilianhaak.de`: 301 to the apex via a Cloudflare Redirect Rule.
  `_redirects` cannot do this; it only matches paths, not hostnames.
- Mail stays at IONOS: the `MX` records (`mx00.ionos.de`, `mx01.ionos.de`) and
  the SPF `TXT` record must exist in the Cloudflare zone and must be set to
  **DNS only** (grey cloud). Proxying an MX record breaks mail delivery.

## Rollback

Cloudflare keeps every deployment. Fastest path:

1. Cloudflare dashboard > Workers & Pages > `maximilianhaak-de` > Deployments.
2. Pick the last good deployment and choose **Rollback**.

To roll back from git instead:

```powershell
git revert <bad-commit>
git push origin main
```

Back to GitHub Pages entirely (needs the repo to be public again on the free
plan): restore the `actions/deploy-pages` job, re-enable Pages in the repo
settings, and point the IONOS DNS back at the GitHub Pages A records. The
`CNAME` file is still in the repo for exactly this case.

## Asset budget

- **Per file:** 600 KB hard limit (CI fails).
- **Soft target:** 300 KB per image.
- **Total page weight:** keep under 2 MB on first load.

Use WebP for photos, optimize PNGs aggressively, and prefer SVG for icons
where possible.
