import crypto from "node:crypto";

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24;

export function createTokenHash(token: string) {
  return crypto
    .createHmac("sha256", process.env.NEXTAUTH_SECRET ?? "development-secret")
    .update(token)
    .digest("hex");
}

export function createToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function isTokenValid(
  token: string,
  tokenHash: string | null,
  expiresAt: Date | null,
) {
  return Boolean(
    tokenHash &&
    expiresAt instanceof Date &&
    !Number.isNaN(expiresAt.getTime()) &&
    expiresAt.getTime() > Date.now() &&
    createTokenHash(token) === tokenHash,
  );
}

export function validatePassword(password: string) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

export function getTokenExpiry() {
  return new Date(Date.now() + TOKEN_TTL_MS);
}
