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
advantages: ["Converts a vague sense of \"we probably test this reasonably well\" into a specific, objective, line-level number","Directly identifies exactly which lines/branches need a new test, rather than leaving the tester to guess","Both tools are free, well-established, and integrate directly into standard JS/Python test workflows","Branch coverage specifically catches the common and risky gap of an entirely untested else/error-handling path"]
limitations: ["A high coverage percentage confirms code was executed, not that it was correctly verified — a test can execute a line without meaningfully asserting on its result","Chasing 100% coverage as a goal in itself can produce low-value tests written purely to hit an uncovered line, not to verify real behavior","Path coverage in particular can grow combinatorially explosive for functions with many conditions, making full path coverage impractical for complex logic","Coverage tooling measures code that ran, not code that's missing entirely — it can't reveal a scenario nobody wrote any code path for"]
---

## Report, then write the missing branch test

Prefer branch coverage over statement-only.
