/* API: /api/auth/*  — used by PAGE /login. Map: ../../CODE-FOR-THIS-API.md */

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
