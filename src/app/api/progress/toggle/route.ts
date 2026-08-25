/* API: /api/progress/toggle  — Prisma trail checkboxes on /dashboard. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { chapterId } = await req.json();
    const session = await getServerSession(authOptions);

    let userId: string | null = null;
    if (session?.user) {
      userId = (session.user as any).id;
    } else {
      // Demo user fallback
      const demoUser = await prisma.user.findUnique({
        where: { email: "demo@hearth.study" },
      });
      if (demoUser) userId = demoUser.id;
    }

    if (!userId || !chapterId) {
      return NextResponse.json(
        { error: "User and chapterId are required" },
        { status: 400 }
      );
    }

    // Check if already completed
    const existingProgress = await prisma.progress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    let isCompleted = false;

    if (existingProgress) {
      // Toggle off
      await prisma.progress.delete({
        where: { id: existingProgress.id },
      });
      isCompleted = false;
    } else {
      // Mark complete
      await prisma.progress.create({
        data: {
          userId,
          chapterId,
        },
      });
      isCompleted = true;

      // Update streak for today
      const now = new Date();
      const userStreak = await prisma.streak.findUnique({
        where: { userId },
      });

      if (userStreak) {
        const lastCheckIn = new Date(userStreak.lastCheckIn);
        const isSameDay =
          now.getFullYear() === lastCheckIn.getFullYear() &&
          now.getMonth() === lastCheckIn.getMonth() &&
          now.getDate() === lastCheckIn.getDate();

        if (!isSameDay) {
          const updatedCount = userStreak.currentCount + 1;
          const longest = Math.max(updatedCount, userStreak.longestCount);
          await prisma.streak.update({
            where: { userId },
            data: {
              currentCount: updatedCount,
              longestCount: longest,
              lastCheckIn: now,
            },
          });
        }
      }

      // Check if user earned the first_trail or chapter completion badge
      const existingBadge = await prisma.badge.findFirst({
        where: { userId, name: "first_chapter" },
      });
      if (!existingBadge) {
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
    }

    // Get updated trail progress
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      include: {
        trail: {
          include: {
            chapters: true,
          },
        },
      },
    });

    let trailProgressPercent = 0;
    if (chapter?.trail) {
      const trailChapterIds = chapter.trail.chapters.map((c) => c.id);
      const completedTrailChapters = await prisma.progress.count({
        where: {
          userId,
          chapterId: { in: trailChapterIds },
        },
      });
      trailProgressPercent = Math.round(
        (completedTrailChapters / trailChapterIds.length) * 100
      );
    }

    return NextResponse.json({
      isCompleted,
      chapterId,
      trailProgressPercent,
    });
  } catch (error) {
    console.error("Error toggling progress:", error);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}
