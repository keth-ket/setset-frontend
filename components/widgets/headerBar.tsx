import { House, UserRound, Settings, Bell } from "lucide-react";
import {
    ChartLine,
    CircleHelp,
    Home,
    Shield,
    ShieldAlert,
    Voicemail,
  } from "lucide-react";
import { ChangeTheme } from "./theme_Toggle";
import {

    SidebarTrigger,
  } from "@/components/ui/sidebar";
  import {useState, useEffect} from "react";
  import React from 'react';
export function HeaderBar({currPage}:any) {
    
    const[page, setPage] = useState(currPage.icon_white);
    useEffect(() => {
        setPage(currPage.icon_white);
      }, [currPage.icon_white]);
  return (
    <section className="flex w-[80vw] items-center justify-between pl-10 pr-10">
        <SidebarTrigger className="lg:hidden" />
      <span className="flex items-center gap-5">
        <span className="flex items-center justify-center rounded-lg bg-primary-foreground p-2">
        {page && React.createElement(page)}
        </span>
        <span className="text-2xl font-bold text-primary">{currPage.title}</span>
      </span>
      <span className="flex items-center justify-evenly gap-8">
        <a href={"#"} className="flex items-center gap-2 hover:bg-primary-foreground p-1 rounded-md">
          <UserRound className="fill-ring"/>
          <span className="hidden md:block">Sign in</span>
        </a>
        <a href={"#"} className=" hidden md:flex items-center gap-2">
          <Settings />
        </a>
        <a href={"#"} className="flex items-center gap-2">
          <Bell />
        </a>
        <ChangeTheme />
      </span>
    </section>
  );
}
