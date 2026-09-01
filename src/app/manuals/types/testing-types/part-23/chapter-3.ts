import type { ChapterRecord } from "../../types";

/** Session-Based Testing */
export const chapter = {
  "id": "tt-session-based-testing",
  "overlayNo": 91,
  "title": "Session-Based Testing",
  "minutes": 25,
  "level": "intermediate",
  "phase": "Part 23 · Incremental Integration, Spike, Session & Voice",
  "partName": "Part 23 · Incremental Integration, Spike, Session & Voice",
  "overviewText": "Session-based testing is structured, time-boxed exploratory testing (Chapter 27): a written charter, a visible timer, notes taken during the session, and a debrief afterward so the exploration is accountable — not an unscripted wander with no record of what was covered or found.",
  "why": "Free-form exploratory testing finds bugs scripts miss, but without a charter and a debrief it is hard to say what was actually looked at, how long it took, or what should happen next. Session-based test management (SBTM) keeps the human judgment and curiosity of Chapter 27, and adds just enough structure — charter, time-box, notes, debrief — that a lead can review coverage, a bug has a timestamped trail, and follow-up (file, fix, or turn into a regression script) is an explicit outcome rather than a hope.",
  "when": "On new or fast-changing features where scripts do not exist yet (or would go stale immediately), as a planned supplement alongside regression, and whenever a stakeholder asks \"what did exploratory testing actually cover this sprint?\" — the session report is the answer. Not a replacement for automated suites on stable paths.",
  "practical": {
    "app": "HRMS New Rule Groups Feature",
    "scenario": "Bizlevate ships Rule Groups (named bundles of overtime, leave, and attendance rules assigned to a team). A tester runs a 90-minute session-based charter: \"Explore creating, assigning, and overriding Rule Groups, including conflicts between group and employee-level rules.\"",
    "fail": "At 38 minutes, assigning two overlapping Rule Groups to the same team silently applies only the first group's overtime cap; the second group's cap never appears in the UI or the audit log. Logged in Rapid Reporter with reproduction steps.",
    "failLabel": "Finding",
    "pass": "Debrief files the overlap bug, product clarifies that later groups should merge with a visible conflict warning, and a scripted regression case is added for dual-group assignment so the finding survives past this session.",
    "passLabel": "Follow-up"
  },
  "advantages": [
    "Keeps exploratory testing's ability to find unscripted bugs, with a record of charter, time, and notes",
    "The debrief turns a finding into a tracked follow-up — bug, question, or new scripted case — instead of a forgotten observation",
    "Time-boxing makes exploration plannable: a lead can schedule three 90-minute sessions instead of \"go explore\"",
    "Rapid Reporter (and similar session loggers) timestamp notes so a reproduction is tied to what the tester was doing"
  ],
  "limitations": [
    "Still not repeatable the way a script is — two sessions on the same charter can produce different findings",
    "Quality still depends on the tester's skill and on an honest debrief; a filled-in charter is not coverage by itself",
    "Charters that are too broad (\"test Rule Groups\") waste the time-box; too narrow and they become a script in disguise",
    "Note-taking tools do not find bugs — they only capture what the tester bothers to write down"
  ],
  "tools": [
    {
      "name": "Rapid Reporter",
      "sub": "Session notes and timer",
      "url": "https://github.com/testingcurator/RapidReporter",
      "desc": "A lightweight, open-source session-based note taker — start a session with a charter, keep a timer in view, and log timestamped notes (bugs, questions, setup) without switching into a heavy test-management UI. The export is the debrief artifact.",
      "adv": [
        "Charter and timer stay visible, which is the whole point of a session versus ad-hoc clicking",
        "Timestamped notes make a finding reproducible after the time-box ends",
        "Export supports the debrief: what was covered, what was found, what to do next",
        "Free and small — no server or license for a single tester's session log"
      ],
      "lim": [
        "Does not execute tests or assert outcomes — it only records the session",
        "Windows-oriented original; teams on other OSes may use a similar logger with the same SBTM discipline",
        "Empty notes with a green timer are not evidence of exploration",
        "Does not replace Chapter 27's skill; structure without curiosity is just a timesheet"
      ],
      "steps": [
        {
          "t": "Step 1 — Write a charter, not a script",
          "p": "One mission for this time-box, plus what is out of scope.",
          "c": "Charter: Explore Rule Group create / assign / override, including two groups on one team.\nOut of scope: Payroll calculation accuracy (separate suite).\nDuration: 90 minutes"
        },
        {
          "t": "Step 2 — Start Rapid Reporter with that charter",
          "p": "Timer visible. Session has not started until the clock is running."
        },
        {
          "t": "Step 3 — Note as you go",
          "p": "Bugs, questions, setup blockers — timestamped, not reconstructed from memory after.",
          "c": "00:38 BUG: Second Rule Group overtime cap ignored when two groups assigned to one team.\n00:41 Q: Is merge-or-override documented?\n00:55 Setup: Needed admin seed data for a second group."
        },
        {
          "t": "Step 4 — Stop when the time-box ends",
          "p": "Park unfinished threads for a follow-up session rather than silently overrunning."
        },
        {
          "t": "Step 5 — Debrief with the export",
          "p": "Coverage vs charter, findings, and explicit follow-ups (bug ticket, product question, new scripted test)."
        },
        {
          "t": "Step 6 — Close the loop",
          "p": "A finding without a ticket or a new regression case is only a note. Session-based testing includes the follow-up."
        }
      ]
    }
  ],
  "contentMarkdown": "## Charter, time-box, notes, debrief\n\nA finding without a ticket or new scripted case is only a note.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
