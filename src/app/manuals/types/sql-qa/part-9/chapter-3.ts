import type { ChapterRecord } from "../../../types";

/** 9.3 Cross-Checking Business Logic */
export const chapter = {
  "id": "sql-9-3-cross-checking-business-logic",
  "title": "9.3 Cross-Checking Business Logic",
  "minutes": 20,
  "level": "advanced",
  "phase": "Part 9 · SQL in API/Backend Testing",
  "partName": "Part 9 · SQL in API/Backend Testing",
  "overviewText": "Some rules are pure computation (a discount formula), and some depend on data the application must look up correctly (an employee's leave entitlement, a service's price). API tests that only check \"did I get a 200 and a plausible number\" miss logic bugs that a database cross-check catches immediately, because you compute the same answer a completely different way and compare. This is 6.2 and 9.1's \"computed field\" idea, generalised. For any business rule the API applies, write the rule again in SQL (or in test code, pulling raw values from SQL) and compare:",
  "why": "9.3 Cross-Checking Business Logic is how a tester proves stored state, not just the screen. Some rules are pure computation (a discount formula), and some depend on data the application must look up correctly (an employee's leave entitlement, a service's price).",
  "when": "Open this chapter when you are on the SQL in API/Backend Testing path and need Cross-Checking Business Logic against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen.",
  "practical": {
    "app": "Bizlevate HRMS / hrms_practice",
    "scenario": "A leave, payroll, attendance, or appointment check depends on Cross-Checking Business Logic.",
    "pass": "You apply Cross-Checking Business Logic on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
    "fail": "You copy a blog query, skip Cross-Checking Business Logic, or treat a UI success toast as proof the row is correct."
  },
  "tools": [],
  "customSummary": "- Business logic is partly code, partly data; recompute the rule independently (SQL or test code from raw values) rather than trusting the API's own answer.\n- A mismatch pinpoints the layer: API-calculation bug vs. stored-summary-drift bug (10.4's reconciliation) are different defects needing different fixes.\n- Cross-module rules: act through one module's API, verify the effect (or its absence) in another module's table (leave approval blocking a new appointment, with a check that nothing was created despite the 409).\n- Combine schema-driven boundaries (8.2, CHECK constraints) with API-level parametrized tests; the API's rule must never be looser than the DB's.\n- Reports/dashboards as aggregate endpoints: compare dict-for-dict against a GROUP BY query for exact equality (missing/extra/wrong-count all caught at once).\n- Time-sensitive rules need the test and SQL to share the same \"now\" (frozen clock or captured timestamp with tolerance) to avoid boundary flakiness.\n- A cross-check failure may be a data problem (stale reference data), not a code bug — check the data first using 10.1/10.4 techniques.",
  "contentMarkdown": "## Business logic lives partly in code and partly in data\nSome rules are pure computation (a discount formula), and some depend on data the application must look up correctly (an employee's leave entitlement, a service's price). API tests that only check \"did I get a 200 and a plausible number\" miss logic bugs that a database cross-check catches immediately, because you compute the same answer a completely different way and compare.\n## The independent-computation pattern\nThis is 6.2 and 9.1's \"computed field\" idea, generalised. For any business rule the API applies, write the rule again in SQL (or in test code, pulling raw values from SQL) and compare:\n```py\ndef test_leave_balance_calculation_matches_business_rule(db, api_base_url):\n    resp = requests.get(f\"{api_base_url}/employees/2/leave-balance?type=Sick\")\n    api_balance = resp.json()[\"balance\"]\n```\n\n    db.execute(\"\"\"SELECT lt.days_per_year,\n## COALESCE((SELECT SUM(days) FROM leave_requests lr\n## WHERE lr.employee_id=2 AND lr.leave_type_id=lt.leave_type_id\n                                     AND lr.status='approved' AND lr.start_date >= '2026-01-01'), 0) AS used\n                  FROM leave_types lt WHERE lt.name = 'Sick'\"\"\")\n    row = db.fetchone()\n    expected = float(row[\"days_per_year\"]) - float(row[\"used\"])\n\n## assert api_balance == expected\n\nIf this fails, you know the bug is in the balance calculation logic, distinct from a bug in the stored leave_balances.balance column itself (which 10.4's reconciliation query targets). Separating \"does the API compute correctly from raw facts\" from \"does the stored summary agree with the raw facts\" pinpoints which layer to fix.\n## Testing business rules that span tables\nCross-module rules (10.4's leave-versus-attendance-versus-appointments conflicts) are naturally API-testable this way: perform an action through one module's API, then query a different module's table to confirm the rule held.\n```py\ndef test_approving_leave_blocks_new_appointment_on_that_date(db, api_base_url, auth_manager):\n    # employee 1 is on approved leave 2026-09-15 (request 2, from the base data)\n| resp = requests.post(f\"{api_base_url}/appointments\", json={ | \"customerId\": 1, \"serviceId\": 1, \"employeeId\": 1, |\n|---|---|\n| \"startsAt\": \"2026-09-15T10:00:00\", \"endsAt\": \"2026-09-15T10:30:00\", | }, headers=auth_manager) |\n```\n\n    db.execute(\"SELECT COUNT(*) AS n FROM appointments WHERE employee_id=1 AND DATE(starts_at)='2026-09-15'\")\n    assert db.fetchone()[\"n\"] == 0                                  # and nothing was created despite the 409\n\n## Testing business rules with equivalence classes derived from the schema\nCombine 8.2's schema-driven test design with API assertions. For leave_requests.days bounded by CHECK (days > 0 AND days <= 365), drive the API (not raw SQL) at each boundary and confirm the API enforces the same or a stricter rule than the database, and never a looser one (a looser API rule means the constraint is your only protection, which is fragile — 8.1):\n\n| @pytest.mark.parametrize(\"days,should_succeed\", [ | (0, False), (0.5, True), (365, True), (365.5, False), (-1, False), |\n|---|---|\n| ]) | def test_leave_days_boundaries_enforced_at_api(api_base_url, auth_user, days, should_succeed): |\n| resp = requests.post(f\"{api_base_url}/leave-requests\", json={ | \"employeeId\": 3, \"leaveTypeId\": 1, \"startDate\": \"2027-05-01\", \"endDate\": \"2027-05-01\", \"days\": days, |\n| }, headers=auth_user) | assert (resp.status_code == 201) == should_succeed |\n\n## Testing calculated totals and reports against SQL aggregates\nAny report or dashboard endpoint is exactly a GROUP BY/aggregate query (Part 3) exposed as JSON. Compare them directly:\n```py\ndef test_dashboard_pending_counts_by_department(db, api_base_url):\n    resp = requests.get(f\"{api_base_url}/dashboard/pending-by-department\")\n    api_counts = {row[\"department\"]: row[\"count\"] for row in resp.json()}\n```\n\n    db.execute(\"\"\"SELECT d.name, COUNT(*) AS n FROM leave_requests lr\n| JOIN employees e ON e.employee_id = lr.employee_id | JOIN departments d ON d.department_id = e.department_id |\n|---|---|\n| WHERE lr.status = 'pending' GROUP BY d.name\"\"\") | db_counts = {r[\"name\"]: r[\"n\"] for r in db.fetchall()} |\n\n    assert api_counts == db_counts       # exact dict equality catches missing/extra/wrong-count departments at once\n\n## Testing rules that depend on \"now\"\nTime-sensitive logic (overdue requests, expired sessions, late fees) needs the test and the SQL to agree on the same instant, or comparisons flake near boundaries. Either freeze the application's clock in a test build (many frameworks support a test-only time-travel endpoint or header) or compute the SQL side using the same timestamp the test captured just before the API call, with a small tolerance:\n\n| def test_overdue_flag_matches_creation_time(db, api_base_url): | now = datetime.utcnow() |\n|---|---|\n| resp = requests.get(f\"{api_base_url}/leave-requests/4\") | is_overdue_api = resp.json()[\"isOverdue\"] |\n\n    db.execute(\"SELECT created_at FROM leave_requests WHERE leave_request_id = 4\")\n    created_at = db.fetchone()[\"created_at\"]\n    is_overdue_expected = (now - created_at).days > 7\n\n    assert is_overdue_api == is_overdue_expected\n\n## When the \"business logic\" is really a data problem\nNot every cross-check failure is a code bug. If the independent SQL computation and the API disagree, check whether the underlying data is wrong first (a stale leave_types.days_per_year, a missing company_holidays row) before assuming the application's formula is broken — the anomaly and reconciliation techniques from 10.1 and 10.4 are the first diagnostic step, not the last resort.\n",
  "blocks": [
    {
      "id": "sql-9-3-md-0",
      "type": "overview",
      "heading": "Business logic lives partly in code and partly in data",
      "content": "Some rules are pure computation (a discount formula), and some depend on data the application must look up correctly (an employee's leave entitlement, a service's price). API tests that only check \"did I get a 200 and a plausible number\" miss logic bugs that a database cross-check catches immediately, because you compute the same answer a completely different way and compare.",
      "order": 0
    },
    {
      "id": "sql-9-3-md-1",
      "type": "overview",
      "heading": "The independent-computation pattern",
      "content": "This is 6.2 and 9.1's \"computed field\" idea, generalised. For any business rule the API applies, write the rule again in SQL (or in test code, pulling raw values from SQL) and compare:\n```py\ndef test_leave_balance_calculation_matches_business_rule(db, api_base_url):\n    resp = requests.get(f\"{api_base_url}/employees/2/leave-balance?type=Sick\")\n    api_balance = resp.json()[\"balance\"]\n```\n\n    db.execute(\"\"\"SELECT lt.days_per_year,",
      "order": 1
    },
    {
      "id": "sql-9-3-md-2",
      "type": "overview",
      "heading": "COALESCE((SELECT SUM(days) FROM leave_requests lr",
      "content": "COALESCE((SELECT SUM(days) FROM leave_requests lr",
      "order": 2
    },
    {
      "id": "sql-9-3-md-3",
      "type": "overview",
      "heading": "WHERE lr.employee_id=2 AND lr.leave_type_id=lt.leave_type_id",
      "content": "AND lr.status='approved' AND lr.start_date >= '2026-01-01'), 0) AS used\n                  FROM leave_types lt WHERE lt.name = 'Sick'\"\"\")\n    row = db.fetchone()\n    expected = float(row[\"days_per_year\"]) - float(row[\"used\"])",
      "order": 3
    },
    {
      "id": "sql-9-3-md-4",
      "type": "overview",
      "heading": "assert api_balance == expected",
      "content": "If this fails, you know the bug is in the balance calculation logic, distinct from a bug in the stored leave_balances.balance column itself (which 10.4's reconciliation query targets). Separating \"does the API compute correctly from raw facts\" from \"does the stored summary agree with the raw facts\" pinpoints which layer to fix.",
      "order": 4
    },
    {
      "id": "sql-9-3-md-5",
      "type": "overview",
      "heading": "Testing business rules that span tables",
      "content": "Cross-module rules (10.4's leave-versus-attendance-versus-appointments conflicts) are naturally API-testable this way: perform an action through one module's API, then query a different module's table to confirm the rule held.\n```py\ndef test_approving_leave_blocks_new_appointment_on_that_date(db, api_base_url, auth_manager):\n    # employee 1 is on approved leave 2026-09-15 (request 2, from the base data)\n| resp = requests.post(f\"{api_base_url}/appointments\", json={ | \"customerId\": 1, \"serviceId\": 1, \"employeeId\": 1, |\n|---|---|\n| \"startsAt\": \"2026-09-15T10:00:00\", \"endsAt\": \"2026-09-15T10:30:00\", | }, headers=auth_manager) |\n```\n\n    db.execute(\"SELECT COUNT(*) AS n FROM appointments WHERE employee_id=1 AND DATE(starts_at)='2026-09-15'\")\n    assert db.fetchone()[\"n\"] == 0                                  # and nothing was created despite the 409",
      "order": 5
    },
    {
      "id": "sql-9-3-md-6",
      "type": "overview",
      "heading": "Testing business rules with equivalence classes derived from the schema",
      "content": "Combine 8.2's schema-driven test design with API assertions. For leave_requests.days bounded by CHECK (days > 0 AND days <= 365), drive the API (not raw SQL) at each boundary and confirm the API enforces the same or a stricter rule than the database, and never a looser one (a looser API rule means the constraint is your only protection, which is fragile — 8.1):\n\n| @pytest.mark.parametrize(\"days,should_succeed\", [ | (0, False), (0.5, True), (365, True), (365.5, False), (-1, False), |\n|---|---|\n| ]) | def test_leave_days_boundaries_enforced_at_api(api_base_url, auth_user, days, should_succeed): |\n| resp = requests.post(f\"{api_base_url}/leave-requests\", json={ | \"employeeId\": 3, \"leaveTypeId\": 1, \"startDate\": \"2027-05-01\", \"endDate\": \"2027-05-01\", \"days\": days, |\n| }, headers=auth_user) | assert (resp.status_code == 201) == should_succeed |",
      "order": 6
    },
    {
      "id": "sql-9-3-md-7",
      "type": "overview",
      "heading": "Testing calculated totals and reports against SQL aggregates",
      "content": "Any report or dashboard endpoint is exactly a GROUP BY/aggregate query (Part 3) exposed as JSON. Compare them directly:\n```py\ndef test_dashboard_pending_counts_by_department(db, api_base_url):\n    resp = requests.get(f\"{api_base_url}/dashboard/pending-by-department\")\n    api_counts = {row[\"department\"]: row[\"count\"] for row in resp.json()}\n```\n\n    db.execute(\"\"\"SELECT d.name, COUNT(*) AS n FROM leave_requests lr\n| JOIN employees e ON e.employee_id = lr.employee_id | JOIN departments d ON d.department_id = e.department_id |\n|---|---|\n| WHERE lr.status = 'pending' GROUP BY d.name\"\"\") | db_counts = {r[\"name\"]: r[\"n\"] for r in db.fetchall()} |\n\n    assert api_counts == db_counts       # exact dict equality catches missing/extra/wrong-count departments at once",
      "order": 7
    },
    {
      "id": "sql-9-3-md-8",
      "type": "overview",
      "heading": "Testing rules that depend on \"now\"",
      "content": "Time-sensitive logic (overdue requests, expired sessions, late fees) needs the test and the SQL to agree on the same instant, or comparisons flake near boundaries. Either freeze the application's clock in a test build (many frameworks support a test-only time-travel endpoint or header) or compute the SQL side using the same timestamp the test captured just before the API call, with a small tolerance:\n\n| def test_overdue_flag_matches_creation_time(db, api_base_url): | now = datetime.utcnow() |\n|---|---|\n| resp = requests.get(f\"{api_base_url}/leave-requests/4\") | is_overdue_api = resp.json()[\"isOverdue\"] |\n\n    db.execute(\"SELECT created_at FROM leave_requests WHERE leave_request_id = 4\")\n    created_at = db.fetchone()[\"created_at\"]\n    is_overdue_expected = (now - created_at).days > 7\n\n    assert is_overdue_api == is_overdue_expected",
      "order": 8
    },
    {
      "id": "sql-9-3-md-9",
      "type": "overview",
      "heading": "When the \"business logic\" is really a data problem",
      "content": "Not every cross-check failure is a code bug. If the independent SQL computation and the API disagree, check whether the underlying data is wrong first (a stale leave_types.days_per_year, a missing company_holidays row) before assuming the application's formula is broken — the anomaly and reconciliation techniques from 10.1 and 10.4 are the first diagnostic step, not the last resort.",
      "order": 9
    }
  ],
  "advantages": [
    "9.3 Cross-Checking Business Logic — 9."
  ],
  "limitations": [
    "9.3 Cross-Checking Business Logic is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
