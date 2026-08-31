---
id: "tt-conformance-testing"
overlayNo: 75
title: "Conformance Testing"
minutes: 20
partName: "Part 19 · Continuous, Interop, Conformance & Globalization"
level: "beginner"
overviewText: "Conformance testing checks output against a formal external standard via that standard’s official validator — not “did it look fine in Chrome.”"
why: "Browsers are lenient. Invalid markup surfaces later as unpredictable rendering, accessibility gaps, or fragile templates."
when: "Periodically, and after any significant markup/template change — cheap enough to be routine."
practical: {"app":"HRMS Public Careers Page","scenario":"Careers page submitted to the W3C validator after a template redesign.","pass":"Unclosed tags and missing labels fixed; re-validation returns zero errors.","fail":"Unclosed divs and a form input without a label render in the usual browser but fail the spec."}
---

## Validate then fix the template

Prioritize unclosed tags and invalid nesting.
