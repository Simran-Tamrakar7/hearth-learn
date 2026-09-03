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
} from "../src/app/manuals/features/blocks/types";

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

console.log("check-chapter-blocks: ok");
