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
---

## Trigger the alert; restore the backup

A dashboard existing is not the same as an alert firing.
