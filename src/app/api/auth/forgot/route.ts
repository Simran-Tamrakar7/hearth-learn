/* API: /api/auth/forgot  — used by PAGE /forgot-password. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { purgeExpiredResetTokens, sendAppEmail } from "@/lib/mail";
import { issueResetCode, recentResetToken, resendTooSoon, claimResendSlot, releaseResendSlot } from "@/lib/resetCode";

export async function POST(req: Request) {
  let email = "";
  try {
    const body = await req.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ error: "Expected JSON { email }" }, { status: 400 });
  }

  const generic = { ok: true, message: "If that account exists, we sent a verification code." };

  if (!email) return NextResponse.json(generic);

  await purgeExpiredResetTokens();

  const existing = await recentResetToken(email);
  if (existing && resendTooSoon(existing.createdAt)) {
    return NextResponse.json(
      { error: "Please wait a minute before requesting another code." },
      { status: 429 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json(generic);

  if (!claimResendSlot(user.email)) {
    return NextResponse.json(
      { error: "Please wait a minute before requesting another code." },
      { status: 429 }
    );
  }

  let code: string;
  try {
    code = await issueResetCode(user.email);
  } catch (err) {
    releaseResendSlot(user.email);
    throw err;
  }
  const mailed = await sendAppEmail({
    to: user.email,
    subject: "Your Hearth verification code",
    text: `Your Hearth Learn verification code is:\n\n${code}\n\nIt expires in 15 minutes. If you didn't request this, ignore this email.`,
  });

  if (!mailed.sent && process.env.NODE_ENV !== "production") {
    return NextResponse.json({ ...generic, code });
  }
  return NextResponse.json(generic);
}
