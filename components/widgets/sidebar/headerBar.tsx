import { UserRound } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Notification from "@/components/widgets/sidebar/notification";
import SettingIcon from "@/lib/settings";
import { SettingsHeader } from "@/lib/settings";
import { sideBarPageProp } from "@/lib/types";

interface HeaderBarProps {
  currPage: sideBarPageProp;
}

const SidebarIcon = ({ currPage }: { currPage: sideBarPageProp }) => {
  return (
    <SidebarTrigger className="flex w-full items-center gap-5 text-lg font-semibold text-foreground hover:bg-transparent md:text-2xl">
      <span className="rounded-xl bg-primary-foreground p-2">
      {
          currPage.title === "Settings"? (
            <SettingsHeader />
          ):
          (
            <currPage.icon className="!size-6  stroke-primary" />
          )
        }
      </span>
      <p className="truncate whitespace-nowrap ">{currPage.title}</p>
    </SidebarTrigger>
  );
};


const UserButton = () => {
  return (
    <Button variant="ghost" className="flex items-center gap-2 hover:bg-transparent">
      <UserRound className="fill-foreground stroke-foreground" />
    </Button>
  );
};

export function HeaderBar({ currPage }: HeaderBarProps) {
  return (
    <header className="flex w-full items-center justify-between px-6 md:px-10">
      <div className="flex items-center">
        <SidebarIcon currPage={currPage} />
      </div>

      <div className="flex items-center gap-3 md:gap-7">
        <UserButton />
        <Button variant="ghost" className="hidden hover:bg-transparent sm:block">
        <SettingIcon  />
        </Button>
        <Notification  />
      </div>
    </header>
  );
}
