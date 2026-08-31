---
id: "tt-api-testing"
title: "API Testing"
minutes: 25
partName: "Part 9 · Modern Engineering & Integrations"
level: "beginner"
---

API testing verifies an API's behavior directly at the request/response level — checking endpoints, methods, payloads, status codes, headers, and response bodies — independent of any UI, working with the API exactly as any consuming client (frontend, mobile app, third-party integration) actually would.

## Automated REST and GraphQL Contract Validation

Execute comprehensive HTTP assertions validating status codes, JSON schema structures, and headers.

```
npx newman run hrms-api.json -e env-staging.json --bail
```