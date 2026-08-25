/** Chapter body for /manuals/linux-cli. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "linux-cli",
  "title": "Linux & CLI for Testers",
  "tagline": "Navigate systems, logs, and scripts without fear of the terminal.",
  "category": "ops",
  "accent": "#0B3D2E",
  "cover": "covers/python-cover.png",
  "duration": "3–5 weeks",
  "levelSpan": "Beginner → Intermediate",
  "who": "QA and automation folks who avoid the terminal until an incident forces them in.",
  "outcomes": [
    "Navigate files, processes, and permissions confidently",
    "Grep logs and pipe commands to isolate failures",
    "Write small shell snippets that save testing time"
  ],
  "chapters": [
    {
      "id": "cli-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this path",
      "minutes": 20,
      "durationLabel": "Day 0",
      "overview": "Practice on a safe machine: local macOS/Linux terminal, WSL, or a throwaway VM/container. Never practice destructive commands on prod.",
      "learn": [
        "Safe sandbox",
        "Shell choice",
        "History hygiene"
      ],
      "steps": [
        {
          "title": "Sandbox ready",
          "body": "bash or zsh. Optional: Docker Ubuntu container for experiments.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Open a terminal. Confirm `pwd`, `whoami`, `echo $SHELL`. Create ~/cli-lab.",
          "tip": "Prefer `--help` and `man` over random Stack Overflow paste.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "cli-lab directory created"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "Linux Journey",
          "url": "https://linuxjourney.com/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Bash Guide (TLDP)",
          "url": "https://tldp.org/LDP/Bash-Beginners-Guide/html/",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "Practice on a safe machine: local macOS/Linux terminal, WSL, or a throwaway VM/container. Never practice destructive commands on prod.",
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
      "id": "cli-nav",
      "phase": "A · Basics",
      "level": "beginner",
      "title": "Navigation & files",
      "minutes": 35,
      "durationLabel": "Week 1",
      "overview": "pwd, ls, cd, mkdir, cp, mv, rm (carefully), find. Paths absolute vs relative.",
      "learn": [
        "Paths",
        "Listing",
        "Safe delete habits"
      ],
      "steps": [
        {
          "title": "Lab tree",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "In ~/cli-lab build a small tree, copy, rename, and list recursively.",
          "tip": "`rm -rf` is a loaded weapon. Prefer trash tools while learning.",
          "code": "mkdir -p ~/cli-lab/{logs,data,scripts}\necho \"hello\" > ~/cli-lab/data/sample.txt\ncp ~/cli-lab/data/sample.txt ~/cli-lab/data/sample.bak\nls -la ~/cli-lab/**",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Tree created and listed"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "MDN isn’t CLI — use man ls",
          "url": "https://man7.org/linux/man-pages/man1/ls.1.html",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "pwd, ls, cd, mkdir, cp, mv, rm (carefully), find. Paths absolute vs relative.",
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
      "id": "cli-read",
      "phase": "A · Basics",
      "level": "beginner",
      "title": "Reading files & pipes",
      "minutes": 35,
      "overview": "cat, less, head, tail, grep, sort, uniq, wc. Pipes and redirects are how you investigate.",
      "learn": [
        "Pipes",
        "grep",
        "tail -f"
      ],
      "steps": [
        {
          "title": "Fake log hunt",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Generate a log file with repeated lines; find ERROR counts with pipes.",
          "tip": null,
          "code": "printf 'INFO ok\\nERROR boom\\nINFO ok\\nERROR boom\\n' > ~/cli-lab/logs/app.log\ngrep ERROR ~/cli-lab/logs/app.log | wc -l\ntail -n 20 ~/cli-lab/logs/app.log",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "ERROR count via pipe"
      ],
      "practice": {
        "title": "Real log",
        "brief": "On a safe env, `tail -f` a log while reproducing a bug once."
      },
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "cat, less, head, tail, grep, sort, uniq, wc. Pipes and redirects are how you investigate.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cli-perm",
      "phase": "A · Basics",
      "level": "intermediate",
      "title": "Permissions & processes",
      "minutes": 35,
      "overview": "chmod/chown basics, ps, top/htop, kill, env vars. Enough to debug “permission denied” and stuck processes.",
      "learn": [
        "rwx bits",
        "Process list",
        "Env"
      ],
      "steps": [
        {
          "title": "Permission + process lab",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Make a script executable. List processes. Export a dummy ENV and print it.",
          "tip": null,
          "code": "echo '#!/usr/bin/env bash\\necho hi' > ~/cli-lab/scripts/hi.sh\nchmod +x ~/cli-lab/scripts/hi.sh\n~/cli-lab/scripts/hi.sh\nexport TEST_ENV=staging\necho $TEST_ENV\nps aux | head",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Executable script runs",
        "ENV printed"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "chmod man",
          "url": "https://man7.org/linux/man-pages/man1/chmod.1.html",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "chmod/chown basics, ps, top/htop, kill, env vars. Enough to debug “permission denied” and stuck processes.",
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
      "id": "cli-cp1",
      "kind": "checkpoint",
      "phase": "A · Basics",
      "level": "intermediate",
      "title": "Checkpoint: investigate a failure",
      "minutes": 40,
      "durationLabel": "Gate",
      "overview": "Given a messy log (or make one), produce a one-page note: root lines, counts, timestamps.",
      "learn": [
        "Investigation writeup"
      ],
      "steps": [
        {
          "title": "Investigation",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Use only CLI tools. Paste the commands you used into the note.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Note with commands + findings"
      ],
      "parentId": null,
      "overviewText": "Given a messy log (or make one), produce a one-page note: root lines, counts, timestamps.",
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
      "id": "cli-net",
      "phase": "B · Tester toolkit",
      "level": "intermediate",
      "title": "Networking lite for QA",
      "minutes": 35,
      "durationLabel": "Week 2",
      "overview": "curl, ping, dig/nslookup, ssh basics. Hit APIs and check headers without Postman sometimes.",
      "learn": [
        "curl",
        "DNS peek",
        "SSH caution"
      ],
      "steps": [
        {
          "title": "curl an API",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "GET a public API; show status and headers. Save body to a file.",
          "tip": "Don’t curl random internal prod URLs with write methods.",
          "code": "curl -sS -D - -o ~/cli-lab/data/body.json https://httpbin.org/get | head\njq . ~/cli-lab/data/body.json 2>/dev/null || cat ~/cli-lab/data/body.json",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "curl + saved body"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "curl manual",
          "url": "https://curl.se/docs/manual.html",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "httpbin",
          "url": "https://httpbin.org/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "curl, ping, dig/nslookup, ssh basics. Hit APIs and check headers without Postman sometimes.",
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
      "id": "cli-script",
      "phase": "B · Tester toolkit",
      "level": "intermediate",
      "title": "Small scripts that help testing",
      "minutes": 40,
      "overview": "Loops, variables, exit codes. Automate boring setup: seed data, wait for port, collect logs.",
      "learn": [
        "bash basics",
        "exit codes",
        "set -euo pipefail lite"
      ],
      "steps": [
        {
          "title": "Wait-for-url script",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a script that curls until 200 or times out.",
          "tip": null,
          "code": "#!/usr/bin/env bash\nset -euo pipefail\nurl=${1:-https://httpbin.org/status/200}\nfor i in {1..10}; do\n  if curl -sf \"$url\" >/dev/null; then echo ready; exit 0; fi\n  sleep 1\ndone\necho timeout >&2; exit 1",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Script works locally"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Loops, variables, exit codes. Automate boring setup: seed data, wait for port, collect logs.",
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
      "id": "cli-ssh",
      "phase": "C · Real systems",
      "level": "advanced",
      "title": "SSH & remote logs",
      "minutes": 30,
      "durationLabel": "Week 3",
      "overview": "Keys, config hosts, scp/rsync basics. Pull logs instead of living on the box.",
      "learn": [
        "SSH config",
        "scp",
        "Least privilege"
      ],
      "steps": [
        {
          "title": "SSH config stub",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a ~/.ssh/config Host entry for a lab/bastion (or a commented template if none).",
          "tip": null,
          "code": "Host lab\n  HostName example.com\n  User you\n  IdentityFile ~/.ssh/id_ed25519",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "SSH config template ready"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "SSH config manual",
          "url": "https://man.openbsd.org/ssh_config",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Keys, config hosts, scp/rsync basics. Pull logs instead of living on the box.",
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
      "id": "cli-cp2",
      "kind": "checkpoint",
      "phase": "C · Real systems",
      "level": "advanced",
      "title": "Checkpoint: tester CLI kit",
      "minutes": 45,
      "durationLabel": "Capstone",
      "overview": "Publish a personal cheatsheet + 2 scripts in a repo or gist.",
      "learn": [
        "Personal tooling"
      ],
      "steps": [
        {
          "title": "Kit",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Cheatsheet (1 page) + wait-for-url + log-grepper scripts with README.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Nav/grep cheatsheet",
            "Two scripts",
            "Safety notes",
            "One real debugging story"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Kit published"
      ],
      "note": "Pace: 3–5 weeks. Daily 20 minutes in the terminal beats weekend cramming.",
      "parentId": null,
      "overviewText": "Publish a personal cheatsheet + 2 scripts in a repo or gist.",
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
        "name": "Linux Journey",
        "url": "https://linuxjourney.com/"
      },
      {
        "name": "curl docs",
        "url": "https://curl.se/docs/manual.html"
      },
      {
        "name": "Bash beginners guide",
        "url": "https://tldp.org/LDP/Bash-Beginners-Guide/html/"
      }
    ],
    "tools": [
      "Terminal / WSL",
      "jq",
      "htop",
      "Docker (optional lab)",
      "httpbin"
    ],
    "books": [
      "The Linux Command Line (Shotts) — free online"
    ],
    "practice": [
      "Daily log grep",
      "Replace one GUI file task with CLI weekly"
    ],
    "videos": [
      {
        "name": "Corey Schafer Linux basics",
        "url": "https://www.youtube.com/watch?v=wGCRQn9ZYtA"
      }
    ]
  }
};
