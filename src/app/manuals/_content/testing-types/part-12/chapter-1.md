---
id: "tt-static-testing"
title: "Static Testing"
minutes: 20
partName: "Part 12 · Code Quality, Techniques & Visual UI"
level: "beginner"
---

Static testing examines an application's code, requirements, or design artifacts without actually executing the program — reviewing source code, checking for style and structural issues, and validating documents against standards, all before a single line of code ever runs.

## Static Code Analysis & Quality Gate Enforcement

Analyze source code using AST parsers detecting dead code, type mismatches, and cognitive complexity anomalies.

```
npx eslint src/ && npx sonarqube-scanner
```