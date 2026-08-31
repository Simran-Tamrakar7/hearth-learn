---
id: "tt-reliability-testing"
title: "Reliability Testing"
minutes: 25
partName: "Part 5 · Non-Functional"
level: "advanced"
---

Reliability testing verifies that an application continues to function correctly over an extended, continuous period of real-world-like usage — checking for the slow degradation, resource leaks, and intermittent failures that only show up over time, not in a single short test run.

## Soak Testing & Uptime Monitoring

Execute extended soak tests to surface memory leaks and monitor production uptime SLAs.

```
docker run -d -p 3001:3001 louislam/uptime-kuma:1
```