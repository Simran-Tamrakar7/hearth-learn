---
id: "tt-golden-master-testing"
overlayNo: 84
title: "Diff / Golden Master Testing"
minutes: 20
partName: "Part 21 · Coverage, OAT, Cloud & Golden Master"
level: "intermediate"
overviewText: "Golden master (characterization) testing diffs future output against a trusted captured reference — no need to hand-write why the original output is correct."
why: "Legacy code is risky to refactor when nobody can write correct assertions from scratch. A trusted current output is a safety net."
when: "Before refactoring poorly-understood code that lacks coverage — a net during the refactor, not a long-term substitute for real tests."
practical: {"app":"HRMS Legacy Tax Calculation Engine","scenario":"Current output captured across a representative salary range before a refactor.","pass":"Boundary bug fixed; same inputs diff clean against the master.","fail":"Diff shows a different result exactly at a tax-bracket boundary — a regression nobody could have asserted in advance."}
---

## Capture, change, diff

If unintentional, fix the code, not the master.
