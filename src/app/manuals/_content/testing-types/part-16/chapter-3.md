---
id: "tt-parallel-testing"
title: "Parallel Testing"
minutes: 25
partName: "Part 16 · Governance, Deployment Strategies & Integration"
level: "intermediate"
---

Parallel testing runs the old and new versions of a system side by side, processing the exact same real input through both simultaneously, and directly compares their outputs — verifying the new system produces correct, equivalent results before fully cutting over and retiring the old one.

## Dual-Engine Output Comparison & Diff Auditing

Feed identical input transaction streams to legacy and replacement engines asserting identical calculated values.

```
python3 scripts/diff_parallel_runs.py --legacy-output=old.csv --new-output=new.csv
```