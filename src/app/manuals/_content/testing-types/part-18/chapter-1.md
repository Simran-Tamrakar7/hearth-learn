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
advantages: ["Verifies business logic and data correctness directly at the source, rather than only inferring it indirectly through the UI or API response","Catches issues in scheduled/background processing that UI-only testing would never naturally exercise","Combining API-level and database-level checks together provides stronger, more complete confidence than either alone","Backend issues are typically diagnosed and fixed faster when caught here, before they propagate up through the API and UI layers"]
limitations: ["Requires both API and database access/knowledge to be done thoroughly, a broader skill set than pure UI-focused testing","Doesn't verify how the backend's output is actually presented or used by the UI — pairs with, but doesn't replace, frontend/system testing","Testing scheduled or background jobs can require specific tooling or manual triggering not always readily available in every environment","Business logic spanning many interrelated tables can require deep domain knowledge to verify correctly and completely"]
---

## Trigger then inspect storage

Postman for the API surface; DBeaver for stored state.
