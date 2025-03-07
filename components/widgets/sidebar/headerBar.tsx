import { Settings, UserRound } from "lucide-react";
import React from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import Notification from "@/components/widgets/sidebar/notification";
import { sideBarPageProp } from "@/lib/types";

export function HeaderBar({ currPage }: { currPage: sideBarPageProp }) {
  return (
    <section className="flex flex-1 justify-between px-6 md:px-10">
      <span className="flex items-center gap-2">
        <span className="flex cursor-pointer justify-center p-2">
          <SidebarTrigger className="w-fit gap-1 text-lg font-semibold text-foreground hover:bg-transparent md:text-2xl">
            <span className="rounded-xl bg-foreground p-2">
              <currPage.icon_white className="!size-6 stroke-primary" />
            </span>

            <span className="w-44 truncate text-left sm:w-full">
              {currPage.title}
            </span>
          </SidebarTrigger>
        </span>
      </span>

      <span className="flex items-center justify-evenly gap-7">
        <a
          href={"#"}
          className="flex items-center gap-2 rounded-xl hover:bg-destructive-foreground dark:hover:bg-sidebar-accent md:p-2"
        >
          <UserRound className="m-2 fill-ring md:m-0" />
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
