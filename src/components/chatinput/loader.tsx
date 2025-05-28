// components/ChatLoader.tsx
import { motion } from "framer-motion";

export default function ChatLoader() {
  const bounceTransition = {
    y: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  };

  return (
    <div className="flex items-center space-x-1 px-4 py-3 bg-secondary/60 text-secondary-foreground rounded-2xl shadow max-w-fit">
      <motion.span
        className="w-2 h-2 bg-secondary-foreground rounded-full"
        animate={{ y: [0, -6, 0] }}
        transition={bounceTransition}
      />
      <motion.span
        className="w-2 h-2 bg-secondary-foreground rounded-full"
        animate={{ y: [0, -6, 0] }}
        transition={{ ...bounceTransition, delay: 0.1 }}
      />
      <motion.span
        className="w-2 h-2 bg-secondary-foreground rounded-full"
        animate={{ y: [0, -6, 0] }}
        transition={{ ...bounceTransition, delay: 0.2 }}
      />
    </div>
  );
}
