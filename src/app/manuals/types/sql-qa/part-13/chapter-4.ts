import type { ChapterRecord } from "../../../types";

/** D. Common SQL Errors & How to Fix Them */
export const chapter = {
  "id": "sql-13-4-common-sql-errors-how-to-fix-them",
  "title": "D. Common SQL Errors & How to Fix Them",
  "minutes": 20,
  "level": "advanced",
  "phase": "Part 13 · Appendices",
  "partName": "Part 13 · Appendices",
  "overviewText": "D. Common SQL Errors & How to Fix Them — testers use this on the sample HRMS schema to verify stored state.",
  "why": "D. Common SQL Errors & How to Fix Them is how a tester proves stored state, not just the screen. D.",
  "when": "Open this chapter when you are on the Appendices path and need Common SQL Errors & How to Fix Them against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen.",
  "practical": {
    "app": "Bizlevate HRMS / hrms_practice",
    "scenario": "A leave, payroll, attendance, or appointment check depends on Common SQL Errors & How to Fix Them.",
    "pass": "You apply Common SQL Errors & How to Fix Them on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
    "fail": "You copy a blog query, skip Common SQL Errors & How to Fix Them, or treat a UI success toast as proof the row is correct."
  },
  "tools": [],
  "customSummary": "- See the full chapter.",
  "contentMarkdown": "## Overview\n\n| Error (MySQL, illustrative) | Meaning | Typical fix | 1054: Unknown column 'x' in 'field list' | Column name doesn't exist (typo, wrong table, dropped column) |\n|---|---|---|---|---|\n| DESCRIBE table; to check real names (1.1) | 1146: Table 'db.t' doesn't exist | Wrong table name or wrong database selected | SHOW TABLES;, check USE database; | 1064: You have an error in your SQL syntax |\n| Missing comma/quote/keyword | Check exactly where the error points | 1052: Column 'x' is ambiguous | Same column name exists in two joined tables | Qualify with alias.column (4.1) |\n| 1242: Subquery returns more than 1 row | A scalar-context subquery returned multiple rows | Use IN/EXISTS, or add a filter that guarantees one row (5.1) | 1111: Invalid use of group function | Aggregate used in WHERE, or nested aggregate (AVG(SUM(...))) |\n| Move to HAVING; wrap the inner aggregate in a derived table/CTE (3.1, 5.1) | 1055 / ER_WRONG_FIELD_WITH_GROUP: non-aggregated column not in GROUP BY | ONLY_FULL_GROUP_BY mode caught a mixed SELECT list | Add the column to GROUP BY or wrap it in an aggregate (3.2) | 1062: Duplicate entry '...' for key '...' |\n| A UNIQUE/PRIMARY constraint was violated | Check for an existing row first, or handle the conflict (upsert, 7.1); named constraints give clearer messages (8.1) | 1048: Column 'x' cannot be null | Insert/update omitted a required value | Supply a value, or check whether the column should be nullable |\n| 1364: Field 'x' doesn't have a default value | Required column omitted with no default, strict mode | Include the column in the INSERT | 1406: Data too long for column 'x' | Value exceeds VARCHAR(n)/similar limit, strict mode |\n| Shorten the value, or the column may need widening (1.2, 8.2) | 1265: Data truncated for column 'x' | Value doesn't fit the type cleanly (e.g., string into a narrowed ENUM/numeric) | Check the mapping; may indicate a migration issue (6.1, 6.4) | 1452: Cannot add or update a child row: a foreign key constraint fails |\n| Insert/update references a parent row that doesn't exist | Verify the parent exists first (4.3) | 1451: Cannot delete or update a parent row: a foreign key constraint fails | Deleting a parent that still has children | Delete children first, or the constraint's ON DELETE action needs review (4.3, 7.1) |\n| 3819: Check constraint 'x' is violated | A CHECK constraint rejected the row | Value must satisfy the rule; check whether the pre-existing data was validated when the constraint was added (6.4, 8.1) | 1205: Lock wait timeout exceeded | Another transaction is holding a lock on the row(s) you need |\n| Find and resolve the blocking session (SHOW PROCESSLIST, innodb_trx); check for a forgotten open transaction (7.3, 7.7) | 1213: Deadlock found when trying to get lock | Two transactions blocked each other in a cycle | The database killed one automatically; the application should retry (7.7) | 1093: You can't specify target table 'x' for update in FROM clause |\n| MySQL forbids selecting from the table you're updating/deleting, in certain forms | Wrap the inner query in a derived table (5.1) | 1701: Cannot truncate a table referenced in a foreign key constraint | TRUNCATE blocked by a child relationship, even on an empty child table | Use DELETE instead, or truncate children first (7.4) |\n| 3593: You cannot use the window function '...' in this context | A window function was used in WHERE/HAVING/GROUP BY directly | Compute it in a CTE/subquery and filter in the outer query (5.5) | 1248: Every derived table must have its own alias | A subquery in FROM had no alias |\n| Add AS alias_name | 1222: The used SELECT statements have a different number of columns | Mismatched column counts across a UNION/EXCEPT/INTERSECT | Line up the column lists exactly (5.4) | PostgreSQL: current transaction is aborted, commands ignored until end of transaction block |\n| A prior statement in the same transaction errored, and PostgreSQL won't run anything else until you ROLLBACK | ROLLBACK; then retry cleanly (7.3) | Query OK, 0 rows affected on an expected UPDATE | WHERE matched no rows, or matched rows already had that value (\"Matched\" vs \"Changed\", 7.1) | Re-check the WHERE with a SELECT first |\n",
  "blocks": [
    {
      "id": "sql-13-4-md-0",
      "type": "table",
      "headers": [
        "Error (MySQL, illustrative)",
        "Meaning",
        "Typical fix",
        "1054: Unknown column 'x' in 'field list'",
        "Column name doesn't exist (typo, wrong table, dropped column)"
      ],
      "rows": [
        [
          "DESCRIBE table; to check real names (1.1)",
          "1146: Table 'db.t' doesn't exist",
          "Wrong table name or wrong database selected",
          "SHOW TABLES;, check USE database;",
          "1064: You have an error in your SQL syntax"
        ],
        [
          "Missing comma/quote/keyword",
          "Check exactly where the error points",
          "1052: Column 'x' is ambiguous",
          "Same column name exists in two joined tables",
          "Qualify with alias.column (4.1)"
        ],
        [
          "1242: Subquery returns more than 1 row",
          "A scalar-context subquery returned multiple rows",
          "Use IN/EXISTS, or add a filter that guarantees one row (5.1)",
          "1111: Invalid use of group function",
          "Aggregate used in WHERE, or nested aggregate (AVG(SUM(...)))"
        ],
        [
          "Move to HAVING; wrap the inner aggregate in a derived table/CTE (3.1, 5.1)",
          "1055 / ER_WRONG_FIELD_WITH_GROUP: non-aggregated column not in GROUP BY",
          "ONLY_FULL_GROUP_BY mode caught a mixed SELECT list",
          "Add the column to GROUP BY or wrap it in an aggregate (3.2)",
          "1062: Duplicate entry '...' for key '...'"
        ],
        [
          "A UNIQUE/PRIMARY constraint was violated",
          "Check for an existing row first, or handle the conflict (upsert, 7.1); named constraints give clearer messages (8.1)",
          "1048: Column 'x' cannot be null",
          "Insert/update omitted a required value",
          "Supply a value, or check whether the column should be nullable"
        ],
        [
          "1364: Field 'x' doesn't have a default value",
          "Required column omitted with no default, strict mode",
          "Include the column in the INSERT",
          "1406: Data too long for column 'x'",
          "Value exceeds VARCHAR(n)/similar limit, strict mode"
        ],
        [
          "Shorten the value, or the column may need widening (1.2, 8.2)",
          "1265: Data truncated for column 'x'",
          "Value doesn't fit the type cleanly (e.g., string into a narrowed ENUM/numeric)",
          "Check the mapping; may indicate a migration issue (6.1, 6.4)",
          "1452: Cannot add or update a child row: a foreign key constraint fails"
        ],
        [
          "Insert/update references a parent row that doesn't exist",
          "Verify the parent exists first (4.3)",
          "1451: Cannot delete or update a parent row: a foreign key constraint fails",
          "Deleting a parent that still has children",
          "Delete children first, or the constraint's ON DELETE action needs review (4.3, 7.1)"
        ],
        [
          "3819: Check constraint 'x' is violated",
          "A CHECK constraint rejected the row",
          "Value must satisfy the rule; check whether the pre-existing data was validated when the constraint was added (6.4, 8.1)",
          "1205: Lock wait timeout exceeded",
          "Another transaction is holding a lock on the row(s) you need"
        ],
        [
          "Find and resolve the blocking session (SHOW PROCESSLIST, innodb_trx); check for a forgotten open transaction (7.3, 7.7)",
          "1213: Deadlock found when trying to get lock",
          "Two transactions blocked each other in a cycle",
          "The database killed one automatically; the application should retry (7.7)",
          "1093: You can't specify target table 'x' for update in FROM clause"
        ],
        [
          "MySQL forbids selecting from the table you're updating/deleting, in certain forms",
          "Wrap the inner query in a derived table (5.1)",
          "1701: Cannot truncate a table referenced in a foreign key constraint",
          "TRUNCATE blocked by a child relationship, even on an empty child table",
          "Use DELETE instead, or truncate children first (7.4)"
        ],
        [
          "3593: You cannot use the window function '...' in this context",
          "A window function was used in WHERE/HAVING/GROUP BY directly",
          "Compute it in a CTE/subquery and filter in the outer query (5.5)",
          "1248: Every derived table must have its own alias",
          "A subquery in FROM had no alias"
        ],
        [
          "Add AS alias_name",
          "1222: The used SELECT statements have a different number of columns",
          "Mismatched column counts across a UNION/EXCEPT/INTERSECT",
          "Line up the column lists exactly (5.4)",
          "PostgreSQL: current transaction is aborted, commands ignored until end of transaction block"
        ],
        [
          "A prior statement in the same transaction errored, and PostgreSQL won't run anything else until you ROLLBACK",
          "ROLLBACK; then retry cleanly (7.3)",
          "Query OK, 0 rows affected on an expected UPDATE",
          "WHERE matched no rows, or matched rows already had that value (\"Matched\" vs \"Changed\", 7.1)",
          "Re-check the WHERE with a SELECT first"
        ]
      ],
      "caption": "Overview",
      "order": 0
    }
  ],
  "advantages": [
    "D. Common SQL Errors & How to Fix Them — D."
  ],
  "limitations": [
    "D. Common SQL Errors & How to Fix Them is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
