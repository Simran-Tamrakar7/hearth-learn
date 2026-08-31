---
id: "tt-chaos-testing"
title: "Chaos Testing"
minutes: 25
partName: "Part 14 · Advanced Resilience, Chaos & Contracts"
level: "advanced"
---

Chaos testing deliberately and continuously injects real failures into a live (typically production or production-like) system — killing services, introducing network latency, taking down dependencies — as an ongoing practice, verifying the system's actual resilience under real, unpredictable conditions rather than assuming resilience based on architecture alone.

## Automated Instance & Pod Failure Injection

Schedule randomized pod terminations against multi-replica Kubernetes clusters observing zero-downtime failover.

```
kubectl delete pod -l app=hrms-payroll --grace-period=0 --force
```