---
id: "tt-vulnerability-scanning"
title: "Vulnerability Scanning"
minutes: 25
partName: "Part 11 · Operational, Infrastructure & Site Health"
level: "intermediate"
---

Vulnerability scanning automatically checks an application and its infrastructure against databases of known, previously disclosed vulnerabilities — outdated software versions, missing security patches, exposed services, and common misconfigurations — providing broad, continuous coverage of well-documented risk rather than discovering novel issues.

## Automated DAST & Infrastructure CVE Audit

Schedule automated DAST scans and host port assessments to identify unpatched third-party vulnerabilities.

```
docker run --rm -v $(pwd):/zap/wrk/:rw zaproxy/zap-stable zap-full-scan.py -t https://staging.hrms.internal
```