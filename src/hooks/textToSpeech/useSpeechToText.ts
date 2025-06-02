// hooks/useTextSpeech.ts
import { useState, useEffect, useRef } from "react";

// Adicione esta declaração de tipo para suporte ao TypeScript
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export default function useTextSpeech() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [recognitionError, setRecognitionError] = useState<string | null>(null);

  const synthesisRef = useRef<typeof window.speechSynthesis | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Configuração da síntese de voz (Text-to-Speech)
    synthesisRef.current = window.speechSynthesis;

    const loadVoices = () => {
      if (!synthesisRef.current) return;

      const availableVoices = synthesisRef.current.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    synthesisRef.current.onvoiceschanged = loadVoices;
    loadVoices();

    // Configuração do reconhecimento de voz (Speech-to-Text)
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setRecognitionError(
        "Reconhecimento de voz não suportado neste navegador"
      );
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "pt-BR";

    recognitionRef.current.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        }
      }
      if (transcript) {
        setText((prev) => prev + " " + transcript);
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      setRecognitionError(`Erro no reconhecimento: ${event.error}`);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    return () => {
      synthesisRef.current?.cancel();
      recognitionRef.current?.stop();
    };
  }, []);

  const speak = () => {
    if (!synthesisRef.current || text.trim() === "") return;

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.name === selectedVoice);

    if (voice) utterance.voice = voice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthesisRef.current.speak(utterance);
  };

  const stop = () => {
    synthesisRef.current?.cancel();
    setIsSpeaking(false);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setRecognitionError(null);
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return {
    text,
    setText,
    isSpeaking,
    isListening,
    voices,
    selectedVoice,
    setSelectedVoice,
    speak,
    stop,
    startListening,
    stopListening,
    recognitionError,
  };
}
