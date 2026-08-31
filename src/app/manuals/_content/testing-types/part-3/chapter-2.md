---
id: "tt-regression-testing"
title: "Regression Testing"
minutes: 30
partName: "Part 3 · Functional"
level: "intermediate"
---

Regression testing re-runs previously passing tests after a code change to confirm that nothing that used to work has quietly broken — the opposite direction from sanity testing: instead of narrowly checking the new change, it broadly re-checks everything that was already known to be correct.

## Automated Regression Suite Maintenance

Construct resilient regression pipelines triggered on pull requests and release tags.

```
pytest tests/regression/ -n auto
```