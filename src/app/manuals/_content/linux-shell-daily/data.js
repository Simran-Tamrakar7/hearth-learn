/** Chapter body for /manuals/linux-shell-daily. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "linux-shell-daily",
  "title": "Linux Shell Daily",
  "tagline": "cd, pipes, grep, and logs — the everyday CLI for QA and devs.",
  "category": "ops",
  "accent": "#1D4ED8",
  "cover": "covers/git-cover.png",
  "duration": "2–5 weeks",
  "levelSpan": "Beginner → Useful",
  "who": "Anyone scared of the terminal who needs it for CI logs and servers.",
  "outcomes": [
    "Navigate filesystem",
    "Pipe and grep logs",
    "Read exit codes"
  ],
  "pace": {
    "hoursPerDay": "45–90 min/day",
    "recommended": "~3–5 weeks",
    "accelerated": "~2 weeks",
    "slow": "~6–8 weeks"
  },
  "chapters": [
    {
      "id": "sh-nav",
      "phase": "Start",
      "level": "beginner",
      "title": "Navigation & files",
      "minutes": 25,
      "overview": "pwd, ls, cd, mkdir, touch, mv, cp, rm (carefully).",
      "learn": [
        "Paths",
        "Listing",
        "Safety"
      ],
      "steps": [
        {
          "title": "Key idea",
          "body": "The shell is a text UI to the filesystem. Relative vs absolute paths matter.",
          "learnMore": "rm -rf is powerful — prefer trash tools until you’re sure.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://linuxcommand.org/",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "pwd shows…",
            "options": [
              "Python version",
              "Current directory",
              "Git branch only",
              "CPU temp"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 notes on: Shell navigation.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice",
          "body": "Create a practice folder, move files, list with ls -la.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "Starter",
            "code": "pwd\nls -la\nmkdir practice && cd practice",
            "result": "You have a green or fixable failure — both count."
          },
          "doThis": "Commit one file practicing Shell navigation.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Comfortable cd/ls"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "pwd, ls, cd, mkdir, touch, mv, cp, rm (carefully).",
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
      "id": "sh-pipes",
      "phase": "Core",
      "level": "beginner",
      "title": "Pipes & grep",
      "minutes": 35,
      "overview": "Connect commands; find needles in logs.",
      "learn": [
        "|",
        "grep",
        "head/tail"
      ],
      "steps": [
        {
          "title": "Key idea",
          "body": "Pipes send stdout of one command to stdin of the next.",
          "learnMore": "grep -i error app.log | tail -n 20 is a QA superpower.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://www.gnu.org/software/grep/manual/",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "grep is for…",
            "options": [
              "Editing images",
              "Searching text patterns",
              "Compiling C",
              "Deploying k8s only"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 notes on: Pipes.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice",
          "body": "Download a sample log and extract ERROR lines.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "Starter",
            "code": "cat app.log | grep -i error | tail -n 20",
            "result": "You have a green or fixable failure — both count."
          },
          "doThis": "Commit one file practicing Pipes.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Found errors in a log"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Connect commands; find needles in logs.",
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
      "id": "sh-exit",
      "phase": "Core",
      "level": "intermediate",
      "title": "Exit codes & scripts",
      "minutes": 35,
      "overview": "$? and simple bash scripts for repetitive checks.",
      "learn": [
        "Exit codes",
        "set -e",
        "Tiny scripts"
      ],
      "steps": [
        {
          "title": "Key idea",
          "body": "0 means success; non-zero means failure — CI depends on this.",
          "learnMore": "set -euo pipefail makes scripts fail loudly.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://tldp.org/LDP/abs/html/",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Exit code 0 usually means…",
            "options": [
              "Crash",
              "Success",
              "Permission denied",
              "Network down"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 notes on: Exit codes.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice",
          "body": "Write a 10-line script that greps a log and exits 1 if errors exist.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "Starter",
            "code": "#!/usr/bin/env bash\nset -euo pipefail\ngrep -q ERROR \"$1\" && exit 1 || exit 0",
            "result": "You have a green or fixable failure — both count."
          },
          "doThis": "Commit one file practicing Exit codes.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Script executable and tested"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "$? and simple bash scripts for repetitive checks.",
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
