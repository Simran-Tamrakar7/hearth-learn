---
id: "tt-recovery-testing"
title: "Recovery Testing"
minutes: 25
partName: "Part 6 · Other Testing Types"
level: "advanced"
---

Recovery testing deliberately induces failure — killing a server process, cutting a database connection, forcing a crash mid-operation — to verify that the application recovers correctly afterward, without data loss or corruption, rather than assuming failures simply won't happen.

## Resilience & Database Rollback Verification

Simulate abrupt process terminations and test automatic container healing, transaction rollback, and idempotency guarantees.

```
kill -9 $(pgrep -f worker) && npm test -- tests/recovery.spec.ts
```