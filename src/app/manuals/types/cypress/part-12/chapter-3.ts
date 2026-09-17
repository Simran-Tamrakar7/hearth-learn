import type { ChapterRecord } from "../../../types";

/** 12.3 Flaky Test Root Causes & Fixes */
export const chapter = {
  "id": "cy-12-3-flaky-test-root-causes-fixes",
  "title": "12.3 Flaky Test Root Causes & Fixes",
  "minutes": 28,
  "level": "advanced",
  "phase": "Part 12 · Debugging & Best Practices",
  "partName": "Part 12 · Debugging & Best Practices",
  "overviewText": "Flake in Cypress almost always comes from time, isolation, data, animations, or architecture workarounds — not from 'the framework being random.' Fix with intercepts, assertions that retry, cy.session, testIsolation, unique data, clock, and honest origin/tab substitutes. Retries (10.3) without this chapter are how flake goes to production.",
  "why": "A leave spec that fails 1/10 on CI is a design bug. Root-cause language is a senior signal; 'Cypress is flaky' is not.",
  "when": "When a test is red/green on the same SHA, after adding retries, and in PR review of waits.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "leave-balance.cy.ts fails only on GitHub, always on the assertion that the balance is 8, after a previous spec created leave.",
    "pass": "You enable isolation, unique employee ids, wait on @getBalance, and you do not bump retries. You check whether the previous spec polluted state.",
    "fail": "You add cy.wait(8000) and retries: 3."
  },
  "tools": [],
  "customSummary": "- Time: assert/intercept, not sleep. Isolation: don't share drafts across tests.\n- Data: unique ids; no colliding emails in parallel (9.8).\n- Animations/overlays: assert enabled/visible; disable motion in test env.\n- Origin/tab hacks flake more — simplify (9.1–9.3).\n- Same causes exist in Playwright/Selenium; Cypress-specific is queue + iframe + session.",
  "contentMarkdown": "## A debug checklist\n\n1. **Does it fail locally at CI viewport/browser?** If no, env (CPU, TZ, video, `baseUrl`).\n2. **Does it fail in isolation** (`it.only`)? If no, order dependency / `testIsolation: false`.\n3. **Is the network involved?** Missing `cy.intercept` + `cy.wait('@alias')` *before* the action that triggers the request (Part 5).\n4. **Is the DOM covered?** Time-travel; click the overlay instead of `force: true` as a habit.\n5. **Is data unique?** Parallel shards inserting the same employee email.\n6. **Is it SSO/tab/PDF?** Architecture (Part 9) — flake is a hint you used the wrong substitute.\n\n## Fixes that match causes\n\n| Cause | Fix |\n|---|---|\n| Spinner | `.should('not.exist')` on spinner, then click |\n| Stale list length | `.should('have.length', n)` then `.last().click()` (retry wraps the should) |\n| Shared session dirt | default `testIsolation: true`; `cy.session` for login only |\n| Animation | `prefers-reduced-motion`, wait for class, avoid `force: true` |\n| Clock-dependent balance | `cy.clock` / freeze 'today' |\n| Parallel collisions | include spec+timestamp in email |\n| Video CPU | `video: false` locally in CI experiment (11.8, 12.4) |\n\n## Versus Playwright and Selenium\n\nPlaywright flake often from missing auto-wait on *non-locator* assertions, or shared context. Selenium: stale element, implicit wait. Cypress: people fight the queue with sleeps. The *product* fixes (deterministic data, testable UI) are identical.\n\nInterview line: \"I isolate the spec, then look at network, overlays, and shared data. I don't treat retries as a root cause.\"",
  "blocks": [
    {
      "id": "cy-12-3-md-0",
      "type": "overview",
      "heading": "A debug checklist",
      "content": "1. **Does it fail locally at CI viewport/browser?** If no, env (CPU, TZ, video, `baseUrl`).\n2. **Does it fail in isolation** (`it.only`)? If no, order dependency / `testIsolation: false`.\n3. **Is the network involved?** Missing `cy.intercept` + `cy.wait('@alias')` *before* the action that triggers the request (Part 5).\n4. **Is the DOM covered?** Time-travel; click the overlay instead of `force: true` as a habit.\n5. **Is data unique?** Parallel shards inserting the same employee email.\n6. **Is it SSO/tab/PDF?** Architecture (Part 9) — flake is a hint you used the wrong substitute.",
      "order": 0
    },
    {
      "id": "cy-12-3-md-1",
      "type": "overview",
      "heading": "Fixes that match causes",
      "content": "| Cause | Fix |\n|---|---|\n| Spinner | `.should('not.exist')` on spinner, then click |\n| Stale list length | `.should('have.length', n)` then `.last().click()` (retry wraps the should) |\n| Shared session dirt | default `testIsolation: true`; `cy.session` for login only |\n| Animation | `prefers-reduced-motion`, wait for class, avoid `force: true` |\n| Clock-dependent balance | `cy.clock` / freeze 'today' |\n| Parallel collisions | include spec+timestamp in email |\n| Video CPU | `video: false` locally in CI experiment (11.8, 12.4) |",
      "order": 1
    },
    {
      "id": "cy-12-3-md-2",
      "type": "overview",
      "heading": "Versus Playwright and Selenium",
      "content": "Playwright flake often from missing auto-wait on *non-locator* assertions, or shared context. Selenium: stale element, implicit wait. Cypress: people fight the queue with sleeps. The *product* fixes (deterministic data, testable UI) are identical.\n\nInterview line: \"I isolate the spec, then look at network, overlays, and shared data. I don't treat retries as a root cause.\"",
      "order": 2
    }
  ],
  "advantages": [
    "12.3 Flaky Test Root Causes & Fixes — A leave spec that fails 1/10 on CI is a design bug."
  ],
  "limitations": [
    "12.3 Flaky Test Root Causes & Fixes is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
