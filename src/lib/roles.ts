import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const ADMIN_ROLE = "ADMIN";

export function isAdminRole(role: string | null | undefined) {
  return role === ADMIN_ROLE;
}

export function adminEmails() {
  const extra = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const set = new Set(["demo@hearth.study"]);
  if (extra) set.add(extra);
  return set;
}

export function emailIsAdmin(email: string | null | undefined) {
  if (!email) return false;
  return adminEmails().has(email.trim().toLowerCase());
}

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!isAdminRole(session?.user?.role)) {
    return { ok: false as const, session };
  }
  return { ok: true as const, session };
}
