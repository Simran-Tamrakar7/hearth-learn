import assert from "node:assert/strict";
import { addTag, normalizeTag } from "./tags.ts";

assert.equal(normalizeTag("  QA  "), "QA");
assert.deepEqual(addTag([], "draft"), ["draft"]);
assert.deepEqual(addTag(["draft"], "Draft"), ["draft"]);
assert.deepEqual(addTag(["qa"], "  "), ["qa"]);

console.log("tags.check: ok");
