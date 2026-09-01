import type { ChapterRecord } from "../../../types";

/** 63. Sample Data & Practice Sites */
export const chapter = {
  "id": "pw-8-practice",
  "title": "63. Sample Data & Practice Sites",
  "minutes": 15,
  "level": "reference",
  "phase": "Part 8 · Resources",
  "partName": "Part 8 · Resources",
  "overviewText": "Sample data and practice sites give QA engineers safe environments to learn Playwright, experiment with locator strategies, and build portfolio projects without touching production systems. Public practice websites — demo e-commerce stores, form-heavy test pages, and intentionally buggy applications — are designed for automation training with predictable elements and no consequences for failure. Playwright's official examples repository includes demo apps used in documentation and tutorials. Open API sandboxes (public REST test APIs) let you practice the API-testing chapters without a backend team. For a QA career, practice sites are where you build the portfolio projects that prove your skills to hiring managers — a GitHub repo with green CI runs against a demo site is more convincing than a certificate alone.",
  "why": "You cannot learn Playwright by reading docs alone — you need a target application to write tests against. Production systems have access restrictions, data privacy rules, and change frequently. Practice sites provide stable, purpose-built targets where breaking tests has no consequences. They let you experiment with POM structure, fixture design, CI integration, and trace debugging in a controlled environment. When interviewing for automation roles, employers want to see a repo with real test code — practice sites give you that repo without needing access to a proprietary application. API sandboxes extend practice to the request-context and API-mocking chapters without depending on a backend team.",
  "when": "Use practice sites when learning Playwright for the first time, building a portfolio project for job applications, or prototyping a framework pattern before applying it to your company's application. Use Playwright's official demo apps when following documentation tutorials — examples match the docs exactly. Use open API sandboxes when practicing API testing chapters. Transition from practice sites to your company's staging environment once you have a working POM structure and CI pipeline template. Revisit practice sites when evaluating new Playwright features (component testing, visual comparisons) before adopting them in production suites.",
  "practical": {
    "app": "QA career — Building a portfolio project for job interviews",
    "scenario": "You are applying for QA automation roles and need to demonstrate Playwright Python skills. You fork a public demo e-commerce site, build a POM-structured test suite covering login, product search, cart, and checkout, integrate GitHub Actions CI with trace-on-failure, and publish the repo. In interviews, you screen-share the repo, walk through your fixture design, and run the suite live.",
    "pass": "The interviewer sees green CI, clean POM structure, and articulate explanations of locator strategy. You receive an offer.",
    "fail": "You list \"Playwright\" on your résumé but have no repo to show. The interviewer asks you to explain fixture scopes and you rely on theoretical answers without code to back them up."
  },
  "advantages": [
    "Safe experimentation — no production data or access restrictions",
    "Stable targets designed for automation — predictable elements and flows",
    "Portfolio-ready — public repos with CI impress hiring managers",
    "Official Playwright demo apps match documentation examples exactly",
    "API sandboxes enable API testing practice without a backend team"
  ],
  "limitations": [
    "Practice sites are simpler than real applications — patterns may not scale directly",
    "Public demo sites can go offline or change without notice — pin versions or self-host",
    "No auth complexity, payment gateways, or multi-tenant data — real apps are harder",
    "Interviewers may recognize common demo sites — add custom scenarios to stand out",
    "API sandboxes have rate limits and may reset data periodically"
  ],
  "tools": [
    {
      "name": "Public Practice Websites",
      "sub": "Demo e-commerce & form sites",
      "url": "https://www.saucedemo.com",
      "desc": "Purpose-built websites for automation practice. Sauce Demo (saucedemo.com) is the most widely used — a fake e-commerce store with login, product listing, cart, and checkout. The Internet (the-internet.herokuapp.com) offers individual challenge pages: dynamic content, dropdowns, file upload, JavaScript alerts, and iframe handling. Automation Practice (automationexercise.com) provides another e-commerce target. These sites are free, stable, and referenced in courses and tutorials worldwide.",
      "adv": [
        "Free and always available — no signup required",
        "Referenced in courses and tutorials — easy to find help",
        "Cover common patterns: login, forms, tables, modals, dynamic content",
        "Recognized by interviewers as standard practice targets"
      ],
      "lim": [
        "Well-known — many candidates use the same sites",
        "Simpler than production apps — no OAuth, CAPTCHA, or real payment flows",
        "Third-party hosted — could go offline (Heroku free tier sites are risky)",
        "Limited API testing surface — mostly UI-focused"
      ],
      "steps": [
        {
          "t": "Step 1 — Build a POM-structured suite on Sauce Demo",
          "p": "Cover login, inventory, cart, and checkout:",
          "c": "# Project structure:\n# pages/login_page.py\n# pages/inventory_page.py\n# pages/cart_page.py\n# tests/test_checkout_flow.py\n# conftest.py (fixtures)\n# .github/workflows/ci.yml"
        },
        {
          "t": "Step 2 — Add CI with trace-on-failure and publish",
          "p": "Push to public GitHub with README and CI badge:",
          "c": "# README.md\n# Playwright Python test suite for saucedemo.com\n# [![CI](https://github.com/you/demo-tests/actions/workflows/ci.yml/badge.svg)]"
        }
      ]
    },
    {
      "name": "Playwright Official Examples",
      "sub": "microsoft/playwright GitHub repo",
      "url": "https://github.com/microsoft/playwright",
      "desc": "The official Playwright repository includes example projects and demo applications used in documentation and tutorials. The examples/ directory contains test projects in multiple languages. Playwright's documentation references specific demo URLs (demo.playwright.dev) that match tutorial code exactly. Use these when following official docs — your code will match the examples line for line, reducing confusion.",
      "adv": [
        "Guaranteed to match official documentation examples",
        "Maintained by the Playwright team — updated with releases",
        "Multiple language examples including Python",
        "Includes advanced patterns: component testing, API testing, mobile emulation"
      ],
      "lim": [
        "Examples are minimal — not a full portfolio project",
        "demo.playwright.dev is a simple todo app — limited scenario variety",
        "Intended for learning, not as a practice target for portfolio projects",
        "Repository is large — navigate directly to examples/ directory"
      ],
      "steps": [
        {
          "t": "Step 1 — Clone and run official Python examples",
          "p": "Follow along with documentation tutorials:",
          "c": "git clone https://github.com/microsoft/playwright-python.git\ncd playwright-python/examples\npip install -r requirements.txt\npytest --headed"
        }
      ]
    },
    {
      "name": "Open API Sandboxes",
      "sub": "Public REST test APIs",
      "url": "https://reqres.in",
      "desc": "Free public REST APIs for practicing API testing with Playwright's request context or standalone HTTP clients. ReqRes (reqres.in) provides fake user CRUD endpoints with predictable responses. JSONPlaceholder (jsonplaceholder.typicode.com) offers posts, comments, and todos. HTTPBin (httpbin.org) tests HTTP methods, status codes, and headers. Use these when practicing the API testing chapters — no backend team or staging environment required.",
      "adv": [
        "No authentication or setup required",
        "Predictable responses for assertion practice",
        "Cover CRUD, pagination, error codes, and headers",
        "Combine with Playwright request context for hybrid UI + API tests"
      ],
      "lim": [
        "Fake data — no real business logic to validate",
        "Rate limits on some sandboxes",
        "Do not test Playwright browser features — API only",
        "Public endpoints — never send real credentials or sensitive data"
      ],
      "steps": [
        {
          "t": "Step 1 — Practice API tests with Playwright request context",
          "p": "Test CRUD operations against ReqRes:",
          "c": "def test_create_user(api_request_context):\n    response = api_request_context.post(\n        'https://reqres.in/api/users',\n        data={'name': 'QA Engineer', 'job': 'Automation'}\n    )\n    assert response.status == 201\n    body = response.json()\n    assert body['name'] == 'QA Engineer'"
        },
        {
          "t": "Step 2 — Combine API setup with UI verification",
          "p": "Create data via API, verify in browser:",
          "c": "def test_api_setup_ui_verify(api_request_context, page):\n    # Create user via API\n    api_request_context.post('/api/users', data={...})\n    # Verify user appears in admin UI\n    page.goto('/admin/users')\n    expect(page.get_by_text('QA Engineer')).to_be_visible()"
        }
      ]
    }
  ],
  "contentMarkdown": "## 63. Sample Data & Practice Sites\n\nHands-on practice requires stable demo apps and public APIs.\n\n### Demo sites\n\n- **demo.playwright.dev/todomvc** — official Playwright demo app; ideal for CRUD and locator practice.\n- **the-internet.herokuapp.com** — classic automation practice site (login, dropdowns, alerts, frames).\n- **automationexercise.com** — e-commerce flows for cart, checkout, and registration.\n\n### Official examples\n\n- **github.com/microsoft/playwright/examples** — runnable examples for Python, JS, Java, and C# covering auth, API, mobile, and CI patterns.\n\n### Public APIs for setup/teardown\n\n- **jsonplaceholder.typicode.com** — fake REST API for CRUD practice without a real backend.\n- **reqres.in** — user registration and login API for auth fixture practice.\n\n### Practice project idea\n\nBuild a capstone against TodoMVC: login (if applicable), add/edit/delete todos, API validation via a mock or jsonplaceholder, CI on GitHub Actions. Complete in a weekend.",
  "exercises": [],
  "resourceLinks": [
    {
      "title": "Playwright TodoMVC Demo",
      "url": "https://demo.playwright.dev/todomvc",
      "description": "Official demo app — stable, fast, ideal for CRUD and locator practice."
    },
    {
      "title": "Playwright Examples (GitHub)",
      "url": "https://github.com/microsoft/playwright/tree/main/examples",
      "description": "Official runnable examples — auth, API, mobile, CI patterns."
    },
    {
      "title": "The Internet (Herokuapp)",
      "url": "https://the-internet.herokuapp.com/",
      "description": "Classic practice site — login, alerts, frames, dynamic content."
    },
    {
      "title": "JSONPlaceholder",
      "url": "https://jsonplaceholder.typicode.com/",
      "description": "Free fake REST API for API testing and setup/teardown practice."
    },
    {
      "title": "Automation Exercise",
      "url": "https://automationexercise.com/",
      "description": "E-commerce demo site for cart, checkout, and registration flows."
    },
    {
      "title": "ReqRes — Fake REST API",
      "url": "https://reqres.in/",
      "description": "User registration and login endpoints for auth fixture practice."
    }
  ],
  "steps": [],
  "learn": []
} as ChapterRecord;
