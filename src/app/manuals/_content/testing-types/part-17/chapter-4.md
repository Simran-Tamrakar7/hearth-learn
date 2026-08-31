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
advantages: ["Directs limited testing time and resources toward the areas where a defect would actually matter most, rather than spreading effort evenly and inefficiently","Makes testing scope decisions explicit and defensible, especially valuable under real schedule or resource pressure","Naturally integrates with and prioritizes among every other testing type in this manual, rather than being a separate, competing technique","Encourages ongoing reassessment, keeping testing focus aligned with the system's actual, current risk profile rather than a stale, one-time judgment"]
limitations: ["The risk assessment itself is inherently somewhat subjective — different stakeholders can reasonably disagree on likelihood or impact ratings","A genuinely under-assessed \"low risk\" area can still fail and cause real harm if the initial risk judgment turns out to be wrong","Requires real discipline to revisit and update as the project evolves, or the risk assessment itself becomes stale and misleading","Doesn't eliminate the need for baseline coverage everywhere — even low-risk areas need some minimum testing, not zero"]
---

## Score then allocate

Likelihood × impact → High/Medium/Low → testing depth.
