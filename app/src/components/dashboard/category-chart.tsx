"use client"

import { useState, useEffect } from "react";
import axios from "axios";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

import { formatCurrency } from "@/src/lib/data"


function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string; value: number; fill: string } }> }) {
  if (!active || !payload?.length) return null
  const data = payload[0].payload
  return (
    <div className="rounded-lg border border-border bg-popover p-3 shadow-xl">
      <div className="flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: data.fill }} />
        <span className="text-xs font-medium text-foreground">{data.name}</span>
      </div>
      <p className="text-sm font-bold text-foreground mt-1">{formatCurrency(data.value)}</p>
    </div>
  )
}

export function CategoryChart() {
  const [fees, setFees] = useState([])
  const total = fees.reduce((sum, item) => sum + item.value, 0)

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/monthlyFees")
      setFees(response.data)
    } catch (error) {
      console.error("Error fetching monthly fees:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="rounded-xl border border-border bg-card p-5 lg:p-6">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Gastos por Categoria</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Distribuicao mensal</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="relative h-50 w-50">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={fees} cx="50%" cy="50%" innerRadius={65} outerRadius={90} paddingAngle={3} dataKey="value" strokeWidth={0} >
                {fees.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="text-lg font-bold text-foreground font-mono">{formatCurrency(total)}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 w-full max-w-65">
          {fees.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
              <span className="text-xs text-muted-foreground truncate">{item.name}</span>
              <span className="text-xs font-medium text-foreground ml-auto font-mono">
                {((item.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
