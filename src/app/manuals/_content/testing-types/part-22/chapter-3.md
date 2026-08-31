---
id: "tt-object-oriented-testing"
overlayNo: 87
title: "Object-Oriented Testing"
minutes: 25
partName: "Part 22 · Content, Session, OO & PWA"
level: "advanced"
overviewText: "Object-oriented testing targets class methods, inheritance, polymorphism, and object lifecycle state — defects generic functional tests miss."
why: "A subclass override can silently skip a parent contract. Tests that only exercise the base class or common subclasses will not see it."
when: "Codebases with meaningful hierarchies — especially wherever a subclass overrides base-class behavior."
practical: {"app":"HRMS Payroll Rule Subclass","scenario":"OvertimePayrollRule overrides PayrollRule calculation.","pass":"Override calls the base minimum-wage check before overtime logic.","fail":"Override skips the mandatory minimum-wage floor every other subclass inherits."}
---

## Overrides, lifecycle, polymorphism

Review that overrides specialize meaning, they do not change it.
