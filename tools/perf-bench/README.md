# perf-bench

Two benchmarks and a server for the start page. Serve the site with
`serve.mjs`: it gzips text like GitHub Pages, while `python -m http.server`
sends CSS/JS/HTML uncompressed and inflates load numbers.

```bash
npm i --no-save playwright-core
node tools/perf-bench/serve.mjs . 8702
```

## bench.mjs: smoothness

Measures how smooth the start page feels: main-thread load while standing
still on a section, frame times while wheel-scrolling top to bottom, and the
cost of switching project slides. It drives a real, GPU-backed Edge window
placed off-screen, so compositing costs (masks, blend modes, blur) show up the
way they do for visitors.

```bash
node tools/perf-bench/bench.mjs --url http://127.0.0.1:8702/ --throttle 4
```

`--throttle 4` slows the CPU four times and roughly matches an average office
PC; run `--throttle 1` as well. Each scenario runs three times (`--runs`) and
the median is reported. `--css "<rules>"` injects CSS after load, which makes
quick A/B checks possible without editing files, for example
`--css ".projects-energy{display:none!important}"`.

Reading the output, per scenario:

| Field | Meaning |
|---|---|
| `busy` | main-thread busy time in %, lower is better |
| `fps` | average frames per second during the scenario |
| `janky` | frames slower than 25 ms (visible stutter) |
| `max` | slowest frame in ms |
| `styleMs` | time spent recalculating styles |

Compare against the same machine only; absolute numbers depend on the CPU,
GPU and screen refresh rate.

## load.mjs: first visit

Opens the page in a fresh profile on a desktop (1920x1080, 16 Mbit/s) and a
phone (390x844 at 3x, slow 4G: 1.6 Mbit/s, 150 ms) and reports transferred KB
per type until the page is quiet, request count, first and largest
contentful paint, when the web font arrived and the load event. Median of
`--runs` (default 3; use 5 for timing comparisons, the phone numbers jitter).

```bash
node tools/perf-bench/load.mjs --url http://127.0.0.1:8702/ --runs 5
```

To compare two states, export the old one (`git archive <ref> | tar -x -C
<dir>`), serve both on different ports and run the same command against each.
