import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export const DEFAULT_SQLITE_URL = "file:./dev.db";
export const VERCEL_SQLITE_URL = "file:/tmp/hearth.db";

export function resolveDatabaseUrl(env: Record<string, string | undefined> = process.env) {
  const set = env.DATABASE_URL?.trim();
  if (set) return set;
  // ponytail: Vercel lambdas can only write under /tmp; sqlite there is per-instance.
  if (env.VERCEL) return VERCEL_SQLITE_URL;
  return DEFAULT_SQLITE_URL;
}

export function prepareDatabaseUrl(env: Record<string, string | undefined> = process.env) {
  let url = resolveDatabaseUrl(env);
  // ponytail: Prisma sqlite file: paths are schema-relative; Next/turbopack cwd can differ → SQLITE_CANTOPEN.
  if (url.startsWith("file:") && !url.startsWith("file:/")) {
    const rel = url.slice("file:".length).replace(/^\.\//, "");
    url = `file:${join(process.cwd(), rel)}`;
  }
  if (url === VERCEL_SQLITE_URL) {
    const dest = "/tmp/hearth.db";
    if (!existsSync(dest)) {
      const bundled = join(process.cwd(), "prisma", "dev.db");
      if (existsSync(bundled)) copyFileSync(bundled, dest);
    }
  }
  return url;
}
