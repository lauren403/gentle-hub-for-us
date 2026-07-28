import { Link } from "@tanstack/react-router";
import { SITE_URL } from "@/config/site";
import { SiteHeader, SiteFooter, FloatingBook, Logo } from "@/components/site-chrome";
import { ContentGovernance } from "@/components/content-governance";
import type { Letter } from "@/content/letters";
import { LETTERS, LETTER_IMAGES } from "@/content/letters";

export function LetterPage({ letter }: { letter: Letter }) {
  const idx = LETTERS.findIndex((l) => l.slug === letter.slug);
  const heroImg = LETTER_IMAGES[(idx < 0 ? 0 : idx) % LETTER_IMAGES.length];
  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]">
      <SiteHeader location={`letter_${letter.slug}`} activePath="/letters" />

      <main id="main-content" tabIndex={-1}>
        {/* HERO — real photo when we have a distinct one, else a bold type-led block */}
        {heroImg ? (
          <section className="bg-[var(--plum)] text-[var(--oat)]">
            <div className="grid md:grid-cols-2 md:items-stretch">
              <div className="flex flex-col justify-center px-5 py-16 md:py-24 md:pl-12 md:pr-14 lg:pl-20">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--terracotta)]">
                  A letter · {letter.readingTime}
                </p>
                <h1
                  className="mt-6 max-w-[16ch] font-display text-[2.6rem] leading-[1.03] md:text-[4.4rem]"
                  style={{ fontVariationSettings: '"SOFT" 100' }}
                >
                  {letter.title}
                </h1>
              </div>
              <div className="relative min-h-[46vh] md:min-h-[70vh]">
                <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" loading="eager" decoding="async" />
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-[var(--terracotta)] text-[var(--cream)]">
            <div className="mx-auto max-w-5xl px-5 py-24 md:py-36">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--cream)]/80">
                A letter · {letter.readingTime}
              </p>
              <h1
                className="mt-7 max-w-[16ch] font-display text-[2.9rem] leading-[1.02] md:text-[5.2rem]"
                style={{ fontVariationSettings: '"SOFT" 100' }}
              >
                {letter.title}
              </h1>
            </div>
          </section>
        )}

        {/* BODY */}
        <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <p className="max-w-[62ch] font-display text-2xl italic leading-snug text-[var(--plum)]/85 md:text-3xl">
            {letter.standfirst}
          </p>

          <div className="mt-10">
            <ContentGovernance
              labels={["Clinical practice lens", "Lived experience", "Emerging research"]}
            />
          </div>

          <div className="mt-12 space-y-6 text-lg leading-relaxed text-[var(--plum)]/85 [&_p]:max-w-[68ch] [&_a]:underline [&_a]:decoration-[var(--terracotta)] [&_a]:underline-offset-4 hover:[&_a]:text-[var(--terracotta)]">
            {letter.body.map((para, i) => (
              <p key={i}>{renderWithLinks(para.text, para.links)}</p>
            ))}
          </div>

          <div className="mt-14 border-l-2 border-[var(--terracotta)] pl-6">
            <p className="max-w-[62ch] font-display text-xl italic text-[var(--plum)] md:text-2xl">
              {letter.closing}
            </p>
          </div>

          <div className="mt-14">
            <Link
              to="/letters"
              className="inline-flex items-center text-sm font-medium underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
            >
              ← All letters
            </Link>
          </div>
        </article>
      </main>

      <SiteFooter />
      <FloatingBook location={`letter_${letter.slug}`} />
    </div>
  );
}

function renderWithLinks(text: string, links?: Array<{ match: string; to: string }>) {
  if (!links || links.length === 0) return text;
  // Build regex from all matches, longest first to avoid overlap.
  const sorted = [...links].sort((a, b) => b.match.length - a.match.length);
  const pattern = new RegExp("(" + sorted.map((l) => escapeRegex(l.match)).join("|") + ")", "g");
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    const hit = sorted.find((l) => l.match === part);
    if (hit) {
      return (
        <Link key={i} to={hit.to}>
          {part}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function letterHead(letter: Letter) {
  const canonical = `${SITE_URL.replace(/\/$/, "")}${letter.path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: letter.title,
    description: letter.seoDescription,
    author: { "@type": "Person", name: "Lauren Lynch" },
    publisher: {
      "@type": "Organization",
      name: "Body Belonging Clinic",
    },
    mainEntityOfPage: canonical,
    url: canonical,
  };
  return {
    meta: [
      { title: letter.seoTitle },
      { name: "description", content: letter.seoDescription },
      { property: "og:title", content: letter.seoTitle },
      { property: "og:description", content: letter.seoDescription },
      { property: "og:type", content: "article" },
      { property: "og:url", content: canonical },
      { name: "twitter:title", content: letter.seoTitle },
      { name: "twitter:description", content: letter.seoDescription },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  };
}
