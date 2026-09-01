import type { ChapterRecord } from "../../../types";

/** Alpha Testing */
export const chapter = {
  "id": "tt-alpha-testing",
  "overlayNo": 29,
  "title": "Alpha Testing",
  "minutes": 20,
  "level": "intermediate",
  "phase": "Part 8 · Release & Quality",
  "partName": "Part 8 · Release & Quality",
  "overviewText": "Alpha testing is testing performed by internal staff — typically a QA team or select employees, not real external customers — on a version of the application that's feature-complete or near-complete, conducted in an environment that closely resembles production, before anyone outside the organization sees it.",
  "why": "By the time a build is ready for alpha testing, it's meant to behave like the real, finished product — this is the last major internal checkpoint before real customers get involved. Alpha testing catches the kind of issues that only show up when the whole application is used end-to-end, holistically, rather than one feature or one test type at a time — precisely because it's the first point where everything comes together in something resembling its final form.",
  "when": "After individual features have passed their own functional, integration, and system testing — as the structured internal bridge between 'development is finished' and 'let real users touch it' (beta testing, Chapter 30).",
  "practical": {
    "app": "HRMS Full Onboarding Flow",
    "scenario": "Before the HRMS is offered to any pilot customer, three internal employees from outside the dev team are asked to fully onboard a fictional new hire end-to-end — from account creation through first payslip.",
    "pass": "The bug is fixed before any real customer or employee ever encounters it, and the workflow order issue is documented for future UX review.",
    "fail": "Two of three testers get stuck at the same step — the 'assign manager' field silently fails to save if left until last, with no error shown, only discovered because a full realistic workflow was followed rather than testing that field in isolation."
  },
  "advantages": [
    "Catches holistic, end-to-end issues that isolated feature-level testing structurally can't see",
    "Uses people already inside the organization, so it's fast to organize and doesn't require external recruitment",
    "Happens in a controlled environment, so problems are found and fixed before any real customer is affected",
    "Serves as a genuine go/no-go checkpoint before committing to a real beta program"
  ],
  "limitations": [
    "Internal staff are not truly representative of real customers — they know too much about the product and its intended use",
    "Limited diversity of real-world hardware, network conditions, and usage patterns compared to actual external users",
    "Can create a false sense of confidence if internal testers unconsciously avoid the 'wrong' way of using the app",
    "Doesn't replace beta testing's exposure to genuinely unpredictable real-world usage"
  ],
  "tools": [
    {
      "name": "Manual (Holistic Internal Verification)",
      "sub": "End-to-End Persona-Driven Alpha Validation",
      "url": "https://en.wikipedia.org/wiki/Software_testing#Alpha_testing",
      "seeChapter": 5,
      "desc": "Alpha testing is inherently manual and holistic (see Chapter 5) — internal staff use the near-final application the way a real customer eventually would, across full end-to-end workflows rather than isolated test cases.",
      "adv": [
        "Discovers cross-module workflow friction and missing user transitions",
        "Fast internal coordination without non-disclosure agreement overhead"
      ],
      "lim": [
        "Testers naturally suffer from confirmation bias toward known happy paths"
      ],
      "steps": [
        {
          "t": "Step 1 — Deploy feature-complete release candidate build",
          "p": "Stage RC1 build in dedicated staging environment mirroring production hardware and configs.",
          "c": "Deployment Target: https://staging-rc1.hrms-company.internal\nBuild Hash: rc-1.4.0-rev8912 (Feature Freeze Applied)"
        },
        {
          "t": "Step 2 — Distribute end-to-end scenario briefs to internal staff",
          "p": "Assign realistic persona briefs (e.g. 'Onboard 5 contractors across 2 departments').",
          "c": "Scenario Sheet: 'You are an HR manager setting up payroll for new engineering hires.'"
        },
        {
          "t": "Step 3 — Log blocker and friction defects into triage board",
          "p": "Record blocker issues that prevent workflow progression.",
          "c": "Issue ALPHA-102: Saving onboarding form with empty manager dropdown silently fails."
        },
        {
          "t": "Step 4 — Execute Go / No-Go signoff audit",
          "p": "Audit unresolved Sev-1 and Sev-2 defects before approving public beta rollout.",
          "c": "Signoff Gate: 0 Sev-1 Blocker / 0 Sev-2 Critical -> APPROVED FOR BETA"
        }
      ]
    }
  ],
  "contentMarkdown": "## Internal Holistic Scenario Walkthroughs\n\nConduct structured alpha walkthroughs across cross-functional internal stakeholders with realistic seed data.\n\n```\nnpm run test:e2e:staging-rc\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
