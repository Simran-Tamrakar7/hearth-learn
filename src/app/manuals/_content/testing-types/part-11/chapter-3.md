---
id: "tt-fuzz-testing"
title: "Fuzz Testing"
minutes: 25
partName: "Part 11 · Operational, Infrastructure & Site Health"
level: "advanced"
---

Fuzz testing feeds an application large volumes of random, malformed, or unexpected input — automatically and at scale — specifically to find inputs that cause crashes, hangs, memory corruption, or unexpected behavior that no one would have thought to manually craft as a test case.

## Boundary & Malformed Parameter Fuzzing

Subject file upload and JSON ingestion endpoints to large payload mutation sets detecting ReDoS and buffer anomalies.

```
zap-cli fuzz --target https://staging.hrms.internal/api/import --payload-list seclists-fuzz.txt
```