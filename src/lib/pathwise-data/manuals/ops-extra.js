import { ch, r } from '../helpers.js'

/** Ops & platform literacy for QA — CLI, observability, cloud, data, docs systems. */
export const opsExtraManuals = [
  {
    id: 'linux-cli',
    title: 'Linux & CLI for Testers',
    tagline: 'Navigate systems, logs, and scripts without fear of the terminal.',
    category: 'ops',
    accent: '#0B3D2E',
    cover: 'covers/python-cover.png',
    duration: '3–5 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'QA and automation folks who avoid the terminal until an incident forces them in.',
    outcomes: [
      'Navigate files, processes, and permissions confidently',
      'Grep logs and pipe commands to isolate failures',
      'Write small shell snippets that save testing time',
    ],
    chapters: [
      ch({
        id: 'cli-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 20,
        durationLabel: 'Day 0',
        overview:
          'Practice on a safe machine: local macOS/Linux terminal, WSL, or a throwaway VM/container. Never practice destructive commands on prod.',
        learn: ['Safe sandbox', 'Shell choice', 'History hygiene'],
        steps: [
          {
            title: 'Sandbox ready',
            body: 'bash or zsh. Optional: Docker Ubuntu container for experiments.',
            doThis: 'Open a terminal. Confirm `pwd`, `whoami`, `echo $SHELL`. Create ~/cli-lab.',
            tip: 'Prefer `--help` and `man` over random Stack Overflow paste.',
          },
        ],
        checklist: ['cli-lab directory created'],
        resources: [
          r('doc', 'Linux Journey', 'https://linuxjourney.com/', 'EN'),
          r('doc', 'Bash Guide (TLDP)', 'https://tldp.org/LDP/Bash-Beginners-Guide/html/', 'EN'),
        ],
      }),

      ch({
        id: 'cli-nav',
        phase: 'A · Basics',
        level: 'beginner',
        title: 'Navigation & files',
        minutes: 35,
        durationLabel: 'Week 1',
        overview:
          'pwd, ls, cd, mkdir, cp, mv, rm (carefully), find. Paths absolute vs relative.',
        learn: ['Paths', 'Listing', 'Safe delete habits'],
        steps: [
          {
            title: 'Lab tree',
            doThis: 'In ~/cli-lab build a small tree, copy, rename, and list recursively.',
            code: `mkdir -p ~/cli-lab/{logs,data,scripts}
echo "hello" > ~/cli-lab/data/sample.txt
cp ~/cli-lab/data/sample.txt ~/cli-lab/data/sample.bak
ls -la ~/cli-lab/**`,
            tip: '`rm -rf` is a loaded weapon. Prefer trash tools while learning.',
          },
        ],
        checklist: ['Tree created and listed'],
        resources: [
          r('doc', 'MDN isn’t CLI — use man ls', 'https://man7.org/linux/man-pages/man1/ls.1.html', 'EN'),
        ],
      }),

      ch({
        id: 'cli-read',
        phase: 'A · Basics',
        level: 'beginner',
        title: 'Reading files & pipes',
        minutes: 35,
        overview:
          'cat, less, head, tail, grep, sort, uniq, wc. Pipes and redirects are how you investigate.',
        learn: ['Pipes', 'grep', 'tail -f'],
        steps: [
          {
            title: 'Fake log hunt',
            doThis: 'Generate a log file with repeated lines; find ERROR counts with pipes.',
            code: `printf 'INFO ok\\nERROR boom\\nINFO ok\\nERROR boom\\n' > ~/cli-lab/logs/app.log
grep ERROR ~/cli-lab/logs/app.log | wc -l
tail -n 20 ~/cli-lab/logs/app.log`,
          },
        ],
        checklist: ['ERROR count via pipe'],
        practice: { title: 'Real log', brief: 'On a safe env, `tail -f` a log while reproducing a bug once.' },
      }),

      ch({
        id: 'cli-perm',
        phase: 'A · Basics',
        level: 'intermediate',
        title: 'Permissions & processes',
        minutes: 35,
        overview:
          'chmod/chown basics, ps, top/htop, kill, env vars. Enough to debug “permission denied” and stuck processes.',
        learn: ['rwx bits', 'Process list', 'Env'],
        steps: [
          {
            title: 'Permission + process lab',
            doThis: 'Make a script executable. List processes. Export a dummy ENV and print it.',
            code: `echo '#!/usr/bin/env bash\\necho hi' > ~/cli-lab/scripts/hi.sh
chmod +x ~/cli-lab/scripts/hi.sh
~/cli-lab/scripts/hi.sh
export TEST_ENV=staging
echo $TEST_ENV
ps aux | head`,
          },
        ],
        checklist: ['Executable script runs', 'ENV printed'],
        resources: [
          r('doc', 'chmod man', 'https://man7.org/linux/man-pages/man1/chmod.1.html', 'EN'),
        ],
      }),

      ch({
        id: 'cli-cp1',
        kind: 'checkpoint',
        phase: 'A · Basics',
        level: 'intermediate',
        title: 'Checkpoint: investigate a failure',
        minutes: 40,
        durationLabel: 'Gate',
        overview: 'Given a messy log (or make one), produce a one-page note: root lines, counts, timestamps.',
        learn: ['Investigation writeup'],
        steps: [
          {
            title: 'Investigation',
            doThis: 'Use only CLI tools. Paste the commands you used into the note.',
          },
        ],
        checklist: ['Note with commands + findings'],
      }),

      ch({
        id: 'cli-net',
        phase: 'B · Tester toolkit',
        level: 'intermediate',
        title: 'Networking lite for QA',
        minutes: 35,
        durationLabel: 'Week 2',
        overview:
          'curl, ping, dig/nslookup, ssh basics. Hit APIs and check headers without Postman sometimes.',
        learn: ['curl', 'DNS peek', 'SSH caution'],
        steps: [
          {
            title: 'curl an API',
            doThis: 'GET a public API; show status and headers. Save body to a file.',
            code: `curl -sS -D - -o ~/cli-lab/data/body.json https://httpbin.org/get | head
jq . ~/cli-lab/data/body.json 2>/dev/null || cat ~/cli-lab/data/body.json`,
            tip: 'Don’t curl random internal prod URLs with write methods.',
          },
        ],
        checklist: ['curl + saved body'],
        resources: [
          r('doc', 'curl manual', 'https://curl.se/docs/manual.html', 'EN'),
          r('doc', 'httpbin', 'https://httpbin.org/', 'EN'),
        ],
      }),

      ch({
        id: 'cli-script',
        phase: 'B · Tester toolkit',
        level: 'intermediate',
        title: 'Small scripts that help testing',
        minutes: 40,
        overview:
          'Loops, variables, exit codes. Automate boring setup: seed data, wait for port, collect logs.',
        learn: ['bash basics', 'exit codes', 'set -euo pipefail lite'],
        steps: [
          {
            title: 'Wait-for-url script',
            doThis: 'Write a script that curls until 200 or times out.',
            code: `#!/usr/bin/env bash
set -euo pipefail
url=\${1:-https://httpbin.org/status/200}
for i in {1..10}; do
  if curl -sf "\$url" >/dev/null; then echo ready; exit 0; fi
  sleep 1
done
echo timeout >&2; exit 1`,
          },
        ],
        checklist: ['Script works locally'],
      }),

      ch({
        id: 'cli-ssh',
        phase: 'C · Real systems',
        level: 'advanced',
        title: 'SSH & remote logs',
        minutes: 30,
        durationLabel: 'Week 3',
        overview:
          'Keys, config hosts, scp/rsync basics. Pull logs instead of living on the box.',
        learn: ['SSH config', 'scp', 'Least privilege'],
        steps: [
          {
            title: 'SSH config stub',
            doThis: 'Write a ~/.ssh/config Host entry for a lab/bastion (or a commented template if none).',
            code: `Host lab
  HostName example.com
  User you
  IdentityFile ~/.ssh/id_ed25519`,
          },
        ],
        checklist: ['SSH config template ready'],
        resources: [
          r('doc', 'SSH config manual', 'https://man.openbsd.org/ssh_config', 'EN'),
        ],
      }),

      ch({
        id: 'cli-cp2',
        kind: 'checkpoint',
        phase: 'C · Real systems',
        level: 'advanced',
        title: 'Checkpoint: tester CLI kit',
        minutes: 45,
        durationLabel: 'Capstone',
        overview: 'Publish a personal cheatsheet + 2 scripts in a repo or gist.',
        learn: ['Personal tooling'],
        steps: [
          {
            title: 'Kit',
            doThis: 'Cheatsheet (1 page) + wait-for-url + log-grepper scripts with README.',
            items: ['Nav/grep cheatsheet', 'Two scripts', 'Safety notes', 'One real debugging story'],
          },
        ],
        checklist: ['Kit published'],
        note: 'Pace: 3–5 weeks. Daily 20 minutes in the terminal beats weekend cramming.',
      }),
    ],
    resources: {
      docs: [
        { name: 'Linux Journey', url: 'https://linuxjourney.com/' },
        { name: 'curl docs', url: 'https://curl.se/docs/manual.html' },
        { name: 'Bash beginners guide', url: 'https://tldp.org/LDP/Bash-Beginners-Guide/html/' },
      ],
      tools: ['Terminal / WSL', 'jq', 'htop', 'Docker (optional lab)', 'httpbin'],
      books: ['The Linux Command Line (Shotts) — free online'],
      practice: ['Daily log grep', 'Replace one GUI file task with CLI weekly'],
      videos: [{ name: 'Corey Schafer Linux basics', url: 'https://www.youtube.com/watch?v=wGCRQn9ZYtA' }],
    },
  },

  {
    id: 'observability',
    title: 'Observability Basics',
    tagline: 'Logs, metrics, traces — reading production like a detective.',
    category: 'ops',
    accent: '#145C4A',
    cover: 'covers/cicd-cover.png',
    duration: '3–5 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'QA and developers who need to diagnose issues in staging/prod with telemetry — not guesswork.',
    outcomes: [
      'Use logs, metrics, and traces together on a real incident path',
      'Define useful signals for a feature you test',
      'Ask better questions of on-call and dashboards',
    ],
    chapters: [
      ch({
        id: 'obs-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 20,
        durationLabel: 'Day 0',
        overview:
          'Observability is about asking new questions of a system. You’ll need access to at least one telemetry stack (Grafana, Datadog, CloudWatch, Honeycomb, etc.) or a demo.',
        learn: ['Three pillars', 'Access', 'Safety'],
        steps: [
          {
            title: 'Get eyes on a system',
            doThis: 'Confirm you can open logs + one dashboard for a service you know. Note the tool names.',
            tip: 'Read-only access is enough for this path.',
          },
        ],
        checklist: ['Tool access confirmed'],
        resources: [
          r('doc', 'OpenTelemetry concepts', 'https://opentelemetry.io/docs/concepts/', 'EN'),
          r('doc', 'Google SRE — Monitoring', 'https://sre.google/sre-book/monitoring-distributed-systems/', 'EN'),
        ],
      }),

      ch({
        id: 'obs-logs',
        phase: 'A · Pillars',
        level: 'beginner',
        title: 'Logs that help',
        minutes: 35,
        durationLabel: 'Week 1',
        overview:
          'Structured logs beat string soup. Correlation IDs stitch requests. Levels matter. PII doesn’t belong.',
        learn: ['Structured logging', 'Correlation IDs', 'Query patterns'],
        steps: [
          {
            title: 'Trace one request in logs',
            doThis: 'Reproduce a flow in staging. Copy a request/correlation id. Find all related lines.',
            items: ['Timestamp range', 'Service name', 'Correlation / trace id', 'Error fields'],
          },
        ],
        checklist: ['One request reconstructed from logs'],
      }),

      ch({
        id: 'obs-metrics',
        phase: 'A · Pillars',
        level: 'beginner',
        title: 'Metrics & dashboards',
        minutes: 35,
        overview:
          'RED (Rate, Errors, Duration) and USE (Utilization, Saturation, Errors). Prefer percentiles. Know gold signals.',
        learn: ['RED/USE', 'Cardinality caution', 'Dashboard reading'],
        steps: [
          {
            title: 'Read a service dashboard',
            doThis: 'Screenshot or note: RPS, error rate, p95 latency during a quiet and a busy window.',
            tip: 'A flat average with spiky p99 means someone is hurting.',
          },
        ],
        checklist: ['Quiet vs busy notes'],
        resources: [
          r('article', 'RED method', 'https://www.weave.works/blog/the-red-method-key-metrics-for-microservices-architecture/', 'EN'),
        ],
      }),

      ch({
        id: 'obs-traces',
        phase: 'A · Pillars',
        level: 'intermediate',
        title: 'Distributed traces',
        minutes: 40,
        overview:
          'Spans show where time went across services. Find the slow parent. Spot errors mid-trace.',
        learn: ['Spans', 'Waterfalls', 'Trace↔log links'],
        steps: [
          {
            title: 'Open one slow trace',
            doThis: 'Pick a high-latency request. Identify the longest span. Write the bottleneck hypothesis.',
          },
        ],
        checklist: ['Slow trace analyzed'],
        resources: [
          r('doc', 'OpenTelemetry traces', 'https://opentelemetry.io/docs/concepts/signals/traces/', 'EN'),
        ],
      }),

      ch({
        id: 'obs-cp1',
        kind: 'checkpoint',
        phase: 'A · Pillars',
        level: 'intermediate',
        title: 'Checkpoint: three-pillar story',
        minutes: 45,
        durationLabel: 'Gate',
        overview: 'Tell one user problem using logs + metrics + traces together.',
        learn: ['Narrative diagnosis'],
        steps: [
          {
            title: 'Incident storyboard',
            doThis: '1–2 pages: symptom → signals → hypothesis → next check.',
          },
        ],
        checklist: ['Storyboard shared with an eng/SRE'],
      }),

      ch({
        id: 'obs-slis',
        phase: 'B · Quality signals',
        level: 'intermediate',
        title: 'SLIs for features you test',
        minutes: 35,
        durationLabel: 'Week 2',
        overview:
          'Partner with eng to know what “good” looks like for a journey. Testing without signals is flying blind after release.',
        learn: ['Feature SLIs', 'Alert vs board', 'Synthetic checks'],
        steps: [
          {
            title: 'Propose SLIs',
            doThis: 'For one feature: 2–3 SLIs and where you’d look on day-two after ship.',
          },
        ],
        checklist: ['SLI proposal written'],
        resources: [
          r('doc', 'SRE — SLOs', 'https://sre.google/sre-book/service-level-objectives/', 'EN'),
        ],
      }),

      ch({
        id: 'obs-incidents',
        phase: 'B · Quality signals',
        level: 'intermediate',
        title: 'Incident reading for QA',
        minutes: 30,
        overview:
          'During incidents: don’t spam chat. Provide repro, scope, and customer impact. After: verify fixes and regressions.',
        learn: ['Comms hygiene', 'Verification', 'Postmortem input'],
        steps: [
          {
            title: 'Shadow or simulate',
            doThis: 'Write a perfect QA update for a fictional Sev-2 using the template.',
            code: `Impact: …
Scope (who/what): …
Repro: …
Started / still occurring: …
Workaround: …
Next check I’ll run: …`,
          },
        ],
        checklist: ['Template filled once'],
      }),

      ch({
        id: 'obs-gaps',
        phase: 'C · Improve',
        level: 'advanced',
        title: 'Spot observability gaps',
        minutes: 30,
        durationLabel: 'Week 3',
        overview:
          'Missing IDs, uncorrelated services, dashboards without owners, alerts that cry wolf. File gaps like bugs.',
        learn: ['Gap taxonomy', 'Advocacy'],
        steps: [
          {
            title: 'Gap list',
            doThis: 'Find 3 gaps while testing. File or note them with user impact.',
          },
        ],
        checklist: ['Three gaps documented'],
      }),

      ch({
        id: 'obs-cp2',
        kind: 'checkpoint',
        phase: 'C · Improve',
        level: 'advanced',
        title: 'Checkpoint: feature observability brief',
        minutes: 50,
        durationLabel: 'Capstone',
        overview: 'Brief for one feature: how to validate in prod using telemetry + tests.',
        learn: ['Handoff to team'],
        steps: [
          {
            title: 'Brief',
            doThis: 'Include dashboards, log queries, trace tips, SLIs, known gaps.',
            items: ['Log query cheats', 'Dashboard links', 'Example trace', 'SLIs', 'Gaps/asks'],
          },
        ],
        checklist: ['Brief published'],
        note: 'Pace: 3–5 weeks. Pair with an SRE once if you can.',
      }),
    ],
    resources: {
      docs: [
        { name: 'OpenTelemetry docs', url: 'https://opentelemetry.io/docs/' },
        { name: 'SRE monitoring chapter', url: 'https://sre.google/sre-book/monitoring-distributed-systems/' },
      ],
      tools: ['Grafana / Datadog / CloudWatch / Honeycomb', 'jq', 'Log search UI'],
      books: ['Distributed Systems Observability (Marie) — O’Reilly', 'SRE Book (Google)'],
      practice: ['Weekly “follow one request” drill', 'Add obs notes to test plans'],
      videos: [{ name: 'OTel YouTube', url: 'https://www.youtube.com/@otel' }],
    },
  },

  {
    id: 'cloud-basics',
    title: 'Cloud Basics for QA',
    tagline: 'AWS/GCP concepts, environments, and IAM lite — enough to test without breaking the bill.',
    category: 'ops',
    accent: '#1A4A3A',
    cover: 'covers/api-testing-cover.png',
    duration: '3–4 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'QA who deploy-adjacent and need cloud vocabulary for envs, access, and debugging.',
    outcomes: [
      'Explain core cloud building blocks (compute, storage, network)',
      'Navigate environments and IAM concepts safely',
      'Use cloud consoles/CLIs for basic QA tasks',
    ],
    chapters: [
      ch({
        id: 'cld-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 20,
        durationLabel: 'Day 0',
        overview:
          'Pick AWS or GCP as your primary lens (concepts transfer). Prefer a free tier/sandbox account. Never create public buckets with real data for fun.',
        learn: ['Provider pick', 'Sandbox', 'Cost awareness'],
        steps: [
          {
            title: 'Sandbox access',
            doThis: 'Confirm login to a non-prod account/project. Note region/project id.',
            tip: 'Set a billing alarm on day one if you have account powers.',
          },
        ],
        checklist: ['Sandbox login works'],
        resources: [
          r('doc', 'AWS overview', 'https://aws.amazon.com/what-is-aws/', 'EN'),
          r('doc', 'GCP overview', 'https://cloud.google.com/docs/overview', 'EN'),
        ],
      }),

      ch({
        id: 'cld-blocks',
        phase: 'A · Concepts',
        level: 'beginner',
        title: 'Building blocks',
        minutes: 35,
        durationLabel: 'Week 1',
        overview:
          'Compute (VMs/functions/containers), storage (object/block), databases, networking (VPC), queues. Map your product onto these.',
        learn: ['Compute/storage/network', 'Managed vs DIY'],
        steps: [
          {
            title: 'Architecture sticky map',
            doThis: 'Diagram your app’s cloud pieces in 8 boxes or fewer. Label what you can access.',
          },
        ],
        checklist: ['Sticky map done'],
      }),

      ch({
        id: 'cld-envs',
        phase: 'A · Concepts',
        level: 'beginner',
        title: 'Environments & promotion',
        minutes: 30,
        overview:
          'Dev/stage/prod isolation, feature flags, config per env. Know what differs so tests aren’t lies.',
        learn: ['Env isolation', 'Config', 'Parity gaps'],
        steps: [
          {
            title: 'Parity table',
            doThis: 'Table: env × data × integrations × who can deploy. Highlight gaps that bite QA.',
          },
        ],
        checklist: ['Parity table'],
      }),

      ch({
        id: 'cld-iam',
        phase: 'A · Concepts',
        level: 'intermediate',
        title: 'IAM lite',
        minutes: 35,
        overview:
          'Identities, roles/policies, least privilege. QA often needs read logs + invoke staging — not admin.',
        learn: ['Users/roles/policies', 'Least privilege', 'Access keys caution'],
        steps: [
          {
            title: 'Permission story',
            doThis: 'List permissions you have vs need. Note any standing admin that should be temporary.',
            tip: 'Never commit cloud keys. Rotate if pasted in chat.',
          },
        ],
        checklist: ['Have vs need list'],
        resources: [
          r('doc', 'AWS IAM intro', 'https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html', 'EN'),
          r('doc', 'GCP IAM overview', 'https://cloud.google.com/iam/docs/overview', 'EN'),
        ],
      }),

      ch({
        id: 'cld-cp1',
        kind: 'checkpoint',
        phase: 'A · Concepts',
        level: 'intermediate',
        title: 'Checkpoint: cloud map + risks',
        minutes: 40,
        durationLabel: 'Gate',
        overview: 'Share architecture map, env parity, IAM notes with a peer.',
        learn: ['Review'],
        steps: [
          {
            title: 'Review pack',
            doThis: 'Add top 3 cloud-related test risks.',
          },
        ],
        checklist: ['Pack reviewed'],
      }),

      ch({
        id: 'cld-cli',
        phase: 'B · Hands-on',
        level: 'intermediate',
        title: 'CLI & console for QA tasks',
        minutes: 40,
        durationLabel: 'Week 2',
        overview:
          'List buckets/objects (carefully), describe instances/services, pull logs. Console for discovery; CLI for repeatability.',
        learn: ['aws/gcloud basics', 'Log groups', 'Object storage peek'],
        steps: [
          {
            title: 'Read-only tour',
            doThis: 'Run 3 read-only CLI commands (or console equivalents) and paste outputs into notes (redact ids if needed).',
            code: `# Examples — adjust to your provider/sandbox
# aws s3 ls
# aws logs describe-log-groups --max-items 5
# gcloud projects describe $PROJECT_ID
# gcloud logging logs list --limit=5`,
          },
        ],
        checklist: ['Three read-only commands documented'],
        resources: [
          r('doc', 'AWS CLI', 'https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html', 'EN'),
          r('doc', 'gcloud CLI', 'https://cloud.google.com/sdk/gcloud', 'EN'),
        ],
      }),

      ch({
        id: 'cld-test',
        phase: 'B · Hands-on',
        level: 'intermediate',
        title: 'What to test in the cloud',
        minutes: 30,
        overview:
          'Config drift, IAM denials, CORS, region failover (if claimed), temp credentials expiry, public exposure.',
        learn: ['Cloud-specific risks', 'Security smoke'],
        steps: [
          {
            title: 'Risk checklist',
            doThis: 'Write 8 cloud test ideas for your product. Star the top 3.',
          },
        ],
        checklist: ['Eight ideas', 'Top 3 starred'],
      }),

      ch({
        id: 'cld-cost',
        phase: 'C · Judgment',
        level: 'advanced',
        title: 'Cost, safety, and load tests',
        minutes: 25,
        durationLabel: 'Week 3',
        overview:
          'Load tests and log floods cost money. Know approval paths. Clean up orphaned resources.',
        learn: ['Cost risks', 'Cleanup', 'Approvals'],
        steps: [
          {
            title: 'Safety card',
            doThis: 'One-pager: what QA must not do in cloud without approval.',
          },
        ],
        checklist: ['Safety card written'],
      }),

      ch({
        id: 'cld-cp2',
        kind: 'checkpoint',
        phase: 'C · Judgment',
        level: 'advanced',
        title: 'Checkpoint: QA cloud cheat sheet',
        minutes: 45,
        durationLabel: 'Capstone',
        overview: 'Team cheat sheet: envs, IAM asks, CLI snippets, risks, safety card.',
        learn: ['Team asset'],
        steps: [
          {
            title: 'Publish',
            doThis: 'Put in wiki. Walk one teammate through it.',
            items: ['Architecture map', 'Env parity', 'CLI snippets', 'Test ideas', 'Safety card'],
          },
        ],
        checklist: ['Cheat sheet live'],
        note: 'Pace: 3–4 weeks. Vocabulary + safety > collecting certifications.',
      }),
    ],
    resources: {
      docs: [
        { name: 'AWS Getting Started', url: 'https://aws.amazon.com/getting-started/' },
        { name: 'GCP docs overview', url: 'https://cloud.google.com/docs/overview' },
        { name: 'AWS IAM', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html' },
      ],
      tools: ['AWS Console / GCP Console', 'AWS CLI / gcloud', 'Billing alarms', 'Sandbox account'],
      books: ['AWS in Action / Google Cloud certified guides — selective concept chapters'],
      practice: ['Weekly read-only CLI tour', 'Update env parity table when something bites'],
      videos: [{ name: 'AWS Cloud Practitioner essentials (free tier learning)', url: 'https://aws.amazon.com/training/' }],
    },
  },

  {
    id: 'data-literacy',
    title: 'Data Literacy',
    tagline: 'Metrics, dashboards, and how charts lie — so you don’t ship on vibes.',
    category: 'ops',
    accent: '#0F5C4C',
    cover: 'covers/sql-cover.png',
    duration: '2–4 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'QA, PMs, and builders who read dashboards and need healthy skepticism.',
    outcomes: [
      'Question metrics definitions and denominators',
      'Spot chart crimes and misleading aggregates',
      'Pull simple answers with SQL or a BI tool',
    ],
    chapters: [
      ch({
        id: 'dl-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 15,
        durationLabel: 'Day 0',
        overview:
          'Pick one product metric people argue about (conversion, error rate, NPS). You’ll interrogate it.',
        learn: ['Metric pick'],
        steps: [
          {
            title: 'Pick the metric',
            doThis: 'Write the metric name and what decision it supposedly drives.',
          },
        ],
        checklist: ['Metric chosen'],
        resources: [
          r('article', 'Calling Bullshit — home', 'https://callingbullshit.org/', 'EN'),
        ],
      }),

      ch({
        id: 'dl-define',
        phase: 'A · Metrics',
        level: 'beginner',
        title: 'Definitions & denominators',
        minutes: 35,
        durationLabel: 'Week 1',
        overview:
          'What counts as an event? Who’s in the denominator? Timezone? Bot traffic? Ambiguity is where “lies” start.',
        learn: ['Operational definitions', 'Coverage', 'Windows'],
        steps: [
          {
            title: 'Definition sheet',
            doThis: 'For your metric: numerator, denominator, filters, owner, known caveats.',
          },
        ],
        checklist: ['Definition sheet'],
      }),

      ch({
        id: 'dl-charts',
        phase: 'A · Metrics',
        level: 'beginner',
        title: 'How charts lie',
        minutes: 35,
        overview:
          'Truncated axes, dual axes, cherry-picked windows, averages hiding segments, cumulative vs rate confusion.',
        learn: ['Chart crimes', 'Segment checks', 'Base rates'],
        steps: [
          {
            title: 'Crime scene',
            doThis: 'Find 3 public or internal charts. Label the crime (or certify clean).',
            tip: 'Always ask: compared to what?',
          },
        ],
        checklist: ['Three chart critiques'],
        resources: [
          r('article', 'How to Lie with Charts (concepts)', 'https://callingbullshit.org/tools.html', 'EN'),
          r('book', 'How to Lie with Statistics (Huff) — classic', 'https://en.wikipedia.org/wiki/How_to_Lie_with_Statistics', 'EN'),
        ],
      }),

      ch({
        id: 'dl-sql',
        phase: 'B · Query',
        level: 'intermediate',
        title: 'SQL lite for truth-seeking',
        minutes: 40,
        durationLabel: 'Week 2',
        overview:
          'SELECT, WHERE, GROUP BY, COUNT, averages. Enough to verify a dashboard number once.',
        learn: ['Aggregations', 'Joins caution', 'Sampling'],
        steps: [
          {
            title: 'Reproduce a number',
            doThis: 'Match (or explain mismatch of) one dashboard figure with a query or export.',
            code: `SELECT date_trunc('day', created_at) AS day,
       COUNT(*) FILTER (WHERE status = 'error') AS errors,
       COUNT(*) AS total
FROM events
WHERE created_at >= now() - interval '7 days'
GROUP BY 1
ORDER BY 1;`,
          },
        ],
        checklist: ['One number reproduced or mismatch explained'],
        resources: [
          r('doc', 'Mode SQL tutorial', 'https://mode.com/sql-tutorial/', 'EN'),
          r('doc', 'PostgreSQL aggregates', 'https://www.postgresql.org/docs/current/functions-aggregate.html', 'EN'),
        ],
      }),

      ch({
        id: 'dl-cp1',
        kind: 'checkpoint',
        phase: 'B · Query',
        level: 'intermediate',
        title: 'Checkpoint: metric autopsy',
        minutes: 40,
        durationLabel: 'Gate',
        overview: 'Autopsy your chosen metric: definition, chart risks, verification attempt.',
        learn: ['Communication'],
        steps: [
          {
            title: 'Autopsy doc',
            doThis: 'Share with a PM/eng. Ask what they would change.',
          },
        ],
        checklist: ['Autopsy shared'],
      }),

      ch({
        id: 'dl-experiment',
        phase: 'C · Decisions',
        level: 'advanced',
        title: 'Experiments & causality caution',
        minutes: 30,
        overview:
          'Correlation ≠ causation. Novelty effects, seasonality, confounds. QA can challenge “the A/B won” narratives.',
        learn: ['Confounds', 'Peeking', 'Practical significance'],
        steps: [
          {
            title: 'Challenge a claim',
            doThis: 'Take one causal claim at work. List 3 alternative explanations.',
          },
        ],
        checklist: ['Three alternatives listed'],
      }),

      ch({
        id: 'dl-qa',
        phase: 'C · Decisions',
        level: 'intermediate',
        title: 'Data quality as a bug class',
        minutes: 30,
        durationLabel: 'Week 3',
        overview:
          'Missing events, duplicate sends, clock skew, timezone bugs — treat analytics defects as product defects when decisions depend on them.',
        learn: ['Event QA', 'Instrumentation reviews'],
        steps: [
          {
            title: 'Instrumentation check',
            doThis: 'For one flow, list expected events. Verify they fire once with expected props.',
          },
        ],
        checklist: ['Event checklist verified'],
      }),

      ch({
        id: 'dl-cp2',
        kind: 'checkpoint',
        phase: 'C · Decisions',
        level: 'advanced',
        title: 'Checkpoint: data skepticism kit',
        minutes: 45,
        durationLabel: 'Capstone',
        overview: 'Kit: definition template, chart checklist, SQL snippet, event QA list.',
        learn: ['Team habit'],
        steps: [
          {
            title: 'Publish kit',
            doThis: 'Use the chart checklist in one meeting this week.',
            items: ['Definition template', 'Chart crime checklist', 'Verification query', 'Event QA list'],
          },
        ],
        checklist: ['Kit published', 'Used in a meeting'],
        note: 'Pace: 2–4 weeks. Skepticism with curiosity, not cynicism.',
      }),
    ],
    resources: {
      docs: [
        { name: 'Calling Bullshit', url: 'https://callingbullshit.org/' },
        { name: 'Mode SQL tutorial', url: 'https://mode.com/sql-tutorial/' },
      ],
      tools: ['Metabase / Looker / Mode / BigQuery', 'Spreadsheet', 'SQL client'],
      books: ['How to Lie with Statistics (Huff)', 'Thinking in Bets (Duke) — selective'],
      practice: ['Autopsy one metric per month', 'Event QA on every analytics-heavy feature'],
      videos: [{ name: 'Calling Bullshit lectures', url: 'https://callingbullshit.org/videos.html' }],
    },
  },

  {
    id: 'documentation-systems',
    title: 'Documentation Systems',
    tagline: 'READMEs, ADRs, runbooks — docs as a system, not a graveyard.',
    category: 'ops',
    accent: '#14532D',
    cover: 'covers/git-cover.png',
    duration: '3–4 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'Teams drowning in outdated wikis who want a small, living doc system.',
    outcomes: [
      'Set up a practical doc hierarchy with owners',
      'Write ADRs and runbooks that get used',
      'Run a lightweight docs review cadence',
    ],
    chapters: [
      ch({
        id: 'ds-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 20,
        durationLabel: 'Day 0',
        overview:
          'Docs fail as systems when nobody owns freshness. You’ll design a minimal system for one team/repo and migrate 3 critical pages.',
        learn: ['Scope', 'Canonical home'],
        steps: [
          {
            title: 'Pick the home',
            body: 'Repo /docs, Notion, Confluence — one canonical place. Others link in.',
            doThis: 'Declare the canonical home in writing. List competing graveyards.',
          },
        ],
        checklist: ['Canonical home declared'],
        resources: [
          r('doc', 'Write the Docs — Docs as Code', 'https://www.writethedocs.org/guide/docs-as-code/', 'EN'),
          r('article', 'Diátaxis framework', 'https://diataxis.fr/', 'EN'),
        ],
      }),

      ch({
        id: 'ds-diataxis',
        phase: 'A · Structure',
        level: 'beginner',
        title: 'Diátaxis: four doc types',
        minutes: 30,
        durationLabel: 'Week 1',
        overview:
          'Tutorials, how-to guides, reference, explanation. Mixing them confuses readers.',
        learn: ['Four types', 'Sorting existing pages'],
        steps: [
          {
            title: 'Sort 10 pages',
            doThis: 'Label 10 existing docs by Diátaxis type. Note misfits to split.',
          },
        ],
        checklist: ['Ten pages labeled'],
        resources: [
          r('doc', 'Diátaxis', 'https://diataxis.fr/', 'EN'),
        ],
      }),

      ch({
        id: 'ds-readme',
        phase: 'A · Structure',
        level: 'beginner',
        title: 'READMEs that onboard',
        minutes: 35,
        overview:
          'What is this, why, quickstart, how to test, where to learn more. Link deep docs — don’t paste novels.',
        learn: ['README anatomy', 'Quickstart test'],
        steps: [
          {
            title: 'README rewrite',
            doThis: 'Rewrite one README. Have a peer onboard from zero using only it.',
            code: `# Name
What / why
## Quickstart
## Develop
## Test
## Config
## Troubleshoot
## Deeper docs`,
          },
        ],
        checklist: ['README peer-tested'],
      }),

      ch({
        id: 'ds-adr',
        phase: 'B · Decisions',
        level: 'intermediate',
        title: 'ADRs — Architecture Decision Records',
        minutes: 35,
        durationLabel: 'Week 2',
        overview:
          'Capture context, decision, consequences. Future humans stop re-litigating the past.',
        learn: ['ADR format', 'When to write', 'Superseding'],
        steps: [
          {
            title: 'Write an ADR',
            doThis: 'Document one real past decision (even retroactively).',
            code: `# ADR-001: Title
Date / Status: accepted
Context:
Decision:
Consequences:
Alternatives considered:`,
          },
        ],
        checklist: ['One ADR merged or filed'],
        resources: [
          r('article', 'Quinn — ADRs', 'https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions', 'EN'),
          r('doc', 'ADR GitHub org', 'https://adr.github.io/', 'EN'),
        ],
      }),

      ch({
        id: 'ds-runbook',
        phase: 'B · Decisions',
        level: 'intermediate',
        title: 'Runbooks for humans at 2am',
        minutes: 40,
        overview:
          'Symptoms → diagnosis checks → mitigate → escalate → verify. Short. Executable. Owned.',
        learn: ['Runbook structure', 'Verification', 'Ownership'],
        steps: [
          {
            title: 'Write a runbook',
            doThis: 'One runbook for a real alert or failure mode. Dry-run the steps.',
            items: ['Symptoms', 'Checks', 'Mitigations', 'Rollback', 'Escalation contacts', 'Last verified'],
          },
        ],
        checklist: ['Runbook dry-run'],
      }),

      ch({
        id: 'ds-cp1',
        kind: 'checkpoint',
        phase: 'B · Decisions',
        level: 'intermediate',
        title: 'Checkpoint: three canonical docs',
        minutes: 40,
        durationLabel: 'Gate',
        overview: 'Ship README + ADR + runbook into the canonical home with owners.',
        learn: ['Minimum viable system'],
        steps: [
          {
            title: 'Publish trio',
            doThis: 'Index page linking all three. Announce in team channel.',
          },
        ],
        checklist: ['Trio live', 'Announced'],
      }),

      ch({
        id: 'ds-cadence',
        phase: 'C · System',
        level: 'advanced',
        title: 'Owners, review cadence, deletion',
        minutes: 30,
        durationLabel: 'Week 3',
        overview:
          'Every page: owner + review date. Delete or archive boldly. Search that returns corpses trains people to ask Slack instead.',
        learn: ['Ownership', 'Review ritual', 'Archive policy'],
        steps: [
          {
            title: 'Cadence',
            doThis: 'Add owners/dates to 10 pages. Schedule a 30-min monthly docs triage.',
          },
        ],
        checklist: ['Ten pages stamped', 'Triage scheduled'],
      }),

      ch({
        id: 'ds-search',
        phase: 'C · System',
        level: 'advanced',
        title: 'Discoverability',
        minutes: 25,
        overview:
          'Index pages, naming conventions, tags, “start here.” If people can’t find it, it doesn’t exist.',
        learn: ['Index design', 'Naming', 'Slack → doc redirection'],
        steps: [
          {
            title: 'Start-here page',
            doThis: 'Create a start-here index for your team’s top 10 tasks.',
          },
        ],
        checklist: ['Start-here published'],
      }),

      ch({
        id: 'ds-cp2',
        kind: 'checkpoint',
        phase: 'C · System',
        level: 'advanced',
        title: 'Checkpoint: docs system brief',
        minutes: 45,
        durationLabel: 'Capstone',
        overview: 'One-page system brief: home, types, templates, owners, cadence, deletion policy.',
        learn: ['Institutionalize'],
        steps: [
          {
            title: 'System brief',
            doThis: 'Get lead +1. Run first triage meeting.',
            items: [
              'Canonical home',
              'Templates (README/ADR/runbook)',
              'Owner rules',
              'Monthly triage',
              'Archive/delete policy',
              'Start-here index',
            ],
          },
        ],
        checklist: ['Brief +1', 'First triage done'],
        note: 'Pace: 3–4 weeks. Deletion is a feature.',
      }),
    ],
    resources: {
      docs: [
        { name: 'Diátaxis', url: 'https://diataxis.fr/' },
        { name: 'Write the Docs — Docs as Code', url: 'https://www.writethedocs.org/guide/docs-as-code/' },
        { name: 'ADR resources', url: 'https://adr.github.io/' },
      ],
      tools: ['Git + Markdown', 'MkDocs / Docusaurus', 'Notion/Confluence', 'Issue templates for doc debt'],
      books: ['Docs for Developers', 'Team Topologies — for ownership context (selective)'],
      practice: ['Monthly docs triage', 'ADR for every non-trivial decision'],
      videos: [{ name: 'Write the Docs videos', url: 'https://www.writethedocs.org/videos/' }],
    },
  },
]
