import { createFileRoute } from "@tanstack/react-router";
import { LetterPage, letterHead } from "@/components/letter-page";
import { getLetter } from "@/content/letters";

const LETTER = getLetter("working-with-your-brain")!;

export const Route = createFileRoute("/letters/working-with-your-brain")({
  head: () => letterHead(LETTER),
  component: () => <LetterPage letter={LETTER} />,
});
