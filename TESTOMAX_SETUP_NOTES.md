# TestoMax Integration - Setup Notes

## Completed Steps ✅

1. ✅ Added TestoMax as a Git submodule in `.gitmodules`
2. ✅ Created project card in `index.html` (positioned before "Coming Soon" card)
3. ✅ Created project detail page at `projects/testomax.html`
4. ✅ Updated `.github/workflows/deploy.yml` with flexible build/copy logic for TestoMax
5. ✅ Updated `.github/workflows/auto-update-submodules.yml` to include TestoMax
6. ✅ Updated `README.md` documentation to include TestoMax

## Remaining Steps ⚠️

### 1. Create Project Thumbnail Image
**File needed:** `res/TestoMax.jpg`

The image should:
- Be in JPG format
- Have dimensions similar to other project images (recommended: 1200x630px or 800x600px)
- Represent the TestoMax project visually
- Be optimized for web (file size < 500KB)

**Current status:** The project card currently uses `res/programming1.jpg` as a placeholder.

**To add the proper image:**
1. Create or obtain a TestoMax project image (screenshot, logo, or graphic)
2. Save it as `res/TestoMax.jpg`
3. Update `index.html` line ~190 to change from `programming1.jpg` to `TestoMax.jpg`
4. Remove the TODO comment

### 2. Initialize the Submodule
Once the TestoMax repository exists at `https://github.com/MaxeLBerger/TestoMax`, initialize it:

```bash
git submodule update --init --recursive
```

Or if adding for the first time:
```bash
git submodule add https://github.com/MaxeLBerger/TestoMax.git TestoMax
git add .gitmodules TestoMax
git commit -m "Initialize TestoMax submodule"
git push
```

### 3. Configure TestoMax Repository (if needed)
If you want automatic deployment when TestoMax is updated, add this workflow to the TestoMax repository:

**File:** `.github/workflows/notify-portfolio.yml`

```yaml
name: Notify Portfolio on Push

on:
  push:
    branches: [ main ]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Portfolio Update
        run: |
          curl -X POST \
            -H "Accept: application/vnd.github.v3+json" \
            -H "Authorization: token ${{ secrets.PORTFOLIO_TOKEN }}" \
            https://api.github.com/repos/MaxeLBerger/MaxeLBerger.github.io/dispatches \
            -d '{"event_type":"update-submodule","client_payload":{"submodule":"TestoMax"}}'
```

And add a `PORTFOLIO_TOKEN` secret to the TestoMax repository settings.

## Build Configuration

The deploy workflow includes flexible logic to handle TestoMax whether it's:
- **A built project** (with `package.json` and build script) → Will run `npm install && npm run build`
- **A static project** (just HTML/CSS/JS files) → Will copy files directly
- **Has a public/ directory** → Will copy from public/
- **Has a dist/ or build/ directory after building** → Will copy from those

This means TestoMax can be any type of web project and will deploy correctly.

## Testing

After completing the setup:

1. Verify the submodule is initialized:
   ```bash
   ls -la TestoMax/
   ```

2. Test the project page loads:
   - Visit: `http://localhost:8000/projects/testomax.html` (or your local server)

3. Test the deployment workflow:
   ```bash
   git push origin main
   ```
   Then check: https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions

4. Verify the live site (after deployment):
   - Main portfolio: https://maximilianhaak.de
   - TestoMax project: https://maximilianhaak.de/TestoMax/
   - TestoMax details: https://maximilianhaak.de/projects/testomax.html

## Customization

To customize the TestoMax project card and detail page:

1. **Update description in `index.html`** (line ~189):
   - Change the `<p>` text to describe your project better

2. **Update detail page content in `projects/testomax.html`**:
   - Add specific features (line ~76)
   - Update technology stack (line ~145)
   - Add screenshots/videos
   - Update project goals
   - Add GitHub repository link

3. **Update project image**:
   - Replace placeholder with actual project screenshot at `res/TestoMax.jpg`

## Integration Pattern

TestoMax follows the same pattern as other projects:

- **Submodule structure**: Git submodule in root directory
- **Project card**: In `index.html` projects section
- **Detail page**: In `projects/` directory with consistent styling
- **Deployment**: Automated via GitHub Actions
- **Auto-update**: Via repository_dispatch events

This ensures consistency across all portfolio projects.
