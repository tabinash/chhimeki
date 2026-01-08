"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
    // Create QueryClient instance inside component to ensure it's client-side only
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Stale time: How long data is considered fresh
                        staleTime: 60 * 1000, // 1 minute
                        // Cache time: How long inactive data stays in cache
                        gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
                        // Retry failed requests
                        retry: 1,
                        // Refetch on window focus
                        refetchOnWindowFocus: false,
                    },
                    mutations: {
                        // Retry failed mutations
                        retry: 0,
                    },
                },
            })
    );

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
