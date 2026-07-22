import { createFileRoute } from "@tanstack/react-router";
import { LetterPage, letterHead } from "@/components/letter-page";
import { getLetter } from "@/content/letters";

const LETTER = getLetter("neurodivergent-and-queer")!;

export const Route = createFileRoute("/letters/neurodivergent-and-queer")({
  head: () => letterHead(LETTER),
  component: () => <LetterPage letter={LETTER} />,
});
