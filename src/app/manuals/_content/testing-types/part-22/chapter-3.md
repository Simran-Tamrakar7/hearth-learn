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
advantages: ["Catches OO-specific defects — broken inheritance contracts, incorrect polymorphic dispatch — that generic functional testing routinely misses","Improves confidence specifically in shared, reusable base classes, where a defect can silently propagate to every subclass built on top of them","Complements standard unit testing by adding an OO-specific lens rather than duplicating the same generic checks","Structured code review catches design-level OO risk patterns before they even manifest as a runtime bug"]
limitations: ["Requires genuine familiarity with object-oriented design principles to review or test effectively — not a technique every tester is equally equipped for","Manual-only testing here means it's not automatically re-verified on every future change without separately maintained test cases","Deep inheritance hierarchies can make it genuinely difficult to reason about every possible interaction and override combination","Doesn't cover procedural or non-OO parts of a codebase at all — it's specifically scoped to OO-structured code"]
---

## Overrides, lifecycle, polymorphism

Review that overrides specialize meaning, they do not change it.
