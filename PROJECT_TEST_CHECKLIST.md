# 📋 Project Testing Checklist

Use this checklist to manually verify all projects are working correctly after deployment.

## Base URL
- [ ] Main portfolio: https://maximilianhaak.de
- [ ] All pages load without 404 errors

---

## 📄 Portfolio Pages

### Main Pages
- [ ] **Homepage** (index.html)
  - [ ] Loads without errors
  - [ ] Navigation menu works
  - [ ] All sections visible (Home, About Me, Skills, Projects)
  - [ ] Typed.js animation works
  - [ ] Particles.js background loads
  - [ ] Smooth scrolling functions
  - [ ] Back-to-top button appears on scroll

- [ ] **Impressum** (impressum.html)
  - [ ] Page loads correctly
  - [ ] All information displayed
  - [ ] Links work

- [ ] **Datenschutz** (datenschutz.html)
  - [ ] Page loads correctly
  - [ ] Privacy policy content visible
  - [ ] Cookie consent banner functions

### Project Landing Pages
- [ ] **Age of Max** (projects/age-of-max.html)
  - [ ] Page loads correctly
  - [ ] "Spiel spielen" button works
  - [ ] GitHub link works
  - [ ] All sections visible

- [ ] **FireCastle** (projects/firecastle.html)
  - [ ] Page loads correctly
  - [ ] "Website besuchen" button works
  - [ ] GitHub link works
  - [ ] API endpoints documented

- [ ] **AuTune Online** (projects/autune-online.html)
  - [ ] Page loads correctly
  - [ ] "App öffnen" button works
  - [ ] GitHub link works
  - [ ] Feature descriptions visible

- [ ] **Albert** (projects/albert.html)
  - [ ] Page loads correctly
  - [ ] Content displayed properly

- [ ] **SoundofLvke** (projects/soundoflvke.html)
  - [ ] Page loads correctly
  - [ ] External link to soundoflvke.github.io works

---

## 🎮 AgeOfMax Project

### Basic Functionality
- [ ] **Game loads** at /AgeOfMax/
- [ ] No 404 errors in browser console
- [ ] Game canvas displays
- [ ] Phaser loads correctly

### Game Features
- [ ] Main menu appears
- [ ] Difficulty selection works (Easy, Medium, Hard)
- [ ] Game starts when difficulty selected
- [ ] Units can be spawned
- [ ] Gold generation works
- [ ] Enemy spawning functions
- [ ] Turret placement works
- [ ] Game runs smoothly (no lag)
- [ ] Win/loss conditions trigger

### Technical Checks
- [ ] No TypeScript errors in console
- [ ] No missing asset warnings
- [ ] Game assets load (sprites, sounds)
- [ ] Debug overlay (F2) toggles correctly

---

## 🏰 FireCastle Project

### Website
- [ ] **Website loads** at /FireCastle/
- [ ] Homepage displays correctly
- [ ] CSS styles applied
- [ ] JavaScript loads without errors

### Structure
- [ ] index.html present
- [ ] CSS files load
- [ ] JavaScript files load
- [ ] Images display correctly

### API Endpoints (if Node.js backend deployed)

**Note:** These only work if FireCastle has a running Node.js server with Clash of Clans API key.

Test each endpoint:
```bash
BASE_URL="https://maximilianhaak.de/FireCastle"

# Clan info
curl "$BASE_URL/api/clan"

# Player data
curl "$BASE_URL/api/player"

# War status
curl "$BASE_URL/api/clanwar"

# Clan stats
curl "$BASE_URL/api/clan/stats"

# Player stats
curl "$BASE_URL/api/player/stats"
```

- [ ] `/api/clan` - Returns clan information
- [ ] `/api/player` - Returns player data
- [ ] `/api/clanwar` - Returns war status
- [ ] `/api/clan/stats` - Returns extended clan stats
- [ ] `/api/player/stats` - Returns player stats

### API Features (if deployed)
- [ ] Responses are JSON formatted
- [ ] Caching works (same request = fast response)
- [ ] Error handling works (invalid requests return errors)
- [ ] CORS headers present
- [ ] Rate limiting respected

---

## 🎵 AuTuneOnline Project

### Basic Functionality
- [ ] **App loads** at /AuTuneOnline/
- [ ] No console errors
- [ ] Interface displays correctly
- [ ] Instructions visible

### Audio Features
- [ ] File upload area visible
- [ ] Drag and drop works
- [ ] File picker works
- [ ] MP3 file uploads successfully
- [ ] Audio plays after upload
- [ ] Play/pause controls work

### Visualizations
- [ ] Frequency bars display
- [ ] Bars react to audio
- [ ] Particle effects visible
- [ ] Particles react to bass
- [ ] BPM detection works
- [ ] BPM value displays
- [ ] Visualization themes changeable

### Web Audio API
- [ ] No AudioContext errors
- [ ] Audio analysis works
- [ ] Frequency data updates in real-time
- [ ] Canvas renders without errors

---

## 🎼 SoundofLvke External Project

- [ ] Link works from portfolio
- [ ] External site https://soundoflvke.github.io loads
- [ ] Site content displays correctly

---

## 🤖 Albert Project

- [ ] Project page loads
- [ ] Description visible
- [ ] No broken links or images

---

## 🔗 Static Resources

### CSS
- [ ] /style.css loads
- [ ] /projects/style.css loads
- [ ] Styles applied correctly
- [ ] Responsive design works on mobile

### JavaScript
- [ ] /script.js loads
- [ ] No JavaScript errors in console
- [ ] Typed.js library loads
- [ ] Particles.js library loads

### Images
- [ ] Favicon loads (/res/faviconwhitegreen.png)
- [ ] Profile image loads (/res/maxlervorne.png)
- [ ] Project preview images load:
  - [ ] /res/AgeOfMax.jpg
  - [ ] /res/FireCastle.jpg
  - [ ] /res/AuTune.jpg
  - [ ] /res/SoundOfLvke.jpg
  - [ ] /res/albert.png

### Skills Icons
- [ ] /res/java-icon.png
- [ ] /res/delphi-icon.png
- [ ] /res/javascript-icon.png
- [ ] /res/html-icon.png
- [ ] /res/css-icon.png
- [ ] /res/postgres-icon.png

---

## 🌐 External Dependencies

### CDN Resources
- [ ] Font Awesome loads (cdnjs.cloudflare.com)
- [ ] Particles.js loads (cdn.jsdelivr.net)
- [ ] Typed.js loads (cdn.jsdelivr.net)
- [ ] Google Fonts loads (after consent)

### External Links
- [ ] GitHub profile link works (https://github.com/MaxeLBerger)
- [ ] Project GitHub repositories accessible
- [ ] SoundofLvke external site works

---

## 📱 Responsive Design

### Desktop (1920x1080)
- [ ] Layout looks correct
- [ ] Navigation works
- [ ] All content visible
- [ ] Images scale properly

### Tablet (768x1024)
- [ ] Layout adapts correctly
- [ ] Mobile menu appears
- [ ] Content readable
- [ ] Touch interactions work

### Mobile (375x667)
- [ ] Mobile menu works
- [ ] Content stacks properly
- [ ] Images scale correctly
- [ ] Text readable without zoom
- [ ] Touch targets large enough

---

## ⚡ Performance

### Load Times
- [ ] Homepage loads in < 3 seconds
- [ ] Projects load in < 5 seconds
- [ ] Images load progressively
- [ ] No long blocking scripts

### Browser Console
- [ ] No errors in console
- [ ] No 404 for resources
- [ ] No CORS errors
- [ ] No uncaught exceptions

---

## 🔒 Security & Privacy

### HTTPS
- [ ] Site uses HTTPS
- [ ] No mixed content warnings
- [ ] Certificate valid

### Privacy
- [ ] Cookie consent banner shows
- [ ] Google Analytics only loads after consent
- [ ] Google Fonts only load after consent
- [ ] Privacy policy accessible

---

## ✅ Browser Compatibility

Test on multiple browsers:

### Chrome/Edge
- [ ] All features work
- [ ] No console errors
- [ ] Styling correct

### Firefox
- [ ] All features work
- [ ] No console errors
- [ ] Styling correct

### Safari (macOS/iOS)
- [ ] All features work
- [ ] Web Audio API works (AuTuneOnline)
- [ ] Styling correct

---

## 📊 Analytics

### GitHub Actions
- [ ] Deploy workflow succeeds
- [ ] Test workflow succeeds
- [ ] No failed builds
- [ ] Submodules update correctly

### Deployment
- [ ] Latest commit reflected on live site
- [ ] Changes deploy within 5 minutes
- [ ] CNAME record correct (maximilianhaak.de)

---

## 🎯 Summary

**Total Checks:** Count completed checkboxes  
**Passed:** _____  
**Failed:** _____  
**Percentage:** _____% 

**Critical Issues Found:**
- List any blocking issues here

**Non-Critical Issues Found:**
- List any minor issues here

**Tested By:** _____________________  
**Date:** _____________________  
**Time:** _____________________

---

## 📝 Notes

Add any additional observations or issues here:

```
[Your notes here]
```

---

## 🚀 Next Actions

Based on test results:

- [ ] Fix any critical issues immediately
- [ ] Document non-critical issues as GitHub issues
- [ ] Update documentation if needed
- [ ] Re-test after fixes
- [ ] Deploy fixes to production

---

**Testing completed!** 🎉

Remember to run automated tests as well:
```bash
# Run automated tests
./test-projects.sh

# Run FireCastle API tests
./test-firecastle-api.sh
```
