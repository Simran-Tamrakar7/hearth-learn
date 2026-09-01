import type { ChapterRecord } from "../../../types";

/** 57. Certifications */
export const chapter = {
  "id": "pw-8-certs",
  "title": "57. Certifications",
  "minutes": 15,
  "level": "reference",
  "phase": "Part 8 · Resources",
  "partName": "Part 8 · Resources",
  "overviewText": "Certifications validate your testing knowledge for hiring managers, HR departments, and promotion committees — but not all certifications carry equal weight in the Playwright ecosystem. ISTQB (International Software Testing Qualifications Board) provides a general testing foundation that many employers expect alongside tool-specific skills, even though it does not cover Playwright directly. Vendor and community-issued certificates of completion from course platforms (Test Automation University, Udemy, LinkedIn Learning) demonstrate you completed structured Playwright training. Some organizations run internal certification tracks that gate access to production test repos or define seniority levels. For a QA career, certifications are most valuable when combined with a portfolio of real Playwright projects — a certificate alone rarely substitutes for demonstrable code.",
  "why": "Hiring managers and HR systems often filter candidates by certification keywords before a technical interview ever happens. ISTQB Foundation Level appears in job descriptions across Europe, India, and enterprise QA roles worldwide. Course completion certificates prove you invested structured time in Playwright learning, which matters when transitioning from manual testing. Internal company certifications create a shared quality bar — everyone who commits to the main test repo has passed the same fixture-and-POM standards review. Understanding which certifications matter in your market prevents wasted exam fees on credentials recruiters ignore.",
  "when": "Pursue ISTQB Foundation when applying to enterprise QA roles that list it as preferred or required. Earn course completion certificates while actively learning Playwright — add them to LinkedIn as you finish each module. Pursue internal certification when your company defines automation competency gates. Do not delay hands-on project work to study for exams — certifications supplement a portfolio, they do not replace one. Re-certify or take advanced ISTQB modules (Test Automation Engineer) when targeting senior or lead QA positions.",
  "practical": {
    "app": "QA career — Job application in an enterprise QA org",
    "scenario": "A Fortune 500 company lists \"ISTQB Foundation preferred\" and \"Playwright experience required\" in the job posting. You hold ISTQB Foundation, completed Test Automation University's Playwright course with a certificate, and maintain a GitHub repo with a 30-test Playwright Python suite. Your application passes HR screening and reaches the hiring manager.",
    "pass": "You reach the technical interview where your portfolio matters most; certifications got you through the filter.",
    "fail": "You list a Udemy certificate but have no GitHub repo. The hiring manager sees the certificate, schedules an interview, and you cannot explain fixture scopes or write a page object — the certificate created an expectation you could not meet."
  },
  "advantages": [
    "ISTQB is widely recognized by HR and enterprise hiring pipelines globally",
    "Course certificates demonstrate structured learning investment on LinkedIn and résumés",
    "Internal certifications align team members on shared automation standards",
    "Advanced ISTQB modules (Test Automation Engineer) signal senior-level theory knowledge",
    "Low-cost or free options exist (TAU, Microsoft Learn badges)"
  ],
  "limitations": [
    "No widely recognized Playwright-specific proctored certification exists yet",
    "ISTQB does not test Playwright skills — employers still require a technical interview",
    "Course completion certificates prove attendance, not competency",
    "Certification mills and low-quality Udemy certs can hurt credibility if the portfolio is empty",
    "Internal certs are not portable — they mean nothing at your next employer"
  ],
  "tools": [
    {
      "name": "ISTQB Foundation Level",
      "sub": "General testing certification",
      "url": "https://www.istqb.org",
      "desc": "The most widely recognized software testing certification globally. Covers testing fundamentals, techniques, test management, and tool support at a conceptual level — not Playwright-specific. Many enterprise QA job postings list ISTQB Foundation as preferred or required. The exam is multiple-choice, available through accredited training providers in most countries. Foundation Level is the entry point; Advanced Level modules include Test Automation Engineer and Test Manager.",
      "adv": [
        "Recognized by HR filters and enterprise job descriptions worldwide",
        "Teaches testing vocabulary useful in interviews and stakeholder communication",
        "Foundation Level is achievable in 2–4 weeks of study",
        "Advanced Test Automation Engineer module covers framework design concepts applicable to Playwright"
      ],
      "lim": [
        "Zero Playwright content — you must learn the tool separately",
        "Multiple-choice format tests recall, not hands-on automation skill",
        "Exam fee ($150–250 USD depending on country) with annual provider variation",
        "Syllabus updates slowly — may not reflect modern CI/CD or shift-left practices"
      ],
      "steps": [
        {
          "t": "Step 1 — Study the ISTQB Foundation syllabus",
          "p": "Use official syllabus PDF and a practice exam book:",
          "c": "# Download syllabus: istqb.org/certifications/certified-tester-foundation-level\n# Study 2-4 weeks, then book exam through local provider"
        },
        {
          "t": "Step 2 — Pair ISTQB study with Playwright practice",
          "p": "Map ISTQB concepts to your Playwright suite:",
          "c": "# ISTQB: test levels -> your suite: unit (pytest), E2E (Playwright)\n# ISTQB: test techniques -> your suite: boundary value on form tests"
        }
      ]
    },
    {
      "name": "Course Platform Certificates",
      "sub": "Udemy, TAU, LinkedIn Learning",
      "url": "https://testautomationu.applitools.com",
      "desc": "Certificates of completion issued by online course platforms after finishing Playwright or test automation courses. Test Automation University certificates are free and community-recognized. Udemy and LinkedIn Learning certificates appear on LinkedIn profiles. These prove structured learning but are not proctored exams — hiring managers treat them as supplementary evidence alongside a code portfolio.",
      "adv": [
        "Free or low-cost (included with course purchase)",
        "Automatically displayable on LinkedIn profile",
        "Prove you completed a structured Playwright curriculum",
        "Stackable — multiple certs show breadth (Playwright + API testing + CI)"
      ],
      "lim": [
        "Completion-based, not competency-tested",
        "Not recognized by HR keyword filters the way ISTQB is",
        "Course quality varies — cert from a bad course adds little value",
        "No expiry date means a 2020 cert may reference outdated Playwright APIs"
      ],
      "steps": [
        {
          "t": "Step 1 — Complete courses and download certificates",
          "p": "Add to LinkedIn Certifications section with completion date:",
          "c": "# LinkedIn > Add profile section > Licenses & Certifications\n# Name: Playwright Test Automation (Test Automation University)\n# Issue date: [completion date]"
        },
        {
          "t": "Step 2 — Always pair with a portfolio link",
          "p": "List your GitHub repo in the same profile section:",
          "c": "# Certifications section:\n# - ISTQB Foundation (2025)\n# - TAU Playwright Course (2026)\n# Portfolio: github.com/you/playwright-suite"
        }
      ]
    },
    {
      "name": "Internal Company Certification",
      "sub": "Org-specific competency gates",
      "url": "",
      "desc": "Some organizations define internal certification tracks for automation engineers — a structured checklist of skills (write a POM, configure CI, use trace viewer, follow team conventions) that must be demonstrated before gaining write access to the production test repo or qualifying for a senior QA title. These are not portable but create team-wide quality standards. If your company has one, treat it as the definitive guide to what \"good\" looks like in your specific context.",
      "adv": [
        "Tailored to your company's actual tech stack and conventions",
        "Creates shared standards across distributed QA teams",
        "Often includes mentorship from senior automation engineers",
        "Directly gates responsibilities (prod repo access, on-call rotation)"
      ],
      "lim": [
        "Not recognized outside your organization",
        "Quality depends entirely on who designed the track",
        "Can become a checkbox exercise if not tied to real code review",
        "May lag behind industry best practices if not updated regularly"
      ],
      "steps": [
        {
          "t": "Step 1 — Request the certification rubric from your QA lead",
          "p": "Map each requirement to a concrete deliverable:",
          "c": "# Internal cert checklist example:\n# [ ] Write 5 POM-structured tests\n# [ ] Configure CI with trace-on-failure\n# [ ] Pass code review from senior automation engineer\n# [ ] Present test strategy in team demo"
        }
      ]
    }
  ],
  "contentMarkdown": "● ISTQB (general testing foundation — not Playwright-specific, but often expected alongside tool skills) ● Vendor/community-issued Playwright certificates of completion (from course platforms above) ● Internal company certification tracks, if your organization has one\n\n## Overview\n\nalongside tool skills)\n\nplatforms above)",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
