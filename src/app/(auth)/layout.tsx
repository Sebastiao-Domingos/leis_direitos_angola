"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function LayoutSCreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <main className="w-full">
          <div className="fixed min-h-screen w-full bg-gradient-to-br from-black/70 via-primary/70 to-secondary/60 flex flex-col items-center justify-center px-6 sm:px-10 font-[var(--font-geist-sans)] overflow-hidden">
            <svg
              className="absolute opacity-10 top-0 right-0 w-[400px] sm:w-[600px] z-0"
              viewBox="0 0 1024 1024"
              fill="none"
            >
              <circle
                cx="512"
                cy="512"
                r="400"
                stroke="#FFD700"
                strokeWidth="100"
              />
            </svg>
            <svg
              className="absolute opacity-10 top-0 right-0 w-[200px] sm:w-[400px] z-0"
              viewBox="0 0 1024 1024"
              fill="none"
            >
              <circle
                cx="412"
                cy="412"
                r="400"
                stroke="#FFD700"
                strokeWidth="100"
              />
            </svg>

            <svg
              className="absolute opacity-10 top-0 right-0 w-[400px] sm:w-[600px] z-0"
              viewBox="0 0 1024 1024"
              fill="none"
            >
              <circle
                cx="612"
                cy="612"
                r="400"
                stroke="#FFD700"
                strokeWidth="100"
              />
            </svg>
          </div>
          {children}
        </main>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
