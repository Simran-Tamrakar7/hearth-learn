---
id: "tt-compliance-testing"
title: "Compliance / Regulatory Testing"
minutes: 20
partName: "Part 16 · Governance, Deployment Strategies & Integration"
level: "intermediate"
---

Compliance testing verifies that an application meets the specific legal, regulatory, or industry-standard requirements it's obligated to follow — data privacy laws (GDPR, CCPA), industry standards (PCI-DSS for payment data, HIPAA for health data), or accessibility mandates — checking against externally defined rules the organization doesn't get to choose, rather than internal requirements it wrote itself.

## Regulatory Clause Verification & Cryptographic Audit

Verify statutory mandates (GDPR Article 17 erasure, HIPAA audit logging, PCI-DSS encryption) against database tables.

```
npx jest tests/compliance/gdpr-erasure.test.ts
```