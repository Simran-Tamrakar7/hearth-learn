import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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

    if (!title || !body) {
      return NextResponse.json(
        { error: "Title and body content are required" },
        { status: 400 }
      );
    }

    const note = await prisma.note.create({
      data: {
        userId,
        title,
        body,
        trailId: trailId || null,
      },
      include: { trail: true },
    });

    // Award notes badge if first note created
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

    await prisma.note.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Note deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
  }
}
