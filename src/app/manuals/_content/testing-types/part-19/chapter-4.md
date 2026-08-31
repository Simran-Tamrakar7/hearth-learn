---
id: "tt-globalization-testing"
overlayNo: 76
title: "Globalization Testing"
minutes: 25
partName: "Part 19 · Continuous, Interop, Conformance & Globalization"
level: "intermediate"
overviewText: "Globalization testing verifies the foundation for multiple languages and regions — no hard-coded strings, flexible layout, proper encoding — distinct from localization (Chapter 23)."
why: "A correct translation still fails if the codebase was never built for it: hard-coded dates, layouts that break on long labels, encodings that cannot display characters."
when: "Early, during design and development — retrofitting is far more expensive than building it in."
practical: {"app":"HRMS Sales Pipeline Module","scenario":"i18n-ally scan ahead of expansion into new regional markets.","pass":"Labels moved to resource files; column layout handles doubled text.","fail":"Hard-coded labels; “Deal Stage” overlaps adjacent columns when text doubles."}
---

## Scan then lengthen

Move UI copy into resources; test a doubled placeholder locale.
