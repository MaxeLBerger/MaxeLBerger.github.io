# GitHub Copilot Instructions for MaxeLBerger.github.io

## Repository Overview

This is a professional portfolio website for Maximilian Haak, showcasing software development projects with automated CI/CD deployment. The repository uses **Git Submodules** for clean project separation and **GitHub Actions** for automated builds and deployment to GitHub Pages.

**Live Site:** [maximilianhaak.de](https://maximilianhaak.de)

## Architecture & Structure

### Main Repository Structure
```
MaxeLBerger.github.io/
├── .github/
│   ├── workflows/          # CI/CD automation
│   │   ├── deploy.yml      # Main deployment (parallel matrix builds)
│   │   ├── auto-update-submodules.yml  # Auto-update via repository_dispatch
│   │   └── test-projects.yml           # PR sanity checks
│   └── agents/             # Custom Copilot agents
│       └── portfolio-fix.agent.md
├── AgeOfMax/              # Git Submodule - TypeScript tower defense game
├── FireCastle/            # Git Submodule - Clash of Clans website
├── AuTuneOnline/          # Git Submodule - Audio visualizer
├── CasinoIdleSlots/       # Git Submodule - Idle game
├── BetterBestie/          # Git Submodule - Full-stack challenge app
├── dl4j-graph-explorer/   # Git Submodule - DL4J visualization tool
├── TestoMax/              # Git Submodule - Web project
├── mcp-portfolio-server/  # MCP server for portfolio optimization (local dev tool)
├── projects/              # Project detail pages (14 pages, submodules + external)
├── res/                   # Static resources (images, icons)
├── index.html             # Portfolio homepage
├── style.css              # Main stylesheet
├── script.js              # Main JavaScript
├── impressum.html         # Legal information
├── datenschutz.html       # Privacy policy
└── *.md                   # Extensive documentation
```

### Git Submodules (7 total)
The repository uses Git Submodules to reference independent project repositories.

**Built projects (Vite/TypeScript — parallel matrix builds in CI):**
- **AgeOfMax**: TypeScript, Phaser 3, Vite — Tower defense game
- **CasinoIdleSlots**: TypeScript, React, Tailwind, Vite — Idle slot game (needs Supabase secrets)
- **BetterBestie**: TypeScript, React, Express, Vite — Full-stack challenge app
- **dl4j-graph-explorer**: TypeScript, React, D3.js, Vite — Neural network visualization
- **Acai-Agents**: HTML5, CSS3, JavaScript, PostCSS, Terser — AI agency website (custom build)

**Static projects (copied as-is, no build step):**
- **FireCastle**: JavaScript, Node.js, Express — Clan management website
- **AuTuneOnline**: JavaScript, Web Audio API — Audio visualizer
- **TestoMax**: HTML5, CSS3, JavaScript — Web project

## Tech Stack

### Portfolio Site
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with responsive design
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Roboto, Montserrat)
- **Hosting**: GitHub Pages
- **Domain**: maximilianhaak.de

### Build Tools (for Submodules)
- **Node.js**: 20.x
- **Vite**: For TypeScript project builds (AgeOfMax, CasinoIdleSlots, BetterBestie, dl4j-graph-explorer)
- **TypeScript**: For type-safe development
- **Git Submodules**: For project separation

### CI/CD
- **GitHub Actions**: Automated builds and deployment
- **Deployment Target**: GitHub Pages (via `actions/deploy-pages`)
- **Build Strategy**: Parallel matrix builds (4 Vite projects build simultaneously)
- **Build Caching**: npm cache per project via `cache-dependency-path`
- **Auto-update**: `repository_dispatch` from each submodule repo triggers `auto-update-submodules.yml`

### Development Tools (Optional)
- **MCP Portfolio Server**: Model Context Protocol server for local portfolio optimization
  - Location: `mcp-portfolio-server/`
  - Provides tools for file operations, HTML/CSS analysis, and project structure inspection
  - Used with Claude Desktop or other MCP-compatible tools
  - Not required for basic portfolio development

## Important Rules & Best Practices

### ⚠️ Critical Rules
1. **NEVER modify submodule contents directly in this repo** — Always edit in the original repository, push there, then update the submodule ref here
2. **ALWAYS test locally** before pushing to main branch
3. **ALWAYS check GitHub Actions** status after pushing
4. **NEVER commit secrets** or API keys — Use GitHub Secrets
5. **ALWAYS use conventional commit messages** (feat/fix/docs/etc.)
6. **Every submodule MUST have** `update-portfolio.yml` in `.github/workflows/` and `PORTFOLIO_UPDATE_TOKEN` secret
7. **Every Vite submodule MUST set `base: '/<project-name>/'`** in its `vite.config.ts` — NEVER pass `--base` from deploy.yml
8. **NEVER use `2>/dev/null || true`** in deploy.yml copy steps — use explicit existence checks that fail fast

### 💡 Best Practices
- **Start with understanding**: Read relevant docs before making changes
- **Make minimal changes**: Only change what's necessary to fix the issue
- **Test incrementally**: Test after each logical change
- **Document significant changes**: Update README or relevant docs
- **Verify links work**: Test all modified links and paths
- **Check responsive design**: Test on multiple screen sizes
- **Validate HTML/CSS**: Ensure no syntax errors
- **Handle errors gracefully**: Add appropriate error handling to JavaScript

### 🚫 Common Pitfalls to Avoid
- Editing files inside submodule directories (AgeOfMax/, FireCastle/, AuTuneOnline/, CasinoIdleSlots/, TestoMax/, BetterBestie/, dl4j-graph-explorer/, Acai-Agents/)
- Using absolute URLs instead of relative paths
- Forgetting to initialize submodules after cloning
- Not checking browser console for errors
- Pushing without testing locally first
- Adding large files without optimizing them
- Breaking existing functionality while adding new features
- Modifying workflow files without understanding the full pipeline
- Forgetting to add `update-portfolio.yml` and `PORTFOLIO_UPDATE_TOKEN` when adding a new submodule
- Putting `--base` CLI flags in deploy.yml instead of in the project's `vite.config.ts`
- Suppressing errors with `2>/dev/null || true` in deploy scripts

## Development Workflow

### Working with the Portfolio Site
For changes to the main portfolio (HTML, CSS, JS):
```bash
# Edit files directly in the root
git add .
git commit -m "Update portfolio design"
git push
# GitHub Actions automatically deploys
```

### Working with Project Submodules
Projects should be modified in their **original repositories**, not in the submodules:

1. **Make changes in the original repo** (e.g., MaxeLBerger/AgeOfMax)
2. **Push to the original repo**
3. **Update submodule reference in portfolio** (automatic via repository_dispatch or manual):
   ```bash
   cd AgeOfMax/
   git pull origin main
   cd ..
   git add AgeOfMax/
   git commit -m "Update AgeOfMax to latest version"
   git push
   ```

### Initializing Submodules
If submodule directories are empty after cloning:
```bash
git submodule update --init --recursive
```

### Updating All Submodules
```bash
git submodule update --remote --merge
git add .
git commit -m "Update all submodules to latest versions"
git push
```

## Build & Deployment Process

The deployment uses a **two-phase pipeline** in `.github/workflows/deploy.yml`:

### Phase 1: Parallel Matrix Builds
All 4 Vite/TypeScript projects build **simultaneously** in separate runners:

| Project | Build command | Output path | Notes |
|---------|-------------|-------------|-------|
| AgeOfMax | `npm run build` | `dist/` | Phaser 3 game |
| CasinoIdleSlots | `npm run build` | `dist/` | Needs Supabase secrets (fallback: demo mode) |
| BetterBestie | `npm run build` | `dist/client/` | Full-stack, only client is deployed |
| dl4j-graph-explorer | `npm run build` | `dist/` | React + D3 visualization |
| Acai-Agents | `npm run build` | `dist/` | PostCSS + Terser custom build |

Each build:
- Runs `npm ci` (falls back to `npm install`)
- Executes the project's own `npm run build`
- Verifies `dist/` exists and contains `index.html`
- Uploads build artifact for the deploy phase

### Phase 2: Assembly & Deploy
- Downloads all 4 build artifacts
- Copies 3 static projects (FireCastle, AuTuneOnline, TestoMax) with explicit file checks
- Copies portfolio assets (HTML, CSS, JS, images, legal pages)
- Generates a **build size report** in the GitHub Actions Step Summary
- Deploys to GitHub Pages

**Deployment Trigger**: Push to `main` branch or manual workflow dispatch

**Deployment Time**: ~3-5 minutes (parallel builds cut ~60% vs sequential)

### Pipeline Flow
```
Push to main
    ↓
┌─── Phase 1: Parallel Builds ───────┐
│ AgeOfMax    → build → artifact     │
│ CasinoIdleSlots → build → artifact │
│ BetterBestie → build → artifact    │
│ dl4j-graph-explorer → build → art. │
└────────────────────────────────────┘
    ↓
Phase 2: Assemble dist/
    ↓
├─ Download build artifacts
├─ Copy static projects (FireCastle, AuTuneOnline, TestoMax)
├─ Copy portfolio assets
├─ Build size report
    ↓
Deploy to GitHub Pages
    ↓
Live at maximilianhaak.de
```

### Submodule Auto-Update Flow
When a project repo pushes to `main`:
```
Project repo push → update-portfolio.yml fires
    ↓
repository_dispatch → portfolio's auto-update-submodules.yml
    ↓
Updates submodule ref → pushes to portfolio main
    ↓
deploy.yml triggers → site rebuilt & deployed
```

**Requirements for each submodule:**
- `.github/workflows/update-portfolio.yml` using `peter-evans/repository-dispatch@v2`
- `PORTFOLIO_UPDATE_TOKEN` repository secret (GitHub PAT with `repo` + `workflow` scopes)
- For Vite projects: `base: '/<project-name>/'` in `vite.config.ts`

### Build Requirements
- Each Vite project must have:
  - `package.json` with `build` script
  - `vite.config.ts` with `base: '/<project-name>/'`
  - Source files that compile without errors
  - `dist/` output directory after build (or `dist/client/` for BetterBestie)

**Deployment Checklist:**
- [ ] All submodules are at correct commits
- [ ] TypeScript projects build successfully locally
- [ ] No build errors in GitHub Actions logs
- [ ] Build size report looks reasonable
- [ ] Deployment step completes successfully
- [ ] Site is accessible at maximilianhaak.de
- [ ] All project pages load correctly

## Testing

### Testing Requirements
**ALWAYS test your changes before committing:**
- Test locally first with `python -m http.server 8000` or `npx serve .`
- Run existing test scripts if your changes affect tested components
- Verify in browser: check console for errors, test on mobile viewport
- For submodule changes: Build the project and verify it works

### Automated Testing
- **GitHub Actions**: `.github/workflows/test-projects.yml`
- Tests run on every push and daily
- Validates project availability, build success, and structure
- **IMPORTANT**: Check workflow status after pushing changes

### Manual Testing Scripts
```bash
# Test all deployed projects
chmod +x test-projects.sh
./test-projects.sh

# Test FireCastle API specifically
chmod +x test-firecastle-api.sh
./test-firecastle-api.sh
```

### Local Testing
```bash
# Serve the site locally
python -m http.server 8000
# or
npx serve .
# Visit: http://localhost:8000
```

### Testing Checklist
Before considering a task complete:
- [ ] Changes work locally
- [ ] No console errors in browser
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] All links work correctly
- [ ] No broken images or assets
- [ ] Build succeeds (for submodule changes)
- [ ] GitHub Actions workflows pass

## Key Documentation Files

**Essential Reading** (in recommended order):
1. **[START_HERE.md](../START_HERE.md)** - Overview and workflow updates
2. **[AUTOMATION_OVERVIEW.md](../AUTOMATION_OVERVIEW.md)** - System overview
3. **[README.md](../README.md)** - Main documentation
4. **[CONTRIBUTING.md](../CONTRIBUTING.md)** - Contribution guidelines

**Setup & Configuration:**
- **[COMPLETE_SETUP_GUIDE.md](../COMPLETE_SETUP_GUIDE.md)** - Step-by-step setup
- **[PROJECT_TEMPLATES.md](../PROJECT_TEMPLATES.md)** - Code templates
- **[PROJECT_REPOS_SETUP.md](../PROJECT_REPOS_SETUP.md)** - Technical details

**Testing & Architecture:**
- **[TESTING.md](../TESTING.md)** - Testing documentation
- **[TESTING_ARCHITECTURE.md](../TESTING_ARCHITECTURE.md)** - Testing architecture
- **[SYSTEM_ARCHITECTURE.md](../SYSTEM_ARCHITECTURE.md)** - System architecture

**Quick Reference:**
- **[QUICK_REFERENCE.md](../QUICK_REFERENCE.md)** - Commands and checklists
- **[WORKFLOW_GUIDE.md](../WORKFLOW_GUIDE.md)** - Workflow instructions
- **[DOCUMENTATION_INDEX.md](../DOCUMENTATION_INDEX.md)** - Documentation index

## Coding Guidelines

### General Principles
- **Keep it simple**: This is a static portfolio site - avoid over-engineering
- **Responsive first**: All changes must work on mobile, tablet, and desktop
- **Performance**: Optimize images, minimize JavaScript, use lazy loading
- **Accessibility**: Use semantic HTML, ARIA labels, and keyboard navigation

### HTML Guidelines
- Use semantic HTML5 elements (`<nav>`, `<section>`, `<article>`, `<main>`)
- Include proper meta tags for SEO
- Use descriptive `id` and `class` names (kebab-case)
- Maintain WCAG 2.1 AA accessibility standards

### CSS Guidelines
- Use custom properties (CSS variables) for colors and spacing
- Follow mobile-first responsive design
- Use CSS Grid and Flexbox for layouts
- Maintain consistent spacing and typography
- Keep selectors specific but not overly complex

### JavaScript Guidelines
- Use vanilla JavaScript (no frameworks for the portfolio site)
- Write ES6+ syntax (const/let, arrow functions, template literals)
- Use event delegation for better performance
- Add comments for complex logic
- Handle errors gracefully
- Use `async/await` for asynchronous operations

### Git Commit Messages
- Use conventional commit format: `type(scope): message`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Examples:
  - `feat(portfolio): add new project showcase`
  - `fix(navigation): resolve mobile menu toggle issue`
  - `docs(readme): update deployment instructions`

## File Modification Guidelines

### ⚠️ Files That Should NOT Be Modified Directly
- **Submodule contents** (AgeOfMax/, FireCastle/, AuTuneOnline/, CasinoIdleSlots/, TestoMax/, BetterBestie/, dl4j-graph-explorer/)
  - These should be modified in their original repositories
  - Only update the submodule reference commit in this repo

### ✅ Files That Can Be Modified
- **Portfolio files**: index.html, style.css, script.js
- **Legal pages**: impressum.html, datenschutz.html
- **Project pages**: projects/*.html
- **Documentation**: All *.md files (except in .github/agents/)
- **Workflows**: .github/workflows/*.yml (with caution)
- **Static assets**: res/* (images, icons, etc.)

### 🔒 Files to Modify with Caution
- **.github/workflows/deploy.yml**: Core deployment pipeline
- **.github/workflows/auto-update-submodules.yml**: Automatic submodule updates
- **CNAME**: Domain configuration
- **.gitignore**: Version control exclusions
- **.gitmodules**: Submodule configuration

## Common Tasks

### Adding a New Submodule Project
1. Create the project in a separate repository
2. Add it as a submodule: `git submodule add <repo-url> <directory>`
3. **In the project repo:**
   a. If Vite project: add `base: '/<directory>/'` to `vite.config.ts`
   b. Create `.github/workflows/update-portfolio.yml`:
      ```yaml
      name: Update Portfolio on Push
      on:
        push:
          branches: [ main ]
      jobs:
        trigger-portfolio-update:
          runs-on: ubuntu-latest
          steps:
            - name: Trigger Portfolio Submodule Update
              uses: peter-evans/repository-dispatch@v2
              with:
                token: ${{ secrets.PORTFOLIO_UPDATE_TOKEN }}
                repository: MaxeLBerger/MaxeLBerger.github.io
                event-type: update-submodule
                client-payload: '{"submodule": "<DIRECTORY_NAME>"}'
      ```
   c. Set `PORTFOLIO_UPDATE_TOKEN` secret: `gh secret set PORTFOLIO_UPDATE_TOKEN --repo MaxeLBerger/<repo>`
4. **In the portfolio repo:**
   a. Update `.github/workflows/deploy.yml`:
      - For Vite projects: add entry to `build-projects` matrix
      - For static projects: add copy block in the `Assemble distribution` step
   b. Update `.github/workflows/auto-update-submodules.yml`: add to the `options` list
   c. Update `.github/workflows/test-projects.yml`: add structure checks
5. Add project card to `index.html` in the projects section
6. Create a project page in `projects/` directory
7. Update this instructions file with the new submodule entry

### Updating Portfolio Design
1. Edit `style.css` for styling changes
2. Edit `index.html` for structure changes
3. Edit `script.js` for functionality changes
4. Test locally with `python -m http.server 8000`
5. Commit and push to `main` branch
6. Verify deployment in GitHub Actions

### Fixing Broken Links or Images
1. Check the file paths (relative vs absolute)
2. Verify files exist in `res/` or appropriate directory
3. Test locally before pushing
4. Remember: deployed path includes repository name

### Troubleshooting Deployment Issues
1. Check GitHub Actions tab: https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions
2. Review workflow logs for specific errors
3. Look for failed steps in the workflow
4. Check artifact uploads and deployment status
5. Common issues:
   - Submodule not initialized properly → Check `.gitmodules` and submodule paths
   - Build script failures in TypeScript projects → Check `package.json` scripts
   - Missing dependencies (npm install issues) → Verify `package-lock.json` exists
   - File path errors in copy commands → Check paths are relative to repo root
   - Deploy step fails → Check `gh-pages` branch and permissions

**Debugging Workflow Failures:**
```bash
# Clone and check submodules locally
git submodule status
git submodule update --init --recursive

# Try building a project locally
cd AgeOfMax
npm install
npm run build

# Check if dist/ directory is created
ls -la dist/
```

## Security & Privacy

### Security Requirements
- **NEVER commit API keys, tokens, or secrets** - Use GitHub Secrets instead
- **Check dependencies for vulnerabilities** before adding new packages:
  ```bash
  npm audit
  # Fix issues with:
  npm audit fix
  ```
- **Validate user input** in any JavaScript that handles form data
- **Use HTTPS** for all external resources (images, scripts, fonts)
- **Review permissions** when adding GitHub Actions workflows

### Privacy Compliance
- **Cookie consent**: Implemented in script.js for GDPR compliance
- **Privacy policy**: Available at datenschutz.html
- **Legal information**: Available at impressum.html
- **No tracking** without explicit user consent
- **Data minimization**: Only collect necessary information

### Security Checklist
Before adding dependencies or external resources:
- [ ] Check npm audit results
- [ ] Verify package is from trusted source
- [ ] Check for known vulnerabilities
- [ ] Ensure HTTPS URLs for all external resources
- [ ] Review permissions in package.json scripts

## Performance Optimization

- **Images**: Optimize before adding (WebP format preferred)
- **JavaScript**: Minify if adding large scripts
- **CSS**: Use critical CSS inline, defer non-critical styles
- **Fonts**: Subset Google Fonts to only needed characters
- **Lazy loading**: Implement for images and iframes

## Browser Compatibility

Target browsers:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 13+)
- Chrome Mobile (Android 8+)

## Accessibility Requirements

- **Keyboard navigation**: All interactive elements must be keyboard accessible
- **Screen readers**: Use ARIA labels and semantic HTML
- **Color contrast**: Minimum WCAG AA contrast ratios
- **Focus indicators**: Visible focus states for all interactive elements
- **Alt text**: Descriptive alt text for all images

## Tool Usage Guidelines

### File Operations
- **Use `view` first** to understand file structure before editing
- **Use `edit` for precise changes** - provide enough context in `old_str`
- **Use `create` for new files** - never create if file exists
- **Check before modifying** - view the file to understand its current state

### Bash Commands
- **Test locally** before making changes to workflows or build scripts
- **Use appropriate wait times** for long-running commands (builds, npm install)
- **Chain commands** when they depend on each other: `cd dir && npm install && npm run build`
- **Always check exit codes** and handle errors appropriately

### Git Operations
- **Don't commit** `.env` files, `node_modules/`, build artifacts
- **Use `.gitignore`** to exclude generated files
- **Check git status** before and after changes
- **Verify submodule state** with `git submodule status`

### Examples of Good Practices
```bash
# Good: Check before building
cd AgeOfMax && npm install && npm run build && ls -la dist/

# Good: Test locally before pushing
python -m http.server 8000 &
curl -I http://localhost:8000/index.html
pkill -f "python -m http.server"

# Good: Validate changes
git diff
git status
```

## Custom Copilot Agents

This repository has a custom agent:
- **portfolio-fix.agent.md**: Specialist for analyzing and fixing loading errors, bugs, and UX issues

Use the custom agent for:
- Debugging project loading issues
- Fixing embedded demo problems
- Resolving UX/UI issues
- Performance troubleshooting

**When to delegate to portfolio-fix agent:**
- Any issues with page loading or navigation
- Broken links or 404 errors
- JavaScript console errors
- CSS layout issues
- Asset loading problems

**How to use the agent:**
Provide clear context about the issue, what you've tried, and what the expected behavior is.

## Additional Notes

### Language
- Portfolio content is in German (German target audience)
- Code comments and documentation can be in English or German
- Git commit messages should be in English

### Deployment Domain
- Primary: https://maximilianhaak.de
- GitHub Pages: https://maxelberger.github.io

### Important Links
- Repository: https://github.com/MaxeLBerger/MaxeLBerger.github.io
- GitHub Actions: https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions
- Live Website: https://maximilianhaak.de

## Pre-Commit Checklist

Before committing any changes, verify:

### Code Quality
- [ ] Code follows style guidelines (HTML semantic, CSS organized, JS ES6+)
- [ ] No console.log() statements left in production code
- [ ] All functions have appropriate error handling
- [ ] Code is well-commented where necessary
- [ ] Variable and function names are descriptive

### Functionality
- [ ] Changes work as expected locally
- [ ] No errors in browser console
- [ ] All existing functionality still works
- [ ] New features are tested manually
- [ ] Links and navigation work correctly

### Assets & Resources
- [ ] Images are optimized (compressed, appropriate format)
- [ ] No broken links or missing assets
- [ ] All paths are correct (relative vs absolute)
- [ ] External resources use HTTPS

### Git & Deployment
- [ ] Changes are committed to correct files only
- [ ] Commit message follows conventional format
- [ ] No secrets or sensitive data committed
- [ ] `.gitignore` properly excludes build artifacts
- [ ] Submodules are in correct state (if modified)

### Documentation
- [ ] README updated if functionality changes
- [ ] Comments added for complex logic
- [ ] Relevant docs updated (if architectural changes)

## Getting Help

1. **Check documentation first**: See DOCUMENTATION_INDEX.md for all docs
2. **Review existing issues**: https://github.com/MaxeLBerger/MaxeLBerger.github.io/issues
3. **Check workflow logs**: For deployment/build issues
4. **Open a new issue**: For new problems or questions
5. **Use portfolio-fix agent**: For loading/UX issues

### Quick Documentation Links
- **New to this repo?** Start with [START_HERE.md](../START_HERE.md)
- **Need to add a project?** See [Common Tasks](#common-tasks) section above
- **Workflow failing?** Check [Troubleshooting](#troubleshooting-deployment-issues)
- **Want to contribute?** Read [CONTRIBUTING.md](../CONTRIBUTING.md)

## Submodule CI/CD Architecture Rules

These rules are **mandatory** for all current and future submodules:

### Every submodule MUST have:
1. **`.github/workflows/update-portfolio.yml`** — triggers `repository_dispatch` to this portfolio repo on push to `main`
2. **`PORTFOLIO_UPDATE_TOKEN` GitHub secret** — PAT with `repo` + `workflow` scopes, set via `gh secret set`

### Every Vite/TypeScript submodule MUST have:
3. **`base: '/<directory-name>/'`** in `vite.config.ts` — so the build output uses correct asset paths for deployment under the subpath
4. **`npm run build`** that produces a `dist/` (or `dist/client/` for full-stack) directory with `index.html`

### deploy.yml rules:
5. **Parallel matrix builds** — all Vite projects build simultaneously via `strategy.matrix`
6. **No `--base` CLI overrides** — base paths belong in `vite.config.ts`
7. **No error suppression** — never use `2>/dev/null || true`; use explicit `[ -f ... ] || { echo "❌ ..."; exit 1; }`
8. **Build verification** — every build step must verify `dist/index.html` exists before uploading artifacts
9. **Build size report** — the deploy job writes a size table to `$GITHUB_STEP_SUMMARY`

### Current submodule inventory (2026-04):

| Submodule | Repo | Type | dispatch | base | Secret |
|-----------|------|------|----------|------|--------|
| AgeOfMax | MaxeLBerger/AgeOfMax | Vite build | ✅ | ✅ | ✅ |
| CasinoIdleSlots | MaxeLBerger/casino-idle-slots | Vite build | ✅ | ✅ | ✅ |
| BetterBestie | MaxeLBerger/BetterBestie | Vite build | ✅ | ✅ | ✅ |
| dl4j-graph-explorer | MaxeLBerger/dl4j-graph-explorer | Vite build | ✅ | ✅ | ✅ |
| Acai-Agents | MaxeLBerger/Acai-Agents | Custom build | ✅ | N/A | ⚠️ |
| FireCastle | MaxeLBerger/FireCastle | Static | ✅ | N/A | ✅ |
| AuTuneOnline | MaxeLBerger/AuTuneOnline | Static | ✅ | N/A | ✅ |
| TestoMax | MaxeLBerger/TestoMax | Static | ✅ | N/A | ✅ |

### External projects (not submodules — showcased via detail pages in `projects/`):

| Project | Repo | Visibility | Hosting | Category |
|---------|------|------------|---------|----------|
| AI Captain | MaxeLBerger/AIAICaptain | Private | VS Code Marketplace | AI Agents |
| AI Chatbot | — | In development | — | AI Agents |
| E46 Studio | MaxeLBerger/E46_Coder | Private | — | Websites |
| Imkerei Feuerstein | MaxeLBerger/imkerei-feuerstein-frontend | Private | Vercel | Websites |
| Shookroko | MaxeLBerger/shookroko | Private | — | Games |

These projects do NOT require CI/CD build steps, submodule configuration, or `update-portfolio.yml`. Their detail pages are static HTML files deployed with the portfolio assets.

---

**Last Updated**: 2026-04-11
**Maintained by**: Maximilian Haak (@MaxeLBerger)
