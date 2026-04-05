/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useAuth } from "@/src/contexts/AuthContext"
import { toast } from "sonner"

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Globe, User } from "lucide-react"


export const SettingsView = () => {
  // Extraindo os dados do nosso usuário logado
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">Configurações</h2>
        <p className="text-sm text-muted-foreground mt-1">Gerencie suas preferencias e conta</p>
      </div>

      {/* Profile */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
            <User className="h-4 w-4 text-emerald-400" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">Perfil</h3>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 font-bold text-xl">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">{user?.name || "Usuário"}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-foreground">Nome</Label>
            <Input disabled defaultValue={user?.name || ""} className="bg-secondary/50 border-border" />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-foreground">Email</Label>
            <Input disabled defaultValue={user?.email || ""} className="bg-secondary/50 border-border" />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
            <Globe className="h-4 w-4 text-purple-400" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">Preferencias</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-foreground">Moeda</Label>
            <Input disabled defaultValue="BRL - Real Brasileiro" className="bg-secondary/50 border-border" readOnly />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-foreground">Idioma</Label>
            <Input disabled defaultValue="Portugues (BR)" className="bg-secondary/50 border-border" readOnly />
          </div>
        </div>
      </div>

      <Button
        disabled
        onClick={() => toast.success("Configuracoes salvas com sucesso!")}
        className="w-full bg-emerald-500 text-background hover:bg-emerald-600 font-semibold h-11 shadow-lg shadow-emerald-500/20"
      >
        Salvar Alterações
      </Button>

    </div>
  )
}
