document.addEventListener('DOMContentLoaded', function () {
    // Typed.js Animation
    var typed = new Typed('.typing', {
        strings: ["Software Entwickler", "Web-Entwickler", "KI-Enthusiast"],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
        showCursor: false
    });
    
    // Smooth Scrolling
    document.querySelectorAll('.nav-link, .scroll-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const navHeight = nav.offsetHeight; // Nav-Höhe hier neu berechnen
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            // Überprüfe, ob das Ziel existiert
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

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

    // Navigation Scroll
    const nav = document.querySelector('nav');
    let navHeight = nav.offsetHeight;
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function updateActiveNav() {
        let scrollPosition = window.scrollY + navHeight + 1; // +1 to ensure proper highlighting

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const currentId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('resize', () => {
        navHeight = nav.offsetHeight; // Update navHeight on resize
        updateActiveNav();
    });

    // Initial call to set active nav
    updateActiveNav();

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
            navHeight = nav.offsetHeight; // Update navHeight
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
