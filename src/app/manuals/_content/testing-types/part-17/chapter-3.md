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
advantages: ["Automatically and systematically generates test coverage across complex state spaces that would be genuinely difficult for a human to fully enumerate by hand","The model itself becomes clear, explicit documentation of the system's intended states and valid transitions","Different coverage strategies (every edge, every state, random walk) can be applied to the same model without redesigning test cases from scratch","Particularly effective at finding invalid or unexpected transitions a manual test designer might not think to specifically try"]
limitations: ["Building an accurate model in the first place requires real upfront effort and a genuinely clear understanding of the system's actual states and transitions","Connecting each abstract modeled step to real, executable automation code is additional engineering work beyond the model itself","Best suited specifically to systems with well-defined, discrete states — less naturally applicable to more continuous or unstructured behavior","An inaccurate or incomplete model produces test coverage that only reflects the model's own gaps, not the real system's actual full behavior"]
---

## Model then generate

Bind abstract steps to real automation.
