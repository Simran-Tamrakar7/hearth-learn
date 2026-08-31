---
id: "tt-cookie-session-testing"
overlayNo: 86
title: "Cookie / Session Testing"
minutes: 25
partName: "Part 22 · Content, Session, OO & PWA"
level: "intermediate"
overviewText: "Cookie and session testing verifies create, store, expire, and secure behavior — flags, timeout, and consistency across tabs and devices."
why: "Too-short sessions frustrate users; never-expiring or flagless sessions are an attack surface. Single-tab functional tests miss both."
when: "Whenever auth or session handling is built or changed — specifically, not inferred from a happy-path login."
practical: {"app":"HRMS Admin Session Timeout","scenario":"Admin session inspected in DevTools; 30-minute idle timeout tested.","pass":"Secure flag set; timeout forces re-authentication after 30 minutes idle.","fail":"No Secure flag; dashboard stays interactive past the configured timeout."}
---

## Flags, second tab, timeout, tamper

Application panel → Cookies.
