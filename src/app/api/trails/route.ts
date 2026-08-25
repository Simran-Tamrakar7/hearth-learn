/* API: /api/trails  — Prisma trails for notes/dashboard (not the /trails redirect). Map: ../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    const trails = await prisma.trail.findMany({
      include: {
        chapters: {
          orderBy: { order: "asc" },
          select: { id: true, title: true, estimatedMinutes: true, order: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    let completedChapterIds: string[] = [];

    if (session?.user) {
      const userProgress = await prisma.progress.findMany({
        where: { userId: (session.user as any).id },
        select: { chapterId: true },
      });
      completedChapterIds = userProgress.map((p) => p.chapterId);
    } else {
      // For demo session fallback, get demo user progress
      const demoUser = await prisma.user.findUnique({
        where: { email: "demo@hearth.study" },
        include: { progress: true },
      });
      if (demoUser) {
        completedChapterIds = demoUser.progress.map((p) => p.chapterId);
      }
    }

    const trailsWithProgress = trails.map((trail) => {
      const totalChapters = trail.chapters.length;
      const completedCount = trail.chapters.filter((c) =>
        completedChapterIds.includes(c.id)
      ).length;
      const progressPercent = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;

      return {
        ...trail,
        totalChapters,
        completedCount,
        progressPercent,
      };
    });

    return NextResponse.json({ trails: trailsWithProgress });
  } catch (error) {
    console.error("Error fetching trails:", error);
    return NextResponse.json({ error: "Failed to load trails" }, { status: 500 });
  }
}
