"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Receipt, Target, Settings, TrendingUp, LogOut } from "lucide-react"
import { cn } from "@/src/lib/utils"

import { useAuth } from "@/src/contexts/AuthContext"
import axios from "axios"


const navItems = [
  { href: "/main/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/main/monthlyFees", label: "Mensalidades", icon: Receipt },
  { href: "/main/goals", label: "Metas", icon: Target },
  { href: "/main/settings", label: "Configuracoes", icon: Settings },
]


export function AppSidebar() {
  const pathname = usePathname()
  
  // Puxando o usuário logado do sistema
  const { user } = useAuth()

  // Função de deslogar
  const handleLogout = async () => {
    await axios.post("/api/auth/logout")
    window.location.href = "/login" // Redireciona e limpa a memória do React
  }

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

      {/* Rodapé do Sidebar Customizado */}
      <div className="border-t border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          
          {/* Nosso Avatar Customizado (Inicial do Nome) */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user?.name || "Usuário"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>

          {/* Botão de Sair */}
          <button 
            onClick={handleLogout} 
            className="text-muted-foreground hover:text-rose-500 transition-colors p-1" 
            title="Sair"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
