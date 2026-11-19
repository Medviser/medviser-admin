import Image from "next/image";
import { SidebarHeader } from "@/components/ui/sidebar";

export default function AppSidebarHeader(){
     return (
          <SidebarHeader className="items-center gap-2">
               <Image
                    src="/logomark.png"
                    alt="Medviser"
                    width={180}
                    height={82}
                    className="h-auto max-w-full group-data-[collapsible=icon]:hidden"
               />
               <Image
                    src="/app-icon.png"
                    alt="Medviser"
                    width={32}
                    height={32}
                    className="hidden size-8 shrink-0 rounded-full object-contain shadow-sm group-data-[collapsible=icon]:block"
               />
               <span className="text-lg font-semibold text-primary group-data-[collapsible=icon]:hidden">
                    Ադմինիստրատոր
               </span>
          </SidebarHeader>
     )
}