/* API: /api/settings  — not called by PAGE /settings (that page uses localStorage). Map: ../CODE-FOR-THIS-API.md */

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
      });
    }

    if (!user) {
      user = await prisma.user.findUnique({
        where: { email: "demo@hearth.study" },
      });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let featureToggles = { toolkits: true, showcaseWall: true, gamesShelf: true };
    try {
      if (user.featureToggles) featureToggles = JSON.parse(user.featureToggles);
    } catch (e) {}

    let pulseCheck = {};
    try {
      if (user.pulseCheck) pulseCheck = JSON.parse(user.pulseCheck);
    } catch (e) {}

    return NextResponse.json({
      theme: user.theme || "daylight",
      featureToggles,
      pulseCheck,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { theme, featureToggles, pulseCheck, action } = await req.json();
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

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Action: Data Export
    if (action === "export") {
      const userData = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          progress: { include: { chapter: { include: { trail: true } } } },
          notes: true,
          streak: true,
          badges: true,
          showcaseItems: true,
          certificates: { include: { trail: true } },
        },
      });

      return NextResponse.json({ exportData: userData });
    }

    // Action: Reset Progress
    if (action === "reset_progress") {
      await prisma.progress.deleteMany({ where: { userId } });
      await prisma.note.deleteMany({ where: { userId } });
      await prisma.chapterMarginNote.deleteMany({ where: { userId } });
      await prisma.showcaseItem.deleteMany({ where: { userId } });
      await prisma.streak.update({
        where: { userId },
        data: { currentCount: 1, lastCheckIn: new Date() },
      });

      return NextResponse.json({ message: "Progress reset successfully" });
    }

    // Standard settings update
    const updateData: any = {};
    if (theme) updateData.theme = theme;
    if (featureToggles) updateData.featureToggles = JSON.stringify(featureToggles);
    if (pulseCheck) updateData.pulseCheck = JSON.stringify(pulseCheck);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json({ message: "Settings updated", user: updatedUser });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
