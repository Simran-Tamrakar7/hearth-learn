import type { ChapterRecord } from "../../../types";

/** 3.5 User Defined Variables */
export const chapter = {
  "id": "jm-3-5-user-defined-variables",
  "title": "3.5 User Defined Variables",
  "minutes": 18,
  "level": "intermediate",
  "phase": "Part 3 · Configuration Elements",
  "partName": "Part 3 · Configuration Elements",
  "overviewText": "User Defined Variables hold constants for the whole run — API version, environment, company ID — identical for every thread. CSV is who this user is; UDV is what is true about this test run. Test Plan-level UDV is global across Thread Groups.",
  "why": "Putting employeeId in UDV makes every thread the same person again. Paths like /api/${apiVersion}/leave/apply belong here.",
  "when": "Centralizing environment name, API version, or a shared company ID that must not vary per user.",
  "practical": {
    "app": "Staging HRM leave paths",
    "scenario": "API version might bump from v1 to v2 across 20 samplers.",
    "pass": "You set apiVersion in UDV (or Test Plan table) and Path /api/${apiVersion}/leave/apply; employee IDs stay in CSV.",
    "fail": "You store employeeId in UDV so all 100 users POST as one employee."
  },
  "tools": [],
  "customSummary": "- Static values identical across every thread (e.g., API version, environment name, shared company ID).\n- Distinguish clearly from CSV Data Set Config: UDV = same for everyone (\"what's true about this test run\"), CSV = different per user (\"who is this specific user\").\n- Can be defined at Test Plan level (global, all Thread Groups) or within a single Thread Group (local scope).",
  "contentMarkdown": "## Constants, not per-user data\n\nWhere CSV Data Set Config handles data that should vary per thread/iteration, User Defined Variables (UDV) is the config element for values that stay constant across the whole test but that you still want centralized as a variable rather than hardcoded everywhere — for example, an API version number, a fixed test environment name, or a shared constant like a company ID that every request in this particular test run needs, but which won't change from user to user.\n\nYou add a User Defined Variables element and define simple name-value pairs directly in the GUI:\n\n```\nUser Defined Variables:\n  apiVersion: v1\n  companyId: BIZLEVATE_001\n  environment: staging\n```\n\nThese become available as `${apiVersion}`, `${companyId}`, `${environment}` throughout the scope where the element sits — commonly used to build paths dynamically, e.g., a Path field of `/api/${apiVersion}/leave/apply`, so that if the API version ever changes, you edit it in one place rather than across every sampler.\n\n## UDV vs CSV — don't conflate them\n\nIt's worth being precise about the distinction between this and CSV Data Set Config, since both produce `${variable}` references and beginners sometimes conflate them: User Defined Variables are static and identical for every thread — every single virtual user sees the same `apiVersion` value. CSV Data Set Config values are dynamic and differ per thread/iteration — that's the entire point, to introduce realistic variety.\n\nIf you accidentally used User Defined Variables to try to hold something like `employeeId`, every one of your virtual users would submit as the identical employee, defeating the purpose of parameterization from Chapter 4. A useful mental shortcut: if the value should answer \"who is this specific simulated user,\" it belongs in CSV Data Set Config; if it answers \"what constant fact is true about this entire test run,\" it belongs in User Defined Variables.\n\n## Test Plan table vs element scope\n\nAlso worth noting: variables defined at the Test Plan level (Test Plan has its own built-in User Defined Variables table, separate from adding a dedicated UDV element) are the most global option, available across every Thread Group in the whole test — useful for things like a base URL or shared credentials that genuinely apply test-plan-wide, versus a UDV element placed inside just one Thread Group, which only applies to samplers within that group.",
  "blocks": [
    {
      "id": "jm-3-5-md-0",
      "type": "overview",
      "heading": "Constants, not per-user data",
      "content": "Where CSV Data Set Config handles data that should vary per thread/iteration, User Defined Variables (UDV) is the config element for values that stay constant across the whole test but that you still want centralized as a variable rather than hardcoded everywhere — for example, an API version number, a fixed test environment name, or a shared constant like a company ID that every request in this particular test run needs, but which won't change from user to user.\n\nYou add a User Defined Variables element and define simple name-value pairs directly in the GUI:\n\n```\nUser Defined Variables:\n  apiVersion: v1\n  companyId: BIZLEVATE_001\n  environment: staging\n```\n\nThese become available as `${apiVersion}`, `${companyId}`, `${environment}` throughout the scope where the element sits — commonly used to build paths dynamically, e.g., a Path field of `/api/${apiVersion}/leave/apply`, so that if the API version ever changes, you edit it in one place rather than across every sampler.",
      "order": 0
    },
    {
      "id": "jm-3-5-md-1",
      "type": "overview",
      "heading": "UDV vs CSV — don't conflate them",
      "content": "It's worth being precise about the distinction between this and CSV Data Set Config, since both produce `${variable}` references and beginners sometimes conflate them: User Defined Variables are static and identical for every thread — every single virtual user sees the same `apiVersion` value. CSV Data Set Config values are dynamic and differ per thread/iteration — that's the entire point, to introduce realistic variety.\n\nIf you accidentally used User Defined Variables to try to hold something like `employeeId`, every one of your virtual users would submit as the identical employee, defeating the purpose of parameterization from Chapter 4. A useful mental shortcut: if the value should answer \"who is this specific simulated user,\" it belongs in CSV Data Set Config; if it answers \"what constant fact is true about this entire test run,\" it belongs in User Defined Variables.",
      "order": 1
    },
    {
      "id": "jm-3-5-md-2",
      "type": "overview",
      "heading": "Test Plan table vs element scope",
      "content": "Also worth noting: variables defined at the Test Plan level (Test Plan has its own built-in User Defined Variables table, separate from adding a dedicated UDV element) are the most global option, available across every Thread Group in the whole test — useful for things like a base URL or shared credentials that genuinely apply test-plan-wide, versus a UDV element placed inside just one Thread Group, which only applies to samplers within that group.",
      "order": 2
    }
  ],
  "advantages": [
    "3.5 User Defined Variables — Putting employeeId in UDV makes every thread the same person again."
  ],
  "limitations": [
    "3.5 User Defined Variables is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
