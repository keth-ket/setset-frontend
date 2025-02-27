"use client";

import {
  Voicemail,
  Home,
  ChartLine,
  Settings,
  CircleHelp,
  Shield,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Analytics",
    url: "#",
    icon: ChartLine,
  },
  {
    title: "Recordings & Transcripts",
    url: "#",
    icon: Voicemail,
  },
  {
    title: "FAQs",
    url: "#",
    icon: CircleHelp,
  },
  {
    title: "Error",
    url: "#",
    icon: Shield,
  },
];

export function AppSidebar() {
  const [currSelectd, setCurrSelected] = useState('Dashboard');
  const handleSelected = (item:string) =>
  {
    setCurrSelected(item);
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 mt-8 p-8 font-semibold">
            Setset
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-2" onClick={() => handleSelected(item.title)}>
                  <SidebarMenuButton asChild className="text-base md:text-sm">
                    <a href={item.url} className="p-8">
                      <span className={`${currSelectd == item.title ? 'rounded-lg bg-secondary  h-8 w-8 flex justify-center items-center' : 'bg-transparent'}`}>
                        <item.icon className={`h-4 w-4 ${currSelectd == item.title ? 'stroke-primary' : 'text-muted-foreground'}`}  />
                      </span>
                      <span className="h-max !text-wrap text-left ">
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
      {/* <SidebarFooter>
        <Separator className="bg-muted-foreground/20" />
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="text-base md:text-lg">
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
    </Sidebar>
  );
}
