import type { ChapterRecord } from "../../types";

/** Operational Acceptance Testing (OAT) */
export const chapter = {
  "id": "tt-operational-acceptance-testing",
  "overlayNo": 82,
  "title": "Operational Acceptance Testing (OAT)",
  "minutes": 25,
  "level": "intermediate",
  "phase": "Part 21 · Coverage, OAT, Cloud & Golden Master",
  "partName": "Part 21 · Coverage, OAT, Cloud & Golden Master",
  "overviewText": "Operational Acceptance Testing is a specialized subtype of acceptance testing (Chapter 4) focused not on whether business features work, but on whether the operations team can actually run, monitor, back up, restore, and maintain the system in production — the readiness check performed from the operations side of go-live, rather than the business/user side.",
  "why": "A system can pass full business-feature UAT with flying colors and still be genuinely unready for production if nobody has verified that backups actually restore correctly, that monitoring alerts actually fire when something breaks, or that a routine deploy can be performed without an outage. OAT exists specifically to close that gap — verifying the unglamorous, easy-to-overlook operational plumbing that determines whether a technically-working system can actually be safely and sustainably run in the real world.",
  "when": "As a required gate immediately before go-live, and again after any significant infrastructure or deployment-process change — run by, or in close collaboration with, the actual operations team who will be responsible for supporting the system afterward.",
  "practical": {
    "app": "HRMS Production Backup & Restore",
    "scenario": "Ahead of a Bizlevate client go-live, the operations team performs a full documented backup-and-restore drill against a staging copy of the production environment.",
    "fail": "The documented backup procedure runs successfully every night without error, but attempting an actual restore reveals the backup files have been silently incomplete for weeks — a critical gap that would only have been discovered during a real data-loss incident, when it would have been far too late.",
    "pass": "The backup process is corrected and re-verified with a full end-to-end restore drill, confirming the recovered data is genuinely complete and correct, and the operations team now has direct, first-hand confidence in the restore procedure rather than an untested assumption.",
    "passLabel": "Pass (after fix)"
  },
  "advantages": [
    "Confirms the system can actually be operated and supported, not just that its business features work",
    "Catches operational gaps (a backup that silently doesn't work, an alert that's misconfigured) while the stakes are still low, before a real incident",
    "Deliberately triggering failures to test alerting is a meaningfully stronger check than passively assuming a dashboard means monitoring works",
    "Directly reduces the risk of a production incident being made worse by operational unreadiness on top of the original problem"
  ],
  "limitations": [
    "Requires genuine collaboration with the operations team, who may have limited availability during a busy pre-launch period",
    "Some operational scenarios (a full regional outage, a genuine hardware failure) are hard to simulate faithfully in a lower environment",
    "A runbook that works when followed by its author may still fail when followed by someone else seeing it for the first time — worth deliberately testing with a different person",
    "Doesn't cover business-feature correctness at all — it specifically complements, and doesn't replace, standard UAT (Chapter 4)"
  ],
  "tools": [
    {
      "name": "UptimeRobot",
      "sub": "Prove the alert actually fires",
      "url": "https://uptimerobot.com",
      "seeChapter": 42,
      "desc": "Manually reviewing a monitoring dashboard confirms it exists; UptimeRobot lets the team actually verify that an alert fires correctly by deliberately triggering a monitored condition and confirming the notification genuinely arrives — a meaningfully stronger check than assuming a configured alert works.",
      "adv": [
        "Operability, not just business-feature UAT",
        "Finds silent backup and alert gaps before an incident",
        "Triggering failure is stronger than assuming a dashboard works",
        "Reduces the chance an incident is made worse by unreadiness"
      ],
      "lim": [
        "Needs real ops collaboration under launch pressure",
        "Regional/hardware failures are hard to simulate faithfully",
        "A runbook must work for someone who did not write it",
        "Does not replace Chapter 4 UAT"
      ],
      "steps": [
        {
          "t": "Step 1 — Document the runbook",
          "p": "Backup, restore, monitoring/alerting, routine maintenance and deploy."
        },
        {
          "t": "Step 2 — Configure monitors as for real ops",
          "p": "UptimeRobot against the key production endpoints."
        },
        {
          "t": "Step 3 — Trigger a failure on purpose",
          "p": "Stop the service in staging; confirm the notification actually arrives."
        },
        {
          "t": "Step 4 — Create a real backup",
          "p": "Walk the documented procedure; confirm a backup file exists."
        },
        {
          "t": "Step 5 — Restore from that backup",
          "p": "Data is genuinely and correctly restored, not just that a file exists."
        },
        {
          "t": "Step 6 — Fresh eyes on the runbook",
          "p": "Ops performs a deploy or config change using only the documented steps."
        }
      ]
    }
  ],
  "contentMarkdown": "## Trigger the alert; restore the backup\n\nA dashboard existing is not the same as an alert firing.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
