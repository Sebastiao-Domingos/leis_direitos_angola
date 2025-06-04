// components/TextToSpeech.tsx
"use client";
import useTextSpeech from "@/hooks/textToSpeech/useSpeechToText";

const TextToSpeech = () => {
  const {
    text,
    setText,
    isSpeaking,
    isListening,
    voices,
    selectedVoice,
    setSelectedVoice,
    speak,
    startListening,
    stopListening,
    recognitionError,
  } = useTextSpeech();

  return (
    <div className="max-w-md mx-auto p-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite o texto aqui ou use o microfone..."
        className="w-full p-2 border rounded mb-4 min-h-[100px]"
      />

      {/* Controles de reconhecimento de voz */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            isListening ? "bg-yellow-500 text-white" : "bg-green-500 text-white"
          }`}
        >
          {isListening ? "<FaMicrophoneSlash />" : "<FaMicrophone />"}
          {isListening ? "Parar Gravação" : "Falar"}
        </button>

        {isListening && (
          <div className="flex items-center text-gray-500">
            <span className="animate-pulse">Ouvindo...</span>
          </div>
        )}
      </div>

      {recognitionError && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {recognitionError}
        </div>
      )}

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
          disabled={isSpeaking || isListening}
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
