#!/usr/bin/env python3
"""Comparison sheets from visible-mode shots, with the measured numbers under
every frame. This is what a review round gets delivered as.

  python tools/pixel-contrast/sheet.py --out sheet.png --title "dark, DE" \\
      --scheme dark --lang de --sizes 320x568,375x667 \\
      --cols "before:shots/old-vis,after:shots/new-vis" --results results.json

`--results` is the JSON written by `measure.py contrast --save`. Its keys are
"<shotdir name>/<shot name>", and the numbers come from the hidden-mode shots,
which live in a different directory than the visible ones, so name that
directory per column:

  --hidden "before=shots/old-hid,after=shots/new-hid"

Without `--hidden` the visible directory name is used as the key, and without
`--results` the frames are drawn with no numbers under them.
"""
import json
import os
import sys

from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from measure import load  # noqa: E402

FONTS = ['C:/Windows/Fonts/segoeui.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf']
FONTS_B = ['C:/Windows/Fonts/segoeuib.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf']
BG = (16, 17, 22)
FG = (236, 238, 244)
DIM = (150, 156, 170)
BAD = (255, 110, 110)
GOOD = (120, 220, 150)
LABELS = [('eyebrow', 'Eyebrow'), ('title1', 'H1 line 1'), ('accent', 'Accent word'), ('desc', 'Body')]


def font(paths, size):
    for p in paths:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def opt(name, default=None):
    a = sys.argv
    return a[a.index('--' + name) + 1] if '--' + name in a else default


def main():
    out = opt('out', 'sheet.png')
    title = opt('title', '')
    scheme = opt('scheme', 'dark')
    lang = opt('lang', 'de')
    cols = [c.split(':', 1) for c in opt('cols').split(',')]
    sizes = opt('sizes').split(',')
    results = json.load(open(opt('results'), encoding='utf-8')) if opt('results') else {}
    cell_w = int(opt('cellw', 300))
    hidden_map = {}
    for part in filter(None, opt('hidden', '').split(',')):
        label, d = part.split('=', 1)
        hidden_map[label.strip()] = os.path.basename(os.path.normpath(d.strip()))

    f_title, f_head, f_small = font(FONTS_B, 26), font(FONTS_B, 20), font(FONTS, 17)

    cells = {}
    for si, size in enumerate(sizes):
        for ci, (_, d) in enumerate(cols):
            name = f'{scheme}-{lang}-{size}-visible'
            if not os.path.exists(os.path.join(d, name + '.json')):
                continue
            _, img = load(d, name)
            im = Image.fromarray(img)
            cells[(si, ci)] = im.resize((cell_w, int(im.size[1] * cell_w / im.size[0])), Image.LANCZOS)
    if not cells:
        raise SystemExit('no cells rendered: check --scheme, --lang, --sizes and that the shots are visible-mode')

    img_h = max(c.size[1] for c in cells.values())
    pad, gap, cap_h, head_h = 26, 22, 22 * len(LABELS) + 40, 78
    row_h = img_h + cap_h + gap
    width = pad * 2 + len(cols) * cell_w + (len(cols) - 1) * gap
    height = head_h + len(sizes) * row_h + pad
    sheet = Image.new('RGB', (width, height), BG)
    dr = ImageDraw.Draw(sheet)
    dr.text((pad, 24), title, font=f_title, fill=FG)

    for si, size in enumerate(sizes):
        y = head_h + si * row_h
        for ci, (label, d) in enumerate(cols):
            cell = cells.get((si, ci))
            if cell is None:
                continue
            x = pad + ci * (cell_w + gap)
            sheet.paste(cell, (x, y))
            dr.rectangle([x, y, x + cell_w - 1, y + cell.size[1] - 1], outline=(60, 64, 76))
            dr.text((x, y + cell.size[1] + 8), f'{size}  {label}', font=f_head, fill=FG)
            key_dir = hidden_map.get(label, os.path.basename(os.path.normpath(d)))
            row = results.get(f'{key_dir}/{scheme}-{lang}-{size}-hidden', {})
            ty = y + cell.size[1] + 34
            for name, human in LABELS:
                v = row.get(name)
                if not v:
                    continue
                dr.text((x, ty), human, font=f_small, fill=DIM)
                dr.text((x + 130, ty), f"{v['p3']:.2f}:1", font=f_small,
                        fill=BAD if v['p3'] < v['need'] else GOOD)
                dr.text((x + 200, ty), f"(needs {v['need']:.1f})", font=f_small, fill=DIM)
                ty += 22
    sheet.save(out)
    print(out, sheet.size)


if __name__ == '__main__':
    main()
