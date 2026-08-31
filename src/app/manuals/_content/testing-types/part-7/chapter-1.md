---
id: "tt-black-box-testing"
title: "Black Box Testing"
minutes: 20
partName: "Part 7 · By Knowledge"
level: "beginner"
---

Black box testing evaluates an application purely from the outside — inputs and outputs — without any knowledge of or access to the internal code, logic, or architecture that produces those outputs. The tester acts exactly like a real user or an external system: they can't see (and don't need to see) what's happening underneath.

## Equivalence Partitioning & Boundary Value Black Box Suite

Construct black box test matrices derived purely from requirement specifications and business rules.

```
npx playwright test --grep @blackbox
```