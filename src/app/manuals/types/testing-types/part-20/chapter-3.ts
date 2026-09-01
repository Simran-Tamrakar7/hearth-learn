import type { ChapterRecord } from "../../types";

/** Domain Testing */
export const chapter = {
  "id": "tt-domain-testing",
  "overlayNo": 79,
  "title": "Domain Testing",
  "minutes": 25,
  "level": "intermediate",
  "phase": "Part 20 · Baseline, Comparative, Domain & Error Guessing",
  "partName": "Part 20 · Baseline, Comparative, Domain & Error Guessing",
  "overviewText": "Domain testing is a systematic test-design technique that defines the full valid \"domain\" — the complete valid range, type, or set of allowed values — for a given input, and then deliberately tests values from inside, at the edge of, and outside that domain, combining the core ideas behind boundary value analysis (Chapter 51) and equivalence partitioning (Chapter 52) into a single, consistent approach applied field by field.",
  "why": "Testing input fields without a systematic technique tends to produce test cases clustered around whatever values happen to come to mind first, leaving real gaps in coverage that only surface later, in production, when a real user enters something nobody thought to try. Domain testing forces that thinking to be explicit and complete for every field — what's the actual valid domain, and have I genuinely tested inside it, at its edges, and outside it — rather than relying on whatever test cases feel intuitive in the moment.",
  "when": "During test-case design for any form or input field with a clearly definable valid range or set — applied consistently across every field on a screen, not just the ones that seem obviously risky, since gaps often hide in the fields nobody thought to scrutinize.",
  "practical": {
    "app": "HRMS Salary Input Field",
    "scenario": "Bizlevate defines the salary input field's domain as any positive number up to a configured organizational maximum, and documents domain test cases in TestLink accordingly.",
    "fail": "Testing only \"inside\" values (e.g. a typical mid-range salary) never exercises the field's actual maximum; a real client later enters a salary exactly at their organization's configured cap and the system silently truncates it without any error, a bug the narrower ad-hoc test cases never had a chance to catch.",
    "pass": "With domain testing applied — a value inside the range, one exactly at the maximum, and one above it — the truncation bug is caught immediately at the boundary case, fixed to show a clear validation message instead, and re-verified using the same documented TestLink case set.",
    "passLabel": "Pass (after fix)"
  },
  "advantages": [
    "Produces systematic, complete input coverage rather than test cases clustered around intuitive guesses",
    "Combines the strengths of boundary value analysis and equivalence partitioning into one consistent, repeatable technique",
    "Documenting test cases in TestLink makes the domain coverage reusable and auditable across releases, not redesigned from scratch each time",
    "Easy to explain and apply consistently across an entire form, even by testers less familiar with the specific feature"
  ],
  "limitations": [
    "Defining the \"true\" valid domain correctly requires accurate, up-to-date knowledge of the actual business rule — an incorrect domain assumption produces confidently wrong test cases",
    "Can still miss defects arising from combinations of fields, since domain testing is typically applied one field at a time",
    "Maintaining documented test cases in a separate tool (TestLink) adds process overhead compared to purely ad-hoc testing",
    "Doesn't cover non-input-related defects (UI rendering, workflow logic) — it's specifically a technique for input validation coverage"
  ],
  "tools": [
    {
      "name": "TestLink",
      "sub": "Documented inside / edge / outside cases",
      "url": "https://testlink.org",
      "seeChapter": 51,
      "desc": "A free, open-source test-case management tool that lets a domain-testing test-case set (inside/edge/outside values, per field) be documented once and reused consistently across every field and every future release, rather than redesigned from memory each time.",
      "adv": [
        "Systematic coverage instead of intuitive clusters",
        "BVA and equivalence partitioning in one field-by-field pass",
        "Cases are reusable and auditable across releases",
        "Easy to apply consistently across a whole form"
      ],
      "lim": [
        "A wrong domain assumption produces confidently wrong cases",
        "Field-by-field misses combination defects",
        "A separate TMS adds process overhead",
        "Does not cover UI or workflow defects"
      ],
      "steps": [
        {
          "t": "Step 1 — Name the valid domain",
          "p": "Exact range, type, or set of values considered valid for the field."
        },
        {
          "t": "Step 2 — Document inside, edge, and outside",
          "p": "One TestLink case for each, per field."
        },
        {
          "t": "Step 3 — Execute and record actual vs expected",
          "p": "Every documented case."
        },
        {
          "t": "Step 4 — Every field on the form",
          "p": "Not only the ones that intuitively seem risky."
        },
        {
          "t": "Step 5 — Reuse on later releases",
          "p": "Confirm domain handling has not regressed."
        },
        {
          "t": "Step 6 — Update when the rule changes",
          "p": "The documented domain and its cases must match the business rule."
        }
      ]
    }
  ],
  "contentMarkdown": "## Inside, edge, outside per field\n\nDocument in TestLink; reuse across releases.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
