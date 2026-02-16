import { ChartBar } from "@/src/components/dashboard/chartBar"
import { ChartPie } from "@/src/components/dashboard/charPie"
import { RecentTransactions } from "@/src/components/dashboard/transacoes"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { ArrowUpRight, ArrowDownLeft, DollarSign, Wallet } from "lucide-react"




export default function DashboardPage() {
  return (
    <div className="flex-1 p-6 space-y-6 h-full overflow-y-auto">


      {/* HEADER SIMPLES */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
        <div className="text-sm text-zinc-400">{new Date().toLocaleDateString('pt-BR', { month: 'long' })}, {new Date().getFullYear()}</div>
      </div>


      {/* KPIs (INDICADORES) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard 
          title="salario" 
          value="R$ 000,00" 
          sub="---"
          icon={<Wallet className="h-4 w-4 text-emerald-500" />}
        />
        <KpiCard 
          title="receitas total do mês" 
          value="R$ 000,00" 
          sub="---"
          icon={<ArrowUpRight className="h-4 w-4 text-emerald-500" />}
        />
        <KpiCard 
          title="despesas total do mês" 
          value="R$ 000,00" 
          sub="---"
          icon={<ArrowDownLeft className="h-4 w-4 text-rose-500" />}
        />
        <KpiCard 
          title="saldo do mês" 
          value="R$ 000,00" 
          sub="---"
          icon={<DollarSign className="h-4 w-4 text-zinc-100" />}
        />
      </div>


      {/* ÁREA PRINCIPAL */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 h-112.5">
        
        {/* GRÁFICO PRINCIPAL (Ocupa 4 colunas) */}
        <Card className="col-span-5 bg-zinc-900/50 border-zinc-800 text-zinc-100 flex flex-col">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-400">Visão Geral (6 Meses)</CardTitle>
          </CardHeader>
          <CardContent className="pl-0 flex-1 min-h-0">
            <ChartBar />
          </CardContent>
        </Card>

        {/* TRANSAÇÕES RECENTES (Ocupa 3 colunas) */}
        <Card className="col-span-2 bg-zinc-900/50 border-zinc-800 text-zinc-100 flex flex-col">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-400">Últimas Transações</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto pr-2">
            <RecentTransactions />
          </CardContent>
        </Card>
      </div>

      {/* 4. LINHA INFERIOR */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 h-75">
         {/* CATEGORIAS (Ocupa 2 colunas) */}
         <Card className="col-span-2 bg-zinc-900/50 border-zinc-800 text-zinc-100 flex flex-col">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-400">Gastos por Categoria</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0">
            <ChartPie />
          </CardContent>
        </Card>

        {/* ÁREA DE INTEGRAÇÃO OU ANÚNCIO INTERNO (Ocupa 5 colunas) */}
        <Card className="col-span-5 bg-linear-to-br from-zinc-900 to-zinc-950 border-zinc-800 flex items-center justify-center text-zinc-500 border-dashed">
            <div className="text-center">
                <p>Espaço para Metas ou Relatório IA</p>
                <p className="text-xs opacity-50">Em breve</p>
            </div>
        </Card>
      </div>
    </div>
  )
}

function KpiCard({ title, value, sub, icon }: any) {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 text-zinc-100 shadow-sm hover:bg-zinc-900/80 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <p className="text-xs text-zinc-500 mt-1">
          {sub}
        </p>
      </CardContent>
    </Card>
  )
}
