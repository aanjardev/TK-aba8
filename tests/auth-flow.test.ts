import assert from "node:assert/strict";
import test from "node:test";
import {
  createTokenHash,
  isTokenValid,
  validatePassword,
} from "../lib/auth-flow";

test("activation token is generated and can be validated exactly once", () => {
  const token = "test-token-123";
  const hash = createTokenHash(token);

  assert.equal(isTokenValid(token, hash, new Date(Date.now() + 60_000)), true);
  assert.equal(isTokenValid(token, hash, new Date(Date.now() + 60_000)), true);
  assert.equal(
    isTokenValid("different-token", hash, new Date(Date.now() + 60_000)),
    false,
  );
});

test("expired token is rejected", () => {
  const token = "expired-token";
  const hash = createTokenHash(token);

  assert.equal(isTokenValid(token, hash, new Date(Date.now() - 1_000)), false);
});

test("password may be any non-empty value", () => {
  assert.equal(validatePassword(""), false);
  assert.equal(validatePassword("abc"), true);
  assert.equal(validatePassword("123"), true);
  assert.equal(validatePassword("password sederhana"), true);
});
