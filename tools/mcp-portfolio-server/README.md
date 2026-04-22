# Portfolio Optimizer MCP Server

# MCP Portfolio Server

Ein Model Context Protocol (MCP) Server für Portfolio Website Optimierung und Verwaltung.

## ✨ Features

Dieser MCP-Server bietet folgende Tools für Claude Desktop:

### 📁 Datei-Operationen
- **read_file** - Liest Dateien aus dem Portfolio-Projekt
- **write_file** - Schreibt/Aktualisiert Dateien im Portfolio
- **list_files** - Listet Dateien und Verzeichnisse auf

### 🔍 Analyse-Tools
- **analyze_html** - Analysiert HTML-Dateien (Tags, Meta-Tags, Links, Scripts)
- **analyze_css** - Analysiert CSS-Dateien (Selektoren, Klassen, Farben, Fonts)
- **get_project_structure** - Gibt vollständige Projektstruktur zurück

### 💼 Portfolio-Daten
- **get_portfolio_data** - Gibt strukturierte Portfolio-Informationen zurück
  - Persönliche Infos
  - Skills und Technologien
  - Projekt-Übersicht
  - Timeline/About
- **get_project_details** - Detaillierte Informationen zu spezifischen Projekten

## 📊 Portfolio-Daten

Alle Portfolio-Daten sind strukturiert in `portfolio-data.json`:
- Persönliche Informationen
- Skills mit Kategorien
- 5 Projekte (Age of Max, FireCastle, AuTune Online, SoundofLvke, Albert)
- Vollständige Projekt-Details mit Features, Technologien, URLs

## 🚀 Installation & Setup

### 1. Dependencies installieren
```bash
npm install
```

### 2. Server bauen
```bash
npm run build
```

### 3. Claude Desktop konfigurieren

Die Konfigurationsdatei wurde bereits erstellt unter:
`%APPDATA%\Claude\claude_desktop_config.json`

Inhalt:
```json
{
  "mcpServers": {
    "portfolio-optimizer": {
      "command": "node",
      "args": [
        "c:\\Users\\maxih\\Documents\\Repositories\\MaximilianHaak\\MaxeLBerger.github.io\\tools\\mcp-portfolio-server\\build\\index.js"
      ]
    }
  }
}
```

### 4. Claude Desktop neu starten

**Wichtig:** Starte Claude Desktop komplett neu, damit die MCP-Server-Konfiguration geladen wird.

### 5. Server testen

In Claude Desktop solltest du nun ein 🔨 Symbol sehen, das anzeigt, dass MCP-Tools verfügbar sind.

Teste mit:
```
Welche Portfolio-Projekte gibt es?
```

oder

```
Zeig mir Details über das Age of Max Projekt
```

## 🛠️ Entwicklung

### Server im Dev-Modus starten
```bash
npm run dev
```

### Mit Watch-Mode
```bash
npm run watch
```

## 📝 Beispiel-Anfragen in Claude Desktop

1. **Portfolio-Übersicht:**
   ```
   Zeig mir alle meine Portfolio-Projekte
   ```

2. **Spezifisches Projekt:**
   ```
   Was sind die Features von FireCastle?
   ```

3. **Skills:**
   ```
   Welche Programmiersprachen beherrsche ich?
   ```

4. **HTML-Analyse:**
   ```
   Analysiere die index.html Datei
   ```

5. **Projektstruktur:**
   ```
   Zeig mir die komplette Projektstruktur
   ```

## ✅ Verfügbare Projekt-IDs

- `age-of-max` - Tower Defense Spiel
- `firecastle` - Clash of Clans API & Website
- `autune-online` - Audio Visualizer
- `soundoflvke` - Musikproduzenten Portfolio
- `albert` - KI Evolution Simulation

## 🎯 Use Cases

- **Portfolio-Optimierung:** Claude kann deine Website analysieren und Verbesserungen vorschlagen
- **Content-Updates:** Aktualisiere Projekt-Informationen direkt über Claude
- **SEO-Analyse:** Lass Claude deine Meta-Tags und HTML-Struktur prüfen
- **Projekt-Dokumentation:** Automatische Generierung von Projekt-Beschreibungen
- **Code-Review:** Analysiere CSS und HTML für Best Practices

## 📦 Technologien

- **TypeScript** - Typ-sichere Entwicklung
- **@modelcontextprotocol/sdk** - MCP SDK von Anthropic
- **Zod** - Schema-Validierung
- **Node.js** - Runtime Environment

## 📄 Lizenz

ISC

## 👨‍💻 Autor

Maximilian Haak - [maximilian@haak.in](mailto:maximilian@haak.in)

## Features

Der Server bietet folgende Tools:

### 1. `read_file`
Liest den Inhalt einer Datei aus dem Portfolio-Projekt.
- **Parameter**: `filePath` - Relativer oder absoluter Pfad zur Datei
- **Beispiel**: Lese `index.html`, `style.css`, `script.js`

### 2. `write_file`
Schreibt oder überschreibt eine Datei im Portfolio-Projekt.
- **Parameter**: 
  - `filePath` - Pfad zur Datei
  - `content` - Inhalt zum Schreiben
- **Verwendung**: Automatische Code-Updates, Bugfixes

### 3. `list_files`
Listet alle Dateien und Ordner in einem Verzeichnis auf.
- **Parameter**: `directory` - Verzeichnis zum Auflisten
- **Nützlich für**: Projektstruktur-Übersicht

### 4. `analyze_html`
Analysiert eine HTML-Datei und extrahiert:
- Titel
- Meta-Tags (SEO, Keywords, Description)
- Überschriften (H1, H2, H3)
- Links
- Scripts
- Stylesheets
- Bilder

### 5. `analyze_css`
Analysiert eine CSS-Datei und gibt zurück:
- Anzahl der CSS-Regeln
- Verwendete Klassen
- Verwendete IDs
- Media Queries
- Verwendete Farben
- Verwendete Schriftarten

### 6. `get_project_structure`
Gibt eine vollständige Übersicht über die Portfolio-Projektstruktur.

## Installation

```bash
cd tools/mcp-portfolio-server
npm install
```

## Entwicklung

```bash
# TypeScript kompilieren und watcher starten
npm run watch

# Oder direkt mit tsx ausführen
npm run dev
```

## Produktion

```bash
# TypeScript kompilieren
npm run build

# Server starten
npm start
```

## Konfiguration in VS Code

Um den MCP Server in VS Code (mit Claude oder anderen MCP-Clients) zu verwenden, füge folgende Konfiguration hinzu:

### Windows
Bearbeite `%APPDATA%\Code\User\globalStorage\rooveterinaryinc.roo-cline\settings\cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "portfolio-optimizer": {
      "command": "node",
      "args": [
        "c:\\Users\\maxih\\Documents\\Repositories\\MaximilianHaak\\MaxeLBerger.github.io\\tools\\mcp-portfolio-server\\build\\index.js"
      ]
    }
  }
}
```

### Alternativ: Mit tsx (Entwicklung)
```json
{
  "mcpServers": {
    "portfolio-optimizer": {
      "command": "npx",
      "args": [
        "tsx",
        "c:\\Users\\maxih\\Documents\\Repositories\\MaximilianHaak\\MaxeLBerger.github.io\\tools\\mcp-portfolio-server\\src\\index.ts"
      ]
    }
  }
}
```

## Verwendung

Nach der Konfiguration kannst du in deinem MCP-Client (z.B. Claude) folgende Anfragen stellen:

- "Lies die index.html Datei"
- "Analysiere meine CSS-Datei style.css"
- "Zeige mir die Projektstruktur"
- "Welche Meta-Tags hat meine index.html?"
- "Liste alle Dateien im projects Ordner"
- "Aktualisiere die Farbe in style.css"

## Vorteile

✅ Direkter Zugriff auf deine Portfolio-Dateien  
✅ Automatische Analyse von HTML/CSS  
✅ Schnelle Code-Änderungen ohne manuelles Editieren  
✅ Projektstruktur-Übersicht auf Abruf  
✅ SEO-Optimierung durch Meta-Tag-Analyse  
✅ Performance-Checks durch Asset-Analyse

## Sicherheit

Der Server hat nur Zugriff auf dein Portfolio-Verzeichnis:
```
c:\Users\maxih\Documents\Repositories\MaximilianHaak\MaxeLBerger.github.io
```

Alle Pfade werden relativ zu diesem Root-Verzeichnis aufgelöst.

## Lizenz

ISC

## Autor

Maximilian Haak
