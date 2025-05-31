import { HistoryService } from "@/services/history.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const controller = new HistoryService();

export function useActionHistory() {
  const queryFronecidor = useQueryClient();

  // const mutationSaveChat = useMutation({
  //   mutationFn: controller.saveChat,
  //   onSuccess() {
  //     queryFronecidor.invalidateQueries({
  //       queryKey: ["history"],
  //     });
  //   },
  // });

  const mutationDeleteChat = useMutation({
    mutationFn: controller.deleteChat,
    onSuccess() {
      queryFronecidor.invalidateQueries({
        queryKey: ["history"],
      });
    },
  });

  const mutationClearHistory = useMutation({
    mutationFn: controller.clearHistory,
    onSuccess() {
      queryFronecidor.invalidateQueries({
        queryKey: ["history"],
      });
    },
  });

  const mutationDeleteAllChats = useMutation({
    mutationFn: controller.deleteAllChats,
    onSuccess() {
      queryFronecidor.invalidateQueries({
        queryKey: ["history"],
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
