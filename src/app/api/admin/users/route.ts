import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/roles";
import {
  ADMIN_PERMISSIONS,
  PERMISSION_KEYS,
  STATUS_ACTIVE,
  STATUS_PENDING,
  STATUS_REJECTED,
  isAdminRole,
  isProtectedAdminEmail,
  parsePermissions,
  stringifyPermissions,
  type PermissionKey,
} from "@/lib/permissions";
import { notifyUserStatus } from "@/lib/mail";

function serialize(user: {
  id: string;
  email: string;
  name: string | null;
  role: string;
  status: string;
  permissions: string;
  createdAt: Date;
}) {
  const protectedAdmin = isProtectedAdminEmail(user.email);
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status,
    permissions: protectedAdmin || isAdminRole(user.role) ? ADMIN_PERMISSIONS : parsePermissions(user.permissions, user.role),
    createdAt: user.createdAt.toISOString(),
    protected: protectedAdmin,
  };
}

export async function GET() {
  const gate = await requireAdmin();
  if (!gate.ok) return NextResponse.json({ error: "Admin only." }, { status: 403 });

  const users = await prisma.user.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      role: true,
      status: true,
      permissions: true,
      createdAt: true,
      lastActiveAt: true,
      prefs: true,
      streak: true,
      badges: { select: { title: true, name: true }, take: 12 },
      _count: {
        select: { badges: true, manualHighlights: true, showcaseItems: true, lifeLabAttempts: true, progress: true },
      },
    },
  });

  const mapped = users.map((u) => {
    let prefs: Record<string, unknown> = {};
    try {
      prefs = JSON.parse(u.prefs || "{}");
    } catch {
      prefs = {};
    }
    const progress = (prefs.progress && typeof prefs.progress === "object" ? prefs.progress : {}) as Record<string, unknown>;
    const pinned = Array.isArray(prefs.pins) ? prefs.pins : [];
    return {
      ...serialize(u),
      image: u.image,
      lastActiveAt: u.lastActiveAt?.toISOString() || null,
      streak: u.streak?.currentCount || 0,
      highlightCount: u._count.manualHighlights,
      badgeCount: u._count.badges,
      showcaseCount: u._count.showcaseItems,
      attemptCount: u._count.lifeLabAttempts,
      trailChaptersDone: u._count.progress,
      prefs,
      activity: {
        highlights: u._count.manualHighlights,
        showcase: u._count.showcaseItems,
        lifeLabAttempts: u._count.lifeLabAttempts,
        lastActiveAt: u.lastActiveAt?.toISOString() || null,
        streak: u.streak?.currentCount || 0,
        studyMinutes: u._count.progress * 15,
        badges: u.badges.map((b) => b.title || b.name),
        pinned: pinned.map((p) => (p && typeof p === "object" && "title" in p ? String((p as { title?: string }).title) : String(p))),
        progress,
      },
    };
  });

  return NextResponse.json({
    users: mapped,
    pending: mapped.filter((u) => u.status === STATUS_PENDING),
  });
}

type PatchBody = {
  id?: string;
  ids?: string[];
  status?: string;
  permissions?: Partial<Record<PermissionKey, boolean>>;
};

async function patchOne(id: string, body: PatchBody, actorId?: string) {
  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) return { error: "User not found", id };
  if (isProtectedAdminEmail(target.email) || isAdminRole(target.role)) {
    if (body.status && body.status !== STATUS_ACTIVE) {
      return { error: "Admin accounts cannot be rejected or disabled.", id };
    }
    if (body.permissions) {
      return { error: "Admin accounts cannot be downgraded.", id };
    }
    return { user: serialize(target) };
  }
  if (target.id === actorId && body.status && body.status !== STATUS_ACTIVE) {
    return { error: "You cannot reject your own account.", id };
  }
  const data: { status?: string; permissions?: string } = {};
  if (body.status === STATUS_ACTIVE || body.status === STATUS_REJECTED || body.status === STATUS_PENDING) {
    data.status = body.status;
  }
  if (body.permissions && !isAdminRole(target.role)) {
    const next = parsePermissions(target.permissions, target.role);
    for (const key of PERMISSION_KEYS) {
      if (typeof body.permissions[key] === "boolean") next[key] = Boolean(body.permissions[key]);
    }
    data.permissions = stringifyPermissions(next);
  }
  if (Object.keys(data).length === 0) return { user: serialize(target) };
  const updated = await prisma.user.update({ where: { id }, data });
  if (data.status === STATUS_ACTIVE || data.status === STATUS_REJECTED) {
    notifyUserStatus(updated.email, data.status).catch(() => {});
  }
  return { user: serialize(updated) };
}

export async function PATCH(req: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) return NextResponse.json({ error: "Admin only." }, { status: 403 });

  let body: PatchBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON" }, { status: 400 });
  }

  const ids = [
    ...(typeof body.id === "string" && body.id ? [body.id] : []),
    ...(Array.isArray(body.ids) ? body.ids.filter((x) => typeof x === "string") : []),
  ];
  if (ids.length === 0) return NextResponse.json({ error: "id is required" }, { status: 400 });
  if (ids.length === 1) {
    const result = await patchOne(ids[0], body, gate.session?.user?.id);
    if ("error" in result && result.error) return NextResponse.json(result, { status: 400 });
    return NextResponse.json(result);
  }
  const users = [];
  for (const id of ids) {
    users.push(await patchOne(id, body, gate.session?.user?.id));
  }
  return NextResponse.json({ users });
}
