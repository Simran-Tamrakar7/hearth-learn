/** Chapter body for /manuals/portfolio. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "portfolio",
  "title": "Portfolio That Hires",
  "tagline": "Public proof beats claims — repos, writeups, and demos employers can trust.",
  "category": "career",
  "accent": "#145C4A",
  "cover": "covers/git-cover.png",
  "duration": "2–4 weeks",
  "levelSpan": "Beginner → Pro",
  "who": "Automation and QA folks who need a GitHub story, not a graveyard of half-repos.",
  "outcomes": [
    "Ship one portfolio repo with README that sells the craft",
    "Show architecture, tests, and CI in plain language",
    "Record a short demo employers will actually watch"
  ],
  "chapters": [
    {
      "id": "pf-pick",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "One flagship, not twelve toys",
      "minutes": 20,
      "overview": "Depth beats clutter. One excellent Playwright/framework repo outperforms ten tutorials.",
      "learn": [
        "Flagship criteria",
        "What to leave out"
      ],
      "steps": [
        {
          "title": "Choose the flagship",
          "body": "Must: runnable, documented, shows judgment. Nice: CI badge, traces, API+UI.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Name the repo. Archive or hide the noise.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Flagship named",
        "Noise repos cleaned or archived"
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Depth beats clutter. One excellent Playwright/framework repo outperforms ten tutorials.",
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
      "id": "pf-readme",
      "phase": "A · Build proof",
      "level": "beginner",
      "title": "README as sales page",
      "minutes": 35,
      "overview": "Problem, approach, how to run, architecture sketch, sample report. Assume zero Slack access.",
      "learn": [
        "README structure",
        "Screenshots / GIFs",
        "Honest scope"
      ],
      "steps": [
        {
          "title": "Write the README",
          "body": "Top: what it is + why. Then quickstart. Then design choices. Then limitations.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Ship a README someone else can run in 15 minutes.",
          "tip": "A diagram beats three paragraphs of folder poetry.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Quickstart works cold",
        "Architecture section present"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Problem, approach, how to run, architecture sketch, sample report. Assume zero Slack access.",
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
      "id": "pf-ci",
      "phase": "A · Build proof",
      "level": "intermediate",
      "title": "CI & evidence",
      "minutes": 35,
      "overview": "Green badge, artifacts, and a failure you can explain. That’s interview fuel.",
      "learn": [
        "GitHub Actions basics",
        "Artifacts",
        "Flake honesty"
      ],
      "steps": [
        {
          "title": "Wire a pipeline",
          "body": "On PR: install, test, upload report/trace on failure.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Get a green run. Link it from README.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "CI green on main",
        "Failure artifact linked or described"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Green badge, artifacts, and a failure you can explain. That’s interview fuel.",
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
      "id": "pf-demo",
      "phase": "B · Show it",
      "level": "intermediate",
      "title": "Two-minute demo",
      "minutes": 30,
      "overview": "Talk over a recording: problem → structure → one test → CI. No apology tour.",
      "learn": [
        "Demo script",
        "Pacing",
        "What to skip"
      ],
      "steps": [
        {
          "title": "Record once",
          "body": "Script 5 beats. Record. Watch at 1.5×. Cut filler.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Upload unlisted YouTube or Loom. Link from README.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Demo under 3 minutes",
        "Link on README"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Talk over a recording: problem → structure → one test → CI. No apology tour.",
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
      "id": "pf-cp",
      "kind": "checkpoint",
      "phase": "B · Show it",
      "level": "advanced",
      "title": "Checkpoint: hiring manager view",
      "minutes": 45,
      "durationLabel": "Gate",
      "overview": "A stranger opens your repo. Can they run it and understand your design in 20 minutes?",
      "learn": [
        "Friction logging"
      ],
      "steps": [
        {
          "title": "Cold run",
          "body": "Peer follows README only. You may not help live.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Fix every friction note they logged.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Cold run completed",
        "Friction fixes merged"
      ],
      "practice": {
        "title": "Stranger test",
        "brief": "Complete checkpoint with someone who hasn’t seen the repo."
      },
      "parentId": null,
      "overviewText": "A stranger opens your repo. Can they run it and understand your design in 20 minutes?",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    }
  ],
  "resources": {
    "docs": [
      {
        "name": "GitHub Docs — Actions",
        "url": "https://docs.github.com/en/actions"
      },
      {
        "name": "Awesome README tips",
        "url": "https://github.com/matiassingers/awesome-readme"
      }
    ],
    "tools": [
      "GitHub",
      "Loom",
      "Excalidraw"
    ],
    "books": [],
    "practice": [],
    "videos": []
  }
};
