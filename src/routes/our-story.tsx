import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HALAXY_URL, SITE_URL } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { SiteFooter, SiteHeader, Logo } from "@/components/site-chrome";

const TITLE = "Our Story | Body Belonging Clinic";
const DESCRIPTION =
  "Why Body Belonging Clinic exists — an Aboriginal-led, queer-affirming, neuroaffirming practice for body, identity and belonging.";
const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/our-story`;
const SAGE = "#B7BC7A";
const kicker = "font-mono text-xs uppercase tracking-[0.2em] text-[var(--terracotta)]";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: OurStoryPage,
});

// Pride motion breath — poster still by default, muted looping video only when motion is allowed.
function PrideBand() {
  const [motion, setMotion] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setMotion(!mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden bg-[var(--plum)]">
      {motion ? (
        <video className="absolute inset-0 h-full w-full object-cover" poster="/hub-pride-poster.jpg" autoPlay muted loop playsInline aria-hidden="true">
          <source src="/hub-pride.mp4" type="video/mp4" />
        </video>
      ) : (
        <img src="/hub-pride-poster.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
      )}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(46,26,34,0.66), rgba(46,26,34,0.14) 55%, rgba(46,26,34,0.42))" }} />
      <div className="relative mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center px-5 text-center">
        <h2 className="max-w-[18ch] font-display text-[2rem] leading-tight text-[var(--oat)] md:text-[3.4rem]">
          There&apos;s a seat here that&apos;s yours.
        </h2>
      </div>
    </section>
  );
}

function OurStoryPage() {
  return (
    <div className="min-h-dvh bg-[var(--cream)] text-[var(--plum)]">
      <SiteHeader location="our_story" />
      <main id="main-content" tabIndex={-1}>
        {/* HERO — plum */}
        <section className="relative overflow-hidden bg-[var(--plum)] text-[var(--oat)]">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 opacity-[0.06]">
            <Logo className="size-[520px] text-[var(--oat)]" />
          </div>
          <div className="mx-auto max-w-5xl px-5 py-24 md:py-32">
            <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
              <div>
                <p className={kicker}>Body Belonging Clinic</p>
                <h1 className="mt-5 font-display text-4xl leading-[1.04] md:text-[5rem]">Why this clinic exists</h1>
                <p className="mt-6 font-display text-xl italic text-[var(--oat)]/85 md:text-2xl">Support should feel like belonging.</p>
              </div>
              <figure className="md:justify-self-end">
                <div className="overflow-hidden rounded-3xl border border-[var(--oat)]/15 shadow-xl">
                  <img src="/hub-portrait2.jpg" alt="Lauren Lynch, founder of Body Belonging Clinic" loading="eager" decoding="async" fetchPriority="high" className="aspect-[4/5] h-full w-full object-cover" />
                </div>
                <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-[var(--oat)]/60">Lauren Lynch · Founder</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* A NOTE FROM LAUREN — sage */}
        <section style={{ backgroundColor: SAGE }} className="text-[var(--plum)]">
          <div className="mx-auto max-w-3xl px-5 py-20 md:py-28">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5c4a1e]">A note from Lauren</p>
            <h2 className="mt-5 font-display text-3xl leading-tight md:text-[3.4rem]">Bring the whole story</h2>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-[var(--plum)]/85 [&_p]:max-w-[68ch]">
              <p>
                I created Body Belonging Clinic for people who have not felt they belong in standard
                services—particularly when neurodivergence, eating, body image, culture, sexuality,
                gender, trauma or identity overlap.
              </p>
              <p>
                I am a proud Yorta Yorta woman, queer and neurodivergent. Lived experience informs why
                I notice exclusion and why I care about language, shame and access. It does not
                replace professional boundaries, evidence or your own expertise in your life.
              </p>
              <p>
                Professionally, I am an Accredited Mental Health Social Worker and ANZAED Credentialed
                Eating Disorder Clinician. I have worked across eating disorders, mental health,
                trauma, Aboriginal therapeutic services, LGBTQIA+ services and multidisciplinary
                settings. The clinic brings those strands together without pretending one clinician
                can hold every discipline.
              </p>
              <p>
                That means therapy with time to understand context, clear scope, active collaboration
                and referral to GPs, psychiatrists, Accredited Practising Dietitians, occupational
                therapists or other professionals when their expertise is needed.
              </p>
            </div>
          </div>
        </section>

        {/* PRIDE MOTION BREATH */}
        <PrideBand />

        {/* WHAT THE NAME ASKS — terracotta */}
        <section className="bg-[var(--terracotta)] text-[var(--cream)]">
          <div className="mx-auto max-w-4xl px-5 py-20 md:py-28">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--cream)]/80">What the name asks of us</p>
            <h2 className="mt-5 font-display text-3xl leading-tight md:text-[3.2rem]">
              Belonging is a practice, not a promise we can make for you
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                { title: "No explaining yourself first", body: "We reduce assumptions and ask what respectful, accessible and identity-affirming support means to you." },
                { title: "Evidence with its limits visible", body: "Guidelines, research, clinical lenses and lived experience are labelled rather than blended into one claim." },
                { title: "Scope before ego", body: "The clinic provides therapy and support. It does not diagnose ADHD or prescribe medication, and it refers when another discipline is needed." },
              ].map((item) => (
                <article key={item.title} className="rounded-2xl bg-[var(--cream)] p-6 text-[var(--plum)]">
                  <h3 className="font-display text-2xl">{item.title}</h3>
                  <p className="mt-4 leading-relaxed text-[var(--plum)]/75">{item.body}</p>
                </article>
              ))}
            </div>
            <p className="mt-10 max-w-[68ch] text-lg leading-relaxed text-[var(--cream)]/90">
              An Aboriginal-led service can still get things wrong. Cultural safety belongs to the
              person receiving the service. Feedback and complaints are welcomed and independent
              pathways are published clearly.
            </p>
          </div>
        </section>

        {/* CHAIR INVITATION — cream */}
        <section className="bg-[var(--cream)]">
          <div className="mx-auto max-w-3xl px-5 py-20 md:py-28">
            <h2 className="font-display text-3xl leading-tight md:text-[3.4rem]">
              The chair is an invitation, not a guarantee of fit
            </h2>
            <p className="mt-8 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
              A free intro call is a chance to ask questions and check whether Lauren&apos;s scope and
              way of working fit what you need. If they do not, we will say so honestly and identify a
              more appropriate next step where possible.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={HALAXY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("booking_click", { location: "our_story" })}
                className="inline-flex min-h-11 items-center rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[var(--cream)]"
              >
                Book a free intro call
              </a>
              <Link to="/approach" className="inline-flex min-h-11 items-center rounded-full border border-[var(--plum)] px-6 py-3 text-sm">
                Read the practice framework
              </Link>
            </div>
            <div className="mt-14 border-l-2 border-[var(--terracotta)] pl-6">
              <p className="font-display text-2xl italic">
                Lauren Lynch
                <span className="mt-2 block font-sans text-sm not-italic text-[var(--plum)]/70">
                  Accredited Mental Health Social Worker · ANZAED Credentialed Eating Disorder
                  Clinician · Proud Yorta Yorta woman
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* CLOSER — plum */}
        <section className="relative overflow-hidden bg-[var(--plum)] text-[var(--oat)]">
          <img src="/hub-locs.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(46,26,34,0.84) 0%, rgba(46,26,34,0.55) 100%)" }} />
          <div className="relative mx-auto max-w-3xl px-5 py-24 text-center md:py-32">
            <p className="font-display text-4xl leading-tight md:text-6xl">Every body belongs.</p>
            <p className="mx-auto mt-8 max-w-[56ch] text-lg leading-relaxed text-[var(--oat)]/80">
              We work towards a room where you can bring the whole story—while remaining honest
              about scope, capacity and the work still required to make services safer.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
