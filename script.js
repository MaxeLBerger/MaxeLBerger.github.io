document.addEventListener('DOMContentLoaded', function () {
    // ========================================
    // PREMIUM SCROLL ANIMATIONS
    // ========================================
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe skill cards
        document.querySelectorAll('.skill-card').forEach(el => {
            revealObserver.observe(el);
        });

        // Observe section headers
        document.querySelectorAll('.skills-section h2, .ai-stack-section h2, .compartment-header').forEach(el => {
            revealObserver.observe(el);
        });
    }

    // Initialize scroll animations
    initScrollAnimations();
    
    // ========================================
    // INFINITE LOOP CAROUSEL INITIALIZATION
    // ========================================
    function initCarousels() {
        const carousels = document.querySelectorAll('.carousel-container');
        
        carousels.forEach(container => {
            const track = container.querySelector('.carousel-track');
            const leftArrow = container.querySelector('.carousel-arrow-left');
            const rightArrow = container.querySelector('.carousel-arrow-right');
            const originalCards = Array.from(track.querySelectorAll('.project-card'));
            
            if (!track || !leftArrow || !rightArrow || originalCards.length === 0) return;
            
            const totalOriginal = originalCards.length;
            let isTransitioning = false;
            
            // Calculate visible cards based on viewport width
            function getVisibleCards() {
                const viewportWidth = window.innerWidth;
                if (viewportWidth >= 1200) return 4;
                if (viewportWidth >= 992) return 3;
                if (viewportWidth >= 768) return 2;
                return 1;
            }
            
            // Check if carousel needs looping
            function needsLoop() {
                return totalOriginal > getVisibleCards();
            }
            
            // Clone cards for infinite loop effect
            function setupInfiniteLoop() {
                // Remove any existing clones
                track.querySelectorAll('.carousel-clone').forEach(clone => clone.remove());
                
                if (!needsLoop()) {
                    leftArrow.classList.add('hidden');
                    rightArrow.classList.add('hidden');
                    track.style.transform = 'translateX(0)';
                    return;
                }
                
                leftArrow.classList.remove('hidden');
                rightArrow.classList.remove('hidden');
                
                const visibleCards = getVisibleCards();
                
                // Clone cards at the end (first N cards cloned to end)
                for (let i = 0; i < visibleCards; i++) {
                    const clone = originalCards[i].cloneNode(true);
                    clone.classList.add('carousel-clone');
                    track.appendChild(clone);
                }
                
                // Clone cards at the beginning (last N cards cloned to start)
                for (let i = totalOriginal - 1; i >= totalOriginal - visibleCards; i--) {
                    const clone = originalCards[i].cloneNode(true);
                    clone.classList.add('carousel-clone');
                    track.insertBefore(clone, track.firstChild);
                }
            }
            
            // Get card width including gap
            function getCardWidth() {
                const cards = track.querySelectorAll('.project-card');
                if (cards.length === 0) return 0;
                const cardWidth = cards[0].offsetWidth;
                const trackStyle = window.getComputedStyle(track);
                const gap = parseInt(trackStyle.gap) || 24;
                return cardWidth + gap;
            }
            
            // Current position (index in the cloned array, starting after prepended clones)
            let currentIndex = 0;
            
            // Set initial position (after prepended clones)
            function setInitialPosition() {
                if (!needsLoop()) return;
                const visibleCards = getVisibleCards();
                currentIndex = visibleCards; // Start after prepended clones
                const cardWidth = getCardWidth();
                track.style.transition = 'none';
                track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
            }
            
            // Slide with smooth animation
            function slideTo(index, smooth = true) {
                if (isTransitioning) return;
                
                const cardWidth = getCardWidth();
                
                if (smooth) {
                    track.style.transition = 'transform 0.4s ease';
                } else {
                    track.style.transition = 'none';
                }
                
                currentIndex = index;
                track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
                
                if (smooth) {
                    isTransitioning = true;
                }
            }
            
            // Handle loop reset after transition
            function handleTransitionEnd() {
                isTransitioning = false;
                
                if (!needsLoop()) return;
                
                const visibleCards = getVisibleCards();
                const totalWithClones = totalOriginal + (visibleCards * 2);
                
                // If we're at the cloned end section, jump to real start
                if (currentIndex >= totalOriginal + visibleCards) {
                    currentIndex = visibleCards + (currentIndex - totalOriginal - visibleCards);
                    slideTo(currentIndex, false);
                }
                
                // If we're at the cloned start section, jump to real end
                if (currentIndex < visibleCards) {
                    currentIndex = totalOriginal + currentIndex;
                    slideTo(currentIndex, false);
                }
            }
            
            // Event listeners
            track.addEventListener('transitionend', handleTransitionEnd);
            
            leftArrow.addEventListener('click', () => {
                if (!isTransitioning) {
                    slideTo(currentIndex - 1);
                }
            });
            
            rightArrow.addEventListener('click', () => {
                if (!isTransitioning) {
                    slideTo(currentIndex + 1);
                }
            });
            
            // Handle resize
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    setupInfiniteLoop();
                    setInitialPosition();
                }, 150);
            });
            
            // Initial setup
            setupInfiniteLoop();
            setInitialPosition();
        });
    }
    
    // Initialize carousels
    initCarousels();
    
    // ========================================
    // END CAROUSEL
    // ========================================

    // Typed.js Animation (nur in der Home-Section)
    var heroSection = document.getElementById('home');
    if (heroSection) {
        new Typed('.typing', {
            strings: ["Software-Entwickler", "Web-Entwickler", "KI-Enthusiast"],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true,
            showCursor: false
        });
    }

    // Navigation Elemente
    const nav = document.querySelector('nav');
    let navHeight = nav.offsetHeight;
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    // Smooth Scrolling
    document.querySelectorAll('.nav-link, .scroll-link').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Prüfen, ob der Link zu einer Sektion auf der aktuellen Seite zeigt
            if (href.startsWith('#')) {
                e.preventDefault();
                navHeight = nav.offsetHeight; // Aktualisiere navHeight
                const targetId = href.split('#')[1];
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const targetPosition = targetElement.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }

            // Entferne aktive Klasse und schließe das mobile Menü
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            navList.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Back-to-Top Button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Intersection Observer für Scroll-Erkennung
    if (sections.length > 0 && navLinks.length > 0) {
        const options = {
            root: null,
            rootMargin: `-${navHeight}px 0px 0px 0px`, // Verhindert das Überdecken durch die Nav
            threshold: 0.6 // 60% des Elements müssen sichtbar sein
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        const href = link.getAttribute('href');
                        if (href.startsWith('#') && href.split('#')[1] === entry.target.id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, options);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Mobile Navigation
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Scroll Indikator
    window.addEventListener('scroll', () => {
        const scrollTotal = document.body.scrollHeight - window.innerHeight;
        const scrollProgress = (window.scrollY / scrollTotal) * 100;
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = `${scrollProgress}%`;
        }
    });

    // Particles.js Konfiguration (nur in der Home-Section)
    if (heroSection) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 60,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00e676"
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.3
                },
                "size": {
                    "value": 3,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00e676",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2
                }
            },
            "interactivity": {
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // --- Consent Management (Cookie/Tracking Einwilligung) ---
    (function initConsent() {
        const GA_ID = 'G-QFHRSY5Z0C';

        function getConsent() {
            try { return localStorage.getItem('site_consent'); } catch (_) { return null; }
        }

        function setConsent(value) {
            try { localStorage.setItem('site_consent', value); } catch (_) {}
        }

        function loadGoogleFonts() {
            if (document.getElementById('gf-roboto')) return;
            const link = document.createElement('link');
            link.id = 'gf-roboto';
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';
            document.head.appendChild(link);
        }

        function loadAnalytics() {
            if (!GA_ID) return;
            if (window.gtag) return; // already loaded
            const s = document.createElement('script');
            s.async = true;
            s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
            s.onload = function () {
                window.dataLayer = window.dataLayer || [];
                function gtag(){ dataLayer.push(arguments); }
                window.gtag = gtag;
                gtag('js', new Date());
                // Consent Mode basic: only analytics if granted
                gtag('consent', 'update', { ad_storage: 'denied', analytics_storage: 'granted' });
                gtag('config', GA_ID);
            };
            document.head.appendChild(s);
        }

        function applyConsent(state) {
            if (state === 'granted') {
                loadGoogleFonts();
                loadAnalytics();
            }
        }

        function buildBanner() {
            if (document.getElementById('consent-banner')) return;
            const banner = document.createElement('div');
            banner.id = 'consent-banner';
            banner.className = 'consent-banner';
            banner.innerHTML = `
                <h3>Cookies & Dienste</h3>
                <p>Wir verwenden optionale Dienste für Statistik (Google Analytics) und externe Schriftarten (Google Fonts). Diese werden nur nach Ihrer Einwilligung geladen. Mehr dazu in der <a class="consent-link" href="/datenschutz.html">Datenschutzerklärung</a>.</p>
                <div class="consent-actions">
                    <button class="consent-btn" id="consent-accept">Akzeptieren</button>
                    <button class="consent-btn secondary" id="consent-decline">Ablehnen</button>
                </div>
            `;
            document.body.appendChild(banner);

            document.getElementById('consent-accept').addEventListener('click', function() {
                setConsent('granted');
                hideBanner();
                applyConsent('granted');
            });
            document.getElementById('consent-decline').addEventListener('click', function() {
                setConsent('denied');
                hideBanner();
            });

            function showBanner() { banner.classList.add('show'); }
            function hideBanner() { banner.classList.remove('show'); }
            window.showConsentManager = showBanner;

            return { showBanner, hideBanner };
        }

        const bannerAPI = buildBanner();
        const consent = getConsent();
        if (consent === 'granted') {
            applyConsent('granted');
        } else if (consent === 'denied') {
            // do nothing
        } else {
            bannerAPI && bannerAPI.showBanner();
        }
    })();
});
