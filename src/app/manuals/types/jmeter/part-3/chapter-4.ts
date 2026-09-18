import type { ChapterRecord } from "../../../types";

/** 3.4 CSV Data Set Config (Parameterization) */
export const chapter = {
  "id": "jm-3-4-csv-data-set-config-parameterization",
  "title": "3.4 CSV Data Set Config (Parameterization)",
  "minutes": 24,
  "level": "intermediate",
  "phase": "Part 3 · Configuration Elements",
  "partName": "Part 3 · Configuration Elements",
  "overviewText": "If every virtual user submits leave as EMP1042, you are not load-testing real traffic — you may trip duplicate-detection and row locks. CSV Data Set Config feeds each thread a different row. Sharing mode All threads plus Recycle on EOF are the settings that make variety actually happen.",
  "why": "Identical payloads at volume distort backends and pollute data. This is Playwright test.each(), but file-based.",
  "when": "Any multi-user leave/attendance/TADA test, before you raise thread count above 1.",
  "practical": {
    "app": "employees.csv for leave apply",
    "scenario": "100 threads submitting leave with distinct employee IDs.",
    "pass": "You set Variable Names, Sharing mode All threads, Recycle on EOF True, and reference ${employeeId} in the body.",
    "fail": "You hardcode EMP1042, or Sharing mode leaves every thread on row 1."
  },
  "tools": [],
  "customSummary": "- Feeds each thread/iteration a different row of external CSV data instead of hardcoded values.\n- Configure Filename, Variable Names (matching CSV columns), Delimiter, Recycle on EOF, Sharing mode.\n- Prevents unrealistic \"every virtual user is the same person\" test data, avoiding false backend bottlenecks/duplicate-detection errors.\n- Equivalent concept to Playwright's test.each() / data-driven fixture arrays, just file-based instead of code-based.",
  "contentMarkdown": "## Why hardcoded IDs lie\n\nUp to this point in the examples, requests have used hardcoded values like `\"employeeId\": \"EMP1042\"`. If every one of your 100 simulated virtual users submits a leave request as the exact same employee ID, that's not a realistic load test — worse, it may actively distort your results, since some backend logic (duplicate-request detection, per-user rate limiting, database row-locking on that one employee record) could throw false errors or artificial bottlenecks that would never occur with genuinely distinct users. CSV Data Set Config solves this by feeding each thread a different row of data from an external CSV file for each iteration.\n\n## File + Variable Names\n\nYou prepare a CSV file (no header row needed if you configure column names in the element itself) with as many rows as you want variety — commonly one row per virtual user, or more if you want fresh data across multiple loop iterations too:\n\n```\nemployeeId,leaveType,reason\nEMP1001,sick,Medical appointment\nEMP1002,vacation,Family trip\nEMP1003,personal,Personal matter\nEMP1004,sick,Doctor visit\n```\n\nYou then add a CSV Data Set Config element (again typically at Thread Group scope) pointing to this file, and define the Variable Names field to match your columns (`employeeId,leaveType,reason`), matching order to the file's columns. Each time a thread reaches a sampler that references `${employeeId}`, `${leaveType}`, `${reason}`, JMeter substitutes whatever values that thread's current row holds.\n\n## Sharing mode and Recycle on EOF\n\nA critical setting, \"Sharing mode\", controls how rows get distributed across your virtual users: \"All threads\" (default) means every thread pulls from the same shared pointer moving through the file sequentially, so across 100 threads and a 100-row file, each thread genuinely gets a distinct row; \"Current thread group\" restricts sharing to just that group if you have multiple; and there's also a \"Recycle on EOF\" setting, which determines whether JMeter loops back to row 1 after exhausting the file (useful for long-running tests with more iterations than data rows) or stops feeding data once exhausted.\n\n```\nCSV Data Set Config:\n  Filename: employees.csv\n  Variable Names: employeeId,leaveType,reason\n  Delimiter: ,\n  Recycle on EOF: True\n  Sharing mode: All threads\n```\n\nThis is directly comparable to data-driven testing patterns you already use — think of a Playwright test looping over a fixture array of test users, or reading rows from a spreadsheet to drive parameterized `test.each()` blocks. The core idea (don't hardcode test data, externalize and iterate it) is identical; JMeter's implementation is just declarative and file-based rather than code-based, fitting its overall GUI-driven design philosophy.",
  "blocks": [
    {
      "id": "jm-3-4-md-0",
      "type": "overview",
      "heading": "Why hardcoded IDs lie",
      "content": "Up to this point in the examples, requests have used hardcoded values like `\"employeeId\": \"EMP1042\"`. If every one of your 100 simulated virtual users submits a leave request as the exact same employee ID, that's not a realistic load test — worse, it may actively distort your results, since some backend logic (duplicate-request detection, per-user rate limiting, database row-locking on that one employee record) could throw false errors or artificial bottlenecks that would never occur with genuinely distinct users. CSV Data Set Config solves this by feeding each thread a different row of data from an external CSV file for each iteration.",
      "order": 0
    },
    {
      "id": "jm-3-4-md-1",
      "type": "overview",
      "heading": "File + Variable Names",
      "content": "You prepare a CSV file (no header row needed if you configure column names in the element itself) with as many rows as you want variety — commonly one row per virtual user, or more if you want fresh data across multiple loop iterations too:\n\n```\nemployeeId,leaveType,reason\nEMP1001,sick,Medical appointment\nEMP1002,vacation,Family trip\nEMP1003,personal,Personal matter\nEMP1004,sick,Doctor visit\n```\n\nYou then add a CSV Data Set Config element (again typically at Thread Group scope) pointing to this file, and define the Variable Names field to match your columns (`employeeId,leaveType,reason`), matching order to the file's columns. Each time a thread reaches a sampler that references `${employeeId}`, `${leaveType}`, `${reason}`, JMeter substitutes whatever values that thread's current row holds.",
      "order": 1
    },
    {
      "id": "jm-3-4-md-2",
      "type": "overview",
      "heading": "Sharing mode and Recycle on EOF",
      "content": "A critical setting, \"Sharing mode\", controls how rows get distributed across your virtual users: \"All threads\" (default) means every thread pulls from the same shared pointer moving through the file sequentially, so across 100 threads and a 100-row file, each thread genuinely gets a distinct row; \"Current thread group\" restricts sharing to just that group if you have multiple; and there's also a \"Recycle on EOF\" setting, which determines whether JMeter loops back to row 1 after exhausting the file (useful for long-running tests with more iterations than data rows) or stops feeding data once exhausted.\n\n```\nCSV Data Set Config:\n  Filename: employees.csv\n  Variable Names: employeeId,leaveType,reason\n  Delimiter: ,\n  Recycle on EOF: True\n  Sharing mode: All threads\n```\n\nThis is directly comparable to data-driven testing patterns you already use — think of a Playwright test looping over a fixture array of test users, or reading rows from a spreadsheet to drive parameterized `test.each()` blocks. The core idea (don't hardcode test data, externalize and iterate it) is identical; JMeter's implementation is just declarative and file-based rather than code-based, fitting its overall GUI-driven design philosophy.",
      "order": 2
    }
  ],
  "advantages": [
    "3.4 CSV Data Set Config (Parameterization) — Identical payloads at volume distort backends and pollute data."
  ],
  "limitations": [
    "3.4 CSV Data Set Config (Parameterization) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
