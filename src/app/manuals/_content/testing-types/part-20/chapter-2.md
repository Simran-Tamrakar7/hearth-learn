---
id: "tt-comparative-testing"
overlayNo: 78
title: "Comparative Testing"
minutes: 25
partName: "Part 20 · Baseline, Comparative, Domain & Error Guessing"
level: "intermediate"
overviewText: "Comparative testing runs the same scenarios against two products side by side — a competitor or an earlier version — with consistent scoring."
why: "“Theirs feels smoother” is not defensible. Structured comparison makes the gap actionable."
when: "Before a roadmap decision, or when validating a replacement version — structured, not a look-around."
practical: {"app":"HRMS Onboarding Flow vs. Competitor","scenario":"Same “hire a new employee” scenario on both products.","pass":"After redesign, the same 9-vs-5-screen scenario is re-run to confirm the gap closed.","fail":"Bizlevate: 9 screens and name re-entered twice. Competitor: 5 screens, no repeats."}
advantages: ["Converts a vague competitive impression into specific, evidence-based, defensible findings","A consistent scenario list and scoring makes the comparison fair and reproducible, not dependent on who happened to look at it","Directly informs prioritization and roadmap decisions with concrete gaps, not just gut feeling","Reusable framework — the same scenario list can be re-run against a later version of either product to track whether a gap has closed"]
limitations: ["Only as fair as how carefully the comparison conditions (data, account state, environment) are matched between the two products","A competitor's product can change at any time, so findings can go stale and need periodic re-verification","Doesn't explain why a competitor made a particular design choice, only that a measurable difference exists","Scoring inherently involves some subjectivity even with defined criteria, especially for qualitative aspects like \"clarity\""]
---

## Same scenarios, matched captures

Spreadsheet scores; LambdaTest for equivalent screenshots.
