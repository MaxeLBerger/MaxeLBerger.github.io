/* ═══════════════════════════════════════════════
   script.js: Portfolio Interactions
   ProjectSlider, GSAP Animations, Theme, i18n
   ═══════════════════════════════════════════════ */

(function () {
    'use strict';

    /* ═══ i18n TRANSLATIONS ═══ */
    const translations = {
        de: {
            'nav.portfolio': 'Portfolio',
            'nav.about': 'Über mich',
            'nav.pricing': 'Pakete',
            'nav.tech': 'Tech Stack',
            'nav.contact': 'Kontakt',
            'services.tag': 'Leistungen',
            'services.title': 'Pakete & Preise',
            'services.badge': 'Empfohlen',
            'services.note': 'Alle Preise netto zzgl. USt.',
            'services.landing.title': 'Landingpage',
            'services.landing.sub': 'Eine Seite, die genau eine Sache tut: aus Besuchern Anfragen machen.',
            'services.landing.meta': '1-2 Wochen \u00b7 ab 2.500 \u20ac',
            'services.landing.d1': 'Individuelles Design, kein Template',
            'services.landing.d2': 'Kontakt- oder Terminformular mit Spam-Schutz',
            'services.landing.d3': 'Ladezeit unter einer Sekunde, Lighthouse 95+',
            'services.landing.d4': 'DSGVO-konform, Hosting eingerichtet',
            'services.landing.d5': '30 Tage Support nach Livegang',
            'services.landing.link': 'Landingpage anfragen',
            'services.website.title': 'Website',
            'services.website.sub': 'Der vollst\u00e4ndige Auftritt: f\u00fcnf bis acht Seiten, aufgebaut auf Ihrem Corporate Design.',
            'services.website.meta': '3-5 Wochen \u00b7 ab 5.500 \u20ac',
            'services.website.d1': 'Designsystem nach Ihrem CI, mobil und Desktop',
            'services.website.d2': '5 bis 8 Seiten, Blog oder News optional',
            'services.website.d3': 'Formulare, SEO-Setup und Suchmaschinen-Anmeldung',
            'services.website.d4': 'Umzug alter Inhalte inklusive Weiterleitungen',
            'services.website.d5': '60 Tage Support nach Livegang',
            'services.website.link': 'Website anfragen',
            'services.plus.title': 'Website Plus',
            'services.plus.sub': 'Mehrsprachig, mit Stellenportal oder Anbindung an Ihre Systeme.',
            'services.plus.meta': '6-10 Wochen \u00b7 ab 9.500 \u20ac',
            'services.plus.d1': 'Alles aus dem Paket Website',
            'services.plus.d2': 'Zweite Sprache, vollst\u00e4ndig lokalisiert',
            'services.plus.d3': 'Stellenportal mit Detailseiten und Bewerbungsformular',
            'services.plus.d4': 'Anbindung an CRM oder andere Schnittstellen',
            'services.plus.d5': '90 Tage Support nach Livegang',
            'services.plus.link': 'Projekt besprechen',
            'services.care.title': 'Website-Pflege',
            'services.care.sub': 'Updates, Monitoring und kleine \u00c4nderungen bis 60 Minuten im Monat.',
            'services.care.meta': 'laufend \u00b7 ab 149 \u20ac/Monat',
            'services.care.link': 'Pflege dazubuchen',
            'services.extra.title': 'Zusatzleistungen',
            'services.extra.sub': 'Alles dar\u00fcber hinaus nach Aufwand, transparent abgerechnet.',
            'services.extra.meta': '95 \u20ac/Stunde',
            'services.cta.text': 'Nicht sicher, was Sie brauchen? Ein 20-minütiges Gespräch klärt das meist.',
            'services.cta.button': 'Kostenloses Erstgespräch',
            'skills.tag': 'Tech Stack',
            'skills.title': 'Mit welchen Tools ich arbeite',
            'projects.tag': 'Ausgewählte Arbeiten',
            'projects.prev': 'Vorheriges Projekt',
            'projects.next': 'Nächstes Projekt',
            'projects.pick': 'Projekt auswählen',
            'projects.title': 'Projekte',
            'projects.mode.group': 'Projekt-Kategorie',
            'projects.mode.own': 'Eigene Projekte',
            'projects.mode.customers': 'Kundenprojekte',
            // Albert Royale
            'slide.albert.t1': 'Albert Royale.',
            'slide.albert.t2': 'Dein Albert',
            'slide.albert.t3': 'lernt von dir.',
            'slide.albert.desc': 'Ein 3D-Battle-Royale, in dem du deinem Charakter erst selbst das \u00dcberleben beibringst und ihn dann allein in die Arena schickst. Das Gehirn dahinter ist ein selbstgeschriebenes neuronales Netz, trainiert aus deinem Spielverhalten.',
            'slide.albert.cta1': 'Projekt-Details',
            'slide.albert.cta2': 'Auf GitHub',
            'slide.albert.tag1': 'Three.js',
            'slide.albert.tag2': 'TypeScript',
            'slide.albert.tag3': 'Neural Net',
            // Senihelp24
            'slide.senihelp24.t1': 'Senihelp24.',
            'slide.senihelp24.t2': '24h-Pflege',
            'slide.senihelp24.t3': 'zu Hause.',
            'slide.senihelp24.desc': 'Senihelp24 vermittelt keine Betreuungskr\u00e4fte, sondern stellt sie selbst an: 24h-Pflege f\u00fcr Angeh\u00f6rige zu Hause. Ich baue daf\u00fcr den neuen Web-Auftritt mit Leistungen, Kostenrechner und einem Anfrage-Flow, der Familien in einer schwierigen Situation schnell zu einer klaren Antwort f\u00fchrt. Aktuell in Entwicklung.',
            'slide.senihelp24.cta1': 'Anfragen',
            'slide.senihelp24.cta2': 'Bald live',
            'slide.senihelp24.tag1': 'Next.js & Vercel',
            'slide.senihelp24.tag2': 'Pflege & Betreuung',
            'slide.senihelp24.tag3': 'In Arbeit',
            'about.title': 'Über mich',
            'about.eyebrow': 'Persönlich',
            'about.imageAlt': 'Maximilian Haak vor seinem BMW E46 mit Alpenpanorama',
            'about.p1': 'Aufgewachsen in Bruckmühl, irgendwo zwischen Vereinsplatz, Werkstatt und Alpenpanorama. Familie und ein paar enge Freunde halten mich geerdet, und ein großer Teil meiner Geduld kommt vermutlich daher, dass ich früh angefangen habe, an einem alten BMW selbst rumzuschrauben.',
            'about.p2': 'Im Alltag findet man mich meistens auf dem Fußballplatz oder im Gym, und danach läuft Musik. Mal sitze ich an eigenen Beats, mal an der Percussion, manchmal ist es auch einfach laute Musik im Auto auf dem Heimweg.',
            'about.highlight.ageLabel': 'Alter',
            'about.highlight.age': '25 Jahre',
            'about.highlight.codeLabel': 'Heimat',
            'about.highlight.code': 'Bruckmühl · Oberbayern',
            'about.highlight.lifeLabel': 'Ausgleich',
            'about.highlight.life': 'Fußball · Gym · E46',
            'about.highlight.musicLabel': 'Musik',
            'about.highlight.music': 'Percussion · Cajon · Rap · Beats',
            'contact.tag': 'Kontakt',
            'contact.title': 'Lassen Sie uns sprechen',
            'contact.intro': 'Erzählen Sie mir von Ihrem Vorhaben, ganz unverbindlich. Ich melde mich persönlich bei Ihnen zurück, in der Regel innerhalb eines Werktags.',
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
            'hero.eyebrow': 'Maximilian Haak \u00b7 Softwareentwickler',
            'hero.title1': 'Websites, Web\u2011Apps',
            'hero.title2': 'und KI-Lösungen.',
            'hero.title3': 'Sauber gebaut.',
            'hero.desc': 'Seit über fünf Jahren entwickle ich Software mit TypeScript, React und modernen Cloud-Technologien, aus Bruckmühl bei Rosenheim, persönlich und direkt.',
            'hero.cta1': 'Projekte ansehen',
            'hero.cta2': 'Kontakt aufnehmen',
            // Slide 2 - Imkerei Feuerstein
            'slide.imkerei.t1': 'Honig-Shop.',
            'slide.imkerei.t2': 'Familienimkerei.',
            'slide.imkerei.t3': 'Online verkauft.',
            'slide.imkerei.desc': 'Vollständiger Online-Shop für die Familienimkerei Feuerstein aus Elchingen: Produktkatalog mit Honig-Sorten, Warenkorb, News-Bereich und Kundenbewertungen. Gebaut mit Next.js, auf Vercel deployed, schnell, SEO-optimiert und responsiv auf allen Geräten.',
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
            'slide.e46.desc': 'E46 Studio: Eine Electron-Anwendung für BMW E46 Steuergeräte-Coding über serielle Schnittstelle. TypeScript, Node.js und Low-Level-Kommunikation für eine spezialisierte Automotive-Community.',
            'slide.e46.cta1': 'Live ansehen',
            'slide.e46.cta2': 'Projekt-Details',
            'slide.e46.tag1': 'Electron',
            'slide.e46.tag2': 'TypeScript',
            'slide.e46.tag3': 'Serial API',
            // Slide 5 - CoHa
            'slide.coha.t1': 'Restaurant-Site.',
            'slide.coha.t2': 'Vietnamesisch.',
            'slide.coha.t3': 'Tische gefüllt.',
            'slide.coha.desc': 'Website für Co Ha, ein vietnamesisches Restaurant in Bruckmühl: Speisekarte, Galerie, Online-Reservierung und Google-Bewertungen. Gebaut mit Next.js, schnell, mobil-optimiert und konsequent auf Reservierungen ausgerichtet.',
            'slide.coha.cta1': 'Live ansehen',
            'slide.coha.cta2': 'Projekt-Details',
            'slide.coha.tag1': 'Next.js & Vercel',
            'slide.coha.tag2': 'Speisekarte & Reservierung',
            'slide.coha.tag3': 'Lokale SEO',
            // Slide 6 - SoundOfLvke
            'slide.soundoflvke.t1': 'Sound.',
            'slide.soundoflvke.t2': 'Design.',
            'slide.soundoflvke.t3': 'Identität.',
            'slide.soundoflvke.desc': 'Portfolio-Website für einen Musik-Künstler mit integriertem Audio-Player, Release-Übersicht und individuellem responsive Design. Kreative Webentwicklung, die Marken zum Leben erweckt.',
            'slide.soundoflvke.cta1': 'Live ansehen',
            'slide.soundoflvke.cta2': 'Projekt-Details',
            'slide.soundoflvke.tag1': 'Künstler-Branding',
            'slide.soundoflvke.tag2': 'Audio Integration',
            'slide.soundoflvke.tag3': 'Responsive Design',
            // Slide 7 - Shookroko
            'slide.shookroko.t1': 'Browser-Spiel.',
            'slide.shookroko.t2': 'Phaser 3.',
            'slide.shookroko.t3': 'TypeScript.',
            'slide.shookroko.desc': 'Shookroko: Ein Action-Browsergame, gebaut mit Phaser 3 und TypeScript. Eigene Game-Loop, Asset-Pipeline und ein responsive Canvas: Game Development trifft modernes Web.',
            'slide.shookroko.cta1': 'Live spielen',
            'slide.shookroko.cta2': 'Projekt-Details',
            'slide.shookroko.tag1': 'Phaser 3',
            'slide.shookroko.tag2': 'TypeScript',
            'slide.shookroko.tag3': 'Game Dev',
            // Slide 8 - Medieval Tower Defense
            'slide.medieval.t1': 'Medieval.',
            'slide.medieval.t2': 'Tower',
            'slide.medieval.t3': 'Defense.',
            'slide.medieval.desc': 'Medieval Tower Defense: Ein im Browser spielbares Strategiespiel im Mittelalter-Setting. Eigene Spielmechanik, Wave-System und Pixel-Art, gebaut für die Vercel-Edge mit modernem Web-Stack.',
            'slide.medieval.cta1': 'Live spielen',
            'slide.medieval.cta2': 'Zum Spiel',
            'slide.medieval.tag1': 'Browser Game',
            'slide.medieval.tag2': 'Tower Defense',
            'slide.medieval.tag3': 'Vercel',
            // dog-kennel-online (in Arbeit, ohne Bild/Detailseite)
            'slide.dogkennel.t1': 'dog-kennel-online.',
            'slide.dogkennel.t2': 'Kennel',
            'slide.dogkennel.t3': 'Management.',
            'slide.dogkennel.desc': 'dog-kennel-online: Eine Web-Plattform für Hundepensionen mit Buchungen, Belegung, Hunde- und Halterprofilen sowie täglichen Abläufen an einem Ort. Aktuell in Entwicklung; Detailseite folgt.',
            'slide.dogkennel.cta1': 'Anfragen',
            'slide.dogkennel.cta2': 'Detailseite folgt',
            'slide.dogkennel.tag1': 'Web App',
            'slide.dogkennel.tag2': 'Booking',
            'slide.dogkennel.tag3': 'In Arbeit',
            // Slide 9 - Daniel Brecheis (Human Bridges Consulting)
            'slide.danielbrecheis.t1': 'HR Coaching.',
            'slide.danielbrecheis.t2': 'Human',
            'slide.danielbrecheis.t3': 'Bridges.',
            'slide.danielbrecheis.desc': 'Daniel Brecheis, Human Bridges Consulting: Markenwebsite für HR-Coaching, Workshops und Interim-Management. Klare Typografie, ruhige Bildsprache und ein wertiges Erscheinungsbild für 25+ Jahre HR-Erfahrung.',
            'slide.danielbrecheis.cta1': 'Live ansehen',
            'slide.danielbrecheis.cta2': 'Projekt-Details',
            'slide.danielbrecheis.tag1': 'Coaching',
            'slide.danielbrecheis.tag2': 'Branding',
            'slide.danielbrecheis.tag3': 'Vercel',
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
            // Slide 11 - JK Entertainment
            'slide.jkentertainment.t1': 'TCG-Shop.',
            'slide.jkentertainment.t2': 'Magic, Pokémon',
            'slide.jkentertainment.t3': '& mehr.',
            'slide.jkentertainment.desc': 'JK Entertainment: Online-Shop für Trading Card Games (Magic, Pokémon, Yu-Gi-Oh! und 6 weitere). Next.js Storefront, Produktkatalog mit über 4.000 Artikeln, Vorbestell-System und Community-Anbindung an zwei Stores in Frankfurt und Darmstadt.',
            'slide.jkentertainment.cta1': 'Live ansehen',
            'slide.jkentertainment.cta2': 'Projekt-Details',
            'slide.jkentertainment.tag1': 'Next.js',
            'slide.jkentertainment.tag2': 'E-Commerce',
            'slide.jkentertainment.tag3': 'TCG',
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
            'nav.portfolio': 'Portfolio',
            'nav.about': 'About me',
            'nav.pricing': 'Pricing',
            'nav.tech': 'Tech Stack',
            'nav.contact': 'Contact',
            'services.tag': 'Services',
            'services.title': 'Packages & Pricing',
            'services.badge': 'Recommended',
            'services.note': 'All prices net, plus VAT.',
            'services.landing.title': 'Landing Page',
            'services.landing.sub': 'One page with one job: turning visitors into enquiries.',
            'services.landing.meta': '1-2 weeks \u00b7 from \u20ac2,500',
            'services.landing.d1': 'Custom design, never a template',
            'services.landing.d2': 'Contact or booking form with spam protection',
            'services.landing.d3': 'Loads in under a second, Lighthouse 95+',
            'services.landing.d4': 'GDPR-compliant, hosting set up for you',
            'services.landing.d5': '30 days of support after launch',
            'services.landing.link': 'Request a landing page',
            'services.website.title': 'Website',
            'services.website.sub': 'The full presence: five to eight pages, built on your corporate design.',
            'services.website.meta': '3-5 weeks \u00b7 from \u20ac5,500',
            'services.website.d1': 'Design system based on your brand, mobile and desktop',
            'services.website.d2': '5 to 8 pages, blog or news section optional',
            'services.website.d3': 'Forms, SEO setup and search engine submission',
            'services.website.d4': 'Migration of existing content including redirects',
            'services.website.d5': '60 days of support after launch',
            'services.website.link': 'Request a website',
            'services.plus.title': 'Website Plus',
            'services.plus.sub': 'Multilingual, with a careers portal or a link into your systems.',
            'services.plus.meta': '6-10 weeks \u00b7 from \u20ac9,500',
            'services.plus.d1': 'Everything in the Website package',
            'services.plus.d2': 'A second language, fully localised',
            'services.plus.d3': 'Careers portal with detail pages and application form',
            'services.plus.d4': 'Integration with your CRM or other interfaces',
            'services.plus.d5': '90 days of support after launch',
            'services.plus.link': 'Discuss your project',
            'services.care.title': 'Website Care',
            'services.care.sub': 'Updates, monitoring and small changes, up to 60 minutes a month.',
            'services.care.meta': 'ongoing \u00b7 from \u20ac149/month',
            'services.care.link': 'Add website care',
            'services.extra.title': 'Additional Work',
            'services.extra.sub': 'Anything beyond that is billed by the hour, transparently.',
            'services.extra.meta': '\u20ac95/hour',
            'services.cta.text': 'Not sure what you need? A 20-minute call usually clears it up.',
            'services.cta.button': 'Free intro call',
            'skills.tag': 'Tech Stack',
            'skills.title': 'Tools I work with',
            'projects.tag': 'Selected Work',
            'projects.prev': 'Previous project',
            'projects.next': 'Next project',
            'projects.pick': 'Choose a project',
            'projects.title': 'Projects',
            'projects.mode.group': 'Project category',
            'projects.mode.own': 'Own projects',
            'projects.mode.customers': 'Client projects',
            // Albert Royale
            'slide.albert.t1': 'Albert Royale.',
            'slide.albert.t2': 'Your Albert',
            'slide.albert.t3': 'learns from you.',
            'slide.albert.desc': 'A 3D battle royale where you first teach your character to survive yourself, then send it into the arena alone. Its brain is a neural network written from scratch and trained on the way you play.',
            'slide.albert.cta1': 'Project details',
            'slide.albert.cta2': 'View on GitHub',
            'slide.albert.tag1': 'Three.js',
            'slide.albert.tag2': 'TypeScript',
            'slide.albert.tag3': 'Neural Net',
            // Senihelp24
            'slide.senihelp24.t1': 'Senihelp24.',
            'slide.senihelp24.t2': 'Round-the-clock care',
            'slide.senihelp24.t3': 'at home.',
            'slide.senihelp24.desc': 'Senihelp24 employs its carers directly instead of brokering them: 24-hour care for relatives at home. I am building their new web presence with services, a cost calculator and an enquiry flow that gets families a clear answer fast. Currently in development.',
            'slide.senihelp24.cta1': 'Get in touch',
            'slide.senihelp24.cta2': 'Live soon',
            'slide.senihelp24.tag1': 'Next.js & Vercel',
            'slide.senihelp24.tag2': 'Care & support',
            'slide.senihelp24.tag3': 'In progress',
            'about.title': 'About me',
            'about.eyebrow': 'Personal',
            'about.imageAlt': 'Maximilian Haak in front of his BMW E46 with an alpine backdrop',
            'about.p1': 'I grew up in Bruckmühl, somewhere between the football pitch, the garage and the Alps. Family and a few close friends keep me grounded, and a lot of my patience probably comes from spending early years wrenching on an old BMW.',
            'about.p2': 'Day to day you will usually find me on the football pitch or at the gym, and after that there is music. Sometimes I am working on my own beats, sometimes on percussion, sometimes it is just loud music in the car on the way home.',
            'about.highlight.ageLabel': 'Age',
            'about.highlight.age': '25 years',
            'about.highlight.codeLabel': 'Home',
            'about.highlight.code': 'Bruckmühl · Upper Bavaria',
            'about.highlight.lifeLabel': 'Balance',
            'about.highlight.life': 'Football · Gym · E46',
            'about.highlight.musicLabel': 'Music',
            'about.highlight.music': 'Percussion · Cajon · Rap · Beats',
            'contact.tag': 'Contact',
            'contact.title': 'Let\'s talk',
            'contact.intro': "Tell me about your project, no strings attached. I'll get back to you personally, usually within one business day.",
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
            'hero.eyebrow': 'Maximilian Haak \u00b7 Software Developer',
            'hero.title1': 'Websites, web apps',
            'hero.title2': 'and AI solutions.',
            'hero.title3': 'Built properly.',
            'hero.desc': 'I\'ve been building software for over five years with TypeScript, React and modern cloud technologies, based in Bruckmühl near Rosenheim, personal and direct.',
            'hero.cta1': 'View projects',
            'hero.cta2': 'Get in touch',
            // Slide 2 - Imkerei Feuerstein
            'slide.imkerei.t1': 'Honey Shop.',
            'slide.imkerei.t2': 'Family Beekeeping.',
            'slide.imkerei.t3': 'Sold Online.',
            'slide.imkerei.desc': 'A full online shop for the Feuerstein family beekeeping business in Elchingen: honey product catalog, cart, news section and customer reviews. Built with Next.js and deployed on Vercel: fast, SEO-optimized and fully responsive.',
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
            'slide.e46.desc': 'E46 Studio: An Electron app for BMW E46 ECU coding via serial interface. TypeScript, Node.js, and low-level communication for a specialized automotive community.',
            'slide.e46.cta1': 'View Live',
            'slide.e46.cta2': 'Project Details',
            'slide.e46.tag1': 'Electron',
            'slide.e46.tag2': 'TypeScript',
            'slide.e46.tag3': 'Serial API',
            // Slide 5 - CoHa
            'slide.coha.t1': 'Restaurant Site.',
            'slide.coha.t2': 'Vietnamese.',
            'slide.coha.t3': 'Tables Booked.',
            'slide.coha.desc': 'Website for Co Ha, a Vietnamese restaurant in Bruckmühl: menu, gallery, online reservations and Google reviews. Built with Next.js: fast, mobile-first and laser-focused on driving bookings.',
            'slide.coha.cta1': 'View Live',
            'slide.coha.cta2': 'Project Details',
            'slide.coha.tag1': 'Next.js & Vercel',
            'slide.coha.tag2': 'Menu & Reservation',
            'slide.coha.tag3': 'Local SEO',
            // Slide 6 - SoundOfLvke
            'slide.soundoflvke.t1': 'Sound.',
            'slide.soundoflvke.t2': 'Design.',
            'slide.soundoflvke.t3': 'Identity.',
            'slide.soundoflvke.desc': 'Portfolio website for a music artist with an integrated audio player, release overview and custom responsive design. Creative web development that brings brands to life.',
            'slide.soundoflvke.cta1': 'View Live',
            'slide.soundoflvke.cta2': 'Project Details',
            'slide.soundoflvke.tag1': 'Artist Branding',
            'slide.soundoflvke.tag2': 'Audio Integration',
            'slide.soundoflvke.tag3': 'Responsive Design',
            // Slide 7 - Shookroko
            'slide.shookroko.t1': 'Browser Game.',
            'slide.shookroko.t2': 'Phaser 3.',
            'slide.shookroko.t3': 'TypeScript.',
            'slide.shookroko.desc': 'Shookroko: An action browser game built with Phaser 3 and TypeScript. Custom game loop, asset pipeline, and a responsive canvas: game development meets the modern web.',
            'slide.shookroko.cta1': 'Play live',
            'slide.shookroko.cta2': 'Project Details',
            'slide.shookroko.tag1': 'Phaser 3',
            'slide.shookroko.tag2': 'TypeScript',
            'slide.shookroko.tag3': 'Game Dev',
            // Slide 8 - Medieval Tower Defense
            'slide.medieval.t1': 'Medieval.',
            'slide.medieval.t2': 'Tower',
            'slide.medieval.t3': 'Defense.',
            'slide.medieval.desc': 'Medieval Tower Defense: A browser-playable strategy game in a medieval setting. Custom mechanics, wave system, and pixel art, built for the Vercel edge with a modern web stack.',
            'slide.medieval.cta1': 'Play live',
            'slide.medieval.cta2': 'Open Game',
            'slide.medieval.tag1': 'Browser Game',
            'slide.medieval.tag2': 'Tower Defense',
            'slide.medieval.tag3': 'Vercel',
            // dog-kennel-online (work in progress, no image/detail page)
            'slide.dogkennel.t1': 'dog-kennel-online.',
            'slide.dogkennel.t2': 'Kennel',
            'slide.dogkennel.t3': 'Management.',
            'slide.dogkennel.desc': 'dog-kennel-online: A web platform for dog boarding kennels with bookings, occupancy, dog and owner profiles and daily routines in one place. Currently in development; a detail page will follow.',
            'slide.dogkennel.cta1': 'Get in touch',
            'slide.dogkennel.cta2': 'Detail page coming',
            'slide.dogkennel.tag1': 'Web App',
            'slide.dogkennel.tag2': 'Booking',
            'slide.dogkennel.tag3': 'In progress',
            // Slide 9 - Daniel Brecheis
            'slide.danielbrecheis.t1': 'HR Coaching.',
            'slide.danielbrecheis.t2': 'Human',
            'slide.danielbrecheis.t3': 'Bridges.',
            'slide.danielbrecheis.desc': 'Daniel Brecheis, Human Bridges Consulting: Brand website for HR coaching, workshops and interim management. Clear typography, calm imagery and a premium presence for 25+ years of HR experience.',
            'slide.danielbrecheis.cta1': 'View Live',
            'slide.danielbrecheis.cta2': 'Project Details',
            'slide.danielbrecheis.tag1': 'Coaching',
            'slide.danielbrecheis.tag2': 'Branding',
            'slide.danielbrecheis.tag3': 'Vercel',
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

    /* ═══ PROJECT THEME ═══ */
    /**
     * Theme controller: single source of truth for `data-project-theme`.
     *
     * Two writers remain: the project slider (active slide → theme) and a
     * scroll observer that resyncs to the active slide when the projects
     * section enters the viewport. Writes are cached so an identical theme
     * does not retrigger the CSS transitions on every theme-aware section.
     */
    const themeController = (() => {
        const root = document.documentElement;
        let currentTheme = root.getAttribute('data-project-theme') || 'maxhaak';

        function setProjectTheme(theme, source) {
            if (!theme) return;
            if (theme !== currentTheme) {
                currentTheme = theme;
                root.setAttribute('data-project-theme', theme);
            }
            document.dispatchEvent(new CustomEvent('project-theme:change', {
                detail: { theme, source },
            }));
        }

        function getProjectTheme() {
            return currentTheme;
        }

        return { setProjectTheme, getProjectTheme };
    })();

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

            // Two independent slide sets, own work and client work, live in the
            // same grid cell and are swapped by the segmented control above the
            // slider. Everything index-based below operates on the ACTIVE mode;
            // `allSlides` / `allNavBtns` keep the full set so a theme belonging
            // to the other mode can still be resolved.
            this.allSlides = Array.from(this.section.querySelectorAll('.hero-slide'));
            this.allNavBtns = Array.from(this.section.querySelectorAll('.project-pag-btn'))
                .filter(btn => !btn.disabled && btn.getAttribute('aria-disabled') !== 'true');
            this.modeBtns = Array.from(this.section.querySelectorAll('.project-mode-btn'));

            const activeModeBtn = this.modeBtns.find(btn => btn.classList.contains('is-active'));
            this.mode = activeModeBtn
                ? activeModeBtn.dataset.mode
                : (this.allSlides[0] ? this.allSlides[0].dataset.mode : 'own');

            this.slides = [];
            this.navBtns = [];
            this.arrowLeft = this.section.querySelector('.slider-arrow-left');
            this.arrowRight = this.section.querySelector('.slider-arrow-right');
            this.slidesContainer = this.section.querySelector('.hero-slides-container');
            this.pagination = this.section.querySelector('.project-pagination');
            this.currentIndex = -1;
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

            this.bindEvents();
            // Start on whichever tab the markup marks active, so the first
            // paint already matches the document instead of snapping to 01.
            const initial = this.collectMode(this.mode).navBtns
                .findIndex(btn => btn.classList.contains('active'));
            this.applyMode(this.mode, {
                index: Math.max(initial, 0),
                dispatchEvent: false,
                updateTheme: true,
            });
        }

        /**
         * Collect the slides and nav buttons of one mode, in nav-button order,
         * so index-based pairing in goToSlide() stays in sync.
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

        /** Find a theme across BOTH modes. Returns null when nothing matches. */
        locateTheme(theme) {
            const projectTheme = theme === 'maxhaak' ? 'e46' : theme;
            for (const mode of ['own', 'customers']) {
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

            // Tabs and slides of the other mode leave the layout and the tab
            // order entirely, so the container height follows the active set.
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
                const inMode = slide.dataset.mode === mode;
                if (!inMode) {
                    this.resetSlideInlineState(slide);
                    slide.classList.remove('active');
                    slide.setAttribute('aria-hidden', 'true');
                }
                slide.hidden = !inMode;
            });

            this.currentIndex = -1;
            this.setActiveSlide(Math.min(Math.max(index, 0), slides.length - 1), { dispatchEvent, updateTheme });
        }

        /** Mode switch with a short crossfade so the swap does not snap. */
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
                // Force the new layout to commit before fading back in.
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
                // No `hidden` attribute: all slides stay in the CSS grid so the
                // container height follows the tallest slide. `visibility:
                // hidden` (from CSS) already removes inactive slides from the
                // accessibility tree and the tab order.
                slide.setAttribute('aria-hidden', String(!isActive));
            });

            this.currentIndex = index;
            this.revealActiveTab(index);

            if (dispatchEvent) {
                document.dispatchEvent(new CustomEvent('slide:change', { detail: { slide: activeSlide } }));
            }
        }

        /**
         * On narrow screens the pagination is a horizontally scrolling strip.
         * Scroll the strip itself, never the page, so the current project tab
         * stays visible after an arrow click or a swipe.
         */
        revealActiveTab(index) {
            // Deferred by a tick: during a mode switch the strip is measured
            // while tabs are still being hidden, which lands the scroll a few
            // pixels short and clips the last tab.
            window.setTimeout(() => this.scrollTabIntoView(index), 0);
        }

        scrollTabIntoView(index) {
            const btn = this.navBtns[index];
            const strip = this.pagination;
            if (!btn || !strip) return;
            const maxScroll = strip.scrollWidth - strip.clientWidth;
            if (maxScroll <= 0) return;

            // Centre the tab, then pull it back until it is fully inside the
            // strip with a gutter. Centring alone can leave the first and last
            // tabs half cut off once the value is clamped to the scroll range.
            const gutter = 16;
            const start = btn.offsetLeft;
            const end = start + btn.offsetWidth;
            let left = start - (strip.clientWidth - btn.offsetWidth) / 2;
            left = Math.min(left, start - gutter);
            left = Math.max(left, end + gutter - strip.clientWidth);
            left = Math.max(0, Math.min(left, maxScroll));

            if (typeof strip.scrollTo === 'function') {
                strip.scrollTo({ left, behavior: this.prefersReducedMotion ? 'auto' : 'smooth' });
            } else {
                strip.scrollLeft = left;
            }
        }

        syncToTheme(theme, options = {}) {
            const located = this.locateTheme(theme);
            if (!located) return;

            // A theme owned by the other mode flips the segmented control too,
            // otherwise it would select a slide nobody can see.
            if (located.mode !== this.mode) {
                this.applyMode(located.mode, { index: located.index });
                return;
            }

            if (located.index === this.currentIndex) return;

            if (options.animate && this.isSectionVisible()) {
                this.goToSlide(located.index);
                return;
            }

            this.setActiveSlide(located.index);
        }

        bindEvents() {
            // Bound once over the full set: the index is resolved at click time
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

            // Visual exits first (faster: parallax)
            if (oldContent.visual) {
                master.to(oldContent.visual, {
                    x: xOut * 1.2,
                    opacity: 0,
                    scale: 0.95,
                    duration: config.duration * 0.8,
                    ease: 'power2.inOut',
                }, 0);
            }

            // Text exits (slower: parallax)
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

            // Text enters (parallax: slower offset)
            if (newContent.text) {
                master.to(newContent.text, {
                    x: 0,
                    opacity: 1,
                    duration: config.duration * 0.9,
                    ease: 'power4.out',
                }, 0.25);
            }

            // Visual enters (parallax: faster offset)
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

            // Title lines: clip-path bottom-up reveal
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

            // CTA buttons: staggered with bounce
            if (newContent.cta.length) {
                master.fromTo(newContent.cta,
                    { y: 15, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        stagger: 0.08,
                        duration: 0.4,
                        ease: 'power3.out',
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
            if (!frame) return;

            // Screenshot frame: quiet fade + lift, no 3D tilt.
            timeline.fromTo(frame,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
                0.4
            );
        }

        animateWithCSS(oldSlide, newSlide, direction, settle) {
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
            // Nothing to stage when the visitor asked for reduced motion:
            // the initial gsap.set() below would otherwise hide the hero copy
            // and rely on a timeline the visitor does not want to see.
            if (this.prefersReducedMotion) return;

            // Animate static hero content
            const heroSection = document.querySelector('#hero');
            if (!heroSection) return;

            const eyebrow = heroSection.querySelector('.hero-eyebrow');
            const titleLines = heroSection.querySelectorAll('.title-line');
            const desc = heroSection.querySelector('.hero-description');
            const ctaItems = heroSection.querySelectorAll('.hero-cta .btn, .hero-cta .hero-link');
            const tags = heroSection.querySelector('.slide-tags');

            // Set initial hidden states
            if (eyebrow) gsap.set(eyebrow, { y: 12, opacity: 0 });
            gsap.set(titleLines, { y: 30, opacity: 0, clipPath: 'inset(0 0 100% 0)' });
            if (desc) gsap.set(desc, { y: 20, opacity: 0 });
            gsap.set(ctaItems, { y: 15, opacity: 0 });
            if (tags) gsap.set(tags, { y: 10, opacity: 0 });

            const tl = gsap.timeline({ delay: 0.3 });

            // Eyebrow: quiet fade-up before the headline
            if (eyebrow) {
                tl.to(eyebrow, {
                    y: 0, opacity: 1,
                    duration: 0.45, ease: 'power3.out',
                }, 0.05);
            }

            // Title lines: bottom-up clip reveal
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

            // CTAs: button and text link enter together, no bounce
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

        // Theme sync: when the projects section enters the viewport, align
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
                        .filter(slide => !slide.hidden)
                        .some(slide => slide.getAttribute('data-theme') === currentProjectTheme);

                    if (currentThemeHasSlide && activeTheme !== currentProjectTheme) return;
                    if (activeTheme) themeController.setProjectTheme(activeTheme, 'scroll');
                },
            });
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

            // Mailto fallback (no backend): build a pre-filled email and open the user's mail client
            if (action.startsWith('mailto:')) {
                const name = (form.querySelector('#name')?.value || '').trim();
                const email = (form.querySelector('#email')?.value || '').trim();
                const message = (form.querySelector('#message')?.value || '').trim();
                const subject = currentLang === 'de'
                    ? `Anfrage über maximilianhaak.de: ${name}`
                    : `Inquiry via maximilianhaak.de: ${name}`;
                const body = `${message}\n\n--\n${name}\n${email}`;
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
