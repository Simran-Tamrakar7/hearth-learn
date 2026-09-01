/* API: /api/chapters/margin-notes  — used by PAGE /manuals/[slug]. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActorUserId } from "@/lib/apiSession";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const chapterId = searchParams.get("chapterId");
    const userId = await resolveActorUserId();

    if (!userId || !chapterId) {
      return NextResponse.json({ marginNotes: [] });
    }

    const marginNotes = await prisma.chapterMarginNote.findMany({
      where: { userId, chapterId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ marginNotes });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch margin notes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { chapterId, text } = await req.json();
    const userId = await resolveActorUserId();

    if (!userId || !chapterId || !text) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const marginNote = await prisma.chapterMarginNote.create({
      data: { userId, chapterId, text },
    });

    return NextResponse.json({ marginNote }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save margin note" }, { status: 500 });
  }
}
