import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { appBaseUrl, purgeExpiredResetTokens, sendAppEmail } from "@/lib/mail";

export async function POST(req: Request) {
  let email = "";
  try {
    const body = await req.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ error: "Expected JSON { email }" }, { status: 400 });
  }

  const generic = { ok: true, message: "If that account exists, we sent a reset link." };

  if (!email) return NextResponse.json(generic);

  await purgeExpiredResetTokens();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json(generic);

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  await prisma.passwordResetToken.deleteMany({ where: { email } });
  await prisma.passwordResetToken.create({ data: { email, token, expiresAt } });

  const resetUrl = `${appBaseUrl()}/reset-password?token=${token}`;
  const mailed = await sendAppEmail({
    to: email,
    subject: "Reset your Hearth password",
    text: `Click this link to set a new password (expires in 1 hour):\n${resetUrl}`,
  });

  if (!mailed.sent && process.env.NODE_ENV !== "production") {
    return NextResponse.json({ ...generic, resetUrl });
  }
  return NextResponse.json(generic);
}
