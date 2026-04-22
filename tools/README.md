# tools/

Local development tooling. **Nothing in this folder is shipped to production.**

The deploy workflow ([../.github/workflows/deploy.yml](../.github/workflows/deploy.yml))
only copies `*.html`, `CNAME`, `assets/`, and `projects/`
into `dist/`. Everything in `tools/` is excluded.

## Contents

| Folder | Purpose |
|---|---|
| [mcp-portfolio-server/](mcp-portfolio-server/) | MCP (Model Context Protocol) server that exposes portfolio data to Claude/Cline for AI-assisted edits. |
