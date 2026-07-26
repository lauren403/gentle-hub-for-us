import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTACT, SITE_URL } from "@/config/site";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/anchor-terms`;

export const Route = createFileRoute("/anchor-terms")({
  head: () => ({
    meta: [
      { title: "Anchor terms of use | Body Belonging Clinic" },
      {
        name: "description",
        content:
          "Intended purpose, safety limits and user responsibilities for the Anchor web tool.",
      },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: AnchorTermsPage,
});

function AnchorTermsPage() {
  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]">
      <SiteHeader location="anchor_terms" />
      <main id="main-content" tabIndex={-1}>
        <article className="mx-auto max-w-3xl px-5 py-20 text-lg leading-relaxed text-[var(--plum)]/85 md:py-28 [&_h2]:mt-14 [&_h2]:font-display [&_h2]:text-3xl [&_p]:mt-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">Anchor</p>
          <h1 className="mt-5 font-display text-4xl leading-tight md:text-6xl">Terms of use</h1>
          <p>
            <strong>Version 1.0 · 26 July 2026.</strong> By using Anchor you acknowledge the limits
            below. If these terms do not work for you, do not use the tool.
          </p>
          <h2>Intended purpose</h2>
          <p>
            Anchor provides optional, user-set prompts that may help an adult remember a regular
            eating rhythm. It is a general wellbeing tool. It does not diagnose, prevent, monitor,
            predict or treat ADHD, an eating disorder or any other health condition.
          </p>
          <h2>Not clinical or emergency monitoring</h2>
          <p>
            Anchor does not replace individual advice, medical monitoring or treatment. The clinic
            does not see whether you act on a reminder. Do not rely on it where missed eating or
            another symptom may create a medical risk. In an emergency call 000.
          </p>
          <h2>Use safely</h2>
          <p>
            Choose reminders with your treating professional if you have an eating disorder,
            diabetes, pregnancy-related needs, medication-related appetite changes or another
            condition requiring an individual plan. Pause Anchor if it increases anxiety, compulsive
            checking, shame or eating-disorder symptoms.
          </p>
          <h2>Availability and changes</h2>
          <p>
            Anchor is provided without a promise of uninterrupted availability. Features may change
            as safety, accessibility and privacy reviews are completed. Material changes to intended
            purpose or data handling will be reflected in these terms and the{" "}
            <Link to="/anchor-privacy">Anchor privacy notice</Link>.
          </p>
          <h2>Contact</h2>
          <p>
            Questions or safety feedback: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
