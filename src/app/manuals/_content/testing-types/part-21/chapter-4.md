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
advantages: ["Protects legacy code during a refactor without requiring the refactoring team to first fully reverse-engineer every business rule inside it","Very low setup cost — no need to write assertions from scratch, only to capture and trust the existing output","The plain-text diff tools required are free and already present on virtually every development machine","Provides genuine, concrete confidence during a refactor that would otherwise be an unverified leap of faith"]
limitations: ["Only as trustworthy as the assumption that the original captured output was actually correct — a golden master captured from already-buggy output simply preserves that bug","A flagged diff shows that something changed, not why, or whether the change is actually correct — still requires human judgment every time","Doesn't explain or document the underlying business rules at all — it's a safety net for refactoring, not a substitute for genuinely understanding and testing the logic","Large or highly complex outputs can produce diffs that are tedious and error-prone for a human to meaningfully review in full"]
---

## Capture, change, diff

If unintentional, fix the code, not the master.
