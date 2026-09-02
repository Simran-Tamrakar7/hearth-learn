import type { ChapterRecord } from "../../../types";

/** 5. The Testing Pyramid & Where UI Automation Fits */
export const chapter = {
  id: "pw-5-pyramid",
  title: "5. The Testing Pyramid & Where UI Automation Fits",
  minutes: 25,
  level: "beginner",
  phase: "Part 0 · Background & Context",
  partName: "Part 0 · Background & Context",
  overviewText: "The testing pyramid places many fast unit tests at the base, fewer integration tests in the middle, and few slow UI tests at the top — Playwright belongs at the E2E peak, not as a replacement for unit tests.",
  why: "Misplacing Playwright as your only test layer creates slow, brittle suites that erode team trust.",
  when: "Read when designing test strategy or defending E2E budget to engineering leadership.",
  practical: { app: "Bizlevate HRM", scenario: "Manager wants Playwright tests for every utility function.", pass: "Redirect pure logic to unit tests; reserve Playwright for user journeys.", fail: "Write E2E tests for date-formatting helpers." },
  advantages: ["Pyramid framing justifies E2E budget with clear ROI","Unit tests catch logic bugs faster than any browser tool","Integration tests cover API contracts without UI overhead","Playwright E2E validates critical user journeys end to end","Smoke subset strategy scales pyramid top sustainably","Honest pyramid talk signals mature test-strategy thinking"],
  limitations: ["Pyramid is a model not a strict formula — context varies","Teams under-invest in unit tests despite pyramid advice","E2E tests remain inherently slower than lower layers","Over-automation at pyramid top creates maintenance burden","Stakeholders may resist anything below E2E visibility","Pyramid alone doesn't solve flaky-test culture problems"],
  tools: [],
  contentMarkdown: "## 5. The Testing Pyramid & Where UI Automation Fits\n\nUnit tests form the wide base. Fast, cheap, isolated — testing one function/method with no external dependencies (no browser, no database, no network). Because they're so fast and cheap to run, you want many of them. Integration/API tests form the middle. These test how multiple units work together, or test a service's API layer directly without a UI. Slower than unit tests, faster than UI tests — Playwright's APIRequestContext lives here. UI/E2E tests form the narrow top. These test the full system through the actual browser UI — the slowest, most expensive, and most brittle layer, since a UI test can break because of an unrelated CSS class rename, not just a real bug. This is where Playwright's browser automation primarily lives. Inverting the pyramid is a known anti-pattern. If you go heavy on UI tests and light on unit tests, you get a suite that's slow to run, expensive to maintain, and where a single small change can break dozens of tests for reasons unrelated to actual functionality — often called \"ice cream cone\" testing. Playwright is a top-of-pyramid tool by design. That's fine as long as it isn't asked to do the whole pyramid's job alone. The healthiest use is reserving it for cases that genuinely need a real browser — critical user journeys, cross-browser concerns, visual checks — not validating every possible input to a form field one at a time. Practical implication for Bizlevate. Reserve Playwright E2E tests for core critical paths (e.g., can an employee successfully submit and get approval on a leave request end-to-end) rather than trying to E2E-test every validation rule on every field — push those smaller checks to a cheaper test layer where possible.",
  customSummary: "## 5. The Testing Pyramid & Where UI Automation Fits\n\n- Unit tests (many, fast, cheap) → Integration/API tests (fewer) → UI/E2E tests (fewest, slow, brittle).\n### Inverting the pyramid = slow, fragile suites — \"ice cream cone\" anti-pattern\n- Playwright is a top-of-pyramid tool — best for critical end-to-end journeys and cross-browser/visual checks, not exhaustive field-level validation.\n- Bizlevate application: E2E-test core flows (e.g., leave-request-to-approval); push granular checks to a lower, cheaper test layer.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
