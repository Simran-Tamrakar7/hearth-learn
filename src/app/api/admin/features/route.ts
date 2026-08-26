/* API: /api/admin/features  — global room flags. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/roles";
import { DEFAULT_SITE_FEATURES, parseSiteFeatures } from "@/lib/prefs";

export async function GET() {
  const gate = await requireAdmin();
  if (!gate.ok) return NextResponse.json({ error: "Admin only." }, { status: 403 });
  const row = await prisma.siteConfig.upsert({ where: { id: "site" }, create: { id: "site" }, update: {} });
  return NextResponse.json({ features: parseSiteFeatures(row.features) });
}

export async function POST(req: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) return NextResponse.json({ error: "Admin only." }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const next = { ...DEFAULT_SITE_FEATURES, ...parseSiteFeatures(JSON.stringify(body.features || body)) };
  const row = await prisma.siteConfig.upsert({
    where: { id: "site" },
    create: { id: "site", features: JSON.stringify(next) },
    update: { features: JSON.stringify(next) },
  });
  return NextResponse.json({ features: parseSiteFeatures(row.features) });
}
