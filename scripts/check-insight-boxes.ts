#!/usr/bin/env node
/**
 * Small guard: chapter insight fields stay content-driven (no filler Adv/Lim on comparison chapters).
 * Run: npx tsx scripts/check-insight-boxes.ts
 */
import { chapter as perf } from "../src/app/manuals/types/cypress/part-6/chapter-4";
import { chapter as auth } from "../src/app/manuals/types/cypress/part-4/chapter-4";
import { chapter as unit } from "../src/app/manuals/types/testing-types/part-1/chapter-1";
import { chapter as pw } from "../src/app/manuals/types/playwright/part-1/chapter-1";

function fail(msg: string): never {
  console.error("FAIL:", msg);
  process.exit(1);
}

if (!perf.comparisons?.length || !perf.keyDifferences?.length || !perf.codeReferences?.length) {
  fail("Cypress ch46 must use Comparison + KeyDifference + CodeReference");
}
if (perf.advantages || perf.limitations) {
  fail("Cypress ch46 must not use Advantages/Limitations");
}
if (!auth.comparisons?.length || !auth.advantages?.length) {
  fail("Cypress auth chapter should keep comparison + real trade-offs");
}
if (!unit.advantages?.length || !unit.limitations?.length) {
  fail("Testing Types unit chapter must keep Advantages/Limitations");
}
if (!pw.comparisons?.length || pw.advantages) {
  fail("Playwright intro should be Comparison-driven without filler Adv");
}

console.log("check-insight-boxes: ok");
