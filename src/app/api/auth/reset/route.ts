/* API: /api/auth/reset  — used by PAGE /forgot-password. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { passwordError } from "@/lib/password";
import { checkResetCode } from "@/lib/resetCode";
import { purgeExpiredResetTokens } from "@/lib/mail";

export async function POST(req: Request) {
  let email = "";
  let code = "";
  let password = "";
  let confirm = "";
  try {
    const body = await req.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
    code = typeof body?.code === "string" ? body.code.trim() : "";
    password = typeof body?.password === "string" ? body.password : "";
    confirm = typeof body?.confirmPassword === "string" ? body.confirmPassword : password;
  } catch {
    return NextResponse.json({ error: "Expected JSON { email, code, password }" }, { status: 400 });
  }

  const invalid = passwordError(password, confirm);
  if (invalid) return NextResponse.json({ error: invalid }, { status: 400 });
  if (!email || !code) {
    return NextResponse.json({ error: "Email and code are required." }, { status: 400 });
  }

  await purgeExpiredResetTokens();
  const result = await checkResetCode(email, code);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "This code is invalid or has expired." }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: await bcrypt.hash(password, 10),
      mustChangePassword: false,
    },
  });
  await prisma.passwordResetToken.deleteMany({ where: { email } });

  return NextResponse.json({ ok: true });
}
