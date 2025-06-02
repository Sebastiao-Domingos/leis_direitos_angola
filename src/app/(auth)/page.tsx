// app/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full text-center space-y-8 mt-9"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-secondary uppercase flex flex-col">
          Bem-vindo ao
          <span>Sango Luzingo</span>
        </h1>
        <p className="text-lg md:text-xl text-white">
          Obtenha informações sobre leis, direitos, advodados e todas ajudas
          fundamentais jurídica de forma rápida, clara e segura.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 ">
          <Link href="/login">
            <Button size="lg" className="w-full md:w-48 h-14">
              Iniciar Sessão <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/cadastrar">
            <Button
              variant="outline"
              size="lg"
              className="w-full md:w-48 h-14 hover:bg-transparent hover:text-white bg-secondary/20 text-white"
            >
              Criar Conta
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-24 max-w-4xl w-full"
      >
        <h2 className="text-2xl font-semibold text-center mb-10 text-white">
          O que podes fazer aqui?
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <motion.li
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 text-white p-6 rounded-2xl shadow-md border"
          >
            <h3 className="font-bold text-lg mb-2">Acesso à Informação</h3>
            <p className="text-sm">
              Esclarece dúvidas sobre serviços públicos, documentos, saúde e
              educação com linguagem simples.
            </p>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 text-white p-6 rounded-2xl shadow-md border"
          >
            <h3 className="font-bold text-lg mb-2">Interação com um Agente</h3>
            <p className="text-sm">
              Um agente virtual treinado para responder às tuas questões com
              base em leis e políticas reais.
            </p>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 text-white p-6 rounded-2xl shadow-md border"
          >
            <h3 className="font-bold text-lg mb-2">Privacidade e Segurança</h3>
            <p className="text-sm">
              As tuas conversas são protegidas e não partilhadas com terceiros.
              A tua segurança é prioridade.
            </p>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 text-white p-6 rounded-2xl shadow-md border"
          >
            <h3 className="font-bold text-lg mb-2">Gratuito e Acessível</h3>
            <p className="text-sm">
              Totalmente grátis, disponível 24h por dia. Basta criar uma conta e
              começar.
            </p>
          </motion.li>
        </ul>
      </motion.section>
    </main>
  );
}
