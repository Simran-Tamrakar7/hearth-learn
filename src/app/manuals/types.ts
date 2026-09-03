/* ============================================================================
 * HEADING: SHARED — Manual catalog types + findHearthManual
 * Not a page. These pages all use this same file:
 *   /manuals  /manuals/[slug]  /dashboard
 * Chapter bodies: src/app/manuals/<slug>/part-N/chapter-M.ts (see registry.ts).
 * Changing this file changes all of those pages at once.
 * ========================================================================== */

export interface GoDeeperResource {
  title: string;
  url: string;
  description: string;
}

export interface ManualExercise {
  prompt: string;
  starterCode?: string;
  solutionCode: string;
}

export interface ToolStep {
  t: string;
  p?: string;
  c?: string;
}

export interface ToolItem {
  name: string;
  sub: string;
  url?: string | null;
  desc: string;
  seeChapter?: number;
  adv: string[];
  lim: string[];
  steps?: ToolStep[];
}

export interface PracticalExample {
  app: string;
  scenario: string;
  pass: string;
  fail: string;
  value?: string;
  passLabel?: string;
  failLabel?: string;
}

/** Cypress↔Playwright (or similar) mapping row for ComparisonTable insight boxes. */
export interface ComparisonRow {
  /** Technique / lever in this tool's world. */
  lever: string;
  /** Closest equivalent in the other tool (or "none"). */
  equivalent: string;
  /** same impact / different API / Cypress-specific / partial / etc. */
  verdict: string;
}

/** Labeled code block — standalone or alongside other insight boxes. */
export interface CodeReference {
  label: string;
  code: string;
}

/** On-disk chapter module shape (part-N/chapter-M.ts). */
export interface ChapterRecord {
  id: string;
  overlayNo?: number;
  title: string;
  minutes: number;
  level?: string;
  phase?: string;
  partName?: string;
  overviewText?: string;
  /** Optional insight boxes — omit any type that isn't genuine for this chapter. */
  why?: string;
  when?: string;
  practical?: PracticalExample;
  advantages?: string[];
  limitations?: string[];
  comparisons?: ComparisonRow[];
  /** Optional column labels for ComparisonTable (defaults: Cypress lever / Playwright equivalent). */
  comparisonHeaders?: { lever: string; equivalent: string };
  keyDifferences?: string[];
  codeReferences?: CodeReference[];
  tools?: ToolItem[];
  contentMarkdown: string;
  /** User-authored summary — shown in Summary view (testing-types / Playwright pattern). */
  customSummary?: string;
  exercises: ManualExercise[];
  resourceLinks: GoDeeperResource[];
  steps?: unknown[];
  learn?: string[];
}

export interface ManualChapter {
  id: string;
  order: number;
  slug: string;
  title: string;
  estimatedMinutes: number;
  /** Stable part identity. "Part N" is never stored — it is always the part's index. */
  partKey?: string;
  /** If set, this row is a sub-chapter of that chapter id (one level only). */
  parentId?: string;
  subtitle?: string;
  overviewText?: string;
  /** Maps to toc.ts `no` / chapter frontmatter overlayNo. */
  overlayNo?: number;
  /** Relative path under manual folder, e.g. part-1/chapter-1.ts */
  sourceFile?: string;
  why?: string;
  when?: string;
  practical?: PracticalExample;
  contentMarkdown: string;
  /** Back-compat AI summary. Prefer `aiSummary` when both exist. */
  summaryMarkdown?: string;
  /** User-authored summary — never mixed with fullContent or AI summary. */
  customSummary?: string;
  /** AI-authored summary. Falls back to summaryMarkdown when missing. */
  aiSummary?: string;
  sections?: { title: string; body: string }[];
  codeSnippet?: string;
  tools?: ToolItem[];
  advantages?: string[];
  limitations?: string[];
  comparisons?: ComparisonRow[];
  comparisonHeaders?: { lever: string; equivalent: string };
  keyDifferences?: string[];
  codeReferences?: CodeReference[];
  exercises: ManualExercise[];
  resourceLinks: GoDeeperResource[];
}

export interface ManualItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags?: string[];
  description: string;
  chapterCount: number;
  estimatedTime: string;
  icon: string;
  coverImage: string;
  chapters: ManualChapter[];
}

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .trim();
}

/** Summary tab: plain bullet lines — no headings, bold, or mixed block types. */
export function chapterCustomSummaryBullets(ch: Pick<ManualChapter, "customSummary">): string[] {
  const raw = ch.customSummary || "";
  if (!raw) return [];

  const body = raw.replace(/^#{1,3}\s+[^\n]+\n+/, "").trimStart();
  const bullets: string[] = [];

  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    let text = trimmed.replace(/^#{1,6}\s+/, "");
    text = text.replace(/^[-*•]\s+/, "");
    text = text.replace(/^\d+[.)]\s+/, "");
    text = stripInlineMarkdown(text);
    if (text) bullets.push(text);
  }

  return bullets;
}

export function chapterCustomSummary(ch: Pick<ManualChapter, "customSummary">) {
  return chapterCustomSummaryBullets(ch).map((b) => `- ${b}`).join("\n");
}

export function chapterAiSummary(ch: Pick<ManualChapter, "aiSummary" | "summaryMarkdown">) {
  return ch.aiSummary || ch.summaryMarkdown || "";
}

export { PATHWISE_HEARTH_MANUALS as MANUALS_DATA, findHearthManual } from "./features/reader";
