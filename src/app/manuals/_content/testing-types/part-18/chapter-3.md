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
advantages: ["Catches any unintended change to a component's output automatically, without needing to write and maintain individual assertions for every possible detail","Very fast to write initially — a single line captures comprehensive coverage of the entire current output","Makes the review process explicit: every actual change requires a deliberate accept/reject decision, rather than silently passing or silently failing","Particularly efficient for components with large, complex, deeply nested output structures"]
limitations: ["Can create a habit of blindly approving/updating snapshots without genuinely reviewing what changed, which defeats the entire purpose of the technique","A snapshot failure indicates that something changed, but not why it changed or whether that change is actually correct — still requires human judgment every time","Large, complex snapshots can be hard for a human to meaningfully review in detail, especially as they grow","Doesn't test actual interactive behavior at all — pairs with, but doesn't replace, functional/interaction testing of the same component"]
---

## toMatchSnapshot then review diffs

Never blindly update.
