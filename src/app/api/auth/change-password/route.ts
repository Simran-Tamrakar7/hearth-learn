/* API: /api/auth/change-password  — used by PAGE /profile. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { passwordError } from "@/lib/password";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  let current = "";
  let next = "";
  let confirm = "";
  try {
    const body = await req.json();
    current = typeof body?.currentPassword === "string" ? body.currentPassword : "";
    next = typeof body?.password === "string" ? body.password : "";
    confirm = typeof body?.confirmPassword === "string" ? body.confirmPassword : next;
  } catch {
    return NextResponse.json({ error: "Expected JSON" }, { status: 400 });
  }

  const invalid = passwordError(next, confirm);
  if (invalid) return NextResponse.json({ error: invalid }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user?.passwordHash) {
    return NextResponse.json({ error: "This account has no password to change." }, { status: 400 });
  }

  const ok = await bcrypt.compare(current, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
  }

  if (current === next) {
    return NextResponse.json({ error: "New password must be different from the current password." }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await bcrypt.hash(next, 10), mustChangePassword: false },
  });

  return NextResponse.json({ ok: true });
}
