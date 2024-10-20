// JavaScript-Code für die interaktiven Funktionen der Website

// Typed.js Animation
document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed('.typing', {
        strings: ["Software Entwickler", "Web-Entwickler", "KI-Enthusiast"],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true,
        showCursor: false
    });

    // Scroll-Animationen
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('show');
                entry.target.style.transition = "opacity 1.5s ease-out, transform 1.5s ease-out";
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Mobile Navigation
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Active Navigation Highlight
    const updateActiveLink = () => {
        const sections = document.querySelectorAll('section');
        let scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
        const offset = 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop - offset && scrollPos < sectionTop + sectionHeight - offset) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                if (sectionId && document.querySelector(`#nav-${sectionId}`)) {
                    document.querySelector(`#nav-${sectionId}`).classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', () => {
        updateActiveLink();
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            updateActiveLink();
        }, 100);
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            setTimeout(() => {
                updateActiveLink();
            }, 600);
        });
    });

    // Theme Switcher
    const themeCheckbox = document.getElementById('theme-checkbox');
    themeCheckbox.addEventListener('change', () => {
        document.body.classList.toggle('light-theme');
    });

    // Back-to-Top Button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Scroll Indikator
    window.addEventListener('scroll', () => {
        const scrollTotal = document.body.scrollHeight - window.innerHeight;
        const scrollProgress = (window.scrollY / scrollTotal) * 100;
        document.getElementById('progress-bar').style.width = `${scrollProgress}%`;
    });
});
