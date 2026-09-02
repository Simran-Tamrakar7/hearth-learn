import type { ChapterRecord } from "../../../types";

/** 28. Component Testing */
export const chapter = {
  id: "pw-28-component",
  title: "28. Component Testing",
  minutes: 35,
  level: "advanced",
  phase: "Part 4 · Advanced Techniques",
  partName: "Part 4 · Advanced Techniques",
  overviewText: "Component testing mounts a single React/Vue/Svelte component in a real browser — faster than full E2E, more realistic than pure unit tests. Playwright's @playwright/experimental-ct-* is JavaScript/TypeScript only with no Python equivalent; know the boundary when reading official docs.",
  why: "Design-system components need fast feedback on edge-case props and states. Full E2E is too slow; Jest/Vitest lacks real browser rendering. Component testing fills the middle of the pyramid.",
  when: "Use in JS/TS projects for component libraries. For Python E2E suites, rely on targeted E2E or accept component testing as a separate toolchain if the team adopts it.",
  practical: { app: "HRMS design system — Date picker component", scenario: "Test 12 calendar edge cases (leap year, disabled dates) without loading the full HRMS app.", pass: "CT mount with props; assert role-based locators in isolated browser — seconds per case.", fail: "Spin up full app + login for every date-picker variant — minutes per case." },
  advantages: ["Real browser rendering without full app boot","Same Playwright locator API as E2E","Faster feedback on component edge cases","Sits in the middle of the Testing Pyramid","Webpack/Vite integration for hot reload","Complements rather than replaces E2E"],
  limitations: ["No Python/pytest-playwright component testing API","Separate toolchain from Python E2E suite","Requires Vite bundler integration setup","Does not test cross-component integration","Mocking providers/routers adds boilerplate","Official docs skew JavaScript-first"],
  tools: [],
  contentMarkdown: "## 28. Component Testing\n\nComponent testing verifies a single UI component in isolation, without a full running application.\nRather than loading an entire page and locating a component within it, Playwright's component testing support (in JS/TS, primarily for React, Vue, and Svelte) mounts an individual component directly in a real browser and interacts with it in isolation.\n// Example shown in JS/TS, since component testing isn't available for Python\n```python\nimport { test, expect } from '@playwright/experimental-ct-react';\nimport { LoginForm } from './LoginForm';\n\ntest('shows error on empty submit', async ({ mount }) => {\n  const component = await mount(<LoginForm />);\n  await component.getByRole('button', { name: 'Log in' }).click();\n  await expect(component.getByText('Username is required')).toBeVisible();\n});\n```\n\n\nComponent testing sits below E2E on the Testing Pyramid, closer to the middle layer.\nIt's faster and more isolated than a full E2E test (no full app, no backend, no navigation), but still runs in a real browser and exercises real rendering/DOM behavior, unlike a pure unit test of a JS function. This makes it a genuinely useful middle ground for teams building component libraries or design systems, where you want confidence a component behaves correctly across many usage scenarios without paying the cost of a full E2E test for each one.\nImportant scope note for this manual: component testing is JS/TS-only.\nThis is a meaningful boundary worth being explicit about, tying back to Part 0's \"What This Manual Will NOT Cover\": Playwright's component testing feature (@playwright/experimental-ct-react, -vue, -svelte) has no Python equivalent — it depends on bundler integration (Vite) that's specific to the JS/TS frontend tooling ecosystem. If your work involves testing React/Vue components in isolation, that work happens in JS/TS regardless of the fact that your E2E suite is in Python — the two would be genuinely separate toolchains within the same overall testing strategy, not something togglable within pytest-playwright. Worth knowing this boundary exists primarily so you're not confused later if you see component testing referenced in Playwright's official docs and wonder why the Python API doesn't have it.",
  customSummary: "## 28. Component Testing\n\nMounts a single component (React/Vue/Svelte) in a real browser in isolation — faster than full E2E, more real than a pure unit test.\nSits in the middle of the Testing Pyramid — good for design-system/component-library confidence.\nJS/TS-only — no Python equivalent (@playwright/experimental-ct-* depends on Vite bundler integration); a separate toolchain from your Python E2E suite if ever needed.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
