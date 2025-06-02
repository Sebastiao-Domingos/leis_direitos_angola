import { title } from "process";
import { UserService } from "./user.service";

interface ChatType {
  id: number;
  sender: "agent" | "user";
  text: string;
}

export interface HistoryType {
  user: number;
  conversations?: ConversationType[];
}

export interface ConversationType {
  id?: number;
  title: string;
  createdAt: Date;
  chats: ChatType[];
}

const userService = new UserService();

export class HistoryService {
  async getHistory(): Promise<HistoryType | undefined> {
    const user = await userService.getUserLogged();

    if (!user) {
      throw new Error("Erro ao pegar o dado do usuário");
    }

    // Simulate fetching history from a database or API
    const storedHistory: HistoryType[] = JSON.parse(
      localStorage.getItem(`history`) || "[]"
    );

    const userHistory = storedHistory.find((hist) => hist.user === user.id!);

    if (userHistory) {
      return userHistory;
    }

    // If no history found, return empty history
    return undefined;
  }

  async getConversationById({
    conv_id,
  }: {
    conv_id: number;
  }): Promise<ConversationType | undefined> {
    const user = await userService.getUserLogged();

    if (!user) {
      throw new Error("Erro ao pegar o dado do usuário");
    }

    // Simulate fetching history from a database or API
    const storedHistory: HistoryType[] = JSON.parse(
      localStorage.getItem(`history`) || "[]"
    );

    const userHistory = storedHistory.find((hist) => hist.user === user.id!);

    if (!userHistory) {
      return undefined;
    }

    const userConversation = userHistory.conversations?.find(
      (item) => item.id === conv_id
    );

    console.log("user converstion : ", userConversation);

    return userConversation;
  }
  saveChat({
    chat,
    userId,
    conversationId,
    title,
  }: {
    userId: number;
    chat: ChatType[];
    conversationId?: number;
    title?: string;
  }) {
    // const history = await this.getHistory(userId);
    const history: HistoryType[] = JSON.parse(
      localStorage.getItem(`history`) ?? "[]"
    );

    if (history.length === 0) {
      const newHistory: HistoryType = {
        user: userId,

        conversations: [
          {
            id: 1,
            title: title || "Nova conversa",
            createdAt: new Date(),
            chats: chat,
          },
        ],
      };

      localStorage.setItem(`history`, JSON.stringify([newHistory]));
      return;
    } else {
      let userHistory = history.find((history) => history.user === userId);

      if (userHistory) {
        console.log("Ola : estou aqui 3 historico existente");

        if (userHistory.conversations) {
          console.log("Ola : estou aqui 4 conversacao existente");

          const userConversation = userHistory.conversations.find(
            (conversation) => conversation.id === conversationId
          );

          if (userConversation) {
            console.log("Ola : estou aqui 5 conversacao existente");
            userConversation.chats = chat;

            userHistory.conversations.forEach((item) => {
              if (item.id === userConversation.id) {
                // item.chats.push(...chat);
                item = userConversation;
              }
            });

            history.forEach((item) => {
              if (item.user === userId) {
                item.conversations = userHistory.conversations;
              }
            });

            localStorage.setItem(`history`, JSON.stringify(history));

            return;
          } else {
            console.log("Ola : estou aqui 5 nova conversa");
            userHistory.conversations.push({
              id: userHistory.conversations.length + 1,
              title: title || "Nova conversa",
              createdAt: new Date(),
              chats: chat,
            });

            history.forEach((item) => {
              if (item.user === userId) {
                item.conversations = userHistory.conversations;
              }
            });

            localStorage.setItem(`history`, JSON.stringify(history));
            return;
          }
        } else {
          console.log("Ola : estou aqui 5 nova conversa");

          userHistory.conversations = [
            {
              id: 1,
              title: title || "Nova conversa",
              createdAt: new Date(),
              chats: chat,
            },
          ];

          history.forEach((hist) => {
            if ((hist.user = userHistory.user)) {
              hist = userHistory;
            }
          });

          localStorage.setItem(`history`, JSON.stringify(history));
          return;
        }
      } else {
        // If no history found for the user, create a new one
        console.log("Ola : estou aqui 2 novo historico");
        const newHistory: HistoryType = {
          user: userId,
          conversations: [
            {
              id: 1,
              title: title || "Nova conversa",
              createdAt: new Date(),
              chats: chat,
            },
          ],
        };
        history.push(newHistory);
        localStorage.setItem(`history`, JSON.stringify(history));
        return;
      }
    }
  }

  async clearHistory({ hist_id }: { hist_id: number }): Promise<boolean> {
    const historico = await getHistory();

    if (!historico) {
      throw new Error("Histórico não encontrado");
    }

    if (!historico.conversations || historico.conversations.length === 0) {
      throw new Error("Histórico vazio");
    }

    historico.conversations = historico.conversations.filter(
      (conversation) => conversation.id !== hist_id
    );

    const historicos = JSON.parse(
      localStorage.getItem(`history`) || "[]"
    ) as HistoryType[];

    historicos.forEach((histor) => {
      if (histor.user === historico.user) {
        histor.conversations = historico.conversations;
      }
    });

    localStorage.setItem(`history`, JSON.stringify(historicos));

    return true;
    // Clear the history for the user
  }

  async deleteChat({
    chatId,
    userId,
  }: {
    userId: number;
    chatId: number;
  }): Promise<void> {
    const history = await this.getHistory();

    // Filter out the chat to be deleted
    if (history!.conversations) {
      history!.conversations = history!.conversations.filter(
        (chat) => chat.id !== chatId
      );
    }

    // Save the updated history back to local storage
    localStorage.setItem(`history_${userId}`, JSON.stringify(history));
  }

  async deleteAllChats(userId: number): Promise<void> {
    // Clear the history for the user
    localStorage.removeItem(`history_${userId}`);
  }

  async getLastIndexConversation(): Promise<number> {
    const history = await getHistory();

    if (!history) {
      return 1;
    }

    if (!history.conversations || history.conversations.length === 0) {
      return 1;
    }

    return history.conversations[history.conversations?.length - 1].id! + 1;
  }
}

async function getHistory(): Promise<HistoryType | undefined> {
  const user = await userService.getUserLogged();

  if (!user) {
    throw new Error("Erro ao pegar o dado do usuário");
  }

  // Simulate fetching history from a database or API
  const storedHistory: HistoryType[] = JSON.parse(
    localStorage.getItem(`history`) || "[]"
  );

  const userHistory = storedHistory.find((hist) => hist.user === user.id!);

  if (userHistory) {
    return userHistory;
  }

  // If no history found, return empty history
  return undefined;
}
