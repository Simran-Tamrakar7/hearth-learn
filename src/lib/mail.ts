import { prisma } from "@/lib/prisma";

export async function sendAppEmail(opts: { to: string; subject: string; text: string }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "Hearth <noreply@hearth.study>";
  if (key) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: opts.to,
        subject: opts.subject,
        text: opts.text,
      }),
    });
    if (!res.ok) {
      console.error("sendAppEmail failed", await res.text());
      return { sent: false as const };
    }
    return { sent: true as const };
  }
  console.log(`[hearth-mail] to=${opts.to}\n${opts.subject}\n${opts.text}`);
  return { sent: false as const, logged: true as const };
}

export function appBaseUrl() {
  return process.env.NEXTAUTH_URL || "http://localhost:3000";
}

export async function notifyUserStatus(email: string, status: "ACTIVE" | "REJECTED") {
  if (status === "ACTIVE") {
    return sendAppEmail({
      to: email,
      subject: "Your Hearth account is approved",
      text: `Your Hearth study-cabin account has been approved. Sign in at ${appBaseUrl()}/login`,
    });
  }
  return sendAppEmail({
    to: email,
    subject: "Your Hearth signup was not approved",
    text: `Your request to join Hearth was not approved. If this is a surprise, reply to the cabin host.`,
  });
}

export async function purgeExpiredResetTokens() {
  await prisma.passwordResetToken.deleteMany({ where: { expiresAt: { lt: new Date() } } });
}

export async function sendPasswordResetCode(email: string, code: string) {
  return sendAppEmail({
    to: email,
    subject: "Your Hearth password reset code",
    text: `Your verification code is ${code}.\n\nIt expires in 15 minutes. If you did not request this, you can ignore this email.`,
  });
}
