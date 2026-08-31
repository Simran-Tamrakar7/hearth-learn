---
id: "tt-positive-testing"
title: "Positive Testing"
minutes: 15
partName: "Part 13 · Test Design Techniques & Partitioning"
level: "beginner"
---

Positive testing verifies that an application behaves correctly when given valid, expected input exactly as the requirements describe — confirming the system does what it's supposed to do under normal, correct-usage conditions, the direct counterpart to negative testing's focus on invalid input.

## Happy-Path Baseline Specification Verification

Verify primary business user flows with valid, compliant inputs confirming intended functionality executes cleanly.

```
npx playwright test tests/positive/leave-creation.spec.ts
```