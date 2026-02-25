/* eslint-disable @next/next/no-img-element */
"use client"

import { Bell, Globe, Lock, User } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Switch } from "@/src/components/ui/switch"
import { Separator } from "@/src/components/ui/separator"
import { toast } from "sonner"

import { useUser } from "@clerk/nextjs"


export function SettingsView() {

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
          <img src={useUser().user?.imageUrl} alt="foto perfil" className="h-12 w-12 rounded-full object-cover" />
          <div>
            <p className="text-base font-semibold text-foreground">{useUser().user?.firstName} {useUser().user?.lastName}</p>
            <p className="text-sm text-muted-foreground">...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-foreground">Nome</Label>
            <Input disabled defaultValue={`${useUser().user?.firstName}`} className="bg-secondary/50 border-border" />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-foreground">Email</Label>
            <Input disabled defaultValue={useUser().user?.emailAddresses[0]?.emailAddress} className="bg-secondary/50 border-border" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      {/* <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10">
            <Bell className="h-4 w-4 text-sky-400" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">Notificações</h3>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Notificações por email</p>
              <p className="text-xs text-muted-foreground">Receba alertas importantes por email</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="bg-border" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Alertas de metas</p>
              <p className="text-xs text-muted-foreground">Avise quando uma meta for atingida</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="bg-border" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Lembretes de contas</p>
              <p className="text-xs text-muted-foreground">Lembre antes de contas pendentes vencerem</p>
            </div>
            <Switch />
          </div>
        </div>
      </div> */}

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

      {/* Security */}
      {/* <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
            <Lock className="h-4 w-4 text-amber-400" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">Seguranca</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Autenticacao em duas etapas</p>
            <p className="text-xs text-muted-foreground">Adicione uma camada extra de protecao</p>
          </div>
          <Button variant="outline" size="sm" className="border-border bg-card text-foreground hover:bg-secondary">
            Configurar
          </Button>
        </div>
      </div> */}

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
