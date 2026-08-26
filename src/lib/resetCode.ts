import { randomInt } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  RESET_CODE_TTL_MS,
  RESET_MAX_ATTEMPTS,
  RESET_RESEND_COOLDOWN_MS,
} from "@/lib/password";

function sixDigitCode() {
  return String(100000 + randomInt(0, 900000));
}

export async function recentResetToken(email: string) {
  return prisma.passwordResetToken.findFirst({
    where: { email },
    orderBy: { createdAt: "desc" },
  });
}

export function resendTooSoon(createdAt: Date) {
  return Date.now() - createdAt.getTime() < RESET_RESEND_COOLDOWN_MS;
}

export async function issueResetCode(email: string) {
  const code = sixDigitCode();
  const token = await bcrypt.hash(code, 10);
  const expiresAt = new Date(Date.now() + RESET_CODE_TTL_MS);
  await prisma.passwordResetToken.deleteMany({ where: { email } });
  await prisma.passwordResetToken.create({ data: { email, token, expiresAt } });
  return code;
}

export type CodeCheck =
  | { ok: true }
  | { ok: false; error: string };

export async function checkResetCode(email: string, code: string): Promise<CodeCheck> {
  const row = await recentResetToken(email);
  if (!row) return { ok: false, error: "This code is invalid or has expired." };
  if (row.expiresAt.getTime() < Date.now()) {
    await prisma.passwordResetToken.deleteMany({ where: { email } });
    return { ok: false, error: "This code has expired. Request a new one." };
  }
  if (row.attempts >= RESET_MAX_ATTEMPTS) {
    await prisma.passwordResetToken.deleteMany({ where: { email } });
    return { ok: false, error: "Too many incorrect attempts. Request a new code." };
  }
  const match = await bcrypt.compare(code.trim(), row.token);
  if (!match) {
    const attempts = row.attempts + 1;
    if (attempts >= RESET_MAX_ATTEMPTS) {
      await prisma.passwordResetToken.deleteMany({ where: { email } });
      return { ok: false, error: "Too many incorrect attempts. Request a new code." };
    }
    await prisma.passwordResetToken.update({ where: { id: row.id }, data: { attempts } });
    return { ok: false, error: "Incorrect code." };
  }
  return { ok: true };
}
