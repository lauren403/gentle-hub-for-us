import { createFileRoute } from "@tanstack/react-router";
import { LetterPage, letterHead } from "@/components/letter-page";
import { getLetter } from "@/content/letters";

const LETTER = getLetter("diagnosed-with-adhd-as-an-adult")!;

export const Route = createFileRoute("/letters/diagnosed-with-adhd-as-an-adult")({
  head: () => letterHead(LETTER),
  component: () => <LetterPage letter={LETTER} />,
});
