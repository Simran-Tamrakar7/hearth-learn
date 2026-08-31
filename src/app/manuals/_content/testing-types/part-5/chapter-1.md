---
id: "tt-volume-testing"
title: "Volume Testing"
minutes: 25
partName: "Part 5 · Non-Functional"
level: "advanced"
---

Volume testing checks how an application behaves when the database is filled with a large quantity of data — not many concurrent users, but a large amount of data at rest — verifying that queries, searches, exports, and reports still perform acceptably once the system has scaled up in data size rather than traffic.

## Database Volume Inflation & Query Optimization

Benchmark database indexing and full-table scan query bottlenecks with synthetic datasets exceeding 500,000 records.

```
python seed_volume.py --records=500000
```