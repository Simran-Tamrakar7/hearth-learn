/* SQL for QA TOC — ordering only. Content lives in part-N/chapter-M.ts */

/** Bump when chapter catalog changes so stale browser localStorage is not restored. */
export const SQL_QA_TOC_VERSION = 1;

export type SqlQaTocPart = {
  partNo: number;
  name: string;
  items: { title: string }[];
};

export const SQL_QA_TOC: SqlQaTocPart[] = [
  {
    partNo: 0,
    name: "Orientation",
    items: [
      { title: "0.1 Background: How an App Is Built (UI → API → Database), What a Relational Database Is, SQL vs NoSQL" },
      { title: "0.2 What SQL Is, Why It Comes in Dialects (MySQL, PostgreSQL, SQL Server), and the Statement Families (DQL, DML, DDL, DCL, TCL)" },
      { title: "0.3 What Testers Use SQL For" },
      { title: "0.4 Read-Only vs Write Access, Environments (Dev/QA/Staging/Prod), Working Safely in Shared DBs" },
      { title: "0.5 DB Users, Roles & Permissions" },
      { title: "0.6 Sample Database & How to Follow Along" },
      { title: "0.7 What This Manual Does Not Cover (Scope & Where to Go Next)" },
    ],
  },
  {
    partNo: 1,
    name: "Database & Query Basics",
    items: [
      { title: "1.1 Databases, Tables, Rows, Columns, Schemas" },
      { title: "1.2 Data Types" },
      { title: "1.3 SELECT, FROM, WHERE Basics" },
      { title: "1.4 Comparison & Logical Operators" },
    ],
  },
  {
    partNo: 2,
    name: "Filtering & Sorting",
    items: [
      { title: "2.1 WHERE Clause Deep Dive" },
      { title: "2.2 ORDER BY, LIMIT/TOP, DISTINCT" },
      { title: "2.3 NULL Handling" },
      { title: "2.4 Functions & Expressions (CASE, COALESCE, NULLIF, string/date functions, ROUND/CAST, GROUP_CONCAT/STRING_AGG)" },
      { title: "2.5 Text Matching Gotchas" },
    ],
  },
  {
    partNo: 3,
    name: "Aggregation",
    items: [
      { title: "3.1 COUNT, SUM, AVG, MIN, MAX" },
      { title: "3.2 GROUP BY and HAVING" },
    ],
  },
  {
    partNo: 4,
    name: "Joins",
    items: [
      { title: "4.1 INNER, LEFT, RIGHT, FULL Joins" },
      { title: "4.2 Self Joins" },
      { title: "4.3 Practical QA Scenario: Validating Foreign Key Relationships" },
    ],
  },
  {
    partNo: 5,
    name: "Subqueries, CTEs & Set Operations",
    items: [
      { title: "5.1 Subqueries in WHERE/SELECT/FROM" },
      { title: "5.2 Common Table Expressions" },
      { title: "5.3 When to Use a Subquery vs a Join" },
      { title: "5.4 Set Operators (UNION, UNION ALL, INTERSECT, EXCEPT)" },
      { title: "5.5 Window Functions (ROW_NUMBER, RANK, LAG/LEAD, SUM() OVER)" },
    ],
  },
  {
    partNo: 6,
    name: "Data Validation Techniques for QA",
    items: [
      { title: "6.1 Verifying Data Migration/ETL Correctness" },
      { title: "6.2 Comparing Expected vs Actual Data Sets" },
      { title: "6.3 Finding Duplicates, Orphaned Records, Mismatched Counts" },
      { title: "6.4 Testing Schema Migration Scripts" },
      { title: "6.5 Schema Drift Checks Across Environments" },
      { title: "6.6 Before/After Snapshot (Regression) Validation" },
    ],
  },
  {
    partNo: 7,
    name: "DML, DDL & Test Data",
    items: [
      { title: "7.1 INSERT, UPDATE, DELETE" },
      { title: "7.2 Safely Seeding/Cleaning Test Data" },
      { title: "7.3 Transactions (COMMIT, ROLLBACK)" },
      { title: "7.4 DDL Awareness (CREATE, ALTER, DROP, TRUNCATE vs DELETE)" },
      { title: "7.5 Bulk Test Data Generation" },
      { title: "7.6 Masking/Anonymizing PII" },
      { title: "7.7 ACID, Isolation Levels & Concurrency" },
    ],
  },
  {
    partNo: 8,
    name: "Constraints & Schema Awareness",
    items: [
      { title: "8.1 Primary Keys, Foreign Keys, Unique Constraints, Indexes" },
      { title: "8.2 Why Schema Knowledge Helps You Write Better Test Cases" },
      { title: "8.3 Views, Triggers & Stored Procedures" },
      { title: "8.4 Common Schema Patterns (soft deletes, audit columns, status/enum columns, lookup tables)" },
      { title: "8.5 Query Performance Basics (EXPLAIN, slow queries, when to escalate)" },
      { title: "8.6 Exploring an Unfamiliar Database" },
    ],
  },
  {
    partNo: 9,
    name: "SQL in API/Backend Testing",
    items: [
      { title: "9.1 Verifying API Responses Against DB State" },
      { title: "9.2 Using SQL Alongside Postman/pytest/Cypress" },
      { title: "9.3 Cross-Checking Business Logic" },
      { title: "9.4 SQL with Playwright & CI Pipelines" },
      { title: "9.5 Pagination, Sorting & Filter Validation" },
      { title: "9.6 Dashboard & Report Validation" },
      { title: "9.7 SQL Injection Basics for Testers" },
    ],
  },
  {
    partNo: 10,
    name: "Practical QA Query Patterns",
    items: [
      { title: "10.1 Finding Bugs via Data Anomalies" },
      { title: "10.2 Building Reusable Sanity Check Queries" },
      { title: "10.3 Query Templates for Attendance, Payroll, Appointments" },
      { title: "10.4 Leave Module Templates" },
      { title: "10.5 Approval Workflow & Status Transition Checks" },
    ],
  },
  {
    partNo: 11,
    name: "Tools & Workflow",
    items: [
      { title: "11.1 Running Queries via DB Clients" },
      { title: "11.2 Read Replicas / Safe Environments" },
      { title: "11.3 Exporting Query Results for Bug Reports" },
    ],
  },
  {
    partNo: 12,
    name: "Practice & Wrap-up",
    items: [
      { title: "12.1 Sample HRMS Practice Database (schema + seed data)" },
      { title: "12.2 Exercises per Part (with answers)" },
      { title: "12.3 Mini-Project: A Full Sanity-Check Suite for One Module" },
    ],
  },
  {
    partNo: 13,
    name: "Appendices",
    items: [
      { title: "A. Cheat Sheet of Common Queries" },
      { title: "B. SQL Syntax Differences (MySQL vs PostgreSQL vs SQL Server)" },
      { title: "C. Glossary of Terms" },
      { title: "D. Common SQL Errors & How to Fix Them" },
      { title: "E. Sample Database Schema Reference (ER Overview)" },
      { title: "F. SQL Interview Questions for QA Roles" },
    ],
  },
];
