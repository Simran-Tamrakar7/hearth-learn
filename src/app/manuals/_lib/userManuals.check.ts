import assert from "node:assert/strict";
import { deleteUserManual, emptyManual, ensureManualHeadings, mergeHiddenSlug, notesToManual, slugifyTitle } from "./userManuals.ts";

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

const withSubs = notesToManual(`# Manual
Part 1 · Core
## Locators
Prefer roles.
### getByRole
Find by name.
### getByLabel
Find by label.
`);
assert.equal(withSubs.chapters.length, 3);
assert.equal(withSubs.chapters[0].title, "Locators");
assert.equal(withSubs.chapters[1].title, "getByRole");
assert.equal(withSubs.chapters[1].parentId, withSubs.chapters[0].id);
assert.equal(withSubs.chapters[2].parentId, withSubs.chapters[0].id);

const outlined = ensureManualHeadings("Only a title line that is short.\n\nSecond paragraph with the real notes.");
assert.match(outlined, /^# /);
assert.match(outlined, /Part 1 · Notes/);
assert.match(outlined, /^## /m);

const blank = emptyManual("Starter");
assert.equal(blank.title, "Starter");
assert.ok(blank.slug.startsWith("ai-"));
assert.ok(blank.chapters.length >= 1);

assert.equal(deleteUserManual("missing"), false);
assert.deepEqual(mergeHiddenSlug(["cypress"], "git-version-control"), ["cypress", "git-version-control"]);
assert.deepEqual(mergeHiddenSlug(["cypress"], "cypress"), ["cypress"]);
assert.deepEqual(mergeHiddenSlug(["cypress"], "  "), ["cypress"]);

console.log("userManuals.check: ok");
