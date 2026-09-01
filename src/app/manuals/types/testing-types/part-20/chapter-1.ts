import type { ChapterRecord } from "../../../types";

/** Baseline Testing */
export const chapter = {
  "id": "tt-baseline-testing",
  "overlayNo": 77,
  "title": "Baseline Testing",
  "minutes": 20,
  "level": "intermediate",
  "phase": "Part 20 · Baseline, Comparative, Domain & Error Guessing",
  "partName": "Part 20 · Baseline, Comparative, Domain & Error Guessing",
  "overviewText": "Baseline testing is the practice of running a defined, stable set of tests against a known-good build to capture a reference point — a \"baseline\" — for performance, behavior, or output, which every future run can then be measured against to detect drift or regression.",
  "why": "Without a captured baseline, \"is this slower than before?\" or \"did this behavior change?\" is a question nobody can actually answer with confidence — only a vague impression. A baseline turns that impression into a concrete, documented number or output that any future comparison can be measured against objectively, which is what makes regressions in performance or behavior detectable at all, rather than something that quietly accumulates unnoticed release after release.",
  "when": "Immediately after reaching any known-stable milestone (a release, a major refactor, a new environment going live) — captured deliberately and documented, then revisited specifically after any change that could plausibly affect what was baselined.",
  "practical": {
    "app": "HRMS Fiscal Year Setup Page",
    "scenario": "Bizlevate captures a JMeter baseline of the fiscal-year-setup page's load time before starting a planned query optimization effort.",
    "fail": "After the optimization work, the team has a vague sense the page \"feels about the same, maybe faster\" but no way to confirm or quantify it — and no way to tell if a later, unrelated change quietly makes it slower again.",
    "failLabel": "Fail (without baseline)",
    "pass": "The pre-optimization baseline shows a 2.1s average load time; the post-optimization re-run shows 0.9s under identical conditions, giving a concrete, documented confirmation that the optimization worked — and a fixed reference point to catch any future regression against.",
    "passLabel": "Pass (with baseline)"
  },
  "advantages": [
    "Turns \"does this feel slower?\" into an objective, documented comparison against a real number",
    "Cheap to set up once and reusable across many future comparisons, not a one-time cost",
    "Makes gradual, release-over-release performance creep visible, which is easy to miss when only ever comparing the current build to the last one",
    "Gives a concrete, defensible reference point to cite when discussing performance with stakeholders"
  ],
  "limitations": [
    "Only as meaningful as how faithfully the comparison conditions match the original baseline conditions",
    "A baseline captured on an already-subtly-degraded build simply preserves that degradation as the new \"normal\"",
    "Doesn't identify why a regression happened, only that one did — still requires follow-up investigation",
    "Needs periodic re-baselining as the application legitimately evolves, or the comparison stops being useful"
  ],
  "tools": [
    {
      "name": "Apache JMeter",
      "sub": "Baseline-capture configuration",
      "url": "https://jmeter.apache.org",
      "seeChapter": 14,
      "desc": "The same load-testing tool already used for Load, Stress, and Soak testing, used here specifically to capture and preserve a single reference performance run under clearly documented, repeatable conditions — the technique is about what you do with the result (save it as a fixed reference) as much as the tool itself.",
      "adv": [
        "Turns \"feels slower\" into a documented number",
        "Set up once, reused on every later comparison",
        "Makes release-over-release creep visible",
        "A defensible reference for stakeholder conversations"
      ],
      "lim": [
        "Only meaningful if conditions match the original run",
        "A degraded baseline becomes the new normal",
        "Shows that drift happened, not why",
        "Must be re-baselined as the product legitimately evolves"
      ],
      "steps": [
        {
          "t": "Step 1 — Pick a known-stable build",
          "p": "Fixed load, data volume, and environment to baseline against."
        },
        {
          "t": "Step 2 — Run and save the full results",
          "p": "Response times, throughput, error rate as the named reference."
        },
        {
          "t": "Step 3 — Document the conditions",
          "p": "Build version, environment, data volume, date — or it is not reproducible."
        },
        {
          "t": "Step 4 — Re-run identically after a change",
          "p": "Same plan, same conditions, whenever performance could move."
        },
        {
          "t": "Step 5 — Compare, ignore noise",
          "p": "Flag meaningful degradation, not every tiny fluctuation."
        },
        {
          "t": "Step 6 — Re-baseline on purpose",
          "p": "A known-good later build so the reference does not go stale."
        }
      ]
    }
  ],
  "contentMarkdown": "## Capture, document, compare\n\nSame plan, same conditions; re-baseline on purpose.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
