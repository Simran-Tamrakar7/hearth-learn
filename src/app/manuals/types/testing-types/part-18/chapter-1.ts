import type { ChapterRecord } from "../../types";

/** Backend Testing */
export const chapter = {
  "id": "tt-backend-testing",
  "overlayNo": 69,
  "title": "Backend Testing",
  "minutes": 25,
  "level": "intermediate",
  "phase": "Part 18 · Backend, Network, Snapshot & Soak",
  "partName": "Part 18 · Backend, Network, Snapshot & Soak",
  "overviewText": "Backend testing verifies the server-side logic, database interactions, business rules, and data processing that power an application — everything happening behind the API layer — checking correctness at the source, independent of any UI or even the API contract sitting on top of it.",
  "why": "A UI or API can appear to work correctly while the underlying backend logic is subtly wrong — a calculation that's off in an edge case the UI never happens to exercise, a database write that violates an intended business rule without the application layer noticing, a scheduled job silently failing. Backend testing goes directly to where the actual business logic and data processing live, catching problems at their true source rather than only inferring them indirectly through whatever the UI or API happens to expose.",
  "when": "Throughout backend development, especially for business-critical logic (calculations, workflows, scheduled processes) — as unit tests on individual functions, and as broader checks combining API testing (Chapter 34) with direct database verification (Chapter 35) for anything that spans both layers.",
  "practical": {
    "app": "HRMS Nightly Leave Balance Accrual Job",
    "scenario": "The backend job that accrues monthly leave balance for every employee is tested by manually triggering it and verifying results directly in the database.",
    "fail": "After triggering the job, DBeaver reveals that employees hired mid-month received a full month's accrual instead of a correctly prorated partial amount — a backend calculation bug invisible from the API layer, since the job runs on a schedule with no direct API response to inspect at all.",
    "pass": "The accrual logic is corrected to prorate based on hire date, verified by re-triggering the job and directly confirming correct, prorated balances for a range of employees with different hire dates.",
    "passLabel": "Pass (after fix)"
  },
  "advantages": [
    "Verifies business logic and data correctness directly at the source, rather than only inferring it indirectly through the UI or API response",
    "Catches issues in scheduled/background processing that UI-only testing would never naturally exercise",
    "Combining API-level and database-level checks together provides stronger, more complete confidence than either alone",
    "Backend issues are typically diagnosed and fixed faster when caught here, before they propagate up through the API and UI layers"
  ],
  "limitations": [
    "Requires both API and database access/knowledge to be done thoroughly, a broader skill set than pure UI-focused testing",
    "Doesn't verify how the backend's output is actually presented or used by the UI — pairs with, but doesn't replace, frontend/system testing",
    "Testing scheduled or background jobs can require specific tooling or manual triggering not always readily available in every environment",
    "Business logic spanning many interrelated tables can require deep domain knowledge to verify correctly and completely"
  ],
  "tools": [
    {
      "name": "Postman + DBeaver",
      "sub": "API trigger + database inspect",
      "url": "https://postman.com",
      "seeChapter": 2,
      "desc": "Used together: Postman exercises the backend through its API surface with deliberately chosen inputs, while DBeaver verifies directly at the database that the resulting stored data and state are actually correct — combining a contract-level check with an internal-data check of the same operation.",
      "adv": [
        "Verifies business logic and data at the source",
        "Catches scheduled/background issues UI testing never exercises",
        "API plus database checks together are stronger than either alone",
        "Faster diagnosis before bugs propagate through API and UI"
      ],
      "lim": [
        "Needs both API and database knowledge",
        "Does not replace frontend/system testing",
        "Scheduled jobs may be hard to trigger on demand",
        "Multi-table business rules need deep domain knowledge"
      ],
      "steps": [
        {
          "t": "Step 1 — Name the backend logic",
          "p": "A calculation, scheduled job, or multi-step business process."
        },
        {
          "t": "Step 2 — Trigger via Postman",
          "p": "Hit the API with valid, boundary, and invalid inputs."
        },
        {
          "t": "Step 3 — Inspect with DBeaver",
          "p": "Confirm stored data is correct, not just that the API returned 200."
        },
        {
          "t": "Step 4 — Handle scheduled jobs",
          "p": "Trigger manually where possible (or wait for a run) and verify output and side effects in the database."
        },
        {
          "t": "Step 5 — Cross-check multi-table rules",
          "p": "e.g. leave approval decrements balance and writes an audit row — check every affected table."
        },
        {
          "t": "Step 6 — Pair with unit tests on the functions",
          "p": "Fastest, most targeted layer of backend verification."
        }
      ]
    }
  ],
  "contentMarkdown": "## Trigger then inspect storage\n\nPostman for the API surface; DBeaver for stored state.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
