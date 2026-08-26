import assert from "node:assert/strict";
import { DEFAULT_SQLITE_URL, VERCEL_SQLITE_URL, prepareDatabaseUrl, resolveDatabaseUrl } from "./databaseUrl.ts";

assert.equal(resolveDatabaseUrl({}), DEFAULT_SQLITE_URL);
assert.equal(resolveDatabaseUrl({ VERCEL: "1" }), VERCEL_SQLITE_URL);
assert.equal(resolveDatabaseUrl({ DATABASE_URL: "file:./custom.db" }), "file:./custom.db");
assert.equal(resolveDatabaseUrl({ DATABASE_URL: "file:./custom.db", VERCEL: "1" }), "file:./custom.db");
assert.equal(resolveDatabaseUrl({ DATABASE_URL: "  " }), DEFAULT_SQLITE_URL);

const prepared = prepareDatabaseUrl({ DATABASE_URL: "file:./prisma/dev.db" });
assert.match(prepared, /^file:\//);
assert.ok(prepared.endsWith("prisma/dev.db"));

console.log("databaseUrl.check.ts ok");
