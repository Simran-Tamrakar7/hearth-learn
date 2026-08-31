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
advantages: ["The only testing type specifically designed to catch slow, cumulative problems invisible to any short test run, however thorough","Builds real, evidence-based confidence that a system can run unattended for genuine production-length durations","Directly targets memory leaks and resource exhaustion, a class of bug that's often expensive and disruptive to diagnose after it's already caused a real production outage","Complements, and gives a specific, focused name to, the more general reliability testing practice from Chapter 20"]
limitations: ["Inherently slow to run — a meaningful soak test genuinely takes hours to days, not minutes, and can't be meaningfully rushed","Requires a stable, dedicated test environment tied up for the full duration of the run, unavailable for other testing meanwhile","A particularly slow leak might need an even longer run than initially planned before it becomes clearly visible in the collected data","Identifies that degradation occurred, not automatically why — still requires follow-up profiling or log investigation to find the specific root cause"]
---

## Moderate load, long duration

Watch drift, not just spikes.
