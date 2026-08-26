import assert from "node:assert/strict";
import { mergePrefs, parseSiteFeatures, DEFAULT_SITE_FEATURES, FEATURE_KEYS } from "./prefs.ts";

const merged = mergePrefs(
  { progress: { a: ["1"] }, resume: { a: { chapterIndex: 0 } }, highlightLegend: { yellow: "old" } },
  { progress: { b: ["2"] }, resume: { a: { chapterIndex: 3 } }, highlightLegend: { green: "do" } }
);
assert.deepEqual(merged.progress, { a: ["1"], b: ["2"] });
assert.equal(merged.resume?.a.chapterIndex, 3);
assert.equal(merged.highlightLegend?.yellow, "old");
assert.equal(merged.highlightLegend?.green, "do");

const features = parseSiteFeatures(JSON.stringify({ library: false, nope: true }));
assert.equal(features.library, false);
assert.equal(features.notes, true);
assert.equal(FEATURE_KEYS.length, Object.keys(DEFAULT_SITE_FEATURES).length);

console.log("prefs.check: ok");
