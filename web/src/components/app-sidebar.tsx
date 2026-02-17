"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Receipt, Target, Settings, TrendingUp } from "lucide-react"
import { cn } from "@/src/lib/utils"

import {SignedIn, UserButton } from "@clerk/nextjs";


const navItems = [
  { href: "/main/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/main/transactions", label: "Transacoes", icon: Receipt },
  { href: "/main/goals", label: "Metas", icon: Target },
  { href: "/main/settings", label: "Configuracoes", icon: Settings },
]


export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-sidebar border-r border-sidebar-border">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500">
          <TrendingUp className="h-5 w-5 text-background" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-foreground tracking-tight">FinSmart</h1>
          <p className="text-xs text-muted-foreground">Controle Financeiro</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-accent text-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("h-4.5 w-4.5", isActive && "text-emerald-500")} />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Lucas Martins</p>
            <p className="text-xs text-muted-foreground truncate">lucas@finsmart.app</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
