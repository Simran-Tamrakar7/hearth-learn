/* API: /api/highlights  — used by PAGE /manuals/[slug]. Map: ../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isHighlightColor, tabTypeToField } from "@/app/manuals/features/highlights";

const TABS = new Set(["fullContent", "summary", "aiSummary"]);

function sessionUserId(session: { user?: { id?: string; status?: string } } | null) {
  if (!session?.user?.id || session.user.status === "PENDING" || session.user.status === "REJECTED") return null;
  return session.user.id;
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = sessionUserId(session);
    if (!userId) return NextResponse.json({ highlights: [] });

    const { searchParams } = new URL(req.url);
    const due = searchParams.get("due") === "1";
    const chapterId = searchParams.get("chapterId");
    const chapterIds = (searchParams.get("chapterIds") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const ids = chapterId ? [chapterId, ...chapterIds] : chapterIds;

    const rows = await prisma.manualHighlight.findMany({
      where: {
        userId,
        ...(ids.length ? { chapterId: { in: ids } } : {}),
        ...(due ? { reviewLater: true, reviewAt: { lte: new Date() } } : {}),
      },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ highlights: rows });
  } catch (error) {
    console.error("highlights GET", error);
    return NextResponse.json({ highlights: [] });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = sessionUserId(session);
    if (!userId) return NextResponse.json({ error: "Sign in to save highlights." }, { status: 401 });

    const body = await req.json();
    const text = String(body.text || "").trim().slice(0, 500);
    const chapterId = String(body.chapterId || "").trim();
    const tabType = TABS.has(String(body.tabType)) ? String(body.tabType) : "fullContent";
    const color = isHighlightColor(String(body.color)) ? String(body.color) : "yellow";
    const start = Number.isFinite(Number(body.start)) ? Math.max(0, Number(body.start)) : 0;
    const id = String(body.id || "").trim() || `hl-${Date.now().toString(36)}`;

    if (!text || !chapterId) {
      return NextResponse.json({ error: "chapterId and text are required." }, { status: 400 });
    }

    const reviewLater = body.reviewLater === true;
    const reviewAt = reviewLater
      ? new Date(Date.now() + 1000 * 60 * 60 * 24)
      : body.reviewLater === false
        ? null
        : undefined;
    const row = await prisma.manualHighlight.upsert({
      where: { id },
      create: {
        id,
        userId,
        chapterId,
        tabType,
        text,
        color,
        start,
        reviewLater,
        reviewAt: reviewAt ?? null,
      },
      update: {
        text,
        color,
        start,
        tabType,
        chapterId,
        ...(typeof body.reviewLater === "boolean" ? { reviewLater, reviewAt: reviewAt ?? null } : {}),
      },
    });
    return NextResponse.json({ highlight: row, field: tabTypeToField(tabType) });
  } catch (error) {
    console.error("highlights POST", error);
    return NextResponse.json({ error: "Failed to save highlight." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = sessionUserId(session);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    await prisma.manualHighlight.deleteMany({ where: { id, userId } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("highlights DELETE", error);
    return NextResponse.json({ error: "Failed to delete highlight." }, { status: 500 });
  }
}
