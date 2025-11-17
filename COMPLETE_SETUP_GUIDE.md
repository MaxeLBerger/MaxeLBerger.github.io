# 🚀 Complete Setup Guide - Portfolio Auto-Update System

Diese Anleitung führt dich Schritt für Schritt durch die komplette Einrichtung des automatischen Portfolio-Update-Systems.

## 🎯 Was wird eingerichtet?

Ein vollautomatisches System, bei dem:
1. Push zu einem Projekt-Repo (AgeOfMax, FireCastle, AuTuneOnline, CasinoIdleSlots)
2. Automatisch das Portfolio-Repo updated
3. Automatisch neu gebaut und deployed wird
4. Änderungen in 3-5 Minuten live sind

**Plus:** GitHub Copilot Agents für intelligente Code-Assistenz in jedem Projekt!

## 📋 Voraussetzungen

- [x] Portfolio-Repository (MaxeLBerger.github.io) ist bereits konfiguriert ✅
- [ ] GitHub Personal Access Token (wird erstellt)
- [ ] Zugriff auf alle vier Projekt-Repositories

## 🔧 Setup-Schritte

### Schritt 1: GitHub Personal Access Token erstellen

Dieser Token wird in allen drei Projekt-Repos benötigt.

1. Gehe zu GitHub → Settings (dein Profil) → Developer settings
2. Personal access tokens → Tokens (classic)
3. "Generate new token (classic)"
4. **Token-Einstellungen:**
   - Note: `Portfolio Auto-Update Token`
   - Expiration: `No expiration` (oder nach Bedarf)
   - Scopes: ✅ **repo** (Full control of private repositories)
5. Klicke "Generate token"
6. **⚠️ WICHTIG:** Kopiere den Token SOFORT! Er wird nur einmal angezeigt!
7. Speichere ihn temporär in einem sicheren Notiz-Tool

---

### Schritt 2: AgeOfMax Repository Setup

#### 2.1 Workflow-Datei erstellen

1. Gehe zu https://github.com/MaxeLBerger/AgeOfMax
2. Navigiere zu `.github/workflows/` (oder erstelle den Ordner)
3. Erstelle neue Datei: `update-portfolio.yml`
4. Füge folgenden Inhalt ein:

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

5. Commit: `Add auto-update workflow`

#### 2.2 Agent-Konfiguration erstellen

1. Im selben Repository, navigiere zu `.github/agents/`
2. Erstelle neue Datei: `project-agent.md`
3. Kopiere den Inhalt aus [PROJECT_TEMPLATES.md](PROJECT_TEMPLATES.md) - AgeOfMax Agent Section
4. Commit: `Add GitHub Copilot agent configuration`

#### 2.3 Secret konfigurieren

1. Gehe zu Settings → Secrets and variables → Actions
2. Klicke "New repository secret"
3. **Name:** `PORTFOLIO_UPDATE_TOKEN`
4. **Value:** [Dein Token aus Schritt 1 einfügen]
5. Klicke "Add secret"

✅ **AgeOfMax ist fertig!**

---

### Schritt 3: FireCastle Repository Setup

Wiederhole die gleichen Schritte wie bei AgeOfMax, aber mit dem FireCastle-spezifischen Workflow:

#### 3.1 Workflow-Datei

`.github/workflows/update-portfolio.yml`:
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

**Wichtig:** Der `client-payload` muss `"FireCastle"` enthalten!

#### 3.2 Agent-Konfiguration

`.github/agents/project-agent.md` - Kopiere aus PROJECT_TEMPLATES.md (FireCastle Section)

#### 3.3 Secret konfigurieren

Genau wie bei AgeOfMax: `PORTFOLIO_UPDATE_TOKEN` mit demselben Token

✅ **FireCastle ist fertig!**

---

### Schritt 4: AuTuneOnline Repository Setup

Wiederhole die gleichen Schritte mit dem AuTuneOnline-spezifischen Workflow:

#### 4.1 Workflow-Datei

`.github/workflows/update-portfolio.yml`:
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

**Wichtig:** Der `client-payload` muss `"AuTuneOnline"` enthalten!

#### 4.2 Agent-Konfiguration

`.github/agents/project-agent.md` - Kopiere aus PROJECT_TEMPLATES.md (AuTuneOnline Section)

#### 4.3 Secret konfigurieren

Genau wie bei den anderen: `PORTFOLIO_UPDATE_TOKEN`

✅ **AuTuneOnline ist fertig!**

---

### Schritt 5: CasinoIdleSlots Repository Setup

#### 5.1 Workflow-Datei erstellen

`.github/workflows/update-portfolio.yml`:
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

**Wichtig:** Der `client-payload` muss `"CasinoIdleSlots"` enthalten!

#### 5.2 Agent-Konfiguration

`.github/agents/project-agent.md` - Kopiere aus PROJECT_TEMPLATES.md (CasinoIdleSlots Section)

#### 5.3 Secret konfigurieren

Genau wie bei den anderen: `PORTFOLIO_UPDATE_TOKEN`

✅ **CasinoIdleSlots ist fertig!**

---

## 🧪 Testen des kompletten Systems

### Test 1: AgeOfMax

```bash
cd AgeOfMax
echo "# Test $(date)" >> README.md
git add README.md
git commit -m "test: Auto-update trigger"
git push
```

**Erwartetes Ergebnis:**
1. ✅ AgeOfMax Actions zeigt "Update Portfolio on Push" (grün)
2. ✅ Portfolio Actions zeigt "Auto Update Submodules" (grün)
3. ✅ Portfolio Actions zeigt "Deploy Portfolio" (grün)
4. ✅ Nach 3-5 Minuten ist die Änderung live

**Prüfe:**
- https://github.com/MaxeLBerger/AgeOfMax/actions
- https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions

### Test 2: FireCastle

```bash
cd FireCastle
echo "# Test $(date)" >> README.md
git add README.md
git commit -m "test: Auto-update trigger"
git push
```

### Test 3: AuTuneOnline

```bash
cd AuTuneOnline
echo "# Test $(date)" >> README.md
git add README.md
git commit -m "test: Auto-update trigger"
git push
```

### Test 4: CasinoIdleSlots

```bash
cd CasinoIdleSlots
echo "# Test $(date)" >> README.md
git add README.md
git commit -m "test: Auto-update trigger"
git push
```

---

## 🎉 Erfolgskriterien

Nach vollständigem Setup sollte gelten:

### ✅ Checkliste

- [ ] Personal Access Token erstellt und gespeichert
- [ ] AgeOfMax: Workflow + Agent + Secret konfiguriert
- [ ] FireCastle: Workflow + Agent + Secret konfiguriert
- [ ] AuTuneOnline: Workflow + Agent + Secret konfiguriert
- [ ] CasinoIdleSlots: Workflow + Agent + Secret konfiguriert
- [ ] Test-Commits in allen vier Repos erfolgreich
- [ ] Portfolio wird automatisch aktualisiert
- [ ] Website zeigt Änderungen nach 3-5 Minuten

### 📊 Dashboard Links

**Projekt Actions:**
- [AgeOfMax Actions](https://github.com/MaxeLBerger/AgeOfMax/actions)
- [FireCastle Actions](https://github.com/MaxeLBerger/FireCastle/actions)
- [AuTuneOnline Actions](https://github.com/MaxeLBerger/AuTuneOnline/actions)
- [CasinoIdleSlots Actions](https://github.com/MaxeLBerger/casino-idle-slots/actions)

**Portfolio Actions:**
- [Portfolio Actions](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions)

**Live Website:**
- [maximilianhaak.de](https://maximilianhaak.de)

---

## 🔍 Troubleshooting

### Problem: "Workflow läuft nicht"

**Lösung:**
- Prüfe, ob die Datei im korrekten Pfad ist: `.github/workflows/update-portfolio.yml`
- Prüfe, ob der Branch `main` heißt (nicht `master`)
- Prüfe GitHub Actions Tab → sollte aktiviert sein

### Problem: "Repository dispatch failed"

**Lösung:**
- Secret `PORTFOLIO_UPDATE_TOKEN` fehlt oder ist falsch
- Token hat nicht den `repo` scope
- Token ist abgelaufen

### Problem: "Submodule wird nicht aktualisiert"

**Lösung:**
- Prüfe, ob der `client-payload` den korrekten Projektnamen enthält
- Projektnamen sind case-sensitive: `AgeOfMax`, `FireCastle`, `AuTuneOnline`
- Prüfe Portfolio-Repo Actions für Fehlermeldungen

### Problem: "Deploy schlägt fehl"

**Lösung:**
- Prüfe Build-Logs im Portfolio-Repo
- Stelle sicher, dass alle Projekt-Dependencies installiert werden können
- Prüfe, ob Build-Artefakte im richtigen Ordner landen

---

## 📚 Weitere Ressourcen

- [PROJECT_REPOS_SETUP.md](PROJECT_REPOS_SETUP.md) - Detaillierte technische Dokumentation
- [PROJECT_TEMPLATES.md](PROJECT_TEMPLATES.md) - Alle Code-Templates zum Kopieren
- [WORKFLOW_GUIDE.md](WORKFLOW_GUIDE.md) - Workflow-Übersicht und Quick Commands
- [README.md](README.md) - Repository-Hauptdokumentation

---

## 🎯 Quick Reference

**Nach dem Setup:**

| Aktion | Ergebnis |
|--------|----------|
| Push zu AgeOfMax | Automatisches Portfolio-Update + Deploy |
| Push zu FireCastle | Automatisches Portfolio-Update + Deploy |
| Push zu AuTuneOnline | Automatisches Portfolio-Update + Deploy |
| Push zu Portfolio | Direkt Deploy (kein Submodule-Update) |

**Zeit bis Live:** 3-5 Minuten nach Push! 🚀

**GitHub Copilot:** Nutzt automatisch die projekt-spezifischen Agents für intelligente Code-Assistenz!

---

**Setup-Anleitung erstellt:** 2025-01-17  
**Nächste Schritte:** Folge dieser Anleitung Schritt für Schritt und hake jeden Punkt ab!
