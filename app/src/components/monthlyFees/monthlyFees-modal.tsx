"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/src/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group"
import { Checkbox } from "@/src/components/ui/checkbox"
import type { Transaction } from "@/src/lib/data"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (tx: Transaction) => void
}

export function NewMonthlyFeesModal({ open, onOpenChange, onSave }: Props) {
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const [type, setType] = useState<"income" | "expense">("expense")
  const [recurring, setRecurring] = useState(false)

  const resetForm = () => {
    setDescription("")
    setAmount("")
    setCategory("")
    setDate("")
    setType("expense")
    setRecurring(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await new Promise((r) => setTimeout(r, 1000))

    const tx: Transaction = {
      id: crypto.randomUUID(),
      description,
      amount: parseFloat(amount),
      category,
      date: date || new Date().toISOString().split("T")[0],
      type,
      status: "pending",
    }

    onSave(tx)
    resetForm()
    setLoading(false)
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-card border-border w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-foreground text-lg">Nova Transacao</SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Adicione uma nova receita ou despesa ao seu controle.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="type" className="text-sm font-medium text-foreground">Tipo</Label>
            <RadioGroup
              value={type}
              onValueChange={(v) => setType(v as "income" | "expense")}
              className="flex gap-3"
            >
              <label
                htmlFor="type-income"
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border p-3 cursor-pointer transition-all ${
                  type === "income"
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                    : "border-border bg-secondary/50 text-muted-foreground hover:border-border/80"
                }`}
              >
                <RadioGroupItem value="income" id="type-income" className="sr-only" />
                <span className="text-sm font-medium">Entrada</span>
              </label>
              <label
                htmlFor="type-expense"
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border p-3 cursor-pointer transition-all ${
                  type === "expense"
                    ? "border-rose-500 bg-rose-500/10 text-rose-400"
                    : "border-border bg-secondary/50 text-muted-foreground hover:border-border/80"
                }`}
              >
                <RadioGroupItem value="expense" id="type-expense" className="sr-only" />
                <span className="text-sm font-medium">Saida</span>
              </label>
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-sm font-medium text-foreground">Descricao</Label>
            <Input
              id="description"
              placeholder="Ex: Salario, Aluguel..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="bg-secondary/50 border-border"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="amount" className="text-sm font-medium text-foreground">Valor (R$)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="bg-secondary/50 border-border font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="category" className="text-sm font-medium text-foreground">Categoria</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="bg-secondary/50 border-border">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Salario">Salario</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                  <SelectItem value="Investimentos">Investimentos</SelectItem>
                  <SelectItem value="Casa">Casa</SelectItem>
                  <SelectItem value="Alimentacao">Alimentacao</SelectItem>
                  <SelectItem value="Transporte">Transporte</SelectItem>
                  <SelectItem value="Saude">Saude</SelectItem>
                  <SelectItem value="Lazer">Lazer</SelectItem>
                  <SelectItem value="Educacao">Educacao</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="date" className="text-sm font-medium text-foreground">Data</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-border p-3 bg-secondary/30">
            <Checkbox
              id="recurring"
              checked={recurring}
              onCheckedChange={(v) => setRecurring(v === true)}
            />
            <div className="flex flex-col">
              <Label htmlFor="recurring" className="text-sm font-medium text-foreground cursor-pointer">
                Repetir mensalmente
              </Label>
              <span className="text-xs text-muted-foreground">Esta transacao sera repetida automaticamente</span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || !description || !amount || !category}
            className="w-full bg-emerald-500 text-background hover:bg-emerald-600 font-semibold h-11 shadow-lg shadow-emerald-500/20 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar Transacao"
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
