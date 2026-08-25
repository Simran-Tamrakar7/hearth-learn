/* API: /api/user/dashboard  — used by PAGE /dashboard. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    let user = null;
    if (session?.user) {
      user = await prisma.user.findUnique({
        where: { id: (session.user as any).id },
        include: {
          streak: true,
          badges: true,
          progress: {
            include: {
              chapter: {
                include: { trail: true },
              },
            },
          },
        },
      });
    }

    // Fallback to demo user if no active session
    if (!user) {
      user = await prisma.user.findUnique({
        where: { email: "demo@hearth.study" },
        include: {
          streak: true,
          badges: true,
          progress: {
            include: {
              chapter: {
                include: { trail: true },
              },
            },
          },
        },
      });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get all trails with progress for user
    const trails = await prisma.trail.findMany({
      include: {
        chapters: {
          orderBy: { order: "asc" },
        },
      },
    });

    const userCompletedChapterIds = user.progress.map((p) => p.chapterId);

    const activeTrails = trails.map((trail) => {
      const completedCount = trail.chapters.filter((c) =>
        userCompletedChapterIds.includes(c.id)
      ).length;
      const progressPercent =
        trail.chapters.length > 0
          ? Math.round((completedCount / trail.chapters.length) * 100)
          : 0;

      // Find next uncompleted chapter
      const nextChapter = trail.chapters.find(
        (c) => !userCompletedChapterIds.includes(c.id)
      );

      return {
        ...trail,
        completedCount,
        progressPercent,
        nextChapter,
      };
    });

    // Continue where left off: pick trail with highest progress < 100% or first active
    const continueTrail =
      activeTrails.find((t) => t.progressPercent > 0 && t.progressPercent < 100) ||
      activeTrails[0];

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
