import { supabase } from "@/integrations/supabase/client";

export type LeadSignupSource = "adhd_hub" | "anchor_waitlist";
export type LeadConsentVersion = "hub-updates-v1" | "anchor-updates-v1";

export interface LeadSignupInput {
  email: string;
  source: LeadSignupSource;
  consentVersion: LeadConsentVersion;
  consentedAt: string;
  honeypot?: string;
}

interface SignupDependencies {
  insertSupabase: (input: LeadSignupInput) => Promise<void>;
  postNetlify: (input: LeadSignupInput) => Promise<void>;
}

const defaultDependencies: SignupDependencies = {
  async insertSupabase(input) {
    const { error } = await supabase.from("lead_signups").insert({
      email: input.email,
      source: input.source,
      consent_version: input.consentVersion,
      consented_at: input.consentedAt,
    });
    if (error) throw error;
  },
  async postNetlify(input) {
    const body = new URLSearchParams({
      "form-name": "signups",
      email: input.email,
      source: input.source,
      consent: input.consentVersion,
      consented_at: input.consentedAt,
      company: input.honeypot ?? "",
    });
    const response = await fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    if (!response.ok) {
      throw new Error(`Netlify form returned ${response.status}`);
    }
  },
};

export interface LeadSignupResult {
  ok: boolean;
  storedIn: Array<"supabase" | "netlify">;
}

/**
 * Persist express consent to both configured destinations. A visitor-facing
 * success is returned only after at least one destination confirms storage.
 * This deliberately does not claim that an email has been delivered.
 */
export async function submitLeadSignup(
  input: LeadSignupInput,
  dependencies: SignupDependencies = defaultDependencies,
): Promise<LeadSignupResult> {
  const [supabaseResult, netlifyResult] = await Promise.allSettled([
    dependencies.insertSupabase(input),
    dependencies.postNetlify(input),
  ]);

  const storedIn: LeadSignupResult["storedIn"] = [];
  if (supabaseResult.status === "fulfilled") storedIn.push("supabase");
  if (netlifyResult.status === "fulfilled") storedIn.push("netlify");

  if (supabaseResult.status === "rejected") {
    console.warn("lead signup Supabase storage failed", supabaseResult.reason);
  }
  if (netlifyResult.status === "rejected") {
    console.warn("lead signup Netlify storage failed", netlifyResult.reason);
  }

  return { ok: storedIn.length > 0, storedIn };
}
