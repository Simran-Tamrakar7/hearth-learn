import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/** Demo user used when no session (browse-only endpoints). */
export const DEMO_USER_EMAIL = "demo@hearth.study";

type ResolveOpts = { allowDemo?: boolean };

/**
 * Resolve the acting user id: session first, optional demo fallback.
 * ponytail: demo fallback is opt-in per route — mutating endpoints should pass allowDemo: false.
 */
export async function resolveActorUserId(opts: ResolveOpts = { allowDemo: true }): Promise<string | null> {
  const session = await getServerSession(authOptions);
  const sessionId = session?.user?.id;
  if (sessionId) return sessionId;
  if (opts.allowDemo === false) return null;
  const demo = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
    select: { id: true },
  });
  return demo?.id ?? null;
}

/** Active session only — rejects PENDING/REJECTED; no demo fallback. */
export async function requireSessionUser() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  if (!id || session.user.status === "PENDING" || session.user.status === "REJECTED") {
    return { ok: false as const, session, userId: null as string | null };
  }
  return { ok: true as const, session, userId: id };
}
