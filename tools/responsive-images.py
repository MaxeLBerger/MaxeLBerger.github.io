"""Write smaller width variants next to a WebP master, for srcset.

    python tools/responsive-images.py assets/img/projects/haakly.webp [...]
    python tools/responsive-images.py --widths 600,800 assets/img/profile/x.webp

For every master `name.webp` this writes `name-800.webp` and `name-1200.webp`
(or the widths given with --widths, skipping widths the master does not
exceed) and prints the matching srcset value. The master itself stays the
largest candidate. Re-run it whenever a master is replaced, so the variants
never show an older picture.

Needs Pillow.
"""

import os
import sys

from PIL import Image

WIDTHS = (800, 1200)
QUALITY = 82


def variants(path, widths=WIDTHS):
    stem, ext = os.path.splitext(path)
    if ext.lower() != ".webp":
        raise SystemExit(f"{path}: expected a .webp master")
    master = Image.open(path)
    master.load()
    w, h = master.size
    entries = []
    for target in widths:
        if target >= w:
            continue
        out = f"{stem}-{target}{ext}"
        size = (target, round(h * target / w))
        master.resize(size, Image.LANCZOS).save(out, "WEBP", quality=QUALITY, method=6)
        entries.append((out, target))
    entries.append((path, w))
    return entries


def main(argv):
    widths = WIDTHS
    if argv[:1] == ["--widths"]:
        widths = tuple(int(w) for w in argv[1].split(","))
        argv = argv[2:]
    if not argv:
        raise SystemExit(__doc__)
    for path in argv:
        entries = variants(path, widths)
        srcset = ", ".join(f"{p.replace(os.sep, '/')} {w}w" for p, w in entries)
        sizes = ", ".join(f"{os.path.basename(p)} {os.path.getsize(p) // 1024} KB" for p, _ in entries)
        print(f"{path}\n  srcset: {srcset}\n  files:  {sizes}")


if __name__ == "__main__":
    main(sys.argv[1:])
