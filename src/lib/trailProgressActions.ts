import { prisma } from "@/lib/prisma";

/** Bump streak when completing a chapter on a new calendar day. */
export async function bumpStreakIfNewDay(userId: string) {
  const now = new Date();
  const userStreak = await prisma.streak.findUnique({ where: { userId } });
  if (!userStreak) return;

  const lastCheckIn = new Date(userStreak.lastCheckIn);
  const isSameDay =
    now.getFullYear() === lastCheckIn.getFullYear() &&
    now.getMonth() === lastCheckIn.getMonth() &&
    now.getDate() === lastCheckIn.getDate();

  if (isSameDay) return;

  const updatedCount = userStreak.currentCount + 1;
  await prisma.streak.update({
    where: { userId },
    data: {
      currentCount: updatedCount,
      longestCount: Math.max(updatedCount, userStreak.longestCount),
      lastCheckIn: now,
    },
  });
}

/** Award first_chapter badge once per user. */
export async function ensureFirstChapterBadge(userId: string) {
  const existing = await prisma.badge.findFirst({
    where: { userId, name: "first_chapter" },
  });
  if (existing) return;

  await prisma.badge.create({
    data: {
      userId,
      name: "first_chapter",
      title: "First Step Taken",
      description: "Completed your very first chapter on Hearth",
      icon: "CheckCircle2",
    },
  });
}

/** Trail completion percent after toggling one chapter. */
export async function trailProgressPercentForChapter(userId: string, chapterId: string) {
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    include: { trail: { include: { chapters: { select: { id: true } } } } },
  });
  if (!chapter?.trail?.chapters.length) return 0;

  const trailChapterIds = chapter.trail.chapters.map((c) => c.id);
  const completedTrailChapters = await prisma.progress.count({
    where: { userId, chapterId: { in: trailChapterIds } },
  });
  return Math.round((completedTrailChapters / trailChapterIds.length) * 100);
}
