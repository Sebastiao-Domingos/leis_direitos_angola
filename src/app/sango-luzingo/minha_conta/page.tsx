"use client";

import { Button } from "@/components/ui/button";
import { cleanHtmlText } from "@/helpers/clearHtml";
import { useActionHistory } from "@/hooks/history/useActionHistory";
import { useGetHistory } from "@/hooks/history/useGetHistory";
import { useGetLoggedUser } from "@/hooks/user/useGetUsers";
import { ConversationType } from "@/services/history.service";
import { Eye, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Perfil() {
  const { data } = useGetLoggedUser();
  const router = useRouter();

  const { data: histories, result: result_history } = useGetHistory();

  if (result_history.isLoading) {
    return (
      <div className="relative text-white text-center">
        <p>Carregando o histórico</p>
      </div>
    );
  }

  if (result_history.isError) {
    router.push("/login");

    return;
  }

  return (
    <main className="flex-1 /overflow-y-auto p-4 space-y-4 pb-28 relative z-10">
      <div className="/prose max-w-5xl mx-auto">
        <h1 className="text-center text-4xl font-bold mb-6 text-secondary">
          Painel do Usuário
        </h1>

        <section className="bg-white/10 p-6 rounded-xl shadow-md mb-10 text-white">
          <h2 className="text-2xl font-semibold mb-4">Boas-vindas</h2>
          <p>
            Bem-vindo ao seu painel inteligente! Aqui você pode interagir com o
            agente de inteligência artificial, visualizar suas respostas
            organizadas, salvar informações importantes e acompanhar o seu
            histórico de interações.
          </p>
        </section>

        <section className="grid grid-cols-1 text-white md:grid-cols-2 gap-6">
          <div className="relative bg-white/10 p-6 rounded-xl shadow-md">
            {result_history.isSuccess &&
              histories &&
              histories.conversations && (
                <Button
                  size={"icon"}
                  className="absolute top-4 right-4 bg-secondary hover:bg-secondary/30 transition-colors"
                  onClick={() =>
                    router.push(
                      `/sango-luzingo/conversar/${
                        histories.conversations &&
                        histories?.conversations[
                          histories?.conversations?.length! - 1
                        ].id
                      }`
                    )
                  }
                  title="Ver o detalhe da conversa!"
                >
                  <Eye />
                </Button>
              )}
            <h3 className="text-xl font-bold mb-3">Últimas Interações</h3>

            {histories && histories.conversations && (
              <>
                <p className="flex flex-wrap gap-2 items-center">
                  <strong>Consulta:</strong>{" "}
                  {
                    histories.conversations[histories.conversations.length - 1]
                      .title
                  }
                  <span className="italic text-sm">
                    {
                      histories.conversations[
                        histories.conversations.length - 1
                      ].createdAt
                        .toString()
                        .split("T")[0]
                    }
                    /
                    {
                      histories.conversations[
                        histories.conversations.length - 1
                      ].createdAt
                        .toString()
                        .split("T")[1]
                        .split(".")[0]
                    }
                  </span>
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  {histories.conversations[
                    histories.conversations.length - 1
                  ].chats
                    .slice(0, 3)
                    .map((item, index) => (
                      <li key={index}>
                        <p className="flex flex-wrap gap-2 items-center">
                          {cleanHtmlText(item.text)}
                          <strong className="italic text-sm">
                            {item.sender === "agent"
                              ? "Agente"
                              : cleanHtmlText(
                                  data?.username.split(" ")[0] || ""
                                )}
                          </strong>
                        </p>
                      </li>
                    ))}

                  <li>
                    <p className="flex flex-wrap gap-2 items-center">
                      <strong className="italic text-sm">
                        .....................................................
                      </strong>
                    </p>
                  </li>
                </ul>
              </>
            )}
          </div>

          <div className="bg-white/10 p-6 rounded-xl shadow-md">
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

        <section className="bg-white/10 text-white p-6 rounded-xl shadow-md mt-10">
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
              {histories &&
                histories.conversations &&
                histories.conversations.map((item, index) => (
                  <TRow item={item} key={index} />
                ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}

function TRow({ item }: { item: ConversationType }) {
  const router = useRouter();
  const { mutationClearHistory } = useActionHistory();

  const handleDelete = () => {
    mutationClearHistory.mutateAsync(
      { hist_id: item.id! },
      {
        onSuccess: () => {
          toast.success("Conversa deletada com sucesso!");
          router.refresh();
        },
        onError() {
          toast.error("Erro ao deletar a conversa");
          console.error("Erro ao deletar a conversa");
        },
      }
    );
  };
  return (
    <tr key={item.id} className="hover:bg-slate-100/10">
      <td className="border px-4 py-2">
        {item.createdAt.toString().split("T")[0]}
      </td>
      <td className="border px-4 py-2">{item.title}</td>
      <td className="border px-4 py-2 space-x-4 text-right">
        <Button
          size={"icon"}
          className="bg-transparent hover:bg-secondary/30 transition-colors text-secondary"
          onClick={() => router.push(`/sango-luzingo/conversar/${item.id}`)}
        >
          <Eye />
        </Button>

        <Button
          size={"icon"}
          className="bg-transparent hover:bg-primary/30 transition-colors"
          onClick={handleDelete}
        >
          <Trash />
        </Button>
      </td>
    </tr>
  );
}
