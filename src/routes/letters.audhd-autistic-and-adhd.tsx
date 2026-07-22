import { createFileRoute } from "@tanstack/react-router";
import { LetterPage, letterHead } from "@/components/letter-page";
import { getLetter } from "@/content/letters";

const LETTER = getLetter("audhd-autistic-and-adhd")!;

export const Route = createFileRoute("/letters/audhd-autistic-and-adhd")({
  head: () => letterHead(LETTER),
  component: () => <LetterPage letter={LETTER} />,
});
