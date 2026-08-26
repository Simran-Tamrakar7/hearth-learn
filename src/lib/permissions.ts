export const ADMIN_ROLE = "ADMIN";
export const STATUS_PENDING = "PENDING";
export const STATUS_ACTIVE = "ACTIVE";
export const STATUS_REJECTED = "REJECTED";
export const SEED_ADMIN_EMAIL = "admin";

export const PERMISSION_KEYS = [
  "canCreate",
  "canEdit",
  "canDelete",
  "canMerge",
  "canReorder",
  "canUseAI",
] as const;

export type PermissionKey = (typeof PERMISSION_KEYS)[number];
export type Permissions = Record<PermissionKey, boolean>;

export const VIEWER_PERMISSIONS: Permissions = {
  canCreate: false,
  canEdit: false,
  canDelete: false,
  canMerge: false,
  canReorder: false,
  canUseAI: false,
};

export const ADMIN_PERMISSIONS: Permissions = {
  canCreate: true,
  canEdit: true,
  canDelete: true,
  canMerge: true,
  canReorder: true,
  canUseAI: true,
};

export const PERMISSION_LABELS: Record<PermissionKey, string> = {
  canCreate: "Create manuals",
  canEdit: "Edit manuals / parts / chapters",
  canDelete: "Delete manuals / parts / chapters",
  canMerge: "Merge parts",
  canReorder: "Reorder / move parts",
  canUseAI: "AI manual generation",
};

export function isAdminRole(role: string | null | undefined) {
  return role === ADMIN_ROLE;
}

export function isProtectedAdminEmail(email: string | null | undefined) {
  return String(email || "").trim().toLowerCase() === SEED_ADMIN_EMAIL;
}

export function adminEmails() {
  const extra = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const set = new Set([SEED_ADMIN_EMAIL]);
  if (extra) set.add(extra);
  return set;
}

export function emailIsAdmin(email: string | null | undefined) {
  if (!email) return false;
  return adminEmails().has(email.trim().toLowerCase());
}

export function parsePermissions(raw: string | Permissions | null | undefined, role?: string | null): Permissions {
  if (isAdminRole(role)) return { ...ADMIN_PERMISSIONS };
  const base = { ...VIEWER_PERMISSIONS };
  if (!raw) return base;
  const obj = typeof raw === "string" ? safeJson(raw) : raw;
  if (!obj || typeof obj !== "object") return base;
  for (const key of PERMISSION_KEYS) {
    if (typeof (obj as Permissions)[key] === "boolean") base[key] = (obj as Permissions)[key];
  }
  return base;
}

function safeJson(raw: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function stringifyPermissions(perms: Permissions) {
  return JSON.stringify(perms);
}

export function effectivePermissions(user: { role?: string | null; permissions?: string | Permissions | null }) {
  return parsePermissions(user.permissions, user.role);
}

export function hasPermission(
  user: { role?: string | null; permissions?: string | Permissions | null } | null | undefined,
  key: PermissionKey
) {
  if (!user) return false;
  return effectivePermissions(user)[key];
}

export function kebabItemsFor(user: { role?: string | null; permissions?: string | Permissions | null } | null) {
  const p = user ? effectivePermissions(user) : VIEWER_PERMISSIONS;
  return {
    edit: p.canEdit,
    delete: p.canDelete,
    merge: p.canMerge,
    reorder: p.canReorder,
    create: p.canCreate,
    ai: p.canUseAI,
    anyMutate: p.canEdit || p.canDelete || p.canMerge || p.canReorder || p.canCreate,
  };
}
