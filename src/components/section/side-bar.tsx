"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Menudata } from "@/data";
import { NavList } from "../ui/nav-list";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { navMain, navSetting } = Menudata;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="h-[70px] hover:bg-transparent data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <>
            {/* <Image
              src={"/images/logo.svg"}
              width={70}
              height={70}
              className="w-20 h-24"
              alt="logo da uniluanda"
            /> */}
            <div className="flex justify-center items-center">
              <div className="text-xl font-bold">SANGO LUZINGO</div>
            </div>
          </>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {navMain.length !== 0 && <NavList title="Navegação" items={navMain} />}

        {navSetting.length !== 0 && (
          <NavList title="Definições" items={navSetting} />
        )}
        {!navMain.length && !navSetting.length && <SkeletonMenu />}
        {!navMain.length && !navSetting.length && <SkeletonMenu />}
        {!navSetting.length && !navMain.length && <SkeletonMenu />}
      </SidebarContent>
      <SidebarFooter>Sango Luzingo</SidebarFooter>
      <SidebarRail />
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
