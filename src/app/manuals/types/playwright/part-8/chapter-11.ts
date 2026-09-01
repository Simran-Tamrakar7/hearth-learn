import type { ChapterRecord } from "../../../types";

/** 62. Glossary of Terms */
export const chapter = {
  "id": "pw-8-glossary",
  "title": "62. Glossary of Terms",
  "minutes": 20,
  "level": "reference",
  "phase": "Part 8 · Resources",
  "partName": "Part 8 · Resources",
  "overviewText": "A glossary of Playwright and test-automation terms is the shared vocabulary that keeps QA teams, developers, and new hires aligned — especially when discussing failures, architecture, and onboarding. This manual uses precise terms throughout: locator, fixture, flaky test, auto-waiting, storage state, trace, sharding, Page Object Model (POM), and dozens more. A living glossary — maintained as a one-page internal reference — prevents the confusion that arises when one engineer says \"fixture\" meaning a pytest fixture and another means a Playwright test fixture. Update the glossary whenever the team adopts new Playwright terminology (new API additions, renamed concepts) or when onboarding reveals recurring misunderstandings.",
  "why": "Miscommunication costs QA teams hours every week. A developer says \"the test is flaky\" meaning it fails randomly; a QA engineer hears \"the test is wrong\" and rewrites assertions. A new hire encounters \"storage state\" in conftest.py with no definition and copies the pattern without understanding it. A glossary eliminates these friction points by giving everyone the same definitions. It also accelerates onboarding — a new automation engineer reads one page and understands the terms used in code reviews, Slack messages, and sprint planning. For QA career growth, fluency in precise terminology signals professionalism in cross-functional meetings with developers and product managers.",
  "when": "Create your team's glossary during initial Playwright framework setup — before the suite grows past 20 tests. Add entries whenever a code review reveals a misunderstood term or a new Playwright release introduces new concepts (UI mode, component testing, merge-reports). Review the glossary quarterly during retrospectives — remove obsolete terms, clarify entries that still cause confusion. Share the glossary link in every new hire's onboarding checklist and pin it in your team's Slack channel.",
  "practical": {
    "app": "QA career — Onboarding a new automation engineer",
    "scenario": "Your team hires a junior QA engineer with manual testing background. On day one, you share the team's one-page Playwright glossary covering locator, fixture, POM, storage state, trace, and flake. By day three, they understand code review comments like \"use a role-based locator instead of CSS\" and \"move that setup into a session-scoped fixture\" without asking for definitions in every PR.",
    "pass": "The new hire submits their first PR with correct terminology in commit messages and review responses. Onboarding time drops from four weeks to two.",
    "fail": "No glossary exists. The new hire rewrites a session-scoped login fixture as a function-scoped one, causing 200 redundant logins per CI run. Nobody connects the performance regression to vocabulary confusion until the next sprint."
  },
  "advantages": [
    "Eliminates terminology confusion between QA, developers, and new hires",
    "Accelerates onboarding — one page replaces dozens of ad-hoc explanations",
    "Forces the team to agree on precise definitions, surfacing architectural disagreements early",
    "Grows with the project — new Playwright APIs get documented as the team adopts them",
    "Useful in interviews — candidates who know the vocabulary signal automation maturity"
  ],
  "limitations": [
    "A glossary only helps if people read and maintain it — stale entries are worse than none",
    "Cannot replace hands-on experience — knowing the definition of \"auto-waiting\" is not the same as debugging a timing issue",
    "Team-specific terms may diverge from community usage — note internal vs standard definitions",
    "One page can become unwieldy past ~40 terms — consider categorizing or linking to manual chapters",
    "Does not cover application-specific domain terms — maintain a separate business glossary if needed"
  ],
  "tools": [
    {
      "name": "Playwright Terminology Reference",
      "sub": "Core terms from this manual",
      "url": "https://playwright.dev/python/docs/api/class-playwright",
      "desc": "The essential Playwright terms used throughout this manual and in daily automation work. Maintain these as a living document in your team wiki. Each entry should be one to three sentences — definition, not essay. Link to the relevant manual chapter for depth.",
      "adv": [
        "Covers the vocabulary needed for code reviews and sprint planning",
        "Directly maps to concepts taught in earlier parts of this manual",
        "Linking to chapters provides depth without bloating the glossary page"
      ],
      "lim": [
        "Playwright-specific — does not cover general testing theory (see ISTQB glossary for that)",
        "Official docs use slightly different phrasing — align team definitions with your conventions",
        "New APIs require manual updates after each major release"
      ],
      "steps": [
        {
          "t": "Step 1 — Seed the glossary with core terms",
          "p": "Start with these entries and expand as needed:",
          "c": "# Playwright Glossary (team wiki)\n\n## Locator\nA reference to an element(s) on the page. Prefer get_by_role, get_by_label, get_by_test_id over CSS/XPath. See Part 2.\n\n## Fixture\nA pytest @pytest.fixture function providing setup/teardown (e.g., logged_in_page). See Part 3.\n\n## Auto-waiting\nPlaywright automatically waits for elements to be actionable before interacting. See Part 2.\n\n## Storage state\nSaved cookies + localStorage from a login session, reused to skip UI login. See Part 3.\n\n## Trace\nA Playwright debug recording (screenshots, DOM snapshots, network) captured on failure. See Part 5.\n\n## Flaky test\nA test that passes and fails non-deterministically on the same code. See Part 6.\n\n## Sharding\nSplitting tests across parallel CI machines. See Part 5.\n\n## POM (Page Object Model)\nA class encapsulating page locators and actions. See Part 3."
        },
        {
          "t": "Step 2 — Add entries when confusion appears in code review",
          "p": "If a PR comment explains a term, add it to the glossary:",
          "c": "# After a review explaining \"strict mode\":\n## Strict mode\nLocator resolves to exactly one element; throws if zero or multiple matches."
        }
      ]
    },
    {
      "name": "Team Glossary Template",
      "sub": "One-page internal reference",
      "url": "",
      "desc": "A simple template for maintaining your team's glossary as a living document. Store in Notion, Confluence, Google Docs, or a MARKDOWN file in your test repo. Format: term, one-sentence definition, link to manual chapter or official docs. Assign one person (rotating quarterly) as glossary maintainer responsible for adding new terms and removing obsolete ones.",
      "adv": [
        "One page is scannable in under five minutes",
        "Living document grows with team knowledge",
        "Pinned in Slack/wiki — always one click away",
        "Onboarding checklist item — new hires read it on day one"
      ],
      "lim": [
        "Requires discipline to update — assign a maintainer",
        "Wiki tools vary by company — pick whatever your team already uses",
        "Does not auto-sync with Playwright releases"
      ],
      "steps": [
        {
          "t": "Step 1 — Create the page and pin it in team channels",
          "p": "Add to onboarding checklist and code review template:",
          "c": "# Onboarding Day 1:\n# [ ] Read Playwright Glossary: [wiki link]\n\n# PR template reminder:\n# New terms introduced? Update the glossary."
        },
        {
          "t": "Step 2 — Quarterly glossary review in retrospective",
          "p": "15-minute agenda item: add, clarify, or remove entries:",
          "c": "# Retro prompt:\n# - Any terms that caused confusion this quarter?\n# - Any new Playwright APIs we adopted?\n# - Any entries that are obsolete?"
        }
      ]
    },
    {
      "name": "ISTQB Glossary",
      "sub": "General testing vocabulary",
      "url": "https://glossary.istqb.org",
      "desc": "The ISTQB's official glossary of software testing terms — acceptance criteria, regression testing, test oracle, boundary value analysis, and hundreds more. Complements the Playwright-specific glossary when communicating with stakeholders who use standard testing terminology rather than tool-specific jargon. Useful for QA engineers preparing for ISTQB certification or working in enterprise environments where ISTQB vocabulary is the common language.",
      "adv": [
        "Industry-standard definitions recognized globally",
        "Covers general testing theory not specific to any tool",
        "Free and searchable online",
        "Useful for ISTQB exam preparation"
      ],
      "lim": [
        "No Playwright-specific terms",
        "Formal definitions may differ from how your team uses terms colloquially",
        "Does not cover modern practices (CI/CD, shift-left) in depth"
      ],
      "steps": [
        {
          "t": "Step 1 — Reference ISTQB for stakeholder communication",
          "p": "Use standard terms in test plans and reports:",
          "c": "# Test plan language:\n# \"Regression suite\" (ISTQB) not \"the tests we run every night\"\n# \"Test oracle\" (ISTQB) not \"how we know it passed\""
        }
      ]
    }
  ],
  "contentMarkdown": "● A living glossary of terms used throughout this manual: locator, fixture, flaky test, auto-waiting, storage state, trace, sharding, POM, etc. ● Recommend maintaining this as a one-page internal reference for onboarding new team members ● Update it whenever the team adopts new Playwright terminology (e.g., new API additions)\n\n## Overview\n\nauto-waiting, storage state, trace, sharding, POM, etc.\n\nadditions)",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
