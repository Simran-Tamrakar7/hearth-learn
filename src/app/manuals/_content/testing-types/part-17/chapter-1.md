---
id: "tt-data-driven-testing"
overlayNo: 65
title: "Data-Driven Testing"
minutes: 25
partName: "Part 17 · Data-Driven, Keyword, Model & Risk"
level: "intermediate"
overviewText: "Data-driven testing separates test logic from test data — a single automated test script runs repeatedly against many different sets of input data pulled from an external source (a spreadsheet, CSV, or database), rather than hardcoding one fixed input directly into the script itself."
why: "Without this separation, testing ten different input variations of the same flow means writing and maintaining ten nearly-identical scripts. Data-driven testing collapses that duplication: one well-written script, paired with an external data set, can cover dozens or hundreds of input variations."
when: "Whenever the same flow or logic needs to be verified against many different input values — form validation, calculation logic, or any scenario described as \"the same steps, different data.\""
practical: {"app":"HRMS Leave Request Validation","scenario":"A single Selenium script tests leave request date validation, driven by a CSV with 15 rows covering valid, invalid, and boundary dates.","pass":"All 15 rows execute against the same script logic, including the 30-day consecutive maximum accepted without a dedicated script for that one case.","fail":"Adding coverage for a public-holiday start date would have required a new script if data and logic were still mixed together."}
---

## Separate data from logic

One script, many CSV rows.
