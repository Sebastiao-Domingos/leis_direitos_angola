// "use client";

// import ChatInput from "@/components/chatinput";
// import { useState } from "react";

// // app/chat/page.tsx
// export default function ChatPage() {
//   const [message, setMessage] = useState("");

//   return (
//     <div className="flex flex-col h-screen bg-background text-foreground">
//       <main className="flex-1 overflow-y-auto p-4 space-y-4">
//         {/* Mensagem do agente */}
//         <div className="flex items-start gap-2">
//           <div className="w-10 h-10 bg-secondary/40 rounded-full flex items-center justify-center font-bold text-xl">
//             ⚖️
//           </div>
//           <div className="bg-secondary/60 text-secondary-foreground px-4 py-3 rounded-2xl max-w-sm shadow">
//             Olá! Como posso ajudá-lo hoje?
//           </div>
//         </div>

//         {/* Mensagem do usuário */}
//         <div className="flex justify-end gap-2">
//           <div className="w-10 h-10 bg-primary/40 rounded-full flex items-center justify-center font-bold text-xl">
//             👤
//           </div>
//           <div className="bg-primary/60 text-primary-foreground px-4 py-3 rounded-2xl max-w-sm shadow">
//             Quero saber mais sobre os meus direitos civis.
//           </div>
//         </div>

//         {/* Mensagem do agente */}
//         <div className="flex items-start gap-2">
//           <div className="w-10 h-10 bg-secondary/40 rounded-full flex items-center justify-center font-bold text-xl">
//             ⚖️
//           </div>
//           <div className="bg-secondary/60 text-secondary-foreground px-4 py-3 rounded-2xl max-w-sm shadow">
//             Claro! Podemos conversar sobre saúde, educação, identidade e muito
//             mais. Qual tema deseja aprofundar?
//           </div>
//         </div>
//       </main>
//       <ChatInput message={message} setMessage={setMessage} />
//     </div>
//   );
// }

// app/chat/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import ChatInput from "@/components/chatinput"; // Ensure the path is correct
import ChatLoader from "@/components/chatinput/loader";

// Define the shape of a chat message
interface ChatMessage {
  id: number;
  sender: "agent" | "user"; // 'agent' for AI, 'user' for user
  text: string;
}

export default function ChatPage() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    // Initial messages
    {
      id: 1,
      sender: "agent",
      text: "Olá! Como posso ajudá-lo hoje?",
    },
    {
      id: 2,
      sender: "user",
      text: "Quero saber mais sobre os meus direitos civis.",
    },
    {
      id: 3,
      sender: "agent",
      text: "Claro! Podemos conversar sobre saúde, educação, identidade e muito mais. Qual tema deseja aprofundar?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (newMessageText: string) => {
    const newUserMessage: ChatMessage = {
      id: messages.length + 1,
      sender: "user",
      text: newMessageText,
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setLoading(true);

    setTimeout(() => {
      const agentResponse: ChatMessage = {
        id: messages.length + 2,
        sender: "agent",
        text: `Entendi que você perguntou: "${newMessageText}". Posso detalhar mais sobre isso?`,
      };
      setLoading(false);
      setMessages((prevMessages) => [...prevMessages, agentResponse]);
    }, 4000);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "items-start"
            } gap-2`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl ${
                msg.sender === "user" ? "bg-primary/40" : "bg-secondary/40"
              }`}
            >
              {msg.sender === "user" ? "👤" : "⚖️"}
            </div>
            <div
              className={`px-4 py-3 rounded-2xl max-w-sm shadow ${
                msg.sender === "user"
                  ? "bg-primary/60 text-primary-foreground"
                  : "bg-secondary/60 text-secondary-foreground"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-2">
            <div className="w-10 h-10 bg-secondary/40 rounded-full flex items-center justify-center font-bold text-xl">
              ⚖️
            </div>
            <ChatLoader />
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Pass the handleSendMessage function to ChatInput */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
