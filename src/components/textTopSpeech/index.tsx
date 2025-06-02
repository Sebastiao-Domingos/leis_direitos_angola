// // components/TextToSpeech.tsx
// "use client"; // Importante para componentes que usam hooks

// import { useState, useEffect, useRef } from "react";

// const TextToSpeech = () => {
//   const [text, setText] = useState("");
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
//   const [selectedVoice, setSelectedVoice] = useState<string>("");
//   const synthesisRef = useRef<typeof window.speechSynthesis | null>(null);

//   useEffect(() => {
//     // Carregar vozes disponíveis
//     synthesisRef.current = window.speechSynthesis;

//     const loadVoices = () => {
//       const availableVoices = synthesisRef.current!.getVoices();
//       setVoices(availableVoices);
//       if (availableVoices.length > 0) {
//         setSelectedVoice(availableVoices[0].name);
//       }
//     };

//     // Alguns navegadores precisam desse evento para carregar vozes
//     synthesisRef.current!.onvoiceschanged = loadVoices;
//     loadVoices();

//     return () => {
//       if (synthesisRef.current) {
//         synthesisRef.current.cancel();
//       }
//     };
//   }, []);

//   const speak = () => {
//     if (text.trim() === "") return;

//     const utterance = new SpeechSynthesisUtterance(text);

//     // Selecionar voz
//     const voice = voices.find((v) => v.name === selectedVoice);
//     if (voice) {
//       utterance.voice = voice;
//     }

//     utterance.onstart = () => setIsSpeaking(true);
//     utterance.onend = () => setIsSpeaking(false);

//     synthesisRef.current!.speak(utterance);
//   };

//   const stop = () => {
//     synthesisRef.current!.cancel();
//     setIsSpeaking(false);
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Digite o texto aqui..."
//         className="w-full p-2 border rounded mb-4 min-h-[100px]"
//       />

//       {voices.length > 0 && (
//         <select
//           value={selectedVoice}
//           onChange={(e) => setSelectedVoice(e.target.value)}
//           className="w-full p-2 border rounded mb-4"
//         >
//           {voices.map((voice) => (
//             <option key={voice.name} value={voice.name}>
//               {voice.name} ({voice.lang})
//             </option>
//           ))}
//         </select>
//       )}

//       <div className="flex gap-2">
//         <button
//           onClick={speak}
//           disabled={isSpeaking}
//           className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//         >
//           Falar
//         </button>
//         <button
//           onClick={stop}
//           disabled={!isSpeaking}
//           className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
//         >
//           Parar
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TextToSpeech;

// interface UseTextSpeechProps {
//   isSpeaking: boolean;
//   setIsSpeaking: (isSpeaking: boolean) => void;
//   voices: SpeechSynthesisVoice[];
//   setVoices: (voices: SpeechSynthesisVoice[]) => void;
// }

// function useTextSpeech({
//   isSpeaking,
//   setIsSpeaking,
//   setVoices,
//   voices,
// }: UseTextSpeechProps) {
//   const [text, setText] = useState("");
//   const [selectedVoice, setSelectedVoice] = useState<string>("");
//   const synthesisRef = useRef<typeof window.speechSynthesis | null>(null);

//   useEffect(() => {
//     // Carregar vozes disponíveis
//     synthesisRef.current = window.speechSynthesis;

//     const loadVoices = () => {
//       const availableVoices = synthesisRef.current!.getVoices();
//       setVoices(availableVoices);
//       if (availableVoices.length > 0) {
//         setSelectedVoice(availableVoices[0].name);
//       }
//     };

//     // Alguns navegadores precisam desse evento para carregar vozes
//     synthesisRef.current!.onvoiceschanged = loadVoices;
//     loadVoices();

//     return () => {
//       if (synthesisRef.current) {
//         synthesisRef.current.cancel();
//       }
//     };
//   }, []);

//   const speak = () => {
//     if (text.trim() === "") return;

//     const utterance = new SpeechSynthesisUtterance(text);

//     // Selecionar voz
//     const voice = voices.find((v) => v.name === selectedVoice);
//     if (voice) {
//       utterance.voice = voice;
//     }

//     utterance.onstart = () => setIsSpeaking(true);
//     utterance.onend = () => setIsSpeaking(false);

//     synthesisRef.current!.speak(utterance);
//   };

//   const stop = () => {
//     synthesisRef.current!.cancel();
//     setIsSpeaking(false);
//   };

//   return {
//     speak,
//     stop,
//     voices,
//     selectedVoice,
//     setSelectedVoice,
//     setText,
//     isSpeaking,
//   };
// }

// components/TextToSpeech.tsx
"use client";

import useTextSpeech from "@/hooks/textToSpeech/useTextToSpeech";

const TextToSpeech = () => {
  const {
    text,
    setText,
    isSpeaking,
    voices,
    selectedVoice,
    setSelectedVoice,
    speak,
    stop,
  } = useTextSpeech();

  return (
    <div className="max-w-md mx-auto p-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite o texto aqui..."
        className="w-full p-2 border rounded mb-4 min-h-[100px]"
      />

      {voices.length > 0 && (
        <select
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      )}

      <div className="flex gap-2">
        <button
          onClick={speak}
          disabled={isSpeaking}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Falar
        </button>
        <button
          onClick={stop}
          disabled={!isSpeaking}
          className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Parar
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;
