---
id: "tt-stress-testing"
title: "Stress Testing"
minutes: 25
partName: "Part 4 · Non-Functional"
level: "advanced"
---

Stress testing pushes the application beyond its expected normal load — well past the numbers load testing confirmed as acceptable — deliberately looking for the breaking point, and just as importantly, how the system fails and whether it recovers gracefully once the excess load is removed.

## Breaking-Point & Recovery Profiling

Subject infrastructure to extreme traffic spikes and evaluate self-healing and graceful degradation.

```
k6 run stress-test.js
```