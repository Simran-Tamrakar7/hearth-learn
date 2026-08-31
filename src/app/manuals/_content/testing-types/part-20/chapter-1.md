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
---

## Capture, document, compare

Same plan, same conditions; re-baseline on purpose.
