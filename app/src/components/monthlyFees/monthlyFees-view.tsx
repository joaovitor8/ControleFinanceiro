"use client";

import { useMemo, useState } from "react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { categoryColors, formatCurrency, formatDate, transactions, type Transaction } from "@/src/lib/data";
import { MoreHorizontal, Pencil, Plus, Receipt, Search, SlidersHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { NewMonthlyFeesModal } from "@/src/components/monthlyFees/monthlyFees-modal";

const ITEMS_PER_PAGE = 8;

export function MonthlyFeesView() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [txList, setTxList] = useState<Transaction[]>(transactions);

  const filtered = useMemo(() => {
    return txList.filter((tx) => {
      const matchSearch =
        tx.description.toLowerCase().includes(search.toLowerCase()) ||
        tx.category.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "all" || tx.type === typeFilter;
      const matchMonth =
        monthFilter === "all" || tx.date.startsWith(monthFilter);
      return matchSearch && matchType && matchMonth;
    });
  }, [txList, search, typeFilter, monthFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handleDelete = (id: string) => {
    setTxList((prev) => prev.filter((tx) => tx.id !== id));
    toast.success("Transacao removida com sucesso");
  };

  const handleNewTransaction = (tx: Transaction) => {
    setTxList((prev) => [tx, ...prev]);
    toast.success("Transacao criada com sucesso!");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">
            Transacoes
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie suas receitas e despesas
          </p>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-emerald-500 text-background hover:bg-emerald-600 font-semibold shadow-lg shadow-emerald-500/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Transacao
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar transacoes..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9 bg-card border-border"
          />
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={monthFilter}
            onValueChange={(v) => {
              setMonthFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-35 bg-card border-border">
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Meses</SelectItem>
              <SelectItem value="2026-02">Fev 2026</SelectItem>
              <SelectItem value="2026-01">Jan 2026</SelectItem>
              <SelectItem value="2025-12">Dez 2025</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={typeFilter}
            onValueChange={(v) => {
              setTypeFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-32.5 bg-card border-border">
              <SlidersHorizontal className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="income">Receita</SelectItem>
              <SelectItem value="expense">Despesa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 px-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary mb-4">
            <Receipt className="h-7 w-7 text-muted-foreground" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">
            Nenhuma transacao encontrada
          </h3>
          <p className="text-sm text-muted-foreground text-center max-w-xs mb-4">
            Comece adicionando sua primeira transacao para ter controle total
            das suas financas.
          </p>
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-emerald-500 text-background hover:bg-emerald-600 font-semibold"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Transacao
          </Button>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Nome
                  </TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Categoria
                  </TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Data
                  </TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">
                    Valor
                  </TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((tx) => {
                  const isIncome = tx.type === "income";
                  return (
                    <TableRow
                      key={tx.id}
                      className="border-border hover:bg-secondary/30 transition-colors"
                    >
                      <TableCell className="font-medium text-foreground">
                        {tx.description}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-md ${categoryColors[tx.category] || "bg-secondary text-muted-foreground"}`}
                        >
                          {tx.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDate(tx.date)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium ${tx.status === "paid" ? "text-emerald-400" : "text-amber-400"}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${tx.status === "paid" ? "bg-emerald-400" : "bg-amber-400"}`}
                          />
                          {tx.status === "paid" ? "Pago" : "Pendente"}
                        </span>
                      </TableCell>
                      <TableCell
                        className={`text-right font-semibold font-mono ${isIncome ? "text-emerald-400" : "text-foreground"}`}
                      >
                        {isIncome ? "+" : "-"}
                        {formatCurrency(tx.amount)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Opcoes</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-popover border-border"
                          >
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <Pencil className="h-3.5 w-3.5" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="gap-2 cursor-pointer text-rose-400 focus:text-rose-400"
                              onClick={() => handleDelete(tx.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <p className="text-xs text-muted-foreground">
                {filtered.length} transacao(es) encontrada(s)
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
                  Proximo
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      <NewMonthlyFeesModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleNewTransaction}
      />
    </div>
  );
}
