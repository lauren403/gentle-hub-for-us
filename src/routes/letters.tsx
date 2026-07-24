import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL } from "@/config/site";
import { SiteHeader, SiteFooter, FloatingBook, Logo } from "@/components/site-chrome";
import { LETTERS } from "@/content/letters";

const TITLE = "Letters | Body Belonging Clinic";
const DESCRIPTION =
  "Unhurried, evidence-honest letters on ADHD, the body, food and belonging. Written to be read slowly.";
const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/letters`;

export const Route = createFileRoute("/letters")({
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
  component: LettersIndex,
});

function LettersIndex() {
  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]">
      <SiteHeader location="letters" activePath="/letters" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--plum)] text-[var(--oat)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 opacity-[0.06]"
        >
          <Logo className="size-[520px] text-[var(--oat)]" />
        </div>
        <div className="mx-auto max-w-3xl px-5 py-24 md:py-32">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
            Words from the chair
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] md:text-6xl">Letters</h1>
          <p className="mt-6 font-display text-xl italic text-[var(--oat)]/85 md:text-2xl">
            Unhurried, evidence-honest letters on ADHD, the body, food and belonging. Written to be
            read slowly.
          </p>
        </div>
      </section>

      {/* LIST */}
      <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <ul className="space-y-8">
          {LETTERS.map((letter) => (
            <li key={letter.slug}>
              <Link
                to={letter.path}
                className="group block rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-8 transition-all hover:border-[var(--terracotta)]/40 hover:shadow-sm md:p-10"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--terracotta)]">
                  A letter · {letter.readingTime}
                </p>
                <h2 className="mt-3 font-display text-2xl leading-tight text-[var(--plum)] md:text-3xl">
                  {letter.title}
                </h2>
                <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-[var(--plum)]/75 md:text-lg">
                  {letter.standfirst}
                </p>
                <span className="mt-6 inline-flex items-center text-sm font-medium text-[var(--plum)] underline decoration-[var(--terracotta)] underline-offset-4 group-hover:text-[var(--terracotta)]">
                  Read the letter →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
      <FloatingBook location="letters" />
    </div>
  );
}
