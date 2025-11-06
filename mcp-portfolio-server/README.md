# Portfolio Optimizer MCP Server

Ein Model Context Protocol (MCP) Server, der speziell für die Optimierung deiner Portfolio-Website entwickelt wurde.

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
cd mcp-portfolio-server
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
        "c:\\Users\\maxih\\Documents\\Repositories\\MaximilianHaak\\MaxeLBerger.github.io\\mcp-portfolio-server\\build\\index.js"
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
        "c:\\Users\\maxih\\Documents\\Repositories\\MaximilianHaak\\MaxeLBerger.github.io\\mcp-portfolio-server\\src\\index.ts"
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
