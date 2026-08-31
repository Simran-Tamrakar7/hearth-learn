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
advantages: ["Verifies actual real network behavior and data transmission directly, rather than assuming it based on application-layer logs alone","Directly confirms whether sensitive data is genuinely encrypted in transit, a real security-relevant check","Reveals inefficient or excessive network usage (redundant requests, oversized payloads) invisible from the application's own logs","Essential for verifying graceful behavior under the poor network conditions a real portion of users will actually experience"]
limitations: ["Requires real networking knowledge to interpret packet captures meaningfully","Simulating realistic poor-network conditions accurately (not just simple throttling) can require additional tooling beyond Wireshark alone","Packet-level analysis can be time-consuming for complex applications with heavy, continuous network traffic","Doesn't by itself fix poor network handling — it identifies the gap, but the resilience logic (retries, timeouts, offline handling) still needs to be separately designed and built"]
---

## Capture and throttle

Wireshark for packets; DevTools/OS tools for poor conditions.
