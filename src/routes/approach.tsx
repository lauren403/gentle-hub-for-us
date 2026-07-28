import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HALAXY_URL, SITE_URL, WHITEPAPER_PDF } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ContentGovernance } from "@/components/content-governance";

const TITLE = "Our approach — the Body Belonging framework | Body Belonging Clinic";
const DESCRIPTION =
  "The Body Belonging framework: Safety, Notice, Regulate, Belong. A whole-person, weight-neutral approach to ADHD, eating and regulation — honest about the evidence.";
const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/approach`;
const SAGE = "#B7BC7A";
const kicker = "font-mono text-xs uppercase tracking-[0.2em] text-[var(--terracotta)]";

export const Route = createFileRoute("/approach")({
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
  component: ApproachPage,
});

const DOMAINS = [
  { t: "Attention", d: "Runs on interest and urgency — not willpower." },
  { t: "Emotion", d: "Arrives fast, and loud." },
  { t: "Appetite", d: "Hunger, fullness, and a steady eating rhythm." },
  { t: "Arousal", d: "Your nervous system's dial — overwhelm to shutdown." },
];

const MOVEMENTS = [
  { n: "1", label: "Safety", t: "First, safety.", body: "Before any strategy, we make sure you feel safe, respected and in charge — of your body, your identity, your pace.", root: "Trauma-informed, culturally safe practice." },
  { n: "2", label: "Notice", t: "Then, gentle noticing.", body: "Your body is always sending signals — hunger, tension, restlessness. We help you hear them again, with curiosity, never control. Always weight-neutral.", root: "Eating-disorder-informed practice." },
  { n: "3", label: "Regulate", t: "Then, real skills.", body: "Practical skills for emotion, attention and routines — sitting alongside medication, never instead of it. Eating support stays additive, never restrictive.", root: "CBT-E · Barkley's self-regulation model." },
  { n: "4", label: "Belong", t: "Held by belonging.", body: "Self-compassion, connection and identity aren't extras — they're where change holds. Aboriginal-led and LGBTQIA+ affirming, by design.", root: "Self-compassion & social-connection research." },
];

const BookButton = () => (
  <a
    href={HALAXY_URL}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackEvent("booking_click", { location: "approach_cta" })}
    className="inline-flex items-center justify-center rounded-full bg-[var(--terracotta)] px-7 py-3.5 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 active:scale-[0.98] min-h-11"
  >
    Book a free intro call
  </a>
);

// Calm motion breath — poster still by default, muted looping video only when motion is allowed.
function CalmBand() {
  const [motion, setMotion] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setMotion(!mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden bg-[var(--plum)]">
      {motion ? (
        <video className="absolute inset-0 h-full w-full object-cover" poster="/hub-calm-poster.jpg" autoPlay muted loop playsInline aria-hidden="true">
          <source src="/hub-calm.mp4" type="video/mp4" />
        </video>
      ) : (
        <img src="/hub-calm-poster.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
      )}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(46,26,34,0.6), rgba(46,26,34,0.12) 55%, rgba(46,26,34,0.4))" }} />
      <div className="relative mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center px-5 text-center">
        <h2 className="max-w-[18ch] font-display text-[2rem] leading-[1.08] text-[var(--oat)] md:text-[3.4rem]">
          Safety first. The nervous system leads.
        </h2>
      </div>
    </section>
  );
}

function ApproachPage() {
  return (
    <div className="min-h-dvh bg-[var(--cream)] text-[var(--plum)]" id="top">
      <SiteHeader location="approach" />
      <main id="main-content" tabIndex={-1}>
        {/* HERO — plum, full-bleed split */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="grid md:grid-cols-2 md:items-stretch">
            <div className="flex flex-col justify-center px-5 py-16 md:py-24 md:pl-12 md:pr-14 lg:pl-20">
              <p className={kicker}>Our approach</p>
              <h1 className="mt-6 max-w-[15ch] font-display text-[2.85rem] leading-[1.02] text-[var(--oat)] md:text-[5rem]">
                ADHD regulation, from the inside out.
              </h1>
              <p className="mt-7 max-w-[40ch] text-lg leading-relaxed text-[var(--oat)]/85 md:text-xl">
                A whole-person framework for how attention, emotion and eating actually connect —
                gentle, weight-neutral, and honest about the evidence.
              </p>
            </div>
            <div className="relative min-h-[52vh] md:min-h-[80vh]">
              <img src="/hub-portrait.jpg" alt="A quiet, considered moment" className="absolute inset-0 h-full w-full object-cover" loading="eager" decoding="async" />
            </div>
          </div>
        </section>

        {/* PHILOSOPHY — sage, full-bleed split */}
        <section style={{ backgroundColor: SAGE }} className="text-[var(--plum)]">
          <div className="grid md:grid-cols-2 md:items-stretch">
            <div className="relative order-2 min-h-[48vh] md:order-1 md:min-h-[68vh]">
              <img src="/hub-shadows.jpg" alt="Two figures in warm light" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="order-1 flex flex-col justify-center px-5 py-16 md:order-2 md:px-14 md:py-24 lg:px-20">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5c4a1e]">The idea</p>
              <h2 className="mt-5 max-w-[18ch] font-display text-[2rem] leading-[1.05] text-[var(--plum)] md:text-[3.4rem]">
                Most ADHD care looks only at attention. We look at the whole system.
              </h2>
              <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[var(--plum)]/82">
                Attention, feelings and eating pull on each other constantly. We work across that
                overlap — while keeping an eye on sleep, sensory needs, medication and everything else
                that shapes a day.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT WE WATCH — terracotta */}
        <section className="bg-[var(--terracotta)] text-[var(--cream)]">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--cream)]/80">What we watch</p>
            <h2 className="mt-4 font-display text-[2rem] leading-tight md:text-[3.4rem]">Four dials, always pulling on each other.</h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DOMAINS.map((d) => (
                <div key={d.t} className="rounded-2xl bg-[var(--cream)] p-6 text-[var(--plum)]">
                  <p className="font-display text-xl">{d.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--plum)]/72">{d.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MOTION BREATH — calm */}
        <CalmBand />

        {/* FOUR MOVEMENTS — cream */}
        <section className="bg-[var(--cream)]">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <p className={kicker}>How we work</p>
            <h2 className="mt-4 font-display text-[2rem] leading-tight text-[var(--plum)] md:text-[3.4rem]">The four movements.</h2>
            <p className="mt-4 text-[var(--plum)]/60">From safety on the inside, outward to belonging.</p>
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {MOVEMENTS.map((m) => (
                <article key={m.n} className="flex flex-col rounded-3xl border border-[var(--plum)]/10 bg-white p-7">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-4xl text-[var(--terracotta)]">{m.n}</span>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--terracotta)]">{m.label}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl leading-tight text-[var(--plum)]">{m.t}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--plum)]/80">{m.body}</p>
                  <p className="mt-5 border-t border-[var(--plum)]/10 pt-4 text-xs leading-relaxed text-[var(--plum)]/50">
                    <span className="font-medium text-[var(--terracotta)]">Rooted in · </span>{m.root}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HONEST ABOUT THE EVIDENCE — plum */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="mx-auto max-w-3xl px-5 py-20 md:py-28">
            <p className={kicker}>Our promise</p>
            <h2 className="mt-4 font-display text-[2rem] leading-tight text-[var(--oat)] md:text-[3.4rem]">
              Honest about the evidence.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--oat)]/85">
              Our framework is Lauren&apos;s synthesis of established practice, emerging research and
              clinical experience. Some of it is well-proven — regular eating, trauma-informed care.
              Some is promising and still developing — like the link between ADHD and body awareness.
              We&apos;ll always tell you which is which, and refer on when medical, dietetic or other
              expertise is needed.
            </p>
            <p className="mt-5 font-display text-xl italic text-[var(--terracotta)]">
              Most clinics won&apos;t draw that line. We think you deserve it.
            </p>
            <div className="mt-10">
              <ContentGovernance labels={["Australian guideline", "Systematic review", "Emerging research", "Clinical practice lens"]} />
            </div>
            <a
              href={WHITEPAPER_PDF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the Body Belonging framework working paper PDF"
              onClick={() => trackEvent("whitepaper_click", { location: "approach" })}
              className="mt-8 inline-block text-sm underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
            >
              Read the working paper (PDF) →
            </a>
          </div>
        </section>

        {/* CTA — oat, full-bleed split */}
        <section className="bg-[var(--oat)]">
          <div className="grid md:grid-cols-2 md:items-stretch">
            <div className="relative order-2 min-h-[48vh] md:order-1 md:min-h-[64vh]">
              <img src="/hub-together.jpg" alt="Joy, pride and belonging" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="order-1 flex flex-col justify-center px-5 py-16 md:order-2 md:px-14 md:py-24 lg:px-20">
              <h2 className="max-w-[18ch] font-display text-[2rem] leading-tight text-[var(--plum)] md:text-[3.4rem]">
                Support built for how your brain actually works.
              </h2>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <BookButton />
                <Link to="/assessment-preparation" className="text-sm font-medium text-[var(--plum)] underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]">
                  Open the free prep guide →
                </Link>
              </div>
              <p className="mt-6 max-w-[46ch] text-sm text-[var(--plum)]/60">
                Not a crisis service. In an emergency call <strong>000</strong>, or Lifeline{" "}
                <strong>13 11 14</strong>. Medicare rebates may apply with an eligible Mental Health
                Treatment Plan or Eating Disorder Plan.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
