interface ChatType {
  id?: number;
  created_at: string;
  title: string;
  subtitles: string[];
}

interface HistoryType {
  user: number;
  chats?: ChatType[];
}

export class HistoryService {
  async getHistory(userId: number): Promise<HistoryType> {
    const history: HistoryType = {
      user: userId,
      chats: [],
    };

    // Simulate fetching history from a database or API
    const storedHistory = localStorage.getItem(`history_${userId}`);

    if (storedHistory) {
      return JSON.parse(storedHistory);
    }

    // If no history found, return empty history
    return history;
  }

  async saveChat({
    chat,
    userId,
  }: {
    userId: number;
    chat: ChatType;
  }): Promise<void> {
    const history = await this.getHistory(userId);

    // Add the new chat to the history
    if (!history.chats) {
      history.chats = [];
    }
    history.chats.push(chat);

    // Save the updated history back to local storage
    localStorage.setItem(`history_${userId}`, JSON.stringify(history));
  }

  async clearHistory(userId: number): Promise<void> {
    // Clear the history for the user
    localStorage.removeItem(`history_${userId}`);
  }

  async deleteChat({
    chatId,
    userId,
  }: {
    userId: number;
    chatId: number;
  }): Promise<void> {
    const history = await this.getHistory(userId);

    // Filter out the chat to be deleted
    if (history.chats) {
      history.chats = history.chats.filter((chat) => chat.id !== chatId);
    }

    // Save the updated history back to local storage
    localStorage.setItem(`history_${userId}`, JSON.stringify(history));
  }

  async deleteAllChats(userId: number): Promise<void> {
    // Clear the history for the user
    localStorage.removeItem(`history_${userId}`);
  }
}
