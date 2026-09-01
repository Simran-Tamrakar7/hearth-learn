/* API: /api/notes  — used by PAGE /notes and /tags. Map: ../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActorUserId } from "@/lib/apiSession";

export async function GET() {
  try {
    const userId = await resolveActorUserId();
    if (!userId) {
      return NextResponse.json({ notes: [] });
    }

    const notes = await prisma.note.findMany({
      where: { userId },
      include: { trail: true },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, body, trailId } = await req.json();
    const userId = await resolveActorUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!title || !body) {
      return NextResponse.json({ error: "Title and body content are required" }, { status: 400 });
    }

    const note = await prisma.note.create({
      data: { userId, title, body, trailId: trailId || null },
      include: { trail: true },
    });

    const notesCount = await prisma.note.count({ where: { userId } });
    if (notesCount === 1) {
      const existingBadge = await prisma.badge.findFirst({
        where: { userId, name: "first_note" },
      });
      if (!existingBadge) {
        await prisma.badge.create({
          data: {
            userId,
            name: "first_note",
            title: "Quiet Chronicler",
            description: "Authored your first study note in the cabin",
            icon: "PenTool",
          },
        });
      }
    }

    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json({ error: "Failed to save note" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Note ID is required" }, { status: 400 });
    }

    const userId = await resolveActorUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deleted = await prisma.note.deleteMany({
      where: { id, userId },
    });

    if (deleted.count === 0) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Note deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
  }
}
