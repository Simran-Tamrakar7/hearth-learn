---
id: "tt-smoke-testing"
title: "Smoke Testing"
minutes: 20
partName: "Part 2 · Execution Method"
level: "beginner"
---

Smoke testing is a quick, shallow pass over the most critical functions of an application — login works, the homepage loads, core navigation responds — run immediately after a new build to answer one question: is this build stable enough to test further, or is it broken at the foundation?

## Post-Deployment Smoke Gate

Implement fast sanity checks executed immediately following deployment to confirm baseline uptime.

```
pytest -m smoke --maxfail=1
```