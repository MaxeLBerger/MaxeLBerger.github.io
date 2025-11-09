#  SETUP REQUIRED: Personal Access Token

##  Was ich gemacht habe:

1.  Workflow in **AgeOfMax** Repo hinzugefügt und gepusht
2.  Workflow in **FireCastle** Repo hinzugefügt und gepusht
3.  Workflow in **AuTuneOnline** Repo hinzugefügt und gepusht
4.  Portfolio Repo empfängt auto-updates
5.  README.md updated
6.  WORKFLOW_GUIDE.md updated

##  Was DU machen musst (5 Minuten):

### Schritt 1: Token erstellen

1. Gehe zu: https://github.com/settings/tokens?type=beta
2. Klicke **"Generate new token"**  **"Generate new token (classic)"**
3. Name: **"Portfolio Auto-Update"**
4. Expiration: **No expiration** (oder 1 Jahr)
5. Wähle Scopes:
   -  **repo** (alle 8 Unterpunkte werden automatisch aktiviert)
6. Klicke **"Generate token"**
7. **KOPIERE DEN TOKEN** (wird nur einmal angezeigt!)
   - Format: \ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\

---

### Schritt 2: Token in Projekt-Repos hinzufügen

**Du musst das für JEDES Projekt-Repo machen:**

#### AgeOfMax:
1. https://github.com/MaxeLBerger/AgeOfMax/settings/secrets/actions
2. Klicke **"New repository secret"**
3. Name: \PORTFOLIO_UPDATE_TOKEN\
4. Secret: *Dein kopierter Token*
5. Klicke **"Add secret"**

#### FireCastle:
1. https://github.com/MaxeLBerger/FireCastle/settings/secrets/actions
2. Klicke **"New repository secret"**
3. Name: \PORTFOLIO_UPDATE_TOKEN\
4. Secret: *Derselbe Token*
5. Klicke **"Add secret"**

#### AuTuneOnline:
1. https://github.com/MaxeLBerger/AuTuneOnline/settings/secrets/actions
2. Klicke **"New repository secret"**
3. Name: \PORTFOLIO_UPDATE_TOKEN\
4. Secret: *Derselbe Token*
5. Klicke **"Add secret"**

---

### Schritt 3: Testen!

`powershell
# Gehe in ein Projekt-Repo
cd C:\Users\maxih\Documents\Repositories\MaximilianHaak\AgeOfMax

# Mache eine kleine Änderung (z.B. README editieren)
notepad README.md
# Füge eine Zeile hinzu, speichern

# Commit und push
git add .
git commit -m "Test auto-update"
git push

# Jetzt warte 30 Sekunden und check:
# 1. https://github.com/MaxeLBerger/AgeOfMax/actions
#     Sollte "Update Portfolio on Push" Workflow zeigen
#
# 2. https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions
#     Sollte "Auto Update Submodules" UND "Deploy Portfolio" zeigen
#
# 3. Nach 2-3 Minuten: https://maximilianhaak.de/AgeOfMax/
#     Sollte mit neuem Build live sein!
`

---

##  Nach dem Setup:

**Workflow:**
1. Push zu AgeOfMax/FireCastle/AuTuneOnline
2.  AUTOMATISCH: Portfolio updated
3.  AUTOMATISCH: Website deployed
4. **Fertig in 3 Minuten!**

**Kein manuelles \git submodule update\ mehr nötig!** 

---

##  Status:

| Item | Status |
|------|--------|
| Portfolio Auto-Update Workflow |  Erstellt |
| AgeOfMax Workflow |  Gepusht |
| FireCastle Workflow |  Gepusht |
| AuTuneOnline Workflow |  Gepusht |
| README updated |  Dokumentiert |
| WORKFLOW_GUIDE updated |  Komplett |
| **Token Setup** |  **BRAUCHT DICH!** |

---

##  Quick Links:

- **Token erstellen**: https://github.com/settings/tokens?type=beta
- **AgeOfMax Secrets**: https://github.com/MaxeLBerger/AgeOfMax/settings/secrets/actions
- **FireCastle Secrets**: https://github.com/MaxeLBerger/FireCastle/settings/secrets/actions
- **AuTuneOnline Secrets**: https://github.com/MaxeLBerger/AuTuneOnline/settings/secrets/actions

---

**Nach Token-Setup ist alles VOLLAUTOMATISCH!** 
