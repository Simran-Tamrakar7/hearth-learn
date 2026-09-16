#!/usr/bin/env node
/**
 * Guard: block catalog includes required types; emptyBlock covers every type.
 * Run: npx tsx scripts/check-chapter-blocks.ts
 */
import assert from "node:assert/strict";
import {
  BLOCK_CATALOG,
  BLOCK_TYPES,
  emptyBlock,
  blockTypesForMenu,
  legacyFieldsToBlocks,
  withOrder,
  duplicateBlock,
  chapterPublishIssues,
} from "../src/app/manuals/features/blocks/types";
import {
  applyDrop,
  isDefaultStacked,
  moveBlockToRow,
  persistableLayout,
  sanitizeLayout,
  setRowColumns,
  stackedLayout,
} from "../src/app/manuals/features/blocks/layout";

assert.equal(BLOCK_TYPES.length, BLOCK_CATALOG.length, "catalog must list every type");

for (const t of BLOCK_TYPES) {
  const b = emptyBlock(t);
  assert.equal(b.type, t);
  assert.ok(b.id);
}

assert.equal(blockTypesForMenu(null).length, BLOCK_CATALOG.length);
assert.equal(blockTypesForMenu(["why", "bullets"]).length, 2);

const synthesized = legacyFieldsToBlocks({
  why: "Because",
  when: "Now",
  keyDifferences: ["No equivalent"],
});
assert.ok(synthesized.some((b) => b.type === "why"));
assert.ok(synthesized.some((b) => b.type === "keyDifference"));

const required = [
  "bullets",
  "tree",
  "featureMapping",
  "gap",
  "curatedResources",
  "tier",
  "tip",
  "warning",
  "steps",
  "definition",
  "checklist",
  "resources",
  "quote",
  "image",
  "table",
  "video",
];
for (const t of required) {
  assert.ok(BLOCK_TYPES.includes(t as (typeof BLOCK_TYPES)[number]), `missing ${t}`);
}

assert.ok(BLOCK_TYPES.includes("practical" as (typeof BLOCK_TYPES)[number]));
const practical = emptyBlock("practical");
assert.equal(practical.type, "practical");
if (practical.type === "practical") {
  assert.ok((practical.practical.columns?.length || 0) >= 2, "practical starts with fail/pass columns");
}

const tradeoffs = emptyBlock("tradeoffs");
assert.equal(tradeoffs.type, "tradeoffs");
if (tradeoffs.type === "tradeoffs") {
  assert.ok((tradeoffs.columns?.length || 0) >= 2, "tradeoffs starts with two columns");
}

const ordered = [emptyBlock("tip"), emptyBlock("quote")];
ordered[0].order = 9;
const renumbered = withOrder(ordered);
assert.equal(renumbered[0].order, 0);
assert.equal(renumbered[1].order, 1);

const original = emptyBlock("tip");
const copy = duplicateBlock(original);
assert.notEqual(copy.id, original.id);

const incomplete = chapterPublishIssues([emptyBlock("practical")]);
assert.ok(incomplete.length >= 1, "empty column block fails publish validation");

const filtered = blockTypesForMenu(["tip", "quote"]);
assert.equal(filtered.length, 2);
assert.ok(filtered.every((m) => m.type === "tip" || m.type === "quote"));

const stacked = stackedLayout(["a", "b", "c"]);
assert.ok(isDefaultStacked(stacked, ["a", "b", "c"]));
assert.equal(persistableLayout(undefined, stacked, ["a", "b", "c"]), undefined);

const twoCol = setRowColumns(stacked, stacked.rows[0].id, 2);
assert.equal(twoCol.rows[0].columns, 2);
assert.ok(persistableLayout(undefined, twoCol, ["a", "b", "c"]));

const withC = moveBlockToRow(
  {
    rows: [
      { id: "r1", columns: 2, blockIds: ["a", "b"] },
      { id: "r2", columns: 1, blockIds: ["c"] },
    ],
  },
  "c",
  "r1",
  2
);
assert.equal(withC.rows.find((r) => r.id === "r1")?.columns, 3);
assert.deepEqual(withC.rows.find((r) => r.id === "r1")?.blockIds, ["a", "b", "c"]);

const overflow = moveBlockToRow(
  { rows: [{ id: "r", columns: 3, blockIds: ["a", "b", "c"] }] },
  "d",
  "r",
  3
);
assert.equal(overflow.rows[0].blockIds.length, 3);
assert.equal(overflow.rows[1].blockIds[0], "d");

const shrunk = setRowColumns(
  { rows: [{ id: "r", columns: 3, blockIds: ["a", "b", "c"] }] },
  "r",
  2
);
assert.deepEqual(shrunk.rows[0].blockIds, ["a", "b"]);
assert.deepEqual(shrunk.rows[1].blockIds, ["c"]);

const reordered = applyDrop(
  { rows: [{ id: "r", columns: 3, blockIds: ["a", "b", "c"] }] },
  "c",
  "a"
);
assert.deepEqual(reordered.rows[0].blockIds, ["c", "a", "b"]);

const orphans = sanitizeLayout({ rows: [{ id: "r", columns: 1, blockIds: ["gone"] }] }, ["keep"]);
assert.ok(orphans.rows.some((r) => r.blockIds.includes("keep")));
assert.ok(!orphans.rows.some((r) => r.blockIds.includes("gone")));

console.log("check-chapter-blocks: ok");
