# Setup Guide für Projekt-Repositories

Diese Anleitung beschreibt, wie die drei Projekt-Repositories (AgeOfMax, FireCastle, AuTuneOnline) konfiguriert werden müssen, damit sie automatisch das Portfolio-Repository aktualisieren.

## 🎯 Ziel

Wenn du in einem Projekt-Repo pushst, soll automatisch:
1. Das Portfolio-Repo das Submodule updaten
2. Die Website neu gebaut werden
3. Die Änderungen live gehen

## 📋 Einrichtung pro Projekt

### 1. Workflow-Datei erstellen

Erstelle in **jedem** Projekt-Repository die Datei `.github/workflows/update-portfolio.yml`:

#### Für AgeOfMax:
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

#### Für FireCastle:
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

#### Für AuTuneOnline:
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

**Wichtig:** Der einzige Unterschied ist der `"submodule"` Wert im `client-payload`!

### 2. Agent-Konfiguration erstellen

Erstelle in **jedem** Projekt-Repository die Datei `.github/agents/project-agent.md`:

#### Für AgeOfMax:
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

```bash
npm install
npm run dev      # Development server
npm run build    # Production build
```

# Arbeitsweise

- Achte auf TypeScript Type Safety
- Teste Änderungen mit `npm run dev`
- Stelle sicher, dass der Production Build funktioniert
- Dokumentiere größere Gameplay-Änderungen
```

#### Für FireCastle:
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

```
FireCastle/
├── index.html
├── css/
├── js/
├── images/
└── pages/
```

# Arbeitsweise

- Achte auf mobile Kompatibilität
- Teste alle Links und Navigation
- Stelle sicher, dass statische Assets korrekt geladen werden
- Dokumentiere API-Endpoints und Datenstrukturen
```

#### Für AuTuneOnline:
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

```
AuTuneOnline/
└── public/
    ├── index.html
    ├── style.css
    └── app.js
```

# Arbeitsweise

- Achte auf Performance (Audio-Processing ist CPU-intensiv)
- Teste mit verschiedenen Audio-Quellen
- Stelle sicher, dass Browser-Permissions korrekt angefragt werden
- Dokumentiere Algorithmen und Audio-Parameter
```

### 3. GitHub Token konfigurieren

**Einmalig:** Personal Access Token erstellen

1. Gehe zu GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Klicke "Generate new token (classic)"
3. Name: `Portfolio Auto-Update Token`
4. Expiration: No expiration (oder nach Bedarf)
5. Scopes: ✅ `repo` (Full control of private repositories)
6. Klicke "Generate token"
7. **Kopiere den Token sofort** (wird nur einmal angezeigt!)

**In jedem Projekt-Repository:**

1. Gehe zu Settings → Secrets and variables → Actions
2. Klicke "New repository secret"
3. Name: `PORTFOLIO_UPDATE_TOKEN`
4. Value: [Dein generiertes Token einfügen]
5. Klicke "Add secret"

Wiederhole dies für alle drei Repositories:
- ✅ AgeOfMax
- ✅ FireCastle
- ✅ AuTuneOnline

## 🧪 Testen

Nach dem Setup in einem Projekt:

```bash
cd AgeOfMax  # oder FireCastle / AuTuneOnline

# Kleine Änderung machen
echo "# Test Auto-Update" >> README.md
git add README.md
git commit -m "test: Trigger auto-update workflow"
git push
```

**Erwartetes Ergebnis:**

1. ✅ GitHub Actions im Projekt-Repo zeigt "Update Portfolio on Push" (grün)
2. ✅ GitHub Actions im Portfolio-Repo zeigt "Auto Update Submodules" (grün)
3. ✅ GitHub Actions im Portfolio-Repo zeigt "Deploy Portfolio" (grün)
4. ✅ Website ist nach 3-5 Minuten aktualisiert

**Prüfen:**
- [AgeOfMax Actions](https://github.com/MaxeLBerger/AgeOfMax/actions)
- [FireCastle Actions](https://github.com/MaxeLBerger/FireCastle/actions)
- [AuTuneOnline Actions](https://github.com/MaxeLBerger/AuTuneOnline/actions)
- [Portfolio Actions](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions)

## 🔍 Troubleshooting

### "Repository dispatch failed"
- Token ist nicht korrekt oder fehlt
- Token hat nicht den `repo` scope
- Projekt-Name im `client-payload` stimmt nicht mit Submodule-Name überein

### "Workflow läuft nicht automatisch"
- Prüfe, ob die Workflow-Datei im korrekten Pfad ist (`.github/workflows/update-portfolio.yml`)
- Prüfe, ob der Branch `main` heißt (nicht `master`)
- Prüfe GitHub Actions Tab im Repository

### "Submodule wird nicht aktualisiert"
- Prüfe, ob das Portfolio-Repo den `auto-update-submodules.yml` Workflow hat
- Prüfe die Logs im Portfolio-Repo Actions Tab
- Submodule-Name muss exakt mit dem Verzeichnisnamen im Portfolio-Repo übereinstimmen

## ✅ Setup-Checkliste

### AgeOfMax
- [ ] `.github/workflows/update-portfolio.yml` erstellt
- [ ] `.github/agents/project-agent.md` erstellt
- [ ] `PORTFOLIO_UPDATE_TOKEN` Secret konfiguriert
- [ ] Workflow getestet und funktioniert

### FireCastle
- [ ] `.github/workflows/update-portfolio.yml` erstellt
- [ ] `.github/agents/project-agent.md` erstellt
- [ ] `PORTFOLIO_UPDATE_TOKEN` Secret konfiguriert
- [ ] Workflow getestet und funktioniert

### AuTuneOnline
- [ ] `.github/workflows/update-portfolio.yml` erstellt
- [ ] `.github/agents/project-agent.md` erstellt
- [ ] `PORTFOLIO_UPDATE_TOKEN` Secret konfiguriert
- [ ] Workflow getestet und funktioniert

## 🎯 Ergebnis

Nach vollständigem Setup:

**Workflow ohne Setup:**
Projekt-Änderung → Push → Manuelles Submodule-Update im Portfolio → Push → Deploy

**Workflow mit Setup:**
Projekt-Änderung → Push → ✨ **Automatisch** alles weitere! ✨

Zeit bis Live: ~3-5 Minuten nach dem Push! 🚀

---

**Dokumentation aktualisiert:** 2025-01-17
