---
id: "tt-model-based-testing"
overlayNo: 67
title: "Model-Based Testing"
minutes: 25
partName: "Part 17 · Data-Driven, Keyword, Model & Risk"
level: "advanced"
overviewText: "Model-based testing builds an abstract model of expected behavior as a state graph, then automatically generates test cases by exploring paths through that model."
why: "Manually enumerating paths through a multi-step workflow is exhausting and easy to under-cover. A formal model plus a path generator finds transitions a human might never think to try."
when: "Systems with well-defined state machines — approval workflows, booking systems, any finite set of states and valid transitions."
practical: {"app":"HRMS Leave Request State Machine","scenario":"Draft → Submitted → Approved/Rejected → Cancelled is modeled in GraphWalker, generating paths that cover every valid transition at least once.","pass":"The invalid Approved→Draft edge is removed from the model and a clean suite is regenerated.","fail":"A generated path tries Approved→Draft and the leftover API actually allows resetting an approved request to draft."}
---

## Model then generate

Bind abstract steps to real automation.
