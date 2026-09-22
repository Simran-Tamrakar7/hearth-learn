import type { ChapterRecord } from "../../../types";

/** 1.1 Databases, Tables, Rows, Columns, Schemas */
export const chapter = {
  "id": "sql-1-1-databases-tables-rows-columns-schemas",
  "title": "1.1 Databases, Tables, Rows, Columns, Schemas",
  "minutes": 20,
  "level": "beginner",
  "phase": "Part 1 · Database & Query Basics",
  "partName": "Part 1 · Database & Query Basics",
  "overviewText": "A database server (one running MySQL, PostgreSQL or SQL Server) hosts one or more databases. A database contains tables, plus other objects like views and indexes. A table has columns (the structure) and rows (the data). Most people picture this as a nested set of containers: Server (MySQL instance on qa-db:3306) └── Database: hrms_qa ├── Table: employees → columns: employee_id, first_name, email, ... ├── Table: leave_requests → columns: leave_request_id, employee_id, status, ...",
  "why": "1.1 Databases, Tables, Rows, Columns, Schemas is how a tester proves stored state, not just the screen. A database server (one running MySQL, PostgreSQL or SQL Server) hosts one or more databases.",
  "when": "Open this chapter when you are on the Database & Query Basics path and need Databases, Tables, Rows, Columns, Schemas against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen.",
  "practical": {
    "app": "Bizlevate HRMS / hrms_practice",
    "scenario": "A leave, payroll, attendance, or appointment check depends on Databases, Tables, Rows, Columns, Schemas.",
    "pass": "You apply Databases, Tables, Rows, Columns, Schemas on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
    "fail": "You copy a blog query, skip Databases, Tables, Rows, Columns, Schemas, or treat a UI success toast as proof the row is correct."
  },
  "tools": [],
  "customSummary": "- Hierarchy: server → database → (schema) → table → columns/rows.\n- \"Schema\" = the structure overall, and also a namespace in PostgreSQL (public) and SQL Server (dbo). In MySQL, schema = database.\n- Row = one record, column = one attribute, cell may be NULL.\n- Not a spreadsheet: enforced types, no guaranteed row order, rows identified by primary key.\n- Explore with SHOW TABLES / DESCRIBE / information_schema.columns.\n- Watch case sensitivity of table names (MySQL on Linux) and the fully qualified name when working across databases.\n- Map every UI screen and field to its table and column so you know where to look.",
  "contentMarkdown": "## Data is organized in a hierarchy\nA database server (one running MySQL, PostgreSQL or SQL Server) hosts one or more databases. A database contains tables, plus other objects like views and indexes. A table has columns (the structure) and rows (the data). Most people picture this as a nested set of containers:\nServer (MySQL instance on qa-db:3306)\n └── Database: hrms_qa\n## └── Schema: (see below)\n           ├── Table: employees      → columns: employee_id, first_name, email, ...\n           ├── Table: leave_requests → columns: leave_request_id, employee_id, status, ...\n## └── Table: payroll\n\nWhen a tester says \"check the DB,\" they usually mean \"connect to this server, pick this database, and query these tables.\" Knowing which level you're at prevents the classic mistake of running a query against the wrong database, or the right database on the wrong server (say staging instead of QA).\n## What \"schema\" means (and why it confuses everyone)\nThe word has two related meanings. In everyday conversation, \"the schema\" means the structure of the database: which tables exist, their columns, types and constraints. In SQL Server and PostgreSQL, a schema is also a specific namespace inside a database that groups tables. PostgreSQL's default is public, SQL Server's is dbo. In MySQL, \"schema\" and \"database\" are just synonyms for the same thing.\n\n| MySQL | PostgreSQL | SQL Server | Hierarchy | Server → Database (= schema) → Table |\n|---|---|---|---|---|\n| Server → Database → Schema → Table | Server → Database → Schema → Table | Default schema | The database itself | public |\n| dbo | Fully qualified name | hrms_qa.employees | hrms_qa.public.employees (or public.employees) | hrms_qa.dbo.employees |\n\nThe fully qualified name matters when a query touches two databases or when your client's active database isn't the one you thought. SELECT * FROM hrms_qa.employees; works in MySQL no matter which database you're currently \"in.\"\n## Tables, rows and columns\nA table models one kind of thing (employees, leave requests, payroll runs). A column is one attribute of that thing, and it has a fixed name and data type. A row (also called a record or tuple) is one specific instance. A single intersection of a row and a column is a cell or field value. A cell can also hold NULL, meaning \"no value / unknown,\" which is different from zero or an empty string (Chapter 2.3 is dedicated to it).\n## A table is not a spreadsheet\n## The spreadsheet picture helps at first, but a few differences matter for testing:\nEvery column has an enforced type. You can't put \"abc\" in a date column.\nRows have no guaranteed order. Without ORDER BY, the database may return rows in any order, and that order can change between runs. Never write a test that assumes \"the first row returned is the newest.\" This is the SQL cousin of a flaky test that depends on DOM order that isn't guaranteed.\nRows are identified by keys, not by position. There's no \"row 7.\" There is employee_id = 7.\nNo merged cells, no formulas in cells. Calculated values are either computed at query time or stored as plain values (like net_pay), which is exactly why we verify stored calculations in Part 6.\n## Primary keys, briefly\nAlmost every table has a primary key, a column (or combination of columns) whose value uniquely identifies each row, such as employee_id. It can't be NULL and can't repeat. Foreign keys (like employees.department_id) point to primary keys in other tables. We treat keys formally in 8.1, and use them for joins in Part 4. For now, just know that \"one row = one primary key value.\"\nExploring what's in a database\nBefore you can query anything, you need to know what exists:\n```sql\n-- MySQL\n```\n| SHOW DATABASES;              -- list databases on the server | USE hrms_practice;           -- switch to one |\n|---|---|\n| SHOW TABLES;                 -- list tables | DESCRIBE employees;          -- columns, types, nullability, keys |\n\n```sql\n-- PostgreSQL (psql shell)\n```\n| \\l                 -- list databases | \\c hrms_practice   -- connect to one |\n|---|---|\n| \\dt                -- list tables | \\d employees       -- describe a table |\n\n-- Works on all three via the standard information schema\n```sql\nSELECT column_name, data_type, is_nullable\nFROM   information_schema.columns\nWHERE  table_name = 'employees';\n```\n\ninformation_schema is a set of built-in views that describe the database itself. GUI tools (DBeaver, Workbench, pgAdmin) show the same information in a tree. Chapter 8.6 builds a whole workflow on exploring an unfamiliar database; for now, get used to typing DESCRIBE on any table before you query it.\n## Naming conventions and case sensitivity\nMost teams use snake_case names, and tables are named as plural nouns (employees, leave_requests). Don't assume, though. A legacy database might have tblEmp or EMPLOYEE_MASTER. Case handling differs by dialect. MySQL table names are case-sensitive on Linux servers but not on Windows, which produces the fun bug where a query works on a developer's laptop and fails on the QA server. PostgreSQL folds unquoted names to lowercase, so SELECT * FROM Employees finds employees, but a table created as \"Employees\" (quoted) needs the quotes forever.\n## The tester's mapping from UI to tables\nA useful mental exercise: for every screen in the app, ask which table(s) it reads from and which columns each field maps to. The \"Employee List\" screen reads employees (joined with departments for the department name). The \"Add Employee\" form writes one row to employees. The \"Leave Balance\" widget probably derives its number from leave_types and leave_requests. Once you can map UI to tables, you can predict where a bug will show up in the data. Selenium and Playwright locate elements in the DOM, which is a tree. SQL locates data in tables, which is a set of rows. Both are \"find the thing you care about, then assert on it.\"\n",
  "blocks": [
    {
      "id": "sql-1-1-md-0",
      "type": "overview",
      "heading": "Data is organized in a hierarchy",
      "content": "A database server (one running MySQL, PostgreSQL or SQL Server) hosts one or more databases. A database contains tables, plus other objects like views and indexes. A table has columns (the structure) and rows (the data). Most people picture this as a nested set of containers:\nServer (MySQL instance on qa-db:3306)\n └── Database: hrms_qa",
      "order": 0
    },
    {
      "id": "sql-1-1-md-1",
      "type": "overview",
      "heading": "└── Schema: (see below)",
      "content": "├── Table: employees      → columns: employee_id, first_name, email, ...\n           ├── Table: leave_requests → columns: leave_request_id, employee_id, status, ...",
      "order": 1
    },
    {
      "id": "sql-1-1-md-2",
      "type": "overview",
      "heading": "└── Table: payroll",
      "content": "When a tester says \"check the DB,\" they usually mean \"connect to this server, pick this database, and query these tables.\" Knowing which level you're at prevents the classic mistake of running a query against the wrong database, or the right database on the wrong server (say staging instead of QA).",
      "order": 2
    },
    {
      "id": "sql-1-1-md-3",
      "type": "overview",
      "heading": "What \"schema\" means (and why it confuses everyone)",
      "content": "The word has two related meanings. In everyday conversation, \"the schema\" means the structure of the database: which tables exist, their columns, types and constraints. In SQL Server and PostgreSQL, a schema is also a specific namespace inside a database that groups tables. PostgreSQL's default is public, SQL Server's is dbo. In MySQL, \"schema\" and \"database\" are just synonyms for the same thing.\n\n| MySQL | PostgreSQL | SQL Server | Hierarchy | Server → Database (= schema) → Table |\n|---|---|---|---|---|\n| Server → Database → Schema → Table | Server → Database → Schema → Table | Default schema | The database itself | public |\n| dbo | Fully qualified name | hrms_qa.employees | hrms_qa.public.employees (or public.employees) | hrms_qa.dbo.employees |\n\nThe fully qualified name matters when a query touches two databases or when your client's active database isn't the one you thought. SELECT * FROM hrms_qa.employees; works in MySQL no matter which database you're currently \"in.\"",
      "order": 3
    },
    {
      "id": "sql-1-1-md-4",
      "type": "overview",
      "heading": "Tables, rows and columns",
      "content": "A table models one kind of thing (employees, leave requests, payroll runs). A column is one attribute of that thing, and it has a fixed name and data type. A row (also called a record or tuple) is one specific instance. A single intersection of a row and a column is a cell or field value. A cell can also hold NULL, meaning \"no value / unknown,\" which is different from zero or an empty string (Chapter 2.3 is dedicated to it).",
      "order": 4
    },
    {
      "id": "sql-1-1-md-5",
      "type": "overview",
      "heading": "A table is not a spreadsheet",
      "content": "A table is not a spreadsheet",
      "order": 5
    },
    {
      "id": "sql-1-1-md-6",
      "type": "overview",
      "heading": "The spreadsheet picture helps at first, but a few differences matter for testing:",
      "content": "Every column has an enforced type. You can't put \"abc\" in a date column.\nRows have no guaranteed order. Without ORDER BY, the database may return rows in any order, and that order can change between runs. Never write a test that assumes \"the first row returned is the newest.\" This is the SQL cousin of a flaky test that depends on DOM order that isn't guaranteed.\nRows are identified by keys, not by position. There's no \"row 7.\" There is employee_id = 7.\nNo merged cells, no formulas in cells. Calculated values are either computed at query time or stored as plain values (like net_pay), which is exactly why we verify stored calculations in Part 6.",
      "order": 6
    },
    {
      "id": "sql-1-1-md-7",
      "type": "overview",
      "heading": "Primary keys, briefly",
      "content": "Almost every table has a primary key, a column (or combination of columns) whose value uniquely identifies each row, such as employee_id. It can't be NULL and can't repeat. Foreign keys (like employees.department_id) point to primary keys in other tables. We treat keys formally in 8.1, and use them for joins in Part 4. For now, just know that \"one row = one primary key value.\"\nExploring what's in a database\nBefore you can query anything, you need to know what exists:\n```sql\n-- MySQL\n```\n| SHOW DATABASES;              -- list databases on the server | USE hrms_practice;           -- switch to one |\n|---|---|\n| SHOW TABLES;                 -- list tables | DESCRIBE employees;          -- columns, types, nullability, keys |\n\n```sql\n-- PostgreSQL (psql shell)\n```\n| \\l                 -- list databases | \\c hrms_practice   -- connect to one |\n|---|---|\n| \\dt                -- list tables | \\d employees       -- describe a table |\n\n-- Works on all three via the standard information schema\n```sql\nSELECT column_name, data_type, is_nullable\nFROM   information_schema.columns\nWHERE  table_name = 'employees';\n```\n\ninformation_schema is a set of built-in views that describe the database itself. GUI tools (DBeaver, Workbench, pgAdmin) show the same information in a tree. Chapter 8.6 builds a whole workflow on exploring an unfamiliar database; for now, get used to typing DESCRIBE on any table before you query it.",
      "order": 7
    },
    {
      "id": "sql-1-1-md-8",
      "type": "overview",
      "heading": "Naming conventions and case sensitivity",
      "content": "Most teams use snake_case names, and tables are named as plural nouns (employees, leave_requests). Don't assume, though. A legacy database might have tblEmp or EMPLOYEE_MASTER. Case handling differs by dialect. MySQL table names are case-sensitive on Linux servers but not on Windows, which produces the fun bug where a query works on a developer's laptop and fails on the QA server. PostgreSQL folds unquoted names to lowercase, so SELECT * FROM Employees finds employees, but a table created as \"Employees\" (quoted) needs the quotes forever.",
      "order": 8
    },
    {
      "id": "sql-1-1-md-9",
      "type": "overview",
      "heading": "The tester's mapping from UI to tables",
      "content": "A useful mental exercise: for every screen in the app, ask which table(s) it reads from and which columns each field maps to. The \"Employee List\" screen reads employees (joined with departments for the department name). The \"Add Employee\" form writes one row to employees. The \"Leave Balance\" widget probably derives its number from leave_types and leave_requests. Once you can map UI to tables, you can predict where a bug will show up in the data. Selenium and Playwright locate elements in the DOM, which is a tree. SQL locates data in tables, which is a set of rows. Both are \"find the thing you care about, then assert on it.\"",
      "order": 9
    }
  ],
  "advantages": [
    "1.1 Databases, Tables, Rows, Columns, Schemas — 1."
  ],
  "limitations": [
    "1.1 Databases, Tables, Rows, Columns, Schemas is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
