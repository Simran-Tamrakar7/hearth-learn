---
id: "tt-snapshot-testing"
overlayNo: 71
title: "Snapshot Testing"
minutes: 20
partName: "Part 18 · Backend, Network, Snapshot & Soak"
level: "intermediate"
overviewText: "Snapshot testing captures serialized UI structure (not a screenshot) on first run, then flags any later difference for a human to accept or reject."
why: "Hand-writing assertions for every detail of a complex component is tedious and easy to under-specify. A snapshot surfaces any change, however small."
when: "UI component testing (especially React) alongside, not instead of, interaction tests."
practical: {"app":"HRMS Employee Card Component","scenario":"A snapshot locks the employee summary card used across the dashboard.","pass":"The unintended wrapping div is removed; the original snapshot passes again.","fail":"An unrelated styling change adds an extra wrapping div that no hand-written assertion was checking."}
---

## toMatchSnapshot then review diffs

Never blindly update.
