
// REMOVER DEPOIS

export type Transaction = {
  id: string
  description: string
  category: string
  date: string
  type: "income" | "expense"
  amount: number
  status: "paid" | "pending"
}

export type Goal = {
  id: string
  name: string
  icon: string
  target: number
  current: number
  color: string
}

export type MonthlyData = {
  month: string
  balance: number
  income: number
  expense: number
}

export type CategoryData = {
  name: string
  value: number
  fill: string
}

export const transactions: Transaction[] = [
  { id: "1", description: "Salario", category: "Salario", date: "2026-02-01", type: "income", amount: 8500, status: "paid" },
  { id: "2", description: "Aluguel", category: "Casa", date: "2026-02-05", type: "expense", amount: 2200, status: "paid" },
  { id: "3", description: "Supermercado Extra", category: "Alimentacao", date: "2026-02-08", type: "expense", amount: 654.30, status: "paid" },
  { id: "4", description: "Freelance Design", category: "Freelance", date: "2026-02-10", type: "income", amount: 3200, status: "paid" },
  { id: "5", description: "Netflix + Spotify", category: "Lazer", date: "2026-02-12", type: "expense", amount: 79.80, status: "paid" },
  { id: "6", description: "Conta de Luz", category: "Casa", date: "2026-02-15", type: "expense", amount: 187.45, status: "pending" },
  { id: "7", description: "Academia Smart Fit", category: "Saude", date: "2026-02-15", type: "expense", amount: 99.90, status: "paid" },
  { id: "8", description: "Uber / 99", category: "Transporte", date: "2026-02-16", type: "expense", amount: 142.00, status: "paid" },
  { id: "9", description: "Dividendos ITUB4", category: "Investimentos", date: "2026-02-18", type: "income", amount: 456.78, status: "paid" },
  { id: "10", description: "Restaurante Japonese", category: "Alimentacao", date: "2026-02-20", type: "expense", amount: 189.00, status: "pending" },
  { id: "11", description: "Internet Fibra", category: "Casa", date: "2026-02-22", type: "expense", amount: 129.90, status: "paid" },
  { id: "12", description: "Curso Udemy", category: "Educacao", date: "2026-02-25", type: "expense", amount: 27.90, status: "paid" },
]

export const monthlyData: MonthlyData[] = [
  { month: "Set", balance: 12450, income: 9200, expense: 5800 },
  { month: "Out", balance: 14800, income: 10500, expense: 6200 },
  { month: "Nov", balance: 13200, income: 8800, expense: 7100 },
  { month: "Dez", balance: 16500, income: 14200, expense: 8500 },
  { month: "Jan", balance: 18200, income: 12100, expense: 6400 },
  { month: "Fev", balance: 19846, income: 12156.78, expense: 3710.25 },
]

export const categoryData: CategoryData[] = [
  { name: "Casa", value: 2517.35, fill: "hsl(199, 89%, 48%)" },
  { name: "Alimentacao", value: 843.30, fill: "hsl(350, 89%, 60%)" },
  { name: "Lazer", value: 79.80, fill: "hsl(280, 65%, 60%)" },
  { name: "Transporte", value: 142.00, fill: "hsl(43, 74%, 66%)" },
  { name: "Saude", value: 99.90, fill: "hsl(160, 84%, 39%)" },
  { name: "Educacao", value: 27.90, fill: "hsl(199, 89%, 68%)" },
]

export const goals: Goal[] = [
  { id: "1", name: "Viagem Europa", icon: "plane", target: 25000, current: 18750, color: "emerald" },
  { id: "2", name: "Carro Novo", icon: "car", target: 85000, current: 34000, color: "blue" },
  { id: "3", name: "Reserva de Emergencia", icon: "shield", target: 50000, current: 42500, color: "amber" },
  { id: "4", name: "Apartamento", icon: "home", target: 200000, current: 65000, color: "purple" },
]

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function formatDate(dateStr: string): string {
  // Parse the date string manually to avoid timezone issues during SSR
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  }).format(date)
}

export const categoryColors: Record<string, string> = {
  Salario: "bg-emerald-500/20 text-emerald-400",
  Freelance: "bg-emerald-500/20 text-emerald-400",
  Investimentos: "bg-emerald-500/20 text-emerald-400",
  Casa: "bg-sky-500/20 text-sky-400",
  Alimentacao: "bg-rose-500/20 text-rose-400",
  Lazer: "bg-purple-500/20 text-purple-400",
  Transporte: "bg-amber-500/20 text-amber-400",
  Saude: "bg-teal-500/20 text-teal-400",
  Educacao: "bg-blue-500/20 text-blue-400",
}
