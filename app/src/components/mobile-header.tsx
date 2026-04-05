"use client"

import { TrendingUp, LogOut } from "lucide-react"
import { useAuth } from "@/src/contexts/AuthContext"
import axios from "axios"



export function MobileHeader() {
  const { user } = useAuth()

  const handleLogout = async () => {
    await axios.post("/api/auth/logout")
    window.location.href = "/login"
  }

  return (
    <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-lg px-4 py-3">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
          <TrendingUp className="h-4 w-4 text-background" />
        </div>
        <h1 className="text-base font-semibold text-foreground">FinSmart</h1>
      </div>
      
      {/* Container do Usuário Mobile */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 font-bold text-sm">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        
        {/* Botão Sair */}
        <button onClick={handleLogout} className="text-muted-foreground hover:text-rose-500 p-1">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
