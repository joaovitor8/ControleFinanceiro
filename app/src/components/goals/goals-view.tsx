// Arquivo que contém a interface de visualização das metas.

"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "@clerk/nextjs"

import { toast } from "sonner"
import { Plus, Plane, Car, Shield, Home, Target, Loader2, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Progress } from "@/src/components/ui/progress"
import { Input } from "@/src/components/ui/input"

import { NewGoalSheet } from "@/src/components/goals/addGoalDialog"
import { EditGoalSheet } from "@/src/components/goals/editGoalDialog"


interface Goal {
  id: string
  name: string
  target: number
  current: number
  icon: string
  color: string
}


const iconMap: Record<string, React.ElementType> = {
  plane: Plane,
  car: Car,
  shield: Shield,
  home: Home,
  target: Target,
}


const colorMap: Record<string, { bg: string; text: string; progress: string; border: string }> = {
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", progress: "[&>div]:bg-emerald-500", border: "hover:border-emerald-500/30" },
  blue: { bg: "bg-sky-500/10", text: "text-sky-400", progress: "[&>div]:bg-sky-500", border: "hover:border-sky-500/30" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", progress: "[&>div]:bg-amber-500", border: "hover:border-amber-500/30" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", progress: "[&>div]:bg-purple-500", border: "hover:border-purple-500/30" },
}


export const GoalsView = () => {
  const { getToken } = useAuth()
  const [goalsList, setGoalsList] = useState<Goal[]>([]) // Começa vazio
  const [addAmounts, setAddAmounts] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false) // Controle do Modal
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [goalToEdit, setGoalToEdit] = useState<Goal | null>(null)


  // BUSCAR METAS DO BACKEND
  async function fetchGoals() {
    try {
      const token = await getToken();
      
      const response = await axios.get('/api/db/goals', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setGoalsList(response.data)
    } catch (error) {
      console.error("Erro ao buscar metas", error)
      toast.error("Não foi possível carregar as metas.")
    } finally {
      setLoading(false)
    }
  }


  // Carrega ao abrir a página
  useEffect(() => {
    fetchGoals()
  }, [])


  // Função para abrir o modal de Edição
  const openEdit = (goal: Goal) => {
    setGoalToEdit(goal)
    setIsEditOpen(true)
  }


  // Função para Deletar
  const handleDeleteGoal = async (goalId: string) => {
    const confirmar = confirm("Tem certeza que deseja excluir esta meta?")
    if (!confirmar) return

    try {
      const token = await getToken()
      await axios.delete(`/api/db/goals/${goalId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success("Meta excluída com sucesso!")
      fetchGoals() // Recarrega a lista
    } catch (error) {
      console.error("Erro ao excluir meta:", error)
      toast.error("Erro ao excluir meta.")
    }
  }


  // Função para adicionar valor ao progresso da meta
  const handleAddValue = async (goalId: string) => {

    // Pega o valor digitado no input
    const amountString = addAmounts[goalId]
    if (!amountString) return

    const amountToAdd = parseFloat(amountString)
    if (isNaN(amountToAdd) || amountToAdd <= 0) return

    // Encontra a meta na lista para descobrir o valor 'current' atual
    const goal = goalsList.find(g => g.id === goalId)
    if (!goal) return

    // Soma o valor atual com o novo valor
    const newCurrentValue = goal.current + amountToAdd

    try {
      const token = await getToken()
      
      // Envia o novo valor total para o backend
      await axios.put(`/api/db/goals/${goalId}/progress`, {
        current: newCurrentValue
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      toast.success("Valor adicionado com sucesso!")
      
      // Limpa apenas o input desta meta específica
      setAddAmounts(prev => {
        const newState = { ...prev }
        delete newState[goalId]
        return newState
      })
      
      // Atualiza a lista na tela
      fetchGoals()
    } catch (error) {
      console.error("Erro ao adicionar valor:", error)
      toast.error("Erro ao atualizar o progresso da meta.")
    }
  }


  // Loading State
  if (loading) {
    return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-emerald-500" /></div>
  }


  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">Metas Financeiras</h2>
          <p className="text-sm text-muted-foreground mt-1">Acompanhe o progresso dos seus objetivos</p>
        </div>

        <Button  onClick={() => setIsSheetOpen(true)} className="bg-emerald-500 text-background hover:bg-emerald-600 font-semibold shadow-lg shadow-emerald-500/20" >
          <Plus className="h-4 w-4 mr-2" />
          Nova Meta
        </Button>
      </div>

      <NewGoalSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} onSuccess={fetchGoals} />
      <EditGoalSheet open={isEditOpen} onOpenChange={setIsEditOpen} onSuccess={fetchGoals} goal={goalToEdit} />

      {goalsList.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 px-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary mb-4">
            <Target className="h-7 w-7 text-muted-foreground" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">Nenhuma meta criada</h3>
          <p className="text-sm text-muted-foreground text-center max-w-xs mb-4">
            Crie sua primeira meta financeira e comece a acompanhar seu progresso.
          </p>
          <Button 
            onClick={() => setIsSheetOpen(true)}
            className="bg-emerald-500 text-background hover:bg-emerald-600 font-semibold"
          >
            <Plus className="h-4 w-4 mr-2" />
            Criar Meta
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goalsList.map((goal) => {
            const Icon = iconMap[goal.icon] || Target

            const colors = colorMap[goal.color] || colorMap.emerald 
            
            const percentage = goal.target > 0 ? Math.min(Math.round((goal.current / goal.target) * 100), 100) : 0
            const remaining = Math.max(goal.target - goal.current, 0)

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
                        Faltam {remaining.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                  </div>
                  <span className={`text-sm font-bold font-mono ${colors.text}`}>{percentage}%</span>
                </div>

                <Progress value={percentage} className={`h-2.5 bg-secondary mb-4 ${colors.progress}`} />

                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-muted-foreground">Atual</p>
                    <p className="text-sm font-semibold text-foreground font-mono">
                      {goal.current.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Alvo</p>
                    <p className="text-sm font-semibold text-foreground font-mono">
                      {goal.target.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Input type="number" step="0.01" min="0.01" placeholder="R$ 0,00" value={addAmounts[goal.id] || ""} onChange={(e) => setAddAmounts((prev) => ({ ...prev, [goal.id]: e.target.value }))} className="bg-secondary/50 border-border text-sm font-mono h-9" />
                  <Button onClick={() => handleAddValue(goal.id)} disabled={!addAmounts[goal.id] || parseFloat(addAmounts[goal.id]) <= 0} size="sm" className="bg-emerald-500 text-background hover:bg-emerald-600 font-medium h-9 px-4 shrink-0" >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                  </Button>
                </div>
                <div className="flex flex-col items-end gap-2 mt-4">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400 hover:text-white" onClick={() => openEdit(goal)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400 hover:text-rose-500" onClick={() => handleDeleteGoal(goal.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
