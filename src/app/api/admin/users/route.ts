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
      role: true,
      status: true,
      permissions: true,
      createdAt: true,
    },
  });

  return NextResponse.json({
    users: users.map(serialize),
    pending: users.filter((u) => u.status === STATUS_PENDING).map(serialize),
  });
}

export async function PATCH(req: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) return NextResponse.json({ error: "Admin only." }, { status: 403 });

  let body: {
    id?: string;
    status?: string;
    permissions?: Partial<Record<PermissionKey, boolean>>;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON" }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (isProtectedAdminEmail(target.email)) {
    if (body.status && body.status !== STATUS_ACTIVE) {
      return NextResponse.json({ error: "The seed admin account cannot be rejected or disabled." }, { status: 400 });
    }
    if (body.permissions) {
      return NextResponse.json({ error: "The seed admin account always has all permissions." }, { status: 400 });
    }
    return NextResponse.json({ user: serialize(target) });
  }

  if (target.id === gate.session?.user?.id && body.status && body.status !== STATUS_ACTIVE) {
    return NextResponse.json({ error: "You cannot reject your own account." }, { status: 400 });
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

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ user: serialize(target) });
  }

  const updated = await prisma.user.update({ where: { id }, data });

  if (data.status === STATUS_ACTIVE || data.status === STATUS_REJECTED) {
    notifyUserStatus(updated.email, data.status).catch(() => {});
  }

  return NextResponse.json({ user: serialize(updated) });
}
