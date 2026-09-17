import type { ChapterRecord } from "../../../types";

/** 3.10 Cookies & Local/Session Storage */
export const chapter = {
  "id": "cy-3-10-cookies-local-session-storage",
  "title": "3.10 Cookies & Local/Session Storage",
  "minutes": 26,
  "level": "intermediate",
  "phase": "Part 3 · Interacting with Elements",
  "partName": "Part 3 · Interacting with Elements",
  "overviewText": "cy.setCookie / getCookie / clearCookies are core commands. localStorage and sessionStorage are usually read via cy.window() (cy.clearLocalStorage is core; Cypress 12 added clearAllLocalStorage / clearAllSessionStorage). testIsolation: true (the Cypress 12+ default) clears cookies, localStorage, and sessionStorage between tests — do not expect leftovers unless you turned isolation off.",
  "why": "Auth tokens live in cookies or storage. Tests that 'mysteriously' log out are often testIsolation doing its job. Tests that 'mysteriously' stay logged in are isolation disabled or cy.session. Part 7 goes deeper; this chapter is the raw API you must not get wrong.",
  "when": "Seeding a session cookie, asserting a theme key, debugging empty storage at test start. Revisit Part 7 when you need cy.session() instead of copy-pasting setCookie.",
  "practical": {
    "app": "Bizlevate HRM — JWT cookie plus theme in localStorage",
    "scenario": "Set a session cookie, assert dark theme from localStorage, then explain why the next test starts logged out.",
    "pass": "You use cy.setCookie/getCookie, window.localStorage.setItem/getItem (or clearLocalStorage), and you name testIsolation as the reason storage is empty in the following test.",
    "fail": "You assume localStorage survives to the next it(), or you call a non-existent cy.setLocalStorage as if it were core Cypress."
  },
  "tools": [],
  "customSummary": "- Cookies: cy.setCookie, getCookie, getCookies, clearCookie, clearCookies; Cypress 12+ also clearAllCookies.\n- Storage writes: cy.window().then(win => win.localStorage / sessionStorage). cy.clearLocalStorage is core; set/get helpers are plugins, not core.\n- testIsolation (default true since Cypress 12) clears cookies + localStorage + sessionStorage between tests.\n- cy.session() (Part 7) caches and restores this state — these commands are its building blocks.",
  "contentMarkdown": "## Cookies\n\n```js\ncy.setCookie('session_token', 'abc123');\ncy.getCookie('session_token').should('have.property', 'value', 'abc123');\ncy.getCookies();\ncy.clearCookie('session_token');\ncy.clearCookies();\n```\n\nSame-origin with the AUT. For `HttpOnly` cookies the app sets from the server, `cy.getCookie` can still read them from the browser store (unlike page JS). `cy.setCookie` options include `httpOnly`, `secure`, `path`, `expiry` — match what production actually uses or the app will ignore the cookie.\n\nCypress 12 also added `cy.clearAllCookies()` (all domains Cypress knows about), alongside `clearAllLocalStorage` / `clearAllSessionStorage`.\n\n## Local and session storage\n\nThere is **no** core `cy.setLocalStorage` / `cy.getLocalStorage`. Those names come from the `cypress-localstorage-commands` plugin. Core Cypress gives you:\n\n```js\ncy.window().then((win) => {\n  win.localStorage.setItem('theme', 'dark');\n  win.sessionStorage.setItem('wizardStep', '2');\n});\n\ncy.window().then((win) => {\n  expect(win.localStorage.getItem('theme')).to.eq('dark');\n});\n\ncy.clearLocalStorage(); // core — often the current origin\n```\n\nThe `cy.window()` escape hatch is the same pattern as stubbing `prompt` (3.9) and installing spies (3.13). Prefer it in this manual over a plugin for simple get/set.\n\n## `testIsolation` clears storage\n\nSince **Cypress 12**, `testIsolation: true` is the default. Between tests Cypress visits `about:blank` and clears:\n\n- cookies\n- `localStorage`\n- `sessionStorage`\n\nThat is why test B is logged out even if test A set a cookie — by design, like Playwright's fresh context. If you disable `testIsolation` (Part 7), state leaks and flakes return.\n\nDo not fight isolation by re-setting cookies in every spec by hand if `cy.session()` can cache login once per suite (Part 7.2). Do use `setCookie` / `localStorage` to **arrange** a specific state inside a test (feature flag key, dismissed-banner flag).\n\n## Debugging\n\n`Cypress.Cookies.debug(true)` logs cookie operations. In the Test Runner, Application tab of DevTools (on the AUT iframe) shows storage live — time-travel snapshots may not keep storage in sync the way they keep DOM; trust commands + DevTools.\n\n## vs Playwright\n\nPlaywright `context.add_cookies` / `storage_state` is context-scoped. Cypress cookies are browser-origin scoped plus `testIsolation` reset. `cy.session` ≈ `storage_state` for reuse. Interview-safe: \"Isolation clears cookies and web storage between tests by default; I seed with setCookie/window, and I cache login with cy.session, not by turning isolation off.\"\"",
  "blocks": [
    {
      "id": "cy-3-10-md-0",
      "type": "overview",
      "heading": "Cookies",
      "content": "```js\ncy.setCookie('session_token', 'abc123');\ncy.getCookie('session_token').should('have.property', 'value', 'abc123');\ncy.getCookies();\ncy.clearCookie('session_token');\ncy.clearCookies();\n```\n\nSame-origin with the AUT. For `HttpOnly` cookies the app sets from the server, `cy.getCookie` can still read them from the browser store (unlike page JS). `cy.setCookie` options include `httpOnly`, `secure`, `path`, `expiry` — match what production actually uses or the app will ignore the cookie.\n\nCypress 12 also added `cy.clearAllCookies()` (all domains Cypress knows about), alongside `clearAllLocalStorage` / `clearAllSessionStorage`.",
      "order": 0
    },
    {
      "id": "cy-3-10-md-1",
      "type": "overview",
      "heading": "Local and session storage",
      "content": "There is **no** core `cy.setLocalStorage` / `cy.getLocalStorage`. Those names come from the `cypress-localstorage-commands` plugin. Core Cypress gives you:\n\n```js\ncy.window().then((win) => {\n  win.localStorage.setItem('theme', 'dark');\n  win.sessionStorage.setItem('wizardStep', '2');\n});\n\ncy.window().then((win) => {\n  expect(win.localStorage.getItem('theme')).to.eq('dark');\n});\n\ncy.clearLocalStorage(); // core — often the current origin\n```\n\nThe `cy.window()` escape hatch is the same pattern as stubbing `prompt` (3.9) and installing spies (3.13). Prefer it in this manual over a plugin for simple get/set.",
      "order": 1
    },
    {
      "id": "cy-3-10-md-2",
      "type": "overview",
      "heading": "`testIsolation` clears storage",
      "content": "Since **Cypress 12**, `testIsolation: true` is the default. Between tests Cypress visits `about:blank` and clears:\n\n- cookies\n- `localStorage`\n- `sessionStorage`\n\nThat is why test B is logged out even if test A set a cookie — by design, like Playwright's fresh context. If you disable `testIsolation` (Part 7), state leaks and flakes return.\n\nDo not fight isolation by re-setting cookies in every spec by hand if `cy.session()` can cache login once per suite (Part 7.2). Do use `setCookie` / `localStorage` to **arrange** a specific state inside a test (feature flag key, dismissed-banner flag).",
      "order": 2
    },
    {
      "id": "cy-3-10-md-3",
      "type": "overview",
      "heading": "Debugging",
      "content": "`Cypress.Cookies.debug(true)` logs cookie operations. In the Test Runner, Application tab of DevTools (on the AUT iframe) shows storage live — time-travel snapshots may not keep storage in sync the way they keep DOM; trust commands + DevTools.",
      "order": 3
    },
    {
      "id": "cy-3-10-md-4",
      "type": "overview",
      "heading": "vs Playwright",
      "content": "Playwright `context.add_cookies` / `storage_state` is context-scoped. Cypress cookies are browser-origin scoped plus `testIsolation` reset. `cy.session` ≈ `storage_state` for reuse. Interview-safe: \"Isolation clears cookies and web storage between tests by default; I seed with setCookie/window, and I cache login with cy.session, not by turning isolation off.\"\"",
      "order": 4
    }
  ],
  "advantages": [
    "3.10 Cookies & Local/Session Storage — Auth tokens live in cookies or storage."
  ],
  "limitations": [
    "3.10 Cookies & Local/Session Storage is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
