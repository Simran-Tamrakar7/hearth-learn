import "next-auth";
import "next-auth/jwt";
import type { Permissions } from "@/lib/permissions";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      status: string;
      permissions: Permissions;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    role?: string;
    status?: string;
    permissions?: Permissions;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    status?: string;
    permissions?: Permissions;
  }
}
