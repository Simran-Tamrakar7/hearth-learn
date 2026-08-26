/* API: /api/auth/register  — used by PAGE /signup. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import {
  ADMIN_PERMISSIONS,
  ADMIN_ROLE,
  STATUS_ACTIVE,
  STATUS_PENDING,
  VIEWER_PERMISSIONS,
  emailIsAdmin,
  stringifyPermissions,
} from "@/lib/permissions";
import { ensureSeedAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await ensureSeedAdmin();
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }
    if (typeof password !== "string" || password.length < 4) {
      return NextResponse.json({ error: "Password must be at least 4 characters" }, { status: 400 });
    }

    const normalized = String(email).trim();
    const existing = await prisma.user.findUnique({ where: { email: normalized } });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 400 });
    }

    const admin = emailIsAdmin(normalized);
    const user = await prisma.user.create({
      data: {
        name: name || normalized.split("@")[0],
        email: normalized,
        passwordHash: await bcrypt.hash(password, 10),
        role: admin ? ADMIN_ROLE : "USER",
        status: admin ? STATUS_ACTIVE : STATUS_PENDING,
        mustChangePassword: false,
        permissions: stringifyPermissions(admin ? ADMIN_PERMISSIONS : VIEWER_PERMISSIONS),
        streak: {
          create: { currentCount: 1, longestCount: 1, lastCheckIn: new Date() },
        },
        badges: {
          create: {
            name: "cabin_welcome",
            title: "Cabin Explorer",
            description: "Joined Hearth personal study sanctuary",
            icon: "Compass",
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: admin ? "Admin account created." : "Signup received. An admin will approve your account.",
        pending: user.status === STATUS_PENDING,
        user: { id: user.id, email: user.email, name: user.name, status: user.status },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
