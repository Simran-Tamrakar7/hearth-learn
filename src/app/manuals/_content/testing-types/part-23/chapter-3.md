---
id: "tt-session-based-testing"
overlayNo: 91
title: "Session-Based Testing"
minutes: 25
partName: "Part 23 · Incremental Integration, Spike, Session & Voice"
level: "intermediate"
overviewText: "Session-based testing is structured, time-boxed exploratory testing (Chapter 27): charter, timer, notes, and a debrief so exploration is accountable."
why: "Unscripted exploration finds bugs scripts miss, but without a charter and debrief there is no record of coverage or a required follow-up."
when: "New or fast-changing features, as a planned supplement to regression, and whenever someone asks what exploratory testing actually covered."
practical: {"app":"HRMS New Rule Groups Feature","scenario":"90-minute charter on creating, assigning, and overlapping Rule Groups.","fail":"Second group’s overtime cap is silently ignored when two groups are assigned to one team.","pass":"Debrief files the bug; a scripted dual-group regression case is added so the finding survives the session."}
---

## Charter, time-box, notes, debrief

A finding without a ticket or new scripted case is only a note.
