/** Shared Prisma trail progress math — used by dashboard, trails list, and trail detail APIs. */

export type ChapterProgressInput = { id: string };

export function trailProgressStats(
  chapters: ChapterProgressInput[],
  completedChapterIds: Iterable<string>
) {
  const done = new Set(completedChapterIds);
  const total = chapters.length;
  const completedCount = chapters.filter((c) => done.has(c.id)).length;
  const progressPercent = total > 0 ? Math.round((completedCount / total) * 100) : 0;
  return { totalChapters: total, completedCount, progressPercent };
}

export function chaptersWithCompletion<T extends ChapterProgressInput>(
  chapters: T[],
  completedChapterIds: Iterable<string>
) {
  const done = new Set(completedChapterIds);
  return chapters.map((chapter) => ({ ...chapter, isCompleted: done.has(chapter.id) }));
}

export function nextIncompleteChapter<T extends ChapterProgressInput>(
  chapters: T[],
  completedChapterIds: Iterable<string>
) {
  const done = new Set(completedChapterIds);
  return chapters.find((c) => !done.has(c.id));
}
