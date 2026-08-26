import assert from "node:assert/strict";
import { DEFAULT_SQLITE_URL, VERCEL_SQLITE_URL, resolveDatabaseUrl } from "./databaseUrl.ts";

assert.equal(resolveDatabaseUrl({}), DEFAULT_SQLITE_URL);
assert.equal(resolveDatabaseUrl({ VERCEL: "1" }), VERCEL_SQLITE_URL);
assert.equal(resolveDatabaseUrl({ DATABASE_URL: "file:./custom.db" }), "file:./custom.db");
assert.equal(resolveDatabaseUrl({ DATABASE_URL: "file:./custom.db", VERCEL: "1" }), "file:./custom.db");
assert.equal(resolveDatabaseUrl({ DATABASE_URL: "  " }), DEFAULT_SQLITE_URL);

console.log("databaseUrl.check.ts ok");
