---
id: "tt-coverage-testing"
overlayNo: 81
title: "Statement/Branch/Path Coverage Testing"
minutes: 25
partName: "Part 21 · Coverage, OAT, Cloud & Golden Master"
level: "advanced"
overviewText: "Coverage testing measures how much source a suite actually exercises — statement, then branch, then path — each a stricter answer to the same question."
why: "A green suite can still leave an else or error path never executed. Coverage turns that into a number and a list of red lines."
when: "Continuously in suite reporting — especially on calculations, approvals, and financial code."
practical: {"app":"HRMS Leave Approval Logic","scenario":"Coverage.py shows the deactivated-manager else branch at zero coverage.","pass":"A test for that branch; fallback approver corrected; the line is green.","fail":"Suite is 100% green; deactivated manager throws instead of routing to a fallback."}
---

## Report, then write the missing branch test

Prefer branch coverage over statement-only.
