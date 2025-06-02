"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "../ui/skeleton";
import { Menudata } from "@/data";
import { NavList } from "../ui/nav-list";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { navMain, navSetting } = Menudata;
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="h-full bg-gradient-to-br from-black/80 /via-primary/80 to-primary/70">
        <SidebarHeader className="bg-transparent">
          <SidebarMenuButton
            size="lg"
            className="h-[70px] hover:bg-transparent data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <>
              <div className="flex justify-center items-center">
                <div className="text-[22px] font-bold text-secondary flex justify-center items-center">
                  {open ? "⚖️  SANGO LUZINGO" : "⚖️"}
                </div>
              </div>
            </>
          </SidebarMenuButton>
        </SidebarHeader>
        <SidebarContent className="text-white">
          {navMain.length !== 0 && (
            <NavList title="Navegação" items={navMain} />
          )}

          {navSetting.length !== 0 && (
            <NavList title="Definições" items={navSetting} />
          )}
          {!navMain.length && !navSetting.length && <SkeletonMenu />}
          {!navMain.length && !navSetting.length && <SkeletonMenu />}
          {!navSetting.length && !navMain.length && <SkeletonMenu />}
        </SidebarContent>
        <SidebarRail />
      </div>
    </Sidebar>
  );
}
function SkeletonMenu() {
  return (
    <div className="flex gap-6 flex-col px-2 mb-6 mt-2">
      <div className="flex space-x-2">
        <Skeleton className="h-[15px] w-[170px] rounded" />
      </div>
      <div className="flex flex-col gap-2">
        {Array(2)
          .fill("")
          .map((_, index) => (
            <div className="flex space-x-2" key={index}>
              <Skeleton className="h-[35px] w-[35px] rounded" />{" "}
              <Skeleton className="h-[35px] w-full rounded" />
            </div>
          ))}
      </div>
    </div>
  );
}
