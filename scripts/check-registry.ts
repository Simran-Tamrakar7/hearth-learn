import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";
import { MANUALS } from "../src/app/manuals/registry.ts";

const manualsRoot = new URL("../src/app/manuals/", import.meta.url);

function uniqueIds(rows: { id: string }[], label: string) {
  const ids = rows.map((r) => r.id);
  assert.equal(ids.length, new Set(ids).size, `${label} has duplicate ids`);
}

uniqueIds(MANUALS, "MANUALS");
assert.equal(MANUALS.length, 2);

for (const row of MANUALS) {
  assert.ok(row.body && typeof row.body === "object", `registry id ${row.id} missing body`);
  assert.ok(
    Array.isArray((row.body as { chapters?: unknown }).chapters),
    `registry id ${row.id} body has no chapters`
  );
  const mdManualDir = new URL(`./types/${row.id}/`, manualsRoot);
  assert.ok(existsSync(mdManualDir), `registry id ${row.id} missing src/app/manuals/types/${row.id}/`);
  assert.ok(existsSync(new URL("./toc.ts", mdManualDir)), `${row.id} missing toc.ts`);
  assert.ok(existsSync(new URL("./meta.json", mdManualDir)), `${row.id} missing meta.json`);
  assert.ok(existsSync(new URL("./chapters-manifest.ts", mdManualDir)), `${row.id} missing chapters-manifest.ts`);
  assert.ok(!existsSync(new URL("./compiled.body.ts", mdManualDir)), `${row.id} must not have compiled.body.ts`);
  const partDirs = readdirSync(mdManualDir).filter((n) => /^part-\d+$/.test(n));
  assert.ok(partDirs.length > 0, `${row.id} has no part-N folders`);
}

const ttFiles = readdirSync(new URL("./types/testing-types/", manualsRoot));
for (const forbidden of ["overlay.ts", "outline.ts", "data.js", "compiled.body.ts"]) {
  assert.ok(!ttFiles.includes(forbidden), `testing-types should not contain ${forbidden}`);
}

assert.ok(MANUALS.every((m) => m.status === "active" || m.status === "archived" || m.status === "deleted"));

console.log("scripts/check-registry: ok");
