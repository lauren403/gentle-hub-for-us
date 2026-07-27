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
  CONTACT,
  SITE_URL,
} from "@/config/site";
import { trackEvent, trackNextAction } from "@/lib/analytics";
import { submitLeadSignup } from "@/lib/lead-signup";
import { isLikelySpam, looksLikeEmail } from "@/lib/spam-guard";
import { SiteHeader, SiteFooter, FloatingBook, Logo } from "@/components/site-chrome";
import { ContentGovernance } from "@/components/content-governance";

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
      "inline-flex items-center justify-center rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 active:scale-[0.98] min-h-11 " +
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
    "Medicare rebates may apply",
    "Aboriginal-led",
    "LGBTQIA+ affirming",
    "Telehealth Australia-wide",
  ];
  return (
    <div className="border-y border-[var(--plum)]/10 bg-[var(--cream)]">
      <div className="mx-auto max-w-6xl px-5 py-4">
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--plum)]/70 md:text-xs">
          {items.map((t, i) => (
            <li key={t} className="flex items-center gap-5">
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

function PathwayCards() {
  const cards = [
    {
      eyebrow: "Prepare without proving",
      title: "Get ready for an ADHD assessment",
      blurb:
        "A free, non-diagnostic guide to gathering your story, questions and existing records.",
      to: "/assessment-preparation" as const,
      cta: "Open the preparation guide",
    },
    {
      eyebrow: "Navigate Australian care",
      title: "Find the right next step",
      blurb: "Assessment, medication, therapy, dietetics and functional support—who does what.",
      to: "/australian-adhd-care" as const,
      cta: "Open the care map",
    },
    {
      eyebrow: "Food & the brain",
      title: "Food stuff is brain stuff",
      blurb: "Weight-neutral, sensory-aware, ED-informed. No calories, no rules, no shame.",
      to: "/food-and-the-adhd-brain" as const,
      cta: "Explore",
    },
    {
      eyebrow: "A free companion app",
      title: "Meet Anchor",
      blurb: "A gentle eating-rhythm app for ADHD brains. No numbers, no streaks, no rules.",
      to: "/anchor" as const,
      cta: "Learn about Anchor",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.title}
            to={c.to}
            className="group flex flex-col rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-6 no-underline transition-all hover:border-[var(--terracotta)]/40 hover:shadow-sm md:p-7"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--terracotta)]">
              {c.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-2xl leading-tight text-[var(--plum)]">
              {c.title}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--plum)]/75">{c.blurb}</p>
            <span className="mt-5 inline-flex text-sm font-medium text-[var(--plum)] underline decoration-[var(--terracotta)] underline-offset-4 group-hover:text-[var(--terracotta)]">
              {c.cta} →
            </span>
          </Link>
        ))}
      </div>
    </section>
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
    <section id={id} className={"mx-auto max-w-4xl px-5 py-14 md:py-20 " + className}>
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

function NervousSystemSection() {
  const cards = [
    {
      eyebrow: "The ladder",
      title: "Settled, revved-up, or shut-down",
      body: "noticing where you are is the first step back.",
    },
    {
      eyebrow: "Co-regulation",
      title: "Nervous systems settle in good company.",
      body: "We start there, together.",
    },
    {
      eyebrow: "Sparks",
      title: "Small moments of steadiness, gathered",
      body: "the way back gets more worn-in.",
    },
  ];

  return (
    <Section id="nervous-system" eyebrow="The nervous system">
      <h2 className="font-display text-3xl leading-tight md:text-5xl">
        Regulation is one useful place to begin.
      </h2>
      <p className="mt-8 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
        ADHD is defined by persistent patterns of inattention and/or hyperactivity–impulsivity. Some
        people also experience large shifts in arousal, energy or emotional intensity.
      </p>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--plum)]/85">
        <p>
          Deb Dana's “ladder” can offer accessible language for states that feel settled, revved-up
          or switched-off. We use it as optional clinical shorthand—not as a biological explanation
          of ADHD. Better-supported work on stress, arousal and self-regulation remains the evidence
          base underneath the conversation.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {cards.map((c) => (
          <article
            key={c.eyebrow}
            className="rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-6 transition-shadow hover:shadow-sm"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--terracotta)]">
              {c.eyebrow}
            </p>
            <h3 className="mt-3 font-display text-xl leading-tight text-[var(--plum)]">
              {c.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--plum)]/75">{c.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ThinkingSection() {
  const lenses = [
    {
      name: "Australian ADHD guideline",
      desc: "the primary reference point for assessment, multimodal treatment and functioning.",
    },
    {
      name: "Russell Barkley & Thomas Brown",
      desc: "executive function and self-regulation as useful clinical accounts of ADHD.",
    },
    { name: "Jessica McCabe (How to ADHD)", desc: "working with your brain, not against it." },
    {
      name: "Rachel Gow and nutrition research",
      desc: "questions about background diet, deficiencies and omega-3s—checked against reviews and Australian scope.",
    },
    {
      name: "Dr Shyamal Mashru and specialist pathways",
      desc: "clear separation of assessment, prescribing, comorbidity and ongoing psychosocial support.",
    },
    {
      name: "ADHD Chatter and expert media",
      desc: "topic discovery and lived-experience language, never treated as clinical evidence by itself.",
    },
  ];

  return (
    <section className="bg-[var(--cream)]">
      <Section eyebrow="The thinking we bring into the room">
        <h2 className="font-display text-3xl leading-tight md:text-5xl">
          Useful ideas, checked before they enter the room.
        </h2>
        <p className="mt-8 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
          International clinicians, researchers and lived-experience media can surface important
          questions. We translate those questions through Australian guidance, source quality and
          scope of practice before presenting them as health information.
        </p>
        <ul className="mt-10 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {lenses.map((l) => (
            <li key={l.name} className="leading-relaxed">
              <span className="font-medium text-[var(--plum)]">{l.name}</span>
              <span className="text-[var(--plum)]/70"> — {l.desc}</span>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[68ch] text-sm leading-relaxed text-[var(--plum)]/60">
          These sources do not carry equal evidentiary weight. The editorial policy explains how we
          distinguish guideline recommendations, research, clinical lenses and lived experience.
        </p>
      </Section>
    </section>
  );
}

function ConversationSection() {
  return (
    <section className="bg-[var(--cream)]">
      <Section id="conversation" eyebrow="The conversation">
        <div className="flex flex-wrap items-start gap-3">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            A voice in the conversation — not a waiting room.
          </h2>
          <span className="inline-flex items-center rounded-full border border-[var(--plum)]/15 bg-[var(--oat)] px-3 py-1 text-xs font-medium text-[var(--plum)]/70">
            Podcast — coming soon
          </span>
        </div>
        <div className="mt-8 max-w-[68ch] space-y-5 text-lg leading-relaxed text-[var(--plum)]/85">
          <p>
            Beyond the therapy room, the Letters are our ongoing writing on ADHD, food and the
            nervous system — research, practice lenses and lived experience in plain language. Read
            them, and subscribe to get them as they land.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/letters"
            className="inline-flex items-center justify-center rounded-full bg-[var(--plum)] px-6 py-3 text-sm font-medium text-[var(--oat)] transition-all hover:bg-[var(--terracotta)] min-h-11"
          >
            Read the Letters
          </Link>
          <a
            href="#signup"
            className="inline-flex items-center justify-center rounded-full border border-[var(--plum)] px-6 py-3 text-sm font-medium text-[var(--plum)] transition-colors hover:bg-[var(--plum)] hover:text-[var(--oat)] min-h-11"
          >
            Subscribe
          </a>
        </div>
      </Section>
    </section>
  );
}

function AdhdHub() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const [emailConsent, setEmailConsent] = useState(false);
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
      <SiteHeader location="home" />
      <main id="main-content" tabIndex={-1}>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-16 md:pt-24 md:pb-20">
            <div className="grid items-center gap-12 md:grid-cols-[1.15fr_1fr] md:gap-16">
              <div>
                <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[var(--terracotta)]">
                  The ADHD hub · Body Belonging Clinic
                </p>
                <h1 className="font-display text-4xl leading-[1.03] md:text-6xl lg:text-[4.75rem]">
                  ADHD isn't only an attention problem.
                  <br />
                  <span className="italic text-[var(--terracotta)]">
                    The rest of life matters too.
                  </span>
                </h1>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--plum)]/80 md:text-xl">
                  Neuroaffirming therapy for the parts that can remain difficult before, during or
                  after assessment—emotion, eating, body image, identity and everyday functioning.
                  We work alongside GPs, psychiatrists, dietitians and other professionals when
                  their scope is needed. Aboriginal-led, queer-affirming and weight-neutral.
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
                  Not a crisis service. In an emergency call <strong>000</strong>, or Lifeline{" "}
                  <strong>13 11 14</strong>.
                </p>
              </div>
              <StudioImage
                src={HERO_IMAGE}
                alt="Body Belonging Clinic studio — a warm, calm space."
                aspect="aspect-[4/5]"
                className="mx-auto w-full max-w-md md:max-w-none"
                priority
              />
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <TrustStrip />

        {/* PATHWAY CARDS */}
        <PathwayCards />

        {/* warm divider */}
        <div aria-hidden className="mx-auto flex max-w-4xl items-center gap-4 px-5">
          <span className="h-px flex-1 bg-[var(--plum)]/15" />
          <Logo className="size-4 text-[var(--terracotta)] opacity-70" />
          <span className="h-px flex-1 bg-[var(--plum)]/15" />
        </div>

        {/* REFRAME */}
        <Section id="reframe" eyebrow="The reframe">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            For some people, emotion is as disabling as difficulty with focus.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--plum)]/85">
            <p>
              ADHD involves persistent patterns of inattention and/or hyperactivity–impulsivity.
              Difficulties with executive function, motivation and emotion regulation are also
              common and can substantially affect daily life. Their presence and causes vary, so
              they deserve curiosity rather than a one-size-fits-all explanation.
            </p>
          </div>
          <PullQuote>
            “For some adults, the emotional impact is the part that most needs support—and it can be
            approached with skills, self-understanding and context.”
          </PullQuote>
          <p className="mt-8 text-sm">
            <Link
              to="/approach"
              className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
            >
              Our approach → The Body Belonging practice framework
            </Link>
          </p>
        </Section>

        {/* MEDICATION */}
        <section id="medication" className="bg-[var(--cream)]">
          <Section eyebrow="Medication">
            <h2 className="font-display text-3xl leading-tight md:text-5xl">
              Medication can be an important part of treatment. Support may still be useful.
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--plum)]/85">
              <p>
                Medication decisions belong with an authorised prescriber. Therapy can sit alongside
                medical treatment to support skills, routines, emotional wellbeing, identity and
                everyday functioning. It is complementary—not a replacement for assessment,
                prescribing or medical review.
              </p>
            </div>
            <div className="mt-10 rounded-xl border border-[var(--plum)]/10 bg-[var(--oat)] p-5 text-sm leading-relaxed text-[var(--plum)]/80">
              <strong className="text-[var(--plum)]">A note on scope:</strong> We provide therapy
              and support. We don't diagnose ADHD or prescribe — where that's the next step, we'll
              help you find the right person.
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
                  ADHD, medication effects, executive function, sensory preferences, time awareness
                  and other factors can all affect eating. Lauren&apos;s ANZAED eating-disorder
                  credential informs a weight-neutral, non-restrictive conversation. Nutrition
                  assessment and individual meal planning sit with an eating-disorder-informed
                  Accredited Practising Dietitian.
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
            “We take nutrition questions seriously, keep claims proportionate to the evidence and
            refer to a GP or Accredited Practising Dietitian when individual advice is needed.”
          </PullQuote>
        </Section>

        <NervousSystemSection />

        <ThinkingSection />

        {/* NERVOUS SYSTEM & BELONGING */}
        <section className="bg-[var(--cream)]">
          <Section eyebrow="The Belonging Room">
            <h2 className="font-display text-3xl leading-tight md:text-5xl">
              Your nervous system, and a place to belong.
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--plum)]/85">
              <p>
                Many people describe attention as easier to access when a task is interesting,
                urgent, novel or personally meaningful. Safety and connection may also support
                engagement. We use those ideas as practical lenses while considering sleep,
                environment, medication, mental health, sensory needs and other contributors.
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
                    Some people find strategies hard to use while highly stressed, overwhelmed or
                    disconnected from body cues. Where it is suitable and consented to, we can use
                    gentle body-awareness work alongside practical skills.
                  </p>
                  <p>
                    This is an Aboriginal-led and LGBTQIA+ affirming practice. We aim for culturally
                    responsive support and invite feedback about what safety means to each person;
                    cultural safety is determined by the person receiving the service, not claimed
                    by the service alone.
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
              Clear sessions, transparent limits and support between visits.
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--oat)]/85">
              <p>
                Sessions have a clear scheduled length and your time is protected. We agree on a
                focus, review whether the work is useful and make the next step explicit. The Body
                Belonging practice framework can organise therapy; Anchor and the Letters are
                optional general resources between visits, not monitoring or crisis support.
              </p>
              <p>
                We are transparent about availability, fees, scope and referral needs rather than
                promising unlimited access.
              </p>
            </div>
          </Section>
        </section>

        {/* EVIDENCE SPINE */}
        <section className="bg-[var(--cream)]">
          <Section eyebrow="Not invented on a whim">
            <h2 className="font-display text-3xl leading-tight md:text-5xl">
              A practice framework built from established and emerging parts.
            </h2>
            <p className="mt-8 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
              The Body Belonging practice framework is Lauren&apos;s way of organising therapeutic
              work. Its components have different evidence strengths; the framework itself has not
              yet been independently evaluated as a treatment model.
            </p>
            <ul className="mt-8 space-y-4 border-l-2 border-[var(--terracotta)] pl-6 text-lg leading-relaxed text-[var(--plum)]/85">
              <li className="max-w-[64ch]">
                Regular eating — the steady rhythm at the centre of the food work — comes straight
                from established eating-disorder treatment (CBT-E), not wellness trends.
              </li>
              <li className="max-w-[64ch]">
                Self-regulation and executive-function models, including Russell Barkley&apos;s
                work, provide one useful clinical lens without replacing diagnostic criteria.
              </li>
              <li className="max-w-[64ch]">
                Optional body-awareness and regulation work draws on clinical practice and emerging
                ADHD–interoception research. Interoception is one possible contributor, not a single
                mechanism or cause.
              </li>
              <li className="max-w-[64ch]">
                Self-compassion is supported across several mental-health contexts; ADHD-specific
                application is less established and is described accordingly.
              </li>
              <li className="max-w-[64ch]">
                Scope is anchored in Lauren&apos;s AMHSW role and ANZAED credential, with referral
                to medical, dietetic or other disciplines when required.
              </li>
            </ul>
            <p className="mt-8 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
              Each health page now identifies its evidence types and review status. Independent
              multidisciplinary review is the next governance milestone.
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

        {/* WHAT ACTUALLY HAPPENS */}
        <Section eyebrow="What actually happens">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            What the work looks like — and how you'll know it's working.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--plum)]/85">
            <p>
              The first session is mostly listening: where you are, what's hard, and what you've
              already tried that didn't stick. From there we work in a clear direction — safety
              first, then noticing, then real skills, then the belonging that makes change hold. No
              mystery, no filler, no homework for its own sake.
            </p>
            <p>
              We agree on what you want to be different and review it together—for example distress,
              participation, routines, self-understanding or day-to-day functioning. We do not
              promise a particular outcome, and we will discuss a change in approach or referral if
              therapy is not helping.
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
                A general wellbeing tool offering optional, user-set eating-rhythm prompts. No
                calories, weight or streaks. It is not treatment, clinical monitoring or a crisis
                service, and it may not suit everyone.
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
                <p role="status" className="mt-4 text-sm text-[var(--plum)]/75">
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
                With an eligible Mental Health Treatment Plan or Eating Disorder Plan from a GP,
                Medicare rebates <strong>may apply</strong> to sessions with an Accredited Mental
                Health Social Worker. Your GP is the right person to confirm eligibility.
              </p>
              <p>
                Our standard 50-minute session is <strong>$200</strong>. With a valid plan, the
                current Medicare rebate is <strong>$89.50</strong> per session, so your out-of-pocket
                is about <strong>$110.50</strong>. Telehealth sessions attract the same rebate.
                Rebates are indexed by Medicare each July, and the exact amount is confirmed at
                booking. A Mental Health Treatment Plan covers up to 10 rebated sessions per calendar
                year; an Eating Disorder Plan up to 40 over 12 months.
              </p>
              <div className="rounded-2xl border border-[var(--oat)]/15 bg-[var(--oat)]/5 p-6">
                <p className="text-sm uppercase tracking-widest text-[var(--terracotta)]">
                  Your clinician
                </p>
                <p className="mt-3 font-display text-xl text-[var(--oat)]">Lauren Lynch</p>
                <p className="mt-1 text-[var(--oat)]/80">
                  Accredited Mental Health Social Worker (AASW) · ANZAED Credentialed Eating
                  Disorder Clinician. A proud Yorta Yorta woman.
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
              A free place to begin
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
              Prepare for an ADHD assessment without having to prove you are “ADHD enough”.
            </h2>
            <p className="mt-4 max-w-xl text-[var(--plum)]/75">
              The preparation guide is free to read, print or save. It brings together the questions
              I use in clinical work and the patterns I have found most helpful when people are
              trying to organise a complicated story.
            </p>
            <div className="mt-6">
              <Link
                to="/assessment-preparation"
                onClick={() => trackNextAction("assessment_guide_open", "homepage_resource")}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110"
              >
                Open the free preparation guide
              </Link>
            </div>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-[var(--plum)]/65">
              If you would also like occasional new resources from Body Belonging Clinic, you can
              join the updates list below. The guide is not locked behind your email.
            </p>
            {submitted ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-8 rounded-xl bg-[var(--plum)] p-5 text-[var(--oat)]"
              >
                Thanks — your request has been received. We&apos;ll only use it for the updates you
                agreed to.
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const trimmed = email.trim();
                  if (!trimmed || !emailConsent) return;
                  if (!looksLikeEmail(trimmed)) return;
                  setSubmitting(true);
                  setSubmissionError(false);
                  // Spam guards: silently succeed without writing if the
                  // honeypot has any value, or if the form was submitted
                  // implausibly fast (under ~2.5s from mount).
                  const isBot = isLikelySpam(honeypot, Date.now() - mountedAtRef.current);
                  if (isBot) {
                    setSubmitting(false);
                    setSubmitted(true);
                    return;
                  }

                  const result = await submitLeadSignup({
                    email: trimmed,
                    source: "adhd_hub",
                    consentVersion: "hub-updates-v1",
                    consentedAt: new Date().toISOString(),
                    honeypot,
                  });

                  setSubmitting(false);
                  if (!result.ok) {
                    setSubmissionError(true);
                    return;
                  }

                  trackEvent("sign_up", { method: "lead_magnet" });
                  trackNextAction("email_signup", "homepage_updates");
                  setSubmitted(true);
                }}
                className="mt-8 space-y-4"
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
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="lead-email"
                    ref={emailInputRef}
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    aria-describedby="lead-email-help"
                    className="min-h-11 flex-1 rounded-full border border-[var(--plum)]/20 bg-[var(--oat)] px-5 py-3 text-base text-[var(--plum)] placeholder:text-[var(--plum)]/40 focus:border-[var(--terracotta)] focus:outline-none"
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="min-h-11 rounded-full bg-[var(--plum)] px-6 py-3 text-sm font-medium text-[var(--oat)] transition-all hover:bg-[var(--terracotta)] disabled:opacity-70"
                  >
                    {submitting ? "Sending…" : "Join the updates list"}
                  </button>
                </div>
                <label className="flex max-w-[68ch] items-start gap-3 text-sm leading-relaxed text-[var(--plum)]/75">
                  <input
                    type="checkbox"
                    required
                    checked={emailConsent}
                    onChange={(event) => setEmailConsent(event.target.checked)}
                    className="mt-1 size-4 accent-[var(--terracotta)]"
                  />
                  <span>
                    I agree to receive occasional ADHD Hub and Anchor emails from Body Belonging
                    Clinic. I can unsubscribe at any time. See the{" "}
                    <Link
                      to="/privacy"
                      className="underline decoration-[var(--terracotta)] underline-offset-4"
                    >
                      privacy policy
                    </Link>
                    .
                  </span>
                </label>
                {submissionError && (
                  <p role="alert" className="text-sm text-[var(--plum)]">
                    We couldn&apos;t safely save your request. Please try again, or email{" "}
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="underline decoration-[var(--terracotta)] underline-offset-4"
                    >
                      {CONTACT.email}
                    </a>
                    .
                  </p>
                )}
              </form>
            )}
            {!submitted && (
              <p id="lead-email-help" className="mt-3 text-xs text-[var(--plum)]/60">
                We collect your email and consent only for requested updates. Please do not enter
                clinical information here.
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
                  a: "No. We work alongside your medication and prescriber. Therapy may support skills, routines, emotional wellbeing and everyday functioning; medication questions remain with your prescriber.",
                },
                {
                  q: "The emotional side is my biggest struggle — is that really ADHD?",
                  a: "Emotion-regulation difficulties are common in ADHD and can be highly impairing, but they are not unique to ADHD. We consider the whole context rather than assuming one cause.",
                },
                {
                  q: "I have a complicated relationship with food — will nutrition talk feel unsafe?",
                  a: "Lauren's eating-disorder credential informs a weight-neutral, non-restrictive approach. We discuss consent and limits, and involve a GP or eating-disorder-informed Accredited Practising Dietitian when their scope is needed.",
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
                  A gentle, weight-neutral companion for the days your body forgets to tell you it's
                  hungry. No numbers, no streaks, no rules — just a quiet nudge back towards a
                  regular rhythm.
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

        <ConversationSection />

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

      <SiteFooter />
      <FloatingBook location="home" />
    </div>
  );
}
