---
id: "tt-automated-testing"
title: "Automated Testing"
minutes: 35
partName: "Part 2 · Execution Method"
level: "intermediate"
---

Automated testing is the practice of writing scripts that execute test steps and check results without a human clicking through them each time — the same suite can run in seconds, on every commit, forever, without getting tired or skipping a step.

## Automated CI Test Suite

Author headless browser test suites wired directly to pull request gates in GitHub Actions.

```
npx cypress run --record --spec "cypress/e2e/regression/**"
```