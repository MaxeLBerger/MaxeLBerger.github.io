"""Procedural blue plasma band with real alpha.

A sinuous river of thin filaments bundled around one smooth axis (lower
left -> upper right). The light source sits right of centre (behind the
portrait's head and shoulder in the hero), the band thins out into a faint
tail towards the copy and fades before every frame edge. Smoky mist streams
along the axis, plus glow and a few particles. Written as straight-alpha
WebP in two sizes plus a PNG preview on the hero ground colour.

    python tools/hero-energy/make_energy.py <out-dir> [seed]
"""
import math
import os
import sys

import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter, gaussian_filter1d, rotate

OUT = sys.argv[1] if len(sys.argv) > 1 else "."
W, H = 1920, 1080
rng = np.random.default_rng(int(sys.argv[2]) if len(sys.argv) > 2 else 20260910)


def blur(arr, sigma):
    return gaussian_filter(arr.astype(np.float32), sigma, truncate=3.0).astype(np.float32)


def smooth_random(n, sigma, amp):
    """Smooth 1-D random offset curve."""
    r = rng.normal(0, 1, n)
    r = gaussian_filter1d(r, sigma, mode="nearest")
    r /= (np.abs(r).max() + 1e-6)
    return r * amp


def axis_curve(n=1400):
    """Main axis: one smooth S-curve from lower left to upper right."""
    t = np.linspace(0, 1, n)
    x = -120 + t * (W + 240)
    y = H * 0.80 - t * (H * 0.62)
    # Two gentle waves plus a smooth random wander.
    y += 70 * np.sin(t * math.pi * 2.1 + 0.4) + 40 * np.sin(t * math.pi * 4.7 + 1.9)
    y += smooth_random(n, 110, 60)
    return np.stack([x, y], axis=1)


def normals(pts):
    d = np.gradient(pts, axis=0)
    n = np.stack([-d[:, 1], d[:, 0]], axis=1)
    n /= (np.linalg.norm(n, axis=1, keepdims=True) + 1e-6)
    return n


def draw_polyline(canvas, pts, intensity, width):
    h, w = canvas.shape
    seg = np.diff(pts, axis=0)
    L = np.linalg.norm(seg, axis=1)
    steps = np.maximum(1, (L * 2).astype(int))
    xs, ys, vs = [], [], []
    for (a, b), s, inten in zip(zip(pts[:-1], pts[1:]), steps, intensity[:-1]):
        tt = np.linspace(0, 1, s, endpoint=False)
        xs.append(a[0] + (b[0] - a[0]) * tt)
        ys.append(a[1] + (b[1] - a[1]) * tt)
        vs.append(np.full(s, inten, np.float32))
    xs = np.concatenate(xs)
    ys = np.concatenate(ys)
    vs = np.concatenate(vs)
    r_max = int(math.ceil(width))
    for r in range(-r_max, r_max + 1):
        for c in range(-r_max, r_max + 1):
            dist = math.hypot(r, c)
            if dist > width:
                continue
            fall = 1.0 - 0.55 * (dist / max(width, 1e-6))
            xi = np.round(xs + c).astype(int)
            yi = np.round(ys + r).astype(int)
            ok = (xi >= 0) & (xi < w) & (yi >= 0) & (yi < h)
            np.maximum.at(canvas, (yi[ok], xi[ok]), vs[ok] * fall)


def main():
    core = np.zeros((H, W), np.float32)
    axis = axis_curve()
    nrm = normals(axis)
    n = len(axis)
    t = np.linspace(0, 1, n)

    # Where the band is dense: two knots along the axis (like the reference:
    # a heavy cluster lower left, a second one right of centre).
    density = (0.25 + 1.0 * np.exp(-((t - 0.72) / 0.16) ** 2)
               + 0.35 * np.exp(-((t - 0.40) / 0.12) ** 2))

    def smoothstep(a, b, x):
        u = np.clip((x - a) / (b - a), 0, 1)
        return u * u * (3 - 2 * u)

    # Brightness along the axis: faint tail on the left, full on the right,
    # gone again before the right edge so the band never ends in a cut.
    env_t = (0.12 + 0.88 * smoothstep(0.08, 0.72, t)) * (1 - smoothstep(0.86, 1.0, t))

    # Filaments: perturbed copies of the axis. Their spread follows the
    # density (tight in the knots, looser in between) and every strand
    # fades in and out along its own length so nothing runs edge to edge.
    for k in range(30):
        spread = 34 + 165 * (1.0 - np.clip(density - 0.25, 0, 1) / 1.0)
        off = smooth_random(n, rng.uniform(25, 90), 1.0) * spread * rng.uniform(0.5, 1.4)
        off += smooth_random(n, rng.uniform(8, 16), 1.0) * 6  # fine jitter
        pts = axis + nrm * off[:, None]
        # Visibility window along t.
        c = rng.uniform(0.05, 0.95)
        wdt = rng.uniform(0.12, 0.45)
        env = np.exp(-((t - c) / wdt) ** 2)
        gain = rng.uniform(0.15, 0.6) if k > 4 else rng.uniform(0.55, 0.75)
        inten = (env * env_t * gain * (0.55 + 0.45 * density / density.max())).astype(np.float32)
        width = rng.uniform(0.5, 1.0) if k > 4 else rng.uniform(0.9, 1.3)
        draw_polyline(core, pts, inten, width)

    # Short side tendrils leaving the band, mostly from the knots.
    for _ in range(80):
        i = int(np.clip(rng.normal(n * rng.choice([0.72, 0.72, 0.4]), n * 0.09), 5, n - 6))
        start = axis[i] + nrm[i] * rng.normal(0, 40)
        ang = math.atan2(nrm[i][1], nrm[i][0]) * rng.choice([-1, 1]) + rng.normal(0, 0.6)
        length = rng.uniform(50, 200)
        m = 60
        tt = np.linspace(0, 1, m)
        wob = smooth_random(m, 8, 1.0) * length * 0.18
        dirv = np.array([math.cos(ang), math.sin(ang)])
        side = np.array([-dirv[1], dirv[0]])
        pts = start + dirv * (tt * length)[:, None] + side * wob[:, None]
        inten = ((1 - tt) ** 1.4 * rng.uniform(0.15, 0.45) * env_t[i]).astype(np.float32)
        draw_polyline(core, pts, inten, rng.uniform(0.5, 0.8))

    # Soften the raw strokes so the strands read as light, not wire, then
    # build the glow stack on the softened core.
    core = blur(core, 1.1)
    glow = (0.9 * blur(core, 1.8) + 0.6 * blur(core, 4.5) + 0.48 * blur(core, 11)
            + 0.42 * blur(core, 28) + 0.36 * blur(core, 70) + 0.30 * blur(core, 140))

    # Band mask for mist and particles.
    band = blur(core, 120)
    band /= (band.max() + 1e-6)
    band = np.clip(band * 1.6, 0, 1)

    # Smoky mist: ridged turbulence, stretched along the band direction.
    noise = np.zeros((H + 400, W + 400), np.float32)
    amp, norm = 1.0, 0.0
    for o in range(6):
        cells = 5 * (2 ** o)
        small = rng.random((max(2, cells * (H + 400) // (W + 400)), cells), dtype=np.float32)
        im = Image.fromarray(small, mode="F").resize((W + 400, H + 400), Image.BICUBIC)
        layer = np.asarray(im, dtype=np.float32) * 2 - 1
        noise += amp * (1.0 - np.abs(layer))  # ridged
        norm += amp
        amp *= 0.55
    noise /= norm
    ang = -math.degrees(math.atan2(H * 0.62, W + 240))  # band slope
    noise = gaussian_filter(noise, (1.0, 9.0))  # stretch horizontally
    noise = rotate(noise, ang, reshape=False, order=1, mode="nearest")
    noise = noise[200:200 + H, 200:200 + W]
    noise = np.clip((noise - 0.52) * 2.8, 0, 1) ** 1.4
    mist = noise * band * 0.8
    mist = blur(mist, 1.2)

    # Particles.
    part = np.zeros((H, W), np.float32)
    prob = (band ** 3).ravel()
    prob /= prob.sum()
    idx = rng.choice(H * W, size=260, replace=False, p=prob)
    part.ravel()[idx] = rng.uniform(0.4, 1.0, len(idx))
    part = blur(part, 0.7) * 2.4 + blur(part, 2.5) * 1.6

    total = core * 0.6 + glow + mist + part

    # Feather the frame edges so the layer never ends in a hard cut.
    yy, xx = np.mgrid[0:H, 0:W]
    edge_x = np.clip(np.minimum(xx, W - 1 - xx) / 320.0, 0, 1)
    edge_y = np.clip(np.minimum(yy, H - 1 - yy) / 170.0, 0, 1)
    total = total * (edge_x * edge_y) ** 0.9

    # Colour ramp: cobalt -> theme azure -> white-hot core.
    tt = np.clip(total, 0, 1)
    deep = np.array([12, 40, 150], np.float32)
    mid = np.array([52, 122, 240], np.float32)
    hot = np.array([196, 218, 255], np.float32)
    lo = np.clip(tt / 0.5, 0, 1)[..., None]
    hi = np.clip((tt - 0.72) / 0.28, 0, 1)[..., None] ** 2.0
    rgb = deep * (1 - lo) + mid * lo
    rgb = rgb * (1 - hi) + hot * hi
    alpha = np.clip(total, 0, 1) ** 0.95 * 0.92

    rgba = np.dstack([rgb, alpha * 255]).astype(np.uint8)
    im = Image.fromarray(rgba)
    os.makedirs(OUT, exist_ok=True)
    big = im.resize((1800, int(1800 * H / W)), Image.LANCZOS)
    small = im.resize((900, int(900 * H / W)), Image.LANCZOS)
    big.save(os.path.join(OUT, "hero-energy.webp"), "WEBP", quality=74, method=6)
    small.save(os.path.join(OUT, "hero-energy-900.webp"), "WEBP", quality=72, method=6)

    preview = Image.new("RGBA", big.size, (8, 10, 18, 255))
    preview.alpha_composite(big)
    preview.convert("RGB").save(os.path.join(OUT, "preview.png"))
    for f in ("hero-energy.webp", "hero-energy-900.webp"):
        print(f, os.path.getsize(os.path.join(OUT, f)) // 1024, "KB")


if __name__ == "__main__":
    main()
