# perf-bench

Measures how smooth the start page feels: main-thread load while standing
still on a section, frame times while wheel-scrolling top to bottom, and the
cost of switching project slides. It drives a real, GPU-backed Edge window
placed off-screen, so compositing costs (masks, blend modes, blur) show up the
way they do for visitors.

```bash
npm i --no-save playwright-core
python -m http.server 8702
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
