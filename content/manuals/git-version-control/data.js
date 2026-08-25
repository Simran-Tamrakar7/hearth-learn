/** Chapter body for /manuals/git-version-control. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "git",
  "title": "Git & GitHub",
  "tagline": "Version control without fear — daily loop through hooks and recovery.",
  "category": "foundations",
  "accent": "#3D5A5B",
  "cover": "covers/git-cover.png",
  "duration": "8–14 weeks",
  "levelSpan": "Beginner → Pro",
  "who": "Anyone who writes or reviews code — solo learners, QA engineers, and developers who need confident daily Git, clean PRs, and recovery skills.",
  "outcomes": [
    "Run the daily loop: status, diff, add, commit, push, pull without hesitation",
    "Branch, open pull requests, and participate in code review with clear descriptions",
    "Rebase and merge with judgment — know when each is appropriate",
    "Recover lost work with reflog, resolve conflicts, and bisect regressions",
    "Install and use pre-commit hooks locally before CI catches mistakes"
  ],
  "pace": {
    "hoursPerDay": "30–45 min/day (≈ 4–5 hrs/week)",
    "recommended": "~1–2 weeks part-time",
    "accelerated": "~3–5 days intensive",
    "slow": "~3 weeks if busy"
  },
  "chapters": [
    {
      "id": "git-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this Git path",
      "minutes": 15,
      "overview": "Git is learned by doing in a throwaway repo, then applied daily. Path order: daily loop → branches/PRs → rebase → recovery (reflog/bisect) → hooks. Learn Git Branching visualizer is your friend.",
      "learn": [
        "Throwaway repo practice",
        "Daily loop habit",
        "Never rewrite shared history casually"
      ],
      "steps": [
        {
          "title": "Create practice repo",
          "body": "github.com/new → git-practice. You will break things here on purpose.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create git-practice repo. Clone locally. First commit: README.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Study pace",
          "body": "30–45 min/day for 1–2 weeks. Do every exercise in a practice repo, not on work main.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Bookmark learngitbranching.js.org. Schedule 15 min/day on it.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Golden rules",
          "body": "Commit small and often. Pull before push. Never force-push shared branches. Read diff before commit.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write 3 personal Git rules in practice repo README.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Small, focused commits",
            "Pull --rebase before push (team policy varies)",
            "No force-push to main/shared branches"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "git-practice repo cloned",
        "Git name/email configured",
        "Learn Git Branching bookmarked"
      ],
      "practice": {
        "title": "First commit",
        "brief": "README + .gitignore for OS files. git log --oneline."
      },
      "resources": [
        {
          "type": "book",
          "name": "Pro Git",
          "url": "https://git-scm.com/book/en/v2",
          "lang": "EN",
          "free": true
        },
        {
          "type": "lab",
          "name": "Learn Git Branching",
          "url": "https://learngitbranching.js.org/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Git is learned by doing in a throwaway repo, then applied daily. Path order: daily loop → branches/PRs → rebase → recovery (reflog/bisect) → hooks. Learn Git Branching visualizer is your friend.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "git-daily",
      "phase": "A · Daily",
      "level": "beginner",
      "title": "Daily loop: status, diff, add, commit",
      "minutes": 35,
      "durationLabel": "Day 1–2",
      "overview": "Working tree → staging (index) → local history → remote. status and diff before every commit.",
      "learn": [
        "Working tree vs staging vs history",
        "git status / diff",
        "git add / commit",
        "Commit messages"
      ],
      "steps": [
        {
          "title": "Three trees",
          "body": "Working directory (edited files), staging area (git add), repository (git commit). status shows all three.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Edit README. status. diff. add. diff --staged. commit. log --oneline.",
          "tip": null,
          "code": "git status\ngit diff\ngit add README.md\ngit diff --staged\ngit commit -m \"docs: explain three trees\"\ngit log --oneline -5",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Commit messages",
          "body": "Imperative subject: \"Add login form\" not \"Added\". Body explains why. Conventional commits help: feat:, fix:, docs:.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Make 3 commits with clear messages on git-practice.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "git add patterns",
          "body": "git add file, git add -p (patch — choose hunks), git add . (careful — review status first).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Use git add -p once to stage part of a file.",
          "tip": "Never commit secrets — .env belongs in .gitignore.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "3 commits with good messages",
        "Used status and diff habitually",
        ".gitignore includes .env"
      ],
      "practice": {
        "title": "Commit hygiene",
        "brief": "Fix typo in separate commit from feature work."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Git — git-add",
          "url": "https://git-scm.com/docs/git-add",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Working tree → staging (index) → local history → remote. status and diff before every commit.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "git-branches",
      "phase": "A · Daily",
      "level": "beginner",
      "title": "Branches, remotes & push",
      "minutes": 40,
      "durationLabel": "Day 2–3",
      "overview": "Branches are cheap pointers. main stays stable. Feature branches isolate work. Remote tracks GitHub.",
      "learn": [
        "branch / checkout / switch",
        "push -u origin",
        "pull / fetch",
        "Tracking branches"
      ],
      "steps": [
        {
          "title": "Create and switch branches",
          "body": "git switch -c feature/login. Work. commit. main unchanged until merge.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create feature branch, add file, commit, switch back to main — file gone (expected).",
          "tip": null,
          "code": "git switch -c feature/hello\necho \"hello\" > hello.txt\ngit add hello.txt\ngit commit -m \"feat: add hello\"\ngit switch main\n# hello.txt not here\ngit switch feature/hello\n# hello.txt back",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Push and set upstream",
          "body": "git push -u origin feature/hello first time. Later git push suffices.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Push feature branch to GitHub. Verify on github.com.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Fetch and pull",
          "body": "git fetch downloads remote changes without merging. git pull = fetch + merge (or rebase with --rebase).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Edit on GitHub web UI. fetch. pull. See local update.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Feature branch pushed",
        "Upstream set",
        "Pull from remote works"
      ],
      "practice": {
        "title": "Branch naming",
        "brief": "Adopt pattern: feature/, fix/, docs/ — use consistently."
      },
      "resources": [
        {
          "type": "doc",
          "name": "GitHub — About branches",
          "url": "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Branches are cheap pointers. main stays stable. Feature branches isolate work. Remote tracks GitHub.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "git-pr",
      "phase": "B · Collaborate",
      "level": "beginner",
      "title": "Pull requests & code review",
      "minutes": 40,
      "durationLabel": "Day 3–4",
      "overview": "PRs are conversation + integration. Clear description, test plan, small diffs. Review others generously.",
      "learn": [
        "Open PR from branch",
        "PR description template",
        "Review comments",
        "Merge strategies"
      ],
      "steps": [
        {
          "title": "Open your first PR",
          "body": "Push branch → GitHub \"Compare & pull request\" → fill title, summary, test plan.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Open PR on git-practice. Self-merge after checking diff.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Title: imperative summary",
            "Body: what changed and why",
            "Test plan: how you verified"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "PR hygiene",
          "body": "Small PRs review faster. One logical change. Link issue if applicable. Draft PR for WIP.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Revise a PR description to include test plan checklist.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Merge on GitHub",
          "body": "Merge commit vs Squash vs Rebase — team policy varies. Squash keeps main history clean for small teams.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Merge your PR. Delete branch on GitHub. git pull locally.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "First PR merged",
        "Test plan in description",
        "Branch deleted after merge"
      ],
      "practice": {
        "title": "PR template",
        "brief": "Add .github/pull_request_template.md to a repo."
      },
      "resources": [
        {
          "type": "doc",
          "name": "GitHub — About pull requests",
          "url": "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "PRs are conversation + integration. Clear description, test plan, small diffs. Review others generously.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "git-checkpoint-a",
      "kind": "checkpoint",
      "phase": "B · Collaborate",
      "level": "beginner",
      "title": "Checkpoint A — Daily loop & PRs",
      "minutes": 30,
      "durationLabel": "Gate · Week 3–4",
      "overview": "Before rebase, reflog, and bisect, prove the daily loop and PR workflow are muscle memory. Fix gaps before Phase C recovery topics.",
      "learn": [
        "Daily habit check",
        "PR readiness"
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "All six must be true. Practice in git-practice repo only.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Mark pass/fail in README. Fix failures before rebase chapter.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "git-practice repo with 5+ meaningful commits and descriptive messages",
            "Can run status → diff → add → commit without looking up commands",
            "Feature branch created, pushed with -u origin, and merged via PR",
            "PR description includes summary and test plan checklist",
            ".gitignore includes .env, OS junk, and build artifacts",
            "Can explain working tree vs staging vs repository in 60 seconds"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Commit message audit",
          "body": "Re-read git log --oneline. Squash or amend only unpushed WIP commits. Rewrite messages mentally for vague entries.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Make one docs: commit improving README based on audit.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Learn Git Branching progress",
          "body": "Complete Intro and Merge sections on learngitbranching.js.org before advancing.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Screenshot completion badge. Link in README.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 6 pass criteria met",
        "Commit audit done",
        "Learn Git Branching Intro + Merge complete"
      ],
      "practice": {
        "title": "PR from scratch",
        "brief": "New branch → 2 commits → push → PR → self-review diff → merge → pull main. No notes."
      },
      "parentId": null,
      "overviewText": "Before rebase, reflog, and bisect, prove the daily loop and PR workflow are muscle memory. Fix gaps before Phase C recovery topics.",
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
      "id": "git-rebase",
      "phase": "B · Collaborate",
      "level": "intermediate",
      "title": "Rebase vs merge & history hygiene",
      "minutes": 45,
      "durationLabel": "Day 4–5",
      "overview": "Merge preserves branch topology. Rebase replays commits for linear history. Never rebase pushed shared branches without team agreement.",
      "learn": [
        "git merge",
        "git rebase",
        "Interactive rebase lite",
        "When to use each"
      ],
      "steps": [
        {
          "title": "Merge feature into main",
          "body": "git checkout main && git merge feature/x — creates merge commit if diverged.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Learn Git Branching: merge levels. Replay in git-practice.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Rebase onto main",
          "body": "git switch feature && git rebase main — replays your commits on top of latest main. Cleaner log.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Rebase feature branch onto updated main. Resolve conflict if prompted.",
          "tip": "Rule: rebase local branches; merge (or squash-merge) into shared main.",
          "code": "git switch main\ngit pull\ngit switch feature/login\ngit rebase main\n# fix conflicts if any\ngit add .\ngit rebase --continue",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Interactive rebase",
          "body": "git rebase -i HEAD~3 — squash fixup commits, reword messages. Only on unpushed history.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Squash 2 WIP commits into one before opening PR.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Merge and rebase both tried",
        "Conflict resolved during rebase",
        "Knows when NOT to rebase shared"
      ],
      "practice": {
        "title": "Linear history",
        "brief": "Rebase feature onto main before PR; verify git log --oneline."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Git — git-rebase",
          "url": "https://git-scm.com/docs/git-rebase",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Merge preserves branch topology. Rebase replays commits for linear history. Never rebase pushed shared branches without team agreement.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "git-stash",
      "phase": "B · Collaborate",
      "level": "intermediate",
      "title": "Stash & conflict resolution",
      "minutes": 35,
      "durationLabel": "Day 5",
      "overview": "git stash saves WIP without committing. Conflicts: read markers, choose wisely, test after resolve.",
      "learn": [
        "git stash / pop",
        "Conflict markers",
        "Merge tool basics",
        "Post-resolve verification"
      ],
      "steps": [
        {
          "title": "Stash WIP",
          "body": "git stash push -m \"wip login\". Switch branches. git stash pop to restore.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Start edit, stash, switch branch, return, pop.",
          "tip": null,
          "code": "git stash push -m \"wip\"\ngit switch main\n# do other work\ngit switch feature\ngit stash pop",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Force a conflict",
          "body": "Edit same line on two branches. merge or rebase → conflict markers <<<<<<< ======= >>>>>>>.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create conflict in git-practice. Resolve manually. git add. Continue merge/rebase.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "After resolve",
          "body": "Run tests. Read full diff. Commit or continue rebase. Never leave conflict markers in code.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Document your conflict resolution checklist in README.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Stash used once",
        "Conflict resolved manually",
        "Tests/run after resolve"
      ],
      "practice": {
        "title": "Stash list",
        "brief": "Create 2 stashes. git stash list. Apply selectively."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Git — git-stash",
          "url": "https://git-scm.com/docs/git-stash",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "git stash saves WIP without committing. Conflicts: read markers, choose wisely, test after resolve.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "git-reflog",
      "phase": "C · Recover",
      "level": "advanced",
      "title": "reflog, reset & recovery",
      "minutes": 40,
      "durationLabel": "Day 6",
      "overview": "reflog records HEAD movements — undo \"disasters.\" reset --soft/mixed/hard — know blast radius before using.",
      "learn": [
        "git reflog",
        "reset --soft/mixed/hard",
        "Recovering \"lost\" commits",
        "cherry-pick lite"
      ],
      "steps": [
        {
          "title": "reflog is your safety net",
          "body": "git reflog shows where HEAD was. git reset --hard HEAD@{1} goes back — if you act before GC.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Make commit, reset --hard HEAD~1, panic, reflog, recover.",
          "tip": null,
          "code": "git commit -m \"important work\"\ngit reset --hard HEAD~1\ngit reflog\n# find lost commit hash\ngit reset --hard abc1234",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Reset modes",
          "body": "--soft: keep staging and working tree. --mixed (default): keep working tree. --hard: destroy changes.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Try --soft reset: commit undone but changes still staged.",
          "tip": "--hard is destructive — use only in throwaway repos or when certain.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "cherry-pick",
          "body": "git cherry-pick <hash> applies one commit elsewhere. Useful for hotfixes.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Cherry-pick a commit from feature branch onto main in practice repo.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Recovered commit via reflog",
        "Can explain reset modes",
        "cherry-pick tried"
      ],
      "practice": {
        "title": "Disaster drill",
        "brief": "Script: commit → bad reset → recover via reflog. Time yourself."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Git — git-reflog",
          "url": "https://git-scm.com/docs/git-reflog",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "reflog records HEAD movements — undo \"disasters.\" reset --soft/mixed/hard — know blast radius before using.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "git-bisect",
      "phase": "C · Recover",
      "level": "advanced",
      "title": "git bisect — find the breaking commit",
      "minutes": 35,
      "durationLabel": "Day 6–7",
      "overview": "Binary search through history. Mark good and bad commits. Git checks out middle. O(log n) instead of manual.",
      "learn": [
        "git bisect start/good/bad",
        "Automated bisect run",
        "bisect reset"
      ],
      "steps": [
        {
          "title": "Manual bisect",
          "body": "git bisect start. git bisect bad (current broken). git bisect good <old-good-hash>. Test. git bisect good/bad until found.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Plant a bug in commit 3 of 8 in practice repo. Bisect to find it.",
          "tip": null,
          "code": "git bisect start\ngit bisect bad\ngit bisect good v1.0-tag\n# test each checkout\ngit bisect good   # or bad\ngit bisect reset   # when done",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Automated bisect",
          "body": "git bisect run ./test.sh — script exits 0 for good, 1 for bad. Git automates the search.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write test.sh checking for planted bug. bisect run test.sh.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "When QA uses bisect",
          "body": "Regression found in release? bisect between last good build and bad build narrows the culprit commit.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write when-you-would-bisect note for your team context.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Manual bisect completed",
        "bisect reset after",
        "Understands binary search benefit"
      ],
      "practice": {
        "title": "Bisect story",
        "brief": "Blog-post length note: \"How I found the regression in 10 minutes.\""
      },
      "resources": [
        {
          "type": "doc",
          "name": "Git — git-bisect",
          "url": "https://git-scm.com/docs/git-bisect",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Binary search through history. Mark good and bad commits. Git checks out middle. O(log n) instead of manual.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "git-hooks",
      "phase": "D · Automate",
      "level": "advanced",
      "title": "Git hooks — pre-commit & pre-push",
      "minutes": 40,
      "durationLabel": "Day 7–8",
      "overview": "Hooks run scripts at Git lifecycle events. pre-commit: lint/format. pre-push: tests. Husky or plain .git/hooks.",
      "learn": [
        "Hook scripts in .git/hooks",
        "pre-commit framework",
        "Husky for Node projects",
        "CI vs local hooks"
      ],
      "steps": [
        {
          "title": "Simple pre-commit hook",
          "body": "Executable script in .git/hooks/pre-commit. Exit 1 blocks commit. Test in practice repo.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Hook that rejects commits if README is empty.",
          "tip": null,
          "code": "#!/bin/sh\n# .git/hooks/pre-commit\nif ! grep -q \".\" README.md 2>/dev/null; then\n  echo \"README must not be empty\"\n  exit 1\nfi",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "pre-commit framework",
          "body": "pip install pre-commit. .pre-commit-config.yaml with ruff, trailing-whitespace. pre-commit install.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add pre-commit to py-journey or git-practice with trailing-whitespace hook.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Husky for JS projects",
          "body": "npx husky init. pre-commit runs lint-staged. Complements CI — catches issues before push.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "If you have a JS project: add Husky pre-commit running npm test or lint.",
          "tip": "Hooks are local — CI is the enforcement layer for teams. Both matter.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Manual hook tried",
        "pre-commit or Husky installed once",
        "Understands exit 1 blocks commit"
      ],
      "practice": {
        "title": "pre-push tests",
        "brief": "pre-push hook runs pytest or npm test before push."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Git — githooks",
          "url": "https://git-scm.com/docs/githooks",
          "lang": "EN",
          "free": true
        },
        {
          "type": "tool",
          "name": "pre-commit.com",
          "url": "https://pre-commit.com/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Hooks run scripts at Git lifecycle events. pre-commit: lint/format. pre-push: tests. Husky or plain .git/hooks.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "git-checkpoint-b",
      "kind": "checkpoint",
      "phase": "D · Automate",
      "level": "advanced",
      "title": "Checkpoint B — Git job-ready",
      "minutes": 35,
      "durationLabel": "Gate · Week 8–10",
      "overview": "Final gate: daily loop, PR craft, rebase judgment, recovery skills, bisect, and hooks — the bar for professional Git literacy.",
      "learn": [
        "Interview Git topics",
        "Recovery confidence"
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Verify every item. Fix gaps this week.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "git-practice repo with merged PR, rebase onto main completed successfully",
            "Recovered a \"lost\" commit using reflog in throwaway drill",
            "Resolved a merge or rebase conflict manually — no leftover markers",
            "Completed one git bisect (manual or run) and reset afterward",
            "One hook installed (manual, pre-commit framework, or Husky) and tested",
            "Learn Git Branching: Remote + Rebase sections complete",
            "Can explain rebase vs merge and when NOT to force-push in 2 minutes"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Interview drill",
          "body": "Common questions: three trees, merge vs rebase, what reflog does, how to undo last commit, what pre-commit hook does.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Record 5-minute answers. Demo reflog recovery live in practice repo.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "What next",
          "body": "Apply Git daily on real projects — JS, Python, Playwright repos in this library all assume this baseline.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write 3 habits for 90 days: pull before push, small commits, PR template on every repo.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 7 pass criteria met",
        "Interview drill recorded",
        "90-day habits written"
      ],
      "practice": {
        "title": "Disaster recovery demo",
        "brief": "Screen record: bad reset → reflog → recover → bisect → hook blocks bad commit."
      },
      "parentId": null,
      "overviewText": "Final gate: daily loop, PR craft, rebase judgment, recovery skills, bisect, and hooks — the bar for professional Git literacy.",
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
      "id": "git-reference",
      "kind": "guide",
      "phase": "Reference",
      "level": "beginner",
      "title": "Timeline, tools & cheat sheet",
      "minutes": 15,
      "overview": "Return when stuck. Week map, golden rules, and interview quick hits.",
      "learn": [
        "10-week map",
        "Golden rules",
        "Command quick ref"
      ],
      "steps": [
        {
          "title": "Week map",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Weeks 1–2 — daily loop, branches, remotes",
            "Weeks 3–4 — PRs + Checkpoint A",
            "Weeks 5–6 — rebase, stash, conflicts",
            "Weeks 7–8 — reflog, bisect",
            "Weeks 9–10 — hooks + Checkpoint B"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Golden rules",
          "body": "Small commits. Pull before push. Read diff before commit. Never force-push shared branches. Never commit secrets.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Pin Pro Git Chapter 1 and Learn Git Branching.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Command quick ref",
          "body": "status, diff, add -p, commit, push -u, pull --rebase, switch -c, merge, rebase, stash, reflog, bisect, cherry-pick.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Maintain docs/git-cheatsheet.md in git-practice repo.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Interview one-liners",
          "body": "Three trees: working, staging, repo. Merge preserves topology. Rebase replays commits. Reflog is local safety net. Bisect is binary search.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Update cheatsheet after each mock interview.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Week map understood",
        "Cheatsheet started",
        "Golden rules memorized"
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Return when stuck. Week map, golden rules, and interview quick hits.",
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
        "name": "Pro Git Book",
        "url": "https://git-scm.com/book/en/v2"
      },
      {
        "name": "GitHub Docs",
        "url": "https://docs.github.com/en/get-started"
      },
      {
        "name": "Git Reference",
        "url": "https://git-scm.com/docs"
      },
      {
        "name": "Learn Git Branching",
        "url": "https://learngitbranching.js.org/"
      }
    ],
    "tools": [
      "Git CLI",
      "GitHub",
      "pre-commit",
      "Husky",
      "lazygit",
      "GitHub Desktop"
    ],
    "books": [
      "Pro Git (free online — Chapters 1–3 essential)",
      "Head First Git (Parker) — optional"
    ],
    "practice": [
      "https://learngitbranching.js.org/ — complete all sections",
      "Daily: pull before push on every active project",
      "Contribute one small PR to an open-source repo"
    ],
    "videos": [
      {
        "name": "GitHub — Git Overview",
        "url": "https://www.youtube.com/watch?v=RGOj5ycpR8k"
      },
      {
        "name": "Fireship — Git in 100 seconds",
        "url": "https://www.youtube.com/watch?v=hwP7WQkmECE"
      }
    ]
  }
};
