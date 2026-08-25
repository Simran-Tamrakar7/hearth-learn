/** Chapter body for /manuals/cloud-basics. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "cloud-basics",
  "title": "Cloud Basics for QA",
  "tagline": "AWS/GCP concepts, environments, and IAM lite — enough to test without breaking the bill.",
  "category": "ops",
  "accent": "#1A4A3A",
  "cover": "covers/api-testing-cover.png",
  "duration": "3–4 weeks",
  "levelSpan": "Beginner → Intermediate",
  "who": "QA who deploy-adjacent and need cloud vocabulary for envs, access, and debugging.",
  "outcomes": [
    "Explain core cloud building blocks (compute, storage, network)",
    "Navigate environments and IAM concepts safely",
    "Use cloud consoles/CLIs for basic QA tasks"
  ],
  "chapters": [
    {
      "id": "cld-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this path",
      "minutes": 20,
      "durationLabel": "Day 0",
      "overview": "Pick AWS or GCP as your primary lens (concepts transfer). Prefer a free tier/sandbox account. Never create public buckets with real data for fun.",
      "learn": [
        "Provider pick",
        "Sandbox",
        "Cost awareness"
      ],
      "steps": [
        {
          "title": "Sandbox access",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Confirm login to a non-prod account/project. Note region/project id.",
          "tip": "Set a billing alarm on day one if you have account powers.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Sandbox login works"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "AWS overview",
          "url": "https://aws.amazon.com/what-is-aws/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "GCP overview",
          "url": "https://cloud.google.com/docs/overview",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "Pick AWS or GCP as your primary lens (concepts transfer). Prefer a free tier/sandbox account. Never create public buckets with real data for fun.",
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
      "id": "cld-blocks",
      "phase": "A · Concepts",
      "level": "beginner",
      "title": "Building blocks",
      "minutes": 35,
      "durationLabel": "Week 1",
      "overview": "Compute (VMs/functions/containers), storage (object/block), databases, networking (VPC), queues. Map your product onto these.",
      "learn": [
        "Compute/storage/network",
        "Managed vs DIY"
      ],
      "steps": [
        {
          "title": "Architecture sticky map",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Diagram your app’s cloud pieces in 8 boxes or fewer. Label what you can access.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Sticky map done"
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Compute (VMs/functions/containers), storage (object/block), databases, networking (VPC), queues. Map your product onto these.",
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
      "id": "cld-envs",
      "phase": "A · Concepts",
      "level": "beginner",
      "title": "Environments & promotion",
      "minutes": 30,
      "overview": "Dev/stage/prod isolation, feature flags, config per env. Know what differs so tests aren’t lies.",
      "learn": [
        "Env isolation",
        "Config",
        "Parity gaps"
      ],
      "steps": [
        {
          "title": "Parity table",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Table: env × data × integrations × who can deploy. Highlight gaps that bite QA.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Parity table"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Dev/stage/prod isolation, feature flags, config per env. Know what differs so tests aren’t lies.",
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
      "id": "cld-iam",
      "phase": "A · Concepts",
      "level": "intermediate",
      "title": "IAM lite",
      "minutes": 35,
      "overview": "Identities, roles/policies, least privilege. QA often needs read logs + invoke staging — not admin.",
      "learn": [
        "Users/roles/policies",
        "Least privilege",
        "Access keys caution"
      ],
      "steps": [
        {
          "title": "Permission story",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "List permissions you have vs need. Note any standing admin that should be temporary.",
          "tip": "Never commit cloud keys. Rotate if pasted in chat.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Have vs need list"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "AWS IAM intro",
          "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "GCP IAM overview",
          "url": "https://cloud.google.com/iam/docs/overview",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Identities, roles/policies, least privilege. QA often needs read logs + invoke staging — not admin.",
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
      "id": "cld-cp1",
      "kind": "checkpoint",
      "phase": "A · Concepts",
      "level": "intermediate",
      "title": "Checkpoint: cloud map + risks",
      "minutes": 40,
      "durationLabel": "Gate",
      "overview": "Share architecture map, env parity, IAM notes with a peer.",
      "learn": [
        "Review"
      ],
      "steps": [
        {
          "title": "Review pack",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add top 3 cloud-related test risks.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Pack reviewed"
      ],
      "parentId": null,
      "overviewText": "Share architecture map, env parity, IAM notes with a peer.",
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
      "id": "cld-cli",
      "phase": "B · Hands-on",
      "level": "intermediate",
      "title": "CLI & console for QA tasks",
      "minutes": 40,
      "durationLabel": "Week 2",
      "overview": "List buckets/objects (carefully), describe instances/services, pull logs. Console for discovery; CLI for repeatability.",
      "learn": [
        "aws/gcloud basics",
        "Log groups",
        "Object storage peek"
      ],
      "steps": [
        {
          "title": "Read-only tour",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run 3 read-only CLI commands (or console equivalents) and paste outputs into notes (redact ids if needed).",
          "tip": null,
          "code": "# Examples — adjust to your provider/sandbox\n# aws s3 ls\n# aws logs describe-log-groups --max-items 5\n# gcloud projects describe $PROJECT_ID\n# gcloud logging logs list --limit=5",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Three read-only commands documented"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "AWS CLI",
          "url": "https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "gcloud CLI",
          "url": "https://cloud.google.com/sdk/gcloud",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "List buckets/objects (carefully), describe instances/services, pull logs. Console for discovery; CLI for repeatability.",
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
      "id": "cld-test",
      "phase": "B · Hands-on",
      "level": "intermediate",
      "title": "What to test in the cloud",
      "minutes": 30,
      "overview": "Config drift, IAM denials, CORS, region failover (if claimed), temp credentials expiry, public exposure.",
      "learn": [
        "Cloud-specific risks",
        "Security smoke"
      ],
      "steps": [
        {
          "title": "Risk checklist",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write 8 cloud test ideas for your product. Star the top 3.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Eight ideas",
        "Top 3 starred"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Config drift, IAM denials, CORS, region failover (if claimed), temp credentials expiry, public exposure.",
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
      "id": "cld-cost",
      "phase": "C · Judgment",
      "level": "advanced",
      "title": "Cost, safety, and load tests",
      "minutes": 25,
      "durationLabel": "Week 3",
      "overview": "Load tests and log floods cost money. Know approval paths. Clean up orphaned resources.",
      "learn": [
        "Cost risks",
        "Cleanup",
        "Approvals"
      ],
      "steps": [
        {
          "title": "Safety card",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "One-pager: what QA must not do in cloud without approval.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Safety card written"
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Load tests and log floods cost money. Know approval paths. Clean up orphaned resources.",
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
      "id": "cld-cp2",
      "kind": "checkpoint",
      "phase": "C · Judgment",
      "level": "advanced",
      "title": "Checkpoint: QA cloud cheat sheet",
      "minutes": 45,
      "durationLabel": "Capstone",
      "overview": "Team cheat sheet: envs, IAM asks, CLI snippets, risks, safety card.",
      "learn": [
        "Team asset"
      ],
      "steps": [
        {
          "title": "Publish",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Put in wiki. Walk one teammate through it.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Architecture map",
            "Env parity",
            "CLI snippets",
            "Test ideas",
            "Safety card"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Cheat sheet live"
      ],
      "note": "Pace: 3–4 weeks. Vocabulary + safety > collecting certifications.",
      "parentId": null,
      "overviewText": "Team cheat sheet: envs, IAM asks, CLI snippets, risks, safety card.",
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
        "name": "AWS Getting Started",
        "url": "https://aws.amazon.com/getting-started/"
      },
      {
        "name": "GCP docs overview",
        "url": "https://cloud.google.com/docs/overview"
      },
      {
        "name": "AWS IAM",
        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html"
      }
    ],
    "tools": [
      "AWS Console / GCP Console",
      "AWS CLI / gcloud",
      "Billing alarms",
      "Sandbox account"
    ],
    "books": [
      "AWS in Action / Google Cloud certified guides — selective concept chapters"
    ],
    "practice": [
      "Weekly read-only CLI tour",
      "Update env parity table when something bites"
    ],
    "videos": [
      {
        "name": "AWS Cloud Practitioner essentials (free tier learning)",
        "url": "https://aws.amazon.com/training/"
      }
    ]
  }
};
