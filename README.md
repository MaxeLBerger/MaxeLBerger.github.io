# Maximilian Haak — Portfolio

[![Deploy](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/deploy.yml)

**Live:** [maximilianhaak.de](https://maximilianhaak.de)

Static portfolio site for Maximilian Haak — Fullstack developer & AI specialist from Bruckmühl/Rosenheim. Built with vanilla HTML, CSS, and JavaScript. Deployed to GitHub Pages on every push to `main`.

---

## Featured Projects

All projects are showcased on the homepage and have detail pages under [projects/](projects/):

| Project | Type | Detail page |
|---------|------|-------------|
| AI Captain | VS Code extension (AI agent) | [aicaptain.html](projects/aicaptain.html) |
| Imkerei Feuerstein | Customer website | [imkerei-feuerstein.html](projects/imkerei-feuerstein.html) |
| CoHa | Startup MVP | [coha.html](projects/coha.html) |
| E46 Studio | Desktop app | [e46-studio.html](projects/e46-studio.html) |
| SoundOfLvke | Artist website | [soundoflvke.html](projects/soundoflvke.html) |
| Shookroko | Browser game | [shookroko.html](projects/shookroko.html) |

---

## Tech Stack

- **Frontend:** HTML5, CSS3 (custom design tokens), vanilla JavaScript (ES6+)
- **Animations:** GSAP 3.12 + ScrollTrigger (CDN)
- **Fonts:** Inter (Google Fonts, loaded after consent)
- **Hosting:** GitHub Pages, custom domain via CNAME
- **i18n:** Custom DE/EN dictionary in [script.js](script.js) — no framework

---

## Repository Structure

```
.
├── index.html              # Homepage
├── style.css               # Main stylesheet
├── script.js               # Slider, theme, i18n, animations
├── impressum.html          # Legal info
├── datenschutz.html        # Privacy policy
├── projects/               # Project detail pages
├── res/                    # Static assets (images, icons, favicons)
├── mcp-portfolio-server/   # Local MCP dev tool (not deployed)
└── .github/workflows/      # CI: deploy.yml
```

---

## Local Development

```bash
# Serve locally
python -m http.server 8000
# or
npx serve .
```

Visit http://localhost:8000.

No build step required — files are served as-is.

---

## Deployment

Push to `main` triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml):

1. Checkout
2. Copy portfolio files into `dist/`
3. Upload as Pages artifact
4. Deploy to GitHub Pages

Live in ~1–2 minutes.

---

## License

© Maximilian Haak. All rights reserved.
# Maximilian Haak - Portfolio

[![Deploy Status](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/deploy.yml)
[![Test Projects](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/test-projects.yml/badge.svg)](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/test-projects.yml)

**🌐 Live Website:** [maximilianhaak.de](https://maximilianhaak.de)

Professional portfolio website showcasing 13+ software development projects across AI, web, machine learning, and games — with automated CI/CD deployment to GitHub Pages.

---

## 🎮 Projects

### AI Agents

| Project | Description | Technologies |
|---------|-------------|-------------|
| **[AI Captain](https://maximilianhaak.de/projects/aicaptain.html)** | VS Code extension for AI-assisted development | TypeScript, VS Code API |
| **[Acai Agents](https://maximilianhaak.de/projects/acai-agents.html)** | Multi-agent AI framework | Python, LangChain, FastAPI |
| **AI Chatbot** | Conversational AI chatbot (in development) | Python, NLP |

### Websites

| Project | Description | Technologies |
|---------|-------------|-------------|
| **[FireCastle](https://maximilianhaak.de/FireCastle)** | Clash of Clans clan management | JavaScript, Node.js, Express |
| **[AuTuneOnline](https://maximilianhaak.de/AuTuneOnline)** | Real-time audio visualizer | JavaScript, Web Audio API, Canvas |
| **[BetterBestie](https://maximilianhaak.de/BetterBestie)** | 30-Day GlowUp Challenge app | TypeScript, React 19, Express, Vite |
| **[TestoMax](https://maximilianhaak.de/TestoMax)** | Modern web application | HTML5, CSS3, JavaScript |
| **[Imkerei Feuerstein](https://maximilianhaak.de/projects/imkerei-feuerstein.html)** | Beekeeper website | Astro, TypeScript |
| **[E46 Studio](https://maximilianhaak.de/projects/e46-studio.html)** | BMW E46 tuning platform | React, TypeScript |

### Machine Learning

| Project | Description | Technologies |
|---------|-------------|-------------|
| **[DL4J Graph Explorer](https://maximilianhaak.de/dl4j-graph-explorer)** | Neural network model visualizer | TypeScript, React, D3.js, Tailwind CSS |

### Games

| Project | Description | Technologies |
|---------|-------------|-------------|
| **[AgeOfMax](https://maximilianhaak.de/AgeOfMax)** | Strategic tower defense across 5 epochs | TypeScript, Phaser 3, Vite |
| **[CasinoIdleSlots](https://maximilianhaak.de/CasinoIdleSlots)** | Idle casino slot game | TypeScript, React, Tailwind, Vite |
| **[Shookroko](https://maximilianhaak.de/projects/shookroko.html)** | Browser-based party game | TypeScript, React |

---

## 🏗️ Architecture

The portfolio combines **7 Git Submodules** (built/deployed via CI) with **6 External Projects** (linked via detail pages).

### Submodules (CI/CD built)

| Submodule | Type | Build |
|-----------|------|-------|
| AgeOfMax | Vite/TypeScript | Parallel matrix |
| CasinoIdleSlots | Vite/TypeScript | Parallel matrix |
| BetterBestie | Vite/TypeScript | Parallel matrix |
| dl4j-graph-explorer | Vite/TypeScript | Parallel matrix |
| FireCastle | Static | Copy |
| AuTuneOnline | Static | Copy |
| TestoMax | Static | Copy |

### External Projects

AI Captain, Acai Agents, AI Chatbot, Imkerei Feuerstein, E46 Studio, and Shookroko are hosted externally or are private repositories. They are showcased via detail pages in `projects/` — no build step required.

---

## 🛠️ Technologies

**Frontend:** HTML5, CSS3, JavaScript, TypeScript  
**Frameworks:** React, Phaser 3, Astro, Express, Node.js  
**AI/ML:** Python, LangChain, FastAPI, D3.js, DL4J  
**Build Tools:** Vite, npm  
**CI/CD:** GitHub Actions (parallel matrix builds)  
**Hosting:** GitHub Pages, Vercel  
**Version Control:** Git with Submodules

---

## 🚀 Automated Deployment

Every push to any submodule repository automatically:

1. Triggers `repository_dispatch` to the portfolio repo
2. Updates the submodule reference
3. Builds all 4 Vite/TypeScript projects in parallel
4. Copies 3 static projects
5. Assembles portfolio assets + project detail pages
6. Deploys to GitHub Pages

**Result:** Code changes go live in ~3-5 minutes!

---

## 📖 Getting Started

1. **Understand the system** — Read [AUTOMATION_OVERVIEW.md](AUTOMATION_OVERVIEW.md)
2. **Set up automation** — Follow [COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md)
3. **Daily reference** — Use [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| [AUTOMATION_OVERVIEW.md](AUTOMATION_OVERVIEW.md) | System overview and architecture |
| [COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md) | Step-by-step setup instructions |
| [PROJECT_TEMPLATES.md](PROJECT_TEMPLATES.md) | Copy-paste workflow templates |
| [WORKFLOW_GUIDE.md](WORKFLOW_GUIDE.md) | Deployment workflow details |
| [TESTING.md](TESTING.md) | Testing documentation |
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md) | Commands and troubleshooting |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |

---

## 📬 Contact

**Maximilian Haak**  
🌐 [maximilianhaak.de](https://maximilianhaak.de)  
💼 [GitHub](https://github.com/MaxeLBerger)

---

## 📄 License

Individual projects have their own licenses. See submodule repositories for details.

---

**Built with ❤️ by Maximilian Haak**
