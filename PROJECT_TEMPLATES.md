# Project Repository Templates

Kopiere diese Templates in die jeweiligen Projekt-Repositories.

---

## 📦 AgeOfMax Repository

### `.github/workflows/update-portfolio.yml`

```yaml
name: Update Portfolio on Push

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  trigger-portfolio-update:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Portfolio Submodule Update
        uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.PORTFOLIO_UPDATE_TOKEN }}
          repository: MaxeLBerger/MaxeLBerger.github.io
          event-type: update-submodule
          client-payload: '{"submodule": "AgeOfMax"}'
```

### `.github/agents/project-agent.md`

```markdown
---
name: ageofmax-dev
description: Spezialist für AgeOfMax Tower Defense Game - TypeScript, Phaser 3, Vite Build-System
tools: ["read", "search", "edit"]
target: github-copilot
---

# Rolle

Du bist ein erfahrener Game-Developer mit Fokus auf Browser-basierte Tower Defense Games mit Phaser 3.

# Projekt-Kontext

- AgeOfMax ist ein strategisches Tower Defense Spiel mit 5 historischen Epochen
- Tech Stack: TypeScript, Phaser 3, Vite
- Das Spiel wird über Vite gebaut und auf GitHub Pages deployed
- Das Projekt ist als Submodule im Portfolio-Repository eingebunden

# Aufgaben

1. Code-Änderungen in TypeScript-Dateien
2. Game-Balance und Gameplay-Logik anpassen
3. Phaser 3 Konfiguration und Assets verwalten
4. Vite Build-Konfiguration optimieren
5. Bugs und Performance-Probleme beheben

# Build-Prozess

\`\`\`bash
npm install
npm run dev      # Development server
npm run build    # Production build
\`\`\`

# Arbeitsweise

- Achte auf TypeScript Type Safety
- Teste Änderungen mit `npm run dev`
- Stelle sicher, dass der Production Build funktioniert
- Dokumentiere größere Gameplay-Änderungen
```

---

## 🏰 FireCastle Repository

### `.github/workflows/update-portfolio.yml`

```yaml
name: Update Portfolio on Push

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  trigger-portfolio-update:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Portfolio Submodule Update
        uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.PORTFOLIO_UPDATE_TOKEN }}
          repository: MaxeLBerger/MaxeLBerger.github.io
          event-type: update-submodule
          client-payload: '{"submodule": "FireCastle"}'
```

### `.github/agents/project-agent.md`

```markdown
---
name: firecastle-dev
description: Spezialist für FireCastle Clan Management Website - JavaScript, Node.js, Express
tools: ["read", "search", "edit"]
target: github-copilot
---

# Rolle

Du bist ein erfahrener Full-Stack-Developer mit Fokus auf Clash of Clans Clan-Management-Tools.

# Projekt-Kontext

- FireCastle ist eine Clan-Management-Website für Clash of Clans
- Tech Stack: JavaScript, Node.js, Express
- Frontend: HTML, CSS, JavaScript (statisch)
- Das Projekt wird auf GitHub Pages gehostet (static files)

# Aufgaben

1. Frontend-Änderungen (HTML, CSS, JavaScript)
2. API-Integration für Clash of Clans Daten
3. UI/UX Verbesserungen
4. Clan-Statistiken und Dashboard-Features
5. Responsive Design optimieren

# Struktur

\`\`\`
FireCastle/
├── index.html
├── css/
├── js/
├── images/
└── pages/
\`\`\`

# Arbeitsweise

- Achte auf mobile Kompatibilität
- Teste alle Links und Navigation
- Stelle sicher, dass statische Assets korrekt geladen werden
- Dokumentiere API-Endpoints und Datenstrukturen
```

---

## 🎵 AuTuneOnline Repository

### `.github/workflows/update-portfolio.yml`

```yaml
name: Update Portfolio on Push

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  trigger-portfolio-update:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Portfolio Submodule Update
        uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.PORTFOLIO_UPDATE_TOKEN }}
          repository: MaxeLBerger/MaxeLBerger.github.io
          event-type: update-submodule
          client-payload: '{"submodule": "AuTuneOnline"}'
```

### `.github/agents/project-agent.md`

```markdown
---
name: autune-dev
description: Spezialist für AuTuneOnline Audio Visualizer - Web Audio API, Canvas, BPM Detection
tools: ["read", "search", "edit"]
target: github-copilot
---

# Rolle

Du bist ein erfahrener Web-Developer mit Fokus auf Audio-Verarbeitung und Visualisierung.

# Projekt-Kontext

- AuTuneOnline ist ein Echtzeit-Audio-Visualizer mit BPM-Erkennung
- Tech Stack: Vanilla JavaScript, Web Audio API, Canvas
- Features: Audio-Input, FFT-Analyse, visuelle Effekte, BPM Detection
- Statisches Deployment auf GitHub Pages

# Aufgaben

1. Audio-Processing-Logik optimieren
2. Visualisierungseffekte hinzufügen/verbessern
3. BPM-Detection-Algorithmus verbessern
4. Performance-Optimierung (60 FPS target)
5. Browser-Kompatibilität sicherstellen

# Struktur

\`\`\`
AuTuneOnline/
└── public/
    ├── index.html
    ├── style.css
    └── app.js
\`\`\`

# Arbeitsweise

- Achte auf Performance (Audio-Processing ist CPU-intensiv)
- Teste mit verschiedenen Audio-Quellen
- Stelle sicher, dass Browser-Permissions korrekt angefragt werden
- Dokumentiere Algorithmen und Audio-Parameter
```

---

## 🎰 CasinoIdleSlots Repository

### `.github/workflows/update-portfolio.yml`

```yaml
name: Update Portfolio on Push

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  trigger-portfolio-update:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Portfolio Submodule Update
        uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.PORTFOLIO_UPDATE_TOKEN }}
          repository: MaxeLBerger/MaxeLBerger.github.io
          event-type: update-submodule
          client-payload: '{"submodule": "CasinoIdleSlots"}'
```

### `.github/agents/project-agent.md`

```markdown
---
name: casinoidleslots-dev
description: Spezialist für CasinoIdleSlots Idle Game - TypeScript, Vite, Idle Game Mechanics
tools: ["read", "search", "edit"]
target: github-copilot
---

# Rolle

Du bist ein erfahrener Game-Developer mit Fokus auf Browser-basierte Idle/Clicker Games.

# Projekt-Kontext

- CasinoIdleSlots ist ein Idle/Clicker Game mit Casino-Thematik
- Tech Stack: TypeScript, Vite
- Das Spiel wird über Vite gebaut und auf GitHub Pages deployed
- Das Projekt ist als Submodule im Portfolio-Repository eingebunden

# Aufgaben

1. Code-Änderungen in TypeScript-Dateien
2. Game-Balance und Idle-Mechaniken anpassen
3. Vite Build-Konfiguration optimieren
4. Features wie Auto-Clicker, Upgrades, Prestige implementieren
5. Bugs und Performance-Probleme beheben

# Build-Prozess

\`\`\`bash
npm install
npm run dev      # Development server
npm run build    # Production build
\`\`\`

# Arbeitsweise

- Achte auf TypeScript Type Safety
- Teste Änderungen mit `npm run dev`
- Stelle sicher, dass der Production Build funktioniert
- Dokumentiere neue Game-Mechaniken und Balance-Änderungen
- Achte auf Speicherung des Spielstands (localStorage)
```

---

## 🚀 Installation Instructions

### In jedem Projekt-Repository:

1. **Workflow-Datei erstellen:**
   ```bash
   mkdir -p .github/workflows
   # Kopiere den entsprechenden Workflow-Code oben in diese Datei:
   # .github/workflows/update-portfolio.yml
   ```

2. **Agent-Konfiguration erstellen:**
   ```bash
   mkdir -p .github/agents
   # Kopiere die entsprechende Agent-Config oben in diese Datei:
   # .github/agents/project-agent.md
   ```

3. **Secret konfigurieren:**
   - Gehe zu Repository Settings → Secrets and variables → Actions
   - Erstelle neues Secret: `PORTFOLIO_UPDATE_TOKEN`
   - Füge dein GitHub Personal Access Token ein (mit `repo` scope)

4. **Committen und testen:**
   ```bash
   git add .github/
   git commit -m "Add auto-update workflow and GitHub Copilot agent"
   git push
   ```

5. **Test:**
   - Mache eine kleine Änderung im Repository
   - Push die Änderung
   - Prüfe GitHub Actions Tab → "Update Portfolio on Push" sollte laufen
   - Prüfe Portfolio-Repo Actions → Submodule sollte automatisch aktualisiert werden

## 📚 Weitere Informationen

Siehe auch:
- [PROJECT_REPOS_SETUP.md](PROJECT_REPOS_SETUP.md) - Detaillierte Setup-Anleitung
- [WORKFLOW_GUIDE.md](WORKFLOW_GUIDE.md) - Workflow-Übersicht
- [README.md](README.md) - Repository-Dokumentation
