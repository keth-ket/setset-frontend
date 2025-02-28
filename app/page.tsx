'use client';

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/widgets/app-sidebar";

import { Footer } from "@/components/widgets/footer";
import Metrics from "@/components/widgets/metrics";
// import { ModeToggle } from "@/components/widgets/theme-toggle";
import {HeaderBar} from "@/components/widgets/headerBar";
import {useState} from "react";

interface PageProp {
  page: string;
  url: string;
  dark_icon: string;
  white_icon: string;
}
export default function Home() {
  const [currPage, setCurrPage] = useState();
  
  const updateCurrPage = (page:any) => {
    // setting the page
    setCurrPage(page);
    
  };
  return (
    <SidebarProvider>
      <AppSidebar updateCurrPage={updateCurrPage} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center ">
            
  
            {currPage && (<HeaderBar currPage={currPage}/>)} {/* rendering the header only after the page is set*/}
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-10 p-10 pt-0">
          <Metrics />
          {/* <Appointments />
          <Faqs />
          <DataTable /> */}
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
