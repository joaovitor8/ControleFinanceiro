import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { Tv, Home, Zap, Car, TrendingUp, MoreHorizontal } from "lucide-react"
import { Button } from "@/src/components/ui/button"

// 1. Tipagem dos dados (Isso virá do seu Banco de Dados depois)
interface ExpenseItem {
  id: string
  name: string
  amount: number
  category: "assinatura" | "fixa" | "transporte"
  frequency: string
  nextDate: string // Data em string por enquanto
}

// 2. Dados Falsos (Mock) para testar o visual agora
const MOCK_DATA: ExpenseItem[] = [
  { id: "1", name: "Netflix", amount: 55.90, category: "assinatura", frequency: "Mensal", nextDate: "15/02" },
  { id: "2", name: "Spotify", amount: 21.90, category: "assinatura", frequency: "Mensal", nextDate: "10/02" },
  { id: "3", name: "Aluguel", amount: 1800.00, category: "fixa", frequency: "Mensal", nextDate: "05/02" },
  { id: "4", name: "Internet", amount: 120.00, category: "fixa", frequency: "Mensal", nextDate: "20/02" },
  { id: "5", name: "Amazon", amount: 119.00, category: "assinatura", frequency: "Anual", nextDate: "25/11" },
]

export function ViewExpenses() {
  
  // Função auxiliar para escolher o ícone baseado na categoria
  const getIcon = (category: string) => {
    switch (category) {
      case "assinatura": return <Tv className="w-5 h-5 text-emerald-400" />
      case "fixa": return <Home className="w-5 h-5 text-blue-400" />
      case "transporte": return <Car className="w-5 h-5 text-orange-400" />
      default: return <Zap className="w-5 h-5 text-zinc-400" />
    }
  }

  // Calcula o total apenas para mostrar no card
  const totalAmount = MOCK_DATA.reduce((acc, item) => acc + item.amount, 0)

  return (
    <Card className="col-span-1 bg-zinc-950 border-zinc-800 text-zinc-100 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              Despesas
            </CardTitle>
            <CardDescription className="text-zinc-400 mt-1">
              Suas contas fixas e assinaturas.
            </CardDescription>
          </div>
          {/* Badge mostrando o total gasto */}
          <Badge variant="outline" className="border-red-500/30 text-red-400 bg-red-500/10 px-3 py-1 text-sm">
            Total: {totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* ScrollArea permite rolar a lista se tiver muitos itens sem quebrar o layout */}
        <ScrollArea className="h-75 pr-4">
          <div className="space-y-4">
            {MOCK_DATA.map((item) => (
              <div 
                key={item.id} 
                className="group flex items-center justify-between p-3 rounded-lg hover:bg-zinc-900 transition-colors border border-transparent hover:border-zinc-800"
              >
                {/* Lado Esquerdo: Ícone e Infos */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-emerald-500/30 transition-colors">
                    {getIcon(item.category)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-zinc-100">{item.name}</p>
                    <p className="text-xs text-zinc-500">
                      Vence dia {item.nextDate} • {item.frequency}
                    </p>
                  </div>
                </div>

                {/* Lado Direito: Valor e Menu */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-medium text-zinc-300">
                    {item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                  
                  {/* Botão de ações (Editar/Excluir) */}
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-emerald-400">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
