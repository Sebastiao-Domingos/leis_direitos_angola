import { UserService } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const controller = new UserService();

function useActionUser() {
  const queryFronecidor = useQueryClient();

  const mutationLogin = useMutation({
    mutationFn: controller.login,
    onSuccess() {
      queryFronecidor.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const mutationRegister = useMutation({
    mutationFn: controller.register,
    onSuccess() {
      queryFronecidor.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  return { mutationLogin, mutationRegister };
}

export { useActionUser };
