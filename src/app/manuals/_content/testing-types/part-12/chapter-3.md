---
id: "tt-gui-testing"
title: "GUI Testing"
minutes: 25
partName: "Part 12 · Code Quality, Techniques & Visual UI"
level: "intermediate"
---

GUI testing verifies the graphical user interface itself — buttons, forms, menus, layout, visual elements, and their interactive behavior — checking that what's rendered looks and behaves correctly, distinct from testing the underlying business logic those UI elements happen to trigger.

## Interactive GUI Component Verification

Script clicks, hovers, modal triggers, and form validations verifying UI responsiveness and visual appearance.

```
npx eyes-playwright test tests/gui/components.spec.ts
```