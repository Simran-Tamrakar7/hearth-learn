import { PATHWISE_HEARTH_MANUALS, findHearthManual } from "../src/lib/pathwiseToHearth.ts";

if (PATHWISE_HEARTH_MANUALS.length < 20) throw new Error("too few manuals");
const git = findHearthManual("git-version-control");
if (!git || git.chapters.length < 5) throw new Error("git manual missing chapters");
const pw = findHearthManual("playwright") || findHearthManual("playwright-test-automation");
if (!pw || pw.chapters.length < 10) throw new Error("playwright manual too small");
console.log(`ok ${PATHWISE_HEARTH_MANUALS.length} manuals; git ${git.chapters.length} ch; pw ${pw.chapters.length} ch`);
