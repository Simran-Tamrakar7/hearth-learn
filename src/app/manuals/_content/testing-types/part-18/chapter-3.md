---
id: "tt-snapshot-testing"
title: "Snapshot Testing"
minutes: 20
partName: "Part 18 · Backend, Network, Snapshot & Soak"
level: "intermediate"
---

Snapshot testing captures serialized UI structure (not a screenshot) on first run, then flags any later difference for a human to accept or reject.

## toMatchSnapshot then review diffs

Never blindly update.