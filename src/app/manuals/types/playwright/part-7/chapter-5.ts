import type { ChapterRecord } from "../../../types";

/** Checkpoint — Job Ready */
export const chapter = {
  "id": "pw-cp-career",
  "title": "Checkpoint — Job Ready",
  "minutes": 45,
  "level": "checkpoint",
  "phase": "Part 7 · Real-World Project & Job Readiness",
  "partName": "Part 7 · Real-World Project & Job Readiness",
  "overviewText": "This final checkpoint validates job readiness: a complete capstone project with CI-green pipeline, a portfolio repo with README and demo link, and three interview stories prepared and practiced out loud. The pass criteria are concrete deliverables, not knowledge checks — capstone README written, demo video recorded and linked, three interview stories written. These are the artifacts that convert learning into hireable evidence.",
  "why": "Completing the manual without completing the checkpoint means you have knowledge but no evidence. Hiring managers and recruiters evaluate candidates on what they can show, not what they have read. The checkpoint forces you to produce the three artifacts — repo, README, interview stories — that actually get you interviews. Skipping it means finishing the manual and still not being ready to apply for roles.",
  "when": "Complete this checkpoint after Chapters 33–36 and before applying to QA Automation Engineer or SDET roles. All three deliverables must exist before you share your GitHub link or apply: capstone README, demo video link, three written interview stories.",
  "practical": {
    "app": "QA Automation Engineer — Job application readiness",
    "scenario": "You are ready to apply for QA Automation Engineer roles. You verify all three checkpoint deliverables exist: the capstone repo has a README with named patterns and a green CI badge, a demo video is linked in the README, and three interview stories are written and practiced out loud.",
    "pass": "All three deliverables verified. You apply to your first QA Automation Engineer role with the portfolio repo link in the resume. In the first interview, you walk through the capstone project, explain the CI debugging story, and describe the refactor pass — all from prepared, practiced stories.",
    "fail": "The capstone repo exists but has no README, no demo video, and no interview stories prepared. You apply anyway, the interviewer asks 'tell me about a project you built,' and you describe the manual exercises rather than the capstone framework."
  },
  "advantages": [
    "Three concrete deliverables convert manual completion into hireable evidence",
    "Demo video differentiates your application from candidates who only have a repo link",
    "Prepared interview stories prevent blank-moment failures in behavioral questions",
    "Green CI badge on portfolio repo is passive proof that persists between applications"
  ],
  "limitations": [
    "Checkpoint deliverables are necessary but not sufficient — interview performance still depends on practice",
    "Demo video quality varies — a poor recording is worse than no video",
    "Three stories cover common formats but not every possible interview question"
  ],
  "tools": [
    {
      "name": "GitHub Portfolio Repo",
      "sub": "Job Readiness Validation",
      "url": "https://github.com",
      "desc": "Verify the portfolio repo meets all checkpoint criteria before applying: README with named patterns, green CI badge, docs/architecture.md, and demo video link.",
      "adv": [
        "All checkpoint criteria verifiable by opening the repo homepage",
        "Shareable link ready for resume and LinkedIn"
      ],
      "lim": [
        "Repo must be complete before sharing — partial repos undermine credibility"
      ],
      "steps": [
        {
          "t": "Checkpoint Step 1 — Verify capstone README",
          "p": "Confirm README names POM, session reuse, API validation, and GitHub Actions CI.",
          "c": "# Open repo → README visible on homepage\n# Check: What this demonstrates section lists named patterns"
        },
        {
          "t": "Checkpoint Step 2 — Verify demo video link",
          "p": "Confirm a 2–3 minute walkthrough is linked in the README.",
          "c": "## Demo\n[Watch a 2-minute walkthrough](https://...)"
        },
        {
          "t": "Checkpoint Step 3 — Write three interview stories",
          "p": "Write and practice out loud:",
          "c": "Story 1: Debugging a CI failure (missing --with-deps, screenshot evidence)\nStory 2: Improving code quality (capstone refactor pass, anti-patterns checklist)\nStory 3: Architectural decision (session reuse vs repeated logins, measured time saving)"
        }
      ]
    }
  ],
  "contentMarkdown": "Capstone README + demo link + three interview stories written.\n\n## Pass criteria\n\nCapstone README + demo link + three interview stories written.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
