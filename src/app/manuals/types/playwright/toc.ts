/* Playwright manual TOC — ordering only. Content lives in part-N/chapter-M.md */

export const PLAYWRIGHT_TOC_VERSION = 1;

export type PlaywrightTocPart = {
  partNo: number;
  name: string;
  items: { title: string }[];
};

export const PLAYWRIGHT_TOC: PlaywrightTocPart[] = [
  {
    "partNo": 0,
    "name": "Background",
    "items": [
      {
        "title": "0. What is Playwright, Really"
      },
      {
        "title": "1. Where Playwright is Used"
      },
      {
        "title": "2. What Playwright Can Do"
      },
      {
        "title": "3. Why Companies Choose Playwright Over Alternatives"
      },
      {
        "title": "4. What This Manual Will NOT Cover"
      }
    ]
  },
  {
    "partNo": 1,
    "name": "Foundations",
    "items": [
      {
        "title": "1. Introduction to Playwright"
      },
      {
        "title": "2. Environment Setup"
      },
      {
        "title": "3. Playwright Architecture"
      },
      {
        "title": "4. First Script"
      },
      {
        "title": "Checkpoint · Foundations"
      }
    ]
  },
  {
    "partNo": 2,
    "name": "Core Interactions",
    "items": [
      {
        "title": "5. Locators Deep Dive"
      },
      {
        "title": "6. Actions"
      },
      {
        "title": "7. Assertions with expect()"
      },
      {
        "title": "8. Waits & Auto-waiting"
      },
      {
        "title": "9. Tabs, Windows, iFrames"
      },
      {
        "title": "10. File Uploads & Downloads"
      },
      {
        "title": "11. Alerts, Dialogs, Popups"
      },
      {
        "title": "Checkpoint · Core Interactions"
      }
    ]
  },
  {
    "partNo": 3,
    "name": "Test Structure & Framework",
    "items": [
      {
        "title": "12. Pytest Basics for Playwright"
      },
      {
        "title": "13. Test Organization"
      },
      {
        "title": "14. Page Object Model (POM)"
      },
      {
        "title": "15. Configuration Management"
      },
      {
        "title": "16. Test Data Management"
      },
      {
        "title": "Checkpoint — Framework"
      }
    ]
  },
  {
    "partNo": 4,
    "name": "Advanced Techniques",
    "items": [
      {
        "title": "17. Network Interception & Mocking"
      },
      {
        "title": "18. API Testing with Playwright"
      },
      {
        "title": "19. Visual & Accessibility Testing"
      },
      {
        "title": "20. Authentication & Session Reuse"
      },
      {
        "title": "21. Shadow DOM & Complex Components"
      },
      {
        "title": "22. Parallel Execution & Sharding"
      },
      {
        "title": "23. Cross-browser & Cross-device Testing"
      },
      {
        "title": "24. Debugging Tools"
      },
      {
        "title": "Checkpoint — Advanced"
      }
    ]
  },
  {
    "partNo": 5,
    "name": "CI/CD & Reporting",
    "items": [
      {
        "title": "25. CI/CD Integration"
      },
      {
        "title": "26. Test Reporting"
      },
      {
        "title": "27. Dockerizing Playwright Tests"
      },
      {
        "title": "28. Logging & Error Handling"
      },
      {
        "title": "Checkpoint — CI/CD"
      }
    ]
  },
  {
    "partNo": 6,
    "name": "Pro-Level Practices",
    "items": [
      {
        "title": "29. Building a Scalable Framework from Scratch"
      },
      {
        "title": "30. Managing Test Suites at Scale"
      },
      {
        "title": "31. Code Review & Best Practices"
      },
      {
        "title": "32. Performance Considerations"
      },
      {
        "title": "Checkpoint — Pro Practices"
      }
    ]
  },
  {
    "partNo": 7,
    "name": "Real-World Project & Job Readiness",
    "items": [
      {
        "title": "33. Real-World Capstone Project"
      },
      {
        "title": "34. Portfolio Building"
      },
      {
        "title": "35. Interview Prep"
      },
      {
        "title": "36. Career Positioning"
      },
      {
        "title": "Checkpoint — Job Ready"
      }
    ]
  },
  {
    "partNo": 8,
    "name": "Resources",
    "items": [
      {
        "title": "52. Books & Long-Form Reading"
      },
      {
        "title": "53. Blogs & Written Tutorials"
      },
      {
        "title": "54. Newsletters"
      },
      {
        "title": "55. Podcasts"
      },
      {
        "title": "56. Courses & Structured Learning Platforms"
      },
      {
        "title": "57. Certifications"
      },
      {
        "title": "58. Conferences & Talks"
      },
      {
        "title": "59. Social & Real-Time Communities"
      },
      {
        "title": "60. Browser Extensions & Developer Tools"
      },
      {
        "title": "61. Comparison & Decision-Making References"
      },
      {
        "title": "62. Glossary of Terms"
      },
      {
        "title": "63. Sample Data & Practice Sites"
      },
      {
        "title": "64. Staying Plugged Into the Ecosystem"
      }
    ]
  }
];
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
