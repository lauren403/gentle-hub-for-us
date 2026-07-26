import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL, HALAXY_URL, CONTACT } from "@/config/site";
import { trackEvent, trackNextAction } from "@/lib/analytics";
import { SiteHeader, SiteFooter, FloatingBook, Logo } from "@/components/site-chrome";

const TITLE = "Start here | Body Belonging Clinic";
const DESCRIPTION =
  "A gentle first step into care at Body Belonging Clinic. What a free intro call looks like, GP referrals, Medicare rebates, and what to expect.";
const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/start-here`;
const BOOK_URL = HALAXY_URL;
const CLINIC_URL = "https://www.bodybelongingclinic.com.au";

export const Route = createFileRoute("/start-here")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: StartHerePage,
});

const STEPS = [
  {
    n: "01",
    title: "A free, no-pressure hello.",
    body: (
      <>
        We start with a{" "}
        <a
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackEvent("start_here_cta", { target: "booking_step1" });
            trackEvent("booking_click", { location: "start_here_step1" });
            trackNextAction("booking_open", "start_here_step1");
          }}
        >
          free fifteen-minute intro call
        </a>
        , so you can get a feel for me and ask anything at all, before you commit to a single thing.
      </>
    ),
  },
  {
    n: "02",
    title: "A referral from your GP, if you would like the rebate.",
    body: (
      <>
        To claim a Medicare rebate you will need a referral and a Mental Health Treatment Plan from
        your GP. You are welcome to begin without one, and the referral is simply what unlocks the
        rebate. There is more on this just below.
      </>
    ),
  },
  {
    n: "03",
    title: "Our first session.",
    body: (
      <>
        We go slowly. The first session is mostly me listening and understanding where you are, at
        your pace, with no expectation that you arrive sorted or with the right words ready.
      </>
    ),
  },
  {
    n: "04",
    title: "We find the rhythm that fits you.",
    body: (
      <>
        From there we work together, in the room or by telehealth across Australia. The Body
        Belonging practice framework can give therapy a shared structure; Anchor and the Letters are
        optional general resources between visits.
      </>
    ),
  },
];

function StartHerePage() {
  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]">
      <SiteHeader location="start_here" activePath="/start-here" />
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
              Pull up a chair
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] md:text-6xl">Start here</h1>
            <p className="mt-6 font-display text-xl italic text-[var(--oat)]/85 md:text-2xl">
              No wrong way to begin, and no rush. This page exists to make the first step easy — and
              to tell you what happens, where to check current fees, and what to expect. No mystery.
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
            A gentle first step
          </p>
          <h2 className="mt-5 font-display text-3xl leading-tight md:text-5xl">How it works</h2>
          <ol className="mt-12 space-y-10">
            {STEPS.map((s) => (
              <li key={s.n} className="grid gap-5 md:grid-cols-[auto_1fr] md:gap-8">
                <div
                  aria-hidden="true"
                  className="font-display text-4xl italic leading-none text-[var(--terracotta)] md:text-5xl"
                >
                  {s.n}
                </div>
                <div className="max-w-[62ch]">
                  <h3 className="font-display text-xl leading-snug text-[var(--plum)] md:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-[var(--plum)]/85 [&_a]:underline [&_a]:decoration-[var(--terracotta)] [&_a]:underline-offset-4 hover:[&_a]:text-[var(--terracotta)]">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* COSTS */}
        <section className="bg-[var(--cream)]">
          <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
              Money, plainly
            </p>
            <h2 className="mt-5 font-display text-3xl leading-tight md:text-5xl">
              One current source for fees
            </h2>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-[var(--plum)]/85 [&_p]:max-w-[68ch]">
              <p>
                I would rather be upfront about money than leave you guessing. Current public fees,
                credentials, Medicare information and clinic scope are maintained on the main Body
                Belonging Clinic website so you do not have to compare two versions.
              </p>
              <a
                href={CLINIC_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackNextAction("clinic_facts_open", "start_here_fees")}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[var(--cream)]"
              >
                Check current fees, credentials and scope
              </a>
              <p className="max-w-[62ch] text-sm italic text-[var(--plum)]/60">
                Halaxy remains the source of truth for appointment availability and booking.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT TO EXPECT */}
        <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
            A softer landing
          </p>
          <h2 className="mt-5 font-display text-3xl leading-tight md:text-5xl">What to expect</h2>
          <ul className="mt-12 space-y-6">
            {[
              "A calm, low-stimulation space, whether we meet in the room or online.",
              "No need to have your story neat or your words ready. Rambling is welcome here, and so is silence.",
              "Sessions have a clear scheduled length. Your time is protected, and we agree on the focus and next step together.",
            ].map((line, i) => (
              <li
                key={i}
                className="max-w-[62ch] rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-6 text-lg leading-relaxed text-[var(--plum)]/85"
              >
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[62ch] text-lg leading-relaxed text-[var(--plum)]/85">
            Want to know it's more than warmth?{" "}
            <a
              href="/approach"
              className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
            >
              See what the model actually rests on →
            </a>
          </p>
        </section>

        {/* CLOSING CTA */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="mx-auto max-w-3xl px-5 py-24 md:py-32 text-center">
            <h2 className="font-display text-4xl leading-tight md:text-6xl">Ready when you are.</h2>
            <p className="mx-auto mt-6 max-w-[52ch] font-display text-xl italic text-[var(--oat)]/85 md:text-2xl">
              Whenever you feel like it, book a free intro call and we will take the first small
              step together.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent("start_here_cta", { target: "booking_closing" });
                  trackEvent("booking_click", { location: "start_here_closing" });
                  trackNextAction("booking_open", "start_here_closing");
                }}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--terracotta)] px-8 py-4 text-base font-medium text-[var(--cream)] transition-all hover:brightness-110 active:scale-[0.98]"
              >
                Book a free intro call
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                onClick={() => trackEvent("start_here_cta", { target: "email" })}
                className="text-sm text-[var(--oat)]/80 underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--oat)]"
              >
                or email {CONTACT.email}
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingBook location="start_here" />
    </div>
  );
}
