import type { ChapterRecord } from "../../../types";

/** 52. Books & Long-Form Reading */
export const chapter = {
  "id": "pw-8-books",
  "title": "52. Books & Long-Form Reading",
  "minutes": 20,
  "level": "reference",
  "phase": "Part 8 · Resources",
  "partName": "Part 8 · Resources",
  "overviewText": "Books and long-form reading provide the deepest, most structured foundation for Playwright and Python test automation — far beyond what a single tutorial or blog post can cover. Unlike quick-reference docs that answer \"how do I call this API,\" books explain the why behind fixture design, page-object patterns, flaky-test diagnosis, and framework architecture. For QA engineers building a Playwright career, long-form reading fills gaps that hands-on coding alone cannot: design patterns that prevent suite rot, pytest internals that explain mysterious fixture behaviour, and case studies from teams who migrated at scale. The resources listed here span Playwright-adjacent Python testing (pytest), idiomatic Python for cleaner framework code, general test-automation architecture, and real-world migration narratives from engineering teams.",
  "why": "Playwright's official docs excel at API reference but rarely teach how to structure a 500-test suite that survives team turnover. Books and whitepapers fill that gap with curated narratives, worked examples, and architectural guidance that take hours to extract from scattered blog posts. A QA engineer who reads \"Python Testing with pytest\" before writing their tenth fixture understands scope, parametrization, and conftest.py conventions that prevent the suite from becoming unmaintainable. Long-form case studies from companies that migrated to Playwright at scale reveal pitfalls — flaky CI, locator strategy mistakes, sharding trade-offs — that you will not encounter until month six of a real project.",
  "when": "Reach for books during onboarding to a new Playwright role, before designing framework architecture for a greenfield project, or when your suite has grown past ~50 tests and patterns feel ad hoc. Read architecture and design-pattern books when proposing a Page Object Model or fixture strategy to engineering leadership. Review migration case studies when evaluating Playwright against Selenium or Cypress for a team-wide tooling decision. Revisit long-form material after major Playwright version bumps to understand breaking changes in context, not just from a changelog.",
  "practical": {
    "app": "QA career — First Playwright framework lead role",
    "scenario": "You join a mid-size product team as the first dedicated automation engineer. The existing suite is twelve pytest files with duplicated login code and no POM. Before proposing a refactor, you read \"Python Testing with pytest\" (fixtures, conftest.py) and a test-automation architecture book (POM, layered design). You draft a framework proposal citing patterns from both books and a whitepaper from a company that migrated 800 Selenium tests to Playwright.",
    "pass": "Engineering leadership approves a phased refactor because your proposal references proven patterns, not personal preference. New hires onboard faster using the book's fixture conventions as team standards.",
    "fail": "You copy-paste locator strings into every test file. Six months later the suite is flaky, nobody understands conftest.py, and leadership questions whether Playwright was the right choice — with no architectural reference to justify a structured fix."
  },
  "advantages": [
    "Provides deep, curated explanations of patterns that scattered tutorials only touch superficially",
    "Case studies and whitepapers offer evidence for tooling decisions when pitching Playwright to stakeholders",
    "Books on pytest and Python idioms directly improve the quality of Playwright framework code",
    "Long-form reading builds vocabulary and mental models that make official docs faster to navigate",
    "Architecture books transfer across tools — POM and fixture design apply whether you use Playwright, Cypress, or Selenium"
  ],
  "limitations": [
    "Books lag behind Playwright's release cadence — always cross-check API details against current official docs",
    "No Playwright-specific book covers every binding, CI integration, and cloud runner combination your team uses",
    "Reading without hands-on practice produces false confidence — pair every chapter with a small exercise in your own repo",
    "Whitepapers from large companies may describe setups (dedicated infra teams, custom sharding) that do not map to smaller QA teams",
    "General architecture books can over-engineer solutions for a team of two automation engineers"
  ],
  "tools": [
    {
      "name": "Python Testing with pytest",
      "sub": "Brian Okken",
      "url": "https://pytest.org",
      "desc": "The foundational pytest book for any Python Playwright engineer. Brian Okken explains fixtures, parametrization, conftest.py, markers, and plugins in depth — every concept maps directly to how pytest-playwright tests are structured. Reading this before writing your twentieth test prevents the most common fixture-scope mistakes and teaches patterns for shared browser setup, test data factories, and CLI customization that appear throughout this manual.",
      "adv": [
        "Directly applicable to every pytest-playwright project — not a generic testing theory book",
        "Clear explanations of fixture scopes that prevent cross-test interference in browser suites",
        "Covers plugins and CLI flags your CI pipeline will eventually need"
      ],
      "lim": [
        "Does not cover Playwright browser APIs — pair with official Playwright docs for page, locator, and trace topics",
        "Examples use non-browser code; you must translate patterns to page fixtures yourself",
        "Second edition may not reflect the newest pytest 8.x features — verify against release notes"
      ],
      "steps": [
        {
          "t": "Step 1 — Read Part I (Getting Started) alongside your first Playwright test",
          "p": "Run the examples in a scratch repo while reading:",
          "c": "pip install pytest pytest-playwright\nplaywright install\n# Write test_homepage(page) while reading about test discovery"
        },
        {
          "t": "Step 2 — Apply fixture patterns from Part II to conftest.py",
          "p": "Refactor duplicated login into a yield-based fixture:",
          "c": "@pytest.fixture\ndef logged_in_page(page):\n    page.goto('/login')\n    # ... login steps ...\n    yield page\n    # teardown runs even on failure"
        },
        {
          "t": "Step 3 — Use parametrization for cross-browser smoke tests",
          "p": "Replace three copy-pasted tests with one parametrized test:",
          "c": "@pytest.mark.parametrize('path', ['/dashboard', '/settings', '/reports'])\ndef test_page_loads(logged_in_page, path):\n    logged_in_page.goto(path)\n    expect(logged_in_page).not_to_have_title('Error')"
        }
      ]
    },
    {
      "name": "Fluent Python",
      "sub": "Luciano Ramalho",
      "url": "https://www.oreilly.com/library/view/fluent-python-2nd/9781098113408/",
      "desc": "Not a testing book — but the best resource for writing cleaner, more idiomatic Python in your Playwright framework layer. Covers iterators, dataclasses, type hints, context managers, and descriptors that make page objects, test data builders, and custom fixtures more readable and maintainable. QA engineers who only know \"enough Python to write tests\" benefit enormously from the chapters on functions as objects and class design.",
      "adv": [
        "Improves framework code quality — page objects, helpers, and fixtures become more Pythonic",
        "Type hints make large Playwright suites easier to navigate in IDEs",
        "Teaches patterns (dataclasses, enums) useful for test data and configuration"
      ],
      "lim": [
        "Long book — prioritize chapters on functions, classes, and type hints for immediate QA impact",
        "No testing or Playwright content",
        "Advanced topics (metaclasses, descriptors) are rarely needed in typical automation frameworks"
      ],
      "steps": [
        {
          "t": "Step 1 — Add type hints to your page object classes",
          "p": "After reading the type-hint chapters, annotate locators and return types:",
          "c": "from playwright.sync_api import Page, Locator\n\nclass LoginPage:\n    def __init__(self, page: Page) -> None:\n        self.page = page\n\n    def username_field(self) -> Locator:\n        return self.page.get_by_label('Username')"
        },
        {
          "t": "Step 2 — Replace dict-based test data with dataclasses",
          "p": "Use dataclasses for employee or order fixtures:",
          "c": "from dataclasses import dataclass\n\n@dataclass\nclass TestUser:\n    username: str\n    password: str\n    role: str = 'employee'"
        }
      ]
    },
    {
      "name": "Test Automation Architecture Books",
      "sub": "POM & design patterns",
      "url": "https://martinfowler.com/bliki/PageObject.html",
      "desc": "General test-automation architecture resources — Martin Fowler's Page Object bliki, \"Experiences of Test Automation\" (Dot Graham et al.), and similar titles — teach patterns that transfer directly to Playwright Python suites. Page Object Model, layered architecture (tests → workflows → page objects → locators), and separation of test data from test logic are tool-agnostic. These books help you justify framework structure to developers and avoid the anti-pattern of 200-line test functions with inline locators.",
      "adv": [
        "Patterns apply regardless of Playwright, Selenium, or Cypress",
        "Provides vocabulary for code reviews and architecture discussions with developers",
        "Case studies show what breaks at scale — exactly when your suite is growing"
      ],
      "lim": [
        "Examples often use Java or C# — mentally translate to Python",
        "Some patterns (heavy abstraction layers) are overkill for small teams",
        "Published before Playwright existed — does not address auto-waiting or trace viewer"
      ],
      "steps": [
        {
          "t": "Step 1 — Map your current tests to Fowler's Page Object definition",
          "p": "Identify tests with inline locators that belong in page objects:",
          "c": "# Before (inline):\ndef test_checkout(page):\n    page.get_by_role('button', name='Add to cart').click()\n\n# After (POM):\ndef test_checkout(cart_page):\n    cart_page.add_item('Widget')\n    cart_page.proceed_to_checkout()"
        },
        {
          "t": "Step 2 — Document your layering decision for the team",
          "p": "Create a one-page ADR (Architecture Decision Record) citing the pattern source:",
          "c": "# ADR: Page Object Model for Playwright suite\n# Context: 80+ tests, 3 authors\n# Decision: tests -> workflow helpers -> page objects -> locators\n# Reference: Fowler Page Object, Okken pytest fixtures"
        }
      ]
    },
    {
      "name": "Migration Case Studies & Whitepapers",
      "sub": "Industry reports",
      "url": "https://playwright.dev",
      "desc": "Whitepapers and engineering blog posts from companies that migrated to Playwright at scale — often published on company engineering blogs or linked from the Playwright community showcase. These documents describe real timelines, flake reduction metrics, CI integration choices, and team-structure changes. Essential reading when pitching Playwright adoption to management or planning a Selenium-to-Playwright migration.",
      "adv": [
        "Real numbers (test count, CI time, flake rate) strengthen business cases",
        "Reveals migration pitfalls teams already solved — locator strategy, parallelization, Docker setup",
        "Shows how other QA orgs structured their Playwright teams and code ownership"
      ],
      "lim": [
        "Company-specific infra may not be reproducible at your scale",
        "Success stories omit failures — read critically and look for balanced postmortems",
        "May reference JavaScript/TypeScript bindings — extract process lessons, not code verbatim"
      ],
      "steps": [
        {
          "t": "Step 1 — Collect 3 migration stories before your tooling proposal",
          "p": "Search company engineering blogs and Playwright community links:",
          "c": "# Search: \"migrated to Playwright\" site:engineering.* OR site:medium.com\n# Note: team size, test count, timeline, flake metrics"
        },
        {
          "t": "Step 2 — Extract a comparison table for stakeholders",
          "p": "Summarize before/after metrics from each case study:",
          "c": "| Company | Tests | CI time before | CI time after | Flake rate change |\n|---------|-------|----------------|---------------|-------------------|"
        }
      ]
    }
  ],
  "contentMarkdown": "● \"Python Testing with pytest\" by Brian Okken — foundational pytest knowledge that underpins pytest-playwright ● \"Fluent Python\" — for writing cleaner, more idiomatic framework code ● General test-automation architecture books (POM, design patterns for QA) — not Playwright-specific but transferable ● Whitepapers/case studies published by companies who migrated to Playwright at scale\n\n## Overview\n\nKey points:",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
