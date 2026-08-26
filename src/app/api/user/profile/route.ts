/* API: /api/user/profile  — used by PAGE /profile. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { parsePermissions } from "@/lib/permissions";

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
      return NextResponse.json({ error: "Sign in to view your profile." }, { status: 401 });
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
        image: user.image,
        role: user.role,
        status: user.status,
        permissions: parsePermissions(user.permissions, user.role),
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

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    const body = await req.json();
    const data: { name?: string; image?: string; passwordHash?: string } = {};
    if (typeof body.name === "string" && body.name.trim()) data.name = body.name.trim().slice(0, 80);
    if (typeof body.image === "string") data.image = body.image.trim().slice(0, 500);
    if (typeof body.password === "string" && body.password.length >= 4) {
      const bcrypt = await import("bcryptjs");
      data.passwordHash = await bcrypt.hash(body.password, 10);
    }
    const user = await prisma.user.update({ where: { id: userId }, data });
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, image: user.image } });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
