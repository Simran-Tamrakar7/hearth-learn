---
id: "pw-1-intro"
title: "1. Introduction to Playwright"
minutes: 40
partName: "Part 1 · Foundations"
level: "beginner"
---

Hands-on entry point: Playwright vs Selenium vs Cypress, then supported browsers and languages — with Python as a near-complete API mirror of JS.

## What is Playwright, why it exists (hands-on framing)

This chapter restates the origin story from Part 0 but frames it as the entry point to hands-on learning — the point where you stop reading about the tool and start touching it. The key mental shift: everything in Part 0 was “why should I care,” Part 1 onward is “how do I actually use this.”

## Playwright vs Selenium vs Cypress

Worth having a clear mental table for this — it’s a near-guaranteed interview question.

Protocol: Selenium uses WebDriver over HTTP; Cypress runs inside the browser; Playwright talks CDP/WebSocket directly.

Browsers: Selenium supports many via separate drivers; Cypress is Chromium-family (with experimental Firefox/WebKit historically weak); Playwright supports Chromium, Firefox, and WebKit natively.

Auto-waiting: Selenium no (manual waits); Cypress yes; Playwright yes.

Multi-tab / multi-origin: Selenium clunky; Cypress weak by architecture; Playwright native support.

Languages: Selenium many; Cypress JS/TS only; Playwright JS/TS, Python, Java, .NET.

Speed: Selenium slower; Cypress fast; Playwright fast.

The Cypress limitation is worth understanding, not just memorizing: Cypress executes its test code inside the browser itself, in the same run loop as the page. That’s why it’s fast, but it also historically struggled with multiple tabs or cross-origin navigation. Playwright runs outside the browser and drives it externally, which is why it doesn’t have that constraint.

## Supported browsers & languages

Browsers: Chromium (covers Chrome + Edge), Firefox, WebKit (the engine behind Safari — meaning you can test Safari-like behavior on Linux/Windows CI machines without owning a Mac).

Languages: JavaScript/TypeScript (the original, most complete), Python, Java, and .NET/C#. Python’s API is a near-complete mirror of the JS one, which is why translating JS examples you find online is usually mechanical rather than conceptual — the method names and behavior are almost identical, just wrapped in Python syntax (snake_case instead of camelCase, for instance: get_by_role instead of getByRole).