// // app/page.tsx

// import TextToSpeech from "@/components/textTopSpeech/speechToText";

// export default function Home() {
//   return (
//     <main className="min-h-screen p-24">
//       <h1 className="text-2xl font-bold mb-8">Leitor de Texto</h1>
//       <TextToSpeech />
//     </main>
//   );
// }
// //

// app/chat/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SendHorizonal,
  Mic,
  Volume2,
  Pause,
  Play,
  Settings,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSpeechToText from "@/hooks/textToSpeech/useSpeechToText";

interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: string;
}

export function ChatInputInVoice() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "agent",
      text: "Olá! Sou seu assistente virtual. Como posso ajudar? 😊",
      timestamp: formatTime(new Date()),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    text,
    setText,
    isSpeaking,
    isListening,
    isPaused,
    pause,
    resume,
    toggleListening,
    supported,
  } = useSpeechToText({ lang: "pt-BR" });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (text && !isListening) {
      setInputMessage(text);
    }
  }, [text, isListening]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputMessage,
      timestamp: formatTime(new Date()),
    };

    setMessages((prev) => [...prev, newMessage]);
    setText("");
    setInputMessage("");

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: Date.now().toString(),
        sender: "agent",
        text: `Entendi que você disse: "${inputMessage}". Como posso ajudar com isso?`,
        timestamp: formatTime(new Date()),
      };
      setMessages((prev) => [...prev, agentResponse]);
    }, 1500);
  };

  function formatTime(date: Date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-gray-200 dark:border-gray-800"
    >
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              setText(e.target.value);
            }}
            placeholder="Escreva ou fale sua mensagem..."
            className="rounded-full px-6 py-5 border border-gray-300 focus-visible:ring-2 focus-visible:ring-yellow-500"
          />
          <Button
            type="button"
            size="icon"
            className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 ${
              isListening
                ? "bg-red-600 hover:bg-red-700 animate-pulse"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            onClick={toggleListening}
            disabled={!supported}
          >
            <Mic className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex gap-2">
          {isSpeaking && !isPaused && (
            <Button
              type="button"
              size="icon"
              className="rounded-full bg-yellow-500 hover:bg-yellow-600"
              onClick={pause}
            >
              <Pause className="w-5 h-5" />
            </Button>
          )}

          {isPaused && (
            <Button
              type="button"
              size="icon"
              className="rounded-full bg-yellow-500 hover:bg-yellow-600"
              onClick={resume}
            >
              <Play className="w-5 h-5" />
            </Button>
          )}

          <Button
            type="submit"
            className="rounded-full px-6 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
            disabled={!inputMessage.trim()}
          >
            <SendHorizonal className="w-5 h-5 mr-2" />
            Enviar
          </Button>
        </div>
      </div>

      {!supported && (
        <p className="text-red-500 text-sm mt-2 text-center">
          Seu navegador não suporta reconhecimento ou síntese de voz
        </p>
      )}
    </form>
  );
}
