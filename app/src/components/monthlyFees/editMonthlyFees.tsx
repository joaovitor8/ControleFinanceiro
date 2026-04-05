"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "sonner"

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/src/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Loader2 } from "lucide-react"

import type { FeeType } from "./addMonthlyFees" 


type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (fee: FeeType) => void
  fee: FeeType | null
}


export function EditMonthlyFee({ open, onOpenChange, onUpdate, fee }: Props) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [frequency, setFrequency] = useState("Mensal")
  const [date, setDate] = useState("")

  useEffect(() => {
    if (fee && open) {
      setName(fee.name)
      setAmount(fee.amount.toString())
      setCategory(fee.category)
      setFrequency(fee.frequency)
      // Garantir que a data seja lida corretamente
      setDate(fee.date ? fee.date.split("T")[0] : "") 
    }
  }, [fee, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fee) return
    setLoading(true)

    try {
      const payload = {
        name,
        amount: parseFloat(amount),
        category,
        frequency,
        date: new Date(date).toISOString(),
      }

      await axios.put(`/api/db/monthlyFees/${fee.id}`, payload)

      onUpdate({
        ...fee,
        name,
        amount: parseFloat(amount),
        category,
        frequency,
        date,
      })

      toast.success("Mensalidade atualizada com sucesso!")
      onOpenChange(false)
    } catch (error) {
      console.error("Erro ao atualizar:", error)
      toast.error("Erro ao atualizar. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-card border-border w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-foreground text-lg">Editar Mensalidade</SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Altere os dados da sua assinatura ou conta fixa.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-name" className="text-sm font-medium text-foreground">Serviço / Nome</Label>
            <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-secondary/50 border-border" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-amount" className="text-sm font-medium text-foreground">Valor (R$)</Label>
            <Input id="edit-amount" type="number" step="0.01" min="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required className="bg-secondary/50 border-border font-mono" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-category" className="text-sm font-medium text-foreground">Categoria</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="bg-secondary/50 border-border">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Streaming">Streaming</SelectItem>
                  <SelectItem value="Internet">Internet</SelectItem>
                  <SelectItem value="Casa">Casa (Água, Luz)</SelectItem>
                  <SelectItem value="Aluguel">Aluguel</SelectItem>
                  <SelectItem value="Academia">Academia</SelectItem>
                  <SelectItem value="Educação">Educação</SelectItem>
                  <SelectItem value="Seguro">Seguro</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-frequency" className="text-sm font-medium text-foreground">Frequência</Label>
              <Select value={frequency} onValueChange={setFrequency} required>
                <SelectTrigger className="bg-secondary/50 border-border">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mensal">Mensal</SelectItem>
                  <SelectItem value="Anual">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-date" className="text-sm font-medium text-foreground">Data de Aquisição</Label>
              <Input id="edit-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="bg-secondary/50 border-border" />
            </div>
          </div>

          <Button type="submit" disabled={loading || !name || !amount || !category || !date} className="w-full bg-emerald-500 text-background hover:bg-emerald-600 font-semibold h-11 shadow-lg shadow-emerald-500/20 mt-2" >
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Salvando...</> : "Salvar Alterações"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
