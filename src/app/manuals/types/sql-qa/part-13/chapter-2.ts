import type { ChapterRecord } from "../../../types";

/** B. SQL Syntax Differences (MySQL vs PostgreSQL vs SQL Server) */
export const chapter = {
  "id": "sql-13-2-sql-syntax-differences-mysql-vs-postgresql-vs-sq",
  "title": "B. SQL Syntax Differences (MySQL vs PostgreSQL vs SQL Server)",
  "minutes": 20,
  "level": "advanced",
  "phase": "Part 13 · Appendices",
  "partName": "Part 13 · Appendices",
  "overviewText": "B. SQL Syntax Differences (MySQL vs PostgreSQL vs SQL Server) — testers use this on the sample HRMS schema to verify stored state.",
  "why": "B. SQL Syntax Differences (MySQL vs PostgreSQL vs SQL Server) is how a tester proves stored state, not just the screen. B.",
  "when": "Open this chapter when you are on the Appendices path and need SQL Syntax Differences (MySQL vs PostgreSQL vs SQL Server) against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen.",
  "practical": {
    "app": "Bizlevate HRMS / hrms_practice",
    "scenario": "A leave, payroll, attendance, or appointment check depends on SQL Syntax Differences (MySQL vs PostgreSQL vs SQL Server).",
    "pass": "You apply SQL Syntax Differences (MySQL vs PostgreSQL vs SQL Server) on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
    "fail": "You copy a blog query, skip SQL Syntax Differences (MySQL vs PostgreSQL vs SQL Server), or treat a UI success toast as proof the row is correct."
  },
  "tools": [],
  "customSummary": "- See the full chapter.",
  "contentMarkdown": "## Overview\n\n| Task | MySQL | PostgreSQL | SQL Server |\n|---|---|---|---|\n| Limit rows | LIMIT 5 | LIMIT 5 | TOP 5 / OFFSET...FETCH |\n| Pagination | LIMIT 5 OFFSET 10 | LIMIT 5 OFFSET 10 | OFFSET 10 ROWS FETCH NEXT 5 ROWS ONLY |\n| Current date/time | CURRENT_DATE, NOW() | CURRENT_DATE, NOW() | CAST(GETDATE() AS DATE), GETDATE() |\n| Add interval | DATE_ADD(d, INTERVAL 7 DAY) | d + INTERVAL '7 days' | DATEADD(day, 7, d) |\n| Date diff | DATEDIFF(end, start) (days) | end - start | DATEDIFF(day, start, end) (note arg order) |\n| String concat | CONCAT(a,b) | a \\|\\| b | a + b / CONCAT(a,b) |\n| Concat with separator | CONCAT_WS(' ',a,b) | CONCAT_WS(' ',a,b) | CONCAT_WS(' ',a,b) |\n| String length (chars) | CHAR_LENGTH(x) | LENGTH(x) | LEN(x) (ignores trailing spaces) |\n| Substring | SUBSTRING(x,2,3) | SUBSTRING(x,2,3) | SUBSTRING(x,2,3) |\n| Case-insensitive match | collation-dependent, LOWER() | ILIKE, LOWER() | collation-dependent, LOWER() |\n| Auto-increment PK | AUTO_INCREMENT | SERIAL / GENERATED ... AS IDENTITY | IDENTITY(1,1) |\n| Upsert | ON DUPLICATE KEY UPDATE | ON CONFLICT ... DO UPDATE | MERGE |\n| Row-limiting delete | DELETE ... LIMIT n | not supported directly | not supported directly |\n| String aggregation | GROUP_CONCAT(x ORDER BY y SEPARATOR ',') | STRING_AGG(x, ',' ORDER BY y) | STRING_AGG(x, ',') WITHIN GROUP (ORDER BY y) |\n| CTE | WITH x AS (...) (8.0+) | WITH x AS (...) | ;WITH x AS (...) if mid-batch |\n| Recursive CTE | WITH RECURSIVE | WITH RECURSIVE | WITH (no keyword needed) |\n| Set operators | UNION, UNION ALL (INTERSECT/EXCEPT 8.0.31+) | full set | full set |\n| Window functions | 8.0+ | full support | 2005+ (frames 2012+) |\n| NULL-safe equals | <=> | IS NOT DISTINCT FROM | IS NOT DISTINCT FROM (2022+) |\n| Boolean type | TINYINT(1) | BOOLEAN | BIT |\n| Quote identifiers | `backticks` | \"double quotes\" | [brackets] |\n| Quote strings | 'single quotes' (also \" unless ANSI_QUOTES) | 'single quotes' only | 'single quotes' only |\n| Sample rows (top-of-table peek) | SELECT * FROM t LIMIT 10 | SELECT * FROM t LIMIT 10 | SELECT TOP 10 * FROM t |\n| Explain plan | EXPLAIN / EXPLAIN ANALYZE (8.0.18+) | EXPLAIN (ANALYZE, BUFFERS) | \"Actual execution plan\" (SSMS) |\n| Regex match | REGEXP | ~ | not native (LIKE classes only) |\n| JSON extract | JSON_EXTRACT(x,'$.a') / ->> | x->>'a' | JSON_VALUE(x,'$.a') |\n| Schema = database? | Yes, synonyms | No, schema is inside a database (public default) | No, schema inside a database (dbo default) |\n| Sequence generator | recursive CTE | generate_series(a,b) | recursive CTE or sys.all_objects cross join |\n| Raise a custom error | SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='...' | RAISE EXCEPTION '...' | THROW 50000, '...', 1 |\n| DDL in a transaction | No (implicit commit) | Yes | Yes (if batch wrapped) |\n| Disable a trigger | no session switch | ALTER TABLE ... DISABLE TRIGGER | DISABLE TRIGGER ... ON ... |\n",
  "blocks": [
    {
      "id": "sql-13-2-md-0",
      "type": "table",
      "headers": [
        "Task",
        "MySQL",
        "PostgreSQL",
        "SQL Server"
      ],
      "rows": [
        [
          "Limit rows",
          "LIMIT 5",
          "LIMIT 5",
          "TOP 5 / OFFSET...FETCH"
        ],
        [
          "Pagination",
          "LIMIT 5 OFFSET 10",
          "LIMIT 5 OFFSET 10",
          "OFFSET 10 ROWS FETCH NEXT 5 ROWS ONLY"
        ],
        [
          "Current date/time",
          "CURRENT_DATE, NOW()",
          "CURRENT_DATE, NOW()",
          "CAST(GETDATE() AS DATE), GETDATE()"
        ],
        [
          "Add interval",
          "DATE_ADD(d, INTERVAL 7 DAY)",
          "d + INTERVAL '7 days'",
          "DATEADD(day, 7, d)"
        ],
        [
          "Date diff",
          "DATEDIFF(end, start) (days)",
          "end - start",
          "DATEDIFF(day, start, end) (note arg order)"
        ],
        [
          "String concat",
          "CONCAT(a,b)",
          "a \\",
          "\\"
        ],
        [
          "Concat with separator",
          "CONCAT_WS(' ',a,b)",
          "CONCAT_WS(' ',a,b)",
          "CONCAT_WS(' ',a,b)"
        ],
        [
          "String length (chars)",
          "CHAR_LENGTH(x)",
          "LENGTH(x)",
          "LEN(x) (ignores trailing spaces)"
        ],
        [
          "Substring",
          "SUBSTRING(x,2,3)",
          "SUBSTRING(x,2,3)",
          "SUBSTRING(x,2,3)"
        ],
        [
          "Case-insensitive match",
          "collation-dependent, LOWER()",
          "ILIKE, LOWER()",
          "collation-dependent, LOWER()"
        ],
        [
          "Auto-increment PK",
          "AUTO_INCREMENT",
          "SERIAL / GENERATED ... AS IDENTITY",
          "IDENTITY(1,1)"
        ],
        [
          "Upsert",
          "ON DUPLICATE KEY UPDATE",
          "ON CONFLICT ... DO UPDATE",
          "MERGE"
        ],
        [
          "Row-limiting delete",
          "DELETE ... LIMIT n",
          "not supported directly",
          "not supported directly"
        ],
        [
          "String aggregation",
          "GROUP_CONCAT(x ORDER BY y SEPARATOR ',')",
          "STRING_AGG(x, ',' ORDER BY y)",
          "STRING_AGG(x, ',') WITHIN GROUP (ORDER BY y)"
        ],
        [
          "CTE",
          "WITH x AS (...) (8.0+)",
          "WITH x AS (...)",
          ";WITH x AS (...) if mid-batch"
        ],
        [
          "Recursive CTE",
          "WITH RECURSIVE",
          "WITH RECURSIVE",
          "WITH (no keyword needed)"
        ],
        [
          "Set operators",
          "UNION, UNION ALL (INTERSECT/EXCEPT 8.0.31+)",
          "full set",
          "full set"
        ],
        [
          "Window functions",
          "8.0+",
          "full support",
          "2005+ (frames 2012+)"
        ],
        [
          "NULL-safe equals",
          "<=>",
          "IS NOT DISTINCT FROM",
          "IS NOT DISTINCT FROM (2022+)"
        ],
        [
          "Boolean type",
          "TINYINT(1)",
          "BOOLEAN",
          "BIT"
        ],
        [
          "Quote identifiers",
          "`backticks`",
          "\"double quotes\"",
          "[brackets]"
        ],
        [
          "Quote strings",
          "'single quotes' (also \" unless ANSI_QUOTES)",
          "'single quotes' only",
          "'single quotes' only"
        ],
        [
          "Sample rows (top-of-table peek)",
          "SELECT * FROM t LIMIT 10",
          "SELECT * FROM t LIMIT 10",
          "SELECT TOP 10 * FROM t"
        ],
        [
          "Explain plan",
          "EXPLAIN / EXPLAIN ANALYZE (8.0.18+)",
          "EXPLAIN (ANALYZE, BUFFERS)",
          "\"Actual execution plan\" (SSMS)"
        ],
        [
          "Regex match",
          "REGEXP",
          "~",
          "not native (LIKE classes only)"
        ],
        [
          "JSON extract",
          "JSON_EXTRACT(x,'$.a') / ->>",
          "x->>'a'",
          "JSON_VALUE(x,'$.a')"
        ],
        [
          "Schema = database?",
          "Yes, synonyms",
          "No, schema is inside a database (public default)",
          "No, schema inside a database (dbo default)"
        ],
        [
          "Sequence generator",
          "recursive CTE",
          "generate_series(a,b)",
          "recursive CTE or sys.all_objects cross join"
        ],
        [
          "Raise a custom error",
          "SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='...'",
          "RAISE EXCEPTION '...'",
          "THROW 50000, '...', 1"
        ],
        [
          "DDL in a transaction",
          "No (implicit commit)",
          "Yes",
          "Yes (if batch wrapped)"
        ],
        [
          "Disable a trigger",
          "no session switch",
          "ALTER TABLE ... DISABLE TRIGGER",
          "DISABLE TRIGGER ... ON ..."
        ]
      ],
      "caption": "Overview",
      "order": 0
    }
  ],
  "advantages": [
    "B. SQL Syntax Differences (MySQL vs PostgreSQL vs SQL Server) — B."
  ],
  "limitations": [
    "B. SQL Syntax Differences (MySQL vs PostgreSQL vs SQL Server) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
