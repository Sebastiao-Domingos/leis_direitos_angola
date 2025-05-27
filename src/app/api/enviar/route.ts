// pages/api/enviar.ts
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Corpo da requisição:", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    const response = await fetch(
      `http://localhost:5678/webhook-test/da04f151-3438-46a5-8089-a7691f9271d3?ola=${req.body}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response;
    return res
      .status(200)
      .json({ message: "Enviado para o n8n", resposta: data });
  } catch (error) {
    console.error("Erro ao enviar para o n8n:", error);
    return res.status(500).json({ message: "Erro ao contactar o n8n" });
  }
}

export { handler as POST };
