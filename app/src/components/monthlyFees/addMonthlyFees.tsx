"use client"

import { useState } from "react"
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/src/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Loader2 } from "lucide-react"


export type FeeType = {
  id: string
  name: string
  amount: number
  category: string
  frequency: string
  date: string
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (fee: FeeType) => void
}


export function AddMonthlyFees({ open, onOpenChange, onSave }: Props) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("") // Alterado de description para name
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [frequency, setFrequency] = useState("Mensal")
  const [date, setDate] = useState("")

  const resetForm = () => {
    setName("")
    setAmount("")
    setCategory("")
    setFrequency("Mensal")
    setDate("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ajustado o payload para bater com o Prisma
      const payload = {
        name,
        amount: parseFloat(amount),
        category,
        frequency,
        date: new Date(date).toISOString(), // Garantir que vai como ISO string para o banco
      };

      // Aqui NÃO precisa mais passar token nos headers, o cookie já faz o trabalho!
      const response = await axios.post('/api/db/monthlyFees', payload);
      const newFee = response.data; // Supondo que a API retorna o objeto criado diretamente

      onSave({
        id: newFee.id,
        name: newFee.name,
        amount: Number(newFee.amount),
        category: newFee.category,
        frequency: newFee.frequency,
        date: newFee.date.split('T')[0],
      });

      toast.success("Mensalidade salva com sucesso!");
      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao salvar mensalidade:", error);
      toast.error("Erro ao salvar a mensalidade. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-card border-border w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-foreground text-lg">Nova Mensalidade</SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Adicione uma nova assinatura ou conta fixa ao seu controle.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">Serviço / Nome</Label>
            <Input id="name" placeholder="Ex: Netflix, Internet, Academia..." value={name} onChange={(e) => setName(e.target.value)} required className="bg-secondary/50 border-border" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="amount" className="text-sm font-medium text-foreground">Valor (R$)</Label>
            <Input id="amount" type="number" step="0.01" min="0.01" placeholder="0,00" value={amount} onChange={(e) => setAmount(e.target.value)} required className="bg-secondary/50 border-border font-mono" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="category" className="text-sm font-medium text-foreground">Categoria</Label>
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
              <Label htmlFor="frequency" className="text-sm font-medium text-foreground">Frequência</Label>
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
              <Label htmlFor="date" className="text-sm font-medium text-foreground">Data</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="bg-secondary/50 border-border" />
            </div>
          </div>

          <Button type="submit" disabled={loading || !name || !amount || !category || !date} className="w-full bg-emerald-500 text-background hover:bg-emerald-600 font-semibold h-11 shadow-lg shadow-emerald-500/20 mt-2" >
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Salvando...</> : "Salvar Mensalidade"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
