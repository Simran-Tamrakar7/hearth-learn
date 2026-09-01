import type { ChapterRecord } from "../../../types";

/** 56. Courses & Structured Learning Platforms */
export const chapter = {
  "id": "pw-8-courses",
  "title": "56. Courses & Structured Learning Platforms",
  "minutes": 20,
  "level": "reference",
  "phase": "Part 8 · Resources",
  "partName": "Part 8 · Resources",
  "overviewText": "Structured courses provide a guided, project-based path through Playwright and test automation — ideal for QA engineers who learn best with deadlines, exercises, and instructor feedback rather than self-directed doc reading. Platforms like Udemy and Coursera offer Playwright-with-Python courses ranging from beginner to advanced, often bundling POM design, CI integration, and API testing in a single curriculum. LinkedIn Learning provides automation testing tracks that fit corporate L&D budgets. Test Automation University (Applitools) offers free, vendor-agnostic courses including Playwright modules. Microsoft Learn may include official Playwright content tied to the Azure ecosystem. For a QA career, courses accelerate onboarding, provide certificates for résumés, and give junior engineers a shared vocabulary with senior teammates.",
  "why": "Self-taught engineers often have gaps — they can write a passing test but cannot explain fixture scopes, design a maintainable POM, or integrate with CI. Structured courses fill those gaps with sequenced modules, hands-on projects, and quizzes that force active learning. For teams onboarding multiple QA hires simultaneously, assigning the same course creates a shared baseline before they touch production test code. Courses also provide completion certificates that HR departments and hiring managers recognize, which matters when transitioning from manual testing to automation or applying for senior roles.",
  "when": "Enroll when starting your first Playwright role, when your company allocates an L&D budget, or when you need a certificate for a promotion packet. Choose project-based courses when you learn by building; choose theory-heavy courses when preparing for ISTQB or architecture discussions. Re-take or audit updated courses after major Playwright version bumps — outdated video content is the biggest risk. For team leads, assign a foundational course to all new automation hires before their first PR.",
  "practical": {
    "app": "QA career — Transitioning from manual to automation testing",
    "scenario": "You have three years of manual testing experience and a job offer that requires Playwright skills. You enroll in a Udemy Playwright Python course with a capstone e-commerce project. Over four weeks you build a POM-structured suite, integrate it with GitHub Actions, and add the GitHub repo link to your portfolio. In the interview for your next role, you walk through your course project as proof of hands-on skill.",
    "pass": "You pass the technical interview by demonstrating a real project with CI green builds, POM structure, and articulate answers about fixture design from the course.",
    "fail": "You watch half the videos without doing exercises, list \"Playwright\" on your résumé, and freeze in the interview when asked to write a locator strategy from scratch."
  },
  "advantages": [
    "Sequenced curriculum prevents knowledge gaps common in self-directed learning",
    "Project-based courses produce portfolio pieces for job applications",
    "Completion certificates recognized by HR and hiring managers",
    "Test Automation University is free and vendor-agnostic",
    "Corporate platforms (LinkedIn Learning) integrate with employer L&D budgets"
  ],
  "limitations": [
    "Video content goes stale — verify Playwright version used in the course before enrolling",
    "Quality varies enormously between instructors on Udemy and Coursera",
    "Courses teach patterns, not your company's specific application — expect a translation gap",
    "Passive video watching without exercises produces little retention",
    "Some courses are JavaScript-focused — confirm Python coverage before purchasing"
  ],
  "tools": [
    {
      "name": "Udemy / Coursera",
      "sub": "Paid project-based courses",
      "url": "https://www.udemy.com",
      "desc": "Marketplace platforms with multiple Playwright courses — search for \"Playwright Python\" or \"Playwright pytest.\" Look for courses updated within the last 12 months, with 4+ star ratings, and a capstone project (e-commerce, login flows, API testing). Udemy frequently runs sales ($10–15 per course). Coursera offers university-branded specializations with more academic rigor. Check the curriculum for POM, fixtures, CI integration, and trace debugging before buying.",
      "adv": [
        "Wide selection — compare curricula and reviews before committing",
        "Frequent sales make quality courses affordable",
        "Lifetime access on Udemy — revisit after Playwright upgrades",
        "Many courses include downloadable project code"
      ],
      "lim": [
        "Instructor quality varies — read recent reviews, not just star count",
        "Some courses are repackaged Selenium content with Playwright branding",
        "Certificate value depends on the employer — not all hiring managers weight them heavily"
      ],
      "steps": [
        {
          "t": "Step 1 — Evaluate before purchasing",
          "p": "Check curriculum, Playwright version, and Python vs JavaScript:",
          "c": "# Evaluation checklist:\n# - Updated within 12 months?\n# - Python + pytest (not just JavaScript)?\n# - Covers POM, CI, fixtures, trace viewer?\n# - Capstone project included?\n# - Recent reviews mention current Playwright version?"
        },
        {
          "t": "Step 2 — Complete every exercise and publish the capstone",
          "p": "Push your course project to a public GitHub repo:",
          "c": "git init playwright-course-capstone\ngit add .\ngit commit -m \"Playwright Python capstone from [Course Name]\"\n# Add repo link to LinkedIn and résumé"
        }
      ]
    },
    {
      "name": "LinkedIn Learning",
      "sub": "Corporate L&D platform",
      "url": "https://www.linkedinlearning.com",
      "desc": "Subscription-based learning platform often included in corporate benefits. Offers automation testing learning paths and individual Playwright courses. Certificates appear on your LinkedIn profile automatically. Best when your employer already pays for access — avoids out-of-pocket cost. Search for \"Playwright\" and \"test automation\" within the platform's QA and software testing categories.",
      "adv": [
        "Often free through employer subscription",
        "Certificates display on LinkedIn profile for recruiter visibility",
        "Learning paths bundle related courses into coherent tracks",
        "Professional production quality"
      ],
      "lim": [
        "Smaller Playwright catalog than Udemy",
        "Requires active employer subscription for free access",
        "Courses may lag behind latest Playwright releases",
        "Less depth on advanced topics (sharding, custom fixtures) than specialized Udemy courses"
      ],
      "steps": [
        {
          "t": "Step 1 — Check if your employer provides access",
          "p": "Search LinkedIn Learning from your work account:",
          "c": "# If available: complete a Playwright course\n# Add certificate to LinkedIn profile via platform integration"
        }
      ]
    },
    {
      "name": "Test Automation University",
      "sub": "Free · Applitools",
      "url": "https://testautomationu.applitools.com",
      "desc": "A free online university for test automation, vendor-agnostic despite being hosted by Applitools. Offers structured courses on Playwright, Selenium, Cypress, API testing, and CI/CD. Courses include video lessons, quizzes, and certificates of completion. Ideal for QA engineers who want structured learning without cost, and for team leads who need a assignable onboarding resource. Search for Playwright-specific modules and related courses on pytest and JavaScript/TypeScript Playwright.",
      "adv": [
        "Completely free with certificates",
        "Vendor-agnostic content — not a sales pitch for Applitools",
        "Structured paths from beginner to advanced automation topics",
        "Recognized in the QA community"
      ],
      "lim": [
        "Primarily JavaScript/TypeScript Playwright courses — fewer Python options",
        "Self-paced with no instructor feedback",
        "Course catalog updates slower than paid platforms",
        "Certificate is completion-based, not proctored exam"
      ],
      "steps": [
        {
          "t": "Step 1 — Create a free account and enroll in Playwright courses",
          "p": "Complete courses in order: intro → POM → CI:",
          "c": "# testautomationu.applitools.com\n# Enroll: Playwright courses + related pytest/API modules\n# Download certificates after each completion"
        }
      ]
    },
    {
      "name": "Microsoft Learn",
      "sub": "Official Microsoft training",
      "url": "https://learn.microsoft.com",
      "desc": "Microsoft's free learning platform may include Playwright modules as part of broader web development, testing, or Azure DevOps learning paths. Since Microsoft maintains Playwright, Learn modules tend to be accurate and current. Search for Playwright, end-to-end testing, and Azure Pipelines integration. Best for teams already in the Microsoft ecosystem (Azure DevOps, GitHub Actions, .NET shops adopting Playwright for Python microservices).",
      "adv": [
        "Free and maintained by Playwright's parent organization",
        "Integrates Playwright learning with Azure DevOps and GitHub Actions paths",
        "Achievement badges for completed modules",
        "High accuracy on API and feature coverage"
      ],
      "lim": [
        "Playwright-specific catalog is smaller than dedicated course platforms",
        "Often embedded in larger learning paths — harder to find standalone Playwright track",
        "May favour TypeScript/JavaScript examples",
        "Less project-based depth than Udemy capstone courses"
      ],
      "steps": [
        {
          "t": "Step 1 — Search learn.microsoft.com for Playwright modules",
          "p": "Complete modules relevant to your CI platform:",
          "c": "# Search: \"playwright\" site:learn.microsoft.com\n# Prioritize: E2E testing, CI integration, trace debugging"
        }
      ]
    }
  ],
  "contentMarkdown": "## 56. Courses & Structured Learning Platforms\n\nStructured courses complement hands-on capstone work with guided progression.\n\n### Recommended platforms\n\n- **Test Automation University (Applitools)** — free courses on Selenium, Cypress, Playwright-adjacent topics, CI, and visual testing.\n- **Microsoft Learn** — official Playwright modules including framework building and CI integration.\n- **Udemy / Pluralsight** — paid courses for deep dives; check recency (Playwright changes fast — prefer courses updated within the last 12 months).\n\n### Course selection criteria\n\n- Does it use pytest-playwright (Python) or Playwright Test (JS)? Match your stack.\n- Does it cover CI integration, not just local `pytest`?\n- Are reviews recent and mentioning current Playwright versions?",
  "exercises": [],
  "resourceLinks": [
    {
      "title": "Test Automation University",
      "url": "https://testautomationu.applitools.com/",
      "description": "Free courses on automation fundamentals, CI, visual testing, and more."
    },
    {
      "title": "Microsoft Learn — Playwright modules",
      "url": "https://learn.microsoft.com/en-us/training/browse/?products=playwright",
      "description": "Official Microsoft training paths for Playwright and test automation."
    },
    {
      "title": "Udemy — Playwright courses",
      "url": "https://www.udemy.com/topic/playwright/",
      "description": "Paid courses — filter by recent updates and Python/pytest content."
    },
    {
      "title": "Playwright Python documentation",
      "url": "https://playwright.dev/python/docs/intro",
      "description": "Free official docs with runnable examples — the best zero-cost course."
    },
    {
      "title": "Ministry of Testing — Courses",
      "url": "https://www.ministryoftesting.com/courses",
      "description": "Community courses on testing fundamentals and automation strategy."
    }
  ],
  "steps": [],
  "learn": []
} as ChapterRecord;
