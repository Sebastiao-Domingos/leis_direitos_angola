// components/Formulario.tsx
"use client";

import { useState } from "react";

export default function Formulario() {
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      `http://localhost:5678/webhook-test/da04f151-3438-46a5-8089-a7691f9271d3?ola=fuila`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatInput: mensagem,
          session_id: "olasa1231",
        }),
      }
    );

    const data = await response;
    console.log("Resposta:", data);
  };

  return (
    <div>
      <textarea
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Escreva sua dúvida jurídica..."
      />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}
