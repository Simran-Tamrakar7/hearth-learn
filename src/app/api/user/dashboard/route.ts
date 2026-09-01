/* API: /api/user/dashboard  — used by PAGE /dashboard. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActorUserId } from "@/lib/apiSession";
import { nextIncompleteChapter, trailProgressStats } from "@/lib/trailProgress";

const userInclude = {
  streak: true,
  badges: true,
  progress: {
    include: {
      chapter: {
        include: { trail: true },
      },
    },
  },
} as const;

export async function GET() {
  try {
    const userId = await resolveActorUserId();
    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: userInclude,
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const trails = await prisma.trail.findMany({
      include: {
        chapters: { orderBy: { order: "asc" } },
      },
    });

    const completedIds = user.progress.map((p) => p.chapterId);

    const activeTrails = trails.map((trail) => {
      const { completedCount, progressPercent } = trailProgressStats(trail.chapters, completedIds);
      const nextChapter = nextIncompleteChapter(trail.chapters, completedIds);
      return { ...trail, completedCount, progressPercent, nextChapter };
    });

    const continueTrail =
      activeTrails.find((t) => t.progressPercent > 0 && t.progressPercent < 100) || activeTrails[0];

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        streak: user.streak || { currentCount: 1, longestCount: 1 },
        badgesCount: user.badges.length,
      },
      activeTrails,
      continueTrail,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ error: "Failed to load dashboard" }, { status: 500 });
  }
}
