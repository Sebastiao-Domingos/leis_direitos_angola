import { HistoryService } from "@/services/history.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const controller = new HistoryService();

export function useActionHistory() {
  const queryFronecidor = useQueryClient();

  const mutationDeleteChat = useMutation({
    mutationFn: controller.deleteChat,
    onSuccess() {
      queryFronecidor.invalidateQueries({
        queryKey: ["histories"],
      });
    },
  });

  const mutationClearHistory = useMutation({
    mutationFn: controller.clearHistory,
    onSuccess() {
      queryFronecidor.invalidateQueries({
        queryKey: ["histories"],
      });
    },
  });

  const mutationDeleteAllChats = useMutation({
    mutationFn: controller.deleteAllChats,
    onSuccess() {
      queryFronecidor.invalidateQueries({
        queryKey: ["histories"],
      });
    },
  });

  return {
    mutationClearHistory,
    // mutationSaveChat,
    mutationDeleteChat,
    mutationDeleteAllChats,
  };
}

export { useActionHistory as useActionUser };
