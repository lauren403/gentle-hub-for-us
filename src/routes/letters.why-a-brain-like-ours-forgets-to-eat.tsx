import { createFileRoute } from "@tanstack/react-router";
import { LetterPage, letterHead } from "@/components/letter-page";
import { getLetter } from "@/content/letters";

const LETTER = getLetter("why-a-brain-like-ours-forgets-to-eat")!;

export const Route = createFileRoute("/letters/why-a-brain-like-ours-forgets-to-eat")({
  head: () => letterHead(LETTER),
  component: () => <LetterPage letter={LETTER} />,
});
