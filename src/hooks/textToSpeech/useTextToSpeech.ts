// hooks/useTextSpeech.ts
import { useState, useEffect, useRef } from "react";

export default function useTextSpeech() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const synthesisRef = useRef<typeof window.speechSynthesis | null>(null);

  useEffect(() => {
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

    return () => {
      synthesisRef.current?.cancel();
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

  return {
    text,
    setText,
    isSpeaking,
    voices,
    selectedVoice,
    setSelectedVoice,
    speak,
    stop,
  };
}
