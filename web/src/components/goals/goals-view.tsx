"use client"

import { useState } from "react"
import { Plus, Plane, Car, Shield, Home, Target } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Progress } from "@/src/components/ui/progress"
import { Input } from "@/src/components/ui/input"
import { goals as initialGoals, formatCurrency, type Goal } from "@/src/lib/data"
import { toast } from "sonner"

const iconMap: Record<string, React.ElementType> = {
  plane: Plane,
  car: Car,
  shield: Shield,
  home: Home,
}

const colorMap: Record<string, { bg: string; text: string; progress: string; border: string }> = {
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    progress: "[&>div]:bg-emerald-500",
    border: "hover:border-emerald-500/30",
  },
  blue: {
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    progress: "[&>div]:bg-sky-500",
    border: "hover:border-sky-500/30",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    progress: "[&>div]:bg-amber-500",
    border: "hover:border-amber-500/30",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    progress: "[&>div]:bg-purple-500",
    border: "hover:border-purple-500/30",
  },
}

export function GoalsView() {
  const [goalsList, setGoalsList] = useState<Goal[]>(initialGoals)
  const [addAmounts, setAddAmounts] = useState<Record<string, string>>({})

  const handleAddValue = (goalId: string) => {
    const amt = parseFloat(addAmounts[goalId] || "0")
    if (amt <= 0) return

    setGoalsList((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          const newCurrent = Math.min(g.current + amt, g.target)
          if (newCurrent >= g.target) {
            toast.success(`Parabens! Voce atingiu a meta "${g.name}"!`)
          } else {
            toast.success(`${formatCurrency(amt)} adicionado a "${g.name}"`)
          }
          return { ...g, current: newCurrent }
        }
        return g
      })
    )
    setAddAmounts((prev) => ({ ...prev, [goalId]: "" }))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">Metas Financeiras</h2>
          <p className="text-sm text-muted-foreground mt-1">Acompanhe o progresso dos seus objetivos</p>
        </div>
        <Button className="bg-emerald-500 text-background hover:bg-emerald-600 font-semibold shadow-lg shadow-emerald-500/20">
          <Plus className="h-4 w-4 mr-2" />
          Nova Meta
        </Button>
      </div>

      {goalsList.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 px-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary mb-4">
            <Target className="h-7 w-7 text-muted-foreground" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">Nenhuma meta criada</h3>
          <p className="text-sm text-muted-foreground text-center max-w-xs mb-4">
            Crie sua primeira meta financeira e comece a acompanhar seu progresso.
          </p>
          <Button className="bg-emerald-500 text-background hover:bg-emerald-600 font-semibold">
            <Plus className="h-4 w-4 mr-2" />
            Criar Meta
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goalsList.map((goal) => {
            const Icon = iconMap[goal.icon] || Target
            const colors = colorMap[goal.color] || colorMap.emerald
            const percentage = Math.round((goal.current / goal.target) * 100)
            const remaining = goal.target - goal.current

            return (
              <div
                key={goal.id}
                className={`group rounded-xl border border-border bg-card p-6 transition-all duration-300 ${colors.border} hover:shadow-lg`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors.bg}`}>
                      <Icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{goal.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Faltam {formatCurrency(remaining)}
                      </p>
                    </div>
                  </div>
                  <span className={`text-sm font-bold font-mono ${colors.text}`}>{percentage}%</span>
                </div>

                <Progress
                  value={percentage}
                  className={`h-2.5 bg-secondary mb-4 ${colors.progress}`}
                />

                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-muted-foreground">Atual</p>
                    <p className="text-sm font-semibold text-foreground font-mono">{formatCurrency(goal.current)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Alvo</p>
                    <p className="text-sm font-semibold text-foreground font-mono">{formatCurrency(goal.target)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="R$ 0,00"
                    value={addAmounts[goal.id] || ""}
                    onChange={(e) => setAddAmounts((prev) => ({ ...prev, [goal.id]: e.target.value }))}
                    className="bg-secondary/50 border-border text-sm font-mono h-9"
                  />
                  <Button
                    onClick={() => handleAddValue(goal.id)}
                    disabled={!addAmounts[goal.id] || parseFloat(addAmounts[goal.id]) <= 0}
                    size="sm"
                    className="bg-emerald-500 text-background hover:bg-emerald-600 font-medium h-9 px-4 shrink-0"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Adicionar
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
