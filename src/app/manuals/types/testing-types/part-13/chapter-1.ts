import type { ChapterRecord } from "../../../types";

/** Negative Testing */
export const chapter = {
  "id": "tt-negative-testing",
  "overlayNo": 49,
  "title": "Negative Testing",
  "minutes": 20,
  "level": "beginner",
  "phase": "Part 13 · Test Design Techniques & Partitioning",
  "partName": "Part 13 · Test Design Techniques & Partitioning",
  "overviewText": "Negative testing deliberately feeds an application invalid, unexpected, or malformed input — the opposite of what the system is designed to correctly handle — to verify it fails gracefully with a clear, correct error, rather than crashing, behaving unpredictably, or silently accepting something it shouldn't.",
  "why": "Most requirements describe what the system should do with valid input, but real users (and real attackers) inevitably provide invalid input too — an empty required field, a negative number where only positive makes sense, a wildly out-of-range date. Without deliberate negative testing, these paths often go completely unverified, since they're the paths nobody thinks to check when the focus is naturally on 'does the feature work.'",
  "when": "Alongside every positive test case, as a matching pair — any input field, form, or endpoint tested for correct valid behavior should also be tested for correct handling of invalid input, ideally designed together at the same time rather than as an afterthought.",
  "practical": {
    "app": "HRMS Leave Request Date Field",
    "scenario": "The leave request form's start-date field is negative-tested with a range of invalid inputs.",
    "pass": "The same input is now rejected with a clear 'Please enter a valid date within the next 2 years' error, and no record is created.",
    "fail": "Submitting a start date in the year 1900 is silently accepted and saved without any validation error — the form only checks that a date is present, not that it's realistic."
  },
  "advantages": [
    "Catches an entire class of real-world input that valid-only testing structurally never exercises",
    "Directly improves error handling quality and user-facing error messages, not just crash prevention",
    "Surfaces security-relevant gaps since many vulnerabilities begin with unexpected/malformed input",
    "Cheap to design alongside positive test cases during initial feature analysis"
  ],
  "limitations": [
    "The space of possible invalid inputs is technically infinite — prioritization toward realistic and high-risk invalid inputs is necessary",
    "Easy to under-invest in relative to positive testing when delivery deadlines press",
    "Does not guarantee complete coverage against inputs nobody thought to try",
    "Requires clear expected-error-behavior specifications to test against"
  ],
  "tools": [
    {
      "name": "Manual Negative Testing Mindset",
      "sub": "Heuristic Error & Boundary Injection",
      "url": "https://hearth-learn.vercel.app/manuals/testing-types",
      "seeChapter": 5,
      "desc": "Negative testing isn't a separate tool, but a deliberate mindset (see Chapter 5) applied within existing testing workflows — asking 'what's the wrong input, and does the system handle it gracefully?'",
      "adv": [
        "Zero software setup required — focuses on creative edge-case injection",
        "Audits user-facing error message clarity, grammar, and field highlighting"
      ],
      "lim": [
        "Manual execution of large negative permutations is labor intensive"
      ],
      "steps": [
        {
          "t": "Step 1 — Identify invalid input permutations",
          "p": "List negative scenarios: past dates, empty mandatory strings, special character strings, and type mismatches.",
          "c": "Test Vectors:\n1. Start Date: 01/01/1900\n2. Leave Days: -5\n3. Employee ID: ' OR '1'='1"
        },
        {
          "t": "Step 2 — Submit negative payloads and assert error responses",
          "p": "Confirm form highlights invalid fields with red borders and clear guidance.",
          "c": "Expected Response: HTTP 422 Unprocessable Entity\nUI Banner: \"Start date must be between today and +2 years\""
        }
      ]
    },
    {
      "name": "Postman Negative API Suite",
      "sub": "Schema Validation & Status Code Verification",
      "url": "https://www.postman.com",
      "seeChapter": 2,
      "desc": "Automates negative API assertions (see Chapter 2 and Chapter 34) ensuring endpoints reject malformed JSON, missing fields, and bad data types with appropriate 4xx status codes.",
      "adv": [
        "Asserts HTTP 400, 401, 403, and 422 response status codes automatically",
        "Validates error response schemas with Chai assertions"
      ],
      "lim": [
        "Requires maintaining negative test collection JSONs"
      ],
      "steps": [
        {
          "t": "Step 1 — Send invalid payload to leave request API",
          "p": "Transmit POST request missing mandatory 'reason' property.",
          "c": "pm.test(\"Status code is 400 Bad Request\", function () {\n    pm.response.to.have.status(400);\n});\npm.test(\"Error message is descriptive\", function () {\n    var json = pm.response.json();\n    pm.expect(json.error).to.eql(\"Field 'reason' is required\");\n});"
        }
      ]
    }
  ],
  "contentMarkdown": "## Deliberate Invalid Payload & Type Assertion\n\nSubmit out-of-range, null, negative, and malformed inputs to form fields and API parameters verifying graceful error handling.\n\n```\ncurl -X POST https://staging.hrms.internal/api/leave -d '{\"days\": -5}' -H \"Content-Type: application/json\"\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
