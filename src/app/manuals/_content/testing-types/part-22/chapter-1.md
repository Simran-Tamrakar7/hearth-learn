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
---

## Guide, then lint, then human clarity

Vale catches drift; people catch unclear wording.
