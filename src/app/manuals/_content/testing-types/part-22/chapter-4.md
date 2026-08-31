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
advantages: ["Directly verifies the app delivers the native-app-like experience a PWA is specifically supposed to provide, not just that it's technically configured as one","Free, built directly into Chrome, and requires no additional setup or tooling","Gives a specific, scored, actionable checklist rather than a vague pass/fail impression","Manually testing offline mode and the install flow catches gaps a passing Lighthouse score alone can miss, since the audit checks configuration more than lived experience"]
limitations: ["A high Lighthouse score confirms the PWA criteria are technically met, but doesn't guarantee the offline experience is actually well-designed or usable, only that it exists","Manually testing the install flow requires a real mobile device (or realistic emulation) for a fully trustworthy result","Service worker caching logic can be genuinely tricky to get right, and Lighthouse won't catch every subtle caching bug (stale content served incorrectly, for instance)","Offline testing only covers the specific offline scenario tested — a partially degraded connection can behave differently from a fully offline one"]
---

## Audit, then live offline and install

Lighthouse score is configuration; offline and home-screen are lived experience.
