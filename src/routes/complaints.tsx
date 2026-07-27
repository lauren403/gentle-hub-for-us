import { createFileRoute } from "@tanstack/react-router";
import { CONTACT, SITE_URL } from "@/config/site";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/complaints`;

export const Route = createFileRoute("/complaints")({
  head: () => ({
    meta: [
      { title: "Feedback and complaints | Body Belonging Clinic" },
      {
        name: "description",
        content:
          "How to give feedback or make a complaint about Body Belonging Clinic, including independent complaint pathways.",
      },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
  component: ComplaintsPage,
});

function ComplaintsPage() {
  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]">
      <SiteHeader location="complaints" />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="mx-auto max-w-3xl px-5 py-20 md:py-28">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
              Your rights
            </p>
            <h1 className="mt-5 font-display text-4xl leading-tight md:text-6xl">
              Feedback and complaints
            </h1>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-[var(--oat)]/85">
              You can raise a concern without it affecting your access to respectful support.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <h2 className="font-display text-3xl md:text-4xl">Start with the clinic, if you can</h2>
          <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-[var(--plum)]/85">
            Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> with the subject
            “Complaint” or call{" "}
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>{CONTACT.phone}</a>. Tell us what
            happened, what impact it had and what you would like us to consider. We will acknowledge
            the complaint, handle it respectfully and explain the outcome. You may have a support
            person or advocate help you.
          </p>

          <div className="mt-10 rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-6">
            <h2 className="font-display text-2xl">WA Code of Conduct</h2>
            <p className="mt-4 leading-relaxed text-[var(--plum)]/80">
              Social workers are among the health workers covered by Western Australia&apos;s Code
              of Conduct for certain health care workers. The Code includes requirements about safe
              and ethical services, consent, privacy, records, insurance and complaint information.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--plum)]/80">
              In line with those requirements, Body Belonging Clinic holds professional indemnity
              insurance.
            </p>
            <a
              href="https://www.hadsco.wa.gov.au/~/media/HaDSCO/Publications/Code-of-Conduct/A4-Code-of-Conduct-Poster---Easy-English-2023.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block underline decoration-[var(--terracotta)] underline-offset-4"
            >
              Read the WA Code of Conduct poster ↗
            </a>
          </div>

          <h2 className="mt-16 font-display text-3xl md:text-4xl">
            Independent complaint pathways
          </h2>
          <ul className="mt-8 space-y-6 text-lg leading-relaxed text-[var(--plum)]/85">
            <li>
              <strong>Western Australia:</strong> Health and Disability Services Complaints Office
              (HaDSCO), <a href="tel:+61865517600">(08) 6551 7600</a>, or{" "}
              <a
                href="https://www.hadsco.wa.gov.au/Make-a-Complaint"
                target="_blank"
                rel="noopener noreferrer"
              >
                make a complaint online
              </a>
              .
            </li>
            <li>
              <strong>Privacy:</strong> after first giving the clinic a reasonable opportunity to
              respond, you may contact the Office of the Australian Information Commissioner at{" "}
              <a
                href="https://www.oaic.gov.au/privacy/privacy-complaints"
                target="_blank"
                rel="noopener noreferrer"
              >
                oaic.gov.au/privacy/privacy-complaints
              </a>
              .
            </li>
            <li>
              <strong>AASW conduct:</strong> concerns about professional conduct may also be raised
              through the Australian Association of Social Workers&apos; ethics and complaints
              process.
            </li>
          </ul>
          <p className="mt-8 max-w-[68ch] text-sm leading-relaxed text-[var(--plum)]/65">
            If you received telehealth while physically located outside WA, another state or
            territory complaints body may also be able to help. Contact us for the relevant pathway
            or use your jurisdiction&apos;s health complaints commissioner.
          </p>
          <p className="mt-12 text-sm text-[var(--plum)]/60">
            Published 26 July 2026 · Review due 26 January 2027
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
