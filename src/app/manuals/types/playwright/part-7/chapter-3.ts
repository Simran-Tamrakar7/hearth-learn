import type { ChapterRecord } from "../../../types";

/** 35. Interview Prep */
export const chapter = {
  "id": "pw-7-interview",
  "title": "35. Interview Prep",
  "minutes": 50,
  "level": "pro",
  "phase": "Part 7 · Real-World Project & Job Readiness",
  "partName": "Part 7 · Real-World Project & Job Readiness",
  "overviewText": "Interview prep for Playwright automation roles means being able to answer fluently — not memorized verbatim — across three categories: conceptual questions (why Playwright over Selenium, what the Browser/Context/Page hierarchy is), scenario-based problem solving (a test fails only in CI, a locator breaks after a UI refactor), and architecture explanations (POM, fixtures, CI setup). The strongest answers connect a general principle to a specific tool or method by name: 'I'd check the Trace Viewer output first' rather than 'I'd look into it.' Being able to explain why a decision was made — not just what it does — is consistently what separates a strong interview answer from a shallow one. Scenario-based questions are preferred by interviewers over recited definitions because they reveal hands-on experience rather than surface-level familiarity.",
  "why": "Automation interviews test whether you can think through real problems, not whether you have memorized API documentation. A candidate who explains POM as 'it separates page logic from test logic, so when a locator changes I update one file instead of every test' demonstrates understanding. A candidate who defines POM as 'a design pattern' does not. Scenario questions — 'a test passes locally but fails in CI, what do you do?' — are specifically designed to filter out candidates who have only done tutorials. Preparing concrete answers tied to your capstone project gives you specific, defensible examples rather than generic ones.",
  "when": "Start interview prep after the capstone (Chapter 33) is complete — you need real project experience to draw on for scenario answers. Prepare three stories before any interview: a time you debugged a CI failure, a time you improved code quality (the capstone refactor pass), and a time you made an architectural decision (choosing session reuse over repeated logins). Practice explaining POM, fixtures, and CI setup out loud, not just in writing.",
  "practical": {
    "app": "QA Automation Engineer — Technical interview",
    "scenario": "The interviewer asks: 'A Playwright test passes locally but fails in CI with a TimeoutError. Walk me through your debugging process.'",
    "pass": "You answer: 'First I download the CI artifact — screenshot and video from --screenshot=only-on-failure. If the screenshot shows the page didn't load, I check whether playwright install --with-deps is in the workflow. If the page loaded but the element wasn't found, I check whether the staging environment URL is set correctly via GitHub Secrets. I'd also check the Trace Viewer if traces are enabled.' The interviewer nods.",
    "fail": "You answer: 'I'd run it locally again and see if it passes.' The interviewer asks what you'd do if it passes locally but fails in CI. You say 'I'd add a retry.' The interview moves on."
  },
  "advantages": [
    "Concrete capstone examples make scenario answers specific and defensible",
    "Naming specific tools (Trace Viewer, --with-deps, storage_state) signals hands-on experience",
    "Explaining 'why' behind decisions (POM, session reuse, CI artifact upload) separates strong from shallow answers",
    "Three prepared stories cover the most common behavioral question formats",
    "Scenario-based prep transfers directly to live debugging exercises in technical interviews"
  ],
  "limitations": [
    "Interview questions vary significantly by company and seniority level",
    "Prepared answers can sound rehearsed — practice conversational delivery, not recitation",
    "Live coding exercises (write a test for this page) require hands-on practice, not just conceptual prep",
    "Framework-specific questions (pytest vs unittest, Python vs TypeScript) depend on the job listing"
  ],
  "tools": [
    {
      "name": "Playwright Trace Viewer",
      "sub": "Debugging",
      "url": "https://playwright.dev/python/docs/trace-viewer",
      "desc": "The Playwright Trace Viewer is the primary tool to name in debugging scenario answers. It records a full trace of browser actions, network requests, console logs, and DOM snapshots during a test run. When a test fails in CI, downloading the trace artifact and opening it in the Trace Viewer shows exactly what the browser did, what network requests were made, and what the DOM looked like at each step — without re-running the test locally.",
      "adv": [
        "Shows full browser session replay — actions, network, console, DOM snapshots",
        "Works from CI artifacts — no local re-run required to debug CI failures",
        "Named in scenario answers — signals hands-on debugging experience to interviewers",
        "Enabled with --tracing=retain-on-failure in pytest-playwright"
      ],
      "lim": [
        "Trace files are large — retain-on-failure is essential to avoid storage bloat",
        "Requires trace artifact to be uploaded in CI — not automatic",
        "Trace Viewer is a local tool — must download artifact from CI first"
      ],
      "steps": [
        {
          "t": "Step 1 — Enable tracing in CI",
          "p": "Add to pytest CI command:",
          "c": "pytest --browser chromium --tracing=retain-on-failure"
        },
        {
          "t": "Step 2 — Upload trace artifacts",
          "p": "Add to GitHub Actions workflow:",
          "c": "- name: Upload traces\n  if: failure()\n  uses: actions/upload-artifact@v4\n  with:\n    name: traces\n    path: test-results/"
        },
        {
          "t": "Step 3 — Open Trace Viewer locally",
          "p": "Download artifact and open:",
          "c": "playwright show-trace test-results/test_login/trace.zip"
        }
      ]
    }
  ],
  "contentMarkdown": "Common Playwright/automation interview questions A representative set worth being able to answer fluently, not memorized verbatim: ● \"Why Playwright over Selenium?\" — auto-waiting, native multi-browser support, modern web app compatibility (Part 0/1). ● \"What's the Browser/Context/Page hierarchy, and why does it matter?\" (Part 1, Chapter 3).\n\n## Common Playwright/automation interview questions\n\nA representative set worth being able to answer fluently, not memorized verbatim:\n\nmodern web app compatibility (Part 0/1).\n\nChapter 3).\n\nhardcoded sleeps, and systematic flaky-test tracking (Chapter 30) rather than \"I\n just add retries.\"\n\n17).\n\nsetup (Chapter 32).\n\n## Scenario-based problem solving\n\nInterviewers often prefer live scenarios over recited definitions:\n\nViewer (Chapter 24) as the concrete tool.\n\nwhere you'd add both UI and API assertions.\n\nPointers: The strongest answers connect a general principle to a specific tool/method by name (e.g., \"I'd check the Trace Viewer output first\" rather than \"I'd look into it\") — it signals hands-on experience rather than surface-level familiarity.\n\n## Explaining POM, fixtures, and CI setup to interviewers\n\nPractice a tight, concrete explanation for each rather than a textbook definition:\n\nupdating one file instead of every test that touches that element.\"\n\nin fresh before every test.\"\n\ndebuggable without re-running locally.\"\n\nPointers: Being able to explain why a decision was made (not just what it does) is consistently what separates a strong interview answer from a shallow one — this mirrors the \"explain the why\" thread running through this entire manual.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
