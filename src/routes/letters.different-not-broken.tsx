import { createFileRoute } from "@tanstack/react-router";
import { LetterPage, letterHead } from "@/components/letter-page";
import { getLetter } from "@/content/letters";

const LETTER = getLetter("different-not-broken")!;

export const Route = createFileRoute("/letters/different-not-broken")({
  head: () => letterHead(LETTER),
  component: () => <LetterPage letter={LETTER} />,
});
