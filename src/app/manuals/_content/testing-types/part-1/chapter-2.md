---
id: "tt-integration-testing"
title: "Integration Testing"
minutes: 30
partName: "Part 1 · By Level"
level: "mid"
---

Verifying that components work correctly once combined — the interfaces, contracts, and data flow between modules that unit tests can't see.

## API Integration Workflow

Verify multi-step API chains with token propagation and contract verification across microservices.

```
pm.collectionVariables.set("auth_token", pm.response.json().token);
```