---
id: "tt-end-to-end-testing"
title: "End-to-End (E2E) Testing"
minutes: 30
partName: "Part 9 · Modern Engineering & Integrations"
level: "advanced"
---

End-to-end testing verifies a complete user journey through the entire system exactly as a real user would experience it — from the UI, through the backend, to the database and back — covering the full path a real task takes rather than any single layer or component in isolation.

## Full Multi-Step User Journey Automation

Model critical user transactions from login to final database write across realistic multi-page workflows.

```
npx playwright test tests/e2e/core-journeys.spec.ts --trace on
```