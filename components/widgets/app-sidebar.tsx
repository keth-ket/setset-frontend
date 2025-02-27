"use client";

import {
  ChartLine,
  CircleHelp,
  Home,
  Shield,
  ShieldAlert,
  Voicemail,
} from "lucide-react";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";



// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon_white: Home,
    icon_black: Home,
  },
  {
    title: "Analytics",
    url: "#",
    icon_white: ChartLine,
    icon_black: ChartLine,
  },
  {
    title: "Recordings & Transcripts",
    url: "#",
    icon_white: Voicemail,
    icon_black: Voicemail,
  },
  {
    title: "FAQs",
    url: "#",
    icon_white: CircleHelp,
    icon_black: CircleHelp,
  },
  {
    title: "Errors",
    url: "#",
    icon_white: ShieldAlert,
    icon_black: Shield,
  },
];

export function AppSidebar() {
  const [currSelectd, setCurrSelected] = useState("Dashboard");

  const handleSelected = (item: string) => {
    setCurrSelected(item);
  };

  return (
    <Sidebar className="rounded-2xl">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 mt-8 p-[40px] font-semibold">
            Setset
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="mb-2"
                  onClick={() => handleSelected(item.title)}
                >
                  <SidebarMenuButton asChild className="text-base md:text-sm">
                    <a
                      href={item.url}
                      className="p-[40px] hover:text-sidebar-foreground"
                    >
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center ${currSelectd === item.title ? "rounded-lg bg-secondary-foreground" : "bg-transparent"}`}
                      >
                        <item.icon_white
                          className={`size-[18px] dark:hidden ${currSelectd === item.title ? "stroke-primary-foreground" : "text-muted-foreground"} ${item.title === "FAQs" ? "fill-primary stroke-primary-foreground" : ""}`}
                        />
                        <item.icon_black
                          className={`hidden size-[18px] dark:block ${currSelectd === item.title ? "stroke-primary-foreground" : "text-muted-foreground"} ${item.title === "Errors" ? "fill-white" : ""} ${item.title === "FAQs" ? "fill-secondary" : ""}`}
                        />
                      </span>
                      <span className="h-max !text-wrap text-left">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
    </Sidebar>
  );
}
