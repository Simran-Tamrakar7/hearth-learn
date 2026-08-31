---
id: "tt-documentation-testing"
title: "Documentation Testing"
minutes: 15
partName: "Part 15 · Environment, Migration & Disaster Recovery"
level: "beginner"
---

Documentation testing verifies that an application's supporting documentation — user guides, API documentation, help articles, installation instructions, README files — is accurate, complete, and actually works when followed exactly as written, rather than assuming documentation is correct simply because it exists.

## Verbatim Documentation Sample Execution

Copy and execute every code snippet, cURL command, and onboarding step from documentation verifying 100% accuracy.

```
npx dredd api-spec.yaml https://staging.hrms.com/api
```