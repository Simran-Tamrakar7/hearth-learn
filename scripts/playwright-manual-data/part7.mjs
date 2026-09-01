/** Playwright manual Part 7 — Real-World & Job Readiness */
export const chapters = [
  {
    contentMarkdown: `## 33. Real-World Capstone Project

The capstone ties together nearly every prior chapter into one portfolio-worthy Playwright framework — not isolated exercises.

### Scope

A solid capstone covers:

- **Login** — Page Object Model (Chapter 14) with a session-reuse fixture (Chapter 20) so login runs once per session, not once per test.
- **CRUD flow** — Create, Read, Update, Delete through the UI.
- **API validation** — After each UI action, confirm data persisted server-side — not just that the UI looked right.

### CRUD + API validation example

\`\`\`python
# tests/test_task_crud.py
from pages.tasks_page import TasksPage

def test_create_read_update_delete_task(authenticated_page, request):
    tasks_page = TasksPage(authenticated_page)

    # Create
    tasks_page.create_task("Finish QA report", due_date="2026-08-10")
    expect(authenticated_page.get_by_text("Finish QA report")).to_be_visible()
    response = request.get("/api/tasks?title=Finish QA report")
    assert response.json()["tasks"][0]["due_date"] == "2026-08-10"

    # Update
    tasks_page.edit_task("Finish QA report", new_title="Finish QA report v2")
    expect(authenticated_page.get_by_text("Finish QA report v2")).to_be_visible()

    # Delete
    tasks_page.delete_task("Finish QA report v2")
    expect(authenticated_page.get_by_text("Finish QA report v2")).not_to_be_visible()
    response = request.get("/api/tasks?title=Finish QA report v2")
    assert response.json()["tasks"] == []
\`\`\`

The API-validation steps elevate this from "a UI clicker" to a genuine full-stack test — interviewers specifically listen for this.

### CI integration

Wire \`conftest.py\` with session-scoped auth fixtures, the \`request\` fixture for API calls (Chapter 18), and a GitHub Actions workflow (Chapter 25) that runs on every push and publishes an HTML or Allure report (Chapter 26).

\`\`\`yaml
# .github/workflows/playwright.yml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r requirements.txt
      - run: playwright install --with-deps
      - run: pytest --headed=false --tracing=retain-on-failure
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
\`\`\`

Getting the pipeline **green end-to-end** — not just passing locally — is the real milestone. Missing \`playwright install --with-deps\`, environment variable differences, and headless-only quirks are where practical learning happens.

### Refactor pass

Once the capstone works, revisit it against Chapter 31's anti-patterns checklist:

- Descriptive test names
- No hardcoded sleeps
- Role-based locators
- API validation on every CRUD step
- Session reuse fixture
- CI pipeline green

This refactor pass is itself a showable skill — a concrete before/after is a strong interview answer.`,
  },
  {
    contentMarkdown: `## 34. Portfolio Building

Your GitHub repo is often the first thing a hiring manager opens. Structure it like a professional framework, not a homework dump.

### Recommended repo structure

\`\`\`
playwright-capstone/
├── .github/workflows/playwright.yml   # CI runs on every push
├── pages/                             # Page Object Model classes
│   ├── login_page.py
│   └── tasks_page.py
├── tests/
│   ├── conftest.py                    # Fixtures (auth, API context)
│   └── test_task_crud.py
├── fixtures/                          # Test data (JSON, factories)
├── playwright.config.py               # Or pytest.ini + conftest
├── requirements.txt
├── README.md                          # First impression — make it count
└── .gitignore                         # Exclude .env, traces, __pycache__
\`\`\`

### README template

Your README should answer four questions in under two minutes of reading:

1. **What does this test?** — One sentence on the app and scope (login + CRUD + API validation).
2. **How do I run it?** — Copy-paste commands that actually work:
   \`\`\`bash
   pip install -r requirements.txt
   playwright install
   pytest
   \`\`\`
3. **What's the architecture?** — Brief note on POM, fixtures, and CI.
4. **Proof it works** — Screenshot of a green CI run or link to Actions badge.

\`\`\`markdown
# Task Manager — Playwright Capstone

End-to-end Playwright + pytest suite covering login, task CRUD, and API validation.

## Quick start
pip install -r requirements.txt && playwright install && pytest

## Architecture
- Page Object Model in \`pages/\`
- Session-scoped auth fixture in \`conftest.py\`
- GitHub Actions CI on every push

## CI status
![Playwright Tests](https://github.com/yourname/playwright-capstone/actions/workflows/playwright.yml/badge.svg)
\`\`\`

### Demo video (2–3 minutes)

Record a short walkthrough showing:

1. Repo structure (30 seconds)
2. One test running locally with trace on failure (60 seconds)
3. Green GitHub Actions run + report artifact (30 seconds)

Upload to YouTube (unlisted) or Loom and link from the README. Recruiters rarely clone repos — a video proves you built it and can explain it.

### What to highlight

- API validation alongside UI assertions
- Session reuse (not logging in every test)
- CI that actually runs (green badge, not red X)
- Clean locator strategy (roles/labels, not XPath soup)`,
  },
  {
    contentMarkdown: `## 35. Interview Prep

Automation interviews test whether you can **build and maintain a framework**, not whether you can write a single \`page.click()\`.

### Common questions

**"Walk me through your test framework architecture."**
- Tests → workflow helpers → page objects → locators
- Fixtures in \`conftest.py\` for auth, test data, and browser setup
- CI runs on every PR; traces uploaded on failure

**"How do you handle flaky tests?"**
- Auto-waiting locators first (Playwright's default)
- Trace viewer + screenshot on failure to diagnose timing vs. real bugs
- Never \`time.sleep()\` — use \`expect(...).to_be_visible()\`
- Quarantine pattern: mark flaky tests, fix root cause, un-quarantine

**"How do you test APIs alongside UI?"**
- \`request\` fixture (APIRequestContext) for setup, teardown, and validation
- UI creates data → API confirms persistence → UI deletes → API confirms gone

**"Why Playwright over Selenium/Cypress?"**
- Auto-waiting, trace viewer, multi-browser (Chromium/Firefox/WebKit)
- Native API testing context
- Python bindings via pytest-playwright

### Scenario debugging (live coding)

Expect: "This test fails in CI but passes locally — how do you debug?"

Structured answer:

1. Download CI artifact (trace, screenshot, video)
2. Open trace in \`trace.playwright.dev\` — see exact DOM state at failure
3. Check CI-specific issues: missing \`--with-deps\`, headless font rendering, env vars
4. Reproduce locally with \`pytest --headed=false\` to match CI

### Explaining POM, fixtures, and CI

**Page Object Model** — "Each page is a class. Tests call \`login_page.login(user, pass)\` instead of scattering locators. When the login form changes, I fix one file, not fifty tests."

**Fixtures** — "Fixtures are pytest's dependency injection. My \`authenticated_page\` fixture logs in once per session and yields a ready page. Tests declare what they need; conftest provides it."

**CI integration** — "Every push runs the full suite in GitHub Actions. On failure, traces and reports upload as artifacts. The team reviews traces before merging — not just 'it passed on my machine.'"

### Practice format

Pick one capstone test and practice explaining it aloud in under 90 seconds: what it tests, why API validation matters, and what happens when it fails in CI.`,
  },
  {
    contentMarkdown: `## 36. Career Positioning

Manual QA experience is an asset in automation roles — not a liability. Frame it correctly.

### Manual QA + automation framing

| Manual QA strength | Automation translation |
|---|---|
| Exploratory testing instincts | Better test design — you know where apps break |
| Bug report clarity | Clearer failure messages and trace annotations |
| Domain knowledge | Stronger assertions — you know what "correct" looks like |
| Regression checklist mindset | Systematic suite coverage, not random happy-path tests |

**Interview line:** "My manual QA background means I design tests that catch real user-facing bugs, not just green checkmarks on happy paths."

### Resume bullets (copy and adapt)

Use action verbs + measurable outcomes:

- Built Playwright + pytest E2E framework covering login, CRUD, and API validation for [App Name]; reduced regression cycle from 4 hours manual to 12 minutes automated
- Designed Page Object Model architecture and session-reuse fixtures; onboarded 2 QA engineers to contribute tests within first week
- Integrated Playwright suite into GitHub Actions CI; published trace artifacts on failure, cutting flaky-test diagnosis time by ~60%
- Migrated 40 Selenium tests to Playwright; eliminated explicit waits and reduced suite flake rate from 15% to under 2%
- Authored conftest.py fixtures for multi-role testing (admin, employee, guest) with storage_state session reuse

### LinkedIn headline options

- QA Automation Engineer | Playwright · pytest · Python | Manual QA → Automation
- Test Automation Engineer | Building reliable Playwright frameworks | Ex-manual QA

### What hiring managers scan for

1. **GitHub link** with a real, runnable project (not a tutorial fork)
2. **CI badge** — proves you understand the full pipeline
3. **API + UI testing** — shows full-stack thinking
4. **Specific tools** — Playwright, pytest, GitHub Actions (not just "Selenium experience")

### Avoid

- "Familiar with automation" without a repo link
- Listing 15 tools with no depth on any
- Claiming "100% test coverage" — interviewers will probe`,
  },
  {
    contentMarkdown: `## Checkpoint — Job Ready

Brief self-check before applying to automation roles. Be honest — gaps are fixable.

### Framework skills

- [ ] I can explain my repo structure (pages/, tests/, conftest.py, CI workflow) in under 2 minutes
- [ ] My capstone has at least one CRUD flow with API validation
- [ ] I use role/label locators, not CSS/XPath soup
- [ ] My fixtures handle auth via storage_state or equivalent session reuse
- [ ] I have zero \`time.sleep()\` calls in my suite

### CI & debugging

- [ ] My GitHub Actions workflow runs green on the latest push
- [ ] I can open a Playwright trace and explain what failed and why
- [ ] I know the difference between a timing flake and a real bug
- [ ] CI artifacts (report, trace) upload on failure

### Interview readiness

- [ ] I can explain POM, fixtures, and CI integration without reading notes
- [ ] I have a 2–3 minute demo video or can walk through the repo live
- [ ] I can answer "why Playwright?" with specific technical reasons
- [ ] My resume has 2–3 quantified automation bullets

### Portfolio

- [ ] README has quick-start commands that work on a fresh clone
- [ ] Repo is public (or accessible to interviewers on request)
- [ ] No secrets (.env, tokens) committed to git

### Score

- **12–14 checked:** Ready to apply. Start submitting.
- **8–11 checked:** Close — prioritize CI green + demo video this week.
- **Below 8:** Finish the capstone (Chapter 33) before applying. One solid project beats ten incomplete ones.`,
  },
];
