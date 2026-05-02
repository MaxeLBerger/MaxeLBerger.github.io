/* ═══════════════════════════════════════════════
   script.js — Portfolio Interactions
   ProjectSlider, GSAP Animations, Theme, i18n
   ═══════════════════════════════════════════════ */

(function () {
    'use strict';

    /* ═══ i18n TRANSLATIONS ═══ */
    const translations = {
        de: {
            'nav.services': 'Leistungen',
            'nav.portfolio': 'Portfolio',
            'nav.pricing': 'Pakete',
            'nav.tech': 'Tech Stack',
            'nav.testimonials': 'Referenzen',
            'nav.contact': 'Kontakt',
            'nav.projects': 'Projekte',
            'services.tag': 'Pakete & Preise',
            'services.title': 'Transparent & fair — wählen Sie Ihren Weg',
            'services.badge': '⭐ Empfohlen',
            'services.label.for': 'Perfekt für',
            'services.label.deliver': 'Sie bekommen',
            'services.label.examples': 'Beispiele',
            'services.web.title': 'Websites & Online-Auftritte',
            'services.web.sub': 'Schnelle, saubere Websites die ranken und konvertieren.',
            'services.web.meta': '2–4 Wochen · ab 1.500 €',
            'services.web.for1': 'Handwerk, Selbstständige, KMU',
            'services.web.for2': 'Relaunch alter Websites',
            'services.web.for3': 'Landing Pages für Kampagnen',
            'services.web.d1': 'Mobile-optimierte Website (1–8 Seiten)',
            'services.web.d2': 'SEO-Setup & Lighthouse 90+',
            'services.web.d3': 'DSGVO-konform, Hosting eingerichtet',
            'services.web.d4': '30 Tage Support nach Launch',
            'services.web.link': 'Erstgespräch anfragen',
            'services.ai.title': 'KI & Automatisierung',
            'services.ai.sub': 'Pragmatische KI, die Ihrem Team echte Stunden zurückgibt.',
            'services.ai.meta': '1–3 Wochen · ab 1.990 €',
            'services.ai.for1': 'Wiederkehrende manuelle Aufgaben',
            'services.ai.for2': 'Kunden-Chatbots & Support-Automation',
            'services.ai.for3': 'Datenauswertung mit LLMs / RAG',
            'services.ai.d1': 'Lauffähigen Workflow oder AI-Agent',
            'services.ai.d2': 'Anbindung an OpenAI / Claude / Ollama',
            'services.ai.d3': 'Dokumentation & Schulung Ihres Teams',
            'services.ai.d4': '60 Tage Support & Tuning',
            'services.ai.link': 'Anwendungsfall besprechen',
            'services.apps.title': 'Web-Anwendungen & Tools',
            'services.apps.sub': 'Dashboards, Kundenportale, interne Tools — fullstack.',
            'services.apps.meta': '4–12 Wochen · ab 4.990 €',
            'services.apps.for1': 'Internes Dashboard / Kundenportal',
            'services.apps.for2': 'Buchungs- oder Verwaltungssystem',
            'services.apps.for3': 'API-Integrationen & CRM-Anbindung',
            'services.apps.d1': 'Voll funktionsfähige Web-App (Frontend + Backend)',
            'services.apps.d2': 'Datenbank, Auth & Rollen',
            'services.apps.d3': 'CI/CD, Hosting & Monitoring',
            'services.apps.d4': 'Technische Dokumentation',
            'services.apps.link': 'Idee skizzieren',
            'services.design.title': 'Beratung & Code-Review',
            'services.design.sub': 'Zweite Meinung, ehrliches Feedback, klare nächste Schritte.',
            'services.design.meta': 'flexibel · ab 120 €/h',
            'services.design.for1': 'Bestehende Projekte mit Tech-Schulden',
            'services.design.for2': 'Architektur- oder Stack-Entscheidungen',
            'services.design.for3': 'KI-Strategie für Ihr Unternehmen',
            'services.design.d1': 'Schriftlichen Review-Report mit Priorisierung',
            'services.design.d2': 'Konkrete, umsetzbare Empfehlungen',
            'services.design.d3': '1:1-Gespräch zur Diskussion',
            'services.design.d4': 'Optional: Pair-Programming-Session',
            'services.design.link': 'Termin vereinbaren',
            'services.cta.text': 'Nicht sicher, was Sie brauchen? Ein 20-minütiges Gespräch klärt das meist.',
            'services.cta.button': 'Kostenloses Erstgespräch →',
            'skills.tag': 'Tech Stack',
            'skills.title': 'Mit welchen Tools ich arbeite',
            'projects.tag': 'Ausgewählte Arbeiten',
            'projects.title': 'Portfolio',
            'projects.note': 'Hinweis: Viele dieser Projekte sind Prototypen und Eigenentwicklungen. Aktuell bin ich in Festanstellung als Software-Entwickler tätig und biete keine kommerziellen Web-Dienstleistungen an. Künftig ist eine selbstständige Tätigkeit nebenberuflich oder hauptberuflich denkbar.',
            'projects.group.websites': 'Websites & Apps',
            'projects.group.games': 'Games',
            'about.tag': 'Über mich',
            'about.title': 'Maximilian Haak',
            'about.p1': 'Ich bin Maximilian — Fullstack-Webentwickler und KI-Spezialist aus Bruckmühl bei Rosenheim. Ich entwickle moderne Websites, Web-Apps und KI-gestützte Automatisierungen für kleine und mittelständische Unternehmen in der Region.',
            'about.p2': 'Von der schnellen Firmenwebsite bis zum maßgeschneiderten AI Agent — ich bringe Ihr Projekt von der Idee zum Go-Live. Mein Fokus: Sauberer Code, faire Preise und persönliche Betreuung ohne Agentur-Overhead.',
            'about.stat1': 'Jahre Erfahrung',
            'about.stat2': 'Projekte umgesetzt',
            'about.stat3': 'Kundenzufriedenheit',
            'testimonials.tag': 'Referenzen',
            'testimonials.title': 'Was Kunden sagen',
            'testimonials.coha.quote': '„Max hat unser MVP an einem Wochenende gebaut. Drei Stunden Briefing, danach lief die Seite. Genau die unkomplizierte Umsetzung, die wir als Startup gebraucht haben.“',
            'testimonials.coha.name': 'CoHa Gründerteam',
            'testimonials.coha.role': 'Startup — Gastronomie',
            'testimonials.imkerei.quote': '„Unsere alte Seite war zehn Jahre alt. Jetzt verkaufen wir Honig direkt online — und ich kann die Inhalte selbst pflegen, ohne jedes Mal nachfragen zu müssen.“',
            'testimonials.imkerei.name': 'Imkerei Feuerstein',
            'testimonials.imkerei.role': 'Lokales Unternehmen — Bruckmühl',
            'testimonials.soundoflvke.quote': '„Ich wollte keine 0815-Musiker-Seite. Max hat das verstanden, mit Audio-Player und Tour-Daten. Sieht aus wie ein großes Label — ohne deren Aufwand.“',
            'testimonials.soundoflvke.name': 'SoundOfLvke',
            'testimonials.soundoflvke.role': 'Künstler & Musiker',
            'contact.tag': 'Kontakt',
            'contact.title': 'Lassen Sie uns sprechen',
            'contact.intro': 'Erzählen Sie mir von Ihrem Vorhaben — ganz unverbindlich. Ich melde mich persönlich bei Ihnen zurück, in der Regel innerhalb eines Werktags.',
            'contact.name': 'Name',
            'contact.email': 'E-Mail',
            'contact.message': 'Nachricht',
            'contact.send': 'Nachricht senden',
            'footer.impressum': 'Impressum',
            'footer.datenschutz': 'Datenschutz',
            'hero.scroll': 'Scrollen und entdecken',
            // Slide 1 - Maximilian Haak (Personal)
            'slide.maxhaak.t1': 'Maximilian',
            'slide.maxhaak.t2': 'Haak.',
            'slide.maxhaak.t3': 'Software Entwickler.',
            'slide.maxhaak.desc': 'Full-Stack Entwickler aus Bruckmühl bei Rosenheim. Websites, Web-Apps und KI-Lösungen — mit TypeScript, React und modernen Cloud-Technologien. Über 5 Jahre Erfahrung, persönlich und zuverlässig.',
            'slide.maxhaak.cta1': 'Kostenlose Beratung',
            'slide.maxhaak.cta2': 'Projekte ansehen',
            'slide.maxhaak.badge': 'VERFÜGBAR FÜR PROJEKTE',
            'slide.maxhaak.tag1': 'Full-Stack',
            'slide.maxhaak.tag2': 'TypeScript & React',
            'slide.maxhaak.tag3': 'KI & Automatisierung',
            // Slide 2 - Imkerei Feuerstein
            'slide.imkerei.t1': 'Ihre Idee.',
            'slide.imkerei.t2': 'Mein Code.',
            'slide.imkerei.t3': 'Ihr Erfolg.',
            'slide.imkerei.desc': 'Imkerei Feuerstein: React-Website mit Online-Shop — persönlich besprochen, in 3 Wochen umgesetzt, auf Vercel deployed. Responsive Design, SEO-optimiert und ein begeisterter Kunde.',
            'slide.imkerei.cta1': 'Live ansehen',
            'slide.imkerei.cta2': 'Projekt-Details',
            'slide.imkerei.tag1': 'React & Vercel',
            'slide.imkerei.tag2': '3 Wochen',
            'slide.imkerei.tag3': 'E-Commerce',
            // Slide 3 - AI Captain
            'slide.aicaptain.t1': 'AI Captain.',
            'slide.aicaptain.t2': 'VS Code',
            'slide.aicaptain.t3': 'Extension.',
            'slide.aicaptain.desc': 'Mein eigenes Produkt im VS Code Marketplace: Ein KI-Agent für intelligente Code-Generierung, Debugging und Review. Gebaut mit TypeScript, LLM-APIs und der VS Code Extension API.',
            'slide.aicaptain.cta1': 'Mehr erfahren',
            'slide.aicaptain.cta2': 'Projekt-Details',
            'slide.aicaptain.tag1': 'VS Code Marketplace',
            'slide.aicaptain.tag2': 'TypeScript',
            'slide.aicaptain.tag3': 'LLM APIs',
            // Slide 4 - E46 Studio
            'slide.e46.t1': 'Desktop App.',
            'slide.e46.t2': 'BMW E46.',
            'slide.e46.t3': 'Steuergeräte-Coding.',
            'slide.e46.desc': 'E46 Studio: Eine Electron-Anwendung für BMW E46 Steuergeräte-Coding über serielle Schnittstelle. TypeScript, Node.js und Low-Level-Kommunikation — für eine spezialisierte Automotive-Community.',
            'slide.e46.cta1': 'Live ansehen',
            'slide.e46.cta2': 'Projekt-Details',
            'slide.e46.tag1': 'Electron',
            'slide.e46.tag2': 'TypeScript',
            'slide.e46.tag3': 'Serial API',
            // Slide 5 - CoHa
            'slide.coha.t1': 'Startup.',
            'slide.coha.t2': 'Website.',
            'slide.coha.t3': 'Mehr Kunden.',
            'slide.coha.desc': 'Für ein Startup aus Bayern: Modernes Full-Stack Webdesign mit React und TypeScript. Schnelle Ladezeiten, Conversion-Optimierung und responsive auf allen Geräten.',
            'slide.coha.cta1': 'Live ansehen',
            'slide.coha.cta2': 'Projekt-Details',
            'slide.coha.tag1': 'React & TypeScript',
            'slide.coha.tag2': 'Full-Stack',
            'slide.coha.tag3': 'Conversion-Optimierung',
            // Slide 6 - SoundOfLvke
            'slide.soundoflvke.t1': 'Sound.',
            'slide.soundoflvke.t2': 'Design.',
            'slide.soundoflvke.t3': 'Identität.',
            'slide.soundoflvke.desc': 'Portfolio-Website für einen Musik-Künstler — integrierter Audio-Player, Release-Übersicht und individuelles responsive Design. Kreative Webentwicklung, die Marken zum Leben erweckt.',
            'slide.soundoflvke.cta1': 'Live ansehen',
            'slide.soundoflvke.cta2': 'Projekt-Details',
            'slide.soundoflvke.tag1': 'Künstler-Branding',
            'slide.soundoflvke.tag2': 'Audio Integration',
            'slide.soundoflvke.tag3': 'Responsive Design',
            // Slide badges
            'slide.imkerei.badge': 'KUNDENPROJEKT',
            'slide.aicaptain.badge': 'AI AGENT',
            'slide.e46.badge': 'DESKTOP APP',
            'slide.coha.badge': 'KUNDENREFERENZ',
            'slide.soundoflvke.badge': 'KÜNSTLER-WEBSITE',
            // Slide 7 - Shookroko
            'slide.shookroko.t1': 'Browser-Spiel.',
            'slide.shookroko.t2': 'Phaser 3.',
            'slide.shookroko.t3': 'TypeScript.',
            'slide.shookroko.desc': 'Shookroko: Ein Action-Browsergame, gebaut mit Phaser 3 und TypeScript. Eigene Game-Loop, Asset-Pipeline und ein responsive Canvas — Game Development trifft modernes Web.',
            'slide.shookroko.cta1': 'Live spielen',
            'slide.shookroko.cta2': 'Projekt-Details',
            'slide.shookroko.tag1': 'Phaser 3',
            'slide.shookroko.tag2': 'TypeScript',
            'slide.shookroko.tag3': 'Game Dev',
            'slide.shookroko.badge': 'BROWSER GAME',
            // Slide 8 - Medieval Tower Defense
            'slide.medieval.t1': 'Medieval.',
            'slide.medieval.t2': 'Tower',
            'slide.medieval.t3': 'Defense.',
            'slide.medieval.desc': 'Medieval Tower Defense: Ein im Browser spielbares Strategiespiel im Mittelalter-Setting. Eigene Spielmechanik, Wave-System und Pixel-Art — gebaut für die Vercel-Edge mit modernem Web-Stack.',
            'slide.medieval.cta1': 'Live spielen',
            'slide.medieval.cta2': 'Zum Spiel',
            'slide.medieval.tag1': 'Browser Game',
            'slide.medieval.tag2': 'Tower Defense',
            'slide.medieval.tag3': 'Vercel',
            'slide.medieval.badge': 'TOWER DEFENSE',
            // Slide 9 - Daniel Brecheis (Human Bridges Consulting)
            'slide.danielbrecheis.t1': 'HR Coaching.',
            'slide.danielbrecheis.t2': 'Human',
            'slide.danielbrecheis.t3': 'Bridges.',
            'slide.danielbrecheis.desc': 'Daniel Brecheis — Human Bridges Consulting: Markenwebsite für HR-Coaching, Workshops und Interim-Management. Klare Typografie, ruhige Bildsprache und ein wertiges Erscheinungsbild für 25+ Jahre HR-Erfahrung.',
            'slide.danielbrecheis.cta1': 'Live ansehen',
            'slide.danielbrecheis.cta2': 'Projekt-Details',
            'slide.danielbrecheis.tag1': 'Coaching',
            'slide.danielbrecheis.tag2': 'Branding',
            'slide.danielbrecheis.tag3': 'Vercel',
            'slide.danielbrecheis.badge': 'CONSULTING',
            // Slide 10 - Kaya Seeds
            'slide.kayaseeds.t1': 'Premium.',
            'slide.kayaseeds.t2': 'Cannabis',
            'slide.kayaseeds.t3': 'Seeds.',
            'slide.kayaseeds.desc': 'Kaya Seeds: E-Commerce-Website für eine bayerische Cannabis-Samenmarke. Editoriales Layout, Produkt-Grid, Warenkorb-Flow und ein Markenauftritt zwischen 70er-Vibe und moderner Frische.',
            'slide.kayaseeds.cta1': 'Live ansehen',
            'slide.kayaseeds.cta2': 'Projekt-Details',
            'slide.kayaseeds.tag1': 'E-Commerce',
            'slide.kayaseeds.tag2': 'Branding',
            'slide.kayaseeds.tag3': 'Shopify',
            'slide.kayaseeds.badge': 'ONLINE-SHOP',
            // Slide 11 - JK Entertainment
            'slide.jkentertainment.t1': 'TCG-Shop.',
            'slide.jkentertainment.t2': 'Magic, Pokémon',
            'slide.jkentertainment.t3': '& mehr.',
            'slide.jkentertainment.desc': 'JK Entertainment: Online-Shop für Trading Card Games (Magic, Pokémon, Yu-Gi-Oh! & 6 weitere). Next.js Storefront, Produktkatalog mit über 4.000 Artikeln, Vorbestell-System und Community-Anbindung an zwei Stores in Frankfurt und Darmstadt.',
            'slide.jkentertainment.cta1': 'Live ansehen',
            'slide.jkentertainment.cta2': 'Projekt-Details',
            'slide.jkentertainment.tag1': 'Next.js',
            'slide.jkentertainment.tag2': 'E-Commerce',
            'slide.jkentertainment.tag3': 'TCG',
            'slide.jkentertainment.badge': 'TCG STORE',
            // About section (extra keys)
            'about.available': 'Verfügbar für Projekte & Festanstellung',
            'about.lead': 'Webentwickler & KI-Spezialist aus Bayern',
            'about.h1': 'Moderne Technologien & AI-first',
            'about.h2': 'Faire Preise & klare Kommunikation',
            'about.h3': 'Von Konzept bis Go-Live aus einer Hand',
            'about.skills.frontend': 'Frontend',
            'about.skills.backend': 'Backend & Data',
            'about.skills.ai': 'KI & Automation',
            'about.cta': 'Projekt besprechen',
            // Cookie consent
            'cookie.text': 'Diese Website verwendet nur technisch notwendige Cookies. Keine Tracking-Cookies.',
            'cookie.accept': 'Verstanden',
            'cookie.more': 'Datenschutz',
        },
        en: {
            'nav.services': 'Services',
            'nav.portfolio': 'Portfolio',
            'nav.pricing': 'Pricing',
            'nav.tech': 'Tech Stack',
            'nav.testimonials': 'Reviews',
            'nav.contact': 'Contact',
            'nav.projects': 'Projects',
            'services.tag': 'Packages & Pricing',
            'services.title': 'Transparent & fair — pick your path',
            'services.badge': '⭐ Recommended',
            'services.label.for': 'Perfect for',
            'services.label.deliver': 'You get',
            'services.label.examples': 'Examples',
            'services.web.title': 'Websites & Online Presence',
            'services.web.sub': 'Fast, clean websites that rank and convert.',
            'services.web.meta': '2–4 weeks · from €1,500',
            'services.web.for1': 'Trades, freelancers, SMBs',
            'services.web.for2': 'Relaunch of outdated sites',
            'services.web.for3': 'Landing pages for campaigns',
            'services.web.d1': 'Mobile-optimised website (1–8 pages)',
            'services.web.d2': 'SEO setup & Lighthouse 90+',
            'services.web.d3': 'GDPR-compliant, hosting configured',
            'services.web.d4': '30 days post-launch support',
            'services.web.link': 'Book intro call',
            'services.ai.title': 'AI & Automation',
            'services.ai.sub': 'Pragmatic AI that gives your team real hours back.',
            'services.ai.meta': '1–3 weeks · from €1,990',
            'services.ai.for1': 'Recurring manual tasks',
            'services.ai.for2': 'Customer chatbots & support automation',
            'services.ai.for3': 'Data analysis with LLMs / RAG',
            'services.ai.d1': 'Production-ready workflow or AI agent',
            'services.ai.d2': 'Integration with OpenAI / Claude / Ollama',
            'services.ai.d3': 'Documentation & team training',
            'services.ai.d4': '60 days support & tuning',
            'services.ai.link': 'Discuss your use case',
            'services.apps.title': 'Web Applications & Tools',
            'services.apps.sub': 'Dashboards, customer portals, internal tools — fullstack.',
            'services.apps.meta': '4–12 weeks · from €4,990',
            'services.apps.for1': 'Internal dashboard / customer portal',
            'services.apps.for2': 'Booking or admin systems',
            'services.apps.for3': 'API integrations & CRM hookups',
            'services.apps.d1': 'Full-featured web app (frontend + backend)',
            'services.apps.d2': 'Database, auth & roles',
            'services.apps.d3': 'CI/CD, hosting & monitoring',
            'services.apps.d4': 'Technical documentation',
            'services.apps.link': 'Sketch your idea',
            'services.design.title': 'Consulting & Code Review',
            'services.design.sub': 'A second opinion, honest feedback, clear next steps.',
            'services.design.meta': 'flexible · from €120/h',
            'services.design.for1': 'Existing projects with tech debt',
            'services.design.for2': 'Architecture or stack decisions',
            'services.design.for3': 'AI strategy for your business',
            'services.design.d1': 'Written review report with priorities',
            'services.design.d2': 'Concrete, actionable recommendations',
            'services.design.d3': '1:1 call to discuss',
            'services.design.d4': 'Optional: pair-programming session',
            'services.design.link': 'Book a slot',
            'services.cta.text': 'Not sure what you need? A 20-minute call usually clears it up.',
            'services.cta.button': 'Free intro call →',
            'skills.tag': 'Tech Stack',
            'skills.title': 'Tools I work with',
            'projects.tag': 'Selected Work',
            'projects.title': 'Portfolio',
            'projects.note': 'Note: Many of these projects are prototypes and personal builds. I currently work as a full-time employed software developer and do not offer commercial web services at the moment. Going freelance — part-time or full-time — is something I may consider in the future.',
            'projects.group.websites': 'Websites & Apps',
            'projects.group.games': 'Games',
            'about.tag': 'About me',
            'about.title': 'Maximilian Haak',
            'about.p1': 'I\'m Maximilian — a fullstack web developer and AI specialist based in Bruckmühl near Rosenheim, Bavaria. I build modern websites, web apps, and AI-powered automations for small and medium businesses in the region.',
            'about.p2': 'From a quick business website to a custom AI agent — I take your project from idea to go-live. My focus: clean code, fair pricing, and personal support without agency overhead.',
            'about.stat1': 'Years Experience',
            'about.stat2': 'Projects Delivered',
            'about.stat3': 'Client Satisfaction',
            'testimonials.tag': 'References',
            'testimonials.title': 'What Clients Say',
            'testimonials.coha.quote': '“Max built our MVP over a weekend. Three hours of briefing, then the site was live. Exactly the no-fuss execution we needed as a startup.”',
            'testimonials.coha.name': 'CoHa Founding Team',
            'testimonials.coha.role': 'Startup — Gastronomy',
            'testimonials.imkerei.quote': '“Our old site was ten years old. Now we sell honey directly online — and I can update content myself without having to ask every time.”',
            'testimonials.imkerei.name': 'Imkerei Feuerstein',
            'testimonials.imkerei.role': 'Local Business — Bruckmühl',
            'testimonials.soundoflvke.quote': '“I didn\'t want a generic musician page. Max got that, with audio player and tour data. Looks like a major label site — without their overhead.”',
            'testimonials.soundoflvke.name': 'SoundOfLvke',
            'testimonials.soundoflvke.role': 'Artist & Musician',
            'contact.tag': 'Contact',
            'contact.title': 'Let\'s talk',
            'contact.intro': "Tell me about your project — no strings attached. I'll get back to you personally, usually within one business day.",
            'contact.name': 'Name',
            'contact.email': 'Email',
            'contact.message': 'Message',
            'contact.send': 'Send message',
            'footer.impressum': 'Legal Notice',
            'footer.datenschutz': 'Privacy Policy',
            'hero.scroll': 'Scroll to explore',
            // Slide 1 - Maximilian Haak (Personal)
            'slide.maxhaak.t1': 'Maximilian',
            'slide.maxhaak.t2': 'Haak.',
            'slide.maxhaak.t3': 'Software Developer.',
            'slide.maxhaak.desc': 'Full-stack developer based in Bruckmühl near Rosenheim. Websites, web apps, and AI solutions — with TypeScript, React, and modern cloud technologies. 5+ years of experience, personal and reliable.',
            'slide.maxhaak.cta1': 'Free Consultation',
            'slide.maxhaak.cta2': 'View Projects',
            'slide.maxhaak.badge': 'AVAILABLE FOR PROJECTS',
            'slide.maxhaak.tag1': 'Full-Stack',
            'slide.maxhaak.tag2': 'TypeScript & React',
            'slide.maxhaak.tag3': 'AI & Automation',
            // Slide 2 - Imkerei Feuerstein
            'slide.imkerei.t1': 'Your Idea.',
            'slide.imkerei.t2': 'My Code.',
            'slide.imkerei.t3': 'Your Success.',
            'slide.imkerei.desc': 'Imkerei Feuerstein: React website with online shop — discussed personally, delivered in 3 weeks, deployed on Vercel. Responsive design, SEO-optimized, and a thrilled client.',
            'slide.imkerei.cta1': 'View Live',
            'slide.imkerei.cta2': 'Project Details',
            'slide.imkerei.tag1': 'React & Vercel',
            'slide.imkerei.tag2': '3 Weeks',
            'slide.imkerei.tag3': 'E-Commerce',
            // Slide 3 - AI Captain
            'slide.aicaptain.t1': 'AI Captain.',
            'slide.aicaptain.t2': 'VS Code',
            'slide.aicaptain.t3': 'Extension.',
            'slide.aicaptain.desc': 'My own product on the VS Code Marketplace: An AI agent for intelligent code generation, debugging, and review. Built with TypeScript, LLM APIs, and the VS Code Extension API.',
            'slide.aicaptain.cta1': 'Learn More',
            'slide.aicaptain.cta2': 'Project Details',
            'slide.aicaptain.tag1': 'VS Code Marketplace',
            'slide.aicaptain.tag2': 'TypeScript',
            'slide.aicaptain.tag3': 'LLM APIs',
            // Slide 4 - E46 Studio
            'slide.e46.t1': 'Desktop App.',
            'slide.e46.t2': 'BMW E46.',
            'slide.e46.t3': 'ECU Coding.',
            'slide.e46.desc': 'E46 Studio: An Electron app for BMW E46 ECU coding via serial interface. TypeScript, Node.js, and low-level communication — for a specialized automotive community.',
            'slide.e46.cta1': 'View Live',
            'slide.e46.cta2': 'Project Details',
            'slide.e46.tag1': 'Electron',
            'slide.e46.tag2': 'TypeScript',
            'slide.e46.tag3': 'Serial API',
            // Slide 5 - CoHa
            'slide.coha.t1': 'Startup.',
            'slide.coha.t2': 'Website.',
            'slide.coha.t3': 'More Clients.',
            'slide.coha.desc': 'For a Bavarian startup: Modern full-stack web design with React and TypeScript. Fast loading, conversion optimization, and responsive on all devices.',
            'slide.coha.cta1': 'View Live',
            'slide.coha.cta2': 'Project Details',
            'slide.coha.tag1': 'React & TypeScript',
            'slide.coha.tag2': 'Full-Stack',
            'slide.coha.tag3': 'Conversion Optimization',
            // Slide 6 - SoundOfLvke
            'slide.soundoflvke.t1': 'Sound.',
            'slide.soundoflvke.t2': 'Design.',
            'slide.soundoflvke.t3': 'Identity.',
            'slide.soundoflvke.desc': 'Portfolio website for a music artist — integrated audio player, release overview, and custom responsive design. Creative web development that brings brands to life.',
            'slide.soundoflvke.cta1': 'View Live',
            'slide.soundoflvke.cta2': 'Project Details',
            'slide.soundoflvke.tag1': 'Artist Branding',
            'slide.soundoflvke.tag2': 'Audio Integration',
            'slide.soundoflvke.tag3': 'Responsive Design',
            // Slide badges
            'slide.imkerei.badge': 'CLIENT PROJECT',
            'slide.aicaptain.badge': 'AI AGENT',
            'slide.e46.badge': 'DESKTOP APP',
            'slide.coha.badge': 'CLIENT REFERENCE',
            'slide.soundoflvke.badge': 'ARTIST WEBSITE',
            // Slide 7 - Shookroko
            'slide.shookroko.t1': 'Browser Game.',
            'slide.shookroko.t2': 'Phaser 3.',
            'slide.shookroko.t3': 'TypeScript.',
            'slide.shookroko.desc': 'Shookroko: An action browser game built with Phaser 3 and TypeScript. Custom game loop, asset pipeline, and a responsive canvas — game development meets the modern web.',
            'slide.shookroko.cta1': 'Play live',
            'slide.shookroko.cta2': 'Project Details',
            'slide.shookroko.tag1': 'Phaser 3',
            'slide.shookroko.tag2': 'TypeScript',
            'slide.shookroko.tag3': 'Game Dev',
            'slide.shookroko.badge': 'BROWSER GAME',
            // Slide 8 - Medieval Tower Defense
            'slide.medieval.t1': 'Medieval.',
            'slide.medieval.t2': 'Tower',
            'slide.medieval.t3': 'Defense.',
            'slide.medieval.desc': 'Medieval Tower Defense: A browser-playable strategy game in a medieval setting. Custom mechanics, wave system, and pixel art — built for the Vercel edge with a modern web stack.',
            'slide.medieval.cta1': 'Play live',
            'slide.medieval.cta2': 'Open Game',
            'slide.medieval.tag1': 'Browser Game',
            'slide.medieval.tag2': 'Tower Defense',
            'slide.medieval.tag3': 'Vercel',
            'slide.medieval.badge': 'TOWER DEFENSE',
            // Slide 9 - Daniel Brecheis
            'slide.danielbrecheis.t1': 'HR Coaching.',
            'slide.danielbrecheis.t2': 'Human',
            'slide.danielbrecheis.t3': 'Bridges.',
            'slide.danielbrecheis.desc': 'Daniel Brecheis — Human Bridges Consulting: Brand website for HR coaching, workshops and interim management. Clear typography, calm imagery and a premium presence for 25+ years of HR experience.',
            'slide.danielbrecheis.cta1': 'View Live',
            'slide.danielbrecheis.cta2': 'Project Details',
            'slide.danielbrecheis.tag1': 'Coaching',
            'slide.danielbrecheis.tag2': 'Branding',
            'slide.danielbrecheis.tag3': 'Vercel',
            'slide.danielbrecheis.badge': 'CONSULTING',
            // Slide 10 - Kaya Seeds
            'slide.kayaseeds.t1': 'Premium.',
            'slide.kayaseeds.t2': 'Cannabis',
            'slide.kayaseeds.t3': 'Seeds.',
            'slide.kayaseeds.desc': 'Kaya Seeds: e-commerce website for a Bavarian cannabis seed brand. Editorial layout, product grid, cart flow and a brand identity between 70s vibe and modern freshness.',
            'slide.kayaseeds.cta1': 'View Live',
            'slide.kayaseeds.cta2': 'Project Details',
            'slide.kayaseeds.tag1': 'E-Commerce',
            'slide.kayaseeds.tag2': 'Branding',
            'slide.kayaseeds.tag3': 'Shopify',
            'slide.kayaseeds.badge': 'ONLINE STORE',
            // Slide 11 - JK Entertainment
            'slide.jkentertainment.t1': 'TCG Shop.',
            'slide.jkentertainment.t2': 'Magic, Pokémon',
            'slide.jkentertainment.t3': '& more.',
            'slide.jkentertainment.desc': 'JK Entertainment: online shop for Trading Card Games (Magic, Pokémon, Yu-Gi-Oh! & 6 more). Next.js storefront, product catalog with 4,000+ items, pre-order system and community link to two stores in Frankfurt and Darmstadt.',
            'slide.jkentertainment.cta1': 'View Live',
            'slide.jkentertainment.cta2': 'Project Details',
            'slide.jkentertainment.tag1': 'Next.js',
            'slide.jkentertainment.tag2': 'E-Commerce',
            'slide.jkentertainment.tag3': 'TCG',
            'slide.jkentertainment.badge': 'TCG STORE',
            // About section (extra keys)
            'about.available': 'Available for Projects & Employment',
            'about.lead': 'Web Developer & AI Specialist from Bavaria',
            'about.h1': 'Modern Technologies & AI-first',
            'about.h2': 'Fair Prices & Clear Communication',
            'about.h3': 'From Concept to Go-Live in One Hand',
            'about.skills.frontend': 'Frontend',
            'about.skills.backend': 'Backend & Data',
            'about.skills.ai': 'AI & Automation',
            'about.cta': 'Discuss Your Project',
            // Cookie consent
            'cookie.text': 'This website uses only technically necessary cookies. No tracking cookies.',
            'cookie.accept': 'Understood',
            'cookie.more': 'Privacy Policy',
        }
    };

    let currentLang = localStorage.getItem('lang') || 'de';

    function applyTranslations(lang) {
        const dict = translations[lang];
        if (!dict) return;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) el.textContent = dict[key];
        });
        document.documentElement.lang = lang;
    }

    /* ═══ COLOR SCHEME TOGGLE ═══ */
    function getStoredTheme() {
        return localStorage.getItem('color-scheme') || 'dark';
    }

    function setColorScheme(scheme) {
        document.documentElement.setAttribute('data-color-scheme', scheme);
        localStorage.setItem('color-scheme', scheme);
    }

    /* ═══ COLOR THEME PICKER ═══ */
    const COLOR_THEMES = ['maxhaak', 'imkerei', 'coha', 'aicaptain', 'soundoflvke', 'shookroko', 'danielbrecheis', 'kayaseeds', 'jkentertainment'];

    /**
     * Theme controller — single source of truth for `data-project-theme`.
     *
     * Three writers compete for the attribute: the color picker (manual
     * override), the project slider (active slide → theme), and a scroll
     * observer (section enter → resync to active slide). Without coordination
     * the scroll observer's `onLeaveBack` previously hard-reset the theme,
     * silently undoing both slide- and user-driven colours.
     *
     * Design:
     *   - Every writer goes through `setProjectTheme(theme, source)`.
     *   - Slides remain authoritative: navigating projects always updates the
     *     site colour (`source: 'slider'`).
     *   - The picker is a transient manual override (`source: 'picker'`) and
     *     is persisted to localStorage so a hard reload remembers the choice
     *     until the next slide change reasserts the slide's colour.
     *   - The scroll observer (`source: 'scroll'`) only resyncs to the active
     *     slide on enter — there is no hard-reset on leave-back.
     *   - Writes are cached: identical themes do not retrigger the 0.6s
     *     CSS transitions on every theme-aware section.
     */
    const themeController = (() => {
        const root = document.documentElement;
        const stored = localStorage.getItem('themeColor');
        const validStored = COLOR_THEMES.includes(stored) ? stored : null;

        let currentTheme = validStored || root.getAttribute('data-project-theme') || 'maxhaak';

        if (validStored && validStored !== root.getAttribute('data-project-theme')) {
            root.setAttribute('data-project-theme', validStored);
        }

        function syncSwatches(theme) {
            // The e46 slide shares maxhaak's blue and has no dedicated swatch.
            const swatchKey = theme === 'e46' ? 'maxhaak' : theme;
            // Cache swatches on first call — they don't change after init.
            if (!syncSwatches.cache) {
                syncSwatches.cache = document.querySelectorAll('.color-swatch[data-color-theme]');
            }
            syncSwatches.cache.forEach(s => s.classList.toggle('active', s.dataset.colorTheme === swatchKey));
        }

        function setProjectTheme(theme, source) {
            if (!theme) return;
            if (source === 'picker') {
                try {
                    localStorage.setItem('themeColor', theme);
                } catch (_) { /* ignore quota / private mode errors */ }
            }
            if (theme === currentTheme) {
                syncSwatches(theme);
                return;
            }
            currentTheme = theme;
            root.setAttribute('data-project-theme', theme);
            syncSwatches(theme);
        }

        syncSwatches(currentTheme);

        return { setProjectTheme };
    })();

    function initColorPicker() {
        const wrap = document.querySelector('.color-picker');
        if (!wrap) return;
        const trigger = wrap.querySelector('.color-picker-trigger');
        const popover = wrap.querySelector('.color-picker-popover');
        const swatches = wrap.querySelectorAll('.color-swatch[data-color-theme]');

        function openPopover() {
            if (!popover || !trigger) return;
            popover.hidden = false;
            // Force reflow so the [data-open] transition animates from hidden state.
            void popover.offsetWidth;
            popover.dataset.open = 'true';
            trigger.setAttribute('aria-expanded', 'true');
        }

        function closePopover() {
            if (!popover || !trigger) return;
            popover.dataset.open = 'false';
            trigger.setAttribute('aria-expanded', 'false');
            // Hide after the CSS transition ends so it leaves the tab order.
            const onEnd = () => {
                popover.removeEventListener('transitionend', onEnd);
                if (popover.dataset.open !== 'true') popover.hidden = true;
            };
            popover.addEventListener('transitionend', onEnd);
        }

        if (trigger && popover) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                if (trigger.getAttribute('aria-expanded') === 'true') {
                    closePopover();
                } else {
                    openPopover();
                }
            });

            document.addEventListener('click', (e) => {
                if (trigger.getAttribute('aria-expanded') !== 'true') return;
                if (!wrap.contains(e.target)) closePopover();
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
                    closePopover();
                    trigger.focus();
                }
            });
        }

        swatches.forEach(sw => {
            sw.addEventListener('click', () => {
                themeController.setProjectTheme(sw.dataset.colorTheme, 'picker');
                closePopover();
            });
        });
    }

    /* ═══ MOBILE MENU ═══ */
    function initMobileMenu() {
        const toggle = document.getElementById('menuToggle');
        const links = document.getElementById('navLinks');
        if (!toggle || !links) return;

        toggle.addEventListener('click', () => {
            const open = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!open));
            toggle.classList.toggle('active', !open);
            links.classList.toggle('open', !open);
        });

        links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.classList.remove('active');
                links.classList.remove('open');
            });
        });
    }

    /* ═══ NAVBAR SCROLL STATE ═══ */
    function initNavbarScroll() {
        const nav = document.getElementById('navbar');
        if (!nav) return;
        const check = () => nav.classList.toggle('scrolled', window.scrollY > 50);
        window.addEventListener('scroll', check, { passive: true });
        check();
    }

    /* ═══ PROJECT SLIDER ═══ */
    class ProjectSlider {
        constructor() {
            this.section = document.querySelector('#projects');
            if (!this.section) return;

            this.slides = Array.from(this.section.querySelectorAll('.hero-slide'));
            this.navBtns = Array.from(this.section.querySelectorAll('.project-nav-btn'));

            // Re-sort slides to match nav button order (data-project ↔ data-theme)
            // so that index-based pairing in goToSlide() stays in sync after the
            // nav has been grouped/re-ordered visually.
            const slideByTheme = new Map(this.slides.map(s => [s.getAttribute('data-theme'), s]));
            const ordered = this.navBtns
                .map(btn => slideByTheme.get(btn.getAttribute('data-project')))
                .filter(Boolean);
            if (ordered.length === this.slides.length) {
                this.slides = ordered;
            }
            this.arrowLeft = this.section.querySelector('.slider-arrow-left');
            this.arrowRight = this.section.querySelector('.slider-arrow-right');
            this.slidesContainer = this.section.querySelector('.hero-slides-container');
            this.currentIndex = 0;
            this.isAnimating = false;

            if (this.slides.length === 0) return;

            this.bindEvents();
            this.updateContainerHeight();
        }

        updateContainerHeight() {
            if (!this.slidesContainer || this.slides.length === 0) return;
            // Avoid layout thrashing: do all writes (unhide), then all reads
            // (scrollHeight), then all restoring writes. Keeps the browser to
            // a single forced layout per resize instead of one per slide.
            const prev = this.slides.map(slide => ({
                hidden: slide.hidden,
                vis: slide.style.visibility,
            }));
            this.slides.forEach(slide => {
                slide.hidden = false;
                slide.style.visibility = 'visible';
            });
            let maxHeight = 0;
            this.slides.forEach(slide => {
                const h = slide.scrollHeight;
                if (h > maxHeight) maxHeight = h;
            });
            this.slides.forEach((slide, i) => {
                slide.hidden = prev[i].hidden;
                slide.style.visibility = prev[i].vis;
            });
            if (maxHeight > 0) {
                this.slidesContainer.style.minHeight = `${maxHeight}px`;
            }
        }

        bindEvents() {
            this.navBtns.forEach((btn, i) => {
                btn.addEventListener('click', () => this.goToSlide(i));
            });
            if (this.arrowLeft) {
                this.arrowLeft.addEventListener('click', () => this.navigate(-1));
            }
            if (this.arrowRight) {
                this.arrowRight.addEventListener('click', () => this.navigate(1));
            }

            // Touch / swipe support
            let touchStartX = 0;
            let touchStartY = 0;
            const swipeTarget = this.slidesContainer || this.section;
            if (swipeTarget) {
                swipeTarget.addEventListener('touchstart', (e) => {
                    touchStartX = e.changedTouches[0].screenX;
                    touchStartY = e.changedTouches[0].screenY;
                }, { passive: true });
                swipeTarget.addEventListener('touchend', (e) => {
                    const dx = e.changedTouches[0].screenX - touchStartX;
                    const dy = e.changedTouches[0].screenY - touchStartY;
                    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
                        this.navigate(dx < 0 ? 1 : -1);
                    }
                }, { passive: true });
            }

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                const tag = document.activeElement.tagName;
                if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement.isContentEditable) return;
                if (e.key === 'ArrowLeft') this.navigate(-1);
                if (e.key === 'ArrowRight') this.navigate(1);
            });

            // Recalculate container height on resize (debounced)
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => this.updateContainerHeight(), 100);
            });
        }

        navigate(direction) {
            const nextIndex = (this.currentIndex + direction + this.slides.length) % this.slides.length;
            this.goToSlide(nextIndex);
        }

        goToSlide(index) {
            if (index === this.currentIndex || this.isAnimating) return;
            this.isAnimating = true;

            const direction = index > this.currentIndex ? 1 : -1;
            const oldSlide = this.slides[this.currentIndex];
            const newSlide = this.slides[index];

            // Update nav buttons
            this.navBtns.forEach((btn, i) => {
                btn.classList.toggle('active', i === index);
                btn.setAttribute('aria-selected', String(i === index));
            });

            // Update project theme on <html> via the central controller.
            // Slider writes are gated by the user lock — if the user picked a
            // colour from the picker, slide changes will not override it.
            const theme = newSlide.getAttribute('data-theme');
            if (theme) {
                themeController.setProjectTheme(theme, 'slider');
            }

            this.currentIndex = index;
            this.animatePremiumTransition(oldSlide, newSlide, direction);
        }

        animatePremiumTransition(oldSlide, newSlide, direction) {
            if (typeof gsap === 'undefined') {
                this.animateWithCSS(oldSlide, newSlide, direction);
                return;
            }

            const config = {
                duration: 0.7,
                stagger: 0.05,
                xOffset: 120,
                parallaxRatio: 0.5,
            };

            const xOut = direction === 1 ? -config.xOffset : config.xOffset;
            const xIn = direction === 1 ? config.xOffset : -config.xOffset;

            // Kill any running tweens
            gsap.killTweensOf([oldSlide, newSlide]);
            gsap.killTweensOf(oldSlide.querySelectorAll('*'));
            gsap.killTweensOf(newSlide.querySelectorAll('*'));

            // Prepare new slide (visible but offset)
            newSlide.hidden = false;
            oldSlide.style.pointerEvents = 'none';
            newSlide.style.pointerEvents = 'auto';
            gsap.set(newSlide, {
                x: xIn,
                opacity: 0,
                visibility: 'visible',
                zIndex: 3,
            });

            const oldContent = {
                text: oldSlide.querySelector('.slide-text'),
                visual: oldSlide.querySelector('.slide-visual'),
            };

            const newContent = {
                text: newSlide.querySelector('.slide-text'),
                visual: newSlide.querySelector('.slide-visual'),
                titleLines: newSlide.querySelectorAll('.title-line'),
                desc: newSlide.querySelector('.slide-description'),
                cta: newSlide.querySelectorAll('.slide-cta .btn'),
                tags: newSlide.querySelector('.slide-tags'),
            };

            // Set initial states for new slide inner elements
            if (newContent.text) {
                gsap.set(newContent.text, { x: xIn * config.parallaxRatio, opacity: 0 });
            }
            if (newContent.visual) {
                gsap.set(newContent.visual, { x: xIn * 1.2, opacity: 0, scale: 0.95 });
            }

            // Master timeline
            const master = gsap.timeline({
                onComplete: () => {
                    oldSlide.classList.remove('active');
                    oldSlide.hidden = true;
                    oldSlide.style.pointerEvents = '';
                    gsap.set(oldSlide, { x: 0, opacity: 0, visibility: 'hidden', zIndex: 1 });
                    if (oldContent.text) gsap.set(oldContent.text, { x: 0, opacity: 1 });
                    if (oldContent.visual) gsap.set(oldContent.visual, { x: 0, opacity: 1, scale: 1 });

                    newSlide.classList.add('active');
                    newSlide.style.pointerEvents = '';
                    gsap.set(newSlide, { x: 0, opacity: 1, visibility: 'visible', zIndex: 2 });
                    if (newContent.text) gsap.set(newContent.text, { x: 0, opacity: 1 });
                    if (newContent.visual) gsap.set(newContent.visual, { x: 0, opacity: 1, scale: 1 });

                    document.dispatchEvent(new CustomEvent('slide:change', { detail: { slide: newSlide } }));
                    this.isAnimating = false;
                },
            });

            // === OLD SLIDE OUT ===

            // Visual exits first (faster — parallax)
            if (oldContent.visual) {
                master.to(oldContent.visual, {
                    x: xOut * 1.2,
                    opacity: 0,
                    scale: 0.95,
                    duration: config.duration * 0.8,
                    ease: 'power2.inOut',
                }, 0);
            }

            // Text exits (slower — parallax)
            if (oldContent.text) {
                master.to(oldContent.text, {
                    x: xOut * config.parallaxRatio,
                    opacity: 0,
                    duration: config.duration * 0.7,
                    ease: 'power2.inOut',
                }, 0.05);
            }

            // Fade out old slide container
            master.to(oldSlide, {
                opacity: 0,
                duration: config.duration * 0.5,
                ease: 'power2.in',
            }, 0.1);

            // === NEW SLIDE IN ===

            // Slide container enters
            master.to(newSlide, {
                x: 0,
                opacity: 1,
                duration: config.duration,
                ease: 'power3.out',
            }, 0.2);

            // Text enters (parallax — slower offset)
            if (newContent.text) {
                master.to(newContent.text, {
                    x: 0,
                    opacity: 1,
                    duration: config.duration * 0.9,
                    ease: 'power4.out',
                }, 0.25);
            }

            // Visual enters (parallax — faster offset)
            if (newContent.visual) {
                master.to(newContent.visual, {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: config.duration,
                    ease: 'power4.out',
                }, 0.3);
            }

            // === CONTENT REVEAL ===

            // Title lines — clip-path bottom-up reveal
            if (newContent.titleLines.length) {
                master.fromTo(newContent.titleLines,
                    { y: 30, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
                    {
                        y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)',
                        stagger: 0.1,
                        duration: 0.6,
                        ease: 'power4.out',
                    },
                    0.35
                );
            }

            // Description
            if (newContent.desc) {
                master.fromTo(newContent.desc,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
                    0.55
                );
            }

            // CTA buttons — staggered with bounce
            if (newContent.cta.length) {
                master.fromTo(newContent.cta,
                    { y: 15, opacity: 0, scale: 0.95 },
                    {
                        y: 0, opacity: 1, scale: 1,
                        stagger: 0.08,
                        duration: 0.4,
                        ease: 'back.out(1.4)',
                    },
                    0.65
                );
            }

            // Tags
            if (newContent.tags) {
                master.fromTo(newContent.tags,
                    { y: 10, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' },
                    0.75
                );
            }

            // Showcase elements
            this.animateShowcaseElements(newSlide, master);
        }

        animateShowcaseElements(slide, timeline) {
            const frame = slide.querySelector('.showcase-frame');
            const floatPhoto = slide.querySelector('.hero-photo-float');
            const placeholder = slide.querySelector('.placeholder-content');
            const badge = slide.querySelector('.showcase-badge');

            if (floatPhoto) {
                // Cutout hero portrait stays flat — only fade in.
                if (floatPhoto.classList.contains('is-cutout')) {
                    timeline.fromTo(floatPhoto,
                        { opacity: 0, y: 16 },
                        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
                        0.4
                    );
                } else {
                    // 3D tilt entrance — matches browser frame animation style
                    timeline.fromTo(floatPhoto,
                        { opacity: 0, rotateY: -15, rotateX: 8, scale: 0.9, transformPerspective: 1200 },
                        { opacity: 1, rotateY: -5, rotateX: 2, scale: 1, duration: 0.8, ease: 'power4.out' },
                        0.4
                    );
                }
            }

            if (frame) {
                // Browser mockup — 3D tilt entrance
                timeline.fromTo(frame,
                    { opacity: 0, rotateY: -15, rotateX: 8, scale: 0.9, transformPerspective: 1200 },
                    {
                        opacity: 1, rotateY: -5, rotateX: 2, scale: 1,
                        duration: 0.8,
                        ease: 'power4.out',
                    },
                    0.4
                );

                // Browser dots — elastic scale pop
                const dots = frame.querySelectorAll('.browser-bar .dot');
                if (dots.length) {
                    timeline.fromTo(dots,
                        { opacity: 0, scale: 0 },
                        {
                            opacity: 1, scale: 1,
                            stagger: 0.06,
                            duration: 0.3,
                            ease: 'elastic.out(1, 0.5)',
                        },
                        0.7
                    );
                }

                // Screenshot image — scale reveal
                const img = frame.querySelector('img');
                if (img) {
                    timeline.fromTo(img,
                        { opacity: 0, scale: 1.1 },
                        { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' },
                        0.5
                    );
                }
            }

            if (placeholder) {
                timeline.fromTo(placeholder,
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' },
                    0.4
                );
            }

            if (badge) {
                timeline.fromTo(badge,
                    { opacity: 0, y: -20, scale: 0.7, z: 40 },
                    {
                        opacity: 1, y: 0, scale: 1, z: 40,
                        duration: 0.5,
                        ease: 'back.out(1.4)',
                    },
                    0.8
                );
            }
        }

        animateWithCSS(oldSlide, newSlide, direction) {
            newSlide.hidden = false;
            oldSlide.style.pointerEvents = 'none';
            newSlide.style.pointerEvents = 'auto';
            newSlide.style.opacity = '0';
            newSlide.style.transform = `translateX(${direction === 1 ? 60 : -60}px)`;

            requestAnimationFrame(() => {
                newSlide.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                oldSlide.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                newSlide.style.opacity = '1';
                newSlide.style.transform = 'translateX(0)';
                oldSlide.style.opacity = '0';
                oldSlide.style.transform = `translateX(${direction === 1 ? -60 : 60}px)`;
            });

            setTimeout(() => {
                oldSlide.classList.remove('active');
                oldSlide.hidden = true;
                oldSlide.style.cssText = '';
                newSlide.classList.add('active');
                newSlide.style.cssText = '';
                document.dispatchEvent(new CustomEvent('slide:change', { detail: { slide: newSlide } }));
                this.isAnimating = false;
            }, 500);
        }

        playEntrance() {
            if (typeof gsap === 'undefined') return;

            // Animate static hero content
            const heroSection = document.querySelector('#hero');
            if (!heroSection) return;

            const titleLines = heroSection.querySelectorAll('.title-line');
            const desc = heroSection.querySelector('.slide-description');
            const ctaButtons = heroSection.querySelectorAll('.slide-cta .btn');
            const tags = heroSection.querySelector('.slide-tags');
            const visual = heroSection.querySelector('.hero-visual');
            const details = heroSection.querySelector('.hero-details');

            // Set initial hidden states
            gsap.set(titleLines, { y: 30, opacity: 0, clipPath: 'inset(0 0 100% 0)' });
            if (desc) gsap.set(desc, { y: 20, opacity: 0 });
            gsap.set(ctaButtons, { y: 15, opacity: 0, scale: 0.95 });
            if (tags) gsap.set(tags, { y: 10, opacity: 0 });
            if (visual) gsap.set(visual, { y: 40, opacity: 0 });
            if (details) gsap.set(details, { y: 30, opacity: 0 });

            const tl = gsap.timeline({ delay: 0.3 });

            // Visual rises up
            if (visual) {
                tl.to(visual, {
                    y: 0, opacity: 1,
                    duration: 0.8, ease: 'power3.out',
                }, 0.1);
            }

            // Title lines — bottom-up clip reveal
            tl.to(titleLines, {
                y: 0, opacity: 1,
                clipPath: 'inset(0 0 0% 0)',
                stagger: 0.1,
                duration: 0.6,
                ease: 'power4.out',
            }, 0.2);

            // Description
            if (desc) {
                tl.to(desc, {
                    y: 0, opacity: 1,
                    duration: 0.5, ease: 'power3.out',
                }, 0.5);
            }

            // CTA buttons — staggered bounce
            if (ctaButtons.length) {
                tl.to(ctaButtons, {
                    y: 0, opacity: 1, scale: 1,
                    stagger: 0.08,
                    duration: 0.4,
                    ease: 'back.out(1.4)',
                }, 0.65);
            }

            // Tags
            if (tags) {
                tl.to(tags, {
                    y: 0, opacity: 1,
                    duration: 0.4, ease: 'power3.out',
                }, 0.75);
            }

            // Hero photo float entrance
            const heroPhoto = heroSection.querySelector('.hero-photo-float');
            if (heroPhoto) {
                if (heroPhoto.classList.contains('is-cutout')) {
                    tl.fromTo(heroPhoto,
                        { opacity: 0, y: 16 },
                        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
                        0.4
                    );
                } else {
                    tl.fromTo(heroPhoto,
                        { opacity: 0, rotateY: -15, rotateX: 8, scale: 0.9, transformPerspective: 1200 },
                        { opacity: 1, rotateY: -5, rotateX: 2, scale: 1, duration: 0.8, ease: 'power4.out' },
                        0.4
                    );
                }
            }

            // Hero photo badge
            const heroBadge = heroSection.querySelector('.showcase-badge');
            if (heroBadge) {
                tl.fromTo(heroBadge,
                    { opacity: 0, y: -20, scale: 0.7 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)' },
                    0.8
                );
            }

            // Details section (skills + stats) — scroll-triggered
            if (details && typeof ScrollTrigger !== 'undefined') {
                gsap.to(details, {
                    y: 0, opacity: 1,
                    duration: 0.7, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: details,
                        start: 'top 85%',
                        once: true,
                    },
                });
            }

            // Scroll hint
            const scrollHint = document.querySelector('.scroll-hint');
            if (scrollHint) {
                tl.from(scrollHint, { opacity: 0, duration: 0.5 }, 0.9);
            }
        }
    }

    /* ═══ GSAP ANIMATIONS ═══ */
    function initAnimations() {
        if (typeof gsap === 'undefined') {
            document.querySelectorAll('.scroll-reveal').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            return;
        }

        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Hero orb scroll parallax — intentionally disabled.
        // The orbs already animate via CSS @keyframes (float-slow, pulse-glow).
        // Adding a scroll-tied GSAP tween on top doubled the compositor work
        // for no real visual gain and was a major contributor to scroll lag.
        const heroOrbs = document.querySelectorAll('.hero-orb');

        // Theme sync — when the projects section enters the viewport, align
        // the global theme with the active slide. Going back up no longer
        // hard-resets to a default colour: that previously clobbered both the
        // user's picker choice and any other slide-derived theme. The shared
        // controller also no-ops when the user has locked a colour.
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            ScrollTrigger.create({
                trigger: projectsSection,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => {
                    const activeSlide = projectsSection.querySelector('.hero-slide.active');
                    const theme = activeSlide && activeSlide.getAttribute('data-theme');
                    if (theme) themeController.setProjectTheme(theme, 'scroll');
                },
            });
        }

        // Track hero/projects visibility — used to pause orbs and parallax.
        const heroSection = document.querySelector('.hero-section');
        let parallaxTargetsVisible = true;

        if (heroSection && heroOrbs.length) {
            // Pause both the orb float animations AND the heroFloat keyframe
            // on the profile photo when the hero is off-screen. The photo's
            // animation kept running (and re-blurring its shadow) even from
            // the contact section.
            const heroPhotoFloats = document.querySelectorAll('#hero .hero-photo-float, .hero-slide.active .hero-photo-float');
            const orbObserver = new IntersectionObserver(
                (entries) => {
                    const isVisible = entries[0].isIntersecting;
                    parallaxTargetsVisible = isVisible || !!document.querySelector('#projects.in-view');
                    const state = isVisible ? 'running' : 'paused';
                    heroOrbs.forEach(orb => { orb.style.animationPlayState = state; });
                    heroPhotoFloats.forEach(el => { el.style.animationPlayState = state; });
                },
                { threshold: 0 }
            );
            orbObserver.observe(heroSection);
        }

        // Also track projects section visibility (hero-photo-float lives in #hero,
        // but slide showcase frames are in #projects).
        if (projectsSection) {
            const projObserver = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        projectsSection.classList.add('in-view');
                        parallaxTargetsVisible = true;
                    } else {
                        projectsSection.classList.remove('in-view');
                        // Recompute visibility: still active if hero is visible.
                        const heroVisible = heroSection
                            ? heroSection.getBoundingClientRect().bottom > 0
                              && heroSection.getBoundingClientRect().top < window.innerHeight
                            : false;
                        parallaxTargetsVisible = heroVisible;
                    }
                },
                { threshold: 0 }
            );
            projObserver.observe(projectsSection);
        }

        // Showcase mouse parallax.
        // Disabled entirely on coarse pointers (touch devices) where it does
        // nothing useful and just wastes battery. Uses gsap.quickTo so we
        // reuse a single tween per target instead of spawning a new tween
        // on every mousemove (which was the main source of scroll/move lag).
        const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!isCoarsePointer && !reducedMotion) {
            // quickTo binds to a specific element + property. We rebind whenever
            // the active slide changes so the tween targets the visible frame.
            let frameRotY = null, frameRotX = null;
            let floatRotY = null, floatRotX = null;
            let lastFrame = null, lastFloat = null;

            const bindQuickTo = (el, target) => {
                const opts = { duration: 0.6, ease: 'power2.out' };
                if (target === 'frame') {
                    frameRotY = gsap.quickTo(el, 'rotateY', opts);
                    frameRotX = gsap.quickTo(el, 'rotateX', opts);
                    lastFrame = el;
                } else {
                    floatRotY = gsap.quickTo(el, 'rotateY', opts);
                    floatRotX = gsap.quickTo(el, 'rotateX', opts);
                    lastFloat = el;
                }
            };

            // Cache the active parallax targets. Recomputed only when the slide
            // actually changes (event from ProjectSlider) instead of on every
            // mousemove frame, which used to do two full DOM queries 60×/sec.
            let cachedFrame = null;
            let cachedFloat = null;
            const refreshTargets = () => {
                cachedFrame = document.querySelector('.hero-slide.active .showcase-frame');
                const candidate = document.querySelector('.hero-slide.active .hero-photo-float')
                    || document.querySelector('#hero .hero-photo-float');
                // Skip mouse parallax tilt for the transparent cutout portrait.
                cachedFloat = (candidate && !candidate.classList.contains('is-cutout'))
                    ? candidate
                    : null;
            };
            refreshTargets();
            document.addEventListener('slide:change', refreshTargets);

            let mouseTicking = false;
            document.addEventListener('mousemove', (e) => {
                if (mouseTicking || !parallaxTargetsVisible) return;
                mouseTicking = true;
                requestAnimationFrame(() => {
                    const normX = (e.clientX / window.innerWidth - 0.5);
                    const normY = (e.clientY / window.innerHeight - 0.5);
                    const ry = -5 + normX * 10;
                    const rx = 2 - normY * 6;
                    if (cachedFrame) {
                        if (cachedFrame !== lastFrame) bindQuickTo(cachedFrame, 'frame');
                        frameRotY(ry); frameRotX(rx);
                    }
                    if (cachedFloat) {
                        if (cachedFloat !== lastFloat) bindQuickTo(cachedFloat, 'float');
                        floatRotY(ry); floatRotX(rx);
                    }
                    mouseTicking = false;
                });
            }, { passive: true });
        }

        // Scroll reveal batch
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.batch('.scroll-reveal', {
                onEnter: (batch) => {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: 'power2.out',
                        stagger: 0.1,
                        overwrite: true,
                    });
                },
                start: 'top 85%',
                once: true,
            });
        }

        initSkillsAnimation();
    }

    /* ═══ SKILLS SECTION ANIMATION ═══
       Constellation-cascade reveal for the Tech Stack section. Drives:
       - column titles fading + underline reveal
       - per-column staggered tag pop-in with rotation
       - icon pop-in inside tags
       - continuous pulse on highlight tags (AI column), paused when off-screen
       - count-up for the .stat-number values below the grid */
    function initSkillsAnimation() {
        const section = document.querySelector('.skills-section');
        if (!section) return;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const titles = section.querySelectorAll('.skill-category-title');
        const categories = section.querySelectorAll('.skill-category');
        const stats = section.querySelectorAll('.stat-number');
        const highlightTags = section.querySelectorAll('.skill-tag.highlight');

        const reveal = () => {
            section.classList.add('is-animated');

            if (prefersReduced || typeof gsap === 'undefined') {
                section.querySelectorAll('.skill-tag, .skill-category-title')
                    .forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
                stats.forEach((el) => {
                    const m = el.textContent.trim().match(/^(\d+)(.*)$/);
                    if (m) el.textContent = m[1] + m[2];
                });
                highlightTags.forEach((t) => t.classList.add('is-pulsing'));
                return;
            }

            // Column titles fade + slide
            gsap.to(titles, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.12,
            });

            // Per-column tag cascade with column offset
            categories.forEach((cat, colIdx) => {
                const tags = cat.querySelectorAll('.skill-tag');
                if (!tags.length) return;
                gsap.fromTo(tags, {
                    opacity: 0,
                    y: 24,
                    scale: 0.85,
                    rotation: () => (Math.random() * 6 - 3),
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    duration: 0.55,
                    ease: 'back.out(1.6)',
                    stagger: 0.045,
                    delay: 0.15 + colIdx * 0.12,
                    onComplete: () => {
                        if (colIdx === categories.length - 1) startPulse();
                    },
                });

                // Icon pop-in
                const icons = cat.querySelectorAll('.skill-icon');
                if (icons.length) {
                    gsap.fromTo(icons, {
                        scale: 0,
                    }, {
                        scale: 1,
                        duration: 0.4,
                        ease: 'back.out(2)',
                        stagger: 0.04,
                        delay: 0.3 + colIdx * 0.12,
                    });
                }
            });

            // Stat counters
            stats.forEach((el) => {
                const raw = el.textContent.trim();
                const m = raw.match(/^(\d+)(.*)$/);
                if (!m) return;
                const target = parseInt(m[1], 10);
                const suffix = m[2];
                const obj = { val: 0 };
                el.textContent = '0' + suffix;
                gsap.to(obj, {
                    val: target,
                    duration: 1.2,
                    ease: 'power2.out',
                    delay: 0.4,
                    onUpdate: () => {
                        el.textContent = Math.round(obj.val) + suffix;
                    },
                });
            });
        };

        // Pulse loop on highlight tags, gated by viewport visibility.
        // Arming happens inside startPulse() so the loop never fires before
        // the cascade animation finishes.
        const startPulse = () => {
            if (prefersReduced) return;
            highlightTags.forEach((t) => {
                t.dataset.pulseArmed = '1';
                t.classList.add('is-pulsing');
            });
        };
        if ('IntersectionObserver' in window && highlightTags.length) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    highlightTags.forEach((t) => {
                        if (t.dataset.pulseArmed !== '1') return;
                        if (entry.isIntersecting) {
                            t.classList.add('is-pulsing');
                        } else {
                            t.classList.remove('is-pulsing');
                        }
                    });
                });
            }, { rootMargin: '0px 0px -10% 0px' });
            io.observe(section);
        }

        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.create({
                trigger: section,
                start: 'top 75%',
                once: true,
                onEnter: reveal,
            });
        } else {
            reveal();
        }
    }

    /* ═══ CONTACT FORM ═══ */
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-primary');
            const originalText = btn.textContent;
            const action = form.getAttribute('action') || '';

            const resetBtn = (delay) => {
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('is-success', 'is-error');
                    btn.disabled = false;
                }, delay);
            };

            // Mailto fallback (no backend) — build a pre-filled email and open the user's mail client
            if (action.startsWith('mailto:')) {
                const name = (form.querySelector('#name')?.value || '').trim();
                const email = (form.querySelector('#email')?.value || '').trim();
                const message = (form.querySelector('#message')?.value || '').trim();
                const subject = currentLang === 'de'
                    ? `Anfrage über maximilianhaak.de — ${name}`
                    : `Inquiry via maximilianhaak.de — ${name}`;
                const body = `${message}\n\n—\n${name}\n${email}`;
                const target = `${action}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.location.href = target;
                btn.textContent = currentLang === 'de' ? '✓ E-Mail-Programm geöffnet' : '✓ Mail client opened';
                btn.classList.add('is-success');
                resetBtn(4000);
                return;
            }

            btn.disabled = true;
            btn.textContent = currentLang === 'de' ? 'Wird gesendet...' : 'Sending...';

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    btn.textContent = currentLang === 'de' ? '✓ Gesendet!' : '✓ Sent!';
                    btn.classList.add('is-success');
                    form.reset();
                    resetBtn(3000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                btn.textContent = currentLang === 'de' ? '✗ Fehler — bitte per E-Mail' : '✗ Error — please use email';
                btn.classList.add('is-error');
                resetBtn(4000);
            }
        });
    }

    /* ═══ COOKIE CONSENT ═══ */
    function initCookieConsent() {
        const banner = document.getElementById('cookieConsent');
        const acceptBtn = document.getElementById('cookieAccept');
        if (!banner || !acceptBtn) return;

        // Load Google Fonts only after consent (GDPR compliance)
        function loadGoogleFonts() {
            if (document.querySelector('link[data-google-fonts]')) return;
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.setAttribute('data-google-fonts', 'true');
            link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
            document.head.appendChild(link);
        }

        // If already consented, load fonts immediately
        if (localStorage.getItem('cookieConsent') === 'accepted') {
            loadGoogleFonts();
        }

        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => { banner.style.display = ''; }, 1000);
        }

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            banner.style.display = 'none';
            loadGoogleFonts();
        });

        window.showConsentManager = function () {
            banner.style.display = '';
        };
    }

    /* ═══ HERO PHOTO ═══ */
    // Single static photo — crossfade removed by request.
    function initHeroPhotoSwap() {}

    /* ═══ HERO BACKGROUND SLIDESHOW ═══
       Crossfades through .hero-bg-slide elements. Pauses while the tab
       is hidden or the user prefers reduced motion. The first slide is
       already marked .is-active in HTML so first paint is instant. */
    function initHeroBgSlideshow() {
        const slides = Array.from(document.querySelectorAll('.hero-bg-slide'));
        if (slides.length < 2) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) return;

        const intervalMs = 7000;
        let index = slides.findIndex(s => s.classList.contains('is-active'));
        if (index < 0) {
            index = 0;
            slides[0].classList.add('is-active');
        }

        let timerId = null;
        const tick = () => {
            const next = (index + 1) % slides.length;
            slides[index].classList.remove('is-active');
            slides[next].classList.add('is-active');
            index = next;
        };
        const start = () => {
            if (timerId === null) timerId = window.setInterval(tick, intervalMs);
        };
        const stop = () => {
            if (timerId !== null) {
                window.clearInterval(timerId);
                timerId = null;
            }
        };

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stop(); else start();
        });

        start();
    }

    /* ═══ INIT ═══ */
    function init() {
        // Color scheme
        setColorScheme(getStoredTheme());
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-color-scheme');
                setColorScheme(current === 'dark' ? 'light' : 'dark');
            });
        }

        // Language
        applyTranslations(currentLang);
        const langBtn = document.getElementById('langToggle');
        if (langBtn) {
            const updateLangLabel = () => {
                const label = langBtn.querySelector('.lang-label');
                if (label) label.textContent = currentLang === 'de' ? 'EN' : 'DE';
            };
            updateLangLabel();
            langBtn.addEventListener('click', () => {
                currentLang = currentLang === 'de' ? 'en' : 'de';
                localStorage.setItem('lang', currentLang);
                applyTranslations(currentLang);
                updateLangLabel();
            });
        }

        initMobileMenu();
        initNavbarScroll();
        initContactForm();
        initCookieConsent();
        initAnimations();
        initHeroPhotoSwap();
        initHeroBgSlideshow();
        initColorPicker();

        // Project slider
        const slider = new ProjectSlider();
        slider.playEntrance();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
