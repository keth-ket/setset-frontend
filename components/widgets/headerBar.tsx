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

// import {Notification} from "../ui/desktopNotification";
// import { MobileNotification } from "../ui/mobileNotification";
import { MobileNotification, DesktopNotification } from "../ui/notification";

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
    <section className="flex w-[calc(100vw)] md:w-[calc(100vw-255.333px)] items-center justify-between  md:px-10 px-2">
        <SidebarTrigger className="md:hidden" />

      <span className="flex items-center gap-5">
        <span className="flex items-center justify-center rounded-lg bg-primary-foreground p-2">
        {page && React.createElement(page, { className: "" })}

        </span>
        <span className="text-2xl font-bold text-foreground">{currPage.title}</span>
      </span>
      
      <span className="flex items-center justify-evenly md:gap-8 gap-4">
        <a href={"#"} className="flex items-center gap-2 hover:bg-primary-foreground md:p-3 rounded-md">
          <UserRound className="fill-ring"/>
          <span className="hidden md:block">Sign in</span>
        </a>
        <a href={"#"} className=" hidden md:flex items-center gap-2">
          <Settings />
        </a>
        {/* <Notification /> */}
        {/* <MobileNotification /> */}
        <DesktopNotification/>
        {/* <ChangeTheme /> */}
      </span>
    </section>
  );
}
