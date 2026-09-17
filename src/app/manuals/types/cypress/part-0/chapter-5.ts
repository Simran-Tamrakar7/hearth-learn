import type { ChapterRecord } from "../../../types";

/** 0.5 Architecture — Runs Inside the Browser */
export const chapter = {
  "id": "cy-0-5-architecture-runs-inside-the-browser",
  "title": "0.5 Architecture — Runs Inside the Browser",
  "minutes": 32,
  "level": "beginner",
  "phase": "Part 0 · Orientation",
  "partName": "Part 0 · Orientation",
  "overviewText": "Cypress launches a browser, navigates to an internal runner page, then loads your app in an iframe. Spec code executes in the top-level window with privileged access into that iframe. That shared JS realm is how cy.intercept() patches fetch/XHR and cy.clock() replaces Date/timers. Commands are a queue, not Promises, because retry-ability cannot be expressed by a one-shot Promise. Cross-origin is where the privileged-access trick hits the browser's same-origin policy.",
  "why": "Every Cypress limitation and superpower in later parts traces to this architecture. If you can walk through the iframe + command queue mechanically, you can explain intercepts, clocks, cy.origin(), and why await cy.get() is wrong.",
  "when": "Before Part 2 (command queue) and Part 9 (cy.origin). Revisit when debugging 'why can't I read this variable yet?'",
  "practical": {
    "app": "Any Cypress-controlled web app",
    "scenario": "Explain how Cypress can stub window.fetch before the app's first request, and why navigating to login.okta.com breaks that privilege.",
    "pass": "You describe runner page → app iframe, in-page monkey-patching, the enqueue-then-execute queue, and cy.origin() as a scoped re-injection — not a broken security model.",
    "fail": "You say 'Cypress is just faster' or claim Cypress 'breaks' same-origin policy."
  },
  "tools": [],
  "customSummary": "- Cypress loads its own runner page, then loads your app inside an iframe; test code runs in the top-level context with privileged access into that iframe.\n- Enables direct patching of fetch/XMLHttpRequest (precise cy.intercept()) and Date/timers (cy.clock()).\n- No IPC/serialization round-trip per command.\n- Commands aren't Promises because retry (check, wait, recheck) cannot be a one-shot Promise — hence the command queue.\n- Cross-origin/multi-tab limits are direct consequences of this shared-iframe, same-origin-bound model.",
  "contentMarkdown": "## The mechanical walkthrough\n\nWhen you run `cypress open` or `cypress run`, Cypress launches a browser process (Electron by default, or Chrome/Edge/Firefox if configured) and navigates it to an internal Cypress-controlled page — not your app. That page then creates an `<iframe>` and loads your application's `baseUrl` into it. Your spec file's test code — the `describe`/`it` blocks you write — is bundled and executed in the top-level window, the one hosting that iframe, not inside the iframe itself.\n\nBecause the top-level window and the iframe are same-origin-adjacent under Cypress's control, Cypress can reach directly into the iframe's `window`, `document`, and JS execution context with full synchronous access — something an external tool like Selenium or Playwright can never do, since they interact with the page purely through a browser-automation protocol, treating the page's internals as a black box they poke from outside.\n\n## What this buys you concretely\n\nBecause Cypress test code and app code share a JS realm, Cypress can install hooks before your app's own JavaScript even starts running. This is exactly how `cy.intercept()` (Part 5) achieves such precise network mocking — Cypress monkey-patches `window.fetch` and `XMLHttpRequest.prototype` at the moment the iframe's page loads, so every network call your app makes, from the very first one, passes through Cypress's interception layer. A proxy-based approach has to sit at the network layer and can miss subtleties like exactly which JS code initiated a request.\n\nSimilarly, `cy.clock()` works by replacing the iframe's own `Date`, `setTimeout`, `setInterval`, and `requestAnimationFrame` with Cypress-controlled fakes — again, only possible because Cypress has direct write access into that execution context.\n\n## The Promise problem, revisited mechanically\n\nBecause there's no network/IPC hop between \"test command issued\" and \"command executed,\" Cypress could theoretically make every command return a real Promise. It deliberately doesn't. A native Promise resolves exactly once, based on whatever state exists at the moment `.then()` fires. If `cy.get('.button')` returned a Promise, it would either resolve immediately with whatever elements exist right now (even if the button hasn't rendered yet) or hang forever waiting for something that may never come.\n\nInstead, Cypress built an internal, chainable command queue: each command you write (`cy.get()`, `.click()`, `.should()`) gets pushed onto a queue as your test function runs synchronously, and only after your test function finishes running top-to-bottom does Cypress start actually executing that queue, command by command — retrying each one internally against a timeout before moving to the next.\n\nThis queued-then-executed model is why test code that tries to read a value out into a plain JS variable outside a `.then()` callback silently fails to work as expected — the command genuinely hasn't run yet at that point in your code.\n\n## Why the boundary breaks at cross-origin\n\nBrowsers enforce the same-origin policy at a fundamental security level: JavaScript running in one origin's context cannot freely read or manipulate the DOM of an iframe (or a window) belonging to a different origin, full stop. Cypress's entire privileged-access trick depends on your app living inside an iframe that shares an effective origin relationship with the Cypress runner page.\n\nThe moment your app navigates to `login.okta.com` or any other third-party domain, that navigation creates a genuine cross-origin boundary that the browser itself enforces — Cypress isn't choosing to lose access as a design preference, it's hitting the same wall any same-origin JavaScript would hit.\n\n`cy.origin()` (Part 9) works around this not by breaking the browser's security model, but by explicitly telling Cypress \"run this specific block of commands as if you were injected into that origin instead,\" effectively re-establishing privileged access scoped to the new origin for just that block.",
  "blocks": [
    {
      "id": "cy-0-5-md-0",
      "type": "overview",
      "heading": "The mechanical walkthrough",
      "content": "When you run `cypress open` or `cypress run`, Cypress launches a browser process (Electron by default, or Chrome/Edge/Firefox if configured) and navigates it to an internal Cypress-controlled page — not your app. That page then creates an `<iframe>` and loads your application's `baseUrl` into it. Your spec file's test code — the `describe`/`it` blocks you write — is bundled and executed in the top-level window, the one hosting that iframe, not inside the iframe itself.\n\nBecause the top-level window and the iframe are same-origin-adjacent under Cypress's control, Cypress can reach directly into the iframe's `window`, `document`, and JS execution context with full synchronous access — something an external tool like Selenium or Playwright can never do, since they interact with the page purely through a browser-automation protocol, treating the page's internals as a black box they poke from outside.",
      "order": 0
    },
    {
      "id": "cy-0-5-md-1",
      "type": "overview",
      "heading": "What this buys you concretely",
      "content": "Because Cypress test code and app code share a JS realm, Cypress can install hooks before your app's own JavaScript even starts running. This is exactly how `cy.intercept()` (Part 5) achieves such precise network mocking — Cypress monkey-patches `window.fetch` and `XMLHttpRequest.prototype` at the moment the iframe's page loads, so every network call your app makes, from the very first one, passes through Cypress's interception layer. A proxy-based approach has to sit at the network layer and can miss subtleties like exactly which JS code initiated a request.\n\nSimilarly, `cy.clock()` works by replacing the iframe's own `Date`, `setTimeout`, `setInterval`, and `requestAnimationFrame` with Cypress-controlled fakes — again, only possible because Cypress has direct write access into that execution context.",
      "order": 1
    },
    {
      "id": "cy-0-5-md-2",
      "type": "overview",
      "heading": "The Promise problem, revisited mechanically",
      "content": "Because there's no network/IPC hop between \"test command issued\" and \"command executed,\" Cypress could theoretically make every command return a real Promise. It deliberately doesn't. A native Promise resolves exactly once, based on whatever state exists at the moment `.then()` fires. If `cy.get('.button')` returned a Promise, it would either resolve immediately with whatever elements exist right now (even if the button hasn't rendered yet) or hang forever waiting for something that may never come.\n\nInstead, Cypress built an internal, chainable command queue: each command you write (`cy.get()`, `.click()`, `.should()`) gets pushed onto a queue as your test function runs synchronously, and only after your test function finishes running top-to-bottom does Cypress start actually executing that queue, command by command — retrying each one internally against a timeout before moving to the next.\n\nThis queued-then-executed model is why test code that tries to read a value out into a plain JS variable outside a `.then()` callback silently fails to work as expected — the command genuinely hasn't run yet at that point in your code.",
      "order": 2
    },
    {
      "id": "cy-0-5-md-3",
      "type": "overview",
      "heading": "Why the boundary breaks at cross-origin",
      "content": "Browsers enforce the same-origin policy at a fundamental security level: JavaScript running in one origin's context cannot freely read or manipulate the DOM of an iframe (or a window) belonging to a different origin, full stop. Cypress's entire privileged-access trick depends on your app living inside an iframe that shares an effective origin relationship with the Cypress runner page.\n\nThe moment your app navigates to `login.okta.com` or any other third-party domain, that navigation creates a genuine cross-origin boundary that the browser itself enforces — Cypress isn't choosing to lose access as a design preference, it's hitting the same wall any same-origin JavaScript would hit.\n\n`cy.origin()` (Part 9) works around this not by breaking the browser's security model, but by explicitly telling Cypress \"run this specific block of commands as if you were injected into that origin instead,\" effectively re-establishing privileged access scoped to the new origin for just that block.",
      "order": 3
    }
  ],
  "advantages": [
    "0.5 Architecture — Runs Inside the Browser — Every Cypress limitation and superpower in later parts traces to this architecture."
  ],
  "limitations": [
    "0.5 Architecture — Runs Inside the Browser is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
