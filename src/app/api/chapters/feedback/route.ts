/* API: /api/chapters/feedback  — used by PAGE /manuals/[slug]. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActorUserId } from "@/lib/apiSession";

export async function POST(req: Request) {
  try {
    const { chapterId, rating, comment } = await req.json();
    const userId = await resolveActorUserId();

    if (!userId || !chapterId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const feedback = await prisma.chapterFeedback.upsert({
      where: { userId_chapterId: { userId, chapterId } },
      update: { rating: rating || 5, comment: comment || null },
      create: {
        userId,
        chapterId,
        rating: rating || 5,
        comment: comment || null,
      },
    });

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json({ error: "Failed to save chapter feedback" }, { status: 500 });
  }
}
