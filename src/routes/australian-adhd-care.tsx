import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL, HALAXY_URL } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { ContentGovernance } from "@/components/content-governance";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/australian-adhd-care`;
const BOOK_URL = HALAXY_URL;
const HERO_IMG = "/together.jpg";
const CTA_IMG = "/lets-talk.jpg";

const FAQS = [
  {
    q: "Can a GP diagnose ADHD in Australia?",
    a: "Sometimes. Some GPs assess and prescribe where their training and state rules allow; many refer you to a psychiatrist or paediatrician. Ask your GP what they offer.",
  },
  {
    q: "Do I need a referral to be assessed?",
    a: "For a Medicare-rebated psychiatrist assessment, yes — a GP referral. You can see some clinicians without one, but rebates need the right referral or plan.",
  },
  {
    q: "How much does an ADHD assessment cost?",
    a: "It varies a lot. Before you pay, ask exactly what's included — the report, feedback, and follow-up — and whether the report will be accepted where you need it.",
  },
  {
    q: "Can I get support while I wait for an assessment?",
    a: "Yes. You don't need a diagnosis to start working on sleep, eating, routines, study, work or distress. Support doesn't have to wait.",
  },
  {
    q: "Does Body Belonging Clinic diagnose ADHD or prescribe medication?",
    a: "No. We provide therapy and support, and we can point you to who does the diagnosing and prescribing.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/australian-adhd-care")({
  head: () => ({
    meta: [
      { title: "Australian ADHD care map for adults | Body Belonging Clinic" },
      {
        name: "description",
        content:
          "A plain-language map of adult ADHD care in Australia: who does what, what to ask before you pay for an assessment, and where each role stops.",
      },
      { property: "og:title", content: "The Australian adult ADHD care map" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: AustralianAdhdCarePage,
});

const journeys = [
  { title: "Wondering if it's ADHD", body: "Jot down examples from childhood and now. A GP can help you plan the next step." },
  { title: "Preparing for assessment", body: "Gather old reports, a timeline, and examples from more than one setting." },
  { title: "Waiting for assessment", body: "You can start support now — sleep, eating, routines, work. No diagnosis required." },
  { title: "Just diagnosed", body: "Ask what it explains, your options, who monitors what, and how your GP stays in the loop." },
  { title: "Meds help, but not everything", body: "Medication and support often work best together. The rest is what we're for." },
  { title: "Meds are affecting appetite or sleep", body: "Talk to your prescriber first — don't change it alone. A dietitian can help with eating." },
  { title: "ADHD and eating feel tangled", body: "Get weight-neutral, eating-disorder-informed support. Skip elimination diets and unproven tests." },
  { title: "I might be AuDHD", body: "Ask for assessment that also considers autism, masking, sensory needs and burnout." },
];

const roles = [
  { role: "GP", can: "Your first stop. Reviews your health, helps rule things out, refers you on, and keeps your care joined up. Some GPs diagnose and prescribe.", limit: "What they can do varies by GP and state — just ask." },
  { role: "Psychiatrist", can: "Can formally diagnose ADHD, prescribe and monitor medication, and manage other mental-health conditions alongside it.", limit: "Usually won't provide ongoing therapy." },
  { role: "Psychologist", can: "Assessment and therapy for how ADHD affects your life, plus co-occurring things like anxiety.", limit: "Can't prescribe. Check their report is accepted before paying." },
  { role: "Accredited Mental Health Social Worker", can: "Therapy and support that looks at the whole picture — identity, family, environment — and connects you onward. (That's us.)", limit: "We don't diagnose or prescribe — we'll point you to who does." },
  { role: "Occupational therapist", can: "Practical support for routines, sensory needs, focus scaffolds and daily life.", limit: "Not a substitute for medical assessment." },
  { role: "Accredited Practising Dietitian", can: "Weight-neutral help with eating, appetite changes from medication, and nutrition.", limit: "Choose eating-disorder-informed. Doesn't diagnose ADHD." },
  { role: "Pharmacist", can: "Explains your medication — how to take it, storage, interactions — and flags concerns.", limit: "Any dose changes go through your prescriber." },
];

const askBeforePaying = [
  "Which guidelines and criteria do you use?",
  "How do you establish childhood onset and impact across settings?",
  "How do you factor in autism, trauma, sleep, mood, anxiety and substances?",
  "What records do you need — and what if I don't have them?",
  "What's included in the fee: report, feedback, follow-up?",
  "Will your report be accepted by the prescriber or service I need?",
  "Who handles medication monitoring after diagnosis?",
];

const BookButton = ({ children = "Book a free intro call", location = "care_map" }: { children?: React.ReactNode; location?: string }) => (
  <a
    href={BOOK_URL}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackEvent("booking_click", { location })}
    className="inline-flex items-center justify-center rounded-full bg-[var(--terracotta)] px-7 py-3.5 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 active:scale-[0.98] min-h-11"
  >
    {children}
  </a>
);

function AustralianAdhdCarePage() {
  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]">
      <SiteHeader location="care_map" />
      <main id="main-content" tabIndex={-1}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

        {/* HERO */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24 lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--terracotta)]">Navigate</p>
              <h1 className="mt-6 font-display text-[2.75rem] leading-[1.03] text-[var(--oat)] md:text-6xl">
                The Australian ADHD care map.
              </h1>
              <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-[var(--oat)]/85 md:text-xl">
                Figuring out ADHD care here is genuinely confusing. Here&apos;s a plain-language map — who
                does what, and where each role stops.
              </p>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-[var(--oat)]/10 shadow-md md:max-w-none">
              <img src={HERO_IMG} alt="People supporting one another" className="h-full w-full object-cover" loading="eager" decoding="async" />
            </div>
          </div>
        </section>

        {/* JOURNEYS */}
        <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--terracotta)]">Where are you right now?</p>
          <h2 className="mt-4 font-display text-[2rem] leading-tight md:text-5xl">Find your starting point.</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {journeys.map((j) => (
              <article key={j.title} className="flex flex-col rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-6">
                <h3 className="font-display text-lg leading-tight text-[var(--plum)]">{j.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--plum)]/70">{j.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* WHO DOES WHAT — cards, not a table */}
        <section className="bg-[var(--cream)]">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--terracotta)]">The team</p>
            <h2 className="mt-4 font-display text-[2rem] leading-tight md:text-5xl">Who does what?</h2>
            <blockquote className="my-10 border-l-2 border-[var(--terracotta)] pl-6 font-display text-2xl leading-snug text-[var(--plum)] md:text-3xl">
              A title doesn&apos;t guarantee ADHD expertise. Always ask.
            </blockquote>
            <div className="grid gap-4 md:grid-cols-2">
              {roles.map((r) => (
                <article key={r.role} className="rounded-2xl border border-[var(--plum)]/10 bg-[var(--oat)] p-6">
                  <h3 className="font-display text-xl leading-tight text-[var(--plum)]">{r.role}</h3>
                  <p className="mt-3 leading-relaxed text-[var(--plum)]/80">{r.can}</p>
                  <p className="mt-3 text-sm text-[var(--plum)]/55">
                    <span className="font-medium text-[var(--terracotta)]">The limit · </span>
                    {r.limit}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BEFORE YOU PAY — numbered checklist */}
        <section className="mx-auto max-w-3xl px-5 py-20 md:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--terracotta)]">Protect yourself</p>
          <h2 className="mt-4 font-display text-[2rem] leading-tight md:text-5xl">Before you pay for an assessment, ask this.</h2>
          <ol className="mt-12 space-y-5">
            {askBeforePaying.map((q, i) => (
              <li key={q} className="flex gap-4">
                <span className="grid size-8 flex-none place-items-center rounded-full bg-[var(--terracotta)] text-sm font-medium text-[var(--cream)]">{i + 1}</span>
                <span className="pt-1 text-lg leading-relaxed text-[var(--plum)]/85">{q}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="bg-[var(--cream)]">
          <div className="mx-auto max-w-3xl px-5 py-20 md:py-28">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--terracotta)]">Common questions</p>
            <h2 className="mt-4 font-display text-[2rem] leading-tight md:text-5xl">The things people actually ask.</h2>
            <dl className="mt-12 divide-y divide-[var(--plum)]/10">
              {FAQS.map((f) => (
                <div key={f.q} className="py-6">
                  <dt className="font-display text-xl leading-tight text-[var(--plum)]">{f.q}</dt>
                  <dd className="mt-3 leading-relaxed text-[var(--plum)]/75">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24 lg:gap-16">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl shadow-md md:max-w-none">
              <img src={CTA_IMG} alt="Ring ring — let's talk" className="h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div>
              <h2 className="max-w-[16ch] font-display text-[2.25rem] leading-[1.05] text-[var(--oat)] md:text-5xl">
                Not sure where you fit on the map?
              </h2>
              <p className="mt-6 max-w-[34ch] text-lg text-[var(--oat)]/85">
                Start with a free 15-minute call — we&apos;ll help you find the right next step.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <BookButton />
                <Link to="/assessment-preparation" className="text-sm font-medium text-[var(--oat)] underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]">
                  Open the free prep guide →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SOURCES + GOVERNANCE + COMPLIANCE */}
        <section className="mx-auto max-w-3xl px-5 py-20 md:py-24">
          <h2 className="font-display text-2xl leading-tight text-[var(--plum)] md:text-3xl">The rules aren&apos;t the same everywhere.</h2>
          <p className="mt-5 leading-relaxed text-[var(--plum)]/80">
            Diagnosis, stimulant prescribing, permits and GP shared-care can differ by profession and by
            state or territory. We won&apos;t flatten those differences into one national promise — always
            confirm the current pathway with your clinician and the relevant health department before you
            pay or change care.
          </p>

          <div className="mt-10 rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-6">
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--terracotta)]">Primary reference (Australia)</p>
            <a href="https://adhdguideline.aadpa.com.au/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block underline decoration-[var(--terracotta)] underline-offset-4">
              Australian Evidence-Based Clinical Practice Guideline for ADHD (AADPA) ↗
            </a>
          </div>

          <div className="mt-10">
            <ContentGovernance
              labels={["Australian guideline", "Clinical practice lens"]}
              reviewNote="Author-reviewed against current Australian national guidance. State and territory prescribing details require jurisdiction-specific confirmation."
            />
          </div>

          <p className="mt-8 text-sm text-[var(--plum)]/55">
            General education only. This page does not determine diagnosis, eligibility, prescribing authority
            or an individual treatment plan. Published 26 July 2026 · Review due 26 January 2027.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
