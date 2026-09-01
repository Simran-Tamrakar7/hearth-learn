import { PATHWISE_HEARTH_MANUALS, findHearthManual } from "../src/app/manuals/features/reader.tsx";
import { existsSync } from "node:fs";

if (PATHWISE_HEARTH_MANUALS.length < 20) throw new Error("too few manuals");
const git = findHearthManual("git-version-control");
if (!git || git.chapters.length < 5) throw new Error("git manual missing chapters");
const pw = findHearthManual("playwright") || findHearthManual("playwright-test-automation");
if (!pw || pw.chapters.length < 50) throw new Error("playwright manual too small");
const levels = findHearthManual("testing-by-level") || findHearthManual("testing-types");
if (!levels || levels.chapters.length !== 92) throw new Error("testing-types should have 92 chapters");
if (levels.category !== "Automation & Testing") throw new Error("testing-types should be Automation & Testing");
if (levels.title !== "Testing Types & Levels") throw new Error("testing types manual should be titled Testing Types & Levels");
if (!existsSync("public/guides/testing-types.html")) throw new Error("testing types HTML guide missing");
console.log(`ok ${PATHWISE_HEARTH_MANUALS.length} manuals; git ${git.chapters.length} ch; pw ${pw.chapters.length} ch; levels ${levels.chapters.length} ch`);
