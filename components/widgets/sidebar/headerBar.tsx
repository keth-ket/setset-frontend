import {  UserRound } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Notification from "@/components/widgets/sidebar/notification";
import Settings from "@/lib/settings";
import { sideBarPageProp } from "@/lib/types";

export function HeaderBar({ currPage }: { currPage: sideBarPageProp }) {
  return (
    <section className="flex flex-1 justify-between px-6 md:px-10">
      <span className="flex items-start gap-2">
        <span className="flex cursor-pointer justify-start items-start p-2">
          <SidebarTrigger className="w-fit gap-5 text-lg font-semibold text-foreground hover:bg-transparent md:text-2xl">
            <span className="rounded-xl bg-foreground p-2">
              <currPage.icon_white className="!size-6 stroke-primary" />
            </span>

            <p className="w-full max-w-[25%] truncate text-left ">
              {currPage.title}
            </p>
          </SidebarTrigger>
        </span>
      </span>

      <span className="flex items-center justify-evenly gap-1  md:gap-7">
        <Button variant="ghost">
          <UserRound className="m-2 fill-foreground stroke-foreground md:m-0" />
          <p className="hidden text-lg md:block">Sign in</p>
        </Button>

        <Button variant={"ghost"}>
          <Settings />
        </Button>
        {<Notification />}
      </span>
    </section>
  );
}
