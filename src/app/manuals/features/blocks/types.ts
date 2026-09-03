/**
 * Content-driven chapter blocks — catalog, factories, legacy bridge.
 * A chapter renders only blocks present in `blocks[]` (or legacy fields when blocks unset).
 */

export const BLOCK_TYPES = [
  "overview",
  "why",
  "when",
  "practical",
  "tradeoffs",
  "comparison",
  "keyDifference",
  "code",
  "tip",
  "warning",
  "steps",
  "definition",
  "checklist",
  "resources",
  "quote",
  "image",
  "table",
  "video",
  "bullets",
  "tree",
  "featureMapping",
  "gap",
  "curatedResources",
  "tier",
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

export type BlockCategory = "Text" | "Comparison" | "Reference" | "Media";

export interface PracticalExample {
  app: string;
  scenario: string;
  pass: string;
  fail: string;
  value?: string;
  passLabel?: string;
  failLabel?: string;
}

export interface ComparisonRow {
  lever: string;
  equivalent: string;
  verdict: string;
}

export interface GoDeeperResource {
  title: string;
  url: string;
  description: string;
}

export interface CodeReference {
  label: string;
  code: string;
}

export interface TreeNode {
  label: string;
  children?: TreeNode[];
}

export interface FeatureMapRow {
  source: string;
  target: string;
}

export interface CuratedResourceItem {
  name: string;
  description?: string;
  links: { label: string; url: string }[];
}

export type ChapterBlock =
  | { id: string; type: "overview"; content: string }
  | { id: string; type: "why"; content: string }
  | { id: string; type: "when"; content: string }
  | { id: string; type: "practical"; practical: PracticalExample }
  | { id: string; type: "tradeoffs"; advantages: string[]; limitations: string[] }
  | {
      id: string;
      type: "comparison";
      rows: ComparisonRow[];
      headers?: { lever: string; equivalent: string };
    }
  | { id: string; type: "keyDifference"; content: string }
  | { id: string; type: "code"; label: string; code: string }
  | { id: string; type: "tip"; title?: string; content: string }
  | { id: string; type: "warning"; title?: string; content: string }
  | { id: string; type: "steps"; title?: string; items: string[] }
  | { id: string; type: "definition"; term: string; definition: string }
  | { id: string; type: "checklist"; title?: string; items: string[] }
  | { id: string; type: "resources"; items: GoDeeperResource[] }
  | { id: string; type: "quote"; text: string; attribution?: string }
  | { id: string; type: "image"; src: string; alt?: string; caption?: string }
  | {
      id: string;
      type: "table";
      headers: string[];
      rows: string[][];
      caption?: string;
    }
  | { id: string; type: "video"; url: string; caption?: string }
  | { id: string; type: "bullets"; title?: string; items: string[] }
  | { id: string; type: "tree"; title?: string; nodes: TreeNode[] }
  | {
      id: string;
      type: "featureMapping";
      title?: string;
      sourceHeader?: string;
      targetHeader?: string;
      rows: FeatureMapRow[];
    }
  | { id: string; type: "gap"; content: string; alternative?: string }
  | {
      id: string;
      type: "curatedResources";
      category: string;
      items: CuratedResourceItem[];
    }
  | { id: string; type: "tier"; label: string; detail?: string; kind?: "free" | "paid" | "cloud" };

export interface BlockTypeMeta {
  type: BlockType;
  label: string;
  category: BlockCategory;
  description: string;
}

export const BLOCK_CATALOG: BlockTypeMeta[] = [
  { type: "overview", label: "Overview", category: "Text", description: "Short framing paragraph" },
  { type: "why", label: "Why It Matters", category: "Text", description: "Genuine why framing" },
  { type: "when", label: "When To Use It", category: "Text", description: "Trigger / condition" },
  { type: "tip", label: "Tip / Note", category: "Text", description: "Helpful aside" },
  { type: "warning", label: "Warning / Gotcha", category: "Text", description: "Caution callout" },
  { type: "definition", label: "Definition", category: "Text", description: "Term + definition" },
  { type: "quote", label: "Quote / Reference", category: "Text", description: "Quoted passage" },
  { type: "bullets", label: "Bullets", category: "Text", description: "Unordered point list" },
  { type: "gap", label: "Gap / Not Available", category: "Text", description: "Neutral missing-capability notice" },
  { type: "tier", label: "Tier / Cost Callout", category: "Text", description: "Free vs paid tag" },
  {
    type: "practical",
    label: "Practical Example",
    category: "Comparison",
    description: "Fail / pass scenario",
  },
  {
    type: "tradeoffs",
    label: "Advantages / Limitations",
    category: "Comparison",
    description: "Pros / cons grid",
  },
  {
    type: "comparison",
    label: "Comparison Table",
    category: "Comparison",
    description: "Lever → equivalent → verdict",
  },
  {
    type: "featureMapping",
    label: "Feature Mapping",
    category: "Comparison",
    description: "X maps to Y (no verdict)",
  },
  {
    type: "keyDifference",
    label: "Key Difference",
    category: "Comparison",
    description: "Highlighted difference fact",
  },
  { type: "steps", label: "Steps", category: "Reference", description: "Ordered procedure" },
  { type: "checklist", label: "Checklist", category: "Reference", description: "Checkbox-style list" },
  { type: "code", label: "Code Reference", category: "Reference", description: "Labeled code block" },
  { type: "resources", label: "Resource Links", category: "Reference", description: "Flat link list" },
  {
    type: "curatedResources",
    label: "Curated Resource List",
    category: "Reference",
    description: "Categorized items with multiple links",
  },
  { type: "tree", label: "Tree / Hierarchy", category: "Reference", description: "Nested structure" },
  { type: "image", label: "Image / Diagram", category: "Media", description: "Image with caption" },
  { type: "table", label: "Generic Table", category: "Media", description: "Simple grid table" },
  { type: "video", label: "Video Embed", category: "Media", description: "Embeddable video URL" },
];

export const BLOCK_CATEGORIES: BlockCategory[] = ["Text", "Comparison", "Reference", "Media"];

let blockSeq = 0;
export function newBlockId(prefix = "blk"): string {
  blockSeq += 1;
  return `${prefix}-${Date.now().toString(36)}-${blockSeq}`;
}

export function emptyBlock(type: BlockType): ChapterBlock {
  const id = newBlockId(type);
  switch (type) {
    case "overview":
    case "why":
    case "when":
    case "keyDifference":
      return { id, type, content: "" };
    case "tip":
    case "warning":
      return { id, type, title: "", content: "" };
    case "practical":
      return { id, type, practical: { app: "", scenario: "", pass: "", fail: "" } };
    case "tradeoffs":
      return { id, type, advantages: [], limitations: [] };
    case "comparison":
      return {
        id,
        type,
        rows: [{ lever: "", equivalent: "", verdict: "" }],
        headers: { lever: "Lever", equivalent: "Equivalent" },
      };
    case "code":
      return { id, type, label: "Code example", code: "" };
    case "steps":
    case "checklist":
    case "bullets":
      return { id, type, title: "", items: [""] };
    case "definition":
      return { id, type, term: "", definition: "" };
    case "resources":
      return { id, type, items: [{ title: "", url: "", description: "" }] };
    case "quote":
      return { id, type, text: "", attribution: "" };
    case "image":
      return { id, type, src: "", alt: "", caption: "" };
    case "table":
      return { id, type, headers: ["Column A", "Column B"], rows: [["", ""]], caption: "" };
    case "video":
      return { id, type, url: "", caption: "" };
    case "tree":
      return { id, type, title: "", nodes: [{ label: "", children: [] }] };
    case "featureMapping":
      return {
        id,
        type,
        title: "",
        sourceHeader: "Source",
        targetHeader: "Maps to",
        rows: [{ source: "", target: "" }],
      };
    case "gap":
      return { id, type, content: "", alternative: "" };
    case "curatedResources":
      return {
        id,
        type,
        category: "",
        items: [{ name: "", description: "", links: [{ label: "", url: "" }] }],
      };
    case "tier":
      return { id, type, label: "Free tier", detail: "", kind: "free" };
    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
}

/** Minimal chapter shape for legacy → blocks hydration (avoids circular import with manuals/types). */
export type LegacyChapterFields = {
  overviewText?: string;
  why?: string;
  when?: string;
  practical?: PracticalExample;
  advantages?: string[];
  limitations?: string[];
  comparisons?: ComparisonRow[];
  comparisonHeaders?: { lever: string; equivalent: string };
  keyDifferences?: string[];
  codeReferences?: CodeReference[];
  codeSnippet?: string;
  resourceLinks?: GoDeeperResource[];
  blocks?: ChapterBlock[];
};

/** Synthesize blocks from legacy chapter fields when `blocks` is unset. */
export function legacyFieldsToBlocks(ch: LegacyChapterFields): ChapterBlock[] {
  const out: ChapterBlock[] = [];
  if (ch.overviewText?.trim()) {
    out.push({ id: newBlockId("overview"), type: "overview", content: ch.overviewText });
  }
  if (ch.why?.trim()) out.push({ id: newBlockId("why"), type: "why", content: ch.why });
  if (ch.when?.trim()) out.push({ id: newBlockId("when"), type: "when", content: ch.when });
  if (ch.practical?.scenario?.trim() || ch.practical?.app?.trim()) {
    out.push({
      id: newBlockId("practical"),
      type: "practical",
      practical: ch.practical || { app: "", scenario: "", pass: "", fail: "" },
    });
  }
  if (ch.comparisons?.length) {
    out.push({
      id: newBlockId("comparison"),
      type: "comparison",
      rows: ch.comparisons,
      headers: ch.comparisonHeaders,
    });
  }
  for (const kd of ch.keyDifferences || []) {
    if (kd.trim()) out.push({ id: newBlockId("keyDifference"), type: "keyDifference", content: kd });
  }
  if (ch.advantages?.length || ch.limitations?.length) {
    out.push({
      id: newBlockId("tradeoffs"),
      type: "tradeoffs",
      advantages: ch.advantages || [],
      limitations: ch.limitations || [],
    });
  }
  for (const cr of ch.codeReferences || []) {
    if (cr.code?.trim()) {
      out.push({ id: newBlockId("code"), type: "code", label: cr.label || "Code example", code: cr.code });
    }
  }
  if (ch.codeSnippet?.trim() && !(ch.codeReferences?.length)) {
    out.push({ id: newBlockId("code"), type: "code", label: "Code example", code: ch.codeSnippet });
  }
  if (ch.resourceLinks?.length) {
    out.push({ id: newBlockId("resources"), type: "resources", items: ch.resourceLinks });
  }
  return out;
}

/** Blocks to render: explicit `blocks` if set (even empty), else legacy synthesis. */
export function chapterBlocksForRender(ch: LegacyChapterFields): ChapterBlock[] | null {
  if (Array.isArray(ch.blocks)) return ch.blocks;
  return null; // signal: use legacy path in renderer
}

/** Blocks for the editor — hydrate from legacy once so Add Block can append. */
export function chapterBlocksForEdit(ch: LegacyChapterFields): ChapterBlock[] {
  if (Array.isArray(ch.blocks)) return ch.blocks;
  return legacyFieldsToBlocks(ch);
}

export function isBlockType(v: string): v is BlockType {
  return (BLOCK_TYPES as readonly string[]).includes(v);
}

/** Menu filter — undefined/empty allowed list means all types. Never strips existing blocks. */
export function blockTypesForMenu(allowed?: BlockType[] | null): BlockTypeMeta[] {
  if (!allowed?.length) return BLOCK_CATALOG;
  const set = new Set(allowed);
  return BLOCK_CATALOG.filter((m) => set.has(m.type));
}
