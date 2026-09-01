import type { ChapterRecord } from "../../../types";

/** Equivalence Partitioning */
export const chapter = {
  "id": "tt-equivalence-partitioning",
  "overlayNo": 52,
  "title": "Equivalence Partitioning",
  "minutes": 20,
  "level": "beginner",
  "phase": "Part 13 · Test Design Techniques & Partitioning",
  "partName": "Part 13 · Test Design Techniques & Partitioning",
  "overviewText": "Equivalence partitioning divides an input's full range of possible values into distinct partitions (or 'classes') that the system is expected to treat identically, and then tests just one representative value from each partition — on the reasoning that if one value in a partition works correctly, the others in that same partition almost certainly will too.",
  "why": "Testing every single possible input value is both impossible and unnecessary — most values within a given valid or invalid category will be processed identically by the underlying logic. Equivalence partitioning provides a systematic, principled way to dramatically reduce the number of test cases needed while still maintaining genuinely meaningful coverage, by testing one representative from each meaningfully distinct group rather than exhaustively testing everything.",
  "when": "Whenever an input has a large or continuous range of possible values that can be logically grouped into distinct behavior categories — a natural complement to boundary value analysis, which then specifically targets the edges between the partitions this technique identifies.",
  "practical": {
    "app": "HRMS Employee Age Field (Eligibility)",
    "scenario": "The HRMS's benefits eligibility check partitions the age field into: invalid (under 18), valid working-age (18–64), and a separate valid senior category (65+) with different benefit rules.",
    "pass": "Testing one representative from each partition — age 16 (correctly rejected), age 35 (correctly processed under standard rules), and age 70 (correctly processed under senior rules) — confirms all three distinct behavior categories work as intended, without needing to test every possible age individually.",
    "fail": "A partition assumption fails because internal logic has hidden sub-branches that treat age 60 differently without QA awareness."
  },
  "advantages": [
    "Dramatically reduces the number of test cases needed while preserving genuinely meaningful coverage",
    "Provides a systematic, repeatable, principled method for choosing test cases rather than picking values arbitrarily",
    "Naturally complements boundary value analysis — partitions identify ranges, boundaries identify the risky edges between them",
    "Makes test coverage reasoning explicit and transparent for audit and review"
  ],
  "limitations": [
    "Relies on the assumption that all values within a partition are treated identically — invalid partitioning hides bugs",
    "Requires understanding the system's actual business rules to partition correctly",
    "Less effective for inputs with complex interdependencies between multiple fields",
    "Does not test boundary edges on its own — must pair with Boundary Value Analysis (Chapter 51)"
  ],
  "tools": [
    {
      "name": "Manual Equivalence Partitioning Matrix",
      "sub": "Equivalence Class & Representative Selection",
      "url": "https://hearth-learn.vercel.app/manuals/testing-types",
      "seeChapter": 5,
      "desc": "Divides input domains into Valid (V) and Invalid (I) equivalence classes (see Chapter 5), selecting single representative test vectors for each class.",
      "adv": [
        "Reduces thousands of potential test inputs to a handful of high-confidence runs",
        "Standard test design practice required across ISTQB methodologies"
      ],
      "lim": [
        "Risk of missing sub-partition anomalies if business logic is misunderstood"
      ],
      "steps": [
        {
          "t": "Step 1 — Construct Equivalence Class Table",
          "p": "Define valid and invalid partitions for Employee Age input.",
          "c": "Class 1 (Invalid): Age < 18 -> Representative: 15\nClass 2 (Valid Standard): 18 <= Age <= 64 -> Representative: 35\nClass 3 (Valid Senior): Age >= 65 -> Representative: 72\nClass 4 (Invalid Non-Numeric): String/Special -> Representative: \"abc\""
        },
        {
          "t": "Step 2 — Execute representative tests across all 4 partitions",
          "p": "Confirm Class 1 rejects with minor notice, Class 2 assigns Standard Benefits, Class 3 assigns Senior Benefits, Class 4 rejects with type error.",
          "c": "Result: 4 targeted test cases provide 100% functional equivalence coverage for the entire age spectrum."
        }
      ]
    }
  ],
  "contentMarkdown": "## Input Domain Partitioning & Representative Extraction\n\nSegment input data ranges into discrete equivalence classes and select single representative vectors per partition.\n\n```\nnpx jest tests/unit/equivalence-classes.test.ts\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
