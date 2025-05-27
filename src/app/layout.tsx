import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sango Luzingo",
  description:
    "Agente Inteligente que ajuda as pessoas a saber das leis e direitos Angolanos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutSCreen>{children}</LayoutSCreen>
      </body>
    </html>
  );
}

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/section/header";
import { AppSidebar } from "@/components/section/side-bar";

function LayoutSCreen({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <AppHeader />
      <main>{children}</main>
    </SidebarProvider>
  );
}
