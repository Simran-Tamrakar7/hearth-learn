import type { ChapterRecord } from "../../../types";

/** 58. Conferences & Talks */
export const chapter = {
  "id": "pw-8-conferences",
  "title": "58. Conferences & Talks",
  "minutes": 15,
  "level": "reference",
  "phase": "Part 8 · Resources",
  "partName": "Part 8 · Resources",
  "overviewText": "Conferences and recorded talks compress years of practitioner experience into 30–45 minute sessions — migration stories, architecture decisions, flake-reduction strategies, and live demos of new Playwright features. Cross-tool automation conferences like SeleniumConf and TestJS Summit regularly feature Playwright sessions alongside Selenium, Cypress, and WebdriverIO talks, giving you comparative context. PyCon archives include testing and automation talks searchable by \"playwright.\" Ministry of Testing's TestBash conferences focus on QA strategy and community. Recorded keynotes and AMA sessions from Playwright maintainers at Microsoft Build and similar events reveal roadmap direction. For a QA career, conference talks are high-density learning and networking opportunities — even recorded sessions you watch months later.",
  "why": "Conference talks capture the reasoning behind tooling decisions that blog posts summarize in a paragraph. A 40-minute migration talk from a QA director includes the failures, timeline revisions, and political challenges that a success-story blog omits. Maintainer keynotes at Microsoft Build announce features with live demos before documentation is updated. Attending (or watching recordings from) conferences also connects you to the QA community — speakers often share slides, repos, and LinkedIn contacts that lead to mentorship and job opportunities. For senior QA roles, referencing conference talks in architecture proposals signals you engage with the broader profession, not just your team's Slack channel.",
  "when": "Watch recorded talks before proposing a Playwright migration or major framework refactor — peer stories strengthen your business case. Attend live conferences when your employer provides budget, especially TestBash or SeleniumConf if Playwright sessions are on the agenda. Search PyCon archives when you need Python-specific Playwright patterns. Watch maintainer keynotes within a month of each major Playwright release. Share relevant talk links in your team's learning channel after conferences — one good talk per quarter keeps the team current without mandatory training.",
  "practical": {
    "app": "QA career — Justifying a Playwright migration to engineering leadership",
    "scenario": "Your team runs 400 Selenium tests with a 35% flake rate and 90-minute CI runs. You find a SeleniumConf recording where a peer company's QA lead presents their Playwright migration: 6-month timeline, flake rate dropped to 3%, CI cut to 25 minutes. You embed the talk's metrics in your proposal deck and reference the speaker's architecture diagram.",
    "pass": "Leadership approves a phased pilot because your proposal cites a credible conference presentation with verifiable metrics, not vendor marketing.",
    "fail": "You propose Playwright based on a Twitter thread. In the review, a staff engineer asks about parallelization strategy and you have no structured reference — the proposal is deferred indefinitely."
  },
  "advantages": [
    "High information density — 40 minutes of curated practitioner experience",
    "Migration talks provide real timelines, team sizes, and metrics for proposals",
    "Maintainer keynotes reveal roadmap before official docs are updated",
    "Recorded sessions are free and searchable months after the event",
    "Networking at live events leads to mentorship and career opportunities"
  ],
  "limitations": [
    "Live conference attendance is expensive (ticket, travel, hotel) — recordings are the practical default",
    "Talk quality varies — keynote polish does not always mean actionable content",
    "Sessions age — a 2022 talk may reference deprecated Playwright APIs",
    "JavaScript/TypeScript examples predominate — translate patterns to Python",
    "Conference hype can oversell tools — evaluate claims against your team's constraints"
  ],
  "tools": [
    {
      "name": "SeleniumConf / TestJS Summit",
      "sub": "Cross-tool automation conferences",
      "url": "https://seleniumconf.com",
      "desc": "Major automation testing conferences that feature Playwright sessions alongside Selenium, Cypress, WebdriverIO, and CI/CD topics. Talks cover migration stories, framework architecture, flake reduction, and cloud execution. Recordings are typically published on YouTube within weeks of the event. Search the conference YouTube channel for \"playwright\" to find relevant sessions across multiple years.",
      "adv": [
        "Comparative context — see Playwright discussed alongside competing tools",
        "Migration talks with real metrics from enterprise teams",
        "Free recordings available after the event",
        "Slides often downloadable from speaker GitHub repos"
      ],
      "lim": [
        "Annual events — new Playwright content appears once or twice per year",
        "Not Playwright-exclusive — must filter the agenda",
        "Live attendance is costly for individual contributors without employer sponsorship"
      ],
      "steps": [
        {
          "t": "Step 1 — Search conference YouTube channels for Playwright talks",
          "p": "Build a watchlist before your next tooling proposal:",
          "c": "# YouTube search: \"playwright\" site:youtube.com seleniumconf\n# YouTube search: \"playwright migration\" testjs summit"
        }
      ]
    },
    {
      "name": "PyCon Talks",
      "sub": "Python conference archives",
      "url": "https://www.youtube.com/c/PyConUS",
      "desc": "The annual Python conference (PyCon US and regional PyCons) includes testing and automation talks in its archive. Search for \"playwright,\" \"pytest,\" and \"test automation\" in the PyCon YouTube channel. These talks are Python-specific — directly applicable to pytest-playwright projects — and often include live coding demos with real project structure.",
      "adv": [
        "Python-specific — no JavaScript-to-Python translation needed",
        "Live coding demos show real pytest-playwright patterns",
        "Free archive spanning many years of talks",
        "Speakers often publish companion GitHub repos"
      ],
      "lim": [
        "Playwright talks are a small fraction of total PyCon content",
        "Annual cadence — may wait a year for new Playwright-specific content",
        "Talk length (30 min) limits depth on complex topics"
      ],
      "steps": [
        {
          "t": "Step 1 — Search PyCon archives for Playwright and pytest talks",
          "p": "Watch talks matching your current challenge:",
          "c": "# youtube.com/c/PyConUS — search: playwright\n# Also search: pytest fixtures, test automation"
        }
      ]
    },
    {
      "name": "TestBash (Ministry of Testing)",
      "sub": "QA community conference",
      "url": "https://www.ministryoftesting.com/testbash",
      "desc": "Ministry of Testing's flagship conference series — TestBash Manchester, Brighton, and online editions. Focuses on software testing strategy, tooling, career development, and community. Regularly features Playwright sessions, flake-reduction workshops, and talks on test leadership. More QA-career-oriented than developer-focused conferences. Recordings available to Ministry of Testing members.",
      "adv": [
        "QA-centric — talks assume testing background, not developer background",
        "Career development and leadership content alongside technical sessions",
        "Strong community — attendees are practicing QA professionals",
        "Online editions reduce travel cost"
      ],
      "lim": [
        "Full recordings may require MoT membership",
        "Less deep on Playwright API details than SeleniumConf technical sessions",
        "Bi-annual live events — limited new content per year"
      ],
      "steps": [
        {
          "t": "Step 1 — Check TestBash agenda for Playwright sessions",
          "p": "Attend live or watch recordings after the event:",
          "c": "# ministryoftesting.com/testbash — browse upcoming agenda\n# Search past events for: playwright, automation, flaky"
        }
      ]
    },
    {
      "name": "Microsoft Build & Maintainer Talks",
      "sub": "Official Playwright keynotes",
      "url": "https://playwright.dev/community",
      "desc": "Playwright maintainers present at Microsoft Build, GitHub Universe, and community events. These keynotes and AMA sessions announce major features (trace viewer, UI mode, component testing), demonstrate live workflows, and answer community questions about roadmap. Search YouTube for \"playwright\" + \"microsoft build\" or follow the Playwright community page for links to recent talks.",
      "adv": [
        "Authoritative — features demonstrated by the team that built them",
        "Roadmap signal for planning upgrades and framework investments",
        "Often includes live demos of debugging workflows (trace, codegen)",
        "Free on YouTube within days of the event"
      ],
      "lim": [
        "Marketing polish — may emphasize strengths over limitations",
        "TypeScript/JavaScript demos predominate",
        "Infrequent — major talks align with release cycles, not weekly cadence"
      ],
      "steps": [
        {
          "t": "Step 1 — Watch maintainer talks after each major release",
          "p": "Pair the talk with the release blog post:",
          "c": "# After Playwright 1.4x release:\n# 1. Read playwright.dev/blog release post\n# 2. Watch Microsoft Build / community keynote for that version"
        }
      ]
    }
  ],
  "contentMarkdown": "## 58. Conferences & Talks\n\nConferences expose you to patterns, tools, and people you won't find in docs.\n\n### Must-know events\n\n- **TestBash** (Ministry of Testing) — practitioner-focused, inclusive, strong automation track.\n- **PyCon** — Python ecosystem including pytest, tooling, and testing libraries.\n- **SeleniumConf / Automation conferences** — broader automation community; many talks cover Playwright migration.\n\n### Getting value without travel\n\nMost conferences publish talk recordings on YouTube within weeks. Search \"TestBash Playwright\" or \"PyCon pytest\" for free, high-quality sessions. Submit a CFP (Call for Papers) once your capstone is solid — speaking accelerates career visibility.",
  "exercises": [],
  "resourceLinks": [
    {
      "title": "TestBash Events",
      "url": "https://www.ministryoftesting.com/events/testbash",
      "description": "Ministry of Testing flagship conference — online and in-person."
    },
    {
      "title": "PyCon US",
      "url": "https://us.pycon.org/",
      "description": "Annual Python conference — pytest, tooling, and testing talks."
    },
    {
      "title": "SeleniumConf",
      "url": "https://seleniumconf.com/",
      "description": "Broad automation community conference; Playwright migration talks common."
    },
    {
      "title": "Ministry of Testing — All Events",
      "url": "https://www.ministryoftesting.com/events",
      "description": "TestBash, masterclasses, and community meetups worldwide."
    },
    {
      "title": "Playwright Community Events",
      "url": "https://playwright.dev/community/events",
      "description": "Official Playwright meetups and community gatherings."
    }
  ],
  "steps": [],
  "learn": []
} as ChapterRecord;
