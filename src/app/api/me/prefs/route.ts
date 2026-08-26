/* API: /api/me/prefs  — settings + resume + recent. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSessionUser } from "@/lib/openai";
import { parsePrefs, parseSiteFeatures, mergePrefs, DEFAULT_SITE_FEATURES } from "@/lib/prefs";

async function siteFeatures() {
  const row = await prisma.siteConfig.upsert({
    where: { id: "site" },
    create: { id: "site" },
    update: {},
  });
  return parseSiteFeatures(row.features);
}

export async function GET() {
  const gate = await requireSessionUser();
  const features = await siteFeatures().catch(() => DEFAULT_SITE_FEATURES);
  if (!gate.ok) return NextResponse.json({ prefs: {}, features });
  const user = await prisma.user.findUnique({
    where: { id: gate.userId! },
    select: { theme: true, prefs: true, name: true, email: true, image: true, role: true, createdAt: true, permissions: true },
  });
  await prisma.user.update({ where: { id: gate.userId! }, data: { lastActiveAt: new Date() } }).catch(() => {});
  return NextResponse.json({
    prefs: { theme: user?.theme, ...parsePrefs(user?.prefs) },
    features,
    profile: user
      ? { name: user.name, email: user.email, image: user.image, role: user.role, createdAt: user.createdAt }
      : null,
  });
}

export async function POST(req: Request) {
  const gate = await requireSessionUser();
  if (!gate.ok) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const user = await prisma.user.findUnique({ where: { id: gate.userId! } });
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const prefs = mergePrefs(parsePrefs(user.prefs), body.prefs && typeof body.prefs === "object" ? body.prefs : {});
  if (body.theme) prefs.theme = body.theme;
  const data: { prefs: string; theme?: string } = { prefs: JSON.stringify(prefs) };
  if (typeof prefs.theme === "string") data.theme = prefs.theme;
  await prisma.user.update({ where: { id: user.id }, data });
  return NextResponse.json({ prefs });
}
