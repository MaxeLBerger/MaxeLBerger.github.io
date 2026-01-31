# LLM/AI Coding Principles - Refactoring Plan

> **Purpose**: Align this portfolio repository with LLM-friendly coding principles for predictable, debuggable, and easily regenerable code.

---

## ✅ IMPLEMENTATION COMPLETE

**Completed: 2026-01-31**

| Category | Before | After | Status |
|----------|--------|-------|--------|
| **Documentation** | 22 markdown files | 9 files | ✅ Done |
| **Dead Files** | 15+ files | 0 | ✅ Done |
| **Workflows** | 940 lines (3 files) | 264 lines | ✅ Done (72% reduction) |
| **Unused Assets** | 10+ images/favicons | 0 | ✅ Done |
| **File Naming** | Inconsistent casing | PascalCase | ✅ Done |
| **Code Organization** | Monolithic CSS/JS | Unchanged | ⏸️ Optional (not needed) |

---

## What Was Changed

### Files Deleted (21 files removed)
- 10 dead markdown files (summaries, TODOs, duplicates)
- 6 unused favicons
- 4 duplicate project images (.png versions)
- 1 Windows metadata file (desktop.ini)

### Documentation Consolidated
- `START_HERE.md` + `DOCUMENTATION_INDEX.md` → merged into `README.md`
- `PROJECT_REPOS_SETUP.md` + `GITHUB_PAGES_SETUP.md` → merged into `COMPLETE_SETUP_GUIDE.md`
- `TESTING_ARCHITECTURE.md` + `PROJECT_TEST_CHECKLIST.md` → merged into `TESTING.md`
- `SYSTEM_ARCHITECTURE.md` → merged into `AUTOMATION_OVERVIEW.md`

### Workflows Simplified
- `auto-update-submodules.yml`: 101 → 53 lines
- `deploy.yml`: 361 → 153 lines
- `test-projects.yml`: 479 → 58 lines

### Files Renamed
- `betterbestie.png` → `BetterBestie.png`
- `casinoIdleslots.png` → `CasinoIdleSlots.png`

### Files Moved
- `test-projects.sh` → `scripts/test-projects.sh`
- `test-firecastle-api.sh` → `scripts/test-firecastle-api.sh`

---

## Original Plan (Reference)

---

## 🔴 HIGH PRIORITY

### 1. Delete Dead/Temporary Files

**Delete immediately** - These are noise that wastes LLM context:

| File | Reason |
|------|--------|
| `index.html.bak` | Backup file, never used |
| `style.css.bak` | Backup file, never used |
| `AI_STACK_IMPLEMENTATION_TODO.md` | Completed TODO list, no longer relevant |
| `AI_STACK_REDESIGN_PLAN.md` | Completed design plan, historical only |
| `CASINOIDLESLOTS_FIX_SUMMARY.md` | One-time fix, already resolved |
| `COPILOT_INSTRUCTIONS_SETUP.md` | Duplicates info in copilot-instructions.md |
| `PR_SUMMARY.md` | Pull request notes, belongs in GitHub PR |
| `WORKFLOW_FIX_SUMMARY.md` | One-time fix, already resolved |
| `TEST_IMPLEMENTATION_SUMMARY.md` | Redundant with TESTING.md |
| `project-setup-templates-README.md` | References nonexistent folder |
| `res/projects/desktop.ini` | Windows metadata junk |

**Command to run:**
```powershell
Remove-Item index.html.bak, style.css.bak, AI_STACK_IMPLEMENTATION_TODO.md, AI_STACK_REDESIGN_PLAN.md, CASINOIDLESLOTS_FIX_SUMMARY.md, COPILOT_INSTRUCTIONS_SETUP.md, PR_SUMMARY.md, WORKFLOW_FIX_SUMMARY.md, TEST_IMPLEMENTATION_SUMMARY.md, project-setup-templates-README.md
Remove-Item "res\projects\desktop.ini"
```

---

### 2. Consolidate Documentation (22 files → 8 files)

**Problem**: Too many overlapping markdown files create confusion and waste LLM tokens.

**Keep these 8 files:**

| File | Purpose |
|------|---------|
| `README.md` | Main entry point, project overview |
| `CONTRIBUTING.md` | How to contribute |
| `AUTOMATION_OVERVIEW.md` | System architecture diagrams |
| `COMPLETE_SETUP_GUIDE.md` | One-stop setup guide |
| `PROJECT_TEMPLATES.md` | Copy-paste code templates |
| `WORKFLOW_GUIDE.md` | Daily workflow commands |
| `TESTING.md` | All testing documentation |
| `QUICK_REFERENCE.md` | Cheatsheet for common tasks |

**Delete after merging any unique content:**

| Delete | Merge into |
|--------|------------|
| `START_HERE.md` | README.md (add "Getting Started" section) |
| `DOCUMENTATION_INDEX.md` | README.md (add simple doc links) |
| `PROJECT_REPOS_SETUP.md` | COMPLETE_SETUP_GUIDE.md |
| `GITHUB_PAGES_SETUP.md` | COMPLETE_SETUP_GUIDE.md |
| `TESTING_ARCHITECTURE.md` | TESTING.md (append diagrams) |
| `PROJECT_TEST_CHECKLIST.md` | TESTING.md (append as appendix) |
| `SYSTEM_ARCHITECTURE.md` | AUTOMATION_OVERVIEW.md (merge diagrams) |

---

### 3. Delete Unused Assets

**Favicons (6 unused):**
```
res/favicons/favicon-32x32.png    # Unused
res/favicons/favicon.png          # Unused
res/favicons/favicongreen.png     # Unused
res/favicons/favicongreen1.png    # Unused
res/favicons/faviconpurple.png    # Unused
res/favicons/faviconwhite.png     # Unused
```
Only `faviconwhitegreen.png` is referenced in HTML.

**Project Images (duplicates):**
```
res/projects/AgeOfMax.png      # .jpg version is used instead
res/projects/FireCastle.png    # .jpg version is used instead
res/projects/SoundOfLvke.png   # .jpg version is used instead
res/projects/AuTune.png        # .jpg version is used instead
```

---

## 🟡 MEDIUM PRIORITY

### 4. Simplify GitHub Workflows

**Current state:**
- `deploy.yml` - 361 lines (excessive logging/echo statements)
- `auto-update-submodules.yml` - 101 lines (duplicated logic)
- `test-projects.yml` - 479 lines (over-engineered tests)

**Recommendations:**

#### `auto-update-submodules.yml` → Reduce from 101 to ~30 lines
The `repository_dispatch` and `workflow_dispatch` sections are nearly identical. Consolidate to:
```yaml
SUBMODULE="${{ github.event.client_payload.submodule || inputs.submodule }}"
```

#### `deploy.yml` → Reduce from 361 to ~200 lines
- Remove verbose "preview" echo statements
- Remove redundant directory listing steps
- Remove the 48-line "Display submodule status" step

#### `test-projects.yml` → Consider deletion or reduce to ~100 lines
- The deploy workflow already fails if builds fail
- 8 separate jobs with redundant checkout steps is wasteful
- Daily scheduled tests are overkill for a portfolio

**Also delete:**
- `.github/workflows/build-trigger.md` - Empty/unused file (contains just `# Build trigger`)

---

### 5. Rename for Consistency

| Current | Issue | Suggested |
|---------|-------|-----------|
| `res/projects/betterbestie.png` | Lowercase (others are PascalCase) | `BetterBestie.png` |
| `res/projects/casinoIdleslots.png` | camelCase (others are PascalCase) | `CasinoIdleSlots.png` |
| `projects/style.css` | CSS file mixed with HTML pages | Move to `css/projects.css` |
| `test-projects.sh` | Test script in root | Move to `scripts/test-projects.sh` |
| `test-firecastle-api.sh` | Test script in root | Move to `scripts/test-firecastle-api.sh` |

---

## 🟢 LOW PRIORITY (Optional)

### 6. Code Organization (Nice-to-Have)

**Split `script.js` (247 lines) into modules:**
```
js/
├── main.js           # Entry point
├── navigation.js     # Nav, mobile menu, scroll
├── animations.js     # Typed.js, particles
└── consent.js        # Cookie/analytics consent
```

**Split `style.css` (1260 lines) into modules:**
```
css/
├── main.css          # Imports all others
├── variables.css     # CSS custom properties
├── base.css          # Reset, typography
├── components.css    # Buttons, cards
└── layout.css        # Navigation, grid, footer
```

**Note:** This is optional because:
- The current files work fine
- Splitting adds complexity for marginal benefit
- Only do this if actively developing the portfolio

---

### 7. Folder Structure Improvements (Optional)

**Current issues:**
- 22+ markdown files in root (clutter)
- Test scripts in root
- CSS/JS not in dedicated folders

**Ideal structure:**
```
MaxeLBerger.github.io/
├── index.html
├── datenschutz.html
├── impressum.html
├── README.md              # Only docs file at root
├── CNAME
├── _config.yml
│
├── css/                   # Stylesheets
├── js/                    # JavaScript
├── projects/              # Project detail pages
├── res/                   # Images/assets
├── docs/                  # All other documentation
├── scripts/               # Test/build scripts
└── .github/               # Workflows, agents
```

**Note:** Only restructure if actively improving the site. Moving docs to a `docs/` folder would require updating all internal links.

---

## ❌ DO NOT CHANGE

These items are already well-organized:

| Item | Why It's Good |
|------|---------------|
| **Submodule structure** | Each project is properly isolated |
| **Project pages** | Consistent kebab-case naming |
| **`.github/copilot-instructions.md`** | Comprehensive and well-structured |
| **`.github/agents/portfolio-fix.agent.md`** | Clear role definition |
| **`mcp-portfolio-server/`** | Intentionally inline (local dev tool) |
| **Semantic HTML** | Good use of `<nav>`, `<section>`, `<main>` |
| **Lazy loading** | Images use `loading="lazy"` |
| **CSS variables** | Using `:root` custom properties |

---

## 📊 Impact Summary

| Action | Files Affected | Effort | Impact |
|--------|---------------|--------|--------|
| Delete dead files | 11 files | 15 min | 🔴 High - reduces noise |
| Consolidate docs | 14 files → 8 | 1-2 hr | 🔴 High - clear entry points |
| Delete unused assets | 10 files | 15 min | 🟡 Medium - clean resources |
| Simplify workflows | 3 files | 1 hr | 🟡 Medium - faster CI/CD |
| Rename files | 5 files | 15 min | 🟢 Low - consistency |
| Restructure folders | Many files | 2+ hr | 🟢 Low - nice-to-have |

---

## ⚠️ Security Note

**CasinoIdleSlots submodule** contains `.env.local` with real Supabase credentials. This should be addressed in that repository:
1. Remove `.env.local` from git tracking
2. Regenerate Supabase anon key (it's been exposed)
3. Ensure only `.env.example` is tracked

---

## Quick Start Commands

```powershell
# Step 1: Delete dead files in root
Remove-Item index.html.bak, style.css.bak -ErrorAction SilentlyContinue
Remove-Item AI_STACK_IMPLEMENTATION_TODO.md, AI_STACK_REDESIGN_PLAN.md -ErrorAction SilentlyContinue
Remove-Item CASINOIDLESLOTS_FIX_SUMMARY.md, COPILOT_INSTRUCTIONS_SETUP.md -ErrorAction SilentlyContinue
Remove-Item PR_SUMMARY.md, WORKFLOW_FIX_SUMMARY.md -ErrorAction SilentlyContinue
Remove-Item TEST_IMPLEMENTATION_SUMMARY.md, project-setup-templates-README.md -ErrorAction SilentlyContinue

# Step 2: Delete unused assets
Remove-Item "res\projects\desktop.ini" -ErrorAction SilentlyContinue
Remove-Item "res\favicons\favicon-32x32.png" -ErrorAction SilentlyContinue
Remove-Item "res\favicons\favicon.png" -ErrorAction SilentlyContinue
Remove-Item "res\favicons\favicongreen.png" -ErrorAction SilentlyContinue
Remove-Item "res\favicons\favicongreen1.png" -ErrorAction SilentlyContinue
Remove-Item "res\favicons\faviconpurple.png" -ErrorAction SilentlyContinue
Remove-Item "res\favicons\faviconwhite.png" -ErrorAction SilentlyContinue

# Step 3: Delete duplicate project images (keep .jpg versions)
Remove-Item "res\projects\AgeOfMax.png" -ErrorAction SilentlyContinue
Remove-Item "res\projects\FireCastle.png" -ErrorAction SilentlyContinue
Remove-Item "res\projects\SoundOfLvke.png" -ErrorAction SilentlyContinue
Remove-Item "res\projects\AuTune.png" -ErrorAction SilentlyContinue

# Step 4: Create scripts folder and move test scripts
New-Item -ItemType Directory -Path scripts -Force
Move-Item test-projects.sh scripts/ -ErrorAction SilentlyContinue
Move-Item test-firecastle-api.sh scripts/ -ErrorAction SilentlyContinue
```

---

*Generated: 2026-01-31*
*Based on LLM/AI Coding Principles analysis*
