import { QueryClient } from "@tanstack/react-query";

const defaultQueryConfig = { staleTime: 0, refetchOnMount: true, cacheTime: 0 };

export const queryClient = new QueryClient({
  defaultOptions: { queries: defaultQueryConfig },
});
