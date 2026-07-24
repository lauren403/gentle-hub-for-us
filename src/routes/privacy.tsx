import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy | Body Belonging Clinic" },
      {
        name: "description",
        content: "Privacy policy for Body Belonging Clinic — how we handle your information.",
      },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
});

function PrivacyPage() {
  return (
    <main className="min-h-dvh bg-[var(--oat)] text-[var(--plum)]">
      <div className="mx-auto max-w-2xl px-5 py-24 md:py-32">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--terracotta)]">
          Body Belonging Clinic
        </p>
        <h1 className="font-display text-4xl leading-tight md:text-5xl">Privacy Policy</h1>
        <p className="mt-8 text-lg leading-relaxed text-[var(--plum)]/80">Coming soon.</p>
        <p className="mt-10 text-sm">
          <Link
            to="/"
            className="underline decoration-[var(--terracotta)] decoration-2 underline-offset-4 hover:text-[var(--terracotta)]"
          >
            ← Back to the ADHD Hub
          </Link>
        </p>
      </div>
    </main>
  );
}
