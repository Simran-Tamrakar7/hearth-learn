---
id: "tt-network-testing"
overlayNo: 70
title: "Network Testing"
minutes: 25
partName: "Part 18 · Backend, Network, Snapshot & Soak"
level: "intermediate"
overviewText: "Network testing verifies behavior under real-world network conditions — latency, packet loss, bandwidth limits, intermittent connectivity — and inspects the traffic the application actually generates."
why: "Apps are built on fast, stable links. Real users are often not. Assuming every call succeeds quickly produces hangs, data loss, and confusing states when that assumption breaks."
when: "Mobile apps and products used on unreliable connections — alongside functional testing, because good-network testing will not reveal these gaps."
practical: {"app":"HRMS Mobile App Under Poor Connectivity","scenario":"Leave request submission under simulated high latency and intermittent packet loss.","pass":"Timeout, retry, and an informative error — the user is never left on an unexplained spinner.","fail":"Submit hangs indefinitely with no timeout, retry, or error."}
---

## Capture and throttle

Wireshark for packets; DevTools/OS tools for poor conditions.
