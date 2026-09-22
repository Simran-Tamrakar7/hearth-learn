import type { ChapterRecord } from "../../../types";

/** 7.2 Safely Seeding/Cleaning Test Data */
export const chapter = {
  "id": "sql-7-2-safely-seeding-cleaning-test-data",
  "title": "7.2 Safely Seeding/Cleaning Test Data",
  "minutes": 23,
  "level": "intermediate",
  "phase": "Part 7 · DML, DDL & Test Data",
  "partName": "Part 7 · DML, DDL & Test Data",
  "overviewText": "Whose data is this? and How does it get removed? A shared QA database contains rows from many testers, automation runs, developers and demos. If your tests can't tell their rows from everyone else's, either your cleanup deletes someone else's data, or your leftovers pile up until other people's tests fail. Everything in this chapter serves those two questions. Give every row you create a recognisable tag that includes an owner or run identifier, and use it in a column that's searchable and unique enough to filter by, usually the email, name or a code:",
  "why": "7.2 Safely Seeding/Cleaning Test Data is how a tester proves stored state, not just the screen. Whose data is this? and How does it get removed? A shared QA database contains rows from many testers, automation runs, developers and demos.",
  "when": "Open this chapter when you are on the DML, DDL & Test Data path and need Safely Seeding/Cleaning Test Data against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen.",
  "practical": {
    "app": "Bizlevate HRMS / hrms_practice",
    "scenario": "A leave, payroll, attendance, or appointment check depends on Safely Seeding/Cleaning Test Data.",
    "pass": "You apply Safely Seeding/Cleaning Test Data on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
    "fail": "You copy a blog query, skip Safely Seeding/Cleaning Test Data, or treat a UI success toast as proof the row is correct."
  },
  "tools": [],
  "customSummary": "- Two questions: whose data is this, and how is it removed?\n- Tag every row (owner + run id in a filterable column), use reserved test domains, escape _ in LIKE.\n- Seed scripts are idempotent, atomic (transaction), and mirror what the app writes (history rows); use relative dates.\n- Clean up children first (history, requests, attendance, payroll, balances, employees), collecting parent IDs in a temp table; use DROP TEMPORARY TABLE to avoid implicit commit; include app-written side-effect rows.\n- Verify cleanup: no tagged leftovers and orphan counts equal the pre-run baseline.\n- Never depend on data you don't own; read reference IDs at runtime.\n- Parallel tests: unique tag per worker/test; cleanup in finally; nightly sweeper for qa_% debris.\n- Alternatives: transaction rollback (not for UI tests), snapshot restore, per-run database/container (cleanest for CI), reset scripts (private DBs only).\n- Don't reset auto-increment or disable FK checks to ease cleanup.",
  "contentMarkdown": "## The two questions behind every test data strategy\nWhose data is this? and How does it get removed? A shared QA database contains rows from many testers, automation runs, developers and demos. If your tests can't tell their rows from everyone else's, either your cleanup deletes someone else's data, or your leftovers pile up until other people's tests fail. Everything in this chapter serves those two questions.\n## Tag everything you create\nGive every row you create a recognisable tag that includes an owner or run identifier, and use it in a column that's searchable and unique enough to filter by, usually the email, name or a code:\n## email:  qa_r1042_asha@example.com          (prefix qa_ + run id + purpose)\nname:   QA_Asha Tester                     (visible in the UI, so nobody mistakes it for a real person)\n\n```sql\nUse a domain you own or a reserved test domain (example.com, example.test), so your data can never trigger a real email to a real person. The run id (r1042) separates this run from earlier runs, from other testers, and from a parallel worker in the same run. Tags also make cleanup a simple LIKE 'qa\\_r1042\\_%' (escape the underscore, 2.5).\n```\n## Seed with a script that can run twice\nA good seed script is idempotent (running it again doesn't duplicate or fail), atomic (a transaction, so a failure halfway leaves nothing behind), and self-describing (you can tell what it created). One tag, one transaction, keys captured in variables:\nSET @tag = 'qa_r1042';\n\n```sql\nSTART TRANSACTION;\n```\n\n```sql\nINSERT INTO employees (first_name, last_name, email, department_id, manager_id, hire_date, status)\nVALUES ('QA_Asha', 'Tester', CONCAT(@tag, '_asha@example.com'), 2, NULL, '2025-01-01', 'active');\nSET @emp = LAST_INSERT_ID();\n```\n\n```sql\nINSERT INTO leave_balances (employee_id, leave_type_id, balance) VALUES (@emp, 2, 12.0);\n```\n\n```sql\nINSERT INTO leave_requests (employee_id, leave_type_id, start_date, end_date, days, status)\nVALUES (@emp, 2, '2026-11-10', '2026-11-11', 2, 'pending');\nSET @req = LAST_INSERT_ID();\n```\n\n```sql\nINSERT INTO leave_status_history (leave_request_id, old_status, new_status, changed_by, changed_at)\nVALUES (@req, NULL, 'pending', @emp, NOW());          -- what the app itself would have written\n```\n\n```sql\nCOMMIT;\n```\n\n```sql\nSELECT @emp AS employee_id, @req AS leave_request_id;\n```\n\nNotice the seed mirrors what the application does (the history row), for the reason given in 7.1. To make it re-runnable, guard each insert (WHERE NOT EXISTS (SELECT 1 FROM employees WHERE email = ...)) or clean the tag first, and prefer a unique run id so two runs never collide.\n## Build data relative to today, not on fixed dates\nA \"pending request for next Monday\" seeded as '2026-11-09' fails the day that date passes. Use relative dates where the scenario allows it: CURRENT_DATE + INTERVAL 14 DAY, NOW() - INTERVAL 8 DAY. When the test depends on a specific weekday or a month boundary, compute the date in the test code and pass it in.\n## Clean up in the right order: children first\nForeign keys (4.3) force this order, and deleting a parent first fails with error 1451. For our tables that means: history → leave requests → attendance → payroll → balances → appointments → employees. A safe, tag-based cleanup collects the parent IDs once, deletes dependants by those IDs, then deletes the parents:\nSET @tag = 'qa_r1042';\n\n-- 1. Preview: what will go?\n```sql\nSELECT employee_id, email FROM employees WHERE email LIKE CONCAT(@tag, '\\_%');\n```\n\n```sql\nSTART TRANSACTION;\n```\n\n```sql\nCREATE TEMPORARY TABLE doomed_emp AS\n  SELECT employee_id FROM employees WHERE email LIKE CONCAT(@tag, '\\_%');\n```\n\n```sql\nDELETE h FROM leave_status_history h\n  JOIN leave_requests lr ON lr.leave_request_id = h.leave_request_id\n  WHERE lr.employee_id IN (SELECT employee_id FROM doomed_emp);\nDELETE FROM leave_requests WHERE employee_id IN (SELECT employee_id FROM doomed_emp);\nDELETE FROM attendance     WHERE employee_id IN (SELECT employee_id FROM doomed_emp);\nDELETE FROM payroll        WHERE employee_id IN (SELECT employee_id FROM doomed_emp);\nDELETE FROM leave_balances WHERE employee_id IN (SELECT employee_id FROM doomed_emp);\nDELETE FROM employees      WHERE employee_id IN (SELECT employee_id FROM doomed_emp);\n```\n\n```sql\nDROP TEMPORARY TABLE doomed_emp;\nCOMMIT;\n```\n\n```sql\nDROP TEMPORARY TABLE doesn't cause an implicit commit in MySQL, but a plain DROP TABLE would, so use the temporary form inside a transaction. Two things the UI may have created that your tag doesn't reach: rows written by the application as a side effect (audit logs, notifications, uploaded files), and rows that don't carry your tag column at all. Include them by joining through the parent IDs, and ask developers where the app writes besides the obvious tables.\n```\n## Verify the cleanup with delta checks\nAfter cleanup, confirm two things: nothing tagged remains, and you didn't create new integrity problems.\n```sql\nSELECT COUNT(*) AS leftover FROM employees WHERE email LIKE CONCAT(@tag, '\\_%');       -- expect 0\n```\n\n-- Orphan scoreboard from 4.3 / 6.3: counts should equal the baseline from before your run\n\nCompare the counts to a baseline recorded before the run (6.3, 6.6). A leftover means your cleanup missed a table, and a new orphan means it deleted a parent but not a child.\n## Never depend on data you don't own\nA test that reads \"the employee named Asha\" from a shared database breaks when someone renames or deletes her. Create what you need, use it, remove it. If you must rely on reference data (leave types, departments), read it in the test instead of hard-coding IDs (SELECT leave_type_id FROM leave_types WHERE name = 'Sick'), because IDs differ between environments (6.5).\n## Parallel tests: give each worker its own slice\nIf Playwright runs four workers at once, four tests can seed and clean the same tag at the same time. Generate the tag per test or per worker, and never reuse a fixed email:\n```ts\nimport { test as base } from '@playwright/test';\nimport mysql from 'mysql2/promise';\n```\n\ntype Seed = { empId: number; email: string; tag: string };\n\n```ts\nexport const test = base.extend<{ seed: Seed }>({\n  seed: async ({}, use, testInfo) => {\n    const tag = `qa_${Date.now()}_w${testInfo.workerIndex}_${testInfo.testId.slice(0, 6)}`;\n    const db  = await mysql.createConnection(process.env.QA_DB_URL!);\n    const email = `${tag}_asha@example.com`;\n```\n\n```ts\n    const [r]: any = await db.execute(\n      `INSERT INTO employees (first_name, last_name, email, department_id, hire_date, status)\n       VALUES ('QA_Asha', 'Tester', ?, 2, '2025-01-01', 'active')`, [email]);\n    const empId = r.insertId;\n    await db.execute('INSERT INTO leave_balances (employee_id, leave_type_id, balance) VALUES (?, 2, 12.0)', [empId]);\n```\n\n    try {\n## await use({ empId, email, tag });                     // the test body runs here\n## } finally {                                             // runs even if the test fails\n      await db.execute('DELETE FROM leave_status_history WHERE leave_request_id IN (SELECT leave_request_id FROM leave_requests WHERE employee_id = ?)', [empId]);\n      await db.execute('DELETE FROM leave_requests WHERE employee_id = ?', [empId]);\n| await db.execute('DELETE FROM leave_balances WHERE employee_id = ?', [empId]); | await db.execute('DELETE FROM employees WHERE employee_id = ?', [empId]); | await db.end(); |\n|---|---|---|\n| } | }, | }); |\n\nThe finally block is the important part: cleanup that only runs on success leaves debris after every failed test, which is exactly when you can least afford it. In pytest the same idea is a fixture with yield, and in Selenium suites it's a tearDown or a finally. Also keep a nightly sweeper that deletes anything tagged qa_% older than a day, as a safety net for crashed runs.\nAlternatives to row-by-row cleanup\n\n| Approach | Good for | Cost | Tag and delete (above) | Shared databases | Needs careful ordering |\n|---|---|---|---|---|---|\n| Wrap the test in a rolled-back transaction | Tests that talk to the DB directly | Doesn't work when the app writes on its own connection (7.3) | Restore a snapshot or backup before each run | Dedicated test environments | Slow, and wipes everyone's data |\n| Dedicated database per run or per worker (containers) | CI pipelines | Setup effort; the cleanest isolation | Reset script (truncate and reload) | Private databases only | Unsafe if shared (7.4) |\n\nFor CI, a fresh database container seeded from a known script for each run is often the best option, and it means \"cleanup\" is just throwing the container away (9.4).\n## Do not reset auto-increment counters, and do not disable checks to make cleanup easier\nResetting an AUTO_INCREMENT in a shared database can reissue an ID that a log, cache or another system still remembers. And SET FOREIGN_KEY_CHECKS = 0 to force a delete just creates the orphans that Part 4 taught you to hunt.\n",
  "blocks": [
    {
      "id": "sql-7-2-md-0",
      "type": "overview",
      "heading": "The two questions behind every test data strategy",
      "content": "Whose data is this? and How does it get removed? A shared QA database contains rows from many testers, automation runs, developers and demos. If your tests can't tell their rows from everyone else's, either your cleanup deletes someone else's data, or your leftovers pile up until other people's tests fail. Everything in this chapter serves those two questions.",
      "order": 0
    },
    {
      "id": "sql-7-2-md-1",
      "type": "overview",
      "heading": "Tag everything you create",
      "content": "Give every row you create a recognisable tag that includes an owner or run identifier, and use it in a column that's searchable and unique enough to filter by, usually the email, name or a code:",
      "order": 1
    },
    {
      "id": "sql-7-2-md-2",
      "type": "overview",
      "heading": "email:  qa_r1042_asha@example.com          (prefix qa_ + run id + purpose)",
      "content": "name:   QA_Asha Tester                     (visible in the UI, so nobody mistakes it for a real person)\n\n```sql\nUse a domain you own or a reserved test domain (example.com, example.test), so your data can never trigger a real email to a real person. The run id (r1042) separates this run from earlier runs, from other testers, and from a parallel worker in the same run. Tags also make cleanup a simple LIKE 'qa\\_r1042\\_%' (escape the underscore, 2.5).\n```",
      "order": 2
    },
    {
      "id": "sql-7-2-md-3",
      "type": "overview",
      "heading": "Seed with a script that can run twice",
      "content": "A good seed script is idempotent (running it again doesn't duplicate or fail), atomic (a transaction, so a failure halfway leaves nothing behind), and self-describing (you can tell what it created). One tag, one transaction, keys captured in variables:\nSET @tag = 'qa_r1042';\n\n```sql\nSTART TRANSACTION;\n```\n\n```sql\nINSERT INTO employees (first_name, last_name, email, department_id, manager_id, hire_date, status)\nVALUES ('QA_Asha', 'Tester', CONCAT(@tag, '_asha@example.com'), 2, NULL, '2025-01-01', 'active');\nSET @emp = LAST_INSERT_ID();\n```\n\n```sql\nINSERT INTO leave_balances (employee_id, leave_type_id, balance) VALUES (@emp, 2, 12.0);\n```\n\n```sql\nINSERT INTO leave_requests (employee_id, leave_type_id, start_date, end_date, days, status)\nVALUES (@emp, 2, '2026-11-10', '2026-11-11', 2, 'pending');\nSET @req = LAST_INSERT_ID();\n```\n\n```sql\nINSERT INTO leave_status_history (leave_request_id, old_status, new_status, changed_by, changed_at)\nVALUES (@req, NULL, 'pending', @emp, NOW());          -- what the app itself would have written\n```\n\n```sql\nCOMMIT;\n```\n\n```sql\nSELECT @emp AS employee_id, @req AS leave_request_id;\n```\n\nNotice the seed mirrors what the application does (the history row), for the reason given in 7.1. To make it re-runnable, guard each insert (WHERE NOT EXISTS (SELECT 1 FROM employees WHERE email = ...)) or clean the tag first, and prefer a unique run id so two runs never collide.",
      "order": 3
    },
    {
      "id": "sql-7-2-md-4",
      "type": "overview",
      "heading": "Build data relative to today, not on fixed dates",
      "content": "A \"pending request for next Monday\" seeded as '2026-11-09' fails the day that date passes. Use relative dates where the scenario allows it: CURRENT_DATE + INTERVAL 14 DAY, NOW() - INTERVAL 8 DAY. When the test depends on a specific weekday or a month boundary, compute the date in the test code and pass it in.",
      "order": 4
    },
    {
      "id": "sql-7-2-md-5",
      "type": "overview",
      "heading": "Clean up in the right order: children first",
      "content": "Foreign keys (4.3) force this order, and deleting a parent first fails with error 1451. For our tables that means: history → leave requests → attendance → payroll → balances → appointments → employees. A safe, tag-based cleanup collects the parent IDs once, deletes dependants by those IDs, then deletes the parents:\nSET @tag = 'qa_r1042';\n\n-- 1. Preview: what will go?\n```sql\nSELECT employee_id, email FROM employees WHERE email LIKE CONCAT(@tag, '\\_%');\n```\n\n```sql\nSTART TRANSACTION;\n```\n\n```sql\nCREATE TEMPORARY TABLE doomed_emp AS\n  SELECT employee_id FROM employees WHERE email LIKE CONCAT(@tag, '\\_%');\n```\n\n```sql\nDELETE h FROM leave_status_history h\n  JOIN leave_requests lr ON lr.leave_request_id = h.leave_request_id\n  WHERE lr.employee_id IN (SELECT employee_id FROM doomed_emp);\nDELETE FROM leave_requests WHERE employee_id IN (SELECT employee_id FROM doomed_emp);\nDELETE FROM attendance     WHERE employee_id IN (SELECT employee_id FROM doomed_emp);\nDELETE FROM payroll        WHERE employee_id IN (SELECT employee_id FROM doomed_emp);\nDELETE FROM leave_balances WHERE employee_id IN (SELECT employee_id FROM doomed_emp);\nDELETE FROM employees      WHERE employee_id IN (SELECT employee_id FROM doomed_emp);\n```\n\n```sql\nDROP TEMPORARY TABLE doomed_emp;\nCOMMIT;\n```\n\n```sql\nDROP TEMPORARY TABLE doesn't cause an implicit commit in MySQL, but a plain DROP TABLE would, so use the temporary form inside a transaction. Two things the UI may have created that your tag doesn't reach: rows written by the application as a side effect (audit logs, notifications, uploaded files), and rows that don't carry your tag column at all. Include them by joining through the parent IDs, and ask developers where the app writes besides the obvious tables.\n```",
      "order": 5
    },
    {
      "id": "sql-7-2-md-6",
      "type": "overview",
      "heading": "Verify the cleanup with delta checks",
      "content": "After cleanup, confirm two things: nothing tagged remains, and you didn't create new integrity problems.\n```sql\nSELECT COUNT(*) AS leftover FROM employees WHERE email LIKE CONCAT(@tag, '\\_%');       -- expect 0\n```\n\n-- Orphan scoreboard from 4.3 / 6.3: counts should equal the baseline from before your run\n\nCompare the counts to a baseline recorded before the run (6.3, 6.6). A leftover means your cleanup missed a table, and a new orphan means it deleted a parent but not a child.",
      "order": 6
    },
    {
      "id": "sql-7-2-md-7",
      "type": "overview",
      "heading": "Never depend on data you don't own",
      "content": "A test that reads \"the employee named Asha\" from a shared database breaks when someone renames or deletes her. Create what you need, use it, remove it. If you must rely on reference data (leave types, departments), read it in the test instead of hard-coding IDs (SELECT leave_type_id FROM leave_types WHERE name = 'Sick'), because IDs differ between environments (6.5).",
      "order": 7
    },
    {
      "id": "sql-7-2-md-8",
      "type": "overview",
      "heading": "Parallel tests: give each worker its own slice",
      "content": "If Playwright runs four workers at once, four tests can seed and clean the same tag at the same time. Generate the tag per test or per worker, and never reuse a fixed email:\n```ts\nimport { test as base } from '@playwright/test';\nimport mysql from 'mysql2/promise';\n```\n\ntype Seed = { empId: number; email: string; tag: string };\n\n```ts\nexport const test = base.extend<{ seed: Seed }>({\n  seed: async ({}, use, testInfo) => {\n    const tag = `qa_${Date.now()}_w${testInfo.workerIndex}_${testInfo.testId.slice(0, 6)}`;\n    const db  = await mysql.createConnection(process.env.QA_DB_URL!);\n    const email = `${tag}_asha@example.com`;\n```\n\n```ts\n    const [r]: any = await db.execute(\n      `INSERT INTO employees (first_name, last_name, email, department_id, hire_date, status)\n       VALUES ('QA_Asha', 'Tester', ?, 2, '2025-01-01', 'active')`, [email]);\n    const empId = r.insertId;\n    await db.execute('INSERT INTO leave_balances (employee_id, leave_type_id, balance) VALUES (?, 2, 12.0)', [empId]);\n```\n\n    try {",
      "order": 8
    },
    {
      "id": "sql-7-2-md-9",
      "type": "overview",
      "heading": "await use({ empId, email, tag });                     // the test body runs here",
      "content": "await use({ empId, email, tag });                     // the test body runs here",
      "order": 9
    },
    {
      "id": "sql-7-2-md-10",
      "type": "overview",
      "heading": "} finally {                                             // runs even if the test fails",
      "content": "await db.execute('DELETE FROM leave_status_history WHERE leave_request_id IN (SELECT leave_request_id FROM leave_requests WHERE employee_id = ?)', [empId]);\n      await db.execute('DELETE FROM leave_requests WHERE employee_id = ?', [empId]);\n| await db.execute('DELETE FROM leave_balances WHERE employee_id = ?', [empId]); | await db.execute('DELETE FROM employees WHERE employee_id = ?', [empId]); | await db.end(); |\n|---|---|---|\n| } | }, | }); |\n\nThe finally block is the important part: cleanup that only runs on success leaves debris after every failed test, which is exactly when you can least afford it. In pytest the same idea is a fixture with yield, and in Selenium suites it's a tearDown or a finally. Also keep a nightly sweeper that deletes anything tagged qa_% older than a day, as a safety net for crashed runs.\nAlternatives to row-by-row cleanup\n\n| Approach | Good for | Cost | Tag and delete (above) | Shared databases | Needs careful ordering |\n|---|---|---|---|---|---|\n| Wrap the test in a rolled-back transaction | Tests that talk to the DB directly | Doesn't work when the app writes on its own connection (7.3) | Restore a snapshot or backup before each run | Dedicated test environments | Slow, and wipes everyone's data |\n| Dedicated database per run or per worker (containers) | CI pipelines | Setup effort; the cleanest isolation | Reset script (truncate and reload) | Private databases only | Unsafe if shared (7.4) |\n\nFor CI, a fresh database container seeded from a known script for each run is often the best option, and it means \"cleanup\" is just throwing the container away (9.4).",
      "order": 10
    },
    {
      "id": "sql-7-2-md-11",
      "type": "overview",
      "heading": "Do not reset auto-increment counters, and do not disable checks to make cleanup easier",
      "content": "Resetting an AUTO_INCREMENT in a shared database can reissue an ID that a log, cache or another system still remembers. And SET FOREIGN_KEY_CHECKS = 0 to force a delete just creates the orphans that Part 4 taught you to hunt.",
      "order": 11
    }
  ],
  "advantages": [
    "7.2 Safely Seeding/Cleaning Test Data — 7."
  ],
  "limitations": [
    "7.2 Safely Seeding/Cleaning Test Data is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
