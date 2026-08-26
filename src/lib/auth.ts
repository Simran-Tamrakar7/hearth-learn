/* ============================================================================
 * HEADING: SHARED — Auth (next-auth)
 * Not a page. These pages all use this same file:
 *   /login  + APIs: /api/auth/*  /api/notes  /api/user/*  /api/settings
 *   /api/showcase  /api/trails  /api/progress  /api/certificates  /api/chapters/*
 * Map: ./CODE-FOR-SHARED.md
 * Changing this file changes all of those pages at once.
 * ========================================================================== */

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { ADMIN_ROLE, emailIsAdmin } from "@/lib/roles";

async function resolvedRole(user: { id: string; email?: string | null; role?: string | null }) {
  if (emailIsAdmin(user.email) && user.role !== ADMIN_ROLE) {
    await prisma.user.update({ where: { id: user.id }, data: { role: ADMIN_ROLE } });
    return ADMIN_ROLE;
  }
  return user.role || "USER";
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "demo-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo-google-client-secret",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.passwordHash) {
          throw new Error("No account found with this email");
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isValid) {
          throw new Error("Incorrect password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: await resolvedRole(user),
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: String(token.id) },
          select: { id: true, email: true, role: true },
        });
        if (dbUser) {
          token.role = await resolvedRole(dbUser);
        } else if (user?.role) {
          token.role = user.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id || "");
        session.user.role = String(token.role || "USER");
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "hearth-secret-key-2026-super-secure",
};
