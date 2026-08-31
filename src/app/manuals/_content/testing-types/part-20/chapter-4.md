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
advantages: ["Targets exactly the \"usual suspect\" actions real users actually perform, which scripted test cases frequently don't anticipate","Leverages accumulated tester experience efficiently, often finding high-value bugs with relatively little time invested","Confirms error handling specifically — not just \"did the happy path work,\" but \"did the failure path fail gracefully\"","Pairing with an OWASP ZAP scan catches a class of error-handling issue (verbose/leaky error responses) manual guessing alone might overlook"]
limitations: ["Inherently less systematic and reproducible than a scripted technique — coverage depends heavily on the specific tester's experience and instincts","Findings can be harder to formally track/report against, since there's no predefined test-case list to check off","Different testers will guess differently, so error-guessing coverage can vary significantly by who's doing the testing","Doesn't replace systematic negative testing (Chapter 49) or boundary value analysis (Chapter 51) — it's a complementary, intuition-driven layer on top of them"]
---

## Checklist plus ZAP

Usual suspects, then scan for leaky errors.
