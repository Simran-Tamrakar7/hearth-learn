import type { ChapterRecord } from "../../types";

/** Uptime / Availability Testing */
export const chapter = {
  "id": "tt-uptime-availability-testing",
  "overlayNo": 42,
  "title": "Uptime / Availability Testing",
  "minutes": 15,
  "level": "beginner",
  "phase": "Part 11 · Operational, Infrastructure & Site Health",
  "partName": "Part 11 · Operational, Infrastructure & Site Health",
  "overviewText": "Uptime and availability testing continuously monitors whether an application (or specific critical endpoints) is actually reachable and responding correctly, over time, from external vantage points — tracking real-world availability as an ongoing metric rather than a one-time pass/fail test.",
  "why": "An application can pass every functional and performance test and still go down in production due to infrastructure failure, a bad deploy, a certificate expiring, or a dependency outage — and without active external monitoring, the team may not find out until a user reports it, which is far slower and far more damaging than catching it immediately. Uptime testing turns availability from an assumption into a continuously measured, alertable fact.",
  "when": "Continuously, in production, from the moment an application goes live — this isn't a pre-release test type at all, but an ongoing operational practice that should run for the entire lifetime of the application.",
  "practical": {
    "app": "HRMS Login Endpoint Outage",
    "scenario": "UptimeRobot, monitoring the HRMS login endpoint every 5 minutes, detects a failure.",
    "pass": "The team rolls back the deploy immediately based on the automated alert, avoiding what would otherwise have been a morning-long outage discovered only through user complaints.",
    "fail": "An alert fires within 5 minutes of a bad deploy taking down the login endpoint — well before the next morning's login surge, and well before any user had a chance to report it."
  },
  "advantages": [
    "Continuous, always-on monitoring catches outages the moment they happen, rather than waiting for a user report",
    "Free tiers are genuinely usable for small-to-mid scale applications, with no infrastructure to self-host",
    "Historical uptime data gives a concrete, trackable reliability metric over time, not just anecdotal impressions",
    "SSL expiration monitoring (StatusCake) catches a specific, entirely preventable class of outage before it happens"
  ],
  "limitations": [
    "Free tier check intervals (e.g. every 5 minutes) mean brief transient outages can go briefly undetected",
    "Simple HTTP status pings don't verify deep functional workflows — a page can return 200 while UI logic fails",
    "Doesn't diagnose root causes, only flags that an outage occurred — requires APM/logs for debugging",
    "Public status pages require active human communication during major incidents"
  ],
  "tools": [
    {
      "name": "UptimeRobot",
      "sub": "Cloud Uptime & API Endpoint Heartbeat Monitor",
      "url": "https://uptimerobot.com",
      "desc": "A free uptime monitoring service that pings a specified URL or endpoint at a regular interval (as frequently as every 5 minutes on the free tier) and sends alerts the moment a check fails, tracking uptime percentage and response time history over time.",
      "adv": [
        "50 free monitors with 5-minute interval check cadence",
        "Multi-channel alerting via Slack, Discord, Microsoft Teams, Webhooks, SMS, and Email",
        "Free hosted public status page for incident communication",
        "HTTP keyword matching (verifies response body text, not just status 200)"
      ],
      "lim": [
        "1-minute check intervals require paid tier"
      ],
      "steps": [
        {
          "t": "Step 1 — Create HTTP(s) and Keyword monitors",
          "p": "Add critical endpoints with response assertion checks.",
          "c": "Monitor Type: HTTP(s) Keyword\nURL: https://hrms.company.com/api/health\nKeyword to find: \"status\":\"healthy\"\nInterval: 5 minutes"
        },
        {
          "t": "Step 2 — Configure alerting integrations for on-call teams",
          "p": "Set up webhook dispatch to Slack #engineering-alerts and PagerDuty.",
          "c": "Alert Contact: Webhook -> https://hooks.slack.com/services/T00/B00/X00\nThreshold: Alert when down for 1 check cycle"
        },
        {
          "t": "Step 3 — Deploy public status page",
          "p": "Publish transparent status dashboard at status.company.com.",
          "c": "Status Page: https://status.company.com\nMetrics: 99.98% 30-Day Uptime | Avg Response Time: 142ms"
        }
      ]
    },
    {
      "name": "StatusCake",
      "sub": "Global Multi-Location Uptime & SSL Expiration Sentinel",
      "url": "https://statuscake.com",
      "desc": "A free uptime and performance monitoring service, additionally offering multi-location checks (verifying reachability from several global regions, not just one) and basic SSL certificate expiration monitoring on its free tier.",
      "adv": [
        "Global test probes across North America, Europe, Asia, and Australia",
        "Automated SSL certificate expiration alerts 30 days and 7 days prior to expiry",
        "Page speed and server response time historical tracking"
      ],
      "lim": [
        "Free tier limits total test count to 10 monitors"
      ],
      "steps": [
        {
          "t": "Step 1 — Configure Multi-Location Uptime Check",
          "p": "Verify reachability from globally distributed test nodes.",
          "c": "Target: https://hrms.company.com\nLocations: US East, London, Singapore, Sydney\nRule: Trigger alert only if 2+ locations report failure (prevent false alarms)"
        },
        {
          "t": "Step 2 — Enable SSL Expiry Sentinel",
          "p": "Configure automated notification 14 days before certificate expiration.",
          "c": "SSL Check: hrms.company.com\nIssuer: Let's Encrypt | Expiry: 48 days remaining | Alert trigger: <= 14 days"
        }
      ]
    }
  ],
  "contentMarkdown": "## Automated 24/7 Availability & Latency Monitoring\n\nDeploy external heartbeat monitors executing regular ping and HTTP body assertions against core user journeys.\n\n```\ncurl -X POST https://api.uptimerobot.com/v2/newMonitor -d \"api_key=u10-key&type=1&url=https://hrms.company.com\"\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
