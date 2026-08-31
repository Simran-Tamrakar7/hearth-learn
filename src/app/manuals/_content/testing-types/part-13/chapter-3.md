---
id: "tt-boundary-value-analysis"
title: "Boundary Value Analysis"
minutes: 20
partName: "Part 13 · Test Design Techniques & Partitioning"
level: "beginner"
---

Boundary value analysis specifically targets test inputs at, just above, and just below the edges of valid input ranges — since bugs disproportionately cluster at exactly these boundary points (off-by-one errors, incorrect comparison operators), rather than spreading evenly across the entire range of possible input.

## 3-Point Extreme Boundary Value Evaluation

Calculate Min-1, Min, Min+1, Max-1, Max, and Max+1 for all numeric inputs and execute boundary validations.

```
npx jest tests/unit/boundary-analysis.test.ts
```