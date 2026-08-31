import { pathwiseManual } from "./compiled.body";
import type { TestingChapterData } from "./types";

export type { TestingChapterData } from "./types";

/** Flat catalog rows from compiled MD — keyed by overlayNo / outline `no`. */
export const TESTING_TYPES_CATALOG: TestingChapterData[] = (
  pathwiseManual.chapters as Record<string, unknown>[]
).map((ch, i) => ({
  no: String(ch.overlayNo ?? i + 1).padStart(2, "0"),
  title: String(ch.title || ""),
  category: String(ch.phase || ""),
  desc: String(ch.overviewText || ""),
  why: String(ch.why || ""),
  when: String(ch.when || ""),
  practical: ch.practical as TestingChapterData["practical"],
  advantages: Array.isArray(ch.advantages) ? (ch.advantages as string[]) : undefined,
  limitations: Array.isArray(ch.limitations) ? (ch.limitations as string[]) : undefined,
  tools: Array.isArray(ch.tools) ? (ch.tools as TestingChapterData["tools"]) : [],
}));

/** @deprecated use TESTING_TYPES_CATALOG */
export const TESTING_TYPES_CHAPTERS = TESTING_TYPES_CATALOG;

export function catalogByNo(n: number): TestingChapterData | undefined {
  return TESTING_TYPES_CATALOG.find((t) => Number(t.no) === n);
}
