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
advantages: ["Keeps exploratory testing's ability to find unscripted bugs, with a record of charter, time, and notes","The debrief turns a finding into a tracked follow-up — bug, question, or new scripted case — instead of a forgotten observation","Time-boxing makes exploration plannable: a lead can schedule three 90-minute sessions instead of \"go explore\"","Rapid Reporter (and similar session loggers) timestamp notes so a reproduction is tied to what the tester was doing"]
limitations: ["Still not repeatable the way a script is — two sessions on the same charter can produce different findings","Quality still depends on the tester's skill and on an honest debrief; a filled-in charter is not coverage by itself","Charters that are too broad (\"test Rule Groups\") waste the time-box; too narrow and they become a script in disguise","Note-taking tools do not find bugs — they only capture what the tester bothers to write down"]
---

## Charter, time-box, notes, debrief

A finding without a ticket or new scripted case is only a note.
