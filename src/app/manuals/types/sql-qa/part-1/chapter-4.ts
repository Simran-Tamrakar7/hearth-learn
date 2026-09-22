import type { ChapterRecord } from "../../../types";

/** 1.4 Comparison & Logical Operators */
export const chapter = {
  "id": "sql-1-4-comparison-logical-operators",
  "title": "1.4 Comparison & Logical Operators",
  "minutes": 21,
  "level": "beginner",
  "phase": "Part 1 · Database & Query Basics",
  "partName": "Part 1 · Database & Query Basics",
  "overviewText": "These compare a column to a value and produce true, false, or (with NULL) unknown: Use <> rather than != if you want strict standard SQL, though all three major databases accept both. A single = is used for comparison (not == as in JavaScript). LIKE patterns are covered fully in 2.5 and NULL in 2.3, but you need a taste of them now. Examples on our data: -- Employees hired in 2025 or later",
  "why": "1.4 Comparison & Logical Operators is how a tester proves stored state, not just the screen. These compare a column to a value and produce true, false, or (with NULL) unknown: Use <> rather than != if you want strict standard SQL, though all three major databases accept both.",
  "when": "Open this chapter when you are on the Database & Query Basics path and need Comparison & Logical Operators against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen.",
  "practical": {
    "app": "Bizlevate HRMS / hrms_practice",
    "scenario": "A leave, payroll, attendance, or appointment check depends on Comparison & Logical Operators.",
    "pass": "You apply Comparison & Logical Operators on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
    "fail": "You copy a blog query, skip Comparison & Logical Operators, or treat a UI success toast as proof the row is correct."
  },
  "tools": [],
  "customSummary": "- Comparison: =, <>/!=, <, >, <=, >=, BETWEEN (inclusive), IN, LIKE, IS NULL.\n- Logical: AND, OR, NOT; precedence is NOT → AND → OR, so use parentheses when mixing.\n- BETWEEN on DATETIME columns misses the last day; use >= start AND < next_start.\n- > vs >= is where off-by-one bugs live; test boundaries on both sides.\n- NOT IN and = NULL behave unexpectedly with NULL (see 2.3).\n- Query-for-violations pattern: select the bad rows; zero rows = pass. Maps to expect(rows).toHaveLength(0) and is the backbone of Parts 6 and 10.",
  "contentMarkdown": "## Comparison operators\nThese compare a column to a value and produce true, false, or (with NULL) unknown:\n\n| Operator | Meaning | Example |\n|---|---|---|\n| = | equal | status = 'active' |\n| <> or != | not equal | status <> 'resigned' |\n| < > | less / greater than | hire_date > '2025-01-01' |\n| <= >= | less-or-equal / greater-or-equal | days >= 3 |\n| BETWEEN a AND b | in range, inclusive of both ends | days BETWEEN 1 AND 3 |\n| IN (...) | matches any value in a list | status IN ('pending','approved') |\n| LIKE | pattern match | email LIKE '%@example.com' |\n| IS NULL / IS NOT NULL | tests for missing value | manager_id IS NULL |\n\nUse <> rather than != if you want strict standard SQL, though all three major databases accept both. A single = is used for comparison (not == as in JavaScript). LIKE patterns are covered fully in 2.5 and NULL in 2.3, but you need a taste of them now.\nExamples on our data:\n-- Employees hired in 2025 or later\n```sql\nSELECT first_name, hire_date FROM employees WHERE hire_date >= '2025-01-01';\n```\n\nfirst_name | hire_date\nRavi       | 2025-03-10\nBikash     | 2025-09-01\n\n-- Leave requests still needing action\n```sql\nSELECT leave_request_id, employee_id, status\nFROM   leave_requests\nWHERE  status IN ('pending');\n```\n\nIN shines when the list grows: WHERE status IN ('pending','approved','rejected') is far cleaner than three OR conditions.\n## Logical operators: AND, OR, NOT\nAND requires both conditions, OR requires at least one, and NOT reverses a condition:\n-- Active QA staff who are not soft-deleted\n```sql\nSELECT first_name, last_name\n```\n| FROM   employees | WHERE  department_id = 2 |\n|---|---|\n| AND  status = 'active' | AND  is_deleted = 0; |\n\nfirst_name | last_name\nAsha       | Karki\n## Ravi       | Shrestha\n\nBikash is in QA but excluded by two of the conditions (inactive and is_deleted = 1), which shows how each AND narrows the result.\n## Precedence: the source of quiet bugs\nNOT is evaluated first, then AND, then OR. That means these two queries are not the same:\n-- Intended: pending OR approved leave, but only for employee 2\n```sql\nSELECT * FROM leave_requests\nWHERE status = 'pending' OR status = 'approved' AND employee_id = 2;\n-- Real meaning: (status = 'pending') OR (status = 'approved' AND employee_id = 2)\n-- Returns ALL pending requests (employee 3's too), which is wrong.\n```\n\n```sql\nSELECT * FROM leave_requests\nWHERE (status = 'pending' OR status = 'approved') AND employee_id = 2;\n-- Correct\n```\n\nRule of thumb: whenever you mix AND and OR, add parentheses. It costs nothing and removes ambiguity. This bug is especially nasty in test queries, because it usually returns some plausible rows, so you don't notice you're checking the wrong set.\nNOT and negation\n```sql\nSELECT first_name FROM employees WHERE NOT status = 'resigned';   -- same as status <> 'resigned'\nSELECT first_name FROM employees WHERE status NOT IN ('resigned','inactive');\nSELECT first_name FROM employees WHERE email NOT LIKE '%@example.com';\n```\n\nCareful with NOT IN when the list or column contains NULL. The result can be empty for a surprising reason. That trap is explained in 2.3 and again with subqueries in 5.1.\n## BETWEEN and date ranges: the classic off-by-one\nBETWEEN includes both endpoints: days BETWEEN 1 AND 3 matches 1, 2 and 3. That is fine for numbers and DATE columns. With DATETIME/TIMESTAMP columns it hides a bug:\n-- Meant: everything created in September 2026\n```sql\nSELECT * FROM leave_requests\nWHERE created_at BETWEEN '2026-09-01' AND '2026-09-30';\n```\n\n'2026-09-30' is interpreted as 2026-09-30 00:00:00, so anything created during 30 September after midnight is missed. The safe pattern is a half-open range:\n```sql\nSELECT * FROM leave_requests\nWHERE created_at >= '2026-09-01'\n  AND created_at <  '2026-10-01';\n```\n\n```sql\nUse this whenever the column includes a time part. It also mirrors how the app itself should filter, so if a \"This Month\" report is missing last-day records, this is a prime suspect. Reports and dashboards are validated in 9.6.\n```\n## Operators as boundary-testing tools\nThe difference between > and >= is the difference between a working feature and an off-by-one defect. When a business rule says \"employees with 5 or more sick days must submit a certificate,\" write the query both ways and check the app agrees with the correct version:\n```sql\nSELECT employee_id, SUM(days) AS sick_days   -- SUM is introduced in Part 3\nFROM   leave_requests\nWHERE  leave_type_id = 2 AND status = 'approved'\nGROUP  BY employee_id\nHAVING SUM(days) >= 5;   -- boundary: exactly 5 must be included\n```\n\nThen test the app with 4, 5 and 6 days.\n## The \"query for violations\" pattern\nThis is the most important idea in the whole chapter for a QA engineer. Instead of writing a query that returns good data and eyeballing it, write a query that returns bad data. An empty result means the check passes; any rows returned are bugs.\n-- Approved leave with no approver recorded\n```sql\nSELECT leave_request_id, employee_id\nFROM   leave_requests\nWHERE  status = 'approved' AND approved_by IS NULL;\n```\n\n-- Leave that ends before it starts\n```sql\nSELECT leave_request_id, start_date, end_date\nFROM   leave_requests\nWHERE  end_date < start_date;\n```\n\n-- Resigned employees still marked as not deleted and hired in the future (impossible dates)\n```sql\nSELECT employee_id FROM employees WHERE hire_date > CURRENT_DATE;\n```\n\nIn Playwright or pytest this maps straight onto an assertion: run the query and expect(rows).toHaveLength(0). Part 6 turns this pattern into a systematic validation approach, and Part 10 builds a reusable library of these checks for attendance, payroll, appointments and leave.\n## Truth values in short\nEvery condition evaluates to TRUE, FALSE or, when NULL is involved, UNKNOWN. WHERE keeps only rows where the whole condition is TRUE, so a row where the condition is UNKNOWN is silently dropped. That is why WHERE manager_id = NULL returns nothing (it should be IS NULL), and why WHERE manager_id <> 1 doesn't return employees with no manager. Chapter 2.3 covers this fully.\n",
  "blocks": [
    {
      "id": "sql-1-4-md-0",
      "type": "overview",
      "heading": "Comparison operators",
      "content": "These compare a column to a value and produce true, false, or (with NULL) unknown:\n\n| Operator | Meaning | Example |\n|---|---|---|\n| = | equal | status = 'active' |\n| <> or != | not equal | status <> 'resigned' |\n| < > | less / greater than | hire_date > '2025-01-01' |\n| <= >= | less-or-equal / greater-or-equal | days >= 3 |\n| BETWEEN a AND b | in range, inclusive of both ends | days BETWEEN 1 AND 3 |\n| IN (...) | matches any value in a list | status IN ('pending','approved') |\n| LIKE | pattern match | email LIKE '%@example.com' |\n| IS NULL / IS NOT NULL | tests for missing value | manager_id IS NULL |\n\nUse <> rather than != if you want strict standard SQL, though all three major databases accept both. A single = is used for comparison (not == as in JavaScript). LIKE patterns are covered fully in 2.5 and NULL in 2.3, but you need a taste of them now.\nExamples on our data:\n-- Employees hired in 2025 or later\n```sql\nSELECT first_name, hire_date FROM employees WHERE hire_date >= '2025-01-01';\n```\n\nfirst_name | hire_date\nRavi       | 2025-03-10\nBikash     | 2025-09-01\n\n-- Leave requests still needing action\n```sql\nSELECT leave_request_id, employee_id, status\nFROM   leave_requests\nWHERE  status IN ('pending');\n```\n\nIN shines when the list grows: WHERE status IN ('pending','approved','rejected') is far cleaner than three OR conditions.",
      "order": 0
    },
    {
      "id": "sql-1-4-md-1",
      "type": "overview",
      "heading": "Logical operators: AND, OR, NOT",
      "content": "AND requires both conditions, OR requires at least one, and NOT reverses a condition:\n-- Active QA staff who are not soft-deleted\n```sql\nSELECT first_name, last_name\n```\n| FROM   employees | WHERE  department_id = 2 |\n|---|---|\n| AND  status = 'active' | AND  is_deleted = 0; |\n\nfirst_name | last_name\nAsha       | Karki",
      "order": 1
    },
    {
      "id": "sql-1-4-md-2",
      "type": "overview",
      "heading": "Ravi       | Shrestha",
      "content": "Bikash is in QA but excluded by two of the conditions (inactive and is_deleted = 1), which shows how each AND narrows the result.",
      "order": 2
    },
    {
      "id": "sql-1-4-md-3",
      "type": "overview",
      "heading": "Precedence: the source of quiet bugs",
      "content": "NOT is evaluated first, then AND, then OR. That means these two queries are not the same:\n-- Intended: pending OR approved leave, but only for employee 2\n```sql\nSELECT * FROM leave_requests\nWHERE status = 'pending' OR status = 'approved' AND employee_id = 2;\n-- Real meaning: (status = 'pending') OR (status = 'approved' AND employee_id = 2)\n-- Returns ALL pending requests (employee 3's too), which is wrong.\n```\n\n```sql\nSELECT * FROM leave_requests\nWHERE (status = 'pending' OR status = 'approved') AND employee_id = 2;\n-- Correct\n```\n\nRule of thumb: whenever you mix AND and OR, add parentheses. It costs nothing and removes ambiguity. This bug is especially nasty in test queries, because it usually returns some plausible rows, so you don't notice you're checking the wrong set.\nNOT and negation\n```sql\nSELECT first_name FROM employees WHERE NOT status = 'resigned';   -- same as status <> 'resigned'\nSELECT first_name FROM employees WHERE status NOT IN ('resigned','inactive');\nSELECT first_name FROM employees WHERE email NOT LIKE '%@example.com';\n```\n\nCareful with NOT IN when the list or column contains NULL. The result can be empty for a surprising reason. That trap is explained in 2.3 and again with subqueries in 5.1.",
      "order": 3
    },
    {
      "id": "sql-1-4-md-4",
      "type": "overview",
      "heading": "BETWEEN and date ranges: the classic off-by-one",
      "content": "BETWEEN includes both endpoints: days BETWEEN 1 AND 3 matches 1, 2 and 3. That is fine for numbers and DATE columns. With DATETIME/TIMESTAMP columns it hides a bug:\n-- Meant: everything created in September 2026\n```sql\nSELECT * FROM leave_requests\nWHERE created_at BETWEEN '2026-09-01' AND '2026-09-30';\n```\n\n'2026-09-30' is interpreted as 2026-09-30 00:00:00, so anything created during 30 September after midnight is missed. The safe pattern is a half-open range:\n```sql\nSELECT * FROM leave_requests\nWHERE created_at >= '2026-09-01'\n  AND created_at <  '2026-10-01';\n```\n\n```sql\nUse this whenever the column includes a time part. It also mirrors how the app itself should filter, so if a \"This Month\" report is missing last-day records, this is a prime suspect. Reports and dashboards are validated in 9.6.\n```",
      "order": 4
    },
    {
      "id": "sql-1-4-md-5",
      "type": "overview",
      "heading": "Operators as boundary-testing tools",
      "content": "The difference between > and >= is the difference between a working feature and an off-by-one defect. When a business rule says \"employees with 5 or more sick days must submit a certificate,\" write the query both ways and check the app agrees with the correct version:\n```sql\nSELECT employee_id, SUM(days) AS sick_days   -- SUM is introduced in Part 3\nFROM   leave_requests\nWHERE  leave_type_id = 2 AND status = 'approved'\nGROUP  BY employee_id\nHAVING SUM(days) >= 5;   -- boundary: exactly 5 must be included\n```\n\nThen test the app with 4, 5 and 6 days.",
      "order": 5
    },
    {
      "id": "sql-1-4-md-6",
      "type": "overview",
      "heading": "The \"query for violations\" pattern",
      "content": "This is the most important idea in the whole chapter for a QA engineer. Instead of writing a query that returns good data and eyeballing it, write a query that returns bad data. An empty result means the check passes; any rows returned are bugs.\n-- Approved leave with no approver recorded\n```sql\nSELECT leave_request_id, employee_id\nFROM   leave_requests\nWHERE  status = 'approved' AND approved_by IS NULL;\n```\n\n-- Leave that ends before it starts\n```sql\nSELECT leave_request_id, start_date, end_date\nFROM   leave_requests\nWHERE  end_date < start_date;\n```\n\n-- Resigned employees still marked as not deleted and hired in the future (impossible dates)\n```sql\nSELECT employee_id FROM employees WHERE hire_date > CURRENT_DATE;\n```\n\nIn Playwright or pytest this maps straight onto an assertion: run the query and expect(rows).toHaveLength(0). Part 6 turns this pattern into a systematic validation approach, and Part 10 builds a reusable library of these checks for attendance, payroll, appointments and leave.",
      "order": 6
    },
    {
      "id": "sql-1-4-md-7",
      "type": "overview",
      "heading": "Truth values in short",
      "content": "Every condition evaluates to TRUE, FALSE or, when NULL is involved, UNKNOWN. WHERE keeps only rows where the whole condition is TRUE, so a row where the condition is UNKNOWN is silently dropped. That is why WHERE manager_id = NULL returns nothing (it should be IS NULL), and why WHERE manager_id <> 1 doesn't return employees with no manager. Chapter 2.3 covers this fully.",
      "order": 7
    }
  ],
  "advantages": [
    "1.4 Comparison & Logical Operators — 1."
  ],
  "limitations": [
    "1.4 Comparison & Logical Operators is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
