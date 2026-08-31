import assert from "node:assert/strict";
import { applyLessonFormat } from "./lessonFormat.ts";

const bold = applyLessonFormat("hello", 0, 5, "bold");
assert.equal(bold.next, "**hello**");
assert.equal(bold.innerStart, 2);
assert.equal(bold.innerLen, 5);

const h2 = applyLessonFormat("body", 0, 4, "h2");
assert.equal(h2.next, "## body");

const mid = applyLessonFormat("ab", 2, 2, "h1");
assert.equal(mid.next, "ab\n# Heading");

console.log("lessonFormat.check: ok");
