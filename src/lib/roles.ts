import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  ADMIN_ROLE,
  STATUS_ACTIVE,
  effectivePermissions,
  emailIsAdmin,
  isAdminRole,
  type PermissionKey,
} from "@/lib/permissions";

export { ADMIN_ROLE, emailIsAdmin, isAdminRole } from "@/lib/permissions";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!isAdminRole(session?.user?.role) || session?.user?.status !== STATUS_ACTIVE) {
    return { ok: false as const, session };
  }
  return { ok: true as const, session };
}

export async function requirePermission(key: PermissionKey) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.status !== STATUS_ACTIVE) {
    return { ok: false as const, session, status: 401 as const };
  }
  const perms = effectivePermissions(session.user);
  if (!perms[key]) {
    return { ok: false as const, session, status: 403 as const };
  }
  return { ok: true as const, session, permissions: perms };
}
