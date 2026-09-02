import type { ChapterRecord } from "../../../types";

/** 37. Trace Viewer & Post-Mortem Debugging */
export const chapter = {
  id: "pw-37-trace",
  title: "37. Trace Viewer & Post-Mortem Debugging",
  minutes: 40,
  level: "advanced",
  phase: "Part 4 · Advanced Techniques",
  partName: "Part 4 · Advanced Techniques",
  overviewText: "pytest --tracing on/retain-on-failure records DOM snapshots, network, console, and screenshots per step into trace.zip. playwright show-trace opens interactive replay — the primary tool for diagnosing CI failures you cannot reproduce locally.",
  why: "A CI timeout tells you nothing about what the page looked like. Traces replay the exact sequence with full context.",
  when: "Enable retain-on-failure in CI. Use --tracing on locally when debugging a specific flaky test. Upload trace.zip as CI artifact on failure.",
  practical: { app: "HRMS — CI-only failure", scenario: "test_dashboard passes locally, times out in CI. Trace shows slow API call left spinner visible 12 seconds.", pass: "retain-on-failure artifact + show-trace reveals spinner blocking assertion.", fail: "Re-run CI 10 times hoping to reproduce; add arbitrary sleep." },
  advantages: ["Full timeline: DOM, network, console per step","retain-on-failure saves storage on passing tests","show-trace works offline with local zip file","No re-run needed to inspect failure state","Screenshots at every action for visual context","Network tab shows slow/failed API calls"],
  limitations: ["Trace files large — full tracing on every test costly","Requires download from CI before local viewing","Not web-based — needs playwright CLI installed","Does not capture server-side logs","Sensitive data may appear in network/console traces","Python tracing config less documented than JS runner"],
  tools: [],
  contentMarkdown: "## 37. Trace Viewer & Post-Mortem Debugging\n\nA trace is a complete recording of everything that happened during a test run, replayable after the fact.\n```python\n# pytest.ini or CLI flag\n# pytest --tracing on\n\npytest --tracing on          # record traces for every test\n```\n\npytest --tracing retain-on-failure   # only keep traces for tests that failed\n\n--tracing (string: \"on\", \"off\", \"retain-on-failure\", \"retain-on-first-failure\") controls when trace files are recorded and kept. A trace captures DOM snapshots at each step, all network requests/responses, console logs, and screenshots — essentially everything you'd want to look at after the fact to understand what a test actually did, without needing to have watched it run live.\nretain-on-failure is the practical default for CI, balancing thoroughness against storage/performance cost.\nRecording traces for every single test (\"on\") adds real overhead (time and disk space) across a large suite, most of which is wasted since most tests pass and nobody ever needs to look at their trace. \"retain-on-failure\" records traces for everything but only keeps the file for tests that actually failed, giving you full debugging information exactly when you need it (a CI failure with no live process to attach to) without paying the storage cost for the overwhelming majority of tests that passed.\nOpening and analyzing a trace.zip file.\nplaywright show-trace trace.zip\n\nThis opens the Trace Viewer UI, showing a timeline of every action the test took, with a DOM snapshot rendered for each step (you can click through them like an interactive video), the exact network calls that happened at each point, and any console/error output. This is the single most valuable debugging tool for a CI failure you can't reproduce locally — instead of guessing what went wrong from a stack trace and log lines, you get to see, visually, exactly what the browser looked like and what happened right before the failure. For debugging flaky or intermittent CI-only failures (Chapter 38), this is often the difference between diagnosing the real root cause quickly versus spending hours trying to reproduce something that only fails under CI-specific conditions.",
  customSummary: "## 37. Trace Viewer & Post-Mortem Debugging\n\n--tracing on/off/retain-on-failure controls when traces are recorded/kept; a trace includes DOM snapshots, network activity, console logs, screenshots per step.\nretain-on-failure is the practical CI default — full debugging info for failures, no storage cost for passing tests.\nplaywright show-trace trace.zip opens an interactive replay — the best tool for diagnosing a CI failure you can't reproduce locally.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
