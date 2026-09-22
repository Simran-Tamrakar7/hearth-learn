import type { ChapterRecord } from "../../../types";

/** 2.2 ORDER BY, LIMIT/TOP, DISTINCT */
export const chapter = {
  "id": "sql-2-2-order-by-limit-top-distinct",
  "title": "2.2 ORDER BY, LIMIT/TOP, DISTINCT",
  "minutes": 21,
  "level": "beginner",
  "phase": "Part 2 · Filtering & Sorting",
  "partName": "Part 2 · Filtering & Sorting",
  "overviewText": "This is worth repeating from Part 1, because it's the root of many flaky database assertions. A table has no inherent order. The database returns rows in whatever way is cheapest at that moment, which can change after an insert, a vacuum, or a different execution plan. Any test that says \"the first row should be X\" needs an ORDER BY. In UI terms, it's the equivalent of asserting on nth(0) of a list that has no guaranteed sort. ASC (ascending) is the default and DESC reverses it. You can sort by a column that isn't in the SELECT list, and (unlike WHERE) you can use a SELECT alias in ORDER BY, because sorting happens after the select step in the logical order from Part 1.",
  "why": "2.2 ORDER BY, LIMIT/TOP, DISTINCT is how a tester proves stored state, not just the screen. This is worth repeating from Part 1, because it's the root of many flaky database assertions.",
  "when": "Open this chapter when you are on the Filtering & Sorting path and need ORDER BY, LIMIT/TOP, DISTINCT against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen.",
  "practical": {
    "app": "Bizlevate HRMS / hrms_practice",
    "scenario": "A leave, payroll, attendance, or appointment check depends on ORDER BY, LIMIT/TOP, DISTINCT.",
    "pass": "You apply ORDER BY, LIMIT/TOP, DISTINCT on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
    "fail": "You copy a blog query, skip ORDER BY, LIMIT/TOP, DISTINCT, or treat a UI success toast as proof the row is correct."
  },
  "tools": [],
  "customSummary": "- No ORDER BY means no guaranteed order; never assert on \"first row\" without one.\n- Multi-column sort applies left to right; use CASE in ORDER BY for custom business order.\n- NULL placement: MySQL/SQL Server put NULLs first on ASC, PostgreSQL puts them last.\n- Text sort follows collation; UI (JS) and DB sorting can legitimately disagree, so decide the source of truth.\n- Row limiting: LIMIT (MySQL/PG), TOP or OFFSET ... FETCH (SQL Server), FETCH FIRST (standard).\n- \"Latest row\" pattern: ORDER BY created_at DESC, id DESC LIMIT 1, filtered by something unique to your test.\n- Pagination: OFFSET = (page - 1) * page_size; sort must be total, so add the primary key as the final tiebreaker.\n- DISTINCT dedupes whole rows and COUNT(DISTINCT col) counts unique values; don't use it to hide duplicate-producing joins.",
  "contentMarkdown": "## Without ORDER BY, the order is not defined\nThis is worth repeating from Part 1, because it's the root of many flaky database assertions. A table has no inherent order. The database returns rows in whatever way is cheapest at that moment, which can change after an insert, a vacuum, or a different execution plan. Any test that says \"the first row should be X\" needs an ORDER BY. In UI terms, it's the equivalent of asserting on nth(0) of a list that has no guaranteed sort.\n\n| Sorting basics | SELECT first_name, hire_date |\n|---|---|\n| FROM   employees | ORDER  BY hire_date DESC; |\n\n| first_name \\| hire_date | Bikash     \\| 2025-09-01 | Ravi       \\| 2025-03-10 |\n|---|---|---|\n| Asha       \\| 2024-03-01 | Mina       \\| 2023-07-15 | Sita       \\| 2022-01-20 |\n\nASC (ascending) is the default and DESC reverses it. You can sort by a column that isn't in the SELECT list, and (unlike WHERE) you can use a SELECT alias in ORDER BY, because sorting happens after the select step in the logical order from Part 1.\n## Sorting by several columns\nSort keys apply left to right; later keys only break ties in earlier ones:\n```sql\nSELECT first_name, department_id, hire_date\nFROM   employees\nORDER  BY department_id ASC, hire_date DESC;\n```\n\n| first_name \\| department_id \\| hire_date | Mina       \\| 1             \\| 2023-07-15 | Bikash     \\| 2             \\| 2025-09-01 |\n|---|---|---|\n| Ravi       \\| 2             \\| 2025-03-10 | Asha       \\| 2             \\| 2024-03-01 | Sita       \\| 3             \\| 2022-01-20 |\n\nYou can also sort by position (ORDER BY 2, 3) but that breaks silently when someone reorders the select list; prefer names.\n## Custom sort orders with CASE\nIf the UI shows statuses in a business order (pending first, then approved, then everything else), the plain alphabetical sort won't match. The database version uses CASE (chapter 2.4):\n\n| SELECT leave_request_id, status | FROM   leave_requests |\n|---|---|\n| ORDER  BY CASE status WHEN 'pending' THEN 1 WHEN 'approved' THEN 2 ELSE 3 END, | leave_request_id; |\n\n## Where NULLs land differs by database\nWhen the sort column has NULLs, the position of those rows depends on the dialect:\n\n| Database | ORDER BY col ASC puts NULLs | ORDER BY col DESC puts NULLs | MySQL | First | Last |\n|---|---|---|---|---|---|\n| SQL Server | First | Last | PostgreSQL | Last | First |\n\n## Sorting our employees by manager_id ASC, employee_id ASC:\nMySQL / SQL Server:  1, 3, 4 (manager_id NULL), then 2, 5 (manager_id 1)\n## PostgreSQL:          2, 5 (manager_id 1), then 1, 3, 4 (NULL)\n\nPostgreSQL lets you override with ORDER BY manager_id NULLS FIRST; in MySQL you can force NULLs last with ORDER BY manager_id IS NULL, manager_id. If a UI shows \"no manager\" rows at the top of a sorted list, first find out which behaviour the requirement expects before calling it a bug.\n## Text sorting depends on collation\nText sorting follows the column's collation (chapter 2.5). Case, accents and punctuation can rank differently in the database and in the front end. A UI that sorts with JavaScript localeCompare may disagree with a database that uses a binary or case-sensitive collation. Two typical false alarms: \"apple\" vs \"Banana\" ordering, and names with accents. When comparing UI order with ORDER BY output, agree on the source of truth first.\n```ts\ntest('name column sorted ascending matches DB order', async ({ page }) => {\n  await page.getByRole('columnheader', { name: 'Name' }).click();\n  const uiNames = await page.locator('td.name').allInnerTexts();\n```\n\n```ts\n  const [rows]: any = await db.execute(\n    'SELECT first_name FROM employees WHERE is_deleted = 0 ORDER BY first_name ASC, employee_id ASC');\n```\n\n  expect(uiNames).toEqual(rows.map((r: any) => r.first_name));\n});\n\n## Limiting rows\nEvery dialect can cut the result to the first N rows, but the syntax differs:\n\n| Dialect | First 3 rows | Skip 2, take 3 (pagination) | MySQL | ... LIMIT 3 |\n|---|---|---|---|---|\n| ... LIMIT 3 OFFSET 2 | PostgreSQL | ... LIMIT 3 | ... LIMIT 3 OFFSET 2 | SQL Server |\n| SELECT TOP 3 ... | ... ORDER BY x OFFSET 2 ROWS FETCH NEXT 3 ROWS ONLY | Standard SQL | ... FETCH FIRST 3 ROWS ONLY | ... OFFSET 2 ROWS FETCH NEXT 3 ROWS ONLY |\n\nLIMIT without ORDER BY gives you an arbitrary N rows, which is fine for a quick peek and wrong for any assertion.\n## The \"row my test just created\" pattern\nThe most common tester use of ORDER BY plus LIMIT is fetching the newest row after a UI or API action:\n\n| SELECT * FROM leave_requests | WHERE  employee_id = 2 |\n|---|---|\n| ORDER  BY created_at DESC, leave_request_id DESC | LIMIT  1; |\n\nNotice the tie-breaker (leave_request_id DESC). Two rows created in the same second have the same created_at, and without a tiebreaker either could come first. In shared databases, also filter by something unique to your test (your test user, your tagged email) so you don't pick up someone else's newer row.\n## Pagination and the stable-sort rule\nA list screen showing 2 rows per page turns into LIMIT 2 OFFSET 0 for page 1, LIMIT 2 OFFSET 2 for page 2, and so on. The formula is OFFSET = (page - 1) * page_size. Page 2 of our employees sorted by ID:\n```sql\nSELECT employee_id, first_name FROM employees\nORDER BY employee_id\nLIMIT 2 OFFSET 2;\n```\n\nemployee_id | first_name\n3           | Mina\n4           | Sita\n\nPagination is only correct if the sort order is total, meaning no two rows compare equal. Sorting by hire_date alone is unsafe if two people share a hire date, because the database can order the tied rows differently for page 1 and page 2, so a row appears on both pages or on neither. The fix is always to add a unique column as the last sort key (usually the primary key). That's one of the top pagination defects to test, and chapter 9.5 covers how.\nAlso know that a huge OFFSET gets slow (the database still walks past every skipped row), and that inserting a row while someone pages through can shift rows between pages. Both are behaviours worth noting but not usually bugs.\nDISTINCT removes duplicate result rows\n```sql\nSELECT DISTINCT status FROM employees;\n```\n\n| status | active |\n|---|---|\n| resigned | inactive |\n\nDISTINCT applies to the entire selected row, not just the first column. SELECT DISTINCT department_id, status returns each unique pair. You can also count unique values:\n\n| SELECT COUNT(*) AS rows_total, | COUNT(DISTINCT department_id) AS departments_used |\n|---|---|\n| FROM   employees; | -- 5 and 3 |\n\n## DISTINCT can hide bugs\nAdding DISTINCT to make a query \"look right\" is dangerous for testers. If a join produces duplicated rows and you tack on DISTINCT, the duplicates vanish from your result while the underlying problem (a bad join, or duplicate records in the table) remains. When you are hunting duplicates, do the opposite: don't use DISTINCT, and group by the supposed-unique key and count (chapter 3.2 and 6.3). Use DISTINCT deliberately, to answer \"which distinct values exist?\" (for example, to list every status value actually in use and compare it against the documented list).\n```sql\nSELECT DISTINCT and GROUP BY overlap, but GROUP BY also lets you aggregate, which Part 3 covers.\n```\n",
  "blocks": [
    {
      "id": "sql-2-2-md-0",
      "type": "overview",
      "heading": "Without ORDER BY, the order is not defined",
      "content": "This is worth repeating from Part 1, because it's the root of many flaky database assertions. A table has no inherent order. The database returns rows in whatever way is cheapest at that moment, which can change after an insert, a vacuum, or a different execution plan. Any test that says \"the first row should be X\" needs an ORDER BY. In UI terms, it's the equivalent of asserting on nth(0) of a list that has no guaranteed sort.\n\n| Sorting basics | SELECT first_name, hire_date |\n|---|---|\n| FROM   employees | ORDER  BY hire_date DESC; |\n\n| first_name \\| hire_date | Bikash     \\| 2025-09-01 | Ravi       \\| 2025-03-10 |\n|---|---|---|\n| Asha       \\| 2024-03-01 | Mina       \\| 2023-07-15 | Sita       \\| 2022-01-20 |\n\nASC (ascending) is the default and DESC reverses it. You can sort by a column that isn't in the SELECT list, and (unlike WHERE) you can use a SELECT alias in ORDER BY, because sorting happens after the select step in the logical order from Part 1.",
      "order": 0
    },
    {
      "id": "sql-2-2-md-1",
      "type": "overview",
      "heading": "Sorting by several columns",
      "content": "Sort keys apply left to right; later keys only break ties in earlier ones:\n```sql\nSELECT first_name, department_id, hire_date\nFROM   employees\nORDER  BY department_id ASC, hire_date DESC;\n```\n\n| first_name \\| department_id \\| hire_date | Mina       \\| 1             \\| 2023-07-15 | Bikash     \\| 2             \\| 2025-09-01 |\n|---|---|---|\n| Ravi       \\| 2             \\| 2025-03-10 | Asha       \\| 2             \\| 2024-03-01 | Sita       \\| 3             \\| 2022-01-20 |\n\nYou can also sort by position (ORDER BY 2, 3) but that breaks silently when someone reorders the select list; prefer names.",
      "order": 1
    },
    {
      "id": "sql-2-2-md-2",
      "type": "overview",
      "heading": "Custom sort orders with CASE",
      "content": "If the UI shows statuses in a business order (pending first, then approved, then everything else), the plain alphabetical sort won't match. The database version uses CASE (chapter 2.4):\n\n| SELECT leave_request_id, status | FROM   leave_requests |\n|---|---|\n| ORDER  BY CASE status WHEN 'pending' THEN 1 WHEN 'approved' THEN 2 ELSE 3 END, | leave_request_id; |",
      "order": 2
    },
    {
      "id": "sql-2-2-md-3",
      "type": "overview",
      "heading": "Where NULLs land differs by database",
      "content": "When the sort column has NULLs, the position of those rows depends on the dialect:\n\n| Database | ORDER BY col ASC puts NULLs | ORDER BY col DESC puts NULLs | MySQL | First | Last |\n|---|---|---|---|---|---|\n| SQL Server | First | Last | PostgreSQL | Last | First |",
      "order": 3
    },
    {
      "id": "sql-2-2-md-4",
      "type": "overview",
      "heading": "Sorting our employees by manager_id ASC, employee_id ASC:",
      "content": "MySQL / SQL Server:  1, 3, 4 (manager_id NULL), then 2, 5 (manager_id 1)",
      "order": 4
    },
    {
      "id": "sql-2-2-md-5",
      "type": "overview",
      "heading": "PostgreSQL:          2, 5 (manager_id 1), then 1, 3, 4 (NULL)",
      "content": "PostgreSQL lets you override with ORDER BY manager_id NULLS FIRST; in MySQL you can force NULLs last with ORDER BY manager_id IS NULL, manager_id. If a UI shows \"no manager\" rows at the top of a sorted list, first find out which behaviour the requirement expects before calling it a bug.",
      "order": 5
    },
    {
      "id": "sql-2-2-md-6",
      "type": "overview",
      "heading": "Text sorting depends on collation",
      "content": "Text sorting follows the column's collation (chapter 2.5). Case, accents and punctuation can rank differently in the database and in the front end. A UI that sorts with JavaScript localeCompare may disagree with a database that uses a binary or case-sensitive collation. Two typical false alarms: \"apple\" vs \"Banana\" ordering, and names with accents. When comparing UI order with ORDER BY output, agree on the source of truth first.\n```ts\ntest('name column sorted ascending matches DB order', async ({ page }) => {\n  await page.getByRole('columnheader', { name: 'Name' }).click();\n  const uiNames = await page.locator('td.name').allInnerTexts();\n```\n\n```ts\n  const [rows]: any = await db.execute(\n    'SELECT first_name FROM employees WHERE is_deleted = 0 ORDER BY first_name ASC, employee_id ASC');\n```\n\n  expect(uiNames).toEqual(rows.map((r: any) => r.first_name));\n});",
      "order": 6
    },
    {
      "id": "sql-2-2-md-7",
      "type": "overview",
      "heading": "Limiting rows",
      "content": "Every dialect can cut the result to the first N rows, but the syntax differs:\n\n| Dialect | First 3 rows | Skip 2, take 3 (pagination) | MySQL | ... LIMIT 3 |\n|---|---|---|---|---|\n| ... LIMIT 3 OFFSET 2 | PostgreSQL | ... LIMIT 3 | ... LIMIT 3 OFFSET 2 | SQL Server |\n| SELECT TOP 3 ... | ... ORDER BY x OFFSET 2 ROWS FETCH NEXT 3 ROWS ONLY | Standard SQL | ... FETCH FIRST 3 ROWS ONLY | ... OFFSET 2 ROWS FETCH NEXT 3 ROWS ONLY |\n\nLIMIT without ORDER BY gives you an arbitrary N rows, which is fine for a quick peek and wrong for any assertion.",
      "order": 7
    },
    {
      "id": "sql-2-2-md-8",
      "type": "overview",
      "heading": "The \"row my test just created\" pattern",
      "content": "The most common tester use of ORDER BY plus LIMIT is fetching the newest row after a UI or API action:\n\n| SELECT * FROM leave_requests | WHERE  employee_id = 2 |\n|---|---|\n| ORDER  BY created_at DESC, leave_request_id DESC | LIMIT  1; |\n\nNotice the tie-breaker (leave_request_id DESC). Two rows created in the same second have the same created_at, and without a tiebreaker either could come first. In shared databases, also filter by something unique to your test (your test user, your tagged email) so you don't pick up someone else's newer row.",
      "order": 8
    },
    {
      "id": "sql-2-2-md-9",
      "type": "overview",
      "heading": "Pagination and the stable-sort rule",
      "content": "A list screen showing 2 rows per page turns into LIMIT 2 OFFSET 0 for page 1, LIMIT 2 OFFSET 2 for page 2, and so on. The formula is OFFSET = (page - 1) * page_size. Page 2 of our employees sorted by ID:\n```sql\nSELECT employee_id, first_name FROM employees\nORDER BY employee_id\nLIMIT 2 OFFSET 2;\n```\n\nemployee_id | first_name\n3           | Mina\n4           | Sita\n\nPagination is only correct if the sort order is total, meaning no two rows compare equal. Sorting by hire_date alone is unsafe if two people share a hire date, because the database can order the tied rows differently for page 1 and page 2, so a row appears on both pages or on neither. The fix is always to add a unique column as the last sort key (usually the primary key). That's one of the top pagination defects to test, and chapter 9.5 covers how.\nAlso know that a huge OFFSET gets slow (the database still walks past every skipped row), and that inserting a row while someone pages through can shift rows between pages. Both are behaviours worth noting but not usually bugs.\nDISTINCT removes duplicate result rows\n```sql\nSELECT DISTINCT status FROM employees;\n```\n\n| status | active |\n|---|---|\n| resigned | inactive |\n\nDISTINCT applies to the entire selected row, not just the first column. SELECT DISTINCT department_id, status returns each unique pair. You can also count unique values:\n\n| SELECT COUNT(*) AS rows_total, | COUNT(DISTINCT department_id) AS departments_used |\n|---|---|\n| FROM   employees; | -- 5 and 3 |",
      "order": 9
    },
    {
      "id": "sql-2-2-md-10",
      "type": "overview",
      "heading": "DISTINCT can hide bugs",
      "content": "Adding DISTINCT to make a query \"look right\" is dangerous for testers. If a join produces duplicated rows and you tack on DISTINCT, the duplicates vanish from your result while the underlying problem (a bad join, or duplicate records in the table) remains. When you are hunting duplicates, do the opposite: don't use DISTINCT, and group by the supposed-unique key and count (chapter 3.2 and 6.3). Use DISTINCT deliberately, to answer \"which distinct values exist?\" (for example, to list every status value actually in use and compare it against the documented list).\n```sql\nSELECT DISTINCT and GROUP BY overlap, but GROUP BY also lets you aggregate, which Part 3 covers.\n```",
      "order": 10
    }
  ],
  "advantages": [
    "2.2 ORDER BY, LIMIT/TOP, DISTINCT — 2."
  ],
  "limitations": [
    "2.2 ORDER BY, LIMIT/TOP, DISTINCT is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
