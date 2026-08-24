/** Part grouping + CRUD. "Part N" is always index+1 — never stored as a number. */

export type PartishChapter = {
  subtitle?: string;
  partKey?: string;
  order?: number;
  contentMarkdown?: string;
};

export type PartGroup<T extends PartishChapter = PartishChapter> = {
  index: number;
  name: string;
  partKey: string;
  start: number;
  chapterIndices: number[];
  chapters: T[];
};

const PART_NUM_RE = /^Part\s+\d+\s*[·•\-\u2013\u2014:]\s*/i;

export function stripPartNumber(subtitle?: string): string {
  const s = (subtitle || "Untitled").trim() || "Untitled";
  return s.replace(PART_NUM_RE, "").trim() || "Untitled";
}

export function displayPartTitle(index: number, name: string): string {
  return `Part ${index + 1} · ${stripPartNumber(name)}`;
}

function identity<T extends PartishChapter>(ch: T): string {
  return ch.partKey || ch.subtitle || "Main";
}

export function groupChaptersIntoParts<T extends PartishChapter>(chapters: T[]): PartGroup<T>[] {
  const groups: PartGroup<T>[] = [];
  for (let i = 0; i < chapters.length; i++) {
    const ch = chapters[i];
    const key = identity(ch);
    const last = groups[groups.length - 1];
    if (last && last.partKey === key) {
      last.chapterIndices.push(i);
      last.chapters.push(ch);
    } else {
      groups.push({
        index: groups.length,
        name: stripPartNumber(ch.subtitle),
        partKey: key,
        start: i,
        chapterIndices: [i],
        chapters: [ch],
      });
    }
  }
  return groups;
}

function stamp<T extends PartishChapter>(groups: { name: string; partKey: string; chapters: T[] }[]): T[] {
  const out: T[] = [];
  groups.forEach((g, i) => {
    const partKey = g.partKey || `part-${i}`;
    const name = stripPartNumber(g.name);
    for (const ch of g.chapters) {
      out.push({
        ...ch,
        subtitle: name,
        partKey,
        order: out.length + 1,
      });
    }
  });
  return out;
}

function ensureKeys<T extends PartishChapter>(
  groups: { name: string; partKey: string; chapters: T[] }[]
): { name: string; partKey: string; chapters: T[] }[] {
  return groups.map((g, i) => ({
    name: g.name,
    partKey: g.partKey.startsWith("legacy:") || g.partKey.startsWith("Part ")
      ? `part-${i}-${g.name.replace(/\s+/g, "-").slice(0, 24)}-${i}`
      : g.partKey,
    chapters: g.chapters,
  }));
}

export function createPart<T extends PartishChapter>(
  chapters: T[],
  newChapter: T,
  insertAfterPartIndex?: number
): T[] {
  const groups = groupChaptersIntoParts(chapters).map((g) => ({
    name: g.name,
    partKey: g.partKey,
    chapters: g.chapters,
  }));
  const stampedNew = {
    name: stripPartNumber(newChapter.subtitle) || "New Part",
    partKey: newChapter.partKey || `part-${Date.now()}`,
    chapters: [newChapter],
  };
  const at =
    insertAfterPartIndex == null
      ? groups.length
      : Math.max(0, Math.min(groups.length, insertAfterPartIndex + 1));
  groups.splice(at, 0, stampedNew);
  return stamp(groups);
}

export function deleteParts<T extends PartishChapter>(chapters: T[], partIndices: number[]): T[] {
  const selected = new Set(partIndices);
  const groups = groupChaptersIntoParts(chapters).filter((_, i) => !selected.has(i));
  return stamp(ensureKeys(groups));
}

export function renamePart<T extends PartishChapter>(chapters: T[], partIndex: number, name: string): T[] {
  const groups = groupChaptersIntoParts(chapters);
  if (!groups[partIndex]) return chapters;
  return stamp(
    groups.map((g, i) => ({
      name: i === partIndex ? stripPartNumber(name) : g.name,
      partKey: g.partKey,
      chapters: g.chapters,
    }))
  );
}

export function moveParts<T extends PartishChapter>(
  chapters: T[],
  partIndices: number[],
  direction: -1 | 1
): { chapters: T[]; selected: number[] } {
  const groups = groupChaptersIntoParts(chapters);
  const sel = new Set(partIndices.filter((i) => i >= 0 && i < groups.length));
  if (sel.size === 0) return { chapters, selected: [] };

  if (direction === -1) {
    for (let i = 0; i < groups.length; i++) {
      if (sel.has(i) && i > 0 && !sel.has(i - 1)) {
        [groups[i - 1], groups[i]] = [groups[i], groups[i - 1]];
        sel.delete(i);
        sel.add(i - 1);
      }
    }
  } else {
    for (let i = groups.length - 1; i >= 0; i--) {
      if (sel.has(i) && i < groups.length - 1 && !sel.has(i + 1)) {
        [groups[i + 1], groups[i]] = [groups[i], groups[i + 1]];
        sel.delete(i);
        sel.add(i + 1);
      }
    }
  }

  return {
    chapters: stamp(ensureKeys(groups)),
    selected: [...sel].sort((a, b) => a - b),
  };
}

export function mergeParts<T extends PartishChapter>(chapters: T[], partIndices: number[]): T[] {
  const unique = [...new Set(partIndices)].sort((a, b) => a - b);
  if (unique.length < 2) return chapters;

  const groups = groupChaptersIntoParts(chapters);
  const selected = new Set(unique.filter((i) => i >= 0 && i < groups.length));
  if (selected.size < 2) return chapters;

  const first = unique[0];
  const mergedChapters: T[] = [];
  const remaining: { name: string; partKey: string; chapters: T[] }[] = [];
  let insertAt = -1;

  groups.forEach((g, i) => {
    if (selected.has(i)) {
      if (insertAt < 0) insertAt = remaining.length;
      mergedChapters.push(...g.chapters);
    } else {
      remaining.push({ name: g.name, partKey: g.partKey, chapters: g.chapters });
    }
  });

  remaining.splice(insertAt, 0, {
    name: groups[first].name,
    partKey: groups[first].partKey,
    chapters: mergedChapters,
  });
  return stamp(ensureKeys(remaining));
}

/** Move one chapter into another part (append). -1 creates a new part at the end. */
export function moveChapterToPart<T extends PartishChapter>(
  chapters: T[],
  chapterIndex: number,
  destPartIndex: number
): T[] {
  if (chapterIndex < 0 || chapterIndex >= chapters.length) return chapters;

  const groups = groupChaptersIntoParts(chapters).map((g) => ({
    name: g.name,
    partKey: g.partKey,
    chapters: [...g.chapters],
  }));

  let src = -1;
  let offset = -1;
  let seen = 0;
  for (let i = 0; i < groups.length; i++) {
    const n = groups[i].chapters.length;
    if (chapterIndex < seen + n) {
      src = i;
      offset = chapterIndex - seen;
      break;
    }
    seen += n;
  }
  if (src < 0) return chapters;

  const makeNew = destPartIndex < 0 || destPartIndex >= groups.length;
  if (!makeNew && destPartIndex === src) return chapters;

  const [moved] = groups[src].chapters.splice(offset, 1);
  if (groups[src].chapters.length === 0) {
    groups.splice(src, 1);
    if (!makeNew && destPartIndex > src) destPartIndex -= 1;
  }

  if (makeNew || destPartIndex < 0 || destPartIndex >= groups.length) {
    groups.push({
      name: stripPartNumber(moved.subtitle) || "New Part",
      partKey: `part-${Date.now()}-${groups.length}`,
      chapters: [moved],
    });
  } else {
    groups[destPartIndex].chapters.push(moved);
  }

  return stamp(ensureKeys(groups));
}

export function chapterIndexAfter<T extends { id?: string }>(
  chapters: T[],
  keepId: string | undefined,
  fallback: number
): number {
  if (!keepId) return Math.max(0, Math.min(fallback, Math.max(0, chapters.length - 1)));
  const idx = chapters.findIndex((c) => c.id === keepId);
  if (idx >= 0) return idx;
  return Math.max(0, Math.min(fallback, Math.max(0, chapters.length - 1)));
}
