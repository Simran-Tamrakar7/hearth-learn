export const MIN_PASSWORD_LENGTH = 8;
export const RESET_CODE_TTL_MS = 15 * 60 * 1000;
export const RESET_RESEND_COOLDOWN_MS = 60 * 1000;
export const RESET_MAX_ATTEMPTS = 5;

export function passwordTooShort(password: string) {
  return password.length < MIN_PASSWORD_LENGTH;
}

export function passwordsDoNotMatch(a: string, b: string) {
  return a !== b;
}

export function passwordError(password: string, confirm?: string) {
  if (passwordTooShort(password)) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  if (confirm !== undefined && passwordsDoNotMatch(password, confirm)) {
    return "New password and confirmation do not match.";
  }
  return null;
}
