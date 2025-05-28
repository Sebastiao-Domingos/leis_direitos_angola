// import Formulario from "@/components/formulario";

// export default function Conversar() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Formulario />
//       </main>
//     </div>
//   );
// }

// app/chat/page.tsx
export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Mensagem do agente */}
        <div className="flex items-start gap-2">
          <div className="w-10 h-10 bg-secondary/40 rounded-full flex items-center justify-center font-bold text-xl">
            ⚖️
          </div>
          <div className="bg-secondary/60 text-secondary-foreground px-4 py-3 rounded-2xl max-w-sm shadow">
            Olá! Como posso ajudá-lo hoje?
          </div>
        </div>

        {/* Mensagem do usuário */}
        <div className="flex justify-end gap-2">
          <div className="w-10 h-10 bg-primary/40 rounded-full flex items-center justify-center font-bold text-xl">
            👤
          </div>
          <div className="bg-primary/60 text-primary-foreground px-4 py-3 rounded-2xl max-w-sm shadow">
            Quero saber mais sobre os meus direitos civis.
          </div>
        </div>

        {/* Mensagem do agente */}
        <div className="flex items-start gap-2">
          <div className="w-10 h-10 bg-secondary/40 rounded-full flex items-center justify-center font-bold text-xl">
            ⚖️
          </div>
          <div className="bg-secondary/60 text-secondary-foreground px-4 py-3 rounded-2xl max-w-sm shadow">
            Claro! Podemos conversar sobre saúde, educação, identidade e muito
            mais. Qual tema deseja aprofundar?
          </div>
        </div>
      </main>

      {/* Input de mensagem */}
      <footer className="fix bottom-0 px-4 py-4 bg-muted border-t border-border flex items-center gap-2">
        <input
          type="text"
          placeholder="Digite a sua mensagem..."
          className="flex-1 px-4 py-2 rounded-full bg-white border border-input text-sm outline-none focus:ring-1 focus:ring-primary"
        />
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-opacity-90 transition-all">
          Enviar
        </button>
      </footer>
    </div>
  );
}
