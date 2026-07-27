import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { HALAXY_URL, HERO_IMAGE, SITE_URL } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { SiteHeader, SiteFooter, Logo } from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  component: AdhdHub,
  head: () => ({
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
});

const BOOK_URL = HALAXY_URL;
const SESSION_IMAGE = "/approach-session.jpg"; // Lauren, warm in-session portrait
const SPACE_IMAGE = "/approach-feature.jpg"; // studio detail — crops safely to landscape

const SCRIM =
  "linear-gradient(to top, rgba(46,26,34,0.9) 0%, rgba(46,26,34,0.5) 45%, rgba(46,26,34,0.15) 100%)";

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

/** Portrait-safe image with an on-brand fallback. */
function StudioImage({ src, alt, aspect = "aspect-[4/5]", className = "" }: { src: string; alt: string; aspect?: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={"relative overflow-hidden rounded-3xl border border-[var(--plum)]/10 bg-[var(--cream)] shadow-md " + aspect + " " + className}>
      {failed || !src ? (
        <div className="grid h-full w-full place-items-center" style={{ background: "linear-gradient(140deg, var(--plum) 0%, color-mix(in oklab, var(--plum) 78%, var(--terracotta)) 100%)" }} role="img" aria-label={alt}>
          <Logo className="w-2/5 text-[var(--oat)] opacity-25" />
        </div>
      ) : (
        <img src={src} alt={alt} onError={() => setFailed(true)} className="h-full w-full object-cover" loading="lazy" decoding="async" />
      )}
    </div>
  );
}

/** Full-bleed landscape band (used with face-free detail shots that crop safely). */
function ImageBand({ src, children, minH = "min-h-[70vh]" }: { src: string; children: React.ReactNode; minH?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <section className={"relative w-full overflow-hidden bg-[var(--plum)] " + minH}>
      {!failed && (
        <img src={src} alt="" onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
      )}
      <div className="absolute inset-0" style={{ background: SCRIM }} />
      <div className={"relative mx-auto flex max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:pb-24 " + minH}>{children}</div>
    </section>
  );
}

const PATHWAYS = [
  { eyebrow: "Prepare", title: "Get ready for an assessment", blurb: "A free, no-pressure guide.", to: "/assessment-preparation" as const },
  { eyebrow: "Navigate", title: "The Australian care map", blurb: "Who does what, in plain language.", to: "/australian-adhd-care" as const },
  { eyebrow: "Food & brain", title: "Food stuff is brain stuff", blurb: "Weight-neutral. No rules, no shame.", to: "/food-and-the-adhd-brain" as const },
  { eyebrow: "Free tool", title: "Meet Anchor", blurb: "A gentle eating rhythm. No streaks.", to: "/anchor" as const },
];

function PathwayCards() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 md:pb-32">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PATHWAYS.map((c) => (
          <Link key={c.title} to={c.to} className="group flex flex-col rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-7 no-underline transition-all hover:border-[var(--terracotta)]/40 hover:shadow-md">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--terracotta)]">{c.eyebrow}</p>
            <h3 className="mt-3 font-display text-xl leading-tight text-[var(--plum)]">{c.title}</h3>
            <p className="mt-2 flex-1 text-sm text-[var(--plum)]/70">{c.blurb}</p>
            <span className="mt-6 text-sm font-medium text-[var(--plum)] underline decoration-[var(--terracotta)] underline-offset-4 group-hover:text-[var(--terracotta)]">Explore →</span>
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
        {/* 1 · HERO — two-column: big type + Lauren's portrait (shown whole) */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24 lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--terracotta)]">
                ADHD · Eating · Belonging
              </p>
              <h1 className="mt-6 max-w-[13ch] font-display text-[3rem] leading-[1.02] text-[var(--oat)] md:text-[5rem]">
                Care for the whole of you.
              </h1>
              <p className="mt-6 max-w-[32ch] text-lg text-[var(--oat)]/85 md:text-xl">
                Neuro-affirming, Aboriginal-led therapy — across Australia.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <BookButton location="hero" />
                <Link to="/start-here" className="text-sm font-medium text-[var(--oat)] underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]">
                  New here? Start here →
                </Link>
              </div>
            </div>
            <StudioImage src={HERO_IMAGE} alt="Lauren Lynch in the Body Belonging Clinic studio" aspect="aspect-[4/5]" className="mx-auto w-full max-w-md md:max-w-none" />
          </div>
        </section>

        {/* 2 · ONE STATEMENT — big, centred, almost no words */}
        <section className="mx-auto max-w-3xl px-5 py-28 text-center md:py-36">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.28em] text-[var(--terracotta)]">
            You might recognise this
          </p>
          <h2 className="font-display text-[2.25rem] leading-[1.1] text-[var(--plum)] md:text-6xl">
            You were told it&apos;s just focus.
            <br />
            It never felt that simple.
          </h2>
          <p className="mx-auto mt-8 max-w-[36ch] text-lg text-[var(--plum)]/70">
            Food, feelings, belonging — for ADHD brains, it&apos;s all connected.
          </p>
        </section>

        {/* 3 · HOW WE WORK — Lauren's in-session portrait + one line */}
        <section className="bg-[var(--cream)]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-24 md:grid-cols-2 md:py-32 lg:gap-20">
            <StudioImage src={SESSION_IMAGE} alt="A warm therapy session at Body Belonging Clinic" aspect="aspect-[4/5]" />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--terracotta)]">How we work</p>
              <h2 className="mt-5 font-display text-[2rem] leading-tight text-[var(--plum)] md:text-5xl">
                We start with your nervous system — not a checklist.
              </h2>
              <p className="mt-6 max-w-[38ch] text-lg text-[var(--plum)]/75">
                Unhurried, weight-neutral, and affirming of who you are.
              </p>
              <Link to="/approach" className="mt-8 inline-flex text-sm font-medium text-[var(--plum)] underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]">
                Read our approach →
              </Link>
            </div>
          </div>
        </section>

        {/* 4 · WHERE TO BEGIN — four cards */}
        <section className="mx-auto max-w-6xl px-5 pt-24 pb-10 text-center md:pt-32">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-[var(--terracotta)]">Where to begin</p>
          <h2 className="font-display text-[2rem] leading-tight text-[var(--plum)] md:text-5xl">Find your next step.</h2>
        </section>
        <PathwayCards />

        {/* 5 · CLOSING — immersive full-bleed studio detail + one CTA */}
        <ImageBand src={SPACE_IMAGE} minH="min-h-[70vh]">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--oat)]/80">Getting started</p>
          <h2 className="mt-5 max-w-[16ch] font-display text-[2.5rem] leading-[1.05] text-[var(--oat)] md:text-6xl">
            Start with a free 15-minute call.
          </h2>
          <p className="mt-6 max-w-[34ch] text-lg text-[var(--oat)]/85">
            No pressure — just a chance to see if we&apos;re the right fit.
          </p>
          <div className="mt-9">
            <BookButton location="closing" />
          </div>
          <p className="mt-6 max-w-[52ch] text-sm text-[var(--oat)]/60">
            $200 per 50-minute session · about $110.50 out-of-pocket after the Medicare rebate with an
            eligible GP plan. Rebates indexed each July; confirmed at booking.
          </p>
        </ImageBand>
      </main>
      <SiteFooter />
    </div>
  );
}
