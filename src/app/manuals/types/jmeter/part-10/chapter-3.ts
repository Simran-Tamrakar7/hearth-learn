import type { ChapterRecord } from "../../../types";

/** 10.3 Generating HTML Dashboard Reports (CLI + -e -o) */
export const chapter = {
  "id": "jm-10-3-generating-html-dashboard-reports-cli-e-o",
  "title": "10.3 Generating HTML Dashboard Reports (CLI + -e -o)",
  "minutes": 22,
  "level": "advanced",
  "phase": "Part 10 · Results Analysis & Reporting",
  "partName": "Part 10 · Results Analysis & Reporting",
  "overviewText": "The shareable artifact is the HTML dashboard from -e -o (or jmeter -g results.jtl -o folder after the fact). APDEX, over-time graphs, active threads (confirms the Part 8 shape), per-transaction tables. Standard workflow: GUI debug → CLI .jtl → dashboard deliverable; GUI listeners for deep dives only.",
  "why": "Clients don't install JMeter. Regenerating a dashboard after a soak avoids rerunning hours. Active-threads graph is how you prove ramp/hold/down actually happened.",
  "when": "End of every serious run; when APDEX thresholds in user.properties change.",
  "practical": {
    "app": "Overnight soak .jtl",
    "scenario": "You want a dashboard with adjusted APDEX without repeating the soak.",
    "pass": "You run jmeter -g results.jtl -o report_folder; you archive the HTML; you don't rerun 8 hours for a graph tweak.",
    "fail": "You screenshot Summary Report from a GUI load run and call it the report."
  },
  "tools": [],
  "customSummary": "- jmeter -n -t plan.jmx -l results.jtl -e -o /report_folder produces a shareable, self-contained HTML dashboard — no JMeter installation needed to view it.\n- Includes APDEX score, response time distribution, throughput-over-time, active-threads-over-time (visually confirms ramp-up/steady-state/ramp-down profile), per-transaction tables.\n- jmeter -g results.jtl -o /report_folder regenerates the report from an existing .jtl after the fact — no need to rerun the test, useful for long soak tests or adjusted report settings.\n- Standard end-to-end workflow: GUI debug (minimal threads) → CLI execution (possibly distributed) → .jtl output → HTML dashboard as the actual deliverable, with GUI listeners reserved for ad-hoc deep-dives.",
  "contentMarkdown": "## Dashboard as the deliverable\n\nWhile GUI listeners are useful for both live sanity checks and after-the-fact inspection of a results file, the standard artifact for genuinely presenting and archiving load test results — especially anything you'd share with a team, a client, or keep as a historical record to compare against future runs — is JMeter's built-in HTML Dashboard Report, generated via the `-e -o` flags introduced in Part 9 Chapter 2.\n\n```bash\njmeter -n -t test_plan.jmx -l results.jtl -e -o /path/to/report_folder\n```\n\nRunning this produces a self-contained folder of HTML, CSS, and JS files that, when opened in a browser, present a polished, graphical summary of the entire test run — without needing JMeter itself open at all, making it easy to share with someone who has no JMeter installed. The dashboard includes an APDEX (Application Performance Index) score (a standardized single-number satisfaction metric based on configurable response-time thresholds), response time distribution graphs, throughput-over-time graphs, active-threads-over-time graphs (useful for visually confirming your ramp-up/steady-state/ramp-down profile from Part 8 actually executed as designed), and per-transaction statistics tables mirroring Aggregate Report's data but in a more presentation-ready format.\n\n## Generate later from .jtl\n\nIt's also possible to generate this report from an existing `.jtl` file after the fact, without rerunning the test, using a slightly different flag combination:\n\n```bash\njmeter -g results.jtl -o /path/to/report_folder\n```\n\nThis `-g` (generate-only) mode is genuinely useful in practice — for instance, if you ran a long CLI test overnight and only afterward decide exactly how you want to structure or re-generate the report, or if you want to regenerate a dashboard with different report-generation properties (like custom APDEX thresholds set in `user.properties`) without repeating the actual load generation, which for a long soak test (Part 8) could mean not having to wait hours again just to get a differently-configured report.\n\n## End-to-end pattern\n\nA closing practical note connecting this back to real workflow: the standard end-to-end pattern for any serious JMeter test — validated across this entire manual — is build and debug in GUI mode with minimal threads (Part 2), scale to real load and execute via CLI, potentially distributed (Part 9), direct output to a `.jtl` file, then generate the HTML dashboard from that file as the actual deliverable you review, present, and archive — with GUI listeners like Aggregate Report reserved for ad-hoc deeper digging into a specific result file when the dashboard's summary view raises a question worth investigating further (a slow transaction you want to inspect at the individual-sample level, for instance, which the HTML dashboard's aggregated view won't show you as granularly as reopening the `.jtl` in a GUI listener would).",
  "blocks": [
    {
      "id": "jm-10-3-md-0",
      "type": "overview",
      "heading": "Dashboard as the deliverable",
      "content": "While GUI listeners are useful for both live sanity checks and after-the-fact inspection of a results file, the standard artifact for genuinely presenting and archiving load test results — especially anything you'd share with a team, a client, or keep as a historical record to compare against future runs — is JMeter's built-in HTML Dashboard Report, generated via the `-e -o` flags introduced in Part 9 Chapter 2.\n\n```bash\njmeter -n -t test_plan.jmx -l results.jtl -e -o /path/to/report_folder\n```\n\nRunning this produces a self-contained folder of HTML, CSS, and JS files that, when opened in a browser, present a polished, graphical summary of the entire test run — without needing JMeter itself open at all, making it easy to share with someone who has no JMeter installed. The dashboard includes an APDEX (Application Performance Index) score (a standardized single-number satisfaction metric based on configurable response-time thresholds), response time distribution graphs, throughput-over-time graphs, active-threads-over-time graphs (useful for visually confirming your ramp-up/steady-state/ramp-down profile from Part 8 actually executed as designed), and per-transaction statistics tables mirroring Aggregate Report's data but in a more presentation-ready format.",
      "order": 0
    },
    {
      "id": "jm-10-3-md-1",
      "type": "overview",
      "heading": "Generate later from .jtl",
      "content": "It's also possible to generate this report from an existing `.jtl` file after the fact, without rerunning the test, using a slightly different flag combination:\n\n```bash\njmeter -g results.jtl -o /path/to/report_folder\n```\n\nThis `-g` (generate-only) mode is genuinely useful in practice — for instance, if you ran a long CLI test overnight and only afterward decide exactly how you want to structure or re-generate the report, or if you want to regenerate a dashboard with different report-generation properties (like custom APDEX thresholds set in `user.properties`) without repeating the actual load generation, which for a long soak test (Part 8) could mean not having to wait hours again just to get a differently-configured report.",
      "order": 1
    },
    {
      "id": "jm-10-3-md-2",
      "type": "overview",
      "heading": "End-to-end pattern",
      "content": "A closing practical note connecting this back to real workflow: the standard end-to-end pattern for any serious JMeter test — validated across this entire manual — is build and debug in GUI mode with minimal threads (Part 2), scale to real load and execute via CLI, potentially distributed (Part 9), direct output to a `.jtl` file, then generate the HTML dashboard from that file as the actual deliverable you review, present, and archive — with GUI listeners like Aggregate Report reserved for ad-hoc deeper digging into a specific result file when the dashboard's summary view raises a question worth investigating further (a slow transaction you want to inspect at the individual-sample level, for instance, which the HTML dashboard's aggregated view won't show you as granularly as reopening the `.jtl` in a GUI listener would).",
      "order": 2
    }
  ],
  "advantages": [
    "10.3 Generating HTML Dashboard Reports (CLI + -e -o) — Clients don't install JMeter."
  ],
  "limitations": [
    "10.3 Generating HTML Dashboard Reports (CLI + -e -o) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
