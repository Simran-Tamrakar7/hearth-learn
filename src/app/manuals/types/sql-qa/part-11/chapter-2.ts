import type { ChapterRecord } from "../../../types";

/** 11.2 Read Replicas / Safe Environments */
export const chapter = {
  "id": "sql-11-2-read-replicas-safe-environments",
  "title": "11.2 Read Replicas / Safe Environments",
  "minutes": 21,
  "level": "advanced",
  "phase": "Part 11 · Tools & Workflow",
  "partName": "Part 11 · Tools & Workflow",
  "overviewText": "0.4 established environments (Dev/QA/Staging/Prod) and access levels in general terms. This chapter goes one level deeper into a specific, very common setup: read replicas, and the broader question of which environment a given testing task should actually run against. A read replica is a copy of a database that continuously receives changes from a primary (the database the application writes to) but only accepts read (SELECT) queries itself. Applications and reporting tools are often pointed at a replica for read-heavy work, to keep that load off the primary, and testers are frequently given replica access specifically because it's structurally impossible to write to it — a stronger guarante",
  "why": "11.2 Read Replicas / Safe Environments is how a tester proves stored state, not just the screen. 0.4 established environments (Dev/QA/Staging/Prod) and access levels in general terms.",
  "when": "Open this chapter when you are on the Tools & Workflow path and need Read Replicas / Safe Environments against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen.",
  "practical": {
    "app": "Bizlevate HRMS / hrms_practice",
    "scenario": "A leave, payroll, attendance, or appointment check depends on Read Replicas / Safe Environments.",
    "pass": "You apply Read Replicas / Safe Environments on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
    "fail": "You copy a blog query, skip Read Replicas / Safe Environments, or treat a UI success toast as proof the row is correct."
  },
  "tools": [],
  "customSummary": "- A read replica continuously receives primary writes but accepts only reads; it enforces read-only at the infrastructure level, stronger than an account-level restriction alone.\n- Check replica status/lag (SHOW REPLICA STATUS, pg_last_xact_replay_timestamp) before relying on freshness.\n- Replication lag causes a specific flakiness pattern: write via API (hits primary), immediately read from replica, row isn't there yet — not a race in the app, a race in test infrastructure.\n- Fix: verify immediately-after-write assertions against the primary; reserve replica reads for staleness-tolerant checks; if only replica access exists, poll with a bounded timeout rather than an arbitrary sleep().\n- Choosing an environment for a task is a checklist against 0.4's ladder: needs writes → writable sandbox, never a replica or production; needs production-scale volume → sized staging clone or a read replica for read-only perf; needs exact current production data → production replica if policy allows; destructive/exploratory → disposable clone; fast/disposable for CI → ephemeral per-run database.\n- Layer session-level read-only protection (SET SESSION TRANSACTION READ ONLY) even on a replica, as defense in depth against misconfiguration.\n- Backups matter to testers too: an unrestored backup is unverified; point-in-time recovery helps investigate historical data state for anomalies.",
  "contentMarkdown": "## Why \"safe\" needs its own chapter\n0.4 established environments (Dev/QA/Staging/Prod) and access levels in general terms. This chapter goes one level deeper into a specific, very common setup: read replicas, and the broader question of which environment a given testing task should actually run against.\n## What a read replica is\nA read replica is a copy of a database that continuously receives changes from a primary (the database the application writes to) but only accepts read (SELECT) queries itself. Applications and reporting tools are often pointed at a replica for read-heavy work, to keep that load off the primary, and testers are frequently given replica access specifically because it's structurally impossible to write to it — a stronger guarantee than \"please don't write\" on a regular QA database (0.5's principle of least privilege, applied at the infrastructure level rather than just the account level).\n-- MySQL: is this connection a replica, and how far behind is it?\n```sql\nSHOW REPLICA STATUS\\G           -- (MySQL 8.0.22+; older versions: SHOW SLAVE STATUS)\n-- key fields: Replica_IO_Running, Replica_SQL_Running, Seconds_Behind_Source\n```\n\n```sql\n-- PostgreSQL: check replication lag\nSELECT now() - pg_last_xact_replay_timestamp() AS replication_lag;\n```\n\n## Replication lag is a real testing hazard, not just an infrastructure concern\nA replica is not instantaneous. There's always some delay (often milliseconds, sometimes much longer under load) between a write landing on the primary and that same write appearing on the replica. This directly causes a specific, confusing class of test flakiness already flagged in passing back in 7.7: write through the API (which hits the primary), then immediately read from the replica to verify, and the row isn't there yet — not because the write failed, but because it hasn't replicated. The test fails intermittently, passes on retry, and looks exactly like a race condition in the application when it's actually a race condition in your test infrastructure.\n```py\ndef test_created_employee_is_readable(replica_db, api_base_url):\n    resp = requests.post(f\"{api_base_url}/employees\", json={...})\n    employee_id = resp.json()[\"id\"]\n```\n\n## # WRONG: may flake under replication lag\n    replica_db.execute(\"SELECT * FROM employees WHERE employee_id = %s\", (employee_id,))\n## assert replica_db.fetchone() is not None\n\n## # BETTER: poll with a bounded timeout, or read from the primary for verification\n## # immediately after a write, and only use the replica for checks that can tolerate\n## # being slightly stale (dashboards, reports, anything not asserting \"just happened\")\n\nThe fix, in order of preference: verify immediately-after-write assertions against the primary, not the replica, and reserve replica reads for checks where staleness genuinely doesn't matter (a report that's allowed to be \"as of a few seconds ago\"); or, if only replica access is available, poll with a bounded retry loop rather than asserting immediately, exactly the pattern used for asynchronous job completion elsewhere in this manual (7.7's \"wait for async jobs to finish\" point from 6.6 applies identically here). Never paper over this by adding an arbitrary sleep() before the assertion — that either makes tests slower than necessary on a fast day or still flaky on a slow one; a poll-with-timeout is the correct shape.\n## Choosing the right environment for the task, revisited\n0.4 laid out the general Dev/QA/Staging/Production ladder. In practice, the choice for a specific testing task usually comes down to a short list of questions:\nQuestion\nPoints toward\n## Does this need to write data?\nA writable environment (QA, or a dedicated sandbox) — never a read replica, never (in normal circumstances) production\n## Does this need production-scale volume for a performance test (8.5, 7.5)?\nA staging clone sized like production, or a read replica of production itself if read-only performance is what's being measured\nDoes this need to match production's exact current data for a specific investigation (an anomaly hunt, 10.1)?\nA production read replica, if policy allows, since QA/staging data may be masked (7.6) or simply different\nIs this a destructive or exploratory test (constraint-breaking, migration testing, 6.4, 8.1)?\nA disposable clone, never anything shared\nDoes this need to be fast and disposable for CI (9.4)?\n## An ephemeral per-run database\n\nThe recurring theme, consistent with everything from 0.4 onward: match the environment's properties (writable or not, shared or not, real-scale or not, real data or masked) to what the specific test genuinely needs, rather than defaulting to whichever connection happens to be open in your client.\n## Read-only enforcement: defense in depth\nA read replica enforces read-only at the infrastructure level, but it's worth layering additional protection even there, because a misconfigured replica occasionally does accept writes, and \"the replica should be read-only\" is itself sometimes exactly the thing you're testing (a failed failover, a replica accidentally promoted). The session-level protections from 10.2's sanity-runner safety section apply just as well here:\n```sql\nSET SESSION TRANSACTION READ ONLY;         -- MySQL: any write attempt in this session now errors immediately\n-- PostgreSQL: SET default_transaction_read_only = on;\n```\n\nRunning this at the start of any exploratory session on a replica (or any environment where you want a hard guarantee against accidental writes) costs nothing and catches a class of \"I typed UPDATE on the wrong tab\" mistake before it can do damage — a second line of defense behind the account-level read-only permission from 0.5.\n## Backups and restores as a testing concern\nBackups aren't purely a DBA topic; testers rely on restores constantly (cloning for migration testing in 6.4, refreshing a stale staging environment, recovering after a destructive test went wrong on a database that shouldn't have been shared but was). Two things worth knowing at a tester's level of depth, without needing to run the tooling yourself:\nA backup that's never been restored is unverified. The only proof a backup actually works is successfully restoring it. If your team's disaster-recovery process has never been tested end to end, that's worth flagging as a gap, the same way an untested rollback script was flagged as a gap in 6.4.\nPoint-in-time recovery (restoring to a specific moment, not just the latest full backup) matters for investigating \"what did the data look like right before this bug happened\" — useful when an anomaly (10.1) needs historical context that a live query can no longer provide because the bad data has since been fixed or overwritten.\n",
  "blocks": [
    {
      "id": "sql-11-2-md-0",
      "type": "overview",
      "heading": "Why \"safe\" needs its own chapter",
      "content": "0.4 established environments (Dev/QA/Staging/Prod) and access levels in general terms. This chapter goes one level deeper into a specific, very common setup: read replicas, and the broader question of which environment a given testing task should actually run against.",
      "order": 0
    },
    {
      "id": "sql-11-2-md-1",
      "type": "overview",
      "heading": "What a read replica is",
      "content": "A read replica is a copy of a database that continuously receives changes from a primary (the database the application writes to) but only accepts read (SELECT) queries itself. Applications and reporting tools are often pointed at a replica for read-heavy work, to keep that load off the primary, and testers are frequently given replica access specifically because it's structurally impossible to write to it — a stronger guarantee than \"please don't write\" on a regular QA database (0.5's principle of least privilege, applied at the infrastructure level rather than just the account level).\n-- MySQL: is this connection a replica, and how far behind is it?\n```sql\nSHOW REPLICA STATUS\\G           -- (MySQL 8.0.22+; older versions: SHOW SLAVE STATUS)\n-- key fields: Replica_IO_Running, Replica_SQL_Running, Seconds_Behind_Source\n```\n\n```sql\n-- PostgreSQL: check replication lag\nSELECT now() - pg_last_xact_replay_timestamp() AS replication_lag;\n```",
      "order": 1
    },
    {
      "id": "sql-11-2-md-2",
      "type": "overview",
      "heading": "Replication lag is a real testing hazard, not just an infrastructure concern",
      "content": "A replica is not instantaneous. There's always some delay (often milliseconds, sometimes much longer under load) between a write landing on the primary and that same write appearing on the replica. This directly causes a specific, confusing class of test flakiness already flagged in passing back in 7.7: write through the API (which hits the primary), then immediately read from the replica to verify, and the row isn't there yet — not because the write failed, but because it hasn't replicated. The test fails intermittently, passes on retry, and looks exactly like a race condition in the application when it's actually a race condition in your test infrastructure.\n```py\ndef test_created_employee_is_readable(replica_db, api_base_url):\n    resp = requests.post(f\"{api_base_url}/employees\", json={...})\n    employee_id = resp.json()[\"id\"]\n```",
      "order": 2
    },
    {
      "id": "sql-11-2-md-3",
      "type": "overview",
      "heading": "# WRONG: may flake under replication lag",
      "content": "replica_db.execute(\"SELECT * FROM employees WHERE employee_id = %s\", (employee_id,))",
      "order": 3
    },
    {
      "id": "sql-11-2-md-4",
      "type": "overview",
      "heading": "assert replica_db.fetchone() is not None",
      "content": "assert replica_db.fetchone() is not None",
      "order": 4
    },
    {
      "id": "sql-11-2-md-5",
      "type": "overview",
      "heading": "# BETTER: poll with a bounded timeout, or read from the primary for verification",
      "content": "# BETTER: poll with a bounded timeout, or read from the primary for verification",
      "order": 5
    },
    {
      "id": "sql-11-2-md-6",
      "type": "overview",
      "heading": "# immediately after a write, and only use the replica for checks that can tolerate",
      "content": "# immediately after a write, and only use the replica for checks that can tolerate",
      "order": 6
    },
    {
      "id": "sql-11-2-md-7",
      "type": "overview",
      "heading": "# being slightly stale (dashboards, reports, anything not asserting \"just happened\")",
      "content": "The fix, in order of preference: verify immediately-after-write assertions against the primary, not the replica, and reserve replica reads for checks where staleness genuinely doesn't matter (a report that's allowed to be \"as of a few seconds ago\"); or, if only replica access is available, poll with a bounded retry loop rather than asserting immediately, exactly the pattern used for asynchronous job completion elsewhere in this manual (7.7's \"wait for async jobs to finish\" point from 6.6 applies identically here). Never paper over this by adding an arbitrary sleep() before the assertion — that either makes tests slower than necessary on a fast day or still flaky on a slow one; a poll-with-timeout is the correct shape.",
      "order": 7
    },
    {
      "id": "sql-11-2-md-8",
      "type": "overview",
      "heading": "Choosing the right environment for the task, revisited",
      "content": "0.4 laid out the general Dev/QA/Staging/Production ladder. In practice, the choice for a specific testing task usually comes down to a short list of questions:\nQuestion\nPoints toward",
      "order": 8
    },
    {
      "id": "sql-11-2-md-9",
      "type": "overview",
      "heading": "Does this need to write data?",
      "content": "A writable environment (QA, or a dedicated sandbox) — never a read replica, never (in normal circumstances) production",
      "order": 9
    },
    {
      "id": "sql-11-2-md-10",
      "type": "overview",
      "heading": "Does this need production-scale volume for a performance test (8.5, 7.5)?",
      "content": "A staging clone sized like production, or a read replica of production itself if read-only performance is what's being measured\nDoes this need to match production's exact current data for a specific investigation (an anomaly hunt, 10.1)?\nA production read replica, if policy allows, since QA/staging data may be masked (7.6) or simply different\nIs this a destructive or exploratory test (constraint-breaking, migration testing, 6.4, 8.1)?\nA disposable clone, never anything shared\nDoes this need to be fast and disposable for CI (9.4)?",
      "order": 10
    },
    {
      "id": "sql-11-2-md-11",
      "type": "overview",
      "heading": "An ephemeral per-run database",
      "content": "The recurring theme, consistent with everything from 0.4 onward: match the environment's properties (writable or not, shared or not, real-scale or not, real data or masked) to what the specific test genuinely needs, rather than defaulting to whichever connection happens to be open in your client.",
      "order": 11
    },
    {
      "id": "sql-11-2-md-12",
      "type": "overview",
      "heading": "Read-only enforcement: defense in depth",
      "content": "A read replica enforces read-only at the infrastructure level, but it's worth layering additional protection even there, because a misconfigured replica occasionally does accept writes, and \"the replica should be read-only\" is itself sometimes exactly the thing you're testing (a failed failover, a replica accidentally promoted). The session-level protections from 10.2's sanity-runner safety section apply just as well here:\n```sql\nSET SESSION TRANSACTION READ ONLY;         -- MySQL: any write attempt in this session now errors immediately\n-- PostgreSQL: SET default_transaction_read_only = on;\n```\n\nRunning this at the start of any exploratory session on a replica (or any environment where you want a hard guarantee against accidental writes) costs nothing and catches a class of \"I typed UPDATE on the wrong tab\" mistake before it can do damage — a second line of defense behind the account-level read-only permission from 0.5.",
      "order": 12
    },
    {
      "id": "sql-11-2-md-13",
      "type": "overview",
      "heading": "Backups and restores as a testing concern",
      "content": "Backups aren't purely a DBA topic; testers rely on restores constantly (cloning for migration testing in 6.4, refreshing a stale staging environment, recovering after a destructive test went wrong on a database that shouldn't have been shared but was). Two things worth knowing at a tester's level of depth, without needing to run the tooling yourself:\nA backup that's never been restored is unverified. The only proof a backup actually works is successfully restoring it. If your team's disaster-recovery process has never been tested end to end, that's worth flagging as a gap, the same way an untested rollback script was flagged as a gap in 6.4.\nPoint-in-time recovery (restoring to a specific moment, not just the latest full backup) matters for investigating \"what did the data look like right before this bug happened\" — useful when an anomaly (10.1) needs historical context that a live query can no longer provide because the bad data has since been fixed or overwritten.",
      "order": 13
    }
  ],
  "advantages": [
    "11.2 Read Replicas / Safe Environments — 11."
  ],
  "limitations": [
    "11.2 Read Replicas / Safe Environments is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
