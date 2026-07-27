// Mirrors new lead_signups rows into MailerLite.
// Called by a Postgres trigger via pg_net on INSERT into public.lead_signups.
// Records delivery state back to lead_signups so storage is never mistaken for
// provider delivery. Called only by the database trigger's shared-secret gate.

const ML_BASE = "https://connect.mailerlite.com/api";
const GROUP_NAME = "Anchor + Hub";

const jsonHeaders = { "Content-Type": "application/json" };

interface Payload {
  id?: string;
  email?: string;
  source?: string;
  consent_version?: string;
  consented_at?: string;
  // Supabase database webhook shape (if user wires it via the dashboard UI):
  record?: {
    id?: string;
    email?: string;
    source?: string;
    consent_version?: string;
    consented_at?: string;
  };
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
): Promise<boolean> {
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
      return false;
    }
    console.log("mailerlite subscriber upsert retry succeeded", retryRes.status);
  }
  return true;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 405, headers: jsonHeaders });
  }

  let rowId = "";
  let supabaseUrl = "";
  let serviceKey = "";

  const updateSyncStatus = async (status: string, error: string | null) => {
    if (!rowId || !supabaseUrl || !serviceKey) return;
    try {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/lead_signups?id=eq.${encodeURIComponent(rowId)}`,
        {
          method: "PATCH",
          headers: {
            apikey: serviceKey,
            Authorization: `Bearer ${serviceKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            sync_status: status,
            sync_last_attempt_at: new Date().toISOString(),
            sync_error: error,
          }),
        },
      );
      if (!response.ok) {
        console.error("mailerlite-sync status update failed", response.status);
      }
    } catch {
      console.error("mailerlite-sync status update threw");
    }
  };

  try {
    // Shared-secret gate. The webhook is unauthenticated at the JWT layer
    // (verify_jwt = false) so we authenticate with our own header, whose
    // value lives in Supabase Vault and is fetched with the service role.
    supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
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
        headers: jsonHeaders,
      });
    }

    let payload: Payload = {};
    try {
      payload = (await req.json()) as Payload;
    } catch {
      payload = {};
    }

    rowId = (payload.id ?? payload.record?.id ?? "").trim();
    const email = (payload.email ?? payload.record?.email ?? "").trim().toLowerCase();
    const source = (payload.source ?? payload.record?.source ?? "unknown").trim();
    const consentVersion = (
      payload.consent_version ??
      payload.record?.consent_version ??
      ""
    ).trim();
    const consentedAt = (payload.consented_at ?? payload.record?.consented_at ?? "").trim();

    if (!rowId || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.warn("mailerlite-sync: invalid record identity or email shape");
      await updateSyncStatus("failed", "invalid_payload");
      return new Response(JSON.stringify({ ok: false, reason: "invalid_payload" }), {
        status: 400,
        headers: jsonHeaders,
      });
    }

    if (!["hub-updates-v1", "anchor-updates-v1"].includes(consentVersion) || !consentedAt) {
      console.warn("mailerlite-sync: consent evidence missing or invalid");
      await updateSyncStatus("failed", "invalid_consent");
      return new Response(JSON.stringify({ ok: false, reason: "invalid_consent" }), {
        status: 422,
        headers: jsonHeaders,
      });
    }

    const apiKey = (Deno.env.get("MAILERLITE_API_KEY") ?? "").trim();
    if (!apiKey) {
      console.log("mailerlite-sync: outbound email paused until provider key is configured");
      await updateSyncStatus("paused_no_api_key", "provider_not_configured");
      return new Response(JSON.stringify({ ok: true, queued: false, reason: "provider_paused" }), {
        status: 202,
        headers: jsonHeaders,
      });
    }

    const groupId = await findOrCreateGroup(apiKey);
    const synced = await upsertSubscriber(apiKey, email, source, groupId);
    if (!synced) {
      await updateSyncStatus("failed", "provider_upsert_failed");
      return new Response(JSON.stringify({ ok: false, reason: "provider_upsert_failed" }), {
        status: 502,
        headers: jsonHeaders,
      });
    }
    await updateSyncStatus("synced", null);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (err) {
    console.error("mailerlite-sync unexpected error", err instanceof Error ? err.name : "unknown");
    await updateSyncStatus("failed", "unexpected_error");
    return new Response(JSON.stringify({ ok: false, reason: "unexpected_error" }), {
      status: 500,
      headers: jsonHeaders,
    });
  }
});
