import { createFileRoute, Link } from "@tanstack/react-router";
import { HALAXY_URL, SITE_URL } from "@/config/site";
import { ContentGovernance } from "@/components/content-governance";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { trackEvent, trackNextAction } from "@/lib/analytics";

const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/assessment-preparation`;
const CLINIC_URL = "https://www.bodybelongingclinic.com.au";

export const Route = createFileRoute("/assessment-preparation")({
  head: () => ({
    meta: [
      { title: "ADHD assessment preparation guide | Body Belonging Clinic" },
      {
        name: "description",
        content:
          "A free, non-diagnostic ADHD assessment preparation guide from Lauren at Body Belonging Clinic: gather your story, records, examples and questions without having to prove yourself.",
      },
      { property: "og:title", content: "ADHD assessment preparation guide" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: AssessmentPreparationPage,
});

const storyPrompts = [
  {
    title: "Earlier life",
    prompts: [
      "What did adults notice about attention, activity, daydreaming, talking, waiting, losing things or finishing work?",
      "What took much more effort than your grades or achievements suggested?",
      "Were there routines, people, fear, perfectionism or last-minute pressure holding everything together?",
    ],
  },
  {
    title: "Life now",
    prompts: [
      "Where do time, memory, starting, stopping, switching or organising create the most friction?",
      "What happens when something is interesting, urgent, new or emotionally important?",
      "What is the impact across work or study, home, money, relationships, driving, sleep, eating and looking after yourself?",
    ],
  },
  {
    title: "The wider picture",
    prompts: [
      "What else might shape the picture: sleep, trauma, anxiety, depression, autism, dyslexia, hormones, pain, substance use or physical health?",
      "What medications, supplements or treatments are you currently using?",
      "What helps already—and what looks helpful from the outside but costs too much to sustain?",
    ],
  },
];

const clinicianQuestions = [
  "How will you explore childhood onset if reports or family collateral are unavailable?",
  "How do you consider autism, trauma, sleep, mood, anxiety, substance use and physical health?",
  "What is included: interviews, questionnaires, collateral, feedback, report and follow-up?",
  "If medication is something I want to discuss, who will prescribe and monitor it?",
  "How will my GP be involved, and what happens after the assessment?",
  "What should I do if parts of the process are inaccessible, overwhelming or culturally unsafe for me?",
];

function AssessmentPreparationPage() {
  const printGuide = () => {
    trackEvent("assessment_guide_print", { location: "assessment_preparation" });
    trackNextAction("assessment_guide_save", "assessment_preparation");
    window.print();
  };

  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]">
      <SiteHeader location="assessment_preparation" />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24 lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--terracotta)]">
                Free assessment preparation guide
              </p>
              <h1 className="mt-6 font-display text-4xl leading-tight md:text-6xl">
                You don&apos;t have to prove you&apos;re &ldquo;ADHD enough&rdquo;.
              </h1>
              <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[var(--oat)]/85">
                An assessment is meant to understand the pattern of your life — not reward whoever
                arrives with the neatest folder. This helps you gather what matters, without turning
                your story into a performance.
              </p>
              <button
                type="button"
                onClick={printGuide}
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 print:hidden"
              >
                Print or save this guide
              </button>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-[var(--oat)]/10 shadow-md md:max-w-none">
              <img src="/workspace.jpg" alt="A calm space to gather your notes" className="h-full w-full object-cover" loading="eager" decoding="async" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-16 md:py-24">
          <ContentGovernance
            labels={["Clinical practice lens", "Australian guideline"]}
            reviewNote="Written by Lauren Lynch from her own clinical research and practice experience. It is preparation support, not a diagnostic checklist or independent assessment."
          />

          <h2 className="mt-14 font-display text-3xl leading-tight md:text-5xl">
            Start with a rough timeline
          </h2>
          <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
            Dot points are enough. Use real moments rather than trying to remember diagnostic
            language. “I missed the bus three times this month” is more useful than “I have poor
            executive function”.
          </p>

          <div className="mt-10 grid gap-5">
            {storyPrompts.map((section) => (
              <article
                key={section.title}
                className="rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-6 md:p-8"
              >
                <h3 className="font-display text-2xl">{section.title}</h3>
                <ul className="mt-5 list-disc space-y-3 pl-6 leading-relaxed text-[var(--plum)]/80">
                  {section.prompts.map((prompt) => (
                    <li key={prompt}>{prompt}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[var(--cream)]">
          <div className="mx-auto max-w-4xl px-5 py-16 md:py-24">
            <h2 className="font-display text-3xl leading-tight md:text-5xl">
              Bring what exists—not what you think you should have
            </h2>
            <ul className="mt-10 list-disc space-y-4 pl-6 text-lg leading-relaxed text-[var(--plum)]/85">
              <li>School reports, work feedback or old assessments, if they are available.</li>
              <li>A current medication and health list.</li>
              <li>Two or three examples from different parts of life.</li>
              <li>Notes from someone who knew you earlier, only if this feels safe and useful.</li>
              <li>Your own questions, worries and hopes for the assessment.</li>
            </ul>
            <p className="mt-8 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
              Missing school reports, family estrangement, migration, disrupted schooling or not
              having a reliable childhood witness should be discussed—not treated as personal
              failure. Ask the assessor how they work with incomplete records before you pay.
            </p>
          </div>
        </section>

        {/* BREATH — full-bleed */}
        <section className="relative min-h-[56vh] w-full overflow-hidden bg-[var(--plum)]">
          <img src="/small-steps-note.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(46,26,34,0.7) 0%, rgba(46,26,34,0.3) 55%, rgba(46,26,34,0.5) 100%)" }} />
          <div className="relative mx-auto flex min-h-[56vh] max-w-4xl items-center justify-center px-5 text-center">
            <h2 className="max-w-[20ch] font-display text-[2rem] leading-tight text-[var(--oat)] md:text-5xl">
              Your real life is the evidence.
            </h2>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-16 md:py-24">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            Questions worth taking with you
          </h2>
          <ol className="mt-10 list-decimal space-y-4 pl-6 text-lg leading-relaxed text-[var(--plum)]/85">
            {clinicianQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>

          <div className="mt-14 rounded-3xl bg-[var(--plum)] p-8 text-[var(--oat)] md:p-10">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
              If organising it alone is the hard part
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight">
              We can prepare the story together.
            </h2>
            <p className="mt-5 max-w-[64ch] leading-relaxed text-[var(--oat)]/85">
              In a non-diagnostic preparation and care-navigation session, I can help you sort the
              timeline, identify the questions you want answered and plan the next step. I do not
              diagnose ADHD, prescribe medication or guarantee an assessment outcome.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 print:hidden">
              <a
                href={HALAXY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent("booking_click", { location: "assessment_preparation" });
                  trackNextAction("booking_open", "assessment_preparation");
                }}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[var(--cream)]"
              >
                Book through Halaxy
              </a>
              <a
                href={CLINIC_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackNextAction("clinic_facts_open", "assessment_preparation")}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--oat)]/40 px-6 py-3 text-sm font-medium text-[var(--oat)]"
              >
                Check current fees and credentials
              </a>
            </div>
          </div>

          <p className="mt-10 text-sm leading-relaxed text-[var(--plum)]/60">
            General preparation only. This guide does not screen for or diagnose ADHD and does not
            replace individual medical or mental-health assessment. Written by Lauren Lynch,
            Accredited Mental Health Social Worker. Published 26 July 2026 · review due 26 January
            2027.
          </p>
          <p className="mt-6">
            <Link
              to="/australian-adhd-care"
              onClick={() => trackNextAction("care_map_open", "assessment_preparation")}
              className="underline decoration-[var(--terracotta)] underline-offset-4"
            >
              See how Australian ADHD care roles fit together →
            </Link>
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
