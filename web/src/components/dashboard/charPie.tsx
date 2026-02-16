"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Casa", value: 800, color: "#3b82f6" }, // Blue
  { name: "Lazer", value: 300, color: "#f59e0b" }, // Amber
  { name: "Assinaturas", value: 200, color: "#10b981" }, // Emerald
  { name: "Outros", value: 100, color: "#71717a" }, // Zinc
]

export function ChartPie() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "8px" }}
          itemStyle={{ color: "#fff" }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
