import type { ChapterRecord } from "../../../types";

/** 10.2 Aggregate Report vs Summary Report Interpretation */
export const chapter = {
  "id": "jm-10-2-aggregate-report-vs-summary-report-interpretatio",
  "title": "10.2 Aggregate Report vs Summary Report Interpretation",
  "minutes": 20,
  "level": "advanced",
  "phase": "Part 10 · Results Analysis & Reporting",
  "partName": "Part 10 · Results Analysis & Reporting",
  "overviewText": "Summary is a live sanity glance (count, avg, min, max, error %, throughput) without percentiles. Aggregate adds 90/95/99 and is what you draw conclusions from. Read Error % first, then average vs 95/99 gap, then throughput vs intended pacing. Reopen a CLI .jtl in the GUI after the fact — that is not a live load GUI run.",
  "why": "Summary-only conclusions reintroduce the averages trap. Checking throughput vs design catches a throttled or GUI-contaminated run.",
  "when": "During a lightweight live CLI-adjacent glance, and when interpreting a finished .jtl.",
  "practical": {
    "app": "CLI results.jtl opened in a fresh GUI",
    "scenario": "Overnight soak finished; you need to read the table.",
    "pass": "You scan error % , then percentile gaps, then throughput vs Constant Throughput Timer target; you know this GUI open isn't generating load.",
    "fail": "You approve the run from Summary averages only."
  },
  "tools": [],
  "customSummary": "- Summary Report: count/average/min/max/error%/throughput — good for live sanity checks, insufficient for real conclusions (no percentiles).\n- Aggregate Report: adds percentile columns — the report to actually draw conclusions from.\n- Reading order: Error % first (investigate any anomalies) → Average vs 95th/99th gap (flags inconsistency) → Throughput vs intended pacing (confirms the designed load profile actually ran).\n- Both listeners are live views into the same .jtl file — can reopen a CLI-generated results file in GUI afterward without live-run overhead concerns.",
  "contentMarkdown": "## Summary Report — glance, not verdict\n\nPart 1 introduced these two listeners at a mechanical level; this chapter is about reading them correctly once real results are in front of you, and understanding precisely when each is (and isn't) the right tool.\n\nSummary Report gives you count, average, min, max, error %, and throughput per sampler label — a solid at-a-glance sanity check during a live run (\"is anything obviously broken, is throughput roughly where I expect\"), but its absence of percentile columns is a real limitation the moment you're doing anything beyond a rough live glance. Relying on Summary Report alone for actual conclusions risks exactly the averages-hide-outliers trap from Chapter 1 — a Summary Report showing a comfortable 340ms average tells you nothing about whether 1% of your users are sitting at 8 seconds.\n\n## Aggregate Report — the conclusion table\n\nAggregate Report adds the percentile columns (typically 90th, 95th, 99th, configurable) directly alongside the same count/average/error/throughput columns — making it the report you actually want for drawing real conclusions, not just a live sanity glance. A practical reading habit: scan the Error % column first across all sampler rows (any non-zero or unexpectedly high number is worth investigating immediately, since a broken flow makes response-time analysis moot), then compare Average vs 95th/99th percentile for each row (a large gap flags inconsistent performance worth digging into, even if the average alone looks fine), then check Throughput against what your pacing configuration (Part 8) intended, confirming the test actually generated the load profile you designed rather than something throttled or distorted by an unrelated bottleneck (including, per Part 9, JMeter's own tooling overhead if you're mistakenly still in GUI mode).\n\n## Same .jtl, after the fact\n\nBoth listeners, it's worth remembering from Part 9, are really just live views into the same underlying `.jtl` results file when running via CLI — meaning you're not limited to reading them only during a live GUI run; you can reopen a results file after the fact in a fresh GUI instance with an Aggregate Report listener pointed at that file, letting you inspect results from a CLI-executed run without having needed to watch it live, and without the GUI overhead concerns applying (since you're just rendering already-collected data, not generating new load while the GUI runs).",
  "blocks": [
    {
      "id": "jm-10-2-md-0",
      "type": "overview",
      "heading": "Summary Report — glance, not verdict",
      "content": "Part 1 introduced these two listeners at a mechanical level; this chapter is about reading them correctly once real results are in front of you, and understanding precisely when each is (and isn't) the right tool.\n\nSummary Report gives you count, average, min, max, error %, and throughput per sampler label — a solid at-a-glance sanity check during a live run (\"is anything obviously broken, is throughput roughly where I expect\"), but its absence of percentile columns is a real limitation the moment you're doing anything beyond a rough live glance. Relying on Summary Report alone for actual conclusions risks exactly the averages-hide-outliers trap from Chapter 1 — a Summary Report showing a comfortable 340ms average tells you nothing about whether 1% of your users are sitting at 8 seconds.",
      "order": 0
    },
    {
      "id": "jm-10-2-md-1",
      "type": "overview",
      "heading": "Aggregate Report — the conclusion table",
      "content": "Aggregate Report adds the percentile columns (typically 90th, 95th, 99th, configurable) directly alongside the same count/average/error/throughput columns — making it the report you actually want for drawing real conclusions, not just a live sanity glance. A practical reading habit: scan the Error % column first across all sampler rows (any non-zero or unexpectedly high number is worth investigating immediately, since a broken flow makes response-time analysis moot), then compare Average vs 95th/99th percentile for each row (a large gap flags inconsistent performance worth digging into, even if the average alone looks fine), then check Throughput against what your pacing configuration (Part 8) intended, confirming the test actually generated the load profile you designed rather than something throttled or distorted by an unrelated bottleneck (including, per Part 9, JMeter's own tooling overhead if you're mistakenly still in GUI mode).",
      "order": 1
    },
    {
      "id": "jm-10-2-md-2",
      "type": "overview",
      "heading": "Same .jtl, after the fact",
      "content": "Both listeners, it's worth remembering from Part 9, are really just live views into the same underlying `.jtl` results file when running via CLI — meaning you're not limited to reading them only during a live GUI run; you can reopen a results file after the fact in a fresh GUI instance with an Aggregate Report listener pointed at that file, letting you inspect results from a CLI-executed run without having needed to watch it live, and without the GUI overhead concerns applying (since you're just rendering already-collected data, not generating new load while the GUI runs).",
      "order": 2
    }
  ],
  "advantages": [
    "10.2 Aggregate Report vs Summary Report Interpretation — Summary-only conclusions reintroduce the averages trap."
  ],
  "limitations": [
    "10.2 Aggregate Report vs Summary Report Interpretation is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
