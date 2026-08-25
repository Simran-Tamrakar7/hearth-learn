/** Chapter body for /manuals/performance-testing. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "performance-testing",
  "title": "Performance Testing Basics",
  "tagline": "k6/JMeter lite, SLIs, load vs soak, and reading graphs without lying to yourself.",
  "category": "quality",
  "accent": "#0F5C4C",
  "cover": "covers/cicd-cover.png",
  "duration": "3–5 weeks",
  "levelSpan": "Beginner → Intermediate",
  "who": "QA and engineers adding performance checks without becoming full-time SREs.",
  "outcomes": [
    "Define SLIs/SLOs for a critical journey",
    "Run basic load and soak tests with k6 or JMeter",
    "Interpret latency, error rate, and saturation graphs"
  ],
  "chapters": [
    {
      "id": "pf-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this path",
      "minutes": 20,
      "durationLabel": "Day 0",
      "overview": "Performance work is dangerous on production. Prefer staging with prod-like data shape. You’ll define user-centric metrics first, tools second.",
      "learn": [
        "Safety rules",
        "Tool choice",
        "Case journey"
      ],
      "steps": [
        {
          "title": "Pick journey + tool",
          "body": "k6 is script-friendly; JMeter is GUI-heavy. Either works for basics.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Name one critical API or page journey. Install k6 or JMeter locally.",
          "tip": "Never load-test production without explicit written approval.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Journey named",
        "Tool installed"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "k6 docs",
          "url": "https://grafana.com/docs/k6/latest/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "JMeter Getting Started",
          "url": "https://jmeter.apache.org/usermanual/get-started.html",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "Performance work is dangerous on production. Prefer staging with prod-like data shape. You’ll define user-centric metrics first, tools second.",
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
      "id": "pf-sli",
      "phase": "A · Define good",
      "level": "beginner",
      "title": "SLIs, SLOs & user perception",
      "minutes": 35,
      "durationLabel": "Week 1",
      "overview": "SLI = what you measure. SLO = target. Latency percentiles (p95/p99) beat averages. Errors and saturation complete the picture.",
      "learn": [
        "Latency percentiles",
        "Availability",
        "Apdex lite"
      ],
      "steps": [
        {
          "title": "Define SLIs",
          "body": "For your journey: success rate, latency p95, maybe throughput.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write SLIs + draft SLO (e.g. p95 < 500ms at X RPS). Note confidence.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Latency — p50/p95/p99",
            "Errors — 5xx / business failures",
            "Saturation — CPU, pool, queue depth"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "SLI/SLO draft"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "Google SRE — SLIs/SLOs",
          "url": "https://sre.google/sre-book/service-level-objectives/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "SLI = what you measure. SLO = target. Latency percentiles (p95/p99) beat averages. Errors and saturation complete the picture.",
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
      "id": "pf-types",
      "phase": "A · Define good",
      "level": "beginner",
      "title": "Load, stress, soak, spike",
      "minutes": 30,
      "overview": "Load = expected traffic. Stress = find breaking point. Soak = endurance/leaks. Spike = sudden surge. Pick the question first.",
      "learn": [
        "Test types",
        "Arrival patterns",
        "Warm-up"
      ],
      "steps": [
        {
          "title": "Match question → type",
          "body": "“Can we handle Black Friday?” vs “Do we leak over 4 hours?”",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write one question for each of the four types for your product.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Four questions written"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Load = expected traffic. Stress = find breaking point. Soak = endurance/leaks. Spike = sudden surge. Pick the question first.",
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
      "id": "pf-k6",
      "phase": "B · Execute",
      "level": "intermediate",
      "title": "Script a load test (k6 lite)",
      "minutes": 45,
      "durationLabel": "Week 2",
      "overview": "Virtual users, thresholds, stages. Start tiny. Grow. Watch errors before celebrating RPS.",
      "learn": [
        "VUs & iterations",
        "Thresholds",
        "Stages"
      ],
      "steps": [
        {
          "title": "First script",
          "body": "HIT a safe endpoint. Check status. Threshold on http_req_failed and p95.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run a 1-minute smoke. Then a small load stage.",
          "tip": "Use test.k6.io or your staging — not random public sites at scale.",
          "code": "import http from 'k6/http';\nimport { check, sleep } from 'k6';\n\nexport const options = {\n  stages: [\n    { duration: '30s', target: 5 },\n    { duration: '1m', target: 5 },\n    { duration: '30s', target: 0 },\n  ],\n  thresholds: {\n    http_req_failed: ['rate<0.01'],\n    http_req_duration: ['p(95)<800'],\n  },\n};\n\nexport default function () {\n  const res = http.get('https://test.k6.io');\n  check(res, { 'status 200': (r) => r.status === 200 });\n  sleep(1);\n}",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Smoke + small load run saved"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "k6 — Thresholds",
          "url": "https://grafana.com/docs/k6/latest/using-k6/thresholds/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "k6 — Stages",
          "url": "https://grafana.com/docs/k6/latest/using-k6/stages-options/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Virtual users, thresholds, stages. Start tiny. Grow. Watch errors before celebrating RPS.",
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
      "id": "pf-jmeter",
      "phase": "B · Execute",
      "level": "intermediate",
      "title": "JMeter lite alternative",
      "minutes": 35,
      "overview": "Thread groups, HTTP samplers, listeners. Same ideas as k6 — different UI. Skim if you already prefer k6.",
      "learn": [
        "Thread groups",
        "Assertions",
        "Reporting"
      ],
      "steps": [
        {
          "title": "Minimal plan",
          "body": "One thread group, one sampler, one assertion, summary report.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run an equivalent smoke to your k6 script (or primary tool only).",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "JMeter smoke OR deliberate skip logged"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "JMeter best practices",
          "url": "https://jmeter.apache.org/usermanual/best-practices.html",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Thread groups, HTTP samplers, listeners. Same ideas as k6 — different UI. Skim if you already prefer k6.",
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
      "id": "pf-graphs",
      "phase": "B · Execute",
      "level": "intermediate",
      "title": "Reading graphs honestly",
      "minutes": 35,
      "overview": "Correlate latency, errors, and system metrics. Averages hide pain. Coordinate drops. Watch for coordinated omission and client-side bottlenecks.",
      "learn": [
        "Percentile graphs",
        "Error correlation",
        "Bottleneck hypotheses"
      ],
      "steps": [
        {
          "title": "Read a run",
          "body": "When p95 climbs, do errors climb? Is CPU maxed? DB locks?",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Annotate one test run: hypothesis for the bottleneck in 3 bullets.",
          "tip": "If the load generator is saturated, you’re measuring your laptop.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Annotated run with hypothesis"
      ],
      "resources": [
        {
          "type": "article",
          "name": "Latency numbers & percentiles",
          "url": "https://bravenewgeek.com/everything-you-know-about-latency-is-wrong/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Correlate latency, errors, and system metrics. Averages hide pain. Coordinate drops. Watch for coordinated omission and client-side bottlenecks.",
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
      "id": "pf-cp1",
      "kind": "checkpoint",
      "phase": "B · Execute",
      "level": "intermediate",
      "title": "Checkpoint: load report",
      "minutes": 45,
      "durationLabel": "Gate",
      "overview": "Deliver a short report: setup, SLOs, results graphs, pass/fail, next risks.",
      "learn": [
        "Reporting"
      ],
      "steps": [
        {
          "title": "Write the report",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "2 pages max. Include command/script link and env notes.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Report shared",
        "Pass/fail vs SLO explicit"
      ],
      "parentId": null,
      "overviewText": "Deliver a short report: setup, SLOs, results graphs, pass/fail, next risks.",
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
      "id": "pf-soak",
      "phase": "C · Deeper",
      "level": "advanced",
      "title": "Soak & regression habits",
      "minutes": 35,
      "durationLabel": "Week 3",
      "overview": "Soak finds leaks and degradation. Baseline regularly. Gate CI with smoke thresholds, not full Black Friday sims.",
      "learn": [
        "Soak design",
        "Baseline",
        "CI smoke perf"
      ],
      "steps": [
        {
          "title": "Design a soak",
          "body": "Modest load, long duration, watch memory and p95 drift.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a soak plan (even if you only run 20 min as practice).",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "CI smoke",
          "body": "Tiny VU count, strict fail on errors — catch obvious regressions.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Propose one CI performance smoke for a critical endpoint.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Soak plan",
        "CI smoke proposal"
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Soak finds leaks and degradation. Baseline regularly. Gate CI with smoke thresholds, not full Black Friday sims.",
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
      "id": "pf-cp2",
      "kind": "checkpoint",
      "phase": "C · Deeper",
      "level": "advanced",
      "title": "Checkpoint: perf starter kit",
      "minutes": 50,
      "durationLabel": "Capstone",
      "overview": "Kit: SLIs/SLOs, script, one load report, soak plan, graph-reading notes.",
      "learn": [
        "Team handoff"
      ],
      "steps": [
        {
          "title": "Publish kit",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Put in repo README. Demo a run live or recorded.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "SLI/SLO doc",
            "Runnable script",
            "Load report",
            "Soak plan",
            "Safety / approval notes"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Kit published",
        "Demo done"
      ],
      "note": "Pace: 3–5 weeks. Correct questions beat fancy tools.",
      "parentId": null,
      "overviewText": "Kit: SLIs/SLOs, script, one load report, soak plan, graph-reading notes.",
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
        "name": "k6 documentation",
        "url": "https://grafana.com/docs/k6/latest/"
      },
      {
        "name": "JMeter user manual",
        "url": "https://jmeter.apache.org/usermanual/get-started.html"
      },
      {
        "name": "Google SRE — SLOs",
        "url": "https://sre.google/sre-book/service-level-objectives/"
      }
    ],
    "tools": [
      "k6",
      "Apache JMeter",
      "Grafana / Cloud observability",
      "Browser DevTools Performance"
    ],
    "books": [
      "Systems Performance (Gregg) — selective",
      "Site Reliability Engineering (Google) — SLO chapters"
    ],
    "practice": [
      "Weekly smoke load on staging",
      "Compare p95 week over week"
    ],
    "videos": [
      {
        "name": "k6 YouTube intro",
        "url": "https://www.youtube.com/@k6io"
      }
    ]
  }
};
