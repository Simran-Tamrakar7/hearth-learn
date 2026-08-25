/** Chapter body for /manuals/sql. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "sql",
  "title": "SQL",
  "tagline": "Ask questions of data — SELECT through transactions and indexes.",
  "category": "foundations",
  "accent": "#0F766E",
  "cover": "covers/sql-cover.png",
  "duration": "8–14 weeks",
  "levelSpan": "Beginner → Pro",
  "who": "QA engineers validating data, developers writing backend queries, and analysts who need SQL fluency for debugging and test oracles.",
  "outcomes": [
    "Write SELECT queries with filters, sorting, and pagination confidently",
    "Join multiple tables with INNER, LEFT, and anti-join patterns",
    "Aggregate with GROUP BY, HAVING, subqueries, and CTEs",
    "Insert, update, and delete safely inside transactions with a preview ritual",
    "Read EXPLAIN plans and reason about indexes for slow queries"
  ],
  "pace": {
    "hoursPerDay": "45–60 min/day (≈ 5–7 hrs/week)",
    "recommended": "~2–4 weeks part-time",
    "accelerated": "~1–2 weeks at 1.5 hrs/day",
    "slow": "~5–6 weeks if busy"
  },
  "chapters": [
    {
      "id": "sql-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this SQL path",
      "minutes": 15,
      "overview": "SQL is read-first: master SELECT before writing mutations. Use SQLBolt or SQLite locally. Checkpoints ensure you can join and aggregate before touching transactions.",
      "learn": [
        "Sandbox setup",
        "Read before write",
        "Safety rituals for mutations"
      ],
      "steps": [
        {
          "title": "Pick a sandbox",
          "body": "SQLBolt in browser, or sqlite3 CLI with a sample .db file. Postgres later — syntax is 95% the same for basics.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Complete SQLBolt lesson 1 today. Bookmark the site.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Study pace",
          "body": "45–60 min/day. Week 1: SELECT/WHERE. Week 2: JOINs/agg. Week 3: mutations/transactions/indexes.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create sql-notes/ repo with queries/ folder for saved .sql files.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Job-ready definition",
          "body": "You are ready when you can: write a 3-table join, aggregate with GROUP BY, wrap updates in a transaction, and explain what an index does.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add checklist to sql-notes README.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Sandbox chosen",
        "sql-notes repo created",
        "SQLBolt lesson 1 done"
      ],
      "practice": {
        "title": "First query",
        "brief": "SELECT * FROM users LIMIT 5; — save as queries/01_select.sql."
      },
      "resources": [
        {
          "type": "lab",
          "name": "SQLBolt",
          "url": "https://sqlbolt.com/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "SQLite CLI",
          "url": "https://sqlite.org/cli.html",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "SQL is read-first: master SELECT before writing mutations. Use SQLBolt or SQLite locally. Checkpoints ensure you can join and aggregate before touching transactions.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "sql-select",
      "phase": "A · Query",
      "level": "beginner",
      "title": "SELECT basics — reading rows",
      "minutes": 30,
      "durationLabel": "Week 1",
      "overview": "Every query starts with SELECT. Name columns explicitly in production. DISTINCT removes duplicates. Aliases rename columns or tables.",
      "learn": [
        "SELECT columns",
        "DISTINCT",
        "Column aliases",
        "FROM and table names"
      ],
      "steps": [
        {
          "title": "Basic SELECT",
          "body": "SELECT col1, col2 FROM table. Avoid SELECT * in production — it hides schema changes and fetches unnecessary data.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "SQLBolt lesson 1. Save query as queries/01_select.sql.",
          "tip": null,
          "code": "SELECT id, name, email\nFROM users;",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "DISTINCT and aliases",
          "body": "SELECT DISTINCT country FROM customers. SELECT total AS order_total — aliases clarify output headers.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "List unique product categories. Alias a computed column: quantity * price AS line_total.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Explore schema first",
          "body": "Before querying: .schema in SQLite, \\d in psql, or DESCRIBE in MySQL. Know column names and types.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Document your sandbox schema in sql-notes/SCHEMA.md — tables, keys, sample row counts.",
          "tip": "QA tip: schema docs become test oracle references.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "SQLBolt lesson 1 complete",
        "SCHEMA.md started",
        "DISTINCT query written"
      ],
      "practice": {
        "title": "Column audit",
        "brief": "For each table: list columns, types, and one sample value."
      },
      "resources": [
        {
          "type": "lab",
          "name": "SQLBolt — SELECT",
          "url": "https://sqlbolt.com/lesson/select_queries_introduction",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Every query starts with SELECT. Name columns explicitly in production. DISTINCT removes duplicates. Aliases rename columns or tables.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "sql-where-order",
      "phase": "A · Query",
      "level": "beginner",
      "title": "WHERE, ORDER BY & LIMIT",
      "minutes": 35,
      "durationLabel": "Week 1–2",
      "overview": "Filter rows with WHERE. Sort with ORDER BY. Paginate with LIMIT/OFFSET. The bread and butter of exploratory queries.",
      "learn": [
        "WHERE conditions",
        "ORDER BY",
        "LIMIT/OFFSET",
        "AND/OR with parentheses"
      ],
      "steps": [
        {
          "title": "WHERE operators",
          "body": "=, !=, <, >, BETWEEN, IN, LIKE, IS NULL. AND/OR — use parentheses when mixing.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "SQLBolt lessons 2–5. Save each to sql-notes/queries/.",
          "tip": null,
          "code": "SELECT id, name, email\nFROM users\nWHERE active = 1\n  AND created_at >= '2024-01-01'\nORDER BY name ASC\nLIMIT 10;",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "LIKE and NULL",
          "body": "LIKE 'A%' prefix match. IS NULL / IS NOT NULL — never = NULL (always unknown).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Find users with NULL phone. Find emails ending in @company.com.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Sort and paginate",
          "body": "ORDER BY created_at DESC, id ASC for tie-break. LIMIT 20 OFFSET 40 = page 3 at size 20.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Query: newest 10 orders over $100. Second query: page 2 of active users.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "SQLBolt 2–5 complete",
        "5 original WHERE queries",
        "NULL and LIKE used once each"
      ],
      "practice": {
        "title": "Exploratory questions",
        "brief": "Answer 5 business questions with SELECT + WHERE only."
      },
      "resources": [
        {
          "type": "lab",
          "name": "SQLBolt — WHERE",
          "url": "https://sqlbolt.com/lesson/select_queries_with_expressions",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Mode — SQL WHERE",
          "url": "https://mode.com/sql-tutorial/sql-where/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Filter rows with WHERE. Sort with ORDER BY. Paginate with LIMIT/OFFSET. The bread and butter of exploratory queries.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "sql-joins",
      "phase": "A · Query",
      "level": "beginner",
      "title": "JOINs — inner, left, and relationships",
      "minutes": 45,
      "durationLabel": "Week 1–2",
      "overview": "Relational power: combine tables on keys. INNER JOIN keeps matches. LEFT JOIN keeps all left rows.",
      "learn": [
        "INNER JOIN",
        "LEFT JOIN",
        "Join conditions",
        "Table aliases"
      ],
      "steps": [
        {
          "title": "INNER JOIN",
          "body": "customers INNER JOIN orders ON customers.id = orders.customer_id — only customers with orders.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "SQLBolt lessons 6–8. List order id, customer name, total for each order.",
          "tip": null,
          "code": "SELECT o.id, c.name, o.total\nFROM orders o\nINNER JOIN customers c ON c.id = o.customer_id;",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "LEFT JOIN",
          "body": "LEFT JOIN finds rows in left table with no match — WHERE right.id IS NULL is the anti-join pattern.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Find customers who never placed an order.",
          "tip": null,
          "code": "SELECT c.id, c.name\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nWHERE o.id IS NULL;",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Multi-table joins",
          "body": "Chain joins: orders → customers, orders → products. Alias tables (o, c, p) for readability.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "3-table join: order line items with product name and customer email.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "INNER and LEFT JOIN written",
        "Anti-join query works",
        "3-table join attempted"
      ],
      "practice": {
        "title": "Join diagram",
        "brief": "Sketch ER diagram for your sandbox tables on paper."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Mode — SQL Joins",
          "url": "https://mode.com/sql-tutorial/sql-joins/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "lab",
          "name": "SQLBolt — JOINs",
          "url": "https://sqlbolt.com/lesson/filters_on_columns",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Relational power: combine tables on keys. INNER JOIN keeps matches. LEFT JOIN keeps all left rows.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "sql-checkpoint-a",
      "kind": "checkpoint",
      "phase": "A · Query",
      "level": "beginner",
      "title": "Checkpoint A — SELECT & JOINs",
      "minutes": 30,
      "durationLabel": "Gate · Week 3–4",
      "overview": "Before aggregations and mutations, prove you can read relational data with filters and joins. Fix gaps before Phase B.",
      "learn": [
        "Read-path self-check"
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "All six must be true. Fix failures before GROUP BY chapter.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Audit sql-notes repo. Mark pass/fail in README.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "10+ saved queries in sql-notes/queries/ with descriptive filenames",
            "SCHEMA.md documents all sandbox tables and relationships",
            "WHERE query with AND/OR, NULL check, and LIKE pattern",
            "INNER JOIN and LEFT JOIN each used correctly",
            "Anti-join query: rows in A with no match in B (LEFT JOIN + IS NULL)",
            "Can draw a 3-table ER diagram and explain join keys aloud"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Query review",
          "body": "Re-read saved queries. Add comments explaining business question each answers. Remove SELECT * where present.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add -- comment header to each .sql file: purpose, date, author.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Explain joins",
          "body": "Interview staple: \"Explain INNER vs LEFT JOIN.\" Use customers/orders example.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Record 90-second explanation without notes.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 6 pass criteria met",
        "Query comments added",
        "Join explanation recorded"
      ],
      "practice": {
        "title": "QA oracle query",
        "brief": "Write query verifying: every order has a valid customer_id. What result means bug?"
      },
      "parentId": null,
      "overviewText": "Before aggregations and mutations, prove you can read relational data with filters and joins. Fix gaps before Phase B.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "sql-agg",
      "phase": "B · Analyze",
      "level": "intermediate",
      "title": "Aggregations & GROUP BY",
      "minutes": 40,
      "durationLabel": "Week 2",
      "overview": "COUNT, SUM, AVG, MIN, MAX. GROUP BY for per-category stats. HAVING filters groups after aggregation.",
      "learn": [
        "Aggregate functions",
        "GROUP BY",
        "HAVING vs WHERE",
        "Query grain"
      ],
      "steps": [
        {
          "title": "Aggregates",
          "body": "COUNT(*), SUM(amount), AVG(price). Non-aggregated columns must appear in GROUP BY.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Total revenue, order count, average order value from orders table.",
          "tip": null,
          "code": "SELECT\n  COUNT(*) AS order_count,\n  SUM(total) AS revenue,\n  AVG(total) AS avg_order\nFROM orders;",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "GROUP BY",
          "body": "Grain of the question: per customer? per day? per product category? Match GROUP BY to that grain.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Revenue per customer. Top 5 customers by order count.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "HAVING",
          "body": "WHERE filters rows before aggregation. HAVING filters groups after. HAVING COUNT(*) > 5 for frequent buyers.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Customers with more than 3 orders and total spend over $500.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "GROUP BY query written",
        "HAVING used once",
        "Can explain query grain"
      ],
      "practice": {
        "title": "Funnel counts",
        "brief": "Group events by step_name; count users per step."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Mode — Aggregations",
          "url": "https://mode.com/sql-tutorial/sql-aggregations/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "COUNT, SUM, AVG, MIN, MAX. GROUP BY for per-category stats. HAVING filters groups after aggregation.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "sql-subqueries",
      "phase": "B · Analyze",
      "level": "intermediate",
      "title": "Subqueries & CTEs",
      "minutes": 40,
      "durationLabel": "Week 2",
      "overview": "Subqueries in WHERE/FROM. WITH clause (CTE) for readable multi-step queries. Prefer CTEs over nested subqueries when clarity matters.",
      "learn": [
        "Subqueries in WHERE",
        "Subqueries in FROM",
        "WITH ... AS (CTE)",
        "EXISTS"
      ],
      "steps": [
        {
          "title": "Subquery in WHERE",
          "body": "WHERE id IN (SELECT customer_id FROM orders WHERE total > 1000) — find high-value customers.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Products never ordered: NOT IN or NOT EXISTS pattern.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "CTEs",
          "body": "WITH high_value AS (SELECT ... ) SELECT * FROM high_value — name intermediate results.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Rewrite a nested subquery as a CTE.",
          "tip": null,
          "code": "WITH monthly_revenue AS (\n  SELECT DATE_TRUNC('month', created_at) AS month,\n         SUM(total) AS revenue\n  FROM orders\n  GROUP BY 1\n)\nSELECT * FROM monthly_revenue ORDER BY month;",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "EXISTS",
          "body": "EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id) — often faster than IN for large sets.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Customers with at least one order using EXISTS.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "CTE query written",
        "EXISTS tried",
        "Subquery vs JOIN tradeoff noted"
      ],
      "practice": {
        "title": "Month-over-month",
        "brief": "CTE: revenue by month, compare to previous month."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Mode — Subqueries",
          "url": "https://mode.com/sql-tutorial/sql-subqueries/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Subqueries in WHERE/FROM. WITH clause (CTE) for readable multi-step queries. Prefer CTEs over nested subqueries when clarity matters.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "sql-mutations",
      "phase": "C · Write",
      "level": "intermediate",
      "title": "INSERT, UPDATE, DELETE safely",
      "minutes": 35,
      "durationLabel": "Week 3",
      "overview": "Never UPDATE/DELETE without WHERE. SELECT first to preview rows. Use transactions for multi-step changes.",
      "learn": [
        "INSERT",
        "UPDATE ... WHERE",
        "DELETE ... WHERE",
        "Safety ritual"
      ],
      "steps": [
        {
          "title": "INSERT",
          "body": "INSERT INTO users (name, email) VALUES (...). INSERT ... SELECT for bulk copies.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Insert 3 test rows into a sandbox table.",
          "tip": null,
          "code": "INSERT INTO users (name, email, active)\nVALUES ('Test User', 'test@example.com', 1);",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Safety ritual",
          "body": "1) SELECT with same WHERE. 2) Check row count. 3) UPDATE/DELETE in transaction. 4) COMMIT or ROLLBACK.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Document your 4-step ritual in sql-notes/SAFETY.md.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "SELECT preview with identical WHERE",
            "Confirm expected row count",
            "BEGIN transaction",
            "COMMIT if correct, ROLLBACK if not"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "UPDATE and DELETE",
          "body": "UPDATE users SET active = 0 WHERE id = 5. DELETE FROM sessions WHERE expired_at < NOW(). Always WHERE.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Practice UPDATE + ROLLBACK on toy data.",
          "tip": "Production horror story: UPDATE without WHERE updates every row.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "SAFETY.md written",
        "UPDATE with ROLLBACK practiced",
        "Never ran bare DELETE"
      ],
      "practice": {
        "title": "Soft delete",
        "brief": "UPDATE active=0 instead of DELETE; query active users only."
      },
      "resources": [
        {
          "type": "doc",
          "name": "PostgreSQL — DML",
          "url": "https://www.postgresql.org/docs/current/dml.html",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Never UPDATE/DELETE without WHERE. SELECT first to preview rows. Use transactions for multi-step changes.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "sql-transactions",
      "phase": "C · Write",
      "level": "advanced",
      "title": "Transactions & isolation",
      "minutes": 40,
      "durationLabel": "Week 3",
      "overview": "BEGIN / COMMIT / ROLLBACK. ACID guarantees. Transfer money mental model: debit and credit must both succeed or both fail.",
      "learn": [
        "BEGIN/COMMIT/ROLLBACK",
        "ACID intuition",
        "Isolation levels lite",
        "Deadlocks awareness"
      ],
      "steps": [
        {
          "title": "Transaction basics",
          "body": "BEGIN; multiple statements; COMMIT if all good, ROLLBACK on error. SQLite: BEGIN IMMEDIATE for writes.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Transfer script: decrement account A, increment B — wrap in transaction.",
          "tip": null,
          "code": "BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n-- inspect; then COMMIT or ROLLBACK\nCOMMIT;",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "ACID",
          "body": "Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent sessions), Durability (committed survives crash).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write one sentence each for A-C-I-D in your notes.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "When transactions matter for QA",
          "body": "Test data setup/teardown, verifying rollback on validation failure, reproducing race conditions.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "List 2 test scenarios where transaction rollback should be verified.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Transfer transaction written",
        "ACID notes",
        "ROLLBACK demonstrated"
      ],
      "practice": {
        "title": "Failed insert rollback",
        "brief": "Insert valid row + invalid row in txn; ROLLBACK; verify neither persisted."
      },
      "resources": [
        {
          "type": "doc",
          "name": "PostgreSQL — Transactions",
          "url": "https://www.postgresql.org/docs/current/tutorial-transactions.html",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "BEGIN / COMMIT / ROLLBACK. ACID guarantees. Transfer money mental model: debit and credit must both succeed or both fail.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "sql-indexes",
      "phase": "D · Performance",
      "level": "advanced",
      "title": "Indexes & EXPLAIN",
      "minutes": 40,
      "durationLabel": "Week 3–4",
      "overview": "Indexes speed reads, slow writes. B-tree default. EXPLAIN shows query plan. Index columns in WHERE and JOIN.",
      "learn": [
        "CREATE INDEX",
        "EXPLAIN / EXPLAIN ANALYZE",
        "When to index",
        "Covering indexes lite"
      ],
      "steps": [
        {
          "title": "Why indexes",
          "body": "Without index: full table scan. With index on customer_id: fast lookup for JOINs and WHERE customer_id = ?.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Read Use The Index, Luke — chapter 1. Note one insight.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "EXPLAIN",
          "body": "EXPLAIN SELECT ... shows plan. Seq Scan = full scan. Index Scan = using index. Compare before/after index.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "EXPLAIN a slow query. CREATE INDEX. EXPLAIN again. Compare.",
          "tip": null,
          "code": "EXPLAIN SELECT * FROM orders WHERE customer_id = 42;\n\nCREATE INDEX idx_orders_customer ON orders(customer_id);\n\nEXPLAIN SELECT * FROM orders WHERE customer_id = 42;",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Index discipline",
          "body": "Index foreign keys and frequent WHERE columns. Do not index every column — writes get slower.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Hypothesis: which column to index on your sandbox? Test with EXPLAIN.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "EXPLAIN before/after",
        "One index created",
        "Index tradeoff documented"
      ],
      "practice": {
        "title": "Composite index",
        "brief": "Index (status, created_at) for WHERE status=? ORDER BY created_at."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Use The Index, Luke",
          "url": "https://use-the-index-luke.com/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "PostgreSQL — EXPLAIN",
          "url": "https://www.postgresql.org/docs/current/sql-explain.html",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Indexes speed reads, slow writes. B-tree default. EXPLAIN shows query plan. Index columns in WHERE and JOIN.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "sql-checkpoint-b",
      "kind": "checkpoint",
      "phase": "D · Performance",
      "level": "advanced",
      "title": "Checkpoint B — SQL job-ready",
      "minutes": 30,
      "durationLabel": "Gate · Week 8–10",
      "overview": "Final gate: read path through write path, transactions, and index literacy — the bar for \"I can query databases\" in QA or dev interviews.",
      "learn": [
        "Interview SQL topics",
        "Portfolio of saved queries"
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Verify every item. Fix gaps this week.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "20+ saved queries covering SELECT, JOIN, GROUP BY, CTE, mutation",
            "3-table JOIN query with correct grain documented in comment",
            "GROUP BY + HAVING aggregation answering a real business question",
            "SAFETY.md ritual followed on UPDATE practice (SELECT preview → txn → ROLLBACK)",
            "Transfer transaction script with COMMIT and ROLLBACK demonstrated",
            "EXPLAIN before/after index with written conclusion in notes",
            "Can explain ACID and when to use a transaction in 2 minutes"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Interview drill",
          "body": "Common questions: INNER vs LEFT JOIN, WHERE vs HAVING, what an index does, how to update safely, N+1 query problem (awareness).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Record 5-minute answers. Walk through best saved query live.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "What next",
          "body": "Apply SQL to test data setup, API response validation against DB, or backend development paths in this library.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write 3 next-skill goals for 90 days.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 7 pass criteria met",
        "Interview drill recorded",
        "90-day goals written"
      ],
      "practice": {
        "title": "Query portfolio",
        "brief": "Curate 5 best queries in sql-notes/portfolio/ with README explaining each."
      },
      "parentId": null,
      "overviewText": "Final gate: read path through write path, transactions, and index literacy — the bar for \"I can query databases\" in QA or dev interviews.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "sql-reference",
      "kind": "guide",
      "phase": "Reference",
      "level": "beginner",
      "title": "Timeline, tools & cheat sheet",
      "minutes": 15,
      "overview": "Return when stuck. Week map, safety ritual, and interview quick hits.",
      "learn": [
        "10-week map",
        "Safety ritual",
        "Interview one-liners"
      ],
      "steps": [
        {
          "title": "Week map",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Weeks 1–2 — SELECT, WHERE, ORDER BY",
            "Weeks 3–4 — JOINs + Checkpoint A",
            "Weeks 5–6 — GROUP BY, subqueries, CTEs",
            "Weeks 7–8 — mutations, transactions",
            "Weeks 9–10 — indexes, EXPLAIN + Checkpoint B"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Safety ritual (always)",
          "body": "SELECT with same WHERE → count rows → BEGIN → mutate → verify → COMMIT or ROLLBACK.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Pin SAFETY.md. Never UPDATE/DELETE without WHERE in production.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Interview one-liners",
          "body": "JOIN: match rows on keys. GROUP BY: aggregate grain. HAVING: filter groups. Index: speeds reads, costs writes. Transaction: all-or-nothing.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Maintain docs/sql-interview.md in sql-notes repo.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Week map understood",
        "SAFETY.md pinned",
        "Interview doc started"
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Return when stuck. Week map, safety ritual, and interview quick hits.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    }
  ],
  "resources": {
    "docs": [
      {
        "name": "SQLBolt",
        "url": "https://sqlbolt.com/"
      },
      {
        "name": "Mode SQL Tutorial",
        "url": "https://mode.com/sql-tutorial"
      },
      {
        "name": "Use The Index, Luke",
        "url": "https://use-the-index-luke.com/"
      },
      {
        "name": "PostgreSQL Documentation",
        "url": "https://www.postgresql.org/docs/"
      },
      {
        "name": "SQLite Documentation",
        "url": "https://sqlite.org/docs.html"
      }
    ],
    "tools": [
      "SQLite",
      "PostgreSQL",
      "DBeaver",
      "TablePlus",
      "pgAdmin"
    ],
    "books": [
      "Learning SQL (Beaulieu)",
      "SQL for Data Analysis (DeBarros) — selective"
    ],
    "practice": [
      "https://sqlbolt.com/ — complete all lessons",
      "https://pgexercises.com/",
      "Weekly: one exploratory query on sanitized sample data"
    ],
    "videos": [
      {
        "name": "freeCodeCamp — SQL Full Course",
        "url": "https://www.youtube.com/watch?v=HXV3zeQKqGY"
      },
      {
        "name": "Fireship — SQL in 100 seconds",
        "url": "https://www.youtube.com/watch?v=zsjvFFsV1Q8"
      }
    ]
  }
};
