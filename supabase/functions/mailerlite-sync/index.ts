// Mirrors new lead_signups rows into MailerLite.
// Called by a Postgres trigger via pg_net on INSERT into public.lead_signups.
// Fail-safe: always returns HTTP 200, even when the MailerLite key is missing
// or the provider errors. Never throws, never triggers pg_net retries.

const ML_BASE = "https://connect.mailerlite.com/api";
const GROUP_NAME = "Anchor + Hub";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-webhook-secret",
};

interface Payload {
  email?: string;
  source?: string;
  // Supabase database webhook shape (if user wires it via the dashboard UI):
  record?: { email?: string; source?: string };
  type?: string;
}

async function findOrCreateGroup(apiKey: string): Promise<string | null> {
  // Look up by name first — an automation is keyed to this exact group.
  const listRes = await fetch(
    `${ML_BASE}/groups?filter[name]=${encodeURIComponent(GROUP_NAME)}&limit=100`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
    },
  );
  if (listRes.ok) {
    const body = (await listRes.json()) as { data?: Array<{ id: string; name: string }> };
    const match = body.data?.find((g) => g.name === GROUP_NAME);
    if (match) return match.id;
  } else {
    console.warn("mailerlite groups list failed", listRes.status, await listRes.text());
  }

  // Not found — create it.
  const createRes = await fetch(`${ML_BASE}/groups`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name: GROUP_NAME }),
  });
  if (!createRes.ok) {
    console.warn("mailerlite group create failed", createRes.status, await createRes.text());
    return null;
  }
  const created = (await createRes.json()) as { data?: { id: string } };
  return created.data?.id ?? null;
}

async function upsertSubscriber(
  apiKey: string,
  email: string,
  source: string,
  groupId: string | null,
): Promise<void> {
  // POST /api/subscribers is an upsert by email in MailerLite's current API.
  const body: Record<string, unknown> = {
    email,
    fields: { source },
    // Respect the account's default opt-in setting — do not force status.
  };
  if (groupId) body.groups = [groupId];

  const res = await fetch(`${ML_BASE}/subscribers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text();
    console.warn("mailerlite subscriber upsert first attempt failed", res.status, errText);

    // Retry once without the custom field so a missing `source` field can never
    // block the subscriber from being created and added to the group.
    const retryBody: Record<string, unknown> = { email };
    if (groupId) retryBody.groups = [groupId];

    const retryRes = await fetch(`${ML_BASE}/subscribers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(retryBody),
    });
    if (!retryRes.ok) {
      console.warn(
        "mailerlite subscriber upsert retry failed",
        retryRes.status,
        await retryRes.text(),
      );
    } else {
      console.log("mailerlite subscriber upsert retry succeeded", retryRes.status);
    }
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Shared-secret gate. The webhook is unauthenticated at the JWT layer
    // (verify_jwt = false) so we authenticate with our own header, whose
    // value lives in Supabase Vault and is fetched with the service role.
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const presented = req.headers.get("x-webhook-secret");
    let expected: string | null = null;
    if (supabaseUrl && serviceKey) {
      try {
        const vres = await fetch(`${supabaseUrl}/rest/v1/rpc/get_mailerlite_webhook_secret`, {
          method: "POST",
          headers: {
            apikey: serviceKey,
            Authorization: `Bearer ${serviceKey}`,
            "Content-Type": "application/json",
          },
          body: "{}",
        });
        if (vres.ok) {
          expected = (await vres.json()) as string;
        } else {
          console.warn("vault secret lookup failed", vres.status, await vres.text());
        }
      } catch (err) {
        console.warn("vault secret lookup threw", err);
      }
    }
    if (!expected || presented !== expected) {
      return new Response(JSON.stringify({ ok: false, reason: "unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = (Deno.env.get("MAILERLITE_API_KEY") ?? "").trim();
    if (!apiKey) {
      // Expected state until Lauren adds the key. Quiet no-op.
      console.log("mailerlite-sync: MAILERLITE_API_KEY not set — no-op");
      return new Response(JSON.stringify({ ok: true, skipped: "no_api_key" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let payload: Payload = {};
    try {
      payload = (await req.json()) as Payload;
    } catch {
      payload = {};
    }

    const email = (payload.email ?? payload.record?.email ?? "").trim().toLowerCase();
    const source = (payload.source ?? payload.record?.source ?? "unknown").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.warn("mailerlite-sync: no valid email in payload", payload);
      return new Response(JSON.stringify({ ok: true, skipped: "no_email" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const groupId = await findOrCreateGroup(apiKey);
    await upsertSubscriber(apiKey, email, source, groupId);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    // Fail-safe: log and return 200 so pg_net does not retry-storm.
    console.error("mailerlite-sync unexpected error", err);
    return new Response(JSON.stringify({ ok: true, error: "handled" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
