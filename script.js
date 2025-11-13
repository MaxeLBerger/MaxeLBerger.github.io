document.addEventListener('DOMContentLoaded', function () {
    // Typed.js Animation (nur in der Home-Section)
    var heroSection = document.getElementById('home');
    if (heroSection) {
        var typed = new Typed('.typing', {
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
