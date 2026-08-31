---
id: "tt-unit-testing"
title: "Unit Testing"
minutes: 25
partName: "Part 1 · By Level"
level: "beginner"
---

Testing the smallest piece of code in isolation — a single function, method, or class — with every external dependency mocked out.

## Unit Testing Architecture

Unit tests isolate functions and mock out databases, external APIs, and network calls for sub-millisecond execution in CI pipelines.

```
// Unit Test Example in Jest:
test('returns correct tax slab', () => {
  expect(calculateTax(500000)).toBe(5000.0);
});
```