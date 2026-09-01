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
  "contentMarkdown": "## 35. Interview Prep\n\nAutomation interviews test whether you can **build and maintain a framework**, not whether you can write a single `page.click()`.\n\n### Common questions\n\n**\"Walk me through your test framework architecture.\"**\n- Tests → workflow helpers → page objects → locators\n- Fixtures in `conftest.py` for auth, test data, and browser setup\n- CI runs on every PR; traces uploaded on failure\n\n**\"How do you handle flaky tests?\"**\n- Auto-waiting locators first (Playwright's default)\n- Trace viewer + screenshot on failure to diagnose timing vs. real bugs\n- Never `time.sleep()` — use `expect(...).to_be_visible()`\n- Quarantine pattern: mark flaky tests, fix root cause, un-quarantine\n\n**\"How do you test APIs alongside UI?\"**\n- `request` fixture (APIRequestContext) for setup, teardown, and validation\n- UI creates data → API confirms persistence → UI deletes → API confirms gone\n\n**\"Why Playwright over Selenium/Cypress?\"**\n- Auto-waiting, trace viewer, multi-browser (Chromium/Firefox/WebKit)\n- Native API testing context\n- Python bindings via pytest-playwright\n\n### Scenario debugging (live coding)\n\nExpect: \"This test fails in CI but passes locally — how do you debug?\"\n\nStructured answer:\n\n1. Download CI artifact (trace, screenshot, video)\n2. Open trace in `trace.playwright.dev` — see exact DOM state at failure\n3. Check CI-specific issues: missing `--with-deps`, headless font rendering, env vars\n4. Reproduce locally with `pytest --headed=false` to match CI\n\n### Explaining POM, fixtures, and CI\n\n**Page Object Model** — \"Each page is a class. Tests call `login_page.login(user, pass)` instead of scattering locators. When the login form changes, I fix one file, not fifty tests.\"\n\n**Fixtures** — \"Fixtures are pytest's dependency injection. My `authenticated_page` fixture logs in once per session and yields a ready page. Tests declare what they need; conftest provides it.\"\n\n**CI integration** — \"Every push runs the full suite in GitHub Actions. On failure, traces and reports upload as artifacts. The team reviews traces before merging — not just 'it passed on my machine.'\"\n\n### Practice format\n\nPick one capstone test and practice explaining it aloud in under 90 seconds: what it tests, why API validation matters, and what happens when it fails in CI.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
