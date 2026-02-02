# 🎯 Premium Infinite Scroll / Marquee Animation

## Design Inspiration & Konzept

**Referenzen:** Apple, Stripe, Linear, Vercel, Raycast, Framer

### Visuelle Ziele
- Buttery smooth 60fps Animation
- Subtile Tiefenwirkung durch Parallax (unterschiedliche Geschwindigkeiten)
- Premium Glassmorphism Cards mit Glow
- Elegante Gradient-Masks an den Rändern
- Respektvolle, nicht-ablenkende Bewegung

---

## 1. HTML Struktur

```html
<section class="skills-marquee" aria-label="Technologie-Skills">
  <!-- Accessibility: Screen Reader bekommt statische Liste -->
  <div class="sr-only">
    <h2>Skills</h2>
    <ul>
      <li>TypeScript</li>
      <li>React</li>
      <li>Node.js</li>
      <!-- ... alle Skills ... -->
    </ul>
  </div>

  <!-- Visuelle Marquee Animation -->
  <div class="marquee-container" aria-hidden="true">
    
    <!-- Row 1: Links nach Rechts, Schnell -->
    <div class="marquee-row" data-direction="left" data-speed="fast">
      <div class="marquee-track">
        <!-- Original Items -->
        <div class="skill-card">
          <div class="skill-icon">
            <img src="res/icons/typescript.svg" alt="" loading="lazy" />
          </div>
          <span class="skill-name">TypeScript</span>
        </div>
        <div class="skill-card">
          <div class="skill-icon">
            <img src="res/icons/react.svg" alt="" loading="lazy" />
          </div>
          <span class="skill-name">React</span>
        </div>
        <!-- ... mehr Skills ... -->
        
        <!-- Duplizierte Items für seamless loop -->
        <div class="skill-card" aria-hidden="true">
          <div class="skill-icon">
            <img src="res/icons/typescript.svg" alt="" loading="lazy" />
          </div>
          <span class="skill-name">TypeScript</span>
        </div>
        <!-- ... Duplikate ... -->
      </div>
    </div>

    <!-- Row 2: Rechts nach Links, Medium -->
    <div class="marquee-row" data-direction="right" data-speed="medium">
      <div class="marquee-track">
        <!-- Items + Duplikate -->
      </div>
    </div>

    <!-- Row 3: Links nach Rechts, Slow -->
    <div class="marquee-row" data-direction="left" data-speed="slow">
      <div class="marquee-track">
        <!-- Items + Duplikate -->
      </div>
    </div>

  </div>
</section>
```

---

## 2. CSS Implementation

### 2.1 CSS Custom Properties (Design Tokens)

```css
:root {
  /* Marquee Timing */
  --marquee-duration-fast: 25s;
  --marquee-duration-medium: 35s;
  --marquee-duration-slow: 45s;
  
  /* Card Design */
  --card-bg: rgba(255, 255, 255, 0.03);
  --card-bg-hover: rgba(255, 255, 255, 0.08);
  --card-border: rgba(255, 255, 255, 0.08);
  --card-border-hover: rgba(255, 255, 255, 0.15);
  --card-glow: rgba(99, 102, 241, 0.15);
  --card-radius: 16px;
  --card-padding: 1rem 1.5rem;
  --card-gap: 1rem;
  
  /* Text */
  --text-primary: rgba(255, 255, 255, 0.95);
  --text-secondary: rgba(255, 255, 255, 0.6);
  
  /* Mask Gradient */
  --mask-gradient: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  
  /* Animation */
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
}

/* Light Mode Overrides */
@media (prefers-color-scheme: light) {
  :root {
    --card-bg: rgba(0, 0, 0, 0.02);
    --card-bg-hover: rgba(0, 0, 0, 0.05);
    --card-border: rgba(0, 0, 0, 0.06);
    --card-border-hover: rgba(0, 0, 0, 0.12);
    --card-glow: rgba(99, 102, 241, 0.1);
    --text-primary: rgba(0, 0, 0, 0.9);
    --text-secondary: rgba(0, 0, 0, 0.6);
  }
}
```

### 2.2 Marquee Container & Layout

```css
/* ============================================
   MARQUEE CONTAINER
   ============================================ */

.skills-marquee {
  position: relative;
  width: 100%;
  padding: 4rem 0;
  overflow: hidden;
  
  /* Subtle background gradient for depth */
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(99, 102, 241, 0.02) 50%,
    transparent 100%
  );
}

.marquee-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  /* Edge fade mask - Premium Detail */
  -webkit-mask-image: var(--mask-gradient);
  mask-image: var(--mask-gradient);
}

/* ============================================
   MARQUEE ROW
   ============================================ */

.marquee-row {
  display: flex;
  width: 100%;
  overflow: hidden;
}

.marquee-track {
  display: flex;
  gap: var(--card-gap);
  padding: 0.5rem 0; /* Space for glow/shadow */
  
  /* GPU Acceleration - Critical for Performance */
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* ============================================
   ANIMATION KEYFRAMES
   ============================================ */

@keyframes marquee-scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes marquee-scroll-right {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

/* ============================================
   DIRECTION & SPEED VARIANTS
   ============================================ */

/* Direction: Left (default) */
.marquee-row[data-direction="left"] .marquee-track {
  animation: marquee-scroll-left var(--marquee-duration-medium) linear infinite;
}

/* Direction: Right */
.marquee-row[data-direction="right"] .marquee-track {
  animation: marquee-scroll-right var(--marquee-duration-medium) linear infinite;
}

/* Speed Variants */
.marquee-row[data-speed="fast"] .marquee-track {
  animation-duration: var(--marquee-duration-fast);
}

.marquee-row[data-speed="medium"] .marquee-track {
  animation-duration: var(--marquee-duration-medium);
}

.marquee-row[data-speed="slow"] .marquee-track {
  animation-duration: var(--marquee-duration-slow);
}

/* ============================================
   HOVER PAUSE - Smooth Transition
   ============================================ */

.marquee-row:hover .marquee-track {
  animation-play-state: paused;
}

/* Optional: Pause entire container on hover */
.marquee-container:hover .marquee-track {
  animation-play-state: paused;
}
```

### 2.3 Skill Card Design (Premium Glassmorphism)

```css
/* ============================================
   SKILL CARD - Premium Design
   ============================================ */

.skill-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: var(--card-padding);
  
  /* Glassmorphism Background */
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  /* Border with subtle gradient */
  border: 1px solid var(--card-border);
  border-radius: var(--card-radius);
  
  /* Prevent shrinking */
  flex-shrink: 0;
  
  /* Smooth transitions for hover */
  transition: 
    background-color 0.3s var(--ease-smooth),
    border-color 0.3s var(--ease-smooth),
    box-shadow 0.3s var(--ease-smooth),
    transform 0.3s var(--ease-smooth);
  
  /* Subtle shadow for depth */
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.05),
    0 4px 12px rgba(0, 0, 0, 0.03);
  
  /* Cursor hint for interactivity */
  cursor: default;
  user-select: none;
}

/* ============================================
   SKILL CARD HOVER STATE
   ============================================ */

.skill-card:hover {
  background: var(--card-bg-hover);
  border-color: var(--card-border-hover);
  transform: translateY(-2px);
  
  /* Premium Glow Effect */
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.1),
    0 0 0 1px var(--card-border-hover),
    0 0 40px -10px var(--card-glow);
}

/* ============================================
   SKILL ICON
   ============================================ */

.skill-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
}

.skill-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  
  /* Prevent image dragging */
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
}

/* ============================================
   SKILL NAME
   ============================================ */

.skill-name {
  font-size: 0.9375rem; /* 15px */
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  letter-spacing: -0.01em;
}
```

### 2.4 Advanced Premium Effects (Optional)

```css
/* ============================================
   ADVANCED: 3D Perspective Effect
   ============================================ */

.marquee-container--3d {
  perspective: 1000px;
  perspective-origin: center center;
}

.marquee-container--3d .marquee-row:first-child {
  transform: translateZ(20px);
  opacity: 1;
}

.marquee-container--3d .marquee-row:nth-child(2) {
  transform: translateZ(0);
  opacity: 0.85;
}

.marquee-container--3d .marquee-row:last-child {
  transform: translateZ(-20px);
  opacity: 0.7;
}

/* ============================================
   ADVANCED: Gradient Border Cards
   ============================================ */

.skill-card--gradient {
  position: relative;
  background: transparent;
  border: none;
}

.skill-card--gradient::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--card-radius);
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(99, 102, 241, 0.2) 100%
  );
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.skill-card--gradient::after {
  content: '';
  position: absolute;
  inset: 1px;
  background: var(--card-bg);
  border-radius: calc(var(--card-radius) - 1px);
  z-index: -1;
}

/* ============================================
   ADVANCED: Shimmer/Shine Effect on Hover
   ============================================ */

.skill-card--shimmer {
  overflow: hidden;
}

.skill-card--shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  transition: left 0.6s var(--ease-smooth);
  pointer-events: none;
}

.skill-card--shimmer:hover::after {
  left: 100%;
}
```

### 2.5 Responsive Design

```css
/* ============================================
   RESPONSIVE ADJUSTMENTS
   ============================================ */

/* Tablet */
@media (max-width: 1024px) {
  :root {
    --marquee-duration-fast: 20s;
    --marquee-duration-medium: 28s;
    --marquee-duration-slow: 36s;
  }
  
  .skills-marquee {
    padding: 3rem 0;
  }
  
  .marquee-container {
    gap: 1rem;
  }
}

/* Mobile */
@media (max-width: 640px) {
  :root {
    --marquee-duration-fast: 15s;
    --marquee-duration-medium: 22s;
    --marquee-duration-slow: 28s;
    --card-padding: 0.75rem 1rem;
    --card-gap: 0.75rem;
  }
  
  .skills-marquee {
    padding: 2rem 0;
  }
  
  .skill-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .skill-name {
    font-size: 0.875rem;
  }
  
  /* Smaller edge fade on mobile */
  .marquee-container {
    --mask-gradient: linear-gradient(
      to right,
      transparent 0%,
      black 5%,
      black 95%,
      transparent 100%
    );
  }
}

/* ============================================
   REDUCED MOTION - Accessibility
   ============================================ */

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none !important;
  }
  
  .skill-card {
    transition: none !important;
  }
  
  /* Show all cards statically */
  .marquee-row {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .marquee-container {
    -webkit-mask-image: none;
    mask-image: none;
  }
}
```

---

## 3. JavaScript (Minimal - Optional Enhancements)

```javascript
/**
 * Marquee Enhancement Module
 * Optional JS for advanced features
 */

class MarqueeController {
  constructor() {
    this.container = document.querySelector('.marquee-container');
    this.rows = document.querySelectorAll('.marquee-row');
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    this.init();
  }
  
  init() {
    // Skip if reduced motion is preferred
    if (this.prefersReducedMotion.matches) {
      this.disableAnimations();
      return;
    }
    
    // Listen for reduced motion changes
    this.prefersReducedMotion.addEventListener('change', (e) => {
      if (e.matches) {
        this.disableAnimations();
      } else {
        this.enableAnimations();
      }
    });
    
    // Pause on tab visibility change (performance)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAll();
      } else {
        this.resumeAll();
      }
    });
    
    // Optional: Intersection Observer for lazy animation
    this.setupIntersectionObserver();
  }
  
  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const tracks = entry.target.querySelectorAll('.marquee-track');
          tracks.forEach(track => {
            track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
          });
        });
      },
      { threshold: 0.1 }
    );
    
    if (this.container) {
      observer.observe(this.container);
    }
  }
  
  pauseAll() {
    this.rows.forEach(row => {
      const track = row.querySelector('.marquee-track');
      if (track) track.style.animationPlayState = 'paused';
    });
  }
  
  resumeAll() {
    this.rows.forEach(row => {
      const track = row.querySelector('.marquee-track');
      if (track) track.style.animationPlayState = 'running';
    });
  }
  
  disableAnimations() {
    this.rows.forEach(row => {
      const track = row.querySelector('.marquee-track');
      if (track) track.style.animation = 'none';
    });
  }
  
  enableAnimations() {
    this.rows.forEach(row => {
      const track = row.querySelector('.marquee-track');
      if (track) track.style.animation = '';
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MarqueeController();
});
```

### 3.1 Dynamic Item Duplication (Build-Time or Runtime)

```javascript
/**
 * Duplicate marquee items for seamless loop
 * Run this once on page load or during build
 */
function duplicateMarqueeItems() {
  const tracks = document.querySelectorAll('.marquee-track');
  
  tracks.forEach(track => {
    const items = Array.from(track.children);
    
    // Clone all items and append
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  });
}

// Only run if items aren't already duplicated
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.marquee-track');
  if (track && track.children.length < 12) { // Adjust threshold
    duplicateMarqueeItems();
  }
});
```

---

## 4. Performance Optimierungen

### 4.1 Critical Performance Rules

| Regel | Umsetzung | Warum |
|-------|-----------|-------|
| GPU Layer | `will-change: transform` | Eigener Compositor Layer |
| Transform Only | Nur `translateX` animieren | Kein Layout/Paint Trigger |
| Backface Hidden | `backface-visibility: hidden` | Stabilerer Layer |
| Contain | `contain: layout style paint` | Isolierte Rendering |
| No Filter Animation | Keine `blur()` Animation | Extrem teuer |
| Image Optimization | `loading="lazy"` | Nur sichtbare laden |

### 4.2 CSS Containment

```css
.marquee-row {
  contain: layout style paint;
}

.skill-card {
  contain: layout style;
}
```

### 4.3 Hardware Acceleration Debugging

```css
/* Debug: Visualize GPU layers */
.debug-gpu * {
  outline: 1px solid rgba(255, 0, 0, 0.5);
}

/* Force new layer for debugging */
.force-layer {
  transform: translateZ(0);
  will-change: transform;
}
```

### 4.4 Performance Monitoring

```javascript
// Check for frame drops
function monitorPerformance() {
  let lastTime = performance.now();
  let frameCount = 0;
  
  function checkFPS() {
    const now = performance.now();
    frameCount++;
    
    if (now - lastTime >= 1000) {
      const fps = frameCount;
      console.log(`Marquee FPS: ${fps}`);
      
      if (fps < 55) {
        console.warn('Performance warning: FPS below 55');
      }
      
      frameCount = 0;
      lastTime = now;
    }
    
    requestAnimationFrame(checkFPS);
  }
  
  checkFPS();
}

// Only in development
if (process.env.NODE_ENV === 'development') {
  monitorPerformance();
}
```

---

## 5. Accessibility (A11y)

### 5.1 WCAG Compliance Checklist

| Requirement | Implementation |
|-------------|----------------|
| **Reduced Motion** | `@media (prefers-reduced-motion)` stops animation |
| **Screen Reader** | Hidden `aria-hidden="true"` + visible SR-only list |
| **Keyboard** | No interactive elements in marquee |
| **Focus** | Marquee items nicht fokussierbar |
| **Contrast** | Text meets WCAG AA (4.5:1) |
| **Pause Control** | Hover pauses animation |

### 5.2 Screen Reader Only Content

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### 5.3 ARIA Implementation

```html
<!-- Container announcement -->
<section class="skills-marquee" 
         role="region" 
         aria-label="Technologie-Skills Übersicht">
  
  <!-- Screen reader content -->
  <div class="sr-only">
    <h3>Meine Skills</h3>
    <ul>
      <li>TypeScript - Programmiersprache</li>
      <li>React - Frontend Framework</li>
      <!-- ... -->
    </ul>
  </div>
  
  <!-- Visual content hidden from SR -->
  <div class="marquee-container" aria-hidden="true">
    <!-- ... marquee rows ... -->
  </div>
</section>
```

---

## 6. Skill Daten & Icons

### 6.1 Empfohlene Skills Struktur

```javascript
const skills = [
  // Row 1: Frontend & Languages
  { name: 'TypeScript', icon: 'typescript.svg', category: 'language' },
  { name: 'JavaScript', icon: 'javascript.svg', category: 'language' },
  { name: 'React', icon: 'react.svg', category: 'frontend' },
  { name: 'Vue.js', icon: 'vue.svg', category: 'frontend' },
  { name: 'Next.js', icon: 'nextjs.svg', category: 'frontend' },
  { name: 'HTML5', icon: 'html5.svg', category: 'frontend' },
  { name: 'CSS3', icon: 'css3.svg', category: 'frontend' },
  { name: 'Tailwind', icon: 'tailwind.svg', category: 'frontend' },
  
  // Row 2: Backend & Tools
  { name: 'Node.js', icon: 'nodejs.svg', category: 'backend' },
  { name: 'Python', icon: 'python.svg', category: 'language' },
  { name: 'Java', icon: 'java.svg', category: 'language' },
  { name: 'Express', icon: 'express.svg', category: 'backend' },
  { name: 'PostgreSQL', icon: 'postgresql.svg', category: 'database' },
  { name: 'MongoDB', icon: 'mongodb.svg', category: 'database' },
  { name: 'Redis', icon: 'redis.svg', category: 'database' },
  { name: 'GraphQL', icon: 'graphql.svg', category: 'backend' },
  
  // Row 3: DevOps & Cloud
  { name: 'Docker', icon: 'docker.svg', category: 'devops' },
  { name: 'Kubernetes', icon: 'kubernetes.svg', category: 'devops' },
  { name: 'AWS', icon: 'aws.svg', category: 'cloud' },
  { name: 'Azure', icon: 'azure.svg', category: 'cloud' },
  { name: 'Git', icon: 'git.svg', category: 'tools' },
  { name: 'GitHub', icon: 'github.svg', category: 'tools' },
  { name: 'VS Code', icon: 'vscode.svg', category: 'tools' },
  { name: 'Figma', icon: 'figma.svg', category: 'design' },
];
```

### 6.2 Icon Quellen (Hochwertig)

1. **Simple Icons** - https://simpleicons.org/ (Kostenlos, SVG)
2. **Devicon** - https://devicon.dev/ (Kostenlos, SVG)
3. **Skill Icons** - https://skillicons.dev/ (Kostenlos, PNG/SVG)
4. **SVG Repo** - https://www.svgrepo.com/ (Kostenlos, SVG)

---

## 7. Implementation Checklist

### Phase 1: Basis
- [ ] HTML Struktur erstellen
- [ ] CSS Variables definieren
- [ ] Marquee Container + Row Styles
- [ ] Keyframe Animationen
- [ ] Skill Card Design

### Phase 2: Polish
- [ ] Gradient Mask hinzufügen
- [ ] Hover States verfeinern
- [ ] Glow Effekte
- [ ] Responsive Breakpoints

### Phase 3: Performance
- [ ] GPU Acceleration verifizieren (DevTools Layers)
- [ ] FPS testen (60fps stabil)
- [ ] Intersection Observer implementieren
- [ ] Tab Visibility Pause

### Phase 4: Accessibility
- [ ] Screen Reader Content
- [ ] `prefers-reduced-motion` Test
- [ ] Contrast Check
- [ ] Keyboard Navigation Check

### Phase 5: Integration
- [ ] In Portfolio einbinden
- [ ] Mit bestehendem Style harmonisieren
- [ ] Cross-Browser Testing
- [ ] Mobile Testing

---

## 8. Finale Dateistruktur

```
res/
├── icons/
│   └── skills/
│       ├── typescript.svg
│       ├── react.svg
│       ├── nodejs.svg
│       └── ...

styles/
├── components/
│   └── _marquee.css    # Marquee spezifisch

scripts/
├── components/
│   └── marquee.js      # Optional Controller

index.html              # Marquee Section integriert
```

---

## 9. Code Quality Standards

```css
/* 
 * NAMING: BEM-inspiriert, klar lesbar
 * ORDERING: Logical (Layout → Box → Typography → Visual → Animation)
 * COMMENTS: Sections klar getrennt
 * VARIABLES: Alle magischen Zahlen als Custom Properties
 */
```

---

**Bereit für Implementation!** 🚀

Dieser Plan liefert eine production-ready, premium Marquee Animation die:
- ✅ 60fps performt
- ✅ GPU-beschleunigt ist
- ✅ Barrierefrei ist
- ✅ Responsive funktioniert
- ✅ Premium aussieht
- ✅ Maintainable bleibt
