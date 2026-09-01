import type { ChapterRecord } from "../../../types";

/** Risk-Based Testing */
export const chapter = {
  "id": "tt-risk-based-testing",
  "overlayNo": 68,
  "title": "Risk-Based Testing",
  "minutes": 20,
  "level": "intermediate",
  "phase": "Part 17 · Data-Driven, Keyword, Model & Risk",
  "partName": "Part 17 · Data-Driven, Keyword, Model & Risk",
  "overviewText": "Risk-based testing prioritizes what gets tested, and how much testing effort each area receives, based on a deliberate assessment of risk — the combination of how likely a given area is to fail, and how severe the impact would be if it did — rather than treating every feature or module as equally deserving of the same testing depth.",
  "why": "Testing time and resources are never truly unlimited, and treating every feature as equally important to test thoroughly means genuinely critical, high-risk areas (payroll calculations, authentication, data deletion) can end up receiving the same shallow coverage as low-stakes, rarely-used features — a real misallocation of effort relative to actual business risk. Risk-based testing makes prioritization explicit and deliberate, rather than an accidental byproduct of whichever features happened to get built (and tested) first, or whichever areas are simply easiest to test.",
  "when": "At the start of test planning for any project or release, especially under real time or resource constraints — used to explicitly decide where deeper testing (more test types, more edge cases, more automation investment) is actually justified, versus where lighter, more basic coverage is a reasonable, deliberate trade-off.",
  "practical": {
    "app": "HRMS Release Prioritization",
    "scenario": "Ahead of a release, the team rates payroll calculation as High risk (complex logic, financial/legal impact, recent changes) and the internal company-news announcement feature as Low risk (simple, cosmetic, no financial impact).",
    "pass": "Payroll calculation receives the full range of testing — functional, boundary value analysis, negative testing, security review, and parallel testing (Chapter 63) against the legacy system — while the news announcement feature receives a single basic functional smoke test, a deliberate and explicit trade-off rather than an accidental oversight.",
    "passLabel": "Result",
    "fail": "Equal-depth testing on payroll and the news banner burns the release window — payroll gets the same shallow smoke pass as cosmetic UI, and a slab-tax boundary bug ships because nobody prioritized financial logic.",
  },
  "advantages": [
    "Directs limited testing time and resources toward the areas where a defect would actually matter most, rather than spreading effort evenly and inefficiently",
    "Makes testing scope decisions explicit and defensible, especially valuable under real schedule or resource pressure",
    "Naturally integrates with and prioritizes among every other testing type in this manual, rather than being a separate, competing technique",
    "Encourages ongoing reassessment, keeping testing focus aligned with the system's actual, current risk profile rather than a stale, one-time judgment"
  ],
  "limitations": [
    "The risk assessment itself is inherently somewhat subjective — different stakeholders can reasonably disagree on likelihood or impact ratings",
    "A genuinely under-assessed \"low risk\" area can still fail and cause real harm if the initial risk judgment turns out to be wrong",
    "Requires real discipline to revisit and update as the project evolves, or the risk assessment itself becomes stale and misleading",
    "Doesn't eliminate the need for baseline coverage everywhere — even low-risk areas need some minimum testing, not zero"
  ],
  "tools": [
    {
      "name": "Manual risk assessment",
      "sub": "Planning technique — no dedicated tool",
      "url": null,
      "seeChapter": 5,
      "desc": "Risk-based testing is fundamentally a planning and prioritization technique, not a specific execution tool — the structured risk assessment then informs which of every other technique and tool in this manual gets applied where, and how deeply.",
      "adv": [
        "Directs limited time toward areas where a defect would matter most",
        "Makes scope decisions explicit and defensible under schedule pressure",
        "Prioritizes among every other testing type rather than competing with them",
        "Stays current if the assessment is revisited as the system changes"
      ],
      "lim": [
        "Likelihood and impact ratings are somewhat subjective",
        "A mis-rated low-risk area can still fail and cause real harm",
        "A stale assessment becomes misleading",
        "Low-risk still needs a minimum of coverage, not zero"
      ],
      "steps": [
        {
          "t": "Step 1 — List features in scope",
          "p": "Every major feature or module for the release or project."
        },
        {
          "t": "Step 2 — Score likelihood of failure",
          "p": "Complexity, recency of change, prior defect history."
        },
        {
          "t": "Step 3 — Score impact if it fails",
          "p": "Users affected, financial/legal/safety, visibility of a failure."
        },
        {
          "t": "Step 4 — Combine into High / Medium / Low",
          "p": "One overall risk rating per area."
        },
        {
          "t": "Step 5 — Allocate depth proportionally",
          "p": "High-risk gets the widest range of types; low-risk gets lighter, basic coverage."
        },
        {
          "t": "Step 6 — Revisit as the system changes",
          "p": "A low-risk area can become high-risk after a significant change, a new integration, or new defect history."
        },
        {
          "t": "Step 7 — Use it to defend trade-offs",
          "p": "Cut under time pressure by risk, not by whatever is easiest to skip."
        }
      ]
    }
  ],
  "contentMarkdown": "## Score then allocate\n\nLikelihood × impact → High/Medium/Low → testing depth.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
