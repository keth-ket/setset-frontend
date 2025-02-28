'use client';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/widgets/app-sidebar";
import Appointments from "@/components/widgets/appointments";
import DataTable from "@/components/widgets/call-history";
import Faqs from "@/components/widgets/faqs";
import { Footer } from "@/components/widgets/footer";
import Metrics from "@/components/widgets/metrics";
// import { ModeToggle } from "@/components/widgets/theme-toggle";
import {HeaderBar} from "@/components/widgets/headerBar";
import { url } from "inspector";
import {useState} from "react";

interface PageProp {
  page: string;
  url: string;
  dark_icon: string;
  white_icon: string;
}
export default function Home() {
  const [currPage, setCurrPage] = useState({
    page: "Dashboard",
    url: "/",
    dark_icon: "",
    white_icon: "",});
  
  const updateCurrPage = (page:PageProp) => {
    setCurrPage(page);
  }
  return (
    <SidebarProvider>
      <AppSidebar changePage={updateCurrPage} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="lg:hidden" />
            {/* <ModeToggle /> */}
            <HeaderBar />
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
