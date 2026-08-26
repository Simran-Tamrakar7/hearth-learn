import assert from "node:assert/strict";
import {
  DEFAULT_CATEGORIES,
  UNCATEGORIZED,
  removeFromList,
  renameInList,
  withUncategorized,
} from "./categories.ts";

assert.ok(DEFAULT_CATEGORIES.includes("Automation & Testing"));
assert.deepEqual(withUncategorized(["Foundations", "Foundations", ""]), ["Foundations", UNCATEGORIZED]);
assert.deepEqual(renameInList(["Foundations", "Career"], "Career", "Jobs"), ["Foundations", "Jobs", UNCATEGORIZED]);
assert.ok(!removeFromList(["Foundations", "Career"], "Career").includes("Career"));
assert.ok(removeFromList(["Foundations", UNCATEGORIZED], UNCATEGORIZED).includes(UNCATEGORIZED));

console.log("categories.check: ok");
