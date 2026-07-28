import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL, HALAXY_URL } from "@/config/site";
import { SiteHeader, SiteFooter, FloatingBook, Logo } from "@/components/site-chrome";
import { trackEvent } from "@/lib/analytics";
import { ContentGovernance } from "@/components/content-governance";

const TITLE = "ADHD and eating: a weight-neutral guide | Body Belonging Clinic";
const DESCRIPTION =
  "A clear, compassionate, weight-neutral guide to why ADHD and eating are so connected, why diets backfire, and what actually helps. Written by an AMHSW and ANZAED eating disorder clinician.";
const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/adhd-and-eating`;
const HEADLINE = "ADHD and eating, held safely";

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: HEADLINE,
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Lauren Lynch" },
  publisher: { "@type": "Organization", name: "Body Belonging Clinic" },
  mainEntityOfPage: CANONICAL,
  url: CANONICAL,
};

export const Route = createFileRoute("/adhd-and-eating")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(articleLd) }],
  }),
  component: AdhdAndEatingPage,
});

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-20 font-display text-3xl leading-tight text-[var(--plum)] md:text-4xl">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">{children}</p>
  );
}

function AdhdAndEatingPage() {
  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]">
      <SiteHeader location="adhd_and_eating" />

      <main id="main-content" tabIndex={-1}>
        {/* HERO */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24 lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--terracotta)]">
                The guide
              </p>
              <h1 className="mt-6 font-display text-4xl leading-[1.05] md:text-6xl">{HEADLINE}</h1>
              <p className="mt-7 max-w-[46ch] font-display text-lg italic leading-snug text-[var(--oat)]/90 md:text-xl">
                If your relationship with food has always felt harder and stranger than it seems for
                other people — and no one ever linked it to your ADHD — this guide is for you.
              </p>
              <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-[var(--oat)]/60">
                Written to reduce common eating-disorder-related risks; it cannot be safe or suitable
                for every person.
              </p>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-[var(--oat)]/10 shadow-md md:max-w-none">
              <img src="/food-feature.jpg" alt="Gentle, weight-neutral nourishment" className="h-full w-full object-cover" loading="eager" decoding="async" />
            </div>
          </div>
        </section>

        {/* BODY */}
        <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <ContentGovernance
            labels={[
              "Australian guideline",
              "Systematic review",
              "Emerging research",
              "Clinical practice lens",
            ]}
          />
          <H2>Why ADHD and eating are so connected</H2>
          <P>
            For a long time, ADHD and eating were treated as separate subjects, one about attention
            and one about food, handled by different people who rarely spoke to each other. In real
            life they are deeply entwined, and understanding why is the first relief, because it
            moves the whole thing out of the territory of willpower and character and into something
            that finally makes sense.
          </P>
          <P>
            Interoception—the perception of internal body signals such as hunger and fullness—may be
            one contributor for some people. Executive function, time awareness, sensory
            preferences, reward, sleep, distress and food access can also shape eating. Stimulant
            medication can reduce appetite for some people and should be discussed with the
            prescriber. These are possible contributors to explore, not a single explanation for
            every person.
          </P>

          <H2>The patterns you might recognise</H2>
          <P>
            Most people arrive already knowing the shape of their own struggle, they have just never
            heard it named without judgement. A few of the most common:
          </P>
          <P>
            Forgetting to eat during the day, then feeling urgently hungry at night. Less noticeable
            body cues may contribute, but so can medication timing, task absorption, planning,
            sensory barriers and missed opportunities to eat.{" "}
            <Link
              to="/letters/why-a-brain-like-ours-forgets-to-eat"
              className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
            >
              Why a brain like ours forgets to eat
            </Link>
            .
          </P>
          <P>
            Eating for stimulation, soothing or interest as well as hunger. This is human and may
            have several causes; it does not need a moral or “dopamine hack” explanation.
          </P>
          <P>
            Eating to soothe strong feelings. Emotion-regulation difficulties are common in ADHD but
            are not unique to it. Food can become one available way to cope, and the context
            deserves understanding rather than restriction.
          </P>
          <P>
            Sensory complexity around food. For many people, and especially those who are also
            autistic, texture, smell and the feel of particular foods matter enormously, so a
            &ldquo;balanced plate&rdquo; can be genuinely difficult for reasons that have nothing to
            do with fussiness. See{" "}
            <Link
              to="/letters/audhd-autistic-and-adhd"
              className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
            >
              the AuDHD letter
            </Link>
            .
          </P>
          <P>
            Hyperfocus and forgotten meals, then a crash. A brilliant, absorbed afternoon can
            swallow lunch whole, and the crash that follows gets blamed on the person rather than
            the pattern.
          </P>
          <P>
            If you saw yourself more than once in that list, you are not disordered for it, and you
            are certainly not alone. You have a brain that reads the body differently, meeting a
            world of food that assumes everyone reads it the same way.
          </P>

          <H2>Why diets and food rules backfire, and can harm</H2>
          <P>
            Here is where I have to be firm, because it matters. The internet is full of advice that
            turns ADHD and food into a set of rules, foods to fear, whole groups to cut out, a
            supplement to fix it all. For a brain like ours, that approach is not just unhelpful, it
            can be dangerous.
          </P>
          <P>
            A brain that already reads hunger and fullness less clearly, and that already carries a
            higher risk of disordered eating, does not need another external rulebook to override
            its signals. Restriction tends to produce the very swings, the intense preoccupation,
            the all-or-nothing eating, that people then blame themselves for. And research
            consistently links dieting and restriction to the development of eating disorders, which
            is why an approach built on cutting out and controlling is precisely the wrong tool for
            a population already at greater risk. The wellness version of &ldquo;food as brain
            fuel&rdquo; can slide, quietly and with the best intentions, into harm.
          </P>
          <P>
            So the guiding principle here is the opposite of a diet. It is additive, not
            restrictive. The goal is always to include, to steady and to nourish, never to shrink,
            earn or control.
          </P>

          <figure className="my-16">
            <div className="overflow-hidden rounded-3xl border border-[var(--plum)]/10 shadow-sm">
              <img src="/ranunculus.jpg" alt="" loading="lazy" decoding="async" className="aspect-[16/10] h-full w-full object-cover" />
            </div>
            <figcaption className="mt-5 text-center font-display text-xl italic leading-snug text-[var(--plum)]/70 md:text-2xl">
              Include, steady, nourish — never shrink, earn or control.
            </figcaption>
          </figure>

          <H2>What actually helps, gently</H2>
          <P>
            Eating by the clock, not by hunger. When the hunger signal is unreliable, the kindest
            move is to stop waiting for it and lean on a gentle rhythm instead, something to eat at
            regular intervals across the day whether or not the signal has arrived. This idea comes
            from well-established eating disorder practice, where it is called regular eating, and
            it is one of the most steadying things a person with unreliable cues can do. It is
            additive and weight-neutral by design. There is{" "}
            <Link
              to="/letters/eating-by-the-clock-not-by-hunger"
              className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
            >
              a full letter on this
            </Link>
            , and{" "}
            <Link
              to="/anchor"
              className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
            >
              the Anchor app
            </Link>{" "}
            is being built to sit gently in your pocket while you find your rhythm.
          </P>
          <P>
            Reducing the decisions. A great deal of ADHD eating difficulty is really decision
            overwhelm. Keeping a few easy, reliable meals on hand, ones you do not have to think
            about, removes a barrier that willpower was never going to solve.
          </P>
          <P>
            Working with sensory needs, not against them. Safe foods are not a failure. Building
            from the textures and tastes that actually work for you, and adding gently from there,
            is far kinder and far more effective than forcing a &ldquo;balanced plate&rdquo; that
            your nervous system rejects.
          </P>
          <P>
            Meeting the emotion underneath. When food is soothing a loud feeling, the answer is not
            to remove the food, it is to understand and support the feeling, so that food becomes
            one option among several rather than the only one available.
          </P>
          <P>
            Self-compassion as the foundation. None of this works while you are also busy despising
            yourself. The steadier your tone with yourself, the more room there is for any of it to
            take root. This is not a soft extra, it is the ground the whole thing grows from.
          </P>

          <H2>The whole-person picture: the Body Belonging practice framework</H2>
          <P>
            Eating is never really separate from the rest of you, which is why we hold it inside a
            wider frame. Our clinical approach, the Body Belonging practice framework, moves through
            safety first, then gently noticing what your body and feelings are telling you, then
            steadying yourself in ways a prescription cannot teach, and finally belonging, because
            connection is where change actually lasts. Food sits inside that whole, alongside your
            emotion, your focus, your sleep and your nervous system, rather than being treated as a
            problem to be solved on its own. See{" "}
            <Link
              to="/approach"
              className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
            >
              the Our Approach page
            </Link>
            .
          </P>

          <H2>Nutrition, honestly</H2>
          <P>
            People often want to know about the nutrition science, the omega-3s, the supplements,
            the &ldquo;food as brain fuel&rdquo; idea popularised by voices like Dr Rachel Gow in
            the United Kingdom. The honest summary is that there is a real and interesting science
            here, and it is modest rather than miraculous, some evidence of a small benefit from
            omega-3 for some people, alongside the plain good sense of steady blood sugar and mostly
            whole foods. It is worth knowing, it is never a cure, and it is only safe when it stays
            additive and never tips into restriction. If you want to explore it, the right people
            are your GP and an eating-disorder-informed Accredited Practising Dietitian, not an
            influencer or an elimination plan. There is{" "}
            <Link
              to="/letters/food-as-brain-fuel-safely"
              className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
            >
              a full, careful letter on this
            </Link>
            .
          </P>

          <H2>When to reach for more support</H2>
          <P>
            Some signs are worth taking seriously, and reaching out about, sooner rather than later:
            eating that feels out of your control, strong distress or guilt around food, skipping
            meals to change your body, purging or compensating, or food worries that are taking up
            more and more of your mind. None of these mean anything is wrong with you as a person,
            and all of them are reasons to be gently supported by someone who understands both ADHD
            and eating. Reaching out early is a strength, not a last resort.
          </P>

          <H2>How we help</H2>
          <P>
            This is the exact ground Body Belonging Clinic was built to stand on, ADHD and eating
            held together, safely, by an Accredited Mental Health Social Worker who is also an
            ANZAED credentialed eating disorder clinician, and who can bring in an
            eating-disorder-informed Accredited Practising Dietitian alongside where it helps. The
            approach is weight-neutral and designed to reduce restrictive risks; suitability and
            referral needs are discussed individually.
          </P>
        </article>

        {/* CTA BAND */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center md:py-20">
            <h2 className="font-display text-3xl leading-tight md:text-4xl">Ready when you are.</h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={HALAXY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("booking_click", { location: "adhd_and_eating_cta" })}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--terracotta)] px-8 py-3 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 active:scale-[0.98]"
              >
                Book a free intro call
              </a>
              <Link
                to="/start-here"
                className="text-sm font-medium text-[var(--oat)] underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
              >
                Start here →
              </Link>
            </div>
          </div>
        </section>

        {/* SUPPORT FOOTNOTE */}
        <section className="mx-auto max-w-3xl px-5 py-14">
          <div className="rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-6 text-sm leading-relaxed text-[var(--plum)]/80 md:p-8">
            <p>
              If any of this has stirred something difficult, please reach out for support. In an
              emergency call <strong className="text-[var(--plum)]">000</strong>. For free help any
              time you can call Lifeline on <strong className="text-[var(--plum)]">13 11 14</strong>
              , or the Butterfly Foundation's eating disorders line on{" "}
              <strong className="text-[var(--plum)]">1800 33 4673</strong> (1800 ED HOPE).
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <FloatingBook location="adhd_and_eating" />
    </div>
  );
}
