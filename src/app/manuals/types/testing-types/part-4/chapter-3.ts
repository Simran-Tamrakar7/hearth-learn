import type { ChapterRecord } from "../../types";

/** Stress Testing */
export const chapter = {
  "id": "tt-stress-testing",
  "overlayNo": 15,
  "title": "Stress Testing",
  "minutes": 25,
  "level": "advanced",
  "phase": "Part 4 · Non-Functional",
  "partName": "Part 4 · Non-Functional",
  "overviewText": "Stress testing pushes the application beyond its expected normal load — well past the numbers load testing confirmed as acceptable — deliberately looking for the breaking point, and just as importantly, how the system fails and whether it recovers gracefully once the excess load is removed.",
  "why": "Real traffic doesn't always stay within expected bounds — a viral moment, a bot attack, a mistaken bulk operation, or simply underestimated growth can push load far past what was planned for. Stress testing answers a different question than load testing: not 'does it work at expected load' but 'what happens when that's exceeded, and does it fail safely or catastrophically.'",
  "when": "After load testing has established the normal-capacity baseline, specifically to find the ceiling above it — before launches with unpredictable traffic potential, and periodically to make sure the failure mode (crash vs. graceful degradation vs. queuing) is still what the team expects as the system evolves.",
  "practical": {
    "app": "HRMS Login Endpoint Under Stress",
    "scenario": "Building on the 300-user load test baseline, a stress test ramps concurrent users continuously past that point to find where the login endpoint actually breaks.",
    "pass": "At approximately 650 concurrent users, database connection pool is exhausted and new login attempts return 503 errors — existing sessions remain unaffected and app recovers within 30 seconds once load drops below 400.",
    "fail": "Server memory leak causes kernel panic and persistent database corruption at 500 users, requiring manual container restarts — a catastrophic failure mode caught safely in stress testing."
  },
  "advantages": [
    "Reveals the actual breaking point rather than assuming capacity based on load testing alone",
    "Exposes failure mode — a system that fails gracefully (clear errors, queuing) is far safer than one that crashes outright",
    "Confirms whether the system recovers cleanly once excess load is removed, which matters as much as the breaking point itself",
    "Gives infrastructure and on-call teams concrete numbers to plan and alert around"
  ],
  "limitations": [
    "Deliberately destabilizes the system under test — never run against production without careful isolation or a maintenance window",
    "Finding the exact breaking point takes iterative tuning, more time-consuming than a fixed load test",
    "Results can be affected by shared infrastructure (databases, third-party APIs) that aren't dedicated to the test",
    "A confirmed ceiling today can shift as the application and its dependencies change, requiring periodic re-testing"
  ],
  "tools": [
    {
      "name": "Apache JMeter",
      "sub": "Ramp-Up Stress Simulation",
      "url": "https://jmeter.apache.org",
      "seeChapter": 14,
      "desc": "JMeter works identically for stress testing as for load testing (see Chapter 14) — the only difference is intent and configuration: configuring the Thread Group to climb aggressively beyond the 300-user baseline until the server degrades.",
      "adv": [
        "Reveals the actual breaking point rather than assuming capacity based on load testing alone",
        "Exposes failure mode — a system that fails gracefully (clear errors, queuing) is far safer than one that crashes outright",
        "Confirms whether the system recovers cleanly once excess load is removed",
        "Gives infrastructure and on-call teams concrete numbers to plan and alert around"
      ],
      "lim": [
        "Deliberately destabilizes the system under test — requires isolated staging environment",
        "Finding the exact breaking point takes iterative tuning",
        "Results can be affected by shared infrastructure",
        "Confirmed ceiling shifts as code and dependencies change"
      ],
      "steps": [
        {
          "t": "Step 1 — Start from load-tested baseline",
          "p": "Load test verified 300 concurrent users as acceptable baseline.",
          "c": "Baseline: 300 users @ 1.4s response time"
        },
        {
          "t": "Step 2 — Configure aggressive stepping thread group",
          "p": "Add 100 virtual users every 60 seconds up to 1000 users.",
          "c": "Schedule: 300 -> 400 -> 500 -> 600 -> 700 -> 800 -> 900 -> 1000 VUs"
        },
        {
          "t": "Step 3 — Monitor breaking point indicators",
          "p": "Track point where response times spike (>5s) and 5xx errors begin occurring.",
          "c": "Breaking Point: At 650 VUs, response times spike to 8.2s and 503 Service Unavailable begins"
        },
        {
          "t": "Step 4 — Evaluate failure mode",
          "p": "Verify system returns HTTP 503 gracefully without server process crash.",
          "c": "Failure Mode: 503 (Connection pool exhausted) - Web process remained active"
        },
        {
          "t": "Step 5 — Ramp down load and observe recovery",
          "p": "Drop load back to 300 VUs and confirm response times recover within 30 seconds.",
          "c": "Recovery: Response time normalized to 1.3s in 24 seconds -> PASS"
        }
      ]
    },
    {
      "name": "k6",
      "sub": "Spike & Breaking-Point Stages",
      "url": "https://k6.io",
      "seeChapter": 14,
      "desc": "Using k6's code-driven stages (see Chapter 14), you can define a stress test that continuously increases virtual users until the system hits its threshold.",
      "adv": [
        "Code-based scripts are readable, version-controllable, and fit naturally into CI/CD",
        "Lightweight — far lower resource usage than JMeter for generating the same load",
        "Built-in threshold checks let the test itself pass/fail automatically against defined SLAs",
        "Clean, modern JavaScript API with a shallow learning curve for developers"
      ],
      "lim": [
        "Free/open-source tier lacks a built-in GUI",
        "Distributed, large-scale load generation across multiple machines requires the paid Cloud offering",
        "JavaScript-only test scripting"
      ],
      "steps": [
        {
          "t": "Step 1 — Configure stress stages in k6 script",
          "p": "Define progressive multi-stage climb well past normal load capacity.",
          "c": "const options = {\n  stages: [\n    { duration: '2m', target: 300 }, // normal baseline\n    { duration: '5m', target: 600 }, // stress level 1\n    { duration: '5m', target: 900 }, // stress level 2 (breaking point)\n    { duration: '2m', target: 300 }, // ramp down to test recovery\n    { duration: '1m', target: 0 },\n  ],\n};"
        },
        {
          "t": "Step 2 — Execute stress run and pipe metrics",
          "p": "Run k6 with live terminal charts.",
          "c": "k6 run --out influxdb=http://localhost:8086/k6 stress-test.js"
        },
        {
          "t": "Step 3 — Document safe operational ceiling",
          "p": "Establish maximum safe ceiling at 550 VUs with alerts triggered at 500.",
          "c": "Recommendation: Set autoscaling trigger at 450 VUs; alert at 500 VUs"
        }
      ]
    }
  ],
  "contentMarkdown": "## Breaking-Point & Recovery Profiling\n\nSubject infrastructure to extreme traffic spikes and evaluate self-healing and graceful degradation.\n\n```\nk6 run stress-test.js\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
