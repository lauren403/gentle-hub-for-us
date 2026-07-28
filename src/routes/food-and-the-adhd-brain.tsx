import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SITE_URL, HALAXY_URL } from "@/config/site";
import { SiteHeader, SiteFooter, FloatingBook, Logo } from "@/components/site-chrome";
import { trackEvent } from "@/lib/analytics";
import { ContentGovernance } from "@/components/content-governance";
import { FilmHero } from "@/components/cinema";

const TITLE = "Food and the ADHD brain: the honest science | Body Belonging Clinic";
const DESCRIPTION =
  "Does food really affect ADHD? An honest, weight-neutral look at the real science — omega-3, iron, zinc, magnesium, vitamin D and diet — what helps, what's hype, and how to explore it safely. Written by an AMHSW and ANZAED eating disorder clinician.";
const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/food-and-the-adhd-brain`;
const HEADLINE = "Food and the ADHD brain";

// Reduced-motion-safe matcha motion band: still poster by default, gentle looping
// video only when the visitor has not requested reduced motion.
function MatchaMotion() {
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
    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-[var(--plum)]/10 shadow-sm">
      {motion ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster="/food-motion-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="/food-motion.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/food-motion-poster.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}

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

export const Route = createFileRoute("/food-and-the-adhd-brain")({
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
  component: FoodAndTheAdhdBrainPage,
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

function FoodAndTheAdhdBrainPage() {
  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]">
      <SiteHeader location="food_and_the_adhd_brain" />

      <main id="main-content" tabIndex={-1}>
        {/* HERO — cinematic film still */}
        <FilmHero
          image="/hub-mug.jpg"
          alt="A warm mug, held in both hands"
          label="The nutrition question"
          title={HEADLINE}
          underline="ADHD brain"
        >
          The real science on what you eat and how your brain feels — held honestly, and without a
          single diet rule.
        </FilmHero>

        {/* BODY */}
        <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <ContentGovernance
            labels={["Systematic review", "Emerging research", "Clinical practice lens"]}
          />
          <P>
            There is a loud, confident conversation online about food and the ADHD brain, and it
            holds both real science and real danger. On one side, headlines promise that a
            supplement or a diet will transform your focus. On the other, people are told food has
            nothing to do with it at all. Both positions can overstate the evidence, and you deserve
            the honest middle. Food does matter for how a brain feels and functions — modestly, at
            the edges — and it is also a place where well-meaning advice tips quietly into
            restriction and harm, especially for anyone whose relationship with eating has ever been
            fragile. This page walks that line carefully, the way a good clinician would, and the
            way voices like Dr Rachel Gow have argued the science deserves.
          </P>

          <H2>Does food actually change an ADHD brain?</H2>
          <P>
            The honest answer is: a little, and the science is younger and messier than the
            headlines suggest. Large population studies link a &ldquo;Western&rdquo; dietary pattern
            — heavy in ultra-processed food, refined carbohydrate and sugary drinks — with a higher
            likelihood of ADHD symptoms, and Mediterranean-style eating with a lower one. But these
            are associations, not proof of cause. The arrow can point either way, because a brain
            that struggles with planning and reward may simply reach more often for quick, easy
            food, and a pattern measured across thousands of people never tells you what will happen
            for one. So food is worth taking seriously as one gentle lever among many — not as the
            thing that caused your ADHD, and not as the thing that will fix it.
          </P>

          <H2>Omega-3: the most studied, and the most oversold</H2>
          <P>
            Fish oil is where the science runs deepest and the marketing runs loudest, so it
            deserves a careful read. The brain is built partly from the fats we eat, and the omega-3
            fatty acids, EPA in particular, have been trialled more than any other supplement for
            ADHD. The honest verdict from the best evidence is modest. A 2023 Cochrane review of
            thirty-seven trials found only low-certainty evidence that omega-3s might help at all,
            alongside high-certainty evidence of no effect on overall parent-rated symptoms — and
            they are clearly less effective than stimulant medication. A separate 2023 meta-analysis
            of twenty-two randomised trials found no significant effect on core symptoms overall,
            though supplementing for four months or longer showed a small benefit. The plain
            translation: omega-3 is not a treatment for ADHD and not a replacement for anything
            already working for you. It may gently support a brain over time, alongside the rest of
            your care, and taking a bigger dose than the studies used does not buy you more.
          </P>

          <H2>Iron, zinc, magnesium, vitamin D: correct a lack, don&rsquo;t chase a cure</H2>
          <P>
            This is the part worth genuinely understanding, because it is where a real difference
            occasionally hides — and where supplement culture does the most harm. Several minerals
            and vitamins matter for the brain chemistry behind attention and mood, and low levels of
            iron (measured as ferritin), zinc, magnesium and vitamin D turn up somewhat more often
            in people with ADHD. The key word is low. The evidence suggests that correcting a
            genuine deficiency can modestly help, while topping up someone who already has enough
            does very little — and a few of these, iron and zinc especially, are actively harmful in
            excess. So the safe move is not a cupboard full of supplements. It is a blood test and a
            conversation with your GP: if something is genuinely low, treat it properly; if it is
            not, you save your money and spare your gut. Test, don&rsquo;t guess.
          </P>

          <H2>Steady beats special: blood sugar and a regular rhythm</H2>
          <P>
            Underneath all the supplement talk sits something far more boring and far more useful. A
            brain concentrates and stays even better on steady fuel than on the blood-sugar swings
            of skipped meals and grab-what-you-can eating. For an ADHD brain that already forgets to
            eat until it is urgent, the single most helpful nutrition step is usually not a
            supplement at all — it is a rhythm: something to eat at regular intervals, with a little
            protein, whether or not hunger has arrived yet. That idea comes straight from
            established eating-disorder practice, where it is called regular eating, and it is
            additive and weight-neutral, with individual suitability considered. There is{" "}
            <Link
              to="/letters/eating-by-the-clock-not-by-hunger"
              className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
            >
              a whole letter on how to do it gently
            </Link>
            , and{" "}
            <Link
              to="/anchor"
              className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
            >
              the Anchor app
            </Link>{" "}
            is being built to help you find it.
          </P>

          <figure className="my-16">
            <MatchaMotion />
            <figcaption className="mt-5 text-center font-display text-xl italic leading-snug text-[var(--plum)]/70 md:text-2xl">
              Steady beats special.
            </figcaption>
          </figure>

          <H2>The myths worth putting down</H2>
          <P>
            The belief that sugar &ldquo;causes&rdquo; hyperactivity is one of the most durable
            myths in this field, and the evidence for it is genuinely weak. Sweetened drinks show a
            slightly stronger association than sugar itself, and even that is tangled up with
            everything else about a way of eating. You do not need to fear a slice of birthday cake.
          </P>
          <P>
            Cutting foods out gets a great deal of airtime too. A small number of tightly supervised
            studies have shown behaviour changes in some children on strict elimination or
            &ldquo;few-foods&rdquo; diets, but the overall evidence is thin, the diets are punishing
            to sustain, and they carry a real risk of nutritional gaps. The IgG &ldquo;food
            intolerance&rdquo; blood tests sold to decide what to remove are not supported by
            evidence and are best avoided.
          </P>
          <P>
            And here is the line that matters most, and the reason this clinic exists: restriction
            can be a risky tool when ADHD or disordered eating is part of the picture. People who
            experience less noticeable hunger or fullness cues do not need another rulebook naming
            forbidden foods. The wellness version of &ldquo;food as brain fuel&rdquo; slides,
            quietly and with the best intentions, into fear and restriction — and that is the exact
            point where it stops being safe. Everything here runs the other way: additive, never
            subtractive; include and steady, never shrink and control.
          </P>

          <H2>The safe way to explore it</H2>
          <P>
            If you want to look at nutrition properly, do it additively and with the right people
            beside you. Begin with the plain, unglamorous things that help every brain — regular
            meals, accessible foods that meet your needs, and enough sleep and water. Ask your GP
            about whether testing is clinically indicated before you buy supplements. And if you
            want to go further than that, do it with an eating-disorder-informed Accredited
            Practising Dietitian who can hold the nutrition and the safety at the same time — not an
            influencer, not an elimination protocol, not a plan you found at 2am. That single choice
            is the whole difference between help and harm.
          </P>

          <H2>Where this sits in your care</H2>
          <P>
            This is the ground Body Belonging Clinic was built to stand on: the serious science of
            food and the ADHD brain, brought into the room without the diet talk. We hold it inside
            a wider frame — our{" "}
            <Link
              to="/approach"
              className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
            >
              Body Belonging practice framework
            </Link>{" "}
            — where food sits alongside your emotion, your focus, your sleep and your nervous
            system, rather than being treated as a problem to solve on its own. If eating and your
            ADHD feel tangled together, there is{" "}
            <Link
              to="/adhd-and-eating"
              className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
            >
              a fuller guide to ADHD and eating
            </Link>{" "}
            here too, and we can bring in the right dietitian alongside where it helps.
          </P>

          <H2>The honest bottom line</H2>
          <P>
            Food matters, modestly, at the edges, and it is worth taking seriously. It is never a
            cure. Keeping support additive and professionally guided reduces common risks. Treat
            food as one possible support among many, correct confirmed deficiencies with appropriate
            advice, and be cautious of anyone promising that a supplement or restrictive plan will
            transform ADHD.
          </P>
        </article>

        {/* CTA BAND */}
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center md:py-20">
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Food and ADHD questions, handled carefully.
            </h2>
            <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-[var(--oat)]/85">
              If this is your tangle, you do not have to sort it alone — and you certainly do not
              have to do it with a diet.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={HALAXY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("booking_click", { location: "food_brain_cta" })}
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

        {/* REFERENCES */}
        <section className="mx-auto max-w-3xl px-5 py-14">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
            Where this comes from
          </p>
          <h2 className="mt-4 font-display text-2xl leading-tight md:text-3xl">
            Sources &amp; further reading
          </h2>
          <ul className="mt-8 space-y-4 border-l-2 border-[var(--terracotta)] pl-6 text-base leading-relaxed text-[var(--plum)]/80">
            <li>
              National Center for Complementary and Integrative Health (NCCIH) —{" "}
              <a
                href="https://www.nccih.nih.gov/health/providers/digest/adhd-science"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
              >
                ADHD and Complementary Health Approaches: What the Science Says
              </a>
              .
            </li>
            <li>
              Cochrane Database of Systematic Reviews (2023) — polyunsaturated fatty acids
              (omega-3/6) for ADHD in children and adolescents.
            </li>
            <li>
              Meta-analysis of randomised controlled trials (2023),{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/37656283/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
              >
                Omega-3 Polyunsaturated Fatty Acids for Core Symptoms of ADHD
              </a>
              , Journal of Clinical Psychiatry.
            </li>
            <li>
              Narrative review (2022),{" "}
              <a
                href="https://www.mdpi.com/2072-6643/14/20/4332"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
              >
                Eating Patterns and Dietary Interventions in ADHD
              </a>
              , Nutrients.
            </li>
            <li>
              Systematic review (2021),{" "}
              <a
                href="https://www.mdpi.com/2072-6643/13/11/4059"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
              >
                The Role of Iron and Zinc in the Treatment of ADHD
              </a>
              , Nutrients.
            </li>
            <li>
              Gow, R. (2021),{" "}
              <a
                href="https://us.jkp.com/products/smart-foods-for-adhd-and-brain-health"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
              >
                Smart Foods for ADHD and Brain Health
              </a>
              , Jessica Kingsley Publishers.
            </li>
          </ul>
          <p className="mt-8 max-w-[68ch] text-sm italic leading-relaxed text-[var(--plum)]/60">
            This page is general education, not medical or nutritional advice, and it is not a
            substitute for care from your GP, dietitian or treating clinician. Nutrition should
            never replace treatment that is working for you. Always talk to your own health
            professionals before changing supplements or how you eat.
          </p>
        </section>

        {/* SUPPORT FOOTNOTE */}
        <section className="mx-auto max-w-3xl px-5 pb-16">
          <div className="rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-6 text-sm leading-relaxed text-[var(--plum)]/80 md:p-8">
            <p>
              If any of this has stirred something difficult around food, please reach out for
              support. In an emergency call <strong className="text-[var(--plum)]">000</strong>. For
              free help any time you can call Lifeline on{" "}
              <strong className="text-[var(--plum)]">13 11 14</strong>, or the Butterfly
              Foundation&rsquo;s eating disorders line on{" "}
              <strong className="text-[var(--plum)]">1800 33 4673</strong> (1800 ED HOPE).
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <FloatingBook location="food_and_the_adhd_brain" />
    </div>
  );
}
