import { Home, Inbox, Settings } from "lucide-react"
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/src/components/ui/sidebar"

import {SignedIn, UserButton } from "@clerk/nextjs";
import { Bot } from "lucide-react";


// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/main/dashboard",
    icon: Home,
  },
  {
    title: "Transações",
    url: "/main/transacoes",
    icon: Home,
  },
  {
    title: "Assistente IA",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Configurações",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Bot className="h-5 w-5 text-zinc-950" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              FinSmart <span className="text-emerald-500">AI</span>
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
