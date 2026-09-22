import type { ChapterRecord } from "../../../types";

/** F. SQL Interview Questions for QA Roles */
export const chapter = {
  "id": "sql-13-6-sql-interview-questions-for-qa-roles",
  "title": "F. SQL Interview Questions for QA Roles",
  "minutes": 20,
  "level": "advanced",
  "phase": "Part 13 · Appendices",
  "partName": "Part 13 · Appendices",
  "overviewText": "Organized by the Part that best prepares you to answer each one. Practicing the reasoning, not memorizing the answer, is the point — every question below maps to a worked example earlier in this manual. What's the difference between WHERE and HAVING, and why can't you filter on an aggregate in WHERE? (2.1, 3.2)",
  "why": "F. SQL Interview Questions for QA Roles is how a tester proves stored state, not just the screen. Organized by the Part that best prepares you to answer each one.",
  "when": "Open this chapter when you are on the Appendices path and need SQL Interview Questions for QA Roles against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen.",
  "practical": {
    "app": "Bizlevate HRMS / hrms_practice",
    "scenario": "A leave, payroll, attendance, or appointment check depends on SQL Interview Questions for QA Roles.",
    "pass": "You apply SQL Interview Questions for QA Roles on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
    "fail": "You copy a blog query, skip SQL Interview Questions for QA Roles, or treat a UI success toast as proof the row is correct."
  },
  "tools": [],
  "customSummary": "- See the full chapter.",
  "contentMarkdown": "Organized by the Part that best prepares you to answer each one. Practicing the reasoning, not memorizing the answer, is the point — every question below maps to a worked example earlier in this manual.\n## Fundamentals (Parts 1–3)\nWhat's the difference between WHERE and HAVING, and why can't you filter on an aggregate in WHERE? (2.1, 3.2)\n## Why does WHERE column <> 1 sometimes exclude rows you expected to see? (2.3)\n## What's the difference between COUNT(*), COUNT(column), and COUNT(DISTINCT column)? (3.1)\nWhy is WHERE column = NULL always false, and what should you write instead? (2.3)\n```sql\nExplain the logical order of execution of a SQL query's clauses (FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY). Why can't you use a SELECT alias in a WHERE clause? (1.3)\n```\nWhat happens if you GROUP BY one column but SELECT another column that isn't aggregated? (3.2)\nJoins (Part 4)\n```sql\nExplain the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN, with an example of when each would give a different row count. (4.1)\n```\nHow would you find all rows in table A that have no matching row in table B? Give two different ways to write it. (4.1, 5.3)\n## What is \"fan-out\" in a join, and how can it silently produce a wrong SUM or COUNT? (4.1)\n## What's a self join, and give a real-world example of when you'd need one. (4.2)\nWhy doesn't ON a.col = b.col match two rows that both have NULL in that column? (4.1, 2.3)\n## Subqueries, CTEs, sets (Part 5)\n## What's the difference between a correlated and an uncorrelated subquery? (5.1)\nWhy can NOT IN silently return zero rows when the subquery contains a NULL? What's the safer alternative? (2.3, 5.1)\n## What is a CTE, and how is it different from a derived table (subquery in FROM)? (5.2)\nWhat's the difference between UNION and UNION ALL, and why would you default to UNION ALL? (5.4)\n```sql\nExplain what a window function does that a GROUP BY cannot. Give an example using ROW_NUMBER(). (5.5)\n```\nHow would you find the \"top N per group\" (e.g., the top 3 highest earners per department)? (5.5)\n## Data validation & QA-specific (Parts 6, 10)\nYou're told a data migration \"passed\" because the row counts matched on both sides. Why might that still hide serious bugs? (6.1)\nHow would you find duplicate records in a table where duplicates are defined by a combination of columns, not a single one? (3.2, 6.3)\nDescribe how you'd validate that a computed/aggregated dashboard number is correct, without trusting the application's own calculation. (6.2, 9.3)\n## What's the difference between a \"hard\" orphan record and a \"logical\" orphan record? (4.3)\nHow would you design a reusable SQL-based sanity check suite for a QA team? What makes a check \"good\"? (10.2)\nGiven a status column and a status_history table, how would you check that the current status always matches the latest history entry? (6.3, 10.5)\n## Constraints & schema (Part 8)\nWhat's the difference between a UNIQUE constraint and a PRIMARY KEY? Can a unique column contain NULL? (8.1)\n```sql\nExplain what an index does and why adding more indexes isn't always better. (8.1, 8.5)\n```\nWhat test cases would you write just from reading a column definition of VARCHAR(50) NOT NULL? (8.2)\nWhat's a \"soft delete,\" and what's the classic bug it introduces with unique constraints? (4.3, 8.4)\n## Transactions & concurrency (Part 7)\nWhat does ACID stand for, and give a concrete example of an atomicity failure in a real application. (7.7)\n## What is a \"lost update,\" and how would you test for one? (7.7)\n## What's the difference between a deadlock and a lock wait timeout? (7.7)\nWhy can't you always test a multi-step API operation's atomicity by just checking the final HTTP response? (7.3, 9.1)\n## Practical / scenario-based\nWrite a query to find employees who have never submitted a leave request. (Multiple valid approaches: NOT IN with a NULL guard, NOT EXISTS, LEFT JOIN ... IS NULL, or EXCEPT — 5.1, 5.3, 5.4)\nA report shows a total that doesn't match the sum of the rows displayed underneath it. Walk through how you'd investigate. (9.6, 11.3)\nYou need to test that deleting a department with active employees is properly blocked. How would you set this up and verify it, including at the database level? (4.3, 8.1)\nGiven access to a database you've never seen before, describe your first hour of exploration. (8.6)\nHow would you performance-test a slow report, and what would you look for in an EXPLAIN plan? (8.5)\n```sql\nExplain how you'd verify PII is properly masked in a QA environment copied from production. (7.6)\n```\n",
  "blocks": [
    {
      "id": "sql-13-6-md-0",
      "type": "overview",
      "content": "Organized by the Part that best prepares you to answer each one. Practicing the reasoning, not memorizing the answer, is the point — every question below maps to a worked example earlier in this manual.",
      "order": 0
    },
    {
      "id": "sql-13-6-md-1",
      "type": "overview",
      "heading": "Fundamentals (Parts 1–3)",
      "content": "What's the difference between WHERE and HAVING, and why can't you filter on an aggregate in WHERE? (2.1, 3.2)",
      "order": 1
    },
    {
      "id": "sql-13-6-md-2",
      "type": "overview",
      "heading": "Why does WHERE column <> 1 sometimes exclude rows you expected to see? (2.3)",
      "content": "Why does WHERE column <> 1 sometimes exclude rows you expected to see? (2.3)",
      "order": 2
    },
    {
      "id": "sql-13-6-md-3",
      "type": "overview",
      "heading": "What's the difference between COUNT(*), COUNT(column), and COUNT(DISTINCT column)? (3.1)",
      "content": "Why is WHERE column = NULL always false, and what should you write instead? (2.3)\n```sql\nExplain the logical order of execution of a SQL query's clauses (FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY). Why can't you use a SELECT alias in a WHERE clause? (1.3)\n```\nWhat happens if you GROUP BY one column but SELECT another column that isn't aggregated? (3.2)\nJoins (Part 4)\n```sql\nExplain the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN, with an example of when each would give a different row count. (4.1)\n```\nHow would you find all rows in table A that have no matching row in table B? Give two different ways to write it. (4.1, 5.3)",
      "order": 3
    },
    {
      "id": "sql-13-6-md-4",
      "type": "overview",
      "heading": "What is \"fan-out\" in a join, and how can it silently produce a wrong SUM or COUNT? (4.1)",
      "content": "What is \"fan-out\" in a join, and how can it silently produce a wrong SUM or COUNT? (4.1)",
      "order": 4
    },
    {
      "id": "sql-13-6-md-5",
      "type": "overview",
      "heading": "What's a self join, and give a real-world example of when you'd need one. (4.2)",
      "content": "Why doesn't ON a.col = b.col match two rows that both have NULL in that column? (4.1, 2.3)",
      "order": 5
    },
    {
      "id": "sql-13-6-md-6",
      "type": "overview",
      "heading": "Subqueries, CTEs, sets (Part 5)",
      "content": "Subqueries, CTEs, sets (Part 5)",
      "order": 6
    },
    {
      "id": "sql-13-6-md-7",
      "type": "overview",
      "heading": "What's the difference between a correlated and an uncorrelated subquery? (5.1)",
      "content": "Why can NOT IN silently return zero rows when the subquery contains a NULL? What's the safer alternative? (2.3, 5.1)",
      "order": 7
    },
    {
      "id": "sql-13-6-md-8",
      "type": "overview",
      "heading": "What is a CTE, and how is it different from a derived table (subquery in FROM)? (5.2)",
      "content": "What's the difference between UNION and UNION ALL, and why would you default to UNION ALL? (5.4)\n```sql\nExplain what a window function does that a GROUP BY cannot. Give an example using ROW_NUMBER(). (5.5)\n```\nHow would you find the \"top N per group\" (e.g., the top 3 highest earners per department)? (5.5)",
      "order": 8
    },
    {
      "id": "sql-13-6-md-9",
      "type": "overview",
      "heading": "Data validation & QA-specific (Parts 6, 10)",
      "content": "You're told a data migration \"passed\" because the row counts matched on both sides. Why might that still hide serious bugs? (6.1)\nHow would you find duplicate records in a table where duplicates are defined by a combination of columns, not a single one? (3.2, 6.3)\nDescribe how you'd validate that a computed/aggregated dashboard number is correct, without trusting the application's own calculation. (6.2, 9.3)",
      "order": 9
    },
    {
      "id": "sql-13-6-md-10",
      "type": "overview",
      "heading": "What's the difference between a \"hard\" orphan record and a \"logical\" orphan record? (4.3)",
      "content": "How would you design a reusable SQL-based sanity check suite for a QA team? What makes a check \"good\"? (10.2)\nGiven a status column and a status_history table, how would you check that the current status always matches the latest history entry? (6.3, 10.5)",
      "order": 10
    },
    {
      "id": "sql-13-6-md-11",
      "type": "overview",
      "heading": "Constraints & schema (Part 8)",
      "content": "What's the difference between a UNIQUE constraint and a PRIMARY KEY? Can a unique column contain NULL? (8.1)\n```sql\nExplain what an index does and why adding more indexes isn't always better. (8.1, 8.5)\n```\nWhat test cases would you write just from reading a column definition of VARCHAR(50) NOT NULL? (8.2)\nWhat's a \"soft delete,\" and what's the classic bug it introduces with unique constraints? (4.3, 8.4)",
      "order": 11
    },
    {
      "id": "sql-13-6-md-12",
      "type": "overview",
      "heading": "Transactions & concurrency (Part 7)",
      "content": "What does ACID stand for, and give a concrete example of an atomicity failure in a real application. (7.7)",
      "order": 12
    },
    {
      "id": "sql-13-6-md-13",
      "type": "overview",
      "heading": "What is a \"lost update,\" and how would you test for one? (7.7)",
      "content": "What is a \"lost update,\" and how would you test for one? (7.7)",
      "order": 13
    },
    {
      "id": "sql-13-6-md-14",
      "type": "overview",
      "heading": "What's the difference between a deadlock and a lock wait timeout? (7.7)",
      "content": "Why can't you always test a multi-step API operation's atomicity by just checking the final HTTP response? (7.3, 9.1)",
      "order": 14
    },
    {
      "id": "sql-13-6-md-15",
      "type": "overview",
      "heading": "Practical / scenario-based",
      "content": "Write a query to find employees who have never submitted a leave request. (Multiple valid approaches: NOT IN with a NULL guard, NOT EXISTS, LEFT JOIN ... IS NULL, or EXCEPT — 5.1, 5.3, 5.4)\nA report shows a total that doesn't match the sum of the rows displayed underneath it. Walk through how you'd investigate. (9.6, 11.3)\nYou need to test that deleting a department with active employees is properly blocked. How would you set this up and verify it, including at the database level? (4.3, 8.1)\nGiven access to a database you've never seen before, describe your first hour of exploration. (8.6)\nHow would you performance-test a slow report, and what would you look for in an EXPLAIN plan? (8.5)\n```sql\nExplain how you'd verify PII is properly masked in a QA environment copied from production. (7.6)\n```",
      "order": 15
    }
  ],
  "advantages": [
    "F. SQL Interview Questions for QA Roles — F."
  ],
  "limitations": [
    "F. SQL Interview Questions for QA Roles is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
