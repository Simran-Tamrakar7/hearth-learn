import type { ChapterRecord } from "../../../types";

/** 9.6 Dashboard & Report Validation */
export const chapter = {
  "id": "sql-9-6-dashboard-report-validation",
  "title": "9.6 Dashboard & Report Validation",
  "minutes": 20,
  "level": "advanced",
  "phase": "Part 9 · SQL in API/Backend Testing",
  "partName": "Part 9 · SQL in API/Backend Testing",
  "overviewText": "Every tile, chart and report table maps to a GROUP BY, a SUM/COUNT/AVG, or a join across a few of those (Part 3, 5.4). Validating one is mechanically identical to validating any other aggregate — the technique doesn't change, only the specific query does. Identify exactly what the tile/chart/report claims to show, including the implicit filters (soft-deletes, date range, \"current\" period, tenant). Write an independent SQL query for that same claim, from the base tables. Compare, and where the numbers differ, drill from the total down to the row level to find which rows caused it.",
  "why": "9.6 Dashboard & Report Validation is how a tester proves stored state, not just the screen. Every tile, chart and report table maps to a GROUP BY, a SUM/COUNT/AVG, or a join across a few of those (Part 3, 5.4).",
  "when": "Open this chapter when you are on the SQL in API/Backend Testing path and need Dashboard & Report Validation against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen.",
  "practical": {
    "app": "Bizlevate HRMS / hrms_practice",
    "scenario": "A leave, payroll, attendance, or appointment check depends on Dashboard & Report Validation.",
    "pass": "You apply Dashboard & Report Validation on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
    "fail": "You copy a blog query, skip Dashboard & Report Validation, or treat a UI success toast as proof the row is correct."
  },
  "tools": [],
  "customSummary": "- Every tile/chart/report is an aggregate query in UI clothing; validate by identifying the claim (including implicit filters), writing an independent query, comparing, and drilling down on mismatch.\n- Implicit filters (soft-delete, period boundaries, tenant) are where the real bugs are, not the raw total.\n- Charts: verify every bucket, especially empty/zero periods that a plain GROUP BY silently omits (5.2).\n- Cross-tab reports: verify with SUM(CASE...) pivots and confirm each row's columns sum to its stated row total.\n- Exports: download and compare row-for-row against the same query; watch numeric formatting and unstated sort order.\n- Report footer totals should also be checked against a sum of the report's own displayed rows, independent of the database, to catch two code paths disagreeing.\n- A mismatch may mean a stale cache/materialised view, not a calculation bug — check refresh timestamps before concluding.",
  "contentMarkdown": "## Dashboards and reports are aggregate queries wearing a UI\nEvery tile, chart and report table maps to a GROUP BY, a SUM/COUNT/AVG, or a join across a few of those (Part 3, 5.4). Validating one is mechanically identical to validating any other aggregate — the technique doesn't change, only the specific query does.\n## The reconciliation loop\nIdentify exactly what the tile/chart/report claims to show, including the implicit filters (soft-deletes, date range, \"current\" period, tenant).\nWrite an independent SQL query for that same claim, from the base tables.\nCompare, and where the numbers differ, drill from the total down to the row level to find which rows caused it.\n```py\ndef test_dashboard_total_pending_matches_db(db, api_base_url):\n    resp = requests.get(f\"{api_base_url}/dashboard\")\n    ui_pending = resp.json()[\"pendingLeaveCount\"]\n```\n\n    db.execute(\"SELECT COUNT(*) AS n FROM leave_requests WHERE status='pending'\")\n## assert ui_pending == db.fetchone()[\"n\"]\n\nThat's rarely enough on its own — the interesting bugs live in the implicit filters:\n```py\ndef test_dashboard_excludes_soft_deleted_and_matches_period(db, api_base_url):\n    resp = requests.get(f\"{api_base_url}/dashboard?period=2026-09\")\n    ui_headcount = resp.json()[\"activeHeadcount\"]\n```\n\n## db.execute(\"\"\"SELECT COUNT(*) AS n FROM employees\n                  WHERE status='active' AND is_deleted=0 AND hire_date < '2026-10-01'\"\"\")\n## assert ui_headcount == db.fetchone()[\"n\"]\n\nIf this second test fails while the first passes, the difference is almost always one of the implicit conditions (a missing is_deleted filter, or the period boundary computed wrong), which is exactly the kind of finding a plain \"does the number look right\" check can't produce.\n## Charts: validate every series and every bucket, not just the visible total\nA chart is a GROUP BY with each group as a point or bar. Missing buckets (5.2's \"November disappears\") are the most common chart defect, so explicitly test for empty periods:\n```py\ndef test_monthly_chart_includes_zero_months(db, api_base_url):\n    resp = requests.get(f\"{api_base_url}/reports/leave-by-month?year=2026\")\n    api_months = {p[\"month\"]: p[\"count\"] for p in resp.json()[\"points\"]}\n```\n\n## # expected: every month 01-12 present, even with zero requests\n## assert set(api_months.keys()) == {f\"2026-{m:02d}\" for m in range(1, 13)}\n\n## db.execute(\"\"\"SELECT DATE_FORMAT(start_date,'%Y-%m') ym, COUNT(*) n FROM leave_requests\n                  WHERE start_date>='2026-01-01' AND start_date<'2027-01-01' GROUP BY ym\"\"\")\n    db_months = {r[\"ym\"]: r[\"n\"] for r in db.fetchall()}\n## for month, count in api_months.items():\n        assert count == db_months.get(month, 0)          # missing months in the DB result mean zero, not absence\n\nCross-tab reports (a grid of rows and columns): verify with the SUM(CASE ...) pivot pattern from 3.2, row by row, and check that each row's columns sum to that row's stated total (the partition-check idea from 2.1, applied per row of a report).\nExports: an exported CSV/Excel is a snapshot of a query result. Download it in the test and compare row-for-row against the same query, as shown in 6.2's export example — the two subtle issues to always check are numeric formatting (thousands separators, currency symbols stripped before comparing) and row order (an export without an explicit sort can legitimately differ in row order from a re-run of the underlying query unless both specify the same ORDER BY).\nReport totals that don't match the report's own rows: a footer \"Total\" figure computed by a different code path than the rows above it is a real and common defect (two independently-written pieces of logic that were supposed to agree). Sum the displayed rows yourself and compare against the displayed total, entirely independent of the database, as an extra check layered on top of the DB comparison:\n## row_sum = sum(item[\"approvedDays\"] for item in resp.json()[\"rows\"])\nassert row_sum == resp.json()[\"total\"]        # the report's own internal consistency, not just DB agreement\n\nCaching and staleness: if a dashboard is backed by a cache or a materialised view (8.3), a failing comparison may mean the cache is stale rather than the calculation being wrong. Check the refresh timestamp/TTL before concluding it's a calculation bug, and re-test immediately after a forced refresh to isolate staleness from logic errors.\n",
  "blocks": [
    {
      "id": "sql-9-6-md-0",
      "type": "overview",
      "heading": "Dashboards and reports are aggregate queries wearing a UI",
      "content": "Every tile, chart and report table maps to a GROUP BY, a SUM/COUNT/AVG, or a join across a few of those (Part 3, 5.4). Validating one is mechanically identical to validating any other aggregate — the technique doesn't change, only the specific query does.",
      "order": 0
    },
    {
      "id": "sql-9-6-md-1",
      "type": "overview",
      "heading": "The reconciliation loop",
      "content": "Identify exactly what the tile/chart/report claims to show, including the implicit filters (soft-deletes, date range, \"current\" period, tenant).\nWrite an independent SQL query for that same claim, from the base tables.\nCompare, and where the numbers differ, drill from the total down to the row level to find which rows caused it.\n```py\ndef test_dashboard_total_pending_matches_db(db, api_base_url):\n    resp = requests.get(f\"{api_base_url}/dashboard\")\n    ui_pending = resp.json()[\"pendingLeaveCount\"]\n```\n\n    db.execute(\"SELECT COUNT(*) AS n FROM leave_requests WHERE status='pending'\")",
      "order": 1
    },
    {
      "id": "sql-9-6-md-2",
      "type": "overview",
      "heading": "assert ui_pending == db.fetchone()[\"n\"]",
      "content": "That's rarely enough on its own — the interesting bugs live in the implicit filters:\n```py\ndef test_dashboard_excludes_soft_deleted_and_matches_period(db, api_base_url):\n    resp = requests.get(f\"{api_base_url}/dashboard?period=2026-09\")\n    ui_headcount = resp.json()[\"activeHeadcount\"]\n```",
      "order": 2
    },
    {
      "id": "sql-9-6-md-3",
      "type": "overview",
      "heading": "db.execute(\"\"\"SELECT COUNT(*) AS n FROM employees",
      "content": "WHERE status='active' AND is_deleted=0 AND hire_date < '2026-10-01'\"\"\")",
      "order": 3
    },
    {
      "id": "sql-9-6-md-4",
      "type": "overview",
      "heading": "assert ui_headcount == db.fetchone()[\"n\"]",
      "content": "If this second test fails while the first passes, the difference is almost always one of the implicit conditions (a missing is_deleted filter, or the period boundary computed wrong), which is exactly the kind of finding a plain \"does the number look right\" check can't produce.",
      "order": 4
    },
    {
      "id": "sql-9-6-md-5",
      "type": "overview",
      "heading": "Charts: validate every series and every bucket, not just the visible total",
      "content": "A chart is a GROUP BY with each group as a point or bar. Missing buckets (5.2's \"November disappears\") are the most common chart defect, so explicitly test for empty periods:\n```py\ndef test_monthly_chart_includes_zero_months(db, api_base_url):\n    resp = requests.get(f\"{api_base_url}/reports/leave-by-month?year=2026\")\n    api_months = {p[\"month\"]: p[\"count\"] for p in resp.json()[\"points\"]}\n```",
      "order": 5
    },
    {
      "id": "sql-9-6-md-6",
      "type": "overview",
      "heading": "# expected: every month 01-12 present, even with zero requests",
      "content": "# expected: every month 01-12 present, even with zero requests",
      "order": 6
    },
    {
      "id": "sql-9-6-md-7",
      "type": "overview",
      "heading": "assert set(api_months.keys()) == {f\"2026-{m:02d}\" for m in range(1, 13)}",
      "content": "assert set(api_months.keys()) == {f\"2026-{m:02d}\" for m in range(1, 13)}",
      "order": 7
    },
    {
      "id": "sql-9-6-md-8",
      "type": "overview",
      "heading": "db.execute(\"\"\"SELECT DATE_FORMAT(start_date,'%Y-%m') ym, COUNT(*) n FROM leave_requests",
      "content": "WHERE start_date>='2026-01-01' AND start_date<'2027-01-01' GROUP BY ym\"\"\")\n    db_months = {r[\"ym\"]: r[\"n\"] for r in db.fetchall()}",
      "order": 8
    },
    {
      "id": "sql-9-6-md-9",
      "type": "overview",
      "heading": "for month, count in api_months.items():",
      "content": "assert count == db_months.get(month, 0)          # missing months in the DB result mean zero, not absence\n\nCross-tab reports (a grid of rows and columns): verify with the SUM(CASE ...) pivot pattern from 3.2, row by row, and check that each row's columns sum to that row's stated total (the partition-check idea from 2.1, applied per row of a report).\nExports: an exported CSV/Excel is a snapshot of a query result. Download it in the test and compare row-for-row against the same query, as shown in 6.2's export example — the two subtle issues to always check are numeric formatting (thousands separators, currency symbols stripped before comparing) and row order (an export without an explicit sort can legitimately differ in row order from a re-run of the underlying query unless both specify the same ORDER BY).\nReport totals that don't match the report's own rows: a footer \"Total\" figure computed by a different code path than the rows above it is a real and common defect (two independently-written pieces of logic that were supposed to agree). Sum the displayed rows yourself and compare against the displayed total, entirely independent of the database, as an extra check layered on top of the DB comparison:",
      "order": 9
    },
    {
      "id": "sql-9-6-md-10",
      "type": "overview",
      "heading": "row_sum = sum(item[\"approvedDays\"] for item in resp.json()[\"rows\"])",
      "content": "assert row_sum == resp.json()[\"total\"]        # the report's own internal consistency, not just DB agreement\n\nCaching and staleness: if a dashboard is backed by a cache or a materialised view (8.3), a failing comparison may mean the cache is stale rather than the calculation being wrong. Check the refresh timestamp/TTL before concluding it's a calculation bug, and re-test immediately after a forced refresh to isolate staleness from logic errors.",
      "order": 10
    }
  ],
  "advantages": [
    "9.6 Dashboard & Report Validation — 9."
  ],
  "limitations": [
    "9.6 Dashboard & Report Validation is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
