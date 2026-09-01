import type { ChapterRecord } from "../../../types";

/** Concurrency Testing */
export const chapter = {
  "id": "tt-concurrency-testing",
  "overlayNo": 56,
  "title": "Concurrency Testing",
  "minutes": 25,
  "level": "advanced",
  "phase": "Part 14 · Advanced Resilience, Chaos & Contracts",
  "partName": "Part 14 · Advanced Resilience, Chaos & Contracts",
  "overviewText": "Concurrency testing verifies an application's correctness when multiple operations happen simultaneously against shared data or resources — checking specifically for race conditions, deadlocks, and data corruption that only occur when timing between simultaneous operations lines up in exactly the wrong way.",
  "why": "Some bugs are entirely invisible in single-user, sequential testing and only emerge when two or more operations genuinely overlap in time against the same shared resource — two users updating the same record simultaneously, two processes both reading-then-writing a value without proper locking, resulting in one update silently overwriting the other. These race-condition bugs are notoriously hard to reproduce reliably, since they depend on precise, often rare timing.",
  "when": "Specifically for any feature involving shared, concurrently-accessed data or resources (booking systems, balance/inventory updates, any 'read-then-write' operation) — tested deliberately, since concurrency bugs essentially never surface through normal single-user manual testing at all.",
  "practical": {
    "app": "HRMS Last-Slot Leave Approval",
    "scenario": "Two managers simultaneously approve overlapping leave requests that would each independently be valid, but together would leave the team without adequate coverage on a specific day — a shared-resource conflict tested with JMeter firing both approval requests at the exact same moment.",
    "pass": "A database-level lock on the coverage check ensures the second concurrent approval correctly sees the first one's effect and is properly blocked with a clear conflict error, verified by re-running the same simultaneous-approval scenario.",
    "fail": "Both approvals succeed independently, since each request only checks current coverage without accounting for the other request being processed at the exact same instant — a lost-update race condition resulting in a real staffing gap neither manager intended."
  },
  "advantages": [
    "Directly catches race conditions and deadlocks that are completely invisible to sequential testing",
    "Verifies database isolation levels (SERIALIZABLE, REPEATABLE READ) and mutex locking mechanisms",
    "JMeter synchronization timers force genuinely simultaneous HTTP execution",
    "Findings translate directly into concrete architectural fixes (atomic operations, optimistic concurrency locking)"
  ],
  "limitations": [
    "Race conditions depend on microscopic CPU timing differences and can be intermittent to reproduce",
    "Requires pinpointing high-risk shared database tables and transactions in advance",
    "Verification requires direct database queries to audit data integrity after tests finish",
    "Subsequent code refactors can re-introduce race conditions without strict concurrency regression checks"
  ],
  "tools": [
    {
      "name": "Apache JMeter Synchronizing Timer",
      "sub": "Simultaneous Concurrency & Race Condition Probe",
      "url": "https://jmeter.apache.org",
      "seeChapter": 14,
      "desc": "Used here not for volume performance measurement (see Chapter 14), but specifically configured with Synchronizing Timers to release multiple threads at the exact same microsecond against a shared resource.",
      "adv": [
        "Synchronizing Timer holds threads until exact batch count is reached, releasing them simultaneously",
        "Parametrized thread requests test conflicting balance deductions or approvals",
        "Automated response assertions catch HTTP 409 Conflict vs 500 DB Deadlock exceptions"
      ],
      "lim": [
        "Requires configuring thread rendezvous points in JMeter GUI"
      ],
      "steps": [
        {
          "t": "Step 1 — Configure Synchronizing Timer in JMeter Thread Group",
          "p": "Set Group of 10 threads to block until all 10 are queued, then fire simultaneously.",
          "c": "Thread Group: 10 Threads, Ramp-Up: 0s\n+ Synchronizing Timer (Number of Simulated Users to Group by: 10)\n+ HTTP Request: POST /api/v1/leave/approve-slot"
        },
        {
          "t": "Step 2 — Execute concurrent approval requests against single remaining slot",
          "p": "Fire 10 simultaneous approvals against Employee #1042 slot.",
          "c": "Results:\n- Thread 1: HTTP 200 OK (Slot Claimed)\n- Threads 2-10: HTTP 409 Conflict (Slot No Longer Available)\n- Database Status: Exactly 1 record approved, 0 over-allocations -> PASS"
        },
        {
          "t": "Step 3 — Verify database integrity with SQL check",
          "p": "Assert no double-booking or negative remaining slot count in Postgres.",
          "c": "SELECT count(*) FROM leave_slots WHERE slot_date = '2026-09-01' AND status = 'APPROVED';\nResult: 1 (Row-level SELECT FOR UPDATE lock prevented race condition)"
        }
      ]
    }
  ],
  "contentMarkdown": "## Simultaneous Multi-Threaded State Assertion\n\nConfigure thread synchronization barriers releasing concurrent HTTP transactions against identical database rows.\n\n```\njmeter -n -t tests/concurrency/simultaneous-approval.jmx -l results.jtl\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
