import { createFileRoute } from "@tanstack/react-router";
import { HALAXY_URL, SITE_URL, WHITEPAPER_PDF } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { SiteHeader, SiteFooter, Logo } from "@/components/site-chrome";
import { ContentGovernance } from "@/components/content-governance";

const TITLE = "Our approach — Body Belonging practice framework | Body Belonging Clinic";
const DESCRIPTION =
  "The Body Belonging practice framework: Safety, Notice, Regulate, Belong. A transparent therapeutic lens, not a validated stand-alone ADHD treatment.";
const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/approach`;

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

function MonogramDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-14" aria-hidden="true">
      <span className="h-px w-16 bg-[var(--plum)]/20" />
      <Logo className="size-6 text-[var(--terracotta)]" />
      <span className="h-px w-16 bg-[var(--plum)]/20" />
    </div>
  );
}

function Section({
  eyebrow,
  children,
  className = "",
}: {
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={"mx-auto max-w-3xl px-5 py-16 md:py-24 " + className}>
      {eyebrow && (
        <p className="mb-5 text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
          {eyebrow}
        </p>
      )}
      {children}
    </section>
  );
}

function ApproachPage() {
  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]" id="top">
      <SiteHeader location="approach" />
      <main id="main-content" tabIndex={-1}>
        {/* HERO */}
        <section className="relative overflow-hidden bg-[var(--plum)] text-[var(--oat)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 opacity-[0.06]"
          >
            <Logo className="size-[520px] text-[var(--oat)]" />
          </div>
          <div className="mx-auto max-w-3xl px-5 py-24 md:py-32">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
              Our Approach
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] md:text-6xl">
              The Body Belonging practice framework
            </h1>
            <p className="mt-6 font-display text-xl italic text-[var(--oat)]/85 md:text-2xl">
              ADHD regulation from the inside out.
            </p>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--oat)]/85">
              Attention, emotion and eating can influence one another. We work across that overlap
              while also considering sleep, sensory needs, medication effects, executive function,
              mental health, environment and other possible contributors.
            </p>
            <p className="mt-8 font-display text-xl italic leading-snug text-[var(--terracotta)] md:text-2xl">
              Guideline-aligned care, research translation and eating-disorder-informed practice
              without supplement hype or restrictive rules.
            </p>
          </div>
        </section>

        <MonogramDivider />

        {/* ONE SYSTEM */}
        <section className="mx-auto max-w-5xl px-5 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
                The foundation
              </p>
              <h2 className="font-display text-3xl leading-tight md:text-5xl">
                Connected experiences, not a single cause.
              </h2>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--plum)]/85">
                <p>
                  <em>Interoception</em> describes perception of internal body signals such as
                  hunger, tension and arousal. It may be one contributor for some people, alongside
                  executive function, time awareness, sensory preferences, reward, sleep, medication
                  and mental health. Gentle body-awareness work is optional and consent-based; it is
                  not assumed to explain every difficulty.
                </p>
              </div>
              <p className="mt-8 rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-5 text-sm leading-relaxed text-[var(--plum)]/60">
                Evidence linking interoception and ADHD is still developing and findings vary by the
                measure used. We hold it as one possible clinical lens—not a cause, cure or complete
                account of ADHD.
              </p>
            </div>
            <figure>
              <div className="overflow-hidden rounded-3xl border border-[var(--plum)]/10 shadow-xl">
                <img
                  src="/approach-session.jpg"
                  alt="Lauren Lynch in session with a client at Body Belonging Clinic"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] h-full w-full object-cover"
                />
              </div>
            </figure>
          </div>
        </section>

        {/* FOUR DIALS */}
        <section className="bg-[var(--cream)]">
          <Section eyebrow="The lens">
            <h2 className="font-display text-3xl leading-tight md:text-5xl">
              One body, four dials.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                {
                  t: "Attention",
                  d: "Attention that may be influenced by interest, urgency, novelty and context.",
                },
                {
                  t: "Emotion",
                  d: "Feelings that arrive fast and loud.",
                },
                {
                  t: "Appetite",
                  d: "Hunger and fullness, and a steady eating rhythm.",
                },
                {
                  t: "Arousal",
                  d: "The nervous system's state, from overwhelm to shutdown.",
                },
              ].map((d) => (
                <div
                  key={d.t}
                  className="rounded-2xl border border-[var(--plum)]/10 bg-[var(--oat)] p-6"
                >
                  <p className="font-display text-xl">{d.t}</p>
                  <p className="mt-2 text-[var(--plum)]/75">{d.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm italic text-[var(--plum)]/60">
              These domains can interact. The “four dials” are a clinical organising tool, not a
              validated biological model.
            </p>
          </Section>
        </section>

        {/* FOUR MOVEMENTS */}
        <Section eyebrow="The framework">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">The four movements.</h2>
          <div className="mt-10 space-y-5">
            {[
              {
                n: "1",
                label: "SAFETY",
                t: "First, safety.",
                body: "We begin by asking what supports safety, consent and identity for this person before selecting strategies.",
                evidence:
                  "trauma-informed principles and collaborative practice; cultural safety is determined by the person receiving the service.",
              },
              {
                n: "2",
                label: "NOTICE",
                t: "Then, gentle noticing.",
                body: "We help you read your body's signals with curiosity and kindness, never control. Gentle, optional, and always weight-neutral — this is where our eating-disorder training matters most.",
                evidence:
                  "gentle, weight-neutral interoceptive work drawn from eating-disorder practice — and we stay honest that the ADHD–interoception link is still emerging.",
              },
              {
                n: "3",
                label: "REGULATE",
                t: "Then, real skills.",
                body: "Skills for emotion, attention and routines can complement medical treatment. Eating support remains additive and non-restrictive, with dietetic or medical referral when needed.",
                evidence:
                  "regular eating from CBT-E, and the self-regulation model of ADHD (Russell Barkley).",
              },
              {
                n: "4",
                label: "BELONG",
                t: "Held by belonging.",
                body: "Self-compassion, connection and identity can support wellbeing. Their role and relevance differ for each person.",
                evidence:
                  "self-compassion and social connection are supported across several mental-health contexts; ADHD-specific application is less established.",
              },
            ].map((m) => (
              <article
                key={m.n}
                className="rounded-3xl border border-[var(--plum)]/10 bg-[var(--cream)] p-7 md:p-9"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-3xl text-[var(--terracotta)]">{m.n}</span>
                  <span className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
                    {m.label}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl md:text-3xl">{m.t}</h3>
                <p className="mt-3 text-lg leading-relaxed text-[var(--plum)]/85">{m.body}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--plum)]/60">
                  <span className="font-medium text-[var(--terracotta)]">The evidence: </span>
                  {m.evidence}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm italic text-[var(--plum)]/60">
            Safety → Notice → Regulate → Belong. Four movements, one direction — inside out.
          </p>
        </Section>

        {/* EVIDENCE-HONEST */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <Section eyebrow="Our promise">
            <h2 className="font-display text-3xl leading-tight text-[var(--oat)] md:text-5xl">
              Evidence-honest by design.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--oat)]/85">
              The framework is Lauren&apos;s synthesis of established practices, emerging research
              and clinical lenses. It has not been independently validated as a treatment model. We
              identify uncertainty, keep scope visible and refer when medical, dietetic or other
              expertise is required.
            </p>
            <div className="mt-10">
              <ContentGovernance
                labels={[
                  "Australian guideline",
                  "Systematic review",
                  "Emerging research",
                  "Clinical practice lens",
                ]}
              />
            </div>
          </Section>
        </section>

        {/* CTA */}
        <Section eyebrow="Work with us">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            Support built for how your brain actually works.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--plum)]/85">
            The framework can give therapy a shared structure. Anchor and the Letters are optional
            general resources between sessions; they are not clinical monitoring or crisis support.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={HALAXY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("booking_click", { location: "approach_cta" })}
              className="inline-flex items-center justify-center rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 active:scale-[0.98] min-h-11"
            >
              Book a free 15-minute intro call
            </a>
            <a
              href={WHITEPAPER_PDF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the Body Belonging practice framework working paper PDF in a new tab"
              onClick={() => trackEvent("whitepaper_click", { location: "approach_cta" })}
              className="text-sm underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
            >
              Read the working paper (PDF) →
            </a>
          </div>
          <p className="mt-6 text-sm text-[var(--plum)]/60">
            Not a crisis service. In an emergency call <strong>000</strong>, or Lifeline{" "}
            <strong>13 11 14</strong>. Rebates may apply with an eligible Mental Health Treatment
            Plan or Eating Disorder Plan.
          </p>
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}
