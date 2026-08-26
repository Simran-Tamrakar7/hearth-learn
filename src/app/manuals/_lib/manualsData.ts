/* ============================================================================
 * HEADING: SHARED — Manual catalog types + findHearthManual
 * Not a page. These pages all use this same file:
 *   /manuals  /manuals/[slug]  /dashboard
 * Chapter bodies: src/app/manuals/_content/<slug>/data.js (listed in _registry.ts).
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
  exercises: ManualExercise[];
  resourceLinks: GoDeeperResource[];
}



export interface ManualItem {
  id: string;
  slug: string;
  title: string;
  category:
    | "Automation & Testing"
    | "Quality Craft"
    | "Delivery & Process"
    | "Design"
    | "AI & Prompting"
    | "Foundations"
    | "Ops & Systems"
    | "Career"
    | "Soft Skills";
  description: string;
  chapterCount: number;
  estimatedTime: string;
  icon: string;
  coverImage: string;
  chapters: ManualChapter[];
}

export function chapterCustomSummary(ch: Pick<ManualChapter, "customSummary">) {
  return ch.customSummary || "";
}

export function chapterAiSummary(ch: Pick<ManualChapter, "aiSummary" | "summaryMarkdown">) {
  return ch.aiSummary || ch.summaryMarkdown || "";
}

export { PATHWISE_HEARTH_MANUALS as MANUALS_DATA, findHearthManual } from "./pathwiseToHearth";
