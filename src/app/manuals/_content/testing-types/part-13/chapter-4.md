---
id: "tt-equivalence-partitioning"
title: "Equivalence Partitioning"
minutes: 20
partName: "Part 13 · Test Design Techniques & Partitioning"
level: "beginner"
---

Equivalence partitioning divides an input's full range of possible values into distinct partitions (or "classes") that the system is expected to treat identically, and then tests just one representative value from each partition — on the reasoning that if one value in a partition works correctly, the others in that same partition almost certainly will too.

## Input Domain Partitioning & Representative Extraction

Segment input data ranges into discrete equivalence classes and select single representative vectors per partition.

```
npx jest tests/unit/equivalence-classes.test.ts
```