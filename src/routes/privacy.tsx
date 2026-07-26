import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTACT, SITE_URL } from "@/config/site";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { clearAnalyticsConsent } from "@/lib/analytics";

const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/privacy`;

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy | Body Belonging Clinic" },
      {
        name: "description",
        content:
          "How Body Belonging Clinic collects, uses, stores and protects personal and health information.",
      },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
});

const providers = [
  {
    name: "Halaxy",
    purpose: "online booking, practice administration and clinical records",
    href: "https://www.halaxy.com/article/privacy",
  },
  {
    name: "Supabase",
    purpose: "website email-list database and supporting infrastructure",
    href: "https://supabase.com/privacy",
  },
  {
    name: "Netlify",
    purpose: "website hosting, form processing and security logs",
    href: "https://www.netlify.com/privacy/",
  },
  {
    name: "Google Analytics",
    purpose: "optional, consent-based website measurement",
    href: "https://policies.google.com/privacy",
  },
];

function PrivacyPage() {
  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]">
      <SiteHeader location="privacy" />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-[var(--plum)] text-[var(--oat)]">
          <div className="mx-auto max-w-3xl px-5 py-20 md:py-28">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
              Body Belonging Clinic
            </p>
            <h1 className="mt-5 font-display text-4xl leading-tight md:text-6xl">Privacy Policy</h1>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-[var(--oat)]/85">
              This policy explains how Body Belonging Clinic, operated by Lauren Lynch, handles
              personal information under the Privacy Act 1988 and the Australian Privacy Principles.
            </p>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-5 py-16 text-lg leading-relaxed text-[var(--plum)]/85 md:py-24 [&_a]:underline [&_a]:decoration-[var(--terracotta)] [&_a]:underline-offset-4 [&_h2]:mt-16 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:text-[var(--plum)] [&_p]:mt-6 [&_ul]:mt-6 [&_ul]:space-y-3 [&_ul]:pl-6 [&_ul]:list-disc">
          <p>
            <strong>Last updated:</strong> 26 July 2026. This policy covers the ADHD Hub website,
            Body Belonging Clinic&apos;s clinical service and the current Anchor web tool. It should
            be read with the short notice shown where information is collected.
          </p>

          <h2>What we collect</h2>
          <p>Depending on how you interact with us, we may collect:</p>
          <ul>
            <li>name, email address, phone number, address and communication preferences;</li>
            <li>booking, referral, billing, Medicare and appointment information;</li>
            <li>
              health information you choose to provide, including history, assessments, treatment
              notes, risk information and correspondence with other practitioners;
            </li>
            <li>
              identity information where relevant to respectful support, such as cultural,
              disability, sexuality or gender information;
            </li>
            <li>
              website information such as pages visited, approximate location, device, browser,
              security logs and analytics choice; and
            </li>
            <li>feedback, complaint, access or correction requests.</li>
          </ul>
          <p>
            An email submitted on an ADHD website may reveal a health-related interest even if you
            provide no clinical details. Please do not put clinical, crisis or other sensitive
            information into the email updates form.
          </p>

          <h2>How we collect information</h2>
          <p>
            We usually collect information directly from you: through the website, Halaxy booking,
            email, telephone, forms and sessions. With your consent or where permitted by law, we
            may receive information from a referrer, GP, other treating practitioner, funder,
            advocate, parent or support person.
          </p>
          <p>
            You may browse the hub without identifying yourself. For clinical support we need enough
            accurate information to provide a safe service and meet professional, billing and
            record-keeping obligations. If you do not provide it, some services may not be
            available.
          </p>

          <h2>Why we use and disclose it</h2>
          <p>We use or disclose information where reasonably necessary to:</p>
          <ul>
            <li>respond to enquiries, assess fit, book and provide services;</li>
            <li>maintain clinical records and coordinate support with your consent;</li>
            <li>process payments, rebates, funded-service requirements and administration;</li>
            <li>send updates you expressly requested and manage unsubscribe requests;</li>
            <li>keep the website, Anchor and clinic systems secure and reliable;</li>
            <li>improve services using aggregated or de-identified information where practical;</li>
            <li>respond to risk, emergencies, complaints or legal obligations; and</li>
            <li>protect a person from a serious threat where disclosure is authorised by law.</li>
          </ul>
          <p>
            We do not sell personal information. We do not send email addresses, form entries or
            clinical information to Google Analytics.
          </p>

          <h2>Service providers and overseas handling</h2>
          <p>
            We use contracted providers to operate the clinic and website. Access is limited to what
            is needed for their service. Current providers include:
          </p>
          <ul>
            {providers.map((provider) => (
              <li key={provider.name}>
                <a href={provider.href} target="_blank" rel="noopener noreferrer">
                  {provider.name}
                </a>{" "}
                — {provider.purpose}.
              </li>
            ))}
          </ul>
          <p>
            Some providers are headquartered or use support, backup or processing locations outside
            Australia. Likely overseas handling may include the United States and other locations
            listed in the providers&apos; current privacy and infrastructure documentation. Hosting
            regions and subprocessors can change, so we review this provider register and will
            update this policy when a material data flow changes.
          </p>
          <p>
            Clicking the Halaxy booking link leaves this website. Halaxy&apos;s own collection
            notice and privacy terms apply to information entered there.
          </p>

          <h2>Website analytics and cookies</h2>
          <p>
            Google Analytics loads only after you choose “Allow analytics.” If you decline, the hub
            continues to work. Necessary browser storage may still be used for security, basic
            functionality and remembering your analytics choice.
          </p>
          <button
            type="button"
            onClick={clearAnalyticsConsent}
            className="mt-6 min-h-11 rounded-full border border-[var(--plum)]/25 px-5 py-2 text-sm text-[var(--plum)]"
          >
            Change my analytics choice
          </button>

          <h2>Email updates</h2>
          <p>
            We send hub or Anchor updates only when you ask for them. Messages identify Body
            Belonging Clinic and include an unsubscribe option. You may also unsubscribe by emailing{" "}
            <a href={`mailto:${CONTACT.email}?subject=Unsubscribe`}>{CONTACT.email}</a>. We aim to
            action unsubscribe requests promptly and within the period required by Australian spam
            law.
          </p>

          <h2>Anchor</h2>
          <p>
            The current Anchor web tool is intended as a general wellbeing aid. Its reminder
            settings are designed to stay on the user&apos;s device. The ADHD Hub may separately
            collect an email address if you join Anchor updates. Anchor is not a clinical record,
            monitoring service, crisis service, diagnostic tool or treatment. Read the{" "}
            <Link to="/anchor-privacy">Anchor privacy notice</Link> before use.
          </p>

          <h2>Security, retention and deletion</h2>
          <p>
            We use access controls, reputable service providers, encrypted connections, system
            updates and other reasonable safeguards appropriate to sensitive health information. No
            online system can be guaranteed completely secure. If a data breach is likely to cause
            serious harm, we will assess and respond under the Notifiable Data Breaches scheme.
          </p>
          <p>
            Clinical and financial records are retained for the periods required by law,
            professional obligations, Medicare or funding arrangements. Email-list information is
            retained while you remain subscribed or while reasonably required to evidence consent
            and honour suppression requests. Information no longer required is securely destroyed or
            de-identified where lawful.
          </p>

          <h2>Access and correction</h2>
          <p>
            You may request access to personal information we hold or ask us to correct it. Contact
            the Privacy Officer using the details below. We may need to verify your identity. If an
            exception applies, we will explain the decision where legally permitted.
          </p>

          <h2>Privacy questions and complaints</h2>
          <p>
            Contact: <strong>Privacy Officer, Body Belonging Clinic</strong>
            <br />
            Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <br />
            Phone: <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>{CONTACT.phone}</a>
            <br />
            Post: {CONTACT.address.street}, {CONTACT.address.suburb} {CONTACT.address.state}{" "}
            {CONTACT.address.postcode}
          </p>
          <p>
            Please describe the issue and the outcome you are seeking. We will acknowledge and
            investigate it, and ordinarily aim to respond within 30 days. If you are not satisfied,
            you may contact the Office of the Australian Information Commissioner. Clinical
            complaints have additional pathways described on our{" "}
            <Link to="/complaints">feedback and complaints page</Link>.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We review this policy at least annually and when a material system, product or
            information flow changes. The updated date at the top records the latest review. A copy
            in another accessible format is available on request.
          </p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
