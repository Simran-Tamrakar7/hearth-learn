/** Chapter body for /manuals/bug-advocacy. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "bug-advocacy",
  "title": "Bug Reporting & Advocacy",
  "tagline": "Repro, severity, evidence, and negotiating fixes without becoming “the blocker.”",
  "category": "quality",
  "accent": "#1A4A3A",
  "cover": "covers/communication-cover.png",
  "duration": "2–4 weeks",
  "levelSpan": "Beginner → Pro",
  "who": "QA and anyone who files defects and wants them fixed for the right reasons.",
  "outcomes": [
    "Write bugs that engineers can reproduce in minutes",
    "Separate severity from priority and argue with evidence",
    "Advocate for fixes without escalating personality wars"
  ],
  "chapters": [
    {
      "id": "ba-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this path",
      "minutes": 15,
      "durationLabel": "Day 0",
      "overview": "A bug report is a persuasive document. Your job: make the problem undeniable and the impact clear. Collect 3 of your past bugs as specimens.",
      "learn": [
        "Specimens",
        "Advocacy mindset"
      ],
      "steps": [
        {
          "title": "Gather specimens",
          "body": "One good, one mediocre, one that got “can’t repro.”",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Save links to three bugs. You’ll rewrite the weak ones.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Three specimens saved"
      ],
      "resources": [
        {
          "type": "article",
          "name": "How to write a bug report",
          "url": "https://www.ministryoftesting.com/articles/how-to-write-a-bug-report",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "A bug report is a persuasive document. Your job: make the problem undeniable and the impact clear. Collect 3 of your past bugs as specimens.",
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
      "id": "ba-repro",
      "phase": "A · Craft",
      "level": "beginner",
      "title": "Repro steps that work",
      "minutes": 35,
      "durationLabel": "Week 1",
      "overview": "Numbered steps, starting state, test data, environment. If you can’t repro twice, say so — and what varies.",
      "learn": [
        "Minimal repro",
        "Starting state",
        "Flake honesty"
      ],
      "steps": [
        {
          "title": "Minimal path",
          "body": "Strip irrelevant clicks. One path, one bug.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Rewrite your weakest bug’s steps. Time a teammate reproducing.",
          "tip": "Video helps; it does not replace steps.",
          "code": "Environment: staging, Chrome 128, user role X, build abc123\nPreconditions: account with … / flag ON\nSteps:\n1. …\n2. …\nExpected: …\nActual: …\nFrequency: 3/3 (or 1/5 — flake)",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Weak bug rewritten",
        "Teammate repro timed"
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Numbered steps, starting state, test data, environment. If you can’t repro twice, say so — and what varies.",
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
      "id": "ba-evidence",
      "phase": "A · Craft",
      "level": "beginner",
      "title": "Evidence packs",
      "minutes": 30,
      "overview": "Screenshots, screen recordings, console errors, network HAR, logs, correlation ids. Attach what proves Actual.",
      "learn": [
        "What to capture",
        "PII caution",
        "Redaction"
      ],
      "steps": [
        {
          "title": "Evidence checklist",
          "body": "Match evidence to bug type: UI visual vs API 500 vs race.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add missing evidence to one open bug. Redact PII.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One bug upgraded with evidence"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "Chrome DevTools Network",
          "url": "https://developer.chrome.com/docs/devtools/network/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Screenshots, screen recordings, console errors, network HAR, logs, correlation ids. Attach what proves Actual.",
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
      "id": "ba-sev-pri",
      "phase": "A · Craft",
      "level": "intermediate",
      "title": "Severity vs priority",
      "minutes": 30,
      "overview": "Severity = impact on users/system. Priority = order of work. You recommend; product/eng own priority.",
      "learn": [
        "Scales",
        "User impact stories",
        "Avoiding P0 spam"
      ],
      "steps": [
        {
          "title": "Impact narrative",
          "body": "Who is hurt, how often, workarounds, blast radius.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write severity rationale for 3 bugs in two sentences each.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Sev-1 — blocker / data loss / security / no workaround",
            "Sev-2 — major feature broken, limited workaround",
            "Sev-3 — partial / annoying / edge",
            "Sev-4 — cosmetic / polish"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Three rationales written"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Severity = impact on users/system. Priority = order of work. You recommend; product/eng own priority.",
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
      "id": "ba-title",
      "phase": "A · Craft",
      "level": "beginner",
      "title": "Titles & taxonomy",
      "minutes": 25,
      "overview": "Searchable titles: component + failure. Labels for area. Don’t bury the lede in “weird issue.”",
      "learn": [
        "Title patterns",
        "Duplicates",
        "Components"
      ],
      "steps": [
        {
          "title": "Title clinic",
          "body": "Bad: “Button broken.” Better: “Checkout — Pay CTA disabled after applying expired coupon.”",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Rewrite 5 titles for clarity + search.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Five titles rewritten"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Searchable titles: component + failure. Labels for area. Don’t bury the lede in “weird issue.”",
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
      "id": "ba-cp1",
      "kind": "checkpoint",
      "phase": "B · Advocacy",
      "level": "intermediate",
      "title": "Checkpoint: gold-standard bug",
      "minutes": 40,
      "durationLabel": "Gate",
      "overview": "One bug with perfect repro, evidence, sev rationale, and clean title — peer-reviewed.",
      "learn": [
        "Bar setting"
      ],
      "steps": [
        {
          "title": "Ship gold",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Peer rates: repro clarity 1–5. Iterate until ≥4.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Gold bug ≥4/5",
        "Template updated from lessons"
      ],
      "parentId": null,
      "overviewText": "One bug with perfect repro, evidence, sev rationale, and clean title — peer-reviewed.",
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
      "id": "ba-advocate",
      "phase": "B · Advocacy",
      "level": "advanced",
      "title": "Negotiating fixes",
      "minutes": 35,
      "durationLabel": "Week 2",
      "overview": "Advocacy: connect bug to user/business risk, offer options (fix now / flag / monitor / defer with date). Stay curious, not adversarial.",
      "learn": [
        "Options framing",
        "Data & support tickets",
        "When to escalate"
      ],
      "steps": [
        {
          "title": "Options memo",
          "body": "For a contested bug: fix now / mitigate / accept risk until date.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a short options note for one deferred bug. Share with owner.",
          "tip": "Ask “what would change your mind?” — genuine curiosity.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Escalation path",
          "body": "Know when safety/security/legal overrides backlog preference.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Document your team’s escalation path in 5 bullets.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Options memo shared",
        "Escalation path written"
      ],
      "resources": [
        {
          "type": "article",
          "name": "Bug advocacy (Kaner)",
          "url": "http://www.kaner.com/pdfs/bugadvoc.pdf",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Advocacy: connect bug to user/business risk, offer options (fix now / flag / monitor / defer with date). Stay curious, not adversarial.",
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
      "id": "ba-tone",
      "phase": "B · Advocacy",
      "level": "intermediate",
      "title": "Tone, ego, and relationships",
      "minutes": 25,
      "overview": "Attack the defect, not the developer. Assume competence. Celebrate fixes. Your reputation is compounding capital.",
      "learn": [
        "Feedback hygiene",
        "Public vs private",
        "Credit"
      ],
      "steps": [
        {
          "title": "Rewrite heat",
          "body": "Remove sarcasm and absolute language from one heated comment.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Before/after of a comment. Prefer questions and impact.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One comment rewritten"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Attack the defect, not the developer. Assume competence. Celebrate fixes. Your reputation is compounding capital.",
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
      "id": "ba-cp2",
      "kind": "checkpoint",
      "phase": "B · Advocacy",
      "level": "advanced",
      "title": "Checkpoint: advocacy case study",
      "minutes": 45,
      "durationLabel": "Capstone",
      "overview": "Document one bug from find → report → negotiate → outcome. What worked?",
      "learn": [
        "Reflection"
      ],
      "steps": [
        {
          "title": "Case study",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "1–2 pages: timeline, artifacts, what you’d do differently.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Initial report link",
            "Evidence & sev rationale",
            "Pushback faced",
            "Resolution / risk acceptance",
            "Lesson for the team template"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Case study published",
        "One template improvement merged"
      ],
      "note": "Pace: 2–4 weeks. Clarity and respect move more bugs than volume.",
      "parentId": null,
      "overviewText": "Document one bug from find → report → negotiate → outcome. What worked?",
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
        "name": "MoT — Bug reports",
        "url": "https://www.ministryoftesting.com/articles/how-to-write-a-bug-report"
      },
      {
        "name": "Chrome DevTools",
        "url": "https://developer.chrome.com/docs/devtools/"
      }
    ],
    "tools": [
      "Issue tracker templates",
      "Loom / QuickTime",
      "HAR export",
      "Log search"
    ],
    "books": [
      "Lessons Learned in Software Testing — bug advocacy chapters"
    ],
    "practice": [
      "Rewrite 10 bugs",
      "Peer repro challenge weekly"
    ],
    "videos": []
  }
};
