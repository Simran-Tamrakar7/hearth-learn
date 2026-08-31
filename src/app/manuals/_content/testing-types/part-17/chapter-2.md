---
id: "tt-keyword-driven-testing"
overlayNo: 66
title: "Keyword-Driven Testing"
minutes: 25
partName: "Part 17 · Data-Driven, Keyword, Model & Risk"
level: "intermediate"
overviewText: "Keyword-driven testing describes test steps as a sequence of plain, human-readable keywords rather than raw automation code — each keyword maps internally to reusable automation logic."
why: "Traditional automation scripts exclude much of a typical QA team from writing or even fully understanding automated cases. Keywords like Login, ClickButton, VerifyText are readable by someone with zero coding background."
when: "When manual testers or business analysts need to author or review automated test cases, or when test design needs to happen before the technical implementation is fully built."
practical: {"app":"HRMS Leave Approval Flow","scenario":"A QA analyst with no programming background writes a Robot Framework case using Login As Manager, Navigate To Pending Requests, Approve Request, Verify Leave Balance Updated.","pass":"The full approval flow runs end-to-end, written and reviewed by the analyst because every needed keyword already existed.","fail":"A missing Reject Request keyword would have blocked the analyst until an engineer added it."}
advantages: ["Makes automated test case authorship and review accessible to non-programmers, broadening who can meaningfully contribute","Test cases themselves double as clear, readable documentation of exactly what's being verified, in plain language","The underlying keyword library promotes genuine reuse — a well-built keyword is written once and used across many test cases","Robot Framework's reporting is detailed and readable without requiring any technical interpretation"]
limitations: ["Building and maintaining the underlying keyword library still requires real technical/programming skill, even if writing test cases using it doesn't","Can become a genuine bottleneck if the keyword library doesn't yet cover a needed new action, requiring engineering time before non-technical authors can proceed","Less flexible than raw code for handling complex, one-off logic that doesn't map cleanly onto existing or easily-added keywords","An additional abstraction layer between test cases and actual code, adding some complexity for anyone needing to debug at a deeper level"]
---

## Author in keywords

Engineers maintain the library; analysts write cases.
