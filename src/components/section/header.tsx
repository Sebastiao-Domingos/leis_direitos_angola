import React from "react";
import { SidebarTrigger } from "../ui/sidebar";

export function AppHeader() {
  return (
    <header
      className="px-6 py-4 shadow-md flex items-center gap-4 sticky top-0 z-40 text-white bg-gradient-to-br from-black/90 /via-primary/90 to-primary/80"
      // style={{
      //   background:
      //     "radial-gradient(circle at top left, #000 0%, #ff0000 100%)",
      //   borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      // }}
    >
      <SidebarTrigger className="-ml-1" />

      <div>
        <h1 className="text-2xl tracking-tight text-secondary/80 font-bold">
          Sango Luzingo
        </h1>
        <p className="text-sm text-white/90">Fale com o nosso agente digital</p>
      </div>
    </header>
  );
}
