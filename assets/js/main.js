/* ═══════════════════════════════════════════════
   script.js: Portfolio Interactions
   ProjectSlider, GSAP Animations, Theme, i18n
   ═══════════════════════════════════════════════ */

(function () {
    'use strict';

    /* ═══ i18n TRANSLATIONS ═══ */
    const translations = {
        de: {
            'slide.e46.badge': 'DESKTOP APP',
            'slide.aicaptain.badge': 'AI AGENT',
            'slide.albert.badge': 'KI-SPIEL',
            'slide.shookroko.badge': 'BROWSER-SPIEL',
            'slide.medieval.badge': 'TOWER DEFENSE',
            'nav.portfolio': 'Portfolio',
            'nav.about': 'Über mich',
            'nav.pricing': 'Pakete',
            'nav.tech': 'Tech Stack',
            'nav.contact': 'Kontakt',
            'services.tag': 'Leistungen',
            'services.title': 'Pakete & Preise',
            'services.lead': 'Zwei Pakete, ein Festpreis, ein klarer Zeitrahmen. Dazu Pflege und Zusatzleistungen, wenn Sie sie brauchen.',
            'services.badge': 'Empfohlen',
            'services.note': 'Alle Preise netto zzgl. USt.',
            'services.priceSuffix': 'netto',
            'services.website.title': 'Website',
            'services.website.sub': 'Der vollst\u00e4ndige Auftritt: f\u00fcnf bis acht Seiten, aufgebaut auf Ihrem Corporate Design.',
            'services.website.meta': 'Paket 01 \u00b7 3 bis 5 Wochen',
            'services.website.pricePre': 'ab',
            'services.website.priceValue': '5.500 \u20ac',
            'services.website.d1': 'Designsystem nach Ihrem CI, mobil und Desktop',
            'services.website.d2': '5 bis 8 Seiten, Blog oder News optional',
            'services.website.d3': 'Formulare, SEO-Setup und Suchmaschinen-Anmeldung',
            'services.website.d4': 'Umzug alter Inhalte inklusive Weiterleitungen',
            'services.website.d5': '60 Tage Support nach Livegang',
            'services.website.link': 'Website anfragen',
            'services.plus.title': 'Website Plus',
            'services.plus.sub': 'Mehrsprachig, mit Stellenportal oder Anbindung an Ihre Systeme.',
            'services.plus.meta': 'Paket 02 \u00b7 6 bis 10 Wochen',
            'services.plus.pricePre': 'ab',
            'services.plus.priceValue': '9.500 \u20ac',
            'services.plus.d1': 'Alles aus dem Paket Website',
            'services.plus.d2': 'Zweite Sprache, vollst\u00e4ndig lokalisiert',
            'services.plus.d3': 'Stellenportal mit Detailseiten und Bewerbungsformular',
            'services.plus.d4': 'Anbindung an CRM oder andere Schnittstellen',
            'services.plus.d5': '90 Tage Support nach Livegang',
            'services.plus.link': 'Projekt besprechen',
            'services.care.title': 'Website-Pflege',
            'services.care.sub': 'Updates, Monitoring und kleine \u00c4nderungen bis 60 Minuten im Monat.',
            'services.care.meta': 'ab 149 \u20ac / Monat',
            'services.care.link': 'Pflege dazubuchen',
            'services.extra.title': 'Zusatzleistungen',
            'services.extra.sub': 'Alles dar\u00fcber hinaus nach Aufwand, transparent abgerechnet.',
            'services.extra.meta': '95 \u20ac / Stunde',
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
            'projects.pag.invite': 'Ihr Projekt',
            // Albert Royale
            'slide.albert.t1': 'Albert Royale.',
            'slide.albert.t2': 'Dein Albert',
            'slide.albert.t3': 'lernt von dir.',
            'slide.albert.desc': 'Ein 3D-Battle-Royale, in dem du deinem Charakter erst selbst das \u00dcberleben beibringst und ihn dann allein in die Arena schickst. Das Gehirn dahinter ist ein selbstgeschriebenes neuronales Netz, trainiert aus deinem Spielverhalten.',
            'slide.albert.cta1': 'Jetzt spielen',
            'slide.albert.cta2': 'Projekt-Details',
            'slide.albert.tag1': 'Three.js',
            'slide.albert.tag2': 'TypeScript',
            'slide.albert.tag3': 'Neural Net',
            // Senihelp24
            'slide.senihelp24.t1': 'senihelp24.pl',
            'slide.senihelp24.t2': 'Website',
            'slide.senihelp24.t3': 'in Arbeit.',
            'slide.senihelp24.desc': 'Neuer Web-Auftritt für senihelp24.pl. Aktuell in Entwicklung.',
            'slide.senihelp24.cta1': 'Anfragen',
            'slide.senihelp24.cta2': 'Bald live',
            'slide.senihelp24.tag1': 'Next.js & Vercel',
            'slide.senihelp24.tag2': 'Website',
            'slide.senihelp24.tag3': 'In Arbeit',
            'about.title': 'Über mich',
            'about.eyebrow': 'Persönlich',
            'about.imageAlt': 'Maximilian Haak vor seinem schwarzen BMW E46 Coupé mit Alpenpanorama',
            'about.p1a': 'Aufgewachsen in Bruckmühl, irgendwo zwischen Vereinsplatz, Werkstatt und Alpenpanorama. Familie und ein paar enge Freunde halten mich geerdet, und ein großer Teil meiner Geduld kommt vermutlich daher, dass ich früh angefangen habe, an einem ',
            'about.p1link': 'alten BMW',
            'about.p1b': ' selbst rumzuschrauben.',
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
            // Slide 9 - Daniel Brecheis (Human Bridges Consulting)
            'slide.danielbrecheis.t1': 'Daniel Brecheis',
            'slide.danielbrecheis.t2': 'Website',
            'slide.danielbrecheis.t3': 'in Arbeit.',
            'slide.danielbrecheis.desc': 'Markenwebsite für Daniel Brecheis (Human Bridges Consulting): HR-Coaching, Workshops und Interim-Management. Aktuell in Entwicklung, live ab dem 1. Oktober.',
            'slide.danielbrecheis.cta1': 'Anfragen',
            'slide.danielbrecheis.cta2': 'Live ab 1. Oktober',
            'slide.danielbrecheis.tag1': 'Coaching',
            'slide.danielbrecheis.tag2': 'Branding',
            'slide.danielbrecheis.tag3': 'Live ab 01.10.',
            // Haakly (self-hosted CMS, kein oeffentliches Repo)
            'slide.haakly.t1': 'Haakly.',
            'slide.haakly.t2': 'Jede Version',
            'slide.haakly.t3': 'bleibt erreichbar.',
            'slide.haakly.badge': 'SELF-HOSTED CMS',
            'slide.haakly.desc': 'Ein selbst hostbares CMS für Kundenwebsites: Redakteure pflegen Inhalte im Browser, jede Speicherung wird eine unveränderliche Revision, und veröffentlicht wird immer ein geprüftes Release. Ein Rollback schaltet auf ein früheres Release zurück, ohne dass die Live-Seite dazwischen leer wird.',
            'slide.haakly.cta1': 'Projekt anfragen',
            'slide.haakly.tag1': 'TypeScript',
            'slide.haakly.tag2': 'Fastify',
            'slide.haakly.tag3': 'PostgreSQL',
            // CapitalCombo (privat, rein technische Beschreibung)
            'slide.capitalcombo.t1': 'CapitalCombo.',
            'slide.capitalcombo.t2': 'Ein Handelssystem,',
            'slide.capitalcombo.t3': 'das sich selbst misst.',
            'slide.capitalcombo.badge': 'TRADING-PLATTFORM',
            'slide.capitalcombo.desc': 'Eine Forschungs- und Ausführungsplattform für den CFD-Handel: Trigger sammeln Marktkontext, ein LLM formuliert daraus eine Entscheidung, und 19 Vorprüfungen plus ein Live-Gate entscheiden, ob sie den Broker überhaupt erreicht. Ein großer Teil der Arbeit steckt im Messapparat aus Backtests, Kostenmodellen und einem Judge, der alte Entscheidungen gegen die tatsächlich folgenden Kerzen nachrechnet.',
            'slide.capitalcombo.cta1': 'Projekt anfragen',
            'slide.capitalcombo.tag1': 'FastAPI',
            'slide.capitalcombo.tag2': 'Next.js',
            'slide.capitalcombo.tag3': 'Multi-LLM',
            // Deterministische Review (privat)
            'slide.detreview.t1': 'Deterministische Review.',
            'slide.detreview.t2': 'Erst mechanisch,',
            'slide.detreview.t3': 'dann die KI.',
            'slide.detreview.badge': 'ENTWICKLER-WERKZEUG',
            'slide.detreview.desc': 'Eine Pipeline, die einen großen git-Branch zuerst mechanisch aufarbeitet: Merge-Basis, Netto-Diff, sechs Scans und ein Klassifikator, der jede geänderte Zeile gegen einen Musterkatalog hält. An KI-Agenten geht nur, was danach ungeklärt oder fachlich relevant bleibt. Die Antworten werden über stabile Befund-IDs zugeordnet und immer frisch aus den Dateien gerechnet, nie aus Erinnerungswerten.',
            'slide.detreview.cta1': 'Projekt anfragen',
            'slide.detreview.tag1': 'Python',
            'slide.detreview.tag2': 'git',
            'slide.detreview.tag3': 'LLM-Harness',
            // DealHunter (privat)
            'slide.dealhunter.t1': 'DealHunter.',
            'slide.dealhunter.t2': 'Findet Angebote,',
            'slide.dealhunter.t3': 'bevor ich suche.',
            'slide.dealhunter.badge': 'MARKT-SCANNER',
            'slide.dealhunter.desc': 'Ein autonomer Agent, der Kleinanzeigen rund um die Uhr nach lohnenden Angeboten absucht. Scheduler, Worker und Dashboard hängen an einer gemeinsamen Postgres-Queue, damit eine lange Suche nie den Rest blockiert. Autos, Schwerpunkt BMW E46, bewertet er gegen Marktmedian, Zustand, Laufleistung und Begehrtheit; bei Konsolen liest ein Vision-Modell die Fotos und rechnet die Marge gegen PriceCharting. Treffer kommen per Telegram, die KI-Kosten laufen sichtbar mit.',
            'slide.dealhunter.cta1': 'Projekt anfragen',
            'slide.dealhunter.tag1': 'Python',
            'slide.dealhunter.tag2': 'FastAPI',
            'slide.dealhunter.tag3': 'Claude API',
            // MemeCoinTrader (privat, in Arbeit, ohne Bild)
            'slide.memecointrader.t1': 'MemeCoinTrader.',
            'slide.memecointrader.t2': 'Solana-Streams,',
            'slide.memecointrader.t3': 'live ausgewertet.',
            'slide.memecointrader.badge': 'DESKTOP APP',
            'slide.memecointrader.desc': 'Eine Java-Desktop-Anwendung, die WebSocket-Streams neuer Solana-Token einliest, Kandidaten über eine Score- und Regel-Engine bewertet und Orders über Jupiter-Quotes ausführt, standardmäßig im Papiermodus. Ein eigener Backtesting-Teil spielt aufgezeichnete Entscheidungen erneut ab und prüft sie mit Purged K-Fold und Deflated Sharpe auf Überanpassung.',
            'slide.memecointrader.cta1': 'Projekt anfragen',
            'slide.memecointrader.cta2': 'In Arbeit',
            'slide.memecointrader.tag1': 'Java 21',
            'slide.memecointrader.tag2': 'Solana RPC',
            'slide.memecointrader.tag3': 'Backtesting',
            // Age of Max (oeffentlich spielbar)
            'slide.ageofmax.t1': 'Age of Max.',
            'slide.ageofmax.t2': 'Steinzeit bis Zukunft',
            'slide.ageofmax.t3': 'in einer Bahn.',
            'slide.ageofmax.badge': 'BROWSER-SPIEL',
            'slide.ageofmax.desc': 'Ein Browser-Spiel nach dem Vorbild von Age of War: Einheiten laufen auf einer einzigen Bahn aufeinander zu, Gold kommt aus besiegten Gegnern, und genug XP schaltet die nächste Epoche mit besseren Einheiten und Türmen frei. Fünf Epochen von der Steinzeit bis zur Zukunft, 20 Einheiten, 15 Türme und drei Schwierigkeitsgrade.',
            'slide.ageofmax.cta1': 'Jetzt spielen',
            'slide.ageofmax.cta2': 'Auf GitHub',
            'slide.ageofmax.tag1': 'Phaser 3',
            'slide.ageofmax.tag2': 'TypeScript',
            'slide.ageofmax.tag3': 'Vite',
            // Einladung: kein Projekt, sondern der offene Platz im Kundenbereich
            'slide.invite.t1': 'Ihr Projekt.',
            'slide.invite.t2': 'Als Nächstes.',
            'slide.invite.t3': 'Hier.',
            'slide.invite.badge': 'FREIER PLATZ',
            'slide.invite.desc': 'Zwei Kundenprojekte entstehen hier gerade, echte Arbeit statt Musterseiten. Der Platz für das nächste ist frei. Ein kurzes Gespräch klärt, ob es passt.',
            'slide.invite.cta1': 'Projekt besprechen',
            'slide.invite.tag1': 'Websites',
            'slide.invite.tag2': 'Web-Apps',
            'slide.invite.tag3': 'Betreuung',
            'slide.invite.mock1': 'Platz für Ihr Projekt.',
            'slide.invite.mock2': 'Kein Platzhalter, ein freier Platz.',
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
            'slide.e46.badge': 'DESKTOP APP',
            'slide.aicaptain.badge': 'AI AGENT',
            'slide.albert.badge': 'AI GAME',
            'slide.shookroko.badge': 'BROWSER GAME',
            'slide.medieval.badge': 'TOWER DEFENSE',
            'nav.portfolio': 'Portfolio',
            'nav.about': 'About me',
            'nav.pricing': 'Pricing',
            'nav.tech': 'Tech Stack',
            'nav.contact': 'Contact',
            'services.tag': 'Services',
            'services.title': 'Packages & Pricing',
            'services.lead': 'Two packages, one fixed price, one clear timeline. Plus care and additional work whenever you need it.',
            'services.badge': 'Recommended',
            'services.note': 'All prices net, plus VAT.',
            'services.priceSuffix': 'net',
            'services.website.title': 'Website',
            'services.website.sub': 'The full presence: five to eight pages, built on your corporate design.',
            'services.website.meta': 'Package 01 \u00b7 3 to 5 weeks',
            'services.website.pricePre': 'from',
            'services.website.priceValue': '\u20ac5,500',
            'services.website.d1': 'Design system based on your brand, mobile and desktop',
            'services.website.d2': '5 to 8 pages, blog or news section optional',
            'services.website.d3': 'Forms, SEO setup and search engine submission',
            'services.website.d4': 'Migration of existing content including redirects',
            'services.website.d5': '60 days of support after launch',
            'services.website.link': 'Request a website',
            'services.plus.title': 'Website Plus',
            'services.plus.sub': 'Multilingual, with a careers portal or a link into your systems.',
            'services.plus.meta': 'Package 02 \u00b7 6 to 10 weeks',
            'services.plus.pricePre': 'from',
            'services.plus.priceValue': '\u20ac9,500',
            'services.plus.d1': 'Everything in the Website package',
            'services.plus.d2': 'A second language, fully localised',
            'services.plus.d3': 'Careers portal with detail pages and application form',
            'services.plus.d4': 'Integration with your CRM or other interfaces',
            'services.plus.d5': '90 days of support after launch',
            'services.plus.link': 'Discuss your project',
            'services.care.title': 'Website Care',
            'services.care.sub': 'Updates, monitoring and small changes, up to 60 minutes a month.',
            'services.care.meta': 'from \u20ac149 / month',
            'services.care.link': 'Add website care',
            'services.extra.title': 'Additional Work',
            'services.extra.sub': 'Anything beyond that is billed by the hour, transparently.',
            'services.extra.meta': '\u20ac95 / hour',
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
            'projects.pag.invite': 'Your project',
            // Albert Royale
            'slide.albert.t1': 'Albert Royale.',
            'slide.albert.t2': 'Your Albert',
            'slide.albert.t3': 'learns from you.',
            'slide.albert.desc': 'A 3D battle royale where you first teach your character to survive yourself, then send it into the arena alone. Its brain is a neural network written from scratch and trained on the way you play.',
            'slide.albert.cta1': 'Play now',
            'slide.albert.cta2': 'Project details',
            'slide.albert.tag1': 'Three.js',
            'slide.albert.tag2': 'TypeScript',
            'slide.albert.tag3': 'Neural Net',
            // Senihelp24
            'slide.senihelp24.t1': 'senihelp24.pl',
            'slide.senihelp24.t2': 'Website',
            'slide.senihelp24.t3': 'in progress.',
            'slide.senihelp24.desc': 'A new web presence for senihelp24.pl. Currently in development.',
            'slide.senihelp24.cta1': 'Get in touch',
            'slide.senihelp24.cta2': 'Live soon',
            'slide.senihelp24.tag1': 'Next.js & Vercel',
            'slide.senihelp24.tag2': 'Website',
            'slide.senihelp24.tag3': 'In progress',
            'about.title': 'About me',
            'about.eyebrow': 'Personal',
            'about.imageAlt': 'Maximilian Haak in front of his black BMW E46 coupé with an alpine backdrop',
            'about.p1a': 'I grew up in Bruckmühl, somewhere between the football pitch, the garage and the Alps. Family and a few close friends keep me grounded, and a lot of my patience probably comes from spending early years wrenching on an ',
            'about.p1link': 'old BMW',
            'about.p1b': '.',
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
            // Slide 9 - Daniel Brecheis
            'slide.danielbrecheis.t1': 'Daniel Brecheis',
            'slide.danielbrecheis.t2': 'Website',
            'slide.danielbrecheis.t3': 'in progress.',
            'slide.danielbrecheis.desc': 'Brand website for Daniel Brecheis (Human Bridges Consulting): HR coaching, workshops and interim management. Currently in development, going live on 1 October.',
            'slide.danielbrecheis.cta1': 'Get in touch',
            'slide.danielbrecheis.cta2': 'Live from 1 October',
            'slide.danielbrecheis.tag1': 'Coaching',
            'slide.danielbrecheis.tag2': 'Branding',
            'slide.danielbrecheis.tag3': 'Live from Oct 1',
            // Haakly (self-hosted CMS, no public repo)
            'slide.haakly.t1': 'Haakly.',
            'slide.haakly.t2': 'Every version',
            'slide.haakly.t3': 'stays reachable.',
            'slide.haakly.badge': 'SELF-HOSTED CMS',
            'slide.haakly.desc': 'A self-hosted CMS for client websites: editors work in the browser, every save becomes an immutable revision, and what goes live is always a verified release. A rollback switches back to an earlier release without the live site going blank in between.',
            'slide.haakly.cta1': 'Ask about this',
            'slide.haakly.tag1': 'TypeScript',
            'slide.haakly.tag2': 'Fastify',
            'slide.haakly.tag3': 'PostgreSQL',
            // CapitalCombo (private, purely technical description)
            'slide.capitalcombo.t1': 'CapitalCombo.',
            'slide.capitalcombo.t2': 'A trading system',
            'slide.capitalcombo.t3': 'that measures itself.',
            'slide.capitalcombo.badge': 'TRADING PLATFORM',
            'slide.capitalcombo.desc': 'A research and execution platform for CFD trading: triggers gather market context, an LLM turns it into a decision, and 19 pre-flight checks plus a live gate decide whether it ever reaches the broker. A large part of the work sits in the measurement layer: backtests, cost models, and a judge that replays past decisions against the candles that actually followed.',
            'slide.capitalcombo.cta1': 'Ask about this',
            'slide.capitalcombo.tag1': 'FastAPI',
            'slide.capitalcombo.tag2': 'Next.js',
            'slide.capitalcombo.tag3': 'Multi-LLM',
            // Deterministic review (private)
            'slide.detreview.t1': 'Deterministic review.',
            'slide.detreview.t2': 'Mechanics first,',
            'slide.detreview.t3': 'then the AI.',
            'slide.detreview.badge': 'DEVELOPER TOOL',
            'slide.detreview.desc': 'A pipeline that works through a large git branch mechanically first: merge base, net diff, six scans and a classifier that checks every changed line against a pattern catalogue. Only what is left unexplained or looks substantive goes to AI agents. The answers are matched by stable finding IDs and recomputed from the files every time, never from remembered numbers.',
            'slide.detreview.cta1': 'Ask about this',
            'slide.detreview.tag1': 'Python',
            'slide.detreview.tag2': 'git',
            'slide.detreview.tag3': 'LLM harness',
            // DealHunter (private)
            'slide.dealhunter.t1': 'DealHunter.',
            'slide.dealhunter.t2': 'Finds the deals',
            'slide.dealhunter.t3': 'before I look.',
            'slide.dealhunter.badge': 'MARKET SCANNER',
            'slide.dealhunter.desc': 'An autonomous agent that scans Kleinanzeigen around the clock for listings worth having. Scheduler, worker and dashboard share one Postgres queue, so a long search never blocks the rest. Cars, mostly the BMW E46, are scored against market median, condition, mileage and demand; for consoles a vision model reads the photos and works out the margin against PriceCharting. Hits arrive over Telegram, with the AI cost running visibly alongside.',
            'slide.dealhunter.cta1': 'Ask about this',
            'slide.dealhunter.tag1': 'Python',
            'slide.dealhunter.tag2': 'FastAPI',
            'slide.dealhunter.tag3': 'Claude API',
            // MemeCoinTrader (private, work in progress, no screenshot)
            'slide.memecointrader.t1': 'MemeCoinTrader.',
            'slide.memecointrader.t2': 'Solana streams,',
            'slide.memecointrader.t3': 'scored live.',
            'slide.memecointrader.badge': 'DESKTOP APP',
            'slide.memecointrader.desc': 'A Java desktop application that reads WebSocket streams of new Solana tokens, scores candidates through a rule and scoring engine, and routes orders through Jupiter quotes, in paper mode by default. A dedicated backtesting part replays recorded decisions and checks them for overfitting with purged k-fold and deflated Sharpe.',
            'slide.memecointrader.cta1': 'Ask about this',
            'slide.memecointrader.cta2': 'Work in progress',
            'slide.memecointrader.tag1': 'Java 21',
            'slide.memecointrader.tag2': 'Solana RPC',
            'slide.memecointrader.tag3': 'Backtesting',
            // Age of Max (publicly playable)
            'slide.ageofmax.t1': 'Age of Max.',
            'slide.ageofmax.t2': 'Stone Age to future',
            'slide.ageofmax.t3': 'on one lane.',
            'slide.ageofmax.badge': 'BROWSER GAME',
            'slide.ageofmax.desc': 'A browser game modelled on Age of War: units advance along a single lane, gold comes from defeated enemies, and enough XP unlocks the next epoch with better units and turrets. Five epochs from the Stone Age to the future, 20 units, 15 turrets and three difficulty levels.',
            'slide.ageofmax.cta1': 'Play now',
            'slide.ageofmax.cta2': 'View on GitHub',
            'slide.ageofmax.tag1': 'Phaser 3',
            'slide.ageofmax.tag2': 'TypeScript',
            'slide.ageofmax.tag3': 'Vite',
            // Invitation: not a project, the open slot in the client section
            'slide.invite.t1': 'Your project.',
            'slide.invite.t2': 'Up next.',
            'slide.invite.t3': 'Right here.',
            'slide.invite.badge': 'OPEN SLOT',
            'slide.invite.desc': 'Two client projects are in the works here, real work rather than sample pages. The slot for the next one is open. A short conversation is enough to tell whether it is a fit.',
            'slide.invite.cta1': 'Let us talk',
            'slide.invite.tag1': 'Websites',
            'slide.invite.tag2': 'Web apps',
            'slide.invite.tag3': 'Ongoing care',
            'slide.invite.mock1': 'Room for your project.',
            'slide.invite.mock2': 'Not a placeholder, an open slot.',
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

    /* Die Projektseiten unter projects/ bringen ihre eigenen, deutlich
       umfangreicheren Woerterbuecher mit (assets/js/projects-i18n.js, vor dieser
       Datei eingebunden) und legen sie unter window.PROJECT_TRANSLATIONS ab.
       Sie werden hier einmalig in translations gemischt. Die Startseite bindet
       die Datei nicht ein, dort passiert an dieser Stelle nichts. */
    if (window.PROJECT_TRANSLATIONS) {
        Object.keys(translations).forEach((lang) => {
            Object.assign(translations[lang], window.PROJECT_TRANSLATIONS[lang] || {});
        });
    }

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
            // settle() of the transition that is currently running. Kept so a
            // new request can finish it immediately instead of being dropped.
            this.settleActive = null;
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
            // Land any running transition on the outgoing mode's arrays before
            // they are swapped, otherwise its settle() would later write tab
            // state for slides that are no longer on screen.
            if (this.isAnimating) this.finishRunningAnimation();
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

            this.setActiveTab(index);

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

            if (dispatchEvent) {
                document.dispatchEvent(new CustomEvent('slide:change', { detail: { slide: activeSlide } }));
            }
        }

        /**
         * The tablist half of the active state: selected class, aria-selected
         * and the roving tabindex. Split out of setActiveSlide() so it can be
         * re-run on its own, and so it is the single place that decides which
         * tab is the selected one.
         */
        setActiveTab(index) {
            this.navBtns.forEach((btn, i) => {
                const isActive = i === index;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-selected', String(isActive));
                btn.tabIndex = isActive ? 0 : -1;
            });
            this.revealActiveTab(index);
        }

        /**
         * Move DOM focus onto the tab at `index`, but only while the tablist
         * already owns focus. Keyboard users then always sit on the tab that
         * is selected; mouse and touch users are never yanked around.
         */
        focusTabIfInside(index) {
            const active = document.activeElement;
            if (!active || this.navBtns.indexOf(active) === -1) return;
            const target = this.navBtns[index];
            if (target && target !== active) target.focus();
        }

        /**
         * The pagination is a single horizontally scrolling row. Scroll the
         * strip itself, never the page, so the current project tab stays
         * visible after an arrow click or a swipe.
         */
        revealActiveTab(index) {
            // Deferred by a tick: during a mode switch the strip is measured
            // while tabs are still being hidden, which lands the scroll a few
            // pixels short and clips the last tab.
            window.setTimeout(() => this.scrollTabIntoView(index), 0);
        }

        /**
         * Fade out whichever side of the strip still has pills behind it, so
         * a cut off pill reads as "there is more" instead of as a clipping
         * bug. Both classes are dropped as soon as nothing overflows, which
         * is the normal case for the three client projects.
         */
        updateEdgeFades() {
            const strip = this.pagination;
            if (!strip) return;
            const first = this.navBtns[0];
            const last = this.navBtns[this.navBtns.length - 1];
            if (!first || !last) {
                strip.classList.remove('has-scroll-start', 'has-scroll-end');
                return;
            }
            // Measured against the real pills, not against scrollWidth: the
            // narrow layout adds a leading padding and a trailing spacer, and
            // those alone must not pretend there is a hidden project.
            const stripRect = strip.getBoundingClientRect();
            const tolerance = 1;
            strip.classList.toggle('has-scroll-start',
                first.getBoundingClientRect().left < stripRect.left - tolerance);
            strip.classList.toggle('has-scroll-end',
                last.getBoundingClientRect().right > stripRect.right + tolerance);
        }

        scrollTabIntoView(index) {
            const btn = this.navBtns[index];
            const strip = this.pagination;
            if (!btn || !strip) return;
            const maxScroll = strip.scrollWidth - strip.clientWidth;
            if (maxScroll <= 0) {
                // Nothing to scroll. Clear any offset left over from the mode
                // that had more tabs, otherwise the shorter row starts shifted.
                if (strip.scrollLeft !== 0) strip.scrollLeft = 0;
                this.updateEdgeFades();
                return;
            }

            // Where the tab sits inside the scrolled content. Measured from
            // the strip itself, because offsetLeft would be relative to the
            // section (the nearest positioned ancestor) and would be off by
            // the strip's own left edge on wide screens.
            const stripRect = strip.getBoundingClientRect();
            const btnRect = btn.getBoundingClientRect();
            const width = btnRect.width;
            const start = btnRect.left - stripRect.left + strip.scrollLeft;
            const end = start + width;

            // Centre the tab, then pull it back until it is fully inside the
            // strip with a gutter. Centring alone can leave the first and last
            // tabs half cut off once the value is clamped to the scroll range.
            // The gutter matches the edge fade of .project-pagination, so the
            // selected tab is never the one being faded out.
            const gutter = 40;
            let left = start - (strip.clientWidth - width) / 2;
            left = Math.min(left, start - gutter);
            left = Math.max(left, end + gutter - strip.clientWidth);
            left = Math.max(0, Math.min(left, maxScroll));

            if (typeof strip.scrollTo === 'function') {
                strip.scrollTo({ left, behavior: this.prefersReducedMotion ? 'auto' : 'smooth' });
            } else {
                strip.scrollLeft = left;
            }
            this.updateEdgeFades();
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
                // The fades follow the real scroll position, so they also
                // update while a smooth scrollTo() is still running.
                this.pagination.addEventListener('scroll', () => this.updateEdgeFades(), { passive: true });
                window.addEventListener('resize', () => this.updateEdgeFades(), { passive: true });
                // A late web font changes the pill widths, which can turn a
                // row that fitted into one that scrolls.
                if (document.fonts && typeof document.fonts.ready === 'object') {
                    document.fonts.ready.then(() => this.updateEdgeFades());
                }

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

        /**
         * End the transition that is running right now, immediately and with
         * its full end state applied. Used when a new request arrives mid
         * animation: dropping the request instead would leave focus,
         * aria-selected and tabindex pointing at three different slides.
         */
        finishRunningAnimation() {
            const settle = this.settleActive;
            if (typeof settle === 'function') settle();
        }

        goToSlide(index) {
            if (index < 0 || index >= this.slides.length) return;

            // A second arrow press while the first transition is still running
            // no longer bails out. The running one is settled on the spot, so
            // every press lands and the tablist can never be left describing a
            // slide that was never shown.
            if (this.isAnimating) this.finishRunningAnimation();

            if (index === this.currentIndex) {
                // Already there. Still re-assert the tab state and focus: the
                // settled run above may have moved the roving tabindex onto a
                // tab the visitor has meanwhile arrowed past.
                this.setActiveTab(index);
                this.focusTabIfInside(index);
                return;
            }

            this.isAnimating = true;

            const direction = index > this.currentIndex ? 1 : -1;
            const oldSlide = this.slides[this.currentIndex];
            const newSlide = this.slides[index];

            // Selection is decided here, not when the animation ends. The tab
            // state and the panels' aria-hidden therefore describe the slide
            // that is coming in for the whole transition, which is also the
            // slide the visitor's focus is already on.
            this.setActiveTab(index);
            this.focusTabIfInside(index);
            oldSlide.setAttribute('aria-hidden', 'true');
            newSlide.setAttribute('aria-hidden', 'false');

            let settled = false;
            const settle = () => {
                if (settled) return;
                settled = true;
                if (this.settleActive === settle) this.settleActive = null;
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
            this.settleActive = settle;

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
