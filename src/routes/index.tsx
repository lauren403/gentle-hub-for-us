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

const kicker = "font-mono text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]";

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
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
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
        {/* 1 · HERO — plum */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="grid md:grid-cols-2 md:items-stretch">
            <div className="flex flex-col justify-center px-5 py-16 md:py-28 md:pl-12 md:pr-14 lg:pl-20">
              <p className={kicker}>A hub for the ADHD nervous system</p>
              <h1 className="mt-7 max-w-[13ch] font-display text-[3rem] leading-[0.98] md:text-[5.4rem]" style={SOFT}>
                ADHD isn't an attention problem. It's a{" "}
                <span className="italic text-[var(--terracotta)]">whole-body story</span>.
              </h1>
              <p className="mt-7 max-w-[40ch] text-lg leading-relaxed text-[var(--oat)]/85 md:text-xl">
                The part the diagnosis and the prescription didn't reach — emotion, food, rhythm, belonging.
                Aboriginal-led, eating-disorder-safe, neurodivergent by design.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <BookButton location="hero" />
                <a href="#approach" className="font-medium text-[var(--oat)] underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]">
                  See the approach →
                </a>
              </div>
            </div>
            <div className="relative min-h-[54vh] md:min-h-[86vh]">
              <img src="/hub-lounge.jpg" alt="A warm, unhurried room at the clinic" className="absolute inset-0 h-full w-full object-cover" loading="eager" decoding="async" />
            </div>
          </div>
        </section>

        {/* 2 · APPROACH — sage */}
        <section id="approach" style={{ backgroundColor: SAGE }} className="text-[var(--plum)]">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5c4a1e]">The approach</p>
            <h2 className="mt-4 max-w-[18ch] font-display text-[2.1rem] leading-[1.05] md:text-[3.6rem]" style={SOFT}>
              Four things Australian ADHD care still isn't saying out loud.
            </h2>
            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-[var(--plum)]/80">
              We import the leading edge — Barkley, Brown, Dodson — and ground it here, honestly. No hype, no cure,
              no diet noise. Just the work the script leaves undone.
            </p>
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {PILLARS.map((p) => (
                <div key={p.n}>
                  <div className="font-display text-4xl text-[var(--terracotta)]" style={SOFT}>{p.n}</div>
                  <h3 className="mt-3 font-display text-xl leading-snug">{p.h}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--plum)]/78">{p.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · VIDEO — terracotta */}
        <section className="bg-[var(--terracotta)] text-[var(--cream)]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28 lg:gap-16">
            <MatchaBand />
            <div>
              <h2 className="font-display text-[2rem] leading-[1.05] md:text-[3.4rem]" style={SOFT}>
                Food is brain stuff — held without the diet noise.
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
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-display text-[2rem] leading-tight md:text-[3.2rem]" style={SOFT}>Letters, to read slowly</h2>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--plum)]/55">evidence-honest · unhurried</span>
            </div>
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {LETTERS.map((l) => (
                <Link key={l.to} to={l.to} className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--plum)]/10 bg-white no-underline transition-all hover:-translate-y-1.5 hover:border-[var(--terracotta)]/40">
                  <div className="aspect-[16/11] overflow-hidden">
                    <img src={l.img} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                  </div>
                  <div className="p-7">
                    <p className={kicker}>{l.meta}</p>
                    <h3 className="mt-3 font-display text-xl leading-tight md:text-2xl">{l.title}</h3>
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
              <p className={kicker}>The free tool</p>
              <h2 className="mt-4 font-display text-[2.1rem] leading-[1.05] md:text-[3.2rem]" style={SOFT}>Anchor — a gentle eating rhythm.</h2>
              <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-[var(--plum)]/80">
                No calories, no weighing, no streaks, no food rules. A quiet, eating-disorder-safe way to help an ADHD
                brain find a steady rhythm. Free, and yours to keep.
              </p>
              <Link to="/anchor" className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--terracotta)] px-8 py-4 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 min-h-11">
                Open Anchor →
              </Link>
            </div>
            <div className="order-1 overflow-hidden rounded-2xl md:order-2">
              <img src="/hub-hands.jpg" alt="Hands, held together in warm light" loading="lazy" decoding="async" className="aspect-[5/4] h-full w-full object-cover" />
            </div>
          </div>
        </section>

        {/* 6 · WHO — plum */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="grid md:grid-cols-2 md:items-center">
            <div className="relative min-h-[52vh] md:min-h-[68vh]">
              <img src="/hub-session.jpg" alt="Lauren Lynch at Body Belonging Clinic" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="px-5 py-16 md:px-14 md:py-24 lg:px-20">
              <h2 className="max-w-[16ch] font-display text-[2rem] leading-[1.05] md:text-[3rem]" style={SOFT}>Who's holding the space</h2>
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
