import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HALAXY_URL, SITE_URL } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import {
  Squiggle,
  BrushDivider,
  HandArrow,
  MarkHeart,
  MarkSpark,
  MarkCup,
  MarkWave,
  MarkAnchor,
} from "@/components/hand-drawn";

export const Route = createFileRoute("/")({
  component: AdhdHub,
  head: () => ({ links: [{ rel: "canonical", href: SITE_URL }] }),
});

const BOOK_URL = HALAXY_URL;
const SAGE = "#B7BC7A";
const SOFT = { fontVariationSettings: '"SOFT" 100, "WONK" 0' } as const;

const BookButton = ({
  children = "Book a free intro call",
  location = "generic",
  onPlum = false,
}: {
  children?: React.ReactNode;
  location?: string;
  onPlum?: boolean;
}) => (
  <a
    href={BOOK_URL}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackEvent("booking_click", { location })}
    className={
      "inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium transition-all hover:brightness-110 active:scale-[0.98] min-h-11 " +
      (onPlum ? "bg-[var(--terracotta)] text-[var(--cream)]" : "bg-[var(--terracotta)] text-[var(--cream)]")
    }
  >
    {children}
  </a>
);

// Hand-lettered section label — the drawn voice that replaces the mono kicker.
function Label({
  children,
  tone = "terracotta",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "terracotta" | "oat" | "ink";
  className?: string;
}) {
  const color =
    tone === "oat"
      ? "text-[var(--oat)]"
      : tone === "ink"
        ? "text-[#5c4a1e]"
        : "text-[var(--terracotta)]";
  return (
    <span
      className={`hand-label inline-flex items-center gap-2 ${color} ${className}`}
      style={{ transform: "rotate(-1.4deg)" }}
    >
      <span aria-hidden="true" className="text-lg leading-none opacity-70">
        ✳
      </span>
      {children}
    </span>
  );
}

const PILLAR_ICONS = [MarkHeart, MarkSpark, MarkCup, MarkWave];

// Cinematic full-bleed hero — the tree/typewriter film runs behind the words.
// Poster still by default (SSR-safe + reduced-motion), video only when motion is allowed.
function CinemaHero() {
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
    <section className="img-warm on-plum relative isolate flex min-h-[92vh] items-end overflow-hidden bg-[var(--forest-deep)] text-[var(--oat)]">
      {motion ? (
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          poster="/hub-tree-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="/hub-tree.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/hub-tree-poster.jpg"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      )}
      {/* cinematic scrim — dark at the base where the words sit, clear at the top */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(23,34,26,0.92) 0%, rgba(23,34,26,0.55) 32%, rgba(23,34,26,0.12) 60%, rgba(23,34,26,0.28) 100%)",
        }}
      />
      <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-28 md:pb-24">
        <Label tone="oat">You&apos;re in the right place</Label>
        <h1
          className="mt-5 max-w-[15ch] font-display text-[3.3rem] leading-[0.94] md:text-[6.6rem]"
          style={SOFT}
        >
          Pull up a chair.{" "}
          <span className="relative inline-block italic text-[var(--oat)]">
            Stay a while
            <Squiggle className="absolute -bottom-3 left-0 h-3 w-full text-[var(--terracotta)]" />
          </span>
          .
        </h1>
        <p className="mt-7 max-w-[48ch] text-lg leading-relaxed text-[var(--oat)]/90 md:text-xl">
          If your brain runs on feeling, forgets to eat, and won&apos;t switch off at night — this is
          for you. Real ADHD support for the whole of you, not just your focus: Aboriginal-led, safe
          around food, and never rushed.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
          <BookButton location="hero" />
          <a
            href="#approach"
            className="group inline-flex items-center gap-2 font-medium text-[var(--oat)] underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
          >
            See the approach
            <HandArrow className="h-4 w-6 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Matcha motion band — poster still by default, muted looping video only when motion is allowed.
function MatchaBand() {
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
    <div className="img-warm relative aspect-[4/5] overflow-hidden rounded-2xl">
      {motion ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster="/hub-matcha-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="/hub-matcha.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/hub-matcha-poster.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}

const PILLARS = [
  { n: "01", h: "It's emotion, not attention", p: "For many adults the hardest part isn't focus — it's regulating feeling. That's learnable, and it's where we start." },
  { n: "02", h: "Medication isn't the whole answer", p: "Pro-treatment, and honest: a script treats symptoms, not skills, self-understanding or environment. That gap is the work." },
  { n: "03", h: "Food, the ED-safe way", p: "Weight-neutral, additive, no supplements-as-cure — something only an ANZAED-credentialed clinic can truthfully offer." },
  { n: "04", h: "Your nervous system & belonging", p: "Safety first. Culturally safe, LGBTQIA+ affirming — because the work only begins once you feel you belong." },
];

const LETTERS = [
  { img: "/hub-books.jpg", meta: "Letter · 6 min", title: "Why a brain like ours forgets to eat", to: "/letters/why-a-brain-like-ours-forgets-to-eat" as const },
  { img: "/hub-heart.jpg", meta: "Letter · 5 min", title: "The hardest part isn't focus — it's feeling", to: "/letters/the-hardest-part-isnt-focus-its-feeling" as const },
  { img: "/hub-rest.jpg", meta: "Letter · 6 min", title: "Your nervous system, and a place to belong", to: "/letters/your-nervous-system-and-a-place-to-belong" as const },
];

function AdhdHub() {
  return (
    <div id="top" className="min-h-dvh bg-[var(--cream)] text-[var(--plum)]">
      <SiteHeader location="home" />
      <main id="main-content" tabIndex={-1}>
        {/* 1 · HERO — cinematic film */}
        <CinemaHero />

        {/* 1b · MANIFESTO — the whole-body story, loud */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="mx-auto max-w-5xl px-5 py-20 md:py-28">
            <Label tone="terracotta">Why we exist</Label>
            <p className="mt-6 font-display text-[2rem] leading-[1.12] md:text-[3.4rem]" style={SOFT}>
              ADHD isn't an attention problem. It's a{" "}
              <span className="italic text-[var(--terracotta)]">whole-body story</span> — the way you
              feel everything, forget to eat, run late, and lie awake. We help with the parts a diagnosis
              and a prescription were never going to reach.
            </p>
          </div>
        </section>

        {/* 2 · APPROACH — sage */}
        <section id="approach" style={{ backgroundColor: SAGE }} className="text-[var(--plum)]">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <div className="max-w-3xl">
              <Label tone="ink">The approach</Label>
              <h2 className="mt-4 font-display text-[2.1rem] leading-[1.05] md:text-[3.6rem]" style={SOFT}>
                Four things Australian ADHD care still isn't{" "}
                <span className="relative inline-block">
                  saying out loud
                  <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-[var(--terracotta)]" />
                </span>
                .
              </h2>
              <p className="mt-7 max-w-[54ch] text-lg leading-relaxed text-[var(--plum)]/80">
                We bring the world's leading ADHD science home to Australia and tell the truth with it —
                no hype, no cure, no diet rules. Just the real work a prescription leaves undone.
              </p>
            </div>
            <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {PILLARS.map((p, i) => {
                const Icon = PILLAR_ICONS[i];
                return (
                  <div key={p.n} className="border-t-2 border-[var(--plum)]/20 pt-6">
                    <div className="flex items-center gap-3">
                      <Icon className="size-9 text-[var(--terracotta)]" />
                      <span className="font-hand text-2xl text-[var(--plum)]/55">{p.n}</span>
                    </div>
                    <h3 className="mt-4 font-display text-xl leading-snug">{p.h}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--plum)]/78">{p.p}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3 · VIDEO — terracotta */}
        <section className="bg-[var(--terracotta)] text-[var(--cream)]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28 lg:gap-16">
            <MatchaBand />
            <div>
              <Label tone="oat">Food, held gently</Label>
              <h2 className="mt-5 font-display text-[2rem] leading-[1.05] md:text-[3.4rem]" style={SOFT}>
                Food is brain stuff — held without the{" "}
                <span className="relative inline-block">
                  diet noise
                  <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-[var(--oat)]" />
                </span>
                .
              </h2>
              <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-[var(--cream)]/88">
                We take nutrition and the ADHD brain seriously. And because we're an eating-disorder-informed clinic,
                we do it without the restriction and supplement hype that hurts neurodivergent people.
              </p>
              <p className="mt-5 max-w-[42ch] font-mono text-sm text-[var(--cream)]/70">
                Weight-neutral · additive, not restrictive · guided by testing, not guessing.
              </p>
            </div>
          </div>
        </section>

        {/* 4 · LETTERS — cream */}
        <section id="letters" className="bg-[var(--cream)]">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <Label tone="terracotta">Words from the chair</Label>
                <h2 className="mt-4 font-display text-[2rem] leading-tight md:text-[3.2rem]" style={SOFT}>Letters, to read slowly</h2>
              </div>
              <span className="font-hand text-lg text-[var(--plum)]/50">evidence-honest, unhurried</span>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {LETTERS.map((l) => (
                <Link key={l.to} to={l.to} className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--plum)]/10 bg-[var(--oat)] no-underline transition-all hover:-translate-y-1.5 hover:border-[var(--terracotta)]/40">
                  <div className="img-warm aspect-[16/11] overflow-hidden">
                    <img src={l.img} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                  </div>
                  <div className="p-7">
                    <span className="font-hand text-base text-[var(--terracotta)]">{l.meta}</span>
                    <h3 className="mt-2 font-display text-xl leading-tight md:text-2xl">{l.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 5 · ANCHOR — oat */}
        <section id="anchor" className="bg-[var(--oat)]">
          <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-24 lg:gap-16">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-3">
                <MarkAnchor className="size-9 text-[var(--terracotta)]" />
                <Label tone="terracotta">The free tool</Label>
              </div>
              <h2 className="mt-4 font-display text-[2.1rem] leading-[1.05] md:text-[3.2rem]" style={SOFT}>Anchor — a gentle eating rhythm.</h2>
              <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-[var(--plum)]/80">
                No calories, no weighing, no streaks, no food rules. A quiet, eating-disorder-safe way to help an ADHD
                brain find a steady rhythm. Free, and yours to keep.
              </p>
              <Link to="/anchor" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--terracotta)] px-8 py-4 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 min-h-11">
                Open Anchor
                <HandArrow className="h-4 w-6 text-[var(--cream)] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="img-warm order-1 overflow-hidden rounded-2xl md:order-2">
              <img src="/hub-hands.jpg" alt="Hands, held together in warm light" loading="lazy" decoding="async" className="aspect-[5/4] h-full w-full object-cover" />
            </div>
          </div>
        </section>

        {/* 6 · WHO — plum */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="grid md:grid-cols-2 md:items-center">
            <div className="img-warm on-plum relative min-h-[52vh] md:min-h-[68vh]">
              <img src="/hub-session.jpg" alt="Lauren Lynch at Body Belonging Clinic" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="px-5 py-16 md:px-14 md:py-24 lg:px-20">
              <Label tone="terracotta">The person, not a platform</Label>
              <h2 className="mt-4 max-w-[16ch] font-display text-[2rem] leading-[1.05] md:text-[3rem]" style={SOFT}>Who's holding the space</h2>
              <BrushDivider className="mt-5 h-2 w-40 text-[var(--terracotta)]" />
              <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-[var(--oat)]/82">
                Lauren Lynch — Accredited Mental Health Social Worker, ANZAED credentialed eating-disorder clinician,
                and a proud Yorta Yorta woman. The Hub is the reading room; the clinic is the front door.
              </p>
              <a href="https://www.bodybelongingclinic.com.au" className="mt-7 inline-flex font-medium text-[var(--oat)] underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]">
                Meet Lauren &amp; book at the clinic →
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
