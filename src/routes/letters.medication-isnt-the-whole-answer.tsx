import { createFileRoute } from "@tanstack/react-router";
import { LetterPage, letterHead } from "@/components/letter-page";
import { getLetter } from "@/content/letters";

const LETTER = getLetter("medication-isnt-the-whole-answer")!;

export const Route = createFileRoute("/letters/medication-isnt-the-whole-answer")({
  head: () => letterHead(LETTER),
  component: () => <LetterPage letter={LETTER} />,
});
