---
id: "tt-cloud-testing"
overlayNo: 83
title: "Cloud Testing"
minutes: 25
partName: "Part 21 · Coverage, OAT, Cloud & Golden Master"
level: "advanced"
overviewText: "Cloud testing verifies auto-scaling, multi-zone resilience, and cloud-specific failures — not generic logic that merely happens to run in the cloud."
why: "Elasticity only helps if the app handles extra instances: session state, races, zone loss. Single-instance load tests never exercise that."
when: "After migrating to or building for cloud — under conditions that actually trigger auto-scale and multi-zone behavior."
practical: {"app":"HRMS Roles & Permissions Under Auto-Scaling","scenario":"BlazeMeter load scales the environment from one instance to three.","pass":"Permissions moved to a shared cache; data stays consistent through the scale event.","fail":"Per-instance memory cache; requests return stale permissions during the transition."}
---

## Ramp past the scale threshold

Watch the transition, not only steady state.
