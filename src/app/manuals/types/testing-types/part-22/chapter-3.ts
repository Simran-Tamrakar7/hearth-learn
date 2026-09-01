import type { ChapterRecord } from "../../../types";

/** Object-Oriented Testing */
export const chapter = {
  "id": "tt-object-oriented-testing",
  "overlayNo": 87,
  "title": "Object-Oriented Testing",
  "minutes": 25,
  "level": "advanced",
  "phase": "Part 22 · Content, Session, OO & PWA",
  "partName": "Part 22 · Content, Session, OO & PWA",
  "overviewText": "Object-oriented testing focuses specifically on the constructs unique to object-oriented design — class methods, inheritance hierarchies, polymorphism, and object state across its lifecycle — verifying these OO-specific behaviors directly, in a way that generic functional testing, which typically only exercises a class through its outward-facing behavior, can easily miss.",
  "why": "Generic functional or unit testing can pass while a subtle OO-specific defect lurks underneath — a subclass that overrides a method in a way that silently breaks the parent class's expected contract, an object whose internal state becomes inconsistent partway through its lifecycle in a way no single method call reveals in isolation. Object-oriented testing is what deliberately targets these OO-specific risk areas directly, rather than relying on generic tests that happen to exercise a class without specifically probing its inheritance and state-management behavior.",
  "when": "For codebases built around meaningful class hierarchies and shared base classes — particularly wherever a subclass overrides base-class behavior, since that's specifically where the risk of silently breaking the base class's intended contract concentrates.",
  "practical": {
    "app": "HRMS Payroll Rule Subclass",
    "scenario": "A custom OvertimePayrollRule subclass overriding the base PayrollRule class's calculation method is reviewed and tested in Bizlevate.",
    "fail": "The overridden method in the subclass silently skips the base class's mandatory minimum-wage floor check — a check every other payroll rule subclass correctly inherits and applies — meaning overtime pay could theoretically be calculated below the legal minimum for a specific edge-case scenario, a defect invisible to any test that only exercised the base class or the more commonly-used subclasses.",
    "pass": "The overridden method is corrected to call the base class's minimum-wage check before applying its own overtime-specific logic, re-verified by testing the subclass directly with an input specifically chosen to trigger the minimum-wage floor.",
    "passLabel": "Pass (after fix)"
  },
  "advantages": [
    "Catches OO-specific defects — broken inheritance contracts, incorrect polymorphic dispatch — that generic functional testing routinely misses",
    "Improves confidence specifically in shared, reusable base classes, where a defect can silently propagate to every subclass built on top of them",
    "Complements standard unit testing by adding an OO-specific lens rather than duplicating the same generic checks",
    "Structured code review catches design-level OO risk patterns before they even manifest as a runtime bug"
  ],
  "limitations": [
    "Requires genuine familiarity with object-oriented design principles to review or test effectively — not a technique every tester is equally equipped for",
    "Manual-only testing here means it's not automatically re-verified on every future change without separately maintained test cases",
    "Deep inheritance hierarchies can make it genuinely difficult to reason about every possible interaction and override combination",
    "Doesn't cover procedural or non-OO parts of a codebase at all — it's specifically scoped to OO-structured code"
  ],
  "tools": [
    {
      "name": "Manual / code review",
      "sub": "OO contract and lifecycle",
      "url": null,
      "seeChapter": 1,
      "desc": "Directly exercising a class's public methods and state transitions with varied inputs — the same fundamental technique as unit testing but specifically directed at OO-specific concerns — plus a structured review of class design focused on inheritance contracts, deep hierarchies, and how object state is mutated.",
      "adv": [
        "Finds broken inheritance contracts generic tests miss",
        "Protects shared base classes that every subclass inherits",
        "Adds an OO lens on top of unit tests",
        "Review catches design risk before it is a runtime bug"
      ],
      "lim": [
        "Needs real OO design familiarity",
        "Not re-run automatically unless cases are kept",
        "Deep hierarchies are hard to reason about fully",
        "Does not cover non-OO code"
      ],
      "steps": [
        {
          "t": "Step 1 — Public methods and lifecycle states",
          "p": "Creation, mutation, destruction/cleanup for each class."
        },
        {
          "t": "Step 2 — Test overrides against the parent contract",
          "p": "Subclass methods still honor what the base class promises."
        },
        {
          "t": "Step 3 — Sequence state transitions",
          "p": "Not only isolated method calls — defects that appear across a lifecycle."
        },
        {
          "t": "Step 4 — Polymorphic dispatch",
          "p": "Call through a base-class reference whose actual type is the subclass."
        },
        {
          "t": "Step 5 — Review deep chains and complexity",
          "p": "Known risk signals for OO-specific defects."
        },
        {
          "t": "Step 6 — State only via well-defined methods",
          "p": "Not mutated from multiple uncoordinated places; overrides specialize, they do not change meaning."
        }
      ]
    }
  ],
  "contentMarkdown": "## Overrides, lifecycle, polymorphism\n\nReview that overrides specialize meaning, they do not change it.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
