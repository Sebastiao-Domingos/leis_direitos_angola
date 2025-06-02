import React, { useEffect } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { UserCircle } from "lucide-react";
import { useActionUser } from "@/hooks/user/useUserAction";
import { useGetLoggedUser } from "@/hooks/user/useGetUsers";
import { useRouter } from "next/navigation";
import { UserService } from "@/services/user.service";

const user = new UserService();

export function AppHeader() {
  const { data, result } = useGetLoggedUser();
  // const { mutationLogOut } = useActionUser();
  const router = useRouter();

  // useEffect(() => {
  //   if (!data) {
  //     console.log("ola : ", data);
  //     user.logout();
  //     router.push("/");
  //   }
  // }, [data]);

  return (
    <header className="px-6 py-4 shadow-md flex items-center gap-4 sticky top-0 z-40 text-white bg-gradient-to-br from-black/90 /via-primary/90 to-primary/80">
      <div>
        <SidebarTrigger className="-ml-1" />

        <div>
          <h1 className="text-2xl tracking-tight text-secondary/80 font-bold">
            Sango Luzingo
          </h1>
          <p className="text-sm text-white/90">
            Fale com o nosso agente digital
          </p>
        </div>
      </div>

      {result.isSuccess && data && (
        <div className="ml-auto flex flex-col gap-1 items-center">
          <UserCircle />
          <p>{data.username.split(" ")[0].toUpperCase()}</p>
        </div>
      )}
    </header>
  );
}
