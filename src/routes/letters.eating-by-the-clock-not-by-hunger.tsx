import { createFileRoute } from "@tanstack/react-router";
import { LetterPage, letterHead } from "@/components/letter-page";
import { getLetter } from "@/content/letters";

const LETTER = getLetter("eating-by-the-clock-not-by-hunger")!;

export const Route = createFileRoute("/letters/eating-by-the-clock-not-by-hunger")({
  head: () => letterHead(LETTER),
  component: () => <LetterPage letter={LETTER} />,
});
