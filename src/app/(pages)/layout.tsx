"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/section/header";
import { AppSidebar } from "@/components/section/side-bar";
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
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full border">
            <AppHeader />

            {children}
          </main>
        </SidebarProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
