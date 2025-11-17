# Project Setup Templates - Quick Copy Guide

Dieses Verzeichnis enthält fertige Templates für die drei Projekt-Repositories.

## 📁 Struktur

```
project-setup-templates/
├── AgeOfMax/
│   ├── update-portfolio.yml          # → AgeOfMax/.github/workflows/
│   └── project-agent.md              # → AgeOfMax/.github/agents/
├── FireCastle/
│   ├── update-portfolio.yml          # → FireCastle/.github/workflows/
│   └── project-agent.md              # → FireCastle/.github/agents/
└── AuTuneOnline/
    ├── update-portfolio.yml          # → AuTuneOnline/.github/workflows/
    └── project-agent.md              # → AuTuneOnline/.github/agents/
```

## 🚀 Schnelle Einrichtung

### Für AgeOfMax:

```bash
# Im AgeOfMax Repository
mkdir -p .github/workflows .github/agents

# Workflow kopieren
# Kopiere project-setup-templates/AgeOfMax/update-portfolio.yml 
# nach .github/workflows/update-portfolio.yml

# Agent kopieren  
# Kopiere project-setup-templates/AgeOfMax/project-agent.md
# nach .github/agents/project-agent.md

# Secret hinzufügen (manuell in GitHub UI)
# Settings → Secrets → PORTFOLIO_UPDATE_TOKEN

# Commiten und pushen
git add .github/
git commit -m "Add auto-update workflow and agent configuration"
git push
```

### Für FireCastle:

```bash
# Im FireCastle Repository
mkdir -p .github/workflows .github/agents

# Workflow kopieren
# Kopiere project-setup-templates/FireCastle/update-portfolio.yml
# nach .github/workflows/update-portfolio.yml

# Agent kopieren
# Kopiere project-setup-templates/FireCastle/project-agent.md
# nach .github/agents/project-agent.md

# Secret hinzufügen (manuell in GitHub UI)
# Commiten und pushen
git add .github/
git commit -m "Add auto-update workflow and agent configuration"
git push
```

### Für AuTuneOnline:

```bash
# Im AuTuneOnline Repository
mkdir -p .github/workflows .github/agents

# Workflow kopieren
# Kopiere project-setup-templates/AuTuneOnline/update-portfolio.yml
# nach .github/workflows/update-portfolio.yml

# Agent kopieren
# Kopiere project-setup-templates/AuTuneOnline/project-agent.md
# nach .github/agents/project-agent.md

# Secret hinzufügen (manuell in GitHub UI)
# Commiten und pushen
git add .github/
git commit -m "Add auto-update workflow and agent configuration"
git push
```

## 🔐 Secret Configuration

In **jedem** der drei Repositories:

1. Gehe zu Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `PORTFOLIO_UPDATE_TOKEN`
4. Value: [Dein GitHub Personal Access Token]
5. Click "Add secret"

**Token erstellen:**
GitHub Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token → Select `repo` scope

## ✅ Fertig!

Nach dem Setup:
- Push zu einem Projekt → Portfolio updated automatisch
- GitHub Copilot Agents können projekt-spezifisch arbeiten
- Alles ist dokumentiert und versioniert

Siehe [PROJECT_REPOS_SETUP.md](../PROJECT_REPOS_SETUP.md) für Details!
