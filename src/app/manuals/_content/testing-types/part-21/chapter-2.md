---
id: "tt-operational-acceptance-testing"
overlayNo: 82
title: "Operational Acceptance Testing (OAT)"
minutes: 25
partName: "Part 21 · Coverage, OAT, Cloud & Golden Master"
level: "intermediate"
overviewText: "OAT is UAT from the operations side — can the team run, monitor, back up, restore, and maintain the system in production (Chapter 4 is the business side)."
why: "Feature UAT can pass while backups do not restore and alerts do not fire. OAT checks that plumbing before go-live."
when: "Required gate before go-live, and after significant infrastructure or deploy-process change — with the actual ops team."
practical: {"app":"HRMS Production Backup & Restore","scenario":"Full backup-and-restore drill on a staging copy before client go-live.","pass":"Backup corrected; restore drill recovers complete, correct data.","fail":"Nightly backup “succeeds”; restore reveals files have been silently incomplete for weeks."}
advantages: ["Confirms the system can actually be operated and supported, not just that its business features work","Catches operational gaps (a backup that silently doesn't work, an alert that's misconfigured) while the stakes are still low, before a real incident","Deliberately triggering failures to test alerting is a meaningfully stronger check than passively assuming a dashboard means monitoring works","Directly reduces the risk of a production incident being made worse by operational unreadiness on top of the original problem"]
limitations: ["Requires genuine collaboration with the operations team, who may have limited availability during a busy pre-launch period","Some operational scenarios (a full regional outage, a genuine hardware failure) are hard to simulate faithfully in a lower environment","A runbook that works when followed by its author may still fail when followed by someone else seeing it for the first time — worth deliberately testing with a different person","Doesn't cover business-feature correctness at all — it specifically complements, and doesn't replace, standard UAT (Chapter 4)"]
---

## Trigger the alert; restore the backup

A dashboard existing is not the same as an alert firing.
