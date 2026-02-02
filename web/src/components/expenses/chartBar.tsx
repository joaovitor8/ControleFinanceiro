"use client"

import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart"

// 1. Dados Mockados (Simulando 6 meses)
const chartData = [
  { month: "Jan", income: 4500, expense: 3200 },
  { month: "Fev", income: 4800, expense: 4100 },
  { month: "Mar", income: 5200, expense: 2900 },
  { month: "Abr", income: 5000, expense: 3500 },
  { month: "Mai", income: 6100, expense: 3100 },
  { month: "Jun", income: 5800, expense: 5200 },
]

// 2. Configuração de Cores e Rótulos
const chartConfig = {
  income: {
    label: "Receitas",
    color: "#10b981", // Emerald-500 (Seu Verde Principal)
  },
  expense: {
    label: "Despesas",
    color: "#ef4444", // Red-500 (Para gastos) ou use "#27272a" (Zinc-800) para algo mais discreto
  },
} satisfies ChartConfig

export function ChartBar() {
  return (
    <Card className="col-span-1 h-full bg-zinc-950 border-zinc-800 text-zinc-100 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          Fluxo de Caixa
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Comparativo semestral de entradas e saídas.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* O Container do Shadcn ajusta o tamanho e as cores CSS */}
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            
            {/* Linhas de grade sutis */}
            <CartesianGrid vertical={false} stroke="#27272a" />
            
            {/* Eixo X (Meses) */}
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "#71717a" }} // Cor do texto (Zinc-500)
            />

            {/* Tooltip (A caixinha preta que aparece ao passar o mouse) */}
            <ChartTooltip
              cursor={{ fill: "#18181b" }} // Cor de fundo da barra ao passar o mouse
              content={<ChartTooltipContent indicator="dashed" />}
            />

            {/* Barra de Receita (Verde) */}
            <Bar 
              dataKey="income" 
              fill="var(--color-income)" 
              radius={[4, 4, 0, 0]} // Arredonda o topo da barra
              barSize={30} // Largura da barra
            />
            
            {/* Barra de Despesa (Vermelha) */}
            <Bar 
              dataKey="expense" 
              fill="var(--color-expense)" 
              radius={[4, 4, 0, 0]} 
              barSize={30}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      
      <CardFooter className="flex-col items-start gap-2 text-sm text-zinc-400 border-t border-zinc-900 pt-4">
        <div className="flex gap-2 font-medium leading-none text-emerald-500">
          Você economizou 12% a mais este mês <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando dados totais dos últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  )
}
