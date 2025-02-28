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
export function HeaderBar({currPage}:any) {
    console.log('display name here',currPage.icon_black?.displayName);
  return (
    <section className="flex w-[80vw] items-center justify-between pl-10 pr-10">
        <SidebarTrigger className="lg:hidden" />
      <span className="flex items-center gap-5">
        <span className="flex items-center justify-center rounded-lg bg-primary-foreground p-2">
        <currPage.icon_white.displayName className="size-6 " />
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
