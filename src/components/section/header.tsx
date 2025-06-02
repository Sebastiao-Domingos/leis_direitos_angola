import { SidebarTrigger } from "../ui/sidebar";
import { UserCircle } from "lucide-react";
import { useGetLoggedUser } from "@/hooks/user/useGetUsers";

export function AppHeader() {
  const { data, result } = useGetLoggedUser();

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
