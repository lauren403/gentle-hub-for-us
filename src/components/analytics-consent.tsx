import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getAnalyticsConsent, initialiseAnalytics, setAnalyticsConsent } from "@/lib/analytics";

export function AnalyticsConsent() {
  const [choice, setChoice] = useState<"granted" | "denied" | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = getAnalyticsConsent();
    setChoice(saved);
    setReady(true);
    if (saved === "granted") initialiseAnalytics();
  }, []);

  if (!ready || choice !== null) return null;

  return (
    <aside
      aria-label="Analytics choice"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-2xl rounded-2xl border border-[var(--plum)]/15 bg-[var(--cream)] p-5 text-sm leading-relaxed text-[var(--plum)] shadow-xl"
    >
      <p className="font-medium">Help us understand what is useful</p>
      <p className="mt-2 text-[var(--plum)]/75">
        With your permission, we use Google Analytics to understand visits and improve the hub. We
        do not send your email address, form entries or clinical information to analytics. You can
        say no and the site will work normally.{" "}
        <Link to="/privacy" className="underline decoration-[var(--terracotta)] underline-offset-4">
          Privacy details
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            setAnalyticsConsent("granted");
            initialiseAnalytics();
            setChoice("granted");
          }}
          className="min-h-11 rounded-full bg-[var(--plum)] px-5 py-2 text-[var(--oat)]"
        >
          Allow analytics
        </button>
        <button
          type="button"
          onClick={() => {
            setAnalyticsConsent("denied");
            setChoice("denied");
          }}
          className="min-h-11 rounded-full border border-[var(--plum)]/25 px-5 py-2"
        >
          No thanks
        </button>
      </div>
    </aside>
  );
}
