# 🚀 Quick Start - Portfolio Optimizer MCP Server

In **3 Minuten** einsatzbereit!

## ✅ Schritt 1: Claude Desktop öffnen

Starte Claude Desktop auf deinem Computer.

## ✅ Schritt 2: Konfiguration hinzufügen

1. **Claude Desktop → Settings → Developer → Edit Config**

2. **Füge folgende Zeilen ein:**

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

3. **Speichern** (Strg + S)

## ✅ Schritt 3: Claude neu starten

- Schließe Claude Desktop **komplett**
- Starte Claude Desktop neu
- Du solltest ein 🔨 Symbol unten rechts sehen

## ✅ Schritt 4: Testen!

Probiere diese Befehle in Claude:

```
Zeige mir die Projektstruktur meiner Portfolio-Website
```

oder

```
Analysiere meine index.html Datei
```

oder

```
Welche Farben verwende ich in meinem CSS?
```

## 🎉 Fertig!

Du kannst jetzt:
- ✅ Dateien lesen und bearbeiten
- ✅ HTML/CSS analysieren
- ✅ Projektstruktur anzeigen
- ✅ SEO optimieren
- ✅ Code refactoren

## 📖 Weitere Infos

- **Alle Tools:** Siehe [TOOLS.md](TOOLS.md)
- **Detailliertes Setup:** Siehe [SETUP.md](SETUP.md)
- **Allgemeine Infos:** Siehe [README.md](README.md)

## 🆘 Hilfe?

**Server erscheint nicht?**
- Prüfe ob der Pfad in der Config korrekt ist (doppelte Backslashes!)
- Build nochmal ausführen: `npm run build`
- Claude Logs prüfen: `%APPDATA%\Claude\logs\`

**Noch Fragen?**
- Siehe [SETUP.md](SETUP.md) für Troubleshooting
- Oder frag Claude direkt! 😊

---

**Viel Erfolg mit deinem Portfolio! 🎨**
