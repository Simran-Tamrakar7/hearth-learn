---
id: "tt-retesting"
title: "Retesting (Confirmation Testing)"
minutes: 15
partName: "Part 8 · Release & Quality"
level: "beginner"
---

Retesting — also called confirmation testing — re-runs the exact test case that originally found a specific bug, after a fix has been applied, to confirm that specific bug is actually resolved. It's distinct from regression testing (Chapter 10): retesting checks only the one thing that was reported broken, not the surrounding application.

## Defect Verification & Closure Protocol

Re-run exact original defect reproduction scripts against patched staging builds.

```
npm run test -- tests/retest/bug-404.spec.ts
```