/* API: /api/showcase  — used by PAGE /showcase-wall. Map: ./CODE-FOR-THIS-API.md */

import { listedShowcaseFeatured } from "@content/showcase/_registry";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const GITHUB_FEATURED_PROJECTS = listedShowcaseFeatured();

export async function GET() {
  try {
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

    let dbItems: any[] = [];
    if (userId) {
      dbItems = await prisma.showcaseItem.findMany({
        where: { userId },
        include: { trail: true },
        orderBy: { createdAt: "desc" },
      });
    }

    // Merge DB items and all 17 public GitHub featured projects
    const combinedItems = [...dbItems, ...GITHUB_FEATURED_PROJECTS];

    return NextResponse.json({ items: combinedItems });
  } catch (error) {
    return NextResponse.json({ items: GITHUB_FEATURED_PROJECTS });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, linkUrl, trailId } = await req.json();
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

    if (!userId || !title || !linkUrl) {
      return NextResponse.json({ error: "Title and link URL are required" }, { status: 400 });
    }

    const item = await prisma.showcaseItem.create({
      data: {
        userId,
        title,
        description: description || "",
        linkUrl,
        trailId: trailId || null,
      },
      include: { trail: true },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to log showcase project" }, { status: 500 });
  }
}
