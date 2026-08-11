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
            'nav.about': 'Über mich',
            'nav.pricing': 'Pakete',
            'nav.tech': 'Tech Stack',
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
            'services.availability.badge': 'Ab 01.10.2026',
            'services.availability.title': 'Angebote & Dienstleistungen gibt es ab dem 1. Oktober 2026.',
            'services.availability.text': 'Bis dahin nehme ich Anfragen entgegen und erstelle unverbindliche Angebote — die Umsetzung startet ab dem 1.10.',
            'services.availability.cta': 'Jetzt Platz sichern →',
            'skills.tag': 'Tech Stack',
            'skills.title': 'Mit welchen Tools ich arbeite',
            'projects.tag': 'Ausgewählte Arbeiten',
            'projects.title': 'Projekte / Portfolio',
            'projects.note': 'Hinweis: Viele dieser Projekte sind Prototypen und Eigenentwicklungen. Aktuell bin ich in Festanstellung als Software-Entwickler tätig und biete keine kommerziellen Web-Dienstleistungen an. Künftig ist eine selbstständige Tätigkeit nebenberuflich oder hauptberuflich denkbar.',
            'projects.group.websites': 'Websites & Apps',
            'projects.group.games': 'Games',
            'projects.mode.customers': 'Kundenprojekte',
            'projects.mode.own': 'Eigene Projekte',
            'about.title': 'Über mich',
            'about.eyebrow': 'Persönlich',
            'about.imageAlt': 'Maximilian Haak vor seinem BMW E46 mit Alpenpanorama',
            'about.p1': 'Aufgewachsen in Bruckmühl, irgendwo zwischen Vereinsplatz, Werkstatt und Alpenpanorama. Familie und ein paar enge Freunde halten mich geerdet, und ein großer Teil meiner Geduld kommt vermutlich daher, dass ich früh angefangen habe, an einem alten BMW selbst rumzuschrauben.',
            'about.p2': 'Im Alltag findet man mich meistens auf dem Fußballplatz oder im Gym, und danach läuft Musik. Mal sitze ich an eigenen Beats, mal an der Percussion, manchmal ist es auch einfach laute Musik im Auto auf dem Heimweg.',
            'about.p3': 'Die größte Konstante sind aber die zwei E46. Beide gehören mir, beide haben ihre Eigenheiten, und beide haben mir beigebracht, dass man Dinge auch dann fertig macht, wenn sie beim dritten Anlauf immer noch nicht passen. Genau diese Geduld nehme ich mit in jedes Projekt.',
            'about.passion.label': 'Meine beiden E46',
            'about.passion.text': 'Zwei BMW E46, beide meine, beide mit eigener Geschichte. Weil das mehr Hobby ist als Fortbewegung, haben die zwei eine eigene Seite bekommen.',
            'about.passion.imageAlt': 'Meine beiden BMW E46 nebeneinander am Feldrand im Abendlicht',
            'about.highlight.ageLabel': 'Alter',
            'about.highlight.age': '25 Jahre',
            'about.highlight.codeLabel': 'Heimat',
            'about.highlight.code': 'Bruckmühl · Oberbayern',
            'about.highlight.lifeLabel': 'Ausgleich',
            'about.highlight.life': 'Fußball · Gym · E46',
            'about.highlight.musicLabel': 'Musik',
            'about.highlight.music': 'Percussion · Cajon · Rap · Beats',
            'about.stat1': 'Jahre Erfahrung',
            'about.stat2': 'Projekte umgesetzt',
            'about.stat3': 'Kundenzufriedenheit',
            'contact.tag': 'Kontakt',
            'contact.title': 'Lassen Sie uns sprechen',
            'contact.intro': 'Erzählen Sie mir von Ihrem Vorhaben — ganz unverbindlich. Ich melde mich persönlich bei Ihnen zurück, in der Regel innerhalb eines Werktags.',
            'contact.name': 'Name',
            'contact.email': 'E-Mail',
            'contact.message': 'Nachricht',
            'contact.send': 'Nachricht senden',
            'contact.map.title': 'Bruckmühl / Rosenheim',
            'contact.map.open': 'Karte öffnen',
            'contact.status.sending': 'Wird gesendet...',
            'contact.status.success': 'Danke, Ihre Nachricht wurde gesendet.',
            'contact.status.error': 'Das hat leider nicht geklappt. Bitte schreiben Sie mir direkt per E-Mail.',
            'contact.status.mailClient': 'Ihr E-Mail-Programm wurde geöffnet.',
            'footer.impressum': 'Impressum',
            'footer.datenschutz': 'Datenschutz',
            // Hero (statisch, Foto-first)
            'hero.eyebrow': 'Maximilian Haak — Softwareentwickler',
            'hero.title1': 'Websites, Web\u2011Apps',
            'hero.title2': 'und KI-Lösungen.',
            'hero.title3': 'Sauber gebaut.',
            'hero.desc': 'Seit über fünf Jahren entwickle ich Software mit TypeScript, React und modernen Cloud-Technologien — aus Bruckmühl bei Rosenheim, persönlich und direkt.',
            'hero.cta1': 'Projekte ansehen',
            'hero.cta2': 'Kontakt aufnehmen',
            // Slide 2 - Imkerei Feuerstein
            'slide.imkerei.t1': 'Honig-Shop.',
            'slide.imkerei.t2': 'Familienimkerei.',
            'slide.imkerei.t3': 'Online verkauft.',
            'slide.imkerei.desc': 'Vollständiger Online-Shop für die Familienimkerei Feuerstein aus Elchingen: Produktkatalog mit Honig-Sorten, Warenkorb, News-Bereich und Kundenbewertungen. Gebaut mit Next.js, auf Vercel deployed — schnell, SEO-optimiert und responsiv auf allen Geräten.',
            'slide.imkerei.cta1': 'Shop ansehen',
            'slide.imkerei.cta2': 'Projekt-Details',
            'slide.imkerei.tag1': 'Next.js & Vercel',
            'slide.imkerei.tag2': 'E-Commerce',
            'slide.imkerei.tag3': 'SEO & Performance',
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
            'slide.coha.t1': 'Restaurant-Site.',
            'slide.coha.t2': 'Vietnamesisch.',
            'slide.coha.t3': 'Tische gefüllt.',
            'slide.coha.desc': 'Website für Co Ha, ein vietnamesisches Restaurant in Bruckmühl: Speisekarte, Galerie, Online-Reservierung und Google-Bewertungen. Gebaut mit Next.js — schnell, mobil-optimiert und konsequent auf Reservierungen ausgerichtet.',
            'slide.coha.cta1': 'Live ansehen',
            'slide.coha.cta2': 'Projekt-Details',
            'slide.coha.tag1': 'Next.js & Vercel',
            'slide.coha.tag2': 'Speisekarte & Reservierung',
            'slide.coha.tag3': 'Lokale SEO',
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
            // dog-kennel-online (in Arbeit, ohne Bild/Detailseite)
            'slide.dogkennel.t1': 'dog-kennel-online.',
            'slide.dogkennel.t2': 'Kennel',
            'slide.dogkennel.t3': 'Management.',
            'slide.dogkennel.desc': 'dog-kennel-online: Eine Web-Plattform für Hundepensionen — Buchungen, Belegung, Hunde- und Halterprofile sowie tägliche Abläufe an einem Ort. Aktuell in Entwicklung; Detailseite folgt.',
            'slide.dogkennel.cta1': 'Anfragen',
            'slide.dogkennel.cta2': 'Detailseite folgt',
            'slide.dogkennel.tag1': 'Web App',
            'slide.dogkennel.tag2': 'Booking',
            'slide.dogkennel.tag3': 'In Arbeit',
            'slide.dogkennel.badge': 'IN ARBEIT',
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

            'slide.senihelp24.t1': 'Senihelp24.',
            'slide.senihelp24.t2': '24h-Pflege',
            'slide.senihelp24.t3': 'zu Hause.',
            'slide.senihelp24.desc': 'Senihelp24 vermittelt keine Betreuungskräfte, sondern stellt sie selbst an — 24h-Pflege für Angehörige zu Hause. Ich baue dafür den neuen Web-Auftritt: Leistungen, Kostenrechner und ein Anfrage-Flow, der Familien in einer schwierigen Situation schnell zu einer klaren Antwort führt. Aktuell in Entwicklung.',
            'slide.senihelp24.cta1': 'Anfragen',
            'slide.senihelp24.cta2': 'Bald live',
            'slide.senihelp24.tag1': 'Next.js & Vercel',
            'slide.senihelp24.tag2': 'Pflege & Betreuung',
            'slide.senihelp24.tag3': 'In Arbeit',
            'slide.senihelp24.badge': 'IN ARBEIT',

            'slide.albert.t1': 'Albert Royale.',
            'slide.albert.t2': 'Dein Albert',
            'slide.albert.t3': 'lernt von dir.',
            'slide.albert.desc': 'Ein 3D-Battle-Royale mit einem neuronalen Netz als Gegner-Gehirn: In Phase 1 spielst du selbst — jede deiner Aktionen wird aufgezeichnet und per Behavior Cloning in einem Web Worker trainiert. In Phase 2 tritt dein Albert allein gegen fünfzehn andere an, und du schaust nur noch zu.',
            'slide.albert.cta1': 'Projekt ansehen',
            'slide.albert.cta2': 'Auf GitHub',
            'slide.albert.tag1': 'Three.js & TypeScript',
            'slide.albert.tag2': 'Neuronale Netze',
            'slide.albert.tag3': 'Behavior Cloning',
            'slide.albert.badge': 'KI-SPIEL',

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
            'nav.about': 'About me',
            'nav.pricing': 'Pricing',
            'nav.tech': 'Tech Stack',
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
            'services.availability.badge': 'From 01 Oct 2026',
            'services.availability.title': 'Offers and services are available from 1 October 2026.',
            'services.availability.text': 'Until then I take enquiries and prepare non-binding quotes — delivery starts on 1 October.',
            'services.availability.cta': 'Reserve your slot →',
            'skills.tag': 'Tech Stack',
            'skills.title': 'Tools I work with',
            'projects.tag': 'Selected Work',
            'projects.title': 'Projects / Portfolio',
            'projects.note': 'Note: Many of these projects are prototypes and personal builds. I currently work as a full-time employed software developer and do not offer commercial web services at the moment. Going freelance — part-time or full-time — is something I may consider in the future.',
            'projects.group.websites': 'Websites & Apps',
            'projects.group.games': 'Games',
            'projects.mode.customers': 'Customer projects',
            'projects.mode.own': 'Own projects',
            'about.title': 'About me',
            'about.eyebrow': 'Personal',
            'about.imageAlt': 'Maximilian Haak in front of his BMW E46 with an alpine backdrop',
            'about.p1': 'I grew up in Bruckmühl, somewhere between the football pitch, the garage and the Alps. Family and a few close friends keep me grounded, and a lot of my patience probably comes from spending early years wrenching on an old BMW.',
            'about.p2': 'Day to day you will usually find me on the football pitch or at the gym, and after that there is music. Sometimes I am working on my own beats, sometimes on percussion, sometimes it is just loud music in the car on the way home.',
            'about.p3': 'The biggest constant, though, are the two E46s. Both are mine, both have their quirks, and both taught me to finish things even when they still do not fit on the third attempt. That patience goes into every project.',
            'about.passion.label': 'My two E46s',
            'about.passion.text': 'Two BMW E46, both mine, both with their own story. Because this is more hobby than transport, the two of them got a site of their own.',
            'about.passion.imageAlt': 'My two BMW E46s parked side by side at the edge of a field in evening light',
            'about.highlight.ageLabel': 'Age',
            'about.highlight.age': '25 years',
            'about.highlight.codeLabel': 'Home',
            'about.highlight.code': 'Bruckmühl · Upper Bavaria',
            'about.highlight.lifeLabel': 'Balance',
            'about.highlight.life': 'Football · Gym · E46',
            'about.highlight.musicLabel': 'Music',
            'about.highlight.music': 'Percussion · Cajon · Rap · Beats',
            'about.stat1': 'Years Experience',
            'about.stat2': 'Projects Delivered',
            'about.stat3': 'Client Satisfaction',
            'contact.tag': 'Contact',
            'contact.title': 'Let\'s talk',
            'contact.intro': "Tell me about your project — no strings attached. I'll get back to you personally, usually within one business day.",
            'contact.name': 'Name',
            'contact.email': 'Email',
            'contact.message': 'Message',
            'contact.send': 'Send message',
            'contact.map.title': 'Bruckmühl / Rosenheim',
            'contact.map.open': 'Open map',
            'contact.status.sending': 'Sending...',
            'contact.status.success': 'Thanks, your message has been sent.',
            'contact.status.error': 'Something went wrong. Please email me directly instead.',
            'contact.status.mailClient': 'Your mail client has been opened.',
            'footer.impressum': 'Legal Notice',
            'footer.datenschutz': 'Privacy Policy',
            // Hero (static, photo-first)
            'hero.eyebrow': 'Maximilian Haak — Software Developer',
            'hero.title1': 'Websites, web apps',
            'hero.title2': 'and AI solutions.',
            'hero.title3': 'Built properly.',
            'hero.desc': 'I\'ve been building software for over five years with TypeScript, React and modern cloud technologies — based in Bruckmühl near Rosenheim, personal and direct.',
            'hero.cta1': 'View projects',
            'hero.cta2': 'Get in touch',
            // Slide 2 - Imkerei Feuerstein
            'slide.imkerei.t1': 'Honey Shop.',
            'slide.imkerei.t2': 'Family Beekeeping.',
            'slide.imkerei.t3': 'Sold Online.',
            'slide.imkerei.desc': 'A full online shop for the Feuerstein family beekeeping business in Elchingen: honey product catalog, cart, news section and customer reviews. Built with Next.js and deployed on Vercel — fast, SEO-optimized and fully responsive.',
            'slide.imkerei.cta1': 'Visit Shop',
            'slide.imkerei.cta2': 'Project Details',
            'slide.imkerei.tag1': 'Next.js & Vercel',
            'slide.imkerei.tag2': 'E-Commerce',
            'slide.imkerei.tag3': 'SEO & Performance',
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
            'slide.coha.t1': 'Restaurant Site.',
            'slide.coha.t2': 'Vietnamese.',
            'slide.coha.t3': 'Tables Booked.',
            'slide.coha.desc': 'Website for Co Ha, a Vietnamese restaurant in Bruckmühl: menu, gallery, online reservations and Google reviews. Built with Next.js — fast, mobile-first and laser-focused on driving bookings.',
            'slide.coha.cta1': 'View Live',
            'slide.coha.cta2': 'Project Details',
            'slide.coha.tag1': 'Next.js & Vercel',
            'slide.coha.tag2': 'Menu & Reservation',
            'slide.coha.tag3': 'Local SEO',
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
            // dog-kennel-online (work in progress, no image/detail page)
            'slide.dogkennel.t1': 'dog-kennel-online.',
            'slide.dogkennel.t2': 'Kennel',
            'slide.dogkennel.t3': 'Management.',
            'slide.dogkennel.desc': 'dog-kennel-online: A web platform for dog boarding kennels — bookings, occupancy, dog and owner profiles, and daily routines in one place. Currently in development; a detail page will follow.',
            'slide.dogkennel.cta1': 'Get in touch',
            'slide.dogkennel.cta2': 'Detail page coming',
            'slide.dogkennel.tag1': 'Web App',
            'slide.dogkennel.tag2': 'Booking',
            'slide.dogkennel.tag3': 'In progress',
            'slide.dogkennel.badge': 'WORK IN PROGRESS',
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

            'slide.senihelp24.t1': 'Senihelp24.',
            'slide.senihelp24.t2': '24h Care',
            'slide.senihelp24.t3': 'At Home.',
            'slide.senihelp24.desc': 'Senihelp24 does not broker caregivers — it employs them directly, providing round-the-clock care for relatives at home. I am building their new web presence: services, a cost calculator and an enquiry flow that gets families a clear answer fast, in a difficult moment. Currently in development.',
            'slide.senihelp24.cta1': 'Get in touch',
            'slide.senihelp24.cta2': 'Live soon',
            'slide.senihelp24.tag1': 'Next.js & Vercel',
            'slide.senihelp24.tag2': 'Care & Support',
            'slide.senihelp24.tag3': 'In Progress',
            'slide.senihelp24.badge': 'IN PROGRESS',

            'slide.albert.t1': 'Albert Royale.',
            'slide.albert.t2': 'Your Albert',
            'slide.albert.t3': 'learns from you.',
            'slide.albert.desc': 'A 3D battle royale with a neural network as the opponents’ brain: in phase 1 you play yourself — every action you take is recorded and trained via behavior cloning inside a web worker. In phase 2 your Albert faces fifteen others on his own, and you just watch.',
            'slide.albert.cta1': 'View project',
            'slide.albert.cta2': 'On GitHub',
            'slide.albert.tag1': 'Three.js & TypeScript',
            'slide.albert.tag2': 'Neural Networks',
            'slide.albert.tag3': 'Behavior Cloning',
            'slide.albert.badge': 'AI GAME',

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
    const retainedObservers = [];

    function applyTranslations(lang) {
        const dict = translations[lang];
        if (!dict) return;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) el.textContent = dict[key];
        });
        document.querySelectorAll('[data-i18n-alt]').forEach(el => {
            const key = el.getAttribute('data-i18n-alt');
            if (dict[key]) el.setAttribute('alt', dict[key]);
        });
        document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria-label');
            if (dict[key]) el.setAttribute('aria-label', dict[key]);
        });
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (dict[key]) el.setAttribute('title', dict[key]);
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
        *     is persisted to localStorage so a hard reload remembers the choice.
        *     Picker writes also notify the project slider, so scrolling down lands
        *     on the project that owns the selected colour.
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
            const detail = { theme, source };
            if (theme === currentTheme) {
                syncSwatches(theme);
                document.dispatchEvent(new CustomEvent('project-theme:change', { detail }));
                return;
            }
            currentTheme = theme;
            root.setAttribute('data-project-theme', theme);
            syncSwatches(theme);
            document.dispatchEvent(new CustomEvent('project-theme:change', { detail }));
        }

        function getProjectTheme() {
            return currentTheme;
        }

        syncSwatches(currentTheme);

        return { setProjectTheme, getProjectTheme };
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

            // The slider holds two independent sets of slides — customer work and
            // own projects — switched by the segmented pill above it. Everything
            // index-based below (`this.slides` ↔ `this.navBtns`) operates on the
            // *active* mode only; `allSlides` / `allNavBtns` keep the full set so
            // a theme belonging to the other mode can still be resolved.
            this.allSlides = Array.from(this.section.querySelectorAll('.hero-slide'));
            // Exclude any nav button explicitly marked disabled or aria-disabled.
            this.allNavBtns = Array.from(this.section.querySelectorAll('.project-nav-btn'))
                .filter(btn => !btn.disabled && btn.getAttribute('aria-disabled') !== 'true');
            this.modeBtns = Array.from(this.section.querySelectorAll('.project-mode-btn'))
                .filter(btn => !btn.disabled && btn.getAttribute('aria-disabled') !== 'true');

            const activeModeBtn = this.modeBtns.find(btn => btn.classList.contains('is-active'));
            this.mode = activeModeBtn ? activeModeBtn.dataset.mode : (this.allSlides[0]?.dataset.mode || 'own');

            this.slides = [];
            this.navBtns = [];
            this.arrowLeft = this.section.querySelector('.slider-arrow-left');
            this.arrowRight = this.section.querySelector('.slider-arrow-right');
            this.slidesContainer = this.section.querySelector('.hero-slides-container');
            this.pagination = this.section.querySelector('.project-pagination');
            this.currentIndex = 0;
            this.isAnimating = false;
            this.isModeSwitching = false;
            this.animationGuardTimer = null;
            this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            const onMotionChange = (event) => { this.prefersReducedMotion = event.matches; };
            if (typeof motionQuery.addEventListener === 'function') {
                motionQuery.addEventListener('change', onMotionChange);
            } else if (typeof motionQuery.addListener === 'function') {
                motionQuery.addListener(onMotionChange);
            }

            if (this.allSlides.length === 0) return;

            // A colour the visitor picked earlier may belong to the other mode —
            // start there so the slide that owns it is the one on screen. Read
            // localStorage rather than the controller: its fallback is the
            // document default ('maxhaak'), which would always drag a first-time
            // visitor into "own projects" and override the markup's chosen mode.
            let storedTheme = null;
            try { storedTheme = localStorage.getItem('themeColor'); } catch (_) { /* private mode */ }
            const stored = storedTheme ? this.locateTheme(storedTheme) : null;
            if (stored) this.mode = stored.mode;

            this.bindEvents();
            this.applyMode(this.mode, { index: stored ? stored.index : 0, dispatchEvent: false });
        }

        /**
         * Collect the slides + nav buttons of one mode, in nav-button order, so
         * that index-based pairing in goToSlide() stays in sync.
         */
        collectMode(mode) {
            const navBtns = this.allNavBtns.filter(btn => btn.dataset.mode === mode);
            const slideByTheme = new Map(
                this.allSlides
                    .filter(slide => slide.dataset.mode === mode)
                    .map(slide => [slide.getAttribute('data-theme'), slide])
            );
            const slides = navBtns
                .map(btn => slideByTheme.get(btn.getAttribute('data-project')))
                .filter(Boolean);
            return { navBtns, slides };
        }

        /** Find a theme across *both* modes. Returns null when nothing matches. */
        locateTheme(theme) {
            const projectTheme = theme === 'maxhaak' ? 'e46' : theme;
            for (const mode of ['customers', 'own']) {
                const { slides } = this.collectMode(mode);
                const index = slides.findIndex(slide => slide.getAttribute('data-theme') === projectTheme);
                if (index !== -1) return { mode, index };
            }
            return null;
        }

        applyMode(mode, options = {}) {
            const { index = 0, dispatchEvent = true, updateTheme = false } = options;
            const { navBtns, slides } = this.collectMode(mode);
            if (slides.length === 0) return;

            this.mode = mode;
            this.navBtns = navBtns;
            this.slides = slides;

            this.modeBtns.forEach(btn => {
                const isActive = btn.dataset.mode === mode;
                btn.classList.toggle('is-active', isActive);
                btn.setAttribute('aria-pressed', String(isActive));
            });

            // Tabs and slides of the other mode leave the tab order entirely.
            this.allNavBtns.forEach(btn => {
                if (btn.dataset.mode === mode) {
                    btn.hidden = false;
                    return;
                }
                btn.hidden = true;
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
                btn.tabIndex = -1;
            });
            this.allSlides.forEach(slide => {
                if (slide.dataset.mode === mode) return;
                this.resetSlideInlineState(slide);
                slide.classList.remove('active');
                slide.hidden = true;
            });

            this.currentIndex = -1;
            this.setActiveSlide(Math.min(Math.max(index, 0), slides.length - 1), { dispatchEvent, updateTheme });
        }

        /** Mode switch with a short crossfade so the swap doesn't snap. */
        switchMode(mode) {
            if (!mode || mode === this.mode || this.isAnimating || this.isModeSwitching) return;

            if (this.prefersReducedMotion || !this.slidesContainer) {
                this.applyMode(mode, { updateTheme: true });
                return;
            }

            this.isModeSwitching = true;
            this.slidesContainer.classList.add('is-mode-switching');
            window.setTimeout(() => {
                this.applyMode(mode, { updateTheme: true });
                // Force the new layout to be committed before fading back in.
                // Deliberately not requestAnimationFrame: it is throttled to a
                // standstill in a backgrounded tab, which would strand the
                // section at opacity 0 and lock the switch for good.
                void this.slidesContainer.offsetHeight;
                this.slidesContainer.classList.remove('is-mode-switching');
                this.isModeSwitching = false;
            }, 180);
        }

        getSlideIndexForTheme(theme) {
            const projectTheme = theme === 'maxhaak' ? 'e46' : theme;
            return this.slides.findIndex(slide => slide.getAttribute('data-theme') === projectTheme);
        }

        isSectionVisible() {
            const rect = this.section.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
        }

        resetSlideInlineState(slide) {
            if (!slide) return;
            ['pointerEvents', 'opacity', 'transform', 'transition', 'visibility', 'zIndex', 'willChange']
                .forEach(prop => { slide.style[prop] = ''; });

            slide.querySelectorAll([
                '.slide-text',
                '.slide-visual',
                '.title-line',
                '.slide-description',
                '.slide-cta .btn',
                '.slide-tags',
                '.showcase-frame',
                '.showcase-badge',
                '.browser-bar .dot',
                '.showcase-image-wrap img',
            ].join(',')).forEach(el => {
                ['opacity', 'transform', 'transition', 'visibility', 'zIndex', 'willChange', 'clipPath']
                    .forEach(prop => { el.style[prop] = ''; });
                el.style.removeProperty('clip-path');
            });
        }

        setActiveSlide(index, options = {}) {
            if (index < 0 || index >= this.slides.length) return;

            const { dispatchEvent = true, updateTheme = false, themeSource = 'slider' } = options;
            const activeSlide = this.slides[index];

            if (updateTheme) {
                const theme = activeSlide.getAttribute('data-theme');
                if (theme) themeController.setProjectTheme(theme, themeSource);
            }

            this.navBtns.forEach((btn, i) => {
                const isActive = i === index;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-selected', String(isActive));
                btn.tabIndex = isActive ? 0 : -1;
            });

            this.slides.forEach((slide, i) => {
                const isActive = i === index;
                this.resetSlideInlineState(slide);
                slide.classList.toggle('active', isActive);
                slide.hidden = !isActive;
            });

            this.currentIndex = index;
            this.updateContainerHeight();
            this.revealActiveTab(index);

            if (dispatchEvent) {
                document.dispatchEvent(new CustomEvent('slide:change', { detail: { slide: activeSlide } }));
            }
        }

        syncToTheme(theme, options = {}) {
            const located = this.locateTheme(theme);
            if (!located) return;

            // Picking a colour that belongs to the other mode flips the pill too,
            // otherwise the swatch would select a slide nobody can see.
            if (located.mode !== this.mode) {
                this.applyMode(located.mode, { index: located.index });
                return;
            }

            const index = located.index;
            if (index === this.currentIndex) return;

            if (options.animate && this.isSectionVisible()) {
                this.goToSlide(index);
                return;
            }

            this.setActiveSlide(index);
        }

        /**
         * On narrow screens the pagination is a horizontally scrolling strip —
         * with seven customer tabs the active one is often off-screen. Scroll the
         * strip itself (never the page) so the current project stays visible.
         */
        revealActiveTab(index) {
            const btn = this.navBtns[index];
            const strip = this.pagination;
            if (!btn || !strip || strip.scrollWidth <= strip.clientWidth) return;
            const target = btn.offsetLeft - (strip.clientWidth - btn.offsetWidth) / 2;
            const left = Math.max(0, Math.min(target, strip.scrollWidth - strip.clientWidth));
            if (typeof strip.scrollTo === 'function') {
                strip.scrollTo({ left, behavior: this.prefersReducedMotion ? 'auto' : 'smooth' });
            } else {
                strip.scrollLeft = left;
            }
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
            this.slidesContainer.style.minHeight = '';
            this.slides.forEach(slide => {
                slide.hidden = false;
                slide.style.visibility = 'visible';
            });
            let maxHeight = 0;
            this.slides.forEach(slide => {
                // Measure `.slide-content`, not the slide: slides are
                // `position: absolute; inset: 0` and therefore stretch to whatever
                // min-height the container already has, which would make the value
                // grow-only. The two modes have different tallest slides, so it
                // has to be able to shrink again.
                const inner = slide.querySelector('.slide-content');
                const h = inner ? inner.scrollHeight : slide.scrollHeight;
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
            // Bound once over the full set — the index is resolved at click time
            // because `this.navBtns` is re-collected on every mode switch.
            this.allNavBtns.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const i = this.navBtns.indexOf(btn);
                    if (i !== -1) this.goToSlide(i);
                });
            });
            this.modeBtns.forEach((btn) => {
                btn.addEventListener('click', () => this.switchMode(btn.dataset.mode));
            });
            document.addEventListener('project-theme:change', (e) => {
                if (e.detail?.source !== 'picker') return;
                this.syncToTheme(e.detail.theme, { animate: true });
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

            if (this.pagination) {
                this.pagination.addEventListener('keydown', (e) => {
                    const focusedTab = e.target.closest('.project-pag-btn');
                    const focusedIndex = this.navBtns.indexOf(focusedTab);
                    if (focusedIndex === -1) return;

                    let nextIndex = null;
                    if (e.key === 'ArrowLeft') nextIndex = (focusedIndex - 1 + this.navBtns.length) % this.navBtns.length;
                    if (e.key === 'ArrowRight') nextIndex = (focusedIndex + 1) % this.navBtns.length;
                    if (e.key === 'Home') nextIndex = 0;
                    if (e.key === 'End') nextIndex = this.navBtns.length - 1;

                    if (nextIndex !== null) {
                        e.preventDefault();
                        this.navBtns[nextIndex].focus();
                        this.goToSlide(nextIndex);
                        return;
                    }

                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.goToSlide(focusedIndex);
                    }
                });
            }

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
            if (index < 0 || index >= this.slides.length) return;
            if (index === this.currentIndex || this.isAnimating) return;
            this.isAnimating = true;

            const direction = index > this.currentIndex ? 1 : -1;
            const oldSlide = this.slides[this.currentIndex];
            const newSlide = this.slides[index];

            let settled = false;
            const settle = () => {
                if (settled) return;
                settled = true;
                if (this.animationGuardTimer !== null) {
                    window.clearTimeout(this.animationGuardTimer);
                    this.animationGuardTimer = null;
                }
                if (typeof gsap !== 'undefined') {
                    gsap.killTweensOf([oldSlide, newSlide]);
                    gsap.killTweensOf(oldSlide.querySelectorAll('*'));
                    gsap.killTweensOf(newSlide.querySelectorAll('*'));
                }
                this.setActiveSlide(index, { updateTheme: true, themeSource: 'slider' });
                this.isAnimating = false;
            };

            this.animationGuardTimer = window.setTimeout(settle, this.prefersReducedMotion ? 80 : 1800);

            if (this.prefersReducedMotion) {
                settle();
                return;
            }

            this.animatePremiumTransition(oldSlide, newSlide, direction, settle);
        }

        animatePremiumTransition(oldSlide, newSlide, direction, settle) {
            if (typeof gsap === 'undefined') {
                this.animateWithCSS(oldSlide, newSlide, direction, settle);
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
                onComplete: settle,
                onInterrupt: settle,
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
            const badge = slide.querySelector('.showcase-badge');

            if (frame) {
                // Browser mockup — 3D tilt entrance
                timeline.fromTo(frame,
                    { opacity: 0, rotationY: -15, rotationX: 8, scale: 0.9, transformPerspective: 1200 },
                    {
                        opacity: 1, rotationY: -5, rotationX: 2, scale: 1,
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

        animateWithCSS(oldSlide, newSlide, direction, settle) {
            newSlide.hidden = false;
            oldSlide.style.pointerEvents = 'none';
            newSlide.style.pointerEvents = 'auto';
            newSlide.style.opacity = '0';
            newSlide.style.transform = `translateX(${direction === 1 ? 60 : -60}px)`;

            let finished = false;
            let guardTimer = null;
            const finish = () => {
                if (finished) return;
                finished = true;
                if (guardTimer !== null) window.clearTimeout(guardTimer);
                newSlide.removeEventListener('transitionend', onTransitionEnd);
                settle();
            };
            const onTransitionEnd = (event) => {
                if (event.target === newSlide && event.propertyName === 'opacity') finish();
            };

            newSlide.addEventListener('transitionend', onTransitionEnd);

            requestAnimationFrame(() => {
                newSlide.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                oldSlide.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                newSlide.style.opacity = '1';
                newSlide.style.transform = 'translateX(0)';
                oldSlide.style.opacity = '0';
                oldSlide.style.transform = `translateX(${direction === 1 ? -60 : 60}px)`;
            });

            guardTimer = window.setTimeout(finish, 700);
        }

        playEntrance() {
            if (typeof gsap === 'undefined') return;

            // Animate static hero content
            const heroSection = document.querySelector('#hero');
            if (!heroSection) return;

            const eyebrow = heroSection.querySelector('.hero-eyebrow');
            const titleLines = heroSection.querySelectorAll('.title-line');
            const desc = heroSection.querySelector('.slide-description');
            const ctaItems = heroSection.querySelectorAll('.slide-cta .btn, .slide-cta .hero-link');
            const tags = heroSection.querySelector('.slide-tags');

            // Set initial hidden states
            if (eyebrow) gsap.set(eyebrow, { y: 12, opacity: 0 });
            gsap.set(titleLines, { y: 30, opacity: 0, clipPath: 'inset(0 0 100% 0)' });
            if (desc) gsap.set(desc, { y: 20, opacity: 0 });
            gsap.set(ctaItems, { y: 15, opacity: 0 });
            if (tags) gsap.set(tags, { y: 10, opacity: 0 });

            const tl = gsap.timeline({ delay: 0.3 });

            // Eyebrow — quiet fade-up before the headline
            if (eyebrow) {
                tl.to(eyebrow, {
                    y: 0, opacity: 1,
                    duration: 0.45, ease: 'power3.out',
                }, 0.05);
            }

            // Title lines — bottom-up clip reveal
            tl.to(titleLines, {
                y: 0, opacity: 1,
                clipPath: 'inset(0 0 0% 0)',
                stagger: 0.1,
                duration: 0.6,
                ease: 'power4.out',
            }, 0.25);

            // Description
            if (desc) {
                tl.to(desc, {
                    y: 0, opacity: 1,
                    duration: 0.5, ease: 'power3.out',
                }, 0.55);
            }

            // CTAs — button and text link enter together, no bounce
            if (ctaItems.length) {
                tl.to(ctaItems, {
                    y: 0, opacity: 1,
                    stagger: 0.08,
                    duration: 0.45,
                    ease: 'power3.out',
                }, 0.68);
            }

            // Tags
            if (tags) {
                tl.to(tags, {
                    y: 0, opacity: 1,
                    duration: 0.4, ease: 'power3.out',
                }, 0.78);
            }
        }
    }

    /* ═══ GSAP ANIMATIONS ═══ */
    function initAnimations() {
        const projectsSection = document.querySelector('#projects');
        let parallaxTargetsVisible = false;

        // Track projects section visibility. CSS uses .in-view to run/pause
        // the portfolio ambient orbs, and mouse parallax only runs while the
        // showcase is actually in view.
        if (projectsSection) {
            const updateProjectsVisibility = (isVisible) => {
                projectsSection.classList.toggle('in-view', isVisible);
                parallaxTargetsVisible = isVisible;
            };

            const projObserver = new IntersectionObserver(
                (entries) => {
                    updateProjectsVisibility(entries[0].isIntersecting);
                },
                { threshold: 0 }
            );
            projObserver.observe(projectsSection);
            retainedObservers.push(projObserver);

            const projectsRect = projectsSection.getBoundingClientRect();
            updateProjectsVisibility(projectsRect.bottom > 0 && projectsRect.top < window.innerHeight);
        }

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

        // Theme sync — when the projects section enters the viewport, align
        // the global theme with the active slide. Going back up no longer
        // hard-resets to a default colour: that previously clobbered both the
        // user's picker choice and any other slide-derived theme. The shared
        // controller also no-ops when the user has locked a colour.
        if (projectsSection) {
            ScrollTrigger.create({
                trigger: projectsSection,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => {
                    const activeSlide = projectsSection.querySelector('.hero-slide.active');
                    const activeTheme = activeSlide && activeSlide.getAttribute('data-theme');
                    const currentTheme = themeController.getProjectTheme();
                    const currentProjectTheme = currentTheme === 'maxhaak' ? 'e46' : currentTheme;
                    const currentThemeHasSlide = Array.from(projectsSection.querySelectorAll('.hero-slide'))
                        .some(slide => slide.getAttribute('data-theme') === currentProjectTheme);

                    if (currentThemeHasSlide && activeTheme !== currentProjectTheme) return;
                    if (activeTheme) themeController.setProjectTheme(activeTheme, 'scroll');
                },
            });
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
            let lastFrame = null;

            const bindQuickTo = (el) => {
                const opts = { duration: 0.6, ease: 'power2.out' };
                frameRotY = gsap.quickTo(el, 'rotationY', opts);
                frameRotX = gsap.quickTo(el, 'rotationX', opts);
                lastFrame = el;
            };

            // Cache the active parallax target. Recomputed only when the slide
            // actually changes (event from ProjectSlider) instead of on every
            // mousemove frame, which used to do a full DOM query 60×/sec.
            let cachedFrame = null;
            const refreshTargets = () => {
                cachedFrame = document.querySelector('.hero-slide.active .showcase-frame');
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
                        if (cachedFrame !== lastFrame) bindQuickTo(cachedFrame);
                        frameRotY(ry); frameRotX(rx);
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

        const status = form.querySelector('.contact-form-status');
        const btn = form.querySelector('button[type="submit"]');
        if (!btn) return;

        const getText = (key) => translations[currentLang]?.[key] || translations.de[key] || '';
        const setStatus = (key, state) => {
            const message = getText(key);
            if (status) {
                status.textContent = message;
                status.classList.toggle('is-success', state === 'success');
                status.classList.toggle('is-error', state === 'error');
            }
            return message;
        };

        const resetFeedback = (delay) => {
            window.setTimeout(() => {
                btn.textContent = getText('contact.send');
                btn.classList.remove('is-success', 'is-error');
                btn.disabled = false;
            }, delay);
        };

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const action = form.getAttribute('action') || '';

            if (status) {
                status.textContent = '';
                status.classList.remove('is-success', 'is-error');
            }

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
                btn.textContent = setStatus('contact.status.mailClient', 'success');
                btn.classList.add('is-success');
                resetFeedback(4000);
                return;
            }

            btn.disabled = true;
            btn.textContent = setStatus('contact.status.sending');

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    btn.textContent = setStatus('contact.status.success', 'success');
                    btn.classList.add('is-success');
                    form.reset();
                    resetFeedback(3000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (_) {
                btn.textContent = setStatus('contact.status.error', 'error');
                btn.classList.add('is-error');
                resetFeedback(4000);
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
            window.setTimeout(() => { banner.hidden = false; }, 1000);
        }

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            banner.hidden = true;
            loadGoogleFonts();
        });

        window.showConsentManager = function () {
            banner.hidden = false;
        };
    }

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

        // Lazy-load background-image for the deferred slides only when needed.
        // hero-06/07 are NOT visible on first paint and would otherwise eat
        // ~140 KB of bandwidth that competes with the LCP image.
        const ensureBg = (slide) => {
            const url = slide.dataset.bg;
            if (!url) return;
            slide.style.backgroundImage = `url('${url}')`;
            delete slide.dataset.bg;
        };

        let timerId = null;
        const tick = () => {
            const next = (index + 1) % slides.length;
            ensureBg(slides[next]);
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
