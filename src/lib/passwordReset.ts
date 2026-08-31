import { createHash, randomBytes, randomInt } from "crypto";

export const CODE_TTL_MS = 15 * 60 * 1000;
export const SESSION_TTL_MS = 15 * 60 * 1000;
export const RESEND_COOLDOWN_MS = 60 * 1000;
export const MAX_SENDS_PER_HOUR = 5;
export const MAX_VERIFY_ATTEMPTS = 5;
export const MIN_PASSWORD_LENGTH = 8;

export function passwordError(password: string, confirm?: string) {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  if (confirm !== undefined && password !== confirm) {
    return "New password and confirmation do not match.";
  }
  return null;
}

export function generateResetCode() {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

export function hashResetCode(email: string, code: string) {
  return createHash("sha256").update(`${email.trim().toLowerCase()}:${String(code).trim()}`).digest("hex");
}

export function generateSessionToken() {
  return randomBytes(32).toString("hex");
}

export function canResendCode(opts: {
  recentCount: number;
  latestCreatedAt: Date | null;
  now?: number;
}) {
  const now = opts.now ?? Date.now();
  if (opts.recentCount >= MAX_SENDS_PER_HOUR) {
    return { ok: false as const, error: "Too many codes sent. Try again in an hour." };
  }
  if (opts.latestCreatedAt && now - opts.latestCreatedAt.getTime() < RESEND_COOLDOWN_MS) {
    const waitSec = Math.ceil((RESEND_COOLDOWN_MS - (now - opts.latestCreatedAt.getTime())) / 1000);
    return { ok: false as const, error: `Wait ${waitSec}s before resending a code.` };
  }
  return { ok: true as const };
}
