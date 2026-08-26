/* ============================================================================
 * HEADING: SHARED — Prisma client
 * Not a page. These pages all use this same file:
 *   every /api/* that talks to the database
 * Map: ./CODE-FOR-SHARED.md
 * Changing this file changes all of those pages at once.
 * ========================================================================== */

import { PrismaClient } from "@prisma/client";
import { prepareDatabaseUrl } from "@/lib/databaseUrl";

const databaseUrl = prepareDatabaseUrl();
process.env.DATABASE_URL = databaseUrl;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: databaseUrl } },
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
