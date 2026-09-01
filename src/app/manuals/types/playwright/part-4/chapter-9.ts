import type { ChapterRecord } from "../../../types";

/** Checkpoint — Advanced */
export const chapter = {
  "id": "pw-cp-advanced",
  "title": "Checkpoint — Advanced",
  "minutes": 45,
  "level": "checkpoint",
  "phase": "Part 4 · Advanced Techniques",
  "partName": "Part 4 · Advanced Techniques",
  "overviewText": "This checkpoint validates that you can apply Part 4's advanced Playwright techniques to real test scenarios — not just understand them individually. You should be able to mock network responses with page.route() and route.fulfill(), set up test data via APIRequestContext and combine API setup with UI assertions, capture and compare visual baselines with to_have_screenshot(), scan pages for accessibility violations with axe-core, reuse authentication via storage_state fixtures, interact with shadow DOM components, run tests in parallel with pytest-xdist, execute cross-browser matrix runs, and debug failures using Trace Viewer. These techniques transform a basic Playwright suite into one that handles error states, runs fast, catches visual and accessibility regressions, and provides actionable CI failure artifacts.",
  "why": "Parts 1–3 built interaction skills and framework structure; Part 4 adds the techniques that separate a demo suite from a production-grade one. Network mocking, API hybrid tests, auth reuse, and parallel execution directly impact suite speed and reliability. Visual and accessibility testing catch regressions functional tests miss. Debugging tools determine whether CI failures are fixed in minutes or hours. This checkpoint confirms you can integrate these techniques before Part 5+ covers CI pipelines and reporting.",
  "when": "Complete this checkpoint after finishing Chapters 17–24 and before starting Part 5. Revisit if your suite lacks network mocking for error states, still creates all test data via UI, runs sequentially despite exceeding 15 minutes, or provides no trace artifacts on CI failure.",
  "practical": {
    "app": "HRMS — Advanced suite review",
    "scenario": "Given the HRMS test project from the Part 3 checkpoint, add: a route.fulfill mock for the 500-error employee list scenario, an API-hybrid test that POSTs a user and verifies admin list visibility, storage_state auth fixture, one visual baseline with masked timestamp, an axe scan on the login page, pytest -n 4 parallel run, and a trace-on-failure fixture.",
    "pass": "Mocked error test is deterministic; API hybrid test completes in under 5 seconds; parallel run with 4 workers finishes without shared-state failures; CI failure produces a viewable trace.zip.",
    "fail": "Error-state tests depend on staging being broken; all data created via UI forms; sequential run exceeds 45 minutes; CI failures show only 'Timeout 30000ms exceeded' with no trace artifact."
  },
  "advantages": [
    "Confirms integration of all Part 4 techniques as a cohesive advanced suite",
    "Identifies gaps before CI pipeline work in later parts",
    "Validates speed optimizations (auth reuse, API setup, parallelism) with measurable targets",
    "Ensures debugging tooling is in place before relying on CI for test feedback"
  ],
  "limitations": [
    "Self-assessment — no automated grader verifies technique implementation",
    "Checkpoint is minimum bar — production suites need CI integration from later parts",
    "Individual technique mastery does not guarantee they work together without conflicts",
    "Performance targets (5-minute smoke, 45-minute full suite) vary by application complexity"
  ],
  "tools": [],
  "contentMarkdown": "You can mock network, hit APIs, reuse auth, run parallel/cross-browser, and debug with traces.\n\n## Pass criteria\n\nYou can mock network, hit APIs, reuse auth, run parallel/cross-browser, and debug with traces.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
