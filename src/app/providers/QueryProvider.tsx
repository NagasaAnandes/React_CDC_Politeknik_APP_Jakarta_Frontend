import React from "react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err: any) => {
      if (import.meta.env.DEV) {
        const status = err?.status ?? err?.response?.status;
        if (status === 401 || status === 403 || status === 404) {
          // Expected query failures are handled in the UI, so keep them out of the error console.
          // eslint-disable-next-line no-console
          console.debug(
            "[react-query] handled query error",
            status,
            err?.message,
          );
          return;
        }

        // eslint-disable-next-line no-console
        console.error("[react-query] query error", err);
      }
    },
  }),
  defaultOptions: {
    queries: {
      // only retry for network/server errors, do NOT retry on auth errors
      retry: (failureCount: number, error: any) => {
        const status = error?.status ?? error?.response?.status;
        if (status === 401 || status === 403) return false;
        return failureCount < 1;
      },
      staleTime: 1000 * 60, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

export const AppQueryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <QueryClientProvider client={queryClient}>
    {children}
    {import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false} /> : null}
  </QueryClientProvider>
);

export default AppQueryProvider;
