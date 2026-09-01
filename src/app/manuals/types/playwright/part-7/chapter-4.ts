import type { ChapterRecord } from "../../../types";

/** 36. Career Positioning */
export const chapter = {
  "id": "pw-7-career",
  "title": "36. Career Positioning",
  "minutes": 40,
  "level": "pro",
  "phase": "Part 7 · Real-World Project & Job Readiness",
  "partName": "Part 7 · Real-World Project & Job Readiness",
  "overviewText": "Career positioning for QA professionals adding automation skills means framing manual QA experience as the foundation automation sits on top of — not a gap to work around. You already understand test design: edge cases, boundary conditions, negative testing. Automation is a new execution mechanism for that same skill, not a replacement for it. Your documentation and test case writing skills directly inform writing clear test assertions and failure messages. In interviews and on a resume, frame it as addition, not transition: 'manual QA tester who added automation skills' reads as a more complete profile than trying to present as a from-scratch automation engineer. Effective resume bullets focus on concrete outcomes and named techniques — Page Object Model, API validation, GitHub Actions CI — not just tool lists.",
  "why": "Candidates transitioning from manual QA to automation often undersell their existing skills and oversell their coding skills — the opposite of what hiring managers value. A manual QA background means you already know how to think about edge cases, write clear test cases, and communicate failures to developers. Those skills are exactly what automation-only engineers often lack. Framing your profile correctly means interviewers evaluate you on your complete QA profile rather than comparing you directly against candidates with five years of pure coding experience. The capstone project and portfolio repo are the evidence that backs up the positioning.",
  "when": "Update your resume and LinkedIn profile after the capstone (Chapter 33) and portfolio repo (Chapter 34) are complete — not before. Write resume bullets using the capstone project as the primary example. Prepare your 'addition not transition' framing before any interview. Apply to roles titled 'QA Automation Engineer' or 'SDET' rather than 'Software Engineer' — the job title signals the evaluation criteria you are prepared for.",
  "practical": {
    "app": "QA Automation Engineer — Resume and interview",
    "scenario": "You apply for a QA Automation Engineer role. Your resume bullet reads: 'Built a Playwright + Python + pytest automation framework using Page Object Model architecture, combining UI and API validation and integrating with GitHub Actions CI, covering login, CRUD, and full-stack validation for a task management application.'",
    "pass": "The hiring manager sees a specific, credible bullet with named techniques and a portfolio repo link. In the interview, you explain your manual QA background as the foundation for your test design approach, and walk through the capstone project demonstrating POM, API validation, and CI integration.",
    "fail": "The resume bullet reads 'Used Playwright and Python for testing.' The interviewer asks what you built and you describe running a few recorded tests. The manual QA background is never mentioned, and the candidate is evaluated purely on coding depth against senior automation engineers."
  },
  "advantages": [
    "Manual QA background is a differentiator — test design thinking that automation-only engineers often lack",
    "Documentation skills translate directly to framework maintainability and README quality",
    "Capstone project provides concrete, interview-defensible examples of automation competence",
    "'Addition not transition' framing avoids unfavorable comparison against pure coding candidates",
    "Named techniques in resume bullets (POM, API validation, GitHub Actions) signal depth beyond tool lists",
    "QA Automation Engineer / SDET titles match the evaluation criteria you are prepared for"
  ],
  "limitations": [
    "Positioning does not substitute for technical depth — the capstone must be genuinely well-built",
    "Some companies prefer pure automation engineers — target roles that value QA background explicitly",
    "Resume bullets with specific metrics require real numbers — do not fabricate time-saved claims",
    "Career positioning is ongoing — must be updated as skills and projects grow"
  ],
  "tools": [
    {
      "name": "GitHub Portfolio Repo",
      "sub": "Career Evidence",
      "url": "https://github.com",
      "desc": "The capstone portfolio repo is the primary career evidence for automation skills. Link it directly in resume, LinkedIn, and cover letters. Pin it on your GitHub profile. Ensure the README names specific patterns (POM, session reuse, API validation, GitHub Actions CI) and the CI badge is green before sharing the link.",
      "adv": [
        "Directly linkable in resume and LinkedIn — reviewers can evaluate before the interview",
        "Green CI badge is passive proof the framework works",
        "README and docs/architecture.md demonstrate communication skills alongside technical skills"
      ],
      "lim": [
        "Only valuable if the repo is genuinely well-built — a poor framework with a good README fails under scrutiny",
        "Requires the capstone to be complete and CI-green before sharing"
      ],
      "steps": [
        {
          "t": "Step 1 — Write outcome-focused resume bullets",
          "p": "Use the capstone as the primary example:",
          "c": "Built a Playwright + Python + pytest automation framework using\nPage Object Model architecture, combining UI and API validation and\nintegrating with GitHub Actions CI, covering login, CRUD, and\nfull-stack validation for a task management application.\n\nGitHub: github.com/yourusername/playwright-task-manager-framework"
        },
        {
          "t": "Step 2 — Prepare the 'addition not transition' framing",
          "p": "Practice this answer for 'tell me about your background':",
          "c": "\"I started in manual QA, which gave me strong test design skills —\nedge cases, boundary conditions, clear test cases. I've added\nautomation skills on top of that foundation: Playwright, Python,\npytest, CI/CD integration. Automation is a new execution mechanism\nfor the same test design thinking I've always done.\""
        },
        {
          "t": "Step 3 — Pin the repo on GitHub profile",
          "p": "GitHub profile → Customize pins → select the capstone repo.",
          "c": "# Profile shows pinned repo with README preview and CI badge"
        }
      ]
    }
  ],
  "contentMarkdown": "Framing manual QA experience alongside automation skills Your manual QA background isn't a gap to work around — it's the foundation automation skill sits on top of. Concretely: ● You already understand test design (edge cases, boundary conditions, negative testing) — automation is a new execution mechanism for that same skill, not a replacement for it.\n\n## Framing manual QA experience alongside automation skills\n\nYour manual QA background isn't a gap to work around — it's the foundation automation skill sits on top of. Concretely:\n\ntesting) — automation is a new execution mechanism for that same skill, not a\n\nreplacement for it.\n\nskills that directly inform writing clear test assertions and failure messages.\n\ndifferentiator — many automation-only engineers write poorly documented\n\nframeworks; you're positioned to avoid that specific weakness.\n\nPointers: In interviews and on a resume, frame it as addition, not transition — \"manual QA tester who added automation skills\" reads as a more complete profile than trying to present as a from-scratch automation engineer with no other context, since the latter invites direct comparison against candidates with more raw coding experience than you may currently have.\n\n## Resume bullet points for automation projects\n\nEffective bullets focus on concrete outcomes and named techniques, not just tool lists:\n\n## Weak: \"Used Playwright and Python for testing.\"\n\nStrong: \"Built a Playwright + Python + pytest automation framework using\n\n## Page Object Model architecture, combining UI and API validation and\n\nintegrating with GitHub Actions CI, reducing manual regression testing\n\ntime for [X module] by [Y].\"\n\nPointers: Where you have real numbers (time saved, defects caught, test count), use them — but don't fabricate metrics you don't actually have; a specific, honest description of scope (\"built an end-to-end framework covering login, CRUD, and API validation for a [type] application\") is more credible and interview-defensible than an inflated, vague claim that falls apart under a follow-up question.\n\nContinuing the reference library — additional categories worth bookmarking as your automation practice matures.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
