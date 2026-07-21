import { createFileRoute } from "@tanstack/react-router";
import { LetterPage, letterHead } from "@/components/letter-page";
import { getLetter } from "@/content/letters";

const LETTER = getLetter("your-nervous-system-and-a-place-to-belong")!;

export const Route = createFileRoute("/letters/your-nervous-system-and-a-place-to-belong")({
  head: () => letterHead(LETTER),
  component: () => <LetterPage letter={LETTER} />,
});
