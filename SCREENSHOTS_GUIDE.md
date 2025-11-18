# Screenshots Guide

This document provides instructions for taking and adding screenshots for all portfolio projects.

## Directory Structure

All screenshots should be saved in: `/res/screenshots/`

**IMPORTANT: You must create this directory first!**

```bash
# From the repository root, run:
mkdir -p res/screenshots

# After creating the directory, you can add screenshots there
```

The directory does not exist yet and will need to be created before adding screenshot files.

## Required Screenshots by Project

### 1. Age of Max (Tower Defense Game)

**Project URL:** https://maximilianhaak.de/AgeOfMax/

**Screenshots needed (6 total):**

1. **age-of-max-gameplay-early.png**
   - Description: Early wave gameplay showing units attacking
   - What to capture: Game in action during first few waves, showing UI, units, and bases
   
2. **age-of-max-units-upgrades.png**
   - Description: Units menu showing available units and upgrade options
   - What to capture: Focus on the unit selection interface with epoch-specific units
   
3. **age-of-max-turret-placement.png**
   - Description: Turret placement interface
   - What to capture: Show the turret selection and placement mechanics
   
4. **age-of-max-boss-fight.png**
   - Description: Boss battle in progress
   - What to capture: Dramatic moment during a boss fight with multiple units engaged
   
5. **age-of-max-debug-overlay.png**
   - Description: Debug overlay (F2 key) showing performance metrics
   - What to capture: Game with debug information visible
   
6. **age-of-max-mobile-view.png**
   - Description: Mobile responsive view
   - What to capture: Game running on mobile viewport or with mobile layout

---

### 2. FireCastle (Clash of Clans Website)

**Project URL:** https://maximilianhaak.de/FireCastle/

**Screenshots needed (4 total):**

1. **firecastle-clan-overview.png**
   - Description: Main clan overview page
   - What to capture: Clan statistics, member list, and general information
   
2. **firecastle-player-stats.png**
   - Description: Individual player statistics page
   - What to capture: Detailed player profile with stats, trophies, and achievements
   
3. **firecastle-war-status.png**
   - Description: Clan war status page
   - What to capture: Current war information, attacks, and standings
   
4. **firecastle-api-response.png**
   - Description: API response example (can use browser dev tools or Postman)
   - What to capture: JSON response from one of the API endpoints showing data structure

---

### 3. AuTune Online (Audio Visualizer)

**Project URL:** https://maximilianhaak.de/AuTuneOnline/

**Screenshots needed (4 total):**

1. **autune-visualizer-bars.png**
   - Description: Audio visualizer with frequency bars
   - What to capture: Main visualization with frequency bars active during audio playback
   
2. **autune-particle-effects.png**
   - Description: Particle effects in action
   - What to capture: Particle system reacting to bass frequencies
   
3. **autune-bpm-detection.png**
   - Description: BPM detection interface
   - What to capture: UI showing BPM detection results and tempo information
   
4. **autune-theme-variations.png**
   - Description: Different theme options
   - What to capture: Theme selection menu or split view showing different themes

---

### 4. Casino Idle Slots

**Project URL:** https://maximilianhaak.de/CasinoIdleSlots/

**Screenshots needed (6 total):**

1. **casino-idle-slots-main-game.png**
   - Description: Main game interface
   - What to capture: Primary slot machine view with spin button and coin display
   
2. **casino-idle-slots-upgrades.png**
   - Description: Upgrades menu
   - What to capture: Upgrade shop showing spin power and idle income options
   
3. **casino-idle-slots-achievements.png**
   - Description: Achievements panel
   - What to capture: List of achievements, both locked and unlocked
   
4. **casino-idle-slots-prestige.png**
   - Description: Prestige system interface
   - What to capture: Prestige menu showing requirements and benefits
   
5. **casino-idle-slots-leaderboard.png**
   - Description: Leaderboard view
   - What to capture: Rankings showing top players
   
6. **casino-idle-slots-slot-machines.png**
   - Description: Different slot machine types
   - What to capture: Comparison or showcase of multiple machine types (Classic, Deluxe, Premium, etc.)

---

### 5. SoundofLvke (Music Portfolio)

**Project URL:** https://soundoflvke.github.io

**Screenshots needed (4 total):**

1. **soundoflvke-homepage.png**
   - Description: Homepage/landing page
   - What to capture: Hero section and artist introduction
   
2. **soundoflvke-beat-shop.png**
   - Description: Beat shop/store page
   - What to capture: Beat listings with prices and purchase options
   
3. **soundoflvke-portfolio.png**
   - Description: Portfolio section
   - What to capture: Showcase of previous work and projects
   
4. **soundoflvke-contact.png**
   - Description: Contact page
   - What to capture: Contact form and social media links

---

### 6. Albert (AI Evolution Project)

**Project URL:** Currently only has static images, may not have live demo

**Screenshots needed (3 total):**

1. **albert-neural-network.png**
   - Description: Neural network visualization
   - What to capture: Visual representation of Albert's neural network structure
   
2. **albert-fitness-progression.png**
   - Description: Fitness progression graph/chart
   - What to capture: Evolution progress over time showing fitness improvements
   
3. **albert-mutations-heatmap.png**
   - Description: Mutation heatmap
   - What to capture: Visual representation of mutation patterns in the population

**Note:** Albert already has 4 images in `/res/` directory:
- `beginnAlbert.png`
- `AlbertBoom.png`
- `AlbertCivilisation.png`
- `AlbertAllies.png`

These should be kept as-is.

---

## Screenshot Guidelines

### Technical Requirements
- **Format:** PNG (for transparency and quality)
- **Resolution:** Minimum 1920x1080 for desktop views, 375x812 for mobile
- **File Size:** Try to keep under 500KB per image (use compression if needed)
- **Aspect Ratio:** 16:9 for desktop screenshots is preferred

### Taking Screenshots

#### Desktop Applications:
- **Windows:** Use Snipping Tool (Win + Shift + S) or Snip & Sketch
- **macOS:** Use Command + Shift + 4 for area selection
- **Linux:** Use Flameshot, Spectacle, or Shutter

#### Browser DevTools:
- **Firefox:** Right-click → "Take Screenshot" (whole page or visible area)
- **Chrome:** 
  1. Open DevTools (F12)
  2. Press Ctrl+Shift+P (Cmd+Shift+P on Mac)
  3. Type "screenshot"
  4. Choose "Capture full size screenshot" or "Capture screenshot"

#### For Mobile Views:
1. Open browser DevTools
2. Click device toolbar icon (or press Ctrl+Shift+M / Cmd+Shift+M)
3. Select device preset or custom dimensions
4. Take screenshot as above

### Best Practices
1. **Clean UI:** Close unnecessary browser tabs/windows visible in screenshots
2. **Representative Content:** Show the application in a meaningful state (e.g., game with units spawned, visualizer with music playing)
3. **Avoid Personal Data:** Don't include any personal or sensitive information
4. **Good Timing:** For animated content, capture interesting moments
5. **Consistent Quality:** Use similar lighting/theme across screenshots from same project

### Image Optimization (Optional but Recommended)

To keep the repository size manageable, consider optimizing images:

```bash
# Using ImageOptim (macOS)
imageoptim *.png

# Using optipng (cross-platform)
optipng -o7 *.png

# Using pngquant (cross-platform)
pngquant --quality=80-90 *.png
```

Online tools:
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/

---

## Verification Checklist

After adding all screenshots, verify:

- [ ] All 27 screenshot files exist in `/res/screenshots/`
- [ ] Each file is named exactly as specified (case-sensitive)
- [ ] File sizes are reasonable (< 500KB each)
- [ ] Images are clear and representative of their features
- [ ] All HTML files have been updated with correct image paths
- [ ] Test each project page to ensure images load correctly
- [ ] Images have proper alt text for accessibility

---

## HTML Integration

The HTML files have already been updated with the correct image tags:

- `projects/age-of-max.html` ✅
- `projects/firecastle.html` ✅
- `projects/autune-online.html` ✅
- `projects/casino-idle-slots.html` ✅
- `projects/soundoflvke.html` ✅
- `projects/albert.html` ✅

Each image tag includes:
- Correct path: `../res/screenshots/filename.png`
- Descriptive alt text
- `loading="lazy"` attribute for performance
- Caption below the image

---

## Testing

After adding screenshots:

1. **Local Testing:**
   ```bash
   # Serve the site locally
   python -m http.server 8000
   # or
   npx serve .
   ```
   
2. **Visit each project page:**
   - http://localhost:8000/projects/age-of-max.html
   - http://localhost:8000/projects/firecastle.html
   - http://localhost:8000/projects/autune-online.html
   - http://localhost:8000/projects/casino-idle-slots.html
   - http://localhost:8000/projects/soundoflvke.html
   - http://localhost:8000/projects/albert.html

3. **Check for:**
   - Images loading correctly
   - No broken image icons
   - Reasonable load times
   - Proper responsive behavior

---

## Deployment

Once screenshots are added:

1. Commit the changes:
   ```bash
   git add res/screenshots/
   git commit -m "Add project screenshots to gallery sections"
   git push
   ```

2. GitHub Actions will automatically deploy to GitHub Pages

3. Verify on live site: https://maximilianhaak.de

---

## Future Updates

When projects are updated and screenshots need refreshing:

1. Take new screenshots following the same naming convention
2. Replace old files in `/res/screenshots/`
3. Commit and push changes
4. No HTML changes needed unless adding/removing screenshots

---

## Contact

For questions or issues with screenshots:
- GitHub: [@MaxeLBerger](https://github.com/MaxeLBerger)
- Website: [maximilianhaak.de](https://maximilianhaak.de)

---

*Last Updated: 2025-01-18*
