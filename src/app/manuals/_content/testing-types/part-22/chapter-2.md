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
advantages: ["Confirms session tokens are handled with appropriate security flags, directly reducing a real attack surface","Free and built directly into the browser — no extra tooling or setup required","Catches session-timeout and multi-tab consistency bugs that standard single-session functional testing naturally misses","Manually tampering with the cookie is a cheap, immediate way to verify graceful handling of an invalid/expired session"]
limitations: ["DevTools inspection is inherently manual, tab-by-tab — not easily automated at scale without additional scripting","Verifying long-timeout behavior (e.g. an 8-hour session expiry) realistically can require genuinely waiting, or manually manipulating the system clock/cookie","Doesn't cover server-side session storage/validation logic directly — only what's observable from the client side","Security flag correctness (Secure, HttpOnly) is necessary but not sufficient on its own for full session security; it's one check among several"]
---

## Flags, second tab, timeout, tamper

Application panel → Cookies.
