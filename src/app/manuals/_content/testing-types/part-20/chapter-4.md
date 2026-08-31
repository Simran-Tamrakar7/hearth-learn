---
id: "tt-error-guessing-testing"
overlayNo: 80
title: "Error Handling / Error Guessing Testing"
minutes: 25
partName: "Part 20 · Baseline, Comparative, Domain & Error Guessing"
level: "intermediate"
overviewText: "Error guessing targets the actions most likely to reveal defects — double-submit, back mid-form, session timeout — and checks that failures are handled cleanly."
why: "Scripts cover what is supposed to happen. Real users do the usual suspects. Guessing tests those before they do."
when: "On top of scripted functional testing, especially state transitions, multi-step forms, and external boundaries."
practical: {"app":"HRMS Leave Request Submission","scenario":"Double-click Submit on the leave-request form.","pass":"Submit is idempotent; a second rapid click creates only one record.","fail":"Two identical leave records; days deducted twice."}
---

## Checklist plus ZAP

Usual suspects, then scan for leaky errors.
