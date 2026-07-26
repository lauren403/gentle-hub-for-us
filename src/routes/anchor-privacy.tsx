import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTACT, SITE_URL } from "@/config/site";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/anchor-privacy`;

export const Route = createFileRoute("/anchor-privacy")({
  head: () => ({
    meta: [
      { title: "Anchor privacy notice | Body Belonging Clinic" },
      {
        name: "description",
        content:
          "What the current Anchor web tool stores, what it does not collect and its limits.",
      },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: AnchorPrivacyPage,
});

function AnchorPrivacyPage() {
  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]">
      <SiteHeader location="anchor_privacy" />
      <main id="main-content" tabIndex={-1}>
        <article className="mx-auto max-w-3xl px-5 py-20 text-lg leading-relaxed text-[var(--plum)]/85 md:py-28 [&_h2]:mt-14 [&_h2]:font-display [&_h2]:text-3xl [&_p]:mt-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">Anchor</p>
          <h1 className="mt-5 font-display text-4xl leading-tight md:text-6xl">Privacy notice</h1>
          <p>
            <strong>Version 1.0 · 26 July 2026.</strong> This notice applies to the current Anchor
            web tool at anchor.bodybelongingclinic.com.au. It should be read with the clinic&apos;s{" "}
            <Link to="/privacy">full privacy policy</Link>.
          </p>

          <h2>Current data design</h2>
          <p>
            Anchor is designed to work without an account. Reminder preferences and day-to-day
            interactions are intended to stay on the device and are not intended to become a
            clinical record. Do not enter clinical notes, crisis information or information about
            another person into Anchor.
          </p>

          <h2>Email updates are separate</h2>
          <p>
            If you join the Anchor updates list on the ADHD Hub, the hub collects your email address
            and consent record through its website providers. That email is not linked to reminder
            activity inside Anchor. You can unsubscribe using the link in an email or by contacting{" "}
            <a href={`mailto:${CONTACT.email}?subject=Unsubscribe%20from%20Anchor`}>
              {CONTACT.email}
            </a>
            .
          </p>

          <h2>Limits</h2>
          <p>
            Anchor is a general wellbeing prompt, not a diagnosis, treatment, medical device,
            clinical monitor or crisis service. It does not tell the clinic whether you have eaten
            or whether you are safe. If reminders increase distress or eating-disorder symptoms,
            pause the tool and speak with your treating professional. In an emergency call 000.
          </p>

          <h2>Questions, access and complaints</h2>
          <p>
            Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. Privacy complaints may
            also be taken to the OAIC after giving the clinic a reasonable opportunity to respond.
          </p>
          <p className="text-sm text-[var(--plum)]/60">
            This notice must be reviewed before any account, cloud sync, push-notification service,
            analytics, clinical feature or new data category is introduced.
          </p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
