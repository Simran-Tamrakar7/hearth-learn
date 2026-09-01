import type { ChapterRecord } from "../../../types";

/** Recovery Testing */
export const chapter = {
  "id": "tt-recovery-testing",
  "overlayNo": 24,
  "title": "Recovery Testing",
  "minutes": 25,
  "level": "advanced",
  "phase": "Part 6 · Other Testing Types",
  "partName": "Part 6 · Other Testing Types",
  "overviewText": "Recovery testing deliberately induces failure — killing a server process, cutting a database connection, forcing a crash mid-operation — to verify that the application recovers correctly afterward, without data loss or corruption, rather than assuming failures simply won't happen.",
  "why": "Failures happen regardless of how well an application is built — servers restart, networks drop, dependencies go down. What separates a resilient system from a fragile one isn't whether failure occurs, but what happens next: does the system recover cleanly with data intact, or does it corrupt data, lose in-progress work, or require manual intervention to bring back online? Recovery testing answers that question deliberately, before a real outage forces the answer on the team.",
  "when": "Before launch for any system where downtime or data loss would be costly, and periodically afterward — especially after infrastructure changes (new caching layer, new database replication setup) that could change how the system behaves during a failure.",
  "practical": {
    "app": "HRMS Leave Request Submission",
    "scenario": "A tester kills the application server process midway through a leave request submission, right after the database write but before the confirmation response is sent back to the user.",
    "pass": "A unique submission token prevents the duplicate: the resubmission is recognized as the same request and safely ignored, and the user is shown the original confirmation instead.",
    "fail": "The leave request is saved in the database, but because the user never received confirmation, they resubmit — creating a duplicate request, since there was no safeguard against a repeated submission of the same data."
  },
  "advantages": [
    "Verifies real resilience under actual failure conditions, not just assumed resilience based on code review",
    "Directly tests data integrity guarantees (transactions, rollbacks) under the exact conditions they're meant to protect against",
    "Surfaces failure scenarios that need automatic recovery (retries, failover) versus ones needing better monitoring/alerting for manual response",
    "Builds real confidence and concrete recovery-time expectations for the team, rather than optimistic assumptions"
  ],
  "limitations": [
    "Deliberately destructive — must be run in an isolated staging environment, never against production without extreme care and a maintenance window",
    "Manual approach doesn't scale to testing every possible failure combination — prioritization toward the most critical/likely failures is necessary",
    "Some failure modes (e.g. certain network partition types) are genuinely hard to simulate accurately without specialized chaos-engineering tools",
    "A passing recovery test today doesn't guarantee the same resilience after future architecture changes — needs periodic re-testing"
  ],
  "tools": [
    {
      "name": "Manual Process & Network Interruption",
      "sub": "Forced Process Termination & Database Disconnect",
      "url": "https://en.wikipedia.org/wiki/Fault_tolerance",
      "seeChapter": 5,
      "desc": "Recovery testing at a basic level doesn't require specialized chaos-engineering tooling (see Chapter 5) — a tester or engineer can manually kill a process, disconnect a network cable, or forcibly stop a database mid-transaction, then observe recovery behavior.",
      "adv": [
        "Simulates real unannounced infrastructure outages",
        "Validates database ACID transaction rollbacks under crash conditions",
        "Evaluates client-side retry exponential backoff policies"
      ],
      "lim": [
        "Must strictly execute in dedicated staging/sandbox environments"
      ],
      "steps": [
        {
          "t": "Step 1 — Identify critical transactional workflows",
          "p": "Select multi-step write operations such as payroll processing or bulk employee import.",
          "c": "Target: POST /api/v1/payroll/process (Multi-table batch transaction)"
        },
        {
          "t": "Step 2 — Trigger transaction and force process kill (SIGKILL)",
          "p": "Execute kill -9 on Node.js / Java worker during active batch insertion.",
          "c": "kill -9 $(pgrep -f \"payroll-worker\")"
        },
        {
          "t": "Step 3 — Restart worker service and verify automatic recovery",
          "p": "Start service and observe if orchestrator (e.g. systemd/Kubernetes) heals the container.",
          "c": "systemctl restart hrms-worker\nStatus: Active (Running) within 3.2 seconds"
        },
        {
          "t": "Step 4 — Audit database state for partial writes",
          "p": "Verify Postgres transaction rolled back cleanly without orphan records.",
          "c": "SELECT count(*) FROM payroll_ledger WHERE batch_id = 'b_9812' AND status = 'PARTIAL';\nResult: 0 rows (Transaction rolled back completely -> PASS)"
        },
        {
          "t": "Step 5 — Test idempotency token on client resubmission",
          "p": "Resubmit failed payroll request and verify duplicate is rejected with cached confirmation.",
          "c": "POST /api/v1/payroll/process (Header: Idempotency-Key: idemp_9812)\nResponse: 200 OK (Replayed original transaction confirmation)"
        }
      ]
    },
    {
      "name": "Chaos Engineering Scripts",
      "sub": "Automated Failure Injection & Latency Simulation",
      "url": "https://principlesofchaos.org",
      "desc": "Lightweight bash/docker scripts that periodically inject random network latency, drop database packets, or restart services to test resilience automatically.",
      "adv": [
        "Automates intermittent outage testing",
        "Measures Mean Time to Recovery (MTTR) with objective timers"
      ],
      "lim": [
        "Requires careful isolation to prevent cross-service pollution"
      ],
      "steps": [
        {
          "t": "Step 1 — Inject packet loss with Toxiproxy or Pumba",
          "p": "Simulate 500ms network latency and 20% packet loss between App and Redis cache.",
          "c": "docker run --rm -v /var/run/docker.sock:/var/run/docker.sock gaiaadm/pumba netem --duration 5m delay --time 500 redis_container"
        },
        {
          "t": "Step 2 — Verify application degrades gracefully without crashing",
          "p": "Confirm app falls back to primary DB when cache is slow without throwing 500 errors.",
          "c": "Health Check: 200 OK (Cache bypassed via fallback policy) -> PASS"
        }
      ]
    }
  ],
  "contentMarkdown": "## Resilience & Database Rollback Verification\n\nSimulate abrupt process terminations and test automatic container healing, transaction rollback, and idempotency guarantees.\n\n```\nkill -9 $(pgrep -f worker) && npm test -- tests/recovery.spec.ts\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
