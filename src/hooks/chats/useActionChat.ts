import { ChatService } from "@/services/chat.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const controller = new ChatService();

function useActionChats() {
  const queryFronecidor = useQueryClient();

  const mutationCreate = useMutation({
    mutationFn: controller.sendMessage,
    onSuccess() {
      queryFronecidor.invalidateQueries({
        queryKey: ["chats"],
      });
    },
  });

  return { mutationCreate };
}

export { useActionChats };
