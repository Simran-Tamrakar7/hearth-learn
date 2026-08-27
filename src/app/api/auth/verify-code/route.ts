import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { purgeExpiredResetTokens } from "@/lib/mail";
import {
  MAX_VERIFY_ATTEMPTS,
  SESSION_TTL_MS,
  generateSessionToken,
  hashResetCode,
} from "@/lib/passwordReset";

export async function POST(req: Request) {
  let email = "";
  let code = "";
  try {
    const body = await req.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
    code = typeof body?.code === "string" ? body.code.trim() : "";
  } catch {
    return NextResponse.json({ error: "Expected JSON { email, code }" }, { status: 400 });
  }

  if (!email || !/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: "Enter the 6-digit code from your email." }, { status: 400 });
  }

  await purgeExpiredResetTokens();

  const row = await prisma.passwordResetToken.findFirst({
    where: {
      email,
      kind: "code",
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!row) {
    return NextResponse.json({ error: "This code is invalid or has expired." }, { status: 400 });
  }

  if (row.attempts >= MAX_VERIFY_ATTEMPTS) {
    await prisma.passwordResetToken.update({
      where: { id: row.id },
      data: { expiresAt: new Date() },
    });
    return NextResponse.json(
      { error: "Too many incorrect attempts. Request a new code." },
      { status: 400 }
    );
  }

  if (row.token !== hashResetCode(email, code)) {
    const attempts = row.attempts + 1;
    await prisma.passwordResetToken.update({
      where: { id: row.id },
      data: {
        attempts,
        ...(attempts >= MAX_VERIFY_ATTEMPTS ? { expiresAt: new Date() } : {}),
      },
    });
    return NextResponse.json(
      {
        error:
          attempts >= MAX_VERIFY_ATTEMPTS
            ? "Too many incorrect attempts. Request a new code."
            : "Incorrect code. Try again.",
      },
      { status: 400 }
    );
  }

  const resetToken = generateSessionToken();
  await prisma.passwordResetToken.update({
    where: { id: row.id },
    data: { expiresAt: new Date() },
  });
  await prisma.passwordResetToken.create({
    data: {
      email,
      token: resetToken,
      kind: "session",
      expiresAt: new Date(Date.now() + SESSION_TTL_MS),
      attempts: 0,
    },
  });

  return NextResponse.json({ ok: true, resetToken });
}
