---
id: "tt-disaster-recovery-testing"
title: "Disaster Recovery Testing"
minutes: 25
partName: "Part 15 · Environment, Migration & Disaster Recovery"
level: "advanced"
---

Disaster recovery testing verifies that an organization can actually restore a fully functioning system after a catastrophic, large-scale failure — a full data center outage, a complete database loss, a major security incident — by actually executing the recovery plan, not just reviewing it on paper, and measuring whether it meets defined recovery time and data loss targets.

## Stopwatch-Timed Disaster Recovery Execution

Simulate complete cluster termination and execute documented restoration runbooks auditing RTO and RPO metrics.

```
aws rds restore-db-instance-to-point-in-time --source-db-instance-identifier prod-rds --target-db-instance-identifier dr-rds
```