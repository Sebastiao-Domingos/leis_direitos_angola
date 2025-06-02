"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const avatarUsuario = "/user-avatar.png"; // substitua com a imagem real do usuário
const avatarAgente = "/law-bot.png"; // ícone representando leis/direitos

const mensagensIniciais = [
  {
    remetente: "agente",
    texto: "Olá! Como posso ajudá-lo hoje?",
  },
  {
    remetente: "usuario",
    texto: "Quero saber mais sobre os meus direitos civis.",
  },
  {
    remetente: "agente",
    texto:
      "Claro! Podemos conversar sobre saúde, educação, identidade e muito mais. Qual tema deseja aprofundar?",
  },
];

export default function ChatPage() {
  const [mensagens, setMensagens] = useState(mensagensIniciais);
  const [input, setInput] = useState("");

  function enviarMensagem() {
    if (input.trim() === "") return;
    setMensagens([...mensagens, { remetente: "usuario", texto: input }]);
    setInput("");
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">Agente Virtual Angola ⚖️</h1>
        <p className="text-sm opacity-90">
          Fale com o nosso agente digital de direitos
        </p>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {mensagens.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${
              msg.remetente === "usuario" ? "justify-end" : "items-start gap-2"
            }`}
          >
            {msg.remetente === "agente" && (
              <Image
                width={100}
                height={100}
                src={avatarAgente}
                alt="Agente"
                className="w-10 h-10 rounded-full bg-white border p-1"
              />
            )}
            <div
              className={`px-4 py-3 rounded-2xl max-w-sm shadow ${
                msg.remetente === "usuario"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {msg.texto}
            </div>
            {msg.remetente === "usuario" && (
              <Image
                width={100}
                height={100}
                src={avatarUsuario}
                alt="Usuário"
                className="w-10 h-10 rounded-full bg-white border p-1 ml-2"
              />
            )}
          </motion.div>
        ))}
      </main>

      {/* Input de mensagem */}
      <footer className="px-4 py-3 bg-muted border-t border-border flex items-center gap-2">
        <input
          type="text"
          placeholder="Digite a sua mensagem..."
          className="flex-1 px-4 py-2 rounded-full bg-white border border-input text-sm outline-none focus:ring-2 focus:ring-primary"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
        />
        <button
          className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-opacity-90 transition-all"
          onClick={enviarMensagem}
        >
          Enviar
        </button>
      </footer>
    </div>
  );
}
