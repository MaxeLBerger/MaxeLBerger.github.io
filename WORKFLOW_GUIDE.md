#  SUBMODULE UPDATE WORKFLOW

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

##  Quick Commands

| Aktion | Command |
|--------|---------|
| Portfolio ändern | `git add . && git commit -m "msg" && git push` |
| Projekt updaten (einzeln) | `git submodule update --remote ProjectName` |
| Alle Projekte updaten | `git submodule update --remote --merge` |
| Status checken | `git status` |
| Build Status | https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions |

---

##  Zusammenfassung

**Portfolio-Änderungen**  push  Auto-Deploy 

**Projekt-Änderungen**  push im Original-Repo  UPDATE Submodule im Portfolio  push  Auto-Deploy 

**Der Submodule-Update Schritt ist essentiell!**

---

GitHub Actions Build Log: https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions
Live Website: https://maximilianhaak.de
