import { AppShell } from "@/src/components/app-shell";
import { MonthlyFeesView } from "@/src/components/monthlyFees/monthlyFeesView";


// Mensalidades do usuário - Página
export default function MonthlyFeesPage() {
  return (
    <AppShell>
      <MonthlyFeesView />
    </AppShell>
  );
}
