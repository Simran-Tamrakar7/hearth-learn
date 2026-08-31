---
id: "tt-uptime-availability-testing"
title: "Uptime / Availability Testing"
minutes: 15
partName: "Part 11 · Operational, Infrastructure & Site Health"
level: "beginner"
---

Uptime and availability testing continuously monitors whether an application (or specific critical endpoints) is actually reachable and responding correctly, over time, from external vantage points — tracking real-world availability as an ongoing metric rather than a one-time pass/fail test.

## Automated 24/7 Availability & Latency Monitoring

Deploy external heartbeat monitors executing regular ping and HTTP body assertions against core user journeys.

```
curl -X POST https://api.uptimerobot.com/v2/newMonitor -d "api_key=u10-key&type=1&url=https://hrms.company.com"
```