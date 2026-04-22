# Portfolio Optimizer MCP Server - Setup Anleitung

## Schritt 1: Server Build

Der Server wurde bereits gebaut! Falls du ihn neu bauen musst:

```bash
cd tools/mcp-portfolio-server
npm run build
```

## Schritt 2: Konfiguration in Claude Desktop

### Windows Konfiguration

1. **Öffne Claude Desktop**

2. **Gehe zu den Einstellungen:**
   - Klicke auf das Claude Menü
   - Wähle "Settings..."

3. **Developer Einstellungen:**
   - Klicke auf "Developer" in der linken Seitenleiste
   - Klicke auf "Edit Config"

4. **Konfigurationsdatei bearbeiten:**
   Die Datei befindet sich hier:
   ```
   %APPDATA%\Claude\claude_desktop_config.json
   ```
   
   Füge folgende Konfiguration hinzu:

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

5. **Claude Desktop neu starten:**
   - Schließe Claude Desktop vollständig
   - Starte Claude Desktop neu
   - Du solltest jetzt ein MCP-Symbol (🔨) in der unteren rechten Ecke sehen

## Schritt 3: Server testen

Nach dem Neustart von Claude Desktop, teste den Server mit:

```
Zeige mir die Projektstruktur meiner Portfolio-Website
```

oder

```
Analysiere meine index.html Datei
```

## Schritt 4: Verfügbare Befehle

### Dateien lesen
```
Lies die style.css Datei
```

### Dateien analysieren
```
Analysiere meine index.html
Analysiere die CSS Datei style.css
```

### Projektstruktur
```
Zeige mir die Projektstruktur
Liste alle Dateien im projects Ordner
```

### Dateien bearbeiten
```
Aktualisiere die Hintergrundfarbe in style.css zu #1a1a1a
Füge ein neues Meta-Tag für Twitter Cards zur index.html hinzu
```

## Alternative: Entwicklungsmodus

Für die Entwicklung kannst du auch die TypeScript-Datei direkt verwenden:

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

## Troubleshooting

### Server erscheint nicht in Claude
1. Überprüfe, ob die Pfade in der Konfiguration korrekt sind
2. Stelle sicher, dass der Build erfolgreich war (`npm run build`)
3. Überprüfe die Claude Desktop Logs

### ENOENT Fehler
- Stelle sicher, dass alle Backslashes doppelt sind: `\\` statt `\`
- Verwende absolute Pfade

### Tool Calls schlagen fehl
- Überprüfe, ob der Portfolio-Pfad im Server korrekt ist
- Stelle sicher, dass du Leserechte für die Dateien hast

## Logs ansehen

Um zu überprüfen, ob der Server läuft, schau in die Claude Desktop Logs:

Windows:
```
%APPDATA%\Claude\logs\mcp-server-portfolio-optimizer.log
```

## Nächste Schritte

✅ Server ist eingerichtet  
✅ Claude kann deine Portfolio-Dateien lesen  
✅ Claude kann HTML/CSS analysieren  
✅ Claude kann Projektstruktur anzeigen  

Jetzt kannst du:
- SEO-Optimierungen vornehmen
- Code-Refactoring durchführen
- Neue Features hinzufügen
- Performance verbessern
- Accessibility prüfen

Viel Erfolg mit deinem Portfolio! 🚀
