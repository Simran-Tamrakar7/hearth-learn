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
advantages: ["Catches foundational internationalization gaps before they're compounded by actual translation and localization work built on top of them","Automated string-scanning finds hard-coded text far more reliably and completely than manual code review alone","Much cheaper to fix at this stage than to retrofit after the codebase has grown around the assumption of a single hard-coded language","Directly de-risks future expansion into new markets, which frequently arrives later as a business requirement with a tight timeline"]
limitations: ["Automated scanning for hard-coded strings can still produce false positives/negatives depending on how the codebase is structured","Testing with an artificially lengthened placeholder locale approximates, but doesn't perfectly predict, how every real target language will actually behave","Doesn't verify translation quality or cultural appropriateness at all — that's the separate concern of localization testing (Chapter 23)","Requires genuine buy-in to fix flagged issues structurally, rather than working around them locally each time they cause a visible problem"]
---

## Scan then lengthen

Move UI copy into resources; test a doubled placeholder locale.
