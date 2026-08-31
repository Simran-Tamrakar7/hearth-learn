import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";
import { MANUALS } from "../src/app/manuals/_content/_registry.ts";
import { SHOWCASE, SHOWCASE_FEATURED } from "../src/app/showcase-wall/_content/_registry.ts";
import { ARENAS } from "../src/app/life-simulator/_content/_registry.ts";
import { TRAILS } from "../src/app/trails/_content/_registry.ts";
import { libraryBooks } from "../src/app/library/_content/_registry.ts";
import { PATHWISE_HEARTH_MANUALS } from "../src/app/manuals/_lib/pathwiseToHearth.ts";

const manualsRoot = new URL("../src/app/manuals/_content/", import.meta.url);
const toolkitsRoot = new URL("../src/app/toolkits/_content/", import.meta.url);

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

const toolkitDirs = readdirSync(toolkitsRoot).filter(
  (name) => !name.startsWith("_") && !name.endsWith(".ts") && !name.endsWith(".md")
);
assert.equal(toolkitDirs.length, 4, `expected 4 toolkit folders, got ${toolkitDirs.join(",")}`);
for (const dir of toolkitDirs) {
  const names = readdirSync(new URL(dir, toolkitsRoot));
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
  assert.ok(row.body && typeof row.body === "object", `registry id ${row.id} missing body`);
  assert.ok(
    Array.isArray((row.body as { chapters?: unknown }).chapters),
    `registry id ${row.id} body has no chapters`
  );
  assert.ok(
    existsSync(new URL(`./${row.id}/data.js`, manualsRoot)),
    `registry id ${row.id} missing src/app/manuals/_content/${row.id}/data.js`
  );
}

const playwrightFiles = readdirSync(new URL("./playwright", manualsRoot)).sort();
assert.deepEqual(playwrightFiles, ["data.js"], "Playwright body must be one file in src/app/manuals/_content/playwright/");

const testingTypesFiles = readdirSync(new URL("./testing-types", manualsRoot));
for (const name of [
  "data.js",
  "overlay.ts",
  "outline.ts",
  "types.ts",
  "overlay-part17-18.ts",
  "overlay-part19-22.ts",
  "overlay-part23.ts",
]) {
  assert.ok(testingTypesFiles.includes(name), `testing-types missing ${name}`);
}

const featuredBodies = new Set(SHOWCASE_FEATURED.map((p) => p.id));
for (const row of SHOWCASE) {
  assert.ok(featuredBodies.has(row.id), `showcase registry id ${row.id} has no body`);
}

assert.ok(MANUALS.every((m) => m.status === "active" || m.status === "archived" || m.status === "deleted"));

console.log("scripts/check-registry: ok");
