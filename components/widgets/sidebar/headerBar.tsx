"use client";
import {
  Bell,
  ChartLine,
  CircleHelp,
  Home,
  Settings,
  ShieldAlert,
  UserRound,
  Voicemail,
} from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";

// import { ChangeTheme } from "./theme_Toggle";
import Notification from "@/components/widgets/sidebar/notification";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function HeaderBar({ currPage }: any) {
  useEffect(() => {
    setPage(currPage.icon_white);
  }, [currPage.icon_white]);
  const [Page, setPage] = useState(currPage.icon_white);
  return (
    <section className="flex flex-1 justify-between px-6 md:px-10">
      <span className="flex items-center gap-2">
        <span className="flex cursor-pointer items-center justify-center rounded-lg bg-primary p-2">
          <SidebarTrigger asChild className="size-5 focus-visible:outline-none">
           <Page  className="hover:bg-transparent"/>
          </SidebarTrigger>
        </span>
        <span className="text-2xl font-bold text-foreground">
          {currPage.title}
        </span>
      </span>

      <span className="flex items-center justify-evenly gap-4 md:gap-8">
        <a
          href={"#"}
          className="flex items-center gap-2 rounded-md hover:bg-destructive-foreground dark:hover:bg-sidebar-accent md:p-3"
        >
          <UserRound className="fill-ring" />
          <span className="hidden md:block">Sign in</span>
        </a>
        <a href={"#"} className="hidden items-center gap-2 md:flex">
          <Settings />
        </a>
        {<Notification />}
      </span>
    </section>
  );
}
