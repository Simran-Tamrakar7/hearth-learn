import type { ChapterRecord } from "../../../types";

/** 7. The Playwright Tooling Ecosystem */
export const chapter = {
  id: "pw-7-ecosystem",
  title: "7. The Playwright Tooling Ecosystem",
  minutes: 25,
  level: "beginner",
  phase: "Part 0 · Background & Context",
  partName: "Part 0 · Background & Context",
  overviewText: "Playwright's ecosystem spans Inspector, Trace Viewer, Codegen, VS Code extension, pytest-playwright, pytest-xdist, Playwright MCP, and enterprise cloud grids — each solving a distinct workflow problem.",
  why: "Knowing which tool to reach for — Inspector vs Trace Viewer vs Codegen — saves hours of debugging.",
  when: "Read before your first CI failure. Revisit when setting up local dev workflow.",
  practical: { app: "CI pipeline", scenario: "Test fails on CI but passes locally.", pass: "Open trace.zip in Trace Viewer to inspect DOM and network at failure step.", fail: "Re-run locally 20 times hoping to reproduce." },
  tools: [],
  contentMarkdown: "## 7. The Playwright Tooling Ecosystem\n\nCore library. playwright / pytest-playwright is the browser automation engine itself, covered throughout Parts 1–4. Playwright Inspector. A GUI debugging tool that lets you step through a test line-by-line, pause execution, and interactively explore locators. Trace Viewer. A post-run visual timeline of everything that happened in a test (DOM snapshots, network calls, console logs) — the primary tool for debugging CI failures after the fact, since you can't attach a live debugger to a CI runner. Codegen. The record-and-generate tool that scaffolds a first-draft script from manual clicking. VS Code extension. The official Microsoft extension adding test discovery, run/debug buttons directly in the editor, and live locator picking. pytest-playwright plugin. The Python-specific bridge into pytest's fixture/runner ecosystem — most of this manual's test-structure content depends on it. pytest-xdist. Not Playwright-specific, but the standard way Python Playwright suites achieve parallel execution. Playwright MCP. A newer addition letting AI agents/LLMs drive a browser through Playwright via the Model Context Protocol — notable because it's a genuinely new frontier rather than legacy tooling. Cloud execution grids. BrowserStack, LambdaTest, Sauce Labs — third-party services for running Playwright tests on real device/browser combinations at scale. Not part of Playwright itself, but commonly paired with it in enterprise CI setups. Allure / HTML Reporter. Reporting tools for turning raw test results into readable dashboards. Why this matters as a map. When you hit a wall later — \"how do I debug this failing CI test\" or \"how do I see what the test actually did\" — this section is the index telling you which tool in the ecosystem actually solves that problem, instead of trying to solve everything with print statements.",
  customSummary: "## 7. The Playwright Tooling Ecosystem\n\n- Core library + surrounding tools form the full ecosystem.\n- Debugging: Playwright Inspector (live) and Trace Viewer (post-run, essential for CI failures).\n- Authoring: Codegen (record→script), VS Code extension (in-editor run/debug/locator picking).\n- Python-specific: pytest-playwright (fixtures/runner bridge) + pytest-xdist (parallelization).\n### Emerging: Playwright MCP — AI agents driving browsers via Playwright\n- Enterprise add-ons: cloud grids (BrowserStack/LambdaTest/Sauce Labs); reporting tools (Allure/HTML Reporter).",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
