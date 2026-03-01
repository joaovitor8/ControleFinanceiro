"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { MoreHorizontal, Pencil, Plus, Receipt, Search, Trash2, Loader2 } from "lucide-react";

import { AddMonthlyFees } from "@/src/components/monthlyFees/addMonthlyFees";
import { EditMonthlyFee } from "@/src/components/monthlyFees/editMonthlyFees";

import { categoryColors, formatCurrency, formatDate, type Transaction } from "@/src/lib/data"; // Removemos o array de mock 'transactions'

const ITEMS_PER_PAGE = 8;


// Mensalidades do usuário - Componente de visualização
export const MonthlyFeesView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const [feesList, setFeesList] = useState<Transaction[]>([]);
  const [feeToEdit, setFeeToEdit] = useState<Transaction | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Função para buscar os dados do backend
  const fetchFees = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/db/monthlyFees');
      setFeesList(response.data);
    } catch (error) {
      console.error("Erro ao buscar mensalidades:", error);
      toast.error("Não foi possível carregar suas mensalidades.");
    } finally {
      setIsLoading(false);
    }
  };

  // Executa a busca assim que o componente monta
  useEffect(() => {
    fetchFees();
  }, []);

  // Deletar de verdade no banco
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/db/monthlyFees/${id}`);
      setFeesList((prev) => prev.filter((fee) => fee.id !== id));
      toast.success("Mensalidade removida com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar:", error);
      toast.error("Erro ao excluir a mensalidade.");
    }
  };

  // Função para filtrar os dados com base na busca e no filtro de mês
  const filtered = useMemo(() => {
    return feesList.filter((fee) => {
      const matchSearch =
        fee.description.toLowerCase().includes(search.toLowerCase()) ||
        fee.category.toLowerCase().includes(search.toLowerCase());
      const matchMonth =
        monthFilter === "all" || fee.date.startsWith(monthFilter);
      return matchSearch && matchMonth;
    });
  }, [feesList, search, monthFilter]);

  // Quando o modal salvar com sucesso, ele chama isso para recarregar a lista
  const handleFeeCreated = () => {
    fetchFees();
  };

  // Função para atualizar a mensalidade editada na lista sem precisar recarregar tudo do backend
  const handleUpdateFee = (updatedFee: Transaction) => {
    setFeesList((prev) => prev.map((fee) => (fee.id === updatedFee.id ? updatedFee : fee)));
  };

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );


  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight"> Mensalidades </h2>
          <p className="text-sm text-muted-foreground mt-1"> Gerencie suas assinaturas e contas fixas mensais </p>
        </div>

        <Button onClick={() => setModalOpen(true)} className="bg-emerald-500 text-background hover:bg-emerald-600 font-semibold shadow-lg shadow-emerald-500/20" >
          <Plus className="h-4 w-4 mr-2" />
          Nova Mensalidade
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar serviço..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9 bg-card border-border" />
        </div>

        <div className="flex items-center gap-3">
          <Select value={monthFilter} onValueChange={(v) => { setMonthFilter(v); setPage(1); }}>
            <SelectTrigger className="w-40 bg-card border-border">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Meses</SelectItem>
              <SelectItem value="2026-02">Fev 2026</SelectItem>
              <SelectItem value="2026-01">Jan 2026</SelectItem>
              <SelectItem value="2025-12">Dez 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 px-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary mb-4">
            <Receipt className="h-7 w-7 text-muted-foreground" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1"> Nenhuma mensalidade encontrada </h3>
          <p className="text-sm text-muted-foreground text-center max-w-xs mb-4"> Comece adicionando suas assinaturas para ter controle dos seus gastos fixos. </p>
          <Button onClick={() => setModalOpen(true)} className="bg-emerald-500 text-background hover:bg-emerald-600 font-semibold">
            <Plus className="h-4 w-4 mr-2" />
            Nova Mensalidade
          </Button>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Serviço</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Categoria</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Vencimento</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Valor</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginated.map((fee) => (
                  <TableRow key={fee.id} className="border-border hover:bg-secondary/30 transition-colors">
                    <TableCell className="font-medium text-foreground">{fee.description}</TableCell>
                    <TableCell>
                      <span className={`text-xs font-medium px-2 py-1 rounded-md ${categoryColors[fee.category] || "bg-secondary text-muted-foreground"}`}>
                        {fee.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{formatDate(fee.date)}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Pendente
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-semibold font-mono text-foreground">
                      - {formatCurrency(fee.amount)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover border-border">
                          <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => { setFeeToEdit(fee); setEditModalOpen(true) }} >
                            <Pencil className="h-3.5 w-3.5" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer text-rose-400 focus:text-rose-400" onClick={() => handleDelete(fee.id)}>
                            <Trash2 className="h-3.5 w-3.5" /> Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </div>

        </div>
      )}

      <AddMonthlyFees open={modalOpen} onOpenChange={setModalOpen} onSave={handleFeeCreated} />
      <EditMonthlyFee open={editModalOpen} onOpenChange={setEditModalOpen} onUpdate={handleUpdateFee} fee={feeToEdit} />
    </div>
  );
}
