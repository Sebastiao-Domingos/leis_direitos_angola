import { api } from "@/configurations/axios";

export class ChatService {
  private readonly ENDPOINT =
    "webhook-test/da04f151-3438-46a5-8089-a7691f9271d3";

  public async sendMessage(message: string): Promise<string> {
    // Simulate sending a message to the server and getting a response
    try {
      const response = await api.post(
        "webhook-test/da04f151-3438-46a5-8089-a7691f9271d3",
        { message }
      );
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
