import type { ChapterRecord } from "../../../types";

/** 53. Blogs & Written Tutorials */
export const chapter = {
  "id": "pw-8-blogs",
  "title": "53. Blogs & Written Tutorials",
  "minutes": 15,
  "level": "reference",
  "phase": "Part 8 · Resources",
  "partName": "Part 8 · Resources",
  "overviewText": "Blogs and written tutorials are the fastest-moving layer of Playwright knowledge — updated within days of a release, often with working code snippets you can paste into your project immediately. Unlike books, blog posts answer specific \"how do I solve X today\" questions: debugging a flaky locator, integrating Playwright with a particular CI provider, or structuring POM folders for a monorepo. The ecosystem spans the official Playwright blog (authoritative release rationale), individual QA engineer posts on Medium, Dev.to, and Hashnode, company engineering blogs documenting migrations, and portfolio blogs from automation leads showing real production POM structures. For a QA career, blogs are where you learn what practitioners actually do, not just what the docs say is possible.",
  "why": "Official documentation tells you what an API does; blogs tell you what breaks in production and how experienced engineers work around it. When Playwright ships a new feature, the official blog explains the design decision while community posts show three different integration approaches by the end of the week. Company engineering blogs provide migration timelines and CI configurations that no tutorial covers. Portfolio blogs from automation leads often include GitHub repos with real folder structures — invaluable when you are the first Playwright hire and have no internal reference implementation.",
  "when": "Consult blogs when you hit a specific blocker — a flaky test, an unfamiliar CI error, a new Playwright API you need to adopt before the next sprint. Subscribe to the official Playwright blog and 2–3 trusted QA authors so release announcements reach you automatically. Read company migration posts before proposing Playwright to leadership. Browse portfolio blogs when designing your framework folder structure or preparing for a senior automation interview where you must articulate architectural choices.",
  "practical": {
    "app": "QA career — Debugging a flaky CI failure",
    "scenario": "Your Playwright suite passes locally but fails intermittently in GitHub Actions on the checkout flow. Official docs describe auto-waiting but do not address your specific race condition. You search Dev.to and find a post from a QA engineer who solved the same issue by switching from CSS selectors to role-based locators and adding a networkidle wait on the payment redirect.",
    "pass": "You apply the blog's locator strategy, the flake disappears, and you add the author's approach to your team's troubleshooting wiki.",
    "fail": "You add arbitrary sleep(5000) calls because no one on the team reads community posts. Flakes persist, CI trust erodes, and developers start ignoring red builds."
  },
  "advantages": [
    "Updated within days of Playwright releases — faster than books or courses",
    "Practitioner-written posts address real production pain points docs skip",
    "Code snippets are copy-pasteable starting points for your own project",
    "Company engineering blogs provide evidence and timelines for tooling proposals",
    "Portfolio blogs show production-grade POM structures you can adapt, not toy examples"
  ],
  "limitations": [
    "Quality varies wildly — verify against official docs before adopting patterns from unknown authors",
    "Posts go stale; a 2022 CI config may reference deprecated GitHub Actions syntax",
    "Some tutorials optimize for clicks over correctness — watch for sleep() anti-patterns presented as solutions",
    "Fragmented across platforms — no single index; you must curate your own reading list",
    "Authors may showcase idealized setups that do not match regulated or air-gapped environments"
  ],
  "tools": [
    {
      "name": "Official Playwright Blog",
      "sub": "playwright.dev/blog",
      "url": "https://playwright.dev/blog",
      "desc": "The authoritative source for release announcements, feature rationale, and maintainer-written deep dives. When Playwright 1.4x ships trace viewer improvements or new locator strategies, this blog explains why the change was made and how to migrate. Every QA engineer using Playwright should read new posts within a week of publication — they often contain breaking-change guidance before you hit it in CI.",
      "adv": [
        "Written by maintainers — highest accuracy for API behaviour and migration paths",
        "Release posts include code examples for new features",
        "Explains design rationale that helps you choose between competing APIs"
      ],
      "lim": [
        "Focused on features, not on team process or organizational adoption",
        "JavaScript/TypeScript examples predominate — translate to Python",
        "Does not cover third-party integrations (specific CI vendors, cloud runners) in depth"
      ],
      "steps": [
        {
          "t": "Step 1 — Bookmark and check after every Playwright upgrade",
          "p": "Before merging a major version bump, read the corresponding release post:",
          "c": "pip show playwright  # note version\n# Visit playwright.dev/blog and search for that version"
        },
        {
          "t": "Step 2 — Share release posts in your team's Slack channel",
          "p": "Summarize breaking changes for developers who do not follow the blog:",
          "c": "Playwright 1.42: locator strict mode now defaults to true.\nAction: audit tests using page.locator() with ambiguous selectors."
        }
      ]
    },
    {
      "name": "QA Engineer Blogs (Medium / Dev.to / Hashnode)",
      "sub": "Community tutorials",
      "url": "https://dev.to/t/playwright",
      "desc": "Individual QA engineers publish hands-on tutorials tagged playwright, playwright-python, or test-automation on Medium, Dev.to, and Hashnode. These posts cover practical topics: POM folder layouts, pytest fixture patterns, debugging with trace viewer, Docker CI setups, and API testing with Playwright's request context. Search by tag and sort by recent when troubleshooting; follow authors whose code style matches your team's conventions.",
      "adv": [
        "Python-specific Playwright posts appear regularly on Dev.to and Hashnode",
        "Real troubleshooting narratives with before/after code",
        "Often include GitHub repos you can clone and compare against your setup"
      ],
      "lim": [
        "No editorial review — test every snippet before using in production",
        "Duplicate content across platforms — same tutorial reposted for SEO",
        "Paywalled on Medium unless you have a subscription"
      ],
      "steps": [
        {
          "t": "Step 1 — Build a tagged reading list",
          "p": "Follow tags and save posts to a team Notion or wiki:",
          "c": "# Curated list\n- dev.to/t/playwright (filter: python)\n- hashnode.com/n/playwright\n- medium.com/tag/playwright"
        },
        {
          "t": "Step 2 — Validate before adopting",
          "p": "Run the author's code in an isolated branch; check Playwright version compatibility:",
          "c": "git checkout -b try-blog-locator-pattern\npip install -r requirements.txt\npytest tests/test_checkout.py -v"
        }
      ]
    },
    {
      "name": "Company Engineering Blogs",
      "sub": "Migration & scaling stories",
      "url": "https://netflixtechblog.com",
      "desc": "Engineering blogs from companies with mature QA practices — Netflix, Shopify, Microsoft, and others — publish posts on test infrastructure, Playwright adoption, flake reduction, and CI scaling. These are essential when you need to justify tooling investment to engineering leadership or plan a multi-quarter migration. Look for posts with concrete metrics: test count, CI duration, engineer hours saved, flake rate before and after.",
      "adv": [
        "Credible evidence for stakeholder presentations",
        "Describes org-level decisions — team structure, code ownership, review processes",
        "Often includes architecture diagrams applicable to your planning"
      ],
      "lim": [
        "Large-company context may not fit startups or small QA teams",
        "Posts are infrequent — you cannot rely on them for day-to-day API questions",
        "May focus on JavaScript/TypeScript stacks"
      ],
      "steps": [
        {
          "t": "Step 1 — Collect migration posts for your tooling proposal",
          "p": "Search and summarize 3 posts with metrics:",
          "c": "Google: \"playwright\" \"engineering blog\" \"migration\" OR \"test automation\"\nExtract: team size, timeline, test count, CI improvement"
        }
      ]
    },
    {
      "name": "Automation Lead Portfolio Blogs",
      "sub": "Real POM structures",
      "url": "https://github.com",
      "desc": "Senior QA engineers and automation architects often maintain personal blogs and public GitHub repos showcasing their framework structure — conftest.py layouts, page object hierarchies, CI configs, and reporting integrations. These are gold for interview preparation and for bootstrapping a new team's conventions. Look for repos with recent commits, meaningful test counts, and README files explaining design decisions.",
      "adv": [
        "Shows production-grade folder structure, not tutorial minimalism",
        "GitHub repos let you diff their patterns against your own",
        "Useful for interview discussions — \"here is how I structured my last suite\""
      ],
      "lim": [
        "Public repos may be sanitized — missing proprietary integrations",
        "Structure that worked for one product may not fit your monorepo or microservices layout",
        "Verify the author is actively maintaining the repo — stale repos teach outdated patterns"
      ],
      "steps": [
        {
          "t": "Step 1 — Clone and study one well-structured public repo",
          "p": "Compare their conftest.py and pages/ layout to yours:",
          "c": "git clone https://github.com/example/playwright-python-pom\ntree -L 3\n# Note: fixture scopes, page object naming, test data location"
        }
      ]
    }
  ],
  "contentMarkdown": "## 53. Blogs & Written Tutorials\n\nStay current with Playwright releases, community patterns, and real-world engineering stories.\n\n### Primary sources\n\n- **playwright.dev/blog** — release announcements, feature deep-dives, migration guides from the core team.\n- **dev.to** — practitioner tutorials, troubleshooting posts, and comparison articles tagged #playwright and #testing.\n- **Company engineering blogs** — Netflix, Spotify, Microsoft, Atlassian, and others publish migration stories and CI integration patterns at scale.\n\n### Reading strategy\n\nSubscribe to the Playwright blog RSS. Skim dev.to weekly for one new pattern. When preparing a tooling proposal, search `\"migrated to Playwright\" site:engineering.*` for case studies with real metrics.",
  "exercises": [],
  "resourceLinks": [
    {
      "title": "Playwright Blog",
      "url": "https://playwright.dev/blog",
      "description": "Official release notes, feature announcements, and migration guides."
    },
    {
      "title": "dev.to — Playwright tag",
      "url": "https://dev.to/t/playwright",
      "description": "Community tutorials, tips, and troubleshooting from practitioners."
    },
    {
      "title": "Microsoft Playwright Blog (Dev Blogs)",
      "url": "https://devblogs.microsoft.com/playwright/",
      "description": "Deep technical posts from the core engineering team."
    },
    {
      "title": "Ministry of Testing — Articles",
      "url": "https://www.ministryoftesting.com/software-testing-articles",
      "description": "Broad QA community articles including automation strategy and tooling."
    },
    {
      "title": "Atlassian Engineering Blog",
      "url": "https://www.atlassian.com/engineering",
      "description": "Example of a company engineering blog with test infrastructure stories."
    }
  ],
  "steps": [],
  "learn": []
} as ChapterRecord;
