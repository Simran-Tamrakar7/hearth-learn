/* API: /api/showcase  — used by PAGE /showcase-wall. Map: ./CODE-FOR-THIS-API.md */

import { listedShowcaseFeatured } from "@/app/showcase-wall/_content/_registry";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSessionUser } from "@/lib/apiSession";

type Link = { label: string; url: string };

function parseLinks(raw: string | null | undefined): Link[] {
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((l) => l && typeof l.url === "string")
      .map((l) => ({ label: String(l.label || "Link"), url: String(l.url) }));
  } catch {
    return [];
  }
}

function vis(value: unknown) {
  return String(value || "PRIVATE").toUpperCase() === "PUBLIC" ? "PUBLIC" : "PRIVATE";
}

function serialize(item: {
  id: string;
  title: string;
  description: string;
  category: string;
  visibility: string;
  thumbnail: string;
  links: string;
  sortOrder: number;
  linkUrl: string;
  user?: { id: string; name: string | null; email: string; image: string | null };
}) {
  const links = parseLinks(item.links);
  if (!links.length && item.linkUrl) links.push({ label: "Link", url: item.linkUrl });
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category || "General",
    visibility: vis(item.visibility),
    thumbnail: item.thumbnail || "",
    links,
    sortOrder: item.sortOrder,
    author: item.user
      ? { id: item.user.id, name: item.user.name, email: item.user.email, image: item.user.image }
      : { id: "", name: "Hearth", email: "", image: null },
  };
}

async function activeUserId() {
  const gate = await requireSessionUser();
  return gate.userId;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const scope = searchParams.get("scope");
  const author = {
    select: { id: true, name: true, email: true, image: true },
  };

  if (scope === "public") {
    const dbItems = await prisma.showcaseItem.findMany({
      where: { visibility: { in: ["PUBLIC", "public"] } },
      include: { user: author },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    const featured = listedShowcaseFeatured().map((f: { id?: string; title: string; description?: string; linkUrl?: string; category?: string }) => ({
      id: `featured-${f.id || f.title}`,
      title: f.title,
      description: f.description || "",
      category: f.category || "Featured",
      visibility: "PUBLIC",
      thumbnail: "",
      links: f.linkUrl ? [{ label: "GitHub", url: f.linkUrl }] : [],
      sortOrder: 0,
      author: { id: "hearth", name: "Hearth", email: "", image: null },
    }));
    return NextResponse.json({ items: [...dbItems.map(serialize), ...featured] });
  }

  const userId = await activeUserId();
  if (!userId) return NextResponse.json({ items: [] }, { status: 401 });
  const dbItems = await prisma.showcaseItem.findMany({
    where: { userId },
    include: { user: author },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ items: dbItems.map(serialize) });
}

export async function POST(req: Request) {
  const userId = await activeUserId();
  if (!userId) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const title = String(body.title || "").trim();
  if (!title) return NextResponse.json({ error: "Title is required." }, { status: 400 });
  const links: Link[] = Array.isArray(body.links) ? body.links : [];
  const primary = links.find((l) => l.url?.trim())?.url || String(body.linkUrl || "");
  const count = await prisma.showcaseItem.count({ where: { userId } });
  const item = await prisma.showcaseItem.create({
    data: {
      userId,
      title,
      description: String(body.description || ""),
      linkUrl: primary,
      category: String(body.category || "General").trim() || "General",
      visibility: vis(body.visibility),
      thumbnail: String(body.thumbnail || ""),
      links: JSON.stringify(links.filter((l) => l.url?.trim())),
      sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : count,
    },
    include: { user: { select: { id: true, name: true, email: true, image: true } } },
  });
  return NextResponse.json({ item: serialize(item) }, { status: 201 });
}

export async function PATCH(req: Request) {
  const userId = await activeUserId();
  if (!userId) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const id = String(body.id || "");
  if (!id) return NextResponse.json({ error: "id is required." }, { status: 400 });
  const existing = await prisma.showcaseItem.findFirst({ where: { id, userId } });
  if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });
  const links: Link[] | undefined = Array.isArray(body.links) ? body.links : undefined;
  const item = await prisma.showcaseItem.update({
    where: { id },
    data: {
      ...(typeof body.title === "string" ? { title: body.title.trim() } : {}),
      ...(typeof body.description === "string" ? { description: body.description } : {}),
      ...(typeof body.category === "string" ? { category: body.category.trim() || "General" } : {}),
      ...(body.visibility ? { visibility: vis(body.visibility) } : {}),
      ...(typeof body.thumbnail === "string" ? { thumbnail: body.thumbnail } : {}),
      ...(typeof body.sortOrder === "number" ? { sortOrder: body.sortOrder } : {}),
      ...(links
        ? {
            links: JSON.stringify(links.filter((l) => l.url?.trim())),
            linkUrl: links.find((l) => l.url?.trim())?.url || existing.linkUrl,
          }
        : {}),
    },
    include: { user: { select: { id: true, name: true, email: true, image: true } } },
  });
  return NextResponse.json({ item: serialize(item) });
}

export async function DELETE(req: Request) {
  const userId = await activeUserId();
  if (!userId) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await prisma.showcaseItem.deleteMany({ where: { id, userId } });
  return NextResponse.json({ ok: true });
}
