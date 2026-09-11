# pixel-contrast

Measures text contrast **against the pixels that are actually painted**, which
is the one thing [../contrast-audit.mjs](../contrast-audit.mjs) cannot do: that
one stacks background *colours* and skips every element whose ground is an
image, so all the copy sitting on the hero photo is invisible to it. This tool
screenshots the page with the text hidden, then blends the text colour over
every pixel the text would cover and reports the worst case.

Use it whenever the hero veil, the photo crop, the copy length or a colour
token changes, and to prove that such a change leaves other viewports alone.

## Requirements

- Node 22+ (global `fetch` and `WebSocket`, no npm install)
- Python with `numpy` and `Pillow` (same as [../hero-energy/](../hero-energy/))
- Microsoft Edge or Chrome (see `EDGE_CANDIDATES` in `shoot.mjs`)

## Quick start

```bash
python -m http.server 8817 --bind 127.0.0.1
node tools/pixel-contrast/shoot.mjs --base http://127.0.0.1:8817 --out /tmp/shots/now \
    --sizes 320x568,375x667,390x844,412x620,568x320 --schemes dark,light --langs de,en --mode hidden
python tools/pixel-contrast/measure.py contrast /tmp/shots/now
```

The table prints the 3rd percentile contrast per element and viewport, marks
everything below its WCAG AA threshold with `*`, and exits 1 if anything is
marked. `measure.py debug <dir> <shot> out.png` draws the sampled rects onto
the shot, which is how you check that the masks sit on the glyphs.

## Proving a change leaves other viewports alone

Serve both builds from **one** server (two `http.server` instances render the
same photo 1 to 2 levels apart), for example by exporting the old build next to
the working tree:

```bash
mkdir -p /tmp/www/base && git archive HEAD | tar -x -C /tmp/www/base
ln -s "$PWD" /tmp/www/cand    # Windows: New-Item -ItemType Junction
python -m http.server 8817 --bind 127.0.0.1 --directory /tmp/www
```

Then shoot the untouched build twice as a noise control, shoot the candidate,
and diff. `--region "#hero"` captures the whole section instead of only the
measured text:

```bash
for run in a b; do node tools/pixel-contrast/shoot.mjs --base http://127.0.0.1:8817 --build base \
    --out /tmp/shots/base-$run --mode visible --region "#hero" \
    --sizes 1024x768,1280x800,1440x900 --schemes dark,light; done
python tools/pixel-contrast/measure.py diff /tmp/shots/base-a /tmp/shots/base-b --expect-equal
python tools/pixel-contrast/measure.py diff /tmp/shots/base-a /tmp/shots/cand --expect-equal
```

`sheet.py` builds the review image out of the visible shots, with the measured
numbers printed under every frame.

## Things that silently ruin a measurement

- **`--user-data-dir` must be absolute and exist.** A relative or missing path
  makes Edge fall back to the real browser profile. The script creates it.
- **Never `captureBeyondViewport`.** It resizes the viewport, and a `100dvh`
  hero with bottom-aligned copy moves while you photograph it. The script
  captures viewport tiles and stitches them.
- **Hide the text, not its parent.** The veil under the hero copy is a
  `::before` of `.hero-content`, the parent of `.hero-text`; hiding the parent
  hides the veil you are trying to measure. That is what `--hide` defaults to.
- **Take the text box from a Range over the text nodes**, not from the element
  box: a paragraph's empty right half would otherwise count as text pixels.
- **Wait for the webfont.** Inter arrives after cookie consent and re-wraps
  lines. The script waits for it and re-shoots every tile until two consecutive
  frames are byte-identical.
- **Kill the browser over CDP.** On Windows `child.kill()` leaves headless Edge
  running with its port and profile; the script sends `Browser.close`.
- `git archive <rev>` applies the `.gitattributes` eol conversion, so an export
  is byte-identical to the working tree, while `git show <rev>:<file>` is not.

## Reference measurement

2026-09-12, homepage hero, dark and light, 23 viewports from 320x568 to
768x1024 plus five landscape sizes, DE and EN, after the copy-relative phone
veil landed in `ec2a0a7`: nothing below threshold. Dark eyebrow 6.61 to 8.37:1
(needs 4.5), headline line 1 15.9 to 18.5:1, accent word 6.9 to 7.6:1, body
11.8:1, client label 4.98:1; light mode identical at every size because its
veil is opaque under the copy. The build before that commit measured 1.65 to
1.94:1 on the eyebrow at ten of those sizes, so the probe separates the two
states by a wide margin.
