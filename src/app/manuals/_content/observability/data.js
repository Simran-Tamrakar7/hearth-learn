/** Chapter body for /manuals/observability. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "observability",
  "title": "Observability Basics",
  "tagline": "Logs, metrics, traces — reading production like a detective.",
  "category": "ops",
  "accent": "#145C4A",
  "cover": "covers/cicd-cover.png",
  "duration": "3–5 weeks",
  "levelSpan": "Beginner → Intermediate",
  "who": "QA and developers who need to diagnose issues in staging/prod with telemetry — not guesswork.",
  "outcomes": [
    "Use logs, metrics, and traces together on a real incident path",
    "Define useful signals for a feature you test",
    "Ask better questions of on-call and dashboards"
  ],
  "chapters": [
    {
      "id": "obs-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this path",
      "minutes": 20,
      "durationLabel": "Day 0",
      "overview": "Observability is about asking new questions of a system. You’ll need access to at least one telemetry stack (Grafana, Datadog, CloudWatch, Honeycomb, etc.) or a demo.",
      "learn": [
        "Three pillars",
        "Access",
        "Safety"
      ],
      "steps": [
        {
          "title": "Get eyes on a system",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Confirm you can open logs + one dashboard for a service you know. Note the tool names.",
          "tip": "Read-only access is enough for this path.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Tool access confirmed"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "OpenTelemetry concepts",
          "url": "https://opentelemetry.io/docs/concepts/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Google SRE — Monitoring",
          "url": "https://sre.google/sre-book/monitoring-distributed-systems/",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "Observability is about asking new questions of a system. You’ll need access to at least one telemetry stack (Grafana, Datadog, CloudWatch, Honeycomb, etc.) or a demo.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "obs-logs",
      "phase": "A · Pillars",
      "level": "beginner",
      "title": "Logs that help",
      "minutes": 35,
      "durationLabel": "Week 1",
      "overview": "Structured logs beat string soup. Correlation IDs stitch requests. Levels matter. PII doesn’t belong.",
      "learn": [
        "Structured logging",
        "Correlation IDs",
        "Query patterns"
      ],
      "steps": [
        {
          "title": "Trace one request in logs",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Reproduce a flow in staging. Copy a request/correlation id. Find all related lines.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Timestamp range",
            "Service name",
            "Correlation / trace id",
            "Error fields"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One request reconstructed from logs"
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Structured logs beat string soup. Correlation IDs stitch requests. Levels matter. PII doesn’t belong.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "obs-metrics",
      "phase": "A · Pillars",
      "level": "beginner",
      "title": "Metrics & dashboards",
      "minutes": 35,
      "overview": "RED (Rate, Errors, Duration) and USE (Utilization, Saturation, Errors). Prefer percentiles. Know gold signals.",
      "learn": [
        "RED/USE",
        "Cardinality caution",
        "Dashboard reading"
      ],
      "steps": [
        {
          "title": "Read a service dashboard",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Screenshot or note: RPS, error rate, p95 latency during a quiet and a busy window.",
          "tip": "A flat average with spiky p99 means someone is hurting.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Quiet vs busy notes"
      ],
      "resources": [
        {
          "type": "article",
          "name": "RED method",
          "url": "https://www.weave.works/blog/the-red-method-key-metrics-for-microservices-architecture/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "RED (Rate, Errors, Duration) and USE (Utilization, Saturation, Errors). Prefer percentiles. Know gold signals.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "obs-traces",
      "phase": "A · Pillars",
      "level": "intermediate",
      "title": "Distributed traces",
      "minutes": 40,
      "overview": "Spans show where time went across services. Find the slow parent. Spot errors mid-trace.",
      "learn": [
        "Spans",
        "Waterfalls",
        "Trace↔log links"
      ],
      "steps": [
        {
          "title": "Open one slow trace",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Pick a high-latency request. Identify the longest span. Write the bottleneck hypothesis.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Slow trace analyzed"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "OpenTelemetry traces",
          "url": "https://opentelemetry.io/docs/concepts/signals/traces/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Spans show where time went across services. Find the slow parent. Spot errors mid-trace.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "obs-cp1",
      "kind": "checkpoint",
      "phase": "A · Pillars",
      "level": "intermediate",
      "title": "Checkpoint: three-pillar story",
      "minutes": 45,
      "durationLabel": "Gate",
      "overview": "Tell one user problem using logs + metrics + traces together.",
      "learn": [
        "Narrative diagnosis"
      ],
      "steps": [
        {
          "title": "Incident storyboard",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "1–2 pages: symptom → signals → hypothesis → next check.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Storyboard shared with an eng/SRE"
      ],
      "parentId": null,
      "overviewText": "Tell one user problem using logs + metrics + traces together.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "obs-slis",
      "phase": "B · Quality signals",
      "level": "intermediate",
      "title": "SLIs for features you test",
      "minutes": 35,
      "durationLabel": "Week 2",
      "overview": "Partner with eng to know what “good” looks like for a journey. Testing without signals is flying blind after release.",
      "learn": [
        "Feature SLIs",
        "Alert vs board",
        "Synthetic checks"
      ],
      "steps": [
        {
          "title": "Propose SLIs",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "For one feature: 2–3 SLIs and where you’d look on day-two after ship.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "SLI proposal written"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "SRE — SLOs",
          "url": "https://sre.google/sre-book/service-level-objectives/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Partner with eng to know what “good” looks like for a journey. Testing without signals is flying blind after release.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "obs-incidents",
      "phase": "B · Quality signals",
      "level": "intermediate",
      "title": "Incident reading for QA",
      "minutes": 30,
      "overview": "During incidents: don’t spam chat. Provide repro, scope, and customer impact. After: verify fixes and regressions.",
      "learn": [
        "Comms hygiene",
        "Verification",
        "Postmortem input"
      ],
      "steps": [
        {
          "title": "Shadow or simulate",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a perfect QA update for a fictional Sev-2 using the template.",
          "tip": null,
          "code": "Impact: …\nScope (who/what): …\nRepro: …\nStarted / still occurring: …\nWorkaround: …\nNext check I’ll run: …",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Template filled once"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "During incidents: don’t spam chat. Provide repro, scope, and customer impact. After: verify fixes and regressions.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "obs-gaps",
      "phase": "C · Improve",
      "level": "advanced",
      "title": "Spot observability gaps",
      "minutes": 30,
      "durationLabel": "Week 3",
      "overview": "Missing IDs, uncorrelated services, dashboards without owners, alerts that cry wolf. File gaps like bugs.",
      "learn": [
        "Gap taxonomy",
        "Advocacy"
      ],
      "steps": [
        {
          "title": "Gap list",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Find 3 gaps while testing. File or note them with user impact.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Three gaps documented"
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Missing IDs, uncorrelated services, dashboards without owners, alerts that cry wolf. File gaps like bugs.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "obs-cp2",
      "kind": "checkpoint",
      "phase": "C · Improve",
      "level": "advanced",
      "title": "Checkpoint: feature observability brief",
      "minutes": 50,
      "durationLabel": "Capstone",
      "overview": "Brief for one feature: how to validate in prod using telemetry + tests.",
      "learn": [
        "Handoff to team"
      ],
      "steps": [
        {
          "title": "Brief",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Include dashboards, log queries, trace tips, SLIs, known gaps.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Log query cheats",
            "Dashboard links",
            "Example trace",
            "SLIs",
            "Gaps/asks"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Brief published"
      ],
      "note": "Pace: 3–5 weeks. Pair with an SRE once if you can.",
      "parentId": null,
      "overviewText": "Brief for one feature: how to validate in prod using telemetry + tests.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "partIntro": null
    }
  ],
  "resources": {
    "docs": [
      {
        "name": "OpenTelemetry docs",
        "url": "https://opentelemetry.io/docs/"
      },
      {
        "name": "SRE monitoring chapter",
        "url": "https://sre.google/sre-book/monitoring-distributed-systems/"
      }
    ],
    "tools": [
      "Grafana / Datadog / CloudWatch / Honeycomb",
      "jq",
      "Log search UI"
    ],
    "books": [
      "Distributed Systems Observability (Marie) — O’Reilly",
      "SRE Book (Google)"
    ],
    "practice": [
      "Weekly “follow one request” drill",
      "Add obs notes to test plans"
    ],
    "videos": [
      {
        "name": "OTel YouTube",
        "url": "https://www.youtube.com/@otel"
      }
    ]
  }
};
