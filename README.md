# Portfolio - Maximilian Haak

 **Live:** [maximilianhaak.de](https://maximilianhaak.de)

Professional portfolio website showcasing software development projects with automated CI/CD deployment.

##  Architecture

This repository uses **Git Submodules** for clean project separation and **GitHub Actions** for automated builds.

\\\
MaxeLBerger.github.io/
 .github/workflows/
    deploy.yml          # Automated CI/CD pipeline
 AgeOfMax/              # Git Submodule  MaxeLBerger/AgeOfMax
 FireCastle/            # Git Submodule  MaxeLBerger/FireCastle
 AuTuneOnline/          # Git Submodule  MaxeLBerger/AuTuneOnline
 projects/              # Project landing pages
 res/                   # Static resources
 index.html             # Portfolio homepage
 style.css
 script.js
\\\

##  Projects

###  [AgeOfMax](https://github.com/MaxeLBerger/AgeOfMax)
Strategic tower defense game with 5 historical epochs  
**Tech:** TypeScript, Phaser 3, Vite  
**Live:** [maximilianhaak.de/AgeOfMax](https://maximilianhaak.de/AgeOfMax)

###  [FireCastle](https://github.com/MaxeLBerger/FireCastle)
Clash of Clans clan management website  
**Tech:** JavaScript, Node.js, Express  
**Live:** [maximilianhaak.de/FireCastle](https://maximilianhaak.de/FireCastle)

###  [AuTuneOnline](https://github.com/MaxeLBerger/AuTuneOnline)
Real-time audio visualizer with BPM detection  
**Tech:** JavaScript, Web Audio API  
**Live:** [maximilianhaak.de/AuTuneOnline](https://maximilianhaak.de/AuTuneOnline)

##  Automated Deployment

Every push to \main\ triggers:
1. Checkout all submodules
2. Build each project (e.g., AgeOfMax TypeScript compilation)
3. Copy build artifacts to \dist/\
4. Deploy to GitHub Pages

**Result:** Projects stay in sync automatically! 

##  Development

### Clone with submodules
\\\ash
git clone --recurse-submodules https://github.com/MaxeLBerger/MaxeLBerger.github.io.git
\\\

### Update submodules to latest
\\\ash
git submodule update --remote --merge
\\\

### Work on a specific project
\\\ash
cd AgeOfMax
# Make changes, commit, push
git add .
git commit -m "Update game mechanics"
git push

# Return to portfolio repo
cd ..
git add AgeOfMax
git commit -m "Update AgeOfMax submodule"
git push
\\\

GitHub Actions will automatically rebuild and deploy! 

##  Local Testing

\\\ash
# Serve locally
python -m http.server 8000
# or
npx serve .
\\\

Visit: http://localhost:8000

##  Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Build Tools:** Vite, TypeScript
- **CI/CD:** GitHub Actions
- **Hosting:** GitHub Pages
- **Version Control:** Git Submodules

##  License

Individual projects have their own licenses. See submodule repositories for details.

---

**Built with  by Maximilian Haak**
