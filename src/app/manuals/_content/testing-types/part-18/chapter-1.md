---
id: "tt-backend-testing"
overlayNo: 69
title: "Backend Testing"
minutes: 25
partName: "Part 18 · Backend, Network, Snapshot & Soak"
level: "intermediate"
overviewText: "Backend testing verifies server-side logic, database interactions, business rules, and data processing — correctness at the source, independent of UI or even the API contract on top."
why: "A UI or API can look fine while a scheduled job or multi-table rule is wrong. Backend testing goes to where the logic and data actually live."
when: "Throughout backend development, especially calculations, workflows, and scheduled processes — unit tests plus API (Chapter 34) plus database (Chapter 35)."
practical: {"app":"HRMS Nightly Leave Balance Accrual Job","scenario":"The monthly accrual job is triggered manually and verified in the database.","pass":"Proration by hire date is confirmed for a range of employees after the fix.","fail":"Mid-month hires received a full month accrual — invisible from the API because the job has no request/response to inspect."}
---

## Trigger then inspect storage

Postman for the API surface; DBeaver for stored state.
