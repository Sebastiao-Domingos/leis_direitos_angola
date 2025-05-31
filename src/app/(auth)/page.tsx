// app/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useGetLoggedUser } from "@/hooks/user/useGetUsers";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { data, result } = useGetLoggedUser();

  useEffect(() => {
    if (data) {
      router.push("/sango-luzingo");
    }
  }, [data, result]);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Bem-vindo ao <span className="italic">Agente Inteligente</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Obtenha informações sobre saúde, educação, identidade, propriedade
          industrial e direitos fundamentais de forma rápida, clara e segura.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login">
            <Button size="lg" className="w-48">
              Iniciar Sessão <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="lg" className="w-48">
              Criar Conta
            </Button>
          </Link>
        </div>
      </div>

      <section className="mt-16 max-w-4xl w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">
          O que podes fazer aqui
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <li className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="font-bold mb-2">Acesso à Informação</h3>
            <p className="text-muted-foreground text-sm">
              Esclarece dúvidas sobre serviços públicos, documentos, saúde e
              educação com linguagem simples.
            </p>
          </li>
          <li className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="font-bold mb-2">Interação com um Agente</h3>
            <p className="text-muted-foreground text-sm">
              Um agente virtual treinado para responder às tuas questões com
              base em leis e políticas reais.
            </p>
          </li>
          <li className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="font-bold mb-2">Privacidade e Segurança</h3>
            <p className="text-muted-foreground text-sm">
              As tuas conversas são protegidas e não partilhadas com terceiros.
              A tua segurança é prioridade.
            </p>
          </li>
          <li className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="font-bold mb-2">Gratuito e Acessível</h3>
            <p className="text-muted-foreground text-sm">
              Totalmente grátis, disponível 24h por dia. Basta criar uma conta e
              começar.
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
}
