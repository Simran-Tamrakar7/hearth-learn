---
id: "tt-content-testing"
overlayNo: 85
title: "Content Testing"
minutes: 20
partName: "Part 22 · Content, Session, OO & PWA"
level: "beginner"
overviewText: "Content testing reviews the words — accuracy, clarity, tone, and terminology consistency — as a distinct concern from whether the feature works."
why: "A flawless feature still confuses users if the same concept is “Leave Balance” on one screen and “Leave Credit” on another."
when: "Every screen as standard review, and whenever copy is added or a screen is reworked — against a shared terminology guide."
practical: {"app":"HRMS Leave Terminology Inconsistency","scenario":"Vale run against content files with the internal terminology guide.","pass":"Dashboard label corrected to “Leave Balance”; Vale is clean for the term.","fail":"“Leave Credit” on the dashboard vs “Leave Balance” everywhere else — already causing support tickets."}
advantages: ["Catches typos, unclear labels, and confusing wording that hurt usability and undermine user trust","Ensures the same concept is referred to consistently everywhere in the product, reducing user confusion","Automated linting with Vale finds terminology drift across many screens far more completely than manual review alone can","Cheap, high-visibility improvement — content fixes are typically low-risk and low-effort relative to their impact on perceived quality"]
limitations: ["Vale checks consistency and defined style rules, not genuine clarity or correctness — a human review is still needed for that","Requires an actively maintained style/terminology guide to be useful; a stale or incomplete guide limits what it can catch","Doesn't cover translated content in other locales — that's the separate concern of localization testing (Chapter 23)","Reviewing dynamic/templated text for every real-data edge case (pluralization, unusual name lengths) can be easy to under-scope"]
---

## Guide, then lint, then human clarity

Vale catches drift; people catch unclear wording.
