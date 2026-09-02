import type { ChapterRecord } from "../../../types";

/** 60. Comparison & Decision-Making References */
export const chapter = {
  id: "pw-60-comparison",
  title: "60. Comparison & Decision-Making References",
  minutes: 20,
  level: "beginner",
  phase: "Part 8 · Resources",
  partName: "Part 8 · Resources",
  overviewText: "Playwright vs Selenium vs Cypress decision frameworks, reporting tool comparisons, and when to recommend each tool to a team — scenario-based not checklist.",
  why: "Senior engineers recommend tools for organizational fit, not personal preference. Comparison references support defensible decisions.",
  when: "Consult when asked to evaluate tools for a new team or in architecture review meetings.",
  practical: { app: "Tool evaluation meeting", scenario: "Frontend team wants Cypress; QA team knows Python and needs multi-browser.", pass: "Frame trade-offs: Cypress in-browser limits vs Playwright Python polyglot + WebKit.", fail: "Declare Playwright best without understanding team skills and app architecture." },
  advantages: ["Scenario-based comparison more credible than feature tables","Part 0 architecture context supports defensible recommendations","Reporting tool comparison prevents shiny-object adoption","Documents decision rationale for future team members","Prevents re-debating settled tool choices every quarter","Interview-ready framing for 'why this tool' questions"],
  limitations: ["Comparisons age as tools add features","Organizational politics override technical merit","Second-hand comparisons miss nuance of hands-on use","Feature parity tables oversimplify architectural differences","Team skill inventory changes recommended answer","Sunk cost in existing Selenium suite slows migration"],
  tools: [],
  contentMarkdown: "## Comparison & Decision-Making References\n\n\"Playwright vs. X\" comparison content is useful primarily for articulating tradeoffs in interviews and adoption discussions, not for re-deciding a tool choice once already committed. Given this manual already commits to Playwright + Python + pytest, comparison content's practical value going forward is less about re-litigating the choice and more about being able to clearly explain the tradeoffs to others — a stakeholder asking \"why not Selenium,\" or an interviewer asking the same, both benefit from the same well-reasoned comparison already built out in Chapter 1 and Part 0's Chapter 3.\n\nFramework/library decision references (which reporting tool, which CI platform, which cloud grid) are worth revisiting periodically rather than deciding once and never reconsidering. Unlike the core browser-automation tool choice, secondary tooling decisions (Allure vs. plain HTML reporting, GitHub Actions vs. another CI platform, whether to add a cloud execution grid) are lower-stakes and worth periodically reassessing as a team's needs or the tooling landscape changes — this reference category is meant to be checked in on occasionally, not treated as settled permanently the first time a decision is made.\n\nDecision matrices (weighted criteria across cost, team familiarity, ecosystem maturity, maintenance burden) are a useful structured tool for these secondary decisions. Rather than picking a secondary tool based on which blog post you read most recently, a simple weighted comparison across the criteria that actually matter for your specific team/project — cost, existing team familiarity, ecosystem/plugin maturity, ongoing maintenance burden — produces a more defensible, revisitable decision than an ad hoc choice, and is itself a useful artifact to show in an interview as evidence of structured technical decision-making.",
  customSummary: "## Comparison & Decision-Making References\n\n\"Playwright vs. X\" content's ongoing value is explaining tradeoffs to others (interviews, stakeholders), not re-deciding an already-settled tool choice.\nSecondary tooling decisions (reporting tool, CI platform, cloud grid) are lower-stakes and worth periodic reassessment via a simple weighted decision matrix (cost, familiarity, ecosystem maturity, maintenance burden).",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
