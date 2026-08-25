/** Chapter body for /manuals/git-for-humans. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "git-for-humans",
  "title": "Version Control (Git) for Non-Engineers",
  "tagline": "Clone, branch, commit, PR — enough Git to collaborate without fear.",
  "category": "foundations",
  "accent": "#A16207",
  "cover": "covers/git-cover.png",
  "duration": "2–4 weeks",
  "levelSpan": "Beginner → Useful",
  "who": "Writers, designers, PMs, and analysts who touch repos or GitHub.",
  "outcomes": [
    "Clone and commit",
    "Open a pull request",
    "Recover from “oh no” safely"
  ],
  "pace": {
    "hoursPerDay": "30–60 min/day",
    "recommended": "~2–4 weeks",
    "accelerated": "~10 days",
    "slow": "~6 weeks"
  },
  "chapters": [
    {
      "id": "git-why",
      "phase": "Start",
      "level": "beginner",
      "title": "Why Git exists",
      "minutes": 20,
      "overview": "Time machine + collaboration. Commits are snapshots with messages for humans.",
      "learn": [
        "Snapshot",
        "History"
      ],
      "steps": [
        {
          "title": "Commit = save point",
          "body": "Message in present tense: “Add pricing FAQ.” Small commits beat giant mystery dumps.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": {
            "question": "A commit is best thought of as…",
            "options": [
              "A Zoom recording",
              "A snapshot with a note",
              "A Slack thread",
              "A database backup only"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 good commit messages for imaginary changes.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Three messages written"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Time machine + collaboration. Commits are snapshots with messages for humans.",
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
      "id": "git-loop",
      "phase": "Build",
      "level": "beginner",
      "title": "The happy loop",
      "minutes": 40,
      "overview": "pull → branch → edit → add → commit → push → pull request.",
      "learn": [
        "Branch",
        "PR"
      ],
      "steps": [
        {
          "title": "Branch for the change",
          "body": "Never edit main directly on a team. Name branches like `docs/refund-faq`.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.github.com/en/get-started",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Make a tiny edit on a branch and open a PR (or practice on a personal repo).",
          "tip": null,
          "code": "git pull\ngit checkout -b docs/refund-faq\n# edit files\ngit add .\ngit commit -m \"Add refund FAQ\"\ngit push -u origin HEAD",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Review is the product",
          "body": "PRs are for humans: summary, screenshots, “how to test”.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a PR description template you like.",
          "tip": "Ask for review from the person who owns the area.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One practice PR"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "pull → branch → edit → add → commit → push → pull request.",
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
      "id": "git-oops",
      "phase": "Steady",
      "level": "beginner",
      "title": "Undo without panic",
      "minutes": 25,
      "overview": "Know discard vs revert. Don’t force-push shared main.",
      "learn": [
        "Undo",
        "Safety"
      ],
      "steps": [
        {
          "title": "Safe undos",
          "body": "Uncommitted? discard in the GUI. Committed locally? amend or new commit. Shared history? revert.",
          "learnMore": "When unsure, copy the folder, then ask an engineer.",
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Bookmark your Git client’s “discard changes” docs.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Undo path bookmarked"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Know discard vs revert. Don’t force-push shared main.",
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
  ]
};
