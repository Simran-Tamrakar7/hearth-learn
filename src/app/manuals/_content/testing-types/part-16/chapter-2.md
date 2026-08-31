---
id: "tt-pilot-testing"
title: "Pilot Testing"
minutes: 20
partName: "Part 16 · Governance, Deployment Strategies & Integration"
level: "intermediate"
---

Pilot testing deploys the actual, real production system to a small, real, live subset of the intended user base — not a separate test build like beta testing, but the genuine live system used in genuine day-to-day operation by a limited group — before rolling it out to the full user base.

## Live Production Cohort Observation & Metrics Tracking

Deploy production build to an isolated business unit cohort tracking task completion rates and support escalation frequency.

```
launchdarkly-cli flags update-targeting hrms-v2 --rollout 10%
```