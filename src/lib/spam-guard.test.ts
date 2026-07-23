import { describe, it, expect } from "vitest";
import { isLikelySpam, looksLikeEmail, MIN_SUBMIT_MS } from "./spam-guard";

describe("isLikelySpam", () => {
  it("flags a filled honeypot as spam", () => {
    expect(isLikelySpam("bot", 10_000)).toBe(true);
  });
  it("flags an implausibly fast submit as spam", () => {
    expect(isLikelySpam("", MIN_SUBMIT_MS - 1)).toBe(true);
  });
  it("allows a real, unhurried submission", () => {
    expect(isLikelySpam("", MIN_SUBMIT_MS + 1)).toBe(false);
    expect(isLikelySpam("   ", 10_000)).toBe(false);
  });
});

describe("looksLikeEmail", () => {
  it("accepts a normal address", () => {
    expect(looksLikeEmail("lauren@example.com")).toBe(true);
  });
  it("rejects malformed input", () => {
    expect(looksLikeEmail("nope")).toBe(false);
    expect(looksLikeEmail("a@b")).toBe(false);
    expect(looksLikeEmail("")).toBe(false);
  });
});
