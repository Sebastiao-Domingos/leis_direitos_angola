"use client";

import { useState, useRef, useEffect } from "react";
import ChatInput from "@/components/chatinput";
import ChatLoader from "@/components/chatinput/loader";
import { useActionChats } from "@/hooks/chats/useActionChat";
import { motion } from "framer-motion";
import { HistoryService } from "@/services/history.service";
import { useGetLoggedUser } from "@/hooks/user/useGetUsers";
import { useRouter } from "next/navigation";
import { useGetHistoryConversation } from "@/hooks/history/useGetHistory";

interface ChatMessage {
  id: number;
  sender: "agent" | "user";
  text: string;
}

const service_history = new HistoryService();

export default function ChatPage({ params }: { params: { chat: number } }) {
  const { mutationCreate } = useActionChats();
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: conversation, result: result_conversation } =
    useGetHistoryConversation(Number(params.chat));
  const { data: user, result } = useGetLoggedUser();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "agent",
      text: "Olá! Como posso ajudá-lo hoje?",
    },
    {
      id: 2,
      sender: "agent",
      text: "Claro! Podemos conversar sobre leis, direitos, identidade e muito mais. Qual tema deseja aprofundar?",
    },
  ]);

  useEffect(() => {
    console.log("Conversation : ", conversation);
    if (conversation) {
      setMessages(() => conversation.chats);
    }
  }, [conversation]);

  if (result.isFetching || result_conversation.isFetching) {
    return (
      <div className="relative flex items-center justify-center h-screen">
        <p className="text-white">Carregando...</p>
      </div>
    );
  }

  if (result.isError) {
    router.push("/login");
    return;
  }

  //   if (!user) {
  //     router.push("/login");

  //     return;
  //   }

  // useEffect(() => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages]);

  const handleSendMessage = async (newMessageText: string) => {
    const newUserMessage: ChatMessage = {
      id: messages.length + 1,
      sender: "user",
      text: newMessageText,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setLoading(true);

    mutationCreate.mutateAsync(
      {
        chatInput: newMessageText,
        session_id: "da04f151-3438-46a5-8089-a7691f9271d3",
      },
      {
        onSuccess: (data) => {
          const agentResponse: ChatMessage = {
            id: messages.length + 2,
            sender: "agent",
            text: data,
          };
          setMessages((prev) => [...prev, agentResponse]);
          setLoading(false);

          service_history.saveChat({
            userId: user?.id!, // Substitua pelo ID do usuário real
            chat: messages,
            conversationId: Number(params.chat), // Substitua pelo ID da conversa real
            title:
              conversation?.chats?.length! > 2
                ? conversation?.chats?.[2]?.text!
                : "Nova conversa",
          });
        },
        onError: () => {
          const errorResponse: ChatMessage = {
            id: messages.length + 2,
            sender: "agent",
            text: "Erro ao enviar mensagem.",
          };
          setMessages((prev) => [...prev, errorResponse]);
          setLoading(false);
        },
      }
    );
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-28 relative z-10">
        {messages &&
          messages.map((msg, index) => (
            <motion.div
              key={msg.id + index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } gap-2`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${
                  msg.sender === "user"
                    ? "bg-yellow-400 text-black"
                    : "bg-red-600 text-black"
                }`}
              >
                {msg.sender === "user" ? "👤" : "⚖️"}
              </div>
              <div
                className={`px-4 py-3 rounded-2xl max-w-sm shadow-lg ${
                  msg.sender === "user"
                    ? "bg-yellow-500 text-black min-w-[200px] max-w-[600px]"
                    : "bg-primary/40 text-white min-w-[200px] max-w-[600px]"
                }`}
              >
                {msg.sender === "agent" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                    className="prose prose-sm max-w-none text-white"
                  />
                ) : (
                  msg.text
                )}
              </div>
            </motion.div>
          ))}

        {(loading || mutationCreate.isLoading) && (
          <div className="flex items-start gap-2">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold">
              ⚖️
            </div>
            <ChatLoader />
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      <ChatInput onSendMessage={handleSendMessage} />
    </>
  );
}
