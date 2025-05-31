import { UserService } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const controller = new UserService();

function useActionUser() {
  const queryFronecidor = useQueryClient();

  const mutationLogin = useMutation({
    mutationFn: controller.login,
    onSuccess() {
      queryFronecidor.invalidateQueries({
        queryKey: ["user-login"],
      });
    },
  });

  const mutationRegister = useMutation({
    mutationFn: controller.register,
    onSuccess() {
      queryFronecidor.invalidateQueries({
        queryKey: ["user-register"],
      });
    },
  });

  const mutationLogOut = useMutation({
    mutationFn: controller.logout,
    onSuccess() {
      queryFronecidor.invalidateQueries({
        queryKey: ["user-logout"],
      });
    },
  });

  return { mutationLogin, mutationRegister, mutationLogOut };
}

export { useActionUser };
