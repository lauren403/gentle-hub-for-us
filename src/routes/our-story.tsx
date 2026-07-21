import { createFileRoute, Link } from "@tanstack/react-router";
import { HALAXY_URL, SITE_URL } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

const TITLE = "Our Story | Body Belonging Clinic";
const DESCRIPTION =
  "Why Body Belonging Clinic exists — a founder's story from Lauren Lynch. Aboriginal-led, neurodivergent-affirming, eating-disorder-informed care in Perth and across Australia.";
const CANONICAL = `${SITE_URL.replace(/\/$/, "")}/our-story`;

export const Route = createFileRoute("/our-story")({
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
  }),
  component: OurStoryPage,
});

const BOOK_URL = HALAXY_URL;

const Logo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 1080 1080" className={className} aria-hidden="true">
    <path
      d="M326 262 L472 300 L472 486 L762 516 L762 856 L620 856 L620 690 L472 690 L472 856 L326 856 Z"
      fill="currentColor"
    />
  </svg>
);

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--plum)]/10 bg-[var(--plum)] text-[var(--oat)]">
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
          <Link to="/" className="opacity-80 transition-opacity hover:opacity-100">
            Home
          </Link>
          <Link
            to="/our-story"
            activeProps={{ className: "opacity-100 underline decoration-[var(--terracotta)] underline-offset-8" }}
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            Our Story
          </Link>
          <Link to="/anchor" className="opacity-80 transition-opacity hover:opacity-100">
            Anchor
          </Link>
          <Link to="/approach" className="opacity-80 transition-opacity hover:opacity-100">
            Our Approach
          </Link>
        </nav>

        <a
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("booking_click", { location: "our_story_header" })}
          className="ml-auto md:ml-4 inline-flex items-center justify-center rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[var(--cream)] transition-all hover:brightness-110 active:scale-[0.98] min-h-11"
        >
          <span className="hidden sm:inline">Book a free intro call</span>
          <span className="sm:hidden">Book</span>
        </a>
      </div>
    </header>
  );
}

function FloatingBook() {
  return (
    <a
      href={BOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("booking_click", { location: "our_story_floating" })}
      aria-label="Book a free 15-minute intro call"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center justify-center rounded-full bg-[var(--terracotta)] px-5 py-3 text-sm font-medium text-[var(--cream)] shadow-lg transition-all hover:brightness-110 active:scale-[0.98] min-h-11"
    >
      Book a free intro call
    </a>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6 text-lg leading-relaxed text-[var(--plum)]/85 [&_p]:max-w-[68ch] [&_a]:underline [&_a]:decoration-[var(--terracotta)] [&_a]:underline-offset-4 hover:[&_a]:text-[var(--terracotta)]">
      {children}
    </div>
  );
}

function OurStoryPage() {
  return (
    <div className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]" id="top">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--plum)] text-[var(--oat)]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 opacity-[0.06]">
          <Logo className="size-[520px] text-[var(--oat)]" />
        </div>
        <div className="mx-auto max-w-3xl px-5 py-24 md:py-32">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
            Body Belonging Clinic
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] md:text-6xl">
            Our Story
          </h1>
          <p className="mt-6 font-display text-xl italic text-[var(--oat)]/85 md:text-2xl">
            Why Body Belonging Clinic exists.
          </p>
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="mb-5 text-xs uppercase tracking-[0.22em] text-[var(--terracotta)]">
          A note from the founder
        </p>
        <h2 className="font-display text-3xl leading-tight md:text-5xl">
          Why Body Belonging Clinic exists
        </h2>
        <div className="mt-10">
          <Prose>
            <p>If you've spent a good part of your life feeling like you don't quite fit anywhere, tired in a way that sleep never seems to fix, I want you to know I'm not writing this from somewhere above it. I've sat in that same waiting room, and I've sat in the chair.</p>
            <p>I spent most of my life looking for a place where I felt like I belonged, and for a long time I moved through the mental health system first as a patient and later as a professional without ever finding it, because so much of that world reaches for a diagnosis and a script and then decides the work is done. It can feel like a system built around everyone except the person actually sitting in front of it, and even after years of study, once I was finally in a place to advocate, to help make change and to listen, I came up against the very same thing, that almost no one had the time to listen or to go beneath the script and the diagnosis.</p>
            <p>Here's the part I hold onto. Your worth was never meant to be measured in blocks of fifty minutes, or handed back to you in a plan that runs out after six visits, and you were never a problem to be moved through a schedule. What most of us are actually missing isn't another referral, it's connection, and a bit of time, and enough safety to feel properly understood, which is where the real work with yourself begins.</p>
            <p>I know this because I've lived it. I'm a neurodivergent person who spent years bouncing around the system feeling defeated, until one day somebody finally said the word ADHD to me and something in me could breathe. I'm queer, I'm Aboriginal, and I carried an eating disorder for the better part of a decade that hardly anyone around me understood. For a long time I was managed, not held.</p>
            <p>And then I found the one chair that changed everything. My psychologist, Annette, just let me be there. She didn't rush me and she didn't give up on me at the point where every other service already had, and what she gave me was never really a technique, it was connection, and safety, and the plain experience of being held long enough to find my way back. She's a big part of why I'm still here, and she rewrote what I believe a chair can be.</p>
            <p>I also know, more than I'd ever wish to, what it costs a person to move through life without being understood, because I lost my best friend to a world that couldn't hold them. I carry that into everything I make, and it's a lot of why I've promised myself this will be a place with room for every single person who walks in, whoever they are and whatever they're carrying.</p>
            <p>I carry my family here too. My mum is a survivor of the Stolen Generation, and I want to name plainly the intergenerational trauma that history left behind, because it travels quietly down the line and it is still with me today, carried alongside more than 65,000 years of storylines that are mine to hold as well. I had to make my own way through the same disconnection from culture that was forced on my mother, the same removal, and for the longest time that distance sat right where a whole way of belonging should have been. What I did not expect was that the disconnection would be the very place the finding began, because out of it came connection, back to my culture, back to myself, and back to my own identity, and that is the thing I now hold right at the centre of this clinic. For our mob, healing was never about fixing one person on their own, it grows from connection, to culture and to Country, to family and community and the ones who walked before us, and when those connections are strong they hold us and protect us in a way no single session ever could. It's why I believe being understood has to mean being understood in the whole of who you are and where you come from, and it's why I keep the door open for the ones coming after us, so the storylines we inherit can slowly and gently be rewritten into something kinder.</p>
            <p>So I built Body Belonging Clinic. Honestly, it's just the space I spent my whole life looking for and never quite found.</p>
            <p>I also didn't want any of this to rest on good feeling alone. Everything I have lived, and everything the research kept confirming, I've shaped into a way of working I call the Body Belonging Model, so there is real structure underneath the warmth. It moves gently, from safety first, to noticing what your body and your feelings are telling you, to steadying yourself in the ways a prescription can't teach, and finally to belonging, because that is where change actually lasts. As an eating disorder clinician and social worker, I've built it to be safe for anyone living with an eating disorder and affirming of every neurodivergent mind, right from the very first step, which matters here more than almost anywhere.</p>
          </Prose>
        </div>
      </section>

      {/* SQUARE PEG */}
      <section className="bg-[var(--cream)]">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            A square peg in a world shaped for someone else
          </h2>
          <div className="mt-10">
            <Prose>
              <p>People come to me at every age and stage, usually once things have quietly become too much, and so many of them say a version of the very same thing, that they feel like a square peg trying to fit a world that was clearly made for a rounder one, and that lately life has felt harder for them than it seems to be for everyone else. You're not broken. You never were. You've just got a different kind of brain living in a world built around a different kind of brain, and most of what has gone wrong lives in the gap between the two, not in you. What hardly anyone offers is time, and someone willing to slow right down, listen properly, and treat a different brain as a perfectly ordinary thing, until one day, sometimes for the first time in your life, you feel understood.</p>
            </Prose>
          </div>
        </div>
      </section>

      {/* I KNOW */}
      <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <h2 className="font-display text-3xl leading-tight md:text-5xl">
          I know what it actually feels like
        </h2>
        <div className="mt-10">
          <Prose>
            <p>This is a place for anyone, and most of all for you if you've never once felt safe enough to sit down in a chair at all.</p>
            <p>I know the days when there's no hunger to be found anywhere, and then it's suddenly eight at night and you're standing in the light of the open fridge. A brain like ours reads the body's quieter signals, hunger and fullness among them, far less clearly, so eating can swing from forgotten all day to all at once by the evening, and honestly, that deserves a bit of kindness rather than any shame.</p>
            <p>I know the way your mind switches itself on the moment your head hits the pillow, when the house has finally gone quiet and there's room at last to build the most beautiful plans for tomorrow, and then tomorrow turns up with you already exhausted and every one of those plans slipping through your fingers. You're not lazy. Your body clock genuinely runs late, and settling at night is hard.</p>
            <p>And I know the walk to the kitchen for one glass of water that somehow becomes loading the dishwasher, then carrying the tea towels to the machine, then finding yesterday's washing still sitting in there and starting it all again, until you notice you never actually poured the water. That isn't carelessness at all, it's just how hard it is for a brain like ours to hold one thing in mind while the next keeps turning up in front of it.</p>
            <p>I see all of it, and I've never once thought of any of it as a character flaw. It's just a different brain doing its best, and it can be worked with gently, from the inside out, rather than fought.</p>
          </Prose>
        </div>
      </section>

      {/* THE CHAIR */}
      <section className="bg-[var(--cream)]">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            The chair was never meant to stay in one room
          </h2>
          <div className="mt-10">
            <Prose>
              <p>For too long, care has been built around one narrow lens, in one room, against one clock, with barely a thought for who you actually are or the different worlds you might be moving through at once, and it's been built against us rather than for us. A chair was never meant to sit still in a single room anyway. It belongs outside and online, in movement and creativity, in joy and laughter and hope, and that's the kind of chair we're building here.</p>
              <p>So if you've read this far and something in you has gone quiet and a little bit hopeful, you're already welcome. There's a place here for you, exactly as you are.</p>
              <p>
                Whenever you're ready, and there's no rush at all, you can read a little about{" "}
                <Link
                  to="/approach"
                  onClick={() => trackEvent("our_story_cta", { target: "approach" })}
                >
                  the way we work
                </Link>{" "}
                here, or{" "}
                <a
                  href={BOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent("our_story_cta", { target: "booking" });
                    trackEvent("booking_click", { location: "our_story_inline" });
                  }}
                >
                  simply reach out
                </a>
                , and we'll take the first small step together.
              </p>
            </Prose>
          </div>

          {/* SIGNATURE */}
          <div className="mt-14 border-l-2 border-[var(--terracotta)] pl-6">
            <p className="font-display text-2xl italic text-[var(--plum)]">
              <span className="not-italic font-medium">Lauren Lynch, Founder.</span>{" "}
              <span className="text-[var(--plum)]/75">
                Accredited Mental Health Social Worker (AMHSW), ANZAED Credentialed Eating Disorder Clinician, and a proud Yorta Yorta woman.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* SUPPORT FOOTNOTE */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <aside
          className="rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-6 text-sm italic leading-relaxed text-[var(--plum)]/70"
          aria-label="Support resources"
        >
          If any of this has stirred something heavy for you, please reach out for support. In an emergency call 000. For free help any time of the day or night you can call Lifeline on 13 11 14, the Butterfly Foundation's eating disorders line on 1800 33 4673 (1800 ED HOPE), or 13YARN on 13 92 76 for Aboriginal and Torres Strait Islander crisis support.
        </aside>
      </section>

      {/* MANIFESTO */}
      <section className="bg-[var(--plum)] text-[var(--oat)]">
        <div className="mx-auto max-w-3xl px-5 py-24 md:py-32 text-center">
          <p className="font-display text-4xl leading-tight md:text-6xl">
            Every body belongs.
          </p>
          <div className="mx-auto mt-12 max-w-[68ch] space-y-6 text-left text-lg leading-relaxed text-[var(--oat)]/85">
            <p>You are not a diagnosis, and your worth was never something to be measured in blocks of fifty minutes or handed back to you in a plan that runs out after six visits. There are no broken brains here, only different ones, living in a world that was mostly built for a different shape, and everything we do starts from the belief that connection and safety come before any strategy, because no one has ever really changed while they still felt unseen. Your relationship with food, your feelings, your focus and your body were never separate problems to be sorted one at a time, they're all part of the one story, and it's yours, and it deserves time and a bit of tenderness far more than it deserves shame. Whoever you are and however you got here, whether you're neurodivergent, queer, Aboriginal, in recovery, or just still working yourself out, there's room here for the whole of you.</p>
            <p>We've no interest in the kind of care that gets built around one narrow lens and delivered against the clock in a single beige room, because that has quietly been made against us rather than for us, and we don't accept that a person could ever be contained inside a textbook. So we take the time instead, we listen properly, we stay curious, and we keep the chair open in all the places it was always meant to live, outside and online, in movement and creativity, in joy and laughter and hope. If you've never once felt safe enough to sit down in a chair, this is the place that was built for you.</p>
          </div>
          <p className="mt-12 font-display text-4xl leading-tight md:text-6xl">
            Every body belongs.
          </p>
        </div>
      </section>

      {/* FOOTER */}
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
                  We acknowledge the Traditional Owners of the lands on which
                  we live and work, and pay our respects to Elders past and
                  present.
                </p>
                <p className="mt-4 text-xs">
                  <Link to="/our-story" className="underline decoration-[var(--terracotta)] underline-offset-4">
                    Our Story
                  </Link>
                  <span className="mx-2 opacity-40">·</span>
                  <Link to="/anchor" className="underline decoration-[var(--terracotta)] underline-offset-4">
                    Anchor
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

      <FloatingBook />
    </div>
  );
}
