// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { SendHorizonal } from "lucide-react";

// export default function ChatInput() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSend = () => {
//     if (!message.trim()) return;
//     // Aqui você pode adicionar a lógica de envio
//     console.log("Mensagem enviada:", message);
//     setMessage("");
//     setIsOpen(false);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 100 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="fixed bottom-6 left-0 right-0 flex justify-center pointer-events-none z-50"
//     >
//       <AnimatePresence>
//         {isOpen ? (
//           <motion.div
//             key="input"
//             initial={{ scale: 0.95, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.95, opacity: 0 }}
//             transition={{ type: "spring", duration: 0.3 }}
//             className="bg-white border border-border rounded-full px-4 py-2 shadow-lg flex items-center gap-2 w-full max-w-md pointer-events-auto"
//           >
//             <input
//               autoFocus
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") handleSend();
//               }}
//               type="text"
//               placeholder="Digite a sua mensagem..."
//               className="flex-1 outline-none text-sm bg-transparent"
//             />
//             <button
//               onClick={handleSend}
//               className="bg-primary text-primary-foreground px-3 py-1.5 rounded-full hover:bg-opacity-90 transition"
//             >
//               <SendHorizonal size={16} />
//             </button>
//           </motion.div>
//         ) : (
//           <motion.button
//             key="button"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             onClick={() => setIsOpen(true)}
//             className="bg-primary text-primary-foreground px-6 py-2 rounded-full shadow-lg pointer-events-auto hover:bg-opacity-90 transition"
//           >
//             Iniciar conversa
//           </motion.button>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

//

// "use client";

// import { useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { SendHorizonal } from "lucide-react";

// export default function ChatInput() {
//   const [isFocused, setIsFocused] = useState(false);
//   const [message, setMessage] = useState("");
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   const handleSend = () => {
//     if (!message.trim()) return;
//     console.log("Mensagem enviada:", message);
//     setMessage("");
//     setIsFocused(false);
//     textareaRef.current?.blur();
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 100 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="fixed bottom-6 left-0 right-0 flex justify-center pointer-events-none z-50"
//     >
//       <motion.div
//         animate={{ height: isFocused || message ? "110px" : "50px" }}
//         transition={{ duration: 0.25 }}
//         className="bg-white border border-border rounded-full px-4 py-2 shadow-xl w-full max-w-md pointer-events-auto flex flex-col justify-center overflow-hidden"
//       >
//         <textarea
//           ref={textareaRef}
//           value={message}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               handleSend();
//             }
//           }}
//           placeholder="Escreva sua mensagem..."
//           rows={1}
//           className="w-full resize-none outline-none text-sm bg-transparent overflow-hidden"
//         />
//         <div className="flex justify-end mt-1">
//           <button
//             onMouseDown={(e) => e.preventDefault()} // Evita perder o foco
//             onClick={handleSend}
//             className="bg-primary text-primary-foreground px-3 py-1.5 rounded-full hover:bg-opacity-90 transition flex items-center gap-1 text-sm"
//           >
//             <SendHorizonal size={16} />
//             Enviar
//           </button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// "use client";

// import { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { SendHorizonal } from "lucide-react";

// export default function ChatInput() {
//   const [isFocused, setIsFocused] = useState(false);
//   const [message, setMessage] = useState("");
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   // Ajusta a altura automaticamente conforme o conteúdo
//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   }, [message]);

//   const handleSend = () => {
//     if (!message.trim()) return;
//     console.log("Mensagem enviada:", message);
//     setMessage("");
//     setIsFocused(false);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 80 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-4 pointer-events-none"
//     >
//       <motion.div
//         animate={{ height: isFocused || message ? "auto" : 52 }}
//         transition={{ type: "spring", duration: 0.25 }}
//         className="w-full max-w-md bg-white border border-border rounded-full px-4 py-2 shadow-xl flex items-end gap-2 transition-all duration-300 pointer-events-auto"
//       >
//         <textarea
//           ref={textareaRef}
//           value={message}
//           placeholder="Escreva sua mensagem..."
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => {
//             if (!message.trim()) setIsFocused(false);
//           }}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               handleSend();
//             }
//           }}
//           rows={1}
//           className="flex-1 resize-none bg-transparent text-sm text-black outline-none"
//         />
//         <button
//           onMouseDown={(e) => e.preventDefault()}
//           onClick={handleSend}
//           className="bg-primary text-primary-foreground p-2 rounded-full hover:opacity-90 transition"
//         >
//           <SendHorizonal size={18} />
//         </button>
//       </motion.div>
//     </motion.div>
//   );
// }

// "use client";

// import { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { SendHorizonal } from "lucide-react";

// export default function ChatInput() {
//   const [isFocused, setIsFocused] = useState(false);
//   const [message, setMessage] = useState("");
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   }, [message]);

//   const handleSend = () => {
//     if (!message.trim()) return;
//     console.log("Mensagem enviada:", message);
//     setMessage("");
//     setIsFocused(false);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 80 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-4 pointer-events-none"
//     >
//       <motion.div
//         animate={{ height: isFocused || message ? 120 : 62 }}
//         transition={{ type: "spring", duration: 0.3 }}
//         className="w-full max-w-md bg-white border border-border rounded-2xl px-4 py-2 shadow-xl flex items-end gap-2 transition-all duration-300 pointer-events-auto"
//       >
//         <motion.textarea
//           ref={textareaRef}
//           value={message}
//           placeholder="Escreva sua mensagem..."
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => {
//             if (!message.trim()) setIsFocused(false);
//           }}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               handleSend();
//             }
//           }}
//           rows={1}
//           animate={{ height: isFocused || message ? 90 : 40 }}
//           transition={{ duration: 0.3 }}
//           className="flex-1 resize-none border rounded-lg p-2 bg-transparent text-sm text-black outline-none overflow-hidden"
//         />

//         <button
//           onMouseDown={(e) => e.preventDefault()}
//           onClick={handleSend}
//           className="bg-primary text-primary-foreground p-2 rounded-full hover:opacity-90 transition"
//         >
//           <SendHorizonal size={18} />
//         </button>
//       </motion.div>
//     </motion.div>
//   );
// }

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
    console.log("Mensagem enviada:", message);
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
        className="w-full max-w-md bg-white border border-border rounded-2xl px-4 py-2 shadow-xl flex items-end gap-2 transition-all duration-300 pointer-events-auto"
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
          className="flex-1 resize-none border rounded-lg p-2 bg-transparent text-sm text-black outline-none overflow-hidden"
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
