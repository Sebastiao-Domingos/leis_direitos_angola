import { HistoryService } from "@/services/history.service";
import { useQuery } from "@tanstack/react-query";

const history = new HistoryService();

export function useGetHistory(userId: number) {
  const { data, ...result } = useQuery({
    queryFn: () => history.getHistory(userId),
    queryKey: ["histories"],
  });

  return { data, result };
}
