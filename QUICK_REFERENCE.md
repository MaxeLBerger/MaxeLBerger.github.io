# 🚀 Quick Reference Card

## 📖 Dokumentations-Index

| Dokument | Was ist das? | Wann brauche ich es? |
|----------|--------------|----------------------|
| **[AUTOMATION_OVERVIEW.md](AUTOMATION_OVERVIEW.md)** | System-Übersicht | Start hier! |
| **[COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md)** | Schritt-für-Schritt Setup | Ersteinrichtung |
| [PROJECT_TEMPLATES.md](PROJECT_TEMPLATES.md) | Copy-Paste Code | Schnell kopieren |
| [WORKFLOW_GUIDE.md](WORKFLOW_GUIDE.md) | Workflow-Erklärung | Verstehen wie's funktioniert |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Beitrags-Richtlinien | Wie Änderungen machen |
| [README.md](README.md) | Repository-Hauptdoku | Allgemeine Infos |

## ⚡ Quick Commands

### Portfolio ändern
```bash
cd MaxeLBerger.github.io
# Dateien ändern
git add .
git commit -m "feat(portfolio): update design"
git push
# → Automatisch deployed in 2-3 Minuten
```

### Submodule-Projekt ändern
```bash
cd AgeOfMax  # oder FireCastle, AuTuneOnline, CasinoIdleSlots, TestoMax, BetterBestie, dl4j-graph-explorer
# Dateien ändern
git add .
git commit -m "feat: add feature"
git push
# → Automatisch Portfolio-Update + Deploy in 3-5 Minuten
```

### Alle Submodules manuell updaten
```bash
cd MaxeLBerger.github.io
git submodule update --remote --merge
git add .
git commit -m "chore: update all submodules"
git push
```

### Einzelnes Submodule manuell updaten
```bash
cd MaxeLBerger.github.io
git submodule update --remote AgeOfMax
git add AgeOfMax
git commit -m "chore: update AgeOfMax"
git push
```

## 📦 Projekt-Übersicht

### Submodules (7 — gebaut/deployed via CI)

| Projekt | Typ | Repo |
|---------|-----|------|
| AgeOfMax | Vite Build | MaxeLBerger/AgeOfMax |
| CasinoIdleSlots | Vite Build | MaxeLBerger/casino-idle-slots |
| BetterBestie | Vite Build | MaxeLBerger/BetterBestie |
| dl4j-graph-explorer | Vite Build | MaxeLBerger/dl4j-graph-explorer |
| FireCastle | Static Copy | MaxeLBerger/FireCastle |
| AuTuneOnline | Static Copy | MaxeLBerger/AuTuneOnline |
| TestoMax | Static Copy | MaxeLBerger/TestoMax |

### Externe Projekte (6 — Detail-Seiten in `projects/`)

| Projekt | Kategorie | Status |
|---------|-----------|--------|
| AI Captain | AI Agents | VS Code Extension |
| Acai Agents | AI Agents | Public Repo |
| AI Chatbot | AI Agents | In Entwicklung |
| E46 Studio | Websites | Privat |
| Imkerei Feuerstein | Websites | Vercel-hosted |
| Shookroko | Games | Privat |

## 🔧 Setup Checklist (Pro Submodule)

Für alle 7 Submodules:

```
1. [x] .github/workflows/update-portfolio.yml erstellt
       → repository_dispatch zu Portfolio-Repo
       
2. [x] PORTFOLIO_UPDATE_TOKEN Secret gesetzt
       → GitHub PAT mit 'repo' + 'workflow' scopes
       
3. [x] Für Vite-Projekte: base in vite.config.ts gesetzt
       → base: '/<project-name>/'
```

## 🎯 Was passiert bei einem Push?

### Push zu Portfolio-Repo
```
Push → Phase 1: 4 Vite-Projekte parallel bauen → Phase 2: Assemblieren + Deploy → Live (3-5 min)
```

### Push zu Submodule-Repo (mit Auto-Update)
```
Push → update-portfolio.yml → repository_dispatch → auto-update-submodules.yml → deploy.yml → Live (3-5 min)
```

### Externe Projekte
```
Kein CI-Build nötig — Detail-Seiten werden als statische HTML mit Portfolio deployed
```

## 📊 Monitoring URLs

| Was | URL |
|-----|-----|
| **Live Website** | https://maximilianhaak.de |
| Portfolio Actions | https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions |
| AgeOfMax Actions | https://github.com/MaxeLBerger/AgeOfMax/actions |
| FireCastle Actions | https://github.com/MaxeLBerger/FireCastle/actions |
| AuTuneOnline Actions | https://github.com/MaxeLBerger/AuTuneOnline/actions |
| CasinoIdleSlots Actions | https://github.com/MaxeLBerger/casino-idle-slots/actions |
| BetterBestie Actions | https://github.com/MaxeLBerger/BetterBestie/actions |
| dl4j-graph-explorer Actions | https://github.com/MaxeLBerger/dl4j-graph-explorer/actions |
| TestoMax Actions | https://github.com/MaxeLBerger/TestoMax/actions |

## 🐛 Quick Troubleshooting

| Problem | Lösung |
|---------|---------|
| "Repository dispatch failed" | Secret `PORTFOLIO_UPDATE_TOKEN` fehlt oder ungültig |
| "Submodule not updated" | Falscher Name im client-payload (case-sensitive!) |
| "Build failed" | Prüfe Logs im Portfolio Actions Tab |
| "Website nicht aktualisiert" | Warte 5 Min, lösche Browser-Cache |
| "Workflow läuft nicht" | Datei im falschen Pfad oder Branch nicht `main` |
| "dist/index.html missing" | Prüfe `vite.config.ts` und `npm run build` lokal |

## 📝 Workflow-Dateien

### Portfolio-Repo
```
MaxeLBerger.github.io/
└── .github/
    ├── workflows/
    │   ├── deploy.yml                    ✅ Parallel Matrix Build + Deploy
    │   ├── auto-update-submodules.yml    ✅ Auto-Update via repository_dispatch
    │   └── test-projects.yml             ✅ Sanity Checks
    └── agents/
        └── portfolio-fix.agent.md        ✅ Portfolio Fix Agent
```

### Submodule-Repos (alle eingerichtet)
```
<Submodule>/
└── .github/
    └── workflows/
        └── update-portfolio.yml          ✅ repository_dispatch Trigger
```

## 🔑 Secret Name

Für alle 7 Submodule-Repos:
```
Name:  PORTFOLIO_UPDATE_TOKEN
Scope: repo + workflow
```

## 🚦 Status Indicators

| Symbol | Status | Bedeutung |
|--------|--------|-----------|
| 🟢 | Success | Workflow erfolgreich |
| 🟡 | Running | Workflow läuft noch |
| 🔴 | Failed | Fehler aufgetreten |
| ⚪ | Queued | Wartet auf Start |

## 💡 Pro-Tipps

1. **Erst testen, dann deployen:** Lokale Tests mit `python -m http.server 8000`
2. **Kleine Commits:** Lieber öfter kleine Änderungen als seltene große
3. **Conventional Commits:** `feat`, `fix`, `docs`, `chore` Prefixes nutzen
4. **Actions beobachten:** Schau in GitHub Actions nach jedem Push
5. **Docs aktuell halten:** Update Docs wenn du Änderungen machst

## 🎓 Learning Path

1. **Start:** [AUTOMATION_OVERVIEW.md](AUTOMATION_OVERVIEW.md) lesen
2. **Setup:** [COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md) folgen
3. **Reference:** [PROJECT_TEMPLATES.md](PROJECT_TEMPLATES.md) für Copy-Paste
4. **Daily Use:** Diese Quick Reference für schnelle Befehle
5. **Deep Dive:** [WORKFLOW_GUIDE.md](WORKFLOW_GUIDE.md) für Details

## 📞 Hilfe bekommen

1. **Dokumentation:** Suche in den Docs oben
2. **Issues:** Öffne ein Issue im Repository
3. **Actions Logs:** Prüfe die Workflow-Logs für Fehlerdetails
4. **Troubleshooting:** [COMPLETE_SETUP_GUIDE.md - Troubleshooting](COMPLETE_SETUP_GUIDE.md#-troubleshooting)

---

**Bereit für Setup?** → [COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md)  
**Fragen?** → Öffne ein Issue!
