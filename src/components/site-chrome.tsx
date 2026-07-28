import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { HALAXY_URL } from "@/config/site";
import { trackEvent, trackNextAction } from "@/lib/analytics";
import { submitLeadSignup } from "@/lib/lead-signup";
import { isLikelySpam, looksLikeEmail } from "@/lib/spam-guard";

const BOOK_URL = HALAXY_URL;
const CLINIC_URL = "https://www.bodybelongingclinic.com.au";

export const Logo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 1080 1080" className={className} aria-hidden="true">
    <path
      d="M326 262 L472 300 L472 486 L762 516 L762 856 L620 856 L620 690 L472 690 L472 856 L326 856 Z"
      fill="currentColor"
    />
  </svg>
);

type PrimaryNavItem = { label: string; to: string; hash?: string };

const PRIMARY_NAV: PrimaryNavItem[] = [
  { label: "Start here", to: "/start-here" },
  { label: "Care map", to: "/australian-adhd-care" },
  { label: "Approach", to: "/approach" },
  { label: "Letters", to: "/letters" },
  { label: "Anchor", to: "/anchor" },
];

export function SiteHeader({ location, activePath }: { location: string; activePath?: string }) {
  const linkCls = "opacity-80 transition-opacity hover:opacity-100";
  const activeCls = "opacity-100 underline decoration-[var(--terracotta)] underline-offset-8";
  void activePath;
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--plum)]/10 bg-[var(--plum)] text-[var(--oat)]">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          aria-label="Body Belonging Clinic — home"
        >
          <span className="grid size-9 place-items-center rounded-full bg-[var(--oat)] text-[var(--plum)]">
            <Logo className="size-6" />
          </span>
          <span className="hidden items-baseline gap-1.5 leading-tight sm:flex">
            <span className="font-display text-base font-medium">Body Belonging</span>
            <span className="font-hand text-lg text-[var(--terracotta)]">ADHD Hub</span>
          </span>
        </Link>
        <nav
          className="ml-auto hidden items-center gap-5 text-sm lg:flex xl:gap-6"
          aria-label="Site navigation"
        >
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              className={linkCls}
              activeProps={item.hash ? undefined : { className: activeCls }}
              activeOptions={item.hash ? undefined : { exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("booking_click", { location: `${location}_header` })}
          className="ml-auto lg:ml-4 inline-flex items-center justify-center rounded-full bg-[var(--terracotta)] px-5 py-2.5 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 active:scale-[0.98] min-h-11 whitespace-nowrap"
        >
          <span className="hidden sm:inline">Book a free intro call</span>
          <span className="sm:hidden">Book</span>
        </a>
        {/* Mobile menu */}
        <details className="relative lg:hidden">
          <summary
            className="grid size-10 cursor-pointer list-none place-items-center rounded-full border border-[var(--oat)]/25 text-[var(--oat)] [&::-webkit-details-marker]:hidden"
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </summary>
          <nav
            className="absolute right-0 top-12 z-50 min-w-56 rounded-2xl border border-[var(--plum)]/20 bg-[var(--cream)] p-3 text-sm text-[var(--plum)] shadow-lg"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col">
              {PRIMARY_NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    hash={item.hash}
                    className="block rounded-lg px-3 py-2.5 hover:bg-[var(--oat)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function FloatingBook({ location }: { location: string }) {
  // The sticky header already provides a mobile booking action. Keeping a
  // second floating action obscured content and duplicated the same choice.
  void location;
  return null;
}

function FooterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const mountedAt = useRef(Date.now());
  return (
    <div className="mb-14 rounded-3xl border border-[var(--oat)]/15 bg-[var(--oat)]/[0.04] p-7 md:p-9">
      <div className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-10">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--terracotta)]">
            The Letters, to your inbox
          </p>
          <h2 className="mt-3 font-display text-2xl leading-tight text-[var(--oat)] md:text-3xl">
            Occasional, honest, never spam.
          </h2>
          <p className="mt-2 max-w-[46ch] text-sm text-[var(--oat)]/70">
            A quiet note when a new Letter lands or Anchor grows. Unsubscribe any time.
          </p>
        </div>
        {submitted ? (
          <div
            role="status"
            aria-live="polite"
            className="rounded-2xl bg-[var(--oat)] p-5 text-sm text-[var(--plum)]"
          >
            You&apos;re on the list — thank you. We&apos;ll only write about the hub and Anchor.
          </div>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const trimmed = email.trim();
              if (!trimmed || !consent || !looksLikeEmail(trimmed)) return;
              setSubmitting(true);
              setError(false);
              if (isLikelySpam(honeypot, Date.now() - mountedAt.current)) {
                setSubmitting(false);
                setSubmitted(true);
                return;
              }
              const result = await submitLeadSignup({
                email: trimmed,
                source: "footer_newsletter",
                consentVersion: "hub-updates-v1",
                consentedAt: new Date().toISOString(),
                honeypot,
              });
              setSubmitting(false);
              if (!result.ok) {
                setError(true);
                return;
              }
              trackEvent("sign_up", { location: "footer_newsletter" });
              trackNextAction("email_signup", "footer_newsletter");
              setSubmitted(true);
            }}
            className="space-y-3"
          >
            <div
              aria-hidden="true"
              style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }}
            >
              <label htmlFor="footer-company">Company</label>
              <input
                id="footer-company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="min-h-11 flex-1 rounded-full border border-[var(--oat)]/25 bg-[var(--oat)] px-5 py-3 text-base text-[var(--plum)] placeholder:text-[var(--plum)]/40 focus:border-[var(--terracotta)] focus:outline-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="min-h-11 rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 disabled:opacity-70"
              >
                {submitting ? "Sending…" : "Subscribe"}
              </button>
            </div>
            <label className="flex items-start gap-3 text-xs leading-relaxed text-[var(--oat)]/70">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 size-4 accent-[var(--terracotta)]"
              />
              <span>
                I agree to receive occasional Body Belonging Clinic hub &amp; Anchor emails. See the{" "}
                <Link to="/privacy" className="underline decoration-[var(--terracotta)] underline-offset-4">
                  privacy policy
                </Link>
                .
              </span>
            </label>
            {error && (
              <p role="alert" className="text-xs text-[var(--oat)]">
                Couldn&apos;t save that just now — please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[var(--plum)] text-[var(--oat)]/80">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-4">
        <div className="border-t border-[var(--oat)]/15 pt-12">
          <FooterSignup />
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-full bg-[var(--oat)] text-[var(--plum)]">
                  <Logo className="size-6" />
                </span>
                <span className="font-display text-base text-[var(--oat)]">
                  Body Belonging Clinic
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed">
                Telehealth across Australia
                <br />
                <a
                  className="underline decoration-[var(--terracotta)] underline-offset-4"
                  href="mailto:admin@bodybelongingclinic.com.au"
                >
                  admin@bodybelongingclinic.com.au
                </a>
                <br />
                Telehealth across Australia.
              </p>
              <p className="mt-4 text-sm">
                <a
                  href={CLINIC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[var(--terracotta)] underline-offset-4"
                >
                  Body Belonging Clinic ↗
                </a>
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--terracotta)]">
                Explore the hub
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link to="/start-here" className="hover:text-[var(--oat)]">Start here</Link></li>
                <li><Link to="/australian-adhd-care" className="hover:text-[var(--oat)]">Australian ADHD care map</Link></li>
                <li><Link to="/approach" className="hover:text-[var(--oat)]">Our approach</Link></li>
                <li><Link to="/adhd-and-eating" className="hover:text-[var(--oat)]">ADHD &amp; eating</Link></li>
                <li><Link to="/food-and-the-adhd-brain" className="hover:text-[var(--oat)]">Food &amp; the brain</Link></li>
                <li><Link to="/assessment-preparation" className="hover:text-[var(--oat)]">Assessment prep</Link></li>
                <li><Link to="/letters" className="hover:text-[var(--oat)]">Letters</Link></li>
                <li><Link to="/anchor" className="hover:text-[var(--oat)]">Anchor</Link></li>
                <li><Link to="/our-story" className="hover:text-[var(--oat)]">Our story</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--terracotta)]">
                If you need help right now
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  Emergency — <strong className="text-[var(--oat)]">000</strong>
                </li>
                <li>
                  Lifeline — <strong className="text-[var(--oat)]">13 11 14</strong>
                </li>
                <li>
                  13YARN — <strong className="text-[var(--oat)]">13 92 76</strong>
                </li>
                <li>
                  Butterfly — <strong className="text-[var(--oat)]">1800 33 4673</strong>
                </li>
              </ul>
              <p className="mt-4 text-xs text-[var(--oat)]/60">
                Education & wellbeing. Not a crisis service.
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--terracotta)]">
                With respect
              </p>
              <p className="mt-4 text-sm leading-relaxed">
                We acknowledge the Traditional Owners of the lands on which we live and work, and
                pay our respects to Elders past and present.
              </p>
              <p className="mt-6 text-xs">
                <Link
                  to="/privacy"
                  className="underline decoration-[var(--terracotta)] underline-offset-4"
                >
                  Privacy
                </Link>
                <span className="mx-2 opacity-40">·</span>
                <Link
                  to="/complaints"
                  className="underline decoration-[var(--terracotta)] underline-offset-4"
                >
                  Complaints
                </Link>
              </p>
              <p className="mt-3 text-xs">
                <Link
                  to="/editorial-policy"
                  className="underline decoration-[var(--terracotta)] underline-offset-4"
                >
                  Editorial policy
                </Link>
                <span className="mx-2 opacity-40">·</span>
                <Link
                  to="/anchor-privacy"
                  className="underline decoration-[var(--terracotta)] underline-offset-4"
                >
                  Anchor privacy
                </Link>
                <span className="mx-2 opacity-40">·</span>
                <Link
                  to="/anchor-terms"
                  className="underline decoration-[var(--terracotta)] underline-offset-4"
                >
                  Anchor terms
                </Link>
              </p>
              <p className="mt-3 text-xs">© {new Date().getFullYear()} Body Belonging Clinic</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
