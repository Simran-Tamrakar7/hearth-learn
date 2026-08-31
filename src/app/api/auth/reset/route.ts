/* API: /api/auth/reset  — used by PAGE /login/forgot-password. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { purgeExpiredResetTokens } from "@/lib/mail";
import { passwordError } from "@/lib/passwordReset";

export async function POST(req: Request) {
  let token = "";
  let password = "";
  let confirmPassword = "";
  try {
    const body = await req.json();
    token = typeof body?.token === "string" ? body.token.trim() : "";
    password = typeof body?.password === "string" ? body.password : "";
    confirmPassword = typeof body?.confirmPassword === "string" ? body.confirmPassword : password;
  } catch {
    return NextResponse.json({ error: "Expected JSON { token, password }" }, { status: 400 });
  }

  const invalid = passwordError(password, confirmPassword);
  if (!token || invalid) {
    return NextResponse.json(
      { error: invalid || "A new password is required." },
      { status: 400 }
    );
  }

  await purgeExpiredResetTokens();

  const row = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!row || row.kind !== "session" || row.expiresAt.getTime() < Date.now()) {
    return NextResponse.json({ error: "This reset session is invalid or has expired." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: row.email } });
  if (!user) {
    return NextResponse.json({ error: "This reset session is invalid or has expired." }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: await bcrypt.hash(password, 10),
      mustChangePassword: false,
    },
  });
  await prisma.passwordResetToken.deleteMany({ where: { email: row.email } });

  return NextResponse.json({ ok: true });
}
