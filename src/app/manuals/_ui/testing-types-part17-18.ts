import type { TestingChapterData } from "@/app/manuals/_ui/TestingTypesInteractiveManual";

/** Parts 17–18 — Chapters 65–72 */
export const TESTING_TYPES_PARTS_17_18: TestingChapterData[] = [
  {
    no: "65",
    title: "Data-Driven Testing",
    category: "Automation Technique",
    desc: "Data-driven testing separates test logic from test data — a single automated test script runs repeatedly against many different sets of input data pulled from an external source (a spreadsheet, CSV, or database), rather than hardcoding one fixed input directly into the script itself.",
    why: "Without this separation, testing ten different input variations of the same flow means writing and maintaining ten nearly-identical scripts, each differing only in the specific values used — a maintenance burden that grows painfully with every new variation. Data-driven testing collapses that duplication: one well-written script, paired with an external data set, can cover dozens or hundreds of input variations without any additional script logic at all.",
    when: 'Whenever the same flow or logic needs to be verified against many different input values — form validation with many valid/invalid combinations, calculation logic across a wide range of inputs, or any scenario naturally described as "the same steps, different data."',
    advantages: [
      "Dramatically reduces script duplication and maintenance burden compared to writing a separate script per input variation",
      "Non-technical team members can often contribute new test cases just by adding rows to a spreadsheet, without touching the script itself",
      "Naturally pairs well with boundary value analysis and equivalence partitioning (Chapters 51, 52), since those techniques also produce sets of representative input values",
      "Scales cleanly to a large number of input variations with minimal added engineering effort",
    ],
    limitations: [
      "The underlying script logic itself still needs to be genuinely correct and well-designed — bad script logic multiplied across many data rows just produces many identically wrong results",
      "External data sources need their own maintenance and version control discipline, or they can drift out of sync with what the script actually expects",
      "Debugging a specific failing row can be less immediately obvious than debugging a single, self-contained hardcoded test",
      "Doesn't fit every scenario — flows genuinely needing unique, custom logic per case don't benefit from this generic data/logic separation",
    ],
    practical: {
      app: "HRMS Leave Request Validation",
      scenario:
        "A single Selenium script tests leave request date validation, driven by a CSV with 15 rows covering valid dates, invalid dates, boundary dates, and various leave-type/duration combinations.",
      pass: "All 15 rows execute against the same script logic, with results correctly matching the expected outcome column for each — including catching that row 11 (a leave request spanning exactly the maximum allowed 30 consecutive days) is correctly accepted, verified without writing any dedicated script just for that one case.",
      fail: "",
      value:
        "Adding row 16 for a newly identified edge case (a leave request starting on a public holiday) requires only adding one new spreadsheet row, not writing any new automation code.",
    },
    tools: [
      {
        name: "Selenium + CSV/Excel",
        sub: "External data source loop",
        url: "https://selenium.dev",
        seeChapter: 6,
        desc: "Selenium scripts read input values from an external CSV, Excel file, or database at runtime, looping through each row as a separate test iteration, rather than having any input value hardcoded directly into the script.",
        adv: [
          "Dramatically reduces script duplication and maintenance burden compared to writing a separate script per input variation",
          "Non-technical team members can often contribute new test cases just by adding rows to a spreadsheet, without touching the script itself",
          "Naturally pairs well with boundary value analysis and equivalence partitioning",
          "Scales cleanly to a large number of input variations with minimal added engineering effort",
        ],
        lim: [
          "Bad script logic multiplied across many data rows just produces many identically wrong results",
          "External data sources need their own maintenance and version control discipline",
          "Debugging a specific failing row can be less immediately obvious than a self-contained hardcoded test",
          "Flows that need unique custom logic per case don't benefit from this separation",
        ],
        steps: [
          {
            t: "Step 1 — Identify a data-driven flow",
            p: "Pick a flow that needs many input variations using otherwise-identical steps.",
          },
          {
            t: "Step 2 — Write the external data source",
            p: "One row per test case; columns for each input plus the expected result.",
            c: `leave_type,start_date,end_date,expected\nAnnual,2025-09-01,2025-09-05,accepted\nCasual,2025-09-01,2025-09-04,rejected_insufficient_balance\nAnnual,2025-09-01,2025-09-30,accepted_max_consecutive`,
          },
          {
            t: "Step 3 — Write one script that reads each row",
            p: "Feed the row's values into the flow and compare actual vs expected. Keep the script on flow logic; keep the file on values.",
          },
          {
            t: "Step 4 — Run — one iteration per row",
            p: "The runner treats every data row as a separate test case.",
          },
          {
            t: "Step 5 — Add coverage by adding rows",
            p: "New input cases do not require script changes.",
          },
        ],
      },
    ],
  },
  {
    no: "66",
    title: "Keyword-Driven Testing",
    category: "Automation Technique",
    desc: "Keyword-driven testing describes test steps as a sequence of plain, human-readable keywords (like Login, ClickButton, VerifyText) rather than as raw automation code — each keyword maps internally to a piece of reusable automation logic, letting non-programmers design and read test cases directly, while the underlying implementation stays hidden behind the keyword layer.",
    why: "Traditional automation scripts require programming knowledge to write, read, or modify, which excludes much of a typical QA team (especially manual testers and business analysts) from directly contributing to or even fully understanding automated test cases. Keyword-driven testing removes that barrier: a test case built from keywords like OpenBrowser, EnterText, ClickButton, VerifyPageContains is readable and writable by someone with zero coding background, while a smaller group of technical engineers builds and maintains the underlying keyword implementations.",
    when: "Particularly valuable on teams where manual testers or business analysts need to directly author or review automated test cases, or where test case design needs to happen independently of (and often before) the underlying technical implementation is fully built out.",
    advantages: [
      "Makes automated test case authorship and review accessible to non-programmers, broadening who can meaningfully contribute",
      "Test cases themselves double as clear, readable documentation of exactly what's being verified, in plain language",
      "The underlying keyword library promotes genuine reuse — a well-built keyword is written once and used across many test cases",
      "Robot Framework's reporting is detailed and readable without requiring any technical interpretation",
    ],
    limitations: [
      "Building and maintaining the underlying keyword library still requires real technical/programming skill, even if writing test cases using it doesn't",
      "Can become a genuine bottleneck if the keyword library doesn't yet cover a needed new action, requiring engineering time before non-technical authors can proceed",
      "Less flexible than raw code for handling complex, one-off logic that doesn't map cleanly onto existing or easily-added keywords",
      "An additional abstraction layer between test cases and actual code, adding some complexity for anyone needing to debug at a deeper level",
    ],
    practical: {
      app: "HRMS Leave Approval Flow",
      scenario:
        "A QA analyst with no programming background writes a Robot Framework test case for the leave approval flow using existing keywords: Login As Manager, Navigate To Pending Requests, Approve Request, Verify Leave Balance Updated.",
      pass: "The test case runs successfully, verifying the full approval flow end-to-end — written and reviewed entirely by the QA analyst without any engineering involvement, since every needed keyword already existed in the shared library.",
      fail: "",
      value:
        "When a new Reject Request flow needs testing, the analyst writes the new test case immediately using existing keywords plus one new Reject Request keyword built once by an engineer and then reused across future test cases involving rejection.",
    },
    tools: [
      {
        name: "Robot Framework",
        sub: "Keyword-driven runner",
        url: "https://robotframework.org",
        desc: "A free, open-source, keyword-driven test automation framework — test cases are written in a simple, tabular, plain-text syntax using keywords, with an extensive library of built-in keywords (for web, API, and more) plus support for defining custom keywords for project-specific actions.",
        adv: [
          "Makes automated test case authorship and review accessible to non-programmers",
          "Test cases double as readable documentation of what is being verified",
          "A well-built keyword is written once and used across many test cases",
          "HTML reports are detailed without requiring technical interpretation",
        ],
        lim: [
          "The keyword library still requires real programming skill to build and maintain",
          "A missing keyword blocks non-technical authors until an engineer adds it",
          "Less flexible than raw code for complex one-off logic",
          "An extra abstraction layer when debugging at a deeper level",
        ],
        steps: [
          {
            t: "Step 1 — Install Robot Framework",
            p: "Add the runner plus the library for the target — e.g. SeleniumLibrary for the browser.",
          },
          {
            t: "Step 2 — Define business keywords",
            p: "Build project-specific keywords from lower-level ones or code (e.g. Submit Leave Request from several UI keywords).",
          },
          {
            t: "Step 3 — Write cases in tabular plain text",
            p: "Readable directly by non-programmers.",
            c: `*** Test Cases ***\nManager Approves Leave\n    Login As Manager\n    Navigate To Pending Requests\n    Approve Request\n    Verify Leave Balance Updated`,
          },
          {
            t: "Step 4 — Run and share the HTML report",
            p: "Robot Framework's runner produces a detailed, readable results report.",
          },
          {
            t: "Step 5 — Split authorship",
            p: "Non-technical teammates write cases from the keyword library; engineers maintain and extend the library.",
          },
        ],
      },
    ],
  },
  {
    no: "67",
    title: "Model-Based Testing",
    category: "Automation Technique",
    desc: "Model-based testing builds an abstract model of the application's expected behavior — typically as a state diagram or graph, showing the possible states a system can be in and the valid transitions between them — and then automatically generates test cases by systematically exploring paths through that model, rather than a human manually designing each individual test case by hand.",
    why: "Manually designing test cases for a system with many possible states and transitions (a multi-step approval workflow, a booking system with many valid state changes) becomes exhausting and error-prone to do by hand, and it's genuinely difficult for a human to be confident every meaningful path has actually been considered. Model-based testing formalizes the system's behavior explicitly as a model first, then leverages that formal structure to automatically and systematically generate test cases covering paths a human might never think to manually enumerate.",
    when: 'Particularly valuable for systems with complex, well-defined state machines — multi-step workflows, approval processes with several possible states and transitions, or any system where "what state can this be in, and what\'s a valid transition from here" is a meaningful, well-defined question with a clear, finite answer.',
    advantages: [
      "Automatically and systematically generates test coverage across complex state spaces that would be genuinely difficult for a human to fully enumerate by hand",
      "The model itself becomes clear, explicit documentation of the system's intended states and valid transitions",
      "Different coverage strategies (every edge, every state, random walk) can be applied to the same model without redesigning test cases from scratch",
      "Particularly effective at finding invalid or unexpected transitions a manual test designer might not think to specifically try",
    ],
    limitations: [
      "Building an accurate model in the first place requires real upfront effort and a genuinely clear understanding of the system's actual states and transitions",
      "Connecting each abstract modeled step to real, executable automation code is additional engineering work beyond the model itself",
      "Best suited specifically to systems with well-defined, discrete states — less naturally applicable to more continuous or unstructured behavior",
      "An inaccurate or incomplete model produces test coverage that only reflects the model's own gaps, not the real system's actual full behavior",
    ],
    practical: {
      app: "HRMS Leave Request State Machine",
      scenario:
        "The leave request lifecycle (Draft → Submitted → Approved/Rejected → Cancelled) is modeled in GraphWalker, which then generates test paths covering every valid transition at least once.",
      pass: "",
      fail: "One of the generated paths attempts to transition directly from Approved to Draft (an edge that shouldn't exist in a correct model) — attempting it against the real application reveals the backend actually allows this invalid transition via a leftover API endpoint, letting an approved request be silently reset to draft status.",
      failLabel: "Found",
      value:
        "The invalid transition is blocked at the API level, and the corrected model (with the invalid edge properly removed) is used to regenerate a clean, accurate test suite going forward.",
    },
    tools: [
      {
        name: "GraphWalker",
        sub: "Model-based path generation",
        url: "https://graphwalker.github.io",
        desc: "A free, open-source model-based testing tool — takes a graph model of an application's states and transitions (often drawn visually) and automatically generates test paths through it using various configurable algorithms (e.g. covering every edge, every state, or a random walk), which can then be executed against the real application.",
        adv: [
          "Systematically generates coverage across complex state spaces",
          "The model is explicit documentation of intended states and transitions",
          "Coverage strategies can be swapped on the same model",
          "Effective at finding invalid or unexpected transitions",
        ],
        lim: [
          "Building an accurate model takes real upfront effort",
          "Binding abstract steps to real automation is extra engineering",
          "Best for discrete, well-defined states",
          "A wrong model only tests the model's own gaps",
        ],
        steps: [
          {
            t: "Step 1 — Model states and transitions",
            p: 'Nodes are states (Draft, Pending Approval, Approved, Rejected); edges are valid actions (Submit, Approve, Reject).',
          },
          {
            t: "Step 2 — Build the model in GraphWalker",
            p: "Use the visual editor or a supported graph format.",
          },
          {
            t: "Step 3 — Pick a path strategy",
            p: "Cover every transition at least once, every state at least once, or a random walk.",
          },
          {
            t: "Step 4 — Generate the abstract steps",
            p: "GraphWalker emits the sequence needed to hit that coverage.",
          },
          {
            t: "Step 5 — Bind steps to real automation",
            p: "Map each abstract action to Selenium (or similar) against the live app.",
          },
          {
            t: "Step 6 — Run and treat failures as model vs reality",
            p: "A mismatch is either a product bug or a wrong model — both are worth finding.",
          },
        ],
      },
    ],
  },
  {
    no: "68",
    title: "Risk-Based Testing",
    category: "Test Strategy",
    desc: "Risk-based testing prioritizes what gets tested, and how much testing effort each area receives, based on a deliberate assessment of risk — the combination of how likely a given area is to fail, and how severe the impact would be if it did — rather than treating every feature or module as equally deserving of the same testing depth.",
    why: "Testing time and resources are never truly unlimited, and treating every feature as equally important to test thoroughly means genuinely critical, high-risk areas (payroll calculations, authentication, data deletion) can end up receiving the same shallow coverage as low-stakes, rarely-used features — a real misallocation of effort relative to actual business risk. Risk-based testing makes prioritization explicit and deliberate, rather than an accidental byproduct of whichever features happened to get built (and tested) first, or whichever areas are simply easiest to test.",
    when: "At the start of test planning for any project or release, especially under real time or resource constraints — used to explicitly decide where deeper testing (more test types, more edge cases, more automation investment) is actually justified, versus where lighter, more basic coverage is a reasonable, deliberate trade-off.",
    advantages: [
      "Directs limited testing time and resources toward the areas where a defect would actually matter most, rather than spreading effort evenly and inefficiently",
      "Makes testing scope decisions explicit and defensible, especially valuable under real schedule or resource pressure",
      "Naturally integrates with and prioritizes among every other testing type in this manual, rather than being a separate, competing technique",
      "Encourages ongoing reassessment, keeping testing focus aligned with the system's actual, current risk profile rather than a stale, one-time judgment",
    ],
    limitations: [
      "The risk assessment itself is inherently somewhat subjective — different stakeholders can reasonably disagree on likelihood or impact ratings",
      'A genuinely under-assessed "low risk" area can still fail and cause real harm if the initial risk judgment turns out to be wrong',
      "Requires real discipline to revisit and update as the project evolves, or the risk assessment itself becomes stale and misleading",
      "Doesn't eliminate the need for baseline coverage everywhere — even low-risk areas need some minimum testing, not zero",
    ],
    practical: {
      app: "HRMS Release Prioritization",
      scenario:
        "Ahead of a release, the team rates payroll calculation as High risk (complex logic, financial/legal impact, recent changes) and the internal company-news announcement feature as Low risk (simple, cosmetic, no financial impact).",
      pass: "Payroll calculation receives the full range of testing — functional, boundary value analysis, negative testing, security review, and parallel testing (Chapter 63) against the legacy system — while the news announcement feature receives a single basic functional smoke test, a deliberate and explicit trade-off rather than an accidental oversight.",
      passLabel: "Result",
      fail: "",
      value:
        "Limited testing time before the release deadline is spent almost entirely on payroll, and a real payroll edge-case bug is caught and fixed, while the news feature ships with only light testing — a trade-off the team can clearly justify and stand behind if questioned.",
    },
    tools: [
      {
        name: "Manual risk assessment",
        sub: "Planning technique — no dedicated tool",
        url: null,
        seeChapter: 5,
        desc: "Risk-based testing is fundamentally a planning and prioritization technique, not a specific execution tool — the structured risk assessment then informs which of every other technique and tool in this manual gets applied where, and how deeply.",
        adv: [
          "Directs limited time toward areas where a defect would matter most",
          "Makes scope decisions explicit and defensible under schedule pressure",
          "Prioritizes among every other testing type rather than competing with them",
          "Stays current if the assessment is revisited as the system changes",
        ],
        lim: [
          "Likelihood and impact ratings are somewhat subjective",
          "A mis-rated low-risk area can still fail and cause real harm",
          "A stale assessment becomes misleading",
          "Low-risk still needs a minimum of coverage, not zero",
        ],
        steps: [
          { t: "Step 1 — List features in scope", p: "Every major feature or module for the release or project." },
          { t: "Step 2 — Score likelihood of failure", p: "Complexity, recency of change, prior defect history." },
          { t: "Step 3 — Score impact if it fails", p: "Users affected, financial/legal/safety, visibility of a failure." },
          { t: "Step 4 — Combine into High / Medium / Low", p: "One overall risk rating per area." },
          {
            t: "Step 5 — Allocate depth proportionally",
            p: "High-risk gets the widest range of types; low-risk gets lighter, basic coverage.",
          },
          {
            t: "Step 6 — Revisit as the system changes",
            p: "A low-risk area can become high-risk after a significant change, a new integration, or new defect history.",
          },
          {
            t: "Step 7 — Use it to defend trade-offs",
            p: "Cut under time pressure by risk, not by whatever is easiest to skip.",
          },
        ],
      },
    ],
  },
  {
    no: "69",
    title: "Backend Testing",
    category: "Other",
    desc: "Backend testing verifies the server-side logic, database interactions, business rules, and data processing that power an application — everything happening behind the API layer — checking correctness at the source, independent of any UI or even the API contract sitting on top of it.",
    why: "A UI or API can appear to work correctly while the underlying backend logic is subtly wrong — a calculation that's off in an edge case the UI never happens to exercise, a database write that violates an intended business rule without the application layer noticing, a scheduled job silently failing. Backend testing goes directly to where the actual business logic and data processing live, catching problems at their true source rather than only inferring them indirectly through whatever the UI or API happens to expose.",
    when: "Throughout backend development, especially for business-critical logic (calculations, workflows, scheduled processes) — as unit tests on individual functions, and as broader checks combining API testing (Chapter 34) with direct database verification (Chapter 35) for anything that spans both layers.",
    advantages: [
      "Verifies business logic and data correctness directly at the source, rather than only inferring it indirectly through the UI or API response",
      "Catches issues in scheduled/background processing that UI-only testing would never naturally exercise",
      "Combining API-level and database-level checks together provides stronger, more complete confidence than either alone",
      "Backend issues are typically diagnosed and fixed faster when caught here, before they propagate up through the API and UI layers",
    ],
    limitations: [
      "Requires both API and database access/knowledge to be done thoroughly, a broader skill set than pure UI-focused testing",
      "Doesn't verify how the backend's output is actually presented or used by the UI — pairs with, but doesn't replace, frontend/system testing",
      "Testing scheduled or background jobs can require specific tooling or manual triggering not always readily available in every environment",
      "Business logic spanning many interrelated tables can require deep domain knowledge to verify correctly and completely",
    ],
    practical: {
      app: "HRMS Nightly Leave Balance Accrual Job",
      scenario:
        "The backend job that accrues monthly leave balance for every employee is tested by manually triggering it and verifying results directly in the database.",
      fail: "After triggering the job, DBeaver reveals that employees hired mid-month received a full month's accrual instead of a correctly prorated partial amount — a backend calculation bug invisible from the API layer, since the job runs on a schedule with no direct API response to inspect at all.",
      pass: "The accrual logic is corrected to prorate based on hire date, verified by re-triggering the job and directly confirming correct, prorated balances for a range of employees with different hire dates.",
      passLabel: "Pass (after fix)",
    },
    tools: [
      {
        name: "Postman + DBeaver",
        sub: "API trigger + database inspect",
        url: "https://postman.com",
        seeChapter: 2,
        desc: "Used together: Postman exercises the backend through its API surface with deliberately chosen inputs, while DBeaver verifies directly at the database that the resulting stored data and state are actually correct — combining a contract-level check with an internal-data check of the same operation.",
        adv: [
          "Verifies business logic and data at the source",
          "Catches scheduled/background issues UI testing never exercises",
          "API plus database checks together are stronger than either alone",
          "Faster diagnosis before bugs propagate through API and UI",
        ],
        lim: [
          "Needs both API and database knowledge",
          "Does not replace frontend/system testing",
          "Scheduled jobs may be hard to trigger on demand",
          "Multi-table business rules need deep domain knowledge",
        ],
        steps: [
          { t: "Step 1 — Name the backend logic", p: "A calculation, scheduled job, or multi-step business process." },
          { t: "Step 2 — Trigger via Postman", p: "Hit the API with valid, boundary, and invalid inputs." },
          { t: "Step 3 — Inspect with DBeaver", p: "Confirm stored data is correct, not just that the API returned 200." },
          {
            t: "Step 4 — Handle scheduled jobs",
            p: "Trigger manually where possible (or wait for a run) and verify output and side effects in the database.",
          },
          {
            t: "Step 5 — Cross-check multi-table rules",
            p: "e.g. leave approval decrements balance and writes an audit row — check every affected table.",
          },
          { t: "Step 6 — Pair with unit tests on the functions", p: "Fastest, most targeted layer of backend verification." },
        ],
      },
    ],
  },
  {
    no: "70",
    title: "Network Testing",
    category: "Non-Functional",
    desc: "Network testing verifies an application's behavior under real-world network conditions — latency, packet loss, bandwidth limits, intermittent connectivity, and the raw network traffic an application actually generates — checking correctness and resilience specifically at the network layer, distinct from application logic itself.",
    why: "Applications are commonly built and tested on fast, stable, low-latency connections, but real users frequently operate under far worse conditions — a spotty mobile connection, high latency on a long-distance link, intermittent drops entirely. An application that assumes network calls will simply succeed quickly and reliably can behave badly (hanging indefinitely, losing data, showing confusing states) the moment that assumption breaks down in the real world, and network testing is what deliberately verifies the application handles that gracefully.",
    when: "For applications where users are known or expected to operate under variable or poor network conditions (mobile apps, applications used in regions with less reliable connectivity) — tested deliberately alongside standard functional testing, since good-network testing alone won't reveal these gaps at all.",
    advantages: [
      "Verifies actual real network behavior and data transmission directly, rather than assuming it based on application-layer logs alone",
      "Directly confirms whether sensitive data is genuinely encrypted in transit, a real security-relevant check",
      "Reveals inefficient or excessive network usage (redundant requests, oversized payloads) invisible from the application's own logs",
      "Essential for verifying graceful behavior under the poor network conditions a real portion of users will actually experience",
    ],
    limitations: [
      "Requires real networking knowledge to interpret packet captures meaningfully",
      "Simulating realistic poor-network conditions accurately (not just simple throttling) can require additional tooling beyond Wireshark alone",
      "Packet-level analysis can be time-consuming for complex applications with heavy, continuous network traffic",
      "Doesn't by itself fix poor network handling — it identifies the gap, but the resilience logic (retries, timeouts, offline handling) still needs to be separately designed and built",
    ],
    practical: {
      app: "HRMS Mobile App Under Poor Connectivity",
      scenario: "The leave request submission flow is tested with simulated high latency and intermittent packet loss.",
      fail: "Under simulated poor connectivity, submitting a leave request hangs indefinitely with no timeout, no retry, and no error message — leaving the user staring at a spinner with no way to know whether the request actually went through.",
      pass: "A reasonable timeout with a clear retry option and an informative error message is added, verified by re-running the same poor-connectivity simulation and confirming the user is never left in an indefinite, unexplained hang.",
      passLabel: "Pass (after fix)",
    },
    tools: [
      {
        name: "Wireshark",
        sub: "Packet capture",
        url: "https://wireshark.org",
        desc: "A free, open-source network protocol analyzer that captures and inspects actual network traffic in detail — every packet an application sends and receives — useful both for verifying what data is actually being transmitted and for diagnosing network-related behavior directly at the packet level.",
        adv: [
          "Verifies real network behavior and data transmission, not just application logs",
          "Confirms sensitive data is genuinely encrypted in transit",
          "Reveals redundant requests and oversized payloads",
          "Essential for poor-network user conditions",
        ],
        lim: [
          "Packet captures need real networking knowledge to interpret",
          "Realistic poor-network simulation often needs extra tooling",
          "Heavy traffic makes packet-level analysis slow",
          "Identifies the gap; retries and timeouts still have to be built",
        ],
        steps: [
          { t: "Step 1 — Start a capture", p: "Wireshark on the relevant interface while using the app normally." },
          { t: "Step 2 — Filter to the app's traffic", p: "Inspect what is actually sent and received at packet level." },
          { t: "Step 3 — Confirm encryption in transit", p: "HTTPS is genuinely used — not silently falling back to HTTP anywhere." },
          {
            t: "Step 4 — Simulate poor conditions",
            p: "Browser DevTools throttling or OS-level tools: high latency, low bandwidth, intermittent connectivity.",
          },
          {
            t: "Step 5 — Drop or delay a request mid-flight",
            p: "Does the app retry, show a clear error, or hang with no feedback?",
          },
          { t: "Step 6 — Hunt wasteful patterns", p: "Unexpectedly large payloads, excessive or redundant requests." },
        ],
      },
    ],
  },
  {
    no: "71",
    title: "Snapshot Testing",
    category: "Automation Technique",
    desc: "Snapshot testing captures the rendered output of a component or function — typically a serialized representation of UI structure, not a visual screenshot — the first time a test runs, saves it as a reference snapshot, and then automatically compares future test runs against that saved snapshot, flagging any difference for review.",
    why: "For UI components with complex output (deeply nested structure, many conditional branches), writing individual assertions to check every possible detail of the rendered output by hand is tedious and easy to under-specify — something can change without any specific assertion catching it. Snapshot testing sidesteps that by capturing the entire actual output at once and letting any future difference, however small, surface automatically for a human to review and explicitly approve or reject.",
    when: "Particularly well suited to UI component testing (especially in component-based frameworks like React) where the rendered structure is complex enough that manually asserting on every detail would be impractical — used alongside, not instead of, more targeted functional/interaction tests for the same component.",
    advantages: [
      "Catches any unintended change to a component's output automatically, without needing to write and maintain individual assertions for every possible detail",
      "Very fast to write initially — a single line captures comprehensive coverage of the entire current output",
      "Makes the review process explicit: every actual change requires a deliberate accept/reject decision, rather than silently passing or silently failing",
      "Particularly efficient for components with large, complex, deeply nested output structures",
    ],
    limitations: [
      "Can create a habit of blindly approving/updating snapshots without genuinely reviewing what changed, which defeats the entire purpose of the technique",
      "A snapshot failure indicates that something changed, but not why it changed or whether that change is actually correct — still requires human judgment every time",
      "Large, complex snapshots can be hard for a human to meaningfully review in detail, especially as they grow",
      "Doesn't test actual interactive behavior at all — pairs with, but doesn't replace, functional/interaction testing of the same component",
    ],
    practical: {
      app: "HRMS Employee Card Component",
      scenario:
        "A snapshot test captures the rendered output of the employee summary card component used throughout the HRMS dashboard.",
      fail: "After an unrelated styling change to a shared component, the snapshot test fails, revealing the employee card's rendered output now unexpectedly includes an extra, unintended wrapping div — an accidental structural regression caught immediately, which no individual hand-written assertion had been specifically checking for.",
      failLabel: "Fail (caught)",
      pass: "The unintended wrapping div is removed, the snapshot test passes again against the original, correct reference snapshot, confirming the styling change didn't unintentionally alter this component's structure.",
      passLabel: "Pass (after fix)",
    },
    tools: [
      {
        name: "Jest",
        sub: "toMatchSnapshot()",
        url: "https://jestjs.io",
        seeChapter: 1,
        desc: "A JavaScript testing framework with built-in snapshot testing support — automatically serializes a component's rendered output, saves it to a snapshot file on first run, and on every subsequent run compares the current output against that saved file, failing the test if anything has changed.",
        adv: [
          "Catches unintended output changes without asserting every detail by hand",
          "One line of setup covers the entire current output",
          "Every change requires an explicit accept or reject",
          "Efficient for large, nested component trees",
        ],
        lim: [
          "Blind snapshot updates defeat the technique",
          "A failure says that something changed, not whether it is correct",
          "Large snapshots are hard to review in detail",
          "Does not test interactive behavior",
        ],
        steps: [
          { t: "Step 1 — Render the output in a test", p: "The component or function whose structure you want locked." },
          {
            t: "Step 2 — Call toMatchSnapshot()",
            p: "First run saves the current output as the accepted reference file.",
            c: `test("employee card structure", () => {\n  const tree = renderer.create(<EmployeeCard employee={fixture} />).toJSON();\n  expect(tree).toMatchSnapshot();\n});`,
          },
          { t: "Step 3 — Re-run — Jest diffs against the file", p: "Any difference fails the test." },
          { t: "Step 4 — Read the diff", p: "Intentional component update, or accidental regression?" },
          {
            t: "Step 5 — If intentional, update the snapshot",
            p: "Jest's update command accepts the new output as the reference going forward.",
          },
          { t: "Step 6 — If unintentional, fix the component", p: "Do not blindly update the snapshot." },
        ],
      },
    ],
  },
  {
    no: "72",
    title: "Soak / Endurance Testing",
    category: "Non-Functional",
    desc: "Soak testing (also called endurance testing) is a specific, sustained form of reliability testing — running the application under a continuous, moderate, realistic load for an extended period (many hours to several days) — specifically to detect slow, cumulative degradation like memory leaks, connection exhaustion, or gradual performance decay that a short test run would never have time to reveal.",
    why: "This is the same core practice already introduced under Reliability Testing (Chapter 20) — presented here as its own dedicated chapter because it's frequently referenced and requested as a distinct, specific test type in its own right. The core value remains the same: some problems genuinely only manifest over sustained, real-world-length usage, not in a quick pass/fail check, and soak testing is the specific technique for finding them deliberately, before real production usage does.",
    when: "Before launch for any system expected to run continuously, and specifically after introducing any long-running process, caching layer, or connection-pooling mechanism where a slow leak is a realistic risk — run as an extended, dedicated test period, not folded into a standard, shorter load test.",
    advantages: [
      "The only testing type specifically designed to catch slow, cumulative problems invisible to any short test run, however thorough",
      "Builds real, evidence-based confidence that a system can run unattended for genuine production-length durations",
      "Directly targets memory leaks and resource exhaustion, a class of bug that's often expensive and disruptive to diagnose after it's already caused a real production outage",
      "Complements, and gives a specific, focused name to, the more general reliability testing practice from Chapter 20",
    ],
    limitations: [
      "Inherently slow to run — a meaningful soak test genuinely takes hours to days, not minutes, and can't be meaningfully rushed",
      "Requires a stable, dedicated test environment tied up for the full duration of the run, unavailable for other testing meanwhile",
      "A particularly slow leak might need an even longer run than initially planned before it becomes clearly visible in the collected data",
      "Identifies that degradation occurred, not automatically why — still requires follow-up profiling or log investigation to find the specific root cause",
    ],
    practical: {
      app: "HRMS API Gateway Connection Pool",
      scenario: "The HRMS's API gateway is soak-tested at a moderate, realistic load continuously for 48 hours.",
      fail: "Open database connections climb steadily throughout the run and never return to baseline between request bursts, and by hour 36 new requests begin failing with connection-pool-exhausted errors — a slow connection leak invisible in any test shorter than several hours.",
      failLabel: "Fail (before)",
      pass: "A connection-release bug is identified and fixed; a repeat 48-hour soak test shows connection counts staying flat and stable across the entire duration, confirming the leak is genuinely resolved rather than just delayed.",
      passLabel: "Pass (after fix)",
    },
    tools: [
      {
        name: "Apache JMeter",
        sub: "Extended-duration load",
        url: "https://jmeter.apache.org",
        seeChapter: 20,
        desc: "Configured for a sustained, moderate load over many hours or days rather than a short burst — the specific technique is the same as reliability testing; this chapter names it explicitly as its own recognized type since teams often plan and request it under this specific name.",
        adv: [
          "Catches slow leaks invisible to any short run",
          "Evidence that a system can run unattended for production-length durations",
          "Targets memory leaks and connection exhaustion before a real outage",
          "Gives a focused name to the reliability practice from Chapter 20",
        ],
        lim: [
          "Takes hours to days — cannot be rushed",
          "Ties up a dedicated environment for the full duration",
          "Very slow leaks may need an even longer run",
          "Shows that degradation happened, not automatically why",
        ],
        steps: [
          {
            t: "Step 1 — Set a moderate, realistic load",
            p: "Not a stress-test peak — the level the system should comfortably handle over an ordinary extended period.",
          },
          {
            t: "Step 2 — Run for hours to days",
            p: "Overnight or multi-day for the strongest signal; many hours at minimum.",
          },
          {
            t: "Step 3 — Watch the whole run, not just the end",
            p: "Response times and error rates for gradual upward drift rather than a sudden spike.",
          },
          {
            t: "Step 4 — Watch server resources in parallel",
            p: "Memory, open connections, disk — a slow climb that never returns to baseline is the classic leak signature.",
          },
          { t: "Step 5 — Compare start vs end health", p: "A healthy system looks essentially the same at both points." },
          { t: "Step 6 — Fix, then soak again", p: "Confirm resource usage now stays flat across the full duration." },
        ],
      },
    ],
  },
];
