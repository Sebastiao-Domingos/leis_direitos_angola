import { UserService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

const user = new UserService();

export function useGetUserById(id: number) {
  const { data, ...result } = useQuery({
    queryFn: () => user.getUserById(id),
    queryKey: ["users", id],
    enabled: !!id,
  });

  return { data, result };
}

export function useGetUsers() {
  const { data, ...result } = useQuery({
    queryFn: user.getUsers,
    queryKey: ["users"],
  });

  return { data, result };
}
export function useGetLoggedUser() {
  const { data, ...result } = useQuery({
    queryFn: user.getUserLogged,
    queryKey: ["user-auth"],
  });

  return { data, result };
}
