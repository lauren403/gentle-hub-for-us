import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/letters")({
  component: LettersLayout,
});

function LettersLayout() {
  return <Outlet />;
}
