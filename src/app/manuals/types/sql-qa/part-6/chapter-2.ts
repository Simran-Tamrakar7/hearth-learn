import type { ChapterRecord } from "../../../types";

/** 6.2 Comparing Expected vs Actual Data Sets */
export const chapter = {
  "id": "sql-6-2-comparing-expected-vs-actual-data-sets",
  "title": "6.2 Comparing Expected vs Actual Data Sets",
  "minutes": 25,
  "level": "intermediate",
  "phase": "Part 6 · Data Validation Techniques for QA",
  "partName": "Part 6 · Data Validation Techniques for QA",
  "overviewText": "Almost every data check has the same shape: obtain the result the system should produce, obtain what it actually produced, and compare them completely and mechanically. 6.1 did it for a migration, and this chapter generalises it: payroll runs against the analyst's calculation, an export against the screen, a report against the raw tables, a new release's output against the last release's. The skill is doing it in a way that finds every difference and never invents false ones. The most important rule is that the oracle must be independent of the code under test. If you copy the developer's formula into your query, you'll reproduce their bug and pass. Derive expected values from the requiremen",
  "why": "6.2 Comparing Expected vs Actual Data Sets is how a tester proves stored state, not just the screen. Almost every data check has the same shape: obtain the result the system should produce, obtain what it actually produced, and compare them completely and mechanically.",
  "when": "Open this chapter when you are on the Data Validation Techniques for QA path and need Comparing Expected vs Actual Data Sets against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen.",
  "practical": {
    "app": "Bizlevate HRMS / hrms_practice",
    "scenario": "A leave, payroll, attendance, or appointment check depends on Comparing Expected vs Actual Data Sets.",
    "pass": "You apply Comparing Expected vs Actual Data Sets on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
    "fail": "You copy a blog query, skip Comparing Expected vs Actual Data Sets, or treat a UI success toast as proof the row is correct."
  },
  "tools": [],
  "customSummary": "- Core loop: obtain expected, obtain actual, compare mechanically and completely.\n- Expected sources: spec, analyst spreadsheet, old system, independent SQL, previous release, seeded known data; the oracle must be independent of the code under test.\n- Load expected data into a scratch table (LOAD DATA, \\copy, BULK INSERT, import wizard) with proper types, or inline with VALUES in a CTE on read-only accounts.\n- Pick the comparison key first; a wrong key produces nonsense.\n- Classify every record: MATCH, DIFF, MISSING, DUPLICATE, plus a reverse query for EXTRA; order of CASE branches is a decision.\n- Two-way EXCEPT gives a fast yes/no on whole rows (NULL-safe) but hides duplicates and doesn't say why.\n- Normalise before comparing: money tolerance/rounding, trim/case, time zone and precision, codes vs labels, booleans, ordering, NULL vs empty; document tolerances explicitly.\n- Same approach for UI, API and exports: pandas merge(indicator=True), Playwright CSV download and parse; align types (Decimal vs float, strings vs numbers, formatted amounts).\n- Old query as oracle for refactors; same query across environments or releases.\n- Report key, column, expected, actual and difference, with counts per category and attached evidence.\n- Pitfalls: comparing a result with itself, hidden duplicates, type mismatches, unstable order, stale expected data, silent tolerances.",
  "contentMarkdown": "## The core loop of data testing\nAlmost every data check has the same shape: obtain the result the system should produce, obtain what it actually produced, and compare them completely and mechanically. 6.1 did it for a migration, and this chapter generalises it: payroll runs against the analyst's calculation, an export against the screen, a report against the raw tables, a new release's output against the last release's. The skill is doing it in a way that finds every difference and never invents false ones.\n\n| Where \"expected\" comes from | Source |\n|---|---|\n| Trust | Caveat |\n| The requirement or spec, worked out by hand | High |\n| Small samples only | An analyst's spreadsheet or calculation |\n| High, but they make mistakes too | Check their rounding and rules |\n| The old system's output | Medium |\n| It may itself be wrong, so treat differences as questions | An independent SQL calculation you wrote |\n| High | It must not share the app's logic or bugs |\n| A previous release's output (baseline) | Medium |\n| Proves no change, not correctness | A known seed data set with hand-verified answers |\n| Very high | Limited coverage |\n\nThe most important rule is that the oracle must be independent of the code under test. If you copy the developer's formula into your query, you'll reproduce their bug and pass. Derive expected values from the requirement (basic + allowances - deductions) and not from reading the code.\n## Getting expected data into the database\nComparison is easiest when both sides are tables, so load the expected data into a scratch table. From a CSV:\n```sql\n-- MySQL (local_infile must be enabled on server and client)\n```\n| LOAD DATA LOCAL INFILE '/tmp/expected_payroll_aug.csv' | INTO TABLE expected_payroll_aug |\n|---|---|\n| FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"' LINES TERMINATED BY '\\n' IGNORE 1 LINES; | -- PostgreSQL (psql):   \\copy expected_payroll_aug FROM 'expected_payroll_aug.csv' CSV HEADER |\n| -- SQL Server:          BULK INSERT expected_payroll_aug FROM 'C:\\data\\expected.csv' | --                      WITH (FIRSTROW = 2, FIELDTERMINATOR = ',', ROWTERMINATOR = '\\n'); |\n\nDBeaver's import wizard does the same with a GUI. Type the columns properly (DECIMAL, DATE) so the comparison isn't text against numbers (1.2). On a read-only account where you can't create tables, embed the expected values inline as a CTE:\n```sql\n-- MySQL 8.0.19+\nWITH expected (employee_id, net_pay) AS (VALUES ROW(1, 57500), ROW(2, 43500), ROW(3, 67000))\nSELECT * FROM expected;\n-- PostgreSQL:  (VALUES (1, 57500), (2, 43500)) AS expected(employee_id, net_pay)\n```\n\n## Choose the comparison key first\nDecide what identifies \"the same record\" on both sides: employee_id, or (employee_id, pay_month), or (legacy_emp_no). Everything else is compared column by column for the same key. A wrong key produces nonsense: keying payroll on employee_id alone across several months matches every month against every other.\n## Classify every record: MATCH, DIFF, MISSING, DUPLICATE, EXTRA\nA single query can classify all expected records (window functions from 5.5 help detect duplicates):\n\n| WITH actual AS ( | SELECT p.*, | COUNT(*)     OVER (PARTITION BY employee_id)                      AS copies, |\n|---|---|---|\n| ROW_NUMBER() OVER (PARTITION BY employee_id ORDER BY payroll_id)  AS rn | FROM   payroll p | WHERE  pay_month = '2026-08-01' |\n| ) | SELECT e.employee_id, | CASE |\n| WHEN a.employee_id IS NULL THEN 'MISSING' | WHEN a.copies > 1          THEN 'DUPLICATE' | WHEN NOT (a.basic_salary <=> e.basic_salary AND a.allowances <=> e.allowances |\n| AND a.deductions   <=> e.deductions   AND a.net_pay     <=> e.net_pay) THEN 'DIFF' | ELSE 'MATCH' | END                AS result, |\n| e.net_pay          AS expected_net, | a.net_pay          AS actual_net, | a.copies |\n| FROM   expected_payroll_aug e | LEFT JOIN actual a ON a.employee_id = e.employee_id AND a.rn = 1 | ORDER  BY e.employee_id; |\n\nemployee_id | result    | expected_net | actual_net | copies\n| 1           \\| MATCH     \\| 57500.00     \\| 57500.00   \\| 1 | 2           \\| DUPLICATE \\| 43500.00     \\| 43500.00   \\| 2 |\n|---|---|\n| 3           \\| DIFF      \\| 67000.00     \\| 66000.00   \\| 1 | 4           \\| MISSING   \\| 45000.00     \\| NULL       \\| NULL |\n\nOne line per employee, four different outcomes, and a ready-made defect list. The CASE order is a decision: here a duplicate is reported before a value difference. Also run the reverse direction, records that exist but were never expected:\n```sql\nSELECT p.payroll_id, p.employee_id, p.net_pay\nFROM   payroll p\nLEFT JOIN expected_payroll_aug e ON e.employee_id = p.employee_id\nWHERE  p.pay_month = '2026-08-01' AND e.employee_id IS NULL;      -- 0 rows: no unexpected employees\n```\n\n## The two-way EXCEPT as a whole-row alternative\nWhen there is no obvious key, or you just want \"are these two sets identical?\", EXCEPT compares entire rows and treats NULLs as equal (5.4). Run it in both directions (MySQL 8.0.31+, PostgreSQL, SQL Server):\n-- Actual rows that aren't expected\n```sql\nSELECT employee_id, basic_salary, allowances, deductions, net_pay FROM payroll WHERE pay_month = '2026-08-01'\n```\nEXCEPT\n```sql\nSELECT employee_id, basic_salary, allowances, deductions, net_pay FROM expected_payroll_aug;\n```\n\n-- Expected rows that aren't actual\n```sql\nSELECT employee_id, basic_salary, allowances, deductions, net_pay FROM expected_payroll_aug\n```\nEXCEPT\n```sql\nSELECT employee_id, basic_salary, allowances, deductions, net_pay FROM payroll WHERE pay_month = '2026-08-01';\n```\n\n## (first query)                                      (second query)\nemployee_id | ... | net_pay                        employee_id | basic  | allow | deduct | net_pay\n3           | 70000 | 6000 | 9000 | 66000.00       3           | 70000  | 6000  | 9000   | 67000.00\n                                                    4           | 50000  | 0     | 5000   | 45000.00\n\nEXCEPT shows that rows differ, but the keyed classification above shows how (missing versus wrong value versus duplicate). It also cannot see Ravi's duplicate, because it de-duplicates (5.4). Use EXCEPT for a fast yes/no and the classification query for the diagnosis.\n## Normalise before comparing\nMany false differences come from comparing values that mean the same thing but look different. Decide the rules and apply them to both sides:\n\n| Value type | Normalise by | Example | Money | Compare within a tolerance, or round both to the required scale | ABS(a.net_pay - e.net_pay) < 0.01 |\n|---|---|---|---|---|---|\n| Text | TRIM, LOWER, and remove non-breaking spaces if imports are involved (2.5) | LOWER(TRIM(a.email)) = LOWER(TRIM(e.email)) | Dates and times | Agree on time zone and precision; truncate seconds if the UI hides them | DATE(a.created_at), or compare in UTC |\n| Codes vs labels | Map one side to the other | 'A' vs 'Active' | Booleans | Map 0/1, true/false, Y/N to one form | is_deleted = 1 vs \"Yes\" |\n| Ordering | Sort both sides on a total order before comparing lists | ORDER BY employee_id | NULL vs empty | Decide whether '' equals NULL | NULLIF(TRIM(x), '') |\n\nTolerances are a judgement, so write them into the test report (\"differences under 0.01 ignored, per requirement R-114\"). A tolerance you adopt silently to make a test pass is how real rounding defects get buried. Rounding rules themselves (SQL versus Python versus JavaScript) are in 2.4.\n## Comparing UI, API and export data with the database\nThe same approach works when the \"actual\" is something other than a table. Pull the actual data from the UI, the API response or an exported file into a list of records, load the expected side from SQL, and compare by key. In Python, pandas gives you the classification for free through merge(..., indicator=True):\n```py\nimport pandas as pd\n```\n\nexpected = pd.read_sql(\"\"\"SELECT employee_id, net_pay\n## FROM expected_payroll_aug\"\"\", db_conn)\nactual   = pd.DataFrame(api.get(\"/api/payroll\", params={\"month\": \"2026-08\"}).json()[\"items\"])[[\"employeeId\", \"netPay\"]]\n## actual   = actual.rename(columns={\"employeeId\": \"employee_id\", \"netPay\": \"net_pay\"})\n\nexpected[\"net_pay\"] = expected[\"net_pay\"].astype(float).round(2)     # Decimal vs float: align types first\n## actual[\"net_pay\"]   = actual[\"net_pay\"].astype(float).round(2)\n\nm = expected.merge(actual, on=\"employee_id\", how=\"outer\", suffixes=(\"_exp\", \"_act\"), indicator=True)\nmissing = m[m[\"_merge\"] == \"left_only\"]                               # expected, absent from API\nextra   = m[m[\"_merge\"] == \"right_only\"]                              # in API, not expected\n## both    = m[m[\"_merge\"] == \"both\"]\n## diff    = both[(both[\"net_pay_exp\"] - both[\"net_pay_act\"]).abs() > 0.005]\n\n## assert missing.empty and extra.empty and diff.empty, (missing, extra, diff)\n\nFor the UI, read the table cells (allInnerTexts() or evaluateAll) and parse them. For an exported file, download it in the test and parse it:\n```ts\nimport fs from 'fs';\nimport { parse } from 'csv-parse/sync';\n```\n\n| test('payroll CSV export equals DB for August', async ({ page }) => { | await page.goto('/payroll?month=2026-08'); | const [download] = await Promise.all([ |\n|---|---|---|\n| page.waitForEvent('download'), | page.getByRole('button', { name: 'Export CSV' }).click(), | ]); |\n\n```ts\n  const [dbRows]: any = await db.execute(\n    `SELECT employee_id, net_pay FROM payroll WHERE pay_month = '2026-08-01' ORDER BY employee_id, payroll_id`);\n```\n\n  expect(csvRows.length).toBe(dbRows.length);                          // catches dropped/duplicated rows\n  expect(csvRows.map(r => [Number(r['Employee ID']), Number(r['Net Pay'].replace(/,/g, ''))]))\n    .toEqual(dbRows.map((r: any) => [r.employee_id, Number(r.net_pay)]));\n});\n\nTwo subtle problems: DECIMAL values arrive as strings from many drivers (3.1), so cast before comparing; and exports often format numbers (57,500.00), so strip the formatting on the UI side, never on the database side.\n## Comparing two versions of the same query or environment\nWhen a query is rewritten (a report is optimised, a view is refactored), the old version is your oracle: old EXCEPT new and new EXCEPT old must both be empty. The same trick works across environments or releases (6.5 and 6.6): run the identical query in two places and diff the results.\n## Report the differences usefully\nA comparison result is only helpful if someone can act on it. Include the key, the column, the expected value, the actual value, and the difference for numbers. Summarise counts by category (1 match, 1 duplicate, 1 diff, 1 missing), keep the full list as an attachment (11.3), and record which comparison rules and tolerances you used.\n## Pitfalls to avoid\nComparing a result with itself. Computing \"expected\" from the same table (or the same view) the app reads proves nothing.\nHidden duplicates. Set-based comparison hides them; check counts too (copies above).\nType mismatches. A '57500.00' string does not equal 57500 in strict tests, and Decimal('0.1') isn't 0.1 as a float.\nUnstable order. Comparing two lists position by position without a total ORDER BY produces random failures (2.2).\nStale expected data. When the requirement changes, the spreadsheet changes; keep a version and a date with every expected file.\nSilent tolerance. If more than a few rows need a tolerance to pass, the rounding rule itself may be the defect.\n",
  "blocks": [
    {
      "id": "sql-6-2-md-0",
      "type": "overview",
      "heading": "The core loop of data testing",
      "content": "Almost every data check has the same shape: obtain the result the system should produce, obtain what it actually produced, and compare them completely and mechanically. 6.1 did it for a migration, and this chapter generalises it: payroll runs against the analyst's calculation, an export against the screen, a report against the raw tables, a new release's output against the last release's. The skill is doing it in a way that finds every difference and never invents false ones.\n\n| Where \"expected\" comes from | Source |\n|---|---|\n| Trust | Caveat |\n| The requirement or spec, worked out by hand | High |\n| Small samples only | An analyst's spreadsheet or calculation |\n| High, but they make mistakes too | Check their rounding and rules |\n| The old system's output | Medium |\n| It may itself be wrong, so treat differences as questions | An independent SQL calculation you wrote |\n| High | It must not share the app's logic or bugs |\n| A previous release's output (baseline) | Medium |\n| Proves no change, not correctness | A known seed data set with hand-verified answers |\n| Very high | Limited coverage |\n\nThe most important rule is that the oracle must be independent of the code under test. If you copy the developer's formula into your query, you'll reproduce their bug and pass. Derive expected values from the requirement (basic + allowances - deductions) and not from reading the code.",
      "order": 0
    },
    {
      "id": "sql-6-2-md-1",
      "type": "overview",
      "heading": "Getting expected data into the database",
      "content": "Comparison is easiest when both sides are tables, so load the expected data into a scratch table. From a CSV:\n```sql\n-- MySQL (local_infile must be enabled on server and client)\n```\n| LOAD DATA LOCAL INFILE '/tmp/expected_payroll_aug.csv' | INTO TABLE expected_payroll_aug |\n|---|---|\n| FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"' LINES TERMINATED BY '\\n' IGNORE 1 LINES; | -- PostgreSQL (psql):   \\copy expected_payroll_aug FROM 'expected_payroll_aug.csv' CSV HEADER |\n| -- SQL Server:          BULK INSERT expected_payroll_aug FROM 'C:\\data\\expected.csv' | --                      WITH (FIRSTROW = 2, FIELDTERMINATOR = ',', ROWTERMINATOR = '\\n'); |\n\nDBeaver's import wizard does the same with a GUI. Type the columns properly (DECIMAL, DATE) so the comparison isn't text against numbers (1.2). On a read-only account where you can't create tables, embed the expected values inline as a CTE:\n```sql\n-- MySQL 8.0.19+\nWITH expected (employee_id, net_pay) AS (VALUES ROW(1, 57500), ROW(2, 43500), ROW(3, 67000))\nSELECT * FROM expected;\n-- PostgreSQL:  (VALUES (1, 57500), (2, 43500)) AS expected(employee_id, net_pay)\n```",
      "order": 1
    },
    {
      "id": "sql-6-2-md-2",
      "type": "overview",
      "heading": "Choose the comparison key first",
      "content": "Decide what identifies \"the same record\" on both sides: employee_id, or (employee_id, pay_month), or (legacy_emp_no). Everything else is compared column by column for the same key. A wrong key produces nonsense: keying payroll on employee_id alone across several months matches every month against every other.",
      "order": 2
    },
    {
      "id": "sql-6-2-md-3",
      "type": "overview",
      "heading": "Classify every record: MATCH, DIFF, MISSING, DUPLICATE, EXTRA",
      "content": "A single query can classify all expected records (window functions from 5.5 help detect duplicates):\n\n| WITH actual AS ( | SELECT p.*, | COUNT(*)     OVER (PARTITION BY employee_id)                      AS copies, |\n|---|---|---|\n| ROW_NUMBER() OVER (PARTITION BY employee_id ORDER BY payroll_id)  AS rn | FROM   payroll p | WHERE  pay_month = '2026-08-01' |\n| ) | SELECT e.employee_id, | CASE |\n| WHEN a.employee_id IS NULL THEN 'MISSING' | WHEN a.copies > 1          THEN 'DUPLICATE' | WHEN NOT (a.basic_salary <=> e.basic_salary AND a.allowances <=> e.allowances |\n| AND a.deductions   <=> e.deductions   AND a.net_pay     <=> e.net_pay) THEN 'DIFF' | ELSE 'MATCH' | END                AS result, |\n| e.net_pay          AS expected_net, | a.net_pay          AS actual_net, | a.copies |\n| FROM   expected_payroll_aug e | LEFT JOIN actual a ON a.employee_id = e.employee_id AND a.rn = 1 | ORDER  BY e.employee_id; |\n\nemployee_id | result    | expected_net | actual_net | copies\n| 1           \\| MATCH     \\| 57500.00     \\| 57500.00   \\| 1 | 2           \\| DUPLICATE \\| 43500.00     \\| 43500.00   \\| 2 |\n|---|---|\n| 3           \\| DIFF      \\| 67000.00     \\| 66000.00   \\| 1 | 4           \\| MISSING   \\| 45000.00     \\| NULL       \\| NULL |\n\nOne line per employee, four different outcomes, and a ready-made defect list. The CASE order is a decision: here a duplicate is reported before a value difference. Also run the reverse direction, records that exist but were never expected:\n```sql\nSELECT p.payroll_id, p.employee_id, p.net_pay\nFROM   payroll p\nLEFT JOIN expected_payroll_aug e ON e.employee_id = p.employee_id\nWHERE  p.pay_month = '2026-08-01' AND e.employee_id IS NULL;      -- 0 rows: no unexpected employees\n```",
      "order": 3
    },
    {
      "id": "sql-6-2-md-4",
      "type": "overview",
      "heading": "The two-way EXCEPT as a whole-row alternative",
      "content": "When there is no obvious key, or you just want \"are these two sets identical?\", EXCEPT compares entire rows and treats NULLs as equal (5.4). Run it in both directions (MySQL 8.0.31+, PostgreSQL, SQL Server):\n-- Actual rows that aren't expected\n```sql\nSELECT employee_id, basic_salary, allowances, deductions, net_pay FROM payroll WHERE pay_month = '2026-08-01'\n```\nEXCEPT\n```sql\nSELECT employee_id, basic_salary, allowances, deductions, net_pay FROM expected_payroll_aug;\n```\n\n-- Expected rows that aren't actual\n```sql\nSELECT employee_id, basic_salary, allowances, deductions, net_pay FROM expected_payroll_aug\n```\nEXCEPT\n```sql\nSELECT employee_id, basic_salary, allowances, deductions, net_pay FROM payroll WHERE pay_month = '2026-08-01';\n```",
      "order": 4
    },
    {
      "id": "sql-6-2-md-5",
      "type": "overview",
      "heading": "(first query)                                      (second query)",
      "content": "employee_id | ... | net_pay                        employee_id | basic  | allow | deduct | net_pay\n3           | 70000 | 6000 | 9000 | 66000.00       3           | 70000  | 6000  | 9000   | 67000.00\n                                                    4           | 50000  | 0     | 5000   | 45000.00\n\nEXCEPT shows that rows differ, but the keyed classification above shows how (missing versus wrong value versus duplicate). It also cannot see Ravi's duplicate, because it de-duplicates (5.4). Use EXCEPT for a fast yes/no and the classification query for the diagnosis.",
      "order": 5
    },
    {
      "id": "sql-6-2-md-6",
      "type": "overview",
      "heading": "Normalise before comparing",
      "content": "Many false differences come from comparing values that mean the same thing but look different. Decide the rules and apply them to both sides:\n\n| Value type | Normalise by | Example | Money | Compare within a tolerance, or round both to the required scale | ABS(a.net_pay - e.net_pay) < 0.01 |\n|---|---|---|---|---|---|\n| Text | TRIM, LOWER, and remove non-breaking spaces if imports are involved (2.5) | LOWER(TRIM(a.email)) = LOWER(TRIM(e.email)) | Dates and times | Agree on time zone and precision; truncate seconds if the UI hides them | DATE(a.created_at), or compare in UTC |\n| Codes vs labels | Map one side to the other | 'A' vs 'Active' | Booleans | Map 0/1, true/false, Y/N to one form | is_deleted = 1 vs \"Yes\" |\n| Ordering | Sort both sides on a total order before comparing lists | ORDER BY employee_id | NULL vs empty | Decide whether '' equals NULL | NULLIF(TRIM(x), '') |\n\nTolerances are a judgement, so write them into the test report (\"differences under 0.01 ignored, per requirement R-114\"). A tolerance you adopt silently to make a test pass is how real rounding defects get buried. Rounding rules themselves (SQL versus Python versus JavaScript) are in 2.4.",
      "order": 6
    },
    {
      "id": "sql-6-2-md-7",
      "type": "overview",
      "heading": "Comparing UI, API and export data with the database",
      "content": "The same approach works when the \"actual\" is something other than a table. Pull the actual data from the UI, the API response or an exported file into a list of records, load the expected side from SQL, and compare by key. In Python, pandas gives you the classification for free through merge(..., indicator=True):\n```py\nimport pandas as pd\n```\n\nexpected = pd.read_sql(\"\"\"SELECT employee_id, net_pay",
      "order": 7
    },
    {
      "id": "sql-6-2-md-8",
      "type": "overview",
      "heading": "FROM expected_payroll_aug\"\"\", db_conn)",
      "content": "actual   = pd.DataFrame(api.get(\"/api/payroll\", params={\"month\": \"2026-08\"}).json()[\"items\"])[[\"employeeId\", \"netPay\"]]",
      "order": 8
    },
    {
      "id": "sql-6-2-md-9",
      "type": "overview",
      "heading": "actual   = actual.rename(columns={\"employeeId\": \"employee_id\", \"netPay\": \"net_pay\"})",
      "content": "expected[\"net_pay\"] = expected[\"net_pay\"].astype(float).round(2)     # Decimal vs float: align types first",
      "order": 9
    },
    {
      "id": "sql-6-2-md-10",
      "type": "overview",
      "heading": "actual[\"net_pay\"]   = actual[\"net_pay\"].astype(float).round(2)",
      "content": "m = expected.merge(actual, on=\"employee_id\", how=\"outer\", suffixes=(\"_exp\", \"_act\"), indicator=True)\nmissing = m[m[\"_merge\"] == \"left_only\"]                               # expected, absent from API\nextra   = m[m[\"_merge\"] == \"right_only\"]                              # in API, not expected",
      "order": 10
    },
    {
      "id": "sql-6-2-md-11",
      "type": "overview",
      "heading": "both    = m[m[\"_merge\"] == \"both\"]",
      "content": "both    = m[m[\"_merge\"] == \"both\"]",
      "order": 11
    },
    {
      "id": "sql-6-2-md-12",
      "type": "overview",
      "heading": "diff    = both[(both[\"net_pay_exp\"] - both[\"net_pay_act\"]).abs() > 0.005]",
      "content": "diff    = both[(both[\"net_pay_exp\"] - both[\"net_pay_act\"]).abs() > 0.005]",
      "order": 12
    },
    {
      "id": "sql-6-2-md-13",
      "type": "overview",
      "heading": "assert missing.empty and extra.empty and diff.empty, (missing, extra, diff)",
      "content": "For the UI, read the table cells (allInnerTexts() or evaluateAll) and parse them. For an exported file, download it in the test and parse it:\n```ts\nimport fs from 'fs';\nimport { parse } from 'csv-parse/sync';\n```\n\n| test('payroll CSV export equals DB for August', async ({ page }) => { | await page.goto('/payroll?month=2026-08'); | const [download] = await Promise.all([ |\n|---|---|---|\n| page.waitForEvent('download'), | page.getByRole('button', { name: 'Export CSV' }).click(), | ]); |\n\n```ts\n  const [dbRows]: any = await db.execute(\n    `SELECT employee_id, net_pay FROM payroll WHERE pay_month = '2026-08-01' ORDER BY employee_id, payroll_id`);\n```\n\n  expect(csvRows.length).toBe(dbRows.length);                          // catches dropped/duplicated rows\n  expect(csvRows.map(r => [Number(r['Employee ID']), Number(r['Net Pay'].replace(/,/g, ''))]))\n    .toEqual(dbRows.map((r: any) => [r.employee_id, Number(r.net_pay)]));\n});\n\nTwo subtle problems: DECIMAL values arrive as strings from many drivers (3.1), so cast before comparing; and exports often format numbers (57,500.00), so strip the formatting on the UI side, never on the database side.",
      "order": 13
    },
    {
      "id": "sql-6-2-md-14",
      "type": "overview",
      "heading": "Comparing two versions of the same query or environment",
      "content": "When a query is rewritten (a report is optimised, a view is refactored), the old version is your oracle: old EXCEPT new and new EXCEPT old must both be empty. The same trick works across environments or releases (6.5 and 6.6): run the identical query in two places and diff the results.",
      "order": 14
    },
    {
      "id": "sql-6-2-md-15",
      "type": "overview",
      "heading": "Report the differences usefully",
      "content": "A comparison result is only helpful if someone can act on it. Include the key, the column, the expected value, the actual value, and the difference for numbers. Summarise counts by category (1 match, 1 duplicate, 1 diff, 1 missing), keep the full list as an attachment (11.3), and record which comparison rules and tolerances you used.",
      "order": 15
    },
    {
      "id": "sql-6-2-md-16",
      "type": "overview",
      "heading": "Pitfalls to avoid",
      "content": "Comparing a result with itself. Computing \"expected\" from the same table (or the same view) the app reads proves nothing.\nHidden duplicates. Set-based comparison hides them; check counts too (copies above).\nType mismatches. A '57500.00' string does not equal 57500 in strict tests, and Decimal('0.1') isn't 0.1 as a float.\nUnstable order. Comparing two lists position by position without a total ORDER BY produces random failures (2.2).\nStale expected data. When the requirement changes, the spreadsheet changes; keep a version and a date with every expected file.\nSilent tolerance. If more than a few rows need a tolerance to pass, the rounding rule itself may be the defect.",
      "order": 16
    }
  ],
  "advantages": [
    "6.2 Comparing Expected vs Actual Data Sets — 6."
  ],
  "limitations": [
    "6.2 Comparing Expected vs Actual Data Sets is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
