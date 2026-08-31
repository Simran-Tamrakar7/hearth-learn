---
id: "tt-pwa-testing"
overlayNo: 88
title: "Progressive Web App (PWA) Testing"
minutes: 25
partName: "Part 22 · Content, Session, OO & PWA"
level: "intermediate"
overviewText: "PWA testing verifies offline via a service worker, installability, and reliability — that the app delivers the native-like experience it promises."
why: "A registered service worker can still show a blank error page offline. Configuration is not the experience."
when: "After implementing or updating service worker, manifest, or offline handling — under real offline and install conditions."
practical: {"app":"HRMS Mobile Attendance Check-In (Offline)","scenario":"Network set to Offline in DevTools while viewing the employee schedule.","pass":"Last-synced schedule shown with an “offline — showing last synced data” indicator.","fail":"Generic browser “no internet” page — SW registered, schedule data not cached."}
---

## Audit, then live offline and install

Lighthouse score is configuration; offline and home-screen are lived experience.
