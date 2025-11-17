# 🔄 SUBMODULE UPDATE WORKFLOW

## 🎯 Zwei Wege Updates auf die Website zu bringen

### ⚡ Automatisch (EMPFOHLEN)
Push in Projekt-Repo → Automatisches Portfolio-Update → Auto-Deploy
*(Erfordert einmalige Einrichtung pro Projekt-Repo)*

### 🔧 Manuell  
Push in Projekt-Repo → Manuelles Submodule-Update → Push → Auto-Deploy

---

## Wie kommen Updates auf die Website?

### Szenario 1: Du änderst was im PORTFOLIO REPO (MaxeLBerger.github.io)

```bash
# Im Portfolio Repo
cd MaxeLBerger.github.io
# Ändere HTML/CSS/JS files
git add .
git commit -m "Update portfolio design"
git push
```

** GitHub Actions baut AUTOMATISCH** und deployed auf maximilianhaak.de

---

### Szenario 2: Du änderst was im PROJEKT REPO (z.B. AgeOfMax)

```bash
# Im ORIGINAL AgeOfMax Repo arbeiten
cd AgeOfMax
# Ändere Code, füge Features hinzu
git add .
git commit -m "Add new tower type"
git push origin main
```

** WICHTIG: Das Update ist NOCH NICHT auf der Website!**

Um es auf die Website zu bringen:

```bash
# Zurück zum Portfolio Repo
cd ../MaxeLBerger.github.io

# Submodule auf neueste Version updaten
git submodule update --remote AgeOfMax

# Änderung commiten
git add AgeOfMax
git commit -m "Update AgeOfMax to latest version"
git push
```

** JETZT baut GitHub Actions automatisch und deployed!**

---

### ⚡ Szenario 3: AUTOMATISCHES UPDATE (Einmal einrichten, dann automatisch!)

**Siehe die detaillierte Anleitung in [PROJECT_REPOS_SETUP.md](PROJECT_REPOS_SETUP.md)!**

**Kurzversion:**

1. In jedem Projekt-Repo (AgeOfMax, FireCastle, AuTuneOnline) erstelle `.github/workflows/update-portfolio.yml`:

```yaml
name: Update Portfolio on Push

on:
  push:
    branches: [ main ]

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
          client-payload: '{"submodule": "AgeOfMax"}'  # Projektname anpassen!
```

2. GitHub Personal Access Token erstellen mit `repo` scope
3. In jedem Projekt-Repo: Settings → Secrets → `PORTFOLIO_UPDATE_TOKEN` hinzufügen
4. Optional: Agent-Konfiguration in `.github/agents/project-agent.md` hinzufügen

**Dann:**
```bash
# In AgeOfMax arbeiten
git add .
git commit -m "Add feature"
git push
# → Portfolio updated AUTOMATISCH! 🎉
```

**📖 Für die vollständige Anleitung mit Agent-Konfigurationen siehe [PROJECT_REPOS_SETUP.md](PROJECT_REPOS_SETUP.md)**

---

## Schnellreferenz: Alle Submodules updaten

```powershell
# Im Portfolio Repo
cd MaxeLBerger.github.io

# ALLE Submodules auf neueste Version
git submodule update --remote --merge

# Commiten
git add .
git commit -m "Update all projects to latest versions"
git push
```

---

## Automatisierung mit Script (Optional)

Erstelle `update-projects.ps1`:

```powershell
# Update all submodules
Write-Host "Updating submodules to latest versions..."
git submodule update --remote --merge

# Check if there are changes
$status = git status --porcelain
if ($status) {
    Write-Host "Changes detected, committing..."
    git add .
    git commit -m "chore: Update all projects to latest versions"
    git push
    Write-Host " Projects updated and deployed!"
} else {
    Write-Host " All projects already up-to-date"
}
```

Dann einfach: `.\update-projects.ps1`

---

## ⚡ Quick Commands

| Aktion | Command |
|--------|---------|
| Portfolio ändern | `git add . && git commit -m "msg" && git push` |
| Projekt updaten (einzeln) MANUELL | `git submodule update --remote ProjectName` |
| Alle Projekte updaten MANUELL | `git submodule update --remote --merge` |
| Projekt updaten AUTOMATISCH | Workflow im Projekt-Repo einrichten (siehe oben) |
| Manual Trigger (Portfolio Repo) | Actions → Auto Update Submodules → Run workflow |
| Status checken | `git status` |
| Build Status | https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions |

---

## 🎯 Zusammenfassung

### Manueller Workflow:
**Portfolio-Änderungen** → push → Auto-Deploy ✅

**Projekt-Änderungen** → push im Original-Repo → UPDATE Submodule im Portfolio → push → Auto-Deploy ✅

### Automatischer Workflow (nach Setup):
**Portfolio-Änderungen** → push → Auto-Deploy ✅

**Projekt-Änderungen** → push im Original-Repo → **AUTOMATISCH** Portfolio-Update → Auto-Deploy ✅🎉

---

## 📋 Setup-Checklist für Auto-Updates:

Für **jedes Projekt-Repo** das automatisch updaten soll:

- [ ] Personal Access Token erstellen (GitHub Settings → Developer settings → Tokens)
- [ ] Token als Secret im Projekt-Repo hinzufügen (`PORTFOLIO_UPDATE_TOKEN`)
- [ ] `.github/workflows/update-portfolio.yml` im Projekt-Repo erstellen
- [ ] Workflow-Datei anpassen (Submodule-Name ändern!)
- [ ] Testen: Push zum Projekt → Portfolio sollte auto-updaten

**Portfolio-Repo hat bereits die empfangende Action!** ✅

---

GitHub Actions Build Log: https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions
Live Website: https://maximilianhaak.de
