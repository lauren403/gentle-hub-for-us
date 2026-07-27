import { describe, expect, it, vi } from "vitest";
import { submitLeadSignup, type LeadSignupInput } from "./lead-signup";

const input: LeadSignupInput = {
  email: "lauren@example.com",
  source: "adhd_hub",
  consentVersion: "hub-updates-v1",
  consentedAt: "2026-07-26T08:00:00.000Z",
  honeypot: "",
};

describe("submitLeadSignup", () => {
  it("confirms success only after a destination stores the request", async () => {
    const result = await submitLeadSignup(input, {
      insertSupabase: vi.fn().mockResolvedValue(undefined),
      postNetlify: vi.fn().mockRejectedValue(new Error("offline")),
    });

    expect(result).toEqual({ ok: true, storedIn: ["supabase"] });
  });

  it("uses Netlify as a confirmed fallback when Supabase is unavailable", async () => {
    const result = await submitLeadSignup(input, {
      insertSupabase: vi.fn().mockRejectedValue(new Error("unavailable")),
      postNetlify: vi.fn().mockResolvedValue(undefined),
    });

    expect(result).toEqual({ ok: true, storedIn: ["netlify"] });
  });

  it("does not return a false success when both destinations fail", async () => {
    const result = await submitLeadSignup(input, {
      insertSupabase: vi.fn().mockRejectedValue(new Error("unavailable")),
      postNetlify: vi.fn().mockRejectedValue(new Error("offline")),
    });

    expect(result).toEqual({ ok: false, storedIn: [] });
  });
});
