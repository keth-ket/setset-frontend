import { House, UserRound, Settings, Bell } from "lucide-react";
import { ChangeTheme } from "./theme_Toggle";
import {

    SidebarTrigger,
  } from "@/components/ui/sidebar";
export function HeaderBar() {
  return (
    <section className="flex w-[80vw] items-center justify-between pl-10 pr-10">
        <SidebarTrigger className="lg:hidden" />
      <span className="flex items-center gap-5">
        <span className="flex items-center justify-center rounded-lg bg-primary-foreground p-2">
          <House />
        </span>
        <span className="text-2xl font-bold text-primary">Dashboard</span>
      </span>
      <span className="flex items-center justify-evenly gap-8">
        <a href={"#"} className="flex items-center gap-2 hover:bg-primary-foreground p-1 rounded-md">
          <UserRound className="fill-ring"/>
          <span>Sign in</span>
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
