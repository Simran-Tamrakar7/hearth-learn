---
id: "tt-dynamic-testing"
title: "Dynamic Testing"
minutes: 20
partName: "Part 12 · Code Quality, Techniques & Visual UI"
level: "beginner"
---

Dynamic testing evaluates an application by actually executing it with real inputs and observing real outputs and behavior — the umbrella category covering nearly every testing type elsewhere in this manual that involves running the software, in direct contrast to static testing's code-only, no-execution approach.

## Live Runtime Execution & Boundary Assertion

Execute running application binaries stimulating real boundary conditions and validating HTTP state transitions.

```
npx playwright test tests/dynamic/leave-boundary.spec.ts
```