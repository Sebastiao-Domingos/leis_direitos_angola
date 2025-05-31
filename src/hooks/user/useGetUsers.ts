import { UserService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

const user = new UserService();

export function useGetUsers(id?: number) {
  if (id) {
    const { data, ...result } = useQuery({
      queryFn: () => user.getUserById(id),
      queryKey: ["users", id],
    });

    return { data, result };
  }

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
