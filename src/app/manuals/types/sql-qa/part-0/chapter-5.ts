import type { ChapterRecord } from "../../../types";

/** 0.5 DB Users, Roles & Permissions */
export const chapter = {
  "id": "sql-0-5-db-users-roles-permissions",
  "title": "0.5 DB Users, Roles & Permissions",
  "minutes": 20,
  "level": "beginner",
  "phase": "Part 0 · Orientation",
  "partName": "Part 0 · Orientation",
  "overviewText": "The employee who logs into the HRMS is an application user, stored in a table like users. A database user is an account the database itself knows about, used by applications, DBAs and testers to connect. The application usually connects with one powerful service account. You should connect with your own account, which has only what you need. Permissions (also called privileges) say who can do what on which object: SELECT on employees, INSERT on attendance, and so on. A role is a named bundle of privileges you can assign to many users, so you don't grant permissions one person at a time. This follows the principle of least privilege: give each user only the access they need.",
  "why": "0.5 DB Users, Roles & Permissions is how a tester proves stored state, not just the screen. The employee who logs into the HRMS is an application user, stored in a table like users.",
  "when": "Open this chapter when you are on the Orientation path and need DB Users, Roles & Permissions against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen.",
  "practical": {
    "app": "Bizlevate HRMS / hrms_practice",
    "scenario": "A leave, payroll, attendance, or appointment check depends on DB Users, Roles & Permissions.",
    "pass": "You apply DB Users, Roles & Permissions on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
    "fail": "You copy a blog query, skip DB Users, Roles & Permissions, or treat a UI success toast as proof the row is correct."
  },
  "tools": [],
  "customSummary": "- DB users are separate from app users. Use your own least-privilege account.\n- Roles bundle privileges (qa_readonly, qa_writer, app service, DBA).\n- GRANT/REVOKE control access; SHOW GRANTS (MySQL) reveals it.\n- \"Permission denied\" errors are expected on restricted accounts; a read-only account that can write is a finding.\n- Permissions are a test target too (restricted salary data). Keep automation credentials in env vars or secrets, never in the repo.",
  "contentMarkdown": "## Databases have their own users, separate from app users\nThe employee who logs into the HRMS is an application user, stored in a table like users. A database user is an account the database itself knows about, used by applications, DBAs and testers to connect. The application usually connects with one powerful service account. You should connect with your own account, which has only what you need.\n## Permissions are granted per object and per action\nPermissions (also called privileges) say who can do what on which object: SELECT on employees, INSERT on attendance, and so on. A role is a named bundle of privileges you can assign to many users, so you don't grant permissions one person at a time. This follows the principle of least privilege: give each user only the access they need.\n\n| Typical role setups: | Role | Can do | Who gets it |\n|---|---|---|---|\n| qa_readonly | SELECT on the QA/staging schema | Most testers | qa_writer |\n| SELECT, INSERT, UPDATE, DELETE on QA schema | Testers seeding data on QA | app_service | What the app needs, usually no DDL |\n| The application itself | dba_admin | Everything | DBAs |\n\n| How permissions are granted | MySQL: |\n|---|---|\n| CREATE USER 'qa_readonly'@'%' IDENTIFIED BY 'a-strong-password'; | GRANT SELECT ON hrms_qa.* TO 'qa_readonly'@'%'; |\n\n-- See what an account can do\n```sql\nSHOW GRANTS FOR 'qa_readonly'@'%';\n```\n\nPostgreSQL:\n```sql\nCREATE ROLE qa_readonly LOGIN PASSWORD 'a-strong-password';\nGRANT CONNECT ON DATABASE hrms_qa TO qa_readonly;\nGRANT USAGE   ON SCHEMA public   TO qa_readonly;\nGRANT SELECT  ON ALL TABLES IN SCHEMA public TO qa_readonly;\n```\n\nYou typically won't run these yourself, since a DBA will. But knowing them helps you ask for the right thing: \"please give me SELECT on the QA schema\" is a much better request than \"please give me DB access.\"\n## How a permission problem looks\nMySQL:      ERROR 1142 (42000): UPDATE command denied to user 'qa_readonly'@'10.0.0.5' for table 'employees'\n## PostgreSQL: ERROR:  permission denied for table employees\n\nThese aren't bugs. They confirm that your access is limited, which is what you want on staging. If your read-only account can modify data, that itself is a finding worth reporting.\n## Why this matters beyond your own safety\nPermissions are also a testing target. Test that a low-privilege account can't read salary tables, and that the app's service account can't DROP tables. Sensitive columns (salary, national ID, bank details) may be restricted or masked, which ties into PII handling in 7.6. And when you use credentials inside automation (Playwright, pytest, CI), use a read-only account stored in environment variables or a secrets manager, never hard-coded in the repo (11.2 and 9.4 return to this).\n",
  "blocks": [
    {
      "id": "sql-0-5-md-0",
      "type": "overview",
      "heading": "Databases have their own users, separate from app users",
      "content": "The employee who logs into the HRMS is an application user, stored in a table like users. A database user is an account the database itself knows about, used by applications, DBAs and testers to connect. The application usually connects with one powerful service account. You should connect with your own account, which has only what you need.",
      "order": 0
    },
    {
      "id": "sql-0-5-md-1",
      "type": "overview",
      "heading": "Permissions are granted per object and per action",
      "content": "Permissions (also called privileges) say who can do what on which object: SELECT on employees, INSERT on attendance, and so on. A role is a named bundle of privileges you can assign to many users, so you don't grant permissions one person at a time. This follows the principle of least privilege: give each user only the access they need.\n\n| Typical role setups: | Role | Can do | Who gets it |\n|---|---|---|---|\n| qa_readonly | SELECT on the QA/staging schema | Most testers | qa_writer |\n| SELECT, INSERT, UPDATE, DELETE on QA schema | Testers seeding data on QA | app_service | What the app needs, usually no DDL |\n| The application itself | dba_admin | Everything | DBAs |\n\n| How permissions are granted | MySQL: |\n|---|---|\n| CREATE USER 'qa_readonly'@'%' IDENTIFIED BY 'a-strong-password'; | GRANT SELECT ON hrms_qa.* TO 'qa_readonly'@'%'; |\n\n-- See what an account can do\n```sql\nSHOW GRANTS FOR 'qa_readonly'@'%';\n```\n\nPostgreSQL:\n```sql\nCREATE ROLE qa_readonly LOGIN PASSWORD 'a-strong-password';\nGRANT CONNECT ON DATABASE hrms_qa TO qa_readonly;\nGRANT USAGE   ON SCHEMA public   TO qa_readonly;\nGRANT SELECT  ON ALL TABLES IN SCHEMA public TO qa_readonly;\n```\n\nYou typically won't run these yourself, since a DBA will. But knowing them helps you ask for the right thing: \"please give me SELECT on the QA schema\" is a much better request than \"please give me DB access.\"",
      "order": 1
    },
    {
      "id": "sql-0-5-md-2",
      "type": "overview",
      "heading": "How a permission problem looks",
      "content": "MySQL:      ERROR 1142 (42000): UPDATE command denied to user 'qa_readonly'@'10.0.0.5' for table 'employees'",
      "order": 2
    },
    {
      "id": "sql-0-5-md-3",
      "type": "overview",
      "heading": "PostgreSQL: ERROR:  permission denied for table employees",
      "content": "These aren't bugs. They confirm that your access is limited, which is what you want on staging. If your read-only account can modify data, that itself is a finding worth reporting.",
      "order": 3
    },
    {
      "id": "sql-0-5-md-4",
      "type": "overview",
      "heading": "Why this matters beyond your own safety",
      "content": "Permissions are also a testing target. Test that a low-privilege account can't read salary tables, and that the app's service account can't DROP tables. Sensitive columns (salary, national ID, bank details) may be restricted or masked, which ties into PII handling in 7.6. And when you use credentials inside automation (Playwright, pytest, CI), use a read-only account stored in environment variables or a secrets manager, never hard-coded in the repo (11.2 and 9.4 return to this).",
      "order": 4
    }
  ],
  "advantages": [
    "0.5 DB Users, Roles & Permissions — 0."
  ],
  "limitations": [
    "0.5 DB Users, Roles & Permissions is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
