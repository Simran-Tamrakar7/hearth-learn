import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import {
  ADMIN_PERMISSIONS,
  ADMIN_ROLE,
  SEED_ADMIN_EMAIL,
  STATUS_ACTIVE,
  STATUS_PENDING,
  STATUS_REJECTED,
  VIEWER_PERMISSIONS,
  effectivePermissions,
  emailIsAdmin,
  stringifyPermissions,
} from "@/lib/permissions";

export async function ensureSeedAdmin() {
  const existing = await prisma.user.findUnique({ where: { email: SEED_ADMIN_EMAIL } });
  if (existing) return existing;
  // ponytail: seed password "admin" is hashed only on first create; mustChangePassword forces a real password.
  return prisma.user.create({
    data: {
      email: SEED_ADMIN_EMAIL,
      name: "Admin",
      role: ADMIN_ROLE,
      status: STATUS_ACTIVE,
      mustChangePassword: true,
      permissions: stringifyPermissions(ADMIN_PERMISSIONS),
      passwordHash: await bcrypt.hash("admin", 10),
    },
  });
}

function sessionFields(user: {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  role?: string | null;
  status?: string | null;
  mustChangePassword?: boolean | null;
  permissions?: string | null;
}) {
  const role = emailIsAdmin(user.email) ? ADMIN_ROLE : user.role || "USER";
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
    role,
    status: user.status || STATUS_ACTIVE,
    mustChangePassword: Boolean(user.mustChangePassword),
    permissions: effectivePermissions({ role, permissions: user.permissions }),
  };
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
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        await ensureSeedAdmin();

        const email = credentials.email.trim();
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.passwordHash) {
          throw new Error("No account found with this email");
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) {
          throw new Error("Incorrect password");
        }

        if (user.status === STATUS_PENDING) {
          throw new Error("Your account is waiting for admin approval");
        }
        if (user.status === STATUS_REJECTED) {
          throw new Error("Your signup was not approved");
        }
        if (user.status !== STATUS_ACTIVE) {
          throw new Error("This account cannot sign in");
        }

        if (emailIsAdmin(user.email) && user.role !== ADMIN_ROLE) {
          await prisma.user.update({
            where: { id: user.id },
            data: { role: ADMIN_ROLE, permissions: stringifyPermissions(ADMIN_PERMISSIONS) },
          });
        }

        return sessionFields(user);
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await ensureSeedAdmin();
      if (account?.provider !== "google") return true;
      const email = user.email?.trim();
      if (!email) return "/login?error=NoEmail";

      let dbUser = await prisma.user.findUnique({ where: { email } });
      if (!dbUser) {
        const admin = emailIsAdmin(email);
        dbUser = await prisma.user.create({
          data: {
            email,
            name: user.name || email.split("@")[0],
            image: user.image,
            role: admin ? ADMIN_ROLE : "USER",
            status: admin ? STATUS_ACTIVE : STATUS_PENDING,
            mustChangePassword: false,
            permissions: stringifyPermissions(admin ? ADMIN_PERMISSIONS : VIEWER_PERMISSIONS),
          },
        });
      }
      if (dbUser.status === STATUS_PENDING) return "/login?pending=1";
      if (dbUser.status === STATUS_REJECTED) return "/login?rejected=1";
      if (dbUser.status !== STATUS_ACTIVE) return "/login?error=Inactive";
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const byEmail = await prisma.user.findUnique({ where: { email: user.email } });
        if (byEmail) token.id = byEmail.id;
        else if (user.id) token.id = user.id;
      } else if (user?.id) {
        token.id = user.id;
      }
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: String(token.id) },
          select: {
            id: true,
            email: true,
            role: true,
            status: true,
            mustChangePassword: true,
            permissions: true,
          },
        });
        if (dbUser) {
          const fields = sessionFields(dbUser);
          token.role = fields.role;
          token.status = fields.status;
          token.mustChangePassword = fields.mustChangePassword;
          token.permissions = fields.permissions;
          if (dbUser.status !== STATUS_ACTIVE) {
            token.status = dbUser.status;
          }
        } else if (user) {
          token.role = user.role || "USER";
          token.status = user.status || STATUS_ACTIVE;
          token.mustChangePassword = Boolean(user.mustChangePassword);
          token.permissions = user.permissions || VIEWER_PERMISSIONS;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id || "");
        session.user.role = String(token.role || "USER");
        session.user.status = String(token.status || STATUS_ACTIVE);
        session.user.mustChangePassword = Boolean(token.mustChangePassword);
        session.user.permissions = token.permissions || VIEWER_PERMISSIONS;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "hearth-secret-key-2026-super-secure",
};
