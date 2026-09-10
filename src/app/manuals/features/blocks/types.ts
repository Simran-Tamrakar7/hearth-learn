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

/** Box accent — drives header/dot color in reader + editor chrome. */
export type BlockAccent = "amber" | "rose" | "emerald" | "sky" | "teal" | "neutral";

/** Box body font. */
export type BlockFont = "sans" | "serif" | "mono";

export const BLOCK_ACCENTS: { id: BlockAccent; label: string; swatch: string }[] = [
  { id: "amber", label: "Amber", swatch: "#D97706" },
  { id: "rose", label: "Rose", swatch: "#E11D48" },
  { id: "emerald", label: "Emerald", swatch: "#059669" },
  { id: "sky", label: "Sky", swatch: "#0284C7" },
  { id: "teal", label: "Teal", swatch: "#0F766E" },
  { id: "neutral", label: "Neutral", swatch: "#78716C" },
];

export const BLOCK_FONTS: { id: BlockFont; label: string }[] = [
  { id: "sans", label: "Sans" },
  { id: "serif", label: "Serif" },
  { id: "mono", label: "Mono" },
];

export type ColumnTone = "rose" | "emerald" | "sky" | "amber" | "neutral";

export const COLUMN_TONES: { id: ColumnTone; label: string; border: string; text: string; top: string }[] = [
  { id: "rose", label: "Rose", border: "border-rose-200", text: "text-rose-700", top: "border-t-rose-500" },
  { id: "emerald", label: "Emerald", border: "border-emerald-200", text: "text-emerald-700", top: "border-t-emerald-500" },
  { id: "sky", label: "Sky", border: "border-sky-200", text: "text-sky-700", top: "border-t-sky-500" },
  { id: "amber", label: "Amber", border: "border-amber-200", text: "text-amber-800", top: "border-t-amber-500" },
  { id: "neutral", label: "Neutral", border: "border-[#E7E0D3]", text: "text-[#52635E]", top: "border-t-[#8A9B95]" },
];

export interface PracticalColumn {
  id: string;
  label: string;
  content: string;
  tone?: ColumnTone;
}

export interface PracticalExample {
  app: string;
  scenario: string;
  pass: string;
  fail: string;
  value?: string;
  passLabel?: string;
  failLabel?: string;
  /** Customizable columns (CRUD). When set, reader prefers these over fail/pass/value. */
  columns?: PracticalColumn[];
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

/** Shared chrome on every block — rename / color / font without changing type. */
export type BlockChrome = {
  id: string;
  /** Position in the chapter list. Recomputed on add/delete/reorder. */
  order?: number;
  collapsed?: boolean;
  /** Custom box title (rename). Falls back to catalog label. */
  heading?: string;
  accent?: BlockAccent;
  font?: BlockFont;
};

export type ChapterBlock = BlockChrome & (
  | { type: "overview"; content: string }
  | { type: "why"; content: string }
  | { type: "when"; content: string }
  | { type: "practical"; practical: PracticalExample }
  | { type: "tradeoffs"; advantages: string[]; limitations: string[]; columns?: PracticalColumn[] }
  | {
      type: "comparison";
      rows: ComparisonRow[];
      headers?: { lever: string; equivalent: string };
      columns?: PracticalColumn[];
    }
  | { type: "keyDifference"; content: string; columns?: PracticalColumn[] }
  | { type: "code"; label: string; code: string }
  | { type: "tip"; title?: string; content: string }
  | { type: "warning"; title?: string; content: string }
  | { type: "steps"; title?: string; items: string[]; columns?: PracticalColumn[] }
  | { type: "definition"; term: string; definition: string }
  | { type: "checklist"; title?: string; items: string[] }
  | { type: "resources"; items: GoDeeperResource[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "image"; src: string; alt?: string; caption?: string }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
      caption?: string;
    }
  | { type: "video"; url: string; caption?: string }
  | { type: "bullets"; title?: string; items: string[] }
  | { type: "tree"; title?: string; nodes: TreeNode[] }
  | {
      type: "featureMapping";
      title?: string;
      sourceHeader?: string;
      targetHeader?: string;
      rows: FeatureMapRow[];
      columns?: PracticalColumn[];
    }
  | { type: "gap"; content: string; alternative?: string }
  | {
      type: "curatedResources";
      category: string;
      items: CuratedResourceItem[];
    }
  | { type: "tier"; label: string; detail?: string; kind?: "free" | "paid" | "cloud" }
);

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
  { type: "steps", label: "Steps", category: "Comparison", description: "Ordered procedure as columns" },
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
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${prefix}-${Date.now().toString(36)}-${blockSeq}`;
}

export const COLUMN_BLOCK_TYPES = [
  "practical",
  "tradeoffs",
  "comparison",
  "featureMapping",
  "keyDifference",
  "steps",
] as const;

export type ColumnBlockType = (typeof COLUMN_BLOCK_TYPES)[number];

export function isColumnBlockType(type: string): type is ColumnBlockType {
  return (COLUMN_BLOCK_TYPES as readonly string[]).includes(type);
}

function lineItems(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export function defaultColumnsFor(type: ColumnBlockType): PracticalColumn[] {
  const col = (label: string, tone: ColumnTone): PracticalColumn => ({
    id: newBlockId("col"),
    label,
    content: "",
    tone,
  });
  switch (type) {
    case "practical":
      return [col("Fail Condition", "rose"), col("Pass Condition", "emerald")];
    case "tradeoffs":
      return [col("Advantages", "emerald"), col("Limitations", "rose")];
    case "comparison":
      return [col("Lever", "sky"), col("Equivalent", "amber")];
    case "featureMapping":
      return [col("Source", "sky"), col("Maps to", "emerald")];
    case "keyDifference":
      return [col("This tool", "sky"), col("The other", "amber")];
    case "steps":
      return [col("Step 1", "sky"), col("Step 2", "emerald")];
  }
}

/** Stable column view for the editor — never allocates ids on each call when columns exist. */
export function editorColumns(block: ChapterBlock): PracticalColumn[] {
  if (block.type === "practical") {
    const cols = resolvePracticalColumns(block.practical);
    return cols.length ? cols : defaultColumnsFor("practical");
  }
  if ("columns" in block && Array.isArray(block.columns) && block.columns.length) {
    return block.columns;
  }
  const sid = (n: number) => `${block.id}-col-${n}`;
  if (block.type === "tradeoffs") {
    return [
      { id: sid(0), label: "Advantages", content: block.advantages.join("\n"), tone: "emerald" },
      { id: sid(1), label: "Limitations", content: block.limitations.join("\n"), tone: "rose" },
    ];
  }
  if (block.type === "keyDifference") {
    return [
      { id: sid(0), label: "Difference", content: block.content, tone: "amber" },
      { id: sid(1), label: "Notes", content: "", tone: "neutral" },
    ];
  }
  if (block.type === "steps") {
    const items = block.items.filter((i) => i.trim());
    if (items.length >= 2) {
      return items.map((item, i) => ({
        id: sid(i),
        label: `Step ${i + 1}`,
        content: item,
        tone: (["sky", "amber", "emerald", "rose", "neutral"] as ColumnTone[])[i % 5],
      }));
    }
    return defaultColumnsFor("steps");
  }
  if (block.type === "featureMapping") {
    if (block.rows.some((r) => r.source.trim() || r.target.trim())) {
      return [
        {
          id: sid(0),
          label: block.sourceHeader || "Source",
          content: block.rows.map((r) => r.source).join("\n"),
          tone: "sky",
        },
        {
          id: sid(1),
          label: block.targetHeader || "Maps to",
          content: block.rows.map((r) => r.target).join("\n"),
          tone: "emerald",
        },
      ];
    }
    return defaultColumnsFor("featureMapping");
  }
  if (block.type === "comparison") {
    if (block.rows.some((r) => r.lever.trim() || r.equivalent.trim() || r.verdict.trim())) {
      return [
        {
          id: sid(0),
          label: block.headers?.lever || "Lever",
          content: block.rows.map((r) => r.lever).join("\n"),
          tone: "sky",
        },
        {
          id: sid(1),
          label: block.headers?.equivalent || "Equivalent",
          content: block.rows.map((r) => r.equivalent).join("\n"),
          tone: "emerald",
        },
        { id: sid(2), label: "Verdict", content: block.rows.map((r) => r.verdict).join("\n"), tone: "amber" },
      ];
    }
    return defaultColumnsFor("comparison");
  }
  return [];
}

export function applyColumns(block: ChapterBlock, columns: PracticalColumn[]): ChapterBlock {
  switch (block.type) {
    case "practical":
      return {
        ...block,
        practical: {
          ...block.practical,
          columns,
          fail: columns.find((c) => c.tone === "rose")?.content ?? block.practical.fail,
          pass: columns.find((c) => c.tone === "emerald")?.content ?? block.practical.pass,
        },
      };
    case "tradeoffs":
      return {
        ...block,
        columns,
        advantages: lineItems(columns[0]?.content || ""),
        limitations: lineItems(columns[1]?.content || ""),
      };
    case "comparison":
      return { ...block, columns };
    case "featureMapping":
      return { ...block, columns };
    case "keyDifference":
      return {
        ...block,
        columns,
        content: columns.map((c) => c.content).filter((t) => t.trim()).join("\n\n"),
      };
    case "steps":
      return {
        ...block,
        columns,
        items: columns.map((c) => [c.label, c.content].filter((t) => t.trim()).join(": ")),
      };
    default:
      return block;
  }
}

export function withOrder(blocks: ChapterBlock[]): ChapterBlock[] {
  return blocks.map((b, i) => (b.order === i ? b : { ...b, order: i }));
}

function retagColumns(cols: PracticalColumn[] | undefined): PracticalColumn[] | undefined {
  if (!cols?.length) return cols;
  return cols.map((c) => ({ ...c, id: newBlockId("col") }));
}

export function duplicateBlock(block: ChapterBlock): ChapterBlock {
  const copy = structuredClone(block) as ChapterBlock;
  copy.id = newBlockId(block.type);
  copy.heading = `${blockDisplayName(block)} (copy)`;
  if (copy.type === "practical") {
    copy.practical = {
      ...copy.practical,
      columns: retagColumns(copy.practical.columns) || copy.practical.columns,
    };
  } else if ("columns" in copy && copy.columns?.length) {
    copy.columns = retagColumns(copy.columns);
  }
  return copy;
}

/** Empty required fields — drafts still save; use before treating a chapter as complete. */
export function blockPublishIssue(block: ChapterBlock): string | null {
  if (isColumnBlockType(block.type)) {
    const filled = editorColumns(block).filter((c) => c.content.trim()).length;
    if (filled < 2) return "Need at least 2 columns with content";
    return null;
  }
  switch (block.type) {
    case "overview":
    case "why":
    case "when":
      return block.content.trim() ? null : "Body is empty";
    case "tip":
    case "warning":
    case "gap":
      return block.content.trim() ? null : "Body is empty";
    case "quote":
      return block.text.trim() ? null : "Quote is empty";
    case "definition":
      return block.term.trim() && block.definition.trim() ? null : "Term and definition required";
    case "bullets":
    case "checklist":
      return block.items.some((i) => i.trim()) ? null : "Add at least one item";
    case "code":
      return block.code.trim() ? null : "Code is empty";
    case "resources":
      return block.items.some((r) => r.url.trim() || r.title.trim()) ? null : "Add at least one link";
    case "curatedResources":
      return block.items.some((it) => it.name.trim()) ? null : "Add at least one resource";
    case "image":
      return block.src.trim() ? null : "Image URL required";
    case "video":
      return block.url.trim() ? null : "Video URL required";
    case "table":
      return block.headers.some((h) => h.trim()) || block.rows.some((r) => r.some((c) => c.trim()))
        ? null
        : "Table is empty";
    case "tree":
      return block.nodes.some((n) => n.label.trim()) ? null : "Add at least one node";
    case "tier":
      return block.label.trim() ? null : "Label required";
    default:
      return null;
  }
}

export function chapterPublishIssues(blocks: ChapterBlock[]): { id: string; message: string }[] {
  return blocks
    .map((b) => {
      const message = blockPublishIssue(b);
      return message ? { id: b.id, message } : null;
    })
    .filter((x): x is { id: string; message: string } => Boolean(x));
}

const CHROME = { accent: "amber" as BlockAccent, font: "sans" as BlockFont, order: 0 };

export function emptyBlock(type: BlockType): ChapterBlock {
  const id = newBlockId(type);
  switch (type) {
    case "overview":
    case "why":
    case "when":
      return { id, ...CHROME, type, content: "" };
    case "keyDifference":
      return { id, ...CHROME, type, content: "", columns: defaultColumnsFor("keyDifference") };
    case "tip":
    case "warning":
      return { id, ...CHROME, type, title: "", content: "" };
    case "practical":
      return {
        id,
        ...CHROME,
        type,
        practical: {
          app: "",
          scenario: "",
          pass: "",
          fail: "",
          columns: defaultColumnsFor("practical"),
        },
      };
    case "tradeoffs":
      return { id, ...CHROME, type, advantages: [], limitations: [], columns: defaultColumnsFor("tradeoffs") };
    case "comparison":
      return {
        id,
        ...CHROME,
        type,
        rows: [{ lever: "", equivalent: "", verdict: "" }],
        headers: { lever: "Lever", equivalent: "Equivalent" },
        columns: defaultColumnsFor("comparison"),
      };
    case "code":
      return { id, ...CHROME, type, label: "Code example", code: "" };
    case "steps":
      return { id, ...CHROME, type, title: "", items: [""], columns: defaultColumnsFor("steps") };
    case "checklist":
    case "bullets":
      return { id, ...CHROME, type, title: "", items: [""] };
    case "definition":
      return { id, ...CHROME, type, term: "", definition: "" };
    case "resources":
      return { id, ...CHROME, type, items: [{ title: "", url: "", description: "" }] };
    case "quote":
      return { id, ...CHROME, type, text: "", attribution: "" };
    case "image":
      return { id, ...CHROME, type, src: "", alt: "", caption: "" };
    case "table":
      return { id, ...CHROME, type, headers: ["Column A", "Column B"], rows: [["", ""]], caption: "" };
    case "video":
      return { id, ...CHROME, type, url: "", caption: "" };
    case "tree":
      return { id, ...CHROME, type, title: "", nodes: [{ label: "", children: [] }] };
    case "featureMapping":
      return {
        id,
        ...CHROME,
        type,
        title: "",
        sourceHeader: "Source",
        targetHeader: "Maps to",
        rows: [{ source: "", target: "" }],
        columns: defaultColumnsFor("featureMapping"),
      };
    case "gap":
      return { id, ...CHROME, type, content: "", alternative: "" };
    case "curatedResources":
      return {
        id,
        ...CHROME,
        type,
        category: "",
        items: [{ name: "", description: "", links: [{ label: "", url: "" }] }],
      };
    case "tier":
      return { id, ...CHROME, type, label: "Free tier", detail: "", kind: "free" };
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
  return withOrder(out);
}

/** Blocks to render: explicit `blocks` if set (even empty), else legacy synthesis. */
export function chapterBlocksForRender(ch: LegacyChapterFields): ChapterBlock[] | null {
  if (Array.isArray(ch.blocks)) return ch.blocks;
  return null; // signal: use legacy path in renderer
}

/** Blocks for the editor — hydrate from legacy once so Add Block can append. */
export function chapterBlocksForEdit(ch: LegacyChapterFields): ChapterBlock[] {
  if (Array.isArray(ch.blocks)) return withOrder(ch.blocks);
  return legacyFieldsToBlocks(ch);
}

export function isBlockType(v: string): v is BlockType {
  return (BLOCK_TYPES as readonly string[]).includes(v);
}

/** Prefer custom columns; else synthesize from legacy fail/pass/value. */
export function resolvePracticalColumns(p: PracticalExample): PracticalColumn[] {
  if (p.columns?.length) return p.columns;
  const cols: PracticalColumn[] = [];
  if (p.fail?.trim()) {
    cols.push({
      id: "legacy-fail",
      label: p.failLabel || "Fail Condition",
      content: p.fail,
      tone: "rose",
    });
  }
  if (p.pass?.trim()) {
    cols.push({
      id: "legacy-pass",
      label: p.passLabel || "Pass Condition",
      content: p.pass,
      tone: "emerald",
    });
  }
  if (p.value?.trim()) {
    cols.push({
      id: "legacy-value",
      label: "Value delivered",
      content: p.value,
      tone: "sky",
    });
  }
  return cols;
}

export function blockDisplayName(block: ChapterBlock, fallback?: string): string {
  if (block.heading?.trim()) return block.heading.trim();
  if (fallback) return fallback;
  return BLOCK_CATALOG.find((c) => c.type === block.type)?.label || block.type;
}

export function accentClasses(accent?: BlockAccent): { text: string; dot: string; border: string; bg: string } {
  switch (accent) {
    case "rose":
      return { text: "text-rose-700", dot: "bg-rose-600", border: "border-rose-200", bg: "bg-rose-50/70" };
    case "emerald":
      return { text: "text-emerald-700", dot: "bg-emerald-600", border: "border-emerald-200", bg: "bg-emerald-50/70" };
    case "sky":
      return { text: "text-sky-800", dot: "bg-sky-600", border: "border-sky-200", bg: "bg-sky-50/70" };
    case "teal":
      return { text: "text-teal-800", dot: "bg-teal-700", border: "border-teal-200", bg: "bg-[#F0FDFA]" };
    case "neutral":
      return { text: "text-[#78716C]", dot: "bg-[#78716C]", border: "border-[#E7E0D3]", bg: "bg-[#FAF7F2]" };
    case "amber":
    default:
      return { text: "text-[#D97706]", dot: "bg-[#D97706]", border: "border-[#E7E0D3]", bg: "bg-[#FAF7F2]" };
  }
}

export function fontClass(font?: BlockFont): string {
  if (font === "serif") return "font-serif-display";
  if (font === "mono") return "font-mono";
  return "font-sans";
}

/** Menu filter — undefined/empty allowed list means all types. Never strips existing blocks. */
export function blockTypesForMenu(allowed?: BlockType[] | null): BlockTypeMeta[] {
  if (!allowed?.length) return BLOCK_CATALOG;
  const set = new Set(allowed);
  return BLOCK_CATALOG.filter((m) => set.has(m.type));
}
