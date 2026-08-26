"use client";

import { useSession } from "next-auth/react";
import { effectivePermissions, isAdminRole, VIEWER_PERMISSIONS } from "@/lib/permissions";

export function useIsAdmin() {
  const { data, status } = useSession();
  return status === "authenticated" && isAdminRole(data?.user?.role);
}

export function useAppUserId() {
  const { data, status } = useSession();
  if (status === "loading") return null;
  return data?.user?.id || "anon";
}

export function usePermissions() {
  const { data, status } = useSession();
  const isAdmin = status === "authenticated" && isAdminRole(data?.user?.role);
  const perms =
    status === "authenticated" && data?.user
      ? effectivePermissions(data.user)
      : VIEWER_PERMISSIONS;
  return {
    ready: status !== "loading",
    isAdmin,
    mustChangePassword: Boolean(data?.user?.mustChangePassword),
    canCreate: perms.canCreate,
    canEdit: perms.canEdit,
    canDelete: perms.canDelete,
    canMerge: perms.canMerge,
    canReorder: perms.canReorder,
    canUseAI: perms.canUseAI,
    canStructure: perms.canEdit || perms.canDelete || perms.canMerge || perms.canReorder,
  };
}
