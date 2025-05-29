// "use client";

// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import { MessageCircle } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-violet-100">
//         <motion.div
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{
//             repeat: Infinity,
//             duration: 1.2,
//             ease: "easeInOut",
//             repeatType: "reverse",
//           }}
//           className="text-blue-700 text-2xl font-bold"
//         >
//           Carregando Sango-Luzingo...
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-violet-100 flex flex-col items-center justify-center px-6 sm:px-10 font-[var(--font-geist-sans)] relative overflow-hidden">
//       {/* SVG decorativo */}
//       <svg
//         className="absolute opacity-10 top-0 right-0 w-[400px] sm:w-[600px] z-0"
//         viewBox="0 0 1024 1024"
//         fill="none"
//       >
//         <circle cx="512" cy="512" r="400" stroke="#3b82f6" strokeWidth="100" />
//       </svg>

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-center space-y-6 relative z-10"
//       >
//         <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-800 leading-tight">
//           Bem-vindo ao <span className="text-blue-700">Sango-Luzingo</span>
//         </h1>

//         <p className="text-gray-700 text-lg sm:text-2xl max-w-3xl mx-auto leading-relaxed">
//           Eu sou o teu assistente jurídico virtual, preparado para te ajudar a
//           entender melhor as
//           <strong className="text-blue-700"> leis de Angola</strong>, conhecer
//           os teus
//           <strong className="text-blue-700"> direitos civis</strong> e te
//           orientar na busca por um
//           <strong className="text-blue-700"> advogado especializado</strong>.
//         </p>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.4, duration: 0.6 }}
//         >
//           <Button
//             size="lg"
//             className="px-10 py-7 text-xl rounded-full flex items-center gap-4 shadow-lg hover:scale-105 transition-transform"
//           >
//             <MessageCircle className="w-6 h-6" />
//             Começa agora, Ilustre!
//           </Button>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const navigator = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
          className="text-yellow-300 text-2xl font-bold"
        >
          Carregando Sango-Luzingo...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-transparent flex flex-col items-center justify-center px-6 sm:px-10 font-[var(--font-geist-sans)] relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8 }}
        className="text-center space-y-6 relative z-10"
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
          Bem-vindo ao <span className="text-yellow-400">Sango-Luzingo</span>
        </h1>

        <p className="text-gray-200 text-lg sm:text-2xl max-w-3xl mx-auto leading-relaxed">
          Eu sou o teu assistente jurídico virtual, pronto para te ajudar a
          compreender as
          <strong className="text-yellow-400"> leis de Angola</strong>, conhecer
          os teus
          <strong className="text-yellow-400"> direitos fundamentais</strong> e
          encontrar apoio de um
          <strong className="text-yellow-400"> advogado qualificado</strong>.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.6 }}
          className="flex justify-center" // <-- Centraliza o botão
        >
          <Button
            onClick={() => navigator.push("/conversar")}
            size="lg"
            className="px-10 py-7 text-xl rounded-full flex items-center gap-4 bg-yellow-500 text-black hover:bg-yellow-400 shadow-xl hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-6 h-6" />
            Começa agora, Ilustre!
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
