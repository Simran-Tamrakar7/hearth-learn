"use client";

import { useSession } from "next-auth/react";
import { isAdminRole } from "@/lib/roles";

export function useIsAdmin() {
  const { data, status } = useSession();
  return status === "authenticated" && isAdminRole(data?.user?.role);
}

export function useAppUserId() {
  const { data, status } = useSession();
  if (status === "loading") return null;
  return data?.user?.id || "anon";
}
