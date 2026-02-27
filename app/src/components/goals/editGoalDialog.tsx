"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { toast } from "sonner"

import { Loader2, Plane, Car, Shield, Home, Target } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/src/components/ui/sheet"


const icons = [
  { value: "target", label: "Objetivo", icon: Target },
  { value: "plane", label: "Viagem", icon: Plane },
  { value: "car", label: "Carro", icon: Car },
  { value: "home", label: "Casa", icon: Home },
  { value: "shield", label: "Reserva", icon: Shield },
]


const colors = [
  { value: "emerald", bg: "bg-emerald-500", ring: "ring-emerald-500" },
  { value: "blue", bg: "bg-sky-500", ring: "ring-sky-500" },
  { value: "amber", bg: "bg-amber-500", ring: "ring-amber-500" },
  { value: "purple", bg: "bg-purple-500", ring: "ring-purple-500" },
]


type Goal = { id: string, name: string, target: number, icon: string, color: string }

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  goal: Goal | null
}


export const EditGoalSheet = ({ open, onOpenChange, onSuccess, goal }: Props) => {
  const { getToken } = useAuth()
  const [loading, setLoading] = useState(false)
  
  const [name, setName] = useState("")
  const [target, setTarget] = useState("")
  const [selectedIcon, setSelectedIcon] = useState("target")
  const [selectedColor, setSelectedColor] = useState("emerald")


  useEffect(() => {
    if (goal) {
      setName(goal.name)
      setTarget(goal.target.toString())
      setSelectedIcon(goal.icon)
      setSelectedColor(goal.color)
    }
  }, [goal])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!goal) return
    setLoading(true)

    try {
      const token = await getToken()

      await axios.put(`/api/db/goals/${goal.id}`, {
        name,
        target: parseFloat(target),
        icon: selectedIcon,
        color: selectedColor
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Meta atualizada!")
      onSuccess()
      onOpenChange(false)
    } catch (error) {
      toast.error("Erro ao atualizar meta.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-card border-border w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-foreground text-lg">Editar Meta</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-1">

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-name">Nome do Objetivo</Label>
            <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-secondary/50 border-border" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-target">Novo Valor Alvo (R$)</Label>
            <Input id="edit-target" type="number" step="0.01" min="1" value={target} onChange={(e) => setTarget(e.target.value)} required className="bg-secondary/50 border-border font-mono text-lg" />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Ícone</Label>
            <RadioGroup value={selectedIcon} onValueChange={setSelectedIcon} className="grid grid-cols-5 gap-2">
              {icons.map((item) => (
                <label key={item.value} className={`flex flex-col items-center justify-center gap-2 rounded-xl border p-2 cursor-pointer h-20 hover:bg-secondary/80 ${selectedIcon === item.value ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-border bg-secondary/30 text-muted-foreground"}`}>
                  <RadioGroupItem value={item.value} className="sr-only" />
                  <item.icon className="h-6 w-6" />
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* 4. COR */}
          <div className="flex flex-col gap-3">
            <Label>Cor</Label>
            <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex gap-4">
              {colors.map((c) => (
                <label key={c.value} className="relative flex items-center justify-center cursor-pointer group">
                  <RadioGroupItem value={c.value} className="sr-only" />
                  <div className={`h-10 w-10 rounded-full ${c.bg} transition-all ${selectedColor === c.value ? `ring-2 ring-offset-2 ring-offset-zinc-950 ${c.ring} scale-110` : "opacity-70"}`} />
                </label>
              ))}
            </RadioGroup>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-emerald-500 text-background hover:bg-emerald-600 font-semibold h-11 mt-4">
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : "Salvar Alterações"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
