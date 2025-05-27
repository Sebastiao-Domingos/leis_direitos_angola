// pages/index.js (example)
// Assuming you have a ChatWindow component

"use client";
export default function HomePage() {
  return (
    <div className="flex justify-center items-center h-full">
      {/* Your chat window component goes here */}
      {/* You'd likely need to adjust its positioning based on your overall layout */}
      <div className="chat-window">
        {/* ... your existing chat window content ... */}
        <div className="chat-header">Angola Chat AI</div>
        <div className="chat-messages">
          {/* Messages go here */}
          <div className="chat-message bot">Olá! Como posso ajudar hoje?</div>
          <div className="chat-message user">
            Quero saber sobre as novidades do N8N.
          </div>
        </div>
        <div className="chat-input">
          <textarea placeholder="Digita a tua mensagem..."></textarea>
          <button className="chat-button">Enviar</button>
        </div>
      </div>
    </div>
  );
}
