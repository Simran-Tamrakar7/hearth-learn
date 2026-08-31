---
id: "tt-domain-testing"
overlayNo: 79
title: "Domain Testing"
minutes: 25
partName: "Part 20 · Baseline, Comparative, Domain & Error Guessing"
level: "intermediate"
overviewText: "Domain testing defines the full valid range for an input, then tests inside, at the edge, and outside — BVA (Chapter 51) plus equivalence partitioning (Chapter 52), field by field."
why: "Ad-hoc values cluster around whatever comes to mind. Explicit domains close the gaps users will hit in production."
when: "Test-case design for any field with a definable valid range — every field on the screen, not only the obviously risky ones."
practical: {"app":"HRMS Salary Input Field","scenario":"Domain is any positive number up to a configured organizational maximum.","pass":"Inside, at-max, and above-max cases catch silent truncation at the cap.","fail":"Only mid-range values tested; a salary at the configured cap is silently truncated."}
advantages: ["Produces systematic, complete input coverage rather than test cases clustered around intuitive guesses","Combines the strengths of boundary value analysis and equivalence partitioning into one consistent, repeatable technique","Documenting test cases in TestLink makes the domain coverage reusable and auditable across releases, not redesigned from scratch each time","Easy to explain and apply consistently across an entire form, even by testers less familiar with the specific feature"]
limitations: ["Defining the \"true\" valid domain correctly requires accurate, up-to-date knowledge of the actual business rule — an incorrect domain assumption produces confidently wrong test cases","Can still miss defects arising from combinations of fields, since domain testing is typically applied one field at a time","Maintaining documented test cases in a separate tool (TestLink) adds process overhead compared to purely ad-hoc testing","Doesn't cover non-input-related defects (UI rendering, workflow logic) — it's specifically a technique for input validation coverage"]
---

## Inside, edge, outside per field

Document in TestLink; reuse across releases.
