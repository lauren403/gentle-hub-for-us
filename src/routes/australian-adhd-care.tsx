import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL } from "@/config/site";
import { ContentGovernance } from "@/components/content-governance";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/australian-adhd-care`;

export const Route = createFileRoute("/australian-adhd-care")({
  head: () => ({
    meta: [
      { title: "Australian ADHD care map for adults | Body Belonging Clinic" },
      {
        name: "description",
        content:
          "Who does what in Australian adult ADHD care, how to prepare for assessment and where therapy, medication, dietetics and functional support fit.",
      },
      { property: "og:title", content: "Australian ADHD care map for adults" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: AustralianAdhdCarePage,
});

const journeys = [
  {
    title: "I am wondering whether this could be ADHD",
    body: "Start with examples across childhood and adult life, current impact, sleep, mental health, substance use, physical health and possible co-occurring conditions. A GP can help plan the next step.",
  },
  {
    title: "I am preparing for an assessment",
    body: "Gather school reports if available, a timeline of traits, examples from more than one setting, medication and health history, and optional collateral from someone who knew you earlier in life.",
  },
  {
    title: "I am waiting for assessment",
    body: "You can still seek support for distress, routines, sleep, eating, relationships, study or work. Therapy does not need to pretend a diagnosis has already been made.",
  },
  {
    title: "I have just been diagnosed",
    body: "Ask what the diagnosis explains, what else needs attention, the treatment options, monitoring plan, report access, follow-up, and how care will be shared with your GP.",
  },
  {
    title: "Medication helps, but difficulties remain",
    body: "Review medication with the prescriber and identify the remaining functional, emotional, environmental or relational needs. Psychosocial support can complement medical treatment.",
  },
  {
    title: "Medication is affecting appetite or sleep",
    body: "Speak with the prescriber rather than changing medication alone. A GP or APD may help assess nutrition and physical health; urgent or medically risky changes need prompt review.",
  },
  {
    title: "ADHD and eating feel tangled",
    body: "Choose weight-neutral, eating-disorder-informed support. Avoid elimination protocols, non-validated intolerance tests and supplement plans that are not based on clinical need.",
  },
  {
    title: "I may be AuDHD",
    body: "Ask for assessment and support that can consider autism, masking, sensory needs, burnout and communication—not only ADHD symptoms in isolation.",
  },
];

const roles = [
  {
    role: "General practitioner",
    can: "Review physical and mental health, consider different explanations, make referrals, coordinate care and monitor health. Some GPs diagnose or prescribe ADHD medication where their training and jurisdiction allow.",
    limit:
      "Availability, authority and shared-care arrangements vary. Ask the individual GP what they provide.",
  },
  {
    role: "Psychiatrist",
    can: "Assess and diagnose ADHD and co-occurring psychiatric conditions; discuss, prescribe and monitor medication within professional and jurisdictional requirements.",
    limit: "A psychiatrist may not provide ongoing therapy or broader allied-health support.",
  },
  {
    role: "Psychologist",
    can: "Provide psychological assessment and therapy within training and competence, including support for functioning, distress and co-occurring concerns.",
    limit:
      "Psychologists do not prescribe medication. Report acceptance and diagnostic pathways should be checked before paying for an assessment.",
  },
  {
    role: "Accredited Mental Health Social Worker",
    can: "Provide psychosocial assessment and evidence-informed therapy, consider family, identity, environment and systems, and coordinate or refer.",
    limit: "Body Belonging Clinic does not diagnose ADHD or prescribe medication.",
  },
  {
    role: "Occupational therapist",
    can: "Assess participation and support routines, sensory needs, environmental changes, executive-function scaffolds and daily activities within scope.",
    limit: "OT support is not a substitute for medical assessment or prescribing.",
  },
  {
    role: "Accredited Practising Dietitian",
    can: "Assess nutrition, eating patterns, access, sensory needs, medication-related appetite issues and confirmed deficiencies; provide individual nutrition advice.",
    limit:
      "An APD does not diagnose ADHD or replace medical monitoring. Seek eating-disorder-informed practice where relevant.",
  },
  {
    role: "Pharmacist",
    can: "Explain dispensing, interactions, safe use, storage and common medication questions, and refer concerns to the prescriber.",
    limit: "Medication changes require the authorised prescriber.",
  },
];

function AustralianAdhdCarePage() {
  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]">
      <SiteHeader location="care_map" />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="mx-auto max-w-4xl px-5 py-20 md:py-28">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">Navigate</p>
            <h1 className="mt-5 font-display text-4xl leading-tight md:text-6xl">
              The Australian adult ADHD care map
            </h1>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-[var(--oat)]/85">
              A plain-language guide to the next step, who does what and where each professional
              role stops.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-16 md:py-24">
          <ContentGovernance
            labels={["Australian guideline", "Clinical practice lens"]}
            reviewNote="Author-reviewed against current Australian national guidance. State and territory prescribing details require jurisdiction-specific confirmation."
          />

          <h2 className="mt-16 font-display text-3xl leading-tight md:text-5xl">
            Find your starting point
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {journeys.map((journey) => (
              <article
                key={journey.title}
                className="rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-6"
              >
                <h3 className="font-display text-2xl leading-tight">{journey.title}</h3>
                <p className="mt-4 leading-relaxed text-[var(--plum)]/75">{journey.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[var(--cream)]">
          <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
            <h2 className="font-display text-3xl leading-tight md:text-5xl">
              Who does what in ADHD care?
            </h2>
            <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/80">
              Titles do not guarantee ADHD expertise. Ask about training, age group, assessment
              method, co-occurring conditions, eating-disorder risk, cultural responsiveness, fees,
              report acceptance and follow-up before committing.
            </p>
            <div className="mt-10 overflow-x-auto rounded-2xl border border-[var(--plum)]/10">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead className="bg-[var(--plum)] text-[var(--oat)]">
                  <tr>
                    <th scope="col" className="p-4 font-medium">
                      Professional
                    </th>
                    <th scope="col" className="p-4 font-medium">
                      May contribute
                    </th>
                    <th scope="col" className="p-4 font-medium">
                      Check the limits
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((item) => (
                    <tr key={item.role} className="border-t border-[var(--plum)]/10 align-top">
                      <th scope="row" className="bg-[var(--oat)] p-4 font-medium">
                        {item.role}
                      </th>
                      <td className="p-4 leading-relaxed text-[var(--plum)]/80">{item.can}</td>
                      <td className="p-4 leading-relaxed text-[var(--plum)]/70">{item.limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-16 md:py-24">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            Questions before paying for assessment
          </h2>
          <ul className="mt-10 list-disc space-y-4 pl-6 text-lg leading-relaxed text-[var(--plum)]/85">
            <li>Which guidelines and diagnostic criteria do you use?</li>
            <li>How do you establish childhood onset and impact across settings?</li>
            <li>
              How do you consider autism, trauma, sleep, mood, anxiety, substance use and health?
            </li>
            <li>
              What collateral or records are required, and what happens if they are unavailable?
            </li>
            <li>What is included in the fee: report, feedback, follow-up and correspondence?</li>
            <li>Will the report be accepted by the prescriber or service I intend to use?</li>
            <li>Who manages medication monitoring and physical-health checks after diagnosis?</li>
          </ul>

          <h2 className="mt-16 font-display text-3xl leading-tight md:text-5xl">
            Australian rules are not uniform
          </h2>
          <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
            Diagnosis, stimulant prescribing, permits, specialist review and GP shared-care
            arrangements can vary by profession and state or territory. This hub will not collapse
            those differences into one national promise. Confirm the current pathway with the
            clinician and the relevant health department before paying or changing care.
          </p>

          <div className="mt-10 rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-6">
            <p className="font-medium">Primary Australian reference</p>
            <a
              href="https://adhdguideline.aadpa.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block underline decoration-[var(--terracotta)] underline-offset-4"
            >
              Australian Evidence-Based Clinical Practice Guideline for ADHD ↗
            </a>
          </div>

          <p className="mt-10 text-sm text-[var(--plum)]/60">
            General education only. This page does not determine diagnosis, eligibility, prescribing
            authority or an individual treatment plan. Published 26 July 2026 · Review due 26
            January 2027.
          </p>
          <p className="mt-6">
            <Link
              to="/start-here"
              className="underline decoration-[var(--terracotta)] underline-offset-4"
            >
              See how Body Belonging Clinic fits into this map →
            </Link>
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
