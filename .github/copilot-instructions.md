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
│   │   ├── deploy.yml      # Main deployment workflow
│   │   ├── auto-update-submodules.yml
│   │   └── test-projects.yml
│   └── agents/             # Custom Copilot agents
│       └── portfolio-fix.agent.md
├── AgeOfMax/              # Git Submodule - TypeScript tower defense game
├── FireCastle/            # Git Submodule - Clash of Clans website
├── AuTuneOnline/          # Git Submodule - Audio visualizer
├── CasinoIdleSlots/       # Git Submodule - Idle game
├── projects/              # Project landing pages
├── res/                   # Static resources (images, icons)
├── index.html             # Portfolio homepage
├── style.css              # Main stylesheet
├── script.js              # Main JavaScript
├── impressum.html         # Legal information
├── datenschutz.html       # Privacy policy
└── *.md                   # Extensive documentation
```

### Git Submodules
The repository uses Git Submodules to reference independent project repositories:
- **AgeOfMax**: TypeScript, Phaser 3, Vite - Tower defense game
- **FireCastle**: JavaScript, Node.js, Express - Clan management website
- **AuTuneOnline**: JavaScript, Web Audio API - Audio visualizer
- **CasinoIdleSlots**: TypeScript, Vite - Idle slot game

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
- **Vite**: For TypeScript project builds (AgeOfMax, CasinoIdleSlots)
- **TypeScript**: For type-safe game development
- **Git Submodules**: For project separation

### CI/CD
- **GitHub Actions**: Automated builds and deployment
- **Deployment Target**: GitHub Pages (`gh-pages` branch)
- **Build Caching**: npm cache for faster builds

## Important Rules & Best Practices

### ⚠️ Critical Rules
1. **NEVER modify submodule contents directly** - Always edit in the original repository
2. **ALWAYS test locally** before pushing to main branch
3. **ALWAYS check GitHub Actions** status after pushing
4. **NEVER commit secrets** or API keys
5. **ALWAYS use conventional commit messages** (feat/fix/docs/etc.)

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
- Editing files inside submodule directories (AgeOfMax/, FireCastle/, etc.)
- Using absolute URLs instead of relative paths
- Forgetting to initialize submodules after cloning
- Not checking browser console for errors
- Pushing without testing locally first
- Adding large files without optimizing them
- Breaking existing functionality while adding new features
- Modifying workflow files without understanding the full pipeline

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

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:

1. ✅ Checks out repository with all submodules
2. ✅ Sets up Node.js 20.x
3. ✅ Builds **AgeOfMax** (TypeScript → JavaScript via Vite)
4. ✅ Builds **CasinoIdleSlots** (TypeScript → JavaScript via Vite)
5. ✅ Copies static files for **FireCastle**
6. ✅ Copies static files for **AuTuneOnline**
7. ✅ Copies portfolio assets (HTML, CSS, JS, images)
8. ✅ Deploys to GitHub Pages
9. ✅ Makes it live at https://maximilianhaak.de

**Deployment Trigger**: Push to `main` branch or manual workflow dispatch

**Deployment Time**: ~3-5 minutes from push to live

### Understanding the Deployment Pipeline

**What happens on each push:**
```
Push to main
    ↓
GitHub Actions triggered
    ↓
Checkout repo + submodules
    ↓
Install Node.js & dependencies
    ↓
Build TypeScript projects (AgeOfMax, CasinoIdleSlots)
    ↓
Copy all project files to dist/
    ↓
Deploy dist/ to gh-pages branch
    ↓
GitHub Pages serves updated site
    ↓
Live at maximilianhaak.de
```

**Build Requirements:**
- Each TypeScript project must have:
  - `package.json` with build script
  - `vite.config.js` or equivalent config
  - Source files that compile without errors
  - `dist/` output directory after build

**Deployment Checklist:**
- [ ] All submodules are at correct commits
- [ ] TypeScript projects build successfully locally
- [ ] No build errors in GitHub Actions logs
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
- **Submodule contents** (AgeOfMax/, FireCastle/, AuTuneOnline/, CasinoIdleSlots/)
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

### Adding a New Project
1. Create the project in a separate repository
2. Add it as a submodule: `git submodule add <repo-url> <directory>`
3. Update `.github/workflows/deploy.yml` to build/copy the new project
4. Add project card to `index.html` in the projects section
5. Create a project page in `projects/` directory
6. Update README.md with project information

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

---

**Last Updated**: 2025-11-20
**Maintained by**: Maximilian Haak (@MaxeLBerger)
