import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HALAXY_URL,
  ANCHOR_URL,
  HERO_IMAGE,
  FOOD_IMAGE,
  BELONGING_IMAGE,
} from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";
import { isLikelySpam, looksLikeEmail } from "@/lib/spam-guard";

export const Route = createFileRoute("/")({
  component: AdhdHub,
});

const BOOK_URL = HALAXY_URL;

// Real, consented testimonials only. COMPLIANCE (National Law advertising rules):
// keep each quote to the EXPERIENCE of care — feeling heard, safe, understood, the
// space itself. NEVER include specific symptoms, diagnoses, treatments, or outcome/
// "cure" claims. Attribution should be non-identifying and consented (e.g. initials,
// "a client", "via telehealth"). This whole section stays hidden while the array is empty.
const TESTIMONIALS: { quote: string; attribution?: string }[] = [];

const Logo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 1080 1080" className={className} aria-hidden="true">
    <path
      d="M326 262 L472 300 L472 486 L762 516 L762 856 L620 856 L620 690 L472 690 L472 856 L326 856 Z"
      fill="currentColor"
    />
  </svg>
);

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
      "inline-flex items-center justify-center rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 active:scale-[0.98] min-h-11 " +
      className
    }
  >
    {children}
  </a>
);


const NAV = [
  { id: "reframe", label: "Reframe" },
  { id: "medication", label: "Medication" },
  { id: "food", label: "Food" },
  { id: "services", label: "Services" },
  { id: "faq", label: "FAQ" },
];

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--plum)]/10 bg-[var(--plum)] text-[var(--oat)]">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Body Belonging Clinic — home">
          <span className="grid size-9 place-items-center rounded-full bg-[var(--oat)] text-[var(--plum)]">
            <Logo className="size-6" />
          </span>
          <span className="hidden font-display text-base font-medium leading-tight sm:block">
            Body Belonging<span className="opacity-60"> · ADHD Hub</span>
          </span>
        </a>
        <nav className="ml-auto hidden items-center gap-6 text-sm md:flex" aria-label="Section navigation">
          <Link to="/start-here" className="opacity-80 transition-opacity hover:opacity-100">
            Start here
          </Link>
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              {n.label}
            </a>
          ))}
          <Link
            to="/our-story"
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            Our Story
          </Link>
          <Link
            to="/anchor"
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            Anchor
          </Link>
          <Link
            to="/letters"
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            Letters
          </Link>
          <Link
            to="/approach"
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            Our Approach
          </Link>

        </nav>
        <BookButton className="ml-auto md:ml-4">
          <span className="hidden sm:inline">Book a free intro call</span>
          <span className="sm:hidden">Book</span>
        </BookButton>
      </div>
    </header>
  );
}

function FloatingCta() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-4 md:bottom-6">
      <a
        href={BOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book a free 15-minute intro call (opens in a new tab)"
        onClick={() => trackEvent("booking_click", { location: "floating_cta" })}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[var(--plum)] px-5 py-3 text-sm font-medium text-[var(--cream)] shadow-lg shadow-[var(--plum)]/20 transition-transform hover:-translate-y-0.5 min-h-11"
      >
        <span className="size-2 rounded-full bg-[var(--terracotta)]" aria-hidden />
        Book a free 15-min intro call
      </a>
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
    <section
      id={id}
      className={"mx-auto max-w-4xl px-5 py-20 md:py-28 " + className}
    >
      {eyebrow && (
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--terracotta)]">
          {eyebrow}
        </p>
      )}
      {children}
    </section>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 border-l-2 border-[var(--terracotta)] pl-6 font-display text-2xl leading-snug text-[var(--plum)] md:text-3xl">
      {children}
    </blockquote>
  );
}

/**
 * Editorial image slot with an on-brand graceful fallback.
 * If the src file is missing (or fails to load), we render a
 * plum-gradient block with the "h" monogram in cream — so the
 * layout always feels intentional even before real studio
 * photography is dropped into /public.
 */
function StudioImage({
  src,
  alt,
  className = "",
  aspect = "aspect-[4/5]",
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
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
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

function AdhdHub() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showAppSoon, setShowAppSoon] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const mountedAtRef = useRef<number>(Date.now());
  const emailInputRef = useRef<HTMLInputElement>(null);

  const anchorConfigured = ANCHOR_URL !== "#";

  const handleAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent("app_click", { configured: anchorConfigured });
    if (anchorConfigured) return; // let the link open in a new tab
    e.preventDefault();
    setShowAppSoon(true);
    const target = document.getElementById("signup");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => emailInputRef.current?.focus(), 400);
  };



  return (
    <div id="top" className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]">
      <Header />
      <main id="main-content" tabIndex={-1}>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid items-center gap-12 md:grid-cols-[1.15fr_1fr] md:gap-16">
            <div>
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[var(--terracotta)]">
                The ADHD hub · Body Belonging Clinic
              </p>
              <h1 className="font-display text-4xl leading-[1.03] md:text-6xl lg:text-[4.75rem]">
                ADHD isn't an attention problem.
                <br />
                <span className="italic text-[var(--terracotta)]">It's a whole-body story.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--plum)]/80 md:text-xl">
                ADHD care that doesn't stop at the diagnosis and the script. We work where they tap out — food, the body, emotion, the nervous system — the parts most services split across three separate waitlists. Aboriginal-led, queer-affirming, weight-neutral. Because food stuff is brain stuff.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <BookButton>Book a free 15-minute intro call</BookButton>
                <a
                  href="#reframe"
                  className="text-sm font-medium text-[var(--plum)] underline decoration-[var(--terracotta)] decoration-2 underline-offset-4 hover:text-[var(--terracotta)]"
                >
                  Read the reframe ↓
                </a>
              </div>
              <p className="mt-8 max-w-lg text-xs leading-relaxed text-[var(--plum)]/60">
                Not a crisis service. In an emergency call <strong>000</strong>, or
                Lifeline <strong>13 11 14</strong>.
              </p>
            </div>
            <StudioImage
              src={HERO_IMAGE}
              alt="Body Belonging Clinic studio — a warm, calm space."
              aspect="aspect-[4/5]"
              className="mx-auto w-full max-w-md md:max-w-none"
            />
          </div>
        </div>
      </section>

      {/* warm divider */}
      <div aria-hidden className="mx-auto flex max-w-4xl items-center gap-4 px-5">
        <span className="h-px flex-1 bg-[var(--plum)]/15" />
        <Logo className="size-4 text-[var(--terracotta)] opacity-70" />
        <span className="h-px flex-1 bg-[var(--plum)]/15" />
      </div>

      {/* REFRAME */}
      <Section id="reframe" eyebrow="The reframe">
        <h2 className="font-display text-3xl leading-tight md:text-5xl">
          The hardest part usually isn't focus. It's feeling.
        </h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--plum)]/85">
          <p>
            ADHD is a difference in how the brain regulates attention, emotion, motivation and action, not a shortage of attention. For so many of us the loudest part is emotion, feelings that arrive fast and are hard to turn down. That is not a character flaw, it is how the brain is wired.
          </p>
        </div>
        <PullQuote>
          "The hardest part of ADHD for many adults isn't focus. It's emotion —
          and emotion is something you can learn to work <em>with</em>, not against."
        </PullQuote>
        <p className="mt-8 text-sm">
          <Link
            to="/approach"
            className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
          >
            Our approach → The Body Belonging Model
          </Link>
        </p>
      </Section>

      {/* MEDICATION */}
      <section id="medication" className="bg-[var(--cream)]">
        <Section eyebrow="Medication">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            Medication is often the right first step. It's rarely the whole answer.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--plum)]/85">
            <p>
              A prescription can change the conditions for functioning, and it cannot teach you to plan, to cope, to eat, or to understand yourself. That part is the work we do here, honestly, and never anti-medication.
            </p>
          </div>
          <div className="mt-10 rounded-xl border border-[var(--plum)]/10 bg-[var(--oat)] p-5 text-sm leading-relaxed text-[var(--plum)]/80">
            <strong className="text-[var(--plum)]">A note on scope:</strong> We
            provide therapy and support. We don't diagnose ADHD or prescribe —
            where that's the next step, we'll help you find the right person.
          </div>
        </Section>
      </section>

      {/* FOOD */}
      <Section id="food" eyebrow="Food & ADHD">
        <div className="grid items-start gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
          <div>
            <h2 className="font-display text-3xl leading-tight md:text-5xl lg:text-[3.25rem]">
              Food stuff is brain stuff.
            </h2>
            <p className="mt-5 font-display text-xl italic leading-snug text-[var(--terracotta)] md:text-2xl">
              The serious science on food and the brain — the voice that's been missing.
            </p>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--plum)]/85">
              <p>
                A brain like ours can lose track of hunger until eating swings from forgotten all day to all at once by night. Because we are an ANZAED-accredited eating disorder clinic, we can talk about food and ADHD without the restriction, the calorie-counting and the supplement-hype that can quietly harm neurodivergent people. Weight-neutral, always.
              </p>
              <p>
                <Link
                  to="/adhd-and-eating"
                  className="inline-flex items-center text-base font-medium underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
                >
                  Read the full guide to ADHD and eating →
                </Link>
                <br />
                <Link
                  to="/food-and-the-adhd-brain"
                  className="mt-3 inline-flex items-center text-base font-medium underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
                >
                  The honest science on food &amp; the ADHD brain →
                </Link>
              </p>
            </div>

          </div>
          <StudioImage
            src={FOOD_IMAGE}
            alt="A gentle, unfussy still life — food as care, not rules."
            aspect="aspect-[4/5]"
            className="md:sticky md:top-24"
          />
        </div>
        <PullQuote>
          "We take nutrition and ADHD seriously — and because we're an
          eating-disorder-informed clinic, we do it without the restrictive,
          hype-y framing that can hurt neurodivergent people."
        </PullQuote>
      </Section>

      {/* NERVOUS SYSTEM & BELONGING */}
      <section className="bg-[var(--cream)]">
        <Section eyebrow="The Belonging Room">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            Your nervous system, and a place to belong.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--plum)]/85">
            <p>
              ADHD runs on an interest-based nervous system, and it settles through safety and connection, not pressure. That is the whole idea behind the name. The overlap other services tend to split apart — ADHD, the body, food, feeling — held in one room. Here you are met as a whole person, in the body you are actually in, among people who get it.
            </p>
          </div>
        </Section>
      </section>

      {/* BELONGING */}
      <section className="bg-[var(--plum)] text-[var(--oat)]">
        <Section eyebrow="Belonging & the nervous system">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_0.9fr] md:gap-14">
            <div>
              <h2 className="font-display text-3xl leading-tight text-[var(--oat)] md:text-5xl lg:text-[3.25rem]">
                Your body belongs here too.
              </h2>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--oat)]/85">
                <p>
                  A lot of ADHD support skips straight to strategies while the body
                  is still braced. We start where it actually lives — in the nervous
                  system — with somatic, felt-sense work alongside the practical
                  skills.
                </p>
                <p>
                  This is an Aboriginal-led practice. It is LGBTQIA+ affirming and
                  culturally safe by design, not as an afterthought. Feeling safe,
                  and feeling like you belong in the room, is where the work
                  actually becomes possible.
                </p>
              </div>
            </div>
            <StudioImage
              src={BELONGING_IMAGE}
              alt="A quiet, grounding scene from the Body Belonging Clinic studio."
              aspect="aspect-[4/5]"
              className="border-[var(--oat)]/15"
            />
          </div>
        </Section>
      </section>

      {/* WHO WE'RE FOR */}
      <Section eyebrow="Who we're for">
        <h2 className="font-display text-3xl leading-tight md:text-5xl">
          If any of this sounds familiar, you're in the right place.
        </h2>
        <ul className="mt-10 grid gap-x-10 gap-y-4 text-lg leading-relaxed text-[var(--plum)]/85 md:grid-cols-2">
          {[
            "You were diagnosed later in life — or you're still on a waitlist.",
            "You're a woman who got missed the first (or fifth) time around.",
            "You're AuDHD — autistic and ADHD — and generic advice doesn't fit.",
            "ADHD is tangled up with food, eating, or how you feel in your body.",
            "You're LGBTQIA+, First Nations, or tired of services that don't get you.",
            "Medication helped some things, and left others exactly where they were.",
            "The loudest part of your ADHD is the feelings, not the focus.",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span
                className="mt-2 size-1.5 flex-none rounded-full bg-[var(--terracotta)]"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* THE HONEST PROMISE */}
      <section className="bg-[var(--plum)] text-[var(--oat)]">
        <Section eyebrow="The honest version">
          <h2 className="font-display text-3xl leading-tight text-[var(--oat)] md:text-5xl">
            We can't give you endless hours. No one honestly can.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--oat)]/85">
            <p>
              So here's what we actually promise. Undivided attention in the room — no clock-watching, no being quietly moved along. And a way of working that keeps holding you after you leave it: the Body Belonging Model gives the work a spine, the Anchor app sits in your pocket, and the Letters are here at 2am when the session is days away.
            </p>
            <p>
              Real care doesn't pretend the calendar is infinite. It makes the hour count, and it doesn't disappear when the hour ends.
            </p>
          </div>
        </Section>
      </section>

      {/* EVIDENCE SPINE */}
      <section className="bg-[var(--cream)]">
        <Section eyebrow="Not invented on a whim">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            A new model, built from established parts.
          </h2>
          <p className="mt-8 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
            The Body Belonging Model is our own synthesis. Every piece of it stands on ground someone else already tested.
          </p>
          <ul className="mt-8 space-y-4 border-l-2 border-[var(--terracotta)] pl-6 text-lg leading-relaxed text-[var(--plum)]/85">
            <li className="max-w-[64ch]">Regular eating — the steady rhythm at the centre of the food work — comes straight from established eating-disorder treatment (CBT-E), not wellness trends.</li>
            <li className="max-w-[64ch]">Treating ADHD as a difference in self-regulation, not willpower, follows decades of research from clinicians like Russell Barkley.</li>
            <li className="max-w-[64ch]">Starting with the nervous system and safety draws on the science of interoception and regulation — and where that science is still emerging for ADHD, we say so out loud.</li>
            <li className="max-w-[64ch]">Self-compassion as the foundation is one of the better-evidenced tools in mental health, not a soft add-on.</li>
            <li className="max-w-[64ch]">All of it held to ANZAED eating-disorder standards and Accredited Mental Health Social Worker accreditation.</li>
          </ul>
          <p className="mt-8 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
            We'll always tell you which parts are proven and which are still emerging. That honesty is the point — it's how you know the rest is real.
          </p>
        </Section>
      </section>

      {/* WHAT ACTUALLY HAPPENS */}
      <Section eyebrow="What actually happens">
        <h2 className="font-display text-3xl leading-tight md:text-5xl">
          What the work looks like — and how you'll know it's working.
        </h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--plum)]/85">
          <p>
            The first session is mostly listening: where you are, what's hard, and what you've already tried that didn't stick. From there we work in a clear direction — safety first, then noticing, then real skills, then the belonging that makes change hold. No mystery, no filler, no homework for its own sake.
          </p>
          <p>
            You won't need a testimonial to tell you it's working. You'll notice it yourself: eating steadies before it's ever perfect, the 2am spiral loses some of its grip, you stop translating yourself in the room, and the shame gets quieter while the everyday stuff gets a little easier. We won't promise a cure. We'll show you honest change — and we'll name it plainly when it isn't happening yet.
          </p>
        </div>
      </Section>

      {/* SERVICES */}
      <section id="services" className="bg-[var(--cream)]">
        <Section eyebrow="Both sides of the chair">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            Support built for how your brain actually works.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              {
                t: "Post-diagnosis integration",
                d: "Making sense of a diagnosis that reframes your whole story — gently, at your pace, without a rebrand.",
              },
              {
                t: "Waiting well",
                d: "Support before a formal diagnosis: naming what's happening, building coping, and steadying the wait.",
              },
              {
                t: "Emotional regulation & everyday functioning",
                d: "Skills for rejection sensitivity, overwhelm, task paralysis and the emotional side that runs the show.",
              },
              {
                t: "ADHD & food, without the diet talk",
                d: "A weight-neutral, sensory-aware conversation about eating rhythms — no meal plans, no rules, no shame.",
              },
              {
                t: "Identity-affirming therapy",
                d: "Aboriginal-led, LGBTQIA+ affirming, neurodivergent-affirming space — you don't have to translate yourself here.",
              },
            ].map((s) => (
              <article
                key={s.t}
                className="rounded-2xl border border-[var(--plum)]/10 bg-[var(--oat)] p-6 transition-shadow hover:shadow-sm"
              >
                <h3 className="font-display text-xl">{s.t}</h3>
                <p className="mt-2 text-[var(--plum)]/75">{s.d}</p>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <BookButton>Book a free 15-minute intro call</BookButton>
          </div>
        </Section>
      </section>

      {/* APP */}
      <Section eyebrow="A free companion app">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="font-display text-3xl leading-tight md:text-5xl">
              Meet <span className="italic text-[var(--terracotta)]">Anchor</span>.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--plum)]/85">
              A gentle, weight-neutral eating-rhythm app for ADHD brains.
              No calories. No weight. No streaks. No food rules. Just quiet
              nudges toward eating like a person who's cared for.
            </p>
            <a
              href={anchorConfigured ? ANCHOR_URL : "#signup"}
              target={anchorConfigured ? "_blank" : undefined}
              rel={anchorConfigured ? "noopener noreferrer" : undefined}
              onClick={handleAppClick}
              className="mt-8 inline-flex items-center justify-center rounded-full border border-[var(--plum)] px-6 py-3 text-sm font-medium text-[var(--plum)] transition-colors hover:bg-[var(--plum)] hover:text-[var(--oat)] min-h-11"
            >
              Get the free app
            </a>
            {showAppSoon && !anchorConfigured && (
              <p
                role="status"
                className="mt-4 text-sm text-[var(--plum)]/75"
              >
                Coming soon — join the list below to hear when Anchor launches.
              </p>
            )}

          </div>
          <div
            className="mx-auto grid size-40 place-items-center rounded-3xl bg-[var(--plum)] text-[var(--oat)] md:size-48"
            aria-hidden
          >
            <Logo className="size-20 md:size-24" />
          </div>
        </div>
      </Section>

      {/* GETTING STARTED */}
      <section className="bg-[var(--plum)] text-[var(--oat)]">
        <Section eyebrow="A soft place to land">
          <h2 className="font-display text-3xl leading-tight text-[var(--oat)] md:text-5xl">
            How to begin — and what Medicare covers.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--oat)]/85">
            <p>
              With an eligible Mental Health Treatment Plan or Eating Disorder Plan
              from a GP, Medicare rebates <strong>may apply</strong> to sessions
              with an Accredited Mental Health Social Worker. Your GP is the right
              person to confirm eligibility.
            </p>
            <div className="rounded-2xl border border-[var(--oat)]/15 bg-[var(--oat)]/5 p-6">
              <p className="text-sm uppercase tracking-widest text-[var(--terracotta)]">
                Your clinician
              </p>
              <p className="mt-3 font-display text-xl text-[var(--oat)]">
                Lauren Lynch
              </p>
              <p className="mt-1 text-[var(--oat)]/80">
                Accredited Mental Health Social Worker (AASW) · ANZAED
                Credentialed Eating Disorder Clinician. A proud Yorta Yorta
                woman.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 min-h-11"
            >
              Book a free 15-minute intro call
            </a>
          </div>
        </Section>
      </section>

      {/* LEAD MAGNET */}
      <Section id="signup">

        <div className="rounded-3xl border border-[var(--plum)]/10 bg-[var(--cream)] p-8 md:p-12">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--terracotta)]">
            Pull up a chair
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
            "ADHD isn't an attention problem" — a short, gentle reframe.
          </h2>
          <p className="mt-4 max-w-xl text-[var(--plum)]/75">
            A quiet PDF you can read in ten minutes. No inbox spam — just this,
            and the occasional gentle note if you'd like one.
          </p>
          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="mt-8 rounded-xl bg-[var(--plum)] p-5 text-[var(--oat)]"
            >
              Thank you — check your inbox soon. And take a breath. You did the
              thing.
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const trimmed = email.trim();
                if (!trimmed) return;
                // Simple email shape check; server-side accepts the row and
                // the DB is the source of truth. We never surface a scary
                // error to the visitor — the friendly thank-you always shows.
                if (!looksLikeEmail(trimmed)) return;
                setSubmitting(true);
                // Spam guards: silently succeed without writing if the
                // honeypot has any value, or if the form was submitted
                // implausibly fast (under ~2.5s from mount).
                const isBot = isLikelySpam(honeypot, Date.now() - mountedAtRef.current);
                if (!isBot) {
                  try {
                    const { error } = await supabase
                      .from("lead_signups")
                      .insert({ email: trimmed, source: "adhd_hub" });
                    if (error) console.warn("lead_signups insert failed", error);
                  } catch (err) {
                    console.warn("lead_signups insert threw", err);
                  }
                  // Netlify Forms notification (best-effort, never blocks UX).
                  try {
                    const body = new URLSearchParams({
                      "form-name": "signups",
                      email: trimmed,
                      source: "homepage",
                      company: honeypot,
                    });
                    await fetch("/__forms.html", {
                      method: "POST",
                      headers: { "Content-Type": "application/x-www-form-urlencoded" },
                      body: body.toString(),
                    });
                  } catch (err) {
                    console.warn("netlify form notify failed", err);
                  }
                }
                trackEvent("sign_up", { method: "lead_magnet" });
                trackEvent("email_click");
                setSubmitting(false);
                setSubmitted(true);
              }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="lead-email" className="sr-only">
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
                <label htmlFor="lead-company">Company</label>
                <input
                  id="lead-company"
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>
              <input
                id="lead-email"
                ref={emailInputRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-describedby="lead-email-help"
                className="flex-1 rounded-full border border-[var(--plum)]/20 bg-[var(--oat)] px-5 py-3 text-base text-[var(--plum)] placeholder:text-[var(--plum)]/40 focus:border-[var(--terracotta)] focus:outline-none min-h-11"
              />

              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-[var(--plum)] px-6 py-3 text-sm font-medium text-[var(--oat)] transition-all hover:bg-[var(--terracotta)] disabled:opacity-70 min-h-11"
              >
                {submitting ? "Sending…" : "Send it to me"}
              </button>
            </form>
          )}
          {!submitted && (
            <p
              id="lead-email-help"
              className="mt-3 text-xs text-[var(--plum)]/60"
            >
              I'll only email you about Anchor and the hub, and you can
              unsubscribe any time.
            </p>
          )}
        </div>
      </Section>

      {/* FAQ */}
      <section id="faq" className="bg-[var(--cream)]">
        <Section eyebrow="Gentle FAQ">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            Questions people quietly wonder.
          </h2>
          <Accordion type="single" collapsible className="mt-10 w-full">
            {[
              {
                q: "Do you diagnose ADHD or prescribe medication?",
                a: "No. We provide therapy and support. When assessment or medication is the right next step, we'll help you find the right person for that part.",
              },
              {
                q: "I'm already on medication — is this instead of that?",
                a: "No. We work alongside your medication and your prescriber. Therapy addresses the skills, emotions and nervous-system work medication isn't designed to do.",
              },
              {
                q: "The emotional side is my biggest struggle — is that really ADHD?",
                a: "For many people, yes — emotional regulation is often central to the ADHD experience, even though it isn't in the older headline definitions.",
              },
              {
                q: "I have a complicated relationship with food — will nutrition talk feel unsafe?",
                a: "This is exactly why our eating-disorder accreditation matters. Any food conversation is weight-neutral, gentle, at your pace, and always led by you.",
              },
              {
                q: "Do I need a referral?",
                a: "You don't need a referral to book. You do need an eligible GP plan (like a Mental Health Treatment Plan) to claim Medicare rebates.",
              },
              {
                q: "Can we do this online?",
                a: "Yes. We offer telehealth across Australia, as well as in-person sessions in Perth.",
              },
            ].map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`item-${i}`}
                className="border-b border-[var(--plum)]/15"
              >
                <AccordionTrigger className="py-5 text-left font-display text-lg text-[var(--plum)] hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-[var(--plum)]/80">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      </section>

      {/* ANCHOR CARD */}
      <Section>
        <Link
          to="/anchor"
          className="group block rounded-3xl border border-[var(--plum)]/10 bg-[var(--cream)] p-8 no-underline transition-shadow hover:shadow-md md:p-12"
        >
          <div className="grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
            <div
              className="mx-auto grid size-20 place-items-center rounded-2xl bg-[var(--plum)] text-[var(--oat)] md:size-24"
              aria-hidden
            >
              <Logo className="size-10 md:size-12" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--terracotta)]">
                A free companion app
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
                Meet <span className="italic text-[var(--terracotta)]">Anchor</span>.
              </h2>
              <p className="mt-4 max-w-xl text-[var(--plum)]/80">
                A gentle, weight-neutral companion for the days your body
                forgets to tell you it's hungry. No numbers, no streaks,
                no rules — just a quiet nudge back towards a regular rhythm.
              </p>
            </div>
            <span className="hidden text-sm font-medium text-[var(--plum)] underline decoration-[var(--terracotta)] underline-offset-4 group-hover:text-[var(--terracotta)] md:inline-block">
              Learn about Anchor →
            </span>
          </div>
          <span className="mt-6 inline-block text-sm font-medium text-[var(--plum)] underline decoration-[var(--terracotta)] underline-offset-4 group-hover:text-[var(--terracotta)] md:hidden">
            Learn about Anchor →
          </span>
        </Link>
      </Section>

      {/* VOICES / TESTIMONIALS — renders only when TESTIMONIALS has entries */}
      {TESTIMONIALS.length > 0 && (
        <section className="bg-[var(--cream)]">
          <Section eyebrow="In their words">
            <h2 className="font-display text-3xl leading-tight md:text-5xl">
              What it's like to be in the room.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {TESTIMONIALS.map((item, i) => (
                <blockquote
                  key={i}
                  className="rounded-2xl border border-[var(--plum)]/10 bg-[var(--oat)] p-6"
                >
                  <p className="text-lg leading-relaxed text-[var(--plum)]/85">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  {item.attribution && (
                    <footer className="mt-4 text-sm text-[var(--terracotta)]">
                      — {item.attribution}
                    </footer>
                  )}
                </blockquote>
              ))}
            </div>
          </Section>
        </section>
      )}

      {/* CLOSING CTA */}
      <section className="bg-[var(--plum)] text-[var(--oat)]">

        <Section className="text-center">
          <h2 className="mx-auto max-w-3xl font-display text-3xl leading-tight text-[var(--oat)] md:text-5xl">
            There's no bad enough. You're allowed to start now.
          </h2>
          <div className="mt-10 flex justify-center">
            <BookButton>Book a free 15-minute intro call</BookButton>
          </div>
        </Section>
      </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[var(--plum)] text-[var(--oat)]/80">
        <div className="mx-auto max-w-6xl px-5 pb-32 pt-4 md:pb-24">
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
                  We acknowledge the Traditional Owners of the lands on which we
                  live and work, and pay our respects to Elders past and present.
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

      <FloatingCta />
    </div>
  );
}
