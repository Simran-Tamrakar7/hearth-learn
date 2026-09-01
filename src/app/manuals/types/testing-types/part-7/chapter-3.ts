import type { ChapterRecord } from "../../../types";

/** Gray Box Testing */
export const chapter = {
  "id": "tt-gray-box-testing",
  "overlayNo": 27,
  "title": "Gray Box Testing",
  "minutes": 20,
  "level": "intermediate",
  "phase": "Part 7 · By Knowledge",
  "partName": "Part 7 · By Knowledge",
  "overviewText": "Gray box testing sits between black box and white box — the tester has partial knowledge of the internal structure (perhaps database schema, API design, or high-level architecture) without full access to or deep understanding of the complete source code, and uses that partial insight to design smarter, more targeted external tests.",
  "why": "Pure black box testing can waste time on inputs unlikely to reveal anything, while pure white box testing requires full code access that testers (especially independent QA) often don't have or need. Gray box testing gets much of white box testing's precision — targeting known trouble spots like specific database constraints or API integration points — while still testing from the outside, the way a real user or consuming system actually would.",
  "when": "Especially valuable for integration and API testing, where a tester knows the API contract or database schema without needing to read every line of backend implementation. Common when QA has access to design docs, database diagrams, or API specifications but not the full codebase.",
  "practical": {
    "app": "HRMS Employee ID Uniqueness",
    "scenario": "A tester who knows (from the database schema, not the code) that employee_id is a unique constraint deliberately tests submitting two leave requests with a manually crafted duplicate employee_id via the API.",
    "pass": "The second request is correctly rejected with a 409 Conflict, matching the schema-level guarantee the tester knew to check for.",
    "fail": "The API accepts both requests and returns 200 for each — the uniqueness constraint exists in the schema but isn't actually being enforced at the application layer before the write, only relied upon (incorrectly) as documentation."
  },
  "advantages": [
    "More efficient than pure black box testing — partial internal knowledge focuses effort on higher-value, more likely-to-fail scenarios",
    "Doesn't require full codebase access or deep programming expertise, unlike white box testing",
    "Particularly effective for integration and API testing, where contracts and schemas are naturally partial knowledge",
    "Bridges the gap between developers and independent QA, letting each contribute what they know best"
  ],
  "limitations": [
    "Requires access to at least some internal documentation (schema, architecture, API spec) — not purely external like black box testing",
    "Partial knowledge can be outdated or wrong if internal documentation isn't kept in sync with the actual implementation",
    "Not as targeted as full white box testing, since deep code paths are still invisible",
    "Effectiveness depends on how good and current the available partial knowledge actually is"
  ],
  "tools": [
    {
      "name": "Manual (Architecture-Guided)",
      "sub": "Schema & Contract-Driven Gray Box Testing",
      "url": "https://en.wikipedia.org/wiki/Gray_box_testing",
      "seeChapter": 5,
      "desc": "A tester with partial system knowledge (e.g. 'this field maps to a database column with a unique constraint') designs test cases (see Chapter 5) that specifically target known internal constraints from the outside, without needing to read backend code.",
      "adv": [
        "Focuses test effort on known architectural weak points and data boundaries",
        "Targets foreign key relationships and schema constraints directly"
      ],
      "lim": [
        "Requires reliable, up-to-date architectural diagrams or OpenAPI specs"
      ],
      "steps": [
        {
          "t": "Step 1 — Review database ERD and OpenAPI schemas",
          "p": "Identify constraints: unique indexes, enum values, nullable columns, foreign keys.",
          "c": "Schema Insight: table 'leave_applications' has UNIQUE(employee_id, start_date)"
        },
        {
          "t": "Step 2 — Design targeted boundary injection requests",
          "p": "Craft requests specifically designed to challenge the schema constraints from the client UI.",
          "c": "Test Scenario: Submit two overlapping leave requests for Employee #104 on 2026-09-01"
        },
        {
          "t": "Step 3 — Evaluate app layer validation vs DB crashes",
          "p": "Confirm app returns HTTP 409 Conflict rather than an unhandled 500 Postgres error.",
          "c": "Response: HTTP 409 Conflict: {\"error\": \"Leave request already exists for specified date range\"} -> PASS"
        }
      ]
    },
    {
      "name": "Postman",
      "sub": "Schema-Informed API Boundary Testing",
      "url": "https://www.postman.com",
      "seeChapter": 2,
      "desc": "Used with knowledge of the underlying API contract or database schema (see Chapter 2) to construct requests specifically designed to probe known internal boundaries from outside the system.",
      "adv": [
        "Allows crafting precise HTTP headers, payloads, and parameter types",
        "Validates responses against OpenAPI schema definitions automatically"
      ],
      "lim": [
        "Requires API collection maintenance when schemas change"
      ],
      "steps": [
        {
          "t": "Step 1 — Import OpenAPI 3.0 specification into Postman",
          "p": "Load API contract to automatically generate schema validation tests.",
          "c": "Postman: Imported hrms-api-v1.yaml -> 42 endpoints with schema contracts"
        },
        {
          "t": "Step 2 — Send edge-case payloads informed by DB column types",
          "p": "Test varchar(50) limits with 51-character string to ensure proper 422 Unprocessable Entity.",
          "c": "POST /api/v1/employees (Payload: { \"name\": \"A\".repeat(51) }) -> Expected: 422 Unprocessable Entity"
        },
        {
          "t": "Step 3 — Assert schema integrity and status codes",
          "p": "Verify backend gracefully validates before reaching database engine.",
          "c": "pm.test(\"Status code is 422\", () => pm.response.to.have.status(422));"
        }
      ]
    }
  ],
  "contentMarkdown": "## Database Schema & API Contract Injections\n\nDesign tests probing known schema constraints, foreign key cascades, and OpenAPI payload boundaries.\n\n```\nnewman run postman_graybox_collection.json -e staging_env.json\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
