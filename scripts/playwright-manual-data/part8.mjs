/** Playwright manual Part 8 — Resources (Chapters 52–64) */
export const chapters = [
  {
    contentMarkdown: `## 52. Books & Long-Form Reading

Books provide the deepest foundation for Playwright and Python test automation — far beyond what a single tutorial covers.

### Recommended reading

- **Python Testing with pytest** (Brian Okken) — fixtures, parametrization, conftest.py, markers, plugins. Every concept maps directly to pytest-playwright.
- **Fluent Python** (Luciano Ramalho) — write cleaner page objects, test data builders, and custom fixtures with idiomatic Python.
- **Test automation architecture** — Martin Fowler's Page Object bliki, "Experiences of Test Automation" (Dot Graham et al.). Patterns transfer across Playwright, Selenium, and Cypress.
- **Migration case studies** — engineering blog posts from teams that migrated to Playwright at scale reveal flake reduction, CI choices, and locator strategy lessons.

### How to use books effectively

Pair every chapter with a small exercise in your own repo. Read pytest fixtures → refactor your login into a yield-based fixture. Read POM bliki → extract inline locators into a page class.

Cross-check API details against current Playwright docs — books lag behind release cadence.`,
    resourceLinks: [
      {
        title: "Python Testing with pytest (2nd Edition)",
        url: "https://www.manning.com/books/python-testing-with-pytest-second-edition",
        description: "Foundational pytest book — fixtures, conftest.py, parametrization, plugins.",
      },
      {
        title: "pytest official documentation",
        url: "https://docs.pytest.org/en/stable/",
        description: "Free reference alongside the Okken book; always current.",
      },
      {
        title: "Fluent Python (2nd Edition)",
        url: "https://www.oreilly.com/library/view/fluent-python-2nd/9781098113408/",
        description: "Idiomatic Python for cleaner framework code — type hints, dataclasses, context managers.",
      },
      {
        title: "Page Object — Martin Fowler",
        url: "https://martinfowler.com/bliki/PageObject.html",
        description: "The canonical POM pattern reference; tool-agnostic architecture guidance.",
      },
      {
        title: "Experiences of Test Automation",
        url: "https://www.amazon.com/Experiences-Test-Automation-Case-Studies/dp/0321754069",
        description: "Real-world case studies on framework design, team structure, and scaling.",
      },
    ],
  },
  {
    contentMarkdown: `## 53. Blogs & Written Tutorials

Stay current with Playwright releases, community patterns, and real-world engineering stories.

### Primary sources

- **playwright.dev/blog** — release announcements, feature deep-dives, migration guides from the core team.
- **dev.to** — practitioner tutorials, troubleshooting posts, and comparison articles tagged #playwright and #testing.
- **Company engineering blogs** — Netflix, Spotify, Microsoft, Atlassian, and others publish migration stories and CI integration patterns at scale.

### Reading strategy

Subscribe to the Playwright blog RSS. Skim dev.to weekly for one new pattern. When preparing a tooling proposal, search \`"migrated to Playwright" site:engineering.*\` for case studies with real metrics.`,
    resourceLinks: [
      {
        title: "Playwright Blog",
        url: "https://playwright.dev/blog",
        description: "Official release notes, feature announcements, and migration guides.",
      },
      {
        title: "dev.to — Playwright tag",
        url: "https://dev.to/t/playwright",
        description: "Community tutorials, tips, and troubleshooting from practitioners.",
      },
      {
        title: "Microsoft Playwright Blog (Dev Blogs)",
        url: "https://devblogs.microsoft.com/playwright/",
        description: "Deep technical posts from the core engineering team.",
      },
      {
        title: "Ministry of Testing — Articles",
        url: "https://www.ministryoftesting.com/software-testing-articles",
        description: "Broad QA community articles including automation strategy and tooling.",
      },
      {
        title: "Atlassian Engineering Blog",
        url: "https://www.atlassian.com/engineering",
        description: "Example of a company engineering blog with test infrastructure stories.",
      },
    ],
  },
  {
    contentMarkdown: `## 54. Newsletters

Curated weekly digests save time versus scrolling Twitter/X or Reddit.

### Recommended newsletters

- **Ministry of Testing** — community events, articles, job postings, and testing culture.
- **Python Weekly** — Python ecosystem news including pytest and tooling updates.
- **Test Guild Newsletter** — automation-focused links, podcast episodes, and tool reviews.

### How to use them

Skim subject lines on Monday. Save one article per week to read deeply. Forward relevant links to your team Slack channel — it builds your reputation as the person who stays current.`,
    resourceLinks: [
      {
        title: "Ministry of Testing",
        url: "https://www.ministryoftesting.com/",
        description: "Global testing community — events, articles, courses, and newsletter.",
      },
      {
        title: "Python Weekly",
        url: "https://www.pythonweekly.com/",
        description: "Weekly Python ecosystem roundup — pytest, packaging, and tooling news.",
      },
      {
        title: "Test Guild Newsletter",
        url: "https://testguild.com/newsletter/",
        description: "Automation-focused weekly digest from Joe Colantonio.",
      },
      {
        title: "Software Testing Weekly",
        url: "https://softwaretestingweekly.com/",
        description: "Curated testing links from across the web, delivered weekly.",
      },
      {
        title: "PyCoder's Weekly",
        url: "https://pycoders.com/",
        description: "Python articles and projects — useful for framework code quality.",
      },
    ],
  },
  {
    contentMarkdown: `## 55. Podcasts

Podcasts are ideal for commute listening and staying aware of industry trends.

### Top picks for automation engineers

- **TestGuild Automation Podcast** (Joe Colantonio) — tool comparisons, guest interviews with QA leaders, career advice.
- **The Testing Show** (Qualitest) — testing strategy, team structure, and industry trends beyond any single tool.

### Listening tips

Note one actionable idea per episode — a CI pattern, a flake-reduction technique, a career tip. Search episode archives for "Playwright", "pytest", or "flaky tests" when preparing for interviews.`,
    resourceLinks: [
      {
        title: "TestGuild Automation Podcast",
        url: "https://testguild.com/automation-testing-podcast/",
        description: "Long-running automation podcast — tool reviews, interviews, career advice.",
      },
      {
        title: "The Testing Show",
        url: "https://testingpodcast.com/",
        description: "Broad testing strategy and industry trends from Qualitest.",
      },
      {
        title: "TestGuild YouTube Channel",
        url: "https://www.youtube.com/@TestGuild",
        description: "Video versions of podcast topics plus live conference recordings.",
      },
      {
        title: "Ministry of Testing Podcast",
        url: "https://www.ministryoftesting.com/podcast",
        description: "Community stories, testing culture, and practitioner interviews.",
      },
    ],
  },
  {
    contentMarkdown: `## 56. Courses & Structured Learning Platforms

Structured courses complement hands-on capstone work with guided progression.

### Recommended platforms

- **Test Automation University (Applitools)** — free courses on Selenium, Cypress, Playwright-adjacent topics, CI, and visual testing.
- **Microsoft Learn** — official Playwright modules including framework building and CI integration.
- **Udemy / Pluralsight** — paid courses for deep dives; check recency (Playwright changes fast — prefer courses updated within the last 12 months).

### Course selection criteria

- Does it use pytest-playwright (Python) or Playwright Test (JS)? Match your stack.
- Does it cover CI integration, not just local \`pytest\`?
- Are reviews recent and mentioning current Playwright versions?`,
    resourceLinks: [
      {
        title: "Test Automation University",
        url: "https://testautomationu.applitools.com/",
        description: "Free courses on automation fundamentals, CI, visual testing, and more.",
      },
      {
        title: "Microsoft Learn — Playwright modules",
        url: "https://learn.microsoft.com/en-us/training/browse/?products=playwright",
        description: "Official Microsoft training paths for Playwright and test automation.",
      },
      {
        title: "Udemy — Playwright courses",
        url: "https://www.udemy.com/topic/playwright/",
        description: "Paid courses — filter by recent updates and Python/pytest content.",
      },
      {
        title: "Playwright Python documentation",
        url: "https://playwright.dev/python/docs/intro",
        description: "Free official docs with runnable examples — the best zero-cost course.",
      },
      {
        title: "Ministry of Testing — Courses",
        url: "https://www.ministryoftesting.com/courses",
        description: "Community courses on testing fundamentals and automation strategy.",
      },
    ],
  },
  {
    contentMarkdown: `## 57. Certifications

Certifications validate breadth; your GitHub portfolio validates depth. Both matter at different career stages.

### ISTQB

The **International Software Testing Qualifications Board** offers the most widely recognized testing certifications:

- **Foundation Level (CTFL)** — testing fundamentals, test design, tools, and process. Useful for manual QA transitioning to automation.
- **Test Automation Engineer** — specifically covers automation architecture, frameworks, and CI.

### When certifications help

- Enterprise/regulated industries that require formal credentials
- Early career when you lack portfolio projects
- Complementing a strong GitHub capstone — not replacing it

### When they don't

Startups and product companies typically care more about your repo, CI badge, and ability to explain POM/fixtures in an interview.`,
    resourceLinks: [
      {
        title: "ISTQB Official Site",
        url: "https://www.istqb.org/",
        description: "Certification syllabus, exam providers, and accredited training.",
      },
      {
        title: "ISTQB Certified Tester Foundation Level",
        url: "https://www.istqb.org/certifications/certified-tester-foundation-level",
        description: "Entry-level certification covering testing fundamentals.",
      },
      {
        title: "ISTQB Test Automation Engineer",
        url: "https://www.istqb.org/certifications/certified-tester-advanced-level-test-automation-engineer",
        description: "Advanced certification focused on automation architecture and tools.",
      },
      {
        title: "ASTQB (American Software Testing Qualifications Board)",
        url: "https://astqb.org/",
        description: "US exam board for ISTQB certifications.",
      },
    ],
  },
  {
    contentMarkdown: `## 58. Conferences & Talks

Conferences expose you to patterns, tools, and people you won't find in docs.

### Must-know events

- **TestBash** (Ministry of Testing) — practitioner-focused, inclusive, strong automation track.
- **PyCon** — Python ecosystem including pytest, tooling, and testing libraries.
- **SeleniumConf / Automation conferences** — broader automation community; many talks cover Playwright migration.

### Getting value without travel

Most conferences publish talk recordings on YouTube within weeks. Search "TestBash Playwright" or "PyCon pytest" for free, high-quality sessions. Submit a CFP (Call for Papers) once your capstone is solid — speaking accelerates career visibility.`,
    resourceLinks: [
      {
        title: "TestBash Events",
        url: "https://www.ministryoftesting.com/events/testbash",
        description: "Ministry of Testing flagship conference — online and in-person.",
      },
      {
        title: "PyCon US",
        url: "https://us.pycon.org/",
        description: "Annual Python conference — pytest, tooling, and testing talks.",
      },
      {
        title: "SeleniumConf",
        url: "https://seleniumconf.com/",
        description: "Broad automation community conference; Playwright migration talks common.",
      },
      {
        title: "Ministry of Testing — All Events",
        url: "https://www.ministryoftesting.com/events",
        description: "TestBash, masterclasses, and community meetups worldwide.",
      },
      {
        title: "Playwright Community Events",
        url: "https://playwright.dev/community/events",
        description: "Official Playwright meetups and community gatherings.",
      },
    ],
  },
  {
    contentMarkdown: `## 59. Social & Real-Time Communities

Real-time communities solve problems docs can't — edge cases, CI quirks, and "has anyone seen this?"

### Where to participate

- **Playwright Discord** — fastest help for Playwright-specific issues; core team members often respond.
- **GitHub microsoft/playwright** — file issues, read discussions, watch releases.
- **Reddit r/QualityAssurance** and **r/softwaretesting** — career advice, tool comparisons, interview prep.
- **Ministry of Testing Slack** — global QA community with automation channels.

### Community etiquette

Search before asking. Share a minimal reproducible example (repo or trace). When you solve a problem, post the answer — it builds reputation and helps the next person.`,
    resourceLinks: [
      {
        title: "Playwright Discord",
        url: "https://aka.ms/playwright/discord",
        description: "Official community Discord — fastest channel for Playwright help.",
      },
      {
        title: "microsoft/playwright on GitHub",
        url: "https://github.com/microsoft/playwright",
        description: "Source, issues, discussions, and release notes.",
      },
      {
        title: "Playwright Community page",
        url: "https://playwright.dev/community",
        description: "Links to Discord, Stack Overflow, Twitter, and meetups.",
      },
      {
        title: "Ministry of Testing Slack",
        url: "https://www.ministryoftesting.com/slack",
        description: "Global testing community with dedicated automation channels.",
      },
      {
        title: "Stack Overflow — Playwright tag",
        url: "https://stackoverflow.com/questions/tagged/playwright",
        description: "Searchable Q&A archive for specific technical problems.",
      },
    ],
  },
  {
    contentMarkdown: `## 60. Browser Extensions & Developer Tools

The right browser tools make writing and debugging Playwright tests faster.

### Accessibility testing

- **axe DevTools** (Deque) — run accessibility scans in-browser; pairs with \`axe-playwright-python\` for automated a11y checks in CI.

### Built-in DevTools

- **Chrome DevTools** — inspect elements, network tab, console, and performance. Essential for writing locators and understanding why a test fails.
- **Playwright Inspector** — launched via \`PWDEBUG=1 pytest\` or \`--headed --slowmo=500\`; step through tests interactively.

### Locator discovery workflow

1. Open app in browser → DevTools → inspect element
2. Note role, label, text, or test-id
3. Translate to Playwright: \`page.get_by_role("button", name="Submit")\`
4. Verify in Playwright Inspector before committing to the test`,
    resourceLinks: [
      {
        title: "axe DevTools Browser Extension",
        url: "https://www.deque.com/axe/devtools/",
        description: "In-browser accessibility scanning — pairs with axe-playwright for CI.",
      },
      {
        title: "Chrome DevTools Documentation",
        url: "https://developer.chrome.com/docs/devtools/",
        description: "Official guide to Elements, Network, Console, and Performance panels.",
      },
      {
        title: "Playwright Inspector",
        url: "https://playwright.dev/python/docs/debug",
        description: "Interactive test debugging — step through, pick locators, edit live.",
      },
      {
        title: "axe-core (open source engine)",
        url: "https://github.com/dequelabs/axe-core",
        description: "The accessibility engine behind axe DevTools and axe-playwright.",
      },
      {
        title: "Playwright Trace Viewer",
        url: "https://trace.playwright.dev/",
        description: "Web-based trace inspector — open CI failure traces without local setup.",
      },
    ],
  },
  {
    contentMarkdown: `## 61. Comparison & Decision-Making References

Tooling decisions should be evidence-based, not hype-driven.

### State of Testing surveys

Annual surveys from Ministry of Testing, TestRail, and others report adoption trends, pain points, and team practices. Use them to:

- Justify Playwright adoption to management with industry data
- Understand common flake rates and CI maturity benchmarks
- Identify skills gaps (e.g., "60% of teams lack API testing")

### Comparison frameworks

When evaluating Playwright vs. Selenium vs. Cypress, compare on:

- **Browser support** — Chromium, Firefox, WebKit
- **Language bindings** — Python, JS, Java, C#
- **Auto-waiting** — built-in vs. explicit waits
- **Debugging** — trace viewer, video, screenshot
- **CI integration** — Docker, sharding, cloud runners
- **API testing** — native context vs. separate tool`,
    resourceLinks: [
      {
        title: "State of Testing Report (Capgemini / Sogeti)",
        url: "https://www.capgemini.com/insights/research-library/world-quality-report/",
        description: "Annual enterprise QA trends — adoption, skills gaps, and maturity.",
      },
      {
        title: "Ministry of Testing — State of Testing Survey",
        url: "https://www.ministryoftesting.com/testing-surveys",
        description: "Practitioner-focused survey on tools, practices, and community trends.",
      },
      {
        title: "Testing Tools Dev",
        url: "https://testingtools.dev/",
        description: "Side-by-side comparison of test automation frameworks and tools.",
      },
      {
        title: "Playwright vs Selenium (official comparison)",
        url: "https://playwright.dev/python/docs/why-playwright",
        description: "Playwright team's own comparison — useful starting point, read critically.",
      },
      {
        title: "TestRail — Testing Trends Report",
        url: "https://www.testrail.com/resource/testrail-test-report/",
        description: "Annual report on testing practices, tools, and team structure.",
      },
    ],
  },
  {
    contentMarkdown: `## 62. Glossary of Terms

Key vocabulary for Playwright + pytest automation interviews and code reviews.

| Term | Definition |
|---|---|
| **Locator** | A reference to one or more DOM elements. Playwright locators auto-retry until the element is actionable or timeout expires. Example: \`page.get_by_role("button", name="Save")\`. |
| **Fixture** | A pytest function that provides setup/teardown for tests. Declared as a parameter; conftest.py shares fixtures across files. Example: \`authenticated_page\` fixture that logs in once. |
| **Flaky test** | A test that passes and fails non-deterministically on the same code. Usually caused by timing, test isolation, or environment differences — not by Playwright itself. |
| **storage_state** | Saved cookies + localStorage from a browser context. Loaded into new contexts to skip login UI. Equivalent concept to Cypress cy.session(). |
| **Trace** | A Playwright recording of test execution — DOM snapshots, network, console, screenshots at each step. Opened in trace.playwright.dev for post-mortem debugging. |
| **Sharding** | Splitting test suite across multiple CI machines. Each shard runs a subset: \`pytest --shard=1/4\`. Reduces total CI time. |
| **POM (Page Object Model)** | Design pattern where each page/screen is a class encapsulating locators and actions. Tests call page methods, not raw locators. |
| **Auto-waiting** | Playwright's default behavior: actions and assertions retry until conditions are met or timeout. Replaces explicit \`time.sleep()\`. |
| **APIRequestContext** | Playwright's HTTP client for API calls independent of browser. Accessed via the \`request\` fixture in pytest-playwright. |
| **Headless** | Running browser without visible UI. Default in CI. Use \`--headed\` locally for debugging. |`,
    resourceLinks: [
      {
        title: "Playwright Glossary (Locators)",
        url: "https://playwright.dev/python/docs/locators",
        description: "Official locator strategies — role, text, label, test-id, CSS, XPath.",
      },
      {
        title: "pytest Fixtures documentation",
        url: "https://docs.pytest.org/en/stable/explanation/fixtures.html",
        description: "How fixtures work — scope, autouse, yield, and conftest.py.",
      },
      {
        title: "Playwright — Authentication (storage_state)",
        url: "https://playwright.dev/python/docs/auth",
        description: "Saving and reusing login state across tests and sessions.",
      },
      {
        title: "Playwright — Trace Viewer",
        url: "https://playwright.dev/python/docs/trace-viewer",
        description: "Recording, opening, and analyzing traces for failed tests.",
      },
      {
        title: "Playwright — Sharding",
        url: "https://playwright.dev/python/docs/test-sharding",
        description: "Splitting test suites across parallel CI workers.",
      },
    ],
  },
  {
    contentMarkdown: `## 63. Sample Data & Practice Sites

Hands-on practice requires stable demo apps and public APIs.

### Demo sites

- **demo.playwright.dev/todomvc** — official Playwright demo app; ideal for CRUD and locator practice.
- **the-internet.herokuapp.com** — classic automation practice site (login, dropdowns, alerts, frames).
- **automationexercise.com** — e-commerce flows for cart, checkout, and registration.

### Official examples

- **github.com/microsoft/playwright/examples** — runnable examples for Python, JS, Java, and C# covering auth, API, mobile, and CI patterns.

### Public APIs for setup/teardown

- **jsonplaceholder.typicode.com** — fake REST API for CRUD practice without a real backend.
- **reqres.in** — user registration and login API for auth fixture practice.

### Practice project idea

Build a capstone against TodoMVC: login (if applicable), add/edit/delete todos, API validation via a mock or jsonplaceholder, CI on GitHub Actions. Complete in a weekend.`,
    resourceLinks: [
      {
        title: "Playwright TodoMVC Demo",
        url: "https://demo.playwright.dev/todomvc",
        description: "Official demo app — stable, fast, ideal for CRUD and locator practice.",
      },
      {
        title: "Playwright Examples (GitHub)",
        url: "https://github.com/microsoft/playwright/tree/main/examples",
        description: "Official runnable examples — auth, API, mobile, CI patterns.",
      },
      {
        title: "The Internet (Herokuapp)",
        url: "https://the-internet.herokuapp.com/",
        description: "Classic practice site — login, alerts, frames, dynamic content.",
      },
      {
        title: "JSONPlaceholder",
        url: "https://jsonplaceholder.typicode.com/",
        description: "Free fake REST API for API testing and setup/teardown practice.",
      },
      {
        title: "Automation Exercise",
        url: "https://automationexercise.com/",
        description: "E-commerce demo site for cart, checkout, and registration flows.",
      },
      {
        title: "ReqRes — Fake REST API",
        url: "https://reqres.in/",
        description: "User registration and login endpoints for auth fixture practice.",
      },
    ],
  },
  {
    contentMarkdown: `## 64. Staying Plugged Into the Ecosystem

Playwright evolves fast. A quarterly audit habit keeps your skills and suite current.

### GitHub watch list

- **github.com/microsoft/playwright** — watch Releases for breaking changes.
- **github.com/microsoft/playwright-python** — Python binding updates.
- **Your dependencies** — \`pip list --outdated\` monthly; update pytest-playwright deliberately, not blindly.

### PyPI & version tracking

- Check [pypi.org/project/playwright](https://pypi.org/project/playwright/) for latest stable.
- Read [playwright.dev/docs/release-notes](https://playwright.dev/docs/release-notes) before upgrading — note deprecated APIs.

### Migration guides

When upgrading major versions, follow official migration guides. Search release notes for APIs you use: \`page.wait_for_selector\`, \`context.storage_state\`, fixture scopes.

### Quarterly audit checklist

Every 3 months:

1. Update Playwright + pytest-playwright to latest stable
2. Run full suite locally and in CI after update
3. Review release notes for deprecated APIs in your codebase
4. Re-read one Part 8 resource (blog, podcast, or doc page)
5. Check CI runtime — if suite exceeds 15 minutes, evaluate sharding (Chapter 27)

Staying current is a habit, not a one-time event. Block 30 minutes quarterly on your calendar.`,
    resourceLinks: [
      {
        title: "Playwright GitHub Releases",
        url: "https://github.com/microsoft/playwright/releases",
        description: "Watch for breaking changes, new features, and bug fixes.",
      },
      {
        title: "Playwright Python on PyPI",
        url: "https://pypi.org/project/playwright/",
        description: "Latest stable version and release history for the Python package.",
      },
      {
        title: "Playwright Release Notes",
        url: "https://playwright.dev/docs/release-notes",
        description: "Official changelog with migration notes for each version.",
      },
      {
        title: "pytest-playwright on PyPI",
        url: "https://pypi.org/project/pytest-playwright/",
        description: "Pytest plugin version — keep in sync with Playwright core.",
      },
      {
        title: "Playwright GitHub Discussions",
        url: "https://github.com/microsoft/playwright/discussions",
        description: "Community Q&A, feature requests, and migration help from the team.",
      },
    ],
  },
];
