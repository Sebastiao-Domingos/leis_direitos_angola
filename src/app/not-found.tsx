// app/not-found.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <Ghost className="w-20 h-20 text-gray-400 mb-6" />
      <h1 className="text-4xl font-bold mb-2">Página Não Encontrada</h1>
      <p className="text-muted-foreground text-lg mb-6">
        Lamentamos, mas a página que procuras não existe ou foi movida.
      </p>
      <Link href="/">
        <Button size="lg">Voltar à Página Inicial</Button>
      </Link>
    </main>
  );
}
