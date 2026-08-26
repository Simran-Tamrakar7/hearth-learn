import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  let token = "";
  let password = "";
  try {
    const body = await req.json();
    token = typeof body?.token === "string" ? body.token.trim() : "";
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Expected JSON { token, password }" }, { status: 400 });
  }

  if (!token || password.length < 4) {
    return NextResponse.json({ error: "A new password of at least 4 characters is required." }, { status: 400 });
  }

  const row = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!row || row.expiresAt.getTime() < Date.now()) {
    return NextResponse.json({ error: "This reset link is invalid or has expired." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: row.email } });
  if (!user) {
    return NextResponse.json({ error: "This reset link is invalid or has expired." }, { status: 400 });
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
