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
advantages: ["Dramatically reduces script duplication and maintenance burden compared to writing a separate script per input variation","Non-technical team members can often contribute new test cases just by adding rows to a spreadsheet, without touching the script itself","Naturally pairs well with boundary value analysis and equivalence partitioning (Chapters 51, 52), since those techniques also produce sets of representative input values","Scales cleanly to a large number of input variations with minimal added engineering effort"]
limitations: ["The underlying script logic itself still needs to be genuinely correct and well-designed — bad script logic multiplied across many data rows just produces many identically wrong results","External data sources need their own maintenance and version control discipline, or they can drift out of sync with what the script actually expects","Debugging a specific failing row can be less immediately obvious than debugging a single, self-contained hardcoded test","Doesn't fit every scenario — flows genuinely needing unique, custom logic per case don't benefit from this generic data/logic separation"]
---

## Separate data from logic

One script, many CSV rows.
