import type { ChapterRecord } from "../../../types";

/** 0.2 What SQL Is, Why It Comes in Dialects (MySQL, PostgreSQL, SQL Server), and the Statement Families (DQL, DML, DDL, DCL, TCL) */
export const chapter = {
  "id": "sql-0-2-what-sql-is-why-it-comes-in-dialects-mysql-postg",
  "title": "0.2 What SQL Is, Why It Comes in Dialects (MySQL, PostgreSQL, SQL Server), and the Statement Families (DQL, DML, DDL, DCL, TCL)",
  "minutes": 20,
  "level": "beginner",
  "phase": "Part 0 · Orientation",
  "partName": "Part 0 · Orientation",
  "overviewText": "SQL stands for Structured Query Language (people say \"sequel\" or \"S-Q-L\", both are fine). It is declarative: you describe what result you want, not how to compute it. In Selenium you write step-by-step instructions (find element, click, wait, read). In SQL you write \"give me all employees in QA hired after January 2025\" and the database engine decides the fastest way to fetch it. SQL has an official standard (ANSI/ISO), but every database vendor implemented it slightly differently and added their own extensions. So we have dialects: MySQL (and MariaDB), PostgreSQL, SQL Server (T-SQL), Oracle (PL/SQL), SQLite. About 80% of what you write, such as SELECT, WHERE, JOIN, GROUP BY and INSERT, work",
  "why": "0.2 What SQL Is, Why It Comes in Dialects (MySQL, PostgreSQL, SQL Server), and the Statement Families (DQL, DML, DDL, DCL, TCL) is how a tester proves stored state, not just the screen. SQL stands for Structured Query Language (people say \"sequel\" or \"S-Q-L\", both are fine).",
  "when": "Open this chapter when you are on the Orientation path and need What SQL Is, Why It Comes in Dialects (MySQL, PostgreSQL, SQL Server), and the Statement Families (DQL, DML, DDL, DCL, TCL) against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen.",
  "practical": {
    "app": "Bizlevate HRMS / hrms_practice",
    "scenario": "A leave, payroll, attendance, or appointment check depends on What SQL Is, Why It Comes in Dialects (MySQL, PostgreSQL, SQL Server), and the Statement Families (DQL, DML, DDL, DCL, TCL).",
    "pass": "You apply What SQL Is, Why It Comes in Dialects (MySQL, PostgreSQL, SQL Server), and the Statement Families (DQL, DML, DDL, DCL, TCL) on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
    "fail": "You copy a blog query, skip What SQL Is, Why It Comes in Dialects (MySQL, PostgreSQL, SQL Server), and the Statement Families (DQL, DML, DDL, DCL, TCL), or treat a UI success toast as proof the row is correct."
  },
  "tools": [],
  "customSummary": "- SQL is declarative: you say what you want, not how to get it.\n- Standard SQL plus vendor dialects (MySQL, PostgreSQL, SQL Server). Differences: row limiting, concatenation, dates, quoting, auto-increment.\n- Families: DQL (SELECT), DML (INSERT/UPDATE/DELETE), DDL (CREATE/ALTER/DROP/TRUNCATE), DCL (GRANT/REVOKE), TCL (COMMIT/ROLLBACK).\n- Risk rises from DQL → DML → DDL. Be extra careful past DQL.",
  "contentMarkdown": "## SQL is the language you use to talk to a relational database\nSQL stands for Structured Query Language (people say \"sequel\" or \"S-Q-L\", both are fine). It is declarative: you describe what result you want, not how to compute it. In Selenium you write step-by-step instructions (find element, click, wait, read). In SQL you write \"give me all employees in QA hired after January 2025\" and the database engine decides the fastest way to fetch it.\n```sql\nSELECT employee_id, first_name, hire_date\nFROM   employees\nWHERE  department_id = 2\n  AND  hire_date > '2025-01-01';\n```\n\n## Why dialects exist\nSQL has an official standard (ANSI/ISO), but every database vendor implemented it slightly differently and added their own extensions. So we have dialects: MySQL (and MariaDB), PostgreSQL, SQL Server (T-SQL), Oracle (PL/SQL), SQLite. About 80% of what you write, such as SELECT, WHERE, JOIN, GROUP BY and INSERT, works everywhere. The last 20% (limiting rows, string concatenation, date arithmetic, auto-increment columns) differs, and that's where testers get bitten when they copy a query from a blog post.\n\n| Task | MySQL | PostgreSQL | SQL Server |\n|---|---|---|---|\n| First 5 rows | LIMIT 5 | LIMIT 5 | SELECT TOP 5 ... |\n| Current timestamp | NOW() | NOW() | GETDATE() |\n| Concatenate | CONCAT(a, ' ', b) | a \\|\\| ' ' \\|\\| b | a + ' ' + b or CONCAT() |\n| Quote an identifier | `order` (backticks) | \"order\" (double quotes) | [order] (brackets) |\n| Auto-increment key | AUTO_INCREMENT | SERIAL / GENERATED ... AS IDENTITY | IDENTITY(1,1) |\n| String aggregation | GROUP_CONCAT() | STRING_AGG() | STRING_AGG() |\n\nBecause this manual is for testers who may be on any of the three, every chapter with dialect differences will flag them, and Appendix B collects them in one place. Treat the manual's examples as MySQL-flavoured unless a note says otherwise, and always check what your project actually uses (ask the developer, or look at the connection string; port 3306 is usually MySQL, 5432 PostgreSQL, 1433 SQL Server).\n## The five statement families\nSQL statements are grouped by what they do. You'll see these acronyms constantly:\n\n| Family | Full name | Purpose | Examples | Tester relevance |\n|---|---|---|---|---|\n| DQL | Data Query Language | Read data | SELECT | Daily use. This is 80% of tester SQL |\n| DML | Data Manipulation Language | Change data | INSERT, UPDATE, DELETE | Test data setup and cleanup (Part 7) |\n| DDL | Data Definition Language | Change structure | CREATE, ALTER, DROP, TRUNCATE | Reading migration scripts, awareness (7.4, 6.4) |\n| DCL | Data Control Language | Control access | GRANT, REVOKE | Understanding your permissions (0.5) |\n| TCL | Transaction Control Language | Group changes | START TRANSACTION, COMMIT, ROLLBACK | Safe experimentation (7.3) |\n\nSome people place SELECT under DML instead of a separate DQL; you'll see both in textbooks. The split isn't important. What matters is the risk gradient: DQL is harmless, DML changes rows, DDL changes the structure itself (and in some databases can't be undone by a rollback), and DCL changes who can do what. A good habit is to feel a small alarm bell when you move from left to right in that table.\n",
  "blocks": [
    {
      "id": "sql-0-2-md-0",
      "type": "overview",
      "heading": "SQL is the language you use to talk to a relational database",
      "content": "SQL stands for Structured Query Language (people say \"sequel\" or \"S-Q-L\", both are fine). It is declarative: you describe what result you want, not how to compute it. In Selenium you write step-by-step instructions (find element, click, wait, read). In SQL you write \"give me all employees in QA hired after January 2025\" and the database engine decides the fastest way to fetch it.\n```sql\nSELECT employee_id, first_name, hire_date\nFROM   employees\nWHERE  department_id = 2\n  AND  hire_date > '2025-01-01';\n```",
      "order": 0
    },
    {
      "id": "sql-0-2-md-1",
      "type": "overview",
      "heading": "Why dialects exist",
      "content": "SQL has an official standard (ANSI/ISO), but every database vendor implemented it slightly differently and added their own extensions. So we have dialects: MySQL (and MariaDB), PostgreSQL, SQL Server (T-SQL), Oracle (PL/SQL), SQLite. About 80% of what you write, such as SELECT, WHERE, JOIN, GROUP BY and INSERT, works everywhere. The last 20% (limiting rows, string concatenation, date arithmetic, auto-increment columns) differs, and that's where testers get bitten when they copy a query from a blog post.\n\n| Task | MySQL | PostgreSQL | SQL Server |\n|---|---|---|---|\n| First 5 rows | LIMIT 5 | LIMIT 5 | SELECT TOP 5 ... |\n| Current timestamp | NOW() | NOW() | GETDATE() |\n| Concatenate | CONCAT(a, ' ', b) | a \\|\\| ' ' \\|\\| b | a + ' ' + b or CONCAT() |\n| Quote an identifier | `order` (backticks) | \"order\" (double quotes) | [order] (brackets) |\n| Auto-increment key | AUTO_INCREMENT | SERIAL / GENERATED ... AS IDENTITY | IDENTITY(1,1) |\n| String aggregation | GROUP_CONCAT() | STRING_AGG() | STRING_AGG() |\n\nBecause this manual is for testers who may be on any of the three, every chapter with dialect differences will flag them, and Appendix B collects them in one place. Treat the manual's examples as MySQL-flavoured unless a note says otherwise, and always check what your project actually uses (ask the developer, or look at the connection string; port 3306 is usually MySQL, 5432 PostgreSQL, 1433 SQL Server).",
      "order": 1
    },
    {
      "id": "sql-0-2-md-2",
      "type": "overview",
      "heading": "The five statement families",
      "content": "SQL statements are grouped by what they do. You'll see these acronyms constantly:\n\n| Family | Full name | Purpose | Examples | Tester relevance |\n|---|---|---|---|---|\n| DQL | Data Query Language | Read data | SELECT | Daily use. This is 80% of tester SQL |\n| DML | Data Manipulation Language | Change data | INSERT, UPDATE, DELETE | Test data setup and cleanup (Part 7) |\n| DDL | Data Definition Language | Change structure | CREATE, ALTER, DROP, TRUNCATE | Reading migration scripts, awareness (7.4, 6.4) |\n| DCL | Data Control Language | Control access | GRANT, REVOKE | Understanding your permissions (0.5) |\n| TCL | Transaction Control Language | Group changes | START TRANSACTION, COMMIT, ROLLBACK | Safe experimentation (7.3) |\n\nSome people place SELECT under DML instead of a separate DQL; you'll see both in textbooks. The split isn't important. What matters is the risk gradient: DQL is harmless, DML changes rows, DDL changes the structure itself (and in some databases can't be undone by a rollback), and DCL changes who can do what. A good habit is to feel a small alarm bell when you move from left to right in that table.",
      "order": 2
    }
  ],
  "advantages": [
    "0.2 What SQL Is, Why It Comes in Dialects (MySQL, PostgreSQL, SQL Server), and the Statement Families (DQL, DML, DDL, DCL, TCL) — 0."
  ],
  "limitations": [
    "0.2 What SQL Is, Why It Comes in Dialects (MySQL, PostgreSQL, SQL Server), and the Statement Families (DQL, DML, DDL, DCL, TCL) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
