import { Button } from "@/components/ui/button";

export default function Perfil() {
  return (
    <main className="flex-1 /overflow-y-auto p-4 space-y-4 pb-28 relative z-10">
      <div className="/prose max-w-5xl mx-auto">
        <h1 className="text-center text-4xl font-bold mb-6 text-secondary">
          Painel do Usuário
        </h1>

        <section className="bg-white/20 p-6 rounded-xl shadow-md mb-10 text-white">
          <h2 className="text-2xl font-semibold mb-4">Boas-vindas</h2>
          <p>
            Bem-vindo ao seu painel inteligente! Aqui você pode interagir com o
            agente de inteligência artificial, visualizar suas respostas
            organizadas, salvar informações importantes e acompanhar o seu
            histórico de interações.
          </p>
        </section>

        <section className="grid grid-cols-1 text-white md:grid-cols-2 gap-6">
          <div className="bg-white/20 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-3">Últimas Interações</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <p>
                  <strong>Consulta:</strong> Como funciona a autenticação JWT?
                </p>
              </li>
              <li>
                <p>
                  <strong>Resposta:</strong> Recebida há 5 minutos
                </p>
              </li>
              <li>
                <p>
                  <strong>Consulta:</strong> Como criar rotas protegidas no
                  Next.js?
                </p>
              </li>
              <li>
                <p>
                  <strong>Resposta:</strong> Recebida há 10 minutos
                </p>
              </li>
            </ul>
          </div>

          <div className="bg-white/20 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-3">Pergunta Rápida</h3>
            <p className="mb-4">Digite sua dúvida para o agente:</p>
            <form className="flex flex-col space-y-4">
              <textarea
                className="w-full p-3 bg-transparent border rounded-md focus:outline-none focus:ring focus:ring-secondary/40 text-white"
                rows={4}
                placeholder="Digite sua pergunta aqui..."
              ></textarea>
              <Button type="submit">Enviar Pergunta</Button>
            </form>
          </div>
        </section>

        <section className="bg-white/20 text-white p-6 rounded-xl shadow-md mt-10">
          <h3 className="text-xl font-bold mb-3">Histórico de Consultas</h3>
          <table className="table-auto w-full border border-collapse border-gray-300/30 rounded">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Data</th>
                <th className="border px-4 py-2 text-left">Pergunta</th>
                <th className="border px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">25/05/2025</td>
                <td className="border px-4 py-2">Explica o que é TypeORM</td>
                <td className="border px-4 py-2">Respondido</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">24/05/2025</td>
                <td className="border px-4 py-2">
                  Como implementar autenticação JWT?
                </td>
                <td className="border px-4 py-2">Respondido</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">23/05/2025</td>
                <td className="border px-4 py-2">
                  Problema com multer no upload
                </td>
                <td className="border px-4 py-2">Respondido</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
