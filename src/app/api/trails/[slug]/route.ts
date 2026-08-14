import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
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

    const trail = await prisma.trail.findUnique({
      where: { slug },
      include: {
        chapters: {
          orderBy: { order: "asc" },
        },
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

    const chaptersWithStatus = trail.chapters.map((chapter) => ({
      ...chapter,
      isCompleted: completedChapterIds.includes(chapter.id),
    }));

    const completedCount = chaptersWithStatus.filter((c) => c.isCompleted).length;
    const progressPercent =
      chaptersWithStatus.length > 0
        ? Math.round((completedCount / chaptersWithStatus.length) * 100)
        : 0;

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
