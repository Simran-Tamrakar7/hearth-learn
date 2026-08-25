import type { TestingChapterData } from "@/app/manuals/_ui/TestingTypesInteractiveManual";

/** Part 23 — Chapters 89–92 (gap-fill) */
export const TESTING_TYPES_PARTS_23: TestingChapterData[] = [
  {
    no: "89",
    title: "Incremental Integration Testing",
    category: "Integration Subtype",
    desc: "Incremental integration testing adds modules one at a time to an already-tested core, verifying each newly joined piece against what is already known-good before the next module is introduced — the opposite of Big Bang integration (Chapter 64), which waits until every module is ready and then combines them all at once.",
    why: "When every module is wired together in a single Big Bang pass, a failure can live in any of them, or in any interaction between them, and isolating the cause means re-examining the entire assembled system from scratch. Incremental integration shrinks that search space to the single module just added and its boundary with the already-tested core, so defects are caught early — while the new piece is still small, fresh, and easy to fix — instead of after the whole chain is already live and entangled.",
    when: "Whenever independently developed modules have a clear dependency order and can be integrated gradually — Attendance before Leave before Payroll, authentication before the features that depend on it — which is the default, more disciplined strategy for any system with separable modules. Use Big Bang (Chapter 64) only when modules genuinely cannot be meaningfully exercised until they all exist, or when schedule pressure leaves no room for a sequenced build-up.",
    advantages: [
      "Pinpoints a new defect to the single module just added, rather than the entire assembled system",
      "Catches integration bugs early, while the new piece is still small and cheap to fix",
      "Builds confidence in the core progressively — each green step is a known-good base for the next",
      "Does not require every module to be finished before any integration testing can begin",
    ],
    limitations: [
      "Requires a planned sequence, stubs or drivers for modules not yet joined, and the discipline to stop and verify at each step",
      "Takes more calendar time than a single Big Bang pass, because each addition is a testing stage of its own",
      "A poorly chosen order (integrating a leaf before its dependency) recreates Big Bang confusion in miniature",
      "Stubs that do not faithfully stand in for the real module can hide the very boundary bugs the sequence is meant to find",
    ],
    practical: {
      app: "HRMS Attendance → Leave → Payroll Chain",
      scenario:
        "Bizlevate integrates the Attendance, Leave, and Payroll modules incrementally: Attendance is tested as the core first, Leave is added against that verified core, then Payroll is added against both.",
      fail: "Leave is joined to the already-tested Attendance core. Clock-in/out hours are not converted to the same unit Leave uses for deduction, so a full working day records as 8 hours in Attendance but only 0.33 days of leave — caught immediately at this step, before Payroll is ever wired in.",
      failLabel: "Fail (caught early)",
      pass: "The unit conversion is fixed at the Attendance–Leave boundary and re-verified against the same core. Payroll is added only after that step is green, so payslip calculations inherit a known-good hours-to-leave mapping instead of inheriting the unit bug.",
      passLabel: "Pass (after fix)",
    },
    tools: [
      {
        name: "Selenium",
        sub: "Sequenced module chain",
        url: "https://selenium.dev",
        seeChapter: 6,
        desc: "The same browser-automation suite from Automated Testing (Chapter 6), used here to drive a staged UI chain — Attendance, then Leave against Attendance, then Payroll against both — rather than a single Big Bang script that only runs once every module is present (contrast Chapter 64).",
        adv: [
          "Each stage is a focused script against a known-good core plus one new module",
          "A red run at stage N localizes the fault to the module just added",
          "Broadest browser and language support of any automation tool",
          "Fits teams that already invest in Selenium for regression (Chapter 6)",
        ],
        lim: [
          "Needs a planned sequence and enough of a UI (or test driver) at each stage to exercise the new boundary",
          "Stubs for not-yet-joined modules have to be maintained until the real module arrives",
          "No auto-waiting — flaky without disciplined explicit waits (Chapter 6)",
          "A single combined script that skips the intermediate asserts is Big Bang in disguise",
        ],
        steps: [
          { t: "Step 1 — Name the core and the order", p: "Pick the first known-good module (Attendance) and the sequence it will grow by (Leave, then Payroll)." },
          {
            t: "Step 2 — Automate the core alone",
            p: "A Selenium script that clock-in / clock-out records a full working day correctly, with no Leave or Payroll UI involved yet.",
            c: `def test_stage1_attendance_core(driver):\n    clock_in(driver, "09:00")\n    clock_out(driver, "18:00")\n    assert hours_worked(driver) == 8.0`,
          },
          {
            t: "Step 3 — Add the next module only",
            p: "Join Leave to that verified core. Assert the new boundary — hours convert to leave days — before touching Payroll.",
            c: `def test_stage2_attendance_plus_leave(driver):\n    clock_in(driver, "09:00")\n    clock_out(driver, "18:00")\n    apply_leave(driver, days=1)\n    assert leave_deducted_days(driver) == 1.0  # not 0.33 from raw hours`,
          },
          { t: "Step 4 — Stop on red", p: "A failure here is in Leave or the Attendance–Leave boundary — not in Payroll, which is not in the build yet." },
          {
            t: "Step 5 — Add Payroll only after stage 2 is green",
            p: "Payslip assertions inherit the already-verified hours-to-leave mapping.",
            c: `def test_stage3_attendance_leave_payroll(driver):\n    # core + leave already green\n    run_payroll(driver)\n    assert payslip_leave_days(driver) == 1.0`,
          },
          { t: "Step 6 — Keep the stages, do not collapse them", p: "CI should still run stage 1, then 2, then 3 — a single all-modules script is Big Bang (Chapter 64), not incremental." },
        ],
      },
    ],
  },
  {
    no: "90",
    title: "Spike Testing",
    category: "Non-Functional",
    desc: "Spike testing subjects the system to a sudden, sharp jump in load — from a quiet baseline to a peak in seconds, then usually back down — to see whether it holds, degrades, or collapses, and whether it recovers once the surge ends. It is not load testing (Chapter 14), which ramps gradually to an expected crowd, and not stress testing (Chapter 15), which climbs past capacity to find the breaking point.",
    why: "Real traffic is not always a smooth ramp. Shift clock-in, a sale going live, or a notification going out can multiply concurrent users in a few seconds. A system that passed a gradual 300-user load test can still drop requests, exhaust connections, or fail to recover when those 300 arrive all at once. Spike testing is the type that specifically asks that sudden-jump question, instead of treating it as a side effect of load or stress.",
    when: "Before any event expected to produce a near-instant crowd — 9 AM shift clock-in, payroll-open morning, a campaign drop — and after changes to auto-scaling, connection pools, rate limits, or queues that are supposed to absorb a surge. Run it on an isolated environment; a production spike test is a real incident if it goes wrong.",
    advantages: [
      "Exposes failures that only appear on a sudden jump, which a gradual load ramp (Chapter 14) will never produce",
      "Checks recovery after the surge, not only survival at the peak — a system that stays degraded is still a failure",
      "Gives concrete numbers for auto-scale lag, queue depth, and error rate under a realistic clock-in or launch spike",
      "k6 scripts make the jump itself explicit in stages, so the test cannot accidentally turn into a slow ramp",
    ],
    limitations: [
      "A single designed spike is not every possible surge — shape, duration, and mix of endpoints still have to match the real event",
      "Shared staging infrastructure can absorb or distort the jump, hiding the production failure mode",
      "Auto-scale that is slow in production but instant in a small test environment will look healthier than it is",
      "Does not replace load testing (expected sustained crowd) or stress testing (finding the ceiling past that crowd)",
    ],
    practical: {
      app: "HRMS 9 AM Shift Clock-In Spike",
      scenario:
        "Bizlevate's night-shift baseline is roughly 20 concurrent users. At 9:00 AM, several hundred employees open the app and tap Clock In within the same minute. A spike test jumps from 20 to 400 virtual users in 10 seconds against login and clock-in, holds, then drops back to 20.",
      fail: "Clock-in requests pile up: p95 climbs past 12 seconds, 18% return 503 or time out, and after the spike ends the endpoint stays slow for several minutes because the connection pool is exhausted and does not recover.",
      pass: "A short queue and extra pool capacity absorb the 10-second jump; p95 stays under 2 seconds, error rate under 1%, and within 30 seconds of the drop-back the endpoint has returned to the 20-user baseline latency.",
      passLabel: "Pass (after fix)",
    },
    tools: [
      {
        name: "k6",
        sub: "Sudden-jump stages",
        url: "https://k6.io",
        desc: "A code-first load tool whose stages can jump from a quiet baseline to a peak in seconds — the configuration that makes a test a spike rather than a gradual ramp (Chapter 14) or a climb-past-capacity stress run (Chapter 15).",
        adv: [
          "The jump is visible in the stages array — hard to accidentally write a slow ramp",
          "Thresholds fail the run if the spike or the recovery window misses SLAs",
          "Lightweight enough to generate a sharp concurrent burst from a single machine",
          "Scripts are version-controlled and fit a CI job the same way as a load test",
        ],
        lim: [
          "Free tier has no GUI — spike vs ramp is judged from the script and CLI output",
          "Very large spikes may still need distributed generators (paid cloud or multiple instances)",
          "A stage that ramps over minutes is load testing, even if the file is named spike.js",
          "Does not by itself prove auto-scale in production if the test environment scales differently",
        ],
        steps: [
          { t: "Step 1 — Install k6", p: "CLI on the machine that will generate the burst.", c: `brew install k6` },
          {
            t: "Step 2 — Write a jump, not a ramp",
            p: "Quiet baseline, then a 10-second climb to peak, a hold, a 10-second drop, then a recovery window. Contrast Chapter 14's multi-minute ramp to the same peak.",
            c: `import http from 'k6/http';\nimport { check, sleep } from 'k6';\n\nexport const options = {\n  stages: [\n    { duration: '1m', target: 20 },    // night-shift baseline\n    { duration: '10s', target: 400 },  // 9 AM clock-in spike\n    { duration: '2m', target: 400 },   // hold the peak\n    { duration: '10s', target: 20 },   // surge ends\n    { duration: '2m', target: 20 },    // recovery\n  ],\n  thresholds: {\n    http_req_duration: ['p(95)<2000'],\n    http_req_failed: ['rate<0.01'],\n  },\n};`,
          },
          {
            t: "Step 3 — Hit login and clock-in",
            p: "The endpoints the real 9 AM crowd actually slams, not a generic homepage.",
            c: `export default function () {\n  const login = http.post('https://staging.hrms-app.com/api/login', {\n    email: 'shift@hrms.com',\n    password: 'password123',\n  });\n  check(login, { 'login 200': (r) => r.status === 200 });\n  const token = login.json('token');\n  const clock = http.post('https://staging.hrms-app.com/api/attendance/clock-in', null, {\n    headers: { Authorization: \`Bearer \${token}\` },\n  });\n  check(clock, { 'clock-in 200': (r) => r.status === 200 });\n  sleep(1);\n}`,
          },
          { t: "Step 4 — Run and watch the jump", p: "Confirm VUs actually reach 400 within ~10s, not over a minute.", c: `k6 run spike-clock-in.js` },
          { t: "Step 5 — Judge peak and recovery separately", p: "A green peak with a hung recovery is still a fail — the 2-minute tail after drop-back must return to baseline latency." },
          { t: "Step 6 — Do not confuse with load or stress", p: "If you lengthen the climb to several minutes, you are back in Chapter 14. If you keep raising the peak to find the ceiling, you are in Chapter 15." },
        ],
      },
      {
        name: "Apache JMeter",
        sub: "Near-zero ramp-up burst",
        url: "https://jmeter.apache.org",
        seeChapter: 14,
        desc: "The same Thread Group from Load Testing (Chapter 14), reconfigured so ramp-up is a few seconds rather than a minute — that near-zero ramp is what turns a load plan into a spike. Stress testing (Chapter 15) still differs: it keeps adding users past capacity instead of jumping to one planned peak and dropping back.",
        adv: [
          "GUI makes the ramp-up field obvious — set it near zero and the burst is the test",
          "Same listeners as Chapter 14 show error rate and p95 at the jump and after it",
          "Reusable against the same login/clock-in samplers already built for load tests",
          "Headless CLI run keeps the generator itself from competing with the system under test",
        ],
        lim: [
          "A 60-second ramp-up is a load test no matter what the .jmx file is named",
          "GUI mode consumes memory; large spikes should run with jmeter -n",
          "Finding the ceiling by stepping upward is stress testing, not a spike",
          "Recovery still has to be read from the tail of the run, not only the peak row",
        ],
        steps: [
          { t: "Step 1 — Start from the Chapter 14 test plan", p: "Same HTTP samplers: login, then clock-in. Change only how users arrive." },
          {
            t: "Step 2 — Near-zero ramp-up to the spike peak",
            p: "Threads = 400, Ramp-up = 10 seconds (not 60+). Add a timer or second thread group if you need an explicit 20-user baseline before the jump.",
            c: `Thread Group (spike):\n- Number of Threads: 400\n- Ramp-Up: 10 seconds\n- Duration: 120 seconds hold, then stop`,
          },
          { t: "Step 3 — Listeners on error rate and p95", p: "Watch the first 10 seconds separately from the hold, and the period after threads stop for recovery." },
          { t: "Step 4 — Run headlessly", p: "Avoid GUI overhead during the burst.", c: `jmeter -n -t hrms_clockin_spike.jmx -l spike.jtl -e -o ./spike_report` },
          { t: "Step 5 — Confirm it was a jump", p: "Active threads should hit 400 in ~10s. If the graph is a slow slope, you ran a load test." },
        ],
      },
    ],
  },
  {
    no: "91",
    title: "Session-Based Testing",
    category: "Other",
    desc: "Session-based testing is structured, time-boxed exploratory testing (Chapter 27): a written charter, a visible timer, notes taken during the session, and a debrief afterward so the exploration is accountable — not an unscripted wander with no record of what was covered or found.",
    why: "Free-form exploratory testing finds bugs scripts miss, but without a charter and a debrief it is hard to say what was actually looked at, how long it took, or what should happen next. Session-based test management (SBTM) keeps the human judgment and curiosity of Chapter 27, and adds just enough structure — charter, time-box, notes, debrief — that a lead can review coverage, a bug has a timestamped trail, and follow-up (file, fix, or turn into a regression script) is an explicit outcome rather than a hope.",
    when: "On new or fast-changing features where scripts do not exist yet (or would go stale immediately), as a planned supplement alongside regression, and whenever a stakeholder asks \"what did exploratory testing actually cover this sprint?\" — the session report is the answer. Not a replacement for automated suites on stable paths.",
    advantages: [
      "Keeps exploratory testing's ability to find unscripted bugs, with a record of charter, time, and notes",
      "The debrief turns a finding into a tracked follow-up — bug, question, or new scripted case — instead of a forgotten observation",
      "Time-boxing makes exploration plannable: a lead can schedule three 90-minute sessions instead of \"go explore\"",
      "Rapid Reporter (and similar session loggers) timestamp notes so a reproduction is tied to what the tester was doing",
    ],
    limitations: [
      "Still not repeatable the way a script is — two sessions on the same charter can produce different findings",
      "Quality still depends on the tester's skill and on an honest debrief; a filled-in charter is not coverage by itself",
      "Charters that are too broad (\"test Rule Groups\") waste the time-box; too narrow and they become a script in disguise",
      "Note-taking tools do not find bugs — they only capture what the tester bothers to write down",
    ],
    practical: {
      app: "HRMS New Rule Groups Feature",
      scenario:
        "Bizlevate ships Rule Groups (named bundles of overtime, leave, and attendance rules assigned to a team). A tester runs a 90-minute session-based charter: \"Explore creating, assigning, and overriding Rule Groups, including conflicts between group and employee-level rules.\"",
      fail: "At 38 minutes, assigning two overlapping Rule Groups to the same team silently applies only the first group's overtime cap; the second group's cap never appears in the UI or the audit log. Logged in Rapid Reporter with reproduction steps.",
      failLabel: "Finding",
      pass: "Debrief files the overlap bug, product clarifies that later groups should merge with a visible conflict warning, and a scripted regression case is added for dual-group assignment so the finding survives past this session.",
      passLabel: "Follow-up",
    },
    tools: [
      {
        name: "Rapid Reporter",
        sub: "Session notes and timer",
        url: "https://github.com/testingcurator/RapidReporter",
        desc: "A lightweight, open-source session-based note taker — start a session with a charter, keep a timer in view, and log timestamped notes (bugs, questions, setup) without switching into a heavy test-management UI. The export is the debrief artifact.",
        adv: [
          "Charter and timer stay visible, which is the whole point of a session versus ad-hoc clicking",
          "Timestamped notes make a finding reproducible after the time-box ends",
          "Export supports the debrief: what was covered, what was found, what to do next",
          "Free and small — no server or license for a single tester's session log",
        ],
        lim: [
          "Does not execute tests or assert outcomes — it only records the session",
          "Windows-oriented original; teams on other OSes may use a similar logger with the same SBTM discipline",
          "Empty notes with a green timer are not evidence of exploration",
          "Does not replace Chapter 27's skill; structure without curiosity is just a timesheet",
        ],
        steps: [
          {
            t: "Step 1 — Write a charter, not a script",
            p: "One mission for this time-box, plus what is out of scope.",
            c: `Charter: Explore Rule Group create / assign / override, including two groups on one team.\nOut of scope: Payroll calculation accuracy (separate suite).\nDuration: 90 minutes`,
          },
          { t: "Step 2 — Start Rapid Reporter with that charter", p: "Timer visible. Session has not started until the clock is running." },
          {
            t: "Step 3 — Note as you go",
            p: "Bugs, questions, setup blockers — timestamped, not reconstructed from memory after.",
            c: `00:38 BUG: Second Rule Group overtime cap ignored when two groups assigned to one team.\n00:41 Q: Is merge-or-override documented?\n00:55 Setup: Needed admin seed data for a second group.`,
          },
          { t: "Step 4 — Stop when the time-box ends", p: "Park unfinished threads for a follow-up session rather than silently overrunning." },
          { t: "Step 5 — Debrief with the export", p: "Coverage vs charter, findings, and explicit follow-ups (bug ticket, product question, new scripted test)." },
          { t: "Step 6 — Close the loop", p: "A finding without a ticket or a new regression case is only a note. Session-based testing includes the follow-up." },
        ],
      },
    ],
  },
  {
    no: "92",
    title: "Voice / Conversational UI Testing",
    category: "Other",
    desc: "Voice and conversational UI testing verifies that a chatbot, voice assistant, or other dialogue interface understands intents, keeps context across turns, and answers correctly — including interruptions, corrections, and \"I don't know\" paths — rather than only checking that a web form behind the bot still works.",
    why: "A leave-balance chatbot can wrap a perfectly correct API and still fail users: it mis-hears \"remaining casual leave,\" drops context after a follow-up, or confidently quotes the wrong balance. Those failures never appear in the form-based leave tests this manual already covers. Conversational UI testing is what specifically exercises the dialogue — NLU, prompts, multi-turn state, and the words the user actually receives — as its own surface.",
    when: "As soon as a bot or voice skill is in scope, and again whenever intents, utterances, or backend contracts change — not assumed to be fine because the underlying leave API passed Chapter 2 or Chapter 34. Include unhappy paths: unknown intent, mid-dialogue correction, and a second question that should still remember the employee.",
    advantages: [
      "Catches wrong answers, dropped context, and brittle NLU that API or UI tests never see",
      "Botium (Community Edition) turns a conversation into a repeatable script, so a wording or intent change cannot silently break the happy path",
      "Forces explicit coverage of fallback and clarification turns, which are where users actually get stuck",
      "The same convo file documents the intended dialogue for product and support, not only for QA",
    ],
    limitations: [
      "Scripted convos still miss live speech noise, accents, and barge-in unless you add a real voice channel and audio tests",
      "NLU is probabilistic — a passing utterance set is not every phrasing a user will try",
      "Botium Community Edition covers the dialogue core; vendor-specific voice hardware and wake-words need extra tooling",
      "A green bot test does not prove the leave engine itself is correct — that remains a payroll/leave functional concern",
    ],
    practical: {
      app: "HRMS Leave-Balance Chatbot",
      scenario:
        "Bizlevate's assistant answers \"What's my remaining leave?\" and a follow-up \"What about sick leave?\" without sending the employee to the leave form. A Botium convo covers both turns plus a nonsense utterance.",
      fail: "The bot treats the follow-up as a new session, asks the employee to log in again, and on the first turn returns casual-leave balance when the user said \"sick leave\" — the intent is mapped to the wrong leave type.",
      pass: "Utterances for sick vs casual are split, session context is kept for the follow-up, and the same Botium convo plus the unknown-intent fallback all pass after the fix.",
      passLabel: "Pass (after fix)",
    },
    tools: [
      {
        name: "Botium Community Edition",
        sub: "Scripted dialogue (botium-core)",
        url: "https://github.com/codeforequity-at/botium-core",
        desc: "An open-source framework for testing chatbots: you write conversations (user says / bot says) and Botium drives the bot connector, asserting replies, buttons, and context. Community Edition is botium-core — enough to regression-test a leave-balance skill without the paid Botium Box UI.",
        adv: [
          "Conversations are files you can diff and run in CI, not one-off manual chats",
          "Asserts on the bot's words and structure, not only that an HTTP endpoint returned 200",
          "Connectors exist for common chatbot platforms so the same convo can target staging",
          "Unknown-intent and multi-turn cases are first-class, not an afterthought",
        ],
        lim: [
          "Community Edition is code-and-files, not a full management UI",
          "Voice-specific issues (ASR, barge-in) need a voice channel on top of text convos",
          "Utterance lists go stale as users invent new phrasings",
          "Does not replace testing the leave calculation engine itself",
        ],
        steps: [
          {
            t: "Step 1 — Install botium-core",
            p: "In the project that will own the convos.",
            c: `npm install botium-core --save-dev`,
          },
          {
            t: "Step 2 — Point a botium.json at the staging bot",
            p: "Connector and endpoint for the HRMS assistant, not production.",
            c: `{\n  "botium": {\n    "Capabilities": {\n      "PROJECTNAME": "hrms-leave-bot",\n      "CONTAINERMODE": "simplerest",\n      "SIMPLEREST_URL": "https://staging.hrms-app.com/api/assistant/message",\n      "SIMPLEREST_METHOD": "POST",\n      "SIMPLEREST_BODY_TEMPLATE": "{ \\"text\\": \\"{{msg.messageText}}\\" }",\n      "SIMPLEREST_RESPONSE_JSONPATH": "$.reply"\n    }\n  }\n}`,
          },
          {
            t: "Step 3 — Write the happy-path convo",
            p: "Two turns: remaining leave, then a follow-up leave type that must keep context.",
            c: `# leave-balance.convo.txt\nLeave balance happy path\n\n#me\nWhat's my remaining leave?\n\n#bot\nYou have 8 days of casual leave remaining.\n\n#me\nWhat about sick leave?\n\n#bot\nYou have 4 days of sick leave remaining.`,
          },
          {
            t: "Step 4 — Add unknown intent and correction",
            p: "A nonsense utterance should get a fallback, not a guessed balance.",
            c: `#me\nHow many moons does Jupiter have?\n\n#bot\nI can help with leave balance, requests, and holidays — try asking about remaining leave.`,
          },
          { t: "Step 5 — Run the suite", p: "Fail the build when a reply no longer matches.", c: `npx mocha --timeout 20000 spec/botium.spec.js` },
          { t: "Step 6 — Expand utterances, do not only the canonical phrase", p: "\"sick days left,\" \"how much SL,\" \"remaining sick\" — NLU drift is how conversational bugs return after a pass." },
        ],
      },
    ],
  },
];
