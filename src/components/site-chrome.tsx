import { Link } from "@tanstack/react-router";
import { HALAXY_URL } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

const BOOK_URL = HALAXY_URL;

export const Logo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 1080 1080" className={className} aria-hidden="true">
    <path
      d="M326 262 L472 300 L472 486 L762 516 L762 856 L620 856 L620 690 L472 690 L472 856 L326 856 Z"
      fill="currentColor"
    />
  </svg>
);

export function SiteHeader({
  location,
  activePath,
}: {
  location: string;
  activePath?: string;
}) {
  const linkCls = "opacity-80 transition-opacity hover:opacity-100";
  const activeCls =
    "opacity-100 underline decoration-[var(--terracotta)] underline-offset-8";
  const isActive = (p: string) => activePath === p;
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--plum)]/10 bg-[var(--plum)] text-[var(--oat)]">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Body Belonging Clinic — home">
          <span className="grid size-9 place-items-center rounded-full bg-[var(--oat)] text-[var(--plum)]">
            <Logo className="size-6" />
          </span>
          <span className="hidden font-display text-base font-medium leading-tight sm:block">
            Body Belonging<span className="opacity-60"> · ADHD Hub</span>
          </span>
        </Link>
        <nav className="ml-auto hidden items-center gap-6 text-sm md:flex" aria-label="Site navigation">
          <Link to="/" className={linkCls}>Home</Link>
          <Link to="/start-here" className={isActive("/start-here") ? activeCls : linkCls}>Start here</Link>
          <Link to="/our-story" className={linkCls}>Our Story</Link>
          <Link to="/anchor" className={linkCls}>Anchor</Link>
          <Link
            to="/letters"
            className={isActive("/letters") ? activeCls : linkCls}
          >
            Letters
          </Link>
          <Link to="/approach" className={linkCls}>Our Approach</Link>
        </nav>
        <a
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("booking_click", { location: `${location}_header` })}
          className="ml-auto md:ml-4 inline-flex items-center justify-center rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 active:scale-[0.98] min-h-11"
        >
          <span className="hidden sm:inline">Book a free intro call</span>
          <span className="sm:hidden">Book</span>
        </a>
      </div>
    </header>
  );
}

export function FloatingBook({ location }: { location: string }) {
  return (
    <a
      href={BOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("booking_click", { location: `${location}_floating` })}
      aria-label="Book a free 15-minute intro call"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center justify-center rounded-full bg-[var(--terracotta)] px-5 py-3 text-sm font-medium text-[var(--cream)] shadow-lg transition-all hover:brightness-110 active:scale-[0.98] min-h-11"
    >
      Book a free intro call
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[var(--plum)] text-[var(--oat)]/80">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-4">
        <div className="border-t border-[var(--oat)]/15 pt-12">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
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
                <Link
                  to="/"
                  className="underline decoration-[var(--terracotta)] underline-offset-4"
                >
                  ← Back to ADHD Hub
                </Link>
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--terracotta)]">
                If you need help right now
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>Emergency — <strong className="text-[var(--oat)]">000</strong></li>
                <li>Lifeline — <strong className="text-[var(--oat)]">13 11 14</strong></li>
                <li>13YARN — <strong className="text-[var(--oat)]">13 92 76</strong></li>
                <li>Butterfly — <strong className="text-[var(--oat)]">1800 33 4673</strong></li>
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
                We acknowledge the Traditional Owners of the lands on which we
                live and work, and pay our respects to Elders past and present.
              </p>
              <p className="mt-4 text-xs">
                <Link to="/start-here" className="underline decoration-[var(--terracotta)] underline-offset-4">
                  Start here
                </Link>
                <span className="mx-2 opacity-40">·</span>
                <Link to="/our-story" className="underline decoration-[var(--terracotta)] underline-offset-4">
                  Our Story
                </Link>
                <span className="mx-2 opacity-40">·</span>
                <Link to="/anchor" className="underline decoration-[var(--terracotta)] underline-offset-4">
                  Anchor
                </Link>
                <span className="mx-2 opacity-40">·</span>
                <Link to="/letters" className="underline decoration-[var(--terracotta)] underline-offset-4">
                  Letters
                </Link>
                <span className="mx-2 opacity-40">·</span>
                <Link to="/approach" className="underline decoration-[var(--terracotta)] underline-offset-4">
                  Our Approach
                </Link>
                <span className="mx-2 opacity-40">·</span>
                <a href="/privacy" className="underline decoration-[var(--terracotta)] underline-offset-4">
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
