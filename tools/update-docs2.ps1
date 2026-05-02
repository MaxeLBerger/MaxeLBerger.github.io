$docs = @(
  'CONTRIBUTING.md',
  'docs/development.md',
  'docs/architecture.md',
  'docs/deployment.md'
)

# Pure ASCII replacements only
$rules = @(
  @{ from = '`index.html`, `style.css`, `script.js`, `CNAME`, `impressum.html`, `datenschutz.html`'; to = '`index.html`, `assets/css/main.css`, `assets/js/main.js`, `CNAME`, `impressum.html`, `datenschutz.html`' },
  @{ from = 'edit `index.html`, `style.css`, `script.js`'; to = 'edit `index.html`, files under `assets/`, ' },
  @{ from = '[script.js](script.js)';   to = '[assets/js/main.js](assets/js/main.js)' },
  @{ from = '[style.css](style.css)';   to = '[assets/css/main.css](assets/css/main.css)' },
  @{ from = '[script.js](../assets/js/main.js)'; to = '[assets/js/main.js](../assets/js/main.js)' },
  @{ from = '[style.css](../assets/css/main.css)'; to = '[assets/css/main.css](../assets/css/main.css)' },
  @{ from = '`script.js`';  to = '`assets/js/main.js`' },
  @{ from = '`style.css`';  to = '`assets/css/main.css`' }
)

foreach ($f in $docs) {
  if (-not (Test-Path $f)) { continue }
  $orig = Get-Content $f -Raw -Encoding UTF8
  $new = $orig
  foreach ($r in $rules) { $new = $new.Replace($r.from, $r.to) }
  if ($new -ne $orig) { Set-Content $f -Value $new -NoNewline -Encoding UTF8; Write-Host "updated: $f" }
}
$docs = @(
  'CONTRIBUTING.md',
  'docs/development.md',
  'docs/architecture.md',
  'docs/deployment.md'
)

# Order matters
$rules = @(
  @{ from = '`index.html`, `style.css`, `script.js`, `CNAME`, `impressum.html`, `datenschutz.html`'; to = '`index.html`, `assets/css/main.css`, `assets/js/main.js`, `CNAME`, `impressum.html`, `datenschutz.html`' },
  @{ from = 'edit `index.html`, `style.css`, `script.js`'; to = 'edit `index.html`, files under `assets/`, ' },
  @{ from = '[script.js](script.js)';   to = '[assets/js/main.js](assets/js/main.js)' },
  @{ from = '[style.css](style.css)';   to = '[assets/css/main.css](assets/css/main.css)' },
  @{ from = '[script.js](../assets/js/main.js)'; to = '[assets/js/main.js](../assets/js/main.js)' },
  @{ from = '[style.css](../assets/css/main.css)'; to = '[assets/css/main.css](../assets/css/main.css)' },
  @{ from = '`script.js`';  to = '`assets/js/main.js`' },
  @{ from = '`style.css`';  to = '`assets/css/main.css`' },
  @{ from = '│   └── style.css           Detail-page-specific styles'; to = '│   └── main.css            Detail-page-specific styles' },
  @{ from = "├── style.css               Main stylesheet (~3 k lines, all components)`r`n├── script.js               All JS (~1.5 k lines, single IIFE)"; to = "├── assets/`r`n│   ├── css/main.css        Main stylesheet (~3 k lines, all components)`r`n│   ├── js/main.js          All JS (~1.5 k lines, single IIFE)`r`n│   └── img/                Static assets (images only)" },
  @{ from = "├── style.css               Main stylesheet (~3 k lines, all components)`n├── script.js               All JS (~1.5 k lines, single IIFE)"; to = "├── assets/`n│   ├── css/main.css        Main stylesheet (~3 k lines, all components)`n│   ├── js/main.js          All JS (~1.5 k lines, single IIFE)`n│   └── img/                Static assets (images only)" }
)

foreach ($f in $docs) {
  if (-not (Test-Path $f)) { continue }
  $orig = Get-Content $f -Raw -Encoding UTF8
  $new = $orig
  foreach ($r in $rules) { $new = $new.Replace($r.from, $r.to) }
  if ($new -ne $orig) { Set-Content $f -Value $new -NoNewline -Encoding UTF8; Write-Host "updated: $f" }
}
