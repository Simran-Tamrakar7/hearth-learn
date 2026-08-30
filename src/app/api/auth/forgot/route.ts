/* API: /api/auth/forgot  — used by PAGE /forgot-password. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { purgeExpiredResetTokens, sendPasswordResetCode } from "@/lib/mail";
import {
  CODE_TTL_MS,
  canResendCode,
  generateResetCode,
  hashResetCode,
} from "@/lib/passwordReset";

export async function POST(req: Request) {
  let email = "";
  try {
    const body = await req.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ error: "Expected JSON { email }" }, { status: 400 });
  }

  // ponytail: same generic reply whether or not the account exists (no email enumeration).
  const generic = {
    ok: true,
    message: "If that account exists, we sent a verification code to its email.",
  };

  if (!email) return NextResponse.json(generic);

  await purgeExpiredResetTokens();
  const user =
    (await prisma.user.findUnique({ where: { email } })) ||
    (email !== email.toLowerCase()
      ? await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
      : null);
  if (!user) return NextResponse.json(generic);

  const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const recent = await prisma.passwordResetToken.findMany({
    where: { email: user.email, kind: "code", createdAt: { gt: hourAgo } },
    orderBy: { createdAt: "desc" },
    select: { createdAt: true },
  });
  const gate = canResendCode({
    recentCount: recent.length,
    latestCreatedAt: recent[0]?.createdAt ?? null,
  });
  if (!gate.ok) {
    return NextResponse.json({ error: gate.error }, { status: 429 });
  }

  const code = generateResetCode();
  const expiresAt = new Date(Date.now() + CODE_TTL_MS);

  await prisma.passwordResetToken.updateMany({
    where: { email: user.email, kind: "code", expiresAt: { gt: new Date() } },
    data: { expiresAt: new Date() },
  });
  await prisma.passwordResetToken.create({
    data: {
      email: user.email,
      token: hashResetCode(user.email, code),
      kind: "code",
      expiresAt,
      attempts: 0,
    },
  });

  const mailed = await sendPasswordResetCode(user.email, code);

  if (!mailed.sent && process.env.NODE_ENV !== "production") {
    return NextResponse.json({ ...generic, devCode: code });
  }
  if (!mailed.sent) {
    return NextResponse.json(
      { error: "We couldn't send the verification email. Try again in a minute." },
      { status: 503 }
    );
  }
  return NextResponse.json(generic);
}
