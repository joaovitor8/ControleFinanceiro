"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Receipt, Target, Settings } from "lucide-react"
import { cn } from "@/src/lib/utils"


const navItems = [
  { href: "/main/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/main/transactions", label: "Transacoes", icon: Receipt },
  { href: "/main/goals", label: "Metas", icon: Target },
  { href: "/main/settings", label: "Config", icon: Settings },
]


export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg">
      <ul className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-[10px] font-medium transition-colors",
                  isActive
                    ? "text-emerald-500"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
