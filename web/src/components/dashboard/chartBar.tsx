"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  { name: "Jan", total: 1200 },
  { name: "Fev", total: 2100 },
  { name: "Mar", total: 1800 },
  { name: "Abr", total: 2400 },
  { name: "Mai", total: 3200 },
  { name: "Jun", total: 4500 },
]

export function ChartBar() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="name" 
          stroke="#52525b" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <YAxis
          stroke="#52525b"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$${value}`}
        />
        <CartesianGrid vertical={false} stroke="#27272a" strokeDasharray="4 4" />
        <Tooltip 
            contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "8px" }}
            itemStyle={{ color: "#10b981" }}
        />
        <Area
          type="monotone"
          dataKey="total"
          stroke="#10b981"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorTotal)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
