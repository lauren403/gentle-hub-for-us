/**
 * Hand-drawn identity system for the ADHD Hub.
 *
 * A set of loose, hand-inked SVG marks — squiggle underlines, a brush divider,
 * a marker arrow, and a family of spot icons — all drawn in a single wobbly
 * pen weight with round caps so they read as one hand. They take `currentColor`
 * so they recolour with the section (terracotta on cream, oat on plum, plum on
 * sage). This is the thing photography and colour can't fake: a drawn brand.
 */

type MarkProps = {
  className?: string;
  strokeWidth?: number;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

/** Loose underline scribble — sits under a word or heading. */
export function Squiggle({ className = "", strokeWidth = 3 }: MarkProps) {
  return (
    <svg viewBox="0 0 220 18" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M3 11C34 4 58 4 78 9c19 5 33 6 55 1 21-5 45-7 79 2"
        {...base}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

/** Two quick strokes — a hand-underline for emphasis, tighter than Squiggle. */
export function DoubleUnderline({ className = "", strokeWidth = 2.4 }: MarkProps) {
  return (
    <svg viewBox="0 0 200 20" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path d="M4 7c40-4 120-5 192 1" {...base} strokeWidth={strokeWidth} />
      <path d="M12 15c46-3 108-3 168 0" {...base} strokeWidth={strokeWidth} opacity={0.65} />
    </svg>
  );
}

/** Full-width inked divider between bands. */
export function BrushDivider({ className = "", strokeWidth = 3 }: MarkProps) {
  return (
    <svg viewBox="0 0 1200 24" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M6 14C160 6 300 6 470 12s330 9 520 2c110-4 150-4 204-2"
        {...base}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

/** Hand-drawn arrow — for "read on" / directional cues. */
export function HandArrow({ className = "", strokeWidth = 2.6 }: MarkProps) {
  return (
    <svg viewBox="0 0 40 24" className={className} aria-hidden="true">
      <path d="M3 12c9 1 22 0 33-1" {...base} strokeWidth={strokeWidth} />
      <path d="M27 3c4 4 7 7 9 8-3 2-6 5-9 9" {...base} strokeWidth={strokeWidth} />
    </svg>
  );
}

/** A hand-circled star/asterisk spark — "the thing that matters". */
export function MarkSpark({ className = "", strokeWidth = 2.4 }: MarkProps) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <path d="M22 6v32M8 22h28M11 11l22 22M33 11 11 33" {...base} strokeWidth={strokeWidth} />
    </svg>
  );
}

/** Heart, drawn in one loose loop — feeling / regulation. */
export function MarkHeart({ className = "", strokeWidth = 2.4 }: MarkProps) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <path
        d="M22 36C10 28 6 21 7 15c1-6 8-8 12-4 2 2 3 4 3 4s1-2 3-4c4-4 11-2 12 4 1 6-3 13-15 21Z"
        {...base}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

/** Nervous-system wave — a settling rhythm line. */
export function MarkWave({ className = "", strokeWidth = 2.4 }: MarkProps) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <path
        d="M4 30c4 0 5-14 9-14s5 12 9 12 5-18 9-18 5 16 9 16"
        {...base}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

/** A warm cup — food, held gently. */
export function MarkCup({ className = "", strokeWidth = 2.4 }: MarkProps) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <path d="M9 18h22v10c0 5-4 9-9 9h-4c-5 0-9-4-9-9V18Z" {...base} strokeWidth={strokeWidth} />
      <path d="M31 21h4c3 0 5 2 5 5s-2 5-5 5h-4" {...base} strokeWidth={strokeWidth} />
      <path d="M15 6c-1 3 1 4 0 7M22 5c-1 3 1 4 0 7" {...base} strokeWidth={strokeWidth} opacity={0.8} />
    </svg>
  );
}

/** A little armchair — the reading room / a place to sit. */
export function MarkChair({ className = "", strokeWidth = 2.4 }: MarkProps) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <path
        d="M11 22c-3 0-4 2-4 5s2 4 4 4M33 22c3 0 4 2 4 5s-2 4-4 4"
        {...base}
        strokeWidth={strokeWidth}
      />
      <path
        d="M11 31V15c0-4 3-6 7-6h8c4 0 7 2 7 6v16M11 31h22M14 31v6M30 31v6"
        {...base}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

/** A sprout — growth, gently. */
export function MarkSprout({ className = "", strokeWidth = 2.4 }: MarkProps) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <path d="M22 38V16" {...base} strokeWidth={strokeWidth} />
      <path d="M22 22c-2-7-8-9-14-8 0 7 5 11 14 10Z" {...base} strokeWidth={strokeWidth} />
      <path d="M22 18c2-6 7-8 13-7 0 6-5 10-13 9Z" {...base} strokeWidth={strokeWidth} />
    </svg>
  );
}

/** A small hand-drawn compass/anchor cross — the Anchor tool. */
export function MarkAnchor({ className = "", strokeWidth = 2.4 }: MarkProps) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <circle cx="22" cy="10" r="4" {...base} strokeWidth={strokeWidth} />
      <path d="M22 14v22M13 22h18" {...base} strokeWidth={strokeWidth} />
      <path d="M9 27c1 6 6 9 13 9s12-3 13-9" {...base} strokeWidth={strokeWidth} />
    </svg>
  );
}
