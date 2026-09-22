import type { ChapterRecord } from "../../../types";

/** A. Cheat Sheet of Common Queries */
export const chapter = {
  "id": "sql-13-1-cheat-sheet-of-common-queries",
  "title": "A. Cheat Sheet of Common Queries",
  "minutes": 20,
  "level": "advanced",
  "phase": "Part 13 · Appendices",
  "partName": "Part 13 · Appendices",
  "overviewText": "Quick-reference for the query shapes used throughout this manual. MySQL syntax shown; dialect differences flagged inline where they matter most; Appendix B covers the rest in full. Basics",
  "why": "A. Cheat Sheet of Common Queries is how a tester proves stored state, not just the screen. Quick-reference for the query shapes used throughout this manual.",
  "when": "Open this chapter when you are on the Appendices path and need Cheat Sheet of Common Queries against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen.",
  "practical": {
    "app": "Bizlevate HRMS / hrms_practice",
    "scenario": "A leave, payroll, attendance, or appointment check depends on Cheat Sheet of Common Queries.",
    "pass": "You apply Cheat Sheet of Common Queries on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
    "fail": "You copy a blog query, skip Cheat Sheet of Common Queries, or treat a UI success toast as proof the row is correct."
  },
  "tools": [],
  "customSummary": "- See the full chapter.",
  "contentMarkdown": "## Overview\n\nQuick-reference for the query shapes used throughout this manual. MySQL syntax shown; dialect differences flagged inline where they matter most; Appendix B covers the rest in full.\nBasics\n```sql\nSELECT col1, col2 FROM table WHERE condition ORDER BY col1 LIMIT 10;\nSELECT DISTINCT col FROM table;\nSELECT COUNT(*), COUNT(col), COUNT(DISTINCT col) FROM table;\nSELECT * FROM table WHERE col IS NULL;              -- never = NULL\nSELECT * FROM table WHERE col BETWEEN a AND b;       -- inclusive both ends\nSELECT * FROM table WHERE col IN (1, 2, 3);\nSELECT * FROM table WHERE col LIKE 'A%' ESCAPE '\\\\'; -- % any chars, _ one char\n```\n\nJoins\n```sql\nSELECT * FROM a JOIN b ON b.a_id = a.id;                          -- inner: matched rows only\nSELECT * FROM a LEFT JOIN b ON b.a_id = a.id;                      -- keep all of a\nSELECT * FROM a LEFT JOIN b ON b.a_id = a.id WHERE b.id IS NULL;   -- anti-join: a with no match\nSELECT * FROM a JOIN a b ON b.parent_id = a.id;                    -- self join, alias mandatory\n```\n\nAggregation\n```sql\nSELECT col, COUNT(*), SUM(amt), AVG(amt), MIN(amt), MAX(amt)\nFROM   t GROUP BY col HAVING COUNT(*) > 1;                         -- HAVING filters groups, WHERE filters rows\nSELECT col, SUM(CASE WHEN status='x' THEN 1 ELSE 0 END) FROM t GROUP BY col;  -- conditional count\n```\n\nDuplicates and orphans\n```sql\nSELECT key_col, COUNT(*) FROM t GROUP BY key_col HAVING COUNT(*) > 1;         -- duplicates\nSELECT a.* FROM a LEFT JOIN b ON b.a_id = a.id WHERE a.fk IS NOT NULL AND b.id IS NULL;  -- orphans\n```\n\nSubqueries / CTEs\n```sql\nSELECT * FROM t WHERE col > (SELECT AVG(col) FROM t);\nSELECT * FROM t WHERE EXISTS (SELECT 1 FROM u WHERE u.t_id = t.id);\nWITH x AS (SELECT ... ) SELECT * FROM x WHERE ...;\n```\n\nWindow functions\n```sql\nSELECT *, ROW_NUMBER() OVER (PARTITION BY key ORDER BY dt DESC) rn FROM t;    -- latest per group: WHERE rn=1\nSELECT *, RANK() OVER (ORDER BY val DESC) FROM t;                             -- ties share rank, skips numbers\nSELECT *, LAG(val) OVER (PARTITION BY key ORDER BY dt) prev FROM t;\nSELECT *, SUM(val) OVER (ORDER BY dt) running_total FROM t;\n```\n\n```sql\nSet operators\nSELECT a FROM t1 UNION ALL SELECT a FROM t2;         -- stack, keep duplicates (default choice)\nSELECT a FROM t1 EXCEPT SELECT a FROM t2;             -- in t1 not t2 (MySQL 8.0.31+)\n```\n\nDML\n```sql\nINSERT INTO t (col1, col2) VALUES (v1, v2);\nUPDATE t SET col = val WHERE id = 1;\nDELETE FROM t WHERE id = 1;\nSTART TRANSACTION; ... ROLLBACK; / COMMIT;\n```\n\n| Schema inspection | SHOW CREATE TABLE t\\G |\n|---|---|\n| SELECT * FROM information_schema.columns WHERE table_schema=DATABASE() AND table_name='t'; | EXPLAIN SELECT ...; |\n",
  "blocks": [
    {
      "id": "sql-13-1-md-0",
      "type": "overview",
      "heading": "Overview",
      "content": "Quick-reference for the query shapes used throughout this manual. MySQL syntax shown; dialect differences flagged inline where they matter most; Appendix B covers the rest in full.\nBasics\n```sql\nSELECT col1, col2 FROM table WHERE condition ORDER BY col1 LIMIT 10;\nSELECT DISTINCT col FROM table;\nSELECT COUNT(*), COUNT(col), COUNT(DISTINCT col) FROM table;\nSELECT * FROM table WHERE col IS NULL;              -- never = NULL\nSELECT * FROM table WHERE col BETWEEN a AND b;       -- inclusive both ends\nSELECT * FROM table WHERE col IN (1, 2, 3);\nSELECT * FROM table WHERE col LIKE 'A%' ESCAPE '\\\\'; -- % any chars, _ one char\n```\n\nJoins\n```sql\nSELECT * FROM a JOIN b ON b.a_id = a.id;                          -- inner: matched rows only\nSELECT * FROM a LEFT JOIN b ON b.a_id = a.id;                      -- keep all of a\nSELECT * FROM a LEFT JOIN b ON b.a_id = a.id WHERE b.id IS NULL;   -- anti-join: a with no match\nSELECT * FROM a JOIN a b ON b.parent_id = a.id;                    -- self join, alias mandatory\n```\n\nAggregation\n```sql\nSELECT col, COUNT(*), SUM(amt), AVG(amt), MIN(amt), MAX(amt)\nFROM   t GROUP BY col HAVING COUNT(*) > 1;                         -- HAVING filters groups, WHERE filters rows\nSELECT col, SUM(CASE WHEN status='x' THEN 1 ELSE 0 END) FROM t GROUP BY col;  -- conditional count\n```\n\nDuplicates and orphans\n```sql\nSELECT key_col, COUNT(*) FROM t GROUP BY key_col HAVING COUNT(*) > 1;         -- duplicates\nSELECT a.* FROM a LEFT JOIN b ON b.a_id = a.id WHERE a.fk IS NOT NULL AND b.id IS NULL;  -- orphans\n```\n\nSubqueries / CTEs\n```sql\nSELECT * FROM t WHERE col > (SELECT AVG(col) FROM t);\nSELECT * FROM t WHERE EXISTS (SELECT 1 FROM u WHERE u.t_id = t.id);\nWITH x AS (SELECT ... ) SELECT * FROM x WHERE ...;\n```\n\nWindow functions\n```sql\nSELECT *, ROW_NUMBER() OVER (PARTITION BY key ORDER BY dt DESC) rn FROM t;    -- latest per group: WHERE rn=1\nSELECT *, RANK() OVER (ORDER BY val DESC) FROM t;                             -- ties share rank, skips numbers\nSELECT *, LAG(val) OVER (PARTITION BY key ORDER BY dt) prev FROM t;\nSELECT *, SUM(val) OVER (ORDER BY dt) running_total FROM t;\n```\n\n```sql\nSet operators\nSELECT a FROM t1 UNION ALL SELECT a FROM t2;         -- stack, keep duplicates (default choice)\nSELECT a FROM t1 EXCEPT SELECT a FROM t2;             -- in t1 not t2 (MySQL 8.0.31+)\n```\n\nDML\n```sql\nINSERT INTO t (col1, col2) VALUES (v1, v2);\nUPDATE t SET col = val WHERE id = 1;\nDELETE FROM t WHERE id = 1;\nSTART TRANSACTION; ... ROLLBACK; / COMMIT;\n```\n\n| Schema inspection | SHOW CREATE TABLE t\\G |\n|---|---|\n| SELECT * FROM information_schema.columns WHERE table_schema=DATABASE() AND table_name='t'; | EXPLAIN SELECT ...; |",
      "order": 0
    }
  ],
  "advantages": [
    "A. Cheat Sheet of Common Queries — A."
  ],
  "limitations": [
    "A. Cheat Sheet of Common Queries is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
