import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HALAXY_URL, SITE_URL } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  component: AdhdHub,
  head: () => ({ links: [{ rel: "canonical", href: SITE_URL }] }),
});

const BOOK_URL = HALAXY_URL;

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
      "inline-flex items-center justify-center rounded-full bg-[var(--terracotta)] px-8 py-4 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 active:scale-[0.98] min-h-11 " +
      className
    }
  >
    {children}
  </a>
);

const textLink =
  "inline-flex text-sm font-medium underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]";

// Motion-aware hero visual: shows the poster still by default (SSR-safe) and only
// upgrades to the looping, muted video when the visitor has NOT requested reduced motion.
function HeroMotion() {
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
    <div className="relative min-h-[54vh] md:min-h-[88vh] bg-[var(--plum)]">
      {motion ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster="/hero-motion-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="/hero-motion.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/hero-motion-poster.jpg"
          alt="An unhurried moment of calm at golden hour"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
      )}
    </div>
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
    <section className="mx-auto max-w-6xl px-5 pb-28 md:pb-36">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PATHWAYS.map((c) => (
          <Link
            key={c.title}
            to={c.to}
            className="group flex flex-col rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-7 no-underline transition-all hover:-translate-y-0.5 hover:border-[var(--terracotta)]/40 hover:shadow-md"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--terracotta)]">{c.eyebrow}</p>
            <h3 className="mt-3 font-display text-xl leading-tight text-[var(--plum)]">{c.title}</h3>
            <p className="mt-2 flex-1 text-sm text-[var(--plum)]/70">{c.blurb}</p>
            <span className="mt-6 text-sm font-medium text-[var(--plum)] underline decoration-[var(--terracotta)] underline-offset-4 group-hover:text-[var(--terracotta)]">
              Explore →
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
        {/* 1 · HERO — full-bleed editorial split */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="grid md:grid-cols-2 md:items-stretch">
            <div className="flex flex-col justify-center px-5 py-16 md:py-28 md:pl-12 md:pr-14 lg:pl-20">
              <p className="text-xs font-medium uppercase tracking-[0.34em] text-[var(--terracotta)]">
                ADHD · Eating · Belonging
              </p>
              <h1 className="mt-7 max-w-[12ch] font-display text-[3.25rem] leading-[0.98] text-[var(--oat)] md:text-[5.25rem]">
                Care for the whole of you.
              </h1>
              <p className="mt-7 max-w-[34ch] text-lg leading-relaxed text-[var(--oat)]/85 md:text-xl">
                Neuro-affirming, Aboriginal-led therapy — in Perth and across Australia.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
                <BookButton location="hero" />
                <Link to="/start-here" className={textLink + " text-[var(--oat)]"}>
                  New here? Start here →
                </Link>
              </div>
            </div>
            <HeroMotion />
          </div>
        </section>

        {/* 2 · ONE STATEMENT — air + big type */}
        <section className="mx-auto max-w-3xl px-5 py-32 text-center md:py-44">
          <p className="mb-7 text-xs font-medium uppercase tracking-[0.28em] text-[var(--terracotta)]">
            You might recognise this
          </p>
          <h2 className="font-display text-[2.4rem] leading-[1.08] text-[var(--plum)] md:text-[4rem]">
            You were told it&apos;s just focus.
            <br />
            It never felt that simple.
          </h2>
          <p className="mx-auto mt-9 max-w-[36ch] text-lg text-[var(--plum)]/70 md:text-xl">
            Food, feelings, belonging — for ADHD brains, it&apos;s all connected.
          </p>
        </section>

        {/* 3 · HOW WE WORK — full-bleed split, image left */}
        <section className="bg-[var(--cream)]">
          <div className="grid items-stretch md:grid-cols-2">
            <div className="relative min-h-[52vh] md:min-h-[74vh]">
              <img
                src="/standing-plant.jpg"
                alt="A person standing at ease in a light, plant-filled space"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex flex-col justify-center px-5 py-16 md:px-14 md:py-28 lg:px-20">
              <p className="text-xs font-medium uppercase tracking-[0.26em] text-[var(--terracotta)]">How we work</p>
              <h2 className="mt-6 max-w-[16ch] font-display text-[2.1rem] leading-[1.05] text-[var(--plum)] md:text-[3.4rem]">
                We start with your nervous system — not a checklist.
              </h2>
              <p className="mt-7 max-w-[38ch] text-lg leading-relaxed text-[var(--plum)]/75">
                Unhurried, weight-neutral, and affirming of who you are.
              </p>
              <Link to="/approach" className={"mt-9 " + textLink + " text-[var(--plum)]"}>
                Read our approach →
              </Link>
            </div>
          </div>
        </section>

        {/* 4 · BELONGING — full-bleed split, image right */}
        <section className="bg-[var(--oat)]">
          <div className="grid items-stretch md:grid-cols-2">
            <div className="order-2 flex flex-col justify-center px-5 py-16 md:order-1 md:px-14 md:py-28 lg:px-20">
              <p className="text-xs font-medium uppercase tracking-[0.26em] text-[var(--terracotta)]">Belonging</p>
              <h2 className="mt-6 max-w-[15ch] font-display text-[2.1rem] leading-[1.05] text-[var(--plum)] md:text-[3.4rem]">
                A practice where you already belong.
              </h2>
              <p className="mt-7 max-w-[36ch] text-lg leading-relaxed text-[var(--plum)]/75">
                Aboriginal-led. LGBTQIA+ affirming. Neurodivergent by design.
              </p>
              <Link to="/our-story" className={"mt-9 " + textLink + " text-[var(--plum)]"}>
                Our story →
              </Link>
            </div>
            <div className="relative order-1 min-h-[52vh] md:order-2 md:min-h-[74vh]">
              <img
                src="/joy-belonging.jpg"
                alt="Shared, unguarded joy"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        {/* BREATH 1 — bold full-bleed */}
        <section className="relative min-h-[68vh] w-full overflow-hidden bg-[var(--plum)]">
          <img
            src="/shadow-ochre.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(46,26,34,0.72) 0%, rgba(46,26,34,0.28) 55%, rgba(46,26,34,0.5) 100%)" }}
          />
          <div className="relative mx-auto flex min-h-[68vh] max-w-4xl items-center justify-center px-5 text-center">
            <h2 className="max-w-[20ch] font-display text-[2.2rem] leading-[1.08] text-[var(--oat)] md:text-[3.6rem]">
              You don&apos;t need to have it figured out to begin.
            </h2>
          </div>
        </section>

        {/* 5 · WHERE TO BEGIN */}
        <section className="mx-auto max-w-6xl px-5 pb-12 pt-28 text-center md:pt-36">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-[var(--terracotta)]">Where to begin</p>
          <h2 className="font-display text-[2.1rem] leading-tight text-[var(--plum)] md:text-[3.4rem]">Find your next step.</h2>
        </section>
        <PathwayCards />

        {/* BREATH 2 — warm full-bleed lead into the close */}
        <section className="relative min-h-[56vh] w-full overflow-hidden">
          <img
            src="/golden-window.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(46,26,34,0.55) 0%, rgba(46,26,34,0.12) 60%)" }}
          />
        </section>

        {/* 6 · LET'S TALK — closing */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="grid items-stretch md:grid-cols-2">
            <div className="relative min-h-[48vh] md:min-h-[64vh]">
              <img
                src="/hands-coffee.jpg"
                alt="Coffee poured, an unhurried table"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex flex-col justify-center px-5 py-16 md:px-14 md:py-24 lg:px-20">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--terracotta)]">Getting started</p>
              <h2 className="mt-6 max-w-[14ch] font-display text-[2.5rem] leading-[1.03] text-[var(--oat)] md:text-[4rem]">
                Start with a free 15-minute call.
              </h2>
              <p className="mt-7 max-w-[34ch] text-lg text-[var(--oat)]/85">
                No pressure — just a chance to see if we&apos;re the right fit.
              </p>
              <div className="mt-10">
                <BookButton location="closing" />
              </div>
              <p className="mt-7 max-w-[48ch] text-sm text-[var(--oat)]/60">
                $200 per 50-minute session · about $110.50 out-of-pocket after the Medicare rebate with an
                eligible GP plan. Rebates indexed each July; confirmed at booking.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
