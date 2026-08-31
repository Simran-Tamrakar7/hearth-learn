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
advantages: ["Checks against an objective, authoritative external standard rather than \"does it look right in my browser\"","Free, instant, and requires no setup — just a URL or pasted markup","Improves compatibility with standards-compliant tools and assistive technology beyond just mainstream browsers","Catches structural markup issues that often correlate with, and contribute to, accessibility problems"]
limitations: ["A page can be fully standards-conformant and still be a poor user experience — conformance and quality/usability are related but distinct","Doesn't test JavaScript-driven dynamic content well if the validator only sees the initial server-rendered markup","Some flagged warnings are genuinely minor and not worth the effort to chase down immediately","Doesn't cover protocols or specifications outside HTML/CSS — a different, dedicated validator is needed for other kinds of conformance (e.g. specific API/data-format standards)"]
---

## Validate then fix the template

Prioritize unclosed tags and invalid nesting.
