// app/not-found.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
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

      <div className="relative flex flex-col items-center text-white">
        <Ghost className="w-20 h-20 mb-6" />
        <h1 className="text-4xl font-bold mb-2">Página Não Encontrada</h1>
        <p className="text-slate-200 text-lg mb-6">
          Lamentamos, mas a página que procuras não existe!.
        </p>
        <Link href="/">
          <Button size="lg">Voltar à Página Inicial</Button>
        </Link>
      </div>
    </main>
  );
}
