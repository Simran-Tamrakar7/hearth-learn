import type { ChapterRecord } from "../../../types";

/** 1.4 Listeners (View Results Tree, Summary Report, Aggregate Report) */
export const chapter = {
  "id": "jm-1-4-listeners-view-results-tree-summary-report-aggre",
  "title": "1.4 Listeners (View Results Tree, Summary Report, Aggregate Report)",
  "minutes": 24,
  "level": "beginner",
  "phase": "Part 1 · Core Building Blocks",
  "partName": "Part 1 · Core Building Blocks",
  "overviewText": "Listeners are JMeter's window into what actually happened during a test run — but not all listeners are created equal. View Results Tree is for debugging; Summary and Aggregate are for stats; averages lie, so percentiles on Aggregate matter. Disable the tree before real load.",
  "why": "Leaving View Results Tree on at 500 users can crash JMeter and invalidate the run. Knowing which listener is for debug vs analysis is the practical skill that separates a valid load test from a self-DoS of the tool.",
  "when": "While building a plan with 1–2 threads, and again the moment you scale thread count for a real run.",
  "practical": {
    "app": "Leave apply sampler under debug",
    "scenario": "First run shows a red sample; later you need numbers for a 100-user hold.",
    "pass": "You debug with View Results Tree at 1 thread, then disable it and use Summary/Aggregate live, planning CLI HTML dashboard for the real report (Part 10).",
    "fail": "You leave View Results Tree enabled for a 500-user GUI run."
  },
  "tools": [],
  "customSummary": "- View Results Tree: full request/response detail per sample — great for debugging, memory-heavy, disable before real load runs.\n- Summary Report: lightweight per-sampler stats (avg, min, max, error %, throughput) — safe to leave on during load tests.\n- Aggregate Report: adds percentile columns (90/95/99th) — critical because averages hide slow outliers.\n- Standard workflow: debug with View Results Tree + few threads → scale up, disable it → use Summary/Aggregate live → generate full HTML report via CLI for real analysis (Part 10).",
  "contentMarkdown": "## View Results Tree — debug only\n\nView Results Tree is the most detailed listener: for every single sample, it shows you the full request (headers, body) and full response (status code, headers, body, timing), often color-coded green (pass) or red (fail) based on any attached assertions. This is functionally similar to inspecting a request/response pair in browser DevTools' Network tab, or to the detailed trace viewer in Playwright — enormously useful while you're building and debugging a test plan, because you can immediately see if your JSON body is malformed, your auth token didn't get substituted correctly, or the server returned a 401.\n\nHowever, View Results Tree stores the complete data for every sample in memory, which becomes catastrophic at scale — running it during a 500-user load test will balloon memory usage and can crash JMeter itself, invalidating your results. The standard practice is: use View Results Tree liberally during test development with a small number of threads (e.g., 1–2 users, 1 loop), then disable or delete it entirely before running the actual load test.\n\n## Summary Report\n\nSummary Report gives you a single-row-per-sampler statistical rollup: number of samples, average response time, min, max, error %, and throughput (requests/sec). It updates live as the test runs and is lightweight enough to leave enabled during real load tests, though for serious analysis most practitioners prefer generating the full HTML Dashboard Report from CLI mode instead (Part 10).\n\n## Aggregate Report — percentiles because averages lie\n\nAggregate Report is similar to Summary Report but adds percentile columns (90th, 95th, 99th) directly in the GUI table, which matters enormously for performance testing because averages lie. If 95 out of 100 requests return in 200ms but 5 take 8 seconds, your average might look like a perfectly fine ~600ms, while your 95th percentile correctly reveals that a meaningful chunk of real users are having a terrible experience. This concept — why percentiles matter more than averages in performance testing — is foundational and gets expanded fully in Part 10, but Aggregate Report is the tool you'll be staring at constantly once you get there.\n\n## Practical workflow\n\nA practical workflow pattern worth internalizing now: build and debug your test plan with View Results Tree and a tiny thread count → once it works correctly, swap to real load numbers, remove/disable View Results Tree, keep a lightweight listener like Summary Report for a live sanity check → for the actual results you'll report on, run from CLI and generate the HTML dashboard rather than relying on GUI listeners at all.",
  "blocks": [
    {
      "id": "jm-1-4-md-0",
      "type": "overview",
      "heading": "View Results Tree — debug only",
      "content": "View Results Tree is the most detailed listener: for every single sample, it shows you the full request (headers, body) and full response (status code, headers, body, timing), often color-coded green (pass) or red (fail) based on any attached assertions. This is functionally similar to inspecting a request/response pair in browser DevTools' Network tab, or to the detailed trace viewer in Playwright — enormously useful while you're building and debugging a test plan, because you can immediately see if your JSON body is malformed, your auth token didn't get substituted correctly, or the server returned a 401.\n\nHowever, View Results Tree stores the complete data for every sample in memory, which becomes catastrophic at scale — running it during a 500-user load test will balloon memory usage and can crash JMeter itself, invalidating your results. The standard practice is: use View Results Tree liberally during test development with a small number of threads (e.g., 1–2 users, 1 loop), then disable or delete it entirely before running the actual load test.",
      "order": 0
    },
    {
      "id": "jm-1-4-md-1",
      "type": "overview",
      "heading": "Summary Report",
      "content": "Summary Report gives you a single-row-per-sampler statistical rollup: number of samples, average response time, min, max, error %, and throughput (requests/sec). It updates live as the test runs and is lightweight enough to leave enabled during real load tests, though for serious analysis most practitioners prefer generating the full HTML Dashboard Report from CLI mode instead (Part 10).",
      "order": 1
    },
    {
      "id": "jm-1-4-md-2",
      "type": "overview",
      "heading": "Aggregate Report — percentiles because averages lie",
      "content": "Aggregate Report is similar to Summary Report but adds percentile columns (90th, 95th, 99th) directly in the GUI table, which matters enormously for performance testing because averages lie. If 95 out of 100 requests return in 200ms but 5 take 8 seconds, your average might look like a perfectly fine ~600ms, while your 95th percentile correctly reveals that a meaningful chunk of real users are having a terrible experience. This concept — why percentiles matter more than averages in performance testing — is foundational and gets expanded fully in Part 10, but Aggregate Report is the tool you'll be staring at constantly once you get there.",
      "order": 2
    },
    {
      "id": "jm-1-4-md-3",
      "type": "overview",
      "heading": "Practical workflow",
      "content": "A practical workflow pattern worth internalizing now: build and debug your test plan with View Results Tree and a tiny thread count → once it works correctly, swap to real load numbers, remove/disable View Results Tree, keep a lightweight listener like Summary Report for a live sanity check → for the actual results you'll report on, run from CLI and generate the HTML dashboard rather than relying on GUI listeners at all.",
      "order": 3
    }
  ],
  "advantages": [
    "1.4 Listeners (View Results Tree, Summary Report, Aggregate Report) — Leaving View Results Tree on at 500 users can crash JMeter and invalidate the run."
  ],
  "limitations": [
    "1.4 Listeners (View Results Tree, Summary Report, Aggregate Report) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
