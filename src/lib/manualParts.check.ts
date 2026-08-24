import assert from "node:assert/strict";
import {
  chapterIndexAfter,
  createPart,
  deleteParts,
  displayPartTitle,
  groupChaptersIntoParts,
  mergeParts,
  moveChapterToPart,
  moveParts,
  renamePart,
  stripPartNumber,
} from "./manualParts.ts";

type Ch = {
  id: string;
  title: string;
  subtitle?: string;
  partKey?: string;
  order?: number;
  contentMarkdown?: string;
};

function ch(id: string, subtitle: string, content = id): Ch {
  return { id, title: id, subtitle, contentMarkdown: content };
}

const seed: Ch[] = [
  ch("a", "Part 1 · By Level"),
  ch("b", "Part 1 · By Level"),
  ch("c", "Part 2 · Execution"),
  ch("d", "Part 2 · Functional"),
  ch("e", "Part 3 · Functional"),
];

const groups = groupChaptersIntoParts(seed);
assert.equal(groups.length, 4);
assert.equal(displayPartTitle(0, groups[0].name), "Part 1 · By Level");
assert.equal(displayPartTitle(1, groups[1].name), "Part 2 · Execution");
assert.equal(displayPartTitle(2, groups[2].name), "Part 3 · Functional");
assert.equal(displayPartTitle(3, groups[3].name), "Part 4 · Functional");
assert.equal(stripPartNumber("Part 17 · Data-Driven"), "Data-Driven");

const created = createPart(seed, ch("n", "New Part"), 0);
const createdGroups = groupChaptersIntoParts(created);
assert.equal(createdGroups.length, 5);
assert.equal(displayPartTitle(1, createdGroups[1].name), "Part 2 · New Part");
assert.equal(createdGroups[0].name, "By Level");
assert.equal(createdGroups[2].name, "Execution");

const deleted = deleteParts(seed, [1]);
const deletedGroups = groupChaptersIntoParts(deleted);
assert.equal(deletedGroups.length, 3);
assert.equal(deletedGroups.map((g) => displayPartTitle(g.index, g.name)).join("|"), "Part 1 · By Level|Part 2 · Functional|Part 3 · Functional");
assert.ok(!deleted.some((c) => c.id === "c"));

const renamed = renamePart(seed, 0, "Foundations");
assert.equal(groupChaptersIntoParts(renamed)[0].name, "Foundations");
assert.equal(displayPartTitle(0, groupChaptersIntoParts(renamed)[0].name), "Part 1 · Foundations");

const up = moveParts(seed, [2], -1);
assert.equal(groupChaptersIntoParts(up.chapters)[1].name, "Functional");
assert.deepEqual(up.selected, [1]);
assert.equal(up.chapters.map((c) => c.id).join(""), "abdce");

const bulkDown = moveParts(seed, [0, 1], 1);
assert.equal(bulkDown.chapters.map((c) => c.id).join(""), "dabce");
assert.deepEqual(bulkDown.selected, [1, 2]);

const merged = mergeParts(seed, [2, 3]);
const mergedGroups = groupChaptersIntoParts(merged);
assert.equal(mergedGroups.length, 3);
assert.equal(mergedGroups[2].chapters.map((c) => c.id).join(""), "de");
assert.equal(mergedGroups[2].name, "Functional");
assert.equal(displayPartTitle(2, mergedGroups[2].name), "Part 3 · Functional");

const mergedGap = mergeParts(seed, [0, 2]);
assert.equal(mergedGap.map((c) => c.id).join(""), "abdce");
assert.equal(groupChaptersIntoParts(mergedGap).length, 3);
assert.equal(groupChaptersIntoParts(mergedGap)[0].chapters.map((c) => c.id).join(""), "abd");

assert.equal(chapterIndexAfter(merged, "e", 0), merged.findIndex((c) => c.id === "e"));
assert.equal(chapterIndexAfter(merged, "missing", 9), merged.length - 1);

const toPart = moveChapterToPart(seed, 0, 2);
assert.equal(toPart.map((c) => c.id).join(""), "bcdae");
assert.equal(groupChaptersIntoParts(toPart)[2].chapters.map((c) => c.id).join(""), "da");
assert.equal(displayPartTitle(2, groupChaptersIntoParts(toPart)[2].name), "Part 3 · Functional");

const emptied = moveChapterToPart(seed, 2, 0);
assert.equal(emptied.map((c) => c.id).join(""), "abcde");
assert.equal(groupChaptersIntoParts(emptied).length, 3);
assert.equal(groupChaptersIntoParts(emptied)[0].chapters.map((c) => c.id).join(""), "abc");

const same = moveChapterToPart(seed, 0, 0);
assert.equal(same.map((c) => c.id).join(""), "abcde");

const fresh = moveChapterToPart(seed, 0, -1);
assert.equal(fresh.map((c) => c.id).join(""), "bcdea");
assert.equal(groupChaptersIntoParts(fresh).length, 5);
assert.equal(fresh[fresh.length - 1].id, "a");

console.log("manualParts.check: ok");
