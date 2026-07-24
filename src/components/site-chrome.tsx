import { Link } from "@tanstack/react-router";
import { HALAXY_URL } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

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
  { label: "Reframe", to: "/", hash: "reframe" },
  { label: "Food & the brain", to: "/food-and-the-adhd-brain" },
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
          <span className="hidden font-display text-base font-medium leading-tight sm:block">
            Body Belonging<span className="opacity-60"> · ADHD Hub</span>
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
  // Mobile-only compact CTA docked bottom-right so it never covers body text.
  return (
    <a
      href={BOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("booking_click", { location: `${location}_floating` })}
      aria-label="Book a free 15-minute intro call"
      className="md:hidden fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 inline-flex items-center justify-center rounded-full bg-[var(--terracotta)] px-4 py-2.5 text-sm font-medium text-[var(--cream)] shadow-lg transition-all hover:brightness-110 active:scale-[0.98] min-h-11"
    >
      Book
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[var(--plum)] text-[var(--oat)]/80">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-4">
        <div className="border-t border-[var(--oat)]/15 pt-12">
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
                3A Megalong Street, Nedlands WA 6009
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
                <li>
                  <Link to="/start-here" className="hover:text-[var(--oat)]">
                    Start here
                  </Link>
                </li>
                <li>
                  <Link to="/" hash="reframe" className="hover:text-[var(--oat)]">
                    Reframe
                  </Link>
                </li>
                <li>
                  <Link to="/" hash="medication" className="hover:text-[var(--oat)]">
                    Medication
                  </Link>
                </li>
                <li>
                  <Link to="/food-and-the-adhd-brain" className="hover:text-[var(--oat)]">
                    Food &amp; the brain
                  </Link>
                </li>
                <li>
                  <Link to="/" hash="services" className="hover:text-[var(--oat)]">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/approach" className="hover:text-[var(--oat)]">
                    Our approach
                  </Link>
                </li>
                <li>
                  <Link to="/letters" className="hover:text-[var(--oat)]">
                    Letters
                  </Link>
                </li>
                <li>
                  <Link to="/anchor" className="hover:text-[var(--oat)]">
                    Anchor
                  </Link>
                </li>
                <li>
                  <Link to="/our-story" className="hover:text-[var(--oat)]">
                    Our story
                  </Link>
                </li>
                <li>
                  <Link to="/" hash="faq" className="hover:text-[var(--oat)]">
                    FAQ
                  </Link>
                </li>
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
                <a
                  href="/privacy"
                  className="underline decoration-[var(--terracotta)] underline-offset-4"
                >
                  Privacy
                </a>
                <span className="mx-2 opacity-40">·</span>
                <span>© {new Date().getFullYear()} Body Belonging Clinic</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
