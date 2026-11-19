import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebarFooter from "@/components/sidebar/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppSidebarList from "@/components/sidebar/content";
import AppSidebarHeader from "@/components/sidebar/header";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
     return (
          <TooltipProvider>
               <SidebarProvider>
                    <Sidebar collapsible="icon">
                         <AppSidebarHeader/>
                         <AppSidebarList/>
                         <AppSidebarFooter />
                    </Sidebar>
                    <main className="min-w-0 flex-1">
                         <SidebarTrigger />
                         {children}
                    </main>
               </SidebarProvider>
          </TooltipProvider>
     );
}