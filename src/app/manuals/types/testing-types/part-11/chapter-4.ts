import type { ChapterRecord } from "../../types";

/** Vulnerability Scanning */
export const chapter = {
  "id": "tt-vulnerability-scanning",
  "overlayNo": 44,
  "title": "Vulnerability Scanning",
  "minutes": 25,
  "level": "intermediate",
  "phase": "Part 11 · Operational, Infrastructure & Site Health",
  "partName": "Part 11 · Operational, Infrastructure & Site Health",
  "overviewText": "Vulnerability scanning automatically checks an application and its infrastructure against databases of known, previously disclosed vulnerabilities — outdated software versions, missing security patches, exposed services, and common misconfigurations — providing broad, continuous coverage of well-documented risk rather than discovering novel issues.",
  "why": "A large share of real-world breaches don't come from exotic, novel attacks — they come from known, disclosed vulnerabilities in outdated software that simply hasn't been patched yet. Vulnerability scanning provides continuous, low-effort coverage of exactly that risk category, catching an outdated library or an exposed misconfigured service before it becomes the entry point for a real attacker who's specifically searching for exactly this kind of easy, known target.",
  "when": "Continuously — ideally scheduled to run automatically on a regular cadence (daily or weekly) against both the application and its infrastructure, since new vulnerabilities are disclosed in existing, unchanged software on an ongoing basis, not just when the codebase itself changes.",
  "practical": {
    "app": "HRMS Server Infrastructure",
    "scenario": "A scheduled weekly Nessus scan against the HRMS's staging infrastructure flags an outdated version of a widely used web server software with a publicly disclosed, actively exploited vulnerability.",
    "pass": "The server software is updated to the patched version, a re-scan confirms the vulnerability is no longer present, and the update cadence is tightened to catch future disclosures faster.",
    "fail": "The flagged version has been running unpatched for three months since the last infrastructure update, exposing a known, actively exploited vulnerability to anything that finds and probes the server."
  },
  "advantages": [
    "Provides broad, continuous, automated coverage of well-known vulnerability categories with minimal manual effort",
    "Catches an entire class of real-world breach risk (unpatched, known-vulnerable software) actively exploited in the wild",
    "Nessus extends coverage beyond the web application layer into broader infrastructure and network-level risk",
    "Findings map directly to CVE identifiers with concrete remediation and patching guidance"
  ],
  "limitations": [
    "Only catches known, previously disclosed vulnerabilities — offers zero protection against zero-day issues",
    "Produces false positives requiring manual triage and verification, same as any automated scanner",
    "Doesn't test business logic or chained exploitation paths — that's specifically what penetration testing (Chapter 40) is for",
    "Nessus Essentials free tier caps scan targets to 16 IP addresses"
  ],
  "tools": [
    {
      "name": "OWASP ZAP Dynamic Scanner",
      "sub": "Automated DAST Web Vulnerability Scanner",
      "url": "https://www.zaproxy.org",
      "seeChapter": 18,
      "desc": "Used here (see Chapter 18 and Chapter 40) in its core automated-scan mode, run on a recurring schedule against the live application to catch newly disclosed vulnerability patterns matching the OWASP Top 10.",
      "adv": [
        "Automated DAST spidering and active vulnerability scanning",
        "Native GitHub Actions / GitLab CI/CD pipeline integration for automated gatekeeping",
        "Exports machine-readable SARIF, JSON, and HTML vulnerability reports"
      ],
      "lim": [
        "Active scanning can create high load and generate dummy test records in databases"
      ],
      "steps": [
        {
          "t": "Step 1 — Run automated baseline scan in CI pipeline",
          "p": "Execute ZAP docker container against staging environment.",
          "c": "docker run -t zaproxy/zap-stable zap-baseline.py -t https://staging.hrms.internal -r zap-report.html"
        },
        {
          "t": "Step 2 — Triage identified High and Medium findings",
          "p": "Review generated HTML report for SQLi, XSS, and broken CORS headers.",
          "c": "Findings:\n- 0 High Severity\n- 1 Medium: Missing Anti-clickjacking Header (X-Frame-Options)\n- 2 Low: Cookie Without SameSite Attribute"
        }
      ]
    },
    {
      "name": "Nessus Essentials",
      "sub": "Comprehensive Infrastructure & Host Vulnerability Scanner",
      "url": "https://www.tenable.com/products/nessus",
      "desc": "A free (for up to 16 IP addresses) vulnerability scanner covering infrastructure-level checks — network services, outdated OS packages, misconfigurations — drawing on Tenable's industry-leading vulnerability database.",
      "adv": [
        "Massive database of 180,000+ CVE plugins updated continuously",
        "Audits OS patch levels, SSH configurations, open database ports, and SSL ciphers",
        "Identifies actively exploited vulnerabilities (CISA KEV catalog integration)"
      ],
      "lim": [
        "Free tier limited to 16 IP addresses"
      ],
      "steps": [
        {
          "t": "Step 1 — Create and launch Basic Network Scan",
          "p": "Configure target subnet IP range and trigger discovery scan.",
          "c": "Target: 192.168.1.10-20 | Scan Policy: Basic Network Scan | Duration: 14m"
        },
        {
          "t": "Step 2 — Analyze CVE severity breakdown and remediation guide",
          "p": "Filter findings by CVSS >= 7.0 and review vendor patch instructions.",
          "c": "Critical: OpenSSL 1.1.1k Vulnerability (CVE-2021-3711 -> Remote Code Execution)\nRemediation: Upgrade openssl to >= 1.1.1l via apt-get upgrade openssl"
        },
        {
          "t": "Step 3 — Re-scan to verify remediation",
          "p": "Execute differential scan to confirm 0 critical host vulnerabilities remain.",
          "c": "Re-scan: 192.168.1.14 -> 0 Critical, 0 High -> PASS"
        }
      ]
    }
  ],
  "contentMarkdown": "## Automated DAST & Infrastructure CVE Audit\n\nSchedule automated DAST scans and host port assessments to identify unpatched third-party vulnerabilities.\n\n```\ndocker run --rm -v $(pwd):/zap/wrk/:rw zaproxy/zap-stable zap-full-scan.py -t https://staging.hrms.internal\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
