"use client"

import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react"
import { formatCurrency } from "@/src/lib/data"

type KpiItem = {
  label: string
  value: number
  change: number
  icon: React.ElementType
  variant: "balance" | "income" | "expense" | "savings"
}

const kpis: KpiItem[] = [
  { label: "Saldo Total", value: 19846.33, change: 9.1, icon: Wallet, variant: "balance" },
  { label: "Receitas do Mes", value: 12156.78, change: 12.4, icon: TrendingUp, variant: "income" },
  { label: "Despesas do Mes", value: 3710.25, change: -8.2, icon: TrendingDown, variant: "expense" },
  { label: "Economia Mensal", value: 8446.53, change: 24.6, icon: PiggyBank, variant: "savings" },
]

const variantStyles: Record<KpiItem["variant"], { icon: string; bg: string }> = {
  balance: { icon: "text-emerald-400", bg: "bg-emerald-500/10" },
  income: { icon: "text-emerald-400", bg: "bg-emerald-500/10" },
  expense: { icon: "text-rose-400", bg: "bg-rose-500/10" },
  savings: { icon: "text-emerald-400", bg: "bg-emerald-500/10" },
}

export function KpiCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const style = variantStyles[kpi.variant]
        const isPositive = kpi.change > 0
        return (
          <div
            key={kpi.label}
            className="group relative rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${style.bg}`}>
                <kpi.icon className={`h-4 w-4 ${style.icon}`} />
              </div>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight font-mono">
              {formatCurrency(kpi.value)}
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span
                className={`text-xs font-semibold ${isPositive ? "text-emerald-400" : "text-rose-400"}`}
              >
                {isPositive ? "+" : ""}{kpi.change}%
              </span>
              <span className="text-xs text-muted-foreground">vs mes anterior</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
