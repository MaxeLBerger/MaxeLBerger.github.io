#!/usr/bin/env python3
"""Contrast numbers and pixel diffs from the shots `shoot.mjs` writes.

  python tools/pixel-contrast/measure.py contrast <shotdir> [...] [--save out.json]
  python tools/pixel-contrast/measure.py diff <dirA> <dirB> [--only sub,sub] [--expect-equal]
  python tools/pixel-contrast/measure.py debug <shotdir> <shotname> <out.png>

contrast: for every measured element, the text colour (including its alpha) is
blended over each device pixel of the element's glyph rects in the text-hidden
shot and compared with that same pixel. The 3rd percentile is reported as the
worst case, which ignores a handful of outlier pixels but not a bright patch.
Thresholds follow WCAG 2.1 AA: 4.5:1, or 3:1 for large text (>= 24px, or
>= 18.66px from weight 700). Exits 1 when something is below its threshold.

diff: stitches both sides and compares them pixel by pixel. With
--expect-equal it exits 1 on any difference, which is how "this change does
not touch other viewports" gets proven.

Needs numpy and Pillow (same dependencies as tools/hero-energy).
"""
import glob
import json
import os
import re
import sys

import numpy as np
from PIL import Image, ImageDraw

ORDER = ['eyebrow', 'title1', 'title2', 'accent', 'desc', 'link', 'clients']


def lin(c):
    c = c / 255.0
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def lum(rgb):
    v = lin(rgb)
    return 0.2126 * v[..., 0] + 0.7152 * v[..., 1] + 0.0722 * v[..., 2]


def parse_color(s):
    m = re.match(r'rgba?\(([^)]*)\)', s.strip())
    if not m:
        raise ValueError('unparsed colour ' + s)
    vals = [float(p) for p in re.split(r'[\s,/]+', m.group(1).strip()) if p]
    return np.array(vals[:3], dtype=np.float64), (vals[3] if len(vals) > 3 else 1.0)


def load(dirpath, name):
    """Stitch the viewport tiles of one shot back into document space."""
    with open(os.path.join(dirpath, name + '.json'), encoding='utf-8') as f:
        meta = json.load(f)
    dsf = meta['job']['dsf']
    width = meta['job']['w'] * dsf
    last = meta['tiles'][-1]
    height = int(round((last['top'] + meta['job']['h']) * dsf))
    canvas = np.zeros((height, width, 3), np.uint8)
    # Later tiles first, so an earlier tile wins where they overlap: the top of
    # a scrolled tile is where a fixed navbar sits.
    for t in reversed(meta['tiles']):
        im = np.asarray(Image.open(os.path.join(dirpath, t['file'])).convert('RGB'))
        y0 = int(round(t['top'] * dsf))
        h = min(im.shape[0], height - y0)
        canvas[y0:y0 + h, :im.shape[1]] = im[:h, :width]
    return meta, canvas


def text_mask(shape, rects, dsf):
    height, width = shape[:2]
    m = np.zeros((height, width), bool)
    for left, top, right, bottom in rects:
        x0, x1 = max(0, int(np.floor(left * dsf))), min(width, int(np.ceil(right * dsf)))
        y0, y1 = max(0, int(np.floor(top * dsf))), min(height, int(np.ceil(bottom * dsf)))
        if x1 > x0 and y1 > y0:
            m[y0:y1, x0:x1] = True
    return m


def probe(meta, img):
    dsf = meta['job']['dsf']
    res = {}
    for k, t in meta['info']['targets'].items():
        if not t['rects']:
            continue
        rgb, alpha = parse_color(t['color'])
        m = text_mask(img.shape, t['rects'], dsf)
        px = img[m].astype(np.float64)
        if not len(px):
            continue
        fg = alpha * rgb + (1 - alpha) * px
        l1, l2 = lum(fg), lum(px)
        ratio = (np.maximum(l1, l2) + 0.05) / (np.minimum(l1, l2) + 0.05)
        large = t['fontSize'] >= 24 or (t['fontSize'] >= 18.66 and t['fontWeight'] >= 700)
        res[k] = {
            'p3': float(np.percentile(ratio, 3)), 'p1': float(np.percentile(ratio, 1)),
            'min': float(ratio.min()), 'med': float(np.median(ratio)),
            'need': 3.0 if large else 4.5, 'n': int(m.sum()),
            'top': min(r[1] for r in t['rects']), 'color': t['color'],
        }
    return res


def size_key(s):
    w, h = map(int, s.split('x'))
    return (0 if h >= w else 1, w, h)


def contrast_cmd(dirs, save=None):
    allres, failed = {}, 0
    for d in dirs:
        rows = {}
        for p in sorted(glob.glob(os.path.join(d, '*-hidden.json'))):
            name = os.path.basename(p)[:-5]
            meta, img = load(d, name)
            job = meta['job']
            rows.setdefault((job['scheme'], f"{job['w']}x{job['h']}"), {})[job['lang']] = probe(meta, img)
            allres[f"{os.path.basename(os.path.normpath(d))}/{name}"] = rows[(job['scheme'], f"{job['w']}x{job['h']}")][job['lang']]
        if not rows:
            print(f'{d}: no hidden-mode shots found')
            continue
        cols = [c for c in ORDER if any(c in lang for cell in rows.values() for lang in cell.values())]
        cols += sorted({c for cell in rows.values() for lang in cell.values() for c in lang} - set(cols))
        langs = sorted({lang for cell in rows.values() for lang in cell})
        for scheme in sorted({k[0] for k in rows}):
            head = '/'.join(lang.upper() for lang in langs)
            print(f"\n== {os.path.basename(os.path.normpath(d))}  {scheme}  "
                  f"(3rd percentile contrast {head}, * = below threshold)")
            print('size      textY ' + ''.join(f'{c:>14}' for c in cols))
            fails = {c: 0 for c in cols}
            for size in sorted((k[1] for k in rows if k[0] == scheme), key=size_key):
                cell = rows[(scheme, size)]
                first = next(iter(cell.values()))
                topy = min((v['top'] for v in first.values()), default=float('nan'))
                line = f'{size:<9} {topy:5.0f}'
                for c in cols:
                    parts = []
                    for lang in langs:
                        v = cell.get(lang, {}).get(c)
                        if v is None:
                            parts.append('  -  ')
                            continue
                        bad = v['p3'] < v['need']
                        fails[c] += bad
                        failed += bad
                        parts.append(f"{v['p3']:4.2f}{'*' if bad else ' '}")
                    line += f"{'/'.join(parts):>14}"
                print(line)
            print('below     ' + '     ' + ''.join(f'{fails[c]:>14}' for c in cols))
    if save:
        with open(save, 'w', encoding='utf-8') as f:
            json.dump(allres, f, indent=1)
    return 1 if failed else 0


def diff_cmd(a_dir, b_dir, only=None, expect_equal=False):
    names = sorted(os.path.basename(p)[:-5] for p in glob.glob(os.path.join(a_dir, '*.json')))
    compared = differing = 0
    for n in names:
        if only and not any(o in n for o in only.split(',')):
            continue
        if not os.path.exists(os.path.join(b_dir, n + '.json')):
            print(f'{n}: missing in B')
            differing += 1
            continue
        _, a = load(a_dir, n)
        _, b = load(b_dir, n)
        compared += 1
        if a.shape != b.shape:
            print(f'{n}: shape {a.shape} vs {b.shape}')
            differing += 1
            continue
        d = np.abs(a.astype(np.int16) - b.astype(np.int16)).max(axis=2)
        cnt = int((d > 0).sum())
        if cnt:
            ys, xs = np.nonzero(d)
            print(f'{n}: {cnt} px differ, max {int(d.max())}, '
                  f'bbox x{xs.min()}-{xs.max()} y{ys.min()}-{ys.max()} (device px)')
            differing += 1
        else:
            print(f'{n}: 0 px  ({a.shape[1]}x{a.shape[0]})')
    print(f'{compared} compared, {differing} with differences')
    return 1 if (expect_equal and differing) else 0


def debug_cmd(d, name, out):
    """Write the stitched shot with the measured rects outlined, to eyeball
    that the masks really sit on the glyphs."""
    meta, img = load(d, name)
    im = Image.fromarray(img)
    dr = ImageDraw.Draw(im)
    dsf = meta['job']['dsf']
    for t in meta['info']['targets'].values():
        for left, top, right, bottom in t['rects']:
            dr.rectangle([left * dsf, top * dsf, right * dsf, bottom * dsf], outline=(255, 0, 255), width=2)
    im.save(out)
    print(out, im.size)
    return 0


def take(rest, flag, has_value=True):
    if flag not in rest:
        return rest, None
    i = rest.index(flag)
    if not has_value:
        return rest[:i] + rest[i + 1:], True
    return rest[:i] + rest[i + 2:], rest[i + 1]


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    cmd, rest = sys.argv[1], sys.argv[2:]
    if cmd == 'contrast':
        rest, save = take(rest, '--save')
        sys.exit(contrast_cmd(rest, save))
    elif cmd == 'diff':
        rest, only = take(rest, '--only')
        rest, expect = take(rest, '--expect-equal', has_value=False)
        sys.exit(diff_cmd(rest[0], rest[1], only, bool(expect)))
    elif cmd == 'debug':
        sys.exit(debug_cmd(*rest))
    else:
        print(__doc__)
        sys.exit(2)
