import { createFileRoute } from "@tanstack/react-router";
import { LetterPage, letterHead } from "@/components/letter-page";
import { getLetter } from "@/content/letters";

const LETTER = getLetter("food-as-brain-fuel-safely")!;

export const Route = createFileRoute("/letters/food-as-brain-fuel-safely")({
  head: () => letterHead(LETTER),
  component: () => <LetterPage letter={LETTER} />,
});
