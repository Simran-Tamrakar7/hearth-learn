import type { ChapterRecord } from "../../../types";

/** Database Testing */
export const chapter = {
  "id": "tt-database-testing",
  "overlayNo": 35,
  "title": "Database Testing",
  "minutes": 25,
  "level": "intermediate",
  "phase": "Part 9 · Modern Engineering & Integrations",
  "partName": "Part 9 · Modern Engineering & Integrations",
  "overviewText": "Database testing verifies the data layer directly — schema structure, constraints, data integrity, stored procedures, and the correctness of the raw data itself — independent of any application layer sitting on top of it, checking the database exactly as it actually stores and enforces data.",
  "why": "An application can appear to work correctly in the UI while the underlying data is silently wrong, duplicated, orphaned, or violating an intended constraint — a foreign key that should prevent an orphaned record but doesn't, a transaction that partially commits, a migration that subtly corrupts existing rows. These issues often go unnoticed at the application layer until they cause a much harder-to-diagnose problem later.",
  "when": "Whenever schema changes are made (new tables, new constraints, migrations), and periodically as a direct integrity check independent of application-level testing — especially important after any bulk data operation, migration, or refactor of how a table is used.",
  "practical": {
    "app": "HRMS Employee-Department Relationship",
    "scenario": "After a migration restructures how employees are linked to departments, DBeaver is used to directly verify data integrity.",
    "pass": "A corrective script reassigns the orphaned records, and a foreign key constraint is added so the same orphaning can no longer occur silently in the future.",
    "fail": "A query reveals 12 employee records with a department_id that no longer exists in the departments table — orphaned records left behind by an incomplete migration, invisible in the UI since the application simply shows a blank department field rather than erroring."
  },
  "advantages": [
    "Verifies data integrity directly at the source, independent of whatever the application layer happens to display",
    "Catches constraint and migration issues that could otherwise go unnoticed until causing major database corruption",
    "DBeaver supports most major databases (Postgres, MySQL, Oracle, SQLite) with one consistent tool",
    "Direct SQL queries easily audit millions of records for subtle inconsistencies"
  ],
  "limitations": [
    "Requires SQL knowledge and an understanding of schema constraints to be effective",
    "Testing directly against the database bypasses application-layer validation, requiring care with test data",
    "Must be run against disposable staging databases, never production, given destructive test checks",
    "Doesn't verify UI presentation — pairs with, but doesn't replace, application testing"
  ],
  "tools": [
    {
      "name": "DBeaver Community",
      "sub": "Universal Database Management & SQL Inspection Client",
      "url": "https://dbeaver.io",
      "desc": "A free, universal database client supporting most major databases (PostgreSQL, MySQL, SQL Server, and more) — lets a tester connect directly to the database, browse schema, run arbitrary queries, and directly inspect and verify data and constraints without going through the application.",
      "adv": [
        "Universal multi-platform support (PostgreSQL, MySQL, MariaDB, SQLite, Oracle, Snowflake)",
        "Visual Entity Relationship Diagram (ERD) schema visualizer",
        "Data compare and schema diff tools to audit migrations",
        "Export query results to CSV, JSON, or SQL dump for test verification"
      ],
      "lim": [
        "Requires direct database port connectivity (or SSH tunnel) to staging DB"
      ],
      "steps": [
        {
          "t": "Step 1 — Connect DBeaver to Staging Database via SSL/SSH Tunnel",
          "p": "Establish secure connection to Postgres staging instance.",
          "c": "Host: staging-db.internal | Port: 5432 | Database: hrms_db | SSL: require"
        },
        {
          "t": "Step 2 — Audit foreign key constraint enforcement",
          "p": "Attempt inserting orphan child record directly to test schema constraints.",
          "c": "INSERT INTO leave_requests (id, employee_id, days) VALUES ('lr_99', 'non_existent_emp', 3);\nExpected: ERROR: insert on table \"leave_requests\" violates foreign key constraint \"fk_employee\" -> PASS"
        },
        {
          "t": "Step 3 — Run SQL integrity audit queries post-migration",
          "p": "Verify 0 orphan records, 0 invalid nulls, and exact row counts.",
          "c": "SELECT e.id, e.name FROM employees e\nLEFT JOIN departments d ON e.department_id = d.id\nWHERE d.id IS NULL;\nResult: 0 rows (No orphans detected -> PASS)"
        },
        {
          "t": "Step 4 — Verify ACID transaction rollback on mid-flight failure",
          "p": "Simulate failure during batch payroll update and confirm ledger is untouched.",
          "c": "BEGIN;\nUPDATE employee_balances SET leave_balance = leave_balance - 1;\n-- Simulating failure before COMMIT\nROLLBACK;\nSELECT count(*) FROM employee_balances WHERE updated_at > now() - interval '1 minute';\nResult: 0 rows (Rollback verified)"
        }
      ]
    }
  ],
  "contentMarkdown": "## Direct SQL Constraint & Migration Integrity Audit\n\nAudit schema tables directly with SQL queries probing foreign keys, unique constraints, and ACID rollbacks.\n\n```\npsql -h localhost -U postgres -d hrms_staging -f scripts/db-audit.sql\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
