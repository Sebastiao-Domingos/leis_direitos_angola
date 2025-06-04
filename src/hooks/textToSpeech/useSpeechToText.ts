// // hooks/useTextSpeech.ts
// import { useState, useEffect, useRef } from "react";

// // Adicione esta declaração de tipo para suporte ao TypeScript
// declare global {
//   interface Window {
//     webkitSpeechRecognition: any;
//   }
// }

// export default function useTextSpeech() {
//   const [text, setText] = useState("");
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
//   const [selectedVoice, setSelectedVoice] = useState<string>("");
//   const [recognitionError, setRecognitionError] = useState<string | null>(null);

//   const synthesisRef = useRef<typeof window.speechSynthesis | null>(null);
//   const recognitionRef = useRef<any>(null);

//   useEffect(() => {
//     // Configuração da síntese de voz (Text-to-Speech)
//     synthesisRef.current = window.speechSynthesis;

//     const loadVoices = () => {
//       if (!synthesisRef.current) return;

//       const availableVoices = synthesisRef.current.getVoices();
//       setVoices(availableVoices);
//       if (availableVoices.length > 0 && !selectedVoice) {
//         setSelectedVoice(availableVoices[0].name);
//       }
//     };

//     synthesisRef.current.onvoiceschanged = loadVoices;
//     loadVoices();

//     // Configuração do reconhecimento de voz (Speech-to-Text)
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       setRecognitionError(
//         "Reconhecimento de voz não suportado neste navegador"
//       );
//       return;
//     }

//     recognitionRef.current = new SpeechRecognition();
//     recognitionRef.current.continuous = false;
//     recognitionRef.current.interimResults = true;
//     recognitionRef.current.lang = "pt-BR";

//     recognitionRef.current.onresult = (event: any) => {
//       let transcript = "";
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         if (event.results[i].isFinal) {
//           transcript += event.results[i][0].transcript;
//         }
//       }
//       if (transcript) {
//         setText((prev) => prev + " " + transcript);
//       }
//     };

//     recognitionRef.current.onerror = (event: any) => {
//       setRecognitionError(`Erro no reconhecimento: ${event.error}`);
//       setIsListening(false);
//     };

//     recognitionRef.current.onend = () => {
//       setIsListening(false);
//     };

//     return () => {
//       synthesisRef.current?.cancel();
//       recognitionRef.current?.stop();
//     };
//   }, []);

//   const speak = () => {
//     if (!synthesisRef.current || text.trim() === "") return;

//     const utterance = new SpeechSynthesisUtterance(text);
//     const voice = voices.find((v) => v.name === selectedVoice);

//     if (voice) utterance.voice = voice;

//     utterance.onstart = () => setIsSpeaking(true);
//     utterance.onend = () => setIsSpeaking(false);
//     utterance.onerror = () => setIsSpeaking(false);

//     synthesisRef.current.speak(utterance);
//   };

//   const stop = () => {
//     synthesisRef.current?.cancel();
//     setIsSpeaking(false);
//   };

//   const startListening = () => {
//     if (recognitionRef.current && !isListening) {
//       setRecognitionError(null);
//       recognitionRef.current.start();
//       setIsListening(true);
//     }
//   };

//   const stopListening = () => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   return {
//     text,
//     setText,
//     isSpeaking,
//     isListening,
//     voices,
//     selectedVoice,
//     setSelectedVoice,
//     speak,
//     stop,
//     startListening,
//     stopListening,
//     recognitionError,
//   };
// }

// hooks/useTextSpeech.ts
import { useState, useEffect, useRef, useCallback } from "react";

interface UseTextSpeechOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  voiceName?: string;
  volume?: number;
  rate?: number;
  pitch?: number;
}

export default function useTextSpeech(options: UseTextSpeechOptions = {}) {
  const {
    lang = "pt-BR",
    continuous = false,
    interimResults = true,
    voiceName = "",
    volume = 1,
    rate = 1,
    pitch = 1,
  } = options;

  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>(voiceName);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);
  const [supported, setSupported] = useState(false);

  const synthesisRef = useRef<typeof window.speechSynthesis | null>(null);
  const recognitionRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const speechRecognitionSupported =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
    const speechSynthesisSupported = "speechSynthesis" in window;

    setSupported(speechRecognitionSupported && speechSynthesisSupported);

    if (!speechRecognitionSupported) {
      setRecognitionError("Reconhecimento de voz não suportado");
    }

    if (!speechSynthesisSupported) {
      setRecognitionError("Síntese de voz não suportada");
    }

    if (!speechRecognitionSupported || !speechSynthesisSupported) {
      return;
    }

    synthesisRef.current = window.speechSynthesis;

    const loadVoices = () => {
      if (!synthesisRef.current) return;

      const availableVoices = synthesisRef.current.getVoices();
      setVoices(availableVoices);

      if (availableVoices.length > 0) {
        const defaultVoice =
          availableVoices.find((v) => v.default && v.lang.includes(lang)) ||
          availableVoices.find((v) => v.lang.includes(lang)) ||
          availableVoices[0];

        setSelectedVoice(voiceName || defaultVoice?.name || "");
      }
    };

    if (synthesisRef.current.onvoiceschanged !== undefined) {
      synthesisRef.current.onvoiceschanged = loadVoices;
    }
    loadVoices();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = continuous;
    recognitionRef.current.interimResults = interimResults;
    recognitionRef.current.lang = lang;

    recognitionRef.current.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        } else {
          transcript += event.results[i][0].transcript + " ";
        }
      }
      if (transcript) {
        setText((prev) => (prev + " " + transcript).trim());
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      setRecognitionError(`Erro: ${event.error}`);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (synthesisRef.current?.speaking) {
        synthesisRef.current.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [lang, continuous, interimResults, voiceName]);

  const speak = useCallback(() => {
    if (!synthesisRef.current || text.trim() === "") return;

    if (utteranceRef.current) {
      synthesisRef.current.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    if (selectedVoice) {
      const voice = voices.find((v) => v.name === selectedVoice);
      if (voice) utterance.voice = voice;
    }

    utterance.volume = volume;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.lang = lang;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onpause = () => {
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsPaused(false);
    };

    synthesisRef.current.speak(utterance);
  }, [text, selectedVoice, voices, volume, rate, pitch, lang]);

  const stopSpeaking = useCallback(() => {
    if (!synthesisRef.current) return;
    synthesisRef.current.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    if (!synthesisRef.current) return;
    if (isSpeaking && !isPaused) {
      synthesisRef.current.pause();
      setIsPaused(true);
    }
  }, [isSpeaking, isPaused]);

  const resume = useCallback(() => {
    if (!synthesisRef.current) return;
    if (isPaused) {
      synthesisRef.current.resume();
      setIsPaused(false);
    }
  }, [isPaused]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    setRecognitionError(null);
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      setRecognitionError("Não foi possível iniciar o reconhecimento de voz");
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setIsListening(false);
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    text,
    setText,
    isSpeaking,
    isListening,
    isPaused,
    voices,
    selectedVoice,
    setSelectedVoice,
    speak,
    stopSpeaking,
    pause,
    resume,
    startListening,
    stopListening,
    toggleListening,
    recognitionError,
    supported,
    volume,
    rate,
    pitch,
  };
}
