// "use client";

// import { useState, useRef, useEffect } from "react";
// import ChatInput from "@/components/chatinput"; // Ensure the path is correct
// import ChatLoader from "@/components/chatinput/loader";
// import { useActionChats } from "@/hooks/chats/useActionChat";

// // Define the shape of a chat message
// interface ChatMessage {
//   id: number;
//   sender: "agent" | "user"; // 'agent' for AI, 'user' for user
//   text: string;
// }

// export default function ChatPage() {
//   const { mutationCreate } = useActionChats();
//   const [loading, setLoading] = useState(false);
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     {
//       id: 1,
//       sender: "agent",
//       text: "Olá! Como posso ajudá-lo hoje?",
//     },

//     {
//       id: 2,
//       sender: "agent",
//       text: "Claro! Podemos conversar sobre saúde, educação, identidade e muito mais. Qual tema deseja aprofundar?",
//     },
//   ]);

//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const handleSendMessage = async (newMessageText: string) => {
//     const newUserMessage: ChatMessage = {
//       id: messages.length + 1,
//       sender: "user",
//       text: newMessageText,
//     };
//     setMessages((prevMessages) => [...prevMessages, newUserMessage]);
//     setLoading(true);

//     mutationCreate.mutateAsync(
//       {
//         chatInput: newMessageText,
//         session_id: "da04f151-3438-46a5-8089-a7691f9271d3",
//       },
//       {
//         onSuccess: (data) => {
//           const agentResponse: ChatMessage = {
//             id: messages.length + 2,
//             sender: "agent",
//             text: data, // Assuming the response contains a 'response' field
//           };
//           setMessages((prevMessages) => [...prevMessages, agentResponse]);
//           setLoading(false);
//         },
//         onError: (error) => {
//           console.error("Erro ao enviar mensagem:", error);
//           setLoading(false);
//           const agentResponse: ChatMessage = {
//             id: messages.length + 2,
//             sender: "agent",
//             text: "Erro ao enviar mensagem", // Assuming the response contains a 'response' field
//           };
//           setLoading(false);
//           setMessages((prevMessages) => [...prevMessages, agentResponse]);
//         },
//       }
//     );
//   };

//   return (
//     <div className="flex flex-col h-screen bg-background text-foreground">
//       <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
//         {messages.map((msg, index) => (
//           <div
//             key={msg.id + index}
//             className={`flex ${
//               msg.sender === "user" ? "justify-end" : "items-start"
//             } gap-2`}
//           >
//             <div
//               className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl ${
//                 msg.sender === "user" ? "bg-primary/40" : "bg-secondary/40 w-20"
//               }`}
//             >
//               {msg.sender === "user" ? "👤" : "⚖️"}
//             </div>
//             <div
//               className={`px-4 py-3 rounded-2xl max-w-sm shadow ${
//                 msg.sender === "user"
//                   ? "bg-primary/60 text-primary-foreground"
//                   : "bg-secondary/60 text-secondary-foreground"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}

//         {loading ||
//           (mutationCreate.isLoading && (
//             <div className="flex items-start gap-2">
//               <div className="w-10 h-10 bg-secondary/40 rounded-full flex items-center justify-center font-bold text-xl">
//                 ⚖️
//               </div>
//               <ChatLoader />
//             </div>
//           ))}

//         <div ref={messagesEndRef} />
//       </main>

//       {/* Pass the handleSendMessage function to ChatInput */}
//       <ChatInput onSendMessage={handleSendMessage} />
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import ChatInput from "@/components/chatinput";
import ChatLoader from "@/components/chatinput/loader";
import { useActionChats } from "@/hooks/chats/useActionChat";
import { motion } from "framer-motion";

interface ChatMessage {
  id: number;
  sender: "agent" | "user";
  text: string;
}

export default function ChatPage() {
  const { mutationCreate } = useActionChats();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "agent",
      text: "Olá! Como posso ajudá-lo hoje?",
    },
    {
      id: 2,
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
    // <div
    //   className="flex flex-col h-screen text-white font-[var(--font-geist-sans)]"
    //   style={{
    //     background:
    //       "radial-gradient(circle at top left, #000 0%, #ff0000 50%, #ffcc00 100%)",
    //   }}
    // >
    <>
      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-28 relative z-10">
        {messages.map((msg, index) => (
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
                  : "bg-red-600"
              }`}
            >
              {msg.sender === "user" ? "👤" : "⚖️"}
            </div>
            <div
              className={`px-4 py-3 rounded-2xl max-w-sm shadow-lg ${
                msg.sender === "user"
                  ? "bg-yellow-500 text-black"
                  : "bg-white text-red-800"
              }`}
            >
              {msg.text}
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
    // </div>
  );
}
