import assert from "node:assert/strict";
import { trailProgressStats, chaptersWithCompletion, nextIncompleteChapter } from "./trailProgress.ts";

const chapters = [{ id: "a" }, { id: "b" }, { id: "c" }];
const stats = trailProgressStats(chapters, ["a", "c"]);
assert.equal(stats.completedCount, 2);
assert.equal(stats.progressPercent, 67);

const withStatus = chaptersWithCompletion(chapters, ["b"]);
assert.equal(withStatus[0].isCompleted, false);
assert.equal(withStatus[1].isCompleted, true);

assert.equal(nextIncompleteChapter(chapters, ["a"])?.id, "b");

console.log("lib/trailProgress.check: ok");
