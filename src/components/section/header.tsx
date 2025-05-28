import React from "react";
import { SidebarTrigger } from "../ui/sidebar";

// import { NavBar } from "../navbar";

export function AppHeader() {
  return (
    // <header className="sticky bg-secondary/10 top-0 z-40 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 /bg-background">

    //   <div className="flex items-center gap-2 px-4 bg-transparent">
    //     <SidebarTrigger className="-ml-1" />
    //     {/* <NavBar /> */}
    //   </div>
    // </header>

    <header className="bg-primary/70 text-primary-foreground px-6 py-4 shadow-md flex items-center gap-4 sticky top-0 z-40">
      <SidebarTrigger className="-ml-1" />

      <div>
        <h1 className="text-2xl font-bold">Agente Virtual Angola</h1>
        <p className="text-sm opacity-90">Fale com o nosso agente digital</p>
      </div>
    </header>
  );
}
