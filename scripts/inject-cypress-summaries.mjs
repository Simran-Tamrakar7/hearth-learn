#!/usr/bin/env node
/**
 * Inject customSummary into Cypress chapter TS files (chapters 0–31).
 * Run: node scripts/inject-cypress-summaries.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cy = path.join(root, "src/app/manuals/types/cypress");

/** Map global chapter number → bullet summary (no ## headings — Summary tab prefers bullets). */
const SUMMARIES = {
  0: [
    "Built by Brian Mann/Cypress.io; open-sourced (MIT) in 2017 — predates Playwright (Jan 2020) by ~3 years, giving it a longer community/adoption head start.",
    "Cypress.io is a VC-funded company monetizing via Cloud (not platform-funded like Microsoft/Playwright) — shapes a more conservative feature roadmap focused on core dev experience.",
    "Free/open-source: full Test Runner, all commands/locators/assertions, headless execution, local video/screenshots. Paid (Cypress Cloud): hosted video/screenshot storage, smart parallelization orchestration, flaky-test analytics, PR/Slack integrations.",
    "Founding philosophy: test code runs inside the browser, same event loop as the app (vs. Selenium/Playwright's \"external remote control\" model). Gives zero-latency DOM visibility but creates same-origin restrictions and structural multi-tab weakness.",
  ],
  1: [
    "E2E testing — multi-step user journeys (login, submit/approve leave, run payroll).",
    "Component testing — mounts one component in isolation with mock props; faster than E2E, doesn't verify real integration, so it supplements rather than replaces E2E.",
    "API testing via cy.request() — simpler than Playwright's APIRequestContext (no separate context object), less flexible for multi-identity scenarios.",
    "Visual regression — always third-party (plugin or SaaS like Percy/Applitools); no built-in diffing, unlike Playwright.",
    "Industries mirror Playwright's, but Cypress clusters in \"you build it, you test it\" dev-led cultures; Playwright/Selenium favor dedicated automation teams.",
  ],
  2: [
    "Runs inside the browser — cy.get() isn't a Promise, it's a queued chainable; commands execute after the sync test function returns (common newcomer confusion).",
    "Time-travel debugging — live DOM snapshots per command, integrated directly into the Test Runner (vs. Playwright's post-hoc Trace Viewer).",
    "Retry-ability wraps .should() mid-chain, retrying the whole chain up to that assertion — distinct from Playwright's action-centered auto-waiting.",
    "Network stubbing idiom: cy.intercept().as() + cy.wait('@alias') — no Playwright one-liner equivalent.",
    "cypress run auto-records video with zero config (Playwright requires an opt-in flag).",
  ],
  3: [
    "Dev-experience focus: built around a frontend engineer debugging live, not a dedicated automation engineer running headless CI.",
    "Debuggability: failure shows the literal DOM snapshot, not just a stack trace.",
    "vs. Selenium: no driver-binary/version-matching pain (like Playwright).",
    "vs. Playwright — concrete failure points: cross-origin SSO needs cy.origin() ceremony; no clean multi-tab support; JS/TS only (no Python).",
  ],
  4: [
    "Native mobile apps (Appium's domain) — Cypress can only test mobile-viewport web.",
    "Load/performance testing — architecturally unsuited (one browser JS engine, can't simulate concurrent users); use k6/Locust.",
    "Heavy multi-tab/cross-origin suites — legitimate reason to reconsider Playwright, not \"using Cypress wrong.\"",
    "Non-JS/TS bindings — Cypress is JS/TS only, framed as portfolio breadth alongside Playwright/Python.",
  ],
  5: [
    "Expanded comparison table: Cypress runs in-browser (fast, no WebKit support ever, JS/TS only); Playwright runs externally via CDP (all 3 engines, multi-language); Selenium uses WebDriver HTTP (slowest, most manual).",
    "WebKit/Safari support is a permanent gap — no plugin or version bump will add it.",
    "Electron is Cypress's unique bundled default browser — fast but can show subtle rendering differences; use --browser chrome in CI for real-world accuracy.",
  ],
  6: [
    "Requires Node 18+; pure Node/JS toolchain (no Python-style venv equivalent).",
    "npm install cypress --save-dev → npx cypress open (launches setup wizard).",
    "Folder structure: cypress/e2e/ (specs, .cy.js convention), cypress/fixtures/, cypress/support/ (commands.js for custom commands, e2e.js auto-loaded before every spec — roughly conftest.py-like).",
    "No pages/ scaffolded by default — Cypress docs steer toward \"App Actions\" over classic POM.",
  ],
  7: [
    "Launchpad → pick a browser; use a real browser for active debugging, Electron for quick throwaway runs, explicit --browser chrome in CI.",
    "Command Log (left) + App Preview (right); clicking a log entry = time-travel to that DOM state.",
    "Selector Playground — built-in click-to-get-selector tool, lighter than Playwright's Codegen but zero extra setup.",
    "cypress open (interactive GUI, authoring/debugging) vs cypress run (headless, CI, full suite) — write/debug with open, validate with run before pushing.",
  ],
  8: [
    "describe/it are inherited from Mocha, not Cypress-native; context() is a pure alias for describe().",
    "cy.visit() uses relative paths (requires baseUrl configured) — hardcoding full URLs breaks env-switching.",
    "Implicit assertion style: .should() chained directly on a command (vs. Playwright's expect(locator) wrapping it).",
  ],
  9: [
    "baseUrl — single most impactful setting; newer Cypress versions error on startup if a relative cy.visit() is used with no baseUrl.",
    "Default viewport (1000×660) is smaller than most real screens — set explicitly to avoid confusing responsive-breakpoint failures.",
    "Separate, independently-tunable timeouts: defaultCommandTimeout, requestTimeout, responseTimeout, pageLoadTimeout — don't bump the global one to fix one slow feature; override per-command instead.",
    "Env vars layer with priority: config env block < cypress.env.json < CYPRESS_-prefixed OS vars < --env CLI flag (highest).",
  ],
  10: [
    "cy.visit() clears prior-origin cookies/storage; onBeforeLoad hook fires before app JS runs (seed localStorage, stub methods); auto-waits for page load.",
    "cy.get() is fundamentally CSS-based — no accessibility-tree matching like Playwright's get_by_role; has built-in retry-and-wait.",
    "cy.contains() prefers the deepest/most specific matching element; two-arg form (cy.contains('button', 'Submit')) scopes first — safer on non-trivial pages.",
    "cy.find() only makes sense chained after cy.get() — scopes search to the previously-yielded subject (Cypress's equivalent of Playwright's nested .locator() scoping).",
  ],
  11: [
    "data-cy is Cypress's officially recommended convention (same philosophy as Playwright's role/accessible-name-first, different mechanism) — requires dev buy-in.",
    "Fallback tier, most→least stable: data-cy/data-testid → stable id → semantic attrs (name, aria-label) → class names (last resort) → tag/nth-child (avoid).",
  ],
  12: [
    "Each command yields a subject to the next — a pipeline, like Unix pipes.",
    "Retry-ability re-runs the whole chain from the last query command through an assertion, not each command independently.",
    "Three command categories: query (cy.get, .find) — retried; action (.click, .type) — waits for actionability but doesn't re-query; assertion (.should, .and) — triggers the retry loop on preceding queries.",
  ],
  13: [
    ".as() re-references a subject via cy.get('@alias'); for DOM elements it re-queries (guards against staleness), but for intercepted routes/fixtures it retrieves the exact stored value.",
    "Most common use: aliasing cy.intercept() routes so cy.wait('@alias') pauses for that specific network call.",
    "Gotcha: fixture aliases accessed via this.aliasName require a regular function () {} test — arrow functions don't bind this.",
  ],
  14: [
    "Two styles: implicit .should() (retries — default choice, use for anything touching live DOM) vs. explicit expect() inside .then() (checks once, no retry — use for already-resolved/static values).",
    "Assertion vocabulary layered from three libraries: Chai (general), Chai-jQuery (DOM-specific: have.text, be.visible), Sinon-Chai (spy/stub: have.been.calledOnce).",
    ".and() is a pure readability alias for chaining a second .should().",
  ],
  15: [
    "Actionability checklist before click: not hidden, non-zero size, not covered, not disabled — retries then fails with a specific diagnostic error.",
    "{ force: true } skips all checks — legitimate only for by-design hidden inputs (custom checkboxes), not as a default fix for unexplained failures.",
    ".type() always fires real per-character keyboard events (no fast \"instant fill\" core command like Playwright's .fill()); workaround for instant-set is .invoke('val', ...).trigger('input'). {curly brace} syntax handles special keys/modifiers inline.",
  ],
  16: [
    "Good form tests assert the actual post-submit outcome, not just \"click didn't error.\"",
    "Every form needs both a happy-path test and a validation-failure test.",
    "'have.value' (input's current value) vs 'have.text'/'contain' (rendered text) — common early mix-up.",
  ],
  17: [
    ".check()/.uncheck() are idempotent (unlike .click()); array form .check(['A','B']) for multi-select groups.",
    "Radio buttons are mutually exclusive natively — no .uncheck() equivalent needed/possible.",
    ".select() only works on native <select> — custom styled dropdowns need click-to-open then cy.contains().click().",
  ],
  18: [
    "Cypress's in-browser execution model means cy.get() cannot see inside iframes at all by default — more restrictive than Playwright's native frame_locator().",
    "cypress-iframe plugin (cy.frameLoaded() + cy.iframe()) patches around it for same-origin iframes; cross-origin iframes (Stripe/PayPal payment widgets) are dramatically harder or untestable — a concrete case favoring Playwright.",
  ],
  19: [
    ".selectFile() is built-in since Cypress 9.3+ (older content still references the cypress-file-upload plugin); { action: 'drag-drop' } simulates drop-zone uploads.",
    "No download-event API like Playwright's expect_download(). Standard pattern: let the browser save to cypress/downloads/, then cy.readFile() (with timeout) to poll for and inspect the file.",
  ],
  20: [
    "Cypress auto-accepts alert()/confirm() by default (opposite of Playwright, which blocks/fails by default) — override via cy.on('window:confirm', handler), returning false to simulate Cancel.",
    "prompt() needs cy.stub(win, 'prompt').returns(...) since there's no dedicated prompt event.",
  ],
  21: [
    "Built-in cookie commands (cy.setCookie, getCookie, clearCookie(s)) — no plugin needed; cookies auto-clear before each test by default (testIsolation).",
    "localStorage commands (cy.setLocalStorage, etc.) are newer (12+); the cy.window().then(win => win.localStorage...) escape hatch is the older, still-useful general pattern.",
    "These are the literal building blocks under cy.session() (Ch. 26).",
  ],
  22: [
    "cy.wait(<number>) (fixed ms) is the anti-pattern — same name, totally different meaning from cy.wait('@alias') (waits for the aliased network call to complete).",
    "Default best practice: rely on .should()'s built-in retry for UI-only waits; use cy.intercept().as() + cy.wait('@alias') only when synchronizing with the actual network call matters.",
  ],
  23: [
    "cy.intercept() patches the page's own fetch/XHR (vs. Playwright's lower-level proxy) — doesn't catch non-fetch/XHR traffic as comprehensively.",
    "Stubbing: { fixture: 'users.json' } shorthand loads mock data in one line.",
    "Delay/error/network-failure simulation each exercise different app code paths (loading states, error UI, retry logic) — test them distinctly.",
    "Spying (intercept with no stub) lets the real request through while still tracking request/response for assertions — middle ground between mocked and black-box tests.",
  ],
  24: [
    "cy.request() runs from Cypress's own Node process — bypasses CORS, no page needed, can run before cy.visit().",
    "Auto-fails on non-2xx/3xx by default — must pass failOnStatusCode: false to test error responses (common early mistake).",
    ".its() extracts a property from a yielded object; combine UI+API tests using a closure variable set in beforeEach, cleaned up in afterEach.",
  ],
  25: [
    "cypress-image-snapshot — free, self-hosted pixel-diff plugin (no built-in equivalent, unlike Playwright's to_have_screenshot()).",
    "Percy/Applitools (paid) add smarter noise-tolerant diffing and reviewable approval workflows.",
    "cypress-axe wraps the same axe-core engine as Playwright's integration; cy.checkA11y() fails the test automatically on violations by default (Playwright's pattern requires manual assertion).",
  ],
  26: [
    "cy.session([cacheKey], setupFn, { validate }) caches cookies/localStorage/sessionStorage (a real edge over Playwright's storage_state, which only captures cookies+localStorage) — auto-restores across specs by cache key, with optional revalidation.",
    "Prefer programmatic (API-based) login for most tests; reserve real UI login for tests specifically about the login flow itself.",
  ],
  27: [
    "cy.origin(url, { args }, callback) is the escape hatch for cross-origin steps — callback runs in an isolated context, so outer-scope variables must be passed explicitly via args.",
    "True multi-tab control genuinely doesn't exist in Cypress — closest substitutes only verify intent (checking href, stubbing window.open), not actual new-tab content; this is a legitimate \"use Playwright instead\" case.",
    "Shadow DOM requires explicit .shadow() or the global includeShadowDom: true config (Playwright pierces automatically by default).",
  ],
  28: [
    "cy.mount() renders a component directly with chosen props — no app/router/backend needed; trivially tests edge-case props (zero balance, error states).",
    "Separate component config block; specs conventionally live next to their component files, not centralized like E2E specs.",
    "Component tests answer \"does this piece work in isolation\"; E2E answers \"does the real integrated system work\" — a mature suite uses both.",
  ],
  29: [
    "Cypress Cloud (paid) dynamically load-balances specs across CI machines by historical run time — smarter than naive even-splitting.",
    "cypress-parallel (free) spawns multiple local processes on one machine — bounded by that machine's resources, still a real speedup.",
    "CI-native matrix jobs (GitHub Actions, etc.) can distribute across real separate machines without Cloud, but with manual/naive splitting.",
  ],
  30: [
    "--browser chrome/firefox/edge/electron; before:browser:launch hook for browser-specific launch flags.",
    "No --browser webkit, ever — a permanent architectural absence, not a missing config option. Concrete, decisive fact for interviews if Safari traffic matters.",
  ],
  31: [
    "Time-travel (Command Log clicking) is the first, zero-code debugging tool.",
    ".debug() logs the current subject to DevTools console and pauses; .pause() gives step-through play/next controls in the Test Runner (Cypress's version of Playwright's Inspector).",
    "Real DevTools work directly against the live test run (no separate recorded-trace step needed) since test and app share the same tab.",
    "cy.log() interleaves custom messages directly into the Command Log timeline — better for post-hoc review than a plain console.log().",
  ],
};

function esc(s) {
  return JSON.stringify(s);
}

function chapterFileFor(n) {
  // global chapter number → part folder + chapter file index (1-based within part)
  const map = {
    0: ["part-0", 1],
    1: ["part-0", 2],
    2: ["part-0", 3],
    3: ["part-0", 4],
    4: ["part-0", 5],
    5: ["part-1", 1],
    6: ["part-1", 2],
    7: ["part-1", 3],
    8: ["part-1", 4],
    9: ["part-1", 5],
    10: ["part-2", 1],
    11: ["part-2", 2],
    12: ["part-2", 3],
    13: ["part-2", 4],
    14: ["part-2", 5],
    15: ["part-3", 1],
    16: ["part-3", 2],
    17: ["part-3", 3],
    18: ["part-3", 4],
    19: ["part-3", 5],
    20: ["part-3", 6],
    21: ["part-3", 7],
    22: ["part-3", 8],
    23: ["part-4", 1],
    24: ["part-4", 2],
    25: ["part-4", 3],
    26: ["part-4", 4],
    27: ["part-4", 5],
    28: ["part-4", 6],
    29: ["part-4", 7],
    30: ["part-4", 8],
    31: ["part-4", 9],
  };
  return map[n];
}

let updated = 0;
for (const [numStr, bullets] of Object.entries(SUMMARIES)) {
  const n = Number(numStr);
  const loc = chapterFileFor(n);
  if (!loc) continue;
  const [part, ch] = loc;
  const file = path.join(cy, part, `chapter-${ch}.ts`);
  if (!fs.existsSync(file)) {
    console.warn("missing", file);
    continue;
  }
  let text = fs.readFileSync(file, "utf8");
  const summaryValue = bullets.map((b) => `- ${b}`).join("\n");
  const field = `  customSummary: ${esc(summaryValue)},\n`;

  if (/^\s*customSummary:/m.test(text)) {
    text = text.replace(/^\s*customSummary:\s*(?:`[\s\S]*?`|"[\s\S]*?"|'[\s\S]*?'),\n/m, field);
  } else if (/^\s*contentMarkdown:/m.test(text)) {
    text = text.replace(/^(\s*contentMarkdown:)/m, `${field}$1`);
  } else if (/^\s*contentMarkdown:/m.test(text) === false && /^\s*exercises:/m.test(text)) {
    text = text.replace(/^(\s*exercises:)/m, `${field}$1`);
  } else {
    // insert before closing `} as ChapterRecord`
    text = text.replace(/\n\} as ChapterRecord;?\s*$/, `,\n${field}}\n`);
  }
  fs.writeFileSync(file, text);
  updated++;
  console.log(`ok ch ${n} → ${part}/chapter-${ch}.ts`);
}
console.log(`updated ${updated} chapters`);
