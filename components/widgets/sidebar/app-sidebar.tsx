"use client";

import { useEffect, useState } from "react";

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
import { sideBarPageProp } from "@/lib/types";

const getPageInfo = (page: string, items: sideBarPageProp[]): sideBarPageProp | undefined => {
  return items.find((item) => item.title === page);
};
export function AppSidebar({
  updateCurrPage,
  items,
}: {
  updateCurrPage: (page: sideBarPageProp) => void;
  items: sideBarPageProp[];
}) {
  const [currSelectd, setCurrSelected] = useState("Dashboard");
  // useEffect to send data to parent on page load
  useEffect(() => {
    const pageInfo = getPageInfo("Dashboard",items);
    if (pageInfo) {
      updateCurrPage(pageInfo);
    }
  }, [updateCurrPage, items]);

  const handleSelected = (item: string) => {
    setCurrSelected(item);
    const pageInfo = getPageInfo(item, items);
    if (pageInfo) {
      updateCurrPage(pageInfo);
    }
  };


  return (
    <Sidebar variant="floating" className="rounded-2xl">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-0 mt-[10px] p-[30px] font-semibold">
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
                      className={`p-[30px] hover:text-sidebar-foreground ${item.title === "Settings" ? "md:hidden" : ""}`}
                    >
                      <span
                        className={`flex !size-[38px] shrink-0 items-center justify-center ${currSelectd === item.title ? "rounded-lg bg-primary-foreground font-semibold" : "bg-transparent"}`}
                      >
                        <item.icon_white
                          className={`size-[18px] dark:hidden ${currSelectd === item.title ? "stroke-primary" : "text-muted-foreground"} `}
                        />
                        <item.icon_black
                          className={`hidden size-[18px] dark:block ${currSelectd === item.title ? "stroke-primary" : "text-muted-foreground"} `}
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
          <SidebarFooter />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
