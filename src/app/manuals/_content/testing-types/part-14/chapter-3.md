---
id: "tt-contract-testing"
title: "Contract Testing"
minutes: 25
partName: "Part 14 · Advanced Resilience, Chaos & Contracts"
level: "intermediate"
---

Contract testing verifies that two independently developed services — a consumer (e.g. a frontend or another microservice) and a provider (e.g. an API) — agree on the exact shape of their interaction, without requiring either side to run against a full, live instance of the other, by checking each side independently against a shared, explicit contract.

## Consumer-Driven Contract Generation & Verification

Author consumer contract expectations and execute automated provider verification in CI pipelines.

```
npx pact-provider-verifier --provider-base-url=http://localhost:3001 --pact-urls=./pacts/frontend-backend.json
```