import "../globals.css";

import { SidebarProvider } from "@/components/ui/sidebar";
import { NewParent } from "@/components/widgets/sidebar/newParent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <NewParent>{children}</NewParent>
    </SidebarProvider>
  );
}
