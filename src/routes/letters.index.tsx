import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL } from "@/config/site";
import { SiteHeader, SiteFooter, FloatingBook, Logo } from "@/components/site-chrome";
import { LETTERS, LETTER_IMAGES } from "@/content/letters";

const TITLE = "Letters | Body Belonging Clinic";
const DESCRIPTION =
  "Unhurried, evidence-honest letters on ADHD, the body, food and belonging. Written to be read slowly.";
const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/letters`;

export const Route = createFileRoute("/letters/")({
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

      <main id="main-content" tabIndex={-1}>
        {/* HERO */}
        <section className="relative overflow-hidden bg-[var(--plum)] text-[var(--oat)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 opacity-[0.06]"
          >
            <Logo className="size-[520px] text-[var(--oat)]" />
          </div>
          <div className="mx-auto max-w-5xl px-5 py-24 md:py-32">
            <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
              <div>
                <span className="hand-label inline-block text-[var(--terracotta)]" style={{ transform: "rotate(-1.4deg)" }}>
                  ✳ Words from the chair
                </span>
                <h1 className="mt-5 font-display text-4xl leading-[1.05] md:text-6xl">Letters</h1>
                <p className="mt-6 font-display text-xl italic text-[var(--oat)]/85 md:text-2xl">
                  Unhurried, evidence-honest letters on ADHD, the body, food and belonging. Written
                  to be read slowly.
                </p>
              </div>
              <figure className="md:justify-self-end">
                <div className="img-warm on-plum overflow-hidden rounded-3xl border border-[var(--oat)]/15 shadow-xl">
                  <img
                    src="/hub-lamp.jpg"
                    alt="A warm lamp and a quiet corner to read in"
                    loading="eager"
                    decoding="async"
                    className="aspect-[4/5] h-full w-full object-cover"
                  />
                </div>
              </figure>
            </div>
          </div>
        </section>

        {/* LIST — editorial grid */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-2">
            {LETTERS.map((letter, i) => (
              <Link
                key={letter.slug}
                to={letter.path}
                className="group flex flex-col overflow-hidden rounded-3xl border border-[var(--plum)]/10 bg-[var(--cream)] no-underline transition-all hover:border-[var(--terracotta)]/40 hover:shadow-md"
              >
                <div className="img-warm relative aspect-[4/5] overflow-hidden">
                  <img
                    src={LETTER_IMAGES[i % LETTER_IMAGES.length]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                    style={{ background: "linear-gradient(to top, rgba(46,26,34,0.55), rgba(46,26,34,0))" }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="font-hand text-base text-[var(--terracotta)]">
                    A letter · {letter.readingTime}
                  </p>
                  <h2 className="mt-3 font-display text-xl leading-tight text-[var(--plum)] md:text-2xl">
                    {letter.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--plum)]/75">
                    {letter.standfirst}
                  </p>
                  <span className="mt-5 inline-flex items-center text-sm font-medium text-[var(--plum)] underline decoration-[var(--terracotta)] underline-offset-4 group-hover:text-[var(--terracotta)]">
                    Read the letter →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
      <FloatingBook location="letters" />
    </div>
  );
}
