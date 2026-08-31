---
id: "tt-penetration-testing"
title: "Penetration Testing"
minutes: 30
partName: "Part 10 · Device, Platform & Security"
level: "advanced"
---

Penetration testing simulates a real, motivated attacker deliberately trying to break into an application — going beyond automated vulnerability scanning (Chapter 18) to manually chain together weaknesses, exploit business logic flaws, and attempt actual unauthorized access, exactly as a real adversary would.

## Manual Business Logic & BOLA Vulnerability Assessment

Probe endpoints using intercepting proxies manipulating parameter authorization states to discover chained exploit chains.

```
zap.sh -cmd -quickurl https://staging.hrms.internal -quickout report-pentest.html
```