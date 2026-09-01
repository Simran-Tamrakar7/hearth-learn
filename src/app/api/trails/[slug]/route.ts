/* API: /api/trails/[slug]  — Prisma trail JSON. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActorUserId } from "@/lib/apiSession";
import { chaptersWithCompletion, trailProgressStats } from "@/lib/trailProgress";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const userId = await resolveActorUserId();

    const trail = await prisma.trail.findUnique({
      where: { slug },
      include: {
        chapters: { orderBy: { order: "asc" } },
      },
    });

    if (!trail) {
      return NextResponse.json({ error: "Trail not found" }, { status: 404 });
    }

    let completedChapterIds: string[] = [];
    if (userId) {
      const userProgress = await prisma.progress.findMany({
        where: { userId },
        select: { chapterId: true },
      });
      completedChapterIds = userProgress.map((p) => p.chapterId);
    }

    const chaptersWithStatus = chaptersWithCompletion(trail.chapters, completedChapterIds);
    const { completedCount, progressPercent } = trailProgressStats(trail.chapters, completedChapterIds);

    return NextResponse.json({
      trail: {
        ...trail,
        chapters: chaptersWithStatus,
        completedCount,
        progressPercent,
      },
    });
  } catch (error) {
    console.error("Error fetching trail detail:", error);
    return NextResponse.json({ error: "Failed to load trail detail" }, { status: 500 });
  }
}
