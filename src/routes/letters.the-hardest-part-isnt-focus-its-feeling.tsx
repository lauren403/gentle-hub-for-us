import { createFileRoute } from "@tanstack/react-router";
import { LetterPage, letterHead } from "@/components/letter-page";
import { getLetter } from "@/content/letters";

const LETTER = getLetter("the-hardest-part-isnt-focus-its-feeling")!;

export const Route = createFileRoute("/letters/the-hardest-part-isnt-focus-its-feeling")({
  head: () => letterHead(LETTER),
  component: () => <LetterPage letter={LETTER} />,
});
