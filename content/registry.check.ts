import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { MANUALS } from "./manuals/_registry.ts";
import { SHOWCASE, SHOWCASE_FEATURED } from "./showcase/_registry.ts";
import { ARENAS } from "./life-simulator/_registry.ts";
import { TRAILS } from "./trails/_registry.ts";
import { libraryBooks } from "./library/_registry.ts";
import { PATHWISE_HEARTH_MANUALS } from "../src/app/manuals/_lib/pathwiseToHearth.ts";

function uniqueIds(rows: { id: string }[], label: string) {
  const ids = rows.map((r) => r.id);
  assert.equal(ids.length, new Set(ids).size, `${label} has duplicate ids`);
}

uniqueIds(MANUALS, "MANUALS");
uniqueIds(SHOWCASE, "SHOWCASE");
uniqueIds(SHOWCASE_FEATURED, "SHOWCASE_FEATURED");
uniqueIds(ARENAS, "ARENAS");
uniqueIds(TRAILS, "TRAILS");
uniqueIds(libraryBooks, "libraryBooks");

assert.equal(MANUALS.length, 65);
assert.equal(SHOWCASE.length, 17);
assert.equal(SHOWCASE_FEATURED.length, 17);
assert.equal(ARENAS.length, 6);
assert.equal(TRAILS.length, 8);
assert.ok(libraryBooks.length >= 30);

const toolkitDirs = readdirSync(new URL("./toolkits", import.meta.url)).filter(
  (name) => !name.startsWith("_") && !name.endsWith(".ts")
);
assert.equal(toolkitDirs.length, 4, `expected 4 toolkit folders, got ${toolkitDirs.join(",")}`);
for (const dir of toolkitDirs) {
  assert.ok(MANUALS, "registry loaded");
  const names = readdirSync(new URL(`./toolkits/${dir}`, import.meta.url));
  assert.ok(names.includes("meta.ts"), `${dir} missing meta.ts`);
}

const registryIds = new Set(MANUALS.map((m) => m.id));
const hearthSlugs = PATHWISE_HEARTH_MANUALS.map((m) => m.slug);
uniqueIds(
  hearthSlugs.map((id) => ({ id })),
  "hearth slugs"
);
assert.equal(hearthSlugs.length, 65);
for (const slug of hearthSlugs) {
  assert.ok(registryIds.has(slug), `registry missing hearth slug ${slug}`);
}
for (const row of MANUALS) {
  assert.ok(hearthSlugs.includes(row.id), `registry id ${row.id} has no pathwise manual`);
}

const featuredBodies = new Set(SHOWCASE_FEATURED.map((p) => p.id));
for (const row of SHOWCASE) {
  assert.ok(featuredBodies.has(row.id), `showcase registry id ${row.id} has no body`);
}

assert.ok(MANUALS.every((m) => m.status === "active" || m.status === "archived" || m.status === "deleted"));

console.log("content/registry.check: ok");
