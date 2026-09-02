import type { ChapterRecord } from "../../../types";

/** 62. Sample Data & Practice Sites */
export const chapter = {
  id: "pw-62-practice",
  title: "62. Sample Data & Practice Sites",
  minutes: 20,
  level: "beginner",
  phase: "Part 8 · Resources",
  partName: "Part 8 · Resources",
  overviewText: "practice.expandtesting.com, the-internet.herokuapp.com, saucedemo.com, and Playwright's own demo sites for hands-on exercises without risking production apps.",
  why: "Practicing on dedicated sandbox sites lets you break things freely. Production apps restrict destructive test scenarios.",
  when: "Use for capstone practice and interview take-home assignments when no company app available.",
  practical: { app: "Learning exercises", scenario: "Need login + CRUD practice site for portfolio capstone.", pass: "Sauce Demo for E2E flows; expandtesting for specific widgets; document chosen site in README.", fail: "Practice against employer production staging without permission." },
  advantages: ["Public sites require no local app setup","Sauce Demo provides full e-commerce flow for capstone","the-internet.herokuapp covers iframes, alerts, drag-drop","expandtesting adds dynamic elements and API pages","Playwright demo site matches official doc examples","Free — no API key or account for basic practice"],
  limitations: ["Public sites change or go offline without notice","Shared sites may be slow or rate-limited during peak use","Not representative of real enterprise app complexity","Some sites prohibit automated load testing","Portfolio reviewers recognize common demo sites","Cannot practice destructive data scenarios on shared sandboxes"],
  tools: [],
  contentMarkdown: "## Sample Data & Practice Sites\n\nPublic practice sites are the standard way to practice Playwright techniques without needing a real application available. Well-known publicly available demo/practice sites (intentionally built with test automation practice in mind, including deliberately tricky elements — dynamic content, iframes, shadow DOM, flaky-by-design elements) are the standard sandbox for trying out a new technique from this manual in isolation before applying it to real Bizlevate work, without any risk of affecting a real application or needing real credentials.\n\nPlaywright's own documentation examples and test suite are themselves a legitimate practice/reference source. Since Playwright is open-source (Part 0, Chapter 0), its own end-to-end test suite (used to test Playwright itself) is public and demonstrates real, production-grade usage patterns directly from the team that built the tool — a genuinely under-used resource for seeing advanced patterns in context rather than in a simplified tutorial snippet.\n\nBuilding a small local practice app is worth it specifically for scenarios public practice sites don't cover well. Public practice sites are good for general locator/interaction practice but rarely replicate domain-specific scenarios (an approval-chain workflow, a payroll calculation) — for practicing patterns specific to your actual work context (RBAC across HR roles, a multi-step leave-approval flow), a small local mock app (even a simple one built quickly) that mirrors Bizlevate's actual domain logic is more valuable practice than a generic public site, precisely because it exercises the same kind of business logic you'll actually be testing.",
  customSummary: "## Sample Data & Practice Sites\n\nPublic test-automation practice sites (dynamic content, iframes, shadow DOM, deliberately flaky elements) are the standard sandbox for isolated technique practice.\nPlaywright's own open-source end-to-end test suite is an under-used, production-grade reference.\nA small local mock app mirroring real domain logic (RBAC across HR roles, approval chains) is more valuable than generic public sites for Bizlevate-specific practice.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
