import type { ChapterRecord } from "../../../types";

/** 9.5 Pagination, Sorting & Filter Validation */
export const chapter = {
  "id": "sql-9-5-pagination-sorting-filter-validation",
  "title": "9.5 Pagination, Sorting & Filter Validation",
  "minutes": 21,
  "level": "advanced",
  "phase": "Part 9 · SQL in API/Backend Testing",
  "partName": "Part 9 · SQL in API/Backend Testing",
  "overviewText": "Nearly every list screen and list endpoint has these three controls, and nearly every one of them has the same handful of defect shapes, most of which trace straight back to earlier chapters: unstable sort (2.2), off-by-one boundaries (1.4), and fan-out from joins (4.1). This chapter is the checklist and the SQL-comparison technique, aimed squarely at API/list endpoints. The formula from 2.2: OFFSET = (page - 1) * pageSize. The expected page content is a LIMIT/OFFSET query with the same filters and sort the endpoint claims to apply, including a unique tiebreaker:",
  "why": "9.5 Pagination, Sorting & Filter Validation is how a tester proves stored state, not just the screen. Nearly every list screen and list endpoint has these three controls, and nearly every one of them has the same handful of defect shapes, most of which trace straight back to earlier chapters: unstable sort (2.2), off-by-one boundaries (1.4), and fan-out from joins (4.1).",
  "when": "Open this chapter when you are on the SQL in API/Backend Testing path and need Pagination, Sorting & Filter Validation against the hrms_practice schema, a shared QA database, or a Bizlevate HRMS screen.",
  "practical": {
    "app": "Bizlevate HRMS / hrms_practice",
    "scenario": "A leave, payroll, attendance, or appointment check depends on Pagination, Sorting & Filter Validation.",
    "pass": "You apply Pagination, Sorting & Filter Validation on the sample database (or a tagged QA row) and can say what empty vs non-empty results mean.",
    "fail": "You copy a blog query, skip Pagination, Sorting & Filter Validation, or treat a UI success toast as proof the row is correct."
  },
  "tools": [],
  "customSummary": "- Nearly every list defect traces to 2.2 (unstable sort), 1.4 (off-by-one), or 4.1 (join fan-out).\n- Pagination: OFFSET=(page-1)*pageSize with the same filters/sort/tiebreaker as the endpoint; test last page, page-after-last (empty, not error), page size 1, oversized page size, invalid page numbers, and exact-divisibility boundaries.\n- Total-count field must match an independent COUNT(*) with the same filters and must not drift while paging.\n- Sorting: test every offered column in both directions against an equivalent ORDER BY; never build ORDER BY column names from unsanitised input; confirm NULL-placement rule matches the app's stated behaviour, not an assumed default (dialects differ, 6.5); ties need identical secondary sort keys on both sides or failures are false.\n- Filters: alone, pairwise, all together, and none, mirroring 2.1's optional-filter pattern; test filter+sort+pagination together since ordering-of-operations bugs hide there.\n- Search-text filters reuse 2.5's case/wildcard/whitespace checklist against the live endpoint.",
  "contentMarkdown": "## Why this deserves its own chapter\nNearly every list screen and list endpoint has these three controls, and nearly every one of them has the same handful of defect shapes, most of which trace straight back to earlier chapters: unstable sort (2.2), off-by-one boundaries (1.4), and fan-out from joins (4.1). This chapter is the checklist and the SQL-comparison technique, aimed squarely at API/list endpoints.\n## Pagination correctness\nThe formula from 2.2: OFFSET = (page - 1) * pageSize. The expected page content is a LIMIT/OFFSET query with the same filters and sort the endpoint claims to apply, including a unique tiebreaker:\n```py\ndef expected_page(db, page, page_size, status=None):\n```\n\n| where = \"WHERE status = %s\" if status else \"\" | params = (status,) if status else () | db.execute(f\"\"\"SELECT leave_request_id FROM leave_requests {where} |\n|---|---|---|\n| ORDER BY start_date, leave_request_id | LIMIT %s OFFSET %s\"\"\", params + (page_size, (page - 1) * page_size)) | return [r[\"leave_request_id\"] for r in db.fetchall()] |\n\n```py\n@pytest.mark.parametrize(\"page\", [1, 2, 3])\n| def test_pagination_matches_db(db, api_base_url, page): | resp = requests.get(f\"{api_base_url}/leave-requests?page={page}&pageSize=3\") |\n|---|---|\n| api_ids = [item[\"id\"] for item in resp.json()[\"items\"]] | assert api_ids == expected_page(db, page, 3) |\n```\n\nBoundary conditions to always include: the last page (which may have fewer rows than pageSize), the page just past the last one (should return an empty list, not an error), page size of 1, a page size larger than the total row count, page=0 or negative (should be rejected, not silently clamped in a way nobody documented), and — crucially — total count exactly divisible by page size versus not (an off-by-one in the \"last page\" calculation is one of the most common pagination bugs, and it only shows up at that exact boundary).\n```py\ndef test_last_page_is_not_empty_and_page_after_is(db, api_base_url):\n```\n\n| db.execute(\"SELECT COUNT(*) AS n FROM leave_requests\") | total = db.fetchone()[\"n\"] |\n|---|---|\n| page_size = 3 | last_page = -(-total // page_size)              # ceiling division |\n\n    resp_last = requests.get(f\"{api_base_url}/leave-requests?page={last_page}&pageSize={page_size}\")\n## assert len(resp_last.json()[\"items\"]) == total - (last_page - 1) * page_size\n\n    resp_after = requests.get(f\"{api_base_url}/leave-requests?page={last_page + 1}&pageSize={page_size}\")\n## assert resp_after.json()[\"items\"] == []\n## assert resp_after.status_code == 200            # empty, not an error\n\nTotal count consistency: the totalCount/totalPages field the API reports alongside a page of results must match an independent COUNT(*) with the same filters — and must not change as you page through (a moving total between page 1 and page 2 means the underlying data changed mid-browse, or the count query and the page query use different filters, a classic bug when one was updated and the other wasn't).\nSorting correctness across every offered column\nFor each column the UI/API lets you sort by, both directions:\n```py\n@pytest.mark.parametrize(\"sort_field,sort_column\", [(\"startDate\", \"start_date\"), (\"days\", \"days\"), (\"status\", \"status\")])\n@pytest.mark.parametrize(\"direction\", [\"asc\", \"desc\"])\ndef test_sort_matches_db(db, api_base_url, sort_field, sort_column, direction):\n    resp = requests.get(f\"{api_base_url}/leave-requests?sortBy={sort_field}&sortDir={direction}&pageSize=100\")\n    api_ids = [item[\"id\"] for item in resp.json()[\"items\"]]\n```\n\n## order = \"DESC\" if direction == \"desc\" else \"ASC\"\n    db.execute(f\"SELECT leave_request_id FROM leave_requests ORDER BY {sort_column} {order}, leave_request_id\")\n## assert api_ids == [r[\"leave_request_id\"] for r in db.fetchall()]\n\nNever build the ORDER BY column name from unsanitised user input in application code (9.7 covers why), and in your own test helper, only ever select the column name from a fixed whitelist/dict, never interpolate the parametrize value directly if it could ever come from outside the test file.\nWatch for the NULL-placement dialect difference from 2.2: if the sort column is nullable (approved_by, say), confirm the app's stated rule for where NULLs land, and write the comparison query with an explicit NULLS FIRST/IS NULL ordering clause matching that rule rather than trusting the database's default, which may silently differ between your QA server and production (6.5). And when the sort column has ties (two requests on the same start_date), the paired tiebreaker must be identical between the API and your comparison query, or the two orderings can legitimately differ while both being \"correct\" — a false failure, not a real one.\n## Filter combinations\nFor each filter, test it alone, then every pairwise combination, then all filters together, then the \"no filter\" case, mirroring 2.1's optional-filter pattern:\n\n| FILTERS = [ | {\"status\": \"pending\"}, {\"employeeId\": 2}, {\"leaveTypeId\": 1}, |\n|---|---|\n| {\"status\": \"pending\", \"employeeId\": 2}, {}, | ] |\n\n| @pytest.mark.parametrize(\"filters\", FILTERS, ids=lambda f: str(f) or \"none\") | def test_filter_combinations(db, api_base_url, filters): |\n|---|---|\n| resp = requests.get(f\"{api_base_url}/leave-requests\", params=filters) | api_ids = sorted(item[\"id\"] for item in resp.json()[\"items\"]) |\n\n## where, params = [], []\n## if \"status\" in filters: where.append(\"status=%s\"); params.append(filters[\"status\"])\n    if \"employeeId\" in filters: where.append(\"employee_id=%s\"); params.append(filters[\"employeeId\"])\n    if \"leaveTypeId\" in filters: where.append(\"leave_type_id=%s\"); params.append(filters[\"leaveTypeId\"])\n## clause = f\"WHERE {' AND '.join(where)}\" if where else \"\"\n\n    db.execute(f\"SELECT leave_request_id FROM leave_requests {clause} ORDER BY leave_request_id\", params)\n## assert api_ids == sorted(r[\"leave_request_id\"] for r in db.fetchall())\n\nFilters combined with pagination and sorting: the trickiest and most-often-untested combination is all three together — filter, then sort, then paginate — because a common implementation bug applies them in the wrong order internally (e.g., paginating before filtering). Test at least one scenario with all three active and a filter that changes which rows land on which page.\nSearch-text filters: reuse 2.5's checklist (case, wildcards, whitespace, special characters) against the actual search endpoint, comparing to a LIKE query built with the same escaping/normalisation rule the requirement specifies.\n",
  "blocks": [
    {
      "id": "sql-9-5-md-0",
      "type": "overview",
      "heading": "Why this deserves its own chapter",
      "content": "Nearly every list screen and list endpoint has these three controls, and nearly every one of them has the same handful of defect shapes, most of which trace straight back to earlier chapters: unstable sort (2.2), off-by-one boundaries (1.4), and fan-out from joins (4.1). This chapter is the checklist and the SQL-comparison technique, aimed squarely at API/list endpoints.",
      "order": 0
    },
    {
      "id": "sql-9-5-md-1",
      "type": "overview",
      "heading": "Pagination correctness",
      "content": "The formula from 2.2: OFFSET = (page - 1) * pageSize. The expected page content is a LIMIT/OFFSET query with the same filters and sort the endpoint claims to apply, including a unique tiebreaker:\n```py\ndef expected_page(db, page, page_size, status=None):\n```\n\n| where = \"WHERE status = %s\" if status else \"\" | params = (status,) if status else () | db.execute(f\"\"\"SELECT leave_request_id FROM leave_requests {where} |\n|---|---|---|\n| ORDER BY start_date, leave_request_id | LIMIT %s OFFSET %s\"\"\", params + (page_size, (page - 1) * page_size)) | return [r[\"leave_request_id\"] for r in db.fetchall()] |\n\n```py\n@pytest.mark.parametrize(\"page\", [1, 2, 3])\n| def test_pagination_matches_db(db, api_base_url, page): | resp = requests.get(f\"{api_base_url}/leave-requests?page={page}&pageSize=3\") |\n|---|---|\n| api_ids = [item[\"id\"] for item in resp.json()[\"items\"]] | assert api_ids == expected_page(db, page, 3) |\n```\n\nBoundary conditions to always include: the last page (which may have fewer rows than pageSize), the page just past the last one (should return an empty list, not an error), page size of 1, a page size larger than the total row count, page=0 or negative (should be rejected, not silently clamped in a way nobody documented), and — crucially — total count exactly divisible by page size versus not (an off-by-one in the \"last page\" calculation is one of the most common pagination bugs, and it only shows up at that exact boundary).\n```py\ndef test_last_page_is_not_empty_and_page_after_is(db, api_base_url):\n```\n\n| db.execute(\"SELECT COUNT(*) AS n FROM leave_requests\") | total = db.fetchone()[\"n\"] |\n|---|---|\n| page_size = 3 | last_page = -(-total // page_size)              # ceiling division |\n\n    resp_last = requests.get(f\"{api_base_url}/leave-requests?page={last_page}&pageSize={page_size}\")",
      "order": 1
    },
    {
      "id": "sql-9-5-md-2",
      "type": "overview",
      "heading": "assert len(resp_last.json()[\"items\"]) == total - (last_page - 1) * page_size",
      "content": "resp_after = requests.get(f\"{api_base_url}/leave-requests?page={last_page + 1}&pageSize={page_size}\")",
      "order": 2
    },
    {
      "id": "sql-9-5-md-3",
      "type": "overview",
      "heading": "assert resp_after.json()[\"items\"] == []",
      "content": "assert resp_after.json()[\"items\"] == []",
      "order": 3
    },
    {
      "id": "sql-9-5-md-4",
      "type": "overview",
      "heading": "assert resp_after.status_code == 200            # empty, not an error",
      "content": "Total count consistency: the totalCount/totalPages field the API reports alongside a page of results must match an independent COUNT(*) with the same filters — and must not change as you page through (a moving total between page 1 and page 2 means the underlying data changed mid-browse, or the count query and the page query use different filters, a classic bug when one was updated and the other wasn't).\nSorting correctness across every offered column\nFor each column the UI/API lets you sort by, both directions:\n```py\n@pytest.mark.parametrize(\"sort_field,sort_column\", [(\"startDate\", \"start_date\"), (\"days\", \"days\"), (\"status\", \"status\")])\n@pytest.mark.parametrize(\"direction\", [\"asc\", \"desc\"])\ndef test_sort_matches_db(db, api_base_url, sort_field, sort_column, direction):\n    resp = requests.get(f\"{api_base_url}/leave-requests?sortBy={sort_field}&sortDir={direction}&pageSize=100\")\n    api_ids = [item[\"id\"] for item in resp.json()[\"items\"]]\n```",
      "order": 4
    },
    {
      "id": "sql-9-5-md-5",
      "type": "overview",
      "heading": "order = \"DESC\" if direction == \"desc\" else \"ASC\"",
      "content": "db.execute(f\"SELECT leave_request_id FROM leave_requests ORDER BY {sort_column} {order}, leave_request_id\")",
      "order": 5
    },
    {
      "id": "sql-9-5-md-6",
      "type": "overview",
      "heading": "assert api_ids == [r[\"leave_request_id\"] for r in db.fetchall()]",
      "content": "Never build the ORDER BY column name from unsanitised user input in application code (9.7 covers why), and in your own test helper, only ever select the column name from a fixed whitelist/dict, never interpolate the parametrize value directly if it could ever come from outside the test file.\nWatch for the NULL-placement dialect difference from 2.2: if the sort column is nullable (approved_by, say), confirm the app's stated rule for where NULLs land, and write the comparison query with an explicit NULLS FIRST/IS NULL ordering clause matching that rule rather than trusting the database's default, which may silently differ between your QA server and production (6.5). And when the sort column has ties (two requests on the same start_date), the paired tiebreaker must be identical between the API and your comparison query, or the two orderings can legitimately differ while both being \"correct\" — a false failure, not a real one.",
      "order": 6
    },
    {
      "id": "sql-9-5-md-7",
      "type": "overview",
      "heading": "Filter combinations",
      "content": "For each filter, test it alone, then every pairwise combination, then all filters together, then the \"no filter\" case, mirroring 2.1's optional-filter pattern:\n\n| FILTERS = [ | {\"status\": \"pending\"}, {\"employeeId\": 2}, {\"leaveTypeId\": 1}, |\n|---|---|\n| {\"status\": \"pending\", \"employeeId\": 2}, {}, | ] |\n\n| @pytest.mark.parametrize(\"filters\", FILTERS, ids=lambda f: str(f) or \"none\") | def test_filter_combinations(db, api_base_url, filters): |\n|---|---|\n| resp = requests.get(f\"{api_base_url}/leave-requests\", params=filters) | api_ids = sorted(item[\"id\"] for item in resp.json()[\"items\"]) |",
      "order": 7
    },
    {
      "id": "sql-9-5-md-8",
      "type": "overview",
      "heading": "where, params = [], []",
      "content": "where, params = [], []",
      "order": 8
    },
    {
      "id": "sql-9-5-md-9",
      "type": "overview",
      "heading": "if \"status\" in filters: where.append(\"status=%s\"); params.append(filters[\"status\"])",
      "content": "if \"employeeId\" in filters: where.append(\"employee_id=%s\"); params.append(filters[\"employeeId\"])\n    if \"leaveTypeId\" in filters: where.append(\"leave_type_id=%s\"); params.append(filters[\"leaveTypeId\"])",
      "order": 9
    },
    {
      "id": "sql-9-5-md-10",
      "type": "overview",
      "heading": "clause = f\"WHERE {' AND '.join(where)}\" if where else \"\"",
      "content": "db.execute(f\"SELECT leave_request_id FROM leave_requests {clause} ORDER BY leave_request_id\", params)",
      "order": 10
    },
    {
      "id": "sql-9-5-md-11",
      "type": "overview",
      "heading": "assert api_ids == sorted(r[\"leave_request_id\"] for r in db.fetchall())",
      "content": "Filters combined with pagination and sorting: the trickiest and most-often-untested combination is all three together — filter, then sort, then paginate — because a common implementation bug applies them in the wrong order internally (e.g., paginating before filtering). Test at least one scenario with all three active and a filter that changes which rows land on which page.\nSearch-text filters: reuse 2.5's checklist (case, wildcards, whitespace, special characters) against the actual search endpoint, comparing to a LIKE query built with the same escaping/normalisation rule the requirement specifies.",
      "order": 11
    }
  ],
  "advantages": [
    "9.5 Pagination, Sorting & Filter Validation — 9."
  ],
  "limitations": [
    "9.5 Pagination, Sorting & Filter Validation is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
