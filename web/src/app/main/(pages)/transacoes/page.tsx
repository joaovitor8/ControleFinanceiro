import { AddExpenses } from "@/src/components/outros/addExpenses";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Search, Filter, ArrowUpDown, MoreHorizontal } from "lucide-react";

// DADOS MOCKADOS (Para visualizar o design agora)
const transactions = [
  { id: 1, name: "Salário Mensal", category: "Receita", amount: 4500.00, date: "05/02/2024", type: "income", status: "Pago" },
  { id: 2, name: "Netflix Premium", category: "Assinatura", amount: 55.90, date: "10/02/2024", type: "expense", status: "Pago" },
  { id: 3, name: "Supermercado", category: "Alimentação", amount: 420.50, date: "12/02/2024", type: "expense", status: "Pago" },
  { id: 4, name: "Energia Elétrica", category: "Casa", amount: 180.00, date: "15/02/2024", type: "expense", status: "Pendente" },
  { id: 5, name: "Freelance Design", category: "Receita", amount: 800.00, date: "18/02/2024", type: "income", status: "Pendente" },
];

export default function TransactionsPage() {
  return (
    <div className="p-6 space-y-6 h-full w-full flex flex-col">
      
      {/* 1. CABEÇALHO E AÇÕES */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Transações</h1>
          <p className="text-zinc-400 text-sm">Gerencie suas entradas e saídas.</p>
        </div>
        <div className="flex items-center gap-2">
          {/* O Botão de Adicionar volta para cá, onde ele pertence */}
          <AddExpenses />
        </div>
      </div>

      {/* 2. BARRA DE FERRAMENTAS (Busca e Filtros) */}
      <div className="flex items-center justify-between gap-4 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <Input 
            placeholder="Buscar transação..." 
            className="pl-9 bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-emerald-500 h-9"
          />
        </div>
        <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white h-9">
                <Filter className="mr-2 h-3.5 w-3.5" />
                Filtrar
            </Button>
            <Button variant="outline" size="sm" className="border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white h-9">
                Fevereiro 2024
            </Button>
        </div>
      </div>

      {/* 3. TABELA DE DADOS (Ocupa o resto da tela) */}
      <div className="rounded-md border border-zinc-800 bg-zinc-900/30 flex-1 overflow-hidden flex flex-col">
        {/* Container com scroll apenas na tabela */}
        <div className="overflow-auto flex-1">
            <Table>
            <TableHeader className="bg-zinc-900/50 sticky top-0">
                <TableRow className="border-zinc-800 hover:bg-zinc-900/50">
                <TableHead className="w-[300px] text-zinc-400">Descrição</TableHead>
                <TableHead className="text-zinc-400">Categoria</TableHead>
                <TableHead className="text-zinc-400">Data</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-right text-zinc-400">Valor</TableHead>
                <TableHead className="w-[50px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((t) => (
                <TableRow key={t.id} className="border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                    <TableCell className="font-medium text-zinc-200">
                        <div className="flex flex-col">
                            <span>{t.name}</span>
                            {/* Mobile only label could go here */}
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline" className="border-zinc-700 text-zinc-400 font-normal">
                            {t.category}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-400 text-sm">{t.date}</TableCell>
                    <TableCell>
                        <Badge 
                            className={`
                                ${t.status === 'Pago' ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'} 
                                border-0 font-medium
                            `}
                        >
                            {t.status}
                        </Badge>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${t.type === 'income' ? 'text-emerald-500' : 'text-zinc-200'}`}>
                        {t.type === 'expense' ? '- ' : '+ '}
                        {t.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </TableCell>
                    <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-zinc-800">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      </div>
    </div>
  );
}
