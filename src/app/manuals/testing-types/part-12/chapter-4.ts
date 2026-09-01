import type { ChapterRecord } from "../../types";

/** Visual Regression Testing */
export const chapter = {
  "id": "tt-visual-regression-testing",
  "overlayNo": 48,
  "title": "Visual Regression Testing",
  "minutes": 25,
  "level": "intermediate",
  "phase": "Part 12 · Code Quality, Techniques & Visual UI",
  "partName": "Part 12 · Code Quality, Techniques & Visual UI",
  "overviewText": "Visual regression testing captures screenshots of an application's UI and automatically compares them against a previously approved baseline, flagging any pixel-level (or perceptually meaningful) visual differences — catching unintended appearance changes that functional tests, which only check behavior, would never notice.",
  "why": "A code change can leave every functional test green — every button still clicks, every form still submits — while silently breaking the visual appearance: a CSS change bleeds into an unrelated component, a font fails to load, spacing shifts unexpectedly. These are real, user-visible defects that pure functional testing structurally cannot detect, since functionality and appearance are genuinely separate concerns.",
  "when": "On every UI-affecting change, ideally in CI on every pull request — most valuable specifically for shared components and design-system elements, where an unintended visual change can silently ripple across many pages that all depend on that one shared piece.",
  "practical": {
    "app": "HRMS Shared Button Component",
    "scenario": "A shared <Button> component used across dozens of pages in the HRMS has its default padding changed as part of an unrelated ticket.",
    "pass": "The team confirms the padding change was actually intentional and desired everywhere, approves the new baseline across all 23 scenarios at once, and the visual regression suite now reflects the updated, intended design.",
    "fail": "BackstopJS flags visual differences across 23 different pages/scenarios that all use the shared component — a change intended for one specific screen unintentionally affected every page using that component, caught immediately rather than discovered piecemeal by users."
  },
  "advantages": [
    "Catches purely visual regressions that no functional test, however thorough, would ever detect",
    "Percy integrates directly into existing Playwright/Cypress suites without writing new test flows",
    "BackstopJS is fully free and self-hosted, with zero account or usage-tier limits",
    "Invaluable for design systems and shared UI component libraries"
  ],
  "limitations": [
    "Requires an established, deliberately maintained baseline to avoid constant noisy diffs",
    "Every intentional design change requires updating and approving the new baseline",
    "Sensitive to font rendering differences across different CI host OS environments unless containerized",
    "Doesn't verify backend functional correctness — pairs with, not replaces, functional testing"
  ],
  "tools": [
    {
      "name": "Percy by BrowserStack",
      "sub": "Cloud Automated Visual Review & PR Diff Platform",
      "url": "https://percy.io",
      "desc": "A visual review platform that integrates with existing test suites (Selenium, Cypress, Playwright) to automatically capture screenshots during test runs and compare them against an approved baseline, presenting visual diffs for review directly in pull requests.",
      "adv": [
        "Zero-friction SDK integration (`percySnapshot(page, 'Name')`) into existing test suites",
        "Automated visual rendering across Chrome, Firefox, Edge, and Safari at multiple breakpoints",
        "Direct GitHub/GitLab PR integration with visual approval check gates"
      ],
      "lim": [
        "Free tier provides 5,000 visual snapshots per month"
      ],
      "steps": [
        {
          "t": "Step 1 — Install Percy Playwright SDK",
          "p": "Add @percy/playwright to project dependencies.",
          "c": "npm install --save-dev @percy/cli @percy/playwright"
        },
        {
          "t": "Step 2 — Add visual snapshots into existing Playwright tests",
          "p": "Trigger DOM snapshot upload at key UI states.",
          "c": "import percySnapshot from '@percy/playwright';\n\ntest('Visual regression check on dashboard', async ({ page }) => {\n  await page.goto('/dashboard');\n  await percySnapshot(page, 'HRMS Dashboard Home', { widths: [375, 768, 1280] });\n});"
        },
        {
          "t": "Step 3 — Run test suite with Percy CLI in CI",
          "p": "Execute tests and upload DOM assets for rendering.",
          "c": "npx percy exec -- npx playwright test"
        },
        {
          "t": "Step 4 — Review visual diffs on GitHub PR",
          "p": "Inspect highlighted pixel changes and click 'Approve' to set new baseline.",
          "c": "Percy Bot: 1 visual change detected in 'HRMS Dashboard Home' (1280px)\nDiff: Navigation sidebar padding shifted by 8px\nAction: Approved by Lead Designer"
        }
      ]
    },
    {
      "name": "BackstopJS",
      "sub": "Open-Source Self-Hosted Visual Regression Engine",
      "url": "https://github.com/garris/BackstopJS",
      "desc": "A free, open-source visual regression tool that's fully self-hosted (no account or paid tier needed at all) — captures screenshots at defined breakpoints/scenarios and generates an HTML report highlighting pixel differences against a saved reference set.",
      "adv": [
        "100% free and open-source with unlimited local/CI runs",
        "Config-driven scenarios (`backstop.json`) without writing complex test scripts",
        "Runs inside official Docker container to eliminate cross-platform font rendering diffs"
      ],
      "lim": [
        "Requires hosting and managing reference image files in Git or S3"
      ],
      "steps": [
        {
          "t": "Step 1 — Initialize BackstopJS configuration",
          "p": "Generate backstop.json specifying viewports and URLs.",
          "c": "npx backstop init"
        },
        {
          "t": "Step 2 — Create reference baseline screenshots",
          "p": "Capture initial golden master screenshots across viewports.",
          "c": "npx backstop reference"
        },
        {
          "t": "Step 3 — Execute visual regression test against modified code",
          "p": "Capture new screenshots and compare against reference images.",
          "c": "npx backstop test\nReport: 22 passed, 1 failed (Shared button component padding altered)"
        },
        {
          "t": "Step 4 — Approve intentional visual updates",
          "p": "Promote new screenshots to become the updated reference baseline.",
          "c": "npx backstop approve"
        }
      ]
    }
  ],
  "contentMarkdown": "## Pixel-Level Snapshot Baseline Comparison\n\nCapture viewport screenshots of components across breakpoints and assert zero unexpected pixel variations.\n\n```\nnpx backstop test\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
