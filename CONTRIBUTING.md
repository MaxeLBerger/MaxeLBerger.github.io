# Contributing Guide

##  Submodule Workflow

This portfolio uses Git Submodules to reference independent project repositories. Here's how to work with them:

### Initial Setup (First-time clone)

```powershell
# Clone with submodules
git clone --recurse-submodules https://github.com/MaxeLBerger/MaxeLBerger.github.io

# Or if already cloned without submodules
git submodule update --init --recursive
```

### Updating Projects

When you update code in original project repos (AgeOfMax, FireCastle, AuTuneOnline):

1. **Work in the original repository**:
   ```bash
   cd AgeOfMax  # or FireCastle / AuTuneOnline
   # Make changes, commit, push to original repo
   git add .
   git commit -m "Your changes"
   git push
   ```

2. **Update submodule reference in portfolio**:
   ```bash
   cd ..  # Back to portfolio root
   git add AgeOfMax/  # or whichever submodule you updated
   git commit -m "Update AgeOfMax to latest version"
   git push
   ```

3. **GitHub Actions automatically rebuilds!** 

### Updating ALL Submodules to Latest

To update all submodules to their latest commits:

```powershell
git submodule update --remote --merge
git add .
git commit -m "Update all submodules to latest versions"
git push
```

##  CI/CD Pipeline

### Automated Build Process

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:

1.  Checks out repository with all submodules
2.  Sets up Node.js 20
3.  Builds AgeOfMax (TypeScript  JavaScript)
4.  Copies static projects (FireCastle, AuTuneOnline)
5.  Deploys everything to `gh-pages` branch
6.  Makes it available at https://maximilianhaak.de

### Trigger Conditions

Builds automatically run when you push to `main` branch.

##  Repository Structure

```
MaxeLBerger.github.io/
 .github/
    workflows/
        deploy.yml       # CI/CD automation
 .gitmodules              # Submodule configuration
 AgeOfMax/                # Submodule: TypeScript tower defense game
 FireCastle/              # Submodule: Clash of Clans website
 AuTuneOnline/            # Submodule: Audio visualizer
 projects/                # Portfolio HTML pages linking to projects
 index.html               # Main portfolio page
 style.css                # Portfolio styling
 README.md                # Project documentation
```

##  Development Workflow

### Making Changes to Portfolio Site

For changes to the main portfolio site (HTML, CSS, JS):

```bash
# Edit files directly
# No submodule update needed
git add .
git commit -m "Update portfolio design"
git push
```

### Making Changes to Projects

For changes to individual projects:

1. Navigate to original repo
2. Make changes there
3. Push to original repo
4. Update submodule reference in portfolio (see above)

##  Troubleshooting

### Submodule Not Showing Latest Commit

```bash
cd ProjectName/
git pull origin main
cd ..
git add ProjectName/
git commit -m "Update ProjectName submodule"
git push
```

### Detached HEAD State

Submodules don't checkout a branch by default. To work on a branch:

```bash
cd ProjectName/
git checkout main
# Make changes
git commit -am "Your changes"
git push origin main
cd ..
git add ProjectName/
git commit -m "Update ProjectName"
git push
```

### Build Fails on GitHub Actions

1. Check Actions tab: https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions
2. Click failed workflow to see logs
3. Common issues:
   - Node.js dependencies not installed correctly
   - Build script fails (check `package.json` in submodule)
   - Missing files or incorrect paths

##  Resources

- [Git Submodules Documentation](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

##  Best Practices

1. **Separate Concerns**: Keep project code in original repos, portfolio structure in this repo
2. **Regular Updates**: Update submodule references after significant changes to projects
3. **Test Locally**: Run builds locally before pushing (see project README files)
4. **Document Changes**: Use clear commit messages for both project and submodule updates
5. **Monitor CI/CD**: Check GitHub Actions after pushing to ensure builds succeed

---

**Questions?** Open an issue or contact the maintainer.
