/* ============================================================================
 * HEADING: SHARED — Testing Types 15-part TOC (ordering only)
 * Not a page. Used by:
 *   /manuals/[slug]  (Testing Types reader)  +  src/app/manuals/_ui/testing-types-reader.ts
 * Changing this file changes that reader.
 * ========================================================================== */

/** 15-chapter Testing Types TOC. Chapter `no` maps to overlayNo in part-N/chapter-M.md frontmatter. */

/** Bump when the catalog TOC changes so an old localStorage TOC is not restored. */
export const TESTING_TYPES_TOC_VERSION = 19;

export function restoreTestingTypesToc(saved: unknown): boolean {
  if (!saved || typeof saved !== "object") return false;
  const s = saved as { tocManaged?: unknown; tocCatalogVersion?: unknown };
  return Boolean(s.tocManaged) && s.tocCatalogVersion === TESTING_TYPES_TOC_VERSION;
}

/** One TOC row: overlay type `no`, or a folder with only children (Quality Attributes). */
export type TestingTypesTocNode = {
  no?: number;
  title: string;
  children?: { no: number; title: string }[];
};

export type TestingTypesTocPart = {
  name: string;
  items: TestingTypesTocNode[];
};

/** 15 chapters / 92 types. `no` is TESTING_TYPES_CHAPTERS overlay id (matched by title when the printed # differed). */
export const TESTING_TYPES_TOC: TestingTypesTocPart[] = [
  {
    name: "Testing by Level",
    items: [
      { no: 1, title: "Unit Testing" },
      {
        no: 2,
        title: "Integration Testing",
        children: [
          { no: 64, title: "Big Bang Integration Testing" },
          { no: 89, title: "Incremental Integration Testing" },
          { no: 55, title: "Contract Testing" },
        ],
      },
      {
        no: 3,
        title: "System Testing",
        children: [{ no: 36, title: "End-to-End Testing" }],
      },
      {
        no: 4,
        title: "Acceptance Testing (UAT)",
        children: [
          { no: 29, title: "Alpha Testing" },
          { no: 30, title: "Beta Testing" },
          { no: 62, title: "Pilot Testing" },
          { no: 82, title: "Operational Acceptance Testing (OAT)" },
        ],
      },
    ],
  },
  {
    name: "Execution Method",
    items: [
      { no: 5, title: "Manual Testing" },
      { no: 6, title: "Automated Testing" },
    ],
  },
  {
    name: "Functional Testing",
    items: [
      {
        no: 7,
        title: "Functional Testing",
        children: [
          { no: 8, title: "Smoke Testing" },
          { no: 9, title: "Sanity Testing" },
          { no: 10, title: "Regression Testing" },
          { no: 31, title: "Retesting (Confirmation)" },
        ],
      },
      {
        no: 11,
        title: "Interface Testing",
        children: [
          { no: 34, title: "API Testing" },
          { no: 47, title: "GUI Testing" },
          { no: 48, title: "Visual Regression Testing" },
          { no: 92, title: "Voice / Conversational UI Testing" },
          { no: 85, title: "Content Testing" },
        ],
      },
      { no: 86, title: "Business Flow Testing" },
    ],
  },
  {
    name: "Non-Functional Testing",
    items: [
      {
        no: 13,
        title: "Performance Testing",
        children: [
          { no: 14, title: "Load Testing" },
          { no: 15, title: "Stress Testing" },
          { no: 90, title: "Spike Testing" },
          { no: 17, title: "Volume Testing" },
          { no: 16, title: "Scalability Testing" },
          { no: 56, title: "Concurrency Testing" },
          { no: 72, title: "Soak / Endurance Testing" },
        ],
      },
      {
        no: 20,
        title: "Reliability Testing",
        children: [
          { no: 42, title: "Uptime / Availability Testing" },
          { no: 21, title: "Recovery Testing" },
          { no: 59, title: "Disaster Recovery Testing" },
          { no: 54, title: "Chaos Testing" },
        ],
      },
      {
        no: 19,
        title: "Compatibility Testing",
        children: [
          { no: 37, title: "Cross-browser Testing" },
          { no: 57, title: "Configuration Testing" },
          { no: 83, title: "Cloud Testing" },
          { no: 70, title: "Network Testing" },
          { no: 74, title: "Interoperability Testing" },
          { no: 75, title: "Conformance Testing" },
        ],
      },
      {
        no: 23,
        title: "Localization / i18n Testing",
        children: [{ no: 76, title: "Globalization Testing" }],
      },
      {
        title: "Quality Attributes",
        children: [
          { no: 12, title: "Usability Testing" },
          { no: 22, title: "Accessibility Testing" },
          { no: 61, title: "Compliance / Regulatory Testing" },
          { no: 41, title: "SEO / Site Health Testing" },
          { no: 18, title: "Security Testing" },
        ],
      },
    ],
  },
  {
    name: "Testing by Knowledge",
    items: [
      { no: 24, title: "Black Box Testing" },
      {
        no: 25,
        title: "White Box Testing",
        children: [
          { no: 81, title: "Statement/Branch/Path Coverage Testing" },
          { no: 87, title: "Object-Oriented Testing" },
          { no: 32, title: "Mutation Testing" },
        ],
      },
      { no: 26, title: "Gray Box Testing" },
    ],
  },
  {
    name: "Test Design Techniques",
    items: [
      { no: 50, title: "Positive Testing" },
      { no: 49, title: "Negative Testing" },
      { no: 51, title: "Boundary Value Analysis" },
      { no: 52, title: "Equivalence Partitioning" },
      { no: 79, title: "Domain Testing" },
      { no: 80, title: "Error Handling / Error Guessing Testing" },
    ],
  },
  {
    name: "Security Testing",
    items: [
      { no: 40, title: "Penetration Testing" },
      { no: 43, title: "Fuzz Testing" },
      { no: 44, title: "Vulnerability Scanning" },
    ],
  },
  {
    name: "Static & Dynamic Testing",
    items: [
      { no: 45, title: "Static Testing" },
      { no: 46, title: "Dynamic Testing" },
    ],
  },
  {
    name: "Automation Techniques",
    items: [
      { no: 65, title: "Data-Driven Testing" },
      { no: 66, title: "Keyword-Driven Testing" },
      { no: 67, title: "Model-Based Testing" },
      { no: 71, title: "Snapshot Testing" },
      { no: 84, title: "Diff / Golden Master Testing" },
    ],
  },
  {
    name: "Automation Strategy",
    items: [{ no: 73, title: "Continuous Testing (CI/CD)" }],
  },
  {
    name: "Test Strategy",
    items: [
      { no: 68, title: "Risk-Based Testing" },
      { no: 77, title: "Baseline Testing" },
      { no: 78, title: "Comparative Testing" },
      { no: 33, title: "A/B Testing" },
    ],
  },
  {
    name: "Mobile & Web",
    items: [
      { no: 38, title: "Mobile Testing" },
      { no: 88, title: "Progressive Web App (PWA) Testing" },
    ],
  },
  {
    name: "Data & Backend",
    items: [
      { no: 35, title: "Database Testing" },
      { no: 58, title: "Data Migration Testing" },
      { no: 69, title: "Backend Testing" },
    ],
  },
  {
    name: "Exploratory & Unscripted Testing",
    items: [
      { no: 27, title: "Exploratory Testing" },
      { no: 91, title: "Session-Based Testing" },
      { no: 28, title: "Ad-hoc Testing" },
      { no: 53, title: "Monkey Testing" },
    ],
  },
  {
    name: "Other Specialized Testing",
    items: [
      { no: 39, title: "Installation Testing" },
      { no: 60, title: "Documentation Testing" },
      { no: 63, title: "Parallel Testing" },
    ],
  },
];

export type TestingTypesTocRow = {
  part: string;
  title: string;
  no?: number;
  parentTitle?: string;
};

export function flattenTestingTypesToc(): TestingTypesTocRow[] {
  const rows: TestingTypesTocRow[] = [];
  for (const part of TESTING_TYPES_TOC) {
    for (const item of part.items) {
      rows.push({ part: part.name, title: item.title, no: item.no });
      for (const child of item.children || []) {
        rows.push({ part: part.name, title: child.title, no: child.no, parentTitle: item.title });
      }
    }
  }
  return rows;
}

/** @deprecated use flattenTestingTypesToc */
export const flattenTestingTypesOutline = flattenTestingTypesToc;
/** Part grouping + CRUD. "Part N" is always index+1 — never stored as a number. */

export type PartishChapter = {
  id?: string;
  subtitle?: string;
  partKey?: string;
  order?: number;
  contentMarkdown?: string;
  parentId?: string;
};

export type PartGroup<T extends PartishChapter = PartishChapter> = {
  index: number;
  name: string;
  partKey: string;
  start: number;
  chapterIndices: number[];
  chapters: T[];
};

const PART_NUM_RE = /^(?:Part|Chapter)\s+\d+\s*[·•\-\u2013\u2014:]\s*/i;

export function stripPartNumber(subtitle?: string): string {
  const s = (subtitle || "Untitled").trim() || "Untitled";
  return s.replace(PART_NUM_RE, "").trim() || "Untitled";
}

export function displayPartTitle(index: number, name: string, kind: "part" | "chapter" = "part"): string {
  const label = stripPartNumber(name);
  return kind === "chapter" ? `Chapter ${index + 1} — ${label}` : `Part ${index + 1} · ${label}`;
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
  const kids: T[] = [];
  if (!moved.parentId && moved.id) {
    for (let i = groups[src].chapters.length - 1; i >= 0; i--) {
      if (groups[src].chapters[i].parentId === moved.id) {
        kids.unshift(groups[src].chapters.splice(i, 1)[0]);
      }
    }
  }
  const payload = [moved, ...kids];
  if (groups[src].chapters.length === 0) {
    groups.splice(src, 1);
    if (!makeNew && destPartIndex > src) destPartIndex -= 1;
  }

  if (makeNew || destPartIndex < 0 || destPartIndex >= groups.length) {
    groups.push({
      name: stripPartNumber(moved.subtitle) || "New Part",
      partKey: `part-${Date.now()}-${groups.length}`,
      chapters: payload,
    });
  } else {
    groups[destPartIndex].chapters.push(...payload);
  }

  return stamp(ensureKeys(groups));
}

export function moveChapters<T extends PartishChapter>(
  chapters: T[],
  indices: number[],
  direction: -1 | 1
): { chapters: T[]; selected: number[] } {
  const next = chapters.map((c) => ({ ...c }));
  const sel = new Set(indices.filter((i) => i >= 0 && i < next.length));
  if (sel.size === 0) return { chapters, selected: [] };

  if (direction === -1) {
    for (let i = 0; i < next.length; i++) {
      if (sel.has(i) && i > 0 && !sel.has(i - 1)) {
        [next[i - 1], next[i]] = [next[i], next[i - 1]];
        sel.delete(i);
        sel.add(i - 1);
      }
    }
  } else {
    for (let i = next.length - 1; i >= 0; i--) {
      if (sel.has(i) && i < next.length - 1 && !sel.has(i + 1)) {
        [next[i + 1], next[i]] = [next[i], next[i + 1]];
        sel.delete(i);
        sel.add(i + 1);
      }
    }
  }

  return {
    chapters: next.map((c, i) => ({ ...c, order: i + 1 })),
    selected: [...sel].sort((a, b) => a - b),
  };
}

export function mergeChapters<T extends { contentMarkdown?: string; title?: string; overviewText?: string; order?: number }>(
  chapters: T[],
  indices: number[]
): T[] {
  const unique = [...new Set(indices)].filter((i) => i >= 0 && i < chapters.length).sort((a, b) => a - b);
  if (unique.length < 2) return chapters;
  const keep = unique[0];
  const drop = new Set(unique.slice(1));
  const extra = unique.slice(1)
    .map((i) => {
      const ch = chapters[i];
      const heading = ch.title ? `\n\n# ${ch.title}\n\n` : "\n\n";
      return heading + (ch.contentMarkdown || ch.overviewText || "");
    })
    .join("");
  return chapters
    .map((ch, i) => (i === keep ? { ...ch, contentMarkdown: (ch.contentMarkdown || "") + extra } : ch))
    .filter((_, i) => !drop.has(i))
    .map((ch, i) => ({ ...ch, order: i + 1 }));
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

export function isSubchapter<T extends { parentId?: string }>(ch: T | undefined): boolean {
  return Boolean(ch?.parentId);
}

export function parentIndexOf<T extends { id?: string; parentId?: string }>(chapters: T[], index: number): number {
  const ch = chapters[index];
  if (!ch?.parentId) return index;
  const p = chapters.findIndex((c) => c.id === ch.parentId);
  return p >= 0 ? p : index;
}

/** Display numbers in a part: 1, 1.1, 1.2, 2, … — or 1.1, 1.2.1 when `prefix` is the chapter/part number. */
export function tocNumbersForPart<T extends { id?: string; parentId?: string }>(
  chapters: T[],
  indices: number[],
  prefix?: number
): Map<number, string> {
  const map = new Map<number, string>();
  let n = 0;
  for (const idx of indices) {
    const ch = chapters[idx];
    if (!ch || ch.parentId) continue;
    n += 1;
    const head = prefix != null ? `${prefix}.${n}` : String(n);
    map.set(idx, head);
    let s = 0;
    for (const j of indices) {
      if (chapters[j]?.parentId === ch.id) {
        s += 1;
        map.set(j, `${head}.${s}`);
      }
    }
  }
  return map;
}

export function createSubchapter<T extends PartishChapter>(
  chapters: T[],
  parentIndex: number,
  newChapter: T
): T[] {
  const parent = chapters[parentIndex];
  if (!parent) return chapters;
  const host = parent.parentId ? parentIndexOf(chapters, parentIndex) : parentIndex;
  const hostCh = chapters[host];
  if (!hostCh?.id) return chapters;
  let insertAt = host + 1;
  while (insertAt < chapters.length && chapters[insertAt].parentId === hostCh.id) insertAt += 1;
  const row = {
    ...newChapter,
    parentId: hostCh.id,
    subtitle: hostCh.subtitle,
    partKey: hostCh.partKey,
  };
  const next = [...chapters];
  next.splice(insertAt, 0, row);
  return next.map((c, i) => ({ ...c, order: i + 1 }));
}

export function deleteChaptersWithSubs<T extends { id?: string; parentId?: string; order?: number }>(
  chapters: T[],
  indices: number[]
): T[] {
  const drop = new Set(indices.filter((i) => i >= 0 && i < chapters.length));
  for (const i of [...drop]) {
    const ch = chapters[i];
    if (!ch?.id || ch.parentId) continue;
    chapters.forEach((c, j) => {
      if (c.parentId === ch.id) drop.add(j);
    });
  }
  return chapters.filter((_, i) => !drop.has(i)).map((c, i) => ({ ...c, order: i + 1 }));
}

/** Move a chapter (and its sub-chapters) as one block; subs only swap with siblings. */
export function moveChapterBlock<T extends PartishChapter>(
  chapters: T[],
  index: number,
  direction: -1 | 1
): { chapters: T[]; selected: number[] } {
  const ch = chapters[index];
  if (!ch) return { chapters, selected: [] };

  if (ch.parentId) {
    const sibs = chapters.map((_, i) => i).filter((i) => chapters[i].parentId === ch.parentId);
    const pos = sibs.indexOf(index);
    const swapWith = sibs[pos + direction];
    if (swapWith == null) return { chapters, selected: [index] };
    const next = chapters.map((c) => ({ ...c }));
    [next[index], next[swapWith]] = [next[swapWith], next[index]];
    return { chapters: next.map((c, i) => ({ ...c, order: i + 1 })), selected: [swapWith] };
  }

  let end = index + 1;
  while (end < chapters.length && chapters[end].parentId === ch.id) end += 1;
  const block = chapters.slice(index, end);

  if (direction === -1) {
    if (index === 0) return { chapters, selected: [index] };
    let prevStart = index - 1;
    if (chapters[prevStart].parentId) {
      const p = chapters.findIndex((c) => c.id === chapters[prevStart].parentId);
      prevStart = p >= 0 ? p : prevStart;
    }
    const next = [...chapters.slice(0, prevStart), ...block, ...chapters.slice(prevStart, index), ...chapters.slice(end)];
    return { chapters: next.map((c, i) => ({ ...c, order: i + 1 })), selected: [prevStart] };
  }

  if (end >= chapters.length) return { chapters, selected: [index] };
  const nextCh = chapters[end];
  let nextEnd = end + 1;
  if (!nextCh.parentId && nextCh.id) {
    while (nextEnd < chapters.length && chapters[nextEnd].parentId === nextCh.id) nextEnd += 1;
  }
  const next = [...chapters.slice(0, index), ...chapters.slice(end, nextEnd), ...block, ...chapters.slice(nextEnd)];
  return { chapters: next.map((c, i) => ({ ...c, order: i + 1 })), selected: [index + (nextEnd - end)] };
}

