---
id: "tt-mutation-testing"
title: "Mutation Testing"
minutes: 30
partName: "Part 8 · Release & Quality"
level: "advanced"
---

Mutation testing evaluates the quality of an existing test suite itself — not the application — by deliberately introducing small, artificial bugs ("mutants") into the source code, one at a time, and checking whether the existing tests actually catch each one. A test suite that fails to notice a deliberately broken line has a real gap in its coverage, even if its coverage percentage looks high.

## Automated Mutant Generation & Mutation Score Analysis

Evaluate assertion effectiveness by running Stryker Mutator against core financial and calculation algorithms.

```
npx stryker run --mutate "src/lib/calculations/**/*.ts"
```