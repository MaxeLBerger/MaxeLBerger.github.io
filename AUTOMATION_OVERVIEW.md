# 🤖 Portfolio Automation System - Overview

## 📖 Was ist das?

Ein vollautomatisches CI/CD-System für dein Portfolio mit GitHub Copilot Agents pro Projekt.

## 🎯 Funktionen

### ✅ Bereits implementiert (Portfolio-Repo)

- ✅ **Automatisches Deployment** bei Push zum Portfolio-Repo
- ✅ **Submodule Auto-Update** via `repository_dispatch` Events
- ✅ **Build & Deploy Pipeline** für alle Projekte
- ✅ **Portfolio Agent** für allgemeine Portfolio-Fixes

### 📦 Setup erforderlich (Pro Projekt-Repo)

Für AgeOfMax, FireCastle und AuTuneOnline:
- [ ] **Workflow-Datei** zum Triggern von Portfolio-Updates
- [ ] **Agent-Konfiguration** für projekt-spezifische Assistenz
- [ ] **GitHub Secret** für Authentication

## 🚀 Quick Start

### Für dich (als Repository-Owner):

1. **Token erstellen:**
   - GitHub → Settings → Developer settings → Personal access tokens
   - Generate new token (classic) mit `repo` scope
   - Token kopieren

2. **Setup pro Projekt:**
   - AgeOfMax: Folge [COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md#schritt-2-ageofmax-repository-setup)
   - FireCastle: Folge [COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md#schritt-3-firecastle-repository-setup)
   - AuTuneOnline: Folge [COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md#schritt-4-autuneonline-repository-setup)

3. **Testen:**
   - Push zu einem Projekt
   - Prüfe GitHub Actions
   - Website sollte nach 3-5 Minuten aktualisiert sein

### Für Contributors:

Einfach zu einem Projekt-Repo pushen - alles andere passiert automatisch! 🎉

## 📚 Dokumentation

### Für Setup und Konfiguration:

| Dokument | Zweck | Für wen |
|----------|-------|---------|
| **[COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md)** | Schritt-für-Schritt Anleitung | Repository-Owner (Ersteinrichtung) |
| [PROJECT_REPOS_SETUP.md](PROJECT_REPOS_SETUP.md) | Technische Details | Developer (Referenz) |
| [PROJECT_TEMPLATES.md](PROJECT_TEMPLATES.md) | Copy-paste Templates | Developer (Schnelle Einrichtung) |

### Für tägliche Arbeit:

| Dokument | Zweck | Für wen |
|----------|-------|---------|
| [WORKFLOW_GUIDE.md](WORKFLOW_GUIDE.md) | Workflow-Übersicht und Commands | Alle Developer |
| [README.md](README.md) | Repository-Hauptdokumentation | Alle |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution Guidelines | Contributors |

### Für spezielle Aufgaben:

| Dokument | Zweck |
|----------|-------|
| [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md) | GitHub Pages Konfiguration |

## 🔄 Workflow-Diagramm

```
┌─────────────────────────────────────────────────────────────┐
│                    PROJEKT-REPOSITORY                        │
│                  (z.B. AgeOfMax)                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ git push
                              ↓
                   ┌──────────────────────┐
                   │  Workflow Trigger    │
                   │  update-portfolio.yml │
                   └──────────────────────┘
                              │
                              │ repository_dispatch
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   PORTFOLIO-REPOSITORY                       │
│              (MaxeLBerger.github.io)                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
                   ┌──────────────────────┐
                   │ Auto Update Workflow  │
                   │ update submodule      │
                   └──────────────────────┘
                              │
                              │ git commit & push
                              ↓
                   ┌──────────────────────┐
                   │   Deploy Workflow     │
                   │   - Build projects    │
                   │   - Copy files        │
                   │   - Deploy to Pages   │
                   └──────────────────────┘
                              │
                              ↓
                   ┌──────────────────────┐
                   │   GitHub Pages        │
                   │  maximilianhaak.de   │
                   └──────────────────────┘
```

## 🤖 GitHub Copilot Agents

### Portfolio-Agent
- **Location:** `.github/agents/portfolio-fix.agent.md`
- **Zweck:** Fixes für Portfolio-Seite, 404s, JavaScript-Errors
- **Bereits aktiv:** ✅

### Projekt-Agents (zu erstellen)

#### AgeOfMax Agent
- **Location:** `AgeOfMax/.github/agents/project-agent.md`
- **Expertise:** TypeScript, Phaser 3, Game Development
- **Template:** [PROJECT_TEMPLATES.md](PROJECT_TEMPLATES.md#-ageofmax-repository)

#### FireCastle Agent
- **Location:** `FireCastle/.github/agents/project-agent.md`
- **Expertise:** Node.js, Express, Clash of Clans API
- **Template:** [PROJECT_TEMPLATES.md](PROJECT_TEMPLATES.md#-firecastle-repository)

#### AuTuneOnline Agent
- **Location:** `AuTuneOnline/.github/agents/project-agent.md`
- **Expertise:** Web Audio API, Canvas, BPM Detection
- **Template:** [PROJECT_TEMPLATES.md](PROJECT_TEMPLATES.md#-autuneonline-repository)

## 🎓 Wie funktioniert's?

### Szenario 1: Portfolio-Änderung
```
Du änderst index.html → git push → Deploy → Live ✅
```
**Zeit:** ~2-3 Minuten

### Szenario 2: Projekt-Änderung (OHNE Setup)
```
Du änderst AgeOfMax → git push → Manuelles Submodule-Update im Portfolio 
→ git push → Deploy → Live ✅
```
**Zeit:** ~5-10 Minuten + manuelle Arbeit

### Szenario 3: Projekt-Änderung (MIT Setup)
```
Du änderst AgeOfMax → git push → ✨ AUTOMATISCH ✨ → Live ✅
```
**Zeit:** ~3-5 Minuten, KEINE manuelle Arbeit!

## 🔐 Security

- Personal Access Token wird als **Secret** gespeichert (nicht im Code)
- Token hat nur `repo` scope (minimale Berechtigung)
- Token wird nur für `repository_dispatch` Events verwendet
- Workflows laufen in isolierten GitHub Actions Umgebungen

## 📊 Monitoring

### GitHub Actions Dashboards

**Projekt-Repositories:**
- [AgeOfMax Actions](https://github.com/MaxeLBerger/AgeOfMax/actions)
- [FireCastle Actions](https://github.com/MaxeLBerger/FireCastle/actions)
- [AuTuneOnline Actions](https://github.com/MaxeLBerger/AuTuneOnline/actions)

**Portfolio-Repository:**
- [Portfolio Actions](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions)

**Live Website:**
- [maximilianhaak.de](https://maximilianhaak.de)

### Was zu überwachen ist

| Status | Was bedeutet das? | Aktion |
|--------|-------------------|---------|
| 🟢 Alle Workflows grün | Alles funktioniert | Nichts tun |
| 🟡 Ein Workflow gelb | Workflow läuft noch | Warten |
| 🔴 Workflow rot | Fehler aufgetreten | Logs prüfen, [Troubleshooting](#-troubleshooting) |

## 🛠️ Troubleshooting

### Häufige Probleme

1. **"Repository dispatch failed"**
   - → Token fehlt oder ist ungültig
   - → Prüfe Secret `PORTFOLIO_UPDATE_TOKEN` im Projekt-Repo

2. **"Submodule not updated"**
   - → Falscher Projektname im `client-payload`
   - → Muss exakt `AgeOfMax`, `FireCastle` oder `AuTuneOnline` sein

3. **"Build failed"**
   - → Prüfe Build-Logs im Deploy Workflow
   - → Dependencies fehlen oder Build-Script ist fehlerhaft

4. **"Website nicht aktualisiert"**
   - → Warte 5 Minuten (GitHub Pages Cache)
   - → Lösche Browser-Cache
   - → Prüfe ob Deploy erfolgreich war

### Detailliertes Troubleshooting

Siehe [COMPLETE_SETUP_GUIDE.md - Troubleshooting](COMPLETE_SETUP_GUIDE.md#-troubleshooting)

## ✅ Setup-Status Checklist

Verwende diese Checkliste um den Setup-Status zu tracken:

### Portfolio-Repository (MaxeLBerger.github.io)
- [x] Deploy Workflow konfiguriert
- [x] Auto-Update Submodules Workflow konfiguriert
- [x] Portfolio-Agent konfiguriert
- [x] Dokumentation erstellt

### AgeOfMax Repository
- [ ] `.github/workflows/update-portfolio.yml` erstellt
- [ ] `.github/agents/project-agent.md` erstellt
- [ ] `PORTFOLIO_UPDATE_TOKEN` Secret konfiguriert
- [ ] Workflow getestet

### FireCastle Repository
- [ ] `.github/workflows/update-portfolio.yml` erstellt
- [ ] `.github/agents/project-agent.md` erstellt
- [ ] `PORTFOLIO_UPDATE_TOKEN` Secret konfiguriert
- [ ] Workflow getestet

### AuTuneOnline Repository
- [ ] `.github/workflows/update-portfolio.yml` erstellt
- [ ] `.github/agents/project-agent.md` erstellt
- [ ] `PORTFOLIO_UPDATE_TOKEN` Secret konfiguriert
- [ ] Workflow getestet

### Personal Access Token
- [ ] Token erstellt mit `repo` scope
- [ ] Token in allen drei Projekt-Repos als Secret hinterlegt
- [ ] Token getestet (mindestens ein Test-Push pro Repo)

## 🚀 Nächste Schritte

1. **Jetzt:** Folge [COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md) Schritt für Schritt
2. **Dann:** Teste das System mit kleinen Änderungen
3. **Danach:** Nutze die automatische Pipeline für alle zukünftigen Updates!

## 💡 Tipps

- **Commit-Messages:** Verwende klare Messages - sie erscheinen in den Portfolio-Update-Commits
- **Test-Pushes:** Mache kleine Test-Änderungen bevor du große Features pushst
- **Monitoring:** Schau regelmäßig in die GitHub Actions Tabs
- **Dokumentation:** Halte die Dokumentation aktuell wenn du Änderungen machst

## 🎉 Vorteile des Systems

- ⚡ **Schnell:** 3-5 Minuten von Push bis Live
- 🤖 **Automatisch:** Keine manuelle Submodule-Updates mehr
- 🔒 **Sicher:** Token-basierte Authentication
- 📊 **Transparent:** Alle Schritte sind in GitHub Actions sichtbar
- 🧠 **Intelligent:** GitHub Copilot Agents für projekt-spezifische Hilfe
- 📝 **Dokumentiert:** Alles ist ausführlich dokumentiert

---

**Bereit loszulegen?** → [COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md)

**Fragen?** → Öffne ein Issue im Repository

**Feedback?** → Gerne als Issue oder Pull Request!
