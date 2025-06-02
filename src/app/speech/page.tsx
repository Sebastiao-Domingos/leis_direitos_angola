// app/page.tsx

import TextToSpeech from "@/components/textTopSpeech/speechToText";

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <h1 className="text-2xl font-bold mb-8">Leitor de Texto</h1>
      <TextToSpeech />
    </main>
  );
}
