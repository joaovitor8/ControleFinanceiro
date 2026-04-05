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

import type { FeeType } from "@/src/components/monthlyFees/addMonthlyFees";


const ITEMS_PER_PAGE = 8;

const categoryColors: Record<string, string> = {
  "Streaming": "bg-purple-500/10 text-purple-400",
  "Internet": "bg-sky-500/10 text-sky-400",
  "Casa": "bg-amber-500/10 text-amber-400",
  "Aluguel": "bg-emerald-500/10 text-emerald-400",
  "Academia": "bg-rose-500/10 text-rose-400",
  "Educação": "bg-blue-500/10 text-blue-400",
  "Seguro": "bg-zinc-500/10 text-zinc-400",
  "Outros": "bg-secondary text-muted-foreground"
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
};


export const MonthlyFeesView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [monthFilter, setMonthFilter] = useState<string>("all");
  
  const [feesList, setFeesList] = useState<FeeType[]>([]);
  const [feeToEdit, setFeeToEdit] = useState<FeeType | null>(null);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

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

  useEffect(() => {
    fetchFees();
  }, []);

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

  const filtered = useMemo(() => {
    return feesList.filter((fee) => {
      const matchSearch =
        fee.name.toLowerCase().includes(search.toLowerCase()) ||
        fee.category.toLowerCase().includes(search.toLowerCase());
      
      const matchMonth =
        monthFilter === "all" || (fee.date && fee.date.startsWith(monthFilter));
      
      return matchSearch && matchMonth;
    });
  }, [feesList, search, monthFilter]);

  const handleFeeCreated = () => {
    fetchFees();
  };

  const handleUpdateFee = (updatedFee: FeeType) => {
    setFeesList((prev) => prev.map((fee) => (fee.id === updatedFee.id ? updatedFee : fee)));
  };

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const uniqueMonths = useMemo(() => {
    const allMonths = feesList.map(fee => fee.date ? fee.date.slice(0, 7) : "");
    const uniqueSet = new Set(allMonths.filter(Boolean)); 
    return Array.from(uniqueSet).sort().reverse(); 
  }, [feesList]);

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
              {uniqueMonths.map((monthStr) => {
                const [year, month] = monthStr.split('-');
                const monthName = new Date(parseInt(year), parseInt(month) - 1, 1).toLocaleString("pt-BR", { month: "short", year: "numeric" });
                
                return (
                  <SelectItem key={monthStr} value={monthStr}>
                    <span className="capitalize">{monthName}</span>
                  </SelectItem>
                );
              })}
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
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Frequencia</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Data de Aquissição</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Valor</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginated.map((fee) => (
                  <TableRow key={fee.id} className="border-border hover:bg-secondary/30 transition-colors">
                    {/* Alterado para fee.name */}
                    <TableCell className="font-medium text-foreground">{fee.name}</TableCell>
                    <TableCell>
                      <span className={`text-xs font-medium px-2 py-1 rounded-md ${categoryColors[fee.category] || "bg-secondary text-muted-foreground"}`}>
                        {fee.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{fee.frequency}</TableCell>
                    {/* Renderização segura da data */}
                    <TableCell className="text-muted-foreground text-sm">{fee.date ? fee.date.split("T")[0] : ""}</TableCell>
                    <TableCell className="text-right font-semibold font-mono text-foreground">{formatCurrency(fee.amount)}</TableCell>
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

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">
            {filtered.length} mensalidade(s) encontrada(s)
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-8 border-border bg-card text-foreground"
            >
              Anterior
            </Button>
            <span className="text-xs text-muted-foreground px-2">
              {page} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-8 border-border bg-card text-foreground"
            >
              Próximo
            </Button>
          </div>
        </div>
      )}

      <AddMonthlyFees open={modalOpen} onOpenChange={setModalOpen} onSave={handleFeeCreated} />
      <EditMonthlyFee open={editModalOpen} onOpenChange={setEditModalOpen} onUpdate={handleUpdateFee} fee={feeToEdit} />
    </div>
  );
}
