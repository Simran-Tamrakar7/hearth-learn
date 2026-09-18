import type { ChapterRecord } from "../../../types";

/** 7.1 REST API Testing (JSON Body, Headers, Auth) */
export const chapter = {
  "id": "jm-7-1-rest-api-testing-json-body-headers-auth",
  "title": "7.1 REST API Testing (JSON Body, Headers, Auth)",
  "minutes": 26,
  "level": "intermediate",
  "phase": "Part 7 · API & Protocol-Specific Testing",
  "partName": "Part 7 · API & Protocol-Specific Testing",
  "overviewText": "REST testing consolidates Parts 1–6: correct method, JSON headers, schema-accurate body, assertions beyond status. Load-test realistic page sizes, not tiny functional fixtures. Non-idempotent POSTs need CSV/UUID so you don't create 1,000 duplicate leave rows.",
  "why": "Happy-path size=50 can miss the size=500 bottleneck. Replaying one POST body is data pollution and a false duplicate-detection test.",
  "when": "HRM/TADA REST endpoints you already know from Playwright — now under concurrency.",
  "practical": {
    "app": "GET /api/v1/employees?page=&size= and POST leave apply",
    "scenario": "Load-test list + create without wrecking the DB.",
    "pass": "You match GET/POST/PATCH to the contract, assert JSON, vary size under load, and unique ${__UUID()} or CSV on POST.",
    "fail": "You POST the same leave body 1,000 times and only test page size 10."
  },
  "tools": [],
  "customSummary": "- Consolidates Parts 1–6 patterns: correct HTTP method matching endpoint semantics, Content-Type/Accept headers, schema-accurate JSON body, assertions beyond status code.\n- Test realistic data volumes/pagination sizes under load, not just small \"happy path\" datasets used in functional testing.\n- Idempotency matters: non-idempotent POST/PUT endpoints need dynamic per-iteration data (CSV/UUID/timestamp) to avoid duplicate-data pollution from replaying identical payloads thousands of times.\n- Test design thinking is identical to Playwright API testing — JMeter adds the concurrent-load dimension on top.",
  "contentMarkdown": "## Same design, many threads\n\nEverything built across Parts 1–6 — HTTP Request samplers, Header Managers, JSON Extractors, assertions — comes together most naturally in REST API testing, since REST-over-JSON is by far the dominant style of API you'll encounter in modern systems, including the HRM and TADA platforms you already work with. This chapter is less about introducing new elements and more about consolidating the patterns from earlier parts into a coherent, repeatable approach specifically for REST endpoints, plus a few REST-specific nuances worth calling out explicitly.\n\nA well-built REST test for a given endpoint typically follows a consistent shape: the HTTP Request sampler with the correct method matching the endpoint's actual semantics (GET for retrieval, POST for creation, PUT for full replacement, PATCH for partial update, DELETE for removal — getting this wrong, e.g., using POST where the API expects PATCH, can produce a misleading test that either fails outright or silently exercises the wrong code path on the server), a Header Manager setting `Content-Type: application/json` and `Accept: application/json`, a JSON body matching the endpoint's expected schema exactly, and at least one assertion validating the response beyond just status code (Part 4).\n\n## Pagination and data volume\n\nFor endpoints that return paginated or list-based data, it's worth explicitly testing boundary behavior under load — an endpoint like `GET /api/v1/employees?page=1&size=50` might perform very differently at `size=500`, and load testing only the \"happy path\" default page size can miss real bottlenecks that only appear with larger result sets, which is a genuinely common gap between functional testing (where you'd test correctness with small, easy-to-verify datasets) and performance testing (where you specifically want to probe realistic-to-worst-case data volumes).\n\n## Idempotency and unique POSTs\n\nA REST-specific nuance worth flagging: idempotency matters for load test design. GET requests are safe to repeat endlessly without side effects, making them straightforward to loop at high volume. But POST requests that create resources (like `POST /api/v1/leave/apply`) are not idempotent — running the same test 1,000 times with the same hardcoded body would create 1,000 near-duplicate leave requests in your test database, potentially skewing later tests, filling up storage, or triggering business-logic duplicate-detection you didn't intend to exercise.\n\nThis is exactly why CSV Data Set Config (Part 3) and dynamic variable generation (`${__UUID()}`, `${__time()}`, etc.) matter so much for REST load testing specifically — each iteration should ideally create a genuinely distinct, realistic resource rather than replaying an identical payload thousands of times, both for data cleanliness and for accurately modeling how real, distinct users actually behave.\n\nIt's also worth explicitly naming where this connects back to your existing Playwright API testing experience: the actual test design thinking — what endpoint, what method, what body shape, what constitutes a correct response — is identical work you already do. What's different in JMeter is that the same design gets expressed as GUI tree elements instead of code, and gets executed by many concurrent threads instead of one sequential test run — meaning the \"does this endpoint work correctly\" question you already know how to answer gets extended with a second question, \"does it still work correctly (and quickly) when 200 people hit it at once,\" which JMeter is specifically built to answer and Playwright, run normally, is not.",
  "blocks": [
    {
      "id": "jm-7-1-md-0",
      "type": "overview",
      "heading": "Same design, many threads",
      "content": "Everything built across Parts 1–6 — HTTP Request samplers, Header Managers, JSON Extractors, assertions — comes together most naturally in REST API testing, since REST-over-JSON is by far the dominant style of API you'll encounter in modern systems, including the HRM and TADA platforms you already work with. This chapter is less about introducing new elements and more about consolidating the patterns from earlier parts into a coherent, repeatable approach specifically for REST endpoints, plus a few REST-specific nuances worth calling out explicitly.\n\nA well-built REST test for a given endpoint typically follows a consistent shape: the HTTP Request sampler with the correct method matching the endpoint's actual semantics (GET for retrieval, POST for creation, PUT for full replacement, PATCH for partial update, DELETE for removal — getting this wrong, e.g., using POST where the API expects PATCH, can produce a misleading test that either fails outright or silently exercises the wrong code path on the server), a Header Manager setting `Content-Type: application/json` and `Accept: application/json`, a JSON body matching the endpoint's expected schema exactly, and at least one assertion validating the response beyond just status code (Part 4).",
      "order": 0
    },
    {
      "id": "jm-7-1-md-1",
      "type": "overview",
      "heading": "Pagination and data volume",
      "content": "For endpoints that return paginated or list-based data, it's worth explicitly testing boundary behavior under load — an endpoint like `GET /api/v1/employees?page=1&size=50` might perform very differently at `size=500`, and load testing only the \"happy path\" default page size can miss real bottlenecks that only appear with larger result sets, which is a genuinely common gap between functional testing (where you'd test correctness with small, easy-to-verify datasets) and performance testing (where you specifically want to probe realistic-to-worst-case data volumes).",
      "order": 1
    },
    {
      "id": "jm-7-1-md-2",
      "type": "overview",
      "heading": "Idempotency and unique POSTs",
      "content": "A REST-specific nuance worth flagging: idempotency matters for load test design. GET requests are safe to repeat endlessly without side effects, making them straightforward to loop at high volume. But POST requests that create resources (like `POST /api/v1/leave/apply`) are not idempotent — running the same test 1,000 times with the same hardcoded body would create 1,000 near-duplicate leave requests in your test database, potentially skewing later tests, filling up storage, or triggering business-logic duplicate-detection you didn't intend to exercise.\n\nThis is exactly why CSV Data Set Config (Part 3) and dynamic variable generation (`${__UUID()}`, `${__time()}`, etc.) matter so much for REST load testing specifically — each iteration should ideally create a genuinely distinct, realistic resource rather than replaying an identical payload thousands of times, both for data cleanliness and for accurately modeling how real, distinct users actually behave.\n\nIt's also worth explicitly naming where this connects back to your existing Playwright API testing experience: the actual test design thinking — what endpoint, what method, what body shape, what constitutes a correct response — is identical work you already do. What's different in JMeter is that the same design gets expressed as GUI tree elements instead of code, and gets executed by many concurrent threads instead of one sequential test run — meaning the \"does this endpoint work correctly\" question you already know how to answer gets extended with a second question, \"does it still work correctly (and quickly) when 200 people hit it at once,\" which JMeter is specifically built to answer and Playwright, run normally, is not.",
      "order": 2
    }
  ],
  "advantages": [
    "7.1 REST API Testing (JSON Body, Headers, Auth) — Happy-path size=50 can miss the size=500 bottleneck."
  ],
  "limitations": [
    "7.1 REST API Testing (JSON Body, Headers, Auth) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
