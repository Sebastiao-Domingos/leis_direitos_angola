import { api } from "@/configurations/axios";

export interface ChatBody {
  chatInput: string;
  session_id: string;
}

export class ChatService {
  private readonly ENDPOINT = "webhook/da04f151-3438-46a5-8089-a7691f9271d3";

  public async sendMessage(message: ChatBody): Promise<string> {
    // Simulate sending a message to the server and getting a response
    try {
      const response = await api.post("webhook/automation", message);
      if (response.status === 200) {
        return response.data.response; // Assuming the response contains a 'response' field
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Failed to send message");
    }
  }
}
