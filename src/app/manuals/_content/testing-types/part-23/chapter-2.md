---
id: "tt-spike-testing"
overlayNo: 90
title: "Spike Testing"
minutes: 25
partName: "Part 23 · Incremental Integration, Spike, Session & Voice"
level: "intermediate"
overviewText: "Spike testing is a sudden sharp jump in load — not the gradual ramp of load testing (Chapter 14) and not climbing past capacity to find a ceiling (Chapter 15)."
why: "Shift clock-in and launches multiply users in seconds. A system that passed a slow ramp can still drop requests or fail to recover when the same crowd arrives at once."
when: "Before events that produce a near-instant crowd (9 AM clock-in, campaign drop), and after auto-scale, pool, or queue changes meant to absorb a surge."
practical: {"app":"HRMS 9 AM Shift Clock-In Spike","scenario":"Jump from ~20 night-shift users to 400 clock-ins in 10 seconds, hold, then drop back.","fail":"p95 past 12s, 18% 503s/timeouts; endpoint stays slow after the surge because the pool does not recover.","pass":"Queue and pool absorb the jump; p95 under 2s, errors under 1%, baseline latency restored within 30s of drop-back."}
advantages: ["Exposes failures that only appear on a sudden jump, which a gradual load ramp (Chapter 14) will never produce","Checks recovery after the surge, not only survival at the peak — a system that stays degraded is still a failure","Gives concrete numbers for auto-scale lag, queue depth, and error rate under a realistic clock-in or launch spike","k6 scripts make the jump itself explicit in stages, so the test cannot accidentally turn into a slow ramp"]
limitations: ["A single designed spike is not every possible surge — shape, duration, and mix of endpoints still have to match the real event","Shared staging infrastructure can absorb or distort the jump, hiding the production failure mode","Auto-scale that is slow in production but instant in a small test environment will look healthier than it is","Does not replace load testing (expected sustained crowd) or stress testing (finding the ceiling past that crowd)"]
---

## Jump, hold, drop, recover

A multi-minute climb is load; raising the peak to find a ceiling is stress.
