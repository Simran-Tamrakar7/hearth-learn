/* API: /api/trails  — Prisma trails for notes/dashboard (not the /trails redirect). Map: ../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActorUserId } from "@/lib/apiSession";
import { trailProgressStats } from "@/lib/trailProgress";

export async function GET() {
  try {
    const userId = await resolveActorUserId();

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
    if (userId) {
      const userProgress = await prisma.progress.findMany({
        where: { userId },
        select: { chapterId: true },
      });
      completedChapterIds = userProgress.map((p) => p.chapterId);
    }

    const trailsWithProgress = trails.map((trail) => {
      const stats = trailProgressStats(trail.chapters, completedChapterIds);
      return { ...trail, ...stats };
    });

    return NextResponse.json({ trails: trailsWithProgress });
  } catch (error) {
    console.error("Error fetching trails:", error);
    return NextResponse.json({ error: "Failed to load trails" }, { status: 500 });
  }
}
