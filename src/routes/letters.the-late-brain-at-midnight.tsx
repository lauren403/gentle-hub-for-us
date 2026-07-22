import { createFileRoute } from "@tanstack/react-router";
import { LetterPage, letterHead } from "@/components/letter-page";
import { getLetter } from "@/content/letters";

const LETTER = getLetter("the-late-brain-at-midnight")!;

export const Route = createFileRoute("/letters/the-late-brain-at-midnight")({
  head: () => letterHead(LETTER),
  component: () => <LetterPage letter={LETTER} />,
});
