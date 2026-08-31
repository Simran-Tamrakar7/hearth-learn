---
id: "tt-interface-testing"
title: "Interface Testing"
minutes: 25
partName: "Part 3 · Functional"
level: "intermediate"
---

Interface testing verifies the points where two systems, modules, or layers communicate — most commonly APIs — checking that requests are handled correctly, responses match the expected contract, error codes are correct, and data types and structures are exactly what the consuming side expects.

## Schema Contract Validation

Enforce response payload JSON schema, HTTP response headers, and status code invariants.

```
pm.expect(typeof res.net_salary).to.eql("number");
```