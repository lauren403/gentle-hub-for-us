import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  HALAXY_URL,
  HERO_IMAGE,
  BELONGING_IMAGE,
  SITE_URL,
} from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { SiteHeader, SiteFooter, Logo } from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  component: AdhdHub,
  head: () => ({
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
});

const BOOK_URL = HALAXY_URL;

// Real, consented testimonials only. COMPLIANCE (National Law advertising rules):
// keep each quote to the EXPERIENCE of care — feeling heard, safe, understood, the
// space itself. NEVER include specific symptoms, diagnoses, treatments, or outcome/
// "cure" claims. Attribution should be non-identifying and consented (e.g. initials,
// "a client", "via telehealth"). This whole section stays hidden while the array is empty.
const TESTIMONIALS: { quote: string; attribution?: string }[] = [];

const BookButton = ({
  children = "Book a free intro call",
  className = "",
  location = "generic",
}: {
  children?: React.ReactNode;
  className?: string;
  location?: string;
}) => (
  <a
    href={BOOK_URL}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackEvent("booking_click", { location })}
    className={
      "inline-flex items-center justify-center rounded-full bg-[var(--terracotta)] px-7 py-3.5 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 active:scale-[0.98] min-h-11 " +
      className
    }
  >
    {children}
  </a>
);

function TrustStrip() {
  const items = [
    "Accredited Mental Health Social Worker (AASW)",
    "ANZAED Credentialed Eating Disorder Clinician",
    "Aboriginal-led",
    "LGBTQIA+ affirming",
    "Telehealth Australia-wide",
  ];
  return (
    <div className="border-y border-[var(--plum)]/10 bg-[var(--cream)]">
      <div className="mx-auto max-w-6xl px-5 py-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--plum)]/70 md:text-xs">
          {items.map((t, i) => (
            <li key={t} className="flex items-center gap-6">
              <span>{t}</span>
              {i < items.length - 1 && (
                <span aria-hidden className="text-[var(--terracotta)]/60">
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  className = "",
  children,
}: {
  id?: string;
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={"mx-auto max-w-4xl px-5 py-20 md:py-28 " + className}>
      {eyebrow && (
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[var(--terracotta)]">
          {eyebrow}
        </p>
      )}
      {children}
    </section>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-12 border-l-2 border-[var(--terracotta)] pl-6 font-display text-2xl leading-snug text-[var(--plum)] md:text-[2rem]">
      {children}
    </blockquote>
  );
}

/**
 * Editorial image slot with an on-brand graceful fallback.
 * If the src file is missing (or fails to load), we render a
 * plum-gradient block with the "h" monogram in cream.
 */
function StudioImage({
  src,
  alt,
  className = "",
  aspect = "aspect-[4/5]",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = failed || !src || src === "#";
  return (
    <div
      className={
        "relative overflow-hidden rounded-3xl border border-[var(--plum)]/10 bg-[var(--cream)] shadow-sm " +
        aspect +
        " " +
        className
      }
    >
      {showPlaceholder ? (
        <div
          className="grid h-full w-full place-items-center"
          style={{
            background:
              "linear-gradient(140deg, var(--plum) 0%, color-mix(in oklab, var(--plum) 78%, var(--terracotta)) 100%)",
          }}
          aria-label={alt}
          role="img"
        >
          <Logo className="w-2/5 text-[var(--oat)] opacity-25" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

const PATHWAYS = [
  {
    eyebrow: "Prepare without proving",
    title: "Get ready for an ADHD assessment",
    blurb:
      "A free, non-diagnostic guide to gathering your story, your questions and any existing records.",
    to: "/assessment-preparation" as const,
    cta: "Open the guide",
  },
  {
    eyebrow: "Navigate Australian care",
    title: "Find the right next step",
    blurb:
      "Assessment, medication, therapy, dietetics and support — a plain map of who does what.",
    to: "/australian-adhd-care" as const,
    cta: "Open the care map",
  },
  {
    eyebrow: "Food & the brain",
    title: "Food stuff is brain stuff",
    blurb: "Weight-neutral, sensory-aware, eating-disorder-informed. No calories, no rules, no shame.",
    to: "/food-and-the-adhd-brain" as const,
    cta: "Explore",
  },
  {
    eyebrow: "A free companion",
    title: "Meet Anchor",
    blurb: "A gentle eating-rhythm tool for ADHD brains. No numbers, no streaks, no rules.",
    to: "/anchor" as const,
    cta: "Learn about Anchor",
  },
];

function PathwayCards() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 md:pb-28">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {PATHWAYS.map((c) => (
          <Link
            key={c.title}
            to={c.to}
            className="group flex flex-col rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-7 no-underline transition-all hover:border-[var(--terracotta)]/40 hover:shadow-sm"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--terracotta)]">
              {c.eyebrow}
            </p>
            <h3 className="mt-3 font-display text-xl leading-tight text-[var(--plum)]">{c.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--plum)]/75">{c.blurb}</p>
            <span className="mt-6 inline-flex text-sm font-medium text-[var(--plum)] underline decoration-[var(--terracotta)] underline-offset-4 group-hover:text-[var(--terracotta)]">
              {c.cta} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function AdhdHub() {
  return (
    <div id="top" className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]">
      <SiteHeader location="home" />
      <main id="main-content" tabIndex={-1}>
        {/* 1 · HERO */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28 lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--terracotta)]">
                ADHD · Eating · Belonging — telehealth across Australia
              </p>
              <h1 className="mt-6 font-display text-[2.75rem] leading-[1.05] md:text-6xl">
                Care for the whole of you — not just your attention.
              </h1>
              <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-[var(--oat)]/85">
                Body Belonging Clinic is a neurodivergent-affirming, Aboriginal-led private practice
                for ADHD, eating and body image. Gentle, evidence-informed therapy that meets you
                where you are.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <BookButton location="hero" />
                <Link
                  to="/start-here"
                  className="text-sm font-medium text-[var(--oat)] underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
                >
                  New here? Start here →
                </Link>
              </div>
            </div>
            <StudioImage
              src={HERO_IMAGE}
              alt="A calm, welcoming space at Body Belonging Clinic"
              aspect="aspect-[4/5]"
              priority
              className="mx-auto w-full max-w-sm md:max-w-none"
            />
          </div>
        </section>

        {/* 2 · TRUST */}
        <TrustStrip />

        {/* 3 · RECOGNISE THIS */}
        <Section eyebrow="You might recognise this">
          <h2 className="max-w-[20ch] font-display text-3xl leading-tight md:text-5xl">
            You&apos;ve been told it&apos;s just focus. It never felt that simple.
          </h2>
          <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-[var(--plum)]/80">
            For a lot of people, ADHD shows up far beyond attention — in eating that slips through
            the day, in feelings that arrive all at once, in the effort of belonging somewhere that
            feels safe. If &ldquo;everything looks fine&rdquo; but nothing feels settled, you are not
            failing at something simple. You are carrying something more layered than a checklist.
          </p>
          <PullQuote>
            ADHD isn&apos;t only an attention problem. The rest of life — food, feelings, belonging —
            matters too.
          </PullQuote>
        </Section>

        {/* 4 · HOW WE WORK */}
        <section className="bg-[var(--cream)]">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28 lg:gap-16">
            <StudioImage
              src={BELONGING_IMAGE}
              alt="A steady, unhurried therapeutic space"
              aspect="aspect-[4/5]"
              className="order-2 mx-auto w-full max-w-sm md:order-1 md:max-w-none"
            />
            <div className="order-1 md:order-2">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--terracotta)]">
                How we work
              </p>
              <h2 className="mt-5 font-display text-3xl leading-tight md:text-5xl">
                We start with your nervous system, not a checklist.
              </h2>
              <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-[var(--plum)]/80">
                Care here is whole-person and unhurried: weight-neutral, sensory-aware, and affirming
                of your identity, culture and history. We work at the pace your body can actually
                keep — and we help you find the right next step, whether that&apos;s with us or with a
                GP, psychiatrist or dietitian.
              </p>
              <Link
                to="/approach"
                className="mt-8 inline-flex text-sm font-medium text-[var(--plum)] underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
              >
                Read our approach →
              </Link>
            </div>
          </div>
        </section>

        {/* 5 · WHERE TO BEGIN */}
        <Section eyebrow="Where to begin" className="pb-10 md:pb-12">
          <h2 className="max-w-[18ch] font-display text-3xl leading-tight md:text-5xl">
            Find your next step — at your pace.
          </h2>
          <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-[var(--plum)]/80">
            A few gentle starting points. None of them ask you to prove you&apos;re
            &ldquo;ADHD enough.&rdquo;
          </p>
        </Section>
        <PathwayCards />

        {/* 6 · GETTING STARTED + MEDICARE */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <Section eyebrow="Getting started" className="max-w-3xl">
            <h2 className="font-display text-3xl leading-tight text-[var(--oat)] md:text-5xl">
              Beginning is one small step.
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-[var(--oat)]/85">
              We offer a free 15-minute intro call so you can get a feel for whether this is the
              right fit — no pressure, no commitment. With an eligible Mental Health Treatment Plan
              or Eating Disorder Plan from a GP, Medicare rebates apply; your GP is the right person
              to confirm eligibility.
            </p>
            <p className="mt-6 text-base leading-relaxed text-[var(--oat)]/75">
              Our standard 50-minute session is <strong className="text-[var(--oat)]">$200</strong>.
              With a valid plan, the current Medicare rebate is{" "}
              <strong className="text-[var(--oat)]">$89.50</strong> per session, so your out-of-pocket
              is about <strong className="text-[var(--oat)]">$110.50</strong>. Telehealth attracts the
              same rebate. Rebates are indexed each July, and the exact amount is confirmed at
              booking. A Mental Health Treatment Plan covers up to 10 rebated sessions per calendar
              year; an Eating Disorder Plan up to 40 over 12 months.
            </p>
            <div className="mt-9">
              <BookButton location="getting_started" />
            </div>
          </Section>
        </section>

        {/* TESTIMONIALS — renders only when consented quotes are supplied */}
        {TESTIMONIALS.length > 0 && (
          <Section eyebrow="In their words">
            <div className="grid gap-8 md:grid-cols-2">
              {TESTIMONIALS.map((t, i) => (
                <figure key={i} className="rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-7">
                  <blockquote className="font-display text-xl leading-snug text-[var(--plum)]">
                    “{t.quote}”
                  </blockquote>
                  {t.attribution && (
                    <figcaption className="mt-4 text-sm text-[var(--plum)]/60">
                      — {t.attribution}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </Section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
