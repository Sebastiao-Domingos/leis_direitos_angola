import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { NavBar } from "./nav-menu";

// import { NavBar } from "../navbar";

export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background bg-red-500">
      <div className="flex items-center gap-2 px-4 bg-transparent bg-blue-600">
        <SidebarTrigger className="-ml-1" />
        {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
        <NavBar />
      </div>
    </header>
  );
}
