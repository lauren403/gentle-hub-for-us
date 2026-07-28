import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ANCHOR_URL, CONTACT, SITE_URL } from "@/config/site";
import { trackEvent, trackNextAction } from "@/lib/analytics";
import { submitLeadSignup } from "@/lib/lead-signup";
import { SiteHeader, SiteFooter, FloatingBook, Logo } from "@/components/site-chrome";
import { HandLabel } from "@/components/cinema";
import { Squiggle } from "@/components/hand-drawn";
import { isLikelySpam, looksLikeEmail } from "@/lib/spam-guard";

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

function AnchorPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const [emailConsent, setEmailConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const mountedAtRef = useRef<number>(Date.now());
  const emailRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]" id="top">
      <SiteHeader location="anchor" />
      <main id="main-content" tabIndex={-1}>
        {/* HERO */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1fr_0.8fr] md:py-24 lg:gap-16">
            <div>
              <HandLabel tone="terracotta">A free tool from Body Belonging Clinic</HandLabel>
              <h1 className="mt-5 font-display text-5xl leading-[1.03] md:text-7xl">
                <span className="relative inline-block">
                  Anchor
                  <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-[var(--terracotta)]" />
                </span>
              </h1>
              <p className="mt-6 font-display text-2xl italic text-[var(--oat)]/85 md:text-3xl">
                A gentle companion for the days your body forgets to tell you it&apos;s hungry.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <a
                  href={ANCHOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("anchor_open_app", { location: "anchor_hero" })}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--terracotta)] px-7 py-3 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 active:scale-[0.98]"
                >
                  Open Anchor →
                </a>
                <a
                  href="#waitlist"
                  className="text-sm font-medium text-[var(--oat)]/85 underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--oat)]"
                >
                  or get updates
                </a>
              </div>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-3xl border border-[var(--oat)]/10 shadow-md md:max-w-none">
              <img src="/anchor-reminders.jpg" alt="Anchor's gentle eating-rhythm reminders on a phone" className="h-full w-full object-cover" loading="eager" decoding="async" />
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <p className="max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
            Anchor is a small, free general wellbeing tool offering optional eating-rhythm prompts.
            ADHD, stimulant medication, executive function, sensory needs, time awareness and other
            factors can all affect eating. Anchor offers a quiet nudge; it does not diagnose, treat,
            monitor or replace individual support.
          </p>
        </section>

        {/* WHAT ANCHOR DOES — sage */}
        <section style={{ backgroundColor: "#B7BC7A" }}>
          <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[#5c4a1e]">
              What Anchor does
            </p>
            <h2 className="font-display text-3xl leading-tight md:text-5xl">
              A quiet nudge, nothing more.
            </h2>
            <ul className="mt-10 space-y-4 text-lg leading-relaxed text-[var(--plum)]/85">
              {[
                "It offers optional reminders to support a regular eating rhythm.",
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

        {/* BREATH — warm table */}
        <section className="relative min-h-[48vh] w-full overflow-hidden bg-[var(--plum)]">
          <img src="/hub-table.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(46,26,34,0.62), rgba(46,26,34,0.12) 55%, rgba(46,26,34,0.4))" }} />
          <div className="relative mx-auto flex min-h-[48vh] max-w-4xl items-center justify-center px-5 text-center">
            <h2 className="max-w-[20ch] font-display text-[2rem] leading-tight text-[var(--oat)] md:text-[3rem]">
              Something to eat, at a regular time. That&apos;s the whole idea.
            </h2>
          </div>
        </section>

        {/* SAFETY PROMISE */}
        <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <div className="rounded-3xl border-2 border-[var(--terracotta)]/40 bg-[var(--cream)] p-8 md:p-12 shadow-sm">
            <div className="flex items-center gap-3">
              <Logo className="size-7 text-[var(--terracotta)]" />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--terracotta)]">
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
                "Designed to reduce common eating-disorder-related risks. It may not suit everyone.",
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
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[var(--terracotta)]">
              Why I built it
            </p>
            <h2 className="font-display text-3xl leading-tight md:text-5xl">
              The opposite of the apps that quietly work against us.
            </h2>
            <p className="mt-10 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
              Some tracking and streak-based tools can increase pressure or be unsuitable for people
              with eating-disorder histories. Lauren&apos;s eating-disorder credential informed a
              deliberately minimal alternative: no calorie, weight or streak mechanics. That design
              reduces particular risks but is not evidence that Anchor is safe or effective for
              every person.
            </p>
            <div className="mt-8 rounded-2xl border border-[var(--plum)]/10 bg-[var(--oat)] p-6 text-sm leading-relaxed text-[var(--plum)]/75">
              <p className="font-medium text-[var(--plum)]">
                Use Anchor as a wellbeing prompt only.
              </p>
              <p className="mt-2">
                It is not clinical or emergency monitoring. The clinic cannot see whether you act on
                a reminder. Pause it if prompts increase distress, compulsive checking, shame or
                eating-disorder symptoms, and speak with your treating professional.
              </p>
              <p className="mt-3">
                Read the <Link to="/anchor-terms">terms of use</Link> and{" "}
                <Link to="/anchor-privacy">privacy notice</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* EARLY ACCESS */}
        <section id="waitlist" className="mx-auto max-w-3xl px-5 py-20 md:py-28">
          <div className="rounded-3xl border border-[var(--plum)]/10 bg-[var(--plum)] p-8 md:p-12 text-[var(--oat)]">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--terracotta)]">
              Early access
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
              Get updates as Anchor develops.
            </h2>
            <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-[var(--oat)]/85">
              Anchor is free to use now. Join the updates list and I'll share new supports and
              letters as they land.
            </p>

            {submitted ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-8 rounded-2xl bg-[var(--oat)] p-5 text-[var(--plum)]"
              >
                You&apos;re on the list. We&apos;ll send occasional Anchor and hub updates.
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const trimmed = email.trim();
                  if (!trimmed || !emailConsent) return;
                  if (!looksLikeEmail(trimmed)) return;
                  setSubmitting(true);
                  setSubmissionError(false);
                  // Spam guards: silently succeed without writing if the
                  // honeypot has any value, or if the form was submitted
                  // implausibly fast (under ~2.5s from mount).
                  const isBot = isLikelySpam(honeypot, Date.now() - mountedAtRef.current);
                  if (isBot) {
                    setSubmitting(false);
                    setSubmitted(true);
                    return;
                  }

                  const result = await submitLeadSignup({
                    email: trimmed,
                    source: "anchor_waitlist",
                    consentVersion: "anchor-updates-v1",
                    consentedAt: new Date().toISOString(),
                    honeypot,
                  });

                  setSubmitting(false);
                  if (!result.ok) {
                    setSubmissionError(true);
                    return;
                  }

                  trackEvent("sign_up", { location: "anchor_waitlist" });
                  trackNextAction("email_signup", "anchor_updates");
                  setSubmitted(true);
                }}
                className="mt-8 space-y-4"
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
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="anchor-email"
                    ref={emailRef}
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    aria-describedby="anchor-email-help"
                    className="min-h-11 flex-1 rounded-full border border-[var(--oat)]/30 bg-[var(--oat)] px-5 py-3 text-base text-[var(--plum)] placeholder:text-[var(--plum)]/40 focus:border-[var(--terracotta)] focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="min-h-11 rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 disabled:opacity-70"
                  >
                    {submitting ? "Sending…" : "Join the updates list"}
                  </button>
                </div>
                <label className="flex max-w-[68ch] items-start gap-3 text-sm leading-relaxed text-[var(--oat)]/80">
                  <input
                    type="checkbox"
                    required
                    checked={emailConsent}
                    onChange={(event) => setEmailConsent(event.target.checked)}
                    className="mt-1 size-4 accent-[var(--terracotta)]"
                  />
                  <span>
                    I agree to receive Anchor and ADHD Hub emails from Body Belonging Clinic. I can
                    unsubscribe at any time. See the <Link to="/privacy">privacy policy</Link>.
                  </span>
                </label>
                {submissionError && (
                  <p role="alert" className="text-sm text-[var(--oat)]">
                    We couldn&apos;t safely save your request. Please try again, or email{" "}
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="underline decoration-[var(--terracotta)] underline-offset-4"
                    >
                      {CONTACT.email}
                    </a>
                    .
                  </p>
                )}
              </form>
            )}
            {!submitted && (
              <p id="anchor-email-help" className="mt-3 text-xs text-[var(--oat)]/70">
                We collect your email and consent for requested updates. Do not enter clinical
                information here.
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
