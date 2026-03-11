# Contributing Guide

## Submodule Workflow

This portfolio uses **7 Git Submodules** to reference independent project repositories, plus **6 External Projects** linked via detail pages.

### Initial Setup (First-time clone)

```powershell
# Clone with submodules
git clone --recurse-submodules https://github.com/MaxeLBerger/MaxeLBerger.github.io

# Or if already cloned without submodules
git submodule update --init --recursive
```

### Updating Projects

When you update code in a submodule project repo:

1. **Work in the original repository**:
   ```bash
   cd AgeOfMax  # or any submodule directory
   # Make changes, commit, push to original repo
   git add .
   git commit -m "feat: your changes"
   git push
   ```

2. **Automatic update** (if `update-portfolio.yml` is set up):
   The push triggers `repository_dispatch` → portfolio auto-updates the submodule ref → rebuilds and deploys.

3. **Manual update** (if needed):
   ```bash
   cd ..  # Back to portfolio root
   git submodule update --remote AgeOfMax
   git add AgeOfMax/
   git commit -m "chore: update AgeOfMax to latest"
   git push
   ```

### Updating ALL Submodules

```powershell
git submodule update --remote --merge
git add .
git commit -m "chore: update all submodules"
git push
```

## CI/CD Pipeline

### Automated Build Process

The deployment pipeline (`.github/workflows/deploy.yml`) uses a **two-phase approach**:

**Phase 1 — Parallel Matrix Builds:**
4 Vite/TypeScript projects build simultaneously in separate runners:
- AgeOfMax (Phaser 3 game)
- CasinoIdleSlots (React idle game)
- BetterBestie (React + Express app)
- dl4j-graph-explorer (React + D3 visualizer)

**Phase 2 — Assembly & Deploy:**
- Downloads all 4 build artifacts
- Copies 3 static projects (FireCastle, AuTuneOnline, TestoMax)
- Copies portfolio assets (HTML, CSS, JS, images, project detail pages)
- Generates build size report
- Deploys to GitHub Pages

### Submodule Auto-Update Flow

```
Project repo push → update-portfolio.yml fires
    ↓
repository_dispatch → auto-update-submodules.yml
    ↓
Updates submodule ref → pushes to main
    ↓
deploy.yml triggers → site rebuilt & deployed
```

### External Projects

6 projects are **not submodules** — they are showcased via detail pages in `projects/`:
- AI Captain, Acai Agents, AI Chatbot, E46 Studio, Imkerei Feuerstein, Shookroko
- No build step required — detail pages are static HTML deployed with portfolio assets

## Repository Structure

```
MaxeLBerger.github.io/
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml                  # Main deployment (parallel matrix builds)
│   │   ├── auto-update-submodules.yml  # Auto-update via repository_dispatch
│   │   └── test-projects.yml           # PR sanity checks
│   └── agents/
│       └── portfolio-fix.agent.md      # Custom Copilot agent
├── AgeOfMax/              # Submodule: TypeScript tower defense game
├── AuTuneOnline/          # Submodule: Audio visualizer
├── BetterBestie/          # Submodule: Full-stack challenge app
├── CasinoIdleSlots/       # Submodule: Idle casino game
├── dl4j-graph-explorer/   # Submodule: DL4J neural network visualizer
├── FireCastle/            # Submodule: Clash of Clans website
├── TestoMax/              # Submodule: Web project
├── projects/              # Detail pages for ALL projects (14 pages)
│   ├── aicaptain.html
│   ├── acai-agents.html
│   ├── e46-studio.html
│   ├── imkerei-feuerstein.html
│   ├── shookroko.html
│   ├── age-of-max.html
│   ├── firecastle.html
│   ├── autune-online.html
│   ├── casino-idle-slots.html
│   ├── betterbestie.html
│   ├── dl4j-graph-explorer.html
│   ├── testomax.html
│   ├── albert.html
│   └── soundoflvke.html
├── res/                   # Static resources (images, icons)
├── index.html             # Portfolio homepage
├── style.css              # Main stylesheet
├── script.js              # Main JavaScript
├── impressum.html         # Legal information
└── datenschutz.html       # Privacy policy
```

## Development Workflow

### Making Changes to Portfolio Site

For changes to the main portfolio (HTML, CSS, JS):

```bash
git add .
git commit -m "feat(portfolio): update design"
git push
# → Automatically deployed in 2-3 minutes
```

### Making Changes to Submodule Projects

**Always edit in the original repository**, not in the submodule directory:

1. Navigate to the original repo
2. Make changes, commit, push
3. Auto-update triggers (or manually update submodule ref)

### Adding External Project Detail Pages

For projects that are NOT submodules:

1. Create a new HTML page in `projects/` following existing templates
2. Add a project card to `index.html` in the appropriate category carousel
3. Add assets to `res/projects/`
4. Update `test-projects.yml` page check list

## Troubleshooting

### Submodule Not Showing Latest Commit

```bash
cd ProjectName/
git pull origin main
cd ..
git add ProjectName/
git commit -m "chore: update ProjectName submodule"
git push
```

### Build Fails on GitHub Actions

1. Check Actions tab: https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions
2. Click the failed workflow to see logs
3. Common issues:
   - Missing `package-lock.json` → run `npm install` locally first
   - Build script error → check `package.json` scripts
   - Missing `dist/index.html` → verify Vite config and build output

### Detached HEAD in Submodule

```bash
cd ProjectName/
git checkout main
# Make changes, commit, push
cd ..
git add ProjectName/
git commit -m "chore: update ProjectName"
git push
```

## Best Practices

1. **Never edit submodule contents directly** — always work in the original repo
2. **Use conventional commits** — `feat`, `fix`, `docs`, `chore`, etc.
3. **Test locally first** — `python -m http.server 8000` or `npx serve .`
4. **Monitor CI/CD** — check GitHub Actions after every push
5. **Keep docs up to date** — update README/CONTRIBUTING when adding projects

## Resources

- [Git Submodules Documentation](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

**Questions?** Open an issue or contact the maintainer.
