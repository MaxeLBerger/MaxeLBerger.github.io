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
    const navHeight = nav.offsetHeight;
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Hintergrundfarbe der Navigation
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Aktive Navigation hervorheben
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

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
            const targetId = this.getAttribute('href').substring(1);
            const targetPosition = document.getElementById(targetId).offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            navList.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Theme Switcher
    const themeCheckbox = document.getElementById('theme-checkbox');
    themeCheckbox.addEventListener('change', () => {
        document.body.classList.toggle('light-theme');
    });

    // Scroll Indikator
    window.addEventListener('scroll', () => {
        const scrollTotal = document.body.scrollHeight - window.innerHeight;
        const scrollProgress = (window.scrollY / scrollTotal) * 100;
        document.getElementById('progress-bar').style.width = `${scrollProgress}%`;
    });
});
