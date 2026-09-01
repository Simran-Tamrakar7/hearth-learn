import type { ChapterRecord } from "../../../types";

/** Comparative Testing */
export const chapter = {
  "id": "tt-comparative-testing",
  "overlayNo": 78,
  "title": "Comparative Testing",
  "minutes": 25,
  "level": "intermediate",
  "phase": "Part 20 · Baseline, Comparative, Domain & Error Guessing",
  "partName": "Part 20 · Baseline, Comparative, Domain & Error Guessing",
  "overviewText": "Comparative testing runs the same defined set of scenarios against two products side by side — most often a competitor's product, or an earlier version of your own — scoring and comparing the results consistently, to surface concrete, evidence-based gaps or advantages rather than general impressions.",
  "why": "Product and roadmap decisions are often made on the basis of \"I think our competitor's onboarding flow is smoother\" — a genuine instinct, but not something a team can act on with confidence or defend to stakeholders. Comparative testing turns that instinct into a structured, repeatable comparison with specific, documented findings, which is what actually makes the difference actionable rather than just a vague, contestable impression.",
  "when": "When evaluating a competitor ahead of a roadmap decision, or when validating that a new version of your own product genuinely matches or improves on the one it's replacing — run as a structured, scenario-based comparison, not an informal, unstructured look-around.",
  "practical": {
    "app": "HRMS Onboarding Flow vs. Competitor",
    "scenario": "Bizlevate runs the same \"hire a new employee\" scenario against its own Onboarding module and a competitor's equivalent feature.",
    "fail": "The comparison shows Bizlevate's flow requires 9 screens and re-enters the employee's name twice, while the competitor's equivalent flow completes the same task in 5 screens with no repeated fields — a specific, reproducible, and actionable gap rather than a vague sense that \"theirs feels smoother.\"",
    "failLabel": "Finding",
    "pass": "The findings are used to justify a scoped redesign of the Onboarding flow, with the same 9-vs-5-screen scenario re-run after the redesign to confirm the gap has actually closed.",
    "passLabel": "Follow-up"
  },
  "advantages": [
    "Converts a vague competitive impression into specific, evidence-based, defensible findings",
    "A consistent scenario list and scoring makes the comparison fair and reproducible, not dependent on who happened to look at it",
    "Directly informs prioritization and roadmap decisions with concrete gaps, not just gut feeling",
    "Reusable framework — the same scenario list can be re-run against a later version of either product to track whether a gap has closed"
  ],
  "limitations": [
    "Only as fair as how carefully the comparison conditions (data, account state, environment) are matched between the two products",
    "A competitor's product can change at any time, so findings can go stale and need periodic re-verification",
    "Doesn't explain why a competitor made a particular design choice, only that a measurable difference exists",
    "Scoring inherently involves some subjectivity even with defined criteria, especially for qualitative aspects like \"clarity\""
  ],
  "tools": [
    {
      "name": "Spreadsheet + LambdaTest",
      "sub": "Scored scenarios, matched captures",
      "url": "https://lambdatest.com",
      "seeChapter": 37,
      "desc": "A shared spreadsheet keeps the scenario list, scoring, and findings structured and consistent across both products being compared, while LambdaTest's free tier lets both products be captured side by side under equivalent conditions (same browser/device) so screenshots are genuinely comparable rather than confounded by different testing setups.",
      "adv": [
        "Evidence-based findings instead of a contestable impression",
        "Same scenario list and scoring for a fair comparison",
        "Concrete gaps feed roadmap decisions",
        "The same list can be re-run later to see if a gap closed"
      ],
      "lim": [
        "Unfair if data, account state, or environment differ",
        "Competitor products change — findings go stale",
        "Shows that a difference exists, not why they chose it",
        "Qualitative scores still have some subjectivity"
      ],
      "steps": [
        {
          "t": "Step 1 — Fix the scenario list",
          "p": "Same tasks, same order, same input data where possible."
        },
        {
          "t": "Step 2 — Capture both under matched conditions",
          "p": "LambdaTest: same browser/device so screenshots are comparable."
        },
        {
          "t": "Step 3 — Score in the shared sheet",
          "p": "Predefined criteria, not ad-hoc impressions."
        },
        {
          "t": "Step 4 — Write specific differences",
          "p": "\"4 steps vs our 7\" — not \"theirs feels easier.\""
        },
        {
          "t": "Step 5 — Flag unfair conditions",
          "p": "Different data volumes or account states so findings are not misread."
        },
        {
          "t": "Step 6 — Summarize to reproducible scenarios",
          "p": "Each gap or advantage ties back to a specific run."
        }
      ]
    }
  ],
  "contentMarkdown": "## Same scenarios, matched captures\n\nSpreadsheet scores; LambdaTest for equivalent screenshots.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
