/** Chapter body for /manuals/cypress. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "cypress",
  "title": "Cypress",
  "tagline": "Complete Beginner-to-Advanced Manual — JS/TS Cypress from philosophy through debugging, compared throughout to Playwright and Selenium.",
  "category": "automation",
  "accent": "#2E7D32",
  "cover": "covers/cypress-cover.png",
  "duration": "3–5 months (1–2 hrs/day)",
  "levelSpan": "Zero → Advanced practitioner",
  "who": "Developers and QA who want deep Cypress fluency in JavaScript/TypeScript — including when to choose Cypress vs Playwright/Selenium.",
  "outcomes": [
    "Explain Cypress’s in-browser architecture and its real trade-offs vs Playwright/Selenium",
    "Write reliable Cypress E2E specs with stable selectors, aliases, intercepts, and sessions",
    "Cover forms, files, iframes, auth, API setup, component tests, and debugging workflows",
    "Make scenario-based tool choices (SSO, multi-tab, Cloud parallelization, no WebKit)"
  ],
  "pace": {
    "hoursPerDay": "1–2 hours/day",
    "recommended": "~3–5 months",
    "accelerated": "~8–10 weeks at 3–4 hrs/day",
    "slow": "~6–7 months if busy"
  },
  "chapters": [
    {
      "id": "cy-0-what",
      "phase": "Part 0 · Background",
      "level": "beginner",
      "title": "0. What is Cypress, Really",
      "minutes": 35,
      "durationLabel": "Day 1",
      "overview": "Cypress was founded by Brian Mann, who began building it around 2014-2015. The origin story is worth knowing in more depth than a one-line \"he was frustrated with Selenium\" — his stated motivation was that he'd spent years writing Selenium/WebDriver-based tests professionally and kept hitting the same wall: the test code itself had almost no visibility into what the application was actually doing at the moment of fai",
      "learn": [
        "History — built by Cypress.io, first released publicly in 2017",
        "Open-source vs Cypress Cloud (paid)",
        "cy.intercept(), cy.request(), component testing, cy.session() — every testing capabilit…",
        "Why it was created"
      ],
      "steps": [
        {
          "title": "History — built by Cypress.io, first released publicly in 2017",
          "body": "Cypress was founded by Brian Mann, who began building it around 2014-2015. The origin story is worth knowing in more depth than a one-line \"he was frustrated with Selenium\" — his stated motivation was that he'd spent years writing Selenium/WebDriver-based tests professionally and kept hitting the same wall: the test code itself had almost no visibility into what the application was actually doing at the moment of failure. You'd get a stack trace pointing at your test framework, not at your app's actual state. He wanted a tool where the test and the application lived in the same execution context, so a test failure could show you the app's real, live state — not a reconstructed guess.\n\nCypress was initially released as a semi-commercial product (free to use locally, paid for the recording/dashboard features), then the core test runner was fully open-sourced in 2017 under the MIT license. This matters for a timeline comparison: Cypress predates Playwright's January 2020 public release by about three years, meaning Cypress had a multi-year head start in community adoption, plugin ecosystem maturity, and \"de facto standard for JS-first teams\" mindshare before Playwright entered the picture. This is part of why, even years later, you'll still find far more StackOverflow history, blog tutorials, and hiring-manager familiarity with Cypress than with Playwright in certain company cultures — even in cases where Playwright might be the technically better architectural fit for what that team is building.\n\nThe company behind it, Cypress.io, raised venture funding and built a genuine business around the Cloud/Dashboard product — this is a different commercial model than Microsoft funding Playwright as part of a much larger platform (Azure DevOps, VS Code, etc.). Practically: Cypress's release cadence and roadmap are driven by a smaller, dedicated company whose revenue depends specifically on Cypress being good enough that teams pay for Cloud — versus Playwright, where Microsoft's incentive is broader platform adoption rather than direct revenue from the tool itself. Neither model is inherently better, but it explains some behavioral differences you'll notice: Cypress has historically been more conservative about adding features that don't clearly serve its core \"great local dev experience\" identity, while Playwright has expanded more aggressively into adjacent territory (API testing, component testing, visual comparisons) as a Microsoft-backed team with more resources.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/overview/why-cypress",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Cypress’s founding philosophy is closest to which idea?",
            "options": [
              "Tests should remote-control the browser as an external observer",
              "Tests should live in the same browser world as the application",
              "Tests must always run outside JavaScript",
              "Tests should only use WebDriver HTTP"
            ],
            "answer": 1,
            "explain": "Position 2: Cypress runs test code inside the browser alongside the app for live visibility."
          },
          "tryIt": null,
          "doThis": "Write two sentences: Position 1 vs Position 2, and one consequence for multi-tab.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Interview angle",
            "body": "Be ready to explain the architectural why — not just the command syntax — when comparing Cypress to Playwright/Selenium.",
            "tone": "tip"
          },
          "aside": "Why the origin story shows up in interviews"
        },
        {
          "title": "Open-source vs Cypress Cloud (paid)",
          "body": "To be precise about the boundary (this is a common source of confusion and a fair interview question — \"what exactly do you pay for with Cypress?\"):\n\nFully free, open-source, in npm install cypress:\n\nThe entire Test Runner GUI (what you see with cypress open)\nAll core commands, all locator strategies, all assertion capability",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "cy.intercept(), cy.request(), component testing, cy.session() — every testing capability itself",
          "body": "Headless execution (cypress run)\nLocal video/screenshot capture on failure\nLocal Mochawesome/JUnit style reporting via your own report plugins\nPaid, via Cypress Cloud:\n\nCentralized, hosted storage of recorded run videos/screenshots (so your CI doesn't just discard them after the job ends)\nParallelization orchestration — this is the big one. Cypress itself can run tests in parallel across multiple CI machines, but deciding which spec file runs on which machine in a way that balances load intelligently requires the Cloud service coordinating between machines in real time. Without Cloud, you can still parallelize manually (Chapter 29 covers cypress-parallel as a free alternative) but you're doing your own load-balancing rather than letting Cypress's servers do it dynamically based on historical spec run-times.\nFlaky test detection/analytics — Cloud tracks a test's pass/fail history across many runs and specifically flags ones with inconsistent results, which is genuinely hard to replicate well with a from-scratch homegrown solution.\nGitHub/GitLab PR status checks and Slack integration showing pass/fail directly in your PR review flow.\nThe interview-safe way to describe this: \"Cypress Cloud doesn't unlock testing capability you can't otherwise access — it's an orchestration and visibility layer for running Cypress at scale in CI. A solo developer or small team can get 100% of the actual test-writing and running power for free.\"",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/overview/why-cypress",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Why it was created",
          "body": "It's worth separating this into two distinct philosophical positions, because they lead to different design decisions throughout the entire tool:\n\nPosition 1 (Selenium/WebDriver lineage, including how Playwright still fundamentally works): \"A test is an external observer that remote-controls a browser.\" The test process and the browser process are separate; they talk over a protocol (WebDriver's HTTP, or CDP's WebSocket for Playwright). This is architecturally clean and gives you enormous flexibility — multiple browsers, multiple contexts, multiple tabs, cross-origin navigation — because nothing about the test process's own execution is tied to any single page or origin.\n\nPosition 2 (Cypress's founding bet): \"A test should live inside the same world as the application, so it can see everything the application sees, live.\" Cypress's own test code executes inside the browser, in the same event loop as your application's JavaScript. This is why Cypress commands aren't real async/await-based promises the way Playwright's are — they're built on a custom internal command queue, because the execution model itself is fundamentally different from \"send a command, wait for a remote reply.\"\n\nThe consequence of Position 2 flowing through literally everything: because Cypress test code executes in-page, it can access things like your application's own JavaScript variables, mock window methods directly, and get essentially zero-latency visibility into DOM changes as they happen — no serialization over a wire protocol needed. But it also means Cypress test code is bound by the same-origin security restrictions a real page's JavaScript is bound by — which is exactly why cross-origin testing needed a special cy.origin() escape hatch (Chapter 27) bolted on later, and why true multi-tab support remains structurally awkward: a single Cypress test's JS execution context can't simply \"be\" two different tabs simultaneously the way an external Playwright process trivially can hold references to two Page objects.\n\nThis is genuinely one of the more interesting engineering trade-off stories in the test-automation space, and being able to articulate why the trade-off exists (not just that it exists) is a stronger interview answer than reciting \"Cypress can't do multi-tab\" as an isolated fact.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: History — built by Cypress.io, first released publicly in 2017",
        "I can explain: Open-source vs Cypress Cloud (paid)",
        "I can explain: cy.intercept(), cy.request(), component testing, cy.session() — every testing capabilit…"
      ],
      "practice": {
        "title": "Practice — What is Cypress, Really",
        "brief": "Write two sentences: Position 1 vs Position 2, and one consequence for multi-tab."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/overview/why-cypress",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Cypress was founded by Brian Mann, who began building it around 2014-2015. The origin story is worth knowing in more depth than a one-line \"he was frustrated with Selenium\" — his stated motivation was that he'd spent years writing Selenium/WebDriver-based tests professionally and kept hitting the same wall: the test code itself had almost no visibility into what the application was actually doing at the moment of fai",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-1-where",
      "phase": "Part 0 · Background",
      "level": "beginner",
      "title": "1. Where Cypress is Used",
      "minutes": 30,
      "durationLabel": "Day 2",
      "overview": "The bread-and-butter Cypress use case is writing tests that mirror real user journeys: log in, navigate to a specific module, perform an action, verify the result — the same shape as Playwright E2E tests, but with Cypress's own idioms (chained commands instead of awaited calls, cy.get() instead of page.locator()). For something like Bizlevate's HRM system, a representative E2E suite might cover: logging in as differe",
      "learn": [
        "E2E testing",
        "Component testing",
        "API testing",
        "Visual regression testing",
        "Industries"
      ],
      "steps": [
        {
          "title": "E2E testing",
          "body": "The bread-and-butter Cypress use case is writing tests that mirror real user journeys: log in, navigate to a specific module, perform an action, verify the result — the same shape as Playwright E2E tests, but with Cypress's own idioms (chained commands instead of awaited calls, cy.get() instead of page.locator()). For something like Bizlevate's HRM system, a representative E2E suite might cover: logging in as different role types (admin, employee, manager), submitting a leave request and having a manager approve it, running payroll and verifying calculated amounts, onboarding a new employee record end to end. These are exactly the kinds of multi-step, stateful flows Cypress is built to express clearly, since the Test Runner shows you each step visually as it executes.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/overview/why-cypress",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "List three HRM journeys you’d cover with Cypress E2E at Bizlevate.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Component testing",
          "body": "This deserves more explanation because it's genuinely different from anything in the Playwright manual's Part 0 framing (Playwright added component testing later and less centrally). Cypress Component Testing mounts a single component — say, a <LeaveRequestForm /> React component — directly into a real, empty browser page, completely outside your actual running application. You then interact with it using the exact same Cypress commands (cy.get, .click(), .type()) you'd use in a full E2E test, but the \"app\" being tested is just that one component with whatever props/mock data you feed it.\n\nWhy this matters practically: your HRM system almost certainly has dozens of reusable pieces — a date-range picker used across Leave, Attendance, and Appraisal modules, a status-badge component used everywhere, a data table component reused across every list view. Testing one of these directly means:\n\nNo need to log in, navigate through the app, and get to the right screen just to test a date picker's edge cases\nTests run dramatically faster (mounting one component vs loading a whole app)\nYou can trivially test edge-case props (an empty state, an error state, a component with 500 rows of data) by just passing that data directly as a prop, rather than needing your backend to actually produce that scenario\nThe trade-off: component tests don't verify real integration — a component test can pass perfectly while the actual page using that component is broken due to how it's wired up with real data/routing. This is why component testing supplements E2E testing rather than replacing it — a mature testing strategy uses both, and Chapter 28 goes into this balance in more depth.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "API testing",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/overview/why-cypress",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.request() (full reference in Chapter 24) is simpler in scope than Playwright's APIRequestContext. There's no separate context object you create and manage with its own isolated cookies/headers — cy.request() runs within your existing test's session context directly. This is simpler to use for the common case (make a quick API call to set up data before a UI test) but less flexible for scenarios needing several independent authenticated \"identities\" simultaneously within one test — an area where Playwright's context model has a genuine architectural edge.",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Visual regression testing",
          "body": "Unlike Playwright, which ships expect(page).to_have_screenshot() as a built-in first-party API, Cypress has no built-in visual diffing at all — every visual testing approach in a Cypress suite is layered on top via a plugin (cypress-image-snapshot, free but self-hosted comparison) or a paid SaaS product (Percy, Applitools — both offer dedicated Cypress integrations with cloud-hosted baseline management and smarter diffing that ignores anti-aliasing/rendering noise better than a raw pixel-diff). Worth knowing this distinction cold for interviews: \"Does Cypress have visual testing?\" — technically no, not without an add-on, unlike Playwright.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Industries",
          "body": "Beyond the general e-commerce/SaaS/banking/healthcare framing, it's worth understanding why Cypress specifically (as opposed to Playwright or Selenium) tends to cluster in certain organizational cultures: teams practicing \"you build it, you test it\" — where frontend developers themselves are expected to write tests for their own features, not hand it off to a separate QA automation team — gravitate toward Cypress because its authoring experience was built with a developer's daily workflow in mind (live reload, in-browser debugging, component testing fitting naturally alongside unit tests in the same repo). Organizations with a dedicated, separate automation-engineering function (common in larger enterprises, and closer to your own Bizlevate QA-specialist role) more often lean toward Playwright or Selenium specifically because those tools' external-driver architecture supports the more complex, multi-system, multi-language test infrastructure a dedicated automation team tends to build over years. Neither pattern is a hard rule, but it's a genuinely observable trend worth knowing when you're asked \"when would you recommend Cypress over Playwright to a team?\"",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/overview/why-cypress",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: E2E testing",
        "I can explain: Component testing",
        "I can explain: API testing"
      ],
      "practice": {
        "title": "Practice — Where Cypress is Used",
        "brief": "List three HRM journeys you’d cover with Cypress E2E at Bizlevate."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/overview/why-cypress",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "The bread-and-butter Cypress use case is writing tests that mirror real user journeys: log in, navigate to a specific module, perform an action, verify the result — the same shape as Playwright E2E tests, but with Cypress's own idioms (chained commands instead of awaited calls, cy.get() instead of page.locator()). For something like Bizlevate's HRM system, a representative E2E suite might cover: logging in as differe",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-2-cando",
      "phase": "Part 0 · Background",
      "level": "beginner",
      "title": "2. What Cypress Can Do",
      "minutes": 35,
      "durationLabel": "Day 3",
      "overview": "This is worth spending real time on because it trips up almost everyone coming from Playwright/Selenium/plain JavaScript async patterns. In Playwright (or plain async JS), you'd write: In Cypress, the equivalent looks deceptively similar but works completely differently: When the Test Runner executes your test, it doesn't just show a static list of pass/fail lines — each command in the log is backed by an actual DOM ",
      "learn": [
        "Runs inside the browser",
        "Time-travel debugging",
        "Automatic waiting / retry-ability",
        "Network stubbing",
        "Built-in dashboard/videos/screenshots"
      ],
      "steps": [
        {
          "title": "Runs inside the browser",
          "body": "This is worth spending real time on because it trips up almost everyone coming from Playwright/Selenium/plain JavaScript async patterns. In Playwright (or plain async JS), you'd write:\n\nIn Cypress, the equivalent looks deceptively similar but works completely differently:",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/core-concepts/introduction-to-cypress",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Why can’t you typically `await cy.get(...)` like a Playwright locator?",
            "options": [
              "Cypress forbids JavaScript",
              "cy.get returns a chainable queued on Cypress’s command queue, not a normal Promise",
              "cy.get always returns a string",
              "Only TypeScript supports await"
            ],
            "answer": 1,
            "explain": "Cypress uses a custom command queue; chainables are not standard Promises."
          },
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "const value = await page.locator('.total').textContent();\nconsole.log(value);\n\ncy.get('.total').invoke('text').then((value) => {\n  console.log(value);\n});\ncy.get() does not return a Promise you can await. It returns a Cypress \"chainable\" — an object representing a queued, not-yet-executed command. Cypress internally builds up a queue of these commands as your test function runs synchronously top-to-bottom, then executes them one at a time, afterward, each one waiting for the previous to finish and retrying internally as needed. This is why you can't do const value = cy.get('.total').text() and expect value to hold anything meaningful outside a .then() callback — the command hasn't actually run yet at the point your synchronous test function returns control. This single misunderstanding is probably the most common source of confused first-week Cypress bugs, and it's worth internalizing early rather than fighting it chapter after chapter.",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Time-travel debugging",
          "body": "When the Test Runner executes your test, it doesn't just show a static list of pass/fail lines — each command in the log is backed by an actual DOM snapshot taken at that moment. Hovering over (or clicking) a command in the log restores the application's DOM in the browser preview pane to exactly how it looked right before and right after that command ran — and because this is a real DOM, not a screenshot image, you can open actual browser DevTools and inspect it: check computed CSS, look at attached event listeners, inspect the accessibility tree, whatever you'd normally do live.\n\nPlaywright's Trace Viewer (Part 4, Ch. 24 of your Playwright manual) achieves something conceptually similar via recorded DOM snapshots, but it's a separate post-hoc viewer you open after the fact from a .zip trace file — Cypress's version is live, integrated directly into the same window you're already watching the test run in, with zero extra setup required.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Automatic waiting / retry-ability",
          "body": "This is worth making very concrete, since the Playwright comparison matters for interview answers. In Playwright:\n\npython\nPlaywright re-queries the locator and re-checks the assertion together as one atomic retry loop — this is genuinely similar to Cypress conceptually. But the difference shows up in command chains that aren't pure assertions. Consider a Cypress chain like:\n\nHere, the retry-ability specifically wraps the .should() in the middle of the chain — Cypress will re-run cy.get('.item-list').find('.item') repeatedly until the length assertion passes, and only once it passes does it continue to .last().click(). This \"retry until the assertion embedded mid-chain passes, then proceed\" behavior is a distinctly Cypress pattern — Playwright's equivalent would typically be written as two separate statements (an expect() call, then a follow-up action), since Playwright's auto-waiting model is centered on the action being performed, not an assertion sitting in the middle of a locator chain.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/core-concepts/introduction-to-cypress",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "expect(page.locator(\".cart-count\")).to_have_text(\"3\")\n\ncy.get('.item-list').find('.item').should('have.length', 3).last().click();",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Network stubbing",
          "body": "Briefly worth flagging here even though Chapter 23 covers it fully: Cypress's intercept pattern typically looks like:\n\nThis \"name the intercepted route, then explicitly wait on that name\" pattern is idiomatic Cypress and doesn't have a one-line equivalent in Playwright, where you'd more typically wait on a specific UI state that indicates the data has arrived, or use page.wait_for_response() matching a URL pattern directly rather than a named alias. Worth knowing this exists now since it'll shape how you write nearly every network-mocking test in Cypress going forward.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.intercept('GET', '/api/users').as('getUsers');\ncy.visit('/users');\ncy.wait('@getUsers');  // pause the test until this specific network call completes",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Built-in dashboard/videos/screenshots",
          "body": "Running cypress run (the headless CI mode) automatically records a full video of the entire spec file's execution and saves it to cypress/videos/ with zero configuration — this is genuinely different from Playwright, where video capture is a deliberate opt-in CLI flag (--video=retain-on-failure) precisely because Playwright's philosophy leans toward explicit configuration for anything with a storage/performance cost. Cypress's \"just works, capture everything by default\" approach is friendlier to a newcomer's first CI setup but can produce meaningfully larger CI artifact storage over time if a team never revisits the default — worth being aware of as a \"known gotcha\" for real production usage covered again in Chapter 33 (Performance).",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/core-concepts/introduction-to-cypress",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Runs inside the browser",
        "I can explain: Time-travel debugging",
        "I can explain: Automatic waiting / retry-ability"
      ],
      "practice": {
        "title": "Practice — What Cypress Can Do",
        "brief": "Apply one idea from “What Cypress Can Do” in a small Cypress experiment and note what surprised you."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/core-concepts/introduction-to-cypress",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "This is worth spending real time on because it trips up almost everyone coming from Playwright/Selenium/plain JavaScript async patterns. In Playwright (or plain async JS), you'd write: In Cypress, the equivalent looks deceptively similar but works completely differently: When the Test Runner executes your test, it doesn't just show a static list of pass/fail lines — each command in the log is backed by an actual DOM ",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-3-why",
      "phase": "Part 0 · Background",
      "level": "beginner",
      "title": "3. Why Companies Choose Cypress Over Alternatives",
      "minutes": 35,
      "durationLabel": "Day 4",
      "overview": "A useful way to describe this distinction concretely, since \"dev experience\" can sound vague in an interview: ask yourself who is expected to open the test runner and watch a test execute live, day to day. In a Cypress-centric team, it's often frontend engineers themselves, mid-feature-development, using Cypress almost like an extension of their own browser DevTools while building a component.",
      "learn": [
        "Dev-experience focus",
        "Debuggability",
        "vs Selenium",
        "vs Playwright"
      ],
      "steps": [
        {
          "title": "Dev-experience focus",
          "body": "A useful way to describe this distinction concretely, since \"dev experience\" can sound vague in an interview: ask yourself who is expected to open the test runner and watch a test execute live, day to day. In a Cypress-centric team, it's often frontend engineers themselves, mid-feature-development, using Cypress almost like an extension of their own browser DevTools while building a component.\n\nIn a Playwright/Selenium-centric team, it's more often a dedicated automation engineer running headless suites in CI and only occasionally launching a visible browser window to debug a specific failure. Neither workflow is \"correct\" — but Cypress's entire GUI-first design bet makes far more sense once you frame it around the first persona rather than the second.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/overview/why-cypress",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Pick one real scenario where you’d choose Playwright over Cypress and write why.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Interview angle",
            "body": "Be ready to explain the architectural why — not just the command syntax — when comparing Cypress to Playwright/Selenium.",
            "tone": "tip"
          },
          "aside": null
        },
        {
          "title": "Debuggability",
          "body": "Concretely walk through the same failure in both tools to make the contrast vivid:\n\nIn Selenium, a failed .click() on a stale element typically produces something like StaleElementReferenceException: element is not attached to the page document — technically accurate, but it tells you that something changed, not what the page actually looked like or why your reference went stale.\n\nIn Cypress, the same category of failure shows you the exact command log entry that failed, and clicking it restores the literal DOM as it existed at that instant — you can immediately see, visually, whether the element was covered by a loading spinner, whether it had actually been removed and replaced by a re-render, or whether your selector matched the wrong element entirely. The diagnostic loop is \"look at the snapshot\" rather than \"read an exception message and reason about what probably happened.\"",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "vs Selenium",
          "body": "Beyond flakiness and debugging, there's a simpler, more mundane reason many teams moved off Selenium toward either Cypress or Playwright: driver management. Selenium historically required you to download and manage a separate WebDriver binary per browser (chromedriver, geckodriver, etc.), matched carefully to your installed browser's exact version — a mismatch produced cryptic connection failures unrelated to your actual test logic.\n\nTools like Selenium Manager have improved this significantly in recent years, but Cypress (and Playwright) sidestepped the entire category of problem from day one by bundling/managing browser binaries themselves as part of the tool's own installation process. This is a \"boring but real\" reason worth mentioning in interviews — a lot of tool-migration decisions in real companies come down to unglamorous maintenance burden, not just flakiness rates.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/overview/why-cypress",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "vs Playwright",
          "body": "It's more convincing in an interview to describe specific scenarios where each limitation would actually matter, rather than reciting the trade-off abstractly:\n\nIf your HRM system's SSO login flow redirects through a separate identity provider domain and back (a very common real pattern — Okta, Azure AD, Google Workspace SSO) — that's a cross-origin journey. Cypress can handle this via cy.origin() (Chapter 27), but it requires deliberately wrapping the third-party-domain steps in a special block; Playwright handles the same navigation transparently with no special syntax at all, since nothing about its architecture cares whether the page changed origin.\nIf you needed to test a \"compare two documents side by side in two tabs\" feature, or verify that an action taken in one open tab (marking a notification read) is reflected live in another already-open tab of the same app — Playwright trivially opens two Page objects in one context and interacts with both; Cypress has no clean native way to hold and interact with two tabs' content simultaneously within a single test.\nIf your organization's broader automation team already has strong Python skills (perhaps from API testing or data work) but limited JS/TS depth, Playwright's Python bindings mean the same team can write both API and UI automation in the language they're already strongest in — Cypress simply isn't an option there regardless of any other trade-off.\nFraming your interview answer around scenarios like these — rather than an abstract \"Playwright is more flexible\" — signals real hands-on judgment rather than a memorized comparison chart.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Trade-off",
            "body": "Cypress’s in-browser model buys DX and visibility; it also creates hard limits (multi-tab, some cross-origin, no WebKit). Choose tools for the scenario.",
            "tone": "warn"
          },
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Dev-experience focus",
        "I can explain: Debuggability",
        "I can explain: vs Selenium"
      ],
      "practice": {
        "title": "Practice — Why Companies Choose Cypress Over Alternatives",
        "brief": "Pick one real scenario where you’d choose Playwright over Cypress and write why."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/overview/why-cypress",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "A useful way to describe this distinction concretely, since \"dev experience\" can sound vague in an interview: ask yourself who is expected to open the test runner and watch a test execute live, day to day. In a Cypress-centric team, it's often frontend engineers themselves, mid-feature-development, using Cypress almost like an extension of their own browser DevTools while building a component.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-4-not",
      "phase": "Part 0 · Background",
      "level": "beginner",
      "title": "4. What This Manual Will NOT Cover",
      "minutes": 25,
      "durationLabel": "Day 5",
      "overview": "To be fully precise about the boundary here: Cypress can test a website rendered in a mobile-sized viewport (useful for responsive-design verification, and Chapter 30 touches on viewport/device emulation for cross-browser testing), and it can even run inside some mobile browser automation setups in narrow, non-standard configurations — but it fundamentally cannot automate a compiled native app installed from an app s",
      "learn": [
        "Native mobile app testing (Appium territory)",
        "Load/performance testing",
        "Heavy multi-tab/cross-origin suites",
        "Non-JS/TS bindings"
      ],
      "steps": [
        {
          "title": "Native mobile app testing (Appium territory)",
          "body": "To be fully precise about the boundary here: Cypress can test a website rendered in a mobile-sized viewport (useful for responsive-design verification, and Chapter 30 touches on viewport/device emulation for cross-browser testing), and it can even run inside some mobile browser automation setups in narrow, non-standard configurations — but it fundamentally cannot automate a compiled native app installed from an app store, because there's no \"browser\" for its in-page JavaScript execution model to live inside. If Bizlevate ever ships a native mobile HRM app (as opposed to a mobile-responsive web version), that remains squarely Appium's domain, not Cypress's, regardless of how deep your Cypress skills go.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/references/trade-offs",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Load/performance testing",
          "body": "Worth being precise here too: it's not merely that this manual chooses not to cover it — Cypress is architecturally unsuited to the task in a way that's worth understanding, not just accepting. Because Cypress test code runs inside a single browser instance's JS engine, generating \"500 concurrent simulated users\" would mean somehow running 500 simultaneous in-browser JS contexts on one machine, which isn't how Cypress (or any browser-based UI tool) is built to scale. Load testing tools like k6 or Locust don't render a real browser or DOM at all for most of their work — they're optimized purely for firing enormous volumes of raw HTTP requests efficiently, which is a completely different engineering problem than \"does clicking this button do the right thing.\"",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Trade-off",
            "body": "Cypress’s in-browser model buys DX and visibility; it also creates hard limits (multi-tab, some cross-origin, no WebKit). Choose tools for the scenario.",
            "tone": "warn"
          },
          "aside": null
        },
        {
          "title": "Heavy multi-tab/cross-origin suites",
          "body": "This is worth stating plainly rather than diplomatically: if, after actually attempting the cy.origin() workarounds in Chapter 27, your team finds that a large fraction of your critical test scenarios are fighting against Cypress's architecture rather than working with it, that's a legitimate signal to reconsider Playwright for that specific suite — not a sign you're using Cypress wrong. Recognizing when a tool's limitations outweigh its strengths for your specific application is itself a mark of a senior automation engineer, and it's worth being comfortable saying so in an interview rather than defending whichever tool you happen to know best as universally correct.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/references/trade-offs",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Non-JS/TS bindings",
          "body": "Since you already have real Playwright + Python experience, it's worth explicitly naming what this means for you: your automation skill set is genuinely broader with Playwright (Python) + Cypress (JS/TS) combined than either alone — you're not \"switching\" tools so much as adding a second, differently-shaped tool for situations (frontend-heavy dev teams, component-testing needs, organizations already standardized on Cypress) where it's the better organizational fit, while keeping Playwright/Python for situations needing cross-language flexibility or deeper cross-origin/multi-tab support. Framing it this way — as portfolio breadth rather than \"which one is better\" — is both more accurate and a stronger positioning story for interviews (this ties forward to Chapter 37, Career Positioning).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Native mobile app testing (Appium territory)",
        "I can explain: Load/performance testing",
        "I can explain: Heavy multi-tab/cross-origin suites"
      ],
      "practice": {
        "title": "Practice — What This Manual Will NOT Cover",
        "brief": "Apply one idea from “What This Manual Will NOT Cover” in a small Cypress experiment and note what surprised you."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/references/trade-offs",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "To be fully precise about the boundary here: Cypress can test a website rendered in a mobile-sized viewport (useful for responsive-design verification, and Chapter 30 touches on viewport/device emulation for cross-browser testing), and it can even run inside some mobile browser automation setups in narrow, non-standard configurations — but it fundamentally cannot automate a compiled native app installed from an app s",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-5-intro",
      "phase": "Part 1 · Foundations",
      "level": "beginner",
      "title": "5. Introduction to Cypress",
      "minutes": 40,
      "durationLabel": null,
      "overview": "Your Playwright manual already gave you a solid comparison table. Here it is again, expanded with a few more rows that matter specifically once you're comparing all three tools as someone who'll actually use two of them professionally: Selenium Cypress Playwright Execution model External process → WebDriver (HTTP) Runs inside the browser External process → CDP (WebSocket) Browsers Most, via separate drivers Chromium-",
      "learn": [
        "Cypress vs Selenium vs Playwright",
        "Supported browsers",
        "Practice Introduction to Cypress"
      ],
      "steps": [
        {
          "title": "Cypress vs Selenium vs Playwright",
          "body": "Your Playwright manual already gave you a solid comparison table. Here it is again, expanded with a few more rows that matter specifically once you're comparing all three tools as someone who'll actually use two of them professionally:\n\nSelenium\tCypress\tPlaywright\nExecution model\tExternal process → WebDriver (HTTP)\tRuns inside the browser\tExternal process → CDP (WebSocket)\nBrowsers\tMost, via separate drivers\tChromium-family natively; Firefox/Edge supported, no WebKit\tChromium, Firefox, WebKit natively\nAuto-waiting\tNo (manual waits)\tYes (retry-ability wraps assertions)\tYes (actionability checks before actions)\nMulti-tab/multi-origin\tClunky\tWeak (architectural limitation)\tNative support\nLanguage support\tMany (Java, Python, C#, JS...)\tJS/TS only\tJS/TS, Python, Java, .NET\nSpeed\tSlower\tFast\tFast\nDebugging experience\tStack traces, manual reasoning\tTime-travel, live DOM snapshots\tTrace Viewer (post-hoc), Inspector (live)\nComponent testing\tNo\tYes, mature\tYes, newer/less central\nVisual testing\tNo built-in\tNo built-in (plugin/SaaS only)\tBuilt-in (to_have_screenshot)\nAPI testing\tNo built-in\tcy.request(), simple, same-session\tAPIRequestContext, isolated, more flexible\nSession/auth reuse\tManual cookie management\tcy.session()\tstorage_state\nParallelization\tThird-party/custom\tCypress Cloud (paid) or free plugin\tpytest-xdist / CI matrix, free\nOrigin/company\tOpen community, no single backer\tCypress.io (VC-funded startup)\tMicrosoft\nFirst release\t2004\t2017\tJanuary 2020\nA few rows deserve extra unpacking beyond what's in the table:\n\nDebugging experience row — this isn't simply \"Cypress is better,\" it's a difference in when the tool helps you. Cypress's time-travel is a live, real-time experience while the test runs in the GUI. Playwright's Trace Viewer is a post-hoc, recorded experience you open afterward from a saved file — which is actually the more useful model specifically for CI failures, since you weren't watching the test live anyway. For local iterative development, Cypress's live experience tends to feel faster; for diagnosing a failure that happened on a CI machine you weren't watching, Playwright's trace file is arguably just as good, if not more portable (you can email a .zip to a colleague).\n\nOrigin/company row — worth including because it has a real practical consequence: Cypress's roadmap is set by a smaller company whose commercial interest is the paid Cloud product, so certain \"would be nice but doesn't sell Cloud subscriptions\" features can move slower. Playwright's roadmap is set by a Microsoft team without that same direct monetization pressure on the tool itself, which partly explains its faster feature expansion into API testing, component testing, and visual testing as built-in capabilities rather than plugin territory.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/overview/why-cypress",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Which browser engine does Cypress not support?",
            "options": [
              "Chromium/Chrome",
              "Firefox",
              "WebKit/Safari",
              "Electron"
            ],
            "answer": 2,
            "explain": "Cypress has no WebKit/Safari support — a key contrast with Playwright."
          },
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Multi-tab/multi-origin: Selenium clunky · Cypress weak (architectural) · Playwright native",
            "Component testing: Selenium no · Cypress yes (mature) · Playwright yes (newer)",
            "Visual testing: Selenium no built-in · Cypress plugin/SaaS · Playwright built-in screenshots",
            "API testing: Selenium no · Cypress cy.request (same session) · Playwright APIRequestContext",
            "Session/auth reuse: Selenium manual cookies · Cypress cy.session · Playwright storage_state",
            "Parallelization: Selenium custom · Cypress Cloud/paid or free plugin · Playwright free workers",
            "Browsers: Selenium broad · Cypress Chrome/Firefox/Edge/Electron (no WebKit) · Playwright + WebKit"
          ],
          "callout": {
            "label": "Use the table in interviews",
            "body": "Don’t recite feature lists — pick the row that matches the hiring team’s pain (SSO, multi-tab, Python, WebKit).",
            "tone": "tip"
          },
          "aside": null
        },
        {
          "title": "Supported browsers",
          "body": "Cypress's browser support wasn't always what it is today, and knowing the trajectory is useful context: Cypress originally supported only Chromium-family browsers (Chrome, Chromium, Electron — the bundled default). Firefox support was added later (2020) and Edge support came via Edge's own move to a Chromium base (making it essentially free once Chromium support existed). WebKit/Safari support has never been added — this remains a genuine, permanent gap in Cypress's browser matrix compared to Playwright, which supports WebKit natively from day one. If Safari-specific bugs are a real concern for your application's user base, this is a concrete, decisive reason a team might choose Playwright over Cypress regardless of any other consideration — there's no workaround, no plugin, no version bump that will add WebKit support to Cypress.\n\nThe Electron browser deserves its own explanation since it's unique to Cypress: when you run cypress open or cypress run without specifying a browser, Cypress defaults to running inside Electron — a bundled, headless-capable Chromium build that ships with Cypress itself, used historically as the \"default, always-available\" browser requiring zero extra setup. It's fast and consistent but has occasionally shown subtle rendering differences from a \"real\" installed Chrome — worth explicitly specifying --browser chrome in CI (Chapter 44) rather than relying on the Electron default for a suite whose results need to represent real-world user browsers.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Cypress vs Selenium vs Playwright",
        "I can explain: Supported browsers",
        "I can explain: Practice Introduction to Cypress"
      ],
      "practice": {
        "title": "Practice — Introduction to Cypress",
        "brief": "Apply one idea from “Introduction to Cypress” in a small Cypress experiment and note what surprised you."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/overview/why-cypress",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Your Playwright manual already gave you a solid comparison table. Here it is again, expanded with a few more rows that matter specifically once you're comparing all three tools as someone who'll actually use two of them professionally: Selenium Cypress Playwright Execution model External process → WebDriver (HTTP) Runs inside the browser External process → CDP (WebSocket) Browsers Most, via separate drivers Chromium-",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-6-install",
      "phase": "Part 1 · Foundations",
      "level": "beginner",
      "title": "6. Installation & Environment Setup",
      "minutes": 40,
      "durationLabel": null,
      "overview": "Cypress requires a working Node.js installation (Node 18+ for current Cypress major versions, though always verify against the specific Cypress version you're installing — Cypress bumps its minimum Node requirement periodically as old Node versions reach end-of-life). Unlike Playwright's Python bindings, there's no equivalent \"pick your language runtime\" decision here — Cypress is a Node package through and through, ",
      "learn": [
        "Node/npm prerequisites",
        "Installing Cypress",
        "Folder structure"
      ],
      "steps": [
        {
          "title": "Node/npm prerequisites",
          "body": "Cypress requires a working Node.js installation (Node 18+ for current Cypress major versions, though always verify against the specific Cypress version you're installing — Cypress bumps its minimum Node requirement periodically as old Node versions reach end-of-life). Unlike Playwright's Python bindings, there's no equivalent \"pick your language runtime\" decision here — Cypress is a Node package through and through, so your entire toolchain (project setup, dependency management, CI configuration) will look like a standard JavaScript/TypeScript project's, not a Python one. If this is your first deep Node-based project (versus your Python/Playwright work), budget a little extra ramp-up time purely for Node/npm conventions — package.json, node_modules, semantic versioning in package-lock.json — none of which map directly onto Python's requirements.txt/venv world.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/getting-started/installing-cypress",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Init a throwaway repo, install Cypress, and run `npx cypress open`.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Installing Cypress",
          "body": "mkdir my-cypress-project\ncd my-cypress-project\n\nAfter installation, you'll open Cypress for the first time with:\n\ncypress.config.js — mention it exists now, full deep-dive in Chapter 9\n\nThe setup wizard creates cypress.config.js (or .ts if you set up TypeScript, Chapter 40) at your project root. This single file plays a role roughly analogous to Playwright's pytest.ini + conftest.py combined — it's Cypress's actual configuration file (not achieved through a separate ini format), since Cypress ships its own built-in test runner (much like Playwright's JS/TS @playwright/test package does, rather than the pytest-plugin approach Python-Playwright needs).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "npm init -y          # creates a package.json with defaults\nnpm install cypress --save-dev\nnpm init -y creates a minimal package.json — the Node equivalent of Python's requirements.txt, but it also stores project metadata (name, version, scripts) not just dependencies. The -y flag accepts all defaults without prompting, fine for a test-automation project that isn't itself being published as a package.\n\nnpm install cypress --save-dev installs Cypress specifically as a dev dependency (--save-dev / -D) rather than a regular dependency. This distinction matters in Node projects: dev dependencies are tools needed to build or test the project (Cypress, linters, bundlers) but not needed to actually run the finished application in production. Getting this right keeps your package.json accurately communicating \"this is a testing tool\" to anyone else who opens the project — including automated tools that might, for instance, skip installing dev dependencies in a production deployment step.\n\nnpx cypress open\nnpx runs a locally-installed package's executable without needing it globally installed on your system PATH — the Node equivalent of activating a Python virtual environment before running a tool installed inside it. The very first time you run this, Cypress launches a setup wizard that scaffolds the initial folder structure and config file for you — worth actually clicking through this wizard once rather than only ever copy-pasting a config from an existing project, so you understand what each generated piece is for.",
          "codeTitle": "bash",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Folder structure",
          "body": "The scaffolded structure looks like this:\n\nmy-cypress-project/\n├── cypress/\n│   ├── e2e/\n│   │   └── (your .cy.js test files go here)\n│   ├── fixtures/\n│   │   └── example.json\n│   ├── support/\n│   │   ├── commands.js\n│   │   └── e2e.js\n│   └── downloads/         (created automatically when tests download files)\n├── cypress.config.js\n├── package.json\n└── node_modules/\ncypress/e2e/ — your actual test spec files live here, conventionally named something.cy.js (or .cy.ts). The .cy. infix (rather than just .test.js or .spec.js) is a Cypress-specific naming convention that its test-discovery mechanism looks for by default — configurable, but worth following unless you have a strong reason not to, since deviating means updating the specPattern config (Chapter 9) and confusing anyone else expecting the convention.\ncypress/fixtures/ — static test data files (JSON primarily, though any file type is technically loadable), directly parallel to Playwright's fixture files pattern (Part 3, Ch. 16 of your Playwright manual), loaded via cy.fixture() (Chapter 25 here).\ncypress/support/ — this is genuinely distinctive and has no single direct Playwright equivalent. Two files matter most:\ncommands.js — where you define custom commands via Cypress.Commands.add() (Chapter 35), Cypress's equivalent of Playwright's custom page-object methods, but implemented as global command extensions rather than class methods.\ne2e.js — a support file automatically loaded before every single spec file runs, used for global setup: importing commands.js, setting up global error-handling hooks, configuring anything that should apply to the entire suite without repeating it per file. This is roughly analogous to Playwright/pytest's conftest.py in spirit (auto-discovered, applies broadly) even though the underlying mechanism is completely different (import-based, not fixture-based).\ncypress/downloads/ — auto-created (not scaffolded initially) the first time a test triggers a file download, holding the actual downloaded files for verification (Chapter 19 covers this in the Playwright manual's numbering, but in this Cypress TOC it's folded into general file-handling content in Part 3).\nWorth noting explicitly: there's no pages/ folder scaffolded by default, unlike the Playwright POM structure your prior manual walked through. This isn't an oversight — it reflects Cypress's own documented guidance steering users away from a classic Page Object Model toward the \"App Actions\" pattern (Chapter 36), which you'll set up yourself as a convention rather than following a tool-provided default.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/getting-started/installing-cypress",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Node/npm prerequisites",
        "I can explain: Installing Cypress",
        "I can explain: Folder structure"
      ],
      "practice": {
        "title": "Practice — Installation & Environment Setup",
        "brief": "Init a throwaway repo, install Cypress, and run `npx cypress open`."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/getting-started/installing-cypress",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Cypress requires a working Node.js installation (Node 18+ for current Cypress major versions, though always verify against the specific Cypress version you're installing — Cypress bumps its minimum Node requirement periodically as old Node versions reach end-of-life). Unlike Playwright's Python bindings, there's no equivalent \"pick your language runtime\" decision here — Cypress is a Node package through and through, ",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-7-runner",
      "phase": "Part 1 · Foundations",
      "level": "beginner",
      "title": "7. Cypress Test Runner / Cypress App Walkthrough",
      "minutes": 35,
      "durationLabel": null,
      "overview": "When you run npx cypress open, you land in the Launchpad — a browser selector screen listing every browser Cypress detected on your machine (Chrome, Edge, Firefox if installed, plus the always-available bundled Electron). Choosing a browser here determines which one the Test Runner actually opens and runs your tests in for that session.",
      "learn": [
        "Electron vs real browsers",
        "The Test Runner interface itself — walk through what you actually see",
        "cypress run vs cypress open"
      ],
      "steps": [
        {
          "title": "Electron vs real browsers",
          "body": "When you run npx cypress open, you land in the Launchpad — a browser selector screen listing every browser Cypress detected on your machine (Chrome, Edge, Firefox if installed, plus the always-available bundled Electron). Choosing a browser here determines which one the Test Runner actually opens and runs your tests in for that session.\n\nPractical guidance on which to pick day to day: use a real installed browser (Chrome, ideally) for active development and debugging — you get real DevTools, real browser extensions if relevant, and behavior that matches what an actual user experiences. Use Electron for quick, throwaway local runs where you don't specifically need to inspect browser-native behavior — it launches faster since it's bundled and requires no separate browser process detection. In CI, explicitly specify the browser via --browser chrome (Chapter 44) rather than leaving Cypress to default to Electron, since your CI results should reflect a real-world browser your actual users are running, not Cypress's internal bundled one.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/core-concepts/open-mode",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "The Test Runner interface itself — walk through what you actually see",
          "body": "Once you select a spec file to run, the Test Runner window is split into two main areas:\n\nLeft panel — the Command Log. Every Cypress command your test executes appears here as a numbered, expandable entry, color-coded (grey for a passing step, red for a failing one), grouped visually under whichever it() block is currently running. Hovering over any entry highlights the corresponding DOM element directly in the right-hand preview pane (if that command targeted a specific element) — a small but genuinely useful bit of instant visual feedback while you're writing a new locator and want to confirm it's grabbing the right thing.\nRight panel — the App Preview. This is your actual application, rendered live, exactly as your test is interacting with it. Clicking any entry in the Command Log (this is the \"time travel\" feature) freezes this preview to show the DOM state at that exact point in the test's execution — before or after that specific command ran, distinguished by hovering vs clicking (hovering shows a lighter preview; clicking pins it so you can actually interact with DevTools against that frozen state).\nTop toolbar includes a URL bar showing the current page Cypress is on, a viewport-size selector (for quick manual responsive testing), and critically, a \"Selector Playground\" icon — a genuinely useful built-in tool that lets you click any element in the App Preview and get Cypress's own best-guess selector for it printed out, plus a live count of how many elements on the page match that selector. This is a lightweight, built-in alternative to Playwright's separate codegen tool (Chapter 24 in the Playwright manual) — less powerful (it doesn't generate full interaction scripts, just selectors) but requires zero separate command to launch, since it's built directly into the GUI you already have open.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "cypress run vs cypress open",
          "body": "cypress open launches the full interactive Test Runner GUI described above — meant for active authoring and debugging, one spec (or a filtered set) at a time, with the ability to re-run individual tests and watch them live.\n\ncypress run executes headlessly (Electron by default, or any browser via --browser), runs your entire test suite (or a specified subset) start to finish without any GUI, and is what you'll always use in CI (Chapter 44). It automatically captures the video/screenshot behavior described in Part 0 without any GUI to look at. The key workflow implication: you write and debug with cypress open, then validate the same suite with cypress run before pushing, since a test can occasionally behave subtly differently in the interactive GUI vs a true headless run (timing differences especially) — a discipline worth building early rather than only ever discovering a headless-only failure for the first time when CI fails.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/core-concepts/open-mode",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Electron vs real browsers",
        "I can explain: The Test Runner interface itself — walk through what you actually see",
        "I can explain: cypress run vs cypress open"
      ],
      "practice": {
        "title": "Practice — Cypress Test Runner / Cypress App Walkthrough",
        "brief": "Apply one idea from “Cypress Test Runner / Cypress App Walkthrough” in a small Cypress experiment and note what surprised you."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/core-concepts/open-mode",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "When you run npx cypress open, you land in the Launchpad — a browser selector screen listing every browser Cypress detected on your machine (Chrome, Edge, Firefox if installed, plus the always-available bundled Electron). Choosing a browser here determines which one the Test Runner actually opens and runs your tests in for that session.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-8-first",
      "phase": "Part 1 · Foundations",
      "level": "beginner",
      "title": "8. First Test",
      "minutes": 40,
      "durationLabel": null,
      "overview": "Cypress's test structure isn't Cypress's own invention — it's inherited wholesale from Mocha, the JavaScript test framework Cypress is built on top of (full depth on this in Chapter 32). describe() and it() are Mocha primitives; Cypress adds its own commands (cy.get, cy.visit, etc.) that you call inside these Mocha blocks.",
      "learn": [
        "describe/context/it blocks",
        "The first cy.visit() + assertion, explained line by line",
        "Practice First Test"
      ],
      "steps": [
        {
          "title": "describe/context/it blocks",
          "body": "Cypress's test structure isn't Cypress's own invention — it's inherited wholesale from Mocha, the JavaScript test framework Cypress is built on top of (full depth on this in Chapter 32). describe() and it() are Mocha primitives; Cypress adds its own commands (cy.get, cy.visit, etc.) that you call inside these Mocha blocks.\n\nNothing about Cypress's execution changes whether you use describe or context — it's a pure readability/convention choice, and many style guides pick one or the other consistently rather than mixing both arbitrarily.\n\ncypress open vs cypress run in practice — walk through the actual first-test experience\n\nWhen you save this first spec file and have the Test Runner already open via cypress open, Cypress's real-time reload (Part 0) means the new spec appears in your spec list automatically — click it, and you'll watch each cy. command execute one after another in the Command Log in real time, with the App Preview on the right showing your actual login page as Cypress fills in the username, fills in the password, and clicks submit, live.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/getting-started/writing-your-first-test",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "In Cypress, what does `.should('contain', 'text')` primarily use under the hood?",
            "options": [
              "Jest matchers",
              "Chai assertions",
              "JUnit assertions",
              "Python assert"
            ],
            "answer": 1,
            "explain": "Cypress assertions are powered by Chai (plus Chai-jQuery / Sinon-Chai)."
          },
          "tryIt": null,
          "doThis": "Write one failing-then-passing login spec against a practice app.",
          "tip": null,
          "code": "describe('Login Page', () => {\n  it('displays an error for invalid credentials', () => {\n    cy.visit('/login');\n    cy.get('[data-cy=username]').type('baduser');\n    cy.get('[data-cy=password]').type('wrongpass');\n    cy.get('[data-cy=submit]').click();\n    cy.get('[data-cy=error-message]').should('contain', 'Invalid credentials');\n  });\n});\ndescribe() groups related tests under a named block — purely organizational, shows up as a nested heading in both the Command Log and any generated reports. it() defines one actual test case, with a description that (as with Playwright test naming, Chapter 31's best-practices chapter in that manual) should read as a clear statement of expected behavior.\n\ncontext() is literally just an alias for describe() — functionally identical, provided purely for readability when you want to express \"under this specific condition/context\" rather than \"this is a feature area.\" A common convention:\n\ndescribe('Leave Request Form', () => {\n  context('when the user has remaining leave balance', () => {\n    it('submits successfully', () => { /* ... */ });\n  });\n\n  context('when the user has zero leave balance remaining', () => {\n    it('shows a validation error', () => { /* ... */ });\n  });\n});",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "The first cy.visit() + assertion, explained line by line",
          "body": "This is Cypress's implicit assertion style — .should() chained directly onto a command, versus Playwright's expect(locator).to_contain_text(...) pattern where the assertion wraps the locator externally. Both achieve the same retry-until-pass behavior described in Part 0, just with different syntactic shape. 'contain' here is a Chai assertion keyword (full depth in Chapter 14) — Cypress's assertion vocabulary is borrowed from Chai/Chai-jQuery, the same way its test structure is borrowed from Mocha, rather than being a bespoke Cypress-invented syntax.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.visit('/login');\ncy.visit() navigates the browser to a URL. Note it's a relative path here (/login, not a full URL) — this only works because baseUrl is configured in cypress.config.js (Chapter 9), which Cypress automatically prepends. This is a small but important habit to establish immediately: hardcoding full URLs in every test makes switching environments (dev/staging/prod, Chapter 37) painful; relying on a configured baseUrl and always using relative paths keeps environment-switching to a single config change.\n\ncy.get('[data-cy=error-message]').should('contain', 'Invalid credentials');",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: describe/context/it blocks",
        "I can explain: The first cy.visit() + assertion, explained line by line",
        "I can explain: Practice First Test"
      ],
      "practice": {
        "title": "Practice — First Test",
        "brief": "Write one failing-then-passing login spec against a practice app."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/getting-started/writing-your-first-test",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Cypress's test structure isn't Cypress's own invention — it's inherited wholesale from Mocha, the JavaScript test framework Cypress is built on top of (full depth on this in Chapter 32). describe() and it() are Mocha primitives; Cypress adds its own commands (cy.get, cy.visit, etc.) that you call inside these Mocha blocks.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-9-config",
      "phase": "Part 1 · Foundations",
      "level": "beginner",
      "title": "9. cypress.config.js",
      "minutes": 35,
      "durationLabel": null,
      "overview": "Cypress's default viewport (1000×660 if left unconfigured) is smaller than most real user viewports and smaller than Playwright's own defaults — meaning a responsive layout that looks fine to a real user might trigger a mobile/collapsed navigation state in an unconfigured Cypress run, causing selector failures that have nothing to do with your actual test logic and everything to do with an unconsidered default. Setti",
      "learn": [
        "baseUrl",
        "baseUrl: 'http://localhost:3000',",
        "Viewport",
        "Timeouts",
        "Env vars"
      ],
      "steps": [
        {
          "title": "baseUrl",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/references/configuration",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "// cypress.config.js\nconst { defineConfig } = require('cypress');\n\nmodule.exports = defineConfig({\n  e2e: {",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "baseUrl: 'http://localhost:3000',",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "    // ...\n  },\n});\nbaseUrl is arguably the single most impactful config value in the entire file, for a reason that isn't obvious until you hit it: if baseUrl isn't set, Cypress requires every cy.visit() call to use a full absolute URL, and worse, Cypress will actually throw an error on startup in newer versions if it detects your first cy.visit() uses a relative path with no baseUrl configured — a confusing error for a newcomer whose actual mistake was simply forgetting this one line. Setting it once, early, and using relative paths everywhere else is the correct default habit from your very first test onward.",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Viewport",
          "body": "Cypress's default viewport (1000×660 if left unconfigured) is smaller than most real user viewports and smaller than Playwright's own defaults — meaning a responsive layout that looks fine to a real user might trigger a mobile/collapsed navigation state in an unconfigured Cypress run, causing selector failures that have nothing to do with your actual test logic and everything to do with an unconsidered default. Setting an explicit, realistic viewport early (matching your actual most-common user screen size) avoids a specific, recurring category of confusing early failures.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/references/configuration",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "module.exports = defineConfig({\n  e2e: {\n    viewportWidth: 1280,\n    viewportHeight: 720,\n    // ...\n  },\n});",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Timeouts",
          "body": "Cypress splits timeout configuration more granularly than Playwright's single general timeout concept:",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "module.exports = defineConfig({\n  e2e: {\n    defaultCommandTimeout: 4000,   // how long most commands retry before failing\n    requestTimeout: 5000,          // how long to wait for an XHR/fetch request\n    responseTimeout: 30000,        // how long to wait for a response to `cy.request()`, `cy.wait()`, etc.\n    pageLoadTimeout: 60000,        // how long `cy.visit()` waits for the page load event\n  },\n});\ndefaultCommandTimeout governs the vast majority of everyday retry-ability (Part 0) — most cy.get()/.should() chains retry within this window. pageLoadTimeout is separately, deliberately set much higher by default, since a full page navigation (especially to a heavier app) can legitimately take longer than a simple element-retry loop should. Knowing these are separate, independently tunable values matters practically: bumping defaultCommandTimeout globally because one specific slow report-generation feature needs more time is the wrong fix — that's a case for an explicit per-command timeout override (cy.get(selector, { timeout: 15000 })), not a global config change that makes every genuinely-broken, should-fail-fast test wait needlessly longer before reporting a real failure.",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Env vars",
          "body": "Cypress environment variables can be set in several layered places, each overriding the ones before it in this order: (1) values in cypress.config.js's env block, (2) a cypress.env.json file at the project root (useful for values you don't want committed to version control, like secrets — add it to .gitignore), (3) OS-level environment variables prefixed CYPRESS_ (e.g., CYPRESS_apiUrl=...), and (4) the --env CLI flag (npx cypress run --env apiUrl=https://prod.example.com), which takes highest priority. This layered-override system is more elaborate than Playwright's simpler os.environ.get() pattern (Part 3, Ch.\n\n15 of your Playwright manual) and is worth understanding the priority order of specifically, since a value silently being overridden by a CLI flag you forgot you set is a genuinely confusing category of bug the first time it happens. Part 2: Core Commands & Locators",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/references/configuration",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "module.exports = defineConfig({\n  e2e: {\n    env: {\n      apiUrl: 'https://api-staging.example.com',\n    },\n  },\n});\n\n// in a test\ncy.visit(Cypress.env('apiUrl'));",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: baseUrl",
        "I can explain: baseUrl: 'http://localhost:3000',",
        "I can explain: Viewport"
      ],
      "practice": {
        "title": "Practice — cypress.config.js",
        "brief": "Apply one idea from “cypress.config.js” in a small Cypress experiment and note what surprised you."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/references/configuration",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Cypress's default viewport (1000×660 if left unconfigured) is smaller than most real user viewports and smaller than Playwright's own defaults — meaning a responsive layout that looks fine to a real user might trigger a mobile/collapsed navigation state in an unconfigured Cypress run, causing selector failures that have nothing to do with your actual test logic and everything to do with an unconsidered default. Setti",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-10-visit",
      "phase": "Part 2 · Core Commands & Locators",
      "level": "beginner",
      "title": "10. cy.visit, cy.get, cy.contains, cy.find",
      "minutes": 40,
      "durationLabel": null,
      "overview": "The onBeforeLoad callback is worth knowing early — it fires after the page's document exists but before any of the page's own JavaScript has run, giving you a hook to seed localStorage, stub window methods, or set feature flags before the app's own startup code executes. This is a common pattern for skipping onboarding tours, forcing a specific app state, or pre-seeding an auth token without a full login flow.",
      "learn": [
        "cy.visit()",
        "cy.get() — the primary, most-used command; go deeper on what it accepts",
        "cy.contains()",
        "cy.find()"
      ],
      "steps": [
        {
          "title": "cy.visit()",
          "body": "The onBeforeLoad callback is worth knowing early — it fires after the page's document exists but before any of the page's own JavaScript has run, giving you a hook to seed localStorage, stub window methods, or set feature flags before the app's own startup code executes. This is a common pattern for skipping onboarding tours, forcing a specific app state, or pre-seeding an auth token without a full login flow.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/visit",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a visit + get + contains + find chain against one page.",
          "tip": null,
          "code": "cy.visit('/dashboard');\ncy.visit('https://app.example.com/dashboard', {\n  timeout: 30000,\n  onBeforeLoad(win) {\n    win.localStorage.setItem('feature_flag_x', 'true');\n  },\n});\n\ncy.visit() doesn't just navigate — it also clears the previous page's state first (cookies from a different origin, local/session storage tied to that origin) unless you're staying within the same origin as before. This is a direct consequence of Cypress's in-browser execution model (Part 0): because the test's JS lives inside the page, a full navigation to a genuinely new origin means Cypress's own test-runner code has to be re-injected into the new page context, which is also the root reason cross-origin navigation needs cy.origin() (Chapter 27) as a special case rather than working transparently.\n\ncy.visit() also automatically waits for the page's load event before the command is considered complete and the next command in your chain begins — conceptually similar to Playwright's page.wait_for_load_state(\"load\") being baked in automatically, rather than something you have to call separately.",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "cy.get() — the primary, most-used command; go deeper on what it accepts",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.get('.submit-button');\ncy.get('#login-form');\ncy.get('[data-cy=username]');\ncy.get('input[type=\"email\"]');\ncy.get('ul > li:first-child');\n\ncy.get() accepts any valid CSS selector — this is its core identity: unlike Playwright's get_by_role/get_by_text family (which query the accessibility tree, not raw CSS), Cypress's cy.get() is fundamentally CSS-based. This is an important mental adjustment coming from your Playwright background: Cypress's idiomatic \"best practice\" locator strategy leans on CSS attribute selectors (specifically data-cy attributes, covered next in Chapter 11) rather than role/accessible-name matching the way Playwright recommends. Cypress does have some text/role-adjacent capability (cy.contains(), covered next), but it's not the same accessibility-tree-driven mechanism — worth not assuming your Playwright locator instincts transfer 1:1.\n\ncy.get() also has a retry-and-wait behavior built directly into the command itself: if no element matches immediately, Cypress doesn't fail right away — it keeps re-querying the DOM until an element appears or defaultCommandTimeout (Chapter 9) is exceeded. This is the same retry-ability concept from Part 0, just specifically anchored to this one command as your most common entry point into it.",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "cy.contains()",
          "body": "The two-argument form (cy.contains('button', 'Submit')) scopes the search to a specific selector first, then filters by text — this is usually the safer, more precise pattern once your page has more than a couple of matching text instances, since unscoped cy.contains('Submit') becomes ambiguous fast on any real, non-trivial page.\n\nCompared to Playwright's get_by_text() (which matches by default as a substring and can be made exact), Cypress's cy.contains() behaves similarly in spirit but is worth testing directly in the Selector Playground (Chapter 7) when you're unsure exactly which element it'll resolve to — it's a slightly less predictable command than a precise CSS/attribute selector, useful for readability but worth reserving for genuinely stable, user-facing copy rather than anything likely to be reworded.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/visit",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.contains('Submit');                      // finds any element containing this text\ncy.contains('button', 'Submit');             // scoped to <button> elements only\ncy.contains('.card', 'Premium Plan').click(); // find a specific card by its text, then click it\n\ncy.contains() searches the DOM for an element containing the given text — by default it searches broadly across the page and, notably, prefers the deepest/most specific matching element rather than a broad container. If both a <div> and a nested <span> inside it contain \"Submit,\" cy.contains('Submit') returns the more specific <span>, not the outer <div> — a subtlety worth knowing since it affects what you end up clicking/asserting on.",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "cy.find()",
          "body": "The practical value: on a page with a table of rows, each containing its own \"Delete\" button, cy.get('.delete-button').click() unscoped would match every row's delete button and Cypress's strictness (discussed more in Chapter 12) would either error on ambiguity or act on an unpredictable one — whereas scoping first to a specific row via cy.get('.user-row').contains('john@example.com').parents('.user-row').find('.delete-button').click() (or similar) narrows correctly to the one you actually mean.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.get('.user-row').find('.delete-button').click();\n\ncy.find() is not a standalone command — it only makes sense chained after a previous cy.get() (or another chainable), and it searches within the previously-yielded element(s), not the whole page. This is the Cypress equivalent of a scoped/nested locator pattern — directly parallel to how you'd chain .locator() calls in Playwright to scope a search inside one row before acting on a button within it (a pattern your Playwright manual covered under .filter() in Part 2, Chapter 5).",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: cy.visit()",
        "I can explain: cy.get() — the primary, most-used command; go deeper on what it accepts",
        "I can explain: cy.contains()"
      ],
      "practice": {
        "title": "Practice — cy.visit, cy.get, cy.contains, cy.find",
        "brief": "Write a visit + get + contains + find chain against one page."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/api/commands/visit",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "The onBeforeLoad callback is worth knowing early — it fires after the page's document exists but before any of the page's own JavaScript has run, giving you a hook to seed localStorage, stub window methods, or set feature flags before the app's own startup code executes. This is a common pattern for skipping onboarding tours, forcing a specific app state, or pre-seeding an auth token without a full login flow.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-11-selectors",
      "phase": "Part 2 · Core Commands & Locators",
      "level": "beginner",
      "title": "11. Selector Strategies",
      "minutes": 40,
      "durationLabel": null,
      "overview": "Cypress's own official documentation is unusually opinionated (more so than Playwright's docs) about recommending a dedicated testing attribute, conventionally named data-cy (though data-test or data-testid are also common, just pick one and be consistent): html <button data-cy=\"submit-login\">Log In</button> The reasoning, worth understanding rather than just following: CSS classes and element structure change for st",
      "learn": [
        "data-cy attributes",
        "CSS selectors",
        "data-cy / data-test / data-testid attributes (most stable)",
        "Best practices"
      ],
      "steps": [
        {
          "title": "data-cy attributes",
          "body": "Cypress's own official documentation is unusually opinionated (more so than Playwright's docs) about recommending a dedicated testing attribute, conventionally named data-cy (though data-test or data-testid are also common, just pick one and be consistent):\n\nhtml\n<button data-cy=\"submit-login\">Log In</button>\n\nThe reasoning, worth understanding rather than just following: CSS classes and element structure change for styling/refactoring reasons that have nothing to do with test stability, while a data-cy attribute is a signal added specifically and only for testing purposes — nobody refactors CSS and accidentally removes a data-* testing attribute the way they might rename a class during a redesign. This is functionally the same underlying philosophy as Playwright's role/accessible-name-first recommendation (Part 2, Chapter 5 of your Playwright manual) — both are trying to decouple test stability from implementation-detail churn — they just arrive at different mechanisms: Playwright leans on the accessibility tree (which has the side benefit of double-checking a11y), Cypress leans on a dedicated custom attribute (which requires deliberate developer buy-in to add across the codebase, but is arguably even more explicit and unambiguous once present).\n\nWorth flagging honestly: the data-cy convention requires cooperation from whoever's writing the application code — if Bizlevate's frontend developers aren't already adding these attributes, adopting this convention means either asking them to add data-cy attributes as part of normal development going forward, or falling back to less stable CSS/text-based selectors for existing markup you can't easily change.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/references/best-practices",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Which selector strategy is most recommended for Cypress suites?",
            "options": [
              "div > form > button:nth-child(3)",
              "data-cy / data-testid attributes",
              "XPath only",
              "CSS class names that mirror Tailwind utilities"
            ],
            "answer": 1,
            "explain": "Dedicated test attributes like data-cy are the stability sweet spot."
          },
          "tryIt": null,
          "doThis": "Add data-cy attributes to two controls and rewrite selectors to use them.",
          "tip": "Prefer data-cy over classes that designers rename every sprint.",
          "code": "cy.get('[data-cy=submit-login]').click();",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "CSS selectors",
          "body": "When a data-cy attribute isn't available (existing markup, third-party components), Cypress's own docs suggest a rough preference order, worth internalizing as a checklist:",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": "Prefer data-cy over classes that designers rename every sprint.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "data-cy / data-test / data-testid attributes (most stable)",
          "body": "id attributes, if genuinely stable and unique on the page (some frameworks generate dynamic/random IDs — check first)\nSemantic attributes like name, type, aria-label (dual benefit: somewhat accessibility-aware, similar in spirit to Playwright's role-based approach)\nClass names — only as a last resort, since these are the most likely to change for purely visual/refactoring reasons unrelated to functionality",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/references/best-practices",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Best practices",
          "body": "A useful mental test before writing any selector: \"if a frontend developer redesigned this component's CSS and HTML structure tomorrow, purely for visual reasons, with zero functional change — would my selector still find the right element?\" If the honest answer is no, it's worth pushing for a data-cy attribute to be added rather than accepting a brittle selector as permanent.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": "Prefer data-cy over classes that designers rename every sprint.",
          "code": "// Fragile — breaks if styling classes change, or if there are multiple .btn.btn-primary on the page\ncy.get('.btn.btn-primary').click();\n\n// Fragile — breaks if the DOM structure is refactored even slightly\ncy.get('div > div > form > div:nth-child(3) > button').click();\n\n// Stable — survives styling refactors and structural changes\ncy.get('[data-cy=submit-login]').click();",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: data-cy attributes",
        "I can explain: CSS selectors",
        "I can explain: data-cy / data-test / data-testid attributes (most stable)"
      ],
      "practice": {
        "title": "Practice — Selector Strategies",
        "brief": "Add data-cy attributes to two controls and rewrite selectors to use them."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/references/best-practices",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Cypress's own official documentation is unusually opinionated (more so than Playwright's docs) about recommending a dedicated testing attribute, conventionally named data-cy (though data-test or data-testid are also common, just pick one and be consistent): html <button data-cy=\"submit-login\">Log In</button> The reasoning, worth understanding rather than just following: CSS classes and element structure change for st",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-12-chaining",
      "phase": "Part 2 · Core Commands & Locators",
      "level": "intermediate",
      "title": "12. Command Chaining & Retry-ability",
      "minutes": 40,
      "durationLabel": null,
      "overview": "Each command in a Cypress chain yields a subject to the next command — cy.get('.user-list') yields the matched element(s), .find('.user-row') searches within that yielded subject and yields its own result, and so on down the chain. This \"yielding\" concept is worth naming explicitly because it's the mechanism underneath everything — Cypress commands aren't independent statements, they're a pipeline where each step's o",
      "learn": [
        "Command chaining",
        "Retry-ability",
        "Query commands vs action commands vs assertion commands — a distinction worth naming ex…"
      ],
      "steps": [
        {
          "title": "Command chaining",
          "body": "Each command in a Cypress chain yields a subject to the next command — cy.get('.user-list') yields the matched element(s), .find('.user-row') searches within that yielded subject and yields its own result, and so on down the chain. This \"yielding\" concept is worth naming explicitly because it's the mechanism underneath everything — Cypress commands aren't independent statements, they're a pipeline where each step's output becomes the next step's input, similar in spirit to how a Unix pipe passes output between commands, or how Playwright's locator chaining (.filter(), nested .locator()) progressively narrows scope — just expressed as a flatter chain rather than nested method calls.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/core-concepts/retry-ability",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.get('.user-list')\n  .find('.user-row')\n  .first()\n  .find('.email')\n  .invoke('text')\n  .should('eq', 'john@example.com');",
          "codeTitle": "javascript",
          "items": null,
          "callout": {
            "label": "Interview angle",
            "body": "Be ready to explain the architectural why — not just the command syntax — when comparing Cypress to Playwright/Selenium.",
            "tone": "tip"
          },
          "aside": null
        },
        {
          "title": "Retry-ability",
          "body": "This is worth being precise about, since it's a common point of confusion: not every command in a chain retries independently — Cypress retries the entire chain from the last \"query\" command up through an assertion, re-running it as a whole unit until the assertion passes or times out.\n\nIf .item elements are still loading in via an async API call, Cypress doesn't just check once and fail — it re-runs cy.get('.item-list').find('.item') repeatedly, checking the length each time, until either 3 items appear or the timeout elapses. This is meaningfully different from action commands like .click(), which have their own separate actionability check (is the element visible, not covered, not disabled) but aren't themselves re-running a query — they're waiting for the already-found element to become actionable.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.get('.item-list')       // query command\n  .find('.item')            // query command\n  .should('have.length', 3); // assertion — triggers retry of the whole chain above it",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Query commands vs action commands vs assertion commands — a distinction worth naming explicitly",
          "body": "Cypress commands fall into three rough categories, worth categorizing mentally as you write chains:\n\nQuery commands (cy.get, .find, .contains, .first, .eq) — these search the DOM and yield a subject; they're the ones that actually get re-run during a retry.\nAction commands (.click, .type, .check, .select) — these perform an interaction on an already-yielded subject; they wait for actionability but don't re-query the DOM themselves.\nAssertion commands (.should, .and) — these check a condition against the current subject and are what triggers the retry-until-pass loop on the query commands feeding into them.\n\nUnderstanding this distinction directly explains a real gotcha: chaining an assertion after an action command (cy.get(...).click().should(...)) asserts on the state after the click, using whatever the click yielded — usually still fine, but worth being deliberate about, versus chaining the assertion earlier in the chain to gate the action itself (asserting an element is enabled before clicking it, rather than only checking something afterward).",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/core-concepts/retry-ability",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Command chaining",
        "I can explain: Retry-ability",
        "I can explain: Query commands vs action commands vs assertion commands — a distinction worth naming ex…"
      ],
      "practice": {
        "title": "Practice — Command Chaining & Retry-ability",
        "brief": "Apply one idea from “Command Chaining & Retry-ability” in a small Cypress experiment and note what surprised you."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/core-concepts/retry-ability",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Each command in a Cypress chain yields a subject to the next command — cy.get('.user-list') yields the matched element(s), .find('.user-row') searches within that yielded subject and yields its own result, and so on down the chain. This \"yielding\" concept is worth naming explicitly because it's the mechanism underneath everything — Cypress commands aren't independent statements, they're a pipeline where each step's o",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-13-aliases",
      "phase": "Part 2 · Core Commands & Locators",
      "level": "intermediate",
      "title": "13. Aliases",
      "minutes": 35,
      "durationLabel": null,
      "overview": "An alias created with .as() isn't merely a readable label — it's Cypress's mechanism for re-referencing a previously yielded subject without re-running the original query, though for DOM elements specifically, Cypress does actually re-query when you reference cy.get('@alias') (to guard against stale references if the DOM changed) — the real distinguishing power of aliases shows up with non-DOM subjects: intercepted r",
      "learn": [
        ".as()",
        "Aliasing intercepted routes",
        "Aliasing fixture data — reused across multiple test steps without re-loading the file",
        "Aliasing other things — elements, stubs (previewed, full depth later)"
      ],
      "steps": [
        {
          "title": ".as()",
          "body": "An alias created with .as() isn't merely a readable label — it's Cypress's mechanism for re-referencing a previously yielded subject without re-running the original query, though for DOM elements specifically, Cypress does actually re-query when you reference cy.get('@alias') (to guard against stale references if the DOM changed) — the real distinguishing power of aliases shows up with non-DOM subjects: intercepted routes (Chapter 23) and fixture data (Chapter 25), where re-fetching genuinely isn't happening and the alias is retrieving the exact stored value.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/core-concepts/variables-and-aliases",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Why can `function () {}` matter when using aliases with `this`?",
            "options": [
              "Arrow functions don’t bind `this`, so `this.alias` is undefined",
              "function keyword is banned in Cypress",
              "Aliases only work in before()",
              "this always refers to window"
            ],
            "answer": 0,
            "explain": "Use a regular function (not an arrow) when you need Mocha’s `this` for aliases."
          },
          "tryIt": null,
          "doThis": "Alias a network intercept and assert on cy.wait('@alias').",
          "tip": null,
          "code": "cy.get('.total-price').as('totalPrice');\n\n// later in the same test\ncy.get('@totalPrice').should('contain', '$49.99');",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Aliasing intercepted routes",
          "body": "This is worth flagging as the pattern you'll use constantly (previewed briefly in Part 0, full depth in Chapter 23): cy.wait('@getUsers') doesn't wait a fixed duration — it specifically pauses the test until the network request matching that named intercept actually completes, then yields the full intercepted request/response object, letting you assert on it directly (status code, response body, request payload). This has no single-line direct equivalent in Playwright, where you'd more typically use page.wait_for_response() matching a URL pattern.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.intercept('GET', '/api/users').as('getUsers');\ncy.visit('/users');\ncy.wait('@getUsers').its('response.statusCode').should('eq', 200);",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Aliasing fixture data — reused across multiple test steps without re-loading the file",
          "body": "Worth flagging a subtlety here: when using aliases with fixture data (or any custom alias you want to reference via this.aliasName instead of cy.get('@alias')), the enclosing test must use a regular function () {} rather than an arrow function — this is because Cypress attaches aliased values to Mocha's this context, and arrow functions don't bind their own this the way regular functions do. This is a genuinely common beginner gotcha worth knowing about before you hit it: an arrow-function test silently failing to find this.userData because this doesn't point where you'd expect.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/core-concepts/variables-and-aliases",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.fixture('users.json').as('userData');\n\nit('uses fixture data', function () {\n  cy.get('@userData').then((users) => {\n    cy.get('[data-cy=username]').type(users.valid_user.username);\n  });\n});",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Aliasing other things — elements, stubs (previewed, full depth later)",
          "body": "Aliases also work for aliasing reusable DOM element references you'll act on multiple times in one test, and for aliasing stubs/spies (a Sinon-Chai concept, Chapter 14) when testing whether a function was called correctly — same underlying .as()/cy.get('@alias') or cy.wait('@alias') mechanism applied to different kinds of subjects throughout the rest of this manual.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: .as()",
        "I can explain: Aliasing intercepted routes",
        "I can explain: Aliasing fixture data — reused across multiple test steps without re-loading the file"
      ],
      "practice": {
        "title": "Practice — Aliases",
        "brief": "Alias a network intercept and assert on cy.wait('@alias')."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/core-concepts/variables-and-aliases",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "An alias created with .as() isn't merely a readable label — it's Cypress's mechanism for re-referencing a previously yielded subject without re-running the original query, though for DOM elements specifically, Cypress does actually re-query when you reference cy.get('@alias') (to guard against stale references if the DOM changed) — the real distinguishing power of aliases shows up with non-DOM subjects: intercepted r",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-14-assertions",
      "phase": "Part 2 · Core Commands & Locators",
      "level": "intermediate",
      "title": "14. Assertions",
      "minutes": 40,
      "durationLabel": null,
      "overview": "should, expect — go deeper on the two distinct assertion styles and when each is idiomatic Cypress supports two different assertion syntaxes side by side, and knowing when each is idiomatic (rather than picking randomly) matters for writing code that reads the way experienced Cypress users expect: javascript // Implicit — chained directly onto a Cypress command, retries automatically cy.get('.cart-count').should('hav",
      "learn": [
        "Chai / Chai-jQuery / Sinon-Chai syntax",
        ".and() — chaining multiple assertions in one readable line, worth naming explicitly",
        "Implicit vs explicit"
      ],
      "steps": [
        {
          "title": "Chai / Chai-jQuery / Sinon-Chai syntax",
          "body": "should, expect — go deeper on the two distinct assertion styles and when each is idiomatic\n\nCypress supports two different assertion syntaxes side by side, and knowing when each is idiomatic (rather than picking randomly) matters for writing code that reads the way experienced Cypress users expect:\n\njavascript\n// Implicit — chained directly onto a Cypress command, retries automatically\ncy.get('.cart-count').should('have.text', '3');\n\n// Explicit (BDD-style) — wraps a value directly, does NOT retry\ncy.get('.cart-count').then(($el) => {\n  expect($el.text()).to.equal('3');\n});\n\nImplicit assertions (.should(), chained directly onto a command) are the default, idiomatic choice for almost everything — because they inherit Cypress's retry-ability (Chapter 12), re-checking the assertion against a freshly re-queried subject until it passes or times out.\n\nExplicit assertions (expect(), used inside a .then() callback) operate on a value you already have in hand at that exact instant — they check once, immediately, with no retry. This makes them the right choice specifically when you're asserting on a computed value or a plain JavaScript object/variable that isn't itself a live, changing Cypress-queried subject — for instance, asserting on the result of some arithmetic you did with fixture data, or on a non-DOM value returned from a custom command.\n\nA concrete rule of thumb worth internalizing: if what you're asserting on could still be loading, changing, or arriving asynchronously — use implicit .should() so you get the retry safety net. If you're asserting on something already fully resolved and static at that point in your test — expect() inside .then() is fine and often reads more naturally for multi-part checks.\n\nCypress's assertion language is actually three separate libraries layered together, each contributing different assertion keywords, worth knowing the provenance of so unfamiliar syntax makes sense when you encounter it:\n\nChai (the base) — general-purpose assertions usable on any JavaScript value: 'eq', 'equal', 'include', 'have.length', 'be.true', 'be.null', 'match' (regex).\nChai-jQuery (added because Cypress subjects are often jQuery-wrapped DOM elements) — DOM-specific assertions: 'have.text', 'have.value', 'be.visible', 'have.class', 'have.attr', 'be.checked', 'be.disabled'.\nSinon-Chai (added for spy/stub assertions, relevant once you're stubbing functions or intercepted requests) — assertions like 'have.been.called', 'have.been.calledWith', 'have.been.calledOnce'.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/references/assertions",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.get('.submit-button').should('be.visible').and('not.be.disabled');\ncy.get('.error-message').should('have.class', 'text-red-500');\ncy.get('[data-cy=email]').should('have.value', 'test@example.com');\ncy.get('@apiSpy').should('have.been.calledOnce');",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": ".and() — chaining multiple assertions in one readable line, worth naming explicitly",
          "body": ".and() is functionally identical to .should() — it's provided purely as a readability alias for chaining a second assertion onto the same subject without repeating .should() awkwardly:",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.get('.submit-button')\n  .should('be.visible')\n  .and('be.enabled')\n  .and('contain', 'Submit');",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Implicit vs explicit",
          "body": "This is worth treating as a genuine best-practice rule rather than a style preference: default to implicit .should() for anything touching the live DOM, and reserve explicit expect() specifically for the cases where you've already got a stable value in hand (inside a .then() doing further computation, or asserting on plain data) and retry-ability wouldn't add anything meaningful anyway.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/references/assertions",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "// Fragile: if the count takes a moment to update after an action, this fails immediately with no retry\ncy.get('.cart-count').then(($el) => {\n  expect($el.text()).to.equal('3');\n});\n\n// Robust: retries the whole get+assertion until it passes or times out\ncy.get('.cart-count').should('have.text', '3');",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Chai / Chai-jQuery / Sinon-Chai syntax",
        "I can explain: .and() — chaining multiple assertions in one readable line, worth naming explicitly",
        "I can explain: Implicit vs explicit"
      ],
      "practice": {
        "title": "Practice — Assertions",
        "brief": "Apply one idea from “Assertions” in a small Cypress experiment and note what surprised you."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/references/assertions",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "should, expect — go deeper on the two distinct assertion styles and when each is idiomatic Cypress supports two different assertion syntaxes side by side, and knowing when each is idiomatic (rather than picking randomly) matters for writing code that reads the way experienced Cypress users expect: javascript // Implicit — chained directly onto a Cypress command, retries automatically cy.get('.cart-count').should('hav",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-15-interacting",
      "phase": "Part 3 · Actions & Common Scenarios",
      "level": "intermediate",
      "title": "15. Interacting with Elements",
      "minutes": 40,
      "durationLabel": null,
      "overview": "Before performing a click, Cypress runs its own actionability checklist on the target element — conceptually parallel to Playwright's actionability checks (Part 2, Ch. 6 of your Playwright manual) but worth knowing Cypress's specific criteria: the element must not be display: none or otherwise hidden, must not have 0x0 dimensions, must not be covered by another element sitting on top of it, and must not be disabled.",
      "learn": [
        "click/dblclick/rightclick",
        "{ force: true }",
        "type/clear",
        "Force option"
      ],
      "steps": [
        {
          "title": "click/dblclick/rightclick",
          "body": "Before performing a click, Cypress runs its own actionability checklist on the target element — conceptually parallel to Playwright's actionability checks (Part 2, Ch. 6 of your Playwright manual) but worth knowing Cypress's specific criteria: the element must not be display: none or otherwise hidden, must not have 0x0 dimensions, must not be covered by another element sitting on top of it, and must not be disabled. If any of these fail, Cypress retries briefly (governed by defaultCommandTimeout, Chapter 9) before ultimately failing with a specific, readable error naming exactly which check failed — e.g., \"this element is being covered by another element\" — a similarly diagnostic error message to Playwright's own actionability failures.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/click",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.get('.submit-button').click();\ncy.get('.card').dblclick();\ncy.get('.file-item').rightclick();\n\n// with options\ncy.get('.submit-button').click({ force: true });\ncy.get('.grid').click(300, 200);              // click at specific coordinates within the element\ncy.get('.dropdown-item').click({ multiple: true }); // click all matched elements, not just one",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "{ force: true }",
          "body": "force: true skips all actionability checks entirely and clicks regardless of visibility/coverage state. This is worth treating with real caution, the same way Playwright's force=True deserves caution (Part 2, Ch.\n\n6): a genuinely common trap is reaching for force: true the moment a click fails, without investigating why it failed — which often means you're papering over a real bug (an overlapping loading spinner that never disappeared, an element that's actually invisible to real users too). Legitimate uses of force: true are narrower than beginners often assume — testing a hidden-but-functionally-present element (some custom checkbox/radio implementations visually hide the real <input> and style a sibling element instead, making the real input \"invisible\" by design, not by bug) is a fair case; routinely forcing clicks to work around unexplained failures is not.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Caution",
            "body": "Shortcuts that silence actionability or waiting often hide real product bugs. Prefer fixing selectors/state over force and fixed sleeps.",
            "tone": "warn"
          },
          "aside": null
        },
        {
          "title": "type/clear",
          "body": "Cypress's .type() fires real keyboard events per character by default (keydown, keypress, keyup, input) — unlike Playwright's split between fast .fill() and slower, event-accurate .type() (Part 2, Ch. 6 of your Playwright manual), Cypress doesn't offer a separate \"instant set value\" command as a first-class core action — .type() is the default, always firing real events. If you specifically need to bypass typing simulation and set a value instantly (useful for very long strings in a hurry, or fields you know don't have live keystroke listeners), the common workaround is .invoke('val', 'some value').trigger('input') — directly setting the DOM value via jQuery's .val() then manually firing an input event so any React/Vue reactive bindings still notice the change. Worth knowing this pattern exists since it comes up constantly with framework-controlled inputs.\n\nThe {curly brace} special-key syntax ({enter}, {backspace}, {esc}, {selectall}, {ctrl}, {shift}, etc.) is Cypress-specific and worth having as a quick mental reference — it's how you express non-printable keys and modifier combinations directly inline within the string passed to .type(), rather than a separate .press() call the way Playwright structures it.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/click",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.get('[data-cy=search]').type('laptop');\ncy.get('[data-cy=search]').clear().type('phone');\n\n// Special keys and modifiers, using {curly brace} syntax\ncy.get('[data-cy=notes]').type('Hello{enter}World');   // presses Enter mid-string\ncy.get('[data-cy=search]').type('{selectall}{backspace}'); // select all, then delete\ncy.get('body').type('{ctrl+a}');                        // modifier + key combo\n\ncy.get('[data-cy=search]').type('slow typing', { delay: 150 }); // ms between each keystroke",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Force option",
          "body": "{ force: true } is available on essentially every action command (.click(), .type(), .check(), .select()), not just clicks — the same caution about not defaulting to it applies uniformly across all of them.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Caution",
            "body": "Shortcuts that silence actionability or waiting often hide real product bugs. Prefer fixing selectors/state over force and fixed sleeps.",
            "tone": "warn"
          },
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: click/dblclick/rightclick",
        "I can explain: { force: true }",
        "I can explain: type/clear"
      ],
      "practice": {
        "title": "Practice — Interacting with Elements",
        "brief": "Apply one idea from “Interacting with Elements” in a small Cypress experiment and note what surprised you."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/api/commands/click",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Before performing a click, Cypress runs its own actionability checklist on the target element — conceptually parallel to Playwright's actionability checks (Part 2, Ch. 6 of your Playwright manual) but worth knowing Cypress's specific criteria: the element must not be display: none or otherwise hidden, must not have 0x0 dimensions, must not be covered by another element sitting on top of it, and must not be disabled.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-16-forms",
      "phase": "Part 3 · Actions & Common Scenarios",
      "level": "intermediate",
      "title": "16. Forms & Inputs",
      "minutes": 40,
      "durationLabel": null,
      "overview": "Worth calling out what makes this a good form test versus a shallow one: it asserts on the actual post-submit outcome (a visible success banner with specific text), not merely that the click didn't throw an error. A form test that only checks \"the submit button was clickable\" gives false confidence — the meaningful assertion is always about what happened as a result of the submission.",
      "learn": [
        "A representative full-form test",
        "Validation error states — a second, equally important test shape for any form",
        "Reading back a form's current values — useful for testing pre-filled/edit forms"
      ],
      "steps": [
        {
          "title": "A representative full-form test",
          "body": "Worth calling out what makes this a good form test versus a shallow one: it asserts on the actual post-submit outcome (a visible success banner with specific text), not merely that the click didn't throw an error. A form test that only checks \"the submit button was clickable\" gives false confidence — the meaningful assertion is always about what happened as a result of the submission.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/type",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "What is the main risk of `{ force: true }` on click/type?",
            "options": [
              "It makes tests faster and safer",
              "It bypasses actionability checks and can hide real UX bugs",
              "It is required for every click",
              "It only works in Firefox"
            ],
            "answer": 1,
            "explain": "force skips Cypress’s actionability guarantees — use sparingly and knowingly."
          },
          "tryIt": null,
          "doThis": "Automate one onboarding form happy path + one validation error.",
          "tip": null,
          "code": "describe('Employee Onboarding Form', () => {\n  it('submits successfully with valid data', () => {\n    cy.visit('/onboarding/new');\n\n    cy.get('[data-cy=first-name]').type('Simran');\n    cy.get('[data-cy=last-name]').type('Tamrakar');\n    cy.get('[data-cy=email]').type('simran@bizlevate.com');\n    cy.get('[data-cy=department]').select('Quality Assurance');\n    cy.get('[data-cy=start-date]').type('2026-09-01');\n    cy.get('[data-cy=remote-checkbox]').check();\n    cy.get('[data-cy=submit]').click();\n\n    cy.get('[data-cy=success-banner]').should('be.visible')\n      .and('contain', 'Employee onboarded successfully');\n  });\n});",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Validation error states — a second, equally important test shape for any form",
          "body": "Every form worth testing at all deserves at least one happy-path test and at least one validation-failure test — a form module (Leave requests, Onboarding, Appraisal forms in an HRM context) that only has happy-path coverage is a common, real gap worth deliberately avoiding.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "it('shows validation errors when required fields are empty', () => {\n  cy.visit('/onboarding/new');\n  cy.get('[data-cy=submit]').click();\n\n  cy.get('[data-cy=first-name-error]').should('contain', 'First name is required');\n  cy.get('[data-cy=email-error]').should('contain', 'Email is required');\n});",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Reading back a form's current values — useful for testing pre-filled/edit forms",
          "body": "'have.value' (a Chai-jQuery assertion, Chapter 14) is specifically for form input values — distinct from 'have.text' or 'contain', which check rendered text content, not an input's current value attribute. Mixing these up (asserting 'contain' on an <input>, expecting it to check the typed value) is a common early mistake, since <input> elements don't render their value as visible child text content the way a <div> does.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/type",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.get('[data-cy=email]').should('have.value', 'simran@bizlevate.com');",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: A representative full-form test",
        "I can explain: Validation error states — a second, equally important test shape for any form",
        "I can explain: Reading back a form's current values — useful for testing pre-filled/edit forms"
      ],
      "practice": {
        "title": "Practice — Forms & Inputs",
        "brief": "Automate one onboarding form happy path + one validation error."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/api/commands/type",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Worth calling out what makes this a good form test versus a shallow one: it asserts on the actual post-submit outcome (a visible success banner with specific text), not merely that the click didn't throw an error. A form test that only checks \"the submit button was clickable\" gives false confidence — the meaningful assertion is always about what happened as a result of the submission.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-17-checkboxes",
      "phase": "Part 3 · Actions & Common Scenarios",
      "level": "intermediate",
      "title": "17. Checkboxes, Radio Buttons, Dropdowns",
      "minutes": 35,
      "durationLabel": null,
      "overview": "check()/uncheck() — go deeper on targeting specific checkboxes among several javascript cy.get('[data-cy=remote-checkbox]').check(); cy.get('[data-cy=newsletter-checkbox]').uncheck(); // Checking specific checkboxes by value, when several share a selector cy.get('[data-cy=skills]').check(['Python', 'Playwright']); // Checking every checkbox matching a selector cy.get('input[type=\"checkbox\"]').check(); Like Playwright",
      "learn": [
        "Radio buttons",
        "Practice Checkboxes, Radio Buttons, Dropdowns",
        "Practice Checkboxes, Radio Buttons, Dropdowns"
      ],
      "steps": [
        {
          "title": "Radio buttons",
          "body": "check()/uncheck() — go deeper on targeting specific checkboxes among several\n\njavascript\ncy.get('[data-cy=remote-checkbox]').check();\ncy.get('[data-cy=newsletter-checkbox]').uncheck();\n\n// Checking specific checkboxes by value, when several share a selector\ncy.get('[data-cy=skills]').check(['Python', 'Playwright']);\n\n// Checking every checkbox matching a selector\ncy.get('input[type=\"checkbox\"]').check();\n\nLike Playwright's .check()/.uncheck() (Part 2, Ch. 6 of your Playwright manual), Cypress's versions are idempotent — calling .check() on an already-checked box doesn't toggle it off, unlike .click(), which would. The array-argument form (.check(['Python', 'Playwright'])) is genuinely convenient for multi-select checkbox groups sharing a common selector but distinguished by their value attribute — worth knowing this exists rather than writing a separate .check() call per checkbox.\n\nRadio buttons within the same name group are mutually exclusive by browser-native behavior — checking one automatically unchecks any sibling in the same group, so you don't need (and can't meaningfully call) .uncheck() on a radio button the way you can on a checkbox; selecting a different radio button in the group is the only way to \"uncheck\" a previously selected one.\n\nselect() — go deeper on native <select> limitations, same fundamental boundary as Playwright\n\nSame fundamental boundary as Playwright's .select_option() (Part 2, Ch. 6 of your Playwright manual): .select() only works on native HTML <select> elements. A custom-built dropdown (a styled <div> with a click-to-open list of <li> options — extremely common in modern component libraries, including most React-based design systems) isn't a real <select> at all, so .select() will simply fail to find a matching option. For those, treat it like any other clickable UI: click to open the dropdown, then cy.contains('.dropdown-option', 'Quality Assurance').click() to pick the visible option — this is worth anticipating specifically for an HRM system's likely component library (custom dropdowns are near-universal in modern admin dashboards) rather than assuming .select() will just work.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/check",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.get('[data-cy=employment-type]').check('full-time');\n\ncy.get('[data-cy=department]').select('Quality Assurance');  // by visible text\ncy.get('[data-cy=department]').select('qa');                  // by value attribute\ncy.get('[data-cy=skills-multiselect]').select(['Python', 'Cypress']); // multi-select",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Radio buttons",
        "I can explain: Practice Checkboxes, Radio Buttons, Dropdowns",
        "I can explain: Practice Checkboxes, Radio Buttons, Dropdowns"
      ],
      "practice": {
        "title": "Practice — Checkboxes, Radio Buttons, Dropdowns",
        "brief": "Apply one idea from “Checkboxes, Radio Buttons, Dropdowns” in a small Cypress experiment and note what surprised you."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/api/commands/check",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "check()/uncheck() — go deeper on targeting specific checkboxes among several javascript cy.get('[data-cy=remote-checkbox]').check(); cy.get('[data-cy=newsletter-checkbox]').uncheck(); // Checking specific checkboxes by value, when several share a selector cy.get('[data-cy=skills]').check(['Python', 'Playwright']); // Checking every checkbox matching a selector cy.get('input[type=\"checkbox\"]').check(); Like Playwright",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-18-iframes",
      "phase": "Part 3 · Actions & Common Scenarios",
      "level": "intermediate",
      "title": "18. iframes",
      "minutes": 35,
      "durationLabel": null,
      "overview": "Cypress's in-browser execution model (Part 0) means its test code runs in the top-level page's JavaScript context — an iframe is, by browser design, a genuinely separate document with its own isolated JS context, even when same-origin. Cypress's own cy.get() and friends cannot see inside an iframe by default at all — this is a more restrictive starting position than Playwright, which has first-class frame_locator() s",
      "learn": [
        "The core limitation",
        "cypress-iframe plugin — the standard workaround",
        "Worth being honest about the trade-off here"
      ],
      "steps": [
        {
          "title": "The core limitation",
          "body": "Cypress's in-browser execution model (Part 0) means its test code runs in the top-level page's JavaScript context — an iframe is, by browser design, a genuinely separate document with its own isolated JS context, even when same-origin. Cypress's own cy.get() and friends cannot see inside an iframe by default at all — this is a more restrictive starting position than Playwright, which has first-class frame_locator() support built directly into its core API (Part 2, Ch. 9 of your Playwright manual) precisely because Playwright's external-driver architecture doesn't have this same-JS-context constraint to begin with.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/guides/web-security",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Trade-off",
            "body": "Cypress’s in-browser model buys DX and visibility; it also creates hard limits (multi-tab, some cross-origin, no WebKit). Choose tools for the scenario.",
            "tone": "warn"
          },
          "aside": null
        },
        {
          "title": "cypress-iframe plugin — the standard workaround",
          "body": "cypress-iframe is a community plugin (not built into Cypress core) that patches around the limitation by using jQuery to reach into the iframe's contentDocument directly. cy.frameLoaded() waits for the iframe's content to finish loading before you interact with it; cy.iframe() then gives you a jQuery-wrapped entry point into that frame's DOM you can chain further Cypress-style commands onto.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "// npm install -D cypress-iframe\n// in cypress/support/e2e.js:\nimport 'cypress-iframe';\n\n// in a test:\ncy.frameLoaded('#payment-iframe');\ncy.iframe('#payment-iframe').find('[data-cy=card-number]').type('4242424242424242');",
          "codeTitle": "javascript",
          "items": null,
          "callout": {
            "label": "Trade-off",
            "body": "Cypress’s in-browser model buys DX and visibility; it also creates hard limits (multi-tab, some cross-origin, no WebKit). Choose tools for the scenario.",
            "tone": "warn"
          },
          "aside": null
        },
        {
          "title": "Worth being honest about the trade-off here",
          "body": "This is exactly the kind of scenario flagged back in Part 0 as a case worth recognizing when Cypress is fighting its own architecture: same-origin iframes work reasonably with cypress-iframe, but cross-origin iframes (a real third-party payment widget like Stripe or PayPal embedded via iframe, which is extremely common specifically because of PCI-compliance requirements) are dramatically harder to reach reliably from Cypress, sometimes requiring additional workarounds or simply being untestable end-to-end through Cypress at all — versus Playwright's frame_locator(), which handles same-origin and cross-origin iframes with identical, unremarkable syntax. If Bizlevate's TADA expense system or HRM payroll module ever integrates a real third-party payment iframe, this is a concrete, decisive point in Playwright's favor worth remembering.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/guides/web-security",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Trade-off",
            "body": "Cypress’s in-browser model buys DX and visibility; it also creates hard limits (multi-tab, some cross-origin, no WebKit). Choose tools for the scenario.",
            "tone": "warn"
          },
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: The core limitation",
        "I can explain: cypress-iframe plugin — the standard workaround",
        "I can explain: Worth being honest about the trade-off here"
      ],
      "practice": {
        "title": "Practice — iframes",
        "brief": "Apply one idea from “iframes” in a small Cypress experiment and note what surprised you."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/guides/web-security",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Cypress's in-browser execution model (Part 0) means its test code runs in the top-level page's JavaScript context — an iframe is, by browser design, a genuinely separate document with its own isolated JS context, even when same-origin. Cypress's own cy.get() and friends cannot see inside an iframe by default at all — this is a more restrictive starting position than Playwright, which has first-class frame_locator() s",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-19-files",
      "phase": "Part 3 · Actions & Common Scenarios",
      "level": "intermediate",
      "title": "19. File Uploads & Downloads",
      "minutes": 35,
      "durationLabel": null,
      "overview": "Worth knowing the history briefly since older tutorials/StackOverflow answers reference it: for a long time, Cypress had no built-in file-upload command at all, and the community plugin cypress-file-upload was the standard, near-universal workaround — you'll still see it referenced constantly in older content. Cypress added .selectFile() as a genuine built-in core command starting at version 9.3, making the plugin no",
      "learn": [
        "File uploads",
        "File downloads",
        "The practical workaround pattern most Cypress suites use:"
      ],
      "steps": [
        {
          "title": "File uploads",
          "body": "Worth knowing the history briefly since older tutorials/StackOverflow answers reference it: for a long time, Cypress had no built-in file-upload command at all, and the community plugin cypress-file-upload was the standard, near-universal workaround — you'll still see it referenced constantly in older content. Cypress added .selectFile() as a genuine built-in core command starting at version 9.3, making the plugin no longer necessary for most use cases — worth using the built-in version going forward rather than adding an unnecessary extra dependency, but recognizing the plugin syntax when you encounter it in older material.\n\nThe { action: 'drag-drop' } option specifically simulates a drag-and-drop file upload interaction (common for modern \"drop your file here\" upload zones) rather than the default behavior of setting the file directly on a hidden <input type=\"file\">, which matters if the upload zone's JavaScript specifically listens for drop events rather than a plain input change event.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/selectfile",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "How do you typically attach a file in modern Cypress?",
            "options": [
              "cy.upload()",
              "cy.selectFile()",
              "input.sendKeys",
              "page.set_input_files"
            ],
            "answer": 1,
            "explain": "Built-in cy.selectFile replaced older plugin-based upload patterns."
          },
          "tryIt": null,
          "doThis": "Use cy.selectFile on a fixture and assert the UI acknowledges the upload.",
          "tip": null,
          "code": "// Cypress 9.3+ has a built-in .selectFile() command — no plugin needed\ncy.get('[data-cy=resume-upload]').selectFile('cypress/fixtures/resume.pdf');\n\n// Multiple files\ncy.get('[data-cy=attachments]').selectFile([\n  'cypress/fixtures/file1.png',\n  'cypress/fixtures/file2.png',\n]);\n\n// Drag-and-drop style upload zones\ncy.get('[data-cy=drop-zone]').selectFile('cypress/fixtures/resume.pdf', { action: 'drag-drop' });",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "File downloads",
          "body": "This is worth being direct about as a real architectural gap: Cypress has no first-class \"wait for and inspect a download\" API the way Playwright's page.expect_download() (Part 2, Ch. 10 of your Playwright manual) does. Because Cypress runs inside the browser, and browser-native file downloads happen at the OS/browser-chrome level (outside the page's own JS context entirely), Cypress's visibility into an in-progress download is inherently limited.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Trade-off",
            "body": "Cypress’s in-browser model buys DX and visibility; it also creates hard limits (multi-tab, some cross-origin, no WebKit). Choose tools for the scenario.",
            "tone": "warn"
          },
          "aside": null
        },
        {
          "title": "The practical workaround pattern most Cypress suites use:",
          "body": "Rather than intercepting a \"download\" event the way Playwright does, Cypress's approach is: let the browser actually save the file to its configured downloads folder (cypress/downloads/ by default, Chapter 6), then use cy.readFile() to poll for that file's existence and inspect its actual contents directly from disk. cy.readFile() itself has retry-ability built in (the { timeout: 10000 } option extends how long it'll keep checking for the file to appear), which covers the \"wait for the download to finish\" need reasonably well in practice, even without a dedicated download-event API.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/selectfile",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "const downloadsFolder = 'cypress/downloads';\nconst path = require('path');\n\nit('downloads a payroll report', () => {\n  cy.get('[data-cy=download-report]').click();\n\n  const filePath = path.join(downloadsFolder, 'payroll-report.csv');\n  cy.readFile(filePath, { timeout: 10000 }).should('exist');\n  cy.readFile(filePath).should('contain', 'Employee ID');\n});",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: File uploads",
        "I can explain: File downloads",
        "I can explain: The practical workaround pattern most Cypress suites use:"
      ],
      "practice": {
        "title": "Practice — File Uploads & Downloads",
        "brief": "Use cy.selectFile on a fixture and assert the UI acknowledges the upload."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/api/commands/selectfile",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Worth knowing the history briefly since older tutorials/StackOverflow answers reference it: for a long time, Cypress had no built-in file-upload command at all, and the community plugin cypress-file-upload was the standard, near-universal workaround — you'll still see it referenced constantly in older content. Cypress added .selectFile() as a genuine built-in core command starting at version 9.3, making the plugin no",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-20-alerts",
      "phase": "Part 3 · Actions & Common Scenarios",
      "level": "intermediate",
      "title": "20. Alerts, Confirms, Prompts",
      "minutes": 30,
      "durationLabel": null,
      "overview": "This is one of the more genuinely surprising differences from Playwright worth knowing upfront: Cypress automatically accepts/dismisses native browser dialogs (alert(), confirm(), prompt()) without you doing anything at all — specifically, window.alert() calls are auto-accepted (the message is logged to the Command Log but the test continues immediately), and window.confirm() calls are auto-accepted (equivalent to cl",
      "learn": [
        "Native dialogs",
        "Overriding the default — testing the \"Cancel\" path, or asserting on the dialog's message",
        "Practice Alerts, Confirms, Prompts"
      ],
      "steps": [
        {
          "title": "Native dialogs",
          "body": "This is one of the more genuinely surprising differences from Playwright worth knowing upfront: Cypress automatically accepts/dismisses native browser dialogs (alert(), confirm(), prompt()) without you doing anything at all — specifically, window.alert() calls are auto-accepted (the message is logged to the Command Log but the test continues immediately), and window.confirm() calls are auto-accepted (equivalent to clicking \"OK\") by default too. This is the opposite default from Playwright, where an unhandled dialog blocks the page and times out the test (Part 2, Ch. 11 of your Playwright manual) unless you explicitly register a handler.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/events/catalog-of-events",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "// If your app calls window.confirm('Are you sure you want to delete this?') on button click,\n// Cypress auto-clicks \"OK\" — no code needed at all for the happy path:\ncy.get('[data-cy=delete-account]').click();\ncy.get('[data-cy=account-deleted-message]').should('be.visible');",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Overriding the default — testing the \"Cancel\" path, or asserting on the dialog's message",
          "body": "window.prompt() — go deeper since it needs its own handling for the \"typed value\" case\n\nprompt() dialogs (asking the user to type a value, not just confirm/cancel) need a slightly different approach — rather than a cy.on() event handler, the idiomatic pattern is cy.stub() (a Sinon-based stubbing utility, previewed here, more depth in Chapter 31's debugging tools and general Sinon-Chai usage from Chapter 14) directly replacing the browser's real window.prompt function with one that returns a fixed value immediately, since Cypress doesn't have a dedicated prompt-specific event the way it does for alert/confirm.\n\nWorth flagging the philosophical contrast explicitly, tying back to Part 0\n\nCypress's \"auto-accept by default, opt-in to override\" approach versus Playwright's \"block and fail by default, opt-in to handle\" approach is a small but genuine illustration of each tool's underlying philosophy: Cypress optimizes for not blocking your test's forward progress unexpectedly (a dialog you didn't anticipate won't silently hang your whole suite), while Playwright optimizes for making you consciously aware of every dialog your app produces (an unhandled dialog is treated as something worth investigating, not silently clicked through). Neither is strictly safer — Cypress's default could theoretically mask a confirm dialog you didn't realize was firing; Playwright's default forces you to know about every single one up front.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.on('window:confirm', (text) => {\n  expect(text).to.equal('Are you sure you want to delete this?');\n  return false;  // returning false simulates clicking \"Cancel\" instead of the default auto-accept\n});\n\ncy.get('[data-cy=delete-account]').click();\ncy.get('[data-cy=account-still-active]').should('be.visible');\n\ncy.on('window:alert', (text) => {\n  expect(text).to.contain('Item successfully saved');\n});\n\ncy.on('window:confirm', handler) — registering a handler here overrides Cypress's default auto-accept behavior for the current test. Returning false from the handler simulates a user clicking \"Cancel\" instead; returning nothing (or true) preserves the accept behavior while still letting you assert on the dialog's message text as a side effect.\n\ncy.window().then((win) => {\n  cy.stub(win, 'prompt').returns('My typed answer');\n});\ncy.get('[data-cy=rename-button]').click();",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Native dialogs",
        "I can explain: Overriding the default — testing the \"Cancel\" path, or asserting on the dialog's message",
        "I can explain: Practice Alerts, Confirms, Prompts"
      ],
      "practice": {
        "title": "Practice — Alerts, Confirms, Prompts",
        "brief": "Apply one idea from “Alerts, Confirms, Prompts” in a small Cypress experiment and note what surprised you."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/api/events/catalog-of-events",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "This is one of the more genuinely surprising differences from Playwright worth knowing upfront: Cypress automatically accepts/dismisses native browser dialogs (alert(), confirm(), prompt()) without you doing anything at all — specifically, window.alert() calls are auto-accepted (the message is logged to the Command Log but the test continues immediately), and window.confirm() calls are auto-accepted (equivalent to cl",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-21-cookies",
      "phase": "Part 3 · Actions & Common Scenarios",
      "level": "intermediate",
      "title": "21. Cookies & Local Storage",
      "minutes": 35,
      "durationLabel": null,
      "overview": "Cypress has built-in first-class cookie commands (cy.setCookie, cy.getCookie, cy.clearCookie, and their plural forms) — no plugin needed, similar in convenience to Playwright's context.add_cookies()/context.cookies(). Worth knowing the default isolation behavior: by default, Cypress automatically clears cookies before each test (configurable via testIsolation in newer Cypress versions), giving you test-to-test isolat",
      "learn": [
        "Cookies",
        "Local storage",
        "Tying forward to session reuse"
      ],
      "steps": [
        {
          "title": "Cookies",
          "body": "Cypress has built-in first-class cookie commands (cy.setCookie, cy.getCookie, cy.clearCookie, and their plural forms) — no plugin needed, similar in convenience to Playwright's context.add_cookies()/context.cookies(). Worth knowing the default isolation behavior: by default, Cypress automatically clears cookies before each test (configurable via testIsolation in newer Cypress versions), giving you test-to-test isolation similar in spirit to Playwright's fresh-BrowserContext-per-test default (Part 1, Ch. 3 of your Playwright manual) — just achieved through explicit cookie-clearing rather than Playwright's fuller context-level isolation (which also isolates localStorage, cache, and permissions, not just cookies).",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/setcookie",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.setCookie('session_token', 'abc123');\ncy.getCookie('session_token').should('have.property', 'value', 'abc123');\ncy.getCookies();          // all cookies for the current domain\ncy.clearCookie('session_token');\ncy.clearCookies();        // clears all",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Local storage",
          "body": "Worth knowing the history briefly: Cypress didn't have built-in localStorage commands for a long time, and directly manipulating window.localStorage via cy.window() was the standard workaround for years. Recent Cypress versions (12+) added first-class commands:",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.window().then((win) => {\n  win.localStorage.setItem('theme', 'dark');\n});\n\n// Newer built-in commands (Cypress 12+)\ncy.setLocalStorage('theme', 'dark');\ncy.getLocalStorage('theme').should('eq', 'dark');\ncy.clearLocalStorage();\n\nThe cy.window().then((win) => { win.localStorage... }) pattern is worth understanding even if you use the newer built-in commands going forward, since it's the more general escape hatch pattern (directly touching the real browser window object) that you'll reach for constantly elsewhere too — it's the same underlying technique used for the prompt() stubbing in Chapter 20 and for reading/writing anything else on window that Cypress doesn't have a dedicated command for.",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Tying forward to session reuse",
          "body": "Cookies and localStorage manipulation are the literal building blocks underneath Cypress's higher-level cy.session() command (Chapter 26) — cy.session() is essentially a smart wrapper that caches and restores exactly this kind of cookie/localStorage state between tests, similar in purpose to Playwright's storage_state (Part 4, Ch. 20 of your Playwright manual), so understanding the raw commands here directly sets up why cy.session() works the way it does later.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/setcookie",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Cookies",
        "I can explain: Local storage",
        "I can explain: Tying forward to session reuse"
      ],
      "practice": {
        "title": "Practice — Cookies & Local Storage",
        "brief": "Apply one idea from “Cookies & Local Storage” in a small Cypress experiment and note what surprised you."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/api/commands/setcookie",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Cypress has built-in first-class cookie commands (cy.setCookie, cy.getCookie, cy.clearCookie, and their plural forms) — no plugin needed, similar in convenience to Playwright's context.add_cookies()/context.cookies(). Worth knowing the default isolation behavior: by default, Cypress automatically clears cookies before each test (configurable via testIsolation in newer Cypress versions), giving you test-to-test isolat",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-22-waiting",
      "phase": "Part 3 · Actions & Common Scenarios",
      "level": "intermediate",
      "title": "22. Waiting Strategies",
      "minutes": 35,
      "durationLabel": null,
      "overview": "For the very common case where you're simply waiting for some element to eventually appear/change after an action — not specifically needing to inspect the network call itself — Cypress's built-in retry-ability (Chapter 12) on .should() already handles this with no explicit wait needed at all, exactly mirroring Playwright's \"auto-waiting means you rarely need manual waits\" principle (Part 2, Ch. The decision tree wor",
      "learn": [
        "The core anti-pattern, stated plainly upfront",
        "The correct pattern — aliased network waits, tying directly back to Chapter 13",
        "Leaning on built-in retry-ability instead of any explicit wait at all — the actual best…"
      ],
      "steps": [
        {
          "title": "The core anti-pattern, stated plainly upfront",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/wait",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "What is the preferred alternative to `cy.wait(5000)`?",
            "options": [
              "Longer numeric waits",
              "Waiting on an aliased network call or asserting with retrying `.should()`",
              "Only using Selenium sleeps",
              "Disabling all waits"
            ],
            "answer": 1,
            "explain": "Prefer cy.wait('@alias') or retrying assertions over fixed sleeps."
          },
          "tryIt": null,
          "doThis": "Replace one numeric cy.wait with an @alias wait or retrying .should().",
          "tip": "If you need a number in cy.wait, you probably need an assertion or an alias instead.",
          "code": "// Avoid this:\ncy.get('[data-cy=submit]').click();\ncy.wait(3000);   // hope 3 seconds is enough\ncy.get('[data-cy=success-message]').should('be.visible');\n\ncy.wait(<number>) — waiting a fixed, arbitrary number of milliseconds — is Cypress's version of the exact same anti-pattern flagged in Playwright's manual (Part 2, Ch. 8): too short and the test is flaky, too long and every run wastes time even when the app responded instantly. It's worth being extra clear that this applies to cy.wait() only when passed a plain number — the exact same command name has a completely different, legitimate meaning when passed an alias (covered next), which is a real source of confusion for newcomers skimming code and seeing cy.wait(...) used in two apparently contradictory ways.",
          "codeTitle": "javascript",
          "items": null,
          "callout": {
            "label": "Caution",
            "body": "Shortcuts that silence actionability or waiting often hide real product bugs. Prefer fixing selectors/state over force and fixed sleeps.",
            "tone": "warn"
          },
          "aside": null
        },
        {
          "title": "The correct pattern — aliased network waits, tying directly back to Chapter 13",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.intercept('GET', '/api/dashboard-data').as('dashboardData');\ncy.visit('/dashboard');\ncy.wait('@dashboardData');   // waits for this specific network call to complete — not a fixed duration\ncy.get('[data-cy=success-message]').should('be.visible');\n\ncy.wait('@alias') — passed a string alias rather than a number — behaves completely differently: it pauses the test until the specific aliased network request actually completes, however long that genuinely takes, then continues immediately. This is the Cypress-idiomatic replacement for \"just wait a few seconds and hope\" — instead of guessing at a duration, you wait for the actual event (a specific API call finishing) that indicates the page is truly ready to interact with. Full cy.intercept()/cy.wait('@alias') reference lives in Chapter 23, but the core waiting-strategy principle belongs here alongside the anti-pattern it replaces.",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Leaning on built-in retry-ability instead of any explicit wait at all — the actual best default",
          "body": "For the very common case where you're simply waiting for some element to eventually appear/change after an action — not specifically needing to inspect the network call itself — Cypress's built-in retry-ability (Chapter 12) on .should() already handles this with no explicit wait needed at all, exactly mirroring Playwright's \"auto-waiting means you rarely need manual waits\" principle (Part 2, Ch. 8 of your Playwright manual). The decision tree worth internalizing: if you just need to wait for UI to reflect a change, lean on .should()'s built-in retry and add no explicit wait; if you specifically need to assert on or synchronize with the underlying network call itself (status code, response payload, or genuinely flaky timing tied to a slow backend), reach for cy.intercept().as() + cy.wait('@alias'); never reach for a bare numeric cy.wait() as a first resort.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/wait",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "// No wait needed at all — .should() already retries until the element/text appears:\ncy.get('[data-cy=submit]').click();\ncy.get('[data-cy=success-message]').should('be.visible');",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: The core anti-pattern, stated plainly upfront",
        "I can explain: The correct pattern — aliased network waits, tying directly back to Chapter 13",
        "I can explain: Leaning on built-in retry-ability instead of any explicit wait at all — the actual best…"
      ],
      "practice": {
        "title": "Practice — Waiting Strategies",
        "brief": "Replace one numeric cy.wait with an @alias wait or retrying .should()."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/api/commands/wait",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "For the very common case where you're simply waiting for some element to eventually appear/change after an action — not specifically needing to inspect the network call itself — Cypress's built-in retry-ability (Chapter 12) on .should() already handles this with no explicit wait needed at all, exactly mirroring Playwright's \"auto-waiting means you rarely need manual waits\" principle (Part 2, Ch. The decision tree wor",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-23-network",
      "phase": "Part 4 · Advanced Techniques",
      "level": "intermediate",
      "title": "23. Network Interception & Mocking",
      "minutes": 45,
      "durationLabel": null,
      "overview": "The { fixture: 'users.json' } shorthand is a distinctly Cypress convenience worth knowing well — it loads the named file directly from cypress/fixtures/ (Chapter 25) and uses its contents as the mocked response body, in one line, without a separate cy.fixture() call and manual wiring the way you might expect. This single-line fixture-as-mock-response pattern is extremely common in real Cypress suites and worth defaul",
      "learn": [
        "cy.intercept() basics",
        "Stubbing (fulfilling) responses",
        "Delaying and forcing errors",
        "Spying",
        "Modifying requests/responses in flight"
      ],
      "steps": [
        {
          "title": "cy.intercept() basics",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/intercept",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Stub a GET with cy.intercept + fixture and wait on the alias.",
          "tip": null,
          "code": "cy.intercept('GET', '/api/users');\ncy.intercept('GET', '**/api/users/*');           // glob wildcard matching\ncy.intercept({ method: 'POST', url: '/api/leave-requests' });\ncy.intercept('GET', /\\/api\\/users\\/\\d+/);         // regex matching\n\ncy.intercept() registers an interception rule for network requests matching a method + URL pattern, functionally parallel to Playwright's page.route() (Part 4, Ch. 17 of your Playwright manual) but with a meaningfully different underlying mechanism worth understanding: because Cypress runs inside the browser, cy.intercept() works by patching the browser's own fetch/XMLHttpRequest implementations at the page level, rather than Playwright's approach of intercepting at the network-proxy layer outside the browser entirely. The practical consequence: Cypress's interception is reliably scoped to requests the page's own JavaScript initiates (fetch/XHR) — it does not intercept things like direct browser navigation requests, some service-worker-originated requests, or non-fetch/XHR network activity as comprehensively as Playwright's lower-level proxy approach can. For the overwhelming majority of typical API-mocking scenarios (an app calling its own backend via fetch/axios) this distinction rarely matters in practice, but it's worth knowing as a boundary if you ever hit a request that stubbornly won't intercept.",
          "codeTitle": "javascript",
          "items": null,
          "callout": {
            "label": "Interview angle",
            "body": "Be ready to explain the architectural why — not just the command syntax — when comparing Cypress to Playwright/Selenium.",
            "tone": "tip"
          },
          "aside": null
        },
        {
          "title": "Stubbing (fulfilling) responses",
          "body": "The { fixture: 'users.json' } shorthand is a distinctly Cypress convenience worth knowing well — it loads the named file directly from cypress/fixtures/ (Chapter 25) and uses its contents as the mocked response body, in one line, without a separate cy.fixture() call and manual wiring the way you might expect. This single-line fixture-as-mock-response pattern is extremely common in real Cypress suites and worth defaulting to over manually constructing inline response objects whenever the mock data is reusable across more than one test.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.intercept('GET', '/api/users', {\n  statusCode: 200,\n  body: { users: [{ id: 1, name: 'Test User' }] },\n}).as('getUsers');\n\n// Shorthand — a plain object/array is treated as a 200 JSON response body directly:\ncy.intercept('GET', '/api/users', { users: [{ id: 1, name: 'Test User' }] }).as('getUsers');\n\n// Using a fixture file directly as the mocked response body\ncy.intercept('GET', '/api/users', { fixture: 'users.json' }).as('getUsers');",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Delaying and forcing errors",
          "body": "Worth distinguishing these three scenarios explicitly, since they exercise genuinely different code paths in a well-built app: a delayed response tests whether your loading states (spinners, skeleton screens, disabled buttons during submission) actually render and behave correctly — a surprisingly common gap, since developers often test against a fast local backend that never triggers the loading state long enough to notice a bug in it. A mocked error status (500, 403, 404) tests your app's error-handling UI — does it show a helpful message, or does it silently fail or crash? A forced network error (forceNetworkError: true) simulates the request never completing at all (DNS failure, connection refused), a distinct failure mode from \"the server responded but with bad news,\" and worth testing separately if your app has any retry logic or offline-handling behavior.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/intercept",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "// Simulate a slow network — useful for testing loading spinners/skeleton states\ncy.intercept('GET', '/api/dashboard-data', (req) => {\n  req.reply({ delay: 3000, body: { stats: {} } });\n}).as('slowDashboard');\n\n// Simulate a server error\ncy.intercept('GET', '/api/payroll-summary', { statusCode: 500, body: { error: 'Internal server error' } }).as('payrollError');\n\n// Simulate a total network failure (not just an error status)\ncy.intercept('GET', '/api/payroll-summary', { forceNetworkError: true }).as('networkDown');",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Spying",
          "body": "This is an important distinction worth naming explicitly: calling cy.intercept() without providing a response/stub doesn't mock anything — it lets the real request go to the real backend, but still gives you visibility into it via the alias (request payload, response body, status code, timing). This \"spy without stubbing\" mode is genuinely useful when you want to verify your frontend sent the correct request payload to a real backend during an integration-style test, without wanting to fake the response — a middle ground between a pure unit-style mocked test and a full black-box UI-only test.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "// Spy only — let the real request go through, but still track it for assertions\ncy.intercept('POST', '/api/leave-requests').as('createLeaveRequest');\n\ncy.get('[data-cy=submit-leave-request]').click();\ncy.wait('@createLeaveRequest').then((interception) => {\n  expect(interception.request.body).to.include({ leaveType: 'Annual' });\n  expect(interception.response.statusCode).to.eq(201);\n});",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Modifying requests/responses in flight",
          "body": "res.body.featureFlags.newPayrollUI = true;  // force a feature flag on, regardless of real backend value\n\nThe object yielded by cy.wait('@alias') gives you full read access to both the actual outgoing request (headers, URL, body) and the response (status, body, timing) — worth using this to assert not just \"the app looks right\" but \"the app sent the correct request,\" which is a meaningfully stronger, more precise test than UI-only assertions alone, especially for anything involving query parameters, pagination, or request payload correctness.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/intercept",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.intercept('GET', '/api/dashboard-data', (req) => {\n  req.reply((res) => {\n\n  });\n});\n\nThis callback-based form (req.reply((res) => {...})) lets you take the real response the backend actually sent and selectively modify part of it before it reaches your app — useful for testing a specific feature-flag-gated UI state without needing the real backend to actually have that flag configured, while still exercising the rest of a genuine, unmocked API response.\n\ncy.wait('@alias') deep reference — go deeper on the yielded interception object\n\ncy.wait('@getUsers').then((interception) => {\n  expect(interception.request.headers).to.have.property('authorization');\n  expect(interception.request.url).to.include('page=1');\n  expect(interception.response.statusCode).to.eq(200);\n  expect(interception.response.body.users).to.have.length(3);\n});\n\n// Waiting for multiple occurrences of the same aliased route\ncy.wait(['@getUsers', '@getUsers']);   // waits for it to fire twice",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: cy.intercept() basics",
        "I can explain: Stubbing (fulfilling) responses",
        "I can explain: Delaying and forcing errors"
      ],
      "practice": {
        "title": "Practice — Network Interception & Mocking",
        "brief": "Stub a GET with cy.intercept + fixture and wait on the alias."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/api/commands/intercept",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "The { fixture: 'users.json' } shorthand is a distinctly Cypress convenience worth knowing well — it loads the named file directly from cypress/fixtures/ (Chapter 25) and uses its contents as the mocked response body, in one line, without a separate cy.fixture() call and manual wiring the way you might expect. This single-line fixture-as-mock-response pattern is extremely common in real Cypress suites and worth defaul",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-24-api",
      "phase": "Part 4 · Advanced Techniques",
      "level": "intermediate",
      "title": "24. API Testing with Cypress",
      "minutes": 40,
      "durationLabel": null,
      "overview": "Unlike cy.intercept(), which patches the page's own network calls, cy.request() sends a request directly from Cypress's own Node-backed process, bypassing the browser page entirely — no page needs to be loaded, no CORS restrictions apply (since it's not a browser-origin request at all), and it can be called before any cy.visit() in a test. This is functionally closer to Playwright's APIRequestContext in purpose (fast",
      "learn": [
        "cy.request() basics",
        "GET — full reference",
        "POST — full reference, including the failOnStatusCode gotcha worth knowing early",
        "PUT/PATCH",
        ".its()"
      ],
      "steps": [
        {
          "title": "cy.request() basics",
          "body": "Unlike cy.intercept(), which patches the page's own network calls, cy.request() sends a request directly from Cypress's own Node-backed process, bypassing the browser page entirely — no page needs to be loaded, no CORS restrictions apply (since it's not a browser-origin request at all), and it can be called before any cy.visit() in a test. This is functionally closer to Playwright's APIRequestContext in purpose (fast, direct HTTP calls independent of UI) though structurally simpler — there's no separate context object to create; cy.request() is just called directly wherever needed within a test.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/request",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Where does `cy.request()` run relative to the browser?",
            "options": [
              "Inside the app’s page JavaScript",
              "From Node (outside the browser), sharing cookie jar with the test",
              "Only in Cypress Cloud",
              "Only in Electron"
            ],
            "answer": 1,
            "explain": "cy.request is Node-backed — great for setup — while still able to share session cookies."
          },
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.request('GET', '/api/users');\ncy.request({\n  method: 'POST',\n  url: '/api/users',\n  body: { name: 'Jane Doe', email: 'jane@example.com' },\n  headers: { Authorization: 'Bearer abc123' },\n});",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "GET — full reference",
          "body": "Query parameters can be embedded directly in the URL string, or passed via a qs option in the object form (cy.request({ url: '/api/users', qs: { page: 1, limit: 10 } })) — worth using the qs object form once you have more than one or two parameters, since it's more readable and avoids manual URL-string concatenation bugs.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.request('GET', '/api/users?page=1&limit=10').then((response) => {\n  expect(response.status).to.eq(200);\n  expect(response.body.users).to.have.length.at.most(10);\n});",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "POST — full reference, including the failOnStatusCode gotcha worth knowing early",
          "body": "Worth flagging a genuinely important default behavior: cy.request() automatically fails the entire test immediately if the response status code is not in the 2xx/3xx range — unlike Playwright's request.post(), which simply returns the response object regardless of status and leaves the assertion decision entirely to you. If you're deliberately testing an error scenario (expecting a 400 or 422 validation error from the API), you must explicitly opt out of this default:\n\nForgetting failOnStatusCode: false when deliberately testing an error-response scenario is a very common early mistake — the test fails with a confusing \"expected status code to be 2xx\" error from Cypress itself, before your own assertion about the 422 ever runs.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/request",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.request('POST', '/api/users', {\n  name: 'Test User',\n  email: 'testuser@example.com',\n}).then((response) => {\n  expect(response.status).to.eq(201);\n  const newUserId = response.body.id;\n  cy.wrap(newUserId).as('createdUserId');  // stash for cleanup later, see Chapter 39\n});\n\ncy.request({\n  method: 'POST',\n  url: '/api/users',\n  body: { email: 'not-a-valid-email' },\n  failOnStatusCode: false,   // required, or Cypress fails the test before you even get to assert\n}).then((response) => {\n  expect(response.status).to.eq(422);\n  expect(response.body.errors).to.include('Invalid email format');\n});",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "PUT/PATCH",
          "body": "The same PUT-replaces-the-whole-resource vs PATCH-partial-update distinction covered in your Playwright manual (Part 4, Ch. 18) applies identically here — this is a REST/HTTP convention, not a Playwright-or-Cypress-specific behavior, so the mental model transfers directly; only the calling syntax differs.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.request('PUT', `/api/users/${userId}`, {\n  name: 'Updated Name',\n  email: 'updated@example.com',\n}).its('status').should('eq', 200);\n\ncy.request('PATCH', `/api/users/${userId}`, {\n  email: 'newemail@example.com',\n}).its('status').should('eq', 200);",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": ".its()",
          "body": ".its('status') is Cypress's chainable way of extracting a specific property from whatever the previous command yielded — functionally similar to response.status in plain JS, but expressed as a chainable command so it participates in Cypress's retry system (though for a cy.request() response, which resolves once and doesn't change, the retry aspect is less relevant than it is for DOM-related .its() usage).",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/request",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "DELETE",
          "body": "'be.oneOf', [200, 204] is a Chai assertion worth knowing — it checks the actual value against a list of acceptable values, useful exactly in cases like this where an API's DELETE convention (200 with a body, vs 204 with no body) isn't something you want to hardcode a single assumption about.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.request('DELETE', `/api/users/${userId}`).its('status').should('be.oneOf', [200, 204]);\n\n// Verify it's actually gone\ncy.request({\n  method: 'GET',\n  url: `/api/users/${userId}`,\n  failOnStatusCode: false,\n}).its('status').should('eq', 404);",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Combining UI + API tests — a fuller worked example than the Playwright manual's, tailored to your HRM context",
          "body": "Worth noting the let leaveRequestId declared outside the hooks and assigned inside beforeEach — this is a plain JavaScript closure variable pattern, workable here specifically because Mocha runs beforeEach, the test body, and afterEach in strict sequence for a single test, so the variable is reliably set by the time afterEach reads it. This is a common, idiomatic Cypress pattern for passing values between hooks and test bodies without needing Cypress's alias system for something this simple.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/request",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "describe('Leave Request Admin View', () => {\n  let leaveRequestId;\n\n  beforeEach(() => {\n    // Fast setup via API instead of walking through the UI submission flow\n    cy.request('POST', '/api/leave-requests', {\n      employeeId: 42,\n      type: 'Annual',\n      startDate: '2026-09-10',\n      endDate: '2026-09-12',\n    }).then((response) => {\n      leaveRequestId = response.body.id;\n    });\n  });\n\n  it('shows the new leave request in the admin approval list', () => {\n    cy.visit('/admin/leave-requests');\n    cy.contains('[data-cy=leave-request-row]', 'Annual').should('be.visible');\n  });\n\n  afterEach(() => {\n    // Cleanup via API — fast, doesn't depend on a UI delete flow working correctly\n    if (leaveRequestId) {\n      cy.request('DELETE', `/api/leave-requests/${leaveRequestId}`);\n    }\n  });\n});",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: cy.request() basics",
        "I can explain: GET — full reference",
        "I can explain: POST — full reference, including the failOnStatusCode gotcha worth knowing early"
      ],
      "practice": {
        "title": "Practice — API Testing with Cypress",
        "brief": "Apply one idea from “API Testing with Cypress” in a small Cypress experiment and note what surprised you."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/api/commands/request",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Unlike cy.intercept(), which patches the page's own network calls, cy.request() sends a request directly from Cypress's own Node-backed process, bypassing the browser page entirely — no page needs to be loaded, no CORS restrictions apply (since it's not a browser-origin request at all), and it can be called before any cy.visit() in a test. This is functionally closer to Playwright's APIRequestContext in purpose (fast",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-25-visual",
      "phase": "Part 4 · Advanced Techniques",
      "level": "intermediate",
      "title": "25. Visual & Accessibility Testing",
      "minutes": 35,
      "durationLabel": null,
      "overview": "cypress-image-snapshot works on the same fundamental principle as Playwright's built-in to_have_screenshot() (Part 4, Ch. 19 of your Playwright manual) — capture a screenshot, compare pixel-by-pixel against a saved baseline, fail beyond a configurable difference threshold — but as a free, self-hosted, community plugin rather than a built-in first-party feature.",
      "learn": [
        "cypress-image-snapshot",
        "Percy and Applitools",
        "cypress-axe"
      ],
      "steps": [
        {
          "title": "cypress-image-snapshot",
          "body": "cypress-image-snapshot works on the same fundamental principle as Playwright's built-in to_have_screenshot() (Part 4, Ch. 19 of your Playwright manual) — capture a screenshot, compare pixel-by-pixel against a saved baseline, fail beyond a configurable difference threshold — but as a free, self-hosted, community plugin rather than a built-in first-party feature. The first run creates the baseline image (stored locally in your repo, needing to be committed to version control the same as Playwright's baselines); subsequent runs compare against it.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/tooling/cypress-studio",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "npm install -D cypress-image-snapshot\n\n// cypress/support/e2e.js\nimport { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';\naddMatchImageSnapshotCommand();\n\ncy.visit('/dashboard');\ncy.matchImageSnapshot('dashboard-view');",
          "codeTitle": "bash",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Percy and Applitools",
          "body": "Worth understanding why a team would pay for Percy or Applitools over the free cypress-image-snapshot plugin, since this is a fair interview question: both paid tools use smarter comparison algorithms (Applitools' \"Visual AI\" specifically claims to distinguish meaningful visual regressions from harmless rendering noise — anti-aliasing differences, sub-pixel font rendering variance across different machines/CI runners — far better than a raw pixel-diff can), host and manage baseline images centrally with a reviewable approval workflow (a designer or PM can review and approve an intentional visual change through a web UI, rather than a developer manually re-generating and committing a new baseline file), and integrate directly into PR review flows showing visual diffs inline. The free plugin is genuinely serviceable for a small team's basic regression safety net; the paid tools solve real organizational friction (who approves an intentional visual change, and how) that becomes worth paying for as a team and app grow.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "// Percy example\ncy.visit('/dashboard');\ncy.percySnapshot('Dashboard - default state');",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "cypress-axe",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/tooling/cypress-studio",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "npm install -D cypress-axe\n\n// cypress/support/e2e.js\nimport 'cypress-axe';\n\ncy.visit('/dashboard');\ncy.injectAxe();          // injects the axe-core library into the page\ncy.checkA11y();          // runs the full accessibility audit against the current page state\n\n// Scoped to a specific part of the page\ncy.checkA11y('[data-cy=leave-request-form]');\n\n// Excluding known/accepted issues, or scoping to certain rule categories\ncy.checkA11y(null, {\n  rules: { 'color-contrast': { enabled: false } },\n});\n\ncy.injectAxe() must be called after cy.visit() (the page needs to exist first for the library to inject into) and before cy.checkA11y(). This is the same underlying axe-core engine as Playwright's axe-playwright-python integration (Part 4, Ch. 19 of your Playwright manual) — same violation categories, same impact levels (minor/moderate/serious/critical) — just wired into Cypress via its own dedicated plugin rather than a separate Python wrapper library. cy.checkA11y() fails the test automatically by default if violations are found (unlike the Playwright pattern shown in your prior manual, which manually asserted on violations_count) — worth knowing this default, and that you can pass a callback as a third argument to customize failure behavior (e.g., logging violations without failing the test, useful while a known-issues backlog is being worked through gradually).",
          "codeTitle": "bash",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: cypress-image-snapshot",
        "I can explain: Percy and Applitools",
        "I can explain: cypress-axe"
      ],
      "practice": {
        "title": "Practice — Visual & Accessibility Testing",
        "brief": "Apply one idea from “Visual & Accessibility Testing” in a small Cypress experiment and note what surprised you."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/tooling/cypress-studio",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "cypress-image-snapshot works on the same fundamental principle as Playwright's built-in to_have_screenshot() (Part 4, Ch. 19 of your Playwright manual) — capture a screenshot, compare pixel-by-pixel against a saved baseline, fail beyond a configurable difference threshold — but as a free, self-hosted, community plugin rather than a built-in first-party feature.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-26-auth",
      "phase": "Part 4 · Advanced Techniques",
      "level": "intermediate",
      "title": "26. Authentication & Session Reuse",
      "minutes": 40,
      "durationLabel": null,
      "overview": "A meaningful advantage worth naming explicitly: cy.session() also caches sessionStorage, unlike Playwright's context.storage_state() which explicitly only captures cookies and localStorage (noted as a limitation in your Playwright manual, Part 4, Ch. If an app's auth relies on sessionStorage specifically, Cypress's built-in session caching handles it without the workaround Playwright would need.",
      "learn": [
        "cy.session()",
        "Validating a cached session is still valid",
        "Programmatic login vs UI login",
        "cy.setCookie/localStorage tricks — a few additional worked patterns worth knowing"
      ],
      "steps": [
        {
          "title": "cy.session()",
          "body": "A meaningful advantage worth naming explicitly: cy.session() also caches sessionStorage, unlike Playwright's context.storage_state() which explicitly only captures cookies and localStorage (noted as a limitation in your Playwright manual, Part 4, Ch. 20). If an app's auth relies on sessionStorage specifically, Cypress's built-in session caching handles it without the workaround Playwright would need.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/session",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "What does `cy.session()` primarily help with?",
            "options": [
              "Parallelizing Cloud runs",
              "Caching and restoring login/setup so you don’t UI-login every test",
              "Taking screenshots",
              "Replacing cy.intercept"
            ],
            "answer": 1,
            "explain": "cy.session caches validated session state across tests for faster auth reuse."
          },
          "tryIt": null,
          "doThis": "Wrap UI or API login in cy.session and reuse across two tests.",
          "tip": null,
          "code": "Cypress.Commands.add('login', (username, password) => {\n  cy.session([username, password], () => {\n    cy.visit('/login');\n    cy.get('[data-cy=username]').type(username);\n    cy.get('[data-cy=password]').type(password);\n    cy.get('[data-cy=submit]').click();\n    cy.url().should('include', '/dashboard');\n  });\n});\n\n// in a test:\nbeforeEach(() => {\n  cy.login('testuser', 'testpass');\n  cy.visit('/dashboard');\n});\n\ncy.session() takes a cache key (here, [username, password] — any serializable value works) and a setup function containing the actual login steps. The first time a given cache key is used within a test run, Cypress executes the setup function fully (a real UI login) and then caches the resulting cookies/localStorage/sessionStorage. Every subsequent call with the same cache key — even across entirely different spec files in the same run — restores that cached state instantly, skipping the setup function entirely, rather than re-running the login UI flow. This is functionally similar in goal to Playwright's storage_state (Part 4, Ch. 20 of your Playwright manual) but structurally different in mechanism: Playwright's approach is \"manually save state to a file once via a fixture, manually load it into new contexts,\" while Cypress's cy.session() handles the caching, key-based lookup, and restoration automatically and transparently behind one command.",
          "codeTitle": "javascript",
          "items": null,
          "callout": {
            "label": "Trade-off",
            "body": "Cypress’s in-browser model buys DX and visibility; it also creates hard limits (multi-tab, some cross-origin, no WebKit). Choose tools for the scenario.",
            "tone": "warn"
          },
          "aside": null
        },
        {
          "title": "Validating a cached session is still valid",
          "body": "The optional validate() callback runs every time a cached session is restored (not just on first creation) — giving Cypress a chance to confirm the cached session is still actually valid (the cookie/token hasn't expired, for instance) before trusting it. If validation fails, Cypress automatically re-runs the full setup function again rather than proceeding with a stale, broken session — a nice built-in safety net Playwright's more manual storage_state approach doesn't have equivalent to out of the box; you'd need to build that expiry-checking logic yourself.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.session([username, password], () => {\n  cy.visit('/login');\n  cy.get('[data-cy=username]').type(username);\n  cy.get('[data-cy=password]').type(password);\n  cy.get('[data-cy=submit]').click();\n}, {\n  validate() {\n    cy.getCookie('session_token').should('exist');\n  },\n});",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Programmatic login vs UI login",
          "body": "A programmatic (API-based) login — using cy.request() to hit the auth endpoint directly and manually set the resulting token, rather than clicking through the actual login form — is dramatically faster and is the right default for the vast majority of tests where login itself isn't what you're testing, only a prerequisite to get to the screen you actually care about. Reserve an actual UI-driven login (clicking through the real form) specifically for the handful of tests whose explicit purpose is verifying the login flow itself works correctly (Chapter 15/16's form-testing patterns) — testing login via the UI in every single spec file across your whole suite is a common, meaningfully wasteful anti-pattern once a suite grows past a trivial size.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/session",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "Cypress.Commands.add('loginByApi', (username, password) => {\n  cy.session([username, password], () => {\n    cy.request('POST', '/api/auth/login', { username, password }).then((response) => {\n      window.localStorage.setItem('authToken', response.body.token);\n    });\n  });\n});",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "cy.setCookie/localStorage tricks — a few additional worked patterns worth knowing",
          "body": "For the fastest possible setup — skipping even the API login request — some teams pre-generate a long-lived test-account token once (stored as a Cypress env var, Chapter 9/37) and simply set it directly as a cookie before every test needing authentication. This trades a small amount of realism (you're not exercising the actual login/token-generation code path at all) for maximum speed — a reasonable trade-off specifically for tests where authentication is purely incidental scaffolding, not something under test.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "// Seeding an auth token directly without any request at all, when you already have a valid token\ncy.setCookie('session_token', Cypress.env('testUserToken'));\ncy.visit('/dashboard');",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: cy.session()",
        "I can explain: Validating a cached session is still valid",
        "I can explain: Programmatic login vs UI login"
      ],
      "practice": {
        "title": "Practice — Authentication & Session Reuse",
        "brief": "Wrap UI or API login in cy.session and reuse across two tests."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/api/commands/session",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "A meaningful advantage worth naming explicitly: cy.session() also caches sessionStorage, unlike Playwright's context.storage_state() which explicitly only captures cookies and localStorage (noted as a limitation in your Playwright manual, Part 4, Ch. If an app's auth relies on sessionStorage specifically, Cypress's built-in session caching handles it without the workaround Playwright would need.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-27-limits",
      "phase": "Part 4 · Advanced Techniques",
      "level": "intermediate",
      "title": "27. Working Around Cypress's Architectural Limits",
      "minutes": 40,
      "durationLabel": null,
      "overview": "Recall from Part 0/Chapter 15: Cypress's test code runs inside the browser's JS context, which is bound by same-origin restrictions the same way any page's own JavaScript would be. cy.origin() is Cypress's explicit escape hatch for this — it tells Cypress \"the code inside this callback is going to interact with a genuinely different origin than the one the test started on,\" and Cypress handles the context-switching m",
      "learn": [
        "cy.origin()",
        "cy.origin('https://sso-provider.example.com', () => {",
        "cy.origin('https://sso-provider.example.com', { args: ssoCredentials }, ({ username, pa…",
        "Multi-tab workarounds",
        "Shadow DOM"
      ],
      "steps": [
        {
          "title": "cy.origin()",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/origin",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.visit('https://app.example.com/login');\ncy.get('[data-cy=sso-login]').click();",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "cy.origin('https://sso-provider.example.com', () => {",
          "body": "Recall from Part 0/Chapter 15: Cypress's test code runs inside the browser's JS context, which is bound by same-origin restrictions the same way any page's own JavaScript would be. cy.origin() is Cypress's explicit escape hatch for this — it tells Cypress \"the code inside this callback is going to interact with a genuinely different origin than the one the test started on,\" and Cypress handles the context-switching machinery needed to make that work safely.\n\nWorth knowing a real, practical constraint of cy.origin(): the callback function you pass runs in a separate, isolated execution context from the rest of your test — meaning you generally cannot directly reference outer-scope variables from inside it (a closure variable defined in your test body isn't automatically available inside the cy.origin() callback the way it would be in a normal JS closure). Passing data in requires an explicit second argument:",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "  cy.get('#username').type('testuser@example.com');\n  cy.get('#password').type('testpass');\n  cy.get('#submit').click();\n});\n\ncy.url().should('include', 'app.example.com/dashboard');\n\nconst ssoCredentials = { username: 'testuser@example.com', password: 'testpass' };",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "cy.origin('https://sso-provider.example.com', { args: ssoCredentials }, ({ username, password }) => {",
          "body": "This { args: ... } pattern is worth internalizing as a genuine gotcha specifically because it's non-obvious coming from normal JavaScript scoping rules — it's a direct, visible consequence of the underlying context-isolation mechanism cy.origin() has to perform to work around Cypress's same-origin limitation in the first place.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/origin",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "  cy.get('#username').type(username);\n  cy.get('#password').type(password);\n  cy.get('#submit').click();\n});",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Multi-tab workarounds",
          "body": "Worth being direct rather than glossing this over: there is no real workaround that gives you true simultaneous multi-tab control in Cypress the way Playwright's context.expect_page() (Part 2, Ch. 9 of your Playwright manual) provides natively. If your application opens a new tab (e.g., target=\"_blank\" links, or window.open() calls), the closest Cypress-native approaches are:\n\nBoth of these are verifying the intent to open a new tab, not actually testing what happens inside that new tab. If genuinely testing the new tab's content and behavior is essential to a critical user flow, this is one of the clearest, most concrete cases where the honest answer is \"use Playwright for this specific suite\" rather than forcing a Cypress workaround that doesn't really achieve the same thing — worth stating this plainly in an interview rather than pretending a workaround exists that doesn't.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "// Option 1: prevent the new tab from opening at all, and instead verify the link's target URL directly\ncy.get('[data-cy=external-link]').should('have.attr', 'href', 'https://partner.example.com');\n\n// Option 2: intercept window.open and verify it was called correctly, without a real new tab ever opening\ncy.window().then((win) => {\n  cy.stub(win, 'open').as('windowOpen');\n});\ncy.get('[data-cy=external-link]').click();\ncy.get('@windowOpen').should('have.been.calledWith', 'https://partner.example.com');",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Shadow DOM",
          "body": "Unlike Playwright, which pierces open shadow DOM automatically by default with zero configuration (Part 3, Ch. 21 of your Playwright manual), Cypress requires either an explicit .shadow() command chained onto the host element to reach into its shadow root, or the global includeShadowDom: true config flag to make all commands shadow-DOM-aware project-wide. Worth deliberately choosing the global config flag early in a project if you know you're working with a shadow-DOM-heavy component library (Web Components, Lit, some design systems), rather than remembering to add .shadow() manually to every single selector chain that needs it — a detail easy to forget inconsistently across a large suite.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/api/commands/origin",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.get('custom-button').shadow().find('.internal-button').click();\n\n// Or, configure Cypress to pierce shadow DOM automatically for ALL commands, project-wide:\n// cypress.config.js\nmodule.exports = defineConfig({\n  e2e: {\n    includeShadowDom: true,\n  },\n});",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: cy.origin()",
        "I can explain: cy.origin('https://sso-provider.example.com', () => {",
        "I can explain: cy.origin('https://sso-provider.example.com', { args: ssoCredentials }, ({ username, pa…"
      ],
      "practice": {
        "title": "Practice — Working Around Cypress's Architectural Limits",
        "brief": "Apply one idea from “Working Around Cypress's Architectural Limits” in a small Cypress experiment and note what surprised you."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/api/commands/origin",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Recall from Part 0/Chapter 15: Cypress's test code runs inside the browser's JS context, which is bound by same-origin restrictions the same way any page's own JavaScript would be. cy.origin() is Cypress's explicit escape hatch for this — it tells Cypress \"the code inside this callback is going to interact with a genuinely different origin than the one the test started on,\" and Cypress handles the context-switching m",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-28-component",
      "phase": "Part 4 · Advanced Techniques",
      "level": "intermediate",
      "title": "28. Component Testing",
      "minutes": 40,
      "durationLabel": null,
      "overview": "Cypress auto-detects your project's frontend framework (React, Vue, Angular, Svelte) and bundler (Vite, Webpack) during component-testing setup, generating a separate config block: }, }); Worth noting the structural split: e2e and component are separate top-level config blocks, each with independent settings, and component test spec files conventionally live alongside the components they test (e.g., LeaveRequestForm.",
      "learn": [
        "Setup",
        "baseUrl: 'http://localhost:3000',",
        "Mounting components",
        "Mocking dependencies/props for isolated testing",
        "Difference from E2E — a clear summary worth stating explicitly"
      ],
      "steps": [
        {
          "title": "Setup",
          "body": "Cypress auto-detects your project's frontend framework (React, Vue, Angular, Svelte) and bundler (Vite, Webpack) during component-testing setup, generating a separate config block:",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/component-testing/overview",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Mount one small component and assert a prop-driven empty state.",
          "tip": null,
          "code": "npx cypress open\n# select \"Component Testing\" from the Launchpad, follow the framework-detection wizard\n\n// cypress.config.js\nmodule.exports = defineConfig({\n  component: {\n    devServer: {\n      framework: 'react',\n      bundler: 'vite',\n    },\n  },\n  e2e: {",
          "codeTitle": "bash",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "baseUrl: 'http://localhost:3000',",
          "body": "},\n});\n\nWorth noting the structural split: e2e and component are separate top-level config blocks, each with independent settings, and component test spec files conventionally live alongside the components they test (e.g., LeaveRequestForm.cy.jsx next to LeaveRequestForm.jsx) rather than centralized in cypress/e2e/ — a genuinely different organizational philosophy from E2E specs, worth deliberately mirroring your actual component folder structure rather than centralizing component tests elsewhere.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Mounting components",
          "body": "jsx",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/component-testing/overview",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "// LeaveRequestForm.cy.jsx\nimport LeaveRequestForm from './LeaveRequestForm';\n\ndescribe('LeaveRequestForm', () => {\n  it('disables submit until all required fields are filled', () => {\n    cy.mount(<LeaveRequestForm employeeId={42} />);\n\n    cy.get('[data-cy=submit]').should('be.disabled');\n\n    cy.get('[data-cy=leave-type]').select('Annual');\n    cy.get('[data-cy=start-date]').type('2026-09-10');\n    cy.get('[data-cy=end-date]').type('2026-09-12');\n\n    cy.get('[data-cy=submit]').should('not.be.disabled');\n  });\n\n  it('shows an error state when given zero remaining balance', () => {\n    cy.mount(<LeaveRequestForm employeeId={42} remainingBalance={0} />);\n    cy.get('[data-cy=balance-warning]').should('be.visible')\n      .and('contain', 'No remaining leave balance');\n  });\n});\n\ncy.mount() is the core component-testing command — it renders the given component directly into a blank test page, with whatever props you pass controlling its exact state, without needing your actual app, router, or backend running at all. The second test here is worth highlighting specifically: testing a remainingBalance={0} edge case is trivial as a direct prop — achieving the equivalent scenario in a full E2E test would require actually getting a real test employee's leave balance down to zero through real data setup, dramatically more effort for the same coverage.",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Mocking dependencies/props for isolated testing",
          "body": "jsx\n\nPassing a cy.stub() directly as a component's callback prop, then asserting on it via the same Sinon-Chai assertions introduced in Chapter 14, lets you verify a component calls its callback with the correct data without needing any real parent component, router, or API behind it at all — this is component testing's core value proposition: genuinely isolated, fast, precise testing of one piece at a time.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "it('calls the onSubmit callback with form data', () => {\n  const onSubmitSpy = cy.stub().as('onSubmitSpy');\n  cy.mount(<LeaveRequestForm employeeId={42} onSubmit={onSubmitSpy} />);\n\n  cy.get('[data-cy=leave-type]').select('Annual');\n  cy.get('[data-cy=submit]').click();\n\n  cy.get('@onSubmitSpy').should('have.been.calledWith', Cypress.sinon.match({ leaveType: 'Annual' }));\n});",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Difference from E2E — a clear summary worth stating explicitly",
          "body": "Component tests answer \"does this one piece work correctly, given any input I choose to give it?\" E2E tests answer \"does the real, fully-integrated system work correctly for a real user?\" Neither replaces the other — a mature suite has both, using component tests to cheaply cover a wide surface of edge cases per component, and E2E tests more sparingly to cover the critical, fully-integrated user journeys that component tests structurally cannot verify (real routing, real API integration, real cross-component interaction).",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/component-testing/overview",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Setup",
        "I can explain: baseUrl: 'http://localhost:3000',",
        "I can explain: Mounting components"
      ],
      "practice": {
        "title": "Practice — Component Testing",
        "brief": "Mount one small component and assert a prop-driven empty state."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/component-testing/overview",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Cypress auto-detects your project's frontend framework (React, Vue, Angular, Svelte) and bundler (Vite, Webpack) during component-testing setup, generating a separate config block: }, }); Worth noting the structural split: e2e and component are separate top-level config blocks, each with independent settings, and component test spec files conventionally live alongside the components they test (e.g., LeaveRequestForm.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-29-parallel",
      "phase": "Part 4 · Advanced Techniques",
      "level": "intermediate",
      "title": "29. Parallelization & Sharding",
      "minutes": 35,
      "durationLabel": null,
      "overview": "Once a project is connected to Cypress Cloud and multiple CI machines run this same command simultaneously (each connecting with the same --record --key and --parallel flags), Cypress Cloud's servers dynamically assign individual spec files to whichever machine becomes free next, based on each spec's historical run duration — genuinely smarter than a naive \"split the file list into N equal chunks\" approach, since spe",
      "learn": [
        "Cypress Cloud parallelization",
        "cypress-parallel",
        "Load balancing specs across CI runners without either tool — the manual approach"
      ],
      "steps": [
        {
          "title": "Cypress Cloud parallelization",
          "body": "Once a project is connected to Cypress Cloud and multiple CI machines run this same command simultaneously (each connecting with the same --record --key and --parallel flags), Cypress Cloud's servers dynamically assign individual spec files to whichever machine becomes free next, based on each spec's historical run duration — genuinely smarter than a naive \"split the file list into N equal chunks\" approach, since spec files rarely take equal time to run and a naive even split often leaves one machine finishing dramatically earlier than another, wasting available parallel capacity.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/guides/parallelization",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "What is Cypress Cloud’s main parallelization contribution?",
            "options": [
              "Unlocking cy.get",
              "Intelligent load-balancing of specs across CI machines",
              "Adding WebKit support",
              "Writing your tests for you"
            ],
            "answer": 1,
            "explain": "Cloud orchestrates which specs run where; free alternatives exist but need manual balancing."
          },
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "npx cypress run --record --key <your-record-key> --parallel",
          "codeTitle": "bash",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "cypress-parallel",
          "body": "cypress-parallel (a free, community alternative to Cypress Cloud's paid parallelization) works differently — it typically pre-splits your spec files into roughly equal-sized groups (by count or, in more sophisticated configurations, by weighting based on your own historical timing data you supply) and spawns multiple local Cypress processes to run them concurrently on the same machine, rather than orchestrating genuinely separate CI machines. This is a meaningfully more limited form of parallelization than Cypress Cloud's cross-machine orchestration — it's bounded by a single machine's CPU/memory capacity — but it's free and still delivers a real speed-up over fully sequential execution, a reasonable choice for a smaller team or project not yet at the scale where paying for Cloud is worthwhile.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "npm install -D cypress-parallel\n\n// package.json\n\"scripts\": {\n  \"test:parallel\": \"cypress-parallel -s cy:run -t 4 -d cypress/e2e -a '**/*.cy.js'\"\n}",
          "codeTitle": "bash",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Load balancing specs across CI runners without either tool — the manual approach",
          "body": "yaml\n# GitHub Actions matrix example — manual splitting across 4 jobs\nstrategy:\n  matrix:\n    containers: [1, 2, 3, 4]\nsteps:\n  - run: npx cypress run --spec \"cypress/e2e/**/*.cy.js\" --record --parallel --ci-build-id ${{ github.run_id }}\n\nEven without Cypress Cloud, most CI platforms' own matrix-job features (GitHub Actions matrix, GitLab CI parallel jobs) can spin up genuinely separate machines each running a subset of specs — though without Cloud's dynamic assignment, you're back to manually or semi-manually deciding which specs run on which machine, the same \"naive even split\" limitation cypress-parallel has, just distributed across real separate machines instead of one machine's process pool.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/guides/parallelization",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Cypress Cloud parallelization",
        "I can explain: cypress-parallel",
        "I can explain: Load balancing specs across CI runners without either tool — the manual approach"
      ],
      "practice": {
        "title": "Practice — Parallelization & Sharding",
        "brief": "Apply one idea from “Parallelization & Sharding” in a small Cypress experiment and note what surprised you."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/guides/parallelization",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Once a project is connected to Cypress Cloud and multiple CI machines run this same command simultaneously (each connecting with the same --record --key and --parallel flags), Cypress Cloud's servers dynamically assign individual spec files to whichever machine becomes free next, based on each spec's historical run duration — genuinely smarter than a naive \"split the file list into N equal chunks\" approach, since spe",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-30-crossbrowser",
      "phase": "Part 4 · Advanced Techniques",
      "level": "intermediate",
      "title": "30. Cross-browser Testing",
      "minutes": 35,
      "durationLabel": null,
      "overview": "The before:browser:launch event (registered inside setupNodeEvents, previewed here, full depth in Chapter 33's plugin coverage) is worth knowing exists — it's the hook point for passing browser-specific command-line flags, useful for things like disabling GPU acceleration in a headless CI environment prone to rendering-related flakiness, or adjusting Chrome's memory limits on a resource-constrained CI runner. Since t",
      "learn": [
        "Chrome, Edge, Firefox, Electron",
        "Worth restating the permanent WebKit gap",
        "Practice Cross-browser Testing"
      ],
      "steps": [
        {
          "title": "Chrome, Edge, Firefox, Electron",
          "body": "The before:browser:launch event (registered inside setupNodeEvents, previewed here, full depth in Chapter 33's plugin coverage) is worth knowing exists — it's the hook point for passing browser-specific command-line flags, useful for things like disabling GPU acceleration in a headless CI environment prone to rendering-related flakiness, or adjusting Chrome's memory limits on a resource-constrained CI runner.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/guides/cross-browser-testing",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "npx cypress run --browser chrome\nnpx cypress run --browser firefox\nnpx cypress run --browser edge\nnpx cypress run --browser electron   # default if --browser omitted\n\n// cypress.config.js — browser-specific launch options if needed\nmodule.exports = defineConfig({\n  e2e: {\n    setupNodeEvents(on, config) {\n      on('before:browser:launch', (browser, launchOptions) => {\n        if (browser.name === 'chrome') {\n          launchOptions.args.push('--disable-gpu');\n        }\n        return launchOptions;\n      });\n    },\n  },\n});",
          "codeTitle": "bash",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Worth restating the permanent WebKit gap",
          "body": "Since this chapter is explicitly about the cross-browser story, it's worth restating plainly one more time in this concrete context: there is no --browser webkit option, ever, in Cypress — this isn't a missing config value you're overlooking, it's a permanent architectural absence. If Safari-specific behavior genuinely matters for your application's real user base (worth actually checking your analytics for Safari traffic percentage before assuming this doesn't matter), a Cypress-only cross-browser suite has a structural blind spot no configuration change can close — this is the single most concrete, decisive technical fact worth having ready in an interview question about Cypress's limitations.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Trade-off",
            "body": "Cypress’s in-browser model buys DX and visibility; it also creates hard limits (multi-tab, some cross-origin, no WebKit). Choose tools for the scenario.",
            "tone": "warn"
          },
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Chrome, Edge, Firefox, Electron",
        "I can explain: Worth restating the permanent WebKit gap",
        "I can explain: Practice Cross-browser Testing"
      ],
      "practice": {
        "title": "Practice — Cross-browser Testing",
        "brief": "Apply one idea from “Cross-browser Testing” in a small Cypress experiment and note what surprised you."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/guides/cross-browser-testing",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "The before:browser:launch event (registered inside setupNodeEvents, previewed here, full depth in Chapter 33's plugin coverage) is worth knowing exists — it's the hook point for passing browser-specific command-line flags, useful for things like disabling GPU acceleration in a headless CI environment prone to rendering-related flakiness, or adjusting Chrome's memory limits on a resource-constrained CI runner. Since t",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "cy-31-debug",
      "phase": "Part 4 · Advanced Techniques",
      "level": "intermediate",
      "title": "31. Debugging Tools",
      "minutes": 40,
      "durationLabel": null,
      "overview": "Already covered in depth (Part 0, Chapter 7) — worth just noting here that it's your first debugging tool to reach for, before anything else in this chapter, specifically because it requires zero code changes or extra commands — it's just clicking around the Command Log in a Test Runner session you already have open. Because Cypress genuinely runs your test code and your application in the same real browser tab you'r",
      "learn": [
        "Time-travel",
        ".debug()",
        ".pause()",
        "DevTools integration",
        "cy.log()"
      ],
      "steps": [
        {
          "title": "Time-travel",
          "body": "Already covered in depth (Part 0, Chapter 7) — worth just noting here that it's your first debugging tool to reach for, before anything else in this chapter, specifically because it requires zero code changes or extra commands — it's just clicking around the Command Log in a Test Runner session you already have open.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/guides/debugging",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "What’s a practical difference between `cy.log()` and `console.log()` in Cypress?",
            "options": [
              "They are identical",
              "cy.log appears in the Command Log; console.log shows in the browser DevTools console",
              "console.log fails the test",
              "cy.log only works in CI"
            ],
            "answer": 1,
            "explain": "Use cy.log for Command Log breadcrumbs; console.log for DevTools inspection."
          },
          "tryIt": null,
          "doThis": "Break a test on purpose; use .pause() and the Command Log to inspect state.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": ".debug()",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.get('[data-cy=total-price]').debug().should('contain', '$49.99');\n\n.debug() inserted into a chain does two things simultaneously: it logs the currently-yielded subject to the browser's DevTools console (so you can inspect the actual jQuery-wrapped element, its properties, and its current DOM state directly), and it pauses execution at that exact point, similar in spirit to a JavaScript debugger; statement, giving you a moment to open DevTools and poke around before the chain continues. This is worth reaching for specifically when you're unsure exactly what a command yielded partway through a longer chain — rather than guessing, .debug() lets you inspect the actual value directly.",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": ".pause()",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/guides/debugging",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.get('[data-cy=submit]').click();\ncy.pause();\ncy.get('[data-cy=confirmation]').should('be.visible');\n\n.pause() halts the entire test at that point and displays play/step controls directly in the Test Runner UI — clicking \"Next\" (or a keyboard shortcut) advances one command at a time from that point forward, letting you manually step through the remainder of the test at your own pace rather than watching it run automatically. This is the closest Cypress equivalent to Playwright's PWDEBUG=1 Inspector mode (Part 4, Ch. 24 of your Playwright manual) — both give you manual, step-by-step control — though Cypress's version is inserted directly into your test code as a command rather than toggled via an environment variable wrapping the whole run.",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "DevTools integration",
          "body": "Because Cypress genuinely runs your test code and your application in the same real browser tab you're looking at (Part 0), real, unmodified browser DevTools work directly against your test run at every moment — Network tab, Console, Elements inspector, breakpoints in your application's own source code (not just your test code) — all available exactly as if you were manually using the app yourself. This is a meaningfully more integrated experience than needing a separate Inspector tool or Trace Viewer launched from a recorded file, precisely because there's no \"recording and replaying afterward\" step involved at all — you're looking at the live thing.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "cy.log()",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://docs.cypress.io/guides/guides/debugging",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "cy.log('Starting leave request submission flow');\ncy.get('[data-cy=leave-type]').select('Annual');\ncy.log(`Selected leave type: Annual`);\n\ncy.log() differs from a plain JavaScript console.log() in one specific, useful way: it's queued into Cypress's own command chain and appears directly in the Command Log itself, interleaved chronologically with the actual Cypress commands around it — meaning when you're reviewing a test run (especially a failed one, or one recorded on CI you're reviewing after the fact via a saved video/screenshot), your own custom log messages appear in context, right where they happened in the sequence, rather than needing to separately open a browser console and cross-reference timestamps against a plain console.log() output. Worth using cy.log() specifically for narrative checkpoints in longer, more complex tests — marking \"we've now completed setup, beginning the actual scenario\" style boundaries — so a failure's Command Log tells a readable story of how far the test got.",
          "codeTitle": "javascript",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Time-travel",
        "I can explain: .debug()",
        "I can explain: .pause()"
      ],
      "practice": {
        "title": "Practice — Debugging Tools",
        "brief": "Break a test on purpose; use .pause() and the Command Log to inspect state."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cypress Docs",
          "url": "https://docs.cypress.io/guides/guides/debugging",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Already covered in depth (Part 0, Chapter 7) — worth just noting here that it's your first debugging tool to reach for, before anything else in this chapter, specifically because it requires zero code changes or extra commands — it's just clicking around the Command Log in a Test Runner session you already have open. Because Cypress genuinely runs your test code and your application in the same real browser tab you'r",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    }
  ]
};
