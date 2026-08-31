---
id: "tt-scalability-testing"
title: "Scalability Testing"
minutes: 25
partName: "Part 4 · Non-Functional"
level: "advanced"
---

Scalability testing measures how an application's performance changes as load increases in stages, specifically to determine whether — and how — adding more resources (servers, database capacity, workers) allows the system to keep pace with growing demand, rather than just finding a single breaking point.

## Horizontal & Vertical Scaling Verification

Measure compute resource throughput scaling efficiency across 1x, 2x, and 4x infrastructure configurations.

```
jmeter -n -t scalability_matrix.jmx -l scale_results.jtl
```