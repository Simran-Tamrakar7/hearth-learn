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
---

## Author in keywords

Engineers maintain the library; analysts write cases.
