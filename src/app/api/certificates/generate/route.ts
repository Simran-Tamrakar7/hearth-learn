/* API: /api/certificates/generate  — used by PAGE /certificates/[id]. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveActorUserId } from "@/lib/apiSession";

export async function POST(req: Request) {
  try {
    const { trailId } = await req.json();
    const userId = await resolveActorUserId();

    if (!userId || !trailId) {
      return NextResponse.json({ error: "Missing trailId or userId" }, { status: 400 });
    }

    let certificate = await prisma.trailCertificate.findUnique({
      where: { userId_trailId: { userId, trailId } },
      include: { user: true, trail: true },
    });

    if (!certificate) {
      const randomCode = `HEARTH-CERT-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      certificate = await prisma.trailCertificate.create({
        data: { userId, trailId, certificateCode: randomCode },
        include: { user: true, trail: true },
      });
    }

    return NextResponse.json({ certificate });
  } catch (error) {
    console.error("Certificate error:", error);
    return NextResponse.json({ error: "Failed to issue certificate" }, { status: 500 });
  }
}
