import type { ChapterRecord } from "../../types";

/** Disaster Recovery Testing */
export const chapter = {
  "id": "tt-disaster-recovery-testing",
  "overlayNo": 59,
  "title": "Disaster Recovery Testing",
  "minutes": 25,
  "level": "advanced",
  "phase": "Part 15 · Environment, Migration & Disaster Recovery",
  "partName": "Part 15 · Environment, Migration & Disaster Recovery",
  "overviewText": "Disaster recovery testing verifies that an organization can actually restore a fully functioning system after a catastrophic, large-scale failure — a full data center outage, a complete database loss, a major security incident — by actually executing the recovery plan, not just reviewing it on paper, and measuring whether it meets defined recovery time and data loss targets.",
  "why": "A written disaster recovery plan that's never actually been executed is an untested assumption, not a real safety net — backups can be silently corrupted or incomplete, documented recovery steps can be outdated or simply wrong, and the people expected to execute the plan may not actually know how in a real crisis. Disaster recovery testing is what turns 'we have a plan' into 'we've proven the plan actually works,' well before a real disaster forces the answer under far higher pressure.",
  "when": "Periodically (at minimum annually, more often for critical systems) as a scheduled, deliberate exercise — and definitely after any significant infrastructure change that could affect the recovery process (new database, new hosting provider, new backup strategy), since a recovery plan tested against an old architecture may no longer be valid.",
  "practical": {
    "app": "HRMS Full Database Loss Simulation",
    "scenario": "The team simulates a complete production database loss in an isolated environment, executing the documented recovery procedure from backups.",
    "pass": "The recovery documentation is corrected to reflect the current backup tooling, and a repeat test completes full restoration in 1 hour 40 minutes, within the defined target, with a verified data loss of under 5 minutes.",
    "fail": "Recovery takes 6 hours against a documented Recovery Time Objective of 2 hours — the written procedure referenced a backup tool that had been replaced eight months earlier without the documentation being updated."
  },
  "advantages": [
    "Proves recovery capability is real and current rather than an untested assumption on paper",
    "Surfaces gaps in documentation, access credentials, and team readiness before real crises",
    "Establishes empirical RTO (Recovery Time Objective) and RPO (Recovery Point Objective) metrics",
    "Builds genuine team familiarity and operational confidence during high-stress incidents"
  ],
  "limitations": [
    "Time-consuming and resource-intensive to execute realistic full-scale disaster drills",
    "Simulating complete regional cloud outages safely without risking production requires isolated staging environments",
    "Drills conducted once a year risk documentation becoming stale between exercises",
    "Cannot anticipate every unpredictable multi-factor failure sequence in advance"
  ],
  "tools": [
    {
      "name": "Manual Disaster Recovery Drill Procedure",
      "sub": "RTO & RPO Cold-Start Restoration Drill",
      "url": "https://hearth-learn.vercel.app/manuals/testing-types",
      "seeChapter": 5,
      "desc": "A deliberate, stopwatch-timed operational exercise (see Chapter 5) executing the documented Disaster Recovery (DR) runbook from scratch in an isolated environment.",
      "adv": [
        "Verifies real-world backup restore capability and backup encryption key validity",
        "Measures empirical Recovery Time Objective (RTO) against SLA commitments"
      ],
      "lim": [
        "Requires cross-functional coordination between DevOps, DBA, and QA teams"
      ],
      "steps": [
        {
          "t": "Step 1 — Declare simulated disaster & start stopwatch",
          "p": "Simulate primary database deletion in isolated disaster recovery AWS VPC.",
          "c": "Event: AWS us-east-1 Primary RDS instance terminated.\nTarget SLA: RTO <= 2 Hours | RPO <= 15 Minutes."
        },
        {
          "t": "Step 2 — Execute runbook: restore cross-region WAL backup",
          "p": "Deploy new PostgreSQL instance in us-west-2 from encrypted S3 backup snapshot.",
          "c": "aws rds restore-db-instance-to-point-in-time \\\n  --source-db-instance-identifier hrms-prod-backup \\\n  --target-db-instance-identifier hrms-restored \\\n  --restore-time \"2026-08-23T10:00:00Z\""
        },
        {
          "t": "Step 3 — Run smoke validation & stop timer",
          "p": "Point staging application endpoints to restored database and verify data integrity.",
          "c": "Status: Restored 14,250 employee records | Time Elapsed: 1h 38m (RTO MET) | Data Gap: 3m (RPO MET) -> PASS"
        }
      ]
    }
  ],
  "contentMarkdown": "## Stopwatch-Timed Disaster Recovery Execution\n\nSimulate complete cluster termination and execute documented restoration runbooks auditing RTO and RPO metrics.\n\n```\naws rds restore-db-instance-to-point-in-time --source-db-instance-identifier prod-rds --target-db-instance-identifier dr-rds\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
