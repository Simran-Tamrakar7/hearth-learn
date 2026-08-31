---
id: "tt-soak-endurance-testing"
overlayNo: 72
title: "Soak / Endurance Testing"
minutes: 25
partName: "Part 18 · Backend, Network, Snapshot & Soak"
level: "advanced"
overviewText: "Soak (endurance) testing runs a continuous, moderate, realistic load for many hours to days to catch slow leaks and decay that a short run never has time to reveal."
why: "The same practice as Reliability Testing (Chapter 20), named here because teams plan and request it as its own type. Some bugs only appear over production-length time."
when: "Before launch for always-on systems, and after adding long-running processes, caches, or connection pools — as a dedicated long run, not folded into a short load test."
practical: {"app":"HRMS API Gateway Connection Pool","scenario":"Moderate realistic load continuously for 48 hours.","pass":"After a connection-release fix, a repeat 48-hour soak stays flat.","fail":"Open connections climb and never return to baseline; by hour 36 requests fail with pool exhausted."}
---

## Moderate load, long duration

Watch drift, not just spikes.
