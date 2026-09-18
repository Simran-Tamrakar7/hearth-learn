import type { ChapterRecord } from "../../../types";

/** 4.3 Assertions (Response, Duration, Size, JSON) */
export const chapter = {
  "id": "jm-4-3-assertions-response-duration-size-json",
  "title": "4.3 Assertions (Response, Duration, Size, JSON)",
  "minutes": 26,
  "level": "intermediate",
  "phase": "Part 4 · Controllers & Logic",
  "partName": "Part 4 · Controllers & Logic",
  "overviewText": "Assertions define what 'correct' means beyond 2xx. Response Assertion for patterns, Duration for slow-but-200, Size for silent pagination shrinks, JSON Assertion for JSONPath field checks. Pair business-logic plus Duration on every meaningful sampler.",
  "why": "A load generator without body assertions reports 0% errors while leave apply silently fails. Duration failures belong in the result, not only later percentile reading.",
  "when": "The moment a sampler is 'done' — before you scale threads.",
  "practical": {
    "app": "POST /api/v1/leave/apply JSON response",
    "scenario": "API returns 200 with status success or a business error string.",
    "pass": "You add JSON/Response Assertion on $.status or \"status\":\"success\", plus Duration e.g. 2000ms; optional Size if page size should stay 50 records.",
    "fail": "You rely on default green 200 while the body says employeeId not found."
  },
  "tools": [],
  "customSummary": "- Response Assertion: pattern-match (Contains/Matches/Equals/Substring) against response code, message, headers, or body — general-purpose correctness check.\n- Duration Assertion: fails a sample if response time exceeds a threshold, regardless of correctness — performance-specific, no real functional-testing equivalent.\n- Size Assertion: fails if response body byte size falls outside a defined range — catches silent data-shape regressions (e.g., wrong pagination count).\n- JSON Assertion: precise JSONPath-based field/value validation — more reliable than fragile text \"Contains\" matching against raw JSON.\n- Best practice: pair every meaningful sampler with at least one business-logic assertion (Response/JSON) plus a Duration Assertion, rather than relying on default status-code-only pass/fail.",
  "contentMarkdown": "## Beyond status-code green\n\nAs flagged back in Part 2 Chapter 3, JMeter's default pass/fail is status-code-only, which is frequently insufficient — Assertions are the elements that let you explicitly define what \"correct\" actually means for a given sampler's response, attached as a child element beneath it (or higher in scope, to apply to multiple samplers at once).\n\n## Response Assertion\n\nResponse Assertion is the general-purpose workhorse: you configure it to check a specific part of the response (response code, response message, response headers, or the full response body/text) against a pattern — options include \"Contains,\" \"Matches\" (regex), \"Equals,\" or \"Substring.\" A typical use: check that the response body contains the string `\"status\":\"success\"`, or that it does not contain `\"error\"`. This directly parallels a Playwright assertion like `expect(responseBody).toContain('\"status\":\"success\"')`, just expressed via a GUI pattern-matcher rather than inline code.\n\n```\nResponse Assertion example:\n  Test Field: Text Response\n  Pattern Matching Rule: Contains\n  Pattern to Test: \"status\":\"success\"\n```\n\n## Duration Assertion\n\nDuration Assertion fails the sample if its response time exceeds a threshold you set (in milliseconds) — regardless of whether the status code and body were otherwise perfectly correct. This is a performance-specific assertion type that has no direct equivalent in typical functional testing (you wouldn't usually fail a Playwright test purely because a request took 3 seconds instead of 1, unless you'd specifically built that check) — but in load testing, it's extremely useful for flagging individual slow outliers directly in your pass/fail results rather than only discovering them later by manually inspecting percentile numbers in the Aggregate Report.\n\n## Size Assertion\n\nSize Assertion fails the sample if the response body size (in bytes) falls outside a range you define. This is less commonly used than the other two, but it's valuable for catching specific failure modes that a status-code or text-pattern check might miss — for example, a paginated API endpoint that's supposed to return 50 records per page but silently starts returning only 10 due to a backend regression; the status code would still be 200 and the body would still technically \"contain\" valid JSON, but the response size would be a meaningfully useful additional data point.\n\n## JSON Assertion\n\nJSON Assertion (and the related JSON Path-based checks) let you validate structured JSON responses more precisely than a raw text \"Contains\" check — using JSONPath expressions to assert that a specific field exists and/or holds an expected value, e.g., asserting `$.employee.leaveBalance` equals 12, rather than just checking that the string `\"12\"` appears somewhere in the response body (which a plain Response Assertion's Contains rule might falsely match against an unrelated field). This is directly comparable to how you'd use a JSON parsing library in Playwright/API testing to pull a specific field via dot notation and assert its value precisely, rather than doing a fragile substring match against the raw response text.\n\n## Habit: logic + duration\n\nA practical pattern worth establishing as a habit going forward: every meaningful sampler in your test plan should have at minimum one assertion beyond the default status code check — typically a Response or JSON Assertion confirming the business-logic correctness of the response (not just \"the server responded\"), and often a Duration Assertion setting a maximum acceptable response time so that slow responses show up as clear failures in your results rather than requiring separate manual percentile analysis to notice. This assertion discipline is what turns a JMeter test plan from \"a load generator that produces numbers\" into \"a load test that tells you both how fast and how correctly your system behaves under load\" — the second half of that sentence being easy to accidentally skip if you only rely on default status-code pass/fail.",
  "blocks": [
    {
      "id": "jm-4-3-md-0",
      "type": "overview",
      "heading": "Beyond status-code green",
      "content": "As flagged back in Part 2 Chapter 3, JMeter's default pass/fail is status-code-only, which is frequently insufficient — Assertions are the elements that let you explicitly define what \"correct\" actually means for a given sampler's response, attached as a child element beneath it (or higher in scope, to apply to multiple samplers at once).",
      "order": 0
    },
    {
      "id": "jm-4-3-md-1",
      "type": "overview",
      "heading": "Response Assertion",
      "content": "Response Assertion is the general-purpose workhorse: you configure it to check a specific part of the response (response code, response message, response headers, or the full response body/text) against a pattern — options include \"Contains,\" \"Matches\" (regex), \"Equals,\" or \"Substring.\" A typical use: check that the response body contains the string `\"status\":\"success\"`, or that it does not contain `\"error\"`. This directly parallels a Playwright assertion like `expect(responseBody).toContain('\"status\":\"success\"')`, just expressed via a GUI pattern-matcher rather than inline code.\n\n```\nResponse Assertion example:\n  Test Field: Text Response\n  Pattern Matching Rule: Contains\n  Pattern to Test: \"status\":\"success\"\n```",
      "order": 1
    },
    {
      "id": "jm-4-3-md-2",
      "type": "overview",
      "heading": "Duration Assertion",
      "content": "Duration Assertion fails the sample if its response time exceeds a threshold you set (in milliseconds) — regardless of whether the status code and body were otherwise perfectly correct. This is a performance-specific assertion type that has no direct equivalent in typical functional testing (you wouldn't usually fail a Playwright test purely because a request took 3 seconds instead of 1, unless you'd specifically built that check) — but in load testing, it's extremely useful for flagging individual slow outliers directly in your pass/fail results rather than only discovering them later by manually inspecting percentile numbers in the Aggregate Report.",
      "order": 2
    },
    {
      "id": "jm-4-3-md-3",
      "type": "overview",
      "heading": "Size Assertion",
      "content": "Size Assertion fails the sample if the response body size (in bytes) falls outside a range you define. This is less commonly used than the other two, but it's valuable for catching specific failure modes that a status-code or text-pattern check might miss — for example, a paginated API endpoint that's supposed to return 50 records per page but silently starts returning only 10 due to a backend regression; the status code would still be 200 and the body would still technically \"contain\" valid JSON, but the response size would be a meaningfully useful additional data point.",
      "order": 3
    },
    {
      "id": "jm-4-3-md-4",
      "type": "overview",
      "heading": "JSON Assertion",
      "content": "JSON Assertion (and the related JSON Path-based checks) let you validate structured JSON responses more precisely than a raw text \"Contains\" check — using JSONPath expressions to assert that a specific field exists and/or holds an expected value, e.g., asserting `$.employee.leaveBalance` equals 12, rather than just checking that the string `\"12\"` appears somewhere in the response body (which a plain Response Assertion's Contains rule might falsely match against an unrelated field). This is directly comparable to how you'd use a JSON parsing library in Playwright/API testing to pull a specific field via dot notation and assert its value precisely, rather than doing a fragile substring match against the raw response text.",
      "order": 4
    },
    {
      "id": "jm-4-3-md-5",
      "type": "overview",
      "heading": "Habit: logic + duration",
      "content": "A practical pattern worth establishing as a habit going forward: every meaningful sampler in your test plan should have at minimum one assertion beyond the default status code check — typically a Response or JSON Assertion confirming the business-logic correctness of the response (not just \"the server responded\"), and often a Duration Assertion setting a maximum acceptable response time so that slow responses show up as clear failures in your results rather than requiring separate manual percentile analysis to notice. This assertion discipline is what turns a JMeter test plan from \"a load generator that produces numbers\" into \"a load test that tells you both how fast and how correctly your system behaves under load\" — the second half of that sentence being easy to accidentally skip if you only rely on default status-code pass/fail.",
      "order": 5
    }
  ],
  "advantages": [
    "4.3 Assertions (Response, Duration, Size, JSON) — A load generator without body assertions reports 0% errors while leave apply silently fails."
  ],
  "limitations": [
    "4.3 Assertions (Response, Duration, Size, JSON) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
