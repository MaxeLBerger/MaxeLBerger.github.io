# Screenshots Quick Start / Schnellstart

## 🇩🇪 Deutsch

### Schritt 1: Platzhalter zum Testen (Optional)
```bash
pip install pillow
python create-placeholder-images.py
```

### Schritt 2: Lokal testen
```bash
python -m http.server 8000
```
Öffne: http://localhost:8000/projects/

### Schritt 3: Echte Screenshots erstellen

**Alle Projekt-URLs:**
```
Age of Max:        https://maximilianhaak.de/AgeOfMax/
FireCastle:        https://maximilianhaak.de/FireCastle/
AuTune Online:     https://maximilianhaak.de/AuTuneOnline/
Casino Idle Slots: https://maximilianhaak.de/CasinoIdleSlots/
SoundofLvke:       https://soundoflvke.github.io
Albert:            (selbst erstellen)
```

**Tool nutzen:**
- Windows: `Win + Shift + S`
- macOS: `Cmd + Shift + 4`
- Browser: F12 → Cmd/Ctrl+Shift+P → "screenshot"

**Format:** PNG, 1920x1080, < 500KB

### Schritt 4: Speichern & Pushen
```bash
# Verzeichnis erstellen
mkdir -p res/screenshots

# Screenshots mit korrekten Namen speichern
# (siehe SCREENSHOTS_TODO.md für alle Namen)

# Commit
git add res/screenshots/
git commit -m "Add project screenshots"
git push
```

### Benötigte Screenshots (27):
- [ ] 6x Age of Max
- [ ] 4x FireCastle
- [ ] 4x AuTune Online
- [ ] 6x Casino Idle Slots
- [ ] 4x SoundofLvke
- [ ] 3x Albert

**Details:** Siehe `SCREENSHOTS_TODO.md`

---

## 🇬🇧 English

### Step 1: Create Placeholders for Testing (Optional)
```bash
pip install pillow
python create-placeholder-images.py
```

### Step 2: Test Locally
```bash
python -m http.server 8000
```
Visit: http://localhost:8000/projects/

### Step 3: Take Real Screenshots

**All Project URLs:**
```
Age of Max:        https://maximilianhaak.de/AgeOfMax/
FireCastle:        https://maximilianhaak.de/FireCastle/
AuTune Online:     https://maximilianhaak.de/AuTuneOnline/
Casino Idle Slots: https://maximilianhaak.de/CasinoIdleSlots/
SoundofLvke:       https://soundoflvke.github.io
Albert:            (create yourself)
```

**Tools:**
- Windows: `Win + Shift + S`
- macOS: `Cmd + Shift + 4`
- Browser: F12 → Cmd/Ctrl+Shift+P → "screenshot"

**Format:** PNG, 1920x1080, < 500KB

### Step 4: Save & Push
```bash
# Create directory
mkdir -p res/screenshots

# Save screenshots with correct names
# (see SCREENSHOTS_TODO.md for all names)

# Commit
git add res/screenshots/
git commit -m "Add project screenshots"
git push
```

### Required Screenshots (27):
- [ ] 6x Age of Max
- [ ] 4x FireCastle
- [ ] 4x AuTune Online
- [ ] 6x Casino Idle Slots
- [ ] 4x SoundofLvke
- [ ] 3x Albert

**Details:** See `SCREENSHOTS_GUIDE.md`

---

## 📋 All Screenshot Filenames

### Age of Max (6)
```
age-of-max-gameplay-early.png
age-of-max-units-upgrades.png
age-of-max-turret-placement.png
age-of-max-boss-fight.png
age-of-max-debug-overlay.png
age-of-max-mobile-view.png
```

### FireCastle (4)
```
firecastle-clan-overview.png
firecastle-player-stats.png
firecastle-war-status.png
firecastle-api-response.png
```

### AuTune Online (4)
```
autune-visualizer-bars.png
autune-particle-effects.png
autune-bpm-detection.png
autune-theme-variations.png
```

### Casino Idle Slots (6)
```
casino-idle-slots-main-game.png
casino-idle-slots-upgrades.png
casino-idle-slots-achievements.png
casino-idle-slots-prestige.png
casino-idle-slots-leaderboard.png
casino-idle-slots-slot-machines.png
```

### SoundofLvke (4)
```
soundoflvke-homepage.png
soundoflvke-beat-shop.png
soundoflvke-portfolio.png
soundoflvke-contact.png
```

### Albert (3)
```
albert-neural-network.png
albert-fitness-progression.png
albert-mutations-heatmap.png
```

---

## 🔗 Full Documentation

- **SCREENSHOTS_TODO.md** - Deutsche Schnellanleitung mit Checkliste
- **SCREENSHOTS_GUIDE.md** - Comprehensive English guide with details
- **SCREENSHOT_IMPLEMENTATION_SUMMARY.md** - Complete German summary

---

## ⚡ One-Liner Commands

```bash
# Create placeholders and test
pip install pillow && python create-placeholder-images.py && python -m http.server 8000

# After taking screenshots
mkdir -p res/screenshots && git add res/screenshots/ && git commit -m "Add screenshots" && git push
```

---

**Status:** ✅ Ready  
**Updated:** 2025-01-18
