document.addEventListener('DOMContentLoaded', function () {
    // Typed.js Animation
    var typed = new Typed('.typing', {
        strings: ["Software Entwickler", "Web-Entwickler", "KI-Enthusiast"],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
        showCursor: false
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

    // Navigation Scroll
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function activateNavLink() {
        let currentSection = "";
        const navHeight = nav.offsetHeight;
        const threshold = navHeight + 50; // Optionaler Offset

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= threshold && rect.bottom > threshold) {
                currentSection = section.getAttribute('id');
            }
        });

        // Spezieller Fall: Wenn am Ende der Seite, setze currentSection auf die letzte Sektion
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
            currentSection = sections[sections.length - 1].getAttribute('id');
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', activateNavLink);
    window.addEventListener('resize', activateNavLink); // Aktualisiert bei Größenänderung
    activateNavLink(); // Initialer Aufruf

    // Mobile Navigation
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Smooth Scrolling
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const navHeight = nav.offsetHeight; // Nav-Höhe hier neu berechnen
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            navList.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Scroll Indikator
    window.addEventListener('scroll', () => {
        const scrollTotal = document.body.scrollHeight - window.innerHeight;
        const scrollProgress = (window.scrollY / scrollTotal) * 100;
        document.getElementById('progress-bar').style.width = `${scrollProgress}%`;
    });

    // Particles.js Konfiguration
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
});
