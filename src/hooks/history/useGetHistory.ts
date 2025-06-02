import { HistoryService } from "@/services/history.service";
import { useQuery } from "@tanstack/react-query";

const history = new HistoryService();

export function useGetHistory() {
  const { data, ...result } = useQuery({
    queryFn: () => history.getHistory(),
    queryKey: ["histories"],
  });

  return { data, result };
}

export function useGetHistoryConversation(conv_id: number) {
  const { data, ...result } = useQuery({
    queryFn: () => history.getConversationById({ conv_id }),
    queryKey: ["histories"],
  });

  return { data, result };
}

export function useGetLastIndexConversation() {
  const { data: index, ...result } = useQuery({
    queryFn: history.getLastIndexConversation,
    queryKey: ["histories-index"],
  });

  return { index, result };
}
