---
id: "tt-localization-testing"
title: "Localization Testing"
minutes: 20
partName: "Part 6 · Other Testing Types"
level: "intermediate"
---

Localization testing verifies that an application works correctly when adapted for a specific language, region, or culture — checking not just that text is translated, but that dates, currencies, number formats, text direction, and layout all behave correctly for each target locale.

## Multi-Locale & RTL Validation

Verify text expansion, currency/date internationalization, and Right-to-Left layout mirroring.

```
npx playwright test --grep @l10n
```