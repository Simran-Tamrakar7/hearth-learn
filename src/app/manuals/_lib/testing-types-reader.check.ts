import assert from "node:assert/strict";
import { groupChaptersIntoParts, tocNumbersForPart } from "./manualParts.ts";
import { TESTING_TYPES_OUTLINE, flattenTestingTypesOutline, restoreTestingTypesToc } from "../_content/testing-types/outline.ts";

const rows = flattenTestingTypesOutline();
assert.equal(TESTING_TYPES_OUTLINE.length, 15);
assert.equal(TESTING_TYPES_OUTLINE[0].name, "Testing by Level");
assert.equal(TESTING_TYPES_OUTLINE[14].name, "Other Specialized Testing");

const nos = rows.map((r) => r.no).filter((n): n is number => n != null);
assert.equal(nos.length, 92);
assert.equal(new Set(nos).size, 92);
for (let n = 1; n <= 92; n++) {
  assert.ok(nos.includes(n), `missing overlay type #${n}`);
}

const bigBang = rows.find((r) => r.title === "Big Bang Integration Testing");
assert.equal(bigBang?.parentTitle, "Integration Testing");
assert.equal(bigBang?.no, 64);

const qualityKids = rows.filter((r) => r.parentTitle === "Quality Attributes");
assert.equal(qualityKids.length, 5);
assert.deepEqual(
  qualityKids.map((r) => r.title),
  [
    "Usability Testing",
    "Accessibility Testing",
    "Compliance / Regulatory Testing",
    "SEO / Site Health Testing",
    "Security Testing",
  ]
);

const chapters = rows.map((r, i) => ({
  id: r.title,
  subtitle: r.part,
  parentId: r.parentTitle,
  order: i + 1,
}));
const parts = groupChaptersIntoParts(chapters);
assert.equal(parts.length, 15);

const nums = tocNumbersForPart(chapters, parts[0].chapterIndices, 1);
assert.equal(nums.get(rows.findIndex((r) => r.title === "Unit Testing")), "1.1");
assert.equal(nums.get(rows.findIndex((r) => r.title === "Integration Testing")), "1.2");
assert.equal(nums.get(rows.findIndex((r) => r.title === "Big Bang Integration Testing")), "1.2.1");

const ch4 = tocNumbersForPart(chapters, parts[3].chapterIndices, 4);
assert.equal(ch4.get(rows.findIndex((r) => r.title === "Quality Attributes")), "4.5");
assert.equal(ch4.get(rows.findIndex((r) => r.title === "Usability Testing")), "4.5.1");

const flow = rows.find((r) => r.title === "Business Flow Testing");
assert.equal(flow?.no, 86);
assert.equal(flow?.parentTitle, undefined);

assert.equal(restoreTestingTypesToc({ tocManaged: true }), false);
assert.equal(restoreTestingTypesToc({ tocManaged: true, tocCatalogVersion: 14 }), false);
assert.equal(restoreTestingTypesToc({ tocManaged: true, tocCatalogVersion: 15 }), false);
assert.equal(restoreTestingTypesToc({ tocManaged: true, tocCatalogVersion: 16 }), false);
assert.equal(restoreTestingTypesToc({ tocManaged: true, tocCatalogVersion: 17 }), false);
assert.equal(restoreTestingTypesToc({ tocManaged: true, tocCatalogVersion: 18 }), true);
assert.equal(restoreTestingTypesToc(null), false);

console.log("testing-types-reader.check: ok");
