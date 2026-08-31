---
id: "tt-negative-testing"
title: "Negative Testing"
minutes: 20
partName: "Part 13 · Test Design Techniques & Partitioning"
level: "beginner"
---

Negative testing deliberately feeds an application invalid, unexpected, or malformed input — the opposite of what the system is designed to correctly handle — to verify it fails gracefully with a clear, correct error, rather than crashing, behaving unpredictably, or silently accepting something it shouldn't.

## Deliberate Invalid Payload & Type Assertion

Submit out-of-range, null, negative, and malformed inputs to form fields and API parameters verifying graceful error handling.

```
curl -X POST https://staging.hrms.internal/api/leave -d '{"days": -5}' -H "Content-Type: application/json"
```