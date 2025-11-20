# TestoMax Integration - Setup Notes

## Completed Steps ✅

1. ✅ Added TestoMax as a Git submodule in `.gitmodules`
2. ✅ Created project card in `index.html` (positioned before "Coming Soon" card)
3. ✅ Created project detail page at `projects/testomax.html`
4. ✅ Updated `.github/workflows/deploy.yml` with flexible build/copy logic for TestoMax
5. ✅ Updated `.github/workflows/auto-update-submodules.yml` to include TestoMax
6. ✅ Updated `README.md` documentation to include TestoMax
7. ✅ TestoMax repository is now public at https://github.com/MaxeLBerger/TestoMax

## Optional Enhancements 💡

### 1. Create Project Thumbnail Image (Optional)
**File needed:** `res/TestoMax.jpg`

The image should:
- Be in JPG format
- Have dimensions similar to other project images (recommended: 1200x630px or 800x600px)
- Represent the TestoMax project visually
- Be optimized for web (file size < 500KB)

**Current status:** The project card currently uses `res/programming1.jpg` as a generic placeholder, which is fine until a custom image is created.

**To add a custom image:**
1. Create or obtain a TestoMax project image (screenshot, logo, or graphic)
2. Save it as `res/TestoMax.jpg`
3. Update `index.html` line ~217 to change from `programming1.jpg` to `TestoMax.jpg`

### 2. Verify Submodule Initialization
The TestoMax repository is now public at `https://github.com/MaxeLBerger/TestoMax`. On the next deployment, GitHub Actions will automatically:

```bash
# This happens automatically in the deploy workflow
git submodule update --init --recursive TestoMax
```

The submodule is already configured in `.gitmodules`, so no manual initialization is needed.

### 3. Configure Automatic Deployment (Recommended)
To enable automatic portfolio deployment when TestoMax is updated, add this workflow to the TestoMax repository:

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

Then add a `PORTFOLIO_TOKEN` secret to the TestoMax repository settings with a GitHub Personal Access Token that has `repo` permissions.

## Build Configuration

The deploy workflow includes flexible logic to handle TestoMax whether it's:
- **A built project** (with `package.json` and build script) → Will run `npm install && npm run build`
- **A static project** (just HTML/CSS/JS files) → Will copy files directly
- **Has a public/ directory** → Will copy from public/
- **Has a dist/ or build/ directory after building** → Will copy from those

This means TestoMax can be any type of web project and will deploy correctly.

## Testing

TestoMax is now ready for deployment. The next time the portfolio is deployed, TestoMax will automatically be included.

### Verification Steps:

1. **Check deployment workflow:**
   - Visit: https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions
   - The deploy workflow will automatically initialize and build TestoMax

2. **Test the project page:**
   - Visit: http://localhost:8000/projects/testomax.html (local testing)
   - Or: https://maximilianhaak.de/projects/testomax.html (after deployment)

3. **Verify the live site (after deployment):**
   - Main portfolio: https://maximilianhaak.de
   - TestoMax project: https://maximilianhaak.de/TestoMax/
   - TestoMax details page: https://maximilianhaak.de/projects/testomax.html
   - Project card appears on homepage

4. **Check submodule status** (for developers):
   ```bash
   git submodule status
   # Should show TestoMax with its current commit
   ```

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
