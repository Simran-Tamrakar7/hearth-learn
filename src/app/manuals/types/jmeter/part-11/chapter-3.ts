import type { ChapterRecord } from "../../../types";

/** 11.3 Failing Builds on Performance Thresholds */
export const chapter = {
  "id": "jm-11-3-failing-builds-on-performance-thresholds",
  "title": "11.3 Failing Builds on Performance Thresholds",
  "minutes": 24,
  "level": "advanced",
  "phase": "Part 11 · CI/CD Integration",
  "partName": "Part 11 · CI/CD Integration",
  "overviewText": "Dashboards are review; gates are enforcement. Duration Assertions are coarse. CI usually fails on aggregate p95 or error rate parsed from .jtl after the run. Jenkins perfReport can threshold natively. Agree numbers with stakeholders, then treat a breach like a failed Playwright suite.",
  "why": "Optional human review of HTML is how performance regressions ship. A gate makes the Part 0 question automatic.",
  "when": "After you can generate a stable .jtl and know what 'too slow' means in ms and error %.",
  "practical": {
    "app": "results/results.jtl in CI",
    "scenario": "Fail if p95 > 2000ms or error rate > 1%.",
    "pass": "You parse elapsed/success after JMeter exits, exit 1 on breach (or Jenkins plugin thresholds).",
    "fail": "You upload a dashboard and always go green."
  },
  "tools": [],
  "customSummary": "- Goal: turn performance testing into an automatically enforced quality gate, not a manual/skippable review step.\n- Duration Assertions (Part 4) provide coarse sample-level failure signals; CI gating typically needs more precise aggregate thresholds (e.g., \"95th percentile > 2s\" or \"error rate > 1%\").\n- Commonly implemented via a post-run script parsing the .jtl file, computing percentiles/error rate (Part 10 metrics), and exiting non-zero on threshold breach to fail the pipeline.\n- Jenkins Performance Plugin supports this natively via configurable thresholds; concept is identical across implementations — define acceptable performance in numbers, enforce automatically, treat breaches like failed functional tests.",
  "contentMarkdown": "## From review to gate\n\nGenerating a dashboard and trend graphs is useful for human review, but the real power of CI integration — mirroring exactly why you already run Playwright tests in CI to catch functional regressions automatically rather than relying on someone remembering to test manually — is having the pipeline automatically fail when performance crosses an unacceptable threshold, turning performance testing from a manual, easy-to-skip review step into an enforced quality gate.\n\nJMeter supports this natively through assertions you're already familiar with — a Duration Assertion (Part 4) failing individual slow samples means the run's overall error rate will reflect performance failures, not just functional ones, so a sufficiently degraded run can already produce a non-zero exit code from the `jmeter` command itself in some configurations. But for CI purposes, a more common and more precise approach layers additional threshold-checking on top of the raw results, since \"some samples failed a Duration Assertion\" is coarser than what most teams actually want to gate on — typically something like \"fail the build if the 95th percentile exceeds 2 seconds\" or \"fail the build if error rate exceeds 1%,\" evaluated against the aggregate `.jtl` data after the run completes, not against individual samples during it.\n\n## Parse .jtl after the run\n\nThis is commonly implemented as a small script (Python, or a JSR223-adjacent Groovy script run outside JMeter itself) that parses the `.jtl` file after the test completes, computes the relevant percentile/error-rate figures (the same metrics covered in Part 10 Chapter 1), compares them against defined thresholds, and exits with a non-zero status code if any threshold is breached — which the CI platform then interprets as a failed pipeline step, blocking a merge or deployment exactly the way a failed functional test suite would.\n\n```python\nimport csv\n\np95_threshold_ms = 2000\nerror_rate_threshold = 0.01\n\nresponse_times = []\nerrors = 0\ntotal = 0\n\nwith open('results/results.jtl') as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        total += 1\n        response_times.append(int(row['elapsed']))\n        if row['success'] == 'false':\n            errors += 1\n\nresponse_times.sort()\np95 = response_times[int(len(response_times) * 0.95)]\nerror_rate = errors / total\n\nif p95 > p95_threshold_ms or error_rate > error_rate_threshold:\n    print(f\"PERFORMANCE GATE FAILED: p95={p95}ms, error_rate={error_rate:.2%}\")\n    exit(1)\n\nprint(f\"Performance gate passed: p95={p95}ms, error_rate={error_rate:.2%}\")\n```\n\nThe Jenkins Performance Plugin (Chapter 2) also supports this natively via configurable error-percentage and response-time thresholds directly in its `perfReport` step configuration, avoiding the need for a fully custom script in that specific ecosystem — but the underlying concept is identical regardless of implementation: define what \"acceptable performance\" concretely means in numbers ahead of time (ideally agreed with stakeholders, not picked arbitrarily), enforce it automatically on every relevant pipeline run, and treat a threshold breach with the same seriousness as a failed functional test, closing the loop on everything this manual has built toward — from Part 0's first question of \"what is JMeter for\" through to a fully automated, self-enforcing performance quality gate integrated directly into the software delivery process.",
  "blocks": [
    {
      "id": "jm-11-3-md-0",
      "type": "overview",
      "heading": "From review to gate",
      "content": "Generating a dashboard and trend graphs is useful for human review, but the real power of CI integration — mirroring exactly why you already run Playwright tests in CI to catch functional regressions automatically rather than relying on someone remembering to test manually — is having the pipeline automatically fail when performance crosses an unacceptable threshold, turning performance testing from a manual, easy-to-skip review step into an enforced quality gate.\n\nJMeter supports this natively through assertions you're already familiar with — a Duration Assertion (Part 4) failing individual slow samples means the run's overall error rate will reflect performance failures, not just functional ones, so a sufficiently degraded run can already produce a non-zero exit code from the `jmeter` command itself in some configurations. But for CI purposes, a more common and more precise approach layers additional threshold-checking on top of the raw results, since \"some samples failed a Duration Assertion\" is coarser than what most teams actually want to gate on — typically something like \"fail the build if the 95th percentile exceeds 2 seconds\" or \"fail the build if error rate exceeds 1%,\" evaluated against the aggregate `.jtl` data after the run completes, not against individual samples during it.",
      "order": 0
    },
    {
      "id": "jm-11-3-md-1",
      "type": "overview",
      "heading": "Parse .jtl after the run",
      "content": "This is commonly implemented as a small script (Python, or a JSR223-adjacent Groovy script run outside JMeter itself) that parses the `.jtl` file after the test completes, computes the relevant percentile/error-rate figures (the same metrics covered in Part 10 Chapter 1), compares them against defined thresholds, and exits with a non-zero status code if any threshold is breached — which the CI platform then interprets as a failed pipeline step, blocking a merge or deployment exactly the way a failed functional test suite would.\n\n```python\nimport csv\n\np95_threshold_ms = 2000\nerror_rate_threshold = 0.01\n\nresponse_times = []\nerrors = 0\ntotal = 0\n\nwith open('results/results.jtl') as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        total += 1\n        response_times.append(int(row['elapsed']))\n        if row['success'] == 'false':\n            errors += 1\n\nresponse_times.sort()\np95 = response_times[int(len(response_times) * 0.95)]\nerror_rate = errors / total\n\nif p95 > p95_threshold_ms or error_rate > error_rate_threshold:\n    print(f\"PERFORMANCE GATE FAILED: p95={p95}ms, error_rate={error_rate:.2%}\")\n    exit(1)\n\nprint(f\"Performance gate passed: p95={p95}ms, error_rate={error_rate:.2%}\")\n```\n\nThe Jenkins Performance Plugin (Chapter 2) also supports this natively via configurable error-percentage and response-time thresholds directly in its `perfReport` step configuration, avoiding the need for a fully custom script in that specific ecosystem — but the underlying concept is identical regardless of implementation: define what \"acceptable performance\" concretely means in numbers ahead of time (ideally agreed with stakeholders, not picked arbitrarily), enforce it automatically on every relevant pipeline run, and treat a threshold breach with the same seriousness as a failed functional test, closing the loop on everything this manual has built toward — from Part 0's first question of \"what is JMeter for\" through to a fully automated, self-enforcing performance quality gate integrated directly into the software delivery process.",
      "order": 1
    }
  ],
  "advantages": [
    "11.3 Failing Builds on Performance Thresholds — Optional human review of HTML is how performance regressions ship."
  ],
  "limitations": [
    "11.3 Failing Builds on Performance Thresholds is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
