import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { HALAXY_URL, SITE_URL } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";

const TITLE = "Anchor — a free ADHD companion app | Body Belonging Clinic";
const DESCRIPTION =
  "Anchor is a free, eating-disorder-safe ADHD companion app from Body Belonging Clinic — gentle reminders to eat at regular times, weight-neutral, no streaks. Join the early-access list.";
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

const Logo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 1080 1080" className={className} aria-hidden="true">
    <path
      d="M326 262 L472 300 L472 486 L762 516 L762 856 L620 856 L620 690 L472 690 L472 856 L326 856 Z"
      fill="currentColor"
    />
  </svg>
);

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--plum)]/10 bg-[var(--plum)] text-[var(--oat)]">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Body Belonging Clinic — home">
          <span className="grid size-9 place-items-center rounded-full bg-[var(--oat)] text-[var(--plum)]">
            <Logo className="size-6" />
          </span>
          <span className="hidden font-display text-base font-medium leading-tight sm:block">
            Body Belonging<span className="opacity-60"> · ADHD Hub</span>
          </span>
        </Link>
        <nav className="ml-auto hidden items-center gap-6 text-sm md:flex" aria-label="Site navigation">
          <Link to="/" className="opacity-80 transition-opacity hover:opacity-100">
            Home
          </Link>
          <Link to="/start-here" className="opacity-80 transition-opacity hover:opacity-100">
            Start here
          </Link>
          <Link to="/our-story" className="opacity-80 transition-opacity hover:opacity-100">
            Our Story
          </Link>
          <Link
            to="/anchor"
            activeProps={{ className: "opacity-100 underline decoration-[var(--terracotta)] underline-offset-8" }}
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            Anchor
          </Link>
          <Link to="/letters" className="opacity-80 transition-opacity hover:opacity-100">
            Letters
          </Link>
          <Link to="/approach" className="opacity-80 transition-opacity hover:opacity-100">
            Our Approach
          </Link>
        </nav>
        <a
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("booking_click", { location: "anchor_header" })}
          className="ml-auto md:ml-4 inline-flex items-center justify-center rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 active:scale-[0.98] min-h-11"
        >
          <span className="hidden sm:inline">Book a free intro call</span>
          <span className="sm:hidden">Book</span>
        </a>
      </div>
    </header>
  );
}

function FloatingBook() {
  return (
    <a
      href={BOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("booking_click", { location: "anchor_floating" })}
      aria-label="Book a free 15-minute intro call"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center justify-center rounded-full bg-[var(--terracotta)] px-5 py-3 text-sm font-medium text-[var(--cream)] shadow-lg transition-all hover:brightness-110 active:scale-[0.98] min-h-11"
    >
      Book a free intro call
    </a>
  );
}

function AnchorPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]" id="top">
      <Header />

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
          rhythm. That is all it is, and that is the whole point.
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
            Most apps in this space quietly work against a brain like ours,
            turning eating into numbers and pressure. I am an eating disorder
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
            Anchor is in the final stretch of testing. Join the early-access
            list and I'll let you know the moment it's ready.
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
                try {
                  const { error } = await supabase
                    .from("lead_signups")
                    .insert({ email: trimmed, source: "anchor_waitlist" });
                  if (error) console.warn("lead_signups insert failed", error);
                } catch (err) {
                  console.warn("lead_signups insert threw", err);
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
              <input
                id="anchor-email"
                ref={emailRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
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
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--plum)] text-[var(--oat)]/80">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-4">
          <div className="border-t border-[var(--oat)]/15 pt-12">
            <div className="grid gap-10 md:grid-cols-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="grid size-9 place-items-center rounded-full bg-[var(--oat)] text-[var(--plum)]">
                    <Logo className="size-6" />
                  </span>
                  <span className="font-display text-base text-[var(--oat)]">
                    Body Belonging Clinic
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed">
                  3A Megalong Street, Nedlands WA 6009
                  <br />
                  <a
                    className="underline decoration-[var(--terracotta)] underline-offset-4"
                    href="mailto:admin@bodybelongingclinic.com.au"
                  >
                    admin@bodybelongingclinic.com.au
                  </a>
                  <br />
                  Telehealth across Australia.
                </p>
                <p className="mt-4 text-sm">
                  <Link
                    to="/"
                    className="underline decoration-[var(--terracotta)] underline-offset-4"
                  >
                    ← Back to ADHD Hub
                  </Link>
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--terracotta)]">
                  If you need help right now
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>Emergency — <strong className="text-[var(--oat)]">000</strong></li>
                  <li>Lifeline — <strong className="text-[var(--oat)]">13 11 14</strong></li>
                  <li>13YARN — <strong className="text-[var(--oat)]">13 92 76</strong></li>
                  <li>Butterfly — <strong className="text-[var(--oat)]">1800 33 4673</strong></li>
                </ul>
                <p className="mt-4 text-xs text-[var(--oat)]/60">
                  Education & wellbeing. Not a crisis service.
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--terracotta)]">
                  With respect
                </p>
                <p className="mt-4 text-sm leading-relaxed">
                  We acknowledge the Traditional Owners of the lands on which
                  we live and work, and pay our respects to Elders past and
                  present.
                </p>
                <p className="mt-4 text-xs">
                  <Link to="/our-story" className="underline decoration-[var(--terracotta)] underline-offset-4">
                    Our Story
                  </Link>
                  <span className="mx-2 opacity-40">·</span>
                  <Link to="/anchor" className="underline decoration-[var(--terracotta)] underline-offset-4">
                    Anchor
                  </Link>
                  <span className="mx-2 opacity-40">·</span>
                  <Link to="/letters" className="underline decoration-[var(--terracotta)] underline-offset-4">
                    Letters
                  </Link>
                  <span className="mx-2 opacity-40">·</span>
                  <Link to="/approach" className="underline decoration-[var(--terracotta)] underline-offset-4">
                    Our Approach
                  </Link>
                  <span className="mx-2 opacity-40">·</span>
                  <a href="/privacy" className="underline decoration-[var(--terracotta)] underline-offset-4">
                    Privacy
                  </a>
                  <span className="mx-2 opacity-40">·</span>
                  <span>© {new Date().getFullYear()} Body Belonging Clinic</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <FloatingBook />
    </div>
  );
}
