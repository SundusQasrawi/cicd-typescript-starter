import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth.js";
import type { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  test("returns null when authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when authorization header does not start with ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer abc123",
    };

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when authorization header does not contain a key", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns the API key when authorization header is valid", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey abc123",
    };

    expect(getAPIKey(headers)).toBe("abc123");
  });
});