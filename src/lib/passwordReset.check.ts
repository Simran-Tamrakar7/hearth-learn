import assert from "node:assert/strict";
import {
  canResendCode,
  generateResetCode,
  hashResetCode,
  MAX_SENDS_PER_HOUR,
  MIN_PASSWORD_LENGTH,
  passwordError,
  RESEND_COOLDOWN_MS,
} from "./passwordReset.ts";

const code = generateResetCode();
assert.match(code, /^\d{6}$/);
assert.equal(hashResetCode("a@b.com", "123456"), hashResetCode("a@b.com", "123456"));
assert.notEqual(hashResetCode("a@b.com", "123456"), hashResetCode("a@b.com", "654321"));
assert.notEqual(hashResetCode("a@b.com", "123456"), hashResetCode("c@d.com", "123456"));

assert.equal(canResendCode({ recentCount: 0, latestCreatedAt: null }).ok, true);
assert.equal(canResendCode({ recentCount: MAX_SENDS_PER_HOUR, latestCreatedAt: null }).ok, false);

const justNow = new Date();
const cool = canResendCode({ recentCount: 1, latestCreatedAt: justNow, now: justNow.getTime() });
assert.equal(cool.ok, false);

const cooled = canResendCode({
  recentCount: 1,
  latestCreatedAt: new Date(justNow.getTime() - RESEND_COOLDOWN_MS - 1),
  now: justNow.getTime(),
});
assert.equal(cooled.ok, true);

assert.equal(MIN_PASSWORD_LENGTH, 8);
assert.equal(passwordError("short"), "Password must be at least 8 characters.");
assert.equal(passwordError("longenough", "different"), "New password and confirmation do not match.");
assert.equal(passwordError("longenough", "longenough"), null);

console.log("passwordReset.check: ok");
