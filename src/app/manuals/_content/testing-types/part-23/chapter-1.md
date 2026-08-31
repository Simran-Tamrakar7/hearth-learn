---
id: "tt-incremental-integration-testing"
overlayNo: 89
title: "Incremental Integration Testing"
minutes: 25
partName: "Part 23 · Incremental Integration, Spike, Session & Voice"
level: "intermediate"
overviewText: "Incremental integration testing adds modules one at a time to an already-tested core — the opposite of Big Bang (Chapter 64), which combines everything at once."
why: "A Big Bang failure can live in any module or any interaction. Adding one piece at a time shrinks the search to the module just joined, so defects are caught early."
when: "Whenever modules have a clear dependency order and can be integrated gradually. Prefer this over Big Bang unless modules cannot be exercised until they all exist."
practical: {"app":"HRMS Attendance → Leave → Payroll Chain","scenario":"Attendance is the tested core; Leave is added next; Payroll only after that step is green.","fail":"Leave treats Attendance’s 8 hours as 0.33 days — caught at this step, before Payroll is wired in.","pass":"Unit conversion is fixed at the Attendance–Leave boundary; Payroll inherits a known-good mapping."}
---

## Add one module to a known-good core

Stop on red before the next join. Do not collapse stages into one Big Bang script.
