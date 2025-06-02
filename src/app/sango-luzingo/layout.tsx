"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/section/header";
import { AppSidebar } from "@/components/section/side-bar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

export default function LayoutSCreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <AppHeader />

            <div className="fixed inset-0 z-0 overflow-hidden">
              {/* Fundo em degradê com as cores da bandeira */}
              <div className="absolute inset-0 bg-gradient-to-b from-black via-red-600 to-red-700 opacity-80" />

              {/* Engrenagem + machete estilizados como ícones SVG */}
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
              <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[420px] opacity-30"
                viewBox="0 0 200 200"
                fill="none"
              >
                {/* Engrenagem estilizada */}
                <circle
                  cx="100"
                  cy="100"
                  r="60"
                  stroke="#FFD700"
                  strokeWidth="10"
                  strokeDasharray="12 10"
                />

                {/* Meia-lua como símbolo de machete simplificado */}
                <path
                  d="M60,130 Q100,80 140,130"
                  stroke="#FFD700"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Estrela central */}
                <polygon
                  points="100,60 106,84 132,84 110,100 118,126 100,112 82,126 90,100 68,84 94,84"
                  fill="#FFD700"
                />
              </svg>
            </div>

            {children}

            <Toaster />
          </main>
        </SidebarProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
