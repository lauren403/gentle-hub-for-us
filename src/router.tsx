import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const basePath = import.meta.env.VITE_BASE_PATH?.replace(/\/+$/, "") || undefined;

  const router = createRouter({
    routeTree,
    basepath: basePath,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
