import type { ChapterRecord } from "../../../types";

/** Chaos Testing */
export const chapter = {
  "id": "tt-chaos-testing",
  "overlayNo": 54,
  "title": "Chaos Testing",
  "minutes": 25,
  "level": "advanced",
  "phase": "Part 14 · Advanced Resilience, Chaos & Contracts",
  "partName": "Part 14 · Advanced Resilience, Chaos & Contracts",
  "overviewText": "Chaos testing deliberately and continuously injects real failures into a live (typically production or production-like) system — killing services, introducing network latency, taking down dependencies — as an ongoing practice, verifying the system's actual resilience under real, unpredictable conditions rather than assuming resilience based on architecture alone.",
  "why": "Distributed systems fail in ways that are extremely difficult to predict from architecture diagrams or code review alone — a service that's supposed to fail over gracefully might not, in practice, until it's actually tested by deliberately breaking it in a real, running environment. Chaos testing (an evolution of recovery testing, Chapter 24, applied continuously and often directly in production) builds genuine confidence in resilience by proving it under real conditions, rather than hoping the theoretical design holds up.",
  "when": "For mature systems with real production traffic and enough infrastructure sophistication to safely inject controlled failure — typically an advanced practice adopted once basic reliability and recovery testing (Chapters 20, 24) are already well established, not a starting point for a young or fragile system.",
  "practical": {
    "app": "HRMS Payroll Service Redundancy",
    "scenario": "Chaos Monkey is configured to randomly terminate one of three redundant payroll-service instances during a controlled testing window.",
    "pass": "Health check intervals are tightened, and a repeat test shows failover now completes within 5 seconds, with zero failed requests during the same instance termination — genuine, tested resilience rather than an untested assumption.",
    "fail": "Terminating one instance causes a brief but real spike in failed requests — the load balancer takes 45 seconds to detect the failure and reroute traffic, longer than the assumed near-instant failover the team believed was in place."
  },
  "advantages": [
    "Proves real resilience under actual failure conditions, not just theoretical resilience based on architecture design",
    "Surfaces single points of failure believed to be redundant before they cause a real uncontrolled outage",
    "Builds an engineering culture around designing for failure as the default expectation",
    "Netflix's long track record demonstrates proven effectiveness in large-scale cloud systems"
  ],
  "limitations": [
    "Genuinely risky if run without sufficient automated monitoring, health checks, and rollback safety nets",
    "Requires mature cloud infrastructure (Kubernetes, AWS Auto Scaling, multi-zone redundancy)",
    "Not appropriate for early-stage or fragile architectures",
    "Requires explicit organizational buy-in for production-level experiments"
  ],
  "tools": [
    {
      "name": "Chaos Monkey by Netflix",
      "sub": "Cloud Infrastructure Resilience & Pod Termination Engine",
      "url": "https://github.com/Netflix/chaosmonkey",
      "desc": "Netflix's original open-source chaos engineering tool — randomly and automatically terminates instances/services within a production environment during business hours, on the principle that engineers should build systems resilient enough to handle random failure as a matter of course.",
      "adv": [
        "Forces architectural redundancy to be built into all microservices by default",
        "Configurable schedules (runs only during office hours when engineers are on hand)",
        "Integrates natively with AWS EC2 Auto Scaling Groups and Spinnaker"
      ],
      "lim": [
        "Requires mature multi-instance cloud deployments"
      ],
      "steps": [
        {
          "t": "Step 1 — Configure Chaos Monkey schedule and eligible cluster targets",
          "p": "Define targets in chaosmonkey.toml with bounded blast radius.",
          "c": "[chaosmonkey]\nenabled = true\nleashed = true\nschedule = \"0 9-15 * * 1-5\"\n[clusters]\ninclude = [\"hrms-payroll-service\"]"
        },
        {
          "t": "Step 2 — Trigger controlled container/VM termination during business hours",
          "p": "Chaos Monkey terminates payroll-service-pod-2.",
          "c": "Chaos Monkey Event: Terminated instance i-0a823bf91 (payroll-service)\nAction: Kubernetes replica controller provisions replacement pod within 4.2s"
        },
        {
          "t": "Step 3 — Verify zero dropped user requests in APM telemetry",
          "p": "Inspect Datadog/Prometheus metrics for HTTP 502/503 errors during pod death.",
          "c": "Result: Load balancer rerouted traffic to remaining 2 pods | Error Rate: 0.00% | Latency P99: +12ms -> PASS"
        }
      ]
    }
  ],
  "contentMarkdown": "## Automated Instance & Pod Failure Injection\n\nSchedule randomized pod terminations against multi-replica Kubernetes clusters observing zero-downtime failover.\n\n```\nkubectl delete pod -l app=hrms-payroll --grace-period=0 --force\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
