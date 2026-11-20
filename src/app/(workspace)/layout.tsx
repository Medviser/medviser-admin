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
                    <main className="min-w-0 flex-1 bg-linear-to-br from-primary/50 to-background w-full h-dvh p-3">
                         <SidebarTrigger />
                         {children}
                    </main>
               </SidebarProvider>
          </TooltipProvider>
     );
}