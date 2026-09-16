#!/usr/bin/env node
/**
 * Small guard: chapter insight fields stay content-driven (no filler Adv/Lim on comparison chapters).
 * Run: npx tsx scripts/check-insight-boxes.ts
 */
import { chapter as unit } from "../src/app/manuals/types/testing-types/part-1/chapter-1.ts";
import { chapter as pw } from "../src/app/manuals/types/playwright/part-1/chapter-1.ts";

function fail(msg: string): never {
  console.error("FAIL:", msg);
  process.exit(1);
}

if (!unit.advantages?.length || !unit.limitations?.length) {
  fail("Testing Types unit chapter must keep Advantages/Limitations");
}
if (!pw.comparisons?.length || pw.advantages) {
  fail("Playwright intro should be Comparison-driven without filler Adv");
}

console.log("check-insight-boxes: ok");
