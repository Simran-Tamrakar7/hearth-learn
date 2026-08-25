/** Chapter body for /manuals/documentation-systems. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "documentation-systems",
  "title": "Documentation Systems",
  "tagline": "READMEs, ADRs, runbooks — docs as a system, not a graveyard.",
  "category": "ops",
  "accent": "#14532D",
  "cover": "covers/git-cover.png",
  "duration": "3–4 weeks",
  "levelSpan": "Beginner → Intermediate",
  "who": "Teams drowning in outdated wikis who want a small, living doc system.",
  "outcomes": [
    "Set up a practical doc hierarchy with owners",
    "Write ADRs and runbooks that get used",
    "Run a lightweight docs review cadence"
  ],
  "chapters": [
    {
      "id": "ds-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this path",
      "minutes": 20,
      "durationLabel": "Day 0",
      "overview": "Docs fail as systems when nobody owns freshness. You’ll design a minimal system for one team/repo and migrate 3 critical pages.",
      "learn": [
        "Scope",
        "Canonical home"
      ],
      "steps": [
        {
          "title": "Pick the home",
          "body": "Repo /docs, Notion, Confluence — one canonical place. Others link in.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Declare the canonical home in writing. List competing graveyards.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Canonical home declared"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "Write the Docs — Docs as Code",
          "url": "https://www.writethedocs.org/guide/docs-as-code/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "article",
          "name": "Diátaxis framework",
          "url": "https://diataxis.fr/",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "Docs fail as systems when nobody owns freshness. You’ll design a minimal system for one team/repo and migrate 3 critical pages.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "ds-diataxis",
      "phase": "A · Structure",
      "level": "beginner",
      "title": "Diátaxis: four doc types",
      "minutes": 30,
      "durationLabel": "Week 1",
      "overview": "Tutorials, how-to guides, reference, explanation. Mixing them confuses readers.",
      "learn": [
        "Four types",
        "Sorting existing pages"
      ],
      "steps": [
        {
          "title": "Sort 10 pages",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Label 10 existing docs by Diátaxis type. Note misfits to split.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Ten pages labeled"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "Diátaxis",
          "url": "https://diataxis.fr/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Tutorials, how-to guides, reference, explanation. Mixing them confuses readers.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "ds-readme",
      "phase": "A · Structure",
      "level": "beginner",
      "title": "READMEs that onboard",
      "minutes": 35,
      "overview": "What is this, why, quickstart, how to test, where to learn more. Link deep docs — don’t paste novels.",
      "learn": [
        "README anatomy",
        "Quickstart test"
      ],
      "steps": [
        {
          "title": "README rewrite",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Rewrite one README. Have a peer onboard from zero using only it.",
          "tip": null,
          "code": "# Name\nWhat / why\n## Quickstart\n## Develop\n## Test\n## Config\n## Troubleshoot\n## Deeper docs",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "README peer-tested"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "What is this, why, quickstart, how to test, where to learn more. Link deep docs — don’t paste novels.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "ds-adr",
      "phase": "B · Decisions",
      "level": "intermediate",
      "title": "ADRs — Architecture Decision Records",
      "minutes": 35,
      "durationLabel": "Week 2",
      "overview": "Capture context, decision, consequences. Future humans stop re-litigating the past.",
      "learn": [
        "ADR format",
        "When to write",
        "Superseding"
      ],
      "steps": [
        {
          "title": "Write an ADR",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Document one real past decision (even retroactively).",
          "tip": null,
          "code": "# ADR-001: Title\nDate / Status: accepted\nContext:\nDecision:\nConsequences:\nAlternatives considered:",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One ADR merged or filed"
      ],
      "resources": [
        {
          "type": "article",
          "name": "Quinn — ADRs",
          "url": "https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "ADR GitHub org",
          "url": "https://adr.github.io/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Capture context, decision, consequences. Future humans stop re-litigating the past.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "ds-runbook",
      "phase": "B · Decisions",
      "level": "intermediate",
      "title": "Runbooks for humans at 2am",
      "minutes": 40,
      "overview": "Symptoms → diagnosis checks → mitigate → escalate → verify. Short. Executable. Owned.",
      "learn": [
        "Runbook structure",
        "Verification",
        "Ownership"
      ],
      "steps": [
        {
          "title": "Write a runbook",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "One runbook for a real alert or failure mode. Dry-run the steps.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Symptoms",
            "Checks",
            "Mitigations",
            "Rollback",
            "Escalation contacts",
            "Last verified"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Runbook dry-run"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Symptoms → diagnosis checks → mitigate → escalate → verify. Short. Executable. Owned.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "ds-cp1",
      "kind": "checkpoint",
      "phase": "B · Decisions",
      "level": "intermediate",
      "title": "Checkpoint: three canonical docs",
      "minutes": 40,
      "durationLabel": "Gate",
      "overview": "Ship README + ADR + runbook into the canonical home with owners.",
      "learn": [
        "Minimum viable system"
      ],
      "steps": [
        {
          "title": "Publish trio",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Index page linking all three. Announce in team channel.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Trio live",
        "Announced"
      ],
      "parentId": null,
      "overviewText": "Ship README + ADR + runbook into the canonical home with owners.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "ds-cadence",
      "phase": "C · System",
      "level": "advanced",
      "title": "Owners, review cadence, deletion",
      "minutes": 30,
      "durationLabel": "Week 3",
      "overview": "Every page: owner + review date. Delete or archive boldly. Search that returns corpses trains people to ask Slack instead.",
      "learn": [
        "Ownership",
        "Review ritual",
        "Archive policy"
      ],
      "steps": [
        {
          "title": "Cadence",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add owners/dates to 10 pages. Schedule a 30-min monthly docs triage.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Ten pages stamped",
        "Triage scheduled"
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Every page: owner + review date. Delete or archive boldly. Search that returns corpses trains people to ask Slack instead.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "ds-search",
      "phase": "C · System",
      "level": "advanced",
      "title": "Discoverability",
      "minutes": 25,
      "overview": "Index pages, naming conventions, tags, “start here.” If people can’t find it, it doesn’t exist.",
      "learn": [
        "Index design",
        "Naming",
        "Slack → doc redirection"
      ],
      "steps": [
        {
          "title": "Start-here page",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create a start-here index for your team’s top 10 tasks.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Start-here published"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Index pages, naming conventions, tags, “start here.” If people can’t find it, it doesn’t exist.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "ds-cp2",
      "kind": "checkpoint",
      "phase": "C · System",
      "level": "advanced",
      "title": "Checkpoint: docs system brief",
      "minutes": 45,
      "durationLabel": "Capstone",
      "overview": "One-page system brief: home, types, templates, owners, cadence, deletion policy.",
      "learn": [
        "Institutionalize"
      ],
      "steps": [
        {
          "title": "System brief",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Get lead +1. Run first triage meeting.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Canonical home",
            "Templates (README/ADR/runbook)",
            "Owner rules",
            "Monthly triage",
            "Archive/delete policy",
            "Start-here index"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Brief +1",
        "First triage done"
      ],
      "note": "Pace: 3–4 weeks. Deletion is a feature.",
      "parentId": null,
      "overviewText": "One-page system brief: home, types, templates, owners, cadence, deletion policy.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "partIntro": null
    }
  ],
  "resources": {
    "docs": [
      {
        "name": "Diátaxis",
        "url": "https://diataxis.fr/"
      },
      {
        "name": "Write the Docs — Docs as Code",
        "url": "https://www.writethedocs.org/guide/docs-as-code/"
      },
      {
        "name": "ADR resources",
        "url": "https://adr.github.io/"
      }
    ],
    "tools": [
      "Git + Markdown",
      "MkDocs / Docusaurus",
      "Notion/Confluence",
      "Issue templates for doc debt"
    ],
    "books": [
      "Docs for Developers",
      "Team Topologies — for ownership context (selective)"
    ],
    "practice": [
      "Monthly docs triage",
      "ADR for every non-trivial decision"
    ],
    "videos": [
      {
        "name": "Write the Docs videos",
        "url": "https://www.writethedocs.org/videos/"
      }
    ]
  }
};
