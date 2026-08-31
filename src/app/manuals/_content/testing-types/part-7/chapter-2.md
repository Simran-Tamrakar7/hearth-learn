---
id: "tt-white-box-testing"
title: "White Box Testing"
minutes: 25
partName: "Part 7 · By Knowledge"
level: "intermediate"
---

White box testing examines and tests the internal structure, logic, and code paths of an application directly — the tester (usually a developer) has full visibility into the source code and designs tests specifically to exercise particular branches, conditions, and statements within it.

## Code & Branch Coverage Instrumentation

Instrument test suites to measure statement, branch, function, and line coverage metrics.

```
npm test -- --coverage --coverageThreshold='{"global":{"branches":90}}'
```