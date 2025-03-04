"use client";
import { useState } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/widgets/sidebar/app-sidebar";
import { HeaderBar } from "@/components/widgets/headerBar";

import { Home as HomeIcon } from "lucide-react";

import { ElementType } from "react";

interface PageProp {
  title: string;
  url: string;
  icon_white: ElementType;
  icon_black: ElementType;
}

export function NewParent() {
  // alway first loading into the dashboard
  const [currPage, setCurrPage] = useState<PageProp>({
    title: "Dashboard",
    url: "#",
    icon_white: HomeIcon,
    icon_black: HomeIcon,
  });
  const updateCurrPage = (page: PageProp) => {
    // setting the page
    setCurrPage(page);
  };
  return (
    <>
      <AppSidebar updateCurrPage={updateCurrPage} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center">
            <HeaderBar currPage={currPage} />
          </div>
        </header>
        {children}
      </SidebarInset>
    </>
  );
}
