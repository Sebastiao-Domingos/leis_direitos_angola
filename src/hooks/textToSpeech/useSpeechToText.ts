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

export default function useSpeechToText(options: UseTextSpeechOptions = {}) {
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
        // setText((prev) => (prev + " " + transcript).trim());
        setText(() => transcript.trim());
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
