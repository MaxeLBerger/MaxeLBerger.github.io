# Screenshots - Nächste Schritte

## ✅ Was wurde bereits gemacht

Alle HTML-Dateien der Projektseiten wurden aktualisiert und sind bereit für Screenshots:

1. **age-of-max.html** - 6 Platzhalter für Screenshots hinzugefügt
2. **firecastle.html** - 4 Platzhalter für Screenshots hinzugefügt
3. **autune-online.html** - 4 Platzhalter für Screenshots hinzugefügt
4. **casino-idle-slots.html** - 6 Platzhalter für Screenshots hinzugefügt (neue Gallery-Sektion)
5. **soundoflvke.html** - 4 Platzhalter für Screenshots hinzugefügt (neue Gallery-Sektion)
6. **albert.html** - 3 zusätzliche Platzhalter für Screenshots hinzugefügt

**Weitere Änderungen:**
- CSS-Styles für Bildergalerien in `projects/style.css` hinzugefügt
- Umfassende Anleitung in `SCREENSHOTS_GUIDE.md` erstellt

## 📋 Was du jetzt tun musst

### Option A: Temporäre Platzhalter erstellen (zum Testen)

Wenn du die Seiten erstmal testen möchtest, kannst du temporäre Platzhalter-Bilder erstellen:

**Mit Python (empfohlen):**
```bash
# Pillow installieren falls nötig
pip install pillow

# Platzhalter erstellen
python create-placeholder-images.py
```

**Mit ImageMagick:**
```bash
# ImageMagick installieren (falls nötig)
# Ubuntu/Debian: sudo apt-get install imagemagick
# macOS: brew install imagemagick

# Platzhalter erstellen
chmod +x create-placeholder-images.sh
./create-placeholder-images.sh
```

### Option B: Echte Screenshots erstellen (empfohlen für Production)

### Schritt 1: Screenshot-Verzeichnis erstellen

```bash
mkdir -p res/screenshots
```

### Schritt 2: Screenshots erstellen

Besuche jedes Projekt und erstelle Screenshots gemäß der Anleitung in `SCREENSHOTS_GUIDE.md`.

**Schnellübersicht - Benötigte Screenshots (27 insgesamt):**

#### Age of Max (6 Screenshots)
Live: https://maximilianhaak.de/AgeOfMax/

1. `age-of-max-gameplay-early.png` - Early Wave Gameplay
2. `age-of-max-units-upgrades.png` - Einheiten & Upgrades Menü
3. `age-of-max-turret-placement.png` - Turret Platzierung
4. `age-of-max-boss-fight.png` - Boss-Kampf
5. `age-of-max-debug-overlay.png` - Debug Overlay (F2)
6. `age-of-max-mobile-view.png` - Mobile Ansicht

#### FireCastle (4 Screenshots)
Live: https://maximilianhaak.de/FireCastle/

1. `firecastle-clan-overview.png` - Clan Übersicht
2. `firecastle-player-stats.png` - Spieler Statistiken
3. `firecastle-war-status.png` - Kriegsstatus
4. `firecastle-api-response.png` - API Response Beispiel

#### AuTune Online (4 Screenshots)
Live: https://maximilianhaak.de/AuTuneOnline/

1. `autune-visualizer-bars.png` - Visualizer mit Frequenzbars
2. `autune-particle-effects.png` - Partikeleffekte
3. `autune-bpm-detection.png` - BPM Detection Interface
4. `autune-theme-variations.png` - Theme Variationen

#### Casino Idle Slots (6 Screenshots)
Live: https://maximilianhaak.de/CasinoIdleSlots/

1. `casino-idle-slots-main-game.png` - Hauptspiel Interface
2. `casino-idle-slots-upgrades.png` - Upgrades Menü
3. `casino-idle-slots-achievements.png` - Achievements Panel
4. `casino-idle-slots-prestige.png` - Prestige System
5. `casino-idle-slots-leaderboard.png` - Leaderboard
6. `casino-idle-slots-slot-machines.png` - Verschiedene Slot Machines

#### SoundofLvke (4 Screenshots)
Live: https://soundoflvke.github.io

1. `soundoflvke-homepage.png` - Homepage
2. `soundoflvke-beat-shop.png` - Beat Shop
3. `soundoflvke-portfolio.png` - Portfolio Sektion
4. `soundoflvke-contact.png` - Kontakt Seite

#### Albert (3 Screenshots)
Falls verfügbar:

1. `albert-neural-network.png` - Neuronales Netzwerk Visualisierung
2. `albert-fitness-progression.png` - Fitness-Progression Graph
3. `albert-mutations-heatmap.png` - Mutations-Heatmap

### Schritt 3: Screenshots speichern

Speichere alle Screenshots im Verzeichnis `res/screenshots/` mit den **exakten Dateinamen** wie oben angegeben.

### Schritt 4: Commit und Push

```bash
git add res/screenshots/
git commit -m "Add screenshots for all projects"
git push
```

## 📸 Screenshot-Empfehlungen

**Format:** PNG  
**Auflösung:** 1920x1080 (Desktop) oder 375x812 (Mobile)  
**Dateigröße:** < 500KB pro Bild (empfohlen)  
**Aspect Ratio:** 16:9 bevorzugt

### Tools zum Screenshot erstellen:

**Windows:**
- Snipping Tool (Win + Shift + S)
- Snip & Sketch

**macOS:**
- Command + Shift + 4 (Bereich auswählen)
- Command + Shift + 5 (Screenshot-Tool)

**Linux:**
- Flameshot
- Spectacle
- Shutter

**Browser DevTools:**
- Firefox: Rechtsklick → "Screenshot aufnehmen"
- Chrome: DevTools (F12) → Ctrl+Shift+P → "Capture screenshot"

## 🎨 Tipps für gute Screenshots

1. **Repräsentativer Zustand**: Zeige die App in einem sinnvollen Zustand (z.B. Spiel mit gespawnten Einheiten)
2. **Sauberes UI**: Schließe unnötige Browser-Tabs
3. **Keine persönlichen Daten**: Keine sensiblen Informationen zeigen
4. **Gutes Timing**: Bei animierten Inhalten interessante Momente erfassen
5. **Konsistente Qualität**: Ähnliche Beleuchtung/Theme über Screenshots des gleichen Projekts

## 🔍 Testen

Nach dem Hinzufügen der Screenshots:

```bash
# Lokal testen
python -m http.server 8000
# oder
npx serve .
```

Dann besuche:
- http://localhost:8000/projects/age-of-max.html
- http://localhost:8000/projects/firecastle.html
- http://localhost:8000/projects/autune-online.html
- http://localhost:8000/projects/casino-idle-slots.html
- http://localhost:8000/projects/soundoflvke.html
- http://localhost:8000/projects/albert.html

Überprüfe, ob alle Bilder korrekt laden.

## ℹ️ Weitere Informationen

Siehe `SCREENSHOTS_GUIDE.md` für:
- Detaillierte Anweisungen für jeden Screenshot
- Technische Spezifikationen
- Optimierungs-Tipps
- Troubleshooting

---

**Status**: Bereit für Screenshots ✅  
**HTML-Struktur**: Vollständig ✅  
**CSS-Styles**: Hinzugefügt ✅  
**Dokumentation**: Erstellt ✅  

**Nächster Schritt**: Screenshots erstellen und hinzufügen 📸
