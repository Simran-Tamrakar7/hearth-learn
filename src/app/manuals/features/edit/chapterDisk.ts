import type { ChapterRecord, ManualChapter } from "@/app/manuals/types";

/** Map reader chapter state → on-disk ChapterRecord (one file). */
export function manualChapterToRecord(ch: ManualChapter): ChapterRecord {
  return {
    id: ch.id,
    overlayNo: ch.overlayNo,
    title: ch.title,
    minutes: ch.estimatedMinutes || 20,
    overviewText: ch.overviewText || "",
    why: ch.why,
    when: ch.when,
    practical: ch.practical,
    advantages: ch.advantages,
    limitations: ch.limitations,
    comparisons: ch.comparisons,
    comparisonHeaders: ch.comparisonHeaders,
    keyDifferences: ch.keyDifferences,
    codeReferences: ch.codeReferences,
    blocks: ch.blocks,
    tools: ch.tools,
    contentMarkdown: ch.contentMarkdown || "",
    customSummary: ch.customSummary,
    exercises: ch.exercises || [],
    resourceLinks: ch.resourceLinks || [],
    steps: [],
    learn: [],
  };
}

export async function saveChapterToDisk(slug: string, ch: ManualChapter): Promise<void> {
  if (!ch.sourceFile) return;
  await fetch("/api/manuals/chapter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug, sourceFile: ch.sourceFile, chapter: manualChapterToRecord(ch) }),
  });
}
