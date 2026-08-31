---
id: "tt-risk-based-testing"
overlayNo: 68
title: "Risk-Based Testing"
minutes: 20
partName: "Part 17 · Data-Driven, Keyword, Model & Risk"
level: "intermediate"
overviewText: "Risk-based testing prioritizes what gets tested, and how much effort each area receives, from likelihood of failure combined with impact if it fails."
why: "Unlimited testing time does not exist. Treating payroll and a news widget as equal depth is a misallocation relative to actual business risk."
when: "At the start of test planning for any release under real time or resource constraints."
practical: {"app":"HRMS Release Prioritization","scenario":"Payroll calculation is High risk; the company-news announcement feature is Low risk.","pass":"Payroll gets functional, boundary, negative, security, and parallel testing; news gets a single smoke test — a deliberate trade-off.","fail":"Equal shallow coverage on both would have left the payroll edge-case uncaught."}
---

## Score then allocate

Likelihood × impact → High/Medium/Low → testing depth.
