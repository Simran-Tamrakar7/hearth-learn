import assert from "node:assert/strict";
import {
  MIN_PASSWORD_LENGTH,
  passwordTooShort,
  passwordsDoNotMatch,
  passwordError,
} from "./password.ts";

assert.equal(MIN_PASSWORD_LENGTH, 8);
assert.equal(passwordTooShort("short"), true);
assert.equal(passwordTooShort("longenough"), false);
assert.equal(passwordsDoNotMatch("a", "b"), true);
assert.equal(passwordsDoNotMatch("a", "a"), false);
assert.equal(passwordError("short"), "Password must be at least 8 characters.");
assert.equal(passwordError("longenough", "different"), "New password and confirmation do not match.");
assert.equal(passwordError("longenough", "longenough"), null);

console.log("password.check.ts ok");
