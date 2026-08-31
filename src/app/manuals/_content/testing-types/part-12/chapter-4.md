---
id: "tt-visual-regression-testing"
title: "Visual Regression Testing"
minutes: 25
partName: "Part 12 · Code Quality, Techniques & Visual UI"
level: "intermediate"
---

Visual regression testing captures screenshots of an application's UI and automatically compares them against a previously approved baseline, flagging any pixel-level (or perceptually meaningful) visual differences — catching unintended appearance changes that functional tests, which only check behavior, would never notice.

## Pixel-Level Snapshot Baseline Comparison

Capture viewport screenshots of components across breakpoints and assert zero unexpected pixel variations.

```
npx backstop test
```