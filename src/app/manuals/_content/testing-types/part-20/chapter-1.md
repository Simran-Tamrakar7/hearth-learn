---
id: "tt-baseline-testing"
overlayNo: 77
title: "Baseline Testing"
minutes: 20
partName: "Part 20 · Baseline, Comparative, Domain & Error Guessing"
level: "intermediate"
overviewText: "Baseline testing captures a reference run against a known-good build so future runs can detect drift — the technique is what you do with the result."
why: "Without a baseline, “is this slower?” is only a vague impression. A documented number makes regression detectable."
when: "Right after a stable milestone, then again after any change that could affect what was baselined."
practical: {"app":"HRMS Fiscal Year Setup Page","scenario":"JMeter baseline of load time before a query optimization.","pass":"2.1s baseline vs 0.9s after, under identical conditions.","fail":"Vague sense it “feels the same, maybe faster” — no way to confirm or catch later creep."}
advantages: ["Turns \"does this feel slower?\" into an objective, documented comparison against a real number","Cheap to set up once and reusable across many future comparisons, not a one-time cost","Makes gradual, release-over-release performance creep visible, which is easy to miss when only ever comparing the current build to the last one","Gives a concrete, defensible reference point to cite when discussing performance with stakeholders"]
limitations: ["Only as meaningful as how faithfully the comparison conditions match the original baseline conditions","A baseline captured on an already-subtly-degraded build simply preserves that degradation as the new \"normal\"","Doesn't identify why a regression happened, only that one did — still requires follow-up investigation","Needs periodic re-baselining as the application legitimately evolves, or the comparison stops being useful"]
---

## Capture, document, compare

Same plan, same conditions; re-baseline on purpose.
