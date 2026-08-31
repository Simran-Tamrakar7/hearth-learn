---
id: "tt-sanity-testing"
title: "Sanity Testing"
minutes: 20
partName: "Part 3 · Functional"
level: "beginner"
---

Sanity testing is a narrow, focused check run after a specific bug fix or minor change — not the whole application, just the area that changed and its immediate neighbors — to confirm the fix works and didn't break anything obviously adjacent, before committing to a fuller regression pass.

## Targeted Bug Verification

Execute narrow sanity verifications directly targeting modified components and immediate dependencies.

```
git diff main..feature-branch
```