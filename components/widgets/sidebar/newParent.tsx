"use client";
import { useState, ReactNode, ElementType } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/widgets/sidebar/app-sidebar";
import { HeaderBar } from "@/components/widgets/sidebar/headerBar";

import { Home as HomeIcon } from "lucide-react";

interface PageProp {
  title: string;
  url: string;
  icon_white: ElementType;
  icon_black: ElementType;
}

interface NewParentProps {
  children: ReactNode; 
}

export function NewParent({ children }: NewParentProps) {
  
  const [currPage, setCurrPage] = useState<PageProp>({
    title: "Dashboard",
    url: "#",
    icon_white: HomeIcon,
    icon_black: HomeIcon,
  });

  const updateCurrPage = (page: PageProp) => {
    setCurrPage(page);
  };

  return (
    < >
      <AppSidebar updateCurrPage={updateCurrPage} /> 
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center w-full">
            <HeaderBar currPage={currPage} />
          </div>
        </header>
        {children}
      </SidebarInset>
    </>
  );
}
