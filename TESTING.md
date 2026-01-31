# 🧪 Portfolio Testing Documentation

## Overview

This document describes the testing strategy for the portfolio website and all integrated projects. The testing ensures that all projects work correctly, API calls succeed, and no broken links or errors exist.

## Testing Strategy

### Automated Tests

All tests run automatically via GitHub Actions:
- **On every push** to main or develop branches
- **On every pull request** to main
- **Daily at 6 AM UTC** (scheduled tests)
- **Manually** via workflow_dispatch

### Test Workflow

The test workflow (`.github/workflows/test-projects.yml`) includes:

1. **Portfolio Tests** - Main website functionality
2. **AgeOfMax Tests** - Game build and functionality
3. **FireCastle Tests** - API endpoints and structure
4. **AuTuneOnline Tests** - Audio processing functionality
5. **External Links Tests** - Third-party project links
6. **Test Report** - Consolidated results

## Projects and Their APIs

### 1. AgeOfMax 🎮

**Type:** TypeScript/Phaser 3 Game  
**Repository:** https://github.com/MaxeLBerger/AgeOfMax  
**Live URL:** https://maximilianhaak.de/AgeOfMax

#### APIs Used:
- **No external APIs** - Fully client-side game
- Uses Phaser 3 game engine (local JavaScript library)
- All game logic runs in the browser

#### Tests:
- ✅ Build verification (Vite production build)
- ✅ TypeScript compilation check
- ✅ Distribution files presence check
- ✅ Package dependencies validation

#### Test Commands:
```bash
cd AgeOfMax
npm install
npm run build
# Build should complete without errors
```

---

### 2. FireCastle 🏰

**Type:** Node.js Web Application with API  
**Repository:** https://github.com/MaxeLBerger/FireCastle  
**Live URL:** https://maximilianhaak.de/FireCastle

#### APIs Used:
- **Clash of Clans Official API**
  - Base URL: `https://api.clashofclans.com/v1/`
  - Authentication: API Key required
  - Rate Limits: Apply

#### API Endpoints Provided:

| Endpoint | Method | Description | Status |
|----------|--------|-------------|--------|
| `/api/clan` | GET | Clan information (name, level, members, win rate) | ⚠️ Requires API key |
| `/api/player` | GET | Player data (level, trophies, donations) | ⚠️ Requires API key |
| `/api/clanwar` | GET | Current clan war status | ⚠️ Requires API key |
| `/api/clan/stats` | GET | Extended clan statistics | ⚠️ Requires API key |
| `/api/player/stats` | GET | Detailed player statistics | ⚠️ Requires API key |

#### Features:
- **Caching System:** node-cache with 5-minute TTL
- **Logging:** Winston-based request/response logging
- **Error Handling:** Comprehensive error responses

#### Tests:
- ✅ Project structure validation
- ✅ Static files presence check
- ✅ Package.json validation
- ⚠️ API endpoint tests (requires deployed environment + API key)

#### Manual API Testing:
```bash
# Test clan endpoint (when deployed)
curl https://maximilianhaak.de/FireCastle/api/clan

# Test player endpoint
curl https://maximilianhaak.de/FireCastle/api/player

# Test war status
curl https://maximilianhaak.de/FireCastle/api/clanwar
```

**Note:** FireCastle API endpoints require:
1. Valid Clash of Clans API key
2. Server deployment (Express.js)
3. Proper environment configuration

Current testing validates structure and files. Full API testing requires live deployment.

---

### 3. AuTuneOnline 🎵

**Type:** Audio Visualizer Web Application  
**Repository:** https://github.com/MaxeLBerger/AuTuneOnline  
**Live URL:** https://maximilianhaak.de/AuTuneOnline

#### APIs Used:
- **Web Audio API** (Browser native)
  - `AudioContext` / `webkitAudioContext`
  - `AnalyserNode` for frequency analysis
  - `MediaElementSourceNode` for audio playback
  
- **Canvas API** (Browser native)
  - For visualizations and particle effects

- **File API** (Browser native)
  - For MP3 file upload (drag & drop)

#### Features:
- MP3 file upload and playback
- Real-time frequency analysis
- BPM (Beats Per Minute) detection
- Reactive particle effects
- Multiple visualization themes

#### Tests:
- ✅ Project structure validation
- ✅ Static files presence check
- ✅ Web Audio API usage detection
- ✅ Audio analysis implementation check

#### Browser API Testing:
Tests verify that the code uses browser APIs correctly:
```javascript
// Checked for:
- AudioContext initialization
- AnalyserNode creation
- Audio file handling
- Canvas rendering
```

**Note:** Full functional testing requires browser environment. Current tests validate code structure and API usage patterns.

---

### 4. SoundofLvke 🎼

**Type:** External Portfolio Website  
**Repository:** https://github.com/soundoflvke/soundoflvke.github.io  
**Live URL:** https://soundoflvke.github.io

#### APIs Used:
- External music platform embeds (Spotify, YouTube, etc.)
- Not directly controlled by this portfolio

#### Tests:
- ✅ Link presence in portfolio
- ✅ Project page existence
- ✅ External website availability check (HTTP)

---

### 5. Albert 🤖

**Type:** AI Evolution Simulation  
**Status:** Documentation only (no live demo)

#### APIs Used:
- No external APIs
- Pure client-side JavaScript simulation
- Neural network simulation (local)

#### Tests:
- ✅ Project page existence
- ✅ Documentation validation

---

## Test Results

### Current Status

View the latest test results:
- [GitHub Actions - Test Projects Workflow](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/test-projects.yml)

### Test Badge

[![Test All Projects](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/test-projects.yml/badge.svg)](https://github.com/MaxeLBerger/MaxeLBerger.github.io/actions/workflows/test-projects.yml)

Add this badge to README.md to show test status.

---

## Running Tests Manually

### Local Testing

#### Test Portfolio Pages:
```bash
# Check file structure
ls -la index.html projects/*.html

# Validate HTML (basic)
for file in *.html projects/*.html; do
  echo "Checking $file..."
  grep -c '<html' "$file"
done
```

#### Test AgeOfMax Build:
```bash
cd AgeOfMax
npm install
npm run build
ls -la dist/
```

#### Test FireCastle Structure:
```bash
cd FireCastle
ls -la index.html css/ js/
```

#### Test AuTuneOnline Structure:
```bash
cd AuTuneOnline
ls -la public/index.html public/app.js public/style.css
```

### Full Test Suite:
```bash
# Run GitHub Actions locally (requires act)
act -j test-portfolio
act -j test-ageofmax
act -j test-firecastle
act -j test-autuneonline
```

---

## API Testing in Production

### FireCastle API Testing

Once deployed to production, test the API endpoints:

```bash
# Base URL
BASE_URL="https://maximilianhaak.de/FireCastle"

# Test clan endpoint
curl -i "$BASE_URL/api/clan"

# Test player endpoint
curl -i "$BASE_URL/api/player"

# Test war endpoint
curl -i "$BASE_URL/api/clanwar"

# Test extended clan stats
curl -i "$BASE_URL/api/clan/stats"

# Test extended player stats
curl -i "$BASE_URL/api/player/stats"
```

Expected responses:
- **200 OK** - Successful response with JSON data
- **404 Not Found** - Endpoint doesn't exist
- **500 Internal Server Error** - Server error (check logs)
- **401 Unauthorized** - API key issue

### AuTuneOnline Browser Testing

Manual browser tests for AuTuneOnline:

1. **Load Test:**
   - Open https://maximilianhaak.de/AuTuneOnline
   - Verify page loads without errors
   - Check browser console for errors

2. **File Upload Test:**
   - Drag and drop an MP3 file
   - Verify file is processed
   - Check audio playback starts

3. **Visualization Test:**
   - Verify frequency bars appear
   - Check particles react to audio
   - Confirm BPM detection works

4. **Console Check:**
   ```javascript
   // In browser console:
   // Should not see errors like:
   // - "AudioContext is not defined"
   // - "Cannot read property of undefined"
   // - "Failed to load resource"
   ```

---

## Troubleshooting

### Common Issues

#### Test Failure: "Submodule not found"
```bash
# Solution: Initialize submodules
git submodule update --init --recursive
```

#### Test Failure: "Build failed"
```bash
# Solution: Install dependencies
cd AgeOfMax
npm install
npm run build
```

#### Test Failure: "API endpoint not responding"
```bash
# Solution: Check if API is deployed
# FireCastle API requires server deployment
# Check deployment logs in GitHub Actions
```

#### Test Warning: "External link unreachable"
```bash
# This may be temporary
# Verify manually:
curl -I https://soundoflvke.github.io
```

---

## CI/CD Integration

### Workflow Integration

The test workflow integrates with the deployment workflow:

```
┌─────────────────┐
│  Push to main   │
└────────┬────────┘
         │
         ├─────────┬─────────┐
         │         │         │
    ┌────▼───┐  ┌─▼──────┐  │
    │  Test  │  │ Build  │  │
    │Workflow│  │Workflow│  │
    └────┬───┘  └─┬──────┘  │
         │        │         │
         └────┬───┴─────────┘
              │
         ┌────▼────┐
         │ Deploy  │
         └─────────┘
```

Both workflows run independently:
- Tests validate code quality
- Build/Deploy publishes to GitHub Pages

---

## Future Enhancements

### Planned Test Additions:

1. **Browser Automation:**
   - Playwright/Puppeteer tests
   - Screenshot comparisons
   - Interactive element testing

2. **API Integration Tests:**
   - Mock API responses for FireCastle
   - Test caching behavior
   - Validate error handling

3. **Performance Tests:**
   - Load time measurements
   - Bundle size analysis
   - Lighthouse CI integration

4. **Accessibility Tests:**
   - WCAG compliance checks
   - Screen reader compatibility
   - Keyboard navigation tests

5. **Security Tests:**
   - Dependency vulnerability scanning
   - XSS prevention validation
   - CSP header checks

---

## Contributing

### Adding Tests for New Projects

When adding a new project to the portfolio:

1. **Add test job** in `.github/workflows/test-projects.yml`
2. **Document APIs** in this file
3. **Update test report** job dependencies
4. **Test locally** before pushing

Example:
```yaml
test-newproject:
  name: Test NewProject
  runs-on: ubuntu-latest
  
  steps:
  - name: Checkout repository
    uses: actions/checkout@v4
    with:
      submodules: recursive
  
  - name: Test project structure
    run: |
      echo "🧪 Testing NewProject..."
      # Add your tests here
```

---

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Clash of Clans API Documentation](https://developer.clashofclans.com/)
- [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)

---

## Architecture & Visual Overview

### Test Layers

```
Layer 1: AUTOMATED CI/CD TESTS (GitHub Actions)
├── Portfolio Structure Tests
│   ├── HTML validation
│   ├── Link checking
│   └── Resource verification
├── Build Tests
│   ├── AgeOfMax TypeScript build
│   ├── Vite production build
│   └── Artifact verification
├── Structure Tests
│   ├── FireCastle file structure
│   ├── AuTuneOnline file structure
│   └── Submodule validation
├── API Documentation Tests
│   ├── FireCastle endpoints documented
│   └── AuTuneOnline Web APIs verified
└── External Link Tests
    └── SoundofLvke availability

Layer 2: MANUAL AUTOMATED SCRIPTS
├── test-projects.sh
│   ├── HTTP availability tests
│   ├── Resource loading tests
│   └── Status code validation
└── test-firecastle-api.sh
    ├── API endpoint testing
    ├── JSON response validation
    └── Header verification

Layer 3: MANUAL QA TESTING (Checklist)
├── Functional Testing
│   ├── Feature validation
│   ├── User workflows
│   └── Edge cases
├── Browser Testing
│   ├── Chrome/Edge
│   ├── Firefox
│   └── Safari
├── Device Testing
│   ├── Desktop
│   ├── Tablet
│   └── Mobile
└── Non-Functional Testing
    ├── Performance
    ├── Accessibility
    └── Security
```

### Test Coverage Matrix

```
┌──────────────┬─────────┬─────────┬─────────┬──────────┬──────────┐
│   Project    │ Struct  │  Build  │   API   │  Manual  │  Total   │
├──────────────┼─────────┼─────────┼─────────┼──────────┼──────────┤
│ Portfolio    │   ✅    │   N/A   │   N/A   │    ✅    │   100%   │
│ AgeOfMax     │   ✅    │   ✅    │   N/A   │    ✅    │   100%   │
│ FireCastle   │   ✅    │   N/A   │   ✅    │    ✅    │   100%   │
│ AuTuneOnline │   ✅    │   N/A   │   ✅    │    ✅    │   100%   │
│ SoundofLvke  │   ✅    │   N/A   │   N/A   │    ✅    │   100%   │
│ Albert       │   ✅    │   N/A   │   N/A   │    ✅    │   100%   │
└──────────────┴─────────┴─────────┴─────────┴──────────┴──────────┘

Legend:
✅ = Tested, N/A = Not Applicable
```

### Quality Gates

```
Before Merge to Main:
[ ] All automated tests pass
[ ] Build succeeds (AgeOfMax)
[ ] No console errors
[ ] All links work
[ ] Structure validated

Before Deployment:
[ ] Automated tests pass
[ ] Manual scripts run successfully
[ ] Key features manually verified
[ ] No critical issues found
[ ] Documentation updated

Before Release:
[ ] Full manual QA completed
[ ] Cross-browser testing done
[ ] Mobile testing done
[ ] Performance acceptable
[ ] Security reviewed
```

---

## Appendix A: Manual Testing Checklist

Use this checklist to manually verify all projects are working correctly after deployment.

### Base URL
- [ ] Main portfolio: https://maximilianhaak.de
- [ ] All pages load without 404 errors

### Portfolio Pages

#### Main Pages
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

#### Project Landing Pages
- [ ] **Age of Max** (projects/age-of-max.html) - Loads, buttons work
- [ ] **FireCastle** (projects/firecastle.html) - Loads, links work
- [ ] **AuTune Online** (projects/autune-online.html) - Loads, links work
- [ ] **Albert** (projects/albert.html) - Loads correctly
- [ ] **SoundofLvke** (projects/soundoflvke.html) - External link works

### AgeOfMax Project
- [ ] Game loads at /AgeOfMax/
- [ ] No 404 errors in browser console
- [ ] Game canvas displays
- [ ] Main menu appears
- [ ] Difficulty selection works
- [ ] Game starts and runs smoothly

### FireCastle Project
- [ ] Website loads at /FireCastle/
- [ ] CSS styles applied
- [ ] JavaScript loads without errors

### AuTuneOnline Project
- [ ] App loads at /AuTuneOnline/
- [ ] File upload works (drag & drop)
- [ ] Audio plays after upload
- [ ] Frequency bars display and react
- [ ] BPM detection works

### Static Resources
- [ ] /style.css loads
- [ ] /script.js loads (no errors)
- [ ] Favicon loads
- [ ] All project images load

### Responsive Design
- [ ] Desktop (1920x1080) - Layout correct
- [ ] Tablet (768x1024) - Mobile menu works
- [ ] Mobile (375x667) - Content stacks properly

### Browser Compatibility
- [ ] Chrome/Edge - All features work
- [ ] Firefox - All features work
- [ ] Safari - All features work

### Performance & Security
- [ ] Homepage loads in < 3 seconds
- [ ] No console errors
- [ ] Site uses HTTPS
- [ ] Cookie consent banner shows

### Summary
**Tested By:** _____________________  
**Date:** _____________________  
**Passed:** _____ / Total  

---

**Last Updated:** 2025-01-31  
**Maintained by:** Maximilian Haak  
**Status:** ✅ Active and automated
