"use client";

import { useState, useRef, useEffect, Dispatch } from "react";
import { motion } from "framer-motion";
import { SendHorizonal } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  setMessage?: Dispatch<React.SetStateAction<string>>;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message); // Chama a função para enviar a mensagem
    setMessage("");
    setIsFocused(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-4 pointer-events-none"
    >
      <motion.div
        animate={{ height: isFocused || message ? 120 : 62 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="w-full max-w-md /bg-gray-700/50 /border /border-border rounded-2xl px-4 py-2 shadow-xl flex items-end gap-2 transition-all duration-300 pointer-events-auto bg-gradient-to-br from-black/90 via-primary/40 to-black/90"
      >
        <motion.textarea
          ref={textareaRef}
          value={message}
          placeholder="Escreva sua mensagem..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (!message.trim()) setIsFocused(false);
          }}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          rows={1}
          animate={{ height: isFocused || message ? 90 : 40 }}
          transition={{ duration: 0.3 }}
          className="flex-1 resize-none border border-secondary/50 rounded-lg p-2 bg-transparent placeholder:text-slate-100 text-[16px] font-bold text-white outline-none overflow-hidden"
        />

        <motion.button
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleSend}
          whileHover={{ scale: 1.05 }}
          whileTap={{
            scale: 0.9,
            boxShadow: "0 0 0 4px rgba(0, 123, 255, 0.2)",
          }}
          className="bg-primary text-primary-foreground p-2 rounded-full transition shadow-md"
        >
          <SendHorizonal size={18} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
