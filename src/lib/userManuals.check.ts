import assert from "node:assert/strict";
import { ensureManualHeadings, notesToManual, slugifyTitle } from "./userManuals.ts";

assert.equal(slugifyTitle("  Hello, World!! "), "hello-world");

assert.throws(() => notesToManual("   "), /Paste some notes/);

const flat = notesToManual("Alpha intro.\n\nBravo is the second idea. It has more words.\n\nCharlie wraps it up.");
assert.ok(flat.slug.startsWith("ai-"));
assert.equal(flat.category, "AI & Prompting");
assert.ok(flat.chapters.length >= 2);
assert.ok(flat.chapters.every((c) => c.subtitle));
assert.ok(flat.chapters[0].contentMarkdown.includes("# "));
assert.ok(flat.chapters[0].why);
assert.ok(flat.chapters[0].when);

const md = notesToManual(`# Cypress Locators

Part 1 · Foundations
## Roles
Prefer getByRole.

Part 2 · Practice
## Tests
Write one spec.
`);
assert.equal(md.title, "Cypress Locators");
assert.equal(md.chapters.length, 2);
assert.equal(md.chapters[0].title, "Roles");
assert.equal(md.chapters[0].subtitle, "Foundations");
assert.equal(md.chapters[1].subtitle, "Practice");

const hashedParts = notesToManual(`# Manual
# Part 1 · Setup
## Install
Use npm.
# Part 2 · Run
## Scripts
npm test
`);
assert.equal(hashedParts.chapters[0].subtitle, "Setup");
assert.equal(hashedParts.chapters[1].subtitle, "Run");

const outlined = ensureManualHeadings("Only a title line that is short.\n\nSecond paragraph with the real notes.");
assert.match(outlined, /^# /);
assert.match(outlined, /Part 1 · Notes/);
assert.match(outlined, /^## /m);

console.log("userManuals.check: ok");
