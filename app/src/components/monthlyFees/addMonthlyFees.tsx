"use client"

import { useState } from "react"
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
// import { Checkbox } from "@/src/components/ui/checkbox"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/src/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Loader2 } from "lucide-react"

import type { Transaction } from "@/src/lib/data"


type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (fee: Transaction) => void
}


// Mensalidades do usuario - Componente para criar nova mensalidade
export function AddMonthlyFees({ open, onOpenChange, onSave }: Props) {
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [frequency, setFrequency] = useState("Mensal")
  const [date, setDate] = useState("")

  // Função para resetar o formulário após salvar ou fechar o modal
  const resetForm = () => {
    setDescription("")
    setAmount("")
    setCategory("")
    setFrequency("Mensal")
    setDate("")
  }

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Montamos os dados que a nossa rota POST do backend está esperando
      const payload = {
        description,
        amount: parseFloat(amount),
        category,
        frequency: frequency,
        date: date,
      };

      const response = await axios.post('/api/db/monthlyFees', payload);
      const newFee = response.data.fee;

      // Passando os dados salvos no banco para a tabela do frontend atualizar
      onSave({
        id: newFee.id,
        description: newFee.name,
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
            <Label htmlFor="description" className="text-sm font-medium text-foreground">Serviço / Nome</Label>
            <Input id="description" placeholder="Ex: Netflix, Internet, Academia..." value={description} onChange={(e) => setDescription(e.target.value)} required className="bg-secondary/50 border-border" />
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
              <Label htmlFor="frequency" className="text-sm font-medium text-foreground">Frequencia</Label>
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
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-secondary/50 border-border" />
            </div>
          </div>

          <Button type="submit" disabled={loading || !description || !amount || !category} className="w-full bg-emerald-500 text-background hover:bg-emerald-600 font-semibold h-11 shadow-lg shadow-emerald-500/20 mt-2" >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar Mensalidade"
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
