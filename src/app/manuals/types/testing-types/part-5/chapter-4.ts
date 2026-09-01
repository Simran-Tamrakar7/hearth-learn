import type { ChapterRecord } from "../../../types";

/** Reliability Testing */
export const chapter = {
  "id": "tt-reliability-testing",
  "overlayNo": 20,
  "title": "Reliability Testing",
  "minutes": 25,
  "level": "advanced",
  "phase": "Part 5 · Non-Functional",
  "partName": "Part 5 · Non-Functional",
  "overviewText": "Reliability testing verifies that an application continues to function correctly over an extended, continuous period of real-world-like usage — checking for the slow degradation, resource leaks, and intermittent failures that only show up over time, not in a single short test run.",
  "why": "Some problems simply don't appear in a quick test — a memory leak that's invisible after five minutes can crash a server after five days; a background job that occasionally fails silently might go unnoticed until it's failed hundreds of times. Reliability testing answers a question none of the other non-functional tests do: not 'is it fast' or 'does it break under load,' but 'does it keep working, correctly, hour after hour, day after day.'",
  "when": "Before launch for any system expected to run continuously (most production systems), and especially before releases introducing long-running processes, background jobs, or caching layers — run as an extended soak test over hours or days rather than a short pass/fail check.",
  "practical": {
    "app": "HRMS Background Payroll Job",
    "scenario": "A background job that recalculates payroll totals nightly is soak-tested by running it continuously, once per hour, for 72 hours in a staging environment instead of just once.",
    "pass": "With the connection properly closed, memory usage returns to baseline after each run and stays flat across the full 72-hour soak test.",
    "fail": "Memory usage climbs steadily with each run and never releases, and by hour 60 the job starts failing outright — a connection object was never being closed after each run."
  },
  "advantages": [
    "Catches slow-building problems (memory leaks, connection exhaustion, gradual degradation) invisible to short tests",
    "Soak testing gives confidence the system can run unattended for real production durations, not just survive a demo",
    "Uptime Kuma provides ongoing, long-term visibility rather than a one-time snapshot",
    "Correlating downtime/latency spikes with deployment history turns reliability into an actionable, trackable metric"
  ],
  "limitations": [
    "Inherently time-consuming — a meaningful soak test takes hours or days, not minutes, to produce a useful signal",
    "Requires a stable, dedicated test environment tied up for the full duration of the run",
    "A slow leak may need an even longer run than initially planned to become clearly visible in the data",
    "Uptime monitoring shows that something degraded, not automatically why — it still needs follow-up investigation (logs, profiling) to find the root cause"
  ],
  "tools": [
    {
      "name": "Apache JMeter",
      "sub": "Extended Soak & Memory Leak Detection",
      "url": "https://jmeter.apache.org",
      "seeChapter": 14,
      "desc": "The same load-testing tool from Chapter 14 (see Chapter 14), reused here not for a short burst but for a sustained, moderate, continuous load run over many hours, specifically watching for degradation over time rather than an immediate breaking point.",
      "adv": [
        "Simulates steady realistic background traffic over hours or days",
        "Exposes unclosed database connections and thread deadlocks",
        "Automated generation of response time trend graphs"
      ],
      "lim": [
        "Requires dedicated staging infrastructure during test window"
      ],
      "steps": [
        {
          "t": "Step 1 — Configure moderate steady thread group",
          "p": "Configure 50 virtual users with constant throughput rather than an escalating ramp.",
          "c": "Thread Group:\n- Users: 50 VUs\n- Constant Throughput: 120 req/min\n- Duration: 86400 seconds (24 Hours)"
        },
        {
          "t": "Step 2 — Monitor server memory & CPU consumption",
          "p": "Attach Prometheus/Grafana or Node.js process monitor to track heap allocation.",
          "c": "Monitoring: process.memoryUsage().heapUsed recorded every 60 seconds"
        },
        {
          "t": "Step 3 — Analyze response time drift",
          "p": "Compare 95th percentile latency in Hour 1 vs Hour 24.",
          "c": "Hour 01 Latency: 180ms\nHour 12 Latency: 185ms\nHour 24 Latency: 182ms -> Flat curve (No degradation)"
        },
        {
          "t": "Step 4 — Verify zero connection exhaustion",
          "p": "Confirm database connection pool returns all leased connections to pool.",
          "c": "Active Postgres Connections: Constant 8/20 pool size across 24 hours -> PASS"
        }
      ]
    },
    {
      "name": "Uptime Kuma",
      "sub": "Self-Hosted Uptime & SLA Monitor",
      "url": "https://github.com/louislam/uptime-kuma",
      "desc": "A free, self-hostable uptime monitoring tool that continuously pings an application's endpoints and tracks availability, response time, and downtime over days, weeks, or months — reliability observed through real, ongoing operation rather than a single test.",
      "adv": [
        "100% free, open-source, and self-hostable via Docker in under 2 minutes",
        "Supports HTTP/HTTPS, TCP, Ping, DNS, and keyword validation",
        "Beautiful status pages and instant multi-channel alerts (Slack, Discord, Email, Webhook)",
        "Calculates 24h, 30-day, and 1-year uptime percentages with certificate expiry tracking"
      ],
      "lim": [
        "Requires hosting server to run monitor continuously"
      ],
      "steps": [
        {
          "t": "Step 1 — Deploy Uptime Kuma via Docker",
          "p": "Run single container instance on monitoring server.",
          "c": "docker run -d --restart=always -p 3001:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:1"
        },
        {
          "t": "Step 2 — Add application monitors & keyword checks",
          "p": "Monitor healthcheck endpoint /api/health and assert status 200 with JSON payload {\"status\":\"ok\"}.",
          "c": "Monitor Type: HTTP(s) - Keyword\nURL: https://hrms-app.com/api/health\nInterval: 60 seconds\nKeyword: \"status\":\"ok\""
        },
        {
          "t": "Step 3 — Configure instant alert notifications",
          "p": "Set up Webhook or Slack alerts if an endpoint fails 3 consecutive checks.",
          "c": "Alert Channels: Slack #alerts-devops, Telegram Bot, PagerDuty"
        },
        {
          "t": "Step 4 — Track 30-day SLA and correlate with releases",
          "p": "Inspect uptime graph (99.98%) and review response time spikes following code deployments.",
          "c": "Monthly Uptime: 99.98% | Mean Response Time: 142ms | Total Downtime: 8 mins"
        }
      ]
    }
  ],
  "contentMarkdown": "## Soak Testing & Uptime Monitoring\n\nExecute extended soak tests to surface memory leaks and monitor production uptime SLAs.\n\n```\ndocker run -d -p 3001:3001 louislam/uptime-kuma:1\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
