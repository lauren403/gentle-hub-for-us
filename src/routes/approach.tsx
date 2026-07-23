import { createFileRoute, Link } from "@tanstack/react-router";
import { HALAXY_URL, SITE_URL, WHITEPAPER_PDF } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { SiteHeader, SiteFooter, Logo } from "@/components/site-chrome";

const TITLE = "Our Approach — The Body Belonging Model | Body Belonging Clinic";
const DESCRIPTION =
  "The Body Belonging Model: ADHD regulation from the inside out. Safety, notice, regulate, belong — a warm, evidence-honest, neuro-affirming framework from Body Belonging Clinic.";
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
      <a href="#main-content" className="skip-link">Skip to content</a>
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
          <Link to="/anchor" className="opacity-80 transition-opacity hover:opacity-100">
            Anchor
          </Link>
          <Link to="/letters" className="opacity-80 transition-opacity hover:opacity-100">
            Letters
          </Link>
          <Link
            to="/approach"
            className="opacity-100"
            activeProps={{ className: "opacity-100 underline decoration-[var(--terracotta)] underline-offset-8" }}
          >
            Our Approach
          </Link>
        </nav>

        <a
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("booking_click", { location: "approach_header" })}
          className="ml-auto md:ml-4 inline-flex items-center justify-center rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 active:scale-[0.98] min-h-11"
        >
          <span className="hidden sm:inline">Book a free intro call</span>
          <span className="sm:hidden">Book</span>
        </a>
      </div>
    </header>
  );
}

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
      <Header />
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
            The Body Belonging Model
          </h1>
          <p className="mt-6 font-display text-xl italic text-[var(--oat)]/85 md:text-2xl">
            ADHD regulation from the inside out.
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--oat)]/85">
            Most ADHD support stops at the diagnosis and the script. We start
            where they leave off — with a simple idea: attention, emotion and
            eating aren't three separate problems. They're three parts of one
            system — your body, and how safely it can sense and steady itself.
            So we work from the inside out.
          </p>
          <p className="mt-8 font-display text-xl italic leading-snug text-[var(--terracotta)] md:text-2xl">
            Rigorous international science on the body, the brain and food — brought into the room without the diet talk.
          </p>
        </div>
      </section>

      <MonogramDivider />

      {/* ONE SYSTEM */}
      <Section eyebrow="The foundation">
        <h2 className="font-display text-3xl leading-tight md:text-5xl">
          One system, not three problems.
        </h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--plum)]/85">
          <p>
            ADHD is a difference in self-regulation — of attention, yes, but
            also emotion, motivation and the body's own signals. There's a
            sense, called <em>interoception</em>, for reading your internal
            state: hunger, tension, the first flicker of overwhelm. In ADHD
            that sense often runs quiet — which is why feelings can arrive all
            at once, hunger arrives late, and overwhelm arrives without
            warning. Working gently at the level of the body — never
            forcefully — is how we help all three settle.
          </p>
        </div>
        <p className="mt-8 rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-5 text-sm leading-relaxed text-[var(--plum)]/60">
          This is how we read the research, and we're honest about it: the
          science is strongest for the link between the body, emotion and
          eating, and still emerging for ADHD. We hold it as a helpful lens —
          not a cure.
        </p>
      </Section>

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
                d: "An interest-based brain that runs on curiosity, not \u201Cshould\u201D.",
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
            One system, four dials — which is why your ADHD, your emotions and
            your relationship with food are not three coincidences.
          </p>
        </Section>
      </section>

      {/* FOUR MOVEMENTS */}
      <Section eyebrow="The framework">
        <h2 className="font-display text-3xl leading-tight md:text-5xl">
          The four movements.
        </h2>
        <div className="mt-10 space-y-5">
          {[
            {
              n: "1",
              label: "SAFETY",
              t: "First, safety.",
              body: "You can't steady a nervous system that doesn't feel safe. We begin with feeling safe, seen and unshamed — culturally safe and identity-affirming — before any strategy.",
              evidence: "safety before strategy is the backbone of trauma-informed care.",
            },
            {
              n: "2",
              label: "NOTICE",
              t: "Then, gentle noticing.",
              body: "We help you read your body's signals with curiosity and kindness, never control. Gentle, optional, and always weight-neutral — this is where our eating-disorder training matters most.",
              evidence: "gentle, weight-neutral interoceptive work drawn from eating-disorder practice — and we stay honest that the ADHD–interoception link is still emerging.",
            },
            {
              n: "3",
              label: "REGULATE",
              t: "Then, real skills.",
              body: "The things a prescription can't teach: working with your emotions and attention, and a gentle eating rhythm that suits an ADHD brain. Adding, never restricting.",
              evidence: "regular eating from CBT-E, and the self-regulation model of ADHD (Russell Barkley).",
            },
            {
              n: "4",
              label: "BELONG",
              t: "Held by belonging.",
              body: "Change lasts when it's held by belonging: self-compassion instead of shame, connection, and care that honours who you are. It's the part most support forgets.",
              evidence: "connection and self-compassion are among the best-evidenced protectors of mental health.",
            },
          ].map((m) => (
            <article
              key={m.n}
              className="rounded-3xl border border-[var(--plum)]/10 bg-[var(--cream)] p-7 md:p-9"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-display text-3xl text-[var(--terracotta)]">
                  {m.n}
                </span>
                <span className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
                  {m.label}
                </span>
              </div>
              <h3 className="mt-3 font-display text-2xl md:text-3xl">{m.t}</h3>
              <p className="mt-3 text-lg leading-relaxed text-[var(--plum)]/85">
                {m.body}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--plum)]/60">
                <span className="font-medium text-[var(--terracotta)]">The evidence: </span>
                {m.evidence}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm italic text-[var(--plum)]/60">
          Safety → Notice → Regulate → Belong. Four movements, one direction —
          inside out.
        </p>
      </Section>

      {/* EVIDENCE-HONEST */}
      <section className="bg-[var(--plum)] text-[var(--oat)]">
        <Section eyebrow="Our promise">
          <h2 className="font-display text-3xl leading-tight text-[var(--oat)] md:text-5xl">
            Evidence-honest by design.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--oat)]/85">
            The Body Belonging Model is our own synthesis — but every movement in it stands on established ground: eating-disorder practice, decades of self-regulation research, and the science of connection and self-compassion. We lead with what the research supports, we say plainly where it's still emerging, and we won't sell you a cure. That honesty isn't a disclaimer — it's how you know the rest is real.
          </p>
        </Section>
      </section>

      {/* CTA */}
      <Section eyebrow="Work with us">
        <h2 className="font-display text-3xl leading-tight md:text-5xl">
          Support built for how your brain actually works.
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--plum)]/85">
          This isn't care that ends when the hour does. The Model gives the work its shape, and the Anchor app and the Letters keep it with you between sessions.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={BOOK_URL}
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
            aria-label="Open the Body Belonging Model white paper PDF in a new tab"
            onClick={() => trackEvent("whitepaper_click", { location: "approach_cta" })}
            className="text-sm underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
          >
            Read the full framework →
          </a>
        </div>
        <p className="mt-6 text-sm text-[var(--plum)]/60">
          Not a crisis service. In an emergency call <strong>000</strong>, or
          Lifeline <strong>13 11 14</strong>. Rebates may apply with an
          eligible Mental Health Treatment Plan or Eating Disorder Plan.
        </p>
      </Section>
      </main>

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
                  <Link to="/start-here" className="underline decoration-[var(--terracotta)] underline-offset-4">
                    Start here
                  </Link>
                  <span className="mx-2 opacity-40">·</span>
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
                  <a
                    href="/privacy"
                    className="underline decoration-[var(--terracotta)] underline-offset-4"
                  >
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
    </div>
  );
}
