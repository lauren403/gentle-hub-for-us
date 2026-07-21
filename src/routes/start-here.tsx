import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL, HALAXY_URL, CONTACT } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { SiteHeader, SiteFooter, FloatingBook, Logo } from "@/components/site-chrome";

const TITLE = "Start here | Body Belonging Clinic";
const DESCRIPTION =
  "A gentle first step into care at Body Belonging Clinic. What a free intro call looks like, GP referrals, Medicare rebates, and what to expect.";
const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/start-here`;
const BOOK_URL = HALAXY_URL;

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
        To claim a Medicare rebate you will need a referral and a Mental Health Treatment Plan from your GP. You are welcome to begin without one, and the referral is simply what unlocks the rebate. There is more on this just below.
      </>
    ),
  },
  {
    n: "03",
    title: "Our first session.",
    body: (
      <>
        We go slowly. The first session is mostly me listening and understanding where you are, at your pace, with no expectation that you arrive sorted or with the right words ready.
      </>
    ),
  },
  {
    n: "04",
    title: "We find the rhythm that fits you.",
    body: (
      <>
        From there we work together, in the room or by telehealth right across Australia, for as long or as short as is genuinely useful to you. You are always the one who sets the pace.
      </>
    ),
  },
];

function StartHerePage() {
  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]">
      <SiteHeader location="start_here" activePath="/start-here" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--plum)] text-[var(--oat)]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 opacity-[0.06]">
          <Logo className="size-[520px] text-[var(--oat)]" />
        </div>
        <div className="mx-auto max-w-3xl px-5 py-24 md:py-32">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
            New here?
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] md:text-6xl">
            Start here
          </h1>
          <p className="mt-6 font-display text-xl italic text-[var(--oat)]/85 md:text-2xl">
            There is no wrong way to begin, and there is no rush. This page is simply here to make the first step feel easy, and to tell you honestly what to expect.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
          A gentle first step
        </p>
        <h2 className="mt-5 font-display text-3xl leading-tight md:text-5xl">
          How it works
        </h2>
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
            What it costs, honestly
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-[var(--plum)]/85 [&_p]:max-w-[68ch]">
            <p>
              I would rather be upfront about money than leave you guessing, so here is how it works.
            </p>
            <ul className="space-y-5 border-l-2 border-[var(--terracotta)] pl-6">
              <li className="max-w-[62ch]">
                A standard 50-minute session is $200. With a Mental Health Treatment Plan and referral from your GP, Medicare rebates $89.50 of that back to you, so your out-of-pocket is $110.50 per session. You will always know your exact cost before you ever book.
              </li>
              <li className="max-w-[62ch]">
                With a Mental Health Treatment Plan and referral from your GP, you can claim a Medicare rebate of $89.50 back on each individual session with an Accredited Mental Health Social Worker, for up to ten sessions in a calendar year. Your out-of-pocket is simply the gap between the fee and that rebate.
              </li>
              <li className="max-w-[62ch]">
                If you are living with an eating disorder, you may be eligible for an Eating Disorder Treatment and Management Plan, which can open access to many more sessions, up to forty psychological treatment sessions in a twelve-month period. Your GP assesses whether this is right for you.
              </li>
              <li className="max-w-[62ch]">
                Telehealth sessions are available anywhere in Australia and attract the same Medicare rebates.
              </li>
              <li className="max-w-[62ch]">
                Reduced-fee and bulk-billing options are available for those who qualify, including eligible Aboriginal and Torres Strait Islander clients. If that might be you, just mention it and we will sort it out together.
              </li>
              <li className="max-w-[62ch]">
                And if cost is a worry, please just say so on the intro call, and we will find something that works.
              </li>
            </ul>
            <p className="max-w-[62ch] text-sm italic text-[var(--plum)]/60">
              Rebate amounts are current as of 1 July 2026. Please confirm your own eligibility and the current amounts with your GP or Services Australia.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
          A softer landing
        </p>
        <h2 className="mt-5 font-display text-3xl leading-tight md:text-5xl">
          What to expect
        </h2>
        <ul className="mt-12 space-y-6">
          {[
            "A calm, low-stimulation space, whether we meet in the room or online.",
            "No need to have your story neat or your words ready. Rambling is welcome here, and so is silence.",
            "You will never be rushed through a schedule, and you will never be a problem to be moved along.",
          ].map((line, i) => (
            <li
              key={i}
              className="max-w-[62ch] rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-6 text-lg leading-relaxed text-[var(--plum)]/85"
            >
              {line}
            </li>
          ))}
        </ul>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-[var(--plum)] text-[var(--oat)]">
        <div className="mx-auto max-w-3xl px-5 py-24 md:py-32 text-center">
          <h2 className="font-display text-4xl leading-tight md:text-6xl">
            Ready when you are.
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] font-display text-xl italic text-[var(--oat)]/85 md:text-2xl">
            Whenever you feel like it, book a free intro call and we will take the first small step together.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent("start_here_cta", { target: "booking_closing" });
                trackEvent("booking_click", { location: "start_here_closing" });
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

      <SiteFooter />
      <FloatingBook location="start_here" />
    </div>
  );
}
