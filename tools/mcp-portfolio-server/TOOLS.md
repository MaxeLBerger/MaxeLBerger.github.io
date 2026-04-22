# Portfolio Optimizer - Verfügbare Tools

## 📖 read_file

**Beschreibung:** Liest den Inhalt einer Datei aus dem Portfolio-Projekt.

**Parameter:**
- `filePath` (string): Relativer oder absoluter Pfad zur Datei

**Verwendung:**
```
Lies die index.html Datei
Zeige mir den Inhalt von style.css
Was steht in script.js?
```

**Beispiel-Output:**
```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    ...
```

---

## ✏️ write_file

**Beschreibung:** Schreibt oder überschreibt eine Datei im Portfolio-Projekt.

**Parameter:**
- `filePath` (string): Relativer oder absoluter Pfad zur Datei
- `content` (string): Der zu schreibende Inhalt

**Verwendung:**
```
Erstelle eine neue Datei test.html mit einem HTML5 Grundgerüst
Aktualisiere die style.css und ändere die Primärfarbe zu #00ff00
Füge eine neue Seite contact.html hinzu
```

**Hinweis:** ⚠️ Überschreibt bestehende Dateien ohne Warnung!

---

## 📁 list_files

**Beschreibung:** Listet alle Dateien und Ordner in einem Verzeichnis auf.

**Parameter:**
- `directory` (string): Relativer oder absoluter Pfad zum Verzeichnis

**Verwendung:**
```
Liste alle Dateien im projects Ordner
Was ist im res Verzeichnis?
Zeige mir alle Dateien im Root-Verzeichnis
```

**Beispiel-Output:**
```
📁 projects/
📄 index.html
📄 style.css
📄 script.js
📁 res/
```

---

## 🔍 analyze_html

**Beschreibung:** Analysiert eine HTML-Datei und extrahiert strukturierte Informationen.

**Parameter:**
- `filePath` (string): Pfad zur HTML-Datei

**Was wird analysiert:**
- ✅ Titel (Title Tag)
- ✅ Meta-Tags (SEO, Description, Keywords, Viewport, etc.)
- ✅ Überschriften (H1, H2, H3)
- ✅ Links (alle href Attribute)
- ✅ Scripts (externe JavaScript-Dateien)
- ✅ Stylesheets (CSS-Dateien)
- ✅ Bilder (alle img src Attribute)

**Verwendung:**
```
Analysiere index.html
Welche Meta-Tags hat meine Hauptseite?
Zeige mir alle Links in impressum.html
```

**Beispiel-Output:**
```json
{
  "title": "Maximilian Haak - Softwareentwickler",
  "metaTags": [
    "charset=\"UTF-8\"",
    "name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"",
    "name=\"description\" content=\"Portfolio von Maximilian Haak\""
  ],
  "headings": {
    "h1": ["Willkommen"],
    "h2": ["Über mich", "Projekte"],
    "h3": ["Skills"]
  },
  "links": ["#home", "#aboutMe", "#skills", "#projects"],
  "scripts": ["https://cdn.example.com/script.js"],
  "stylesheets": ["style.css"],
  "images": ["res/faviconwhitegreen.png"]
}
```

---

## 🎨 analyze_css

**Beschreibung:** Analysiert eine CSS-Datei und gibt Statistiken zurück.

**Parameter:**
- `filePath` (string): Pfad zur CSS-Datei

**Was wird analysiert:**
- ✅ Anzahl der CSS-Regeln
- ✅ Verwendete Klassen (alle .class Selektoren)
- ✅ Verwendete IDs (alle #id Selektoren)
- ✅ Media Queries (responsive Design Breakpoints)
- ✅ Verwendete Farben (Hex-Codes)
- ✅ Verwendete Schriftarten (font-family)

**Verwendung:**
```
Analysiere style.css
Welche Farben verwende ich in meinem CSS?
Zeige mir alle Media Queries
Welche Schriftarten sind definiert?
```

**Beispiel-Output:**
```json
{
  "totalRules": 145,
  "classes": [
    "highlight",
    "nav-list",
    "menu-toggle",
    "hero-section"
  ],
  "ids": [
    "home",
    "aboutMe",
    "skills",
    "projects"
  ],
  "mediaQueries": [
    "(max-width: 768px)",
    "(min-width: 1024px)"
  ],
  "colors": [
    "#121212",
    "#00e676",
    "#fff"
  ],
  "fonts": [
    "'Roboto', sans-serif"
  ]
}
```

---

## 🌳 get_project_structure

**Beschreibung:** Gibt eine vollständige Baumansicht der Portfolio-Projektstruktur zurück.

**Parameter:** Keine

**Verwendung:**
```
Zeige mir die Projektstruktur
Welche Ordner hat mein Portfolio?
Gib mir eine Übersicht über alle Dateien
```

**Beispiel-Output:**
```
Portfolio-Projektstruktur:

📁 projects/
  📄 albert.html
  📄 style.css
📁 res/
  📄 faviconwhitegreen.png
  📄 logo.png
📄 index.html
📄 style.css
📄 script.js
📄 impressum.html
📄 datenschutz.html
📄 README.md
📄 CNAME
```

---

## 💡 Tipps zur Verwendung

### SEO-Optimierung
```
Analysiere meine index.html und prüfe die Meta-Tags
Fehlen wichtige SEO Meta-Tags?
Optimiere die Description für besseres Ranking
```

### Performance-Check
```
Welche externen Scripts lädt meine Website?
Kann ich die Anzahl der HTTP-Requests reduzieren?
Welche Bilder werden geladen?
```

### Code-Qualität
```
Wie viele CSS-Klassen habe ich?
Gibt es ungenutzte IDs in meinem CSS?
Sind meine Media Queries logisch strukturiert?
```

### Design-Konsistenz
```
Welche Farben verwende ich durchgängig?
Sind die Schriftarten konsistent?
Zeige mir alle Überschriften-Hierarchien
```

### Wartung
```
Welche Dateien sind im projects Ordner?
Erstelle eine neue Projektseite für mein neues Projekt
Aktualisiere das Copyright Jahr im Footer
```

---

## 🚀 Erweiterte Anwendungsfälle

### Automatisches Refactoring
```
Finde alle veralteten CSS-Eigenschaften
Ersetze alle #fff mit einer CSS-Variable
Konvertiere inline Styles zu Klassen
```

### Accessibility Audit
```
Haben alle Bilder alt-Attribute?
Sind die Überschriften semantisch korrekt?
Fehlen ARIA-Labels?
```

### Multi-Language Support
```
Analysiere alle HTML-Dateien auf lang-Attribute
Prüfe ob alle Seiten dieselbe Spracheinstellung haben
```

### Responsive Design Check
```
Welche Breakpoints verwende ich?
Sind alle Media Queries konsistent?
Fehlen mobile-spezifische Styles?
```

---

## 🛡️ Sicherheitshinweise

- Der Server hat **nur Zugriff** auf:
  ```
  c:\Users\maxih\Documents\Repositories\MaximilianHaak\MaxeLBerger.github.io
  ```
- Alle Pfade außerhalb dieses Verzeichnisses werden blockiert
- Dateien werden mit deinen Benutzerrechten gelesen/geschrieben
- Keine Netzwerkzugriffe oder externe API-Calls

---

## 📝 Best Practices

1. **Sei spezifisch:** "Analysiere index.html" statt nur "Analysiere"
2. **Nutze relative Pfade:** "style.css" statt voller Pfad
3. **Prüfe vor dem Schreiben:** Lies Dateien erst, bevor du sie überschreibst
4. **Regelmäßige Backups:** Git commit vor größeren Änderungen
5. **Teste nach Änderungen:** Browser-Refresh nach CSS/JS Updates

---

## 🔧 Troubleshooting

**"Datei nicht gefunden"**
- Prüfe ob der Pfad relativ zum Portfolio-Root ist
- Verwende forward slashes `/` oder escaped backslashes `\\`

**"Permission denied"**
- Prüfe Schreibrechte im Dateisystem
- Schließe die Datei in anderen Programmen

**"Invalid JSON"**
- Bei analyze_* Tools: Möglicherweise ungültiges HTML/CSS
- Prüfe Syntax-Fehler in den Dateien

---

**Version:** 1.0.0  
**Letzte Aktualisierung:** 06.11.2025
