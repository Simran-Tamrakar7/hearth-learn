import { ch, r } from '../helpers.js'

/** Parts 17–18 — catalog TOC entries aligned with TESTING_TYPES_CHAPTERS 65–72 */
export const testingTypesPart1718Chapters = [
  ch({
    id: 'tt-data-driven-testing',
    kind: 'guide',
    phase: 'Part 17 · Data-Driven, Keyword, Model & Risk',
    level: 'intermediate',
    title: 'Data-Driven Testing',
    minutes: 25,
    durationLabel: 'Chapter 65',
    overviewText:
      'Data-driven testing separates test logic from test data — a single automated test script runs repeatedly against many different sets of input data pulled from an external source (a spreadsheet, CSV, or database), rather than hardcoding one fixed input directly into the script itself.',
    why:
      'Without this separation, testing ten different input variations of the same flow means writing and maintaining ten nearly-identical scripts. Data-driven testing collapses that duplication: one well-written script, paired with an external data set, can cover dozens or hundreds of input variations.',
    when:
      'Whenever the same flow or logic needs to be verified against many different input values — form validation, calculation logic, or any scenario described as "the same steps, different data."',
    practical: {
      app: 'HRMS Leave Request Validation',
      scenario:
        'A single Selenium script tests leave request date validation, driven by a CSV with 15 rows covering valid, invalid, and boundary dates.',
      pass: 'All 15 rows execute against the same script logic, including the 30-day consecutive maximum accepted without a dedicated script for that one case.',
      fail: 'Adding coverage for a public-holiday start date would have required a new script if data and logic were still mixed together.',
    },
    steps: [{ title: 'Separate data from logic', body: 'One script, many CSV rows.', doThis: 'Add a 16th row for a new edge case without changing the script.' }],
    checklist: ['External data source with expected results', 'Script iterates one row per case', 'New cases added as rows only'],
    resources: [r('tool', 'Selenium', 'https://selenium.dev', 'EN')],
  }),
  ch({
    id: 'tt-keyword-driven-testing',
    kind: 'guide',
    phase: 'Part 17 · Data-Driven, Keyword, Model & Risk',
    level: 'intermediate',
    title: 'Keyword-Driven Testing',
    minutes: 25,
    durationLabel: 'Chapter 66',
    overviewText:
      'Keyword-driven testing describes test steps as a sequence of plain, human-readable keywords rather than raw automation code — each keyword maps internally to reusable automation logic.',
    why:
      'Traditional automation scripts exclude much of a typical QA team from writing or even fully understanding automated cases. Keywords like Login, ClickButton, VerifyText are readable by someone with zero coding background.',
    when:
      'When manual testers or business analysts need to author or review automated test cases, or when test design needs to happen before the technical implementation is fully built.',
    practical: {
      app: 'HRMS Leave Approval Flow',
      scenario:
        'A QA analyst with no programming background writes a Robot Framework case using Login As Manager, Navigate To Pending Requests, Approve Request, Verify Leave Balance Updated.',
      pass: 'The full approval flow runs end-to-end, written and reviewed by the analyst because every needed keyword already existed.',
      fail: 'A missing Reject Request keyword would have blocked the analyst until an engineer added it.',
    },
    steps: [{ title: 'Author in keywords', body: 'Engineers maintain the library; analysts write cases.', doThis: 'Write one Robot Framework case from existing keywords.' }],
    checklist: ['Keyword library covers the flow', 'Case is readable by a non-programmer', 'HTML report reviewed'],
    resources: [r('tool', 'Robot Framework', 'https://robotframework.org', 'EN')],
  }),
  ch({
    id: 'tt-model-based-testing',
    kind: 'guide',
    phase: 'Part 17 · Data-Driven, Keyword, Model & Risk',
    level: 'advanced',
    title: 'Model-Based Testing',
    minutes: 25,
    durationLabel: 'Chapter 67',
    overviewText:
      'Model-based testing builds an abstract model of expected behavior as a state graph, then automatically generates test cases by exploring paths through that model.',
    why:
      'Manually enumerating paths through a multi-step workflow is exhausting and easy to under-cover. A formal model plus a path generator finds transitions a human might never think to try.',
    when:
      'Systems with well-defined state machines — approval workflows, booking systems, any finite set of states and valid transitions.',
    practical: {
      app: 'HRMS Leave Request State Machine',
      scenario:
        'Draft → Submitted → Approved/Rejected → Cancelled is modeled in GraphWalker, generating paths that cover every valid transition at least once.',
      pass: 'The invalid Approved→Draft edge is removed from the model and a clean suite is regenerated.',
      fail: 'A generated path tries Approved→Draft and the leftover API actually allows resetting an approved request to draft.',
    },
    steps: [{ title: 'Model then generate', body: 'Bind abstract steps to real automation.', doThis: 'Sketch the leave-request state graph and name one invalid edge.' }],
    checklist: ['States and transitions modeled', 'Coverage strategy chosen', 'Abstract steps bound to real actions'],
    resources: [r('tool', 'GraphWalker', 'https://graphwalker.github.io', 'EN')],
  }),
  ch({
    id: 'tt-risk-based-testing',
    kind: 'guide',
    phase: 'Part 17 · Data-Driven, Keyword, Model & Risk',
    level: 'intermediate',
    title: 'Risk-Based Testing',
    minutes: 20,
    durationLabel: 'Chapter 68',
    overviewText:
      'Risk-based testing prioritizes what gets tested, and how much effort each area receives, from likelihood of failure combined with impact if it fails.',
    why:
      'Unlimited testing time does not exist. Treating payroll and a news widget as equal depth is a misallocation relative to actual business risk.',
    when:
      'At the start of test planning for any release under real time or resource constraints.',
    practical: {
      app: 'HRMS Release Prioritization',
      scenario:
        'Payroll calculation is High risk; the company-news announcement feature is Low risk.',
      pass: 'Payroll gets functional, boundary, negative, security, and parallel testing; news gets a single smoke test — a deliberate trade-off.',
      fail: 'Equal shallow coverage on both would have left the payroll edge-case uncaught.',
    },
    steps: [{ title: 'Score then allocate', body: 'Likelihood × impact → High/Medium/Low → testing depth.', doThis: 'Rate three features in your current release.' }],
    checklist: ['Features listed', 'Likelihood and impact scored', 'Depth allocated proportionally', 'Assessment dated for revisit'],
    resources: [r('guide', 'ISTQB risk-based testing', 'https://www.istqb.org', 'EN')],
  }),
  ch({
    id: 'tt-backend-testing',
    kind: 'guide',
    phase: 'Part 18 · Backend, Network, Snapshot & Soak',
    level: 'intermediate',
    title: 'Backend Testing',
    minutes: 25,
    durationLabel: 'Chapter 69',
    overviewText:
      'Backend testing verifies server-side logic, database interactions, business rules, and data processing — correctness at the source, independent of UI or even the API contract on top.',
    why:
      'A UI or API can look fine while a scheduled job or multi-table rule is wrong. Backend testing goes to where the logic and data actually live.',
    when:
      'Throughout backend development, especially calculations, workflows, and scheduled processes — unit tests plus API (Chapter 34) plus database (Chapter 35).',
    practical: {
      app: 'HRMS Nightly Leave Balance Accrual Job',
      scenario: 'The monthly accrual job is triggered manually and verified in the database.',
      pass: 'Proration by hire date is confirmed for a range of employees after the fix.',
      fail: 'Mid-month hires received a full month accrual — invisible from the API because the job has no request/response to inspect.',
    },
    steps: [{ title: 'Trigger then inspect storage', body: 'Postman for the API surface; DBeaver for stored state.', doThis: 'Verify one multi-table business rule in the database.' }],
    checklist: ['API inputs chosen deliberately', 'Database state checked', 'Scheduled job exercised'],
    resources: [
      r('tool', 'Postman', 'https://postman.com', 'EN'),
      r('tool', 'DBeaver', 'https://dbeaver.io', 'EN'),
    ],
  }),
  ch({
    id: 'tt-network-testing',
    kind: 'guide',
    phase: 'Part 18 · Backend, Network, Snapshot & Soak',
    level: 'intermediate',
    title: 'Network Testing',
    minutes: 25,
    durationLabel: 'Chapter 70',
    overviewText:
      'Network testing verifies behavior under real-world network conditions — latency, packet loss, bandwidth limits, intermittent connectivity — and inspects the traffic the application actually generates.',
    why:
      'Apps are built on fast, stable links. Real users are often not. Assuming every call succeeds quickly produces hangs, data loss, and confusing states when that assumption breaks.',
    when:
      'Mobile apps and products used on unreliable connections — alongside functional testing, because good-network testing will not reveal these gaps.',
    practical: {
      app: 'HRMS Mobile App Under Poor Connectivity',
      scenario: 'Leave request submission under simulated high latency and intermittent packet loss.',
      pass: 'Timeout, retry, and an informative error — the user is never left on an unexplained spinner.',
      fail: 'Submit hangs indefinitely with no timeout, retry, or error.',
    },
    steps: [{ title: 'Capture and throttle', body: 'Wireshark for packets; DevTools/OS tools for poor conditions.', doThis: 'Confirm HTTPS is actually used and a dropped request does not hang forever.' }],
    checklist: ['Traffic filtered to the app', 'Encryption in transit confirmed', 'Poor-network behavior checked'],
    resources: [r('tool', 'Wireshark', 'https://wireshark.org', 'EN')],
  }),
  ch({
    id: 'tt-snapshot-testing',
    kind: 'guide',
    phase: 'Part 18 · Backend, Network, Snapshot & Soak',
    level: 'intermediate',
    title: 'Snapshot Testing',
    minutes: 20,
    durationLabel: 'Chapter 71',
    overviewText:
      'Snapshot testing captures serialized UI structure (not a screenshot) on first run, then flags any later difference for a human to accept or reject.',
    why:
      'Hand-writing assertions for every detail of a complex component is tedious and easy to under-specify. A snapshot surfaces any change, however small.',
    when:
      'UI component testing (especially React) alongside, not instead of, interaction tests.',
    practical: {
      app: 'HRMS Employee Card Component',
      scenario: 'A snapshot locks the employee summary card used across the dashboard.',
      pass: 'The unintended wrapping div is removed; the original snapshot passes again.',
      fail: 'An unrelated styling change adds an extra wrapping div that no hand-written assertion was checking.',
    },
    steps: [{ title: 'toMatchSnapshot then review diffs', body: 'Never blindly update.', doThis: 'Add one snapshot test and read a deliberate fail diff.' }],
    checklist: ['Snapshot file committed', 'Diffs reviewed before update', 'Interaction tests still cover behavior'],
    resources: [r('tool', 'Jest', 'https://jestjs.io', 'EN')],
  }),
  ch({
    id: 'tt-soak-endurance-testing',
    kind: 'guide',
    phase: 'Part 18 · Backend, Network, Snapshot & Soak',
    level: 'advanced',
    title: 'Soak / Endurance Testing',
    minutes: 25,
    durationLabel: 'Chapter 72',
    overviewText:
      'Soak (endurance) testing runs a continuous, moderate, realistic load for many hours to days to catch slow leaks and decay that a short run never has time to reveal.',
    why:
      'The same practice as Reliability Testing (Chapter 20), named here because teams plan and request it as its own type. Some bugs only appear over production-length time.',
    when:
      'Before launch for always-on systems, and after adding long-running processes, caches, or connection pools — as a dedicated long run, not folded into a short load test.',
    practical: {
      app: 'HRMS API Gateway Connection Pool',
      scenario: 'Moderate realistic load continuously for 48 hours.',
      pass: 'After a connection-release fix, a repeat 48-hour soak stays flat.',
      fail: 'Open connections climb and never return to baseline; by hour 36 requests fail with pool exhausted.',
    },
    steps: [{ title: 'Moderate load, long duration', body: 'Watch drift, not just spikes.', doThis: 'Name the resource you would plot start-vs-end on a soak.' }],
    checklist: ['Load is moderate not peak', 'Duration is hours to days', 'Start vs end health compared'],
    resources: [r('tool', 'Apache JMeter', 'https://jmeter.apache.org', 'EN')],
  }),
]
