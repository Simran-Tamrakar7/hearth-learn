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

const multiList = applyLessonFormat("alpha\nbeta\ngamma", 0, 17, "list");
assert.equal(multiList.next, "- alpha\n- beta\n- gamma");

const multiSteps = applyLessonFormat("one\ntwo", 0, 7, "num");
assert.equal(multiSteps.next, "1. one\n2. two");

console.log("lessonFormat.check: ok");
