import type { ChapterRecord } from "../../../types";

/** 9.7 SQL Injection Basics for Testers */
export const chapter = {
  "id": "sql-9-7-sql-injection-basics-for-testers",
  "title": "9.7 SQL Injection Basics for Testers",
  "minutes": 20,
  "level": "advanced",
  "phase": "Part 9 · SQL in API/Backend Testing",
  "partName": "Part 9 · SQL in API/Backend Testing",
  "overviewText": "SQL injection happens when user-supplied input is inserted directly into a SQL statement's text instead of being passed as a separate, properly-typed parameter, letting an attacker's input change the structure of the query rather than just its data. The vulnerable pattern # VULNERABLE: string concatenation If user_input is Karki' OR '1'='1, the executed query becomes WHERE last_name = 'Karki' OR '1'='1', which matches every row. If it's Karki'; DROP TABLE employees; --, and the driver allows multiple statements, the consequences are catastrophic. This is why the copyright/harm-avoidance instructions for this manual are explicit that Claude does not write or explain exploit code — but recogni",
  "why": "9.7 SQL Injection Basics for Testers is how a tester proves stored state, not just the screen. SQL injection happens when user-supplied input is inserted directly into a SQL statement's text instead of being passed as a separate, properly-typed parameter, letting an attacker's input change the structure of the query rather than just its data.",
  "when": "Open this chapter when you are on the SQL in API/Backend Testing path and need SQL Injection Basics for Testers against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen.",
  "practical": {
    "app": "Bizlevate HRMS / hrms_practice",
    "scenario": "A leave, payroll, attendance, or appointment check depends on SQL Injection Basics for Testers.",
    "pass": "You apply SQL Injection Basics for Testers on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
    "fail": "You copy a blog query, skip SQL Injection Basics for Testers, or treat a UI success toast as proof the row is correct."
  },
  "tools": [],
  "customSummary": "- SQL injection: user input alters query structure because it was concatenated into SQL text instead of passed as a parameter.\n- The safe pattern (parameterised queries, ?/%s/$1) has been used in every code example across this manual for exactly this reason.\n- Testing for the vulnerability means confirming safe patterns are used everywhere — via safe input probes (quotes, %/_, checked for correct handling not damage), inspecting for leaked raw DB errors, code review for string-concatenated SQL, and automated SAST tooling — not crafting working exploits against shared or production-adjacent systems.\n- ORMs' \"raw query\" escape hatches can reintroduce the same vulnerability; check for their use.\n- Report suspected vulnerabilities through normal defect/security channels with the triggering input and reasoning, without attempting real exfiltration or destructive payloads.",
  "contentMarkdown": "## What SQL injection is, in one sentence\nSQL injection happens when user-supplied input is inserted directly into a SQL statement's text instead of being passed as a separate, properly-typed parameter, letting an attacker's input change the structure of the query rather than just its data.\nThe vulnerable pattern\n# VULNERABLE: string concatenation\n## query = f\"SELECT * FROM employees WHERE last_name = '{user_input}'\"\n\nIf user_input is Karki' OR '1'='1, the executed query becomes WHERE last_name = 'Karki' OR '1'='1', which matches every row. If it's Karki'; DROP TABLE employees; --, and the driver allows multiple statements, the consequences are catastrophic. This is why the copyright/harm-avoidance instructions for this manual are explicit that Claude does not write or explain exploit code — but recognizing this class of defect, and testing for its absence, is a core, entirely legitimate QA skill, distinct from writing an attack.\nThe safe pattern: parameterised queries, always\n# SAFE: the driver sends the value separately from the query structure\ncursor.execute(\"SELECT * FROM employees WHERE last_name = %s\", (user_input,))\n\n## // SAFE (Node/mysql2)\nawait db.execute('SELECT * FROM employees WHERE last_name = ?', [userInput]);\n\nThe parameter placeholder (%s, ?, $1 depending on driver/dialect) is never string-substituted into the SQL text; it's sent to the database separately, so the database always treats it as a literal value, never as SQL syntax, no matter what characters it contains. This is the single most important rule in this entire manual for any SQL a tester writes in their own test code (it's been stated repeatedly across earlier Parts, and it bears repeating here as the reason why).\n## How testers check for the vulnerability, without exploiting it\nTesting for injection means confirming the application uses parameterised queries (or an ORM that does so by default) everywhere user input reaches a query — not crafting a working attack payload against a shared or production-adjacent system. Appropriate, safe checks:\nInput with SQL-meaningful characters, checked for correct handling, not damage. Enter a single quote (O'Brien), a %/_ (2.5), or a semicolon into a search box or form field, and confirm the application either escapes/parameterises it correctly (the search behaves as a literal-text search) or rejects it with a validation error — never that it produces a database error message or unexpected data exposure.\nError message inspection. If any input causes a raw database error to reach the response (a stack trace, a SQL syntax error, a leaked table/column name), that's a defect regardless of whether it constitutes full injection — it signals string concatenation is likely happening somewhere, and it leaks schema information useful to an attacker (8.1's point about not leaking constraint names in error text applies here too).\nCode review, where available. If you can see the backend source, search for string concatenation or f-string/template-literal interpolation feeding into SQL execution calls, and flag any instance for the developer to convert to a parameterised query. This is the most reliable and safest way to find the class of defect, far more so than trying inputs against a running system.\nAutomated static analysis tools (SAST scanners like Semgrep, SonarQube, Bandit for Python) are built for exactly this and should be part of the pipeline, not something a tester improvises input strings to replicate.\nORMs are not automatically safe. Confirm the team isn't using an ORM's \"raw query\" escape hatch with concatenated strings, which reintroduces the exact same vulnerability underneath a framework that otherwise parameterises by default.\n## If you suspect a real vulnerability\nReport it through the team's normal defect process (or a security-specific channel/bug bounty process if your organization has one) with the input that triggered unexpected behavior (an error message, unexpected rows, or an obviously wrong result) and a description of why it's suspicious — without attempting to escalate into an actual data exfiltration or destructive payload against any shared environment, which crosses from testing into an actual attack and can cause real damage to a database other people depend on. This is exactly the boundary this manual's own safety guidance draws: recognizing and reporting the vulnerability class is standard QA work; constructing working exploits against real systems is not something to practice, even \"just to see.\"\n## Why this belongs in a QA manual at all\nEvery technique earlier in this manual (parameterised queries in 7.1's INSERT examples, in every test-automation snippet across Parts 6-10) has consistently used ?/%s placeholders rather than string-built SQL, precisely so the habit is already there by the time you reach this chapter. The goal here is naming why that habit matters, and giving you the vocabulary to recognize and flag the vulnerable pattern when you see it in someone else's code, or by accident in your own test scripts.\n",
  "blocks": [
    {
      "id": "sql-9-7-md-0",
      "type": "overview",
      "heading": "What SQL injection is, in one sentence",
      "content": "SQL injection happens when user-supplied input is inserted directly into a SQL statement's text instead of being passed as a separate, properly-typed parameter, letting an attacker's input change the structure of the query rather than just its data.\nThe vulnerable pattern\n# VULNERABLE: string concatenation",
      "order": 0
    },
    {
      "id": "sql-9-7-md-1",
      "type": "overview",
      "heading": "query = f\"SELECT * FROM employees WHERE last_name = '{user_input}'\"",
      "content": "If user_input is Karki' OR '1'='1, the executed query becomes WHERE last_name = 'Karki' OR '1'='1', which matches every row. If it's Karki'; DROP TABLE employees; --, and the driver allows multiple statements, the consequences are catastrophic. This is why the copyright/harm-avoidance instructions for this manual are explicit that Claude does not write or explain exploit code — but recognizing this class of defect, and testing for its absence, is a core, entirely legitimate QA skill, distinct from writing an attack.\nThe safe pattern: parameterised queries, always\n# SAFE: the driver sends the value separately from the query structure\ncursor.execute(\"SELECT * FROM employees WHERE last_name = %s\", (user_input,))",
      "order": 1
    },
    {
      "id": "sql-9-7-md-2",
      "type": "overview",
      "heading": "// SAFE (Node/mysql2)",
      "content": "await db.execute('SELECT * FROM employees WHERE last_name = ?', [userInput]);\n\nThe parameter placeholder (%s, ?, $1 depending on driver/dialect) is never string-substituted into the SQL text; it's sent to the database separately, so the database always treats it as a literal value, never as SQL syntax, no matter what characters it contains. This is the single most important rule in this entire manual for any SQL a tester writes in their own test code (it's been stated repeatedly across earlier Parts, and it bears repeating here as the reason why).",
      "order": 2
    },
    {
      "id": "sql-9-7-md-3",
      "type": "overview",
      "heading": "How testers check for the vulnerability, without exploiting it",
      "content": "Testing for injection means confirming the application uses parameterised queries (or an ORM that does so by default) everywhere user input reaches a query — not crafting a working attack payload against a shared or production-adjacent system. Appropriate, safe checks:\nInput with SQL-meaningful characters, checked for correct handling, not damage. Enter a single quote (O'Brien), a %/_ (2.5), or a semicolon into a search box or form field, and confirm the application either escapes/parameterises it correctly (the search behaves as a literal-text search) or rejects it with a validation error — never that it produces a database error message or unexpected data exposure.\nError message inspection. If any input causes a raw database error to reach the response (a stack trace, a SQL syntax error, a leaked table/column name), that's a defect regardless of whether it constitutes full injection — it signals string concatenation is likely happening somewhere, and it leaks schema information useful to an attacker (8.1's point about not leaking constraint names in error text applies here too).\nCode review, where available. If you can see the backend source, search for string concatenation or f-string/template-literal interpolation feeding into SQL execution calls, and flag any instance for the developer to convert to a parameterised query. This is the most reliable and safest way to find the class of defect, far more so than trying inputs against a running system.\nAutomated static analysis tools (SAST scanners like Semgrep, SonarQube, Bandit for Python) are built for exactly this and should be part of the pipeline, not something a tester improvises input strings to replicate.\nORMs are not automatically safe. Confirm the team isn't using an ORM's \"raw query\" escape hatch with concatenated strings, which reintroduces the exact same vulnerability underneath a framework that otherwise parameterises by default.",
      "order": 3
    },
    {
      "id": "sql-9-7-md-4",
      "type": "overview",
      "heading": "If you suspect a real vulnerability",
      "content": "Report it through the team's normal defect process (or a security-specific channel/bug bounty process if your organization has one) with the input that triggered unexpected behavior (an error message, unexpected rows, or an obviously wrong result) and a description of why it's suspicious — without attempting to escalate into an actual data exfiltration or destructive payload against any shared environment, which crosses from testing into an actual attack and can cause real damage to a database other people depend on. This is exactly the boundary this manual's own safety guidance draws: recognizing and reporting the vulnerability class is standard QA work; constructing working exploits against real systems is not something to practice, even \"just to see.\"",
      "order": 4
    },
    {
      "id": "sql-9-7-md-5",
      "type": "overview",
      "heading": "Why this belongs in a QA manual at all",
      "content": "Every technique earlier in this manual (parameterised queries in 7.1's INSERT examples, in every test-automation snippet across Parts 6-10) has consistently used ?/%s placeholders rather than string-built SQL, precisely so the habit is already there by the time you reach this chapter. The goal here is naming why that habit matters, and giving you the vocabulary to recognize and flag the vulnerable pattern when you see it in someone else's code, or by accident in your own test scripts.",
      "order": 5
    }
  ],
  "advantages": [
    "9.7 SQL Injection Basics for Testers — 9."
  ],
  "limitations": [
    "9.7 SQL Injection Basics for Testers is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
