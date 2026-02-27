import { AppShell } from "@/src/components/app-shell"
import { KpiCards } from "@/src/components/dashboard/kpi-cards"
import { BalanceChart } from "@/src/components/dashboard/balance-chart"
import { CategoryChart } from "@/src/components/dashboard/category-chart"
import { RecentTransactions } from "@/src/components/dashboard/recent-transactions"

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1">Visao geral das suas financas</p>
        </div>

        <KpiCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BalanceChart />
          </div>
          <div>
            <CategoryChart />
          </div>
        </div>

        <RecentTransactions />
      </div>
    </AppShell>
  )
}
