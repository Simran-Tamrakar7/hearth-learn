/* API: /api/settings  — not called by PAGE /settings (that page uses localStorage). Map: ../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActorUserId } from "@/lib/apiSession";

function parseJsonField<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function GET() {
  try {
    const userId = await resolveActorUserId();
    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      theme: user.theme || "daylight",
      featureToggles: parseJsonField(user.featureToggles, {
        toolkits: true,
        showcaseWall: true,
        gamesShelf: true,
      }),
      pulseCheck: parseJsonField(user.pulseCheck, {}),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { theme, featureToggles, pulseCheck, action } = await req.json();
    const userId = await resolveActorUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    const updateData: Record<string, string> = {};
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
