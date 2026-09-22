import type { ChapterRecord } from "../../../types";

/** 0.7 What This Manual Does Not Cover (Scope & Where to Go Next) */
export const chapter = {
  "id": "sql-0-7-what-this-manual-does-not-cover-scope-where-to-g",
  "title": "0.7 What This Manual Does Not Cover (Scope & Where to Go Next)",
  "minutes": 20,
  "level": "beginner",
  "phase": "Part 0 · Orientation",
  "partName": "Part 0 · Orientation",
  "overviewText": "This manual teaches SQL as a QA tool, the SQL a tester needs to verify, investigate and prepare data. It deliberately leaves out areas that belong to other roles or deserve their own books. Knowing where the edge is prevents surprise and points you to the right next resource. Database administration: installing servers, backups and restores, replication setup, user management at scale, capacity planning. (0.5 only covers what you need to understand about permissions.) Database design and normalization theory: we touch schema patterns in 8.4, but not normal forms, ER modelling as a design discipline, or designing a schema from scratch. Writing stored procedures, triggers and functions: 8.3 te",
  "why": "0.7 What This Manual Does Not Cover (Scope & Where to Go Next) is how a tester proves stored state, not just the screen. This manual teaches SQL as a QA tool, the SQL a tester needs to verify, investigate and prepare data.",
  "when": "Open this chapter when you are on the Orientation path and need What This Manual Does Not Cover (Scope & Where to Go Next) against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen.",
  "practical": {
    "app": "Bizlevate HRMS / hrms_practice",
    "scenario": "A leave, payroll, attendance, or appointment check depends on What This Manual Does Not Cover (Scope & Where to Go Next).",
    "pass": "You apply What This Manual Does Not Cover (Scope & Where to Go Next) on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
    "fail": "You copy a blog query, skip What This Manual Does Not Cover (Scope & Where to Go Next), or treat a UI success toast as proof the row is correct."
  },
  "tools": [],
  "customSummary": "- Out of scope: DBA work, schema design theory, writing procedures/triggers, deep tuning, NoSQL querying, data warehousing/BI, ORMs, full pen-testing, load testing.\n- Next steps: vendor docs, a database-design course, data-engineering path, and Part 9 as the bridge to API/UI automation.",
  "contentMarkdown": "## Being clear about scope\nThis manual teaches SQL as a QA tool, the SQL a tester needs to verify, investigate and prepare data. It deliberately leaves out areas that belong to other roles or deserve their own books. Knowing where the edge is prevents surprise and points you to the right next resource.\n## Topics intentionally left out\nDatabase administration: installing servers, backups and restores, replication setup, user management at scale, capacity planning. (0.5 only covers what you need to understand about permissions.)\nDatabase design and normalization theory: we touch schema patterns in 8.4, but not normal forms, ER modelling as a design discipline, or designing a schema from scratch.\nWriting stored procedures, triggers and functions: 8.3 teaches you to read and test them, not build complex ones.\nDeep performance tuning: 8.5 covers EXPLAIN and spotting slow queries so you can escalate with evidence, not index strategy or query-planner internals.\nNoSQL query languages: MongoDB, Redis and others are mentioned in 0.1 only for context.\nData warehousing and BI: OLAP, star schemas, ETL tool development. Part 6 covers validating ETL output with SQL, not building pipelines.\nORMs and application code: Hibernate, Sequelize, Prisma and so on. You'll see SQL that these generate, but not how to configure them.\nSecurity testing beyond basics: 9.7 introduces SQL injection so testers can recognize and report it. Full penetration testing is a separate discipline.\nLoad and performance testing: database behaviour under stress is a specialist topic.\n## Where to go next\nIf your work grows toward any of these, the natural follow-ups are: a proper database-design course (normalization, indexing), your database vendor's official documentation (MySQL Reference Manual, PostgreSQL docs, Microsoft T-SQL docs), a data engineering or analytics path (which fits well with the data analytics learning you already do), and API and automation manuals like your Postman, pytest, Cypress and Playwright material, where Part 9 of this manual acts as the bridge.\n",
  "blocks": [
    {
      "id": "sql-0-7-md-0",
      "type": "overview",
      "heading": "Being clear about scope",
      "content": "This manual teaches SQL as a QA tool, the SQL a tester needs to verify, investigate and prepare data. It deliberately leaves out areas that belong to other roles or deserve their own books. Knowing where the edge is prevents surprise and points you to the right next resource.",
      "order": 0
    },
    {
      "id": "sql-0-7-md-1",
      "type": "overview",
      "heading": "Topics intentionally left out",
      "content": "Database administration: installing servers, backups and restores, replication setup, user management at scale, capacity planning. (0.5 only covers what you need to understand about permissions.)\nDatabase design and normalization theory: we touch schema patterns in 8.4, but not normal forms, ER modelling as a design discipline, or designing a schema from scratch.\nWriting stored procedures, triggers and functions: 8.3 teaches you to read and test them, not build complex ones.\nDeep performance tuning: 8.5 covers EXPLAIN and spotting slow queries so you can escalate with evidence, not index strategy or query-planner internals.\nNoSQL query languages: MongoDB, Redis and others are mentioned in 0.1 only for context.\nData warehousing and BI: OLAP, star schemas, ETL tool development. Part 6 covers validating ETL output with SQL, not building pipelines.\nORMs and application code: Hibernate, Sequelize, Prisma and so on. You'll see SQL that these generate, but not how to configure them.\nSecurity testing beyond basics: 9.7 introduces SQL injection so testers can recognize and report it. Full penetration testing is a separate discipline.\nLoad and performance testing: database behaviour under stress is a specialist topic.",
      "order": 1
    },
    {
      "id": "sql-0-7-md-2",
      "type": "overview",
      "heading": "Where to go next",
      "content": "If your work grows toward any of these, the natural follow-ups are: a proper database-design course (normalization, indexing), your database vendor's official documentation (MySQL Reference Manual, PostgreSQL docs, Microsoft T-SQL docs), a data engineering or analytics path (which fits well with the data analytics learning you already do), and API and automation manuals like your Postman, pytest, Cypress and Playwright material, where Part 9 of this manual acts as the bridge.",
      "order": 2
    }
  ],
  "advantages": [
    "0.7 What This Manual Does Not Cover (Scope & Where to Go Next) — 0."
  ],
  "limitations": [
    "0.7 What This Manual Does Not Cover (Scope & Where to Go Next) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
