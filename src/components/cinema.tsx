/**
 * Cinematic page furniture for the "Pull up a chair" concept.
 *
 * FilmHero: a full-bleed film still (or looping video) under a dark, warm scrim
 * with oversized display type — the loud, modern, editorial opening every page
 * shares. Loudness comes from scale + contrast + the forest green, not from a
 * noisy image. HandLabel: the shared hand-lettered kicker.
 */
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Squiggle } from "@/components/hand-drawn";

export function HandLabel({
  children,
  tone = "oat",
  className = "",
}: {
  children: ReactNode;
  tone?: "terracotta" | "oat" | "ink";
  className?: string;
}) {
  const color =
    tone === "oat"
      ? "text-[var(--oat)]"
      : tone === "ink"
        ? "text-[#5c4a1e]"
        : "text-[var(--terracotta)]";
  return (
    <span
      className={`hand-label inline-flex items-center gap-2 ${color} ${className}`}
      style={{ transform: "rotate(-1.4deg)" }}
    >
      <span aria-hidden="true" className="text-lg leading-none opacity-70">
        ✳
      </span>
      {children}
    </span>
  );
}

export function FilmHero({
  image,
  video,
  poster,
  alt = "",
  label,
  title,
  underline,
  children,
  minH = "min-h-[74vh]",
}: {
  image?: string;
  video?: string;
  poster?: string;
  alt?: string;
  label: ReactNode;
  /** Headline text. If `underline` is given, that trailing phrase gets the squiggle. */
  title: string;
  underline?: string;
  children?: ReactNode;
  minH?: string;
}) {
  const [motion, setMotion] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setMotion(!mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const posterSrc = poster ?? image ?? "";
  const head = underline && title.endsWith(underline)
    ? {
        lead: title.slice(0, title.length - underline.length),
        tail: underline,
      }
    : { lead: title, tail: "" };

  return (
    <section
      className={`img-warm on-plum relative isolate flex ${minH} items-end overflow-hidden bg-[var(--forest-deep)] text-[var(--oat)]`}
    >
      {video && motion ? (
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <img
          src={posterSrc}
          alt={alt}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(23,34,26,0.92) 0%, rgba(23,34,26,0.55) 34%, rgba(23,34,26,0.12) 64%, rgba(23,34,26,0.3) 100%)",
        }}
      />
      <div className="mx-auto w-full max-w-6xl px-5 pb-14 pt-28 md:pb-20">
        <HandLabel tone="oat">{label}</HandLabel>
        <h1
          className="mt-5 max-w-[17ch] font-display text-[2.9rem] leading-[0.96] md:text-[5.4rem]"
          style={{ fontVariationSettings: '"SOFT" 100, "WONK" 0' }}
        >
          {head.lead}
          {head.tail && (
            <span className="relative inline-block italic">
              {head.tail}
              <Squiggle className="absolute -bottom-3 left-0 h-3 w-full text-[var(--terracotta)]" />
            </span>
          )}
        </h1>
        {children && (
          <div className="mt-6 max-w-[48ch] text-lg leading-relaxed text-[var(--oat)]/90 md:text-xl">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
