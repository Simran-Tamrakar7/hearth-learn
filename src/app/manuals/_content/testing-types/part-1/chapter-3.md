---
id: "tt-system-testing"
title: "System Testing"
minutes: 35
partName: "Part 1 · By Level"
level: "advanced"
---

Testing the fully integrated application as a black box, end to end, exactly the way a real user would experience it.

## End-to-End System Test Architecture

Simulate complete real-world journeys with headless browsers, taking screenshots and recording network traces on failure.

```
await page.goto("https://staging.hrms-app.com/login");
await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
```