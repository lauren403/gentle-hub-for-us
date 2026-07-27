import { Link } from "@tanstack/react-router";

type EvidenceLabel =
  | "Australian guideline"
  | "Systematic review"
  | "Emerging research"
  | "Clinical practice lens"
  | "Lived experience"
  | "Popular concept";

const LABEL_EXPLANATIONS: Record<EvidenceLabel, string> = {
  "Australian guideline": "Aligned with current Australian guideline recommendations.",
  "Systematic review": "Informed by a review or synthesis of multiple studies.",
  "Emerging research": "Promising or developing evidence; conclusions may change.",
  "Clinical practice lens": "A therapeutic way of organising care, not a diagnostic fact.",
  "Lived experience": "Experience-based perspective, not clinical evidence by itself.",
  "Popular concept": "Recognisable language that is not a formal diagnosis or settled science.",
};

export function ContentGovernance({
  labels,
  reviewed = "26 July 2026",
  reviewNote = "Author-reviewed for scope, claims and source transparency. Independent multidisciplinary review is pending.",
}: {
  labels: EvidenceLabel[];
  reviewed?: string;
  reviewNote?: string;
}) {
  return (
    <aside
      aria-label="Content governance"
      className="rounded-2xl border border-[var(--plum)]/10 bg-[var(--cream)] p-6 text-sm leading-relaxed text-[var(--plum)]/75"
    >
      <p className="font-medium text-[var(--plum)]">
        Written by Lauren Lynch, Accredited Mental Health Social Worker and ANZAED Credentialed
        Eating Disorder Clinician.
      </p>
      <p className="mt-2">
        <strong>Editorial review:</strong> {reviewed}. {reviewNote}
      </p>
      <div className="mt-4 flex flex-wrap gap-2" aria-label="Evidence labels">
        {labels.map((label) => (
          <span
            key={label}
            title={LABEL_EXPLANATIONS[label]}
            className="rounded-full border border-[var(--plum)]/15 bg-[var(--oat)] px-3 py-1 text-xs text-[var(--plum)]"
          >
            {label}
          </span>
        ))}
      </div>
      <p className="mt-4">
        These labels describe different kinds of knowledge; they are not quality scores. Read our{" "}
        <Link
          to="/editorial-policy"
          className="underline decoration-[var(--terracotta)] underline-offset-4 hover:text-[var(--terracotta)]"
        >
          editorial and evidence policy
        </Link>
        .
      </p>
    </aside>
  );
}
