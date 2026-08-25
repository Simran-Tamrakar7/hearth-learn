/* API: /api/user/profile  — used by PAGE /profile. Map: ../../CODE-FOR-THIS-API.md */

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
          badges: { orderBy: { earnedAt: "desc" } },
          progress: {
            include: {
              chapter: { include: { trail: true } },
            },
          },
        },
      });
    }

    if (!user) {
      user = await prisma.user.findUnique({
        where: { email: "demo@hearth.study" },
        include: {
          streak: true,
          badges: { orderBy: { earnedAt: "desc" } },
          progress: {
            include: {
              chapter: { include: { trail: true } },
            },
          },
        },
      });
    }

    if (!user) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }

    const totalChaptersDone = user.progress.length;
    const totalMinutesStudied = user.progress.reduce(
      (acc, p) => acc + (p.chapter?.estimatedMinutes || 15),
      0
    );

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        streak: user.streak || { currentCount: 1, longestCount: 1 },
        badges: user.badges,
        totalChaptersDone,
        totalHoursStudied: (totalMinutesStudied / 60).toFixed(1),
      },
    });
  } catch (error) {
    console.error("Profile error:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
