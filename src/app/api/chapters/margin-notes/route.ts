import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const chapterId = searchParams.get("chapterId");

    const session = await getServerSession(authOptions);

    let userId: string | null = null;
    if (session?.user) {
      userId = (session.user as any).id;
    } else {
      const demoUser = await prisma.user.findUnique({
        where: { email: "demo@hearth.study" },
      });
      if (demoUser) userId = demoUser.id;
    }

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
    const session = await getServerSession(authOptions);

    let userId: string | null = null;
    if (session?.user) {
      userId = (session.user as any).id;
    } else {
      const demoUser = await prisma.user.findUnique({
        where: { email: "demo@hearth.study" },
      });
      if (demoUser) userId = demoUser.id;
    }

    if (!userId || !chapterId || !text) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const marginNote = await prisma.chapterMarginNote.create({
      data: {
        userId,
        chapterId,
        text,
      },
    });

    return NextResponse.json({ marginNote }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save margin note" }, { status: 500 });
  }
}
