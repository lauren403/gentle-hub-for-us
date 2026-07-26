import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/config/site";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/editorial-policy`;

export const Route = createFileRoute("/editorial-policy")({
  head: () => ({
    meta: [
      { title: "Editorial and evidence policy | Body Belonging Clinic" },
      {
        name: "description",
        content:
          "How the ADHD Hub distinguishes Australian guidance, research, clinical practice lenses, expert media and lived experience.",
      },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: EditorialPolicyPage,
});

const levels = [
  {
    label: "Australian guideline",
    use: "The primary reference point for ADHD assessment, treatment and care pathways in Australia.",
  },
  {
    label: "Systematic review or meta-analysis",
    use: "Used when available, with the population, limits and certainty described in plain language.",
  },
  {
    label: "Emerging research",
    use: "Clearly identified when evidence is early, mixed, indirect or not yet replicated.",
  },
  {
    label: "Clinical practice lens",
    use: "A way to organise therapeutic work. It is not presented as a biological fact or validated treatment model.",
  },
  {
    label: "Lived experience",
    use: "Valued for relevance, language and question-setting, but not treated as proof of effectiveness.",
  },
  {
    label: "Popular concept",
    use: "Recognisable terms such as rejection-sensitive dysphoria are identified as non-diagnostic where relevant.",
  },
];

function EditorialPolicyPage() {
  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]">
      <SiteHeader location="editorial_policy" />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="mx-auto max-w-3xl px-5 py-20 md:py-28">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
              Trust infrastructure
            </p>
            <h1 className="mt-5 font-display text-4xl leading-tight md:text-6xl">
              Editorial and evidence policy
            </h1>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-[var(--oat)]/85">
              The hub translates evidence without pretending every useful idea carries the same
              certainty.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <h2 className="font-display text-3xl md:text-4xl">Our clinical constitution</h2>
          <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
            The Australian Evidence-Based Clinical Practice Guideline for ADHD is our primary
            clinical reference. Nutrition, body-based work, international experts and podcasts can
            add useful context; they do not replace Australian guidance, an individual assessment or
            advice from a person&apos;s treating professionals.
          </p>

          <h2 className="mt-16 font-display text-3xl md:text-4xl">How we label knowledge</h2>
          <dl className="mt-8 space-y-5">
            {levels.map((level) => (
              <div
                key={level.label}
                className="rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-6"
              >
                <dt className="font-medium text-[var(--terracotta)]">{level.label}</dt>
                <dd className="mt-2 leading-relaxed text-[var(--plum)]/80">{level.use}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-16 font-display text-3xl md:text-4xl">Expert and podcast content</h2>
          <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
            Expert interviews and ADHD media help identify the questions people are asking. When we
            discuss them, we separate what a guest said, what lived experience recognises, what
            Australian guidance says, how certain the evidence is, what may be safe to try, and when
            professional advice is needed. Fame, credentials or a compelling story do not replace
            source review.
          </p>

          <h2 className="mt-16 font-display text-3xl md:text-4xl">Review and corrections</h2>
          <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
            Health pages identify the author, editorial review date and evidence types used. Until a
            named independent reviewer has approved a page, we say so. Material corrections are made
            promptly and review dates are updated only after the content is checked. Commercial
            relationships and conflicts will be disclosed on the relevant page.
          </p>
          <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
            To suggest a correction, email{" "}
            <a
              href="mailto:admin@bodybelongingclinic.com.au?subject=ADHD%20Hub%20content%20correction"
              className="underline decoration-[var(--terracotta)] underline-offset-4"
            >
              admin@bodybelongingclinic.com.au
            </a>{" "}
            with the page, statement and supporting source.
          </p>
          <p className="mt-12 text-sm text-[var(--plum)]/60">
            Policy owner: Lauren Lynch · Published 26 July 2026 · Review due 26 January 2027
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
