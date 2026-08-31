---
id: "tt-compatibility-testing"
title: "Compatibility Testing"
minutes: 25
partName: "Part 5 · Non-Functional"
level: "intermediate"
---

Compatibility testing verifies that an application works correctly across the different environments real users will actually use it in — different browsers, operating systems, screen sizes, and devices — rather than just the one environment it was built and tested on.

## Cross-Device & Cross-Browser Verification

Validate responsive viewport layouts and CSS rendering across iOS Safari, Android Chrome, and desktop browsers.

```
npx playwright test --project=webkit --project=firefox
```