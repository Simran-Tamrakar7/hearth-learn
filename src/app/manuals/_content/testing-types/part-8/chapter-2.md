---
id: "tt-beta-testing"
title: "Beta Testing"
minutes: 25
partName: "Part 8 · Release & Quality"
level: "intermediate"
---

Beta testing releases a near-final version of the application to a limited group of real, external users — actual customers or a selected pilot group — who use it in their own real-world environment, with their own real data and workflows, before general release.

## Staged Beta Release Distribution & Telemetry Monitoring

Deploy release candidates to closed external cohorts and collect crash diagnostics and telemetry.

```
fastlane supply --track closed_beta --rollout 0.20
```