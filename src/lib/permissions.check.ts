import assert from "node:assert/strict";
import {
  ADMIN_PERMISSIONS,
  VIEWER_PERMISSIONS,
  effectivePermissions,
  isProtectedAdminEmail,
  kebabItemsFor,
  parsePermissions,
} from "./permissions.ts";

assert.deepEqual(parsePermissions(null, "USER"), VIEWER_PERMISSIONS);
assert.deepEqual(parsePermissions(null, "ADMIN"), ADMIN_PERMISSIONS);
assert.deepEqual(parsePermissions(JSON.stringify({ canEdit: true, canDelete: "nope" }), "USER"), {
  ...VIEWER_PERMISSIONS,
  canEdit: true,
});
assert.equal(isProtectedAdminEmail("admin"), true);
assert.equal(isProtectedAdminEmail("ADMIN"), true);
assert.equal(isProtectedAdminEmail("demo@hearth.study"), false);
assert.deepEqual(effectivePermissions({ role: "ADMIN", permissions: VIEWER_PERMISSIONS }), ADMIN_PERMISSIONS);

const kebab = kebabItemsFor({ role: "USER", permissions: { ...VIEWER_PERMISSIONS, canEdit: true } });
assert.equal(kebab.edit, true);
assert.equal(kebab.delete, false);
assert.equal(kebab.anyMutate, true);

const viewerKebab = kebabItemsFor({ role: "USER", permissions: VIEWER_PERMISSIONS });
assert.equal(viewerKebab.anyMutate, false);

console.log("permissions.check.ts ok");
