"use client"

import Link from "next/link"
import { ArrowUpRight, ArrowDownRight, ChevronRight } from "lucide-react"
import { transactions, formatCurrency, formatDate, categoryColors } from "@/src/lib/data"

export function RecentTransactions() {
  const recent = transactions.slice(0, 5)

  return (
    <div className="rounded-xl border border-border bg-card p-5 lg:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Transacoes Recentes</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Ultimas movimentacoes</p>
        </div>
        <Link
          href="/transactions"
          className="flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Ver todas
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="flex flex-col gap-1">
        {recent.map((tx) => {
          const isIncome = tx.type === "income"
          return (
            <div
              key={tx.id}
              className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-secondary/50"
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${isIncome ? "bg-emerald-500/10" : "bg-rose-500/10"}`}>
                {isIncome ? (
                  <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-rose-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${categoryColors[tx.category] || "bg-secondary text-muted-foreground"}`}>
                    {tx.category}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{formatDate(tx.date)}</span>
                </div>
              </div>
              <span className={`text-sm font-semibold font-mono ${isIncome ? "text-emerald-400" : "text-foreground"}`}>
                {isIncome ? "+" : "-"}{formatCurrency(tx.amount)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
