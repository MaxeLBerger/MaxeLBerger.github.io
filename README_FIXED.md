# Portfolio - Maximilian Haak

[![Deploy Status](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/deploy.yml)
[![Test Projects](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/test-projects.yml/badge.svg)](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/test-projects.yml)

🌐 **Live:** [maximilianhaak.de](https://maximilianhaak.de)

Professional portfolio website showcasing software development projects with automated CI/CD deployment.

**🎉 NEW: Workflow system updated!** → [START_HERE.md](START_HERE.md)

**🚀 Quick Links:**
- [START_HERE.md](START_HERE.md) - Overview of recent changes and next steps
- [AUTOMATION_OVERVIEW.md](AUTOMATION_OVERVIEW.md) - System overview and how it works
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick commands and checklists
- [COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md) - Step-by-step setup for project automation
- [TESTING.md](TESTING.md) - Testing documentation and API validation

## 🏗️ Architecture

This repository uses **Git Submodules** for clean project separation and **GitHub Actions** for automated builds.

> **⚠️ Important:** If you cloned this repository and the project directories (`AgeOfMax/`, `FireCastle/`, `AuTuneOnline/`, `CasinoIdleSlots/`) are empty, you need to initialize the submodules:
> ```bash
> git submodule update --init --recursive
> ```

```
MaxeLBerger.github.io/
├── .github/workflows/
│   └── deploy.yml          # Automated CI/CD pipeline
├── AgeOfMax/              # Git Submodule → MaxeLBerger/AgeOfMax
├── FireCastle/            # Git Submodule → MaxeLBerger/FireCastle
├── AuTuneOnline/          # Git Submodule → MaxeLBerger/AuTuneOnline
├── CasinoIdleSlots/       # Git Submodule → MaxeLBerger/casino-idle-slots
├── projects/              # Project landing pages
├── res/                   # Static resources
├── index.html             # Portfolio homepage
├── style.css
└── script.js
```

## 📂 Projects

### 🎮 [AgeOfMax](https://github.com/MaxeLBerger/AgeOfMax)
Strategic tower defense game with 5 historical epochs  
**Tech:** TypeScript, Phaser 3, Vite  
**Live:** [maximilianhaak.de/AgeOfMax](https://maximilianhaak.de/AgeOfMax)

### 🏰 [FireCastle](https://github.com/MaxeLBerger/FireCastle)
Clash of Clans clan management website  
**Tech:** JavaScript, Node.js, Express  
**Live:** [maximilianhaak.de/FireCastle](https://maximilianhaak.de/FireCastle)

### 🎵 [AuTuneOnline](https://github.com/MaxeLBerger/AuTuneOnline)
Real-time audio visualizer with BPM detection  
**Tech:** JavaScript, Web Audio API  
**Live:** [maximilianhaak.de/AuTuneOnline](https://maximilianhaak.de/AuTuneOnline)

### 🎰 [CasinoIdleSlots](https://github.com/MaxeLBerger/casino-idle-slots)
Idle slot machine game with progressive upgrades  
**Tech:** TypeScript, Vite  
**Live:** [maximilianhaak.de/CasinoIdleSlots](https://maximilianhaak.de/CasinoIdleSlots)

## 🚀 Automated Deployment

### Portfolio Changes
Every push to `main` triggers:
1. ✅ Checkout all submodules
2. ✅ Build each project (e.g., AgeOfMax TypeScript compilation)
3. ✅ Copy build artifacts to `dist/`
4. ✅ Deploy to GitHub Pages

### Project Changes (Automatic!)
Push to any project repo (AgeOfMax, FireCastle, AuTuneOnline, CasinoIdleSlots) **automatically**:
1. ✅ Triggers portfolio submodule update via `repository_dispatch`
2. ✅ Updates the submodule reference to latest commit
3. ✅ Triggers full rebuild and deployment

**Result:** Push to project → Live on website in 3 minutes! 🚀

**📖 Setup Guides:**
- **[COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md)** - Step-by-step setup for complete automation
- [PROJECT_REPOS_SETUP.md](PROJECT_REPOS_SETUP.md) - Detailed technical documentation
- [PROJECT_TEMPLATES.md](PROJECT_TEMPLATES.md) - Ready-to-copy workflow and agent templates 

## 💻 Development

### Clone with submodules
```bash
git clone --recurse-submodules https://github.com/MaxeLBerger/MaxeLBerger.github.io.git
```

### Update submodules to latest
```bash
git submodule update --remote --merge
```

### Work on a project (Automatic deployment!)
```bash
# Clone and work in the original project repo
git clone https://github.com/MaxeLBerger/AgeOfMax.git
cd AgeOfMax

# Make changes
git add .
git commit -m "Add new feature"
git push

# ✨ Portfolio updates AUTOMATICALLY via repository_dispatch!
# Website will be live in ~3 minutes
```

### Manual submodule update (if needed)
```bash
# In portfolio repo
git submodule update --remote --merge
git add .
git commit -m "Update all projects"
git push
```

See **[WORKFLOW_GUIDE.md](WORKFLOW_GUIDE.md)** for detailed workflow instructions and **[PROJECT_REPOS_SETUP.md](PROJECT_REPOS_SETUP.md)** for project repository setup!

## 🧪 Testing

### Automated Testing

All projects are automatically tested on every push and daily:

- **Project availability** - Checks if all pages load correctly
- **Build validation** - Verifies AgeOfMax builds successfully
- **Structure tests** - Validates project file structures
- **Link checking** - Tests internal and external links
- **API documentation** - Documents FireCastle API endpoints

See **[TESTING.md](TESTING.md)** for detailed testing documentation.

### Manual Testing Scripts

```bash
# Test all deployed projects
chmod +x test-projects.sh
./test-projects.sh

# Test FireCastle API specifically
chmod +x test-firecastle-api.sh
./test-firecastle-api.sh
```

## 🖥️ Local Testing

```bash
# Serve locally
python -m http.server 8000
# or
npx serve .
```

Visit: http://localhost:8000

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Build Tools:** Vite, TypeScript
- **CI/CD:** GitHub Actions
- **Hosting:** GitHub Pages
- **Version Control:** Git Submodules

## 📄 License

Individual projects have their own licenses. See submodule repositories for details.

---

**Built with ❤️ by Maximilian Haak**
