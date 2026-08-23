import { PATHWISE_HEARTH_MANUALS, findHearthManual } from "../src/lib/pathwiseToHearth.ts";
import { existsSync, readFileSync } from "node:fs";

if (PATHWISE_HEARTH_MANUALS.length < 20) throw new Error("too few manuals");
const git = findHearthManual("git-version-control");
if (!git || git.chapters.length < 5) throw new Error("git manual missing chapters");
const pw = findHearthManual("playwright") || findHearthManual("playwright-test-automation");
if (!pw || pw.chapters.length < 10) throw new Error("playwright manual too small");
const levels = findHearthManual("testing-by-level") || findHearthManual("testing-types");
if (!levels || levels.chapters.length < 6) throw new Error("testing-by-level manual missing chapters");
if (levels.category !== "Quality Craft") throw new Error("testing-by-level should be Quality Craft");
if (levels.title !== "Testing Types") throw new Error("testing types manual should be titled Testing Types");
if (!existsSync("public/guides/testing-types.html")) throw new Error("testing types HTML guide missing");
const html = readFileSync("public/guides/testing-types.html", "utf8");
for (const title of [
  "Data-Driven Testing",
  "Keyword-Driven Testing",
  "Model-Based Testing",
  "Risk-Based Testing",
  "Backend Testing",
  "Network Testing",
  "Snapshot Testing",
  "Soak / Endurance Testing",
]) {
  if (!html.includes(title)) throw new Error(`testing types HTML missing ${title}`);
}
console.log(`ok ${PATHWISE_HEARTH_MANUALS.length} manuals; git ${git.chapters.length} ch; pw ${pw.chapters.length} ch; levels ${levels.chapters.length} ch`);
