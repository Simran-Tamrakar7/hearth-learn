import type { ChapterRecord } from "../../../types";

/** 11.8 Artifacts: Screenshots & Videos on Failure */
export const chapter = {
  "id": "cy-11-8-artifacts-screenshots-videos-on-failure",
  "title": "11.8 Artifacts: Screenshots & Videos on Failure",
  "minutes": 22,
  "level": "advanced",
  "phase": "Part 11 · CI/CD Integration",
  "partName": "Part 11 · CI/CD Integration",
  "overviewText": "On cypress run, failed tests can write PNGs (screenshotOnRunFailure, still default true) and MP4s (video — default false since Cypress 13). Upload those folders as CI artifacts. They are not Trace Viewer. Blackout PII (9.15). Keep video on failure-only if your Cypress version supports it, or delete passing videos to save storage.",
  "why": "Without artifacts, a CI-only failure is a stack trace. With unbounded videos, the GitHub artifact budget explodes. Both are preventable.",
  "when": "The first green CI job, and when a PM asks for a recording of the failed payroll run.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "Failed specs on GitHub must attach screenshots; videos only when a test failed, without uploading 2GB of green runs.",
    "pass": "You enable screenshotOnRunFailure, set video true (or retain-on-failure if available), upload cypress/screenshots and cypress/videos, and you know Cypress 13 changed the video default to false.",
    "fail": "You assume videos always record, or you look for a trace.zip in the artifact zip."
  },
  "tools": [],
  "customSummary": "- Screenshots on failure: on by default; folder cypress/screenshots.\n- Videos: set video: true explicitly after Cypress 13; watch disk/CPU (12.4).\n- Upload as GitHub/GitLab artifacts; not a Trace Viewer zip (9.12).\n- Blackout payroll PII; restrict artifact access.\n- Playwright: screenshot/video/trace are separate retain-on-failure flags — Cypress video is cruder.",
  "contentMarkdown": "## Config\n\n```js\nexport default defineConfig({\n  screenshotOnRunFailure: true,\n  screenshotsFolder: 'cypress/screenshots',\n  video: true,\n  videoCompression: 32,\n  videosFolder: 'cypress/videos',\n});\n```\n\n**Cypress 13:** `video` default became `false`. Tutorials that say \"CI always has video\" are stale. Set it if you want it.\n\nIf your version supports retaining videos only on failure, prefer that. Otherwise delete `cypress/videos` for passing specs in a CI step, or accept the storage bill.\n\n## GitHub upload\n\n```yaml\n- uses: actions/upload-artifact@v4\n  if: failure()\n  with:\n    name: cypress-artifacts\n    path: |\n      cypress/screenshots\n      cypress/videos\n```\n\n`if: failure()` still uploads when the Cypress step failed *if* you place this step correctly (often `if: always()` after the test step so you get artifacts even when the job is red — use `always()` + a small retention).\n\n## Not traces\n\nA video is a camera pointed at the browser. You cannot click a command to restore DOM. Cloud Replay (11.3) is closer. Playwright `trace.zip` is closer still (9.12).\n\n## Versus Playwright and Selenium\n\nPlaywright: `screenshot: 'only-on-failure'`, `video: 'retain-on-failure'`, `trace: 'retain-on-failure'` — three knobs. Selenium vendors: session video. Cypress: screenshot + optional video, plugin for visual diff (9.6).\n\nInterview line: \"I upload screenshots always-on-failure. I turn videos on explicitly because Cypress 13 defaulted them off. There is no trace.zip.\"",
  "blocks": [
    {
      "id": "cy-11-8-md-0",
      "type": "overview",
      "heading": "Config",
      "content": "```js\nexport default defineConfig({\n  screenshotOnRunFailure: true,\n  screenshotsFolder: 'cypress/screenshots',\n  video: true,\n  videoCompression: 32,\n  videosFolder: 'cypress/videos',\n});\n```\n\n**Cypress 13:** `video` default became `false`. Tutorials that say \"CI always has video\" are stale. Set it if you want it.\n\nIf your version supports retaining videos only on failure, prefer that. Otherwise delete `cypress/videos` for passing specs in a CI step, or accept the storage bill.",
      "order": 0
    },
    {
      "id": "cy-11-8-md-1",
      "type": "overview",
      "heading": "GitHub upload",
      "content": "```yaml\n- uses: actions/upload-artifact@v4\n  if: failure()\n  with:\n    name: cypress-artifacts\n    path: |\n      cypress/screenshots\n      cypress/videos\n```\n\n`if: failure()` still uploads when the Cypress step failed *if* you place this step correctly (often `if: always()` after the test step so you get artifacts even when the job is red — use `always()` + a small retention).",
      "order": 1
    },
    {
      "id": "cy-11-8-md-2",
      "type": "overview",
      "heading": "Not traces",
      "content": "A video is a camera pointed at the browser. You cannot click a command to restore DOM. Cloud Replay (11.3) is closer. Playwright `trace.zip` is closer still (9.12).",
      "order": 2
    },
    {
      "id": "cy-11-8-md-3",
      "type": "overview",
      "heading": "Versus Playwright and Selenium",
      "content": "Playwright: `screenshot: 'only-on-failure'`, `video: 'retain-on-failure'`, `trace: 'retain-on-failure'` — three knobs. Selenium vendors: session video. Cypress: screenshot + optional video, plugin for visual diff (9.6).\n\nInterview line: \"I upload screenshots always-on-failure. I turn videos on explicitly because Cypress 13 defaulted them off. There is no trace.zip.\"",
      "order": 3
    }
  ],
  "advantages": [
    "11.8 Artifacts: Screenshots & Videos on Failure — Without artifacts, a CI-only failure is a stack trace."
  ],
  "limitations": [
    "11.8 Artifacts: Screenshots & Videos on Failure is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
