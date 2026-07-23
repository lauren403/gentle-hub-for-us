import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { SITE_URL } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader, SiteFooter, FloatingBook, Logo } from "@/components/site-chrome";


const TITLE = "Anchor — a free ADHD companion app | Body Belonging Clinic";
const DESCRIPTION =
  "Anchor is a free ADHD companion app from Body Belonging Clinic — gentle reminders to eat at regular times, weight-neutral, no streaks. Join the early-access list.";
const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/anchor`;

export const Route = createFileRoute("/anchor")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: AnchorPage,
});

const BOOK_URL = HALAXY_URL;




function AnchorPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const mountedAtRef = useRef<number>(Date.now());
  const emailRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]" id="top">
      <SiteHeader location="anchor" />
      <main id="main-content" tabIndex={-1}>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--plum)] text-[var(--oat)]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 opacity-[0.06]">
          <Logo className="size-[520px] text-[var(--oat)]" />
        </div>
        <div className="mx-auto max-w-3xl px-5 py-24 md:py-32">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
            A free tool from Body Belonging Clinic
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[1.03] md:text-7xl">
            Anchor
          </h1>
          <p className="mt-6 font-display text-2xl italic text-[var(--oat)]/85 md:text-3xl">
            A gentle companion for the days your body forgets to tell you it's hungry.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
          Anchor is a small, free app I built for the part of ADHD that no
          prescription reaches. A brain like ours can lose track of hunger and
          fullness until eating swings from forgotten all day to all at once by
          night, and Anchor is simply a quiet nudge back towards a regular
          rhythm. That's all it is, and the restraint is the whole point.
        </p>
      </section>

      {/* WHAT ANCHOR DOES */}
      <section className="bg-[var(--cream)]">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <p className="mb-5 text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
            What Anchor does
          </p>
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            A quiet nudge, nothing more.
          </h2>
          <ul className="mt-10 space-y-4 text-lg leading-relaxed text-[var(--plum)]/85">
            {[
              "It offers gentle reminders to eat at regular times, so you are not relying on hunger signals that don't always arrive.",
              "It is calm and low-stimulation by design, with nothing to earn and nothing to lose.",
              "It works on your phone, even offline, and it keeps everything on your device.",
            ].map((item) => (
              <li key={item} className="flex gap-4 max-w-[68ch]">
                <span
                  className="mt-2 size-1.5 flex-none rounded-full bg-[var(--terracotta)]"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SAFETY PROMISE */}
      <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <div className="rounded-3xl border-2 border-[var(--terracotta)]/40 bg-[var(--cream)] p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-3">
            <Logo className="size-7 text-[var(--terracotta)]" />
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
              Our safety promise
            </p>
          </div>
          <h2 className="mt-5 font-display text-3xl leading-tight md:text-4xl">
            What Anchor will never do.
          </h2>
          <ul className="mt-8 space-y-4 text-lg leading-relaxed text-[var(--plum)]/85">
            {[
              "No calorie counting, no weighing, and no food rules.",
              "No streaks, no guilt, and no gamified pressure.",
              "Weight-neutral, always. It is built to be safe for anyone with a history of disordered eating.",
            ].map((item) => (
              <li key={item} className="flex gap-4">
                <span
                  className="mt-2 size-1.5 flex-none rounded-full bg-[var(--terracotta)]"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY I BUILT IT */}
      <section className="bg-[var(--cream)]">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <p className="mb-5 text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
            Why I built it
          </p>
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            The opposite of the apps that quietly work against us.
          </h2>
          <p className="mt-10 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
            Most apps in this space — the trackers, the streak-counters, the calorie tools — quietly work against a brain like ours,
            turning eating into numbers, targets and pressure. I am an eating disorder
            clinician who also codes, so I made the opposite: something that
            treats a regular rhythm as a kindness rather than a rule, and holds
            you gently while you find it. It is the same care I offer in the
            room, shaped into something you can carry in your pocket, for free.
          </p>
        </div>
      </section>

      {/* EARLY ACCESS */}
      <section id="waitlist" className="mx-auto max-w-3xl px-5 py-20 md:py-28">
        <div className="rounded-3xl border border-[var(--plum)]/10 bg-[var(--plum)] p-8 md:p-12 text-[var(--oat)]">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
            Early access
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
            Be one of the first to use it.
          </h2>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-[var(--oat)]/85">
            Anchor is in the works. Join the early-access list and I'll be in
            touch the moment it's ready to use.
          </p>

          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="mt-8 rounded-2xl bg-[var(--oat)] p-5 text-[var(--plum)]"
            >
              You're on the list, I'll be in touch the moment Anchor is ready.
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const trimmed = email.trim();
                if (!trimmed) return;
                const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
                if (!looksLikeEmail) return;
                setSubmitting(true);
                // Spam guards: silently succeed without writing if the
                // honeypot has any value, or if the form was submitted
                // implausibly fast (under ~2.5s from mount).
                const elapsed = Date.now() - mountedAtRef.current;
                const isBot = honeypot.trim().length > 0 || elapsed < 2500;
                if (!isBot) {
                  try {
                    const { error } = await supabase
                      .from("lead_signups")
                      .insert({ email: trimmed, source: "anchor_waitlist" });
                    if (error) console.warn("lead_signups insert failed", error);
                  } catch (err) {
                    console.warn("lead_signups insert threw", err);
                  }
                  // Netlify Forms notification (best-effort, never blocks UX).
                  try {
                    const body = new URLSearchParams({
                      "form-name": "signups",
                      email: trimmed,
                      source: "anchor",
                      company: honeypot,
                    });
                    await fetch("/__forms.html", {
                      method: "POST",
                      headers: { "Content-Type": "application/x-www-form-urlencoded" },
                      body: body.toString(),
                    });
                  } catch (err) {
                    console.warn("netlify form notify failed", err);
                  }
                }
                trackEvent("sign_up", { location: "anchor_waitlist" });
                setSubmitting(false);
                setSubmitted(true);
              }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="anchor-email" className="sr-only">
                Email address
              </label>
              {/* Honeypot: hidden from real users, tempting to bots. */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-10000px",
                  top: "auto",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                <label htmlFor="anchor-company">Company</label>
                <input
                  id="anchor-company"
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>
              <input
                id="anchor-email"
                ref={emailRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-describedby="anchor-email-help"
                className="flex-1 rounded-full border border-[var(--oat)]/30 bg-[var(--oat)] px-5 py-3 text-base text-[var(--plum)] placeholder:text-[var(--plum)]/40 focus:border-[var(--terracotta)] focus:outline-none min-h-11"
              />
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 disabled:opacity-70 min-h-11"
              >
                {submitting ? "Sending…" : "Join the early-access list"}
              </button>
            </form>
          )}
          {!submitted && (
            <p
              id="anchor-email-help"
              className="mt-3 text-xs text-[var(--oat)]/70"
            >
              I'll only email you about Anchor and the hub, and you can
              unsubscribe any time.
            </p>
          )}
        </div>
      </section>
      </main>

      <SiteFooter />

      <FloatingBook location="anchor" />
    </div>
  );
}
