"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { PlusCircle, Calendar, Wallet } from "lucide-react"

import { Button } from "@/src/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"

import axios from "axios"
import { useUser } from "@clerk/nextjs"

// Schema de Validação (Regras do formulário)
const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  amount: z.string().refine((val) => !isNaN(Number(val)), "Deve ser um número"),
  type: z.string({ error: "Selecione o tipo" }),
  frequency: z.string({ error: "Selecione a frequência" }),
})

export function AddExpenses() {
  const [open, setOpen] = useState(false)
  const { user } = useUser(); // Pega o usuário logado

  // Configuração do Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: "",
    },
  })

  // Função de Envio (Aqui você conectará com o Backend depois)
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return alert("Usuário não autenticado!")

    try {
      // Envia para o seu Backend
      await axios.post('http://localhost:3333/db/expense', {
        userId: user.id, // ID do Clerk
        name: values.name,
        amount: values.amount,
        type: values.type,
        frequency: values.frequency
      });
      
      setOpen(false) // Fecha o modal
      form.reset()   // Limpa o form
      
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar despesa");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Botão que abre o modal - Estilo Verde Neon */}
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold gap-2">
          <PlusCircle className="w-4 h-4" />
          Novo Gasto
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-106.25 bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-emerald-500 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Adicionar Recorrência
          </DialogTitle>

          <DialogDescription className="text-zinc-400">
            Adicione assinaturas (Netflix) ou contas fixas (Luz). O sistema lembrará você.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            
            {/* Campo Nome */}
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Gasto</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Netflix, Aluguel..." {...field} className="bg-zinc-900 border-zinc-800 focus-visible:ring-emerald-500" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

            <div className="grid grid-cols-2 gap-4">
              {/* Campo Valor */}
              <FormField control={form.control} name="amount" render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor (R$)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Wallet className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                      <Input placeholder="0.00" {...field} className="pl-9 bg-zinc-900 border-zinc-800 focus-visible:ring-emerald-500" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>

              {/* Campo Tipo (Onde você resolve sua dúvida) */}
              <FormField control={form.control} name="type" render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-zinc-900 border-zinc-800 focus:ring-emerald-500">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                      <SelectItem value="assinatura">📺 Assinatura</SelectItem>
                      <SelectItem value="fixa">🏠 Conta Fixa</SelectItem>
                      {/* <SelectItem value="investimento">📈 Investimento</SelectItem> */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}/>
            </div>

            {/* Campo Frequência */}
            <FormField control={form.control} name="frequency" render={({ field }) => (
              <FormItem>
                <FormLabel>Frequência</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-zinc-900 border-zinc-800 focus:ring-emerald-500">
                      <SelectValue placeholder="Mensal ou Anual?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                    <SelectItem value="monthly">📅 Mensal</SelectItem>
                    <SelectItem value="yearly">🎉 Anual</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}/>

            <DialogFooter className="mt-4">
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                Salvar Despesa
              </Button>
            </DialogFooter>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
