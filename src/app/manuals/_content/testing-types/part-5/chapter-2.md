---
id: "tt-security-testing"
title: "Security Testing"
minutes: 30
partName: "Part 5 · Non-Functional"
level: "advanced"
---

Security testing probes an application for vulnerabilities that could let an attacker access data, impersonate a user, disrupt service, or otherwise act outside their intended permissions — checking not whether the app does what it's supposed to, but whether it can be made to do what it's not supposed to.

## OWASP Top 10 & Dependency Audit

Scan endpoints for injection and broken object-level authorization (IDOR) vulnerabilities and audit dependencies.

```
npm audit && docker run -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t https://staging.hrms-app.com
```