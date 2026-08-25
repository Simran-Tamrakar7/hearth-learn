import assert from "node:assert/strict";
import {
  chapterIndexAfter,
  createPart,
  createSubchapter,
  deleteChaptersWithSubs,
  deleteParts,
  displayPartTitle,
  groupChaptersIntoParts,
  mergeChapters,
  mergeParts,
  moveChapterBlock,
  moveChapterToPart,
  moveChapters,
  moveParts,
  renamePart,
  stripPartNumber,
  tocNumbersForPart,
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

const chUp = moveChapters(seed, [2], -1);
assert.equal(chUp.chapters.map((c) => c.id).join(""), "acbde");
assert.deepEqual(chUp.selected, [1]);

const chMerge = mergeChapters(seed, [0, 1]);
assert.equal(chMerge.map((c) => c.id).join(""), "acde");
assert.ok((chMerge[0].contentMarkdown || "").includes("b"));
assert.equal(chMerge.length, 4);

type Nested = Ch & { parentId?: string };
const nested: Nested[] = [
  ch("p", "Part 1 · A"),
  { ...ch("s1", "Part 1 · A"), parentId: "p" },
  { ...ch("s2", "Part 1 · A"), parentId: "p" },
  ch("q", "Part 1 · A"),
];
const withSub = createSubchapter([ch("p", "Part 1 · A"), ch("q", "Part 1 · A")], 0, ch("s0", "x"));
assert.equal(withSub.map((c) => c.id).join(""), "ps0q");
assert.equal(withSub[1].parentId, "p");

const nums = tocNumbersForPart(nested, [0, 1, 2, 3]);
assert.equal(nums.get(0), "1");
assert.equal(nums.get(1), "1.1");
assert.equal(nums.get(2), "1.2");
assert.equal(nums.get(3), "2");

const prefixed = tocNumbersForPart(nested, [0, 1, 2, 3], 1);
assert.equal(prefixed.get(0), "1.1");
assert.equal(prefixed.get(1), "1.1.1");
assert.equal(prefixed.get(2), "1.1.2");
assert.equal(prefixed.get(3), "1.2");
assert.equal(displayPartTitle(0, "Testing by Level", "chapter"), "Chapter 1 — Testing by Level");
assert.equal(stripPartNumber("Chapter 4 — Non-Functional Testing"), "Non-Functional Testing");

const movedParent = moveChapterBlock(nested, 0, 1);
assert.equal(movedParent.chapters.map((c) => c.id).join(""), "qps1s2");
assert.equal(movedParent.chapters[2].parentId, "p");
assert.equal(movedParent.chapters[3].parentId, "p");

const movedSub = moveChapterBlock(nested, 1, 1);
assert.equal(movedSub.chapters.map((c) => c.id).join(""), "ps2s1q");

const gone = deleteChaptersWithSubs(nested, [0]);
assert.equal(gone.map((c) => c.id).join(""), "q");

const toPartNested = moveChapterToPart(nested, 0, -1);
assert.equal(toPartNested.map((c) => c.id).join(""), "qps1s2");
assert.equal(groupChaptersIntoParts(toPartNested).length, 2);
assert.equal(toPartNested.filter((c) => c.id === "p" || c.parentId === "p").map((c) => c.id).join(""), "ps1s2");

console.log("manualParts.check: ok");
