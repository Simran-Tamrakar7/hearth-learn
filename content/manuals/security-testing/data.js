/** Chapter body for /manuals/security-testing. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "security-testing",
  "title": "Security Testing Basics",
  "tagline": "Think like an attacker enough to catch the boring, devastating bugs.",
  "category": "quality",
  "accent": "#1A4A3A",
  "cover": "covers/api-testing-cover.png",
  "duration": "3–4 weeks",
  "levelSpan": "Beginner → Intermediate",
  "who": "QA engineers adding security awareness without becoming full-time pen testers.",
  "outcomes": [
    "Spot OWASP Top 10 smells in features you test",
    "Test authz boundaries and sensitive data leaks",
    "Write clear security bugs without fear-mongering"
  ],
  "chapters": [
    {
      "id": "sec-mindset",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "Security mindset for QA",
      "minutes": 25,
      "overview": "You don’t need to hack banks. You need to ask “what if I’m not who I claim?” and “what if this input is hostile?”",
      "learn": [
        "Trust boundaries",
        "Threat vs vulnerability",
        "Responsible reporting"
      ],
      "steps": [
        {
          "title": "Draw the trust line",
          "body": "Client, server, third parties. Mark what you trust and why.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Sketch a trust map for one feature.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Trust map sketched",
        "I know how to escalate findings"
      ],
      "links": [
        {
          "name": "OWASP Top 10",
          "url": "https://owasp.org/www-project-top-ten/",
          "kind": "doc"
        }
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "You don’t need to hack banks. You need to ask “what if I’m not who I claim?” and “what if this input is hostile?”",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "sec-auth",
      "phase": "A · Common flaws",
      "level": "beginner",
      "title": "Auth & session basics",
      "minutes": 35,
      "overview": "Broken auth and session mishandling are still everyday bugs. Test logout, expiry, and privilege.",
      "learn": [
        "Session fixation smells",
        "Logout reality",
        "Role checks"
      ],
      "steps": [
        {
          "title": "Horizontal privilege",
          "body": "Can user A see user B’s resource by changing an ID?",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Attempt one IDOR-style check on a safe staging app.",
          "tip": "Never test production with destructive payloads.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Logout verified",
        "One IDOR attempt documented"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Broken auth and session mishandling are still everyday bugs. Test logout, expiry, and privilege.",
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
      "id": "sec-input",
      "phase": "A · Common flaws",
      "level": "intermediate",
      "title": "Injection & XSS awareness",
      "minutes": 35,
      "overview": "Know enough XSS/SQLi patterns to recognize them and hand off safely.",
      "learn": [
        "Reflected vs stored XSS",
        "Input sinks",
        "Safe proof-of-concept"
      ],
      "steps": [
        {
          "title": "Harmless probe",
          "body": "Use a benign marker string. If it renders raw, escalate. Don’t spray real exploits.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Test one form field with a safe marker; note encoding.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Safe probe recorded",
        "Encoding behavior noted"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Know enough XSS/SQLi patterns to recognize them and hand off safely.",
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
      "id": "sec-cp",
      "kind": "checkpoint",
      "phase": "B · Practice",
      "level": "intermediate",
      "title": "Checkpoint: security smoke",
      "minutes": 40,
      "durationLabel": "Gate",
      "overview": "Run a mini security smoke on staging: authz, session, sensitive fields, headers notes.",
      "learn": [
        "Smoke packaging",
        "Severity language"
      ],
      "steps": [
        {
          "title": "Ship the smoke report",
          "body": "One page: what you tried, what failed, what’s unknown.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write the report. Include “out of scope.”",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Authz checks done",
        "Session checks done",
        "Report shared"
      ],
      "practice": {
        "title": "Smoke pack",
        "brief": "Complete checkpoint report on a practice app (e.g. OWASP Juice Shop)."
      },
      "links": [
        {
          "name": "OWASP Juice Shop",
          "url": "https://owasp.org/www-project-juice-shop/",
          "kind": "practice"
        }
      ],
      "parentId": null,
      "overviewText": "Run a mini security smoke on staging: authz, session, sensitive fields, headers notes.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "sec-pro",
      "phase": "B · Practice",
      "level": "advanced",
      "title": "Partnering with AppSec",
      "minutes": 25,
      "overview": "Know when to stop and escalate. Build a lightweight security regression list for releases.",
      "learn": [
        "Escalation paths",
        "Regression checklist",
        "Secrets hygiene in tests"
      ],
      "steps": [
        {
          "title": "Regression list",
          "body": "Five checks you will always run before major releases.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add the list to your team wiki or README.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Escalation contact known",
        "5-item regression list exists"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Know when to stop and escalate. Build a lightweight security regression list for releases.",
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
    }
  ],
  "resources": {
    "docs": [
      {
        "name": "OWASP Top 10",
        "url": "https://owasp.org/www-project-top-ten/"
      },
      {
        "name": "OWASP Testing Guide",
        "url": "https://owasp.org/www-project-web-security-testing-guide/"
      }
    ],
    "tools": [
      "Burp Community (careful)",
      "browser DevTools",
      "OWASP ZAP"
    ],
    "books": [
      "The Web Application Hacker’s Handbook (select chapters)"
    ],
    "practice": [
      "https://owasp.org/www-project-juice-shop/"
    ],
    "videos": []
  }
};
