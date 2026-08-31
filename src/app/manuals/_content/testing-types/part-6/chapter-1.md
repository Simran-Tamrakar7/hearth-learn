---
id: "tt-accessibility-testing"
title: "Accessibility Testing"
minutes: 25
partName: "Part 6 · Other Testing Types"
level: "intermediate"
---

Accessibility testing verifies that an application can actually be used by people with disabilities — screen reader users, keyboard-only users, people with low vision or color blindness, people with motor impairments — checking against established standards (primarily WCAG) rather than assuming "it works for me" means it works for everyone.

## WCAG 2.1 AA Audit & Keyboard Operability

Audit DOM accessibility with axe DevTools and WAVE, verifying complete keyboard and screen reader support.

```
npx @axe-core/cli https://staging.hrms-app.com/leave-request
```