# GitHub Pages Setup für Projekte

Diese Anleitung zeigt dir, wie du GitHub Pages für deine Projekt-Repositories aktivierst, damit die Live-Demos funktionieren.

## ✅ Schritt 1: AgeOfMax aktivieren

### Repository: https://github.com/MaxeLBerger/AgeOfMax

1. **Öffne die Repository-Settings:**
   - Gehe zu https://github.com/MaxeLBerger/AgeOfMax
   - Klicke auf "Settings" (oben rechts)

2. **GitHub Pages aktivieren:**
   - Scrolle zur "Pages" Section (linke Sidebar)
   - Bei "Source" wähle: **main** branch
   - Bei Folder wähle: **/ (root)** oder **/docs** (je nachdem wo dein Build-Output ist)
   - Klicke "Save"

3. **Build-Prozess (falls nötig):**
   ```bash
   cd AgeOfMax
   npm run build
   # Output sollte in dist/ oder build/ landen
   ```

4. **Prüfe die URL:**
   - Nach wenigen Minuten ist deine Seite verfügbar unter:
   - https://maxelberger.github.io/AgeOfMax

## ✅ Schritt 2: FireCastle aktivieren

### Repository: https://github.com/MaxeLBerger/FireCastle

1. **Settings → Pages**
2. **Source:** main branch → **/ (root)**
3. **URL:** https://maxelberger.github.io/FireCastle

**Wichtig:** FireCastle ist ein Node.js Backend-Projekt. Für GitHub Pages brauchst du:
- Eine `index.html` im Root oder
- Die Website-Files (HTML/CSS/JS) im `/pages` Ordner

## ✅ Schritt 3: AuTuneOnline aktivieren

### Repository: https://github.com/MaxeLBerger/AuTuneOnline

1. **Settings → Pages**
2. **Source:** main branch → **/public** (oder wo deine HTML-Files sind)
3. **URL:** https://maxelberger.github.io/AuTuneOnline

## ✅ Schritt 4: SoundofLvke (schon aktiv!)

### Repository: https://github.com/SoundofLvke/SoundofLvke.github.io

✅ **Bereits aktiv!** User-Pages (.github.io) sind automatisch aktiv.
- URL: https://soundoflvke.github.io

## 🔧 Alternative: GitHub Actions für Build

Falls deine Projekte einen Build-Schritt brauchen (TypeScript, Vite, etc.):

### Erstelle `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist  # oder ./build je nach Projekt
```

## 📋 Schnell-Checkliste

- [ ] AgeOfMax: GitHub Pages aktiviert
- [ ] FireCastle: GitHub Pages aktiviert  
- [ ] AuTuneOnline: GitHub Pages aktiviert
- [ ] SoundofLvke: ✅ Bereits aktiv
- [ ] Alle Links auf Portfolio-Seite getestet
- [ ] Alle Detailseiten funktionieren

## 🌐 Custom Domain (Optional)

Falls du Subdomains verwenden möchtest:

### Bei IONOS:
1. **DNS-Einstellungen öffnen**
2. **CNAME Records erstellen:**
   ```
   ageofmax.maximilianhaak.de → maxelberger.github.io
   firecastle.maximilianhaak.de → maxelberger.github.io
   autune.maximilianhaak.de → maxelberger.github.io
   ```

### In GitHub:
1. **In jedem Repository:**
   - Settings → Pages → Custom domain
   - Eingeben: `ageofmax.maximilianhaak.de` (entsprechend)
   - "Enforce HTTPS" aktivieren

2. **CNAME-Datei erstellen:**
   - Im Root des Repos eine Datei `CNAME` erstellen
   - Inhalt: `ageofmax.maximilianhaak.de`

## 🚀 Testing

Nach der Aktivierung:

1. **Warte 2-5 Minuten** (GitHub Pages Build-Zeit)
2. **Teste die URLs:**
   - https://maxelberger.github.io/AgeOfMax
   - https://maxelberger.github.io/FireCastle
   - https://maxelberger.github.io/AuTuneOnline
   - https://soundoflvke.github.io

3. **Teste die Portfolio-Links:**
   - Öffne https://maximilianhaak.de
   - Klicke auf "Live Demo" Buttons
   - Prüfe ob alle Links funktionieren

## ❌ Troubleshooting

### "404 - Page not found"
- Prüfe ob GitHub Pages aktiviert ist
- Prüfe den Branch (muss `main` oder `master` sein)
- Prüfe ob `index.html` im richtigen Ordner liegt

### "Build failed"
- Prüfe GitHub Actions Tab
- Prüfe ob alle Dependencies installiert sind
- Prüfe `package.json` Build-Script

### "Site not updating"
- GitHub Pages Cache: Warte 5-10 Minuten
- Lösche Browser-Cache
- Force-Push zum Repository

## 📧 Fertig!

Sobald alle GitHub Pages aktiviert sind, funktionieren alle Links auf deiner Portfolio-Seite!

**Deine Projekte sind dann erreichbar unter:**
- 🎮 Age of Max: https://maxelberger.github.io/AgeOfMax
- 🏰 FireCastle: https://maxelberger.github.io/FireCastle
- 🎵 AuTune: https://maxelberger.github.io/AuTuneOnline
- 🎶 SoundofLvke: https://soundoflvke.github.io
- 🤖 Albert: https://maximilianhaak.de/projects/albert.html
