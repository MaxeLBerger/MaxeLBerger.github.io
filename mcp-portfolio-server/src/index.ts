#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs/promises";
import * as path from "path";
import { z } from "zod";

// Schema-Definitionen für Tool-Argumente
const ReadFileArgsSchema = z.object({
  filePath: z.string().describe("Absoluter Pfad zur Datei"),
});

const WriteFileArgsSchema = z.object({
  filePath: z.string().describe("Absoluter Pfad zur Datei"),
  content: z.string().describe("Dateiinhalt zum Schreiben"),
});

const ListFilesArgsSchema = z.object({
  directory: z.string().describe("Verzeichnis zum Auflisten"),
});

const AnalyzeHTMLArgsSchema = z.object({
  filePath: z.string().describe("Pfad zur HTML-Datei"),
});

const AnalyzeCSSArgsSchema = z.object({
  filePath: z.string().describe("Pfad zur CSS-Datei"),
});

// Portfolio Root Pfad
const PORTFOLIO_ROOT = path.resolve(
  "c:\\Users\\maxih\\Documents\\Repositories\\MaximilianHaak\\MaxeLBerger.github.io"
);

// Server-Instanz erstellen
const server = new Server(
  {
    name: "portfolio-optimizer",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool-Definitionen
const TOOLS: Tool[] = [
  {
    name: "read_file",
    description:
      "Liest den Inhalt einer Datei aus dem Portfolio-Projekt. Nützlich für HTML, CSS, JavaScript Dateien.",
    inputSchema: {
      type: "object",
      properties: {
        filePath: {
          type: "string",
          description: "Relativer oder absoluter Pfad zur Datei",
        },
      },
      required: ["filePath"],
    },
  },
  {
    name: "write_file",
    description:
      "Schreibt Inhalt in eine Datei im Portfolio-Projekt. Überschreibt existierende Dateien.",
    inputSchema: {
      type: "object",
      properties: {
        filePath: {
          type: "string",
          description: "Relativer oder absoluter Pfad zur Datei",
        },
        content: {
          type: "string",
          description: "Der zu schreibende Inhalt",
        },
      },
      required: ["filePath", "content"],
    },
  },
  {
    name: "list_files",
    description:
      "Listet alle Dateien und Verzeichnisse in einem Portfolio-Verzeichnis auf.",
    inputSchema: {
      type: "object",
      properties: {
        directory: {
          type: "string",
          description: "Relativer oder absoluter Pfad zum Verzeichnis",
        },
      },
      required: ["directory"],
    },
  },
  {
    name: "analyze_html",
    description:
      "Analysiert eine HTML-Datei und gibt strukturierte Informationen zurück (Tags, Meta-Tags, Links, Scripts).",
    inputSchema: {
      type: "object",
      properties: {
        filePath: {
          type: "string",
          description: "Pfad zur HTML-Datei",
        },
      },
      required: ["filePath"],
    },
  },
  {
    name: "analyze_css",
    description:
      "Analysiert eine CSS-Datei und gibt Informationen über Selektoren, Klassen und Eigenschaften zurück.",
    inputSchema: {
      type: "object",
      properties: {
        filePath: {
          type: "string",
          description: "Pfad zur CSS-Datei",
        },
      },
      required: ["filePath"],
    },
  },
  {
    name: "get_project_structure",
    description:
      "Gibt eine Übersicht über die gesamte Portfolio-Projektstruktur zurück.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

// Hilfsfunktion: Relativen Pfad zu absolutem Pfad konvertieren
function resolvePath(filePath: string): string {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }
  return path.join(PORTFOLIO_ROOT, filePath);
}

// Hilfsfunktion: Projektstruktur rekursiv durchlaufen
async function getDirectoryStructure(
  dir: string,
  indent = ""
): Promise<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let structure = "";

  for (const entry of entries) {
    // Überspringe .git und node_modules
    if (entry.name === ".git" || entry.name === "node_modules") {
      continue;
    }

    if (entry.isDirectory()) {
      structure += `${indent}📁 ${entry.name}/\n`;
      const subDir = path.join(dir, entry.name);
      structure += await getDirectoryStructure(subDir, indent + "  ");
    } else {
      structure += `${indent}📄 ${entry.name}\n`;
    }
  }

  return structure;
}

// Hilfsfunktion: HTML-Analyse
async function analyzeHTML(filePath: string): Promise<string> {
  const content = await fs.readFile(filePath, "utf-8");
  
  const analysis = {
    title: content.match(/<title>(.*?)<\/title>/i)?.[1] || "Kein Titel gefunden",
    metaTags: [...content.matchAll(/<meta\s+([^>]+)>/gi)].map(m => m[1]),
    headings: {
      h1: [...content.matchAll(/<h1[^>]*>(.*?)<\/h1>/gi)].map(m => m[1]),
      h2: [...content.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)].map(m => m[1]),
      h3: [...content.matchAll(/<h3[^>]*>(.*?)<\/h3>/gi)].map(m => m[1]),
    },
    links: [...content.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]),
    scripts: [...content.matchAll(/<script\s+[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]),
    stylesheets: [...content.matchAll(/<link\s+[^>]*href=["']([^"']+\.css)["'][^>]*>/gi)].map(m => m[1]),
    images: [...content.matchAll(/<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]),
  };

  return JSON.stringify(analysis, null, 2);
}

// Hilfsfunktion: CSS-Analyse
async function analyzeCSS(filePath: string): Promise<string> {
  const content = await fs.readFile(filePath, "utf-8");
  
  const analysis = {
    totalRules: (content.match(/\{[^}]*\}/g) || []).length,
    classes: [...new Set([...content.matchAll(/\.([a-zA-Z0-9_-]+)/g)].map(m => m[1]))],
    ids: [...new Set([...content.matchAll(/#([a-zA-Z0-9_-]+)/g)].map(m => m[1]))],
    mediaQueries: [...content.matchAll(/@media\s*([^{]+)/g)].map(m => m[1].trim()),
    colors: [...new Set([...content.matchAll(/#[0-9a-fA-F]{3,6}\b/g)].map(m => m[0]))],
    fonts: [...new Set([...content.matchAll(/font-family:\s*([^;]+)/gi)].map(m => m[1].trim()))],
  };

  return JSON.stringify(analysis, null, 2);
}

// Request-Handler: List Tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: TOOLS };
});

// Request-Handler: Call Tool
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "read_file": {
        const { filePath } = ReadFileArgsSchema.parse(args);
        const absolutePath = resolvePath(filePath);
        const content = await fs.readFile(absolutePath, "utf-8");
        return {
          content: [
            {
              type: "text",
              text: content,
            },
          ],
        };
      }

      case "write_file": {
        const { filePath, content } = WriteFileArgsSchema.parse(args);
        const absolutePath = resolvePath(filePath);
        await fs.writeFile(absolutePath, content, "utf-8");
        return {
          content: [
            {
              type: "text",
              text: `Datei erfolgreich geschrieben: ${absolutePath}`,
            },
          ],
        };
      }

      case "list_files": {
        const { directory } = ListFilesArgsSchema.parse(args);
        const absolutePath = resolvePath(directory);
        const entries = await fs.readdir(absolutePath, { withFileTypes: true });
        const fileList = entries.map((entry) =>
          entry.isDirectory() ? `📁 ${entry.name}/` : `📄 ${entry.name}`
        );
        return {
          content: [
            {
              type: "text",
              text: fileList.join("\n"),
            },
          ],
        };
      }

      case "analyze_html": {
        const { filePath } = AnalyzeHTMLArgsSchema.parse(args);
        const absolutePath = resolvePath(filePath);
        const analysis = await analyzeHTML(absolutePath);
        return {
          content: [
            {
              type: "text",
              text: analysis,
            },
          ],
        };
      }

      case "analyze_css": {
        const { filePath } = AnalyzeCSSArgsSchema.parse(args);
        const absolutePath = resolvePath(filePath);
        const analysis = await analyzeCSS(absolutePath);
        return {
          content: [
            {
              type: "text",
              text: analysis,
            },
          ],
        };
      }

      case "get_project_structure": {
        const structure = await getDirectoryStructure(PORTFOLIO_ROOT);
        return {
          content: [
            {
              type: "text",
              text: `Portfolio-Projektstruktur:\n\n${structure}`,
            },
          ],
        };
      }

      default:
        throw new Error(`Unbekanntes Tool: ${name}`);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: "text",
          text: `Fehler: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
});

// Server starten
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Portfolio Optimizer MCP Server läuft...");
}

main().catch((error) => {
  console.error("Server-Fehler:", error);
  process.exit(1);
});
