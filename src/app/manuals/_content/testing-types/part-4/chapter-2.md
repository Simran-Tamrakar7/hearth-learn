---
id: "tt-load-testing"
title: "Load Testing"
minutes: 30
partName: "Part 4 · Non-Functional"
level: "advanced"
---

Load testing simulates a realistic, expected number of concurrent users hitting the application at once, to verify it performs acceptably under the traffic it's actually expected to handle in production — not a single user's speed, but the system's behavior under a real crowd.

## Concurrency Simulation & SLA Verification

Model peak concurrent user traffic and assert response latency under 2 seconds for the 95th percentile.

```
k6 run --vus 300 --duration 5m load-test.js
```