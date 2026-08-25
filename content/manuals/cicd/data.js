/** Chapter body for /manuals/cicd. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "cicd",
  "title": "CI/CD Pipelines",
  "tagline": "GitHub Actions — PR checks, secrets, artifacts, environments, rollback.",
  "category": "automation",
  "accent": "#14532D",
  "cover": "covers/cicd-cover.png",
  "duration": "8–10 weeks (part-time)",
  "levelSpan": "Beginner → Job-ready",
  "who": "QA automation engineers, developers, and DevOps-curious testers who want pipelines that protect main.",
  "outcomes": [
    "Design PR → main → deploy pipelines with appropriate gates",
    "Configure secrets, caches, artifacts, and environments safely",
    "Document rollback runbooks and required status checks"
  ],
  "pace": {
    "hoursPerDay": "1–1.5 hours/day (≈ 7–10 hrs/week)",
    "recommended": "~8–10 weeks",
    "accelerated": "~5–6 weeks at 2–3 hrs/day",
    "slow": "~12 weeks if busy"
  },
  "chapters": [
    {
      "id": "ci-how",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this roadmap",
      "minutes": 25,
      "overview": "CI/CD is how modern teams ship. This path uses GitHub Actions as the primary lab — concepts transfer to GitLab CI, Jenkins, CircleCI. Build a public pipeline portfolio repo.",
      "learn": [
        "8–10 week pacing",
        "CI vs CD vs continuous deployment",
        "Portfolio definition"
      ],
      "steps": [
        {
          "title": "Study pace",
          "body": "1–1.5 hours daily. Pipelines are learned by breaking and fixing — expect red builds.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Fork or create cicd-journey repo. Enable Actions if fork.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Recommended: ~8–10 weeks",
            "Accelerated: ~5–6 weeks",
            "Slow: ~12 weeks"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Lab repo",
          "body": "Use a small Node, Python, or static site repo — something with install, test, build steps.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Pick repo with at least npm test or pytest. README explains app purpose.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Checkpoints",
          "body": "Gate 1: PR workflow. Gate 2: secrets + artifacts + environments. Gate 3: rollback + production gates.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Read checkpoint chapters. Copy criteria to README.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Repo with Actions enabled",
        "Can push and see Actions tab"
      ],
      "practice": {
        "title": "Day zero",
        "brief": "README with pipeline goals and timeline."
      },
      "resources": [
        {
          "type": "doc",
          "name": "GitHub Actions — Quickstart",
          "url": "https://docs.github.com/en/actions/quickstart",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Continuous Delivery",
          "url": "https://continuousdelivery.com/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "CI/CD is how modern teams ship. This path uses GitHub Actions as the primary lab — concepts transfer to GitLab CI, Jenkins, CircleCI. Build a public pipeline portfolio repo.",
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
      "id": "ci-why",
      "phase": "A · Foundations",
      "level": "beginner",
      "title": "Why pipelines exist — CI vs CD",
      "minutes": 45,
      "durationLabel": "Week 1",
      "overview": "CI catches integration pain early. CD makes releases boring. Continuous deployment goes further — auto to prod when green. Know the vocabulary.",
      "learn": [
        "CI vs CD vs continuous deployment",
        "Trunk-based development",
        "PR workflow mental model"
      ],
      "steps": [
        {
          "title": "Map your path to prod",
          "body": "Commit → build → test → review → deploy. Circle manual steps that should die.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Draw pipeline diagram in PIPELINE.md. Label manual vs automated.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Feedback loops",
          "body": "Fast PR checks (<10 min) get used. 45-minute suites get skipped or ignored.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Set target: smoke under 5 min, full under 20 min. Write in PIPELINE.md.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Trunk-based basics",
          "body": "Short-lived branches, merge to main often, feature flags for incomplete work. Long-lived branches rot.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Read trunkbaseddevelopment.com primer. Note 3 practices you will follow.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "PIPELINE.md diagram",
        "Smoke vs full suite targets defined"
      ],
      "practice": {
        "title": "Manual audit",
        "brief": "List 5 manual release steps on any project you know. Which to automate first?"
      },
      "resources": [
        {
          "type": "doc",
          "name": "Trunk Based Development",
          "url": "https://trunkbaseddevelopment.com/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "book",
          "name": "Continuous Delivery — Humble & Farley",
          "url": "https://continuousdelivery.com/book/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "CI catches integration pain early. CD makes releases boring. Continuous deployment goes further — auto to prod when green. Know the vocabulary.",
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
      "id": "ci-first-workflow",
      "phase": "A · Foundations",
      "level": "beginner",
      "title": "First GitHub Actions workflow",
      "minutes": 55,
      "durationLabel": "Week 1–2",
      "overview": "YAML workflow: on trigger, jobs, steps, runs-on. Install, test, fail loud on red.",
      "learn": [
        "Workflow structure",
        "Triggers",
        "Jobs and steps",
        "Action marketplace"
      ],
      "steps": [
        {
          "title": "Hello workflow",
          "body": "on: push, jobs.test, runs-on: ubuntu-latest, steps: checkout, setup, run tests.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add .github/workflows/ci.yml. Push. See green check on commit.",
          "tip": null,
          "code": "name: CI\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: \"20\"\n      - run: npm ci\n      - run: npm test",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "pull_request trigger",
          "body": "Same workflow on PR shows checks before merge. This is the daily loop.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Open PR with trivial change. Confirm check runs on PR.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Read workflow logs",
          "body": "Expand steps, find failure line, re-run failed jobs. Triage skill #1.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Break a test intentionally. Read log. Fix. Re-run.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Action versioning",
          "body": "Pin major version: actions/checkout@v4. Avoid @main for supply chain stability.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Audit workflow — all actions use version tags.",
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
        "PR trigger works",
        "I can read failure logs"
      ],
      "practice": {
        "title": "Matrix awareness",
        "brief": "Read docs on strategy.matrix. Sketch Node 18 + 20 matrix — optional implement."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Workflow Syntax",
          "url": "https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Events that trigger workflows",
          "url": "https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "YAML workflow: on trigger, jobs, steps, runs-on. Install, test, fail loud on red.",
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
      "id": "ci-secrets",
      "phase": "B · Security & Config",
      "level": "intermediate",
      "title": "Secrets & environment variables",
      "minutes": 50,
      "durationLabel": "Week 2–3",
      "overview": "Secrets never in code or logs. GitHub Secrets, environments, and OIDC for cloud — the safe patterns.",
      "learn": [
        "Repository secrets",
        "Environment secrets",
        "Masking in logs",
        "OIDC awareness"
      ],
      "steps": [
        {
          "title": "Add a repository secret",
          "body": "Settings → Secrets → Actions. Reference as ${{ secrets.API_TOKEN }} in workflow.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add DUMMY_TOKEN secret. Echo in step with env: — confirm it masks in logs.",
          "tip": null,
          "code": "env:\n  API_TOKEN: ${{ secrets.API_TOKEN }}\nrun: |\n  curl -H \"Authorization: Bearer $API_TOKEN\" https://api.example.com/health",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Never print secrets",
          "body": "Avoid echo $SECRET. GitHub masks known secrets — do not bypass with base64 tricks in real repos.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add SECRETS.md: rules for rotating and scoping secrets.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Environment-specific secrets",
          "body": "staging vs production secrets in GitHub Environments — different values, protection rules.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create staging environment with one secret. Reference environment in job.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "OIDC (awareness)",
          "body": "GitHub OIDC lets workflows assume AWS/Azure roles without long-lived keys. Know for enterprise.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Read GitHub OIDC doc summary. Write 2 sentences in SECRETS.md.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Secret used in workflow",
        "SECRETS.md committed",
        "Logs show masking"
      ],
      "practice": {
        "title": "Leak drill",
        "brief": "Search repo history for accidental keys — gitleaks or manual. Document clean bill."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Encrypted Secrets",
          "url": "https://docs.github.com/en/actions/security-guides/encrypted-secrets",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "OpenID Connect",
          "url": "https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Secrets never in code or logs. GitHub Secrets, environments, and OIDC for cloud — the safe patterns.",
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
      "id": "ci-artifacts",
      "phase": "B · Security & Config",
      "level": "intermediate",
      "title": "Artifacts, reports & debugging CI",
      "minutes": 55,
      "durationLabel": "Week 3",
      "overview": "When CI fails, artifacts (test reports, screenshots, traces) tell the story. Upload on failure; retention policies matter.",
      "learn": [
        "upload-artifact",
        "Download artifacts",
        "Retention days",
        "Re-running jobs"
      ],
      "steps": [
        {
          "title": "Upload test report",
          "body": "actions/upload-artifact@v4 with if: failure() — HTML report, screenshots, logs.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Configure artifact upload on test failure. Download from Actions UI.",
          "tip": null,
          "code": "- uses: actions/upload-artifact@v4\n  if: failure()\n  with:\n    name: test-report\n    path: reports/\n    retention-days: 14",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Always upload on main failures",
          "body": "PR failures optional; main branch failures always retain artifacts for postmortem.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Different retention or always-upload policy for main — document in CI.md.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Debug locally with act (optional)",
          "body": "nektos/act runs Actions locally — imperfect but useful for fast iteration.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Try act once OR document \"re-run failed jobs\" as primary debug path.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "CI.md runbook",
          "body": "How to read logs, download artifacts, re-run, who to ping.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write CI.md debug section — 10 bullets.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Artifacts on failure",
        "CI.md debug section",
        "Downloaded artifact successfully"
      ],
      "practice": {
        "title": "Failure postmortem",
        "brief": "Template in CI.md: incident, root cause, fix, prevention."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Storing workflow data as artifacts",
          "url": "https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "When CI fails, artifacts (test reports, screenshots, traces) tell the story. Upload on failure; retention policies matter.",
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
      "id": "ci-checkpoint-a",
      "kind": "checkpoint",
      "phase": "B · Security & Config",
      "level": "intermediate",
      "title": "Checkpoint A — CI fundamentals",
      "minutes": 30,
      "durationLabel": "Gate",
      "overview": "PR workflow + secrets + artifacts working.",
      "learn": [
        "CI fundamentals criteria"
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
          "doThis": "Verify on GitHub.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Workflow runs on push and pull_request",
            "At least one secret used safely",
            "Artifact uploads on test failure",
            "PIPELINE.md and CI.md committed",
            "SECRETS.md with team rules",
            "Green main branch baseline"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 6 criteria met"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "GitHub Actions — Understanding GitHub Actions",
          "url": "https://docs.github.com/en/actions/get-started/understand-github-actions",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "PR workflow + secrets + artifacts working.",
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
      "id": "ci-cache",
      "phase": "C · Speed & Scale",
      "level": "intermediate",
      "title": "Caching & pipeline speed",
      "minutes": 50,
      "durationLabel": "Week 4–5",
      "overview": "Slow pipelines get skipped. Cache npm/pip/maven dependencies. Measure before and after.",
      "learn": [
        "actions/cache",
        "Cache keys",
        "Dependency review",
        "Parallel jobs"
      ],
      "steps": [
        {
          "title": "Dependency cache",
          "body": "actions/cache with path and key from lockfile hash. Restore on cache hit.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add cache step. Compare workflow duration before/after in README.",
          "tip": null,
          "code": "- uses: actions/cache@v4\n  with:\n    path: ~/.npm\n    key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Cache invalidation",
          "body": "Key includes lockfile hash — dependency change busts cache automatically.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Bump dependency. Confirm cache miss then new cache save.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Parallel jobs",
          "body": "lint, test, build as separate jobs — fail fast on lint before expensive test.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Split into lint + test jobs. lint runs first or in parallel.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Speed budget",
          "body": "Document target times. Alert when PR check exceeds 10 min.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add timing note to CI.md from last 5 runs.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Cache hit observed",
        "Parallel or split jobs",
        "Speed documented"
      ],
      "practice": {
        "title": "Before/after",
        "brief": "Screenshot Actions timing with and without cache."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Dependency caching",
          "url": "https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Slow pipelines get skipped. Cache npm/pip/maven dependencies. Measure before and after.",
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
      "id": "ci-environments",
      "phase": "C · Speed & Scale",
      "level": "intermediate",
      "title": "Environments, deployments & approvals",
      "minutes": 60,
      "durationLabel": "Week 5–6",
      "overview": "GitHub Environments model staging and production. Protection rules, required reviewers, deployment branches.",
      "learn": [
        "Environment config",
        "Deployment jobs",
        "Protection rules",
        "Deployment history"
      ],
      "steps": [
        {
          "title": "Create environments",
          "body": "Settings → Environments → staging, production. Different secrets per env.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create staging environment. Add STAGING_URL secret.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Deploy job",
          "body": "job deploy needs: test, environment: staging, runs deploy script or GitHub Pages action.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add deploy-staging job on push to main after tests pass.",
          "tip": null,
          "code": "deploy-staging:\n  needs: test\n  runs-on: ubuntu-latest\n  environment: staging\n  steps:\n    - uses: actions/checkout@v4\n    - run: npm run build\n    - name: Deploy\n      run: echo \"Deploy to staging\" # replace with real deploy",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Protection rules",
          "body": "Production: required reviewers, wait timer, branch restriction to main only.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add production environment with required reviewer (yourself for lab).",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Deployment URL",
          "body": "environment url shows in PR deployment history — links to staging site.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Set environment URL in config. Verify appears in Deployments tab.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "staging environment deploys",
        "production has protection rule",
        "Deployment visible in UI"
      ],
      "practice": {
        "title": "Preview deploy",
        "brief": "Optional: deploy PR preview with environment or third-party action."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Deploying to environments",
          "url": "https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "GitHub Pages Actions",
          "url": "https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "GitHub Environments model staging and production. Protection rules, required reviewers, deployment branches.",
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
      "id": "ci-gates",
      "phase": "D · Governance",
      "level": "advanced",
      "title": "Required checks & merge gates",
      "minutes": 50,
      "durationLabel": "Week 6–7",
      "overview": "Branch protection + required status checks prevent merging broken code. Balance safety vs team velocity.",
      "learn": [
        "Branch protection rules",
        "Required status checks",
        "CODEOWNERS",
        "Merge queues awareness"
      ],
      "steps": [
        {
          "title": "Branch protection on main",
          "body": "Require PR, require status checks, no direct push (for team repos). Solo: still practice config.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Enable require status checks before merge. List required check names.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Failure injection test",
          "body": "Break test on PR. Confirm merge button blocked. Fix. Confirm unblocked.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Document result in GATES.md with screenshot.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "CODEOWNERS (awareness)",
          "body": ".github/CODEOWNERS auto-requests review for paths — tests/ owned by QA.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add CODEOWNERS assigning workflows to yourself. Note how it would scale.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "When gates hurt",
          "body": "Too many required checks → rubber stamp. Pick smoke + lint + test as minimum.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write gate policy: required vs optional checks in GATES.md.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Branch protection enabled",
        "Failed PR cannot merge",
        "GATES.md policy"
      ],
      "practice": {
        "title": "Gate review",
        "brief": "Pretend tech lead: argue to remove one check. Defend or concede."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Managing protected branches",
          "url": "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Branch protection + required status checks prevent merging broken code. Balance safety vs team velocity.",
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
      "id": "ci-rollback",
      "phase": "D · Governance",
      "level": "advanced",
      "title": "Rollback, recovery & incident response",
      "minutes": 55,
      "durationLabel": "Week 7–8",
      "overview": "Ship knowing how to un-ship. Revert commits, redeploy previous artifact, feature flags — optimize mean time to recovery (MTTR).",
      "learn": [
        "Revert vs fix forward",
        "Deploy previous artifact",
        "Runbook format",
        "MTTR"
      ],
      "steps": [
        {
          "title": "Rollback runbook",
          "body": "Step-by-step: detect bad deploy, revert commit or redeploy tag, verify health, communicate.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write ROLLBACK.md — target <15 min recovery for your lab app.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Revert commit deploy",
          "body": "git revert + push triggers pipeline redeploys last good state.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Simulate bad deploy (break production config). Revert. Confirm recovery.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Artifact promotion (awareness)",
          "body": "Build once, promote same artifact staging → prod. Avoid rebuild drift.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Sketch promotion flow in PIPELINE.md diagram.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Post-incident template",
          "body": "What broke, timeline, root cause, action items — blameless.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add post-incident template to ROLLBACK.md from simulated drill.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "ROLLBACK.md complete",
        "Recovery drill performed",
        "MTTR noted"
      ],
      "practice": {
        "title": "Timed drill",
        "brief": "Time yourself: break staging → recover. Beat 15 min?"
      },
      "resources": [
        {
          "type": "doc",
          "name": "Google SRE — Incident Management",
          "url": "https://sre.google/sre-book/managing-incidents/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Ship knowing how to un-ship. Revert commits, redeploy previous artifact, feature flags — optimize mean time to recovery (MTTR).",
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
      "id": "ci-progressive",
      "phase": "E · Advanced Delivery",
      "level": "advanced",
      "title": "Progressive delivery & pipeline as product",
      "minutes": 50,
      "durationLabel": "Week 8–9",
      "overview": "Canaries, blue-green, feature flags — reduce blast radius. Treat pipeline as product with owners and roadmap.",
      "learn": [
        "Canary vs blue-green",
        "Feature flags intro",
        "Pipeline metrics",
        "DORA awareness"
      ],
      "steps": [
        {
          "title": "Progressive delivery vocab",
          "body": "Canary: route 5% traffic to new version. Blue-green: switch all at once with instant rollback.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Compare in PROGRESSIVE.md — when each fits.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Feature flags",
          "body": "Deploy code dark; enable via flag. Rollback = flip flag, not redeploy.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Read LaunchDarkly or Unleash intro. Document use case in PROGRESSIVE.md.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "DORA metrics (awareness)",
          "body": "Deployment frequency, lead time, MTTR, change fail rate — how good teams measure delivery.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Rate your lab repo on each DORA metric qualitatively (low/medium/high).",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Pipeline roadmap",
          "body": "Quarterly pipeline improvements: speed, security, developer experience.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write 3-item pipeline roadmap in PIPELINE.md.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "PROGRESSIVE.md written",
        "DORA self-assessment",
        "Pipeline roadmap"
      ],
      "practice": {
        "title": "Interview answer",
        "brief": "Explain blue-green vs canary in 60 seconds."
      },
      "resources": [
        {
          "type": "doc",
          "name": "DORA Metrics",
          "url": "https://dora.dev/quickcheck/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Feature Flags — Martin Fowler",
          "url": "https://martinfowler.com/articles/feature-toggles.html",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Canaries, blue-green, feature flags — reduce blast radius. Treat pipeline as product with owners and roadmap.",
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
      "id": "ci-checkpoint-b",
      "kind": "checkpoint",
      "phase": "E · Advanced Delivery",
      "level": "advanced",
      "title": "Checkpoint B — Job-ready pipeline portfolio",
      "minutes": 40,
      "durationLabel": "Gate",
      "overview": "Full pipeline portfolio: CI, secrets, cache, environments, gates, rollback docs.",
      "learn": [
        "Pipeline portfolio criteria"
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
          "doThis": "Walk through repo as interviewer.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "PR + main workflows with test + lint",
            "Secrets and environments configured safely",
            "Cache reducing run time (documented)",
            "Staging deploy job with environment protection",
            "Branch protection + required checks demonstrated",
            "ROLLBACK.md + GATES.md + PIPELINE.md complete"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 6 criteria met",
        "INTERVIEW.md with CI/CD Q&A"
      ],
      "practice": {
        "title": "Portfolio demo",
        "brief": "5-min Loom: PR → checks → merge → deploy → show rollback doc."
      },
      "resources": [
        {
          "type": "doc",
          "name": "GitHub Actions — Best practices",
          "url": "https://docs.github.com/en/actions/learn-github-actions/best-practices-for-github-actions",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "Full pipeline portfolio: CI, secrets, cache, environments, gates, rollback docs.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    }
  ]
};
