import type { ChapterRecord } from "../../../types";

/** 11.2 Integrating with Jenkins and GitHub Actions */
export const chapter = {
  "id": "jm-11-2-integrating-with-jenkins-and-github-actions",
  "title": "11.2 Integrating with Jenkins and GitHub Actions",
  "minutes": 22,
  "level": "advanced",
  "phase": "Part 11 · CI/CD Integration",
  "partName": "Part 11 · CI/CD Integration",
  "overviewText": "Jenkins Performance Plugin parses .jtl and draws trend graphs via perfReport. GitHub Actions typically runs the CLI then uploads the HTML dashboard artifact (or publishes to Pages/S3). The .jtl is still the source of truth; platform glue is thin.",
  "why": "Trends across builds catch slow regressions a single dashboard miss. You already know Playwright-in-CI; this is the performance twin.",
  "when": "Choosing Jenkins vs Actions for where the team already lives.",
  "practical": {
    "app": "leave_request_load_test.jmx",
    "scenario": "Surface results on the team's CI.",
    "pass": "Jenkins: sh jmeter + perfReport on the jtl. Actions: run jmeter, upload-artifact the dashboard folder.",
    "fail": "You bury results.jtl in the workspace with no artifact or plugin."
  },
  "tools": [],
  "customSummary": "- Jenkins: Performance Plugin natively parses .jtl files, renders trend graphs across builds, via a perfReport step.\n- GitHub Actions: no dominant built-in equivalent — typical pattern is running the CLI command as a step, then uploading the HTML dashboard (Part 10) as a build artifact or publishing it to static hosting.\n- The .jtl file remains the source of truth regardless of platform; platform integration is a thin surfacing layer over identical underlying JMeter work.",
  "contentMarkdown": "## Jenkins Performance Plugin\n\nBoth major CI platforms support JMeter integration, though the specific mechanics differ slightly. In Jenkins, the most common approach is the Performance Plugin, which is specifically built to parse JMeter's `.jtl` result files and render trend graphs and pass/fail thresholds directly inside the Jenkins job UI — meaning rather than just running the `jmeter` command as a raw shell step and leaving results buried in a file, Jenkins can natively visualize response-time trends across builds over time, which is genuinely valuable for spotting gradual performance regressions across many commits/releases, not just pass/fail on a single run. A typical Jenkins pipeline stage combines a shell step running the JMeter CLI command from Chapter 1 with a subsequent `perfReport` step (from the Performance Plugin) pointed at the resulting `.jtl` file.\n\n```groovy\nstage('Performance Test') {\n    steps {\n        sh 'jmeter -n -t leave_request_load_test.jmx -l results/results.jtl'\n    }\n    post {\n        always {\n            perfReport sourceDataFiles: 'results/results.jtl'\n        }\n    }\n}\n```\n\n## GitHub Actions artifacts\n\nGitHub Actions doesn't have as dominant a single built-in plugin equivalent to Jenkins' Performance Plugin, so the more common pattern is a straightforward workflow step running the JMeter CLI command directly, then a separate step uploading the generated HTML dashboard (Part 10 Chapter 3) as a build artifact, which teammates can download and open locally, or in more polished setups, publishing the dashboard to a static hosting location (an S3 bucket, GitHub Pages) so it's viewable directly from a link rather than requiring a manual download-and-unzip step.\n\n```yaml\n- name: Run JMeter Load Test\n  run: |\n    jmeter -n -t leave_request_load_test.jmx \\\n      -l results/results.jtl \\\n      -e -o results/dashboard\n\n- name: Upload Report\n  uses: actions/upload-artifact@v4\n  with:\n    name: jmeter-report\n    path: results/dashboard\n```\n\nRegardless of platform, the same underlying principle from Part 10 applies here too: the `.jtl` file is the actual source of truth, and both the Jenkins Performance Plugin and a GitHub Actions artifact upload are just different ways of surfacing that same underlying data to the people who need to review it — meaning the core JMeter-specific work (building the test plan, choosing thread counts and pacing appropriate for a CI context, structuring assertions correctly) is identical regardless of which CI platform your team happens to use, and the platform-specific integration work is comparatively a thin, mechanical layer on top.",
  "blocks": [
    {
      "id": "jm-11-2-md-0",
      "type": "overview",
      "heading": "Jenkins Performance Plugin",
      "content": "Both major CI platforms support JMeter integration, though the specific mechanics differ slightly. In Jenkins, the most common approach is the Performance Plugin, which is specifically built to parse JMeter's `.jtl` result files and render trend graphs and pass/fail thresholds directly inside the Jenkins job UI — meaning rather than just running the `jmeter` command as a raw shell step and leaving results buried in a file, Jenkins can natively visualize response-time trends across builds over time, which is genuinely valuable for spotting gradual performance regressions across many commits/releases, not just pass/fail on a single run. A typical Jenkins pipeline stage combines a shell step running the JMeter CLI command from Chapter 1 with a subsequent `perfReport` step (from the Performance Plugin) pointed at the resulting `.jtl` file.\n\n```groovy\nstage('Performance Test') {\n    steps {\n        sh 'jmeter -n -t leave_request_load_test.jmx -l results/results.jtl'\n    }\n    post {\n        always {\n            perfReport sourceDataFiles: 'results/results.jtl'\n        }\n    }\n}\n```",
      "order": 0
    },
    {
      "id": "jm-11-2-md-1",
      "type": "overview",
      "heading": "GitHub Actions artifacts",
      "content": "GitHub Actions doesn't have as dominant a single built-in plugin equivalent to Jenkins' Performance Plugin, so the more common pattern is a straightforward workflow step running the JMeter CLI command directly, then a separate step uploading the generated HTML dashboard (Part 10 Chapter 3) as a build artifact, which teammates can download and open locally, or in more polished setups, publishing the dashboard to a static hosting location (an S3 bucket, GitHub Pages) so it's viewable directly from a link rather than requiring a manual download-and-unzip step.\n\n```yaml\n- name: Run JMeter Load Test\n  run: |\n    jmeter -n -t leave_request_load_test.jmx \\\n      -l results/results.jtl \\\n      -e -o results/dashboard\n\n- name: Upload Report\n  uses: actions/upload-artifact@v4\n  with:\n    name: jmeter-report\n    path: results/dashboard\n```\n\nRegardless of platform, the same underlying principle from Part 10 applies here too: the `.jtl` file is the actual source of truth, and both the Jenkins Performance Plugin and a GitHub Actions artifact upload are just different ways of surfacing that same underlying data to the people who need to review it — meaning the core JMeter-specific work (building the test plan, choosing thread counts and pacing appropriate for a CI context, structuring assertions correctly) is identical regardless of which CI platform your team happens to use, and the platform-specific integration work is comparatively a thin, mechanical layer on top.",
      "order": 1
    }
  ],
  "advantages": [
    "11.2 Integrating with Jenkins and GitHub Actions — Trends across builds catch slow regressions a single dashboard miss."
  ],
  "limitations": [
    "11.2 Integrating with Jenkins and GitHub Actions is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
