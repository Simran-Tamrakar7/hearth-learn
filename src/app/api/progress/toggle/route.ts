/* API: /api/progress/toggle  — Prisma trail checkboxes on /dashboard. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActorUserId } from "@/lib/apiSession";
import {
  bumpStreakIfNewDay,
  ensureFirstChapterBadge,
  trailProgressPercentForChapter,
} from "@/lib/trailProgressActions";

export async function POST(req: Request) {
  try {
    const { chapterId } = await req.json();
    const userId = await resolveActorUserId();

    if (!userId || !chapterId) {
      return NextResponse.json({ error: "User and chapterId are required" }, { status: 400 });
    }

    const existingProgress = await prisma.progress.findUnique({
      where: { userId_chapterId: { userId, chapterId } },
    });

    let isCompleted = false;

    if (existingProgress) {
      await prisma.progress.delete({ where: { id: existingProgress.id } });
    } else {
      await prisma.progress.create({ data: { userId, chapterId } });
      isCompleted = true;
      await bumpStreakIfNewDay(userId);
      await ensureFirstChapterBadge(userId);
    }

    const trailProgressPercent = await trailProgressPercentForChapter(userId, chapterId);

    return NextResponse.json({ isCompleted, chapterId, trailProgressPercent });
  } catch (error) {
    console.error("Error toggling progress:", error);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}
