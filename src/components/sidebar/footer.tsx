"use client"
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, BadgeCheck, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link";

export default function AppSidebarFooter(){
     const isMobile = useIsMobile();
     return (
          <SidebarFooter>
               <SidebarMenu>
                    <SidebarMenuItem>
                         <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                   <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                   >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                             <AvatarImage src="" alt={"Անուն Ազգանուն"} />
                                             <AvatarFallback className="rounded-lg">ԱԱ</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                             <span className="truncate font-medium">Անուն Ազգանուն</span>
                                             <span className="truncate text-xs">name@example.com</span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4" />
                                   </SidebarMenuButton>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                   className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                   side={isMobile ? "bottom" : "right"}
                                   align="end"
                                   sideOffset={4}
                              >
                                   <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                             <Avatar className="h-8 w-8 rounded-lg">
                                                  <AvatarImage src="" alt={"Անուն Ազգանուն"} />
                                                  <AvatarFallback className="rounded-lg">ԱԱ</AvatarFallback>
                                             </Avatar>
                                             <div className="grid flex-1 text-left text-sm leading-tight">
                                                  <span className="truncate font-medium">Անուն Ազգանուն</span>
                                                  <span className="truncate text-xs">name@example.com</span>
                                             </div>
                                        </div>
                                   </DropdownMenuLabel>
                                   <DropdownMenuSeparator />
                                   <DropdownMenuGroup>
                                        <DropdownMenuItem asChild>
                                             <Link href="/account">
                                                  <BadgeCheck />
                                                  Հաշիվ
                                             </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem variant="destructive">
                                             <LogOut />
                                             Դուրս գալ
                                        </DropdownMenuItem>
                                   </DropdownMenuGroup>
                              </DropdownMenuContent>
                         </DropdownMenu>
                    </SidebarMenuItem>
               </SidebarMenu>
          </SidebarFooter>
     )
}