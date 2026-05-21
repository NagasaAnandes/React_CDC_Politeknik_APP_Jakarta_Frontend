import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
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
      onError: (err: any) => {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.error("[react-query] query error", err);
        }
      },
    },
  },
});

export const AppQueryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default AppQueryProvider;
