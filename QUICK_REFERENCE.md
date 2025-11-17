# 🚀 Quick Reference Card

## 📖 Dokumentations-Index

| Dokument | Was ist das? | Wann brauche ich es? |
|----------|--------------|----------------------|
| **[AUTOMATION_OVERVIEW.md](AUTOMATION_OVERVIEW.md)** | System-Übersicht | Start hier! |
| **[COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md)** | Schritt-für-Schritt Setup | Ersteinrichtung |
| [PROJECT_TEMPLATES.md](PROJECT_TEMPLATES.md) | Copy-Paste Code | Schnell kopieren |
| [WORKFLOW_GUIDE.md](WORKFLOW_GUIDE.md) | Workflow-Erklärung | Verstehen wie's funktioniert |
| [README.md](README.md) | Repository-Hauptdoku | Allgemeine Infos |

## ⚡ Quick Commands

### Portfolio ändern
```bash
cd MaxeLBerger.github.io
# Dateien ändern
git add .
git commit -m "Update portfolio"
git push
# → Automatisch deployed in 2-3 Minuten
```

### Projekt ändern (nach Setup)
```bash
cd AgeOfMax  # oder FireCastle / AuTuneOnline / CasinoIdleSlots
# Dateien ändern
git add .
git commit -m "Add feature"
git push
# → Automatisch Portfolio-Update + Deploy in 3-5 Minuten
```

### Alle Submodules manuell updaten
```bash
cd MaxeLBerger.github.io
git submodule update --remote --merge
git add .
git commit -m "Update all projects"
git push
```

### Einzelnes Submodule manuell updaten
```bash
cd MaxeLBerger.github.io
git submodule update --remote AgeOfMax
git add AgeOfMax
git commit -m "Update AgeOfMax"
git push
```

## 🔧 Setup Checklist (Pro Projekt)

Für **AgeOfMax** / **FireCastle** / **AuTuneOnline** / **CasinoIdleSlots**:

```
1. [ ] Erstelle .github/workflows/update-portfolio.yml
       → Code aus PROJECT_TEMPLATES.md kopieren
       
2. [ ] Erstelle .github/agents/project-agent.md
       → Code aus PROJECT_TEMPLATES.md kopieren
       
3. [ ] GitHub Token erstellen (einmalig)
       → GitHub Settings → Developer settings → Tokens
       → Generate token (classic) mit 'repo' scope
       
4. [ ] Secret im Projekt-Repo hinzufügen
       → Settings → Secrets → New secret
       → Name: PORTFOLIO_UPDATE_TOKEN
       → Value: [Token einfügen]
       
5. [ ] Testen
       → Kleine Änderung machen
       → git push
       → Prüfe GitHub Actions
```

## 🎯 Was passiert bei einem Push?

### Push zu Portfolio-Repo
```
Push → Build Projects → Copy Files → Deploy → Live (2-3 min)
```

### Push zu Projekt-Repo (MIT Setup)
```
Push → Trigger Portfolio → Update Submodule → Build → Deploy → Live (3-5 min)
```

### Push zu Projekt-Repo (OHNE Setup)
```
Push → ⚠️ Nichts passiert ⚠️ → Manuelles Submodule-Update nötig
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

## 🐛 Quick Troubleshooting

| Problem | Lösung |
|---------|---------|
| "Repository dispatch failed" | Secret PORTFOLIO_UPDATE_TOKEN fehlt oder ungültig |
| "Submodule not updated" | Falscher Name im client-payload (case-sensitive!) |
| "Build failed" | Prüfe Logs im Portfolio Actions Tab |
| "Website nicht aktualisiert" | Warte 5 Min, lösche Browser-Cache |
| "Workflow läuft nicht" | Datei im falschen Pfad oder Branch nicht 'main' |

## 📝 Workflow-Dateien Locations

### Portfolio-Repo
```
MaxeLBerger.github.io/
└── .github/
    ├── workflows/
    │   ├── deploy.yml                    ✅ Deployed Portfolio
    │   └── auto-update-submodules.yml    ✅ Updated Submodules
    └── agents/
        └── portfolio-fix.agent.md        ✅ Portfolio Agent
```

### Projekt-Repos (zu erstellen)
```
AgeOfMax/
└── .github/
    ├── workflows/
    │   └── update-portfolio.yml          ⚠️ Zu erstellen
    └── agents/
        └── project-agent.md              ⚠️ Zu erstellen

FireCastle/
└── .github/
    ├── workflows/
    │   └── update-portfolio.yml          ⚠️ Zu erstellen
    └── agents/
        └── project-agent.md              ⚠️ Zu erstellen

AuTuneOnline/
└── .github/
    ├── workflows/
    │   └── update-portfolio.yml          ⚠️ Zu erstellen
    └── agents/
        └── project-agent.md              ⚠️ Zu erstellen

CasinoIdleSlots/
└── .github/
    ├── workflows/
    │   └── update-portfolio.yml          ⚠️ Zu erstellen
    └── agents/
        └── project-agent.md              ⚠️ Zu erstellen
```

## 🔑 Secret Name

Für alle vier Projekt-Repos:
```
Name:  PORTFOLIO_UPDATE_TOKEN
Scope: repo
```

## 🚦 Status Indicators

| Symbol | Status | Bedeutung |
|--------|--------|-----------|
| 🟢 | Success | Workflow erfolgreich |
| 🟡 | Running | Workflow läuft noch |
| 🔴 | Failed | Fehler aufgetreten |
| ⚪ | Queued | Wartet auf Start |

## 💡 Pro-Tipps

1. **Erst testen, dann deployen:** Mache lokale Tests bevor du pushst
2. **Kleine Commits:** Lieber öfter kleine Änderungen als seltene große
3. **Klare Messages:** Commit-Messages erscheinen in Portfolio-Updates
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
