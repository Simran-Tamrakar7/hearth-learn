import type { ChapterRecord } from "../../../types";

/** Pilot Testing */
export const chapter = {
  "id": "tt-pilot-testing",
  "overlayNo": 62,
  "title": "Pilot Testing",
  "minutes": 20,
  "level": "intermediate",
  "phase": "Part 16 · Governance, Deployment Strategies & Integration",
  "partName": "Part 16 · Governance, Deployment Strategies & Integration",
  "overviewText": "Pilot testing deploys the actual, real production system to a small, real, live subset of the intended user base — not a separate test build like beta testing, but the genuine live system used in genuine day-to-day operation by a limited group — before rolling it out to the full user base.",
  "why": "Beta testing (Chapter 30) typically tests a pre-release build under real users' informal, exploratory usage. Pilot testing goes a step further: it's the actual production rollout, used for genuine, real, ongoing work by a limited group, revealing exactly how the system holds up under real operational usage and real organizational processes — not just whether real users can find bugs while poking around a preview build.",
  "when": "After beta testing has confirmed the build is stable, specifically before committing to a full-scale rollout across an entire organization or user base — particularly valuable for internal enterprise systems (like an HRMS) being rolled out department by department, or for a new customer-facing product being launched in one market before others.",
  "practical": {
    "app": "HRMS Department Rollout",
    "scenario": "Before rolling the new HRMS out company-wide, it's piloted with the 25-person Finance department for one full month of real, live usage.",
    "pass": "A bulk-approval improvement is built and verified with the same pilot group before the company-wide rollout proceeds, avoiding a much larger, harder-to-manage problem if every department had hit the same issue simultaneously.",
    "fail": "The pilot reveals that Finance's month-end payroll close process, which involves a specific bulk-approval workflow rarely used elsewhere, takes noticeably longer in the new system than the old one — a real operational regression invisible in earlier beta testing, which hadn't exercised that specific real workflow at real volume."
  },
  "advantages": [
    "Verifies real operational workflows under genuine daily production business usage",
    "Limits organizational business risk to a small, controlled user group before full rollout",
    "Surfaces employee training, onboarding, and documentation bottlenecks alongside software defects",
    "Provides empirical telemetry and user feedback to plan the pacing of full rollout"
  ],
  "limitations": [
    "Plays out over real calendar weeks/months, making it slower than synthetic test runs",
    "Workflows unique to the pilot group may not uncover issues in other specialized departments",
    "Requires dedicated user support bandwidth during the active pilot phase",
    "Cannot completely replace full-scale load testing for high-concurrency sitewide launches"
  ],
  "tools": [
    {
      "name": "Manual Pilot Group Supervision & Analytics",
      "sub": "Live Departmental Rollout & Operational Telemetry",
      "url": "https://hearth-learn.vercel.app/manuals/testing-types",
      "seeChapter": 5,
      "desc": "Structured rollout methodology (see Chapter 5) monitoring real user satisfaction, task completion times, and support escalation tickets in production.",
      "adv": [
        "Identifies business process friction before full organizational release",
        "Builds internal champions and super-users across pilot departments"
      ],
      "lim": [
        "Requires dedicated customer support triage channel"
      ],
      "steps": [
        {
          "t": "Step 1 — Scope Pilot Cohort and Provision Production Access",
          "p": "Select 25 Finance department users and provision live HRMS production accounts.",
          "c": "Pilot Parameters:\n- Cohort: Finance Dept (25 Users)\n- Duration: 30 Days\n- Authoritative Work: Real monthly payroll cycle"
        },
        {
          "t": "Step 2 — Track daily operational metrics & ticket escalations",
          "p": "Monitor task completion latency and support ticket volume in Jira Service Desk.",
          "c": "Telemetry:\n- Total Submissions: 1,420\n- Bulk Approval Latency: Identified 4.2s delay on 50+ batch sizes\n- Resolution: Added database index on approval status"
        }
      ]
    }
  ],
  "contentMarkdown": "## Live Production Cohort Observation & Metrics Tracking\n\nDeploy production build to an isolated business unit cohort tracking task completion rates and support escalation frequency.\n\n```\nlaunchdarkly-cli flags update-targeting hrms-v2 --rollout 10%\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
